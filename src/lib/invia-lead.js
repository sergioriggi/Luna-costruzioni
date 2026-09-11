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
 *
 * ── Web3Forms ────────────────────────────────────────────────────────────
 * Su hosting statico non esiste nessun server nostro, quindi il modulo
 * ripiegava sempre sul client di posta: il visitatore doveva ricordarsi di
 * premere Invia, e chi non lo faceva si perdeva. Web3Forms chiude il giro
 * senza server: il browser posta direttamente da loro, e loro inoltrano a
 * `info@lunacostruzioni.it`.
 *
 * La chiave è pubblica **per progetto**: sta nel bundle, e la loro
 * documentazione raccomanda proprio l'uso dal browser. Non è una password —
 * è un indirizzo di consegna. Sul piano gratuito però non si può limitare a
 * un dominio, quindi chi la legge nel sorgente può usarla per far arrivare
 * messaggi a Luciano: l'honeypot qui sotto e il loro filtro antispam sono
 * ciò che regge. Se un giorno arrivasse spam vero, si aggiunge Turnstile.
 *
 * Senza chiave non cambia niente: si torna al percorso di prima.
 */

/** Override storico, per chi avesse già configurato un servizio esterno. */
const ENDPOINT = import.meta.env.VITE_ENDPOINT_LEAD || '/api/contatti'

const CHIAVE_WEB3FORMS = import.meta.env.VITE_WEB3FORMS_KEY || ''
const WEB3FORMS = 'https://api.web3forms.com/submit'

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
 * Invio tramite Web3Forms.
 *
 * I nomi dei campi restano i nostri, in italiano: finiscono così com'è nel
 * corpo dell'e-mail che riceve Luciano, e «telefono» si legge meglio di
 * «phone». I campi riservati del servizio sono solo quelli qui dichiarati.
 *
 * `replyto` è la ragione per cui questo vale la pena: Luciano apre il
 * messaggio e risponde, e la risposta va al cliente invece che a noi.
 */
async function inviaConWeb3Forms(dati, oggetto) {
    const carico = {
        access_key: CHIAVE_WEB3FORMS,
        subject: oggetto,
        from_name: 'Sito lunacostruzioni.it',
        replyto: dati.email,
        // honeypot del servizio, in aggiunta al nostro campo `sito`
        botcheck: '',

        nome: dati.nome,
        email: dati.email,
        telefono: dati.telefono,
        provincia: dati.provincia,
        comune: dati.comune,
        interesse: dati.interesse,
        tipologia: dati.tipo ?? dati.tipologia,
        dimensione: dati.dimensione,
        budget: dati.budget,
        messaggio: dati.messaggio,
        pagina: typeof window !== 'undefined' ? window.location.pathname : '',
    }

    const risposta = await fetch(WEB3FORMS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(carico),
    })

    // Il servizio risponde 200 anche quando rifiuta: l'esito sta in `success`.
    const esito = await risposta.json().catch(() => null)
    return risposta.ok && esito?.success === true
}

/**
 * @returns {Promise<'inviato'|'mailto'|'errore'>}
 *   `mailto` significa che il client di posta è già stato aperto.
 */
export async function inviaLead(dati, { oggetto = 'Richiesta dal sito Luna Costruzioni' } = {}) {
    if (CHIAVE_WEB3FORMS) {
        /*
         * Qualunque cosa vada storta — rete assente, blocco di un'estensione
         * per la privacy (api.web3forms.com è nelle liste di parecchie), quota
         * finita, chiave revocata — si ripiega sul client di posta invece di
         * mostrare un errore. Vale il principio di sempre: il contatto non si
         * perde, e non gli si dice «ricevuta» se ricevuta non è.
         */
        let riuscito = false
        try {
            riuscito = await inviaConWeb3Forms(dati, oggetto)
        } catch {
            riuscito = false
        }
        if (riuscito) return INVIATO
        apriClientDiPosta(dati, oggetto)
        return RIPIEGO_POSTA
    }

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
