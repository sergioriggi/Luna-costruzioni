import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import { Sezione, Briciole } from '../components/Sezione'
import ModuloListaSopralluogo from '../components/ModuloListaSopralluogo'
import { PERCORSO_LISTA } from '../components/RiquadroListaSopralluogo'
import { AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/guida', label: 'Guida', labelEn: 'Guide' },
    { to: PERCORSO_LISTA, label: 'Lista sopralluogo', labelEn: 'Site survey checklist' },
]

/**
 * Le sei parti della lista, con gli stessi titoli del PDF
 * (scripts/lead-magnet/lista-sopralluogo.html). Se cambia il PDF, cambia qui.
 */
const PARTI = [
    ['Prima il permesso, poi il prezzo', 'il titolo edilizio, la zona del piano regolatore, i vincoli sul terreno.', 'Permit first, price second', 'the building permit, the zoning of the plot, any restrictions on the land.'],
    ['Se la casa è vicino al mare', 'la fascia dei 150 metri e quella dei 300 metri dalla battigia.', 'If the house is near the sea', 'the 150-metre and 300-metre strips from the shoreline.'],
    ['Quanto spazio c’è in giardino', 'le distanze dal confine e dal vicino, e da dove entrano i mezzi di scavo.', 'How much room there is in the garden', 'distances from the boundary and the neighbour, and how the digging machines get in.'],
    ['Che piscina ti immagini', 'i tre modelli e le cinque sabbie.', 'What kind of pool you have in mind', 'the three models and the five sands.'],
    ['Il budget e le domande da fare', 'che cosa sposta il preventivo e che cosa chiedere a chi te lo fa.', 'Budget and the questions to ask', 'what moves the quote and what to ask whoever prepares it.'],
    ['La scheda del tuo giardino', 'da compilare con il metro in mano, con lo spazio per uno schizzo.', 'Your garden form', 'to fill in with a tape measure in hand, with room for a sketch.'],
]

/** Pagina del lead magnet: che cosa c'è nella lista, a chi serve, il modulo. */
export default function ListaSopralluogo() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Lista sopralluogo piscina Sicilia (PDF) | Luna Costruzioni"
                descrizione="Permessi, vincoli sul mare, distanze dal confine, accesso dei mezzi e budget: la lista da compilare prima del sopralluogo per una piscina in Sicilia."
                percorso={PERCORSO_LISTA}
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
                    <div>
                        <Rivela className="max-w-prosa">
                            <p className="occhiello">{t('Guida · PDF da compilare', 'Guide · PDF to fill in')}</p>
                            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">
                                {t('Piscina in giardino: la lista per il sopralluogo', 'A pool in your garden: the site survey checklist')}
                            </h1>
                            <p className="testo-lungo mt-6">
                                {t(
                                    `Cinque pagine da stampare e compilare a penna, con le norme che valgono in ${AZIENDA.zona} e le misure da prendere in giardino prima di chiedere un preventivo.`,
                                    'Five pages to print and fill in by hand, with the rules that apply in Sicily and the measurements to take in the garden before you ask for a quote. The checklist is written in Italian: there is no English edition.',
                                )}
                            </p>
                        </Rivela>

                        <div className="mt-10 max-w-prosa">
                            <h2 className="font-display text-2xl leading-snug text-testo">{t('Che cosa c’è dentro', 'What is inside')}</h2>
                            <ol className="testo-lungo mt-5 list-decimal space-y-3 pl-5 marker:text-neutro-500">
                                {PARTI.map(([it, itTesto, en, enTesto]) => (
                                    <li key={it}>
                                        <strong className="text-testo">{t(it, en)}</strong>: {t(itTesto, enTesto)}
                                    </li>
                                ))}
                            </ol>

                            <h2 className="mt-10 font-display text-2xl leading-snug text-testo">{t('A chi serve', 'Who it is for')}</h2>
                            <p className="testo-lungo mt-4">
                                {t(
                                    'A chi ha una casa con giardino, una villa in campagna o una struttura ricettiva e pensa a una piscina, ma non è ancora al punto di chiedere un preventivo. Con la scheda compilata il sopralluogo parte dalle misure giuste. Le regole del tuo Comune e i vincoli del tuo terreno li conferma il tecnico che firma la pratica: la lista ti dice che cosa chiedergli.',
                                    'For anyone with a house and garden, a country villa or a guest business who is thinking about a pool but is not yet ready to ask for a quote. With the form filled in, the site survey starts from the right measurements. Your municipality’s rules and any restrictions on your land are confirmed by the professional who signs the planning application: the checklist tells you what to ask them.',
                                )}
                            </p>
                            <p className="testo-lungo mt-4">
                                {t('Per le norme spiegate per esteso ci sono gli articoli della ', 'For the rules explained in full, see the articles in the ')}
                                <Link to="/guida" className="link-sottile text-accento">{t('guida', 'guide')}</Link>.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Anteprima della copertina del PDF: stessa foto, stesso titolo. */}
                        <div>
                        <figure className="overflow-hidden rounded-lg border border-testo/16 bg-[#12202b]" aria-label={t('Anteprima della copertina', 'Cover preview')}>
                            <Immagine slug="oasi-aerea-sabbia-bianca" ratio="16 / 10" sizes="(min-width: 1024px) 26rem, 92vw" />
                            <figcaption className="px-5 pb-5 pt-4">
                                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#6fdcd5]">{t('Lista da compilare', 'Checklist to fill in')}</p>
                                <p className="mt-2 font-display text-xl leading-snug text-white">
                                    Piscina in giardino: che cosa verificare prima del sopralluogo
                                </p>
                                <p className="mt-2 text-xs text-[#a9c5cb]">{t('PDF, 5 pagine A4', 'PDF, 5 A4 pages, in Italian')}</p>
                            </figcaption>
                        </figure>
                        <CreditoFoto />
                        </div>
                        <ModuloListaSopralluogo />
                    </div>
                </div>
            </Sezione>
        </>
    )
}
