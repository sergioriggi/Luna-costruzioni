import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CHIAVE = 'luna-consenso-cookie'

/**
 * Banner cookie minimale e conforme: nessuno script di misurazione né di
 * pubblicità viene caricato prima del consenso esplicito. Ogni strumento
 * nuovo — Meta Pixel, o altro — va inizializzato dentro `attivaMisurazione()`
 * e da nessun'altra parte.
 */
export default function BannerCookie() {
    const [visibile, setVisibile] = useState(false)

    useEffect(() => {
        try {
            if (!localStorage.getItem(CHIAVE)) setVisibile(true)
        } catch {
            /* storage non disponibile: non mostriamo nulla */
        }
    }, [])

    const decidi = scelta => {
        try { localStorage.setItem(CHIAVE, scelta) } catch { /* ignorato */ }
        setVisibile(false)
        if (scelta === 'accettato') attivaMisurazione()
    }

    if (!visibile) return null

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Preferenze cookie"
            className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-2xl rounded-lg border border-testo/[0.16] bg-superficie p-5 shadow-morbida sm:bottom-6 sm:inset-x-6"
        >
            <p className="text-sm leading-relaxed text-neutro-400">
                Usiamo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso attiviamo anche
                i cookie di Google Ads, che ci dicono quali annunci portano richieste e permettono di
                ripresentarti i nostri.{' '}
                <Link to="/cookie-policy" className="link-sottile font-medium text-testo">Cookie policy</Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => decidi('accettato')} className="bottone-primario px-5 py-2.5">
                    Accetta
                </button>
                <button type="button" onClick={() => decidi('rifiutato')} className="bottone-secondario px-5 py-2.5">
                    Solo necessari
                </button>
            </div>
        </div>
    )
}

/**
 * Punto unico di attivazione degli script di misurazione e pubblicità.
 *
 * `gtag.js` si carica **una volta sola** e poi si configura per ciascun
 * identificatore: è così che è fatto. Oggi c'è Google Ads; il giorno che
 * arriva anche Analytics convivono senza toccare altro.
 *
 * Perché qui e non in `index.html`, dove lo snippet di Google dice di
 * incollarlo: nella pagina partirebbe al primo caricamento, cioè **prima**
 * del consenso. Per cookie pubblicitari non si può.
 */
function attivaMisurazione() {
    if (typeof window === 'undefined' || window.__misurazioneAttiva) return

    const identificatori = [
        import.meta.env.VITE_GOOGLE_ADS_ID,
        import.meta.env.VITE_GA4_ID,
    ].filter(Boolean)
    if (identificatori.length === 0) return

    window.__misurazioneAttiva = true
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${identificatori[0]}`
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    for (const id of identificatori) {
        // `anonymize_ip` vale per Analytics; su un ID Ads è ignorato.
        window.gtag('config', id, { anonymize_ip: true })
    }
}
