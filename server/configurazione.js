/**
 * Unico punto in cui il server legge `process.env`.
 *
 * Confine da tenere a mente leggendo questo file: **il prefisso `VITE_` decide
 * chi vede la variabile**. Tutto ciò che si chiama `VITE_*` viene incollato da
 * Vite dentro il bundle del browser al momento della compilazione, quindi è
 * pubblico per definizione. Le credenziali SMTP non hanno quel prefisso e non
 * lo devono avere mai: restano in questo processo.
 */
import { AZIENDA } from '../src/data/site.js'

// In locale legge il file .env; in produzione le variabili arrivano dal
// pannello dell'hosting e questa chiamata non trova nulla. Node 22 la offre
// nativamente: nessuna dipendenza tipo dotenv.
try { process.loadEnvFile?.() } catch { /* nessun .env: normale in produzione */ }

const testo = (nome, ripiego = '') => (process.env[nome] ?? '').trim() || ripiego
const numero = (nome, ripiego) => {
    const v = Number.parseInt(process.env[nome] ?? '', 10)
    return Number.isFinite(v) ? v : ripiego
}
const booleano = (nome, ripiego) => {
    const v = testo(nome).toLowerCase()
    if (v === 'true' || v === '1') return true
    if (v === 'false' || v === '0') return false
    return ripiego
}

/**
 * La porta la impone l'hosting. Se il valore non è numerico è il percorso di
 * un socket unix: `listen()` accetta entrambi, quindi si passa com'è.
 */
function porta() {
    const grezza = testo('PORT', '3000')
    return /^\d+$/.test(grezza) ? Number(grezza) : grezza
}

const smtp = {
    host: testo('SMTP_HOST'),
    port: numero('SMTP_PORT', 465),
    secure: booleano('SMTP_SECURE', numero('SMTP_PORT', 465) === 465),
    user: testo('SMTP_USER'),
    pass: testo('SMTP_PASS'),
}

/** Senza uno di questi tre non si può inviare nulla. */
const postaAttiva = Boolean(smtp.host && smtp.user && smtp.pass)

/**
 * Content-Security-Policy costruita a runtime.
 *
 * Il sito non carica risorse da terze parti — i font Inter sono nel bundle —
 * quindi la politica può essere stretta. L'unica eccezione è Google Analytics,
 * che `BannerCookie.jsx` carica *dopo il consenso* solo se VITE_GA4_ID esiste:
 * una politica fissa lo spegnerebbe nel momento in cui viene attivato, e il
 * guasto sarebbe silenzioso.
 *
 * `style-src` ammette 'unsafe-inline' perché l'impaginazione approvata usa
 * attributi `style` sugli elementi, ed è così che React li rende.
 */
function politicaContenuti() {
    const conAnalytics = Boolean(testo('VITE_GA4_ID'))
    const script = ["'self'"]
    const connect = ["'self'"]
    const immagini = ["'self'", 'data:']
    if (conAnalytics) {
        script.push('https://www.googletagmanager.com')
        connect.push('https://www.google-analytics.com', 'https://*.google-analytics.com')
        immagini.push('https://www.google-analytics.com')
    }
    return [
        "default-src 'self'",
        `script-src ${script.join(' ')}`,
        `connect-src ${connect.join(' ')}`,
        `img-src ${immagini.join(' ')}`,
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
    ].join('; ')
}

export const CONFIGURAZIONE = Object.freeze({
    porta: porta(),
    host: testo('HOST', '0.0.0.0'),
    /** Cartella servita: solo il sito compilato, nient'altro del repository. */
    cartellaSito: testo('SITO_DIST', 'dist'),
    /**
     * Quanti hop di X-Forwarded-For considerare attendibili. Dietro il proxy
     * dell'hosting, senza questo `req.ip` sarebbe identico per tutti.
     */
    proxyAttendibile: numero('PROXY_ATTENDIBILE', 1),
    politicaContenuti: politicaContenuti(),
    postaAttiva,
    smtp: Object.freeze(smtp),
    lead: Object.freeze({
        // Il mittente deve essere una casella del dominio, altrimenti SPF e
        // DKIM non tornano e il messaggio finisce nello spam.
        mittente: testo('LEAD_MITTENTE', smtp.user || AZIENDA.email),
        destinatario: testo('LEAD_DESTINATARIO', AZIENDA.email),
        limiteInvii: numero('LEAD_LIMITE_INVII', 5),
        finestraMinuti: numero('LEAD_FINESTRA_MINUTI', 10),
        // Tetto complessivo, indipendente dall'IP: è la rete sotto al
        // limitatore per indirizzo, che si può aggirare falsificando l'header.
        tettoOrario: numero('LEAD_TETTO_ORARIO', 60),
    }),
})
