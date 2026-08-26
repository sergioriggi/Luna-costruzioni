import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, AZIENDA } from '../data/site'
import BadgeConcessionario from './BadgeConcessionario'

function Telefono({ className = '' }) {
    return (
        <a href={`tel:${AZIENDA.telefonoRaw}`} className={className}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6.6 3h3l1.5 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" strokeLinejoin="round" />
            </svg>
            {AZIENDA.telefono}
        </a>
    )
}

const classiVoce = attiva =>
    `whitespace-nowrap rounded-full px-2.5 py-2 text-[0.8rem] font-medium transition ${
        attiva ? 'bg-acqua-700 text-white' : 'text-pietra-600 hover:bg-sabbia-200/70 hover:text-pietra-900'
    }`

/** Voce di menu con sottomenu: si apre al passaggio del mouse e da tastiera. */
function VoceConFigli({ voce }) {
    const [aperto, setAperto] = useState(false)
    const contenitore = useRef(null)
    const { pathname } = useLocation()
    const attiva = pathname === voce.to || voce.figli.some(f => pathname.startsWith(f.to))

    useEffect(() => setAperto(false), [pathname])

    return (
        <li
            ref={contenitore}
            className="relative"
            onMouseEnter={() => setAperto(true)}
            onMouseLeave={() => setAperto(false)}
            onBlur={e => {
                if (!contenitore.current?.contains(e.relatedTarget)) setAperto(false)
            }}
        >
            <Link
                to={voce.to}
                className={`${classiVoce(attiva)} inline-flex items-center gap-1.5`}
                aria-expanded={aperto}
                onFocus={() => setAperto(true)}
            >
                {voce.label}
                <svg viewBox="0 0 24 24" className={`h-3 w-3 transition ${aperto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>

            {aperto && (
                <ul className="absolute left-0 top-full z-50 w-60 rounded-2xl border border-sabbia-200 bg-white p-2 shadow-morbida">
                    {voce.figli.map(figlio => (
                        <li key={figlio.to}>
                            <NavLink
                                to={figlio.to}
                                end
                                className={({ isActive }) =>
                                    `block rounded-xl px-3.5 py-2.5 text-[0.85rem] transition ${
                                        isActive ? 'bg-sabbia-100 font-semibold text-pietra-900' : 'text-pietra-600 hover:bg-sabbia-100 hover:text-pietra-900'
                                    }`
                                }
                            >
                                {figlio.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}

export default function Header() {
    const [apertoMobile, setApertoMobile] = useState(false)
    const [compatto, setCompatto] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => setApertoMobile(false), [pathname])

    useEffect(() => {
        const onScroll = () => setCompatto(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = apertoMobile ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [apertoMobile])

    return (
        <header className="sticky top-0 z-50">
            {/* Fascia superiore: posizionamento e contatto diretto */}
            <div className="bg-pietra-900 text-sabbia-100">
                <div className="contenitore flex items-center justify-between gap-4 py-1.5 text-[0.72rem] sm:text-xs">
                    <p className="truncate">
                        <strong className="font-semibold">{AZIENDA.attivita}</strong>
                        <span className="hidden sm:inline"> — sopralluogo e preventivo gratuiti in tutte le province</span>
                    </p>
                    <Telefono className="flex shrink-0 items-center gap-1.5 font-semibold text-sabbia-100 hover:text-white" />
                </div>
            </div>

            <div
                className={`border-b border-sabbia-200/80 bg-sabbia-50/95 backdrop-blur transition-shadow ${
                    compatto ? 'shadow-sm' : ''
                }`}
            >
                <div className="contenitore flex items-center justify-between gap-3 py-3">
                    {/* Il nome dell'impresa domina; il marchio del prodotto è la credenziale che lo accompagna */}
                    <div className="flex shrink-0 items-center gap-3 xl:gap-4">
                        <Link to="/" className="flex flex-col leading-none" aria-label={`${AZIENDA.nomeBreve} — home`}>
                            <span className="whitespace-nowrap font-display text-xl tracking-wide text-pietra-900 sm:text-2xl">
                                Luna Costruzioni
                            </span>
                            <span className="mt-1 text-[0.58rem] uppercase tracking-[0.24em] text-acqua-700">
                                Piscine e opere in pietra · Sicilia
                            </span>
                        </Link>
                        <span aria-hidden="true" className="hidden h-9 w-px bg-sabbia-300 md:block" />
                        <BadgeConcessionario compatto />
                    </div>

                    <nav aria-label="Navigazione principale" className="hidden lg:block">
                        <ul className="flex items-center gap-0.5">
                            {NAV.map(voce =>
                                voce.figli ? (
                                    <VoceConFigli key={voce.to} voce={voce} />
                                ) : (
                                    <li key={voce.to}>
                                        <NavLink to={voce.to} className={({ isActive }) => classiVoce(isActive)}>
                                            {voce.label}
                                        </NavLink>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setApertoMobile(v => !v)}
                        className="flex items-center gap-2 rounded-full border border-pietra-300 px-3.5 py-2 text-sm font-semibold text-pietra-800 lg:hidden"
                        aria-expanded={apertoMobile}
                        aria-controls="menu-mobile"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            {apertoMobile ? (
                                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                            )}
                        </svg>
                        Menu
                    </button>
                </div>

                {apertoMobile && (
                    <div id="menu-mobile" className="max-h-[75vh] overflow-y-auto border-t border-sabbia-200 bg-sabbia-50 lg:hidden">
                        <nav aria-label="Navigazione principale mobile" className="contenitore py-4">
                            <ul className="grid gap-1">
                                <li>
                                    <NavLink
                                        to="/"
                                        end
                                        className={({ isActive }) =>
                                            `block rounded-xl px-4 py-3 text-base font-medium ${
                                                isActive ? 'bg-acqua-700 text-white' : 'text-pietra-700 hover:bg-sabbia-200/70'
                                            }`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                {NAV.map(voce => (
                                    <li key={voce.to}>
                                        <NavLink
                                            to={voce.to}
                                            end={!voce.figli}
                                            className={({ isActive }) =>
                                                `block rounded-xl px-4 py-3 text-base font-medium ${
                                                    isActive ? 'bg-acqua-700 text-white' : 'text-pietra-700 hover:bg-sabbia-200/70'
                                                }`
                                            }
                                        >
                                            {voce.label}
                                        </NavLink>
                                        {voce.figli && (
                                            <ul className="mb-1 ml-4 border-l border-sabbia-300 pl-3">
                                                {voce.figli.map(figlio => (
                                                    <li key={figlio.to}>
                                                        <NavLink
                                                            to={figlio.to}
                                                            end
                                                            className="block rounded-lg px-3 py-2.5 text-sm text-pietra-600 hover:bg-sabbia-200/70"
                                                        >
                                                            {figlio.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <Telefono className="bottone-primario mt-4 w-full" />
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
