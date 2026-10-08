import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { useLingua } from '../i18n/lingua'
import BottoneTelefono from '../components/BottoneTelefono'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/hotel-e-resort', label: 'Hotel e resort', labelEn: 'Hotels and resorts' },
]

const RITORNI = [
    {
        titolo: 'Entra nelle fotografie dell’annuncio',
        titoloEn: 'It shows up in the listing photos',
        testo:
            'Su Booking, Airbnb o sul vostro sito la piscina è quasi sempre la prima immagine che l’ospite apre. In una griglia di risultati fatta quasi solo di vasche rettangolari, una piscina in roccia con spiaggia d’ingresso si riconosce subito.',
        testoEn:
            'On Booking, Airbnb or your own site the pool is almost always the first image a guest opens. In a grid of results made up almost entirely of rectangular pools, a rock pool with a walk-in beach is easy to pick out.',
    },
    {
        titolo: 'Gli ospiti la fotografano da soli',
        titoloEn: 'Guests photograph it themselves',
        testo:
            'È il tipo di scenario che gli ospiti fotografano e condividono, con la vostra struttura riconoscibile dentro.',
        testoEn:
            'It is the kind of setting guests photograph and share, with your property recognisable in the shot.',
    },
    {
        titolo: 'Allunga la stagione',
        titoloEn: 'It lengthens the season',
        testo:
            'In Sicilia la piscina si usa ben oltre l’estate piena: con illuminazione e zone benessere lo spazio lavora anche a settembre e ottobre.',
        testoEn:
            'In Sicily a pool is usable well beyond high summer: with lighting and a wellness area the space keeps working in September and October.',
    },
    {
        titolo: 'Il cantiere resta fuori dalla stagione',
        titoloEn: 'The build stays out of your season',
        testo:
            'Scavi e realizzazione si programmano nei mesi di chiusura, con le date scritte nel preventivo. L’obiettivo è riaprire con la piscina pronta, senza camere da tenere ferme per i lavori.',
        testoEn:
            'Excavation and construction are scheduled for the months you are closed, with the dates written into the quote. The aim is to reopen with the pool ready, without taking rooms out of service for the works.',
    },
]

/**
 * Come si lavora con una struttura aperta al pubblico. Non usa RICETTIVO di
 * content.js: quelle tre voci stanno già in home, e «un unico appalto» resta
 * solo in home e in /azienda.
 */
const METODO = [
    {
        titolo: 'Accessi e area di cantiere decisi prima',
        titoloEn: 'Access and site area agreed first',
        testo:
            'Da dove entrano i mezzi, dove si depositano i massi e quale parte del giardino resta chiusa si concorda prima di iniziare, sulla pianta della struttura.',
        testoEn:
            'Where the machinery comes in, where the boulders are stored and which part of the grounds is closed off are agreed before work starts, on the plan of your property.',
    },
    {
        titolo: 'A lotti, da una chiusura all’altra',
        titoloEn: 'In stages, from one closed season to the next',
        testo:
            'Se il periodo di chiusura è breve, si realizza prima la vasca con le predisposizioni e si completano cascate, illuminazione o solarium nella chiusura successiva.',
        testoEn:
            'If your closed period is short, the pool is built first with the necessary provisions in place, and waterfalls, lighting or sun deck are completed in the following closed season.',
    },
    {
        titolo: 'Assistenza dopo il collaudo',
        titoloEn: 'Support after handover',
        testo:
            'Per impianto e manutenzione restiamo il vostro riferimento, e lavoriamo in Sicilia: se a stagione aperta serve un intervento, chiamate qualcuno che è sull’isola.',
        testoEn:
            'We remain your contact for the plant and maintenance, and we work in Sicily: if something needs attention mid-season, you are calling someone on the island.',
    },
]

export default function HotelResort() {
    const { t } = useLingua()

    return (
        <>
            <Seo
                titolo="Piscine per hotel e resort in Sicilia | Luna Costruzioni"
                descrizione="Per hotel, resort, agriturismi e B&B in Sicilia: Piscina Rocks Design con cantiere fuori stagione, lavori a lotti e assistenza dopo il collaudo."
                percorso="/hotel-e-resort"
                immagine="oasi-con-pontile-e-palme-1280.jpg"
                schema={[
                    schemaBriciole(BRICIOLE),
                    schemaServizio({
                        nome: 'Piscine Rocks Design per strutture ricettive',
                        descrizione:
                            'Progettazione e realizzazione chiavi in mano di piscine per hotel, resort, agriturismi e B&B in Sicilia.',
                        area: 'Sicilia',
                    }),
                ]}
            />
            <Briciole voci={BRICIOLE.map(v => ({ ...v, label: t(v.label, v.labelEn) }))} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-[46em]">
                        <p className="occhiello">{t('Hotel, resort, B&B e agriturismi', 'Hotels, resorts, B&Bs and agriturismi')}</p>
                        <h1 className="titolo-sezione text-[32px] sm:text-[40px] lg:text-[46px]">
                            {t(
                                'Piscine per hotel, B&B e agriturismi in Sicilia.',
                                'Pools for hotels, B&Bs and agriturismi in Sicily.',
                            )}
                        </h1>
                        <p className="testo-lungo mt-6">
                            {t(
                                'Una Piscina Rocks Design ha massi, sabbia e un ingresso a spiaggia, con una forma disegnata sul vostro terreno. Il cantiere si organizza sui tempi di chi ha ospiti da accogliere.',
                                'A Piscine Rocks Design pool has boulders, sand and a walk-in beach, in a shape drawn around your grounds. The build is planned around the calendar of a business with guests to look after.',
                            )}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-pieno no-underline">
                                {t('Richiedi una proposta', 'Request a proposal')}
                            </Link>
                            <BottoneTelefono className="bottone-secondario no-underline" />
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="oasi-con-pontile-e-palme"
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
                    occhiello={t('Il ritorno', 'The return')}
                    titolo={t('Che cosa vi porta, in pratica', 'What it actually brings you')}
                />
                <ul className="mt-12 grid gap-5 sm:grid-cols-2">
                    {RITORNI.map((r, i) => (
                        <Rivela as="li" key={r.titolo} delay={i * 80} className="rounded-md bg-notte p-6">
                            <h2 className="font-display text-[17px] font-medium">{t(r.titolo, r.titoloEn)}</h2>
                            <p className="mt-3 text-[14px] leading-relaxed text-neutro-400">{t(r.testo, r.testoEn)}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Come lavoriamo con voi', 'How we work with you')}
                    titolo={t('Il lavoro, organizzato attorno alla struttura', 'The work, planned around your property')}
                />
                <ul className="mt-12 grid gap-5 lg:grid-cols-3">
                    {METODO.map((r, i) => (
                        <Rivela as="li" key={r.titolo} delay={i * 80} className="scheda">
                            <h2 className="font-display text-[17px] font-medium">{t(r.titolo, r.titoloEn)}</h2>
                            <p className="mt-3 text-[14px] leading-relaxed text-neutro-400">{t(r.testo, r.testoEn)}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Foto Piscine Rocks Design', 'Piscine Rocks Design photos')}
                    titolo={t('Vasche che reggono la fotografia', 'Pools that hold up in a photograph')}
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        voci={[
                            {
                                slug: 'oasi-aerea-sabbia-bianca',
                                didascalia: t('Dall’alto la vasca si riconosce subito: è l’inquadratura che finisce negli annunci.', 'From above the pool is recognisable at once: the shot that ends up in the listings.'),
                            },
                            {
                                slug: 'palme-al-tramonto',
                                didascalia: t('Spiaggia, palme e pontile: i lettini degli ospiti vanno direttamente sulla sabbia.', 'Beach, palms and a low jetty: the guests’ loungers go straight onto the sand.'),
                            },
                            {
                                slug: 'notte-luci-e-festa',
                                didascalia: t('Una festa serale attorno all’acqua: la vasca accesa illumina tutto il prato.', 'An evening party around the water: the lit pool lights up the whole lawn.'),
                            },
                            {
                                slug: 'ricevimento-a-bordo-acqua',
                                didascalia: t('Un matrimonio: la torta si taglia davanti alla cascata.', 'A wedding: the cake is cut in front of the waterfall.'),
                            },
                            {
                                slug: 'giardino-tropicale',
                                didascalia: t('Nel pomeriggio: acqua a filo della sabbia e verde fitto alle spalle.', 'Late afternoon: water level with the sand, dense greenery behind.'),
                            },
                            {
                                slug: 'cena-in-giardino',
                                didascalia: t('Cena all’aperto a bordo acqua, sotto gli ombrelloni, con la vasca illuminata.', 'Dinner outdoors by the water, under the parasols, with the pool lit.'),
                            },
                        ]}
                    />
                </Rivela>
            </Sezione>

            <ChiusuraContatto
                occhiello={t('Proposta', 'Proposal')}
                titolo={t('Parliamo della vostra struttura', 'Let’s talk about your property')}
                testo={t(
                    'Indicateci periodo di chiusura, spazio disponibile e numero di camere: da lì si capisce se il cantiere sta tutto nei mesi in cui siete chiusi.',
                    'Tell us your closed season, the space available and how many rooms you have: that tells us whether the whole build fits into the months you are closed.',
                )}
                modulo={{
                    titolo: t('Richiedi una proposta', 'Request a proposal'),
                    tipologiaPreselezionata: 'Struttura ricettiva',
                    interessePreselezionato: 'Struttura ricettiva / progetto commerciale',
                }}
            />
        </>
    )
}
