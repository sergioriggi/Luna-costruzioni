import { useEffect, useState } from 'react'
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
            {/* Fascia superiore: marchio concessionario + contatto diretto */}
            <div className="bg-pietra-900 text-sabbia-100">
                <div className="contenitore flex items-center justify-between gap-4 py-1.5 text-[0.72rem] sm:text-xs">
                    <p className="truncate">
                        <strong className="font-semibold">Tecnologia Rocks Design®</strong>
                        <span className="hidden sm:inline"> — piscine su misura in tutta la Sicilia</span>
                    </p>
                    <Telefono className="flex shrink-0 items-center gap-1.5 font-semibold text-sabbia-100 hover:text-white" />
                </div>
            </div>

            <div
                className={`border-b border-sabbia-200/80 bg-sabbia-50/95 backdrop-blur transition-shadow ${
                    compatto ? 'shadow-sm' : ''
                }`}
            >
                <div className="contenitore flex items-center justify-between gap-4 py-3">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Link to="/" className="flex flex-col leading-none" aria-label={`${AZIENDA.nome} — home`}>
                            <span className="whitespace-nowrap font-display text-lg tracking-wide text-pietra-900 sm:text-xl">
                                Luna Costruzioni
                            </span>
                            <span className="text-[0.6rem] uppercase tracking-[0.28em] text-acqua-700">Sicilia</span>
                        </Link>
                        <BadgeConcessionario compatto />
                    </div>

                    <nav aria-label="Navigazione principale" className="hidden lg:block">
                        <ul className="flex items-center gap-1">
                            {NAV.map(voce => (
                                <li key={voce.to}>
                                    <NavLink
                                        to={voce.to}
                                        end={voce.to === '/'}
                                        className={({ isActive }) =>
                                            `whitespace-nowrap rounded-full px-3 py-2 text-[0.82rem] font-medium transition ${
                                                isActive
                                                    ? 'bg-acqua-700 text-white'
                                                    : 'text-pietra-600 hover:bg-sabbia-200/70 hover:text-pietra-900'
                                            }`
                                        }
                                    >
                                        {voce.label}
                                    </NavLink>
                                </li>
                            ))}
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
                    <div id="menu-mobile" className="border-t border-sabbia-200 bg-sabbia-50 lg:hidden">
                        <nav aria-label="Navigazione principale mobile" className="contenitore py-4">
                            <ul className="grid gap-1">
                                {NAV.map(voce => (
                                    <li key={voce.to}>
                                        <NavLink
                                            to={voce.to}
                                            end={voce.to === '/'}
                                            className={({ isActive }) =>
                                                `block rounded-xl px-4 py-3 text-base font-medium ${
                                                    isActive ? 'bg-acqua-700 text-white' : 'text-pietra-700 hover:bg-sabbia-200/70'
                                                }`
                                            }
                                        >
                                            {voce.label}
                                        </NavLink>
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
