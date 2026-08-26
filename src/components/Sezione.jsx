import { Link } from 'react-router-dom'
import Rivela from './Rivela'

export function Sezione({ id, className = '', sfondo = '', children }) {
    return (
        <section id={id} className={`py-20 sm:py-24 ${sfondo} ${className}`}>
            <div className="contenitore">{children}</div>
        </section>
    )
}

export function IntestazioneSezione({ occhiello, titolo, testo, allineamento = 'sinistra', children }) {
    const centro = allineamento === 'centro'
    return (
        <Rivela className={`max-w-prosa ${centro ? 'mx-auto text-center' : ''}`}>
            {occhiello && <p className="occhiello">{occhiello}</p>}
            <h2 className="titolo-sezione">{titolo}</h2>
            {testo && <p className="testo-lungo mt-5">{testo}</p>}
            {children}
        </Rivela>
    )
}

export function Briciole({ voci }) {
    return (
        <nav aria-label="Percorso di navigazione" className="border-b border-sabbia-200 bg-sabbia-100/60">
            <div className="contenitore">
                <ol className="flex flex-wrap items-center gap-2 py-3 text-xs text-pietra-500">
                    {voci.map((v, i) => (
                        <li key={v.to} className="flex items-center gap-2">
                            {i > 0 && <span aria-hidden="true">/</span>}
                            {i === voci.length - 1 ? (
                                <span aria-current="page" className="font-medium text-pietra-700">{v.label}</span>
                            ) : (
                                <Link to={v.to} className="hover:text-pietra-800">{v.label}</Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}

export function Cta({ titolo, testo, primaria = { to: '/contatti', label: 'Richiedi un preventivo' }, secondaria }) {
    return (
        <Sezione>
            <Rivela className="overflow-hidden rounded-3xl bg-pietra-900 px-6 py-14 text-center sm:px-14">
                <h2 className="font-display text-3xl text-white sm:text-4xl">{titolo}</h2>
                <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-sabbia-300">{testo}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link to={primaria.to} className="bottone-chiaro">{primaria.label}</Link>
                    {secondaria && (
                        <Link
                            to={secondaria.to}
                            className="bottone border border-white/30 text-white hover:bg-white/10"
                        >
                            {secondaria.label}
                        </Link>
                    )}
                </div>
            </Rivela>
        </Sezione>
    )
}
