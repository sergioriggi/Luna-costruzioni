import Rivela from './Rivela'
import { RECENSIONI } from '../data/content'
import { Sezione, IntestazioneSezione } from './Sezione'

/**
 * Recensioni dei clienti.
 *
 * La sezione compare solo se in `src/data/content.js` sono state inserite
 * recensioni reali e verificabili. Nessun testo di esempio, nessuna
 * testimonianza di comodo: finché l'elenco è vuoto, la sezione non esiste.
 */
export default function Recensioni() {
    if (RECENSIONI.length === 0) return null

    return (
        <Sezione sfondo="bg-superficie">
            <IntestazioneSezione
                allineamento="centro"
                occhiello="Dicono di noi"
                titolo="Chi ci ha già affidato il proprio giardino"
            />
            <ul className="mt-12 grid gap-6 lg:grid-cols-3">
                {RECENSIONI.map((r, i) => (
                    <Rivela as="li" key={`${r.autore}-${i}`} delay={i * 90} className="scheda flex flex-col">
                        <svg viewBox="0 0 24 24" className="h-7 w-7 text-accento-300" fill="currentColor" aria-hidden="true">
                            <path d="M9 7H5.5A2.5 2.5 0 0 0 3 9.5V13h4v4H4a5 5 0 0 0 5-5V7Zm11 0h-3.5A2.5 2.5 0 0 0 14 9.5V13h4v4h-3a5 5 0 0 0 5-5V7Z" />
                        </svg>
                        <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-neutro-300">
                            {r.testo}
                        </blockquote>
                        <footer className="mt-5 border-t border-testo/[0.16] pt-4 text-sm">
                            <p className="font-semibold text-testo">{r.autore}</p>
                            <p className="text-neutro-500">
                                {[r.luogo, r.fonte, r.data].filter(Boolean).join(' · ')}
                            </p>
                        </footer>
                    </Rivela>
                ))}
            </ul>
        </Sezione>
    )
}
