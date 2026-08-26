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
                titolo="La Piscina Rocks Design: com’è fatta e perché è diversa | Luna Costruzioni Sicilia"
                descrizione="Rocce monolitiche, sabbie naturali, nessun cemento armato: la Tecnologia Rocks Design® spiegata. Luna Costruzioni srl, concessionario autorizzato Piscine Rocks Design per la Sicilia."
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
                            È una piscina costruita con un <strong className="font-semibold text-pietra-800">brevetto</strong>:
                            pareti formate da rocce monolitiche, fondale in sabbia naturale, nessuna opera in cemento
                            armato. L’acqua resta limpida grazie a impianti tecnologici integrati, ma quello che vedi —
                            e che senti sotto i piedi — è materiale naturale.
                        </p>
                        <p className="testo-lungo mt-4">
                            La tecnologia è di <strong className="font-semibold text-pietra-800">{ROCKS_DESIGN.nome}</strong>.
                            {' '}{AZIENDA.nome} ne è <strong className="font-semibold text-pietra-800">concessionario
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
                            className="rounded-2xl shadow-morbida"
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello="I nostri punti di forza"
                    titolo="Quattro ragioni concrete"
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {PUNTI_DI_FORZA.map((p, i) => (
                        <Rivela as="li" key={p.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{p.titolo}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pietra-600">{p.testo}</p>
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
                                className="rounded-2xl shadow-morbida"
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

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    occhiello="Ambiente e permessi"
                    titolo="Rispetto del terreno, iter più semplice"
                />
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <Rivela className="scheda">
                        <h3 className="text-lg">Rispetto e stabilità</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-pietra-600">
                            Le Piscine Rocks Design riducono notevolmente l’impatto ambientale rispetto alle piscine
                            tradizionali. Il rispetto per il terreno è garantito dalla totale assenza di opere in
                            cemento o altri materiali strutturali invasivi; la stabilità dello scavo è assicurata dalle
                            pareti realizzate con rocce monolitiche. Le impermeabilizzazioni a contatto con il terreno
                            usano un EPDM chimicamente stabile, inerte e senza additivi inquinanti.
                        </p>
                    </Rivela>
                    <Rivela delay={100} className="scheda">
                        <h3 className="text-lg">Permessi anche in zone protette</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-pietra-600">
                            Grazie alla metodologia costruttiva, che non implica in alcun modo l’uso di cemento armato
                            né di materiali nocivi per l’ambiente, le Piscine Rocks Design possono essere equiparate ai
                            laghetti e ai depositi d’acqua: questo facilita il processo per ottenere i permessi di
                            costruzione anche in zone protette. Inoltre non comportano aumenti di tassazione per
                            l’immobile.
                        </p>
                    </Rivela>
                </div>
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

            <Cta
                titolo="Vuoi capire se il tuo giardino è adatto?"
                testo="Bastano un sopralluogo e una chiacchierata. Ti diciamo subito cosa è possibile fare, e a quali condizioni."
                primaria={{ to: '/contatti', label: 'Prenota il sopralluogo' }}
                secondaria={{ to: '/modelli', label: 'Vedi i modelli' }}
            />
        </>
    )
}
