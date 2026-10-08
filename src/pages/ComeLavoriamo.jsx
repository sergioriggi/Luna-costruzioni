import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { PERCORSO } from '../data/content'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/come-lavoriamo', label: 'Come lavoriamo', labelEn: 'How we work' },
]

/** Le voci del preventivo. */
const PREVENTIVO = [
    { testo: 'Dimensioni, profondità e forma della vasca', testoEn: 'Size, depth and shape of the pool' },
    { testo: 'Modello, selezione delle rocce e tipo di sabbia', testoEn: 'Model, choice of rocks and type of sand' },
    { testo: 'Cascate, aree idromassaggio e illuminazione', testoEn: 'Waterfalls, hydromassage areas and lighting' },
    { testo: 'Opere di contorno: spiaggia, ciottolati, pontili', testoEn: 'Surrounding works: beach, cobbles, decks' },
    { testo: 'Tempi di realizzazione e modalità di pagamento', testoEn: 'Build schedule and payment terms' },
    { testo: 'Assistenza post-consegna e stagionalità', testoEn: 'Aftercare and seasonal servicing' },
]

export default function ComeLavoriamo() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Come costruiamo una piscina in Sicilia | Luna Costruzioni"
                descrizione="Chiavi in mano, cinque fasi: rilievo e disegno, scavi con mezzi nostri, posa in Tecnologia Rocks Design®, impianti, collaudo. Consegna a vasca piena."
                percorso="/come-lavoriamo"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE.map(v => ({ ...v, label: t(v.label, v.labelEn) }))} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">{t('Il metodo', 'The method')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        {t('Dal primo incontro alla prima nuotata', 'From first meeting to first swim')}
                    </h1>
                    <p className="testo-lungo mt-6">
                        {t(
                            `Una piscina è un investimento importante: hai diritto a sapere in anticipo cosa succede, quando e con chi. Ecco come lavoriamo in ${AZIENDA.zona}, dal primo incontro all’assistenza dopo la consegna.`,
                            'A pool is a significant investment, and you should know in advance what happens, when and with whom. This is how we work in Sicily, from the first meeting to aftercare once the pool is handed over.',
                        )}
                    </p>
                </Rivela>

                <ol className="mt-14 space-y-6">
                    {PERCORSO.map((p, i) => (
                        <Rivela as="li" key={p.numero} delay={i * 70} className="scheda flex flex-col gap-4 sm:flex-row sm:gap-8">
                            <span className="font-display text-4xl leading-none text-sabbia sm:w-24">{p.numero}</span>
                            <div>
                                <div className="flex flex-wrap items-baseline gap-3">
                                    <h2 className="text-xl">{t(p.titolo, p.titoloEn)}</h2>
                                    {p.durata && (
                                        <span className="rounded-md bg-sabbia/[0.1] px-3 py-1 text-xs font-medium text-sabbia">
                                            {t(p.durata, p.durataEn)}
                                        </span>
                                    )}
                                </div>
                                <p className="testo-lungo mt-2">{t(p.testo, p.testoEn)}</p>
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
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                        <CreditoFoto />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello={t('Chi fa cosa', 'Who does what')}
                        titolo={t('Il metodo è della casa madre, il cantiere è nostro', 'The method is the manufacturer’s; the build is ours')}
                        testo={t(
                            "La Tecnologia Rocks Design® nasce dall'esperienza di Piscine Rocks Design nella lavorazione della roccia: il brevetto, gli standard costruttivi e il corso ufficiale che abbiamo seguito sono suoi. Quello che mettiamo noi è il lavoro sul campo — le misure in giardino, il cantiere, il rapporto con il tuo tecnico e l'assistenza negli anni successivi.",
                            'Rocks Design Technology® grew out of Piscine Rocks Design’s experience in working rock: the patent, the construction standards and the official training course we completed are theirs. What we bring is the work on the ground — measuring up in the garden, running the site, dealing with your surveyor or architect, and aftercare in the years that follow.',
                        )}
                    >
                        <p className="mt-6 rounded-lg border border-testo/[0.16] bg-superficie px-5 py-4 text-sm leading-relaxed text-neutro-400">
                            {t(
                                `Per tutela del brevetto ${ROCKS_DESIGN.nome} non pubblichiamo immagini delle fasi di cantiere, delle tecniche costruttive o degli impianti impiegati. Ogni passaggio te lo spieghiamo di persona, in giardino.`,
                                `To protect the ${ROCKS_DESIGN.nome} patent, we do not publish images of the build stages, construction techniques or equipment used. We explain each step to you in person, in your garden.`,
                            )}
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello={t('Trasparenza', 'Transparency')}
                    titolo={t('Cosa trovi nel preventivo', 'What the quote covers')}
                />
                <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
                    {PREVENTIVO.map((v, i) => (
                        <Rivela as="li" key={v.testo} delay={i * 60} className="flex gap-3 rounded-lg bg-superficie px-5 py-4 text-[0.95rem] text-neutro-300 ring-1 ring-testo/[0.16]">
                            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-neutro-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {t(v.testo, v.testoEn)}
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Cta
                titolo={t('Il primo passo è vedere il terreno', 'The first step is seeing the site')}
                testo={t(
                    'Il sopralluogo non costa nulla e non ti impegna a niente: è da lì che nasce il disegno della vasca.',
                    'The site visit is free and commits you to nothing. It is where the design of the pool begins.',
                )}
                primaria={{ to: '/contatti', label: t('Chiedi un preventivo', 'Ask for a quote') }}
                secondaria={{ to: '/domande-frequenti', label: t('Leggi le FAQ', 'Read the FAQ') }}
                whatsapp
            />
        </>
    )
}
