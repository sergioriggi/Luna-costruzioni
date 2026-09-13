import { AZIENDA } from '../data/site'
import BottoneWhatsApp from './BottoneWhatsApp'
import BottoneTelefono from './BottoneTelefono'

/** Barra di contatto sempre raggiungibile: su mobile è fissata in basso. */
export default function AzioniRapide() {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 sm:hidden">
            <div className="pointer-events-auto flex gap-2 border-t border-testo/[0.16] bg-notte/95 p-3 backdrop-blur">
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
    )
}
