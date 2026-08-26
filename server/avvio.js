/**
 * Composizione e avvio del server.
 *
 * L'ordine dei middleware è significativo e non va cambiato a cuor leggero:
 * intestazioni e compressione, poi le rotte dell'API, poi i file statici,
 * infine il 404. L'API prima dello statico perché `/api/...` non è un file;
 * il 404 per ultimo perché deve vedere solo ciò che nessun altro ha servito.
 */
import express from 'express'
import { CONFIGURAZIONE } from './configurazione.js'
import { montaSito, montaNonTrovata } from './sito-statico.js'
import { creaRotteApi } from './api/contatti.js'

export function creaApplicazione(configurazione = CONFIGURAZIONE) {
    const app = express()

    // Dietro il proxy dell'hosting, senza questo `req.ip` sarebbe lo stesso
    // per tutti i visitatori e il limitatore di frequenza li conterebbe insieme.
    app.set('trust proxy', configurazione.proxyAttendibile)

    const { paginaNonTrovata } = montaSito(app, configurazione)
    app.use('/api', creaRotteApi(configurazione))
    montaNonTrovata(app, paginaNonTrovata)

    return app
}

export function avvia(configurazione = CONFIGURAZIONE) {
    const app = creaApplicazione(configurazione)

    return app.listen(configurazione.porta, configurazione.host, () => {
        console.log(`Luna Costruzioni — in ascolto su ${configurazione.host}:${configurazione.porta}`)
        if (!configurazione.postaAttiva) {
            console.warn(
                'Attenzione: SMTP non configurato. Il sito funziona, ma /api/contatti risponde 503 ' +
                'e il modulo ripiega sul client di posta del visitatore. ' +
                'Impostare SMTP_HOST, SMTP_USER e SMTP_PASS per attivare l\'invio.',
            )
        }
    })
}
