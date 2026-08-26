import { Link } from 'react-router-dom'
import { AZIENDA, ROCKS_DESIGN, SOCIAL, PROVINCE, NAV, NAV_SECONDARIA } from '../data/site'
import BadgeConcessionario from './BadgeConcessionario'

export default function Footer() {
    const anno = new Date().getFullYear()

    return (
        <footer className="mt-24 border-t border-pietra-800/40 bg-pietra-900 text-sabbia-200">
            <div className="contenitore grid gap-12 py-16 lg:grid-cols-[1.15fr_1fr_1fr]">
                <div>
                    <p className="font-display text-2xl text-white">{AZIENDA.nome}</p>
                    <p className="mt-2 text-sm text-sabbia-300">
                        {AZIENDA.ruolo} per la {AZIENDA.zona}.
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-sabbia-300/90">
                        Progettiamo e realizziamo piscine in <strong className="font-semibold text-sabbia-100">Tecnologia
                        Rocks Design®</strong>. La tecnologia è brevettata da {ROCKS_DESIGN.nome}: Luna Costruzioni srl
                        ne è concessionario autorizzato, non l’inventrice.
                    </p>
                    <BadgeConcessionario className="mt-6 w-fit" />
                </div>

                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sabbia-100">Contatti</h2>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        <li>
                            Referente: <strong className="font-semibold text-white">{AZIENDA.referente}</strong>
                        </li>
                        <li>
                            <a className="link-sottile hover:text-white" href={`tel:${AZIENDA.telefonoRaw}`}>
                                {AZIENDA.telefono}
                            </a>
                        </li>
                        <li>
                            <a className="link-sottile hover:text-white" href={`mailto:${AZIENDA.email}`}>
                                {AZIENDA.email}
                            </a>
                        </li>
                        <li>
                            <a
                                className="link-sottile hover:text-white"
                                href={`https://wa.me/${AZIENDA.whatsapp}`}
                                target="_blank"
                                rel="noopener"
                            >
                                Scrivici su WhatsApp
                            </a>
                        </li>
                    </ul>

                    <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-sabbia-100">Seguici</h2>
                    <ul className="mt-3 space-y-2 text-sm">
                        {SOCIAL.map(s => (
                            <li key={s.nome}>
                                <a className="link-sottile hover:text-white" href={s.url} target="_blank" rel="noopener">
                                    {s.nome}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-xs text-sabbia-400">
                        Taggaci con <span className="font-semibold text-sabbia-200">{ROCKS_DESIGN.tag}</span>
                    </p>
                </div>

                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sabbia-100">Pagine</h2>
                    <ul className="mt-4 grid gap-2 text-sm">
                        {[...NAV, ...NAV_SECONDARIA].map(v => (
                            <li key={v.to}>
                                <Link className="link-sottile hover:text-white" to={v.to}>
                                    {v.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-sabbia-100">
                        Dove operiamo
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
                        {PROVINCE.map(p => (
                            <li key={p.slug}>
                                <Link className="link-sottile hover:text-white" to={`/piscine-rocks-design/${p.slug}`}>
                                    {p.nome}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="contenitore flex flex-col gap-3 py-6 text-xs text-sabbia-400 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {anno} {AZIENDA.nome} — {AZIENDA.ruolo}. Tutti i diritti riservati.
                    </p>
                    <p className="flex flex-wrap gap-x-4 gap-y-1">
                        <Link className="hover:text-white" to="/privacy">Privacy policy</Link>
                        <Link className="hover:text-white" to="/cookie-policy">Cookie policy</Link>
                        <a className="hover:text-white" href={ROCKS_DESIGN.sito} target="_blank" rel="noopener">
                            {ROCKS_DESIGN.nome}
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
