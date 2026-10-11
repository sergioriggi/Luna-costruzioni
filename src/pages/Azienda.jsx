import { Link } from '../lib/instradamento'
import Seo, { schemaAzienda, schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'
import BottoneTelefono from '../components/BottoneTelefono'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/azienda', label: 'Chi siamo', labelEn: 'About us' },
]

const IMPEGNI = [
    {
        titolo: 'Un solo referente, dall’inizio alla fine',
        titoloEn: 'One contact, from start to finish',
        testo:
            'Dal primo sopralluogo alla consegna parli sempre con la stessa persona. Nessun call center, nessun passaggio di consegne a metà cantiere, nessun numero che non risponde a settembre.',
        testoEn:
            'From the first site visit to handover you deal with the same person. No call centre, no handing over halfway through the job, no number that stops answering in September.',
    },
    {
        titolo: 'Preventivi che si possono leggere',
        titoloEn: 'Quotes you can actually read',
        testo:
            'Il documento che ricevi è scomposto voce per voce. Se una lavorazione non ti serve, si toglie e vedi subito quanto pesa. Nessun forfait unico da prendere o lasciare.',
        testoEn:
            'The quote you receive is broken down line by line. If you do not need an item, it comes out and you see straight away what it was worth. No single lump sum to take or leave.',
    },
    {
        titolo: 'Quello che non promettiamo',
        titoloEn: 'What we do not promise',
        testo:
            'Non garantiamo permessi che dipendono dal tuo Comune né tempi decisi da altri. Preferiamo indicarti in anticipo dove sono le incognite, piuttosto che scoprirle a scavo aperto.',
        testoEn:
            'We do not guarantee permits that depend on your local council, or timescales set by others. We would rather show you the unknowns in advance than find them with the ground already open.',
    },
    {
        titolo: 'Il cantiere si lascia pulito',
        titoloEn: 'A clean site',
        testo:
            'Il giardino viene rimesso in ordine ogni sera e riconsegnato pulito a fine lavori. Sembra un dettaglio, ma chi ha già fatto una ristrutturazione sa quanto conta.',
        testoEn:
            'The garden is tidied every evening and handed back clean when the work is done. It sounds like a detail, but anyone who has been through a renovation knows how much it matters.',
    },
]

export default function Azienda() {
    const { t, lingua } = useLingua()
    return (
        <>
            <Seo
                titolo="Chi siamo, impresa edile in Sicilia | Luna Costruzioni"
                descrizione="Movimento terra, muri e pietra dal 2021. Concessionario autorizzato Piscine Rocks Design: piscine con spiaggia in sabbia. Referente Luciano Naro."
                percorso="/azienda"
                immagine="oasi-con-pontile-1280.jpg"
                schema={[schemaAzienda(), schemaBriciole(BRICIOLE)]}
            />
            <Briciole voci={BRICIOLE.map(v => ({ ...v, label: t(v.label, v.labelEn) }))} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{t('Chi siamo', 'About us')}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">
                            {t('Un’impresa siciliana che lavora la pietra', 'A Sicilian contractor that works in stone')}
                        </h1>
                        <p className="testo-lungo mt-6">
                            {t(
                                `${AZIENDA.nome} nasce come impresa di costruzioni e continua a esserlo. Muoviamo terra, costruiamo muri, posiamo pietra: è il mestiere da cui veniamo ed è la ragione per cui, quando abbiamo incontrato le piscine con fondale in sabbia, ci siamo trovati a casa.`,
                                `${AZIENDA.nome} started out as a building contractor and still is one. We move earth, build walls and lay stone. That is our trade, and it is why sand-bottomed pools felt familiar the moment we came across them.`,
                            )}
                        </p>
                        <p className="testo-lungo mt-4">
                            {t(
                                'Da concessionari autorizzati Piscine Rocks Design portiamo quel mestiere in due direzioni, con le stesse squadre e gli stessi mezzi:',
                                'As an authorised Piscine Rocks Design dealer, we take that trade in two directions, with the same crews and the same machines:',
                            )}{' '}
                            <Link to="/piscine-rocks-design" className="link-sottile font-medium text-testo">
                                {t('piscine con spiaggia in sabbia', 'pools with a sand beach')}
                            </Link>{' '}
                            {t('e', 'and')}{' '}
                            <Link to="/giardini-e-opere-in-pietra" className="link-sottile font-medium text-testo">
                                {t('giardini e opere in pietra', 'gardens and stonework')}
                            </Link>
                            .{' '}
                            {t(
                                `In tutta la Sicilia; i lavori li segue ${AZIENDA.referente}.`,
                                `Anywhere in Sicily; ${AZIENDA.referente} runs the work.`,
                            )}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <BottoneTelefono className="bottone-primario">{t(`Chiama ${AZIENDA.referente}`, `Call ${AZIENDA.referente}`)}</BottoneTelefono>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="oasi-con-pontile"
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
                    occhiello={t('Come lavoriamo', 'How we work')}
                    titolo={t('Quattro impegni', 'Four commitments')}
                    testo={t(
                        'Sono i punti su cui potete chiamarci in causa a lavori finiti.',
                        'These are the points you can hold us to once the work is finished.',
                    )}
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {IMPEGNI.map((p, i) => (
                        <Rivela as="li" key={p.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{t(p.titolo, p.titoloEn)}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{t(p.testo, p.testoEn)}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <Rivela>
                        <p className="occhiello">{t('Dove lavoriamo', 'Where we work')}</p>
                        <h2 className="titolo-sezione">{t('Tutta la Sicilia', 'All of Sicily')}</h2>
                        <p className="testo-lungo mt-5">
                            {t(
                                'Raggiungiamo le nove province, per il cantiere e per l’assistenza negli anni successivi. Se il tuo terreno è fuori mano te lo diciamo prima di partire, insieme a che cosa comporta sui tempi.',
                                'We cover all nine provinces, for the build and for aftercare in the years that follow. If your land is out of the way, we tell you before we start, along with what that means for the schedule.',
                            )}
                        </p>
                        <ul className="mt-7 flex flex-wrap gap-2">
                            {PROVINCE.map(p => (
                                <li key={p.slug}>
                                    <Link
                                        to={`/piscine-rocks-design/sicilia#${p.slug}`}
                                        className="inline-block rounded-full border border-testo/16 bg-superficie px-4 py-2 text-sm text-neutro-300 transition hover:border-accento hover:text-accento-300"
                                    >
                                        {p.nome}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Rivela>
                    <Rivela delay={120} className="grid grid-cols-2 gap-4">
                        <Immagine slug="spiaggia-di-sabbia-privata" ratio="3 / 4" className="rounded-lg" sizes="(min-width: 1024px) 24vw, 45vw" />
                        <Immagine slug="monolite-al-tramonto" ratio="3 / 4" className="mt-10 rounded-lg" sizes="(min-width: 1024px) 24vw, 45vw" />
                        <CreditoFoto className="col-span-2" />
                    </Rivela>
                </div>
            </Sezione>

            {/* Credenziale: sta qui, non in apertura di pagina */}
            <Sezione sfondo="bg-superficie">
                <div className="mx-auto max-w-3xl">
                    <Rivela className="scheda">
                        <p className="occhiello">{t('Una precisazione doverosa', 'For the record')}</p>
                        <h2 className="mt-3 font-display text-2xl">
                            {t('Le piscine le costruiamo, non le abbiamo inventate', 'We build these pools; we did not invent them')}
                        </h2>
                        {lingua === 'en' ? (
                            <p className="mt-4 text-[0.95rem] leading-relaxed text-neutro-400">
                                <strong className="font-semibold text-testo">Rocks Design Technology®</strong> — the
                                patent, the trademark and the construction standards — belongs to {ROCKS_DESIGN.nome}.{' '}
                                {AZIENDA.nome} is <strong className="font-semibold text-testo">one of two authorised
                                dealers in Sicily</strong>: a building contractor that has completed the official Rocks
                                Design training course and applies it on the island.
                            </p>
                        ) : (
                            <p className="mt-4 text-[0.95rem] leading-relaxed text-neutro-400">
                                La <strong className="font-semibold text-testo">Tecnologia Rocks Design®</strong> —
                                brevetto, marchio e standard costruttivi — appartiene a {ROCKS_DESIGN.nome}.{' '}
                                {AZIENDA.nome} è <strong className="font-semibold text-testo">uno dei due concessionari
                                autorizzati in {AZIENDA.zona}</strong>: un’impresa edile che ha seguito il corso ufficiale
                                Rocks Design e la applica sull’isola.
                            </p>
                        )}
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                'Lo scriviamo perché è giusto sapere chi fa cosa: noi rispondiamo del cantiere e del risultato in Sicilia; la tecnologia ha un altro autore.',
                                'We say so because you should know who does what: we answer for the build and the result in Sicily; the technology is someone else’s work.',
                            )}{' '}
                            <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="link-sottile font-medium text-testo">
                                {t(`Sito ufficiale ${ROCKS_DESIGN.nome}`, `Official ${ROCKS_DESIGN.nome} website`)}
                            </a>
                        </p>
                    </Rivela>
                </div>
            </Sezione>

            <ChiusuraContatto
                occhiello={t('Parliamone', 'Let’s talk')}
                titolo={t('Da dove partiamo?', 'Where do we start?')}
                testo={t(
                    'Scrivici che cosa hai in mente e dove: una piscina, un giardino in pietra o tutte e due. Molte cose si chiariscono già al telefono, prima ancora di venire.',
                    'Tell us what you have in mind and where: a pool, a stone garden or both. A lot can be settled on the phone, before we even come out.',
                )}
                modulo={{ titolo: t('Scrivici', 'Write to us') }}
            />
        </>
    )
}
