import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { SABBIE } from '../data/content'
import { AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/piscine-rocks-design', label: 'Le piscine', labelEn: 'The pools' },
    { to: '/sabbie', label: 'Le sabbie', labelEn: 'The sands' },
]

const GALLERIA = [
    {
        slug: 'ombre-di-palme-sulla-sabbia',
        didascalia: 'Sabbia chiara vista dall’alto: a mezzogiorno l’ombra la fanno solo le palme.',
        didascaliaEn: 'Pale sand from above: at midday the only shade comes from the palms.',
    },
    {
        slug: 'spiaggia-di-sabbia-privata',
        didascalia: 'La sabbia continua sotto l’acqua: dove finisce la spiaggia comincia il fondale.',
        didascaliaEn: 'The sand carries on under the water: where the beach ends, the floor begins.',
    },
    {
        slug: 'fondale-illuminato',
        didascalia: 'Di notte la luce subacquea mostra il fondale in sabbia e il colore che dà all’acqua.',
        didascaliaEn: 'At night the underwater lights show the sand floor and the colour it gives the water.',
    },
]

const FAQ_SABBIA = [
    {
        domanda: 'La sabbia si può cambiare dopo?',
        domandaEn: 'Can the sand be changed later?',
        risposta:
            'Sostituire la sabbia di una vasca già realizzata è un intervento possibile ma oneroso, e cambia il colore dell’acqua di tutta la piscina. Per questo la scelta si fa a progetto, guardando i campioni di persona e non a schermo: i tre toni sullo schermo di un telefono si somigliano molto più di quanto si somiglino davvero.',
        rispostaEn:
            'Replacing the sand in a finished pool is possible but costly, and it changes the colour of the water across the whole pool. That is why the choice is made at the design stage, looking at the samples in person rather than on a screen: on a phone the three tones look far more alike than they really are.',
    },
    {
        domanda: 'La sabbia scotta sotto il sole siciliano?',
        domandaEn: 'Does the sand get too hot in the Sicilian sun?',
        risposta:
            'La sabbia trattiene il calore, ed è uno dei motivi per cui è piacevole restarci sopra la sera. Nelle ore centrali di luglio e agosto, però, la spiaggia va ombreggiata: nel progetto prevediamo la posizione di alberature, vele o pergolati proprio per questo.',
        rispostaEn:
            'Sand holds heat, which is one reason it is pleasant to sit on in the evening. In the middle of the day in July and August, though, the beach needs shade: that is why the design sets out where trees, shade sails or pergolas will go.',
    },
    {
        domanda: 'Come si pulisce il fondale in sabbia?',
        domandaEn: 'How is a sand floor cleaned?',
        risposta:
            'Non serve svuotare la vasca. Alla consegna ti mostriamo la procedura di persona, perché è più semplice da vedere che da spiegare per iscritto. I dettagli tecnici del sistema fanno parte del brevetto Rocks Design e vengono illustrati al cliente al momento della consegna.',
        rispostaEn:
            'There is no need to empty the pool. At handover we show you the procedure in person, because it is easier to see than to explain in writing. The technical details of the system are part of the Rocks Design patent and are explained to the client at handover.',
    },
]

export default function Sabbie() {
    const { t } = useLingua()
    const briciole = BRICIOLE.map(v => ({ to: v.to, label: t(v.label, v.labelEn) }))

    return (
        <>
            <Seo
                titolo="Le tre sabbie: Bianco, Giallo e Ticino | Luna Costruzioni"
                descrizione="Il fondale è sabbia e dà il colore all’acqua: Bianco turchese, Giallo verde acqua, Ticino smeraldo. Campioni al sole del tuo giardino, in Sicilia."
                percorso="/sabbie"
                immagine="sabbie-naturali-campioni-1280.jpg"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ_SABBIA)]}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{t('Il fondale', 'The floor')}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            {t('È la sabbia a decidere il colore dell’acqua', 'The sand decides the colour of the water')}
                        </h1>
                        <p className="testo-lungo mt-6">
                            {t('In una', 'In a')}{' '}
                            <Link to="/piscina-in-cemento-o-rocks-design" className="link-sottile">
                                {t('piscina tradizionale', 'conventional pool')}
                            </Link>{' '}
                            {t(
                                'il colore lo dà il rivestimento: un telo azzurro fa acqua azzurra, un mosaico scuro fa acqua scura. Qui funziona diversamente. Il fondale è sabbia vera, e la tonalità che vedrai nasce dall’incontro fra il colore dei granelli, la profondità e la luce del posto.',
                                'the colour comes from the lining: a blue liner makes blue water, a dark mosaic makes dark water. Here it works differently. The floor is real sand, and the shade you see comes from the colour of the grains, the depth and the light of the place.',
                            )}
                        </p>
                        <p className="testo-lungo mt-4">
                            {t(
                                'Sono disponibili tre selezioni. La scelta si fa di persona, mettendo i campioni sotto il sole del tuo giardino: è l’unico modo onesto per decidere, perché il colore dell’acqua dipende da quanta luce prende il fondale.',
                                'There are three selections. The choice is made in person, with the samples laid out in the sun in your garden: it is the only honest way to decide, because the colour of the water depends on how much light reaches the floor.',
                            )}
                        </p>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="sabbie-naturali-campioni"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    allineamento="centro"
                    occhiello={t('Le tre selezioni', 'The three selections')}
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
                            <h2 className="mt-5 font-display text-2xl">{t(`Sabbia ${s.nome}`, `${s.nome} sand`)}</h2>
                            <p className="mt-1 text-sm font-medium text-neutro-300">{t(s.acqua, s.acquaEn)}</p>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">{t(s.carattere, s.carattereEn)}</p>
                            <p className="mt-auto pt-3 text-[0.9rem] leading-relaxed text-neutro-500">{t(s.nota, s.notaEn)}</p>
                        </Rivela>
                    ))}
                </ul>
                <p className="mt-8 text-center text-sm text-neutro-500">
                    {t(
                        'I riquadri colorati sono indicativi: nessuno schermo rende fedelmente una sabbia naturale.',
                        'The colour swatches are only a guide: no screen shows a natural sand faithfully.',
                    )}
                </p>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <Rivela>
                        <Immagine
                            slug="sabbie-naturali-granulometria"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello={t('Non è sabbia da cantiere', 'Not builder’s sand')}
                        titolo={t('La granulometria conta quanto il colore', 'Grain size matters as much as colour')}
                        testo={t(
                            'I granelli sono selezionati per restare stabili sul fondale e piacevoli sotto i piedi. Una sabbia troppo fine si solleva a ogni bracciata e intorbidisce l’acqua; una troppo grossa è scomoda da calpestare. Il punto di equilibrio fra le due cose è parte di quello che stai comprando.',
                            'The grains are selected to stay put on the floor and feel pleasant underfoot. Sand that is too fine lifts with every stroke and clouds the water; sand that is too coarse is uncomfortable to walk on. The balance between the two is part of what you are buying.',
                        )}
                    />
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Come si vede in opera', 'How it looks in place')}
                    titolo={t('Lo stesso materiale, tre risultati', 'One material, three results')}
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        voci={GALLERIA.map(v => ({ slug: v.slug, didascalia: t(v.didascalia, v.didascaliaEn) }))}
                    />
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Domande frequenti', 'Frequently asked questions')}
                    titolo={t('Sulla sabbia, in particolare', 'About the sand')}
                />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ_SABBIA.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-sabbia">
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

            <Cta
                titolo={t('Portiamo i campioni in giardino', 'We bring the samples to your garden')}
                testo={t(
                    `Durante il sopralluogo mettiamo le tre sabbie sotto il sole del tuo terreno. In tutta la ${AZIENDA.zona}, gratis.`,
                    'During the site visit we lay the three sands out in the sun on your land. Anywhere in Sicily, free of charge.',
                )}
                primaria={{ to: '/contatti', label: t('Chiedi un preventivo', 'Ask for a quote') }}
                secondaria={{ to: '/modelli', label: t('Vedi i modelli', 'See the models') }}
                whatsapp
            />
        </>
    )
}
