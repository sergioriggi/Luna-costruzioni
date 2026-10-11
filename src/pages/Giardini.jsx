import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/giardini-e-opere-in-pietra', label: 'Giardini e opere in pietra', labelEn: 'Gardens and stonework' },
]

const LAVORAZIONI = [
    {
        titolo: 'Muri a secco e di contenimento',
        titoloEn: 'Dry-stone and retaining walls',
        testo:
            'In Sicilia quasi ogni terreno ha un dislivello. Un muro a secco ben costruito lo gestisce senza la pesantezza di un cordolo in cemento, e invecchia bene: dopo qualche anno sembra parte del posto.',
        testoEn:
            'Almost every plot in Sicily has a change in level. A well-built dry-stone wall handles it without the heaviness of a concrete kerb, and it ages well: after a few years it looks as if it has always been there.',
    },
    {
        titolo: 'Pavimentazioni e camminamenti',
        titoloEn: 'Paving and paths',
        testo:
            'Pietra locale, ciottolati, lastricati irregolari, gradonate ricavate nella roccia. Il criterio è sempre lo stesso: materiali che si trovano nel raggio di pochi chilometri, non importati da un catalogo.',
        testoEn:
            'Local stone, cobbles, crazy paving, steps cut into the rock. The rule is always the same: materials found within a few kilometres, not imported from a catalogue.',
    },
    {
        titolo: 'Movimento terra e modellazione',
        titoloEn: 'Earthworks and shaping',
        testo:
            'Sbancamenti, terrazzamenti, riprofilature. A opera finita resta nascosto, eppure decide quanta parte del giardino si potrà davvero usare.',
        testoEn:
            'Excavation, terracing, regrading. Once the job is finished it is hidden from view, yet it decides how much of the garden you can actually use.',
    },
    {
        titolo: 'Verde e piantumazione',
        titoloEn: 'Planting',
        testo:
            'Essenze scelte per il clima siciliano — ulivi, agrumi, graminacee, piante grasse — e impianto di irrigazione dimensionato di conseguenza. Un giardino che chiede meno acqua è un giardino che dura.',
        testoEn:
            'Species chosen for the Sicilian climate — olives, citrus, ornamental grasses, succulents — with irrigation sized to match. A garden that needs less water is a garden that lasts.',
    },
    {
        titolo: 'Solarium, pergolati e opere in legno',
        titoloEn: 'Sun decks, pergolas and timber work',
        testo:
            'Piani di calpestio, pontili, strutture d’ombra. Spesso sono l’ultimo lotto di un intervento sulla piscina, ma li realizziamo anche come opera indipendente.',
        testoEn:
            'Decking, jetties, shade structures. They are often the last phase of a pool project, but we also build them as stand-alone work.',
    },
    {
        titolo: 'Illuminazione esterna',
        titoloEn: 'Outdoor lighting',
        testo:
            'Luce radente sulla pietra, segnapasso lungo i camminamenti, corpi immersi nell’acqua. È la lavorazione che cambia di più il modo in cui userai il giardino la sera.',
        testoEn:
            'Grazing light on stone, step lights along the paths, fittings set in the water. Of all the work, it changes most how you use the garden in the evening.',
    },
]

export default function Giardini() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Giardini e opere in pietra in Sicilia | Luna Costruzioni"
                descrizione="Muri a secco e di contenimento, terrazzamenti, pavimentazioni in pietra, verde, pergolati e luci. Anche senza piscina, con mezzi e squadre nostre."
                percorso="/giardini-e-opere-in-pietra"
                immagine="bordo-in-legno-e-ciottoli-1280.jpg"
                schema={[
                    schemaBriciole(BRICIOLE),
                    schemaServizio({
                        nome: 'Realizzazione di giardini e opere in pietra',
                        descrizione:
                            'Muri a secco e di contenimento, pavimentazioni in pietra, movimento terra, verde, opere in legno e illuminazione esterna.',
                        area: 'Sicilia',
                    }),
                ]}
            />
            <Briciole voci={BRICIOLE.map(v => ({ ...v, label: t(v.label, v.labelEn) }))} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{t('L’altra metà del nostro lavoro', 'The other half of our work')}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">
                            {t('Giardini e opere in pietra', 'Gardens and stonework')}
                        </h1>
                        <p className="testo-lungo mt-6">
                            {t(
                                `Prima ancora delle piscine, ${AZIENDA.nomeBreve} è un’impresa che lavora la pietra e muove la terra. Muri di contenimento, terrazzamenti, pavimentazioni, camminamenti: sono le opere che decidono se un giardino siciliano sarà davvero utilizzabile o resterà un pendio con qualche pianta sopra.`,
                                `Pools came later: first and foremost, ${AZIENDA.nomeBreve} is a contractor that works stone and moves earth. Retaining walls, terraces, paving, paths: this is the work that decides whether a Sicilian garden can really be used, or stays a slope with a few plants on it.`,
                            )}
                        </p>
                        <p className="testo-lungo mt-4">
                            {t('Le realizziamo', 'We do it')}{' '}
                            <strong className="font-semibold text-testo">{t('anche senza piscina', 'without a pool, too')}</strong>.{' '}
                            {t(
                                'Si può sistemare il terreno adesso e fare la piscina più avanti, o non farla affatto: sono lavori che stanno in piedi da soli.',
                                'You can sort out the land now and add a pool later, or never: this work stands on its own.',
                            )}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-pieno">{t('Chiedi un preventivo', 'Ask for a quote')}</Link>
                            <Link to="/piscine-rocks-design" className="bottone-secondario">{t('Vedi anche le piscine', 'See the pools as well')}</Link>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="bordo-in-legno-e-ciottoli"
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
                    occhiello={t('Che cosa realizziamo', 'What we build')}
                    titolo={t('Sei lavorazioni, una logica sola', 'Six kinds of work, one approach')}
                    testo={t(
                        'Usare quello che il posto offre già: pietra locale, pendenze esistenti, piante che in Sicilia crescono senza accanimento.',
                        'Use what the place already offers: local stone, the existing slopes, plants that grow in Sicily without a struggle.',
                    )}
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {LAVORAZIONI.map((l, i) => (
                        <Rivela as="li" key={l.titolo} delay={i * 70} className="scheda">
                            <h2 className="text-lg">{t(l.titolo, l.titoloEn)}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{t(l.testo, l.testoEn)}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <Rivela>
                        <Immagine
                            slug="palme-e-monoliti"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                        <CreditoFoto />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello={t('Un vantaggio pratico', 'A practical advantage')}
                        titolo={t('Piscina e giardino nello stesso cantiere', 'Pool and garden in one build')}
                        testo={t(
                            'Se piscina e giardino si fanno insieme, le lavorazioni si incastrano: si scava una volta sola e i mezzi entrano in giardino una volta sola.',
                            'When the pool and the garden are done together, the work fits together: the digging happens once, and the machines come into the garden once.',
                        )}
                    >
                        <p className="testo-lungo mt-4">
                            {t(
                                'Se invece hai già un giardino sistemato e vuoi solo la vasca, va altrettanto bene: lavoriamo volentieri accanto al tuo architetto o al tuo giardiniere di fiducia.',
                                'If your garden is already finished and you only want the pool, that works just as well: we are happy to work alongside your own architect or gardener.',
                            )}
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Opere di contorno', 'Surrounding works')}
                    titolo={t('Pietra, legno e verde attorno all’acqua', 'Stone, timber and planting around the water')}
                    testo={t(
                        'Le foto qui sotto sono piscine espositive della casa madre, in Lombardia: mostrano il tipo di opere di contorno che realizziamo anche noi, cioè bordi, solarium, ghiaie e illuminazione.',
                        'The photos below are the manufacturer’s display pools in Lombardy. They show the kind of surrounding work we also carry out: edges, sun decks, gravel and lighting.',
                    )}
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        voci={[
                            { slug: 'bordo-in-legno-e-ciottoli', didascalia: t('Deck in legno posato a spina, con una fascia di ciottoli fra il legno e l’acqua.', 'Timber decking laid in a herringbone pattern, with a band of cobbles between the wood and the water.') },
                            { slug: 'solarium-in-legno', didascalia: t('Un solarium in legno su tutto un lato: è lì che si mettono i lettini.', 'A timber sun deck along one whole side: that is where the loungers go.') },
                            { slug: 'ghiaietto-e-acqua-smeraldo', didascalia: t('Lastre di pietra posate come gradini, in mezzo al ghiaietto della riva.', 'Stone slabs laid as steps through the gravel at the water’s edge.') },
                            { slug: 'palme-e-monoliti', didascalia: t('Un masso lasciato da solo sulla sabbia: la pietra usata come arredo del giardino.', 'A single boulder left on the sand: stone used as a garden feature.') },
                            { slug: 'giardino-tropicale', didascalia: t('Sabbia, palme e banani portati fino al bordo dell’acqua.', 'Sand, palms and banana plants brought right to the water’s edge.') },
                            { slug: 'illuminazione-calda-sui-monoliti', didascalia: t('Luci a terra tra i massi del bordo: il giardino si usa anche di sera.', 'Ground lights among the edge boulders: the garden is used in the evening too.') },
                        ]}
                    />
                </Rivela>
            </Sezione>

            <ChiusuraContatto
                occhiello={t('Preventivo', 'Quote')}
                titolo={t('Raccontaci che terreno hai', 'Tell us about your land')}
                testo={t(
                    'Pendenza, esposizione, accessi: con due righe e qualche foto capiamo già che cosa ha senso fare, con la piscina o senza.',
                    'Slope, aspect, access: a couple of lines and a few photos are enough for us to see what makes sense, with a pool or without.',
                )}
                modulo={{ titolo: t('Muri, terrazzamenti, pietra', 'Walls, terraces, stone') }}
            />
        </>
    )
}
