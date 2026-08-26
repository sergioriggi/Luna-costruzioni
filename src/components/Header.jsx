import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, AZIENDA } from '../data/site'
import BadgeConcessionario from './BadgeConcessionario'
import { useLingua } from '../i18n/lingua'

function IconaTelefono({ className = 'h-[15px] w-[15px]' }) {
    return (
        <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
            <path d="M222.4 158.2l-45.8-20.5a16 16 0 0 0-15.3 1.4l-23.6 15.7a76.6 76.6 0 0 1-36.4-36.1l15.8-24a16 16 0 0 0 1.3-15.2L97.8 33.6A16 16 0 0 0 81.2 24.3l-42 12.9A16 16 0 0 0 28 53.1C29 129.5 126.5 227 202.9 228h.4a16 16 0 0 0 15.2-11.3l12.9-42a16 16 0 0 0-9-16.5Z" />
        </svg>
    )
}

export default function Header() {
    const [apertoMobile, setApertoMobile] = useState(false)
    const { pathname } = useLocation()
    const { t } = useLingua()

    useEffect(() => setApertoMobile(false), [pathname])

    useEffect(() => {
        document.body.style.overflow = apertoMobile ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [apertoMobile])

    return (
        <header className="sticky top-0 z-30 border-b border-testo/[0.16] bg-notte/[0.88] backdrop-blur-[10px]">
            <div className="contenitore flex items-center gap-5 py-3.5">
                {/* Il nome dell'impresa apre la testata */}
                <Link to="/" className="flex shrink-0 flex-col gap-0.5 no-underline">
                    <span className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-testo sm:text-base">
                        Luna Costruzioni
                    </span>
                    <span className="text-[11px] tracking-[0.06em] text-neutro-500">
                        {t('Impresa edile · Sicilia', 'Building contractor · Sicily')}
                    </span>
                </Link>

                <nav
                    aria-label={t('Navigazione principale', 'Main navigation')}
                    className="ml-auto hidden items-center gap-[18px] text-[13px] xl:flex"
                >
                    {NAV.map(voce => (
                        <NavLink
                            key={voce.to}
                            to={voce.to}
                            className={({ isActive }) =>
                                `whitespace-nowrap no-underline transition ${
                                    isActive ? 'text-testo' : 'text-neutro-400 hover:text-testo'
                                }`
                            }
                        >
                            {t(voce.label, voce.labelEn)}
                        </NavLink>
                    ))}
                </nav>

                {/* Marchio del prodotto: credenziale accanto al nome, come nel blueprint */}
                <BadgeConcessionario className="ml-auto hidden lg:flex xl:ml-2" />

                <a
                    href={`tel:${AZIENDA.telefonoRaw}`}
                    className="bottone-primario ml-auto hidden shrink-0 no-underline sm:inline-flex lg:ml-0"
                >
                    <IconaTelefono />
                    {AZIENDA.telefono}
                </a>

                <button
                    type="button"
                    onClick={() => setApertoMobile(v => !v)}
                    className="bottone-secondario ml-auto shrink-0 xl:hidden"
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
                <div id="menu-mobile" className="max-h-[75vh] overflow-y-auto border-t border-testo/[0.16] bg-notte xl:hidden">
                    <nav aria-label={t('Navigazione principale', 'Main navigation')} className="contenitore py-4">
                        <ul className="grid gap-1">
                            {NAV.map(voce => (
                                <li key={voce.to}>
                                    <NavLink
                                        to={voce.to}
                                        className={({ isActive }) =>
                                            `block rounded-md px-4 py-3 text-[15px] no-underline ${
                                                isActive ? 'bg-superficie text-testo' : 'text-neutro-300 hover:bg-testo/[0.07]'
                                            }`
                                        }
                                    >
                                        {t(voce.label, voce.labelEn)}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <BadgeConcessionario className="mt-4 w-fit" />
                        <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-primario mt-3 w-full no-underline">
                            <IconaTelefono />
                            {AZIENDA.telefono}
                        </a>
                    </nav>
                </div>
            )}
        </header>
    )
}
