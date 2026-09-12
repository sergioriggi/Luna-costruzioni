/**
 * Segnalazione della conversione a Google Ads.
 *
 * ── Perché non sulla pagina «Grazie» ─────────────────────────────────────
 * La strada comoda sarebbe far scattare l'evento al caricamento di `/grazie`.
 * Ma quell'indirizzo si può digitare a mano — un collaudo l'ha verificato — e
 * chiunque ci arrivi senza aver inviato niente verrebbe contato. Con l'offerta
 * automatica, conversioni finte non sono un numero sbagliato in un rapporto:
 * sono il criterio su cui Google decide come spendere i soldi.
 *
 * L'evento parte quindi dall'unico punto che conosce la verità: il ritorno di
 * `inviaLead()` quando il servizio ha confermato di aver preso la richiesta.
 *
 * ── Due silenzi voluti ───────────────────────────────────────────────────
 * 1. Senza `VITE_GOOGLE_ADS_CONVERSIONE` non succede nulla. L'etichetta si
 *    copia dal pannello Ads quando si crea l'azione di conversione; finché non
 *    c'è, il sito costruisce i pubblici ma non conta i contatti.
 * 2. Senza consenso `window.gtag` non esiste — il tag si carica solo dopo
 *    «Accetta» (`src/components/BannerCookie.jsx`) — e l'evento non parte.
 *    Conseguenza da mettere in conto: i numeri di Ads saranno **più bassi**
 *    delle richieste che arrivano in casella. È il banner che fa il suo
 *    mestiere, non un guasto.
 */

/** Formato atteso: `AW-XXXXXXXXXX/EtichettaDellaConversione`. */
const CONVERSIONE = import.meta.env.VITE_GOOGLE_ADS_CONVERSIONE || ''

/**
 * Valore attribuito a una richiesta, in euro.
 *
 * `1` è il segnaposto che genera Google, e con tutte le conversioni dello
 * stesso valore equivale a contarle: innocuo. Diventa importante il giorno che
 * si passa a un'offerta «massimizza il valore», perché lì Google spende in
 * proporzione a questo numero. Allora va messo il valore vero di un contatto —
 * non il prezzo della piscina, ma quanto vale *in media* una richiesta, cioè il
 * margine per la quota che si trasforma in cantiere.
 */
const VALORE = Number(import.meta.env.VITE_GOOGLE_ADS_VALORE || 1)

export function segnalaConversione() {
    if (!CONVERSIONE) return false
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false

    try {
        window.gtag('event', 'conversion', {
            send_to: CONVERSIONE,
            value: VALORE,
            currency: 'EUR',
        })
        return true
    } catch {
        // Misurare non deve mai rompere l'invio: un contatto vale più di un
        // conteggio, e qui siamo già dopo la conferma del servizio.
        return false
    }
}
