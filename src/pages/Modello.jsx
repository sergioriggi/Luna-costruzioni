import { Link, Navigate, useParams } from 'react-router-dom'
import Seo, { schemaBriciole, schemaModello, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { MODELLI, SABBIE } from '../data/content'

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
                titolo={m.seo.titolo}
                descrizione={m.seo.descrizione}
                percorso={`/modelli/${m.slug}`}
                immagine={`${m.copertina}-1280.jpg`}
                schema={[
                    schemaBriciole(briciole),
                    schemaServizio({
                        nome: `${m.nomeCompleto} — piscina Rocks Design`,
                        descrizione: m.sintesi,
                        area: 'Sicilia',
                    }),
                    // Il `Service` dice che cosa facciamo noi; il `Product` dice
                    // che cosa si compra e di chi è la tecnologia. Servono
                    // entrambi: il secondo è quello che impedisce di attribuire
                    // a Luna l'invenzione della Tecnologia Rocks Design.
                    schemaModello(m),
                ]}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{m.claim}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{m.nomeCompleto}</h1>
                        <p className="testo-lungo mt-6">{m.testo}</p>
                        <p className="mt-6 rounded-xl bg-accento/[0.08] px-5 py-4 text-[0.95rem] leading-relaxed text-neutro-200">
                            <strong className="font-semibold">Quando ha senso sceglierlo:</strong> {m.adatto}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-primario">Chiedi un progetto {m.nome}</Link>
                            <Link to="/quanto-costa" className="bottone-secondario">Quanto costa</Link>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug={m.copertina}
                            ratio="4 / 3"
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={`Sabbie per il ${m.nome}`}
                    titolo={sabbieModello.length > 1 ? 'Due strade possibili' : 'La sabbia che lo caratterizza'}
                />
                <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                    {sabbieModello.map((s, i) => (
                        <Rivela as="li" key={s.nome} delay={i * 90} className="scheda">
                            <h2 className="font-display text-2xl">Sabbia {s.nome}</h2>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">{m.noteSabbie[s.nome]}</p>
                        </Rivela>
                    ))}
                </ul>
                <Rivela className="mt-8">
                    <Link to="/sabbie" className="link-sottile text-sm font-medium text-accento">
                        Tutte e tre le sabbie
                    </Link>
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Realizzazioni" titolo={`${m.nomeCompleto}, come si presenta ultimata`} />
                <Rivela className="mt-12">
                    <Galleria filtrabile={false} voci={m.galleria} />
                </Rivela>
            </Sezione>

            {/*
              Gli altri due modelli come semplici link: le schede complete
              stanno su /modelli. Ripeterle qui metteva lo stesso testo su
              quattro pagine.
            */}
            <Sezione sfondo="bg-superficie" className="!py-12">
                <p className="max-w-prosa text-[0.95rem] leading-relaxed text-neutro-400">
                    Se il giardino chiede altro, guarda anche il{' '}
                    <Link to={`/modelli/${altri[0].slug}`} className="link-sottile font-medium text-accento">
                        {altri[0].nomeCompleto}
                    </Link>{' '}
                    e il{' '}
                    <Link to={`/modelli/${altri[1].slug}`} className="link-sottile font-medium text-accento">
                        {altri[1].nomeCompleto}
                    </Link>
                    , oppure i tre{' '}
                    <Link to="/modelli" className="link-sottile font-medium text-accento">
                        messi a confronto
                    </Link>
                    .
                </p>
            </Sezione>

            <ChiusuraContatto
                occhiello="Preventivo"
                titolo={`Un ${m.nome} nel tuo giardino`}
                testo={`Mandaci due righe su spazio ed esposizione: capiamo presto se il ${m.nome} ci sta, o se ti conviene un altro modello.`}
                modulo={{ titolo: `Richiedi un progetto ${m.nome}` }}
            />
        </>
    )
}
