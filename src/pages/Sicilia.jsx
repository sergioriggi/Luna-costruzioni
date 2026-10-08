import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaServizio, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import ChiusuraContatto from '../components/ChiusuraContatto'
import BottoneTelefono from '../components/BottoneTelefono'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA, PROVINCE, ROCKS_DESIGN, PREZZO } from '../data/site'
import { useLingua } from '../i18n/lingua'

/*
 * Una pagina sola per tutta l'isola.
 *
 * Prima erano nove pagine, una per provincia, uguali al 95%: cambiavano il
 * nome della città, una riga d'apertura e i nomi nelle FAQ. Piscine Rocks
 * Design le ha giudicate ripetitive, e avevano ragione. Qui il testo comune —
 * com'è fatta, permessi, costi, stagione — si scrive una volta; per ogni
 * provincia resta solo ciò che è davvero suo, in una sezione con ancora
 * (`#palermo`, `#catania`, …). I vecchi indirizzi rispondono 301 verso
 * l'ancora giusta: vedi `public/.htaccess` e `server/sito-statico.js`.
 */

const PERCORSO_SICILIA = '/piscine-rocks-design/sicilia'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/piscine-rocks-design', label: 'La Piscina Rocks Design', labelEn: 'The Piscine Rocks Design pool' },
    { to: PERCORSO_SICILIA, label: 'Sicilia', labelEn: 'Sicily' },
]

const anniDiCantiere = AZIENDA.annoRiferimento - AZIENDA.annoFondazione

const FAQ = [
    {
        domanda: 'Lavorate in tutte e nove le province?',
        domandaEn: 'Do you work in all nine provinces?',
        risposta:
            'Sì. Scavo e posa li fanno le squadre dell’impresa, che si spostano con i nostri mezzi: un cantiere lontano allunga solo i trasporti di massi e macchine.',
        rispostaEn:
            'Yes. Digging and laying are done by our own crews, who travel with our own machines. A distant site only means longer haulage for the boulders and the plant.',
    },
    {
        domanda: 'Avete già piscine Rocks Design in Sicilia da farmi vedere?',
        domandaEn: 'Do you already have Rocks Design pools in Sicily I can see?',
        risposta: `Non ancora, e preferiamo dirlo subito. ${AZIENDA.nomeBreve} è concessionario autorizzato, formato sulla tecnologia da ${ROCKS_DESIGN.nome}; le fotografie del sito sono piscine della casa madre, in Lombardia. Quello che abbiamo alle spalle sono ${anniDiCantiere} anni di cantieri edili sull’isola: scavi, movimento terra, costruzioni.`,
        rispostaEn: `Not yet, and we would rather say so up front. ${AZIENDA.nomeBreve} is an authorised dealer, trained in the technology by ${ROCKS_DESIGN.nome}; the photos on this site are the manufacturer’s pools in Lombardy. What we do have behind us is ${anniDiCantiere} years of building work on the island: excavation, earthworks, construction.`,
    },
    {
        domanda: 'La pratica edilizia la seguite voi?',
        domandaEn: 'Do you handle the planning application?',
        risposta:
            'Se vuoi, sì: è un servizio a parte, quotato separatamente dai lavori. La verifica di quale titolo serve, invece, la facciamo comunque e prima del preventivo, perché da lì dipende se il progetto si può fare.',
        rispostaEn:
            'If you like, yes: it is a separate service, priced separately from the works. Checking which permit is needed, on the other hand, we always do, and before the quote, because that decides whether the project can go ahead.',
    },
]

export default function Sicilia() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Piscine Rocks Design nelle nove province | Luna Costruzioni"
                descrizione="Nove province: cosa cambia in Sicilia per una piscina con spiaggia in sabbia e pareti in roccia, tra roccia lavica, calcare, vento e pendenze."
                percorso={PERCORSO_SICILIA}
                schema={[
                    schemaBriciole(BRICIOLE),
                    schemaServizio({
                        nome: 'Realizzazione Piscine Rocks Design in Sicilia',
                        descrizione:
                            'Progettazione e realizzazione di piscine in Tecnologia Rocks Design® nelle nove province siciliane, chiavi in mano.',
                        area: 'Sicilia',
                    }),
                    schemaFaq(FAQ),
                ]}
            />
            <Briciole voci={BRICIOLE.map(v => ({ ...v, label: t(v.label, v.labelEn) }))} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{t('Le nove province', 'All nine provinces')}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            {t('Piscine Rocks Design in Sicilia', 'Piscine Rocks Design pools in Sicily')}
                        </h1>
                        <p className="testo-lungo mt-6">
                            <strong className="font-semibold text-testo">{AZIENDA.nome}</strong>{' '}
                            {t(
                                `è ${AZIENDA.ruolo} per la ${AZIENDA.zona}. Siamo un’impresa edile: scavo, movimento terra e posa dei massi li facciamo con mezzi e squadre nostre, da Trapani a Siracusa.`,
                                'is an authorised Piscine Rocks Design dealer in Sicily. We are a building contractor: digging, earthworks and laying the boulders are done with our own machines and crews, from Trapani to Siracusa.',
                            )}
                        </p>
                        <p className="testo-lungo mt-4">
                            {t(
                                `Una cosa va detta chiara: in Sicilia non abbiamo ancora consegnato una Piscina Rocks Design. Le fotografie del sito sono piscine della casa madre, costruite in Lombardia. In cantiere portiamo ${anniDiCantiere} anni di lavori edili sull’isola e la formazione sulla tecnologia fatta con ${ROCKS_DESIGN.nome}.`,
                                `One thing should be said plainly: we have not yet handed over a Piscine Rocks Design pool in Sicily. The photos on this site are the manufacturer’s pools, built in Lombardy. What we bring to the site is ${anniDiCantiere} years of building work on the island and our training in the technology with ${ROCKS_DESIGN.nome}.`,
                            )}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#contatti" className="bottone-pieno">{t('Chiedi un preventivo', 'Ask for a quote')}</a>
                            <BottoneTelefono className="bottone-secondario" />
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="villa-con-spiaggia-in-ghiaia"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            priority
                        />
                        <p data-didascalia="" className="mt-3 text-sm text-neutro-500">
                            {t(
                                'Una piscina della casa madre in Lombardia: ghiaia e massi al posto del bordo, acqua bassa dove si entra. Materiali che in un giardino siciliano non stonano.',
                                'One of the manufacturer’s pools in Lombardy: gravel and boulders instead of a coping, shallow water where you walk in. Materials that sit comfortably in a Sicilian garden.',
                            )}
                        </p>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Vale in tutta l’isola', 'Island-wide')}
                    titolo={t('Le cose che non cambiano da una provincia all’altra', 'What stays the same from one province to the next')}
                />
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <Rivela className="scheda">
                        <h3 className="text-lg">{t('Com’è fatta', 'How it is built')}</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                'Pareti in massi, fondo in sabbia, nessun getto di cemento armato: le caratteristiche una per una sono spiegate nella pagina',
                                'Boulder walls, a sand floor, no reinforced concrete pour: each feature is explained on the page',
                            )}{' '}
                            <Link to="/piscine-rocks-design" className="link-sottile font-medium text-accento">
                                {t('La Piscina Rocks Design', 'The Piscine Rocks Design pool')}
                            </Link>
                            .
                        </p>
                    </Rivela>
                    <Rivela delay={80} className="scheda">
                        <h3 className="text-lg">{t('Permessi', 'Permits')}</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                'Una piscina interrata richiede un titolo edilizio in qualunque Comune. Quale, lo decidono il regolamento comunale e i vincoli sul lotto: paesaggistici, idrogeologici, archeologici. Sulle ville al mare c’è in più la fascia dei 150 metri dalla battigia, dove la legge regionale siciliana vieta di costruire: è la prima cosa che controlliamo. Niente cemento armato aiuta nella valutazione, ma non esonera dalla pratica.',
                                'An in-ground pool needs building consent in every municipality. Which kind depends on the local building rules and on any constraints on the plot: landscape, hydrogeological, archaeological. For seaside villas there is also the 150-metre strip from the shoreline, where Sicilian regional law prohibits building: it is the first thing we check. Having no reinforced concrete helps the assessment, but it does not exempt you from the application.',
                            )}
                        </p>
                    </Rivela>
                    <Rivela delay={160} className="scheda">
                        <h3 className="text-lg">{t('Costo', 'Cost')}</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                `Si parte da ${PREZZO.cifraLunga}. Da lì in su contano dimensione, accessi al giardino, modello e opere di contorno; la distanza del cantiere entra nei trasporti. Il numero vero arriva dopo il sopralluogo, che come il preventivo non costa nulla. Le voci una per una sono in`,
                                `Prices start from €${PREZZO.daMq.toLocaleString('en-GB')} per square metre, excluding VAT. Above that, what counts is size, access to the garden, the model and the surrounding works; the distance to the site goes into transport. The real figure comes after the site visit, which, like the quote, is free. Each item is set out in`,
                            )}{' '}
                            <Link to="/quanto-costa" className="link-sottile font-medium text-accento">
                                {t('Quanto costa', 'Costs')}
                            </Link>
                            .
                        </p>
                    </Rivela>
                    <Rivela delay={240} className="scheda">
                        <h3 className="text-lg">{t('Quando partire', 'When to start')}</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                'La stagione dei bagni in Sicilia è lunga, ma chi vuole la piscina pronta per giugno deve avere pratica e cantiere avviati in inverno: i mesi che si perdono sono quasi sempre quelli dell’ufficio tecnico.',
                                'The swimming season in Sicily is long, but if you want the pool ready for June, the application and the build need to be under way in winter. The months that get lost are almost always at the council’s planning office.',
                            )}
                        </p>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Provincia per provincia', 'Province by province')}
                    titolo={t('Che cosa conta dove vivi', 'What matters where you live')}
                    testo={t(
                        'Per ogni provincia, la cosa che cambia davvero il progetto e i comuni principali. Il resto della provincia lo raggiungiamo allo stesso modo.',
                        'For each province, the thing that really changes the project, and the main towns. We reach the rest of the province in the same way.',
                    )}
                />
                <nav aria-label={t('Province', 'Provinces')} className="mt-8">
                    <ul className="flex flex-wrap gap-2.5">
                        {PROVINCE.map(p => (
                            <li key={p.slug}>
                                <a
                                    href={`#${p.slug}`}
                                    className="inline-block rounded-full border border-testo/[0.16] bg-superficie px-4 py-2 text-sm text-neutro-300 transition hover:border-accento hover:text-accento-300"
                                >
                                    {p.nome}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    {PROVINCE.map(p => (
                        <section key={p.slug} id={p.slug} className="scheda scroll-mt-28">
                            <h2 className="font-display text-xl">
                                {t(`Provincia di ${p.nome}`, `Province of ${p.nome}`)}{' '}
                                <span className="text-sm text-neutro-500">({p.sigla})</span>
                            </h2>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">{t(p.intro, p.introEn)}</p>
                            <p className="mt-3 text-sm text-neutro-500">
                                <strong className="font-semibold text-neutro-300">{t('Comuni:', 'Towns:')}</strong> {p.localita.join(', ')}.
                            </p>
                        </section>
                    ))}
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Domande', 'Questions')}
                    titolo={t('Tre domande che arrivano da tutta l’isola', 'Three questions we hear from across the island')}
                />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-sicilia">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                                <h3 className="font-display text-lg text-testo">{t(v.domanda, v.domandaEn)}</h3>
                                <span className="mt-1 shrink-0 text-accento transition group-open:rotate-45" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="testo-lungo mt-3 pr-10">{t(v.risposta, v.rispostaEn)}</p>
                        </details>
                    ))}
                </div>
            </Sezione>

            <ChiusuraContatto
                occhiello={t('Preventivo', 'Quote')}
                titolo={t('In che comune è il giardino?', 'Which town is the garden in?')}
                testo={t(
                    'Con il comune e due righe sullo spazio capiamo già se ci sono vincoli da controllare e quanto è lontano il cantiere.',
                    'With the town and a couple of lines about the space, we can already tell whether there are constraints to check and how far away the site is.',
                )}
                modulo={{ titolo: t('Preventivo per il mio comune', 'A quote for my town') }}
            />
        </>
    )
}
