import { useLocation } from 'react-router-dom'
import { linkWhatsApp, etichettaPagina } from '../lib/whatsapp'

/** L'icona sta qui perché il tasto è uno solo: prima era incollata a mano. */
export function IconaWhatsApp({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
        </svg>
    )
}

/**
 * Tasto «scrivici su WhatsApp».
 *
 * La pagina di provenienza la deduce da sola dalla rotta: il modulo di
 * contatto vive in otto pagine diverse, e chiedere a ognuna di passare
 * l'etichetta significherebbe che prima o poi qualcuna se la dimentica.
 * In pre-renderizzazione la rotta è già quella giusta, quindi il messaggio
 * è corretto anche prima che il JavaScript arrivi.
 *
 * `pagina` resta disponibile per i casi in cui l'etichetta della rotta non
 * sia quella che serve.
 */
export default function BottoneWhatsApp({
    pagina,
    className = 'bottone-secondario',
    icona = false,
    children = 'Scrivi su WhatsApp',
}) {
    const { pathname } = useLocation()
    return (
        <a
            href={linkWhatsApp(pagina ?? etichettaPagina(pathname))}
            target="_blank"
            rel="noopener"
            className={className}
        >
            {icona && <IconaWhatsApp />}
            {children}
        </a>
    )
}
