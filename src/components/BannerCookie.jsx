import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLingua } from '../i18n/lingua'

export const CHIAVE = 'luna-consenso-cookie'

/**
 * Banner cookie in **Consent Mode v2, modalità avanzata**.
 *
 * ATTENZIONE: fino al 26 settembre 2026 questo file faceva l'opposto, e il
 * commento che stava qui lo dichiarava con orgoglio — «nessuno script di
 * misurazione viene caricato prima del consenso». Non è più vero, ed è un
 * cambio voluto. Chi legge questo file cercando la vecchia garanzia deve
 * trovare scritto perché non c'è più.
 *
 * ── Che cosa non funzionava ───────────────────────────────────────────────
 * Il tag partiva solo dopo «Accetta». Chi sceglieva «Solo necessari» non
 * veniva misurato affatto: nemmeno un segnale anonimo. In trenta giorni Ads ha
 * contato 62 clic e GA4 circa 19 visite a pagamento — la misura non vedeva
 * circa due visite su tre. Con un buco così i dati non bastano a giudicare la
 * campagna: non si può dire che vada male, né che vada bene. Le zero
 * conversioni vanno lette così, e l'offerta automatica non aveva su cosa
 * imparare.
 *
 * ── Come funziona adesso ──────────────────────────────────────────────────
 * `caricaTag()` parte a OGNI caricamento, con il consenso **negato per
 * difetto**. Chi rifiuta resta senza un solo cookie: Google riceve ping
 * anonimi — senza identificatori, senza stato fra una visita e l'altra — e da
 * quelli stima le conversioni. Il banner non decide più *se* caricare il tag:
 * decide solo se portare il consenso a `granted`.
 *
 * ── Il cambio di postura, detto per intero ────────────────────────────────
 * Un file di Google ora parte a ogni visita. Senza cookie, ma con l'indirizzo
 * IP e l'URL della pagina. L'art. 5(3) ePrivacy riguarda la memorizzazione sul
 * dispositivo, e un ping senza cookie non memorizza nulla; il trattamento
 * dell'IP resta però un trattamento. È la configurazione raccomandata da
 * Google e largamente diffusa in UE, ed è una scelta del cliente. Le due
 * informative (`src/pages/Cookie.jsx`, `src/pages/Privacy.jsx`) la dichiarano:
 * se si torna indietro su questo file, vanno rimesse a posto anche quelle.
 *
 * Ogni strumento nuovo — Meta Pixel, o altro — va dentro `caricaTag()` e da
 * nessun'altra parte, e va aggiunto all'elenco delle due informative.
 */
export default function BannerCookie() {
    const [visibile, setVisibile] = useState(false)
    const { t } = useLingua()

    /**
     * Ordine obbligatorio: prima si carica il tag, poi si guarda la scelta.
     *
     * Non è una preferenza di stile. Il consenso predefinito deve finire in
     * `dataLayer` prima che `gtag.js` esegua i `config`, altrimenti il tag
     * funziona e il consenso viene ignorato — e non si vede da nessuna parte.
     *
     * La scelta salvata va riapplicata a ogni caricamento: era già un difetto
     * risolto una volta (chi aveva acconsentito in una visita precedente
     * tornava senza `gtag`, quindi senza conversione al ritorno dal modulo:
     * proprio il percorso di chi clicca l'annuncio, guarda, se ne va e torna).
     * Adesso il tag c'è comunque, ma senza questa riga tornerebbe in stato
     * negato a chi aveva detto sì.
     */
    useEffect(() => {
        caricaTag()
        try {
            const scelta = localStorage.getItem(CHIAVE)
            if (!scelta) setVisibile(true)
            else if (scelta === 'accettato') concediConsenso()
        } catch {
            /* storage non disponibile: il tag resta in stato negato */
        }
    }, [])

    const decidi = scelta => {
        try { localStorage.setItem(CHIAVE, scelta) } catch { /* ignorato */ }
        setVisibile(false)
        // «rifiutato» non chiama niente: il consenso è già negato per difetto.
        if (scelta === 'accettato') concediConsenso()
    }

    if (!visibile) return null

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label={t('Preferenze cookie', 'Cookie preferences')}
            className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-2xl rounded-lg border border-testo/[0.16] bg-superficie p-5 shadow-morbida sm:bottom-6 sm:inset-x-6"
        >
            <p className="text-sm leading-relaxed text-neutro-400">
                {t(
                    'Usiamo cookie tecnici necessari al funzionamento del sito. Il tag di Google è attivo in modalità anonima: senza il tuo consenso non installa cookie. Con «Accetta» attiviamo i cookie di Google Ads e Analytics, che ci dicono quali annunci portano richieste.',
                    'We use technical cookies required for the site to work. Google’s tag runs in anonymous mode: without your consent it sets no cookies. With “Accept” we enable the Google Ads and Analytics cookies, which tell us which ads bring enquiries.',
                )}{' '}
                <Link to="/cookie-policy" className="link-sottile font-medium text-testo">
                    {t('Cookie policy', 'Cookie policy')}
                </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => decidi('accettato')} className="bottone-primario px-5 py-2.5">
                    {t('Accetta', 'Accept')}
                </button>
                <button type="button" onClick={() => decidi('rifiutato')} className="bottone-secondario px-5 py-2.5">
                    {t('Solo necessari', 'Necessary only')}
                </button>
            </div>
        </div>
    )
}

/** I due identificatori configurati. Vuoto in locale e in anteprima. */
function identificatori() {
    return [import.meta.env.VITE_GOOGLE_ADS_ID, import.meta.env.VITE_GA4_ID].filter(Boolean)
}

/**
 * Carica `gtag.js` con il consenso NEGATO. Parte a ogni caricamento.
 *
 * ── L'ordine è la cosa più importante di tutto il file ────────────────────
 * `gtag('consent','default',…)` deve stare in `dataLayer` PRIMA che `gtag.js`
 * arrivi a eseguire i `config`. Qui si ottiene spingendo il comando nella coda
 * e iniettando lo script **dopo**: quando lo script parte, il comando c'è già.
 *
 * Il codice precedente iniettava lo script per primo e creava `dataLayer`
 * dopo. Funzionava per caso — `gtag.js` crea la coda da sé se manca — ma con
 * il consenso in gioco quell'ordine produrrebbe un guasto invisibile: tag
 * attivo, consenso ignorato, cookie scritti a chi ha detto no. Non
 * riordinare queste righe.
 *
 * `wait_for_update: 500` dà mezzo secondo a un eventuale `update` prima che
 * partano i ping: serve a chi ha già acconsentito, perché il suo `granted`
 * arriva pochi istanti dopo, nello stesso effetto.
 *
 * `ads_data_redaction: true` rimuove l'identificatore del clic (`gclid`) dai
 * ping quando il consenso è negato. È una scelta esplicita: meno segnale per
 * la modellazione delle conversioni, meno dati trasmessi. Metterlo a `false`
 * darebbe a Google un'attribuzione più precisa anche senza consenso, e
 * andrebbe dichiarato diversamente nell'informativa.
 *
 * `url_passthrough: true` fa sopravvivere `gclid` fra le pagine passandolo
 * negli indirizzi, dato che senza cookie non c'è dove tenerlo.
 */
function caricaTag() {
    if (typeof window === 'undefined' || window.__misurazioneAttiva) return

    const ids = identificatori()
    if (ids.length === 0) return

    window.__misurazioneAttiva = true

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }

    window.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500,
    })
    window.gtag('set', 'ads_data_redaction', true)
    window.gtag('set', 'url_passthrough', true)

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`
    document.head.appendChild(s)

    window.gtag('js', new Date())
    for (const id of ids) {
        // `anonymize_ip` è un residuo di Universal Analytics: GA4 anonimizza
        // sempre e un ID Ads lo ignora. Innocuo, tenuto per continuità.
        window.gtag('config', id, { anonymize_ip: true })
    }
}

/**
 * Porta il consenso a concesso. Chiamata dal banner e al ritorno di chi aveva
 * già acconsentito.
 *
 * La guardia `__misurazioneAttiva` protegge `caricaTag()` e **non** questa: se
 * le coprisse entrambe, il consenso dato cliccando «Accetta» non passerebbe
 * mai, perché a quel punto il tag è già caricato. Qui basta controllare che
 * `gtag` esista: senza identificatori configurati non è stato definito.
 */
export function concediConsenso() {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
    })
}

/**
 * Torna allo stato negato. Usata dal tasto di revoca nella cookie policy.
 *
 * L'`update` da solo non basta e crederlo sarebbe il difetto: non cancella
 * niente di ciò che è già sul dispositivo. La cancellazione dei cookie sta in
 * `src/components/RevocaConsenso.jsx`, insieme al resto dell'operazione.
 */
export function negaConsenso() {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
    })
}
