import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Instradamento del sito, in poche righe.
 *
 * Prima c'era react-router: circa 90 KB di sorgente nel bundle di ogni pagina,
 * per usarne sette nomi — Link, Navigate, useParams, useLocation, useNavigate,
 * Routes/Route e i due router. Questo modulo esporta gli stessi nomi con lo
 * stesso comportamento per l'uso che ne fa il sito, e nient'altro:
 *
 *  - percorsi assoluti con segmenti `:parametro` e il jolly `*`;
 *  - le rotte si confrontano NELL'ORDINE in cui sono scritte (react-router le
 *    ordinava per specificità: qui la rotta statica va messa prima di quella
 *    con il parametro, come già è in App.jsx);
 *  - la navigazione usa `history.pushState`, quindi la misurazione avanzata
 *    di GA4 vede i cambi di pagina come prima;
 *  - il cambio di rotta avviene dentro `startTransition`: se la pagina nuova
 *    sta ancora scaricando il suo pezzo di JavaScript, resta a schermo quella
 *    vecchia invece di un vuoto.
 */

const ContestoPosizione = createContext(null)
const ContestoParametri = createContext({})

/** `/modelli/:modello` contro `/modelli/alpi` → `{ modello: 'alpi' }`, o null. */
export function matchPath(modello, percorso) {
    if (modello === '*') return {}
    const attesi = modello.split('/').filter(Boolean)
    const reali = percorso.split('/').filter(Boolean)
    if (attesi.length !== reali.length) return null
    const parametri = {}
    for (let i = 0; i < attesi.length; i++) {
        if (attesi[i].startsWith(':')) {
            try {
                parametri[attesi[i].slice(1)] = decodeURIComponent(reali[i])
            } catch {
                return null
            }
        } else if (attesi[i] !== reali[i]) {
            return null
        }
    }
    return parametri
}

/** Separa `/pagina?x=1#ancora` nelle tre parti di `location`. */
function scomponi(indirizzo) {
    const u = new URL(indirizzo, 'http://x')
    return { pathname: u.pathname, search: u.search, hash: u.hash }
}

/** Toglie il `base` di Vite dal percorso; '/' quando il sito sta in radice. */
function senzaBase(pathname, basename) {
    const base = basename.replace(/\/$/, '')
    if (!base || !pathname.startsWith(base)) return pathname
    return pathname.slice(base.length) || '/'
}

function conBase(to, basename) {
    return basename.replace(/\/$/, '') + to
}

export function BrowserRouter({ basename = '/', children }) {
    const leggi = () => {
        const { pathname, search, hash } = window.location
        return { pathname: senzaBase(pathname, basename), search, hash }
    }
    const [posizione, impostaPosizione] = useState(leggi)

    useEffect(() => {
        const indietro = () => startTransition(() => impostaPosizione(leggi()))
        window.addEventListener('popstate', indietro)
        return () => window.removeEventListener('popstate', indietro)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basename])

    const naviga = useCallback(
        (to, { replace = false } = {}) => {
            const href = conBase(to, basename)
            if (replace) window.history.replaceState(null, '', href)
            else window.history.pushState(null, '', href)
            startTransition(() => impostaPosizione(scomponi(to)))
        },
        [basename],
    )

    const valore = useMemo(() => ({ posizione, naviga, basename }), [posizione, naviga, basename])
    return <ContestoPosizione.Provider value={valore}>{children}</ContestoPosizione.Provider>
}

/** Per il pre-rendering: posizione fissa, nessuna navigazione. */
export function StaticRouter({ location, basename = '/', children }) {
    const valore = useMemo(() => {
        const { pathname, search, hash } = scomponi(location)
        return { posizione: { pathname: senzaBase(pathname, basename), search, hash }, naviga: () => {}, basename }
    }, [location, basename])
    return <ContestoPosizione.Provider value={valore}>{children}</ContestoPosizione.Provider>
}

export function useLocation() {
    return useContext(ContestoPosizione).posizione
}

export function useNavigate() {
    return useContext(ContestoPosizione).naviga
}

export function useParams() {
    return useContext(ContestoParametri)
}

/** Segnaposto: le rotte le legge `Routes` dalle proprie figlie. */
export function Route() {
    return null
}

export function Routes({ children }) {
    const { pathname } = useLocation()
    const rotte = (Array.isArray(children) ? children : [children]).flat().filter(Boolean)
    for (const rotta of rotte) {
        const parametri = matchPath(rotta.props.path, pathname)
        if (parametri) {
            return <ContestoParametri.Provider value={parametri}>{rotta.props.element}</ContestoParametri.Provider>
        }
    }
    return null
}

/**
 * Collegamento interno: un <a> vero (funziona anche prima dell'idratazione e
 * con il tasto destro), che per il clic semplice naviga senza ricaricare.
 */
export function Link({ to, onClick, target, ...resto }) {
    const { naviga, basename } = useContext(ContestoPosizione)
    const clic = e => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return
        if (target && target !== '_self') return
        e.preventDefault()
        naviga(to)
    }
    return <a href={conBase(to, basename)} target={target} onClick={clic} {...resto} />
}

export function Navigate({ to, replace = false }) {
    const naviga = useNavigate()
    useEffect(() => {
        naviga(to, { replace })
    }, [naviga, to, replace])
    return null
}
