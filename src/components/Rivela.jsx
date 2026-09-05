import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * `useLayoutEffect` sul client, `useEffect` sul server: il primo non esiste
 * nel rendering statico e React avviserebbe a ogni pagina pre-renderizzata.
 */
const useEffettoDiLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Comparsa progressiva alla prima entrata in viewport.
 *
 * ── Perché non è più `opacity: 0` da subito ──────────────────────────────
 * Lo era, e il commento diceva «no-op senza JS»: falso. Senza JavaScript, o
 * finché il bundle non è arrivato, il contenuto restava invisibile per
 * sempre. Su tutte le pagine interne l'elemento più grande sopra la piega —
 * titolo, testo di apertura, immagine — era dentro un `Rivela`, quindi il
 * momento in cui la pagina *sembra* caricata dipendeva dal JavaScript. È
 * esattamente ciò che la metrica LCP misura, e la penalizzava.
 *
 * Ora l'ordine è rovesciato:
 *  - il markup statico non nasconde niente, quindi la prima pittura mostra
 *    già tutto e chi non ha JavaScript vede il sito intero;
 *  - `main.jsx` aggiunge `js-anima` alla radice appena prima di idratare,
 *    ed è solo da quel momento che le regole di comparsa esistono;
 *  - quello che è già in viewport viene marcato visibile in un effetto di
 *    *layout*, cioè prima della pittura successiva: nessun lampeggio.
 * Solo ciò che sta sotto la piega si anima davvero, ed è fuori campo mentre
 * passa da invisibile a visibile.
 *
 * `subito` salta del tutto l'animazione, per i blocchi che si sa stare in
 * cima alla pagina.
 */
export default function Rivela({ as: Tag = 'div', delay = 0, subito = false, className = '', children, ...resto }) {
    const ref = useRef(null)
    const [visibile, setVisibile] = useState(subito)

    useEffettoDiLayout(() => {
        if (subito || visibile) return
        const el = ref.current
        if (!el) return

        // Già in viewport: visibile prima della pittura, senza transizione.
        const rettangolo = el.getBoundingClientRect()
        if (rettangolo.top < (window.innerHeight || 0)) {
            setVisibile(true)
            return
        }

        if (typeof IntersectionObserver === 'undefined') {
            setVisibile(true)
            return
        }
        const osservatore = new IntersectionObserver(
            voci => {
                for (const v of voci) {
                    if (v.isIntersecting) {
                        setVisibile(true)
                        osservatore.disconnect()
                    }
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
        )
        osservatore.observe(el)
        return () => osservatore.disconnect()
    }, [subito, visibile])

    return (
        <Tag
            ref={ref}
            className={`rivela ${visibile ? 'visibile' : ''} ${className}`}
            style={delay && !visibile ? { transitionDelay: `${delay}ms` } : undefined}
            {...resto}
        >
            {children}
        </Tag>
    )
}
