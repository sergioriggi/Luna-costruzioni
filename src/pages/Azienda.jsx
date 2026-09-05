import { Link } from 'react-router-dom'
import Seo, { schemaAzienda, schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/azienda', label: 'Chi siamo' },
]

const IMPEGNI = [
    {
        titolo: 'Un solo referente, dall’inizio alla fine',
        testo:
            'Dal primo sopralluogo alla consegna parli sempre con la stessa persona. Nessun call center, nessun passaggio di consegne a metà cantiere, nessun numero che non risponde a settembre.',
    },
    {
        titolo: 'Preventivi che si possono leggere',
        testo:
            'Il documento che ricevi è scomposto voce per voce. Se una lavorazione non ti serve, si toglie e vedi subito quanto pesa. Nessun forfait unico da prendere o lasciare.',
    },
    {
        titolo: 'Quello che non promettiamo',
        testo:
            'Non garantiamo permessi che dipendono dal tuo Comune né tempi decisi da altri. Preferiamo indicarti in anticipo dove sono le incognite, piuttosto che scoprirle a scavo aperto.',
    },
    {
        titolo: 'Il cantiere si lascia pulito',
        testo:
            'Il giardino viene rimesso in ordine ogni sera e riconsegnato pulito a fine lavori. Sembra un dettaglio: chi ha già fatto una ristrutturazione sa che non lo è.',
    },
]

export default function Azienda() {
    return (
        <>
            <Seo
                titolo="Chi siamo | Luna Costruzioni S.r.l.s., impresa di costruzioni in Sicilia"
                descrizione="Luna Costruzioni S.r.l.s. è un'impresa siciliana specializzata in piscine con spiaggia in sabbia e opere in pietra. Referente Luciano Naro. Sopralluogo e preventivo gratuiti in tutte le province."
                percorso="/azienda"
                immagine="oasi-con-pontile-1280.jpg"
                schema={[schemaAzienda(), schemaBriciole(BRICIOLE)]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">Chi siamo</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Un’impresa siciliana che lavora la pietra
                        </h1>
                        <p className="testo-lungo mt-6">
                            {AZIENDA.nome} nasce come impresa di costruzioni e continua a esserlo. Muoviamo terra,
                            costruiamo muri, posiamo pietra: è il mestiere da cui veniamo ed è la ragione per cui,
                            quando abbiamo incontrato le piscine con fondale in sabbia, ci siamo trovati a casa.
                        </p>
                        <p className="testo-lungo mt-4">
                            Da concessionari autorizzati Piscine Rocks Design portiamo quel mestiere in due
                            direzioni, con le stesse squadre e gli stessi mezzi:{' '}
                            <Link to="/piscine-rocks-design" className="link-sottile font-medium text-testo">
                                piscine con spiaggia in sabbia
                            </Link>{' '}
                            e{' '}
                            <Link to="/giardini-e-opere-in-pietra" className="link-sottile font-medium text-testo">
                                giardini e opere in pietra
                            </Link>
                            . In tutta la Sicilia, con un unico referente: {AZIENDA.referente}.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-primario">
                                Chiama {AZIENDA.referente}
                            </a>
                            <Link to="/showroom" className="bottone-secondario">Vedine una dal vivo</Link>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="oasi-con-pontile"
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
                    occhiello="Come lavoriamo"
                    titolo="Quattro impegni, non quattro slogan"
                    testo="Sono i punti su cui potete chiamarci in causa a lavori finiti."
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {IMPEGNI.map((p, i) => (
                        <Rivela as="li" key={p.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{p.titolo}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{p.testo}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <Rivela>
                        <p className="occhiello">Dove lavoriamo</p>
                        <h2 className="titolo-sezione">Tutta la Sicilia, davvero</h2>
                        <p className="testo-lungo mt-5">
                            Non è una formula di rito: raggiungiamo le nove province per il sopralluogo, il cantiere e
                            l’assistenza negli anni successivi. Se il tuo terreno è fuori mano te lo diciamo prima di
                            partire, insieme a che cosa comporta sui tempi.
                        </p>
                        <ul className="mt-7 flex flex-wrap gap-2">
                            {PROVINCE.map(p => (
                                <li key={p.slug}>
                                    <Link
                                        to={`/piscine-rocks-design/${p.slug}`}
                                        className="inline-block rounded-full border border-testo/[0.16] bg-superficie px-4 py-2 text-sm text-neutro-300 transition hover:border-accento hover:text-accento-300"
                                    >
                                        {p.nome}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Rivela>
                    <Rivela delay={120} className="grid grid-cols-2 gap-4">
                        <Immagine slug="spiaggia-di-sabbia-privata" ratio="3 / 4" className="rounded-lg shadow-morbida" sizes="(min-width: 1024px) 24vw, 45vw" />
                        <Immagine slug="monolite-al-tramonto" ratio="3 / 4" className="mt-10 rounded-lg shadow-morbida" sizes="(min-width: 1024px) 24vw, 45vw" />
                    </Rivela>
                </div>
            </Sezione>

            {/* Credenziale: sta qui, non in apertura di pagina */}
            <Sezione sfondo="bg-superficie">
                <div className="mx-auto max-w-3xl">
                    <Rivela className="scheda">
                        <p className="occhiello">Una precisazione doverosa</p>
                        <h2 className="mt-3 font-display text-2xl">Le piscine le costruiamo, non le abbiamo inventate</h2>
                        <p className="mt-4 text-[0.95rem] leading-relaxed text-neutro-400">
                            La <strong className="font-semibold text-testo">Tecnologia Rocks Design®</strong> —
                            brevetto, marchio e standard costruttivi — appartiene a {ROCKS_DESIGN.nome}.{' '}
                            {AZIENDA.nome} ne è il <strong className="font-semibold text-testo">concessionario
                            autorizzato per la {AZIENDA.zona}</strong>: siamo l’impresa che la applica sul territorio,
                            con squadre formate sugli standard della casa madre.
                        </p>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                            Lo scriviamo perché è giusto sapere chi fa cosa: noi rispondiamo del cantiere e del
                            risultato in Sicilia; la tecnologia ha un altro autore.{' '}
                            <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="link-sottile font-medium text-testo">
                                Sito ufficiale {ROCKS_DESIGN.nome}
                            </a>
                        </p>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <IntestazioneSezione
                        occhiello="Parliamone"
                        titolo="Il modo più rapido per capirci è vederci"
                        testo={`Mezz'ora davanti a una Piscina Rocks Design chiarisce più di dieci pagine di sito, e la visita la organizziamo noi. Oppure raccontaci il tuo progetto qui: ${AZIENDA.referente} risponde entro 24 ore lavorative.`}
                    />
                    <Rivela delay={100}>
                        <ModuloContatto titolo="Scrivici" />
                    </Rivela>
                </div>
            </Sezione>
        </>
    )
}
