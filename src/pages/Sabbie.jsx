import { Link } from 'react-router-dom'
import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { SABBIE } from '../data/content'
import { AZIENDA } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/piscine-rocks-design', label: 'Le piscine' },
    { to: '/sabbie', label: 'Le sabbie' },
]

const FAQ_SABBIA = [
    {
        domanda: 'La sabbia si può cambiare dopo?',
        risposta:
            'Sostituire la sabbia di una vasca già realizzata è un intervento possibile ma oneroso, e cambia il colore dell’acqua di tutta la piscina. Per questo la scelta si fa a progetto, guardando i campioni dal vivo e non a schermo: i tre toni sullo schermo di un telefono si somigliano molto più di quanto si somiglino davvero.',
    },
    {
        domanda: 'La sabbia scotta sotto il sole siciliano?',
        risposta:
            'La sabbia trattiene il calore, ed è uno dei motivi per cui è piacevole restarci sopra la sera. Nelle ore centrali di luglio e agosto, però, la spiaggia va ombreggiata: nel progetto prevediamo la posizione di alberature, vele o pergolati proprio per questo.',
    },
    {
        domanda: 'Come si pulisce il fondale in sabbia?',
        risposta:
            'Non serve svuotare la vasca. Alla consegna ti mostriamo la procedura di persona, perché è più semplice da vedere che da spiegare per iscritto. I dettagli tecnici del sistema fanno parte del brevetto Rocks Design e vengono illustrati al cliente al momento della consegna.',
    },
]

export default function Sabbie() {
    return (
        <>
            <Seo
                titolo="Le sabbie: Bianco, Giallo e Ticino | Luna Costruzioni, Sicilia"
                descrizione="Bianco, Giallo, Ticino: le tre sabbie naturali di una piscina in Tecnologia Rocks Design® e il colore d'acqua che restituiscono. Guida alla scelta con Luna Costruzioni srl, Sicilia."
                percorso="/sabbie"
                immagine="https://www.lunacostruzioni.it/media/sabbie-naturali-campioni-1280.jpg"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ_SABBIA)]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">Il fondale</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            È la sabbia a decidere il colore dell’acqua
                        </h1>
                        <p className="testo-lungo mt-6">
                            In una piscina tradizionale il colore lo dà il rivestimento: un telo azzurro fa acqua
                            azzurra, un mosaico scuro fa acqua scura. Qui funziona diversamente. Il fondale è sabbia
                            vera, e la tonalità che vedrai nasce dall’incontro fra il colore dei granelli, la
                            profondità e la luce del posto.
                        </p>
                        <p className="testo-lungo mt-4">
                            Sono disponibili tre selezioni. La scelta si fa dal vivo, mettendo i campioni sotto il sole
                            del tuo giardino o durante una visita alla nostra piscina espositiva: è l’unico modo
                            onesto per decidere.
                        </p>
                        <Link to="/showroom" className="bottone-primario mt-8">Vieni a vederle</Link>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="sabbie-naturali-campioni"
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
                    allineamento="centro"
                    occhiello="Le tre selezioni"
                    titolo="Bianco, Giallo, Ticino"
                />
                <ul className="mt-12 grid gap-6 lg:grid-cols-3">
                    {SABBIE.map((s, i) => (
                        <Rivela as="li" key={s.nome} delay={i * 100} className="scheda flex flex-col">
                            <span
                                aria-hidden="true"
                                className="h-16 w-16 rounded-full ring-1 ring-testo/[0.16]"
                                style={{
                                    background: { Bianco: '#EFE9DC', Giallo: '#DFC48D', Ticino: '#CFCBBC' }[s.nome],
                                }}
                            />
                            <h2 className="mt-5 font-display text-2xl">Sabbia {s.nome}</h2>
                            <p className="mt-1 text-sm font-medium text-accento">{s.acqua}</p>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">{s.carattere}</p>
                            <p className="mt-auto pt-3 text-[0.9rem] leading-relaxed text-neutro-500">{s.nota}</p>
                        </Rivela>
                    ))}
                </ul>
                <p className="mt-8 text-center text-sm text-neutro-500">
                    I riquadri colorati sono indicativi: nessuno schermo rende fedelmente una sabbia naturale.
                </p>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <Rivela>
                        <Immagine
                            slug="sabbie-naturali-granulometria"
                            ratio="4 / 3"
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello="Non è sabbia da cantiere"
                        titolo="La granulometria conta quanto il colore"
                        testo="I granelli sono selezionati per restare stabili sul fondale e piacevoli sotto i piedi. Una sabbia troppo fine si solleva a ogni bracciata e intorbidisce l’acqua; una troppo grossa è scomoda da calpestare. Il punto di equilibrio fra le due cose è parte di quello che stai comprando."
                    />
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione occhiello="Come si vede in opera" titolo="Lo stesso materiale, tre risultati" />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        slugs={['ombre-di-palme-sulla-sabbia', 'spiaggia-di-sabbia-privata', 'fondale-illuminato']}
                    />
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Domande frequenti" titolo="Sulla sabbia, in particolare" />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ_SABBIA.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-sabbia">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                                <h3 className="font-display text-lg text-testo">{v.domanda}</h3>
                                <span className="mt-1 shrink-0 text-accento transition group-open:rotate-45" aria-hidden="true">
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

            <Cta
                titolo="Portiamo i campioni in giardino"
                testo={`Durante il sopralluogo mettiamo le tre sabbie sotto il sole del tuo terreno. In tutta la ${AZIENDA.zona}, gratis.`}
                primaria={{ to: '/contatti', label: 'Prenota il sopralluogo' }}
                secondaria={{ to: '/modelli', label: 'Vedi i modelli' }}
            />
        </>
    )
}
