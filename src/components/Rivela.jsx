import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * `useLayoutEffect` sul client, `useEffect` sul server: il primo non esiste
 * nel rendering statico e React avviserebbe a ogni pagina pre-renderizzata.
 */
const useEffettoDiLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Comparsa progressiva alla prima entrata in viewport.
 *
 * ── LA REGOLA CHE NON VA VIOLATA ─────────────────────────────────────────
 * Ciò che sta SOPRA LA PIEGA non viene mai nascosto. Mai, per nessun ordine
 * di arrivo delle risorse, nemmeno per un fotogramma. Il markup
 * pre-renderizzato si vede alla prima pittura ed è lì che il browser registra
 * l'LCP.
 *
 * ── Due tentativi, e perché il secondo non bastava ───────────────────────
 * 1. All'inizio `.rivela { opacity: 0 }` valeva sempre. Senza JavaScript il
 *    contenuto restava invisibile per sempre, e l'elemento più grande sopra la
 *    piega di ogni pagina interna aspettava il bundle: l'LCP dipendeva dal
 *    JavaScript.
 * 2. Poi le regole sono passate sotto `.js-anima`, una classe che `main.jsx`
 *    metteva sulla radice un istante prima di idratare. Sembrava risolto —
 *    senza JavaScript niente si nasconde — ma restava una finestra: fra
 *    l'aggiunta della classe e l'effetto di layout che rimetteva `visibile`,
 *    TUTTI gli elementi erano a `opacity: 0`. Se il browser dipinge in quella
 *    finestra, e succede quando il bundle arriva presto rispetto al CSS, la
 *    prima pittura trova il testo invisibile e l'LCP slitta. Misurato: il
 *    paragrafo di apertura di /quanto-costa portava 280-490 ms di «element
 *    render delay» pur essendo testo statico già presente nell'HTML.
 *
 * ── Come funziona adesso ─────────────────────────────────────────────────
 * Il verso è rovesciato: il CSS non nasconde nulla da solo, ed è questo
 * componente ad aggiungere `nascosta` — soltanto a ciò che al momento del
 * montaggio sta già fuori dal viewport. Sopra la piega non tocca niente,
 * quindi la finestra pericolosa non esiste più: non c'è un istante in cui quel
 * contenuto possa essere invisibile.
 *
 * Conseguenze volute:
 *  - senza JavaScript tutto è visibile, perché le classi le mette il JS;
 *  - con `prefers-reduced-motion: reduce` non si anima niente, perché non si
 *    aggiunge nessuna classe (il CSS ha comunque una seconda cintura);
 *  - ciò che si anima è fuori campo mentre passa da invisibile a visibile,
 *    quindi il passaggio non si vede e non produce sfarfallio.
 */
export default function Rivela({ as: Tag = 'div', delay = 0, className = '', children, ...resto }) {
    const ref = useRef(null)

    /**
     * `ferma` → nessuna classe: visibile, nessuna transizione. È lo stato del
     *   markup pre-renderizzato e quello di tutto ciò che sta sopra la piega.
     * `nascosta` → invisibile e in attesa di entrare.
     * `entrata` → visibile, con la transizione ancora dichiarata.
     *
     * `anima` sopravvive a `nascosta`: se la transizione sparisse insieme alla
     * classe, l'elemento comparirebbe di scatto invece di entrare.
     */
    const [stato, setStato] = useState('ferma')

    useEffettoDiLayout(() => {
        const el = ref.current
        if (!el) return

        // Sopra la piega: si lascia stare. È la riga che protegge l'LCP.
        if (el.getBoundingClientRect().top < (window.innerHeight || 0)) return

        if (typeof IntersectionObserver === 'undefined') return
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

        setStato('nascosta')
        const osservatore = new IntersectionObserver(
            voci => {
                for (const v of voci) {
                    if (v.isIntersecting) {
                        setStato('entrata')
                        osservatore.disconnect()
                    }
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
        )
        osservatore.observe(el)
        return () => osservatore.disconnect()
    }, [])

    const classi = stato === 'nascosta' ? 'rivela nascosta anima' : stato === 'entrata' ? 'rivela anima' : 'rivela'

    return (
        <Tag
            ref={ref}
            className={`${classi} ${className}`}
            style={delay && stato !== 'ferma' ? { transitionDelay: `${delay}ms` } : undefined}
            {...resto}
        >
            {children}
        </Tag>
    )
}
