import { Link } from 'react-router-dom'
import { AZIENDA, ROCKS_DESIGN, SOCIAL, PROVINCE, NAV, NAV_SECONDARIA } from '../data/site'
import { useLingua, SelettoreLingua } from '../i18n/lingua'

export default function Footer() {
    const { t } = useLingua()
    const anno = new Date().getFullYear()

    return (
        <footer className="border-t border-testo/[0.16] bg-notte-800">
            <div className="contenitore grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-testo">
                        {AZIENDA.nome}
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-neutro-400">
                        {t('Impresa edile · Concessionario per la Sicilia', 'Building contractor · Dealer for Sicily')}
                        <br />
                        <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="link-sottile text-accento">
                            {ROCKS_DESIGN.nome}
                        </a>
                    </p>
                    <p className="mt-4 max-w-[30em] text-[12px] leading-relaxed text-neutro-500">
                        {t(
                            'La Tecnologia Rocks Design® è brevettata da Piscine Rocks Design. Luna Costruzioni srl ne è concessionario autorizzato, non l’inventrice.',
                            'Rocks Design Technology is patented by Piscine Rocks Design. Luna Costruzioni srl is its authorised dealer, not its inventor.',
                        )}
                    </p>
                </div>

                <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-neutro-500">
                        {t('Referente', 'Contact person')}
                    </p>
                    <p className="mt-2 font-display text-[17px] text-testo">{AZIENDA.referente}</p>
                    <a
                        href={`tel:${AZIENDA.telefonoRaw}`}
                        className="mt-1 block font-display text-[17px] text-testo no-underline hover:text-accento"
                    >
                        {AZIENDA.telefono}
                    </a>
                    <a href={`mailto:${AZIENDA.email}`} className="mt-3 block text-[13px] text-neutro-400 no-underline hover:text-testo">
                        {AZIENDA.email}
                    </a>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                        {SOCIAL.map(s => (
                            <li key={s.nome}>
                                <a href={s.url} target="_blank" rel="noopener" className="text-neutro-400 no-underline hover:text-testo">
                                    {s.nome}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 text-[11px] text-neutro-600">
                        {t('Taggaci con', 'Tag us with')}{' '}
                        <span className="text-neutro-400">{ROCKS_DESIGN.tag}</span>
                    </p>
                </div>

                <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-neutro-500">
                        {t('Pagine', 'Pages')}
                    </p>
                    <ul className="mt-3 grid gap-1.5 text-[13px]">
                        {[...NAV, ...NAV_SECONDARIA].map(v => (
                            <li key={v.to}>
                                <Link to={v.to} className="text-neutro-400 no-underline hover:text-testo">
                                    {t(v.label, v.labelEn)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-neutro-500">
                        {t('Dove operiamo', 'Where we work')}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[13px]">
                        {PROVINCE.map(p => (
                            <li key={p.slug}>
                                <Link
                                    to={`/piscine-rocks-design/${p.slug}`}
                                    className="text-neutro-400 no-underline hover:text-testo"
                                >
                                    {p.nome}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-6 text-[11px] uppercase tracking-[0.12em] text-neutro-500">
                        {t('Lingua', 'Language')}
                    </p>
                    <SelettoreLingua className="mt-3" />
                </div>
            </div>

            <div className="border-t border-testo/[0.16]">
                <div className="contenitore flex flex-col gap-3 py-5 text-[12px] text-neutro-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {anno} {AZIENDA.nome} · {t('Tutti i diritti riservati', 'All rights reserved')}
                    </p>
                    <p className="flex flex-wrap gap-x-4 gap-y-1">
                        <Link to="/privacy" className="no-underline hover:text-testo">Privacy</Link>
                        <Link to="/cookie-policy" className="no-underline hover:text-testo">Cookie</Link>
                        <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="no-underline hover:text-testo">
                            piscinerocksdesign.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
