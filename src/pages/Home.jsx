import { Link } from 'react-router-dom'
import Seo, { schemaAzienda, schemaFaq, schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Cta } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'
import { PUNTI_DI_FORZA, ELEMENTI, MODELLI, DIFFERENZE, FAQ, PERCORSO } from '../data/content'

const ICONE = {
    stella: 'm12 3.5 2.4 5.2 5.6.7-4.1 3.9 1 5.6-4.9-2.7-4.9 2.7 1-5.6L4 9.4l5.6-.7Z',
    onde: 'M3 8c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 13c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 18c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0',
    documento: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4',
    palma: 'M12 21c0-5 .6-8.6 2-11M12 10c-2.4-2.6-5.4-3-7.5-1.4M12 10c2.4-2.6 5.4-3 7.5-1.4M12 10c0-3 1.6-5 4-5.5M12 10c0-3-1.6-5-4-5.5',
}

export default function Home() {
    const eroe = 'oasi-aerea-sabbia-bianca'

    return (
        <>
            <Seo
                titolo="Piscine Rocks Design in Sicilia | Luna Costruzioni srl — Concessionario Autorizzato"
                descrizione="Luna Costruzioni srl è concessionario autorizzato Piscine Rocks Design per la Sicilia. Piscine su misura in Tecnologia Rocks Design®: rocce monolitiche, sabbie naturali, niente cemento. Sopralluogo gratuito a Palermo, Catania, Messina e in tutta l'isola."
                percorso="/"
                schema={[
                    schemaAzienda(),
                    schemaFaq(FAQ.slice(0, 5)),
                    schemaBriciole([{ to: '/', label: 'Home' }]),
                ]}
            />

            {/* ————————————————————————— Eroe ————————————————————————— */}
            <section className="relative isolate">
                <Immagine
                    slug={eroe}
                    priority
                    ratio="16 / 9"
                    className="h-[78vh] min-h-[520px] w-full sm:h-[86vh]"
                    sizes="100vw"
                />
                {/* doppio velo: verticale per il fondo, orizzontale per il testo sulla sabbia chiara */}
                <div className="absolute inset-0 bg-gradient-to-t from-pietra-900/90 via-pietra-900/45 to-pietra-900/55" />
                <div className="absolute inset-0 bg-gradient-to-r from-pietra-900/85 via-pietra-900/35 to-transparent" />
                <div className="absolute inset-0 flex items-end pb-16 sm:items-center sm:pb-0">
                    <div className="contenitore">
                        <div className="max-w-2xl text-white">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sabbia-200">
                                Concessionario autorizzato {ROCKS_DESIGN.nome} · {AZIENDA.zona}
                            </p>
                            <h1 className="mt-4 font-display text-4xl leading-[1.08] text-white [text-shadow:0_2px_24px_rgba(10,25,28,0.55)] sm:text-6xl">
                                La tua spiaggia privata,<br className="hidden sm:block" /> in giardino.
                            </h1>
                            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-sabbia-100/95 sm:text-lg">
                                Rocce monolitiche, sabbie naturali e acqua cristallina. Le{' '}
                                <strong className="font-semibold">Piscine Rocks Design</strong> non hanno un catalogo:
                                ogni vasca nasce sulla morfologia del tuo giardino, come un abito su misura.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link to="/contatti" className="bottone-chiaro">Sopralluogo gratuito</Link>
                                <Link
                                    to="/piscine-rocks-design"
                                    className="bottone border border-white/40 text-white backdrop-blur-sm hover:bg-white/10"
                                >
                                    Scopri la tecnologia
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ————————————————————— Rassicurazioni ————————————————————— */}
            <div className="border-b border-sabbia-200 bg-sabbia-100">
                <div className="contenitore grid gap-6 py-8 sm:grid-cols-3">
                    {[
                        ['Tecnologia brevettata', 'Realizziamo in Tecnologia Rocks Design®, su licenza della casa madre.'],
                        ['Progetto sartoriale', 'Nessun catalogo: forma, misura e dettagli nascono dal tuo giardino.'],
                        ['Tutta la Sicilia', 'Sopralluogo e assistenza nelle nove province siciliane.'],
                    ].map(([t, d], i) => (
                        <Rivela key={t} delay={i * 90} className="flex gap-3">
                            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-acqua-600" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-sm leading-relaxed text-pietra-600">
                                <strong className="block font-semibold text-pietra-900">{t}</strong>
                                {d}
                            </p>
                        </Rivela>
                    ))}
                </div>
            </div>

            {/* ————————————————————— Chi siamo / brand ————————————————————— */}
            <Sezione id="chi-siamo">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <IntestazioneSezione
                        occhiello="Chi siamo"
                        titolo="Il concessionario Piscine Rocks Design per la Sicilia"
                        testo="Luna Costruzioni srl porta in Sicilia la Tecnologia Rocks Design®. Il brevetto e la tecnologia sono di Piscine Rocks Design: noi siamo il concessionario ufficiale che progetta, realizza e assiste sul territorio, dal sopralluogo alla consegna."
                    >
                        <ul className="mt-7 space-y-3 text-[1.0625rem] text-pietra-700">
                            {[
                                'Un unico referente per tutto il progetto: Luciano Naro.',
                                'Rocce monolitiche manovrate da una tradizione di famiglia lunga tre generazioni.',
                                'Piscina espositiva visitabile su appuntamento.',
                            ].map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oro-500" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                        <Link to="/come-lavoriamo" className="bottone-secondario mt-8">Come lavoriamo</Link>
                    </IntestazioneSezione>

                    <Rivela delay={120} className="grid grid-cols-2 gap-4">
                        <Immagine slug="monolite-al-tramonto" ratio="3 / 4" className="rounded-2xl shadow-morbida" sizes="(min-width: 1024px) 24vw, 45vw" />
                        <Immagine slug="spiaggia-di-sabbia-privata" ratio="3 / 4" className="mt-10 rounded-2xl shadow-morbida" sizes="(min-width: 1024px) 24vw, 45vw" />
                    </Rivela>
                </div>
            </Sezione>

            {/* ————————————————————— Punti di forza ————————————————————— */}
            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello="I nostri punti di forza"
                    titolo="Perché una Piscina Rocks Design"
                    testo="Quattro caratteristiche che distinguono la Tecnologia Rocks Design® da qualsiasi piscina tradizionale."
                />
                <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {PUNTI_DI_FORZA.map((p, i) => (
                        <Rivela as="li" key={p.titolo} delay={i * 90} className="scheda">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-oro-400/60 text-oro-500">
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                                    <path d={ICONE[p.icona]} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <h3 className="mt-5 text-lg">{p.titolo}</h3>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pietra-600">{p.testo}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            {/* ————————————————————— Elementi ————————————————————— */}
            <Sezione id="elementi">
                <IntestazioneSezione
                    occhiello="I dettagli naturali"
                    titolo="Monoliti, sabbie, cascate, idromassaggio"
                    testo="Sono gli elementi che scegliamo insieme in fase di progetto: definiscono il carattere della tua piscina e il modo in cui la vivrai."
                />
                <div className="mt-14 space-y-16">
                    {ELEMENTI.map((el, i) => (
                        <Rivela
                            key={el.slug}
                            className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 ? 'lg:[&>figure]:order-2' : ''}`}
                        >
                            <Immagine
                                slug={
                                    { monoliti: 'masso-luminoso-nell-acqua', sabbie: 'ombre-di-palme-sulla-sabbia', cascate: 'cascata-su-roccia-rossa', idromassaggio: 'idromassaggio-naturale' }[el.slug]
                                }
                                ratio="4 / 3"
                                className="rounded-2xl shadow-morbida"
                                sizes="(min-width: 1024px) 48vw, 92vw"
                            />
                            <div>
                                <p className="occhiello">{el.occhiello}</p>
                                <h3 className="mt-3 font-display text-2xl sm:text-3xl">{el.titolo}</h3>
                                <p className="testo-lungo mt-4">{el.testo}</p>
                            </div>
                        </Rivela>
                    ))}
                </div>
            </Sezione>

            {/* ————————————————————— Modelli ————————————————————— */}
            <Sezione sfondo="bg-pietra-900 text-sabbia-100">
                <Rivela className="max-w-prosa">
                    <p className="occhiello text-acqua-300">I modelli</p>
                    <h2 className="titolo-sezione text-white">Tre interpretazioni della stessa tecnologia</h2>
                    <p className="mt-5 text-[1.0625rem] leading-relaxed text-sabbia-300">
                        Caraibi, Mediterranea, Alpi: il punto di partenza del progetto. Da lì ogni piscina prende
                        una strada diversa, perché nessuna Piscina Rocks Design è uguale a un’altra.
                    </p>
                </Rivela>
                <ul className="mt-14 grid gap-6 lg:grid-cols-3">
                    {MODELLI.map((m, i) => (
                        <Rivela as="li" key={m.slug} delay={i * 100} className="overflow-hidden rounded-2xl bg-white/5">
                            <Immagine
                                slug={{ caraibi: 'palme-al-tramonto', mediterranea: 'villa-con-spiaggia-in-ghiaia', alpi: 'ghiaietto-e-acqua-smeraldo' }[m.slug]}
                                ratio="4 / 3"
                                sizes="(min-width: 1024px) 32vw, 92vw"
                            />
                            <div className="p-6">
                                <h3 className="font-display text-xl text-white">{m.nome}</h3>
                                <p className="mt-1 text-sm text-acqua-200">{m.claim}</p>
                                <p className="mt-3 text-[0.95rem] leading-relaxed text-sabbia-300">{m.testo}</p>
                            </div>
                        </Rivela>
                    ))}
                </ul>
                <Rivela className="mt-10">
                    <Link to="/modelli" className="bottone-chiaro">Approfondisci i modelli</Link>
                </Rivela>
            </Sezione>

            {/* ————————————————————— Confronto ————————————————————— */}
            <Sezione>
                <IntestazioneSezione
                    occhiello="Il confronto"
                    titolo="Piscina tradizionale o Piscina Rocks Design?"
                    testo="La differenza non è estetica: cambia il modo di costruire, i materiali e ciò che senti sotto i piedi."
                />
                <Rivela className="mt-10 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                        <caption className="sr-only">
                            Confronto tra piscina tradizionale e Piscina Rocks Design
                        </caption>
                        <thead>
                            <tr className="border-b border-pietra-300">
                                <th scope="col" className="py-4 pr-4 font-semibold text-pietra-500"> </th>
                                <th scope="col" className="py-4 pr-4 font-semibold text-pietra-500">Piscina tradizionale</th>
                                <th scope="col" className="py-4 font-semibold text-acqua-700">Piscina Rocks Design</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DIFFERENZE.map(([voce, tradizionale, rocks]) => (
                                <tr key={voce} className="border-b border-pietra-200/70">
                                    <th scope="row" className="py-4 pr-4 font-medium text-pietra-900">{voce}</th>
                                    <td className="py-4 pr-4 text-pietra-500">{tradizionale}</td>
                                    <td className="py-4 font-medium text-pietra-800">{rocks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Rivela>
            </Sezione>

            {/* ————————————————————— Showroom ————————————————————— */}
            <Sezione id="showroom" sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello="La nostra piscina espositiva"
                    titolo="Vieni a trovarci presso la nostra sede"
                    testo="Le fotografie raccontano solo una parte. Dal vivo puoi camminare sulla sabbia, toccare i monoliti e capire davvero cosa significa una Piscina Rocks Design. Visita su appuntamento, in Sicilia."
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        slugs={['villa-con-spiaggia-in-ghiaia', 'oasi-con-pontile', 'illuminazione-calda-sui-monoliti']}
                    />
                </Rivela>
                <Rivela className="mt-10 flex flex-wrap justify-center gap-3">
                    <Link to="/showroom" className="bottone-primario">Prenota la visita</Link>
                    <Link to="/galleria" className="bottone-secondario">Vedi tutte le realizzazioni</Link>
                </Rivela>
            </Sezione>

            {/* ————————————————————— Percorso ————————————————————— */}
            <Sezione>
                <IntestazioneSezione
                    occhiello="Come lavoriamo"
                    titolo="Dal sopralluogo alla prima nuotata"
                    testo="Cinque passaggi chiari, un unico referente e tempi definiti in contratto."
                />
                <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PERCORSO.map((p, i) => (
                        <Rivela as="li" key={p.numero} delay={i * 80} className="scheda">
                            <span className="font-display text-3xl text-oro-500">{p.numero}</span>
                            <h3 className="mt-3 text-base">{p.titolo}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-pietra-600">{p.testo}</p>
                        </Rivela>
                    ))}
                </ol>
            </Sezione>

            {/* ————————————————————— Zone ————————————————————— */}
            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    occhiello="Dove operiamo"
                    titolo="Piscine Rocks Design in tutta la Sicilia"
                    testo="Sopralluogo, progetto, realizzazione e assistenza nelle nove province siciliane."
                />
                <ul className="mt-10 flex flex-wrap gap-3">
                    {PROVINCE.map(p => (
                        <li key={p.slug}>
                            <Link
                                to={`/piscine-rocks-design/${p.slug}`}
                                className="inline-flex items-center gap-2 rounded-full border border-pietra-300 bg-white px-5 py-2.5 text-sm font-medium text-pietra-700 transition hover:border-acqua-500 hover:text-acqua-800"
                            >
                                {p.nome}
                                <span className="text-xs text-pietra-400">{p.sigla}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Sezione>

            {/* ————————————————————— Contatto ————————————————————— */}
            <Sezione id="contatti">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <IntestazioneSezione
                        occhiello="Parliamone"
                        titolo="Raccontaci il tuo giardino"
                        testo="Ti richiamiamo entro 24 ore lavorative. Il sopralluogo e il preventivo sono gratuiti e senza impegno."
                    >
                        <dl className="mt-8 space-y-4 text-[1.0625rem]">
                            <div>
                                <dt className="text-sm text-pietra-500">Referente</dt>
                                <dd className="font-medium text-pietra-900">{AZIENDA.referente}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-pietra-500">Telefono</dt>
                                <dd>
                                    <a className="link-sottile font-medium text-pietra-900" href={`tel:${AZIENDA.telefonoRaw}`}>
                                        {AZIENDA.telefono}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-pietra-500">Zona servita</dt>
                                <dd className="font-medium text-pietra-900">Tutta la Sicilia</dd>
                            </div>
                        </dl>
                    </IntestazioneSezione>
                    <Rivela delay={100}>
                        <ModuloContatto />
                    </Rivela>
                </div>
            </Sezione>

            <Cta
                titolo="Una piscina che sembra lì da sempre"
                testo="Scopri come la Tecnologia Rocks Design® può trasformare il tuo giardino in un’oasi privata."
                primaria={{ to: '/contatti', label: 'Richiedi il sopralluogo' }}
                secondaria={{ to: '/galleria', label: 'Guarda la galleria' }}
            />
        </>
    )
}
