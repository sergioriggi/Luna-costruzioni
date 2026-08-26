import { Link } from 'react-router-dom'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { RICETTIVO } from '../data/content'
import { AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/hotel-e-resort', label: 'Hotel e resort' },
]

const RITORNI = [
    {
        titolo: 'Entra nelle fotografie dell’annuncio',
        testo:
            'Su Booking, Airbnb o sul vostro sito la piscina è quasi sempre la prima immagine che l’ospite apre. Una vasca in roccia con spiaggia d’ingresso si distingue in una griglia di risultati dove tutte le altre sono rettangoli azzurri.',
    },
    {
        titolo: 'Gli ospiti la fotografano da soli',
        testo:
            'È il tipo di scenario che finisce nelle storie e nei reel senza che dobbiate chiederlo. Contenuto gratuito, e con la vostra struttura riconoscibile dentro.',
    },
    {
        titolo: 'Allunga la stagione',
        testo:
            'In Sicilia la piscina è usabile ben oltre l’estate piena. Illuminazione e zone benessere rendono lo spazio spendibile anche a settembre e ottobre, quando la concorrenza abbassa i prezzi.',
    },
    {
        titolo: 'Un solo interlocutore, un solo contratto',
        testo:
            'Impresa edile e concessionario nella stessa azienda: non dovete coordinare scavatoristi, fornitori e impiantisti, né arbitrare fra loro se qualcosa slitta.',
    },
]

export default function HotelResort() {
    const { t } = useLingua()

    return (
        <>
            <Seo
                titolo="Piscine per hotel, resort e B&B in Sicilia | Luna Costruzioni"
                descrizione="Piscine Rocks Design per strutture ricettive in Sicilia: cantiere fuori stagione, un unico appalto, assistenza dopo il collaudo. Luna Costruzioni srl, impresa edile e concessionario autorizzato."
                percorso="/hotel-e-resort"
                immagine="https://www.lunacostruzioni.it/media/oasi-con-pontile-e-palme-1280.jpg"
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
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-[46em]">
                        <p className="occhiello">{t('Hotel, resort e B&B', 'Hotels, resorts and guest houses')}</p>
                        <h1 className="titolo-sezione text-[32px] sm:text-[40px] lg:text-[46px]">
                            {t(
                                'Per una struttura ricettiva la piscina è la prima foto che il cliente guarda.',
                                'For a hospitality business, the pool is the first photo a guest looks at.',
                            )}
                        </h1>
                        <p className="testo-lungo mt-6">
                            {t(
                                'Una piscina Rocks Design non somiglia a nessun’altra vasca del territorio: è un motivo per scegliere la struttura, non un servizio dato per scontato. Lavoriamo con i tempi e i vincoli di chi deve restare aperto.',
                                'A Piscine Rocks Design pool looks like nothing else nearby: it is a reason to book, not a service taken for granted. We work around the constraints of a business that has to stay open.',
                            )}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-pieno no-underline">
                                {t('Richiedi una proposta', 'Request a proposal')}
                            </Link>
                            <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-secondario no-underline">
                                {AZIENDA.telefono}
                            </a>
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
                            <h2 className="font-display text-[17px] font-medium">{r.titolo}</h2>
                            <p className="mt-3 text-[14px] leading-relaxed text-neutro-400">{r.testo}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Come lavoriamo con voi', 'How we work with you')}
                    titolo={t('Tre condizioni che mettiamo per iscritto', 'Three commitments we put in writing')}
                />
                <ul className="mt-12 grid gap-5 lg:grid-cols-3">
                    {RICETTIVO.map((r, i) => (
                        <Rivela as="li" key={r.titolo} delay={i * 80} className="scheda">
                            <h2 className="font-display text-[17px] font-medium">{t(r.titolo, r.titoloEn)}</h2>
                            <p className="mt-3 text-[14px] leading-relaxed text-neutro-400">{t(r.testo, r.testoEn)}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Realizzazioni', 'Projects')}
                    titolo={t('Vasche che reggono la fotografia', 'Pools that hold up in a photograph')}
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        slugs={[
                            'oasi-aerea-sabbia-bianca',
                            'palme-al-tramonto',
                            'notte-luci-e-festa',
                            'ricevimento-a-bordo-acqua',
                            'giardino-tropicale',
                            'cena-in-giardino',
                        ]}
                    />
                </Rivela>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <IntestazioneSezione
                        occhiello={t('Proposta', 'Proposal')}
                        titolo={t('Parliamo della vostra struttura', 'Let’s talk about your property')}
                        testo={t(
                            `Indicateci periodo di chiusura, spazio disponibile e numero di camere: ${AZIENDA.referente} vi richiama per fissare il sopralluogo.`,
                            `Tell us your closed season, the space available and how many rooms you have: ${AZIENDA.referente} will call you back to arrange a site visit.`,
                        )}
                    />
                    <Rivela delay={100}>
                        <ModuloContatto titolo={t('Richiedi una proposta', 'Request a proposal')} />
                    </Rivela>
                </div>
            </Sezione>
        </>
    )
}
