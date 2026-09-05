import { Link } from 'react-router-dom'
import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { MODELLI, SABBIE } from '../data/content'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/modelli', label: 'Modelli' },
]

export default function Modelli() {
    return (
        <>
            <Seo
                titolo="I tre modelli di piscina: Caraibi, Mediterranea, Alpi | Luna Costruzioni"
                descrizione="Caraibi, Mediterranea, Alpi: tre modi di interpretare una piscina con spiaggia in sabbia. Guida alla scelta in base a giardino, esposizione e vegetazione. Luna Costruzioni S.r.l.s., concessionario autorizzato per la Sicilia."
                percorso="/modelli"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">I modelli</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        Tre atmosfere, nessuna misura standard
                    </h1>
                    <p className="testo-lungo mt-6">
                        Caraibi, Mediterranea e Alpi non sono formati da catalogo: sono tre direzioni progettuali.
                        Stabiliscono che tipo di roccia si sceglie, quale sabbia va sul fondale e quali piante
                        chiudono la scena. Da lì in poi il progetto segue il tuo giardino, e nessuna vasca esce
                        uguale a un’altra.
                    </p>
                    <p className="testo-lungo mt-4">
                        Se non sai da dove partire, la domanda giusta non è «quale mi piace di più in foto» ma{' '}
                        <strong className="font-semibold text-testo">«che cosa c’è già nel mio giardino»</strong>:
                        un ulivo secolare e una palma raccontano storie diverse.
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
                                    <h2 className="font-display text-2xl">{m.nomeCompleto}</h2>
                                    <p className="mt-1 text-sm font-medium text-accento">{m.claim}</p>
                                    <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">{m.sintesi}</p>
                                    <p className="mt-4 text-sm text-neutro-500">
                                        <strong className="font-semibold text-neutro-300">Sabbie:</strong>{' '}
                                        {m.sabbie.join(', ')}
                                    </p>
                                    <span className="mt-auto pt-5 text-sm font-semibold text-accento group-hover:underline">
                                        Scopri il {m.nome} →
                                    </span>
                                </div>
                            </Link>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello="Come si sceglie"
                    titolo="Tre domande, prima ancora del sopralluogo"
                />
                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {[
                        [
                            'Quanto spazio hai davvero?',
                            'Una spiaggia in sabbia occupa più superficie della vasca. Se il giardino è contenuto, il modello Alpi rende di più: il ghiaietto chiede meno spazio.',
                        ],
                        [
                            'Che vegetazione c’è già?',
                            'Ulivi, agrumi e muretti a secco chiamano il Mediterranea. Un giardino nuovo, senza preesistenze forti, lascia libertà di andare sul Caraibi.',
                        ],
                        [
                            'Come batte il sole?',
                            'Una spiaggia in sabbia bianca esposta a sud da mezzogiorno alle cinque va ombreggiata. Non è un problema, ma va deciso a progetto e non a lavori finiti.',
                        ],
                    ].map(([t, d], i) => (
                        <Rivela key={t} delay={i * 90} className="scheda">
                            <h3 className="text-lg">{t}</h3>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{d}</p>
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
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello="Il dettaglio che decide"
                        titolo="Prima del modello, viene la sabbia"
                        testo="È il fondale a dare il colore all’acqua: la stessa vasca con sabbia Bianco o Ticino sembra un’altra piscina. Prima di scegliere il modello, vale la pena guardare le tre selezioni."
                    >
                        <ul className="mt-6 space-y-2 text-[1.0625rem] text-neutro-300">
                            {SABBIE.map(s => (
                                <li key={s.nome} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accento" />
                                    <span>
                                        <strong className="font-semibold">{s.nome}</strong> — {s.acqua.toLowerCase()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/sabbie" className="bottone-secondario mt-7">Confronta le sabbie</Link>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Cta
                titolo="Non riesci a decidere?"
                testo="È normale, e non è un problema: dopo il sopralluogo ti diciamo quale modello sfrutta meglio quello che hai già."
                primaria={{ to: '/contatti', label: 'Richiedi il sopralluogo' }}
                secondaria={{ to: '/quanto-costa', label: 'Quanto costa' }}
            />
        </>
    )
}
