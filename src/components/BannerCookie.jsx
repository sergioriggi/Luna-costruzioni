import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CHIAVE = 'luna-consenso-cookie'

/**
 * Banner cookie minimale e conforme: nessuno script di misurazione viene
 * caricato prima del consenso esplicito. Se in futuro si aggiungono GA4 o
 * Meta Pixel, vanno inizializzati dentro `attivaMisurazione()`.
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
                strumenti di misurazione anonima per capire quali contenuti sono più utili.{' '}
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

/** Punto unico di attivazione degli script di misurazione (oggi nessuno). */
function attivaMisurazione() {
    const id = import.meta.env.VITE_GA4_ID
    if (!id || typeof window === 'undefined' || window.__ga4Attivo) return

    window.__ga4Attivo = true
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', id, { anonymize_ip: true })
}
