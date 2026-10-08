import { useEffect, useRef, useState } from 'react'
import { AZIENDA } from '../data/site'
import BottoneWhatsApp from './BottoneWhatsApp'
import BottoneTelefono from './BottoneTelefono'

/**
 * Barra di contatto fissata in basso, solo su telefono.
 *
 * Entra dopo i primi 60% di schermo scorsi, non prima: all'apertura i
 * pulsanti sono già nella pagina, e la barra copriva il «Chiedi un
 * preventivo» dell'apertura insieme al banner dei cookie.
 *
 * Il «quando» lo decide un IntersectionObserver su un segnaposto invisibile
 * alto 60vh in cima al documento: la barra entra quando il segnaposto esce
 * dallo schermo. Niente ascoltatore su `scroll`, che girerebbe a ogni
 * fotogramma di scorrimento. Nell'HTML
 * pre-renderizzato parte nascosta (fuori schermo con `transform`, quindi
 * senza spostare nulla: niente CLS) e resta raggiungibile da tastiera e da
 * lettore di schermo solo quando è visibile.
 */
export default function AzioniRapide() {
    const [visibile, setVisibile] = useState(false)
    const soglia = useRef(null)

    useEffect(() => {
        if (!soglia.current || typeof IntersectionObserver === 'undefined') return
        const osservatore = new IntersectionObserver(([voce]) => setVisibile(!voce.isIntersecting))
        osservatore.observe(soglia.current)
        return () => osservatore.disconnect()
    }, [])

    return (
        <>
        {/* Segnaposto: in cima al documento (il genitore non è posizionato), alto 60vh. */}
        <div ref={soglia} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[60vh] w-px" />
        <div
            className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 sm:hidden ${visibile ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
            aria-hidden={!visibile}
            inert={visibile ? undefined : true}
        >
            <div className="flex gap-2 border-t border-testo/[0.16] bg-notte/95 p-3 backdrop-blur">
                <BottoneWhatsApp
                    icona
                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-notte shadow-lg"
                >
                    WhatsApp
                </BottoneWhatsApp>
                <BottoneTelefono className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accento px-5 py-3 text-sm font-semibold text-notte shadow-lg">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M6.6 3h3l1.5 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" strokeLinejoin="round" />
                    </svg>
                    {AZIENDA.telefono}
                </BottoneTelefono>
            </div>
        </div>
        </>
    )
}
