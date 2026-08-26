import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { Sezione } from '../components/Sezione'
import { PROVINCE } from '../data/site'

export default function NonTrovata() {
    return (
        <>
            <Seo
                titolo="Pagina non trovata | Luna Costruzioni srl"
                descrizione="La pagina che cerchi non esiste o è stata spostata."
                percorso="/404"
                noindex
            />
            <Sezione>
                <div className="mx-auto max-w-prosa text-center">
                    <p className="occhiello">Errore 404</p>
                    <h1 className="titolo-sezione">Questa pagina non esiste</h1>
                    <p className="testo-lungo mt-5">
                        Forse cercavi la galleria delle realizzazioni o la pagina della tua provincia.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link to="/" className="bottone-primario">Torna alla home</Link>
                        <Link to="/galleria" className="bottone-secondario">Vai alla galleria</Link>
                    </div>
                    <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
                        {PROVINCE.map(p => (
                            <li key={p.slug}>
                                <Link
                                    to={`/piscine-rocks-design/${p.slug}`}
                                    className="inline-block rounded-full border border-pietra-300 bg-white px-4 py-2 text-sm text-pietra-700 hover:border-acqua-500"
                                >
                                    {p.nome}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Sezione>
        </>
    )
}
