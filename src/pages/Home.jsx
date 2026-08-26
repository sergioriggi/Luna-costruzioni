import { Link } from 'react-router-dom'
import Seo, { schemaAzienda, schemaFaq, schemaBriciole } from '../components/Seo'
import Immagine, { tutteLeFoto } from '../components/Immagine'
import Rivela from '../components/Rivela'
import ModuloContatto from '../components/ModuloContatto'
import Recensioni from '../components/Recensioni'
import { AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'
import { CREDENZIALI, PERCORSO, DUBBI, RICETTIVO, FAQ } from '../data/content'
import { useLingua } from '../i18n/lingua'

/** Realizzazioni mostrate a mosaico: solo scatti di piscine, non di materiali. */
const MOSAICO = tutteLeFoto.filter(f => !f.tags.includes('materiali')).slice(0, 15)

function Sezione({ id, className = '', children }) {
    return (
        <section id={id} className={`border-t border-testo/[0.16] py-20 sm:py-24 ${className}`}>
            <div className="contenitore">{children}</div>
        </section>
    )
}

const CARATTERISTICHE = [
    {
        titolo: 'Forme libere',
        titoloEn: 'Free forms',
        testo: 'Nessuno stampo e nessun angolo obbligato: ogni vasca è disegnata sul giardino che la ospita.',
        testoEn: 'No mould, no forced corner: every basin is drawn around the garden that holds it.',
    },
    {
        titolo: 'Pietra e acqua',
        titoloEn: 'Stone and water',
        testo: 'Rocce, ghiaia e finiture scelte per reggere il sole forte e la salsedine.',
        testoEn: 'Rock, gravel and finishes chosen to live with strong sun and salt air.',
    },
    {
        titolo: 'Si vive di sera',
        titoloEn: 'Made for evenings',
        testo: 'Illuminazione integrata nelle rocce e nei bordi: resta il centro del giardino anche al buio.',
        testoEn: 'Lighting set into the rock and the edges: it stays the centre of the garden after dark.',
    },
]

export default function Home() {
    const { t } = useLingua()

    return (
        <>
            <Seo
                titolo="Luna Costruzioni srl — Piscine Rocks Design in Sicilia, chiavi in mano"
                descrizione="Luna Costruzioni srl, impresa edile e concessionario autorizzato Piscine Rocks Design per la Sicilia: sopralluogo, scavi, realizzazione, messa in opera e collaudo. Un solo interlocutore per tutto il cantiere."
                percorso="/"
                schema={[
                    schemaAzienda(),
                    schemaFaq(FAQ.slice(0, 6)),
                    schemaBriciole([{ to: '/', label: 'Home' }]),
                ]}
            />

            {/* ───────────────────────────── Eroe ───────────────────────────── */}
            <section id="top" className="relative isolate overflow-hidden">
                <Immagine
                    slug="illuminazione-calda-sui-monoliti"
                    priority
                    riempi
                    className="absolute inset-0 h-full w-full"
                    sizes="100vw"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(75deg, #161826 0%, rgba(22,24,38,0.86) 38%, rgba(22,24,38,0.2) 78%)',
                    }}
                />
                <div className="contenitore relative flex min-h-[560px] items-end pb-16 pt-32 sm:min-h-[640px] sm:pb-20">
                    <div className="max-w-[780px]">
                        <p className="occhiello">
                            {t('Piscine Rocks Design in Sicilia', 'Piscine Rocks Design in Sicily')}
                        </p>
                        <h1 className="mt-5 max-w-[15em] text-[34px] leading-[1.06] tracking-[-0.025em] sm:text-[44px] lg:text-eroe">
                            {t(
                                'La tua Piscina Rocks Design, dal primo scavo al primo bagno.',
                                'Your Piscine Rocks Design pool, from the first dig to the first swim.',
                            )}
                        </h1>
                        <p className="mt-6 max-w-prosa text-[15px] leading-[1.6] text-neutro-300 sm:text-[17px]">
                            {t(
                                `${AZIENDA.nome} è concessionario autorizzato ${ROCKS_DESIGN.nome} per la Sicilia e, in quanto impresa edile, realizza la piscina in Tecnologia Rocks Design® chiavi in mano: scavi, realizzazione, messa in opera e collaudo. Un solo interlocutore per tutto il cantiere.`,
                                `${AZIENDA.nome} is the authorised ${ROCKS_DESIGN.nome} dealer for Sicily and, as a building contractor, delivers your Rocks Design Technology pool turnkey: excavation, construction, installation and commissioning. One point of contact for the whole job.`,
                            )}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-pieno no-underline">
                                {t('Richiedi un sopralluogo', 'Book a site visit')}
                            </Link>
                            <Link to="/galleria" className="bottone-secondario no-underline">
                                {t('Guarda le realizzazioni', 'See the projects')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────────────────── Fascia credenziali ─────────────────────── */}
            <div className="border-y border-testo/[0.16] bg-superficie">
                <div className="contenitore grid gap-7 py-8 sm:grid-cols-2 lg:grid-cols-4">
                    {CREDENZIALI.map((c, i) => (
                        <Rivela key={c.titolo} delay={i * 70}>
                            <p className="font-display text-[13px] font-medium uppercase tracking-[0.1em] text-accento-300">
                                {t(c.titolo, c.titoloEn)}
                            </p>
                            <p className="mt-2 text-[13px] leading-relaxed text-neutro-400">
                                {t(c.testo, c.testoEn)}
                            </p>
                        </Rivela>
                    ))}
                </div>
            </div>

            {/* ───────────────────────────── Piscine ───────────────────────────── */}
            <Sezione id="piscine" className="border-t-0">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
                    <Rivela>
                        <h6 className="occhiello">{t('Perché Piscine Rocks Design', 'Why Piscine Rocks Design')}</h6>
                        <h2 className="titolo-sezione max-w-[20em]">
                            {t('Sembra un laghetto. Funziona come una piscina.', 'It looks like a lagoon. It works like a pool.')}
                        </h2>
                        <p className="testo-lungo mt-6">
                            {t(
                                'Le Piscine Rocks Design non hanno forme di serie: la vasca nasce dal giardino, dalle rocce e dalla luce del posto. Il risultato è un bagno che si vive a piedi nudi, con bordi in pietra e spiagge d’ingresso al posto della scaletta. La Tecnologia Rocks Design® è brevettata: Luna Costruzioni la realizza come concessionario autorizzato.',
                                'Piscine Rocks Design have no stock shapes: the basin grows out of the garden, the rock and the light of the place. The result is a pool you live barefoot, with stone edges and walk-in beaches instead of a ladder. Rocks Design Technology is patented: Luna Costruzioni builds it as an authorised dealer.',
                            )}
                        </p>
                        <div className="mt-9 grid gap-6 sm:grid-cols-3">
                            {CARATTERISTICHE.map(c => (
                                <div key={c.titolo} className="border-l border-accento-700 pl-4">
                                    <p className="font-display text-[15px] font-medium text-testo">{t(c.titolo, c.titoloEn)}</p>
                                    <p className="mt-2 text-[13px] leading-relaxed text-neutro-400">{t(c.testo, c.testoEn)}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/piscine-rocks-design" className="bottone-secondario mt-9 no-underline">
                            {t('Come sono fatte', 'How they are built')}
                        </Link>
                    </Rivela>

                    <Rivela delay={120}>
                        <figure>
                            <Immagine
                                slug="oasi-con-pontile"
                                ratio="4 / 3"
                                className="rounded-lg"
                                sizes="(min-width: 1024px) 44vw, 92vw"
                            />
                            <figcaption className="mt-2 text-[11px] text-testo/60">
                                {t('Piscina Rocks Design ultimata e in funzione.', 'A completed, working Piscine Rocks Design pool.')}
                            </figcaption>
                        </figure>
                    </Rivela>
                </div>
            </Sezione>

            {/* ───────────────────────────── Processo ───────────────────────────── */}
            <Sezione id="processo">
                <Rivela className="max-w-[46em]">
                    <h6 className="occhiello">{t('Chiavi in mano', 'Turnkey')}</h6>
                    <h2 className="titolo-sezione">{t('Cinque fasi, un’unica impresa.', 'Five stages, one company.')}</h2>
                    <p className="testo-lungo mt-6">
                        {t(
                            'Luna Costruzioni segue tutto il processo: non ci limitiamo a fornire la piscina, la costruiamo. Scavi, realizzazione, messa in opera e collaudo restano nelle stesse mani, dal preventivo alla consegna.',
                            'Luna Costruzioni handles the whole process: we do not merely supply the pool, we build it. Excavation, construction, installation and commissioning all stay in the same hands, from quote to handover.',
                        )}
                    </p>
                </Rivela>

                <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {PERCORSO.map((p, i) => (
                        <Rivela as="li" key={p.numero} delay={i * 70} className="scheda">
                            <p className="font-display text-[13px] tracking-[0.1em] text-accento">{p.numero}</p>
                            <h3 className="mt-3 font-display text-[17px] font-medium">{t(p.titolo, p.titoloEn)}</h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-neutro-500">
                                {t(p.durata, p.durataEn)}
                            </p>
                            <p className="mt-3 text-[14px] leading-relaxed text-neutro-400">{t(p.testo, p.testoEn)}</p>
                        </Rivela>
                    ))}
                    <Rivela
                        as="li"
                        delay={PERCORSO.length * 70}
                        className="flex flex-col justify-center rounded-md border border-accento-700 bg-accento/[0.08] p-6"
                    >
                        <p className="font-display text-[17px] font-medium text-testo">
                            {t('Un unico appalto.', 'One single contract.')}
                        </p>
                        <p className="mt-3 text-[14px] leading-relaxed text-neutro-300">
                            {t(
                                'Nessuna squadra esterna da coordinare, nessuno scaricabarile fra fornitori.',
                                'No outside crews to coordinate, no passing the buck between suppliers.',
                            )}
                        </p>
                        <Link to="/come-lavoriamo" className="bottone-primario mt-6 w-fit no-underline">
                            {t('Il metodo', 'Our method')}
                        </Link>
                    </Rivela>
                </ol>
            </Sezione>

            {/* ─────────────────────────── Realizzazioni ─────────────────────────── */}
            <Sezione id="realizzazioni">
                <Rivela className="flex flex-wrap items-end justify-between gap-6">
                    <div className="max-w-[24em]">
                        <h6 className="occhiello">{t('Realizzazioni', 'Projects')}</h6>
                        <h2 className="titolo-sezione">
                            {t('Piscine ultimate, arredate e in funzione.', 'Pools finished, furnished and running.')}
                        </h2>
                    </div>
                    <p className="text-[13px] text-neutro-500">
                        {t('Ogni immagine è un lavoro consegnato.', 'Every image is a delivered project.')}
                    </p>
                </Rivela>

                <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {MOSAICO.map((f, i) => (
                        <Rivela key={f.slug} delay={Math.min(i, 8) * 45}>
                            <Immagine
                                slug={f.slug}
                                ratio="1 / 1"
                                className="rounded-md"
                                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                            />
                        </Rivela>
                    ))}
                </div>

                <Rivela className="mt-10">
                    <Link to="/galleria" className="bottone-secondario no-underline">
                        {t('Apri la galleria completa', 'Open the full gallery')}
                    </Link>
                </Rivela>
            </Sezione>

            {/* ───────────────────────── Prima di decidere ───────────────────────── */}
            <Sezione id="dubbi">
                <Rivela className="max-w-[46em]">
                    <h6 className="occhiello">{t('Prima di decidere', 'Before you decide')}</h6>
                    <h2 className="titolo-sezione">
                        {t(
                            'Quattro dubbi fermano chi vuole una piscina. Li mettiamo sul tavolo subito.',
                            'Four doubts stop people from building a pool. We put them on the table first.',
                        )}
                    </h2>
                    <p className="testo-lungo mt-6">
                        {t(
                            'Non sono obiezioni da smontare: sono i motivi reali per cui un preventivo resta nel cassetto. A ciascuno rispondiamo con un impegno che finisce nero su bianco nel contratto.',
                            'These are not objections to argue away: they are the real reasons a quote stays in a drawer. To each we answer with a commitment that ends up in writing in the contract.',
                        )}
                    </p>
                </Rivela>

                <div className="mt-14 grid gap-5 md:grid-cols-2">
                    {DUBBI.map((d, i) => (
                        <Rivela key={d.dubbio} delay={i * 80} className="scheda">
                            <p className="text-[10px] uppercase tracking-[0.1em] text-neutro-500">
                                {t('Il dubbio', 'The doubt')}
                            </p>
                            <p className="mt-2 font-display text-[17px] font-medium text-testo">
                                {t(d.dubbio, d.dubbioEn)}
                            </p>
                            <p className="mt-5 text-[10px] uppercase tracking-[0.1em] text-accento">
                                {t('La nostra risposta', 'Our answer')}
                            </p>
                            <p className="mt-2 text-[14px] leading-relaxed text-neutro-300">
                                {t(d.risposta, d.rispostaEn)}
                            </p>
                        </Rivela>
                    ))}
                </div>
            </Sezione>

            {/* ─────────────────────────── Hotel e resort ─────────────────────────── */}
            <Sezione id="hotel">
                <Rivela className="max-w-[46em]">
                    <h6 className="occhiello">{t('Hotel, resort e B&B', 'Hotels, resorts and guest houses')}</h6>
                    <h2 className="titolo-sezione">
                        {t(
                            'Per una struttura ricettiva la piscina è la prima foto che il cliente guarda.',
                            'For a hospitality business, the pool is the first photo a guest looks at.',
                        )}
                    </h2>
                    <p className="testo-lungo mt-6">
                        {t(
                            'Una piscina Rocks Design non somiglia a nessun’altra vasca del territorio: è un motivo per scegliere la struttura e un contenuto che gira sui social dei tuoi ospiti. Lavoriamo con i tempi e i vincoli di chi deve restare aperto.',
                            'A Piscine Rocks Design pool looks like nothing else nearby: it is a reason to book and content your guests share. We work around the constraints of a business that has to stay open.',
                        )}
                    </p>
                </Rivela>

                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                    {RICETTIVO.map((r, i) => (
                        <Rivela key={r.titolo} delay={i * 80} className="scheda">
                            <h3 className="font-display text-[17px] font-medium">{t(r.titolo, r.titoloEn)}</h3>
                            <p className="mt-3 text-[14px] leading-relaxed text-neutro-400">{t(r.testo, r.testoEn)}</p>
                        </Rivela>
                    ))}
                </div>

                <Rivela className="mt-10">
                    <Link to="/hotel-e-resort" className="bottone-primario no-underline">
                        {t('Richiedi una proposta per la struttura', 'Request a proposal for your property')}
                    </Link>
                </Rivela>
            </Sezione>

            {/* ───────────────────────────── Domande ───────────────────────────── */}
            <Sezione id="faq">
                <Rivela className="max-w-[40em]">
                    <h6 className="occhiello">{t('Domande frequenti', 'Frequently asked')}</h6>
                    <h2 className="titolo-sezione">
                        {t('Quello che ci chiedono al primo sopralluogo.', 'What people ask us on the first visit.')}
                    </h2>
                </Rivela>

                <div className="mt-12 max-w-[52em] divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ.slice(0, 6).map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-home">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                                <h3 className="font-display text-[17px] font-medium text-testo">{v.domanda}</h3>
                                <span className="mt-1 shrink-0 text-accento transition group-open:rotate-45" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="mt-3 max-w-prosa pr-10 text-[14px] leading-relaxed text-neutro-300">
                                {v.risposta}
                            </p>
                        </details>
                    ))}
                </div>

                <Rivela className="mt-8">
                    <Link to="/domande-frequenti" className="bottone-secondario no-underline">
                        {t('Tutte le domande', 'All the questions')}
                    </Link>
                </Rivela>
            </Sezione>

            <Recensioni />

            {/* ───────────────────────────── Sicilia ───────────────────────────── */}
            <Sezione id="sicilia">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
                    <Rivela>
                        <Immagine
                            slug="oasi-aerea-sabbia-bianca"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 44vw, 92vw"
                        />
                    </Rivela>
                    <Rivela delay={110}>
                        <h6 className="occhiello">{t('Zona operativa', 'Where we work')}</h6>
                        <h2 className="titolo-sezione">{t('Su tutta la Sicilia.', 'Across Sicily.')}</h2>
                        <p className="testo-lungo mt-6">
                            {t(
                                `${AZIENDA.nome} è concessionario autorizzato ${ROCKS_DESIGN.nome} per la Sicilia. Facciamo sopralluoghi e apriamo cantieri su tutta l’isola, per ville private e per strutture ricettive.`,
                                `${AZIENDA.nome} is the authorised ${ROCKS_DESIGN.nome} dealer for Sicily. We survey and build across the whole island, for private villas and for hotels and guest houses.`,
                            )}
                        </p>
                        <p className="testo-lungo mt-4">
                            {t(
                                'Il referente di cantiere è sempre lo stesso, dal primo sopralluogo al collaudo: si parla con una persona, non con un ufficio.',
                                'The same person follows the job from the first visit to commissioning: you talk to a person, not an office.',
                            )}
                        </p>
                        <ul className="mt-7 flex flex-wrap gap-2">
                            {PROVINCE.map(p => (
                                <li key={p.slug}>
                                    <Link
                                        to={`/piscine-rocks-design/${p.slug}`}
                                        className="inline-block rounded-md border border-testo/[0.16] px-3 py-1.5 text-[13px] text-neutro-300 no-underline transition hover:border-accento hover:text-testo"
                                    >
                                        {p.nome}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link to="/contatti" className="bottone-primario mt-8 no-underline">
                            {t('Parlane con Luciano', 'Talk to Luciano')}
                        </Link>
                    </Rivela>
                </div>
            </Sezione>

            {/* ───────────────────────────── Contatti ───────────────────────────── */}
            <Sezione id="contatti">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
                    <Rivela>
                        <h6 className="occhiello">{t('Contatti', 'Contact')}</h6>
                        <h2 className="titolo-sezione">{t('Raccontaci il giardino.', 'Tell us about the garden.')}</h2>
                        <p className="testo-lungo mt-6">
                            {t(
                                'Basta il comune e due righe sullo spazio che hai. Fissiamo un sopralluogo e ti diciamo cosa si può fare, con tempi e costi del progetto chiavi in mano.',
                                'Your town and a couple of lines about your space are enough. We will arrange a visit and tell you what is possible, with timing and costs for the turnkey project.',
                            )}
                        </p>
                        <dl className="mt-9 space-y-5">
                            <div>
                                <dt className="text-[11px] uppercase tracking-[0.1em] text-neutro-500">
                                    {t('Referente', 'Contact person')}
                                </dt>
                                <dd className="mt-1 font-display text-[17px] text-testo">{AZIENDA.referente}</dd>
                            </div>
                            <div>
                                <dt className="text-[11px] uppercase tracking-[0.1em] text-neutro-500">
                                    {t('Telefono', 'Phone')}
                                </dt>
                                <dd className="mt-1">
                                    <a
                                        href={`tel:${AZIENDA.telefonoRaw}`}
                                        className="font-display text-[17px] text-testo no-underline hover:text-accento"
                                    >
                                        {AZIENDA.telefono}
                                    </a>
                                </dd>
                            </div>
                        </dl>
                        <a
                            href={`https://wa.me/${AZIENDA.whatsapp}`}
                            target="_blank"
                            rel="noopener"
                            className="bottone-secondario mt-6 no-underline"
                        >
                            WhatsApp {AZIENDA.telefono}
                        </a>
                    </Rivela>

                    <Rivela delay={110}>
                        <ModuloContatto />
                    </Rivela>
                </div>
            </Sezione>
        </>
    )
}
