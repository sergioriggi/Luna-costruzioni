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
 * L'evento del modulo parte quindi dall'unico punto che conosce la verità: il
 * ritorno di `inviaLead()` quando il servizio ha confermato di aver preso la
 * richiesta. I clic su «chiama» e su WhatsApp partono invece dai due componenti
 * che li rendono — `BottoneTelefono` e `BottoneWhatsApp` — al momento del clic:
 * lì la verità è il clic stesso.
 *
 * ── Due silenzi voluti ───────────────────────────────────────────────────
 * 1. Senza l'etichetta dell'azione non succede nulla. Si copia dal pannello Ads
 *    quando si crea l'azione di conversione; finché non c'è, il sito costruisce
 *    i pubblici ma non conta quel contatto.
 * 2. Senza consenso `window.gtag` non esiste — il tag si carica solo dopo
 *    «Accetta» (`src/components/BannerCookie.jsx`) — e l'evento non parte.
 *    Conseguenza da mettere in conto: i numeri di Ads saranno **più bassi**
 *    delle richieste che arrivano in casella. È il banner che fa il suo
 *    mestiere, non un guasto.
 */

/**
 * Le tre azioni di conversione, formato `AW-XXXXXXXXXX/Etichetta`.
 *
 * Scritte una per una e non lette da una mappa dinamica: Vite sostituisce
 * `import.meta.env.VITE_QUALCOSA` alla compilazione solo se il nome è
 * letterale. `import.meta.env[nome]` non verrebbe sostituito e resterebbe
 * vuoto in produzione — un guasto che in sviluppo non si vede.
 */
const AZIONI = {
    modulo: import.meta.env.VITE_GOOGLE_ADS_CONVERSIONE || '',
    whatsapp: import.meta.env.VITE_GOOGLE_ADS_CONVERSIONE_WHATSAPP || '',
    telefono: import.meta.env.VITE_GOOGLE_ADS_CONVERSIONE_TELEFONO || '',
}

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

/**
 * Il valore in euro accompagna **solo** l'invio del modulo. Un clic su
 * «chiama» o su WhatsApp non è una conversazione avvenuta: su mobile capita
 * spesso di aprire e riattaccare. Dichiararlo con lo stesso valore di una
 * richiesta arrivata in casella direbbe a Google che valgono uguale, e
 * un'offerta basata sul valore comincerebbe a comprare clic invece di
 * contatti. Restano conversioni — si contano — ma senza prezzo.
 *
 * Per lo stesso motivo, nel pannello Ads conviene tenere **primaria solo**
 * l'azione del modulo: è l'unica su cui l'offerta automatica deve imparare.
 * Quella è una spunta nel pannello, non una riga di codice.
 *
 * @param {'modulo'|'whatsapp'|'telefono'} azione
 */
export function segnalaConversione(azione = 'modulo') {
    const invio = AZIONI[azione]
    if (!invio) return false
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false

    try {
        window.gtag('event', 'conversion', {
            send_to: invio,
            ...(azione === 'modulo' ? { value: VALORE, currency: 'EUR' } : {}),
        })
        return true
    } catch {
        // Misurare non deve mai rompere un contatto: né l'invio del modulo, né
        // l'apertura del telefono o di WhatsApp.
        return false
    }
}
