import { Link, useParams, Navigate } from 'react-router-dom'
import Seo, { schemaBriciole, schemaServizio, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'
import { PUNTI_DI_FORZA, MODELLI } from '../data/content'

/** FAQ declinate sulla provincia: risposte locali, non testo duplicato. */
function faqLocali(p) {
    return [
        {
            domanda: `Realizzate Piscine Rocks Design in provincia di ${p.nome}?`,
            risposta: `Sì. ${AZIENDA.nome} è ${AZIENDA.ruolo} per la ${AZIENDA.zona} e opera regolarmente in provincia di ${p.nome}, incluse ${p.localita.slice(0, 3).join(', ')}. Il sopralluogo è gratuito: chiama ${AZIENDA.referente} al ${AZIENDA.telefono}.`,
        },
        {
            domanda: `Quanto costa una Piscina Rocks Design a ${p.nome}?`,
            risposta:
                'Il prezzo dipende da dimensioni, morfologia del terreno, modello e dagli elementi scelti (cascate, idromassaggio, illuminazione, spiaggia in sabbia). Non esiste un listino: dopo il sopralluogo ricevi un preventivo dettagliato e senza impegno.',
        },
        {
            domanda: `Servono permessi particolari nel Comune di ${p.nome}?`,
            risposta:
                'La metodologia costruttiva Rocks Design non impiega cemento armato né materiali nocivi: le vasche possono essere equiparate a laghetti e depositi d’acqua, semplificando l’iter anche in zone protette. Verifichiamo insieme la situazione specifica del tuo lotto con l’ufficio tecnico comunale.',
        },
    ]
}

const COPERTINE = [
    'palme-al-tramonto',
    'villa-con-spiaggia-in-ghiaia',
    'oasi-con-pontile-e-palme',
    'ghiaietto-e-acqua-smeraldo',
    'spiaggia-di-sabbia-privata',
    'illuminazione-calda-sui-monoliti',
    'giardino-tropicale',
    'oasi-con-pontile',
    'riflessi-al-tramonto',
]

export default function Zona() {
    const { provincia } = useParams()
    const p = PROVINCE.find(x => x.slug === provincia)
    if (!p) return <Navigate to="/404" replace />

    const indice = PROVINCE.indexOf(p)
    const copertina = COPERTINE[indice % COPERTINE.length]
    const faq = faqLocali(p)
    const briciole = [
        { to: '/', label: 'Home' },
        { to: '/piscine-rocks-design', label: 'La Piscina Rocks Design' },
        { to: `/piscine-rocks-design/${p.slug}`, label: p.nome },
    ]

    return (
        <>
            <Seo
                titolo={`Piscine Rocks Design a ${p.nome} | Luna Costruzioni srl, Concessionario Autorizzato`}
                descrizione={`Piscine in Tecnologia Rocks Design® in provincia di ${p.nome}: rocce monolitiche, sabbie naturali, senza cemento. Luna Costruzioni srl, concessionario autorizzato Piscine Rocks Design per la Sicilia. Sopralluogo gratuito a ${p.localita.slice(0, 3).join(', ')}.`}
                percorso={`/piscine-rocks-design/${p.slug}`}
                schema={[
                    schemaBriciole(briciole),
                    schemaServizio({
                        nome: `Realizzazione Piscine Rocks Design a ${p.nome}`,
                        descrizione: `Progettazione e realizzazione di piscine in Tecnologia Rocks Design® in provincia di ${p.nome}, Sicilia.`,
                        area: `Provincia di ${p.nome}`,
                    }),
                    schemaFaq(faq),
                ]}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">
                            {p.nome} · {p.sigla} · {AZIENDA.zona}
                        </p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Piscine Rocks Design a {p.nome}
                        </h1>
                        <p className="testo-lungo mt-6">{p.intro}</p>
                        <p className="testo-lungo mt-4">
                            <strong className="font-semibold text-pietra-800">{AZIENDA.nome}</strong> è{' '}
                            {AZIENDA.ruolo} per la {AZIENDA.zona}: realizziamo in provincia di {p.nome} piscine in
                            Tecnologia Rocks Design®, la tecnologia brevettata da {ROCKS_DESIGN.nome} di cui siamo
                            licenziatari ufficiali sul territorio.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-primario">
                                Sopralluogo gratuito a {p.nome}
                            </Link>
                            <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-secondario">
                                {AZIENDA.telefono}
                            </a>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug={copertina}
                            ratio="4 / 3"
                            className="rounded-2xl shadow-morbida"
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    occhiello={`Dove interveniamo in provincia di ${p.nome}`}
                    titolo={`Da ${p.localita[0]} a ${p.localita[p.localita.length - 1]}`}
                    testo={`Raggiungiamo l'intera provincia di ${p.nome} per sopralluogo, progetto, realizzazione e assistenza.`}
                />
                <ul className="mt-8 flex flex-wrap gap-2.5">
                    {p.localita.map(l => (
                        <li
                            key={l}
                            className="rounded-full border border-pietra-300 bg-white px-4 py-2 text-sm text-pietra-700"
                        >
                            {l}
                        </li>
                    ))}
                    <li className="rounded-full border border-pietra-300 bg-white px-4 py-2 text-sm text-pietra-500">
                        e tutti i comuni della provincia
                    </li>
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={`Perché a ${p.nome}`}
                    titolo={`Cosa cambia rispetto a una piscina tradizionale a ${p.nome}`}
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {PUNTI_DI_FORZA.map((v, i) => (
                        <Rivela as="li" key={v.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{v.titolo}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pietra-600">{v.testo}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    occhiello="I modelli"
                    titolo={`Quale modello scegliere nel ${p.nome === 'Palermo' ? 'palermitano' : `territorio di ${p.nome}`}`}
                    testo="Tre atmosfere possibili. Il modello giusto dipende da esposizione, vegetazione esistente e stile della casa."
                />
                <ul className="mt-12 grid gap-6 lg:grid-cols-3">
                    {MODELLI.map((m, i) => (
                        <Rivela as="li" key={m.slug} delay={i * 90} className="scheda">
                            <h3 className="font-display text-xl">{m.nome}</h3>
                            <p className="mt-1 text-sm text-acqua-700">{m.claim}</p>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-pietra-600">{m.adatto}</p>
                            <Link to="/modelli" className="link-sottile mt-4 inline-block text-sm font-medium">
                                Approfondisci
                            </Link>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Realizzazioni" titolo="Alcune Piscine Rocks Design" />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        slugs={['oasi-aerea-sabbia-bianca', 'cascata-su-roccia-rossa', 'idromassaggio-naturale']}
                    />
                </Rivela>
                <Rivela className="mt-8">
                    <Link to="/galleria" className="bottone-secondario">Vedi tutta la galleria</Link>
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione occhiello="Domande frequenti" titolo={`Piscine a ${p.nome}: le risposte`} />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-pietra-200 border-y border-pietra-200">
                    {faq.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-zona">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                                <h3 className="font-display text-lg text-pietra-900">{v.domanda}</h3>
                                <span className="mt-1 shrink-0 text-acqua-700 transition group-open:rotate-45" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="testo-lungo mt-3 pr-10">{v.risposta}</p>
                        </details>
                    ))}
                </div>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <IntestazioneSezione
                        occhiello={`Preventivo a ${p.nome}`}
                        titolo={`Richiedi un sopralluogo in provincia di ${p.nome}`}
                        testo={`${AZIENDA.referente} ti richiama entro 24 ore lavorative. Sopralluogo e preventivo gratuiti e senza impegno.`}
                    />
                    <Rivela delay={100}>
                        <ModuloContatto provinciaPreselezionata={p.nome} titolo={`Preventivo per ${p.nome}`} />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <h2 className="font-display text-xl">Altre province in cui operiamo</h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                    {PROVINCE.filter(x => x.slug !== p.slug).map(x => (
                        <li key={x.slug}>
                            <Link
                                to={`/piscine-rocks-design/${x.slug}`}
                                className="inline-block rounded-full border border-pietra-300 bg-white px-4 py-2 text-sm text-pietra-700 transition hover:border-acqua-500 hover:text-acqua-800"
                            >
                                Piscine a {x.nome}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Sezione>
        </>
    )
}
