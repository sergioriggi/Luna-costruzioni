import { Link, Navigate } from '../lib/instradamento'
import Seo, { schemaBriciole } from '../components/Seo'
import Rivela from '../components/Rivela'
import { Sezione, Briciole, Cta } from '../components/Sezione'
import { GUIDA, PERCORSO_GUIDA, percorsoArticolo } from '../data/guida'
import { AZIENDA } from '../data/site'
import { formattaData } from '../lib/date'
import { useLingua } from '../i18n/lingua'

const BRICIOLE_GUIDA = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: PERCORSO_GUIDA, label: 'Guida', labelEn: 'Guide' },
]

/** Indice della guida, dal più recente. Senza articoli la pagina non esiste. */
export default function Guida() {
    const { t, lingua } = useLingua()
    if (GUIDA.length === 0) return <Navigate to="/404" replace />

    return (
        <>
            <Seo
                titolo="Guida Piscine Rocks Design in Sicilia | Luna Costruzioni"
                descrizione="Costi, permessi, manutenzione e scelte di progetto di una Piscina Rocks Design in Sicilia, spiegati dal concessionario autorizzato."
                percorso={PERCORSO_GUIDA}
                schema={schemaBriciole(BRICIOLE_GUIDA)}
            />
            <Briciole voci={BRICIOLE_GUIDA} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">{t('Guida', 'Guide')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">
                        {t(`Piscine Rocks Design in ${AZIENDA.zona}: le risposte`, 'Piscine Rocks Design in Sicily: the answers')}
                    </h1>
                    <p className="testo-lungo mt-6">
                        {t(
                            'Le domande che riceviamo più spesso, una per articolo: quanto si spende, che permessi servono, come si mantiene una piscina con spiaggia in sabbia. Risposte scritte da chi le costruisce, senza promesse che non possiamo mantenere.',
                            'The questions we are asked most often, one per article: what it costs, which permits you need, how a pool with a sand beach is looked after. Answers written by the people who build them, with no promises we cannot keep.',
                        )}
                    </p>
                </Rivela>

                <ol className="mt-14 grid gap-5 md:grid-cols-2">
                    {GUIDA.map((a, i) => (
                        <Rivela as="li" key={a.slug} delay={i * 60} className="scheda flex flex-col">
                            <p className="text-xs text-neutro-500">
                                <time dateTime={a.aggiornato || a.pubblicato}>
                                    {a.aggiornato
                                        ? t(`Aggiornato il ${formattaData(a.aggiornato)}`, `Updated ${formattaData(a.aggiornato, 'en')}`)
                                        : formattaData(a.pubblicato, lingua)}
                                </time>
                            </p>
                            <h2 className="mt-3 text-xl leading-snug">
                                <Link to={percorsoArticolo(a)} className="hover:text-accento">
                                    {t(a.titolo, a.titoloEn)}
                                </Link>
                            </h2>
                            <p className="testo-lungo mt-3 flex-1">{t(a.sintesi, a.sintesiEn)}</p>
                            <Link to={percorsoArticolo(a)} className="link-sottile mt-5 self-start text-sm" aria-hidden="true" tabIndex={-1}>
                                {t('Leggi', 'Read')}
                            </Link>
                        </Rivela>
                    ))}
                </ol>
            </Sezione>

            <Cta
                titolo={t('Una domanda che qui non trovi?', 'A question you cannot find here?')}
                testo={t(
                    'Scrivici o chiamaci: rispondiamo noi, e il sopralluogo in giardino è gratuito.',
                    'Write or call us: you will hear back from us directly, and the site visit is free.',
                )}
                whatsapp
            />
        </>
    )
}
