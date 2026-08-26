import { AZIENDA } from '../data/site'

/** Barra di contatto sempre raggiungibile: su mobile è fissata in basso. */
export default function AzioniRapide() {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 sm:hidden">
            <div className="pointer-events-auto flex gap-2 border-t border-testo/[0.16] bg-notte/95 p-3 backdrop-blur">
                <a
                    href={`https://wa.me/${AZIENDA.whatsapp}?text=${encodeURIComponent(
                        'Buongiorno, vorrei informazioni su una Piscina Rocks Design.',
                    )}`}
                    target="_blank"
                    rel="noopener"
                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-notte shadow-lg"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
                    </svg>
                    WhatsApp
                </a>
                <a
                    href={`tel:${AZIENDA.telefonoRaw}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accento px-5 py-3 text-sm font-semibold text-notte shadow-lg"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M6.6 3h3l1.5 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" strokeLinejoin="round" />
                    </svg>
                    {AZIENDA.telefono}
                </a>
            </div>
        </div>
    )
}
