import { AZIENDA } from '../data/site'

/**
 * Invio di una richiesta di contatto.
 *
 * Punto unico per entrambi i moduli del sito. Prima di questo file la logica
 * era duplicata, con due corpi di messaggio diversi e due ripieghi diversi.
 *
 * ── Perché lo stesso bundle funziona su due hosting ──────────────────────
 * L'endpoint predefinito è `/api/contatti`, sulla stessa origine. Sul server
 * Node quell'indirizzo esiste e invia davvero l'e-mail. Sull'hosting statico
 * Apache non esiste: non è un file e non è una directory, quindi la
 * RewriteRule non si applica e la risposta è **404**. Qui il 404 viene
 * interpretato come «nessun server dietro» e si ripiega sul client di posta —
 * cioè esattamente il comportamento che il sito ha oggi.
 *
 * Vale lo stesso per il **503** che il server Node restituisce quando le
 * credenziali SMTP non sono configurate: il contatto non si perde mai.
 */

/** Override storico, per chi avesse già configurato un servizio esterno. */
const ENDPOINT = import.meta.env.VITE_ENDPOINT_LEAD || '/api/contatti'

/** Esiti possibili: il chiamante decide cosa mostrare. */
export const INVIATO = 'inviato'
export const RIPIEGO_POSTA = 'mailto'
export const ERRORE = 'errore'

function apriClientDiPosta(dati, oggetto) {
    const riga = (etichetta, valore) => (valore ? `${etichetta}: ${valore}` : null)
    const corpo = [
        riga('Nome', dati.nome),
        riga('E-mail', dati.email),
        riga('Telefono', dati.telefono),
        riga('Comune', dati.comune),
        riga('Provincia', dati.provincia),
        riga('Tipo di progetto', dati.tipo ?? dati.tipologia),
        riga('Interesse', dati.interesse),
        riga('Dimensione', dati.dimensione),
        riga('Budget', dati.budget),
        '',
        dati.messaggio || '',
    ]
        .filter(v => v !== null)
        .join('\n')

    window.location.href =
        `mailto:${AZIENDA.email}` +
        `?subject=${encodeURIComponent(oggetto)}` +
        `&body=${encodeURIComponent(corpo)}`
}

/**
 * @returns {Promise<'inviato'|'mailto'|'errore'>}
 *   `mailto` significa che il client di posta è già stato aperto.
 */
export async function inviaLead(dati, { oggetto = 'Richiesta dal sito Luna Costruzioni' } = {}) {
    const carico = {
        ...dati,
        sito: undefined,
        origine: typeof window !== 'undefined' ? window.location.pathname : '',
    }

    let risposta
    try {
        risposta = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(carico),
        })
    } catch {
        return ERRORE // rete assente o richiesta bloccata
    }

    if (risposta.ok) return INVIATO

    // 404: nessun server dietro (hosting statico). 503: server presente ma
    // senza credenziali SMTP. In entrambi i casi il contatto va salvato.
    if (risposta.status === 404 || risposta.status === 503) {
        apriClientDiPosta(dati, oggetto)
        return RIPIEGO_POSTA
    }

    return ERRORE
}
