import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { PERCORSO } from '../data/content'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/come-lavoriamo', label: 'Come lavoriamo' },
]

export default function ComeLavoriamo() {
    return (
        <>
            <Seo
                titolo="Come lavoriamo, dal sopralluogo alla consegna | Luna Costruzioni, Sicilia"
                descrizione="Cinque passaggi per la tua Piscina Rocks Design in Sicilia: sopralluogo, progetto sartoriale, pratiche e permessi, realizzazione, consegna e assistenza. Un unico referente."
                percorso="/come-lavoriamo"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">Il metodo</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        Dal sopralluogo alla prima nuotata
                    </h1>
                    <p className="testo-lungo mt-6">
                        Una piscina è un investimento importante: hai diritto a sapere in anticipo cosa succede, quando
                        e con chi. Ecco come lavoriamo in {AZIENDA.zona}, dal primo incontro all’assistenza dopo la
                        consegna.
                    </p>
                </Rivela>

                <ol className="mt-14 space-y-6">
                    {PERCORSO.map((p, i) => (
                        <Rivela as="li" key={p.numero} delay={i * 70} className="scheda flex flex-col gap-4 sm:flex-row sm:gap-8">
                            <span className="font-display text-4xl leading-none text-accento sm:w-24">{p.numero}</span>
                            <div>
                                <div className="flex flex-wrap items-baseline gap-3">
                                    <h2 className="text-xl">{p.titolo}</h2>
                                    {p.durata && (
                                        <span className="rounded-full bg-superficie px-3 py-1 text-xs font-medium text-neutro-400">
                                            {p.durata}
                                        </span>
                                    )}
                                </div>
                                <p className="testo-lungo mt-2">{p.testo}</p>
                            </div>
                        </Rivela>
                    ))}
                </ol>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <Rivela>
                        <Immagine
                            slug="oasi-con-pontile"
                            ratio="4 / 3"
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello="Chi fa cosa"
                        titolo="Il metodo è della casa madre, il cantiere è nostro"
                        testo="La Tecnologia Rocks Design® nasce dall'esperienza di Piscine Rocks Design nella lavorazione della roccia: il brevetto, gli standard costruttivi e la formazione delle squadre sono suoi. Quello che mettiamo noi è il lavoro sul campo — il sopralluogo, il cantiere, il rapporto con il tuo tecnico e l'assistenza negli anni successivi."
                    >
                        <p className="mt-6 rounded-xl border border-testo/[0.16] bg-superficie px-5 py-4 text-sm leading-relaxed text-neutro-400">
                            Per tutela del brevetto {ROCKS_DESIGN.nome} non pubblichiamo immagini delle fasi di
                            cantiere, delle tecniche costruttive o degli impianti impiegati. Durante il sopralluogo ti
                            spieghiamo di persona ogni passaggio.
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello="Trasparenza"
                    titolo="Cosa trovi nel preventivo"
                />
                <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
                    {[
                        'Dimensioni, profondità e forma della vasca',
                        'Modello, selezione delle rocce e tipo di sabbia',
                        'Cascate, aree idromassaggio e illuminazione',
                        'Opere di contorno: spiaggia, ciottolati, pontili',
                        'Tempi di realizzazione e modalità di pagamento',
                        'Assistenza post-consegna e stagionalità',
                    ].map((v, i) => (
                        <Rivela as="li" key={v} delay={i * 60} className="flex gap-3 rounded-xl bg-superficie px-5 py-4 text-[0.95rem] text-neutro-300 ring-1 ring-testo/[0.16]">
                            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-accento" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {v}
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Cta
                titolo="Iniziamo dal sopralluogo"
                testo="Gratuito e senza impegno, in tutta la Sicilia. Da lì nasce il progetto."
                primaria={{ to: '/contatti', label: 'Prenota il sopralluogo' }}
                secondaria={{ to: '/domande-frequenti', label: 'Leggi le FAQ' }}
            />
        </>
    )
}
