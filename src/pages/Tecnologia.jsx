import { Link } from 'react-router-dom'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import { PUNTI_DI_FORZA, ELEMENTI, DIFFERENZE } from '../data/content'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/piscine-rocks-design', label: 'La Piscina Rocks Design' },
]

export default function Tecnologia() {
    return (
        <>
            <Seo
                titolo="Come è fatta una piscina di sabbia | Luna Costruzioni, Sicilia"
                descrizione="Come è fatta una piscina di sabbia in Tecnologia Rocks Design®: pareti in massi monolitici, fondale in sabbia naturale, nessun cemento armato. Differenze con biopiscine e piscine tradizionali. Luna Costruzioni srl, concessionario per la Sicilia."
                percorso="/piscine-rocks-design"
                immagine="https://www.lunacostruzioni.it/media/monolite-al-tramonto-1280.jpg"
                schema={[
                    schemaBriciole(BRICIOLE),
                    schemaServizio({
                        nome: 'Realizzazione Piscine Rocks Design in Sicilia',
                        descrizione:
                            'Progettazione e realizzazione di piscine in Tecnologia Rocks Design®: rocce monolitiche, sabbie naturali, senza cemento armato.',
                        area: 'Sicilia',
                    }),
                ]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">Tecnologia Rocks Design®</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Che cos’è una Piscina Rocks Design
                        </h1>
                        <p className="testo-lungo mt-6">
                            È una piscina costruita con un <strong className="font-semibold text-testo">brevetto</strong>:
                            pareti formate da rocce monolitiche, fondale in sabbia naturale, nessuna opera in cemento
                            armato. L’acqua resta limpida grazie a impianti tecnologici integrati, ma quello che vedi —
                            e che senti sotto i piedi — è materiale naturale.
                        </p>
                        <p className="testo-lungo mt-4">
                            La tecnologia è di <strong className="font-semibold text-testo">{ROCKS_DESIGN.nome}</strong>.
                            {' '}{AZIENDA.nome} ne è <strong className="font-semibold text-testo">concessionario
                            autorizzato per la {AZIENDA.zona}</strong>: progettiamo e realizziamo sul territorio
                            applicando la Tecnologia Rocks Design®, di cui non siamo inventori ma licenziatari ufficiali.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-primario">Richiedi un sopralluogo</Link>
                            <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="bottone-secondario">
                                Sito ufficiale {ROCKS_DESIGN.nome}
                            </a>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="monolite-al-tramonto"
                            ratio="4 / 3"
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello="I nostri punti di forza"
                    titolo="Quattro ragioni concrete"
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {PUNTI_DI_FORZA.map((p, i) => (
                        <Rivela as="li" key={p.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{p.titolo}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{p.testo}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello="Gli elementi"
                    titolo="Di cosa è fatta"
                    testo="Ogni Piscina Rocks Design nasce dalla combinazione di quattro famiglie di elementi. Le scegliamo insieme, in fase di progetto."
                />
                <div className="mt-14 space-y-16">
                    {ELEMENTI.map((el, i) => (
                        <Rivela
                            key={el.slug}
                            className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 ? 'lg:[&>figure]:order-2' : ''}`}
                        >
                            <Immagine
                                slug={{
                                    monoliti: 'palme-e-monoliti',
                                    sabbie: 'sabbie-naturali-campioni',
                                    cascate: 'cascata-e-massi-al-crepuscolo',
                                    idromassaggio: 'area-benessere-vista-alto',
                                }[el.slug]}
                                ratio="4 / 3"
                                className="rounded-lg shadow-morbida"
                                sizes="(min-width: 1024px) 48vw, 92vw"
                            />
                            <div>
                                <p className="occhiello">{el.occhiello}</p>
                                <h2 className="mt-3 font-display text-2xl sm:text-3xl">{el.titolo}</h2>
                                <p className="testo-lungo mt-4">{el.testo}</p>
                            </div>
                        </Rivela>
                    ))}
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello="Ambiente e pratiche edilizie"
                    titolo="Rispetto del terreno, e che cosa comporta davvero"
                />
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <Rivela className="scheda">
                        <h3 className="text-lg">Che cosa resta nel terreno</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            Non ci sono getti di calcestruzzo né strutture armate: la tenuta dello scavo è affidata ai
                            massi, l’impermeabilizzazione a un telo in EPDM chimicamente inerte. Rispetto a una vasca
                            in cemento cambia sia la quantità di materiale introdotto nel terreno, sia quello che
                            resterebbe da smaltire in caso di rimozione futura.
                        </p>
                    </Rivela>
                    <Rivela delay={100} className="scheda">
                        <h3 className="text-lg">Permessi: come stanno le cose</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            In Italia una piscina interrata richiede un titolo edilizio. Quale, dipende dal Comune, dal
                            piano regolatore, dai vincoli sul lotto e da un quadro giurisprudenziale che non è
                            uniforme: nel 2026 diverse pronunce hanno ribadito che si tratta di nuova costruzione.
                            L’assenza di opere in cemento armato è un elemento che gioca a favore nella valutazione,
                            ma <strong className="font-semibold text-testo">non è una garanzia automatica</strong>.
                            Verifichiamo la tua situazione insieme al tuo tecnico prima di firmare qualsiasi cosa.
                        </p>
                    </Rivela>
                </div>
                <Rivela className="mt-6 rounded-xl border border-testo/[0.16] bg-superficie px-5 py-4 text-sm leading-relaxed text-neutro-400">
                    Se qualcuno ti promette una piscina «senza permessi» o «senza pratiche» prima ancora di aver visto
                    il terreno, stai parlando con la persona sbagliata. Anche gli effetti catastali e fiscali vanno
                    valutati caso per caso con il tuo professionista di fiducia.
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello="Il confronto"
                    titolo="Rispetto a una piscina tradizionale"
                />
                <Rivela className="mt-10 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                        <caption className="sr-only">Confronto tra piscina tradizionale e Piscina Rocks Design</caption>
                        <thead>
                            <tr className="border-b border-testo/[0.16]">
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500"> </th>
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500">Piscina tradizionale</th>
                                <th scope="col" className="py-4 font-semibold text-accento">Piscina Rocks Design</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DIFFERENZE.map(([voce, tradizionale, rocks]) => (
                                <tr key={voce} className="border-b border-testo/[0.16]">
                                    <th scope="row" className="py-4 pr-4 font-medium text-testo">{voce}</th>
                                    <td className="py-4 pr-4 text-neutro-500">{tradizionale}</td>
                                    <td className="py-4 font-medium text-testo">{rocks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Rivela>
            </Sezione>

            <Cta
                titolo="Vuoi capire se il tuo giardino è adatto?"
                testo="Bastano un sopralluogo e una chiacchierata. Ti diciamo subito cosa è possibile fare, e a quali condizioni."
                primaria={{ to: '/contatti', label: 'Prenota il sopralluogo' }}
                secondaria={{ to: '/modelli', label: 'Vedi i modelli' }}
            />
        </>
    )
}
