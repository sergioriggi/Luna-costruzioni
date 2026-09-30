import { Link } from 'react-router-dom'
import Seo, { schemaBriciole, schemaServizio, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import ChiusuraContatto from '../components/ChiusuraContatto'
import BottoneTelefono from '../components/BottoneTelefono'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA, PROVINCE, ROCKS_DESIGN } from '../data/site'

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
    { to: '/', label: 'Home' },
    { to: '/piscine-rocks-design', label: 'La Piscina Rocks Design' },
    { to: PERCORSO_SICILIA, label: 'Sicilia' },
]

const anniDiCantiere = AZIENDA.annoRiferimento - AZIENDA.annoFondazione

const FAQ = [
    {
        domanda: 'Lavorate in tutte e nove le province?',
        risposta:
            'Sì. Scavo e posa li fanno le squadre dell’impresa, che si spostano con i nostri mezzi: un cantiere lontano allunga i trasporti di massi e macchine, non cambia il modo di lavorare né la persona che lo segue.',
    },
    {
        domanda: 'Avete già piscine Rocks Design in Sicilia da farmi vedere?',
        risposta: `Non ancora, e preferiamo dirlo subito. ${AZIENDA.nomeBreve} è concessionario autorizzato, formato sulla tecnologia da ${ROCKS_DESIGN.nome}; le fotografie del sito sono piscine della casa madre, in Lombardia. Quello che abbiamo alle spalle sono ${anniDiCantiere} anni di cantieri edili sull’isola: scavi, movimento terra, costruzioni.`,
    },
    {
        domanda: 'La pratica edilizia la seguite voi?',
        risposta:
            'Se vuoi, sì: è un servizio a parte, quotato separatamente dai lavori. La verifica di quale titolo serve, invece, la facciamo comunque e prima del preventivo, perché da lì dipende se il progetto si può fare.',
    },
]

export default function Sicilia() {
    return (
        <>
            <Seo
                titolo="Piscine Rocks Design in Sicilia, nelle nove province | Luna Costruzioni"
                descrizione="Piscine con spiaggia in sabbia e pareti in roccia in tutta la Sicilia: Palermo, Catania, Messina, Siracusa, Ragusa, Trapani, Agrigento, Caltanissetta, Enna. Permessi, costi e cosa conta in ogni provincia. Luna Costruzioni S.r.l.s., concessionario autorizzato Piscine Rocks Design."
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
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">Nove province, un’impresa</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Piscine Rocks Design in Sicilia
                        </h1>
                        <p className="testo-lungo mt-6">
                            <strong className="font-semibold text-testo">{AZIENDA.nome}</strong> è {AZIENDA.ruolo}{' '}
                            per la {AZIENDA.zona}. Siamo un’impresa edile: scavo, movimento terra e posa dei massi li
                            facciamo con mezzi e squadre nostre, da Trapani a Siracusa.
                        </p>
                        <p className="testo-lungo mt-4">
                            Una cosa va detta chiara: in Sicilia non abbiamo ancora consegnato una Piscina Rocks
                            Design. Le fotografie del sito sono piscine della casa madre, costruite in Lombardia. In
                            cantiere portiamo {anniDiCantiere} anni di lavori edili sull’isola e la formazione sulla
                            tecnologia fatta con {ROCKS_DESIGN.nome}.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#contatti" className="bottone-primario">Dicci dove si trova il terreno</a>
                            <BottoneTelefono className="bottone-secondario" />
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="villa-con-spiaggia-in-ghiaia"
                            ratio="4 / 3"
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            priority
                        />
                        <p className="mt-3 text-sm text-neutro-500">
                            Una piscina della casa madre in Lombardia: ghiaia e massi al posto del bordo, acqua bassa
                            dove si entra. Materiali che in un giardino siciliano non stonano.
                        </p>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione occhiello="Vale in tutta l’isola" titolo="Le cose che non cambiano da una provincia all’altra" />
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <Rivela className="scheda">
                        <h3 className="text-lg">Com’è fatta</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            Pareti in massi, fondo in sabbia, nessun getto di cemento armato: le caratteristiche una per
                            una sono spiegate nella pagina{' '}
                            <Link to="/piscine-rocks-design" className="link-sottile font-medium text-accento">
                                La Piscina Rocks Design
                            </Link>
                            .
                        </p>
                    </Rivela>
                    <Rivela delay={80} className="scheda">
                        <h3 className="text-lg">Permessi</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            Una piscina interrata richiede un titolo edilizio in qualunque Comune. Quale, lo decidono il
                            regolamento comunale e i vincoli sul lotto: paesaggistici, idrogeologici, archeologici. Sulle
                            ville al mare c’è in più la fascia dei 150 metri dalla battigia, dove la legge regionale
                            siciliana vieta di costruire: è la prima cosa che controlliamo. Niente cemento armato aiuta
                            nella valutazione, ma non esonera dalla pratica.
                        </p>
                    </Rivela>
                    <Rivela delay={160} className="scheda">
                        <h3 className="text-lg">Costo</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            Non c’è un listino. Il prezzo lo fanno dimensione, accessi al giardino, modello e opere di
                            contorno; la distanza del cantiere entra nei trasporti. Il numero vero arriva dopo il
                            sopralluogo, che come il preventivo non costa nulla. Le voci una per una sono in{' '}
                            <Link to="/quanto-costa" className="link-sottile font-medium text-accento">
                                Quanto costa
                            </Link>
                            .
                        </p>
                    </Rivela>
                    <Rivela delay={240} className="scheda">
                        <h3 className="text-lg">Quando partire</h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            La stagione dei bagni in Sicilia è lunga, ma chi vuole la piscina pronta per giugno deve
                            avere pratica e cantiere avviati in inverno: i mesi che si perdono sono quasi sempre quelli
                            dell’ufficio tecnico, non quelli dello scavo.
                        </p>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello="Provincia per provincia"
                    titolo="Che cosa conta dove vivi"
                    testo="Per ogni provincia, la cosa che cambia davvero il progetto e i comuni principali. Il resto della provincia lo raggiungiamo allo stesso modo."
                />
                <nav aria-label="Province" className="mt-8">
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
                                Provincia di {p.nome} <span className="text-sm text-neutro-500">({p.sigla})</span>
                            </h2>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">{p.intro}</p>
                            <p className="mt-3 text-sm text-neutro-500">
                                <strong className="font-semibold text-neutro-300">Comuni:</strong> {p.localita.join(', ')}.
                            </p>
                        </section>
                    ))}
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione occhiello="Domande" titolo="Tre domande che arrivano da tutta l’isola" />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-sicilia">
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

            <ChiusuraContatto
                occhiello="Preventivo"
                titolo="In che comune è il giardino?"
                testo="Con il comune e due righe sullo spazio capiamo già se ci sono vincoli da controllare e quanto è lontano il cantiere."
                modulo={{ titolo: 'Richiedi il preventivo' }}
            />
        </>
    )
}
