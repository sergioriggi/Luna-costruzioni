import { Link } from 'react-router-dom'
import { AZIENDA, ROCKS_DESIGN, NAV, NAV_SECONDARIA, PROVINCE } from '../data/site'
import { useLingua, SelettoreLingua } from '../i18n/lingua'

export default function Footer() {
    const { t } = useLingua()

    return (
        <footer className="pg-footer">
            <div className="pg-footer-griglia">
                <div>
                    <p className="pg-footer-marchio">{AZIENDA.nome}</p>
                    <p className="pg-footer-testo">
                        {t('Impresa edile · Concessionario per la Sicilia', 'Building contractor · Dealer for Sicily')}
                        <br />
                        <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="pg-footer-link">
                            {ROCKS_DESIGN.nome}
                        </a>
                    </p>
                </div>

                <div>
                    <p className="pg-footer-etichetta">{t('Referente', 'Contact person')}</p>
                    <p className="pg-footer-voce">{AZIENDA.referente}</p>
                    <a href={`tel:${AZIENDA.telefonoRaw}`} className="pg-footer-link">
                        {AZIENDA.telefono}
                    </a>
                </div>

                <div>
                    <p className="pg-footer-etichetta">{t('Prodotto', 'Product')}</p>
                    <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="pg-footer-link">
                        piscinerocksdesign.com
                    </a>
                </div>

                {/*
                  Colonna in più rispetto al file approvato, e non è un vezzo.
                  La testata è a sole ancore, per scelta di design: senza questo
                  elenco NESSUNA delle pagine interne sarebbe collegata da
                  nessuna parte. Erano raggiungibili solo dalla sitemap, cioè
                  praticamente orfane — e per un'impresa che vive di ricerca
                  locale sono proprio le pagine che portano traffico.
                */}
                <div>
                    <p className="pg-footer-etichetta">{t('Pagine', 'Pages')}</p>
                    <ul className="pg-footer-elenco">
                        {[...NAV, ...NAV_SECONDARIA].map(v => (
                            <li key={v.to}>
                                <Link to={v.to}>{t(v.label, v.labelEn)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="pg-footer-etichetta">{t('Lingua', 'Language')}</p>
                    <SelettoreLingua />
                </div>
            </div>

            {/*
              Le nove pagine provinciali sono il motore della ricerca locale, ed
              erano collegate da nessuna parte. Una riga sola, in fondo.
            */}
            <p className="pg-footer-province">
                <span className="pg-footer-etichetta">{t('Dove lavoriamo', 'Where we work')}</span>{' '}
                {PROVINCE.map((p, i) => (
                    <span key={p.slug}>
                        {i > 0 && ' · '}
                        <Link to={`/piscine-rocks-design/${p.slug}`}>{p.nome}</Link>
                    </span>
                ))}
            </p>

            {/*
              Identificazione societaria. Non è una gentilezza: l'art. 2250 del
              codice civile impone alle società di indicare sul proprio sito
              sede, ufficio del registro delle imprese, numero REA e capitale
              sociale. Mancavano tutte.
            */}
            <p className="pg-note-legali">
                {AZIENDA.ragioneSociale} · {t('Sede legale', 'Registered office')}:{' '}
                {AZIENDA.sede.via}, {AZIENDA.sede.cap} {AZIENDA.sede.comune} ({AZIENDA.sede.siglaProvincia}) ·{' '}
                {t('P. IVA e C.F.', 'VAT and tax code')} {AZIENDA.piva} ·{' '}
                REA {AZIENDA.rea} · {t('Capitale sociale', 'Share capital')} {AZIENDA.capitaleSociale}
                {AZIENDA.capitaleVersato && ` ${t('interamente versato', 'fully paid')}`} ·{' '}
                PEC <a href={`mailto:${AZIENDA.pec}`}>{AZIENDA.pec}</a>
            </p>

            <p className="pg-copyright">
                © {AZIENDA.annoRiferimento} {AZIENDA.nome} ·{' '}
                {t('Tutti i diritti riservati', 'All rights reserved')} ·{' '}
                <Link to="/privacy">Privacy</Link> · <Link to="/cookie-policy">Cookie</Link>
            </p>
        </footer>
    )
}
