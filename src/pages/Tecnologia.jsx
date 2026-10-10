import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import { PUNTI_DI_FORZA, ELEMENTI, DIFFERENZE, DIFFERENZE_EN } from '../data/content'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/piscine-rocks-design', label: 'La Piscina Rocks Design', labelEn: 'The Piscine Rocks Design pool' },
]

export default function Tecnologia() {
    const { t } = useLingua()
    const briciole = BRICIOLE.map(v => ({ to: v.to, label: t(v.label, v.labelEn) }))

    return (
        <>
            <Seo
                titolo="Com’è fatta una Piscina Rocks Design | Luna Costruzioni"
                descrizione="Massi monolitici, fondale in sabbia naturale, niente cemento armato: la Tecnologia Rocks Design® spiegata da un concessionario autorizzato in Sicilia."
                percorso="/piscine-rocks-design"
                immagine="monolite-al-tramonto-1280.jpg"
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
            <Briciole voci={briciole} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{t('Tecnologia Rocks Design®', 'Rocks Design Technology®')}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">
                            {t('Che cos’è una Piscina Rocks Design', 'What a Piscine Rocks Design pool is')}
                        </h1>
                        <p className="testo-lungo mt-6">
                            {t('È una piscina costruita con un ', 'It is a pool built under a ')}
                            <strong className="font-semibold text-testo">{t('brevetto', 'patent')}</strong>
                            {t(
                                ': pareti formate da rocce monolitiche, fondale in sabbia naturale, nessuna opera in cemento armato. L’acqua resta limpida grazie a impianti tecnologici integrati, ma quello che vedi — e che senti sotto i piedi — è materiale naturale.',
                                ': walls formed by monolithic rocks, a natural sand floor, no reinforced concrete. Built-in plant keeps the water clear, but what you see — and feel underfoot — is natural material.',
                            )}
                        </p>
                        <p className="testo-lungo mt-4">
                            {t('La tecnologia è di ', 'The technology belongs to ')}
                            <strong className="font-semibold text-testo">{ROCKS_DESIGN.nome}</strong>.{' '}
                            {t(`${AZIENDA.nome} ne è `, `${AZIENDA.nome} is `)}
                            <strong className="font-semibold text-testo">
                                {t(`concessionario autorizzato per la ${AZIENDA.zona}`, 'an authorised dealer for Sicily')}
                            </strong>
                            {t(
                                ': progettiamo e realizziamo sul territorio applicando la Tecnologia Rocks Design®, di cui non siamo inventori ma licenziatari ufficiali.',
                                ': we design and build locally using Rocks Design Technology®. We did not invent it; we are official licensees.',
                            )}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-pieno">{t('Chiedi un preventivo', 'Ask for a quote')}</Link>
                            <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="bottone-secondario">
                                {t(`Sito ufficiale ${ROCKS_DESIGN.nome}`, `Official ${ROCKS_DESIGN.nome} website`)}
                            </a>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="monolite-al-tramonto"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            priority
                        />
                        <CreditoFoto />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello={t('I nostri punti di forza', 'Our strengths')}
                    titolo={t('Quattro ragioni concrete', 'Four practical reasons')}
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {PUNTI_DI_FORZA.map((p, i) => (
                        <Rivela as="li" key={p.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{t(p.titolo, p.titoloEn)}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{t(p.testo, p.testoEn)}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Gli elementi', 'The elements')}
                    titolo={t('Di cosa è fatta', 'What it is made of')}
                    testo={t(
                        'Ogni Piscina Rocks Design nasce dalla combinazione di quattro famiglie di elementi. Le scegliamo insieme, in fase di progetto.',
                        'Every Piscine Rocks Design pool combines four families of elements. We choose them together, at the design stage.',
                    )}
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
                                className="rounded-lg"
                                sizes="(min-width: 1024px) 48vw, 92vw"
                            />
                            <div>
                                <p className="occhiello">{t(el.occhiello, el.occhielloEn)}</p>
                                <h2 className="mt-3 font-display text-2xl sm:text-3xl">{t(el.titolo, el.titoloEn)}</h2>
                                <p className="testo-lungo mt-4">{t(el.testo, el.testoEn)}</p>
                            </div>
                        </Rivela>
                    ))}
                </div>
                <CreditoFoto className="mt-10" />
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Ambiente e pratiche edilizie', 'Environment and permits')}
                    titolo={t('Rispetto del terreno, e che cosa comporta davvero', 'Respecting the land, and what that really means')}
                />
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <Rivela className="scheda">
                        <h3 className="text-lg">{t('Che cosa resta nel terreno', 'What stays in the ground')}</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                'Non ci sono getti di calcestruzzo né strutture armate: la tenuta dello scavo è affidata ai massi, l’impermeabilizzazione a un telo in EPDM chimicamente inerte. Rispetto a una vasca in cemento cambia sia la quantità di materiale introdotto nel terreno, sia quello che resterebbe da smaltire in caso di rimozione futura.',
                                'There are no concrete pours and no reinforced structures: the boulders hold the excavation, and a chemically inert EPDM liner makes it watertight. Compared with a concrete pool, less material goes into the ground, and less would need disposing of if the pool were ever removed.',
                            )}
                        </p>
                    </Rivela>
                    <Rivela delay={100} className="scheda">
                        <h3 className="text-lg">{t('Permessi: come stanno le cose', 'Permits: where things stand')}</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                'In Italia una piscina interrata richiede un titolo edilizio. Quale, dipende dal Comune, dal piano regolatore, dai vincoli sul lotto e da un quadro giurisprudenziale che non è uniforme: nel 2026 diverse pronunce hanno ribadito che si tratta di nuova costruzione. L’assenza di opere in cemento armato è un elemento che gioca a favore nella valutazione, ma ',
                                'In Italy an in-ground pool needs planning consent. Which kind depends on the municipality, the local plan, constraints on the plot and a body of case law that is not consistent: in 2026 several rulings confirmed that it counts as new construction. The absence of reinforced concrete counts in its favour in the assessment, but ',
                            )}
                            <strong className="font-semibold text-testo">
                                {t('non è una garanzia automatica', 'it is not an automatic guarantee')}
                            </strong>
                            {t(
                                '. Verifichiamo la tua situazione insieme al tuo tecnico prima di firmare qualsiasi cosa.',
                                '. We check your situation with your own surveyor or architect before anything is signed.',
                            )}
                        </p>
                    </Rivela>
                </div>
                <Rivela className="mt-6 rounded-lg border border-testo/16 bg-superficie px-5 py-4 text-sm leading-relaxed text-neutro-400">
                    {t(
                        'Se qualcuno ti promette una piscina «senza permessi» o «senza pratiche» prima ancora di aver visto il terreno, stai parlando con la persona sbagliata. Anche gli effetti catastali e fiscali vanno valutati caso per caso con il tuo professionista di fiducia.',
                        'If someone promises you a pool “with no permits” or “no paperwork” before they have even seen the land, you are talking to the wrong person. The effects on land registry and tax also need to be assessed case by case with your own adviser.',
                    )}
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Il confronto', 'The comparison')}
                    titolo={t('Rispetto a una piscina tradizionale', 'Compared with a conventional pool')}
                />
                <Rivela className="mt-10 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                        <caption className="sr-only">
                            {t(
                                'Confronto tra piscina tradizionale e Piscina Rocks Design',
                                'Comparison between a conventional pool and a Piscine Rocks Design pool',
                            )}
                        </caption>
                        <thead>
                            <tr className="border-b border-testo/16">
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500"> </th>
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500">
                                    {t('Piscina tradizionale', 'Conventional pool')}
                                </th>
                                <th scope="col" className="py-4 font-semibold text-testo">Piscina Rocks Design</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DIFFERENZE.map((riga, i) => {
                                const [voce, tradizionale, rocks] = t(riga, DIFFERENZE_EN[i])
                                return (
                                    <tr key={riga[0]} className="border-b border-testo/16">
                                        <th scope="row" className="py-4 pr-4 font-medium text-testo">{voce}</th>
                                        <td className="py-4 pr-4 text-neutro-500">{tradizionale}</td>
                                        <td className="py-4 font-medium text-testo">{rocks}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Rivela>
                {/*
                  Questa tabella confronta la FISICA delle due piscine e risponde
                  a «com'è fatta». Chi invece deve ancora scegliere fra le due ha
                  bisogno di un'altra risposta, e ha una pagina sua: senza questo
                  rimando le due si farebbero concorrenza sulla stessa ricerca.
                */}
                <Rivela className="mt-8 max-w-prosa rounded-lg border border-testo/16 bg-superficie px-5 py-4 text-[0.95rem] leading-relaxed text-neutro-400">
                    {t('Qui sopra c’è ', 'Above is ')}
                    <strong className="font-medium text-testo">{t('come sono fatte', 'how they are built')}</strong>
                    {t('. Se la domanda è invece ', '. If your question is ')}
                    <strong className="font-medium text-testo">{t('quale delle due scegliere', 'which of the two to choose')}</strong>
                    {t(
                        ' — costi, tempi, permessi, manutenzione, e dove conviene davvero il cemento — il confronto completo sta in una pagina a parte.',
                        ' — cost, timing, permits, maintenance, and where concrete is genuinely the better option — the full comparison has its own page.',
                    )}{' '}
                    <Link to="/piscina-in-cemento-o-rocks-design" className="link-sottile font-medium text-accento">
                        {t('Piscina in cemento o Piscina Rocks Design?', 'Concrete pool or Piscine Rocks Design pool?')}
                    </Link>
                </Rivela>
            </Sezione>

            <Cta
                titolo={t('Vuoi capire se il tuo giardino è adatto?', 'Want to know if your garden is suitable?')}
                testo={t(
                    'Bastano un sopralluogo e una chiacchierata. Ti diciamo subito cosa è possibile fare, e a quali condizioni.',
                    'A site visit and a conversation are enough. We tell you straight away what is possible, and on what terms.',
                )}
                primaria={{ to: '/contatti', label: t('Chiedi un preventivo', 'Ask for a quote') }}
                secondaria={{ to: '/modelli', label: t('Vedi i modelli', 'See the models') }}
                whatsapp
            />
        </>
    )
}
