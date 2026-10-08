import { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, matchPath } from './lib/instradamento'
import pigra from './lib/pigra'
import Header from './components/Header'
import Footer from './components/Footer'
import AzioniRapide from './components/AzioniRapide'
import BannerCookie from './components/BannerCookie'
import Home from './pages/Home'
import Grazie from './pages/Grazie'
import { FornitoreLingua, useLingua } from './i18n/lingua'

/**
 * Le rotte del sito.
 *
 * Solo la home (e /grazie, la pagina di conversione, che non va toccata) sta
 * nel JavaScript principale: ogni altra pagina è un pezzo a parte, scaricato
 * quando serve. Chi apre il sito dalla home non paga il codice di diciotto
 * pagine che magari non vedrà. Vedi `src/lib/pigra.jsx` per come resta intatta
 * l'idratazione delle pagine pre-renderizzate.
 *
 * L'ordine conta: le rotte si confrontano dall'alto, la prima che combacia
 * vince (`/piscine-rocks-design/sicilia` prima di `/:provincia`).
 */
const ROTTE = [
    ['/', Home],
    ['/piscine-rocks-design', pigra(() => import('./pages/Tecnologia'))],
    ['/azienda', pigra(() => import('./pages/Azienda'))],
    ['/modelli', pigra(() => import('./pages/Modelli'))],
    ['/modelli/:modello', pigra(() => import('./pages/Modello'))],
    ['/sabbie', pigra(() => import('./pages/Sabbie'))],
    ['/giardini-e-opere-in-pietra', pigra(() => import('./pages/Giardini'))],
    ['/hotel-e-resort', pigra(() => import('./pages/HotelResort'))],
    ['/quanto-costa', pigra(() => import('./pages/QuantoCosta'))],
    ['/piscina-in-cemento-o-rocks-design', pigra(() => import('./pages/ConfrontoCemento'))],
    ['/galleria', pigra(() => import('./pages/GalleriaPagina'))],
    ['/come-lavoriamo', pigra(() => import('./pages/ComeLavoriamo'))],
    ['/domande-frequenti', pigra(() => import('./pages/Faq'))],
    ['/contatti', pigra(() => import('./pages/Contatti'))],
    ['/piscine-rocks-design/sicilia', pigra(() => import('./pages/Sicilia'))],
    ['/piscine-rocks-design/:provincia', pigra(() => import('./pages/VecchiaProvincia'))],
    ['/grazie', Grazie],
    ['/privacy', pigra(() => import('./pages/Privacy'))],
    ['/cookie-policy', pigra(() => import('./pages/Cookie'))],
    ['*', pigra(() => import('./pages/NonTrovata'))],
]

/** Scarica il codice della pagina che risponde a `pathname`, se è pigra. */
export function precaricaRotta(pathname) {
    const [, Pagina] = ROTTE.find(([percorso]) => matchPath(percorso, pathname))
    return Pagina.precarica?.() ?? Promise.resolve()
}

/**
 * Riporta in cima a ogni cambio di rotta. Con un'ancora (`/piscine-rocks-design/sicilia#enna`)
 * porta invece alla sezione: su un caricamento completo lo fa già il browser,
 * su una navigazione interna no.
 */
function InizioPagina() {
    const { pathname, hash } = useLocation()
    useEffect(() => {
        if (hash) {
            let bersaglio = null
            try {
                bersaglio = document.getElementById(decodeURIComponent(hash.slice(1)))
            } catch { /* ancora malformata: si resta dove si è */ }
            bersaglio?.scrollIntoView({ behavior: 'instant' })
            return
        }
        // `instant` esplicito: prima c'era `'instant' in window ? … : 'auto'`,
        // che cerca una variabile globale `instant` e dà sempre `auto`; e `auto`
        // segue lo `scroll-behavior: smooth` del CSS. Risultato: ogni cambio di
        // pagina faceva scorrere tutta la pagina nuova per ~750 ms, anche con
        // «riduci il movimento». Un browser che non conosce `instant` ripiega
        // sul comportamento del CSS, cioè quello di prima.
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pathname, hash])
    return null
}

/**
 * Le pagine tradotte in inglese. Le altre, in modalità inglese, restano in
 * italiano: lo si dice con una riga in cima e si dichiara `lang="it"` sul loro
 * <main>, così un lettore di schermo non legge l'italiano con la voce inglese.
 * Prima la testata passava all'inglese e il resto della pagina no, senza
 * avvisare: sembrava un sito rotto.
 */
const TRADOTTE = new Set(['/', '/contatti', '/grazie', '/hotel-e-resort'])

/**
 * La riga per le pagine non tradotte. È un componente a sé, fratello delle
 * rotte dentro <main>, e non un involucro attorno a <main>, per una ragione
 * precisa: la lingua salvata si applica dopo l'idratazione, e un componente
 * che legge la lingua SOPRA il confine <Suspense> delle rotte si ridisegna in
 * quel momento. React allora idrata le rotte ancora in attesa con il testo
 * inglese, contro un HTML italiano: errore #418 su ogni pagina in inglese.
 * Qui sotto la lingua la legge solo questa riga, e `lang` su <main> lo
 * imposta un effetto, fuori dal disegno.
 */
function AvvisoLingua() {
    const { lingua } = useLingua()
    const { pathname } = useLocation()
    const soloItaliano = lingua === 'en' && !TRADOTTE.has(pathname)
    useEffect(() => {
        const main = document.getElementById('contenuto')
        if (!main) return
        if (soloItaliano) main.setAttribute('lang', 'it')
        else main.removeAttribute('lang')
    }, [soloItaliano])
    if (!soloItaliano) return null
    return <p className="avviso-lingua" lang="en">This page is only available in Italian for now.</p>
}

export default function App() {
    return (
        <FornitoreLingua>
        <div className="flex min-h-screen flex-col">
            <a
                href="#contenuto"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-superficie focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-testo focus:shadow-lg"
            >
                Vai al contenuto
            </a>
            <InizioPagina />
            <Header />
            <main id="contenuto" className="flex-1">
                <AvvisoLingua />
                {/* Il confine serve alla navigazione verso una pagina non ancora
                    scaricata: la rotta cambia dentro una transizione, quindi a
                    schermo resta la pagina di prima finché non arriva il codice. */}
                <Suspense fallback={null}>
                    <Routes>
                        {ROTTE.map(([percorso, Pagina]) => (
                            <Route key={percorso} path={percorso} element={<Pagina />} />
                        ))}
                    </Routes>
                </Suspense>
            </main>
            <Footer />
            <AzioniRapide />
            <BannerCookie />
        </div>
        </FornitoreLingua>
    )
}
