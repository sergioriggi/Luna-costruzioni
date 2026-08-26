import { Link } from 'react-router-dom'
import { AZIENDA, ROCKS_DESIGN, NAV_SECONDARIA } from '../data/site'
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
                  Colonna in più rispetto al file approvato: senza di essa le
                  pagine di approfondimento resterebbero raggiungibili solo
                  dalla sitemap, e per la ricerca locale valgono parecchio.
                */}
                <div>
                    <p className="pg-footer-etichetta">{t('Approfondimenti', 'Read more')}</p>
                    <ul className="pg-footer-elenco">
                        {NAV_SECONDARIA.map(v => (
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

            <p className="pg-copyright">
                © {AZIENDA.annoRiferimento} {AZIENDA.nome} ·{' '}
                {t('Tutti i diritti riservati', 'All rights reserved')} ·{' '}
                <Link to="/privacy">Privacy</Link> · <Link to="/cookie-policy">Cookie</Link>
            </p>
        </footer>
    )
}
