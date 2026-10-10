import { Link } from '../lib/instradamento'
import Seo from '../components/Seo'
import { Sezione } from '../components/Sezione'
import { PROVINCE } from '../data/site'
import { useLingua } from '../i18n/lingua'

export default function NonTrovata() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Pagina non trovata | Luna Costruzioni S.r.l.s."
                descrizione="La pagina che cerchi non esiste o è stata spostata."
                percorso="/404"
                noindex
            />
            <Sezione>
                <div className="mx-auto max-w-prosa text-center">
                    <p className="occhiello">{t('Errore 404', 'Error 404')}</p>
                    <h1 className="titolo-sezione">{t('Questa pagina non esiste', 'This page does not exist')}</h1>
                    <p className="testo-lungo mt-5">
                        {t(
                            'Forse cercavi la galleria delle piscine o la tua provincia.',
                            'Perhaps you were looking for the pool gallery, or your province.',
                        )}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link to="/" className="bottone-primario">{t('Torna alla home', 'Back to the home page')}</Link>
                        <Link to="/galleria" className="bottone-secondario">{t('Vai alla galleria', 'Go to the gallery')}</Link>
                    </div>
                    <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
                        {PROVINCE.map(p => (
                            <li key={p.slug}>
                                <Link
                                    to={`/piscine-rocks-design/sicilia#${p.slug}`}
                                    className="inline-block rounded-full border border-testo/16 bg-superficie px-4 py-2 text-sm text-neutro-300 hover:border-accento"
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
