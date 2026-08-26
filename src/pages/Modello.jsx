import { Link, Navigate, useParams } from 'react-router-dom'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { MODELLI, SABBIE } from '../data/content'
import { AZIENDA } from '../data/site'

export default function Modello() {
    const { modello } = useParams()
    const m = MODELLI.find(x => x.slug === modello)
    if (!m) return <Navigate to="/404" replace />

    const altri = MODELLI.filter(x => x.slug !== m.slug)
    const sabbieModello = SABBIE.filter(s => m.sabbie.includes(s.nome))
    const briciole = [
        { to: '/', label: 'Home' },
        { to: '/modelli', label: 'Modelli' },
        { to: `/modelli/${m.slug}`, label: m.nome },
    ]

    return (
        <>
            <Seo
                titolo={`${m.nomeCompleto}: piscina con spiaggia in sabbia | Luna Costruzioni, Sicilia`}
                descrizione={`${m.sintesi} Realizzato in Tecnologia Rocks Design® da Luna Costruzioni srl, concessionario autorizzato per la Sicilia. Sopralluogo e preventivo gratuiti.`}
                percorso={`/modelli/${m.slug}`}
                immagine={`https://www.lunacostruzioni.it/media/${m.copertina}-1280.jpg`}
                schema={[
                    schemaBriciole(briciole),
                    schemaServizio({
                        nome: `${m.nomeCompleto} — piscina Rocks Design`,
                        descrizione: m.sintesi,
                        area: 'Sicilia',
                    }),
                ]}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{m.claim}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{m.nomeCompleto}</h1>
                        <p className="testo-lungo mt-6">{m.testo}</p>
                        <p className="mt-6 rounded-xl bg-acqua-50 px-5 py-4 text-[0.95rem] leading-relaxed text-acqua-900">
                            <strong className="font-semibold">Quando ha senso sceglierlo:</strong> {m.adatto}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-primario">Chiedi un progetto {m.nome}</Link>
                            <Link to="/quanto-costa" className="bottone-secondario">Che cosa incide sul prezzo</Link>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug={m.copertina}
                            ratio="4 / 3"
                            className="rounded-2xl shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    occhiello="Le sabbie di questo modello"
                    titolo={sabbieModello.length > 1 ? 'Due strade possibili' : 'La sabbia che lo caratterizza'}
                    testo="È la sabbia a decidere il colore dell’acqua: la vedi e la tocchi durante il sopralluogo."
                />
                <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                    {sabbieModello.map((s, i) => (
                        <Rivela as="li" key={s.nome} delay={i * 90} className="scheda">
                            <h2 className="font-display text-2xl">Sabbia {s.nome}</h2>
                            <p className="mt-1 text-sm font-medium text-acqua-700">{s.acqua}</p>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-pietra-600">{s.carattere}</p>
                            <p className="mt-2 text-[0.9rem] leading-relaxed text-pietra-500">{s.nota}</p>
                        </Rivela>
                    ))}
                </ul>
                <Rivela className="mt-8">
                    <Link to="/sabbie" className="bottone-secondario">Confronta tutte le sabbie</Link>
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Realizzazioni" titolo={`${m.nomeCompleto} in Sicilia e non solo`} />
                <Rivela className="mt-12">
                    <Galleria filtrabile={false} slugs={m.galleria} />
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione occhiello="Gli altri modelli" titolo="Non è detto che sia questo il tuo" />
                <ul className="mt-10 grid gap-6 md:grid-cols-2">
                    {altri.map((a, i) => (
                        <Rivela as="li" key={a.slug} delay={i * 100} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <Link to={`/modelli/${a.slug}`} className="group block">
                                <Immagine
                                    slug={a.copertina}
                                    ratio="16 / 9"
                                    sizes="(min-width: 768px) 46vw, 92vw"
                                    imgClassName="transition duration-700 group-hover:scale-105"
                                />
                                <div className="p-6">
                                    <h3 className="font-display text-xl">{a.nomeCompleto}</h3>
                                    <p className="mt-1 text-sm text-acqua-700">{a.claim}</p>
                                    <p className="mt-3 text-[0.95rem] leading-relaxed text-pietra-600">{a.sintesi}</p>
                                </div>
                            </Link>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <IntestazioneSezione
                        occhiello="Preventivo"
                        titolo={`Un ${m.nome} nel tuo giardino`}
                        testo={`${AZIENDA.referente} viene a misurare lo spazio e ti dice subito se questo modello è quello giusto. Sopralluogo e preventivo gratuiti in tutta la ${AZIENDA.zona}.`}
                    />
                    <Rivela delay={100}>
                        <ModuloContatto titolo={`Richiedi un progetto ${m.nome}`} />
                    </Rivela>
                </div>
            </Sezione>
        </>
    )
}
