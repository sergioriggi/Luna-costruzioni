import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'
import { pubblico, BASE_URL } from '../lib/percorso'

/** Ancore della pagina unica, come nel file approvato. */
const ANCORE = [
    { id: 'piscine', label: 'Piscine', labelEn: 'Pools' },
    { id: 'processo', label: 'Chiavi in mano', labelEn: 'Turnkey' },
    { id: 'realizzazioni', label: 'Realizzazioni', labelEn: 'Projects' },
    { id: 'dubbi', label: 'Prima di decidere', labelEn: 'Before you decide' },
    { id: 'hotel', label: 'Hotel e resort', labelEn: 'Hotels' },
    { id: 'faq', label: 'FAQ', labelEn: 'FAQ' },
    { id: 'sicilia', label: 'Sicilia', labelEn: 'Sicily' },
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
    // Le ancore puntano alla pagina iniziale: dalle pagine interne il
    // collegamento riporta a casa, dalla pagina iniziale scorre e basta.
    const casa = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`

    return (
        <header className="pg-header">
            <a href={`${casa}#top`} className="pg-marchio">
                <span className="pg-marchio-nome">Luna Costruzioni</span>
                <span className="pg-marchio-riga">
                    {t('Impresa edile · Sicilia', 'Building contractor · Sicily')}
                </span>
            </a>

            <nav className="pg-nav" aria-label={t('Navigazione principale', 'Main navigation')}>
                {ANCORE.map(voce => (
                    <a key={voce.id} href={`${casa}#${voce.id}`} className="pg-nav-voce">
                        {t(voce.label, voce.labelEn)}
                    </a>
                ))}

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
                        <img
                            src={pubblico('/brand/rocks-design-logo.png')}
                            width="900"
                            height="188"
                            alt={`${ROCKS_DESIGN.nome} — logo ufficiale`}
                        />
                    </span>
                    <span className="pg-concessionario-testo">
                        <span className="pg-concessionario-ruolo">
                            {t('Concessionario autorizzato', 'Authorised dealer')}
                        </span>
                        <span className="pg-concessionario-nome">{ROCKS_DESIGN.nome}</span>
                    </span>
                </a>

                <a className="btn btn-primary" href={`tel:${AZIENDA.telefonoRaw}`} style={{ textDecoration: 'none' }}>
                    <IconaTelefono />
                    340 490 0710
                </a>
            </nav>
        </header>
    )
}
