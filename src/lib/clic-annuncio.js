/**
 * Identificatore del clic sull'annuncio (`gclid`), per la conversione lato server.
 *
 * ── Perché esiste ────────────────────────────────────────────────────────
 * Il tag nel browser conta il contatto solo se riesce a partire: un blocco di
 * estensione o un browser che taglia gli identificatori lo spengono. Il server
 * Node conosce invece la verità (ha appena spedito la richiesta) e può dirlo a
 * Google Ads direttamente, ma gli serve il `gclid` del clic che ha portato la
 * persona qui. Questo file lo porta fino al modulo.
 *
 * ── Il vincolo da non rompere: il consenso ───────────────────────────────
 * Il sito dichiara (informativa privacy) che senza consenso a Google arrivano
 * solo segnali anonimi, privi di identificatori; `BannerCookie.jsx` imposta
 * `ads_data_redaction` per lo stesso motivo. Spedire il `gclid` dal server a chi
 * ha rifiutato contraddirebbe entrambe le cose. Quindi:
 *
 *  - all'arrivo il `gclid` si legge dall'indirizzo e sta solo in memoria: leggere
 *    un indirizzo non scrive nulla sul dispositivo;
 *  - si salva in `sessionStorage` (per sopravvivere ai cambi pagina) soltanto
 *    dopo «Accetta», che è memorizzazione sul dispositivo e richiede il consenso;
 *  - `gclidConsentito()` lo restituisce soltanto se la scelta salvata è
 *    «accettato» in quel momento. Chi rifiuta, o revoca, non lo manda mai.
 */
/** Dove il banner salva la scelta. Definita qui perché `BannerCookie.jsx` importa questo file. */
export const CHIAVE_CONSENSO = 'luna-consenso-cookie'

const CHIAVE_SESSIONE = 'luna-gclid'

/** Stessa forma che il server accetta (`server/convalida.js`). */
const FORMA = /^[A-Za-z0-9_-]{10,200}$/

let inMemoria = ''

function daIndirizzo() {
    try {
        const valore = new URLSearchParams(window.location.search).get('gclid') ?? ''
        return FORMA.test(valore) ? valore : ''
    } catch {
        return ''
    }
}

function consensoDato() {
    try { return localStorage.getItem(CHIAVE_CONSENSO) === 'accettato' } catch { return false }
}

/** Da chiamare all'avvio e dopo «Accetta». Idempotente. */
export function registraClicAnnuncio() {
    if (typeof window === 'undefined') return
    const nuovo = daIndirizzo()
    if (nuovo) inMemoria = nuovo
    if (inMemoria && consensoDato()) {
        try { sessionStorage.setItem(CHIAVE_SESSIONE, inMemoria) } catch { /* ignorato */ }
    }
}

/** Il `gclid` da spedire col modulo, o stringa vuota se non c'è o manca il consenso. */
export function gclidConsentito() {
    if (typeof window === 'undefined' || !consensoDato()) return ''
    if (inMemoria) return inMemoria
    try {
        const salvato = sessionStorage.getItem(CHIAVE_SESSIONE) ?? ''
        return FORMA.test(salvato) ? salvato : ''
    } catch {
        return ''
    }
}

/** Alla revoca del consenso: dimentica tutto. */
export function dimenticaClicAnnuncio() {
    inMemoria = ''
    try { sessionStorage.removeItem(CHIAVE_SESSIONE) } catch { /* ignorato */ }
}
