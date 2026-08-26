/**
 * POST /api/contatti — la ragione per cui il sito gira su Node.
 *
 * Finché il sito era statico, il modulo poteva solo aprire il client di posta
 * del visitatore o affidarsi a un servizio esterno: nel browser non può
 * esistere una credenziale. Qui la richiesta viene ricevuta, convalidata e
 * spedita dal server, con credenziali che restano nella ENV del processo.
 */
import express from 'express'
import { convalidaLead, sembraUnRobot } from '../convalida.js'
import { inviaLead } from '../posta.js'

/**
 * Limitatore di frequenza in memoria, finestra scorrevole.
 *
 * Un endpoint solo e un processo solo: `express-rate-limit` aggiungerebbe una
 * dipendenza e gli stessi problemi di attendibilità del proxy.
 *
 * Da sapere: la chiave è `req.ip`, che dietro il proxy dell'hosting deriva da
 * `X-Forwarded-For` e quindi è falsificabile. **Questo è un freno allo spam,
 * non un controllo di sicurezza** — la rete sotto è il tetto complessivo, che
 * non dipende dall'indirizzo.
 */
function limitatore({ limiteInvii, finestraMinuti, tettoOrario }) {
    const finestra = finestraMinuti * 60_000
    const perIndirizzo = new Map()
    let oraCorrente = 0
    let conteggioOrario = 0
    const TETTO_CHIAVI = 5000

    return function consenti(ip) {
        const adesso = Date.now()

        const oraDiAdesso = Math.floor(adesso / 3_600_000)
        if (oraDiAdesso !== oraCorrente) {
            oraCorrente = oraDiAdesso
            conteggioOrario = 0
        }
        if (conteggioOrario >= tettoOrario) return { ok: false, attesa: 3600 }

        const precedenti = (perIndirizzo.get(ip) ?? []).filter(t => adesso - t < finestra)
        if (precedenti.length >= limiteInvii) {
            const attesa = Math.ceil((finestra - (adesso - precedenti[0])) / 1000)
            perIndirizzo.set(ip, precedenti)
            return { ok: false, attesa }
        }

        precedenti.push(adesso)
        perIndirizzo.set(ip, precedenti)
        conteggioOrario += 1

        // Potatura: senza, la mappa cresce quanto gli indirizzi visti.
        if (perIndirizzo.size > TETTO_CHIAVI) {
            for (const [chiave, tempi] of perIndirizzo) {
                if (tempi.every(t => adesso - t >= finestra)) perIndirizzo.delete(chiave)
            }
        }
        return { ok: true }
    }
}

export function creaRotteApi(configurazione) {
    const rotte = express.Router()
    const consenti = limitatore(configurazione.lead)

    rotte.use(express.json({ limit: '16kb' }))

    /** Sonda: utile al collaudo e a un monitor. Non rivela nulla oltre a un booleano. */
    rotte.get('/salute', (_req, res) => {
        res.json({ ok: true, smtp: configurazione.postaAttiva })
    })

    rotte.post('/contatti', async (req, res) => {
        // All'esca si risponde come a un invio riuscito: dire al robot che è
        // stato riconosciuto gli insegna solo a cambiare tattica.
        if (sembraUnRobot(req.body)) return res.json({ ok: true })

        const { dati, errori, valido } = convalidaLead(req.body)
        if (!valido) return res.status(400).json({ ok: false, errori })

        const esito = consenti(req.ip ?? 'sconosciuto')
        if (!esito.ok) {
            res.setHeader('Retry-After', String(esito.attesa))
            return res.status(429).json({ ok: false, motivo: 'troppe-richieste' })
        }

        // Il sito deve restare visitabile anche se manca un segreto: qui si
        // dichiara l'indisponibilità, e il modulo ripiega sul client di posta.
        if (!configurazione.postaAttiva) {
            return res.status(503).json({ ok: false, motivo: 'smtp-non-configurato' })
        }

        try {
            await inviaLead(dati, configurazione)
            // Una riga per richiesta, senza dati personali: il registro
            // dell'hosting resta utile senza diventare un archivio non
            // dichiarato nell'informativa privacy.
            console.log(`[lead] inviata — origine: ${dati.origine || 'sito'}`)
            return res.json({ ok: true })
        } catch (errore) {
            console.error('[lead] invio fallito:', errore.message)
            return res.status(502).json({ ok: false, motivo: 'invio-fallito' })
        }
    })

    return rotte
}
