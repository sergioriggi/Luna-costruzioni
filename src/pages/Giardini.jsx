import { Link } from 'react-router-dom'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/giardini-e-opere-in-pietra', label: 'Giardini e opere in pietra' },
]

const LAVORAZIONI = [
    {
        titolo: 'Muri a secco e di contenimento',
        testo:
            'In Sicilia quasi ogni terreno ha un dislivello. Un muro a secco ben costruito lo gestisce senza la pesantezza di un cordolo in cemento, e invecchia bene: dopo qualche anno sembra parte del posto.',
    },
    {
        titolo: 'Pavimentazioni e camminamenti',
        testo:
            'Pietra locale, ciottolati, lastricati irregolari, gradonate ricavate nella roccia. Il criterio è sempre lo stesso: materiali che si trovano nel raggio di pochi chilometri, non importati da un catalogo.',
    },
    {
        titolo: 'Movimento terra e modellazione',
        testo:
            'Sbancamenti, terrazzamenti, riprofilature. È il lavoro che non si vede a opera finita ma che decide se il giardino sarà vivibile o se resterà una pendenza da guardare.',
    },
    {
        titolo: 'Verde e piantumazione',
        testo:
            'Essenze scelte per il clima siciliano — ulivi, agrumi, graminacee, piante grasse — e impianto di irrigazione dimensionato di conseguenza. Un giardino che chiede meno acqua è un giardino che dura.',
    },
    {
        titolo: 'Solarium, pergolati e opere in legno',
        testo:
            'Piani di calpestio, pontili, strutture d’ombra. Spesso sono l’ultimo lotto di un intervento sulla piscina, ma li realizziamo anche come opera indipendente.',
    },
    {
        titolo: 'Illuminazione esterna',
        testo:
            'Luce radente sulla pietra, segnapasso lungo i camminamenti, corpi immersi nell’acqua. È la lavorazione che cambia di più il modo in cui userai il giardino la sera.',
    },
]

export default function Giardini() {
    return (
        <>
            <Seo
                titolo="Giardini e opere in pietra in Sicilia | Luna Costruzioni"
                descrizione="Muri a secco, pavimentazioni in pietra, terrazzamenti, verde e illuminazione esterna. Luna Costruzioni S.r.l.s. progetta e realizza giardini e opere in pietra in tutta la Sicilia, anche indipendentemente dalla piscina."
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
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">L’altra metà del nostro lavoro</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Giardini e opere in pietra
                        </h1>
                        <p className="testo-lungo mt-6">
                            Prima ancora delle piscine, {AZIENDA.nomeBreve} è un’impresa che lavora la pietra e muove
                            la terra. Muri di contenimento, terrazzamenti, pavimentazioni, camminamenti: sono le opere
                            che decidono se un giardino siciliano sarà davvero utilizzabile o resterà un pendio con
                            qualche pianta sopra.
                        </p>
                        <p className="testo-lungo mt-4">
                            Le realizziamo <strong className="font-semibold text-testo">anche senza piscina</strong>.
                            Molti clienti ci chiamano per sistemare il terreno e la piscina arriva due anni dopo — o
                            non arriva affatto, e va benissimo così.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-primario">Chiedi un preventivo</Link>
                            <Link to="/piscine-rocks-design" className="bottone-secondario">Vedi anche le piscine</Link>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="bordo-in-legno-e-ciottoli"
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
                    occhiello="Che cosa realizziamo"
                    titolo="Sei lavorazioni, una logica sola"
                    testo="Usare quello che il posto offre già: pietra locale, pendenze esistenti, piante che in Sicilia crescono senza accanimento."
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {LAVORAZIONI.map((l, i) => (
                        <Rivela as="li" key={l.titolo} delay={i * 70} className="scheda">
                            <h2 className="text-lg">{l.titolo}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{l.testo}</p>
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
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello="Un vantaggio pratico"
                        titolo="Una sola impresa, un solo cantiere"
                        testo="Quando la piscina e il giardino li fa la stessa squadra, le lavorazioni si incastrano: gli scavi si fanno una volta sola, i mezzi entrano una volta sola, e non c’è nessuno che dà la colpa all’altro se qualcosa non torna."
                    >
                        <p className="testo-lungo mt-4">
                            Se invece hai già un giardino sistemato e vuoi solo la vasca, va altrettanto bene:
                            lavoriamo volentieri accanto al tuo architetto o al tuo giardiniere di fiducia.
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello="Opere di contorno"
                    titolo="Pietra, legno e verde attorno all’acqua"
                    testo="Le immagini qui sotto mostrano le opere di contorno attorno a una Piscina Rocks Design: bordi, solarium, ghiaie e illuminazione."
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        voci={[
                            { slug: 'bordo-in-legno-e-ciottoli', didascalia: 'Deck in legno posato a spina, con una fascia di ciottoli fra il legno e l’acqua.' },
                            { slug: 'solarium-in-legno', didascalia: 'Un solarium in legno su tutto un lato: è lì che si mettono i lettini.' },
                            { slug: 'ghiaietto-e-acqua-smeraldo', didascalia: 'Lastre di pietra posate come gradini, in mezzo al ghiaietto della riva.' },
                            { slug: 'palme-e-monoliti', didascalia: 'Un masso lasciato da solo sulla sabbia: la pietra usata come arredo del giardino.' },
                            { slug: 'giardino-tropicale', didascalia: 'Sabbia, palme e banani portati fino al bordo dell’acqua.' },
                            { slug: 'illuminazione-calda-sui-monoliti', didascalia: 'Luci a terra tra i massi del bordo: il giardino si usa anche di sera.' },
                        ]}
                    />
                </Rivela>
            </Sezione>

            <ChiusuraContatto
                occhiello="Preventivo"
                titolo="Raccontaci che terreno hai"
                testo="Pendenza, esposizione, accessi: con due righe e qualche foto capiamo già che cosa ha senso fare, con la piscina o senza."
                modulo={{ titolo: 'Muri, terrazzamenti, pietra' }}
            />
        </>
    )
}
