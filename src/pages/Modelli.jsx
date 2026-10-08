import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { MODELLI, SABBIE } from '../data/content'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/modelli', label: 'Modelli' },
]

const DOMANDE = [
    {
        domanda: 'Quanto spazio hai davvero?',
        domandaEn: 'How much space do you really have?',
        risposta:
            'Una spiaggia in sabbia occupa più superficie della vasca. Se il giardino è contenuto, il modello Alpi rende di più: il ghiaietto chiede meno spazio.',
        rispostaEn:
            'A sand beach takes up more ground than the pool itself. If the garden is compact, the Alpi model makes better use of it: fine gravel needs less space.',
    },
    {
        domanda: 'Che vegetazione c’è già?',
        domandaEn: 'What is already growing there?',
        risposta:
            'Ulivi, agrumi e muretti a secco chiamano il Mediterranea. Un giardino nuovo, senza preesistenze forti, lascia libertà di andare sul Caraibi.',
        rispostaEn:
            'Olive and citrus trees and dry-stone walls point to the Mediterranea. A new garden, with nothing much there already, leaves you free to go for the Caraibi.',
    },
    {
        domanda: 'Come batte il sole?',
        domandaEn: 'Where does the sun fall?',
        risposta:
            'Una spiaggia in sabbia bianca esposta a sud da mezzogiorno alle cinque va ombreggiata. Non è un problema, ma va deciso a progetto e non a lavori finiti.',
        rispostaEn:
            'A white-sand beach facing south from midday to five o’clock needs shade. That is easy to solve, but it has to be decided at the design stage, not once the work is done.',
    },
]

export default function Modelli() {
    const { t } = useLingua()
    const briciole = BRICIOLE.map(v => (v.to === '/modelli' ? { ...v, label: t(v.label, 'Models') } : v))

    return (
        <>
            <Seo
                titolo="Modelli di piscina con spiaggia in sabbia | Luna Costruzioni"
                descrizione="Caraibi, Mediterranea e Alpi: sabbia e palme, pietra e ulivi, roccia e ghiaietto. Nessuna misura standard: in Sicilia contano spazio, piante e sole."
                percorso="/modelli"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">{t('I modelli', 'The models')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        {t('Tre atmosfere, nessuna misura standard', 'Three moods, no standard sizes')}
                    </h1>
                    <p className="testo-lungo mt-6">
                        {t(
                            'Caraibi, Mediterranea e Alpi sono tre direzioni progettuali. Stabiliscono che tipo di roccia si sceglie, quale sabbia va sul fondale e quali piante chiudono la scena. Da lì in poi il progetto segue il tuo giardino, e nessuna vasca esce uguale a un’altra.',
                            'Caraibi, Mediterranea and Alpi are three design directions. They set the kind of rock, the sand on the floor and the plants that frame the scene. From there the design follows your garden, and no two pools turn out the same.',
                        )}
                    </p>
                    <p className="testo-lungo mt-4">
                        {t(
                            'Se non sai da dove partire, la domanda giusta non è «quale mi piace di più in foto» ma ',
                            'If you are not sure where to start, the useful question is not “which one do I like best in the photos” but ',
                        )}
                        <strong className="font-semibold text-testo">
                            {t('«che cosa c’è già nel mio giardino»', '“what is already in my garden”')}
                        </strong>
                        {t(
                            ': un ulivo secolare e una palma raccontano storie diverse.',
                            ': an ancient olive tree and a palm tell different stories.',
                        )}
                    </p>
                </Rivela>

                <ul className="mt-14 grid gap-8 lg:grid-cols-3">
                    {MODELLI.map((m, i) => (
                        <Rivela as="li" key={m.slug} delay={i * 110} className="flex">
                            <Link
                                to={`/modelli/${m.slug}`}
                                className="group flex flex-col overflow-hidden rounded-lg bg-superficie shadow-sm transition hover:shadow-morbida"
                            >
                                <Immagine
                                    slug={m.copertina}
                                    ratio="4 / 3"
                                    sizes="(min-width: 1024px) 32vw, 92vw"
                                    priority={i === 0}
                                    imgClassName="transition duration-700 group-hover:scale-105"
                                />
                                <div className="flex flex-1 flex-col p-6">
                                    <h2 className="font-display text-2xl">{t(m.nomeCompleto, m.nomeCompletoEn)}</h2>
                                    <p className="mt-1 text-sm font-medium text-neutro-300">{t(m.claim, m.claimEn)}</p>
                                    <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">{t(m.sintesi, m.sintesiEn)}</p>
                                    <p className="mt-4 text-sm text-neutro-500">
                                        <strong className="font-semibold text-neutro-300">{t('Sabbie:', 'Sands:')}</strong>{' '}
                                        {m.sabbie.join(', ')}
                                    </p>
                                    <span className="mt-auto pt-5 text-sm font-semibold text-accento group-hover:underline">
                                        {t(`Scopri il ${m.nome}`, `Explore the ${m.nome}`)} →
                                    </span>
                                </div>
                            </Link>
                        </Rivela>
                    ))}
                </ul>
                <CreditoFoto className="mt-6" />
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Come si sceglie', 'How to choose')}
                    titolo={t('Tre domande, prima ancora del sopralluogo', 'Three questions, before the site visit')}
                />
                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {DOMANDE.map((d, i) => (
                        <Rivela key={d.domanda} delay={i * 90} className="scheda">
                            <h3 className="text-lg">{t(d.domanda, d.domandaEn)}</h3>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{t(d.risposta, d.rispostaEn)}</p>
                        </Rivela>
                    ))}
                </div>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <Rivela>
                        <Immagine
                            slug="sabbie-naturali-campioni"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello={t('Il dettaglio che decide', 'The deciding detail')}
                        titolo={t('Prima del modello, viene la sabbia', 'Before the model, the sand')}
                        testo={t(
                            'È il fondale a dare il colore all’acqua: la stessa vasca con sabbia Bianco o Ticino sembra un’altra piscina. Prima di scegliere il modello, vale la pena guardare le tre selezioni.',
                            'The floor gives the water its colour: the same pool with Bianco or Ticino sand looks like a different pool. Before choosing a model, it is worth looking at the three selections.',
                        )}
                    >
                        <ul className="mt-6 space-y-2 text-[1.0625rem] text-neutro-300">
                            {SABBIE.map(s => (
                                <li key={s.nome} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutro-500" />
                                    <span>
                                        <strong className="font-semibold">{s.nome}</strong> — {t(s.acqua, s.acquaEn).toLowerCase()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/sabbie" className="bottone-secondario mt-7">{t('Confronta le sabbie', 'Compare the sands')}</Link>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Cta
                titolo={t('Non riesci a decidere?', 'Can’t decide?')}
                testo={t(
                    'È normale, e non è un problema: guardando il giardino ti diciamo quale modello sfrutta meglio quello che hai già.',
                    'That is normal, and easily solved: once we have seen the garden we can tell you which model makes the most of what is already there.',
                )}
                primaria={{ to: '/contatti', label: t('Chiedi un preventivo', 'Ask for a quote') }}
                secondaria={{ to: '/quanto-costa', label: t('Quanto costa', 'Costs') }}
                whatsapp
            />
        </>
    )
}
