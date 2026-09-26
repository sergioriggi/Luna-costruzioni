import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'
import { pubblico, BASE_URL } from '../lib/percorso'
import BottoneTelefono from './BottoneTelefono'

/** Ancore della pagina unica, come nel file approvato. */
const ANCORE = [
    { id: 'piscine', label: 'Piscine', labelEn: 'Pools' },
    { id: 'processo', label: 'Chiavi in mano', labelEn: 'Turnkey' },
    { id: 'realizzazioni', label: 'Le piscine', labelEn: 'The pools' },
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
                        {/*
                          Il logo è reso a 62×13 px CSS, e il PNG che lo
                          produce è 900×188 per 125 KB: quattordici volte più
                          grande del necessario, scaricato su OGNI pagina e
                          sopra la piega. Nella cascata di /quanto-costa
                          occupava la banda da 895 a 1987 ms, in concorrenza
                          con il CSS — e finché il CSS non arriva non c'è
                          prima pittura, quindi non c'è LCP.
                          La WebP da 240 px copre fino a DPR 3,8 e pesa 9,4 KB.

                          Il PNG resta come `src` dell'`img`, e non è solo
                          cortesia verso i browser antichi: `verifica-conformita.mjs`
                          e `verifica-online.mjs` cercano esattamente la stringa
                          `/brand/rocks-design-logo.png` nella testata, perché la
                          direttiva della casa madre impone quel logo lì. Se un
                          giorno si sposta il fallback, vanno aggiornati anche
                          quei due controlli. Serve ancora anche come
                          apple-touch-icon in index.html, quindi il PNG grande
                          non va rimpicciolito.
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

                <BottoneTelefono className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    <IconaTelefono />
                    340 490 0710
                </BottoneTelefono>
            </nav>
        </header>
    )
}
