import { useRef } from 'react'
import { Link, useLocation } from '../lib/instradamento'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'
import { pubblico, BASE_URL } from '../lib/percorso'
import BottoneTelefono from './BottoneTelefono'

/**
 * Voci della testata. Erano le sette ancore della pagina unica del blueprint:
 * dalle pagine interne riportavano tutte alla home, e su telefono sparivano
 * senza un menù al loro posto. Ora sono cinque pagine vere — le stesse che un
 * cliente cerca — e le altre stanno nel pannello del menù e nel piè di pagina.
 */
const VOCI = [
    { to: '/modelli', label: 'Modelli', labelEn: 'Models' },
    { to: '/galleria', label: 'Le piscine', labelEn: 'The pools' },
    { to: '/quanto-costa', label: 'Quanto costa', labelEn: 'Costs' },
    { to: '/hotel-e-resort', label: 'Hotel e resort', labelEn: 'Hotels' },
    { to: '/piscine-rocks-design/sicilia', label: 'Sicilia', labelEn: 'Sicily' },
]

/** Solo nel pannello: completano la mappa senza affollare la testata. */
const VOCI_PANNELLO = [
    { to: '/piscine-rocks-design', label: 'Come sono fatte', labelEn: 'How they are made' },
    { to: '/come-lavoriamo', label: 'Come lavoriamo', labelEn: 'How we work' },
    { to: '/domande-frequenti', label: 'Domande frequenti', labelEn: 'FAQ' },
    { to: '/azienda', label: 'Chi siamo', labelEn: 'About us' },
]

function IconaTelefono() {
    return (
        <svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M222.4 158.2l-45.8-20.5a16 16 0 0 0-15.3 1.4l-23.6 15.7a76.6 76.6 0 0 1-36.4-36.1l15.8-24a16 16 0 0 0 1.3-15.2L97.8 33.6A16 16 0 0 0 81.2 24.3l-42 12.9A16 16 0 0 0 28 53.1C29 129.5 126.5 227 202.9 228h.4a16 16 0 0 0 15.2-11.3l12.9-42a16 16 0 0 0-9-16.5Z" />
        </svg>
    )
}

export default function Header() {
    const { t } = useLingua()
    const { pathname } = useLocation()
    const menu = useRef(null)
    const casa = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`
    const corrente = to => (pathname === to || pathname.startsWith(`${to}/`) ? 'page' : undefined)
    // Il pannello è un <details>: si apre anche senza JavaScript. Dopo un
    // clic su una voce va richiuso a mano, perché la navigazione interna non
    // ricarica la pagina.
    const chiudi = () => menu.current?.removeAttribute('open')

    return (
        <header className="pg-header">
            <a href={`${casa}#top`} className="pg-marchio">
                <span className="pg-marchio-nome">Luna Costruzioni</span>
                <span className="pg-marchio-riga">
                    {t('Impresa edile · Sicilia', 'Building contractor · Sicily')}
                </span>
            </a>

            <nav className="pg-nav" aria-label={t('Navigazione principale', 'Main navigation')}>
                <span className="pg-nav-ancore">
                    {VOCI.map(voce => (
                        <Link key={voce.to} to={voce.to} className="pg-nav-voce" aria-current={corrente(voce.to)}>
                            {t(voce.label, voce.labelEn)}
                        </Link>
                    ))}
                </span>

                {/*
                  Direttiva Piscine Rocks Design: il logo di concessionario
                  autorizzato sta nella fascia superiore (zona menu) e linka
                  alla pagina ufficiale della casa madre.
                */}
                <a
                    href={ROCKS_DESIGN.sito}
                    target="_blank"
                    rel="noopener"
                    title={`${ROCKS_DESIGN.nome} — sito ufficiale. ${AZIENDA.nome} è concessionario autorizzato per la ${AZIENDA.zona}`}
                    className="pg-concessionario"
                >
                    <span className="pg-concessionario-logo">
                        {/*
                          Il PNG resta come `src` dell'`img`: `verifica-conformita.mjs`
                          e `verifica-online.mjs` cercano esattamente la stringa
                          `/brand/rocks-design-logo.png` nella testata, perché la
                          direttiva della casa madre impone quel logo lì. Il
                          browser scarica la WebP da 240 px (9,4 KB), che copre
                          anche la resa più grande di oggi (24 px di altezza).
                        */}
                        <picture>
                            <source type="image/webp" srcSet={pubblico('/brand/rocks-design-logo-240.webp')} />
                            <img
                                src={pubblico('/brand/rocks-design-logo.png')}
                                width="900"
                                height="188"
                                decoding="async"
                                alt={`${ROCKS_DESIGN.nome} — logo ufficiale`}
                            />
                        </picture>
                    </span>
                    <span className="pg-concessionario-testo">
                        <span className="pg-concessionario-ruolo">
                            {t('Concessionario autorizzato', 'Authorised dealer')}
                        </span>
                        <span className="pg-concessionario-nome">{ROCKS_DESIGN.nome}</span>
                    </span>
                </a>

                <BottoneTelefono className="btn btn-secondary pg-testata-telefono">
                    <IconaTelefono />
                    {AZIENDA.telefono.replace(/^\+39\s*/, '')}
                </BottoneTelefono>
                <Link to="/contatti" className="btn pg-btn-pieno pg-testata-preventivo">
                    {t('Preventivo', 'Get a quote')}
                </Link>

                <details ref={menu} className="pg-menu">
                    <summary className="pg-menu-tasto" aria-label={t('Apri il menù', 'Open the menu')}>
                        <span aria-hidden="true" />
                    </summary>
                    <div className="pg-menu-pannello">
                        <ul>
                            {[...VOCI, ...VOCI_PANNELLO].map(voce => (
                                <li key={voce.to}>
                                    <Link to={voce.to} onClick={chiudi} aria-current={corrente(voce.to)}>
                                        {t(voce.label, voce.labelEn)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="pg-menu-azioni">
                            <Link to="/contatti" onClick={chiudi} className="btn pg-btn-pieno pg-btn-grande">
                                {t('Chiedi un preventivo', 'Ask for a quote')}
                            </Link>
                            <BottoneTelefono className="btn btn-secondary pg-btn-grande">
                                <IconaTelefono />
                                {AZIENDA.telefono}
                            </BottoneTelefono>
                        </div>
                    </div>
                </details>
            </nav>
        </header>
    )
}
