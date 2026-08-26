import { Link } from 'react-router-dom'
import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { FATTORI_COSTO } from '../data/content'
import { AZIENDA } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/quanto-costa', label: 'Quanto costa' },
]

const FAQ_COSTO = [
    {
        domanda: 'Perché non pubblicate un listino?',
        risposta:
            'Perché non esistono due vasche uguali e un prezzo a metro quadro, in questo settore, dice poco: lo stesso progetto in un giardino accessibile e in uno raggiungibile solo a mano ha costi molto diversi. Un listino sarebbe rassicurante da leggere e sistematicamente sbagliato. Preferiamo spiegare che cosa sposta il preventivo e dare un numero reale dopo il sopralluogo.',
    },
    {
        domanda: 'Il sopralluogo e il preventivo si pagano?',
        risposta:
            'No. Veniamo a vedere il giardino, misuriamo e prepariamo il preventivo senza alcun costo e senza impegno. Se dal sopralluogo emerge che quello spazio non è adatto, te lo diciamo subito: è capitato e continuerà a capitare.',
    },
    {
        domanda: 'Costa più o meno di una piscina tradizionale?',
        risposta:
            'A parità di superficie e di livello di finitura, i due ordini di grandezza sono confrontabili. Cambia però la distribuzione della spesa: qui pesano di più la selezione e la movimentazione dei massi, mentre spariscono getti, casseri e rivestimenti. Nel confronto vanno considerate anche le opere di contorno, che in una piscina tradizionale sono spesso preventivate a parte.',
    },
    {
        domanda: 'Si può fare a lotti?',
        risposta:
            'Sì, ed è una strada che consigliamo spesso. Si realizza la vasca con le predisposizioni necessarie e si completano in un secondo momento cascate, illuminazione scenografica, solarium o piantumazione. Predisporre durante il cantiere costa una frazione rispetto a intervenire dopo.',
    },
    {
        domanda: 'Ci sono agevolazioni fiscali?',
        risposta:
            'Dipende dal tipo di intervento, dalla situazione dell’immobile e dalle norme in vigore nell’anno in cui apri il cantiere: è una valutazione che spetta al tuo commercialista o al tuo tecnico, non a noi. Diffida di chi te la promette al telefono senza aver visto una pratica.',
    },
]

export default function QuantoCosta() {
    return (
        <>
            <Seo
                titolo="Quanto costa una piscina con spiaggia in sabbia | Luna Costruzioni, Sicilia"
                descrizione="Che cosa determina davvero il prezzo di una piscina in Tecnologia Rocks Design®: dimensione, accessibilità del giardino, modello, cascate e opere di contorno. Sopralluogo e preventivo gratuiti in tutta la Sicilia."
                percorso="/quanto-costa"
                immagine="https://www.lunacostruzioni.it/media/villa-con-spiaggia-in-ghiaia-1280.jpg"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ_COSTO)]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">Prezzi e preventivi</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        Quanto costa, davvero
                    </h1>
                    <p className="testo-lungo mt-6">
                        È la prima domanda di tutti ed è giusto che lo sia. La risposta onesta è che{' '}
                        <strong className="font-semibold text-pietra-800">non esiste un listino</strong>: una Piscina
                        Rocks Design non ha misure standard, quindi non ha nemmeno un prezzo standard.
                    </p>
                    <p className="testo-lungo mt-4">
                        Quello che possiamo fare — e che quasi nessuno fa — è dirti in anticipo{' '}
                        <strong className="font-semibold text-pietra-800">quali sono le voci che spostano il
                        preventivo</strong>. Se le conosci, quando ricevi un’offerta (la nostra o quella di chiunque
                        altro) sai dove guardare.
                    </p>
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    occhiello="Le cinque voci che contano"
                    titolo="Che cosa sposta il prezzo"
                />
                <ol className="mt-12 space-y-5">
                    {FATTORI_COSTO.map((f, i) => (
                        <Rivela as="li" key={f.titolo} delay={i * 70} className="scheda flex flex-col gap-4 sm:flex-row sm:gap-7">
                            <span className="font-display text-3xl leading-none text-oro-500 sm:w-16">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div>
                                <h2 className="text-xl">{f.titolo}</h2>
                                <p className="testo-lungo mt-2">{f.testo}</p>
                            </div>
                        </Rivela>
                    ))}
                </ol>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <Rivela>
                        <Immagine
                            slug="villa-con-spiaggia-in-ghiaia"
                            ratio="4 / 3"
                            className="rounded-2xl shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello="Come leggere un preventivo"
                        titolo="Quattro domande da fare a chiunque"
                    >
                        <ul className="mt-7 space-y-4 text-[1.0625rem] text-pietra-700">
                            {[
                                'Che cosa è incluso oltre alla vasca? Scavo, smaltimento del materiale di risulta, impianti, spiaggia, verde: sono voci che possono valere quanto la piscina.',
                                'I tempi sono scritti in contratto o detti a voce?',
                                'Chi segue il cantiere ogni giorno, e con chi parlo se qualcosa non va?',
                                'Che cosa succede dopo la consegna: chi fa l’assistenza, e da quanto lontano arriva?',
                            ].map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oro-500" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-[0.95rem] leading-relaxed text-pietra-500">
                            Sono le domande che consigliamo di farci. Valgono anche per gli altri preventivi che stai
                            valutando.
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Sezione sfondo="bg-pietra-900 text-sabbia-100">
                <div className="mx-auto max-w-3xl text-center">
                    <Rivela>
                        <p className="occhiello text-acqua-300">In pratica</p>
                        <h2 className="titolo-sezione text-white">Come si arriva a un numero</h2>
                    </Rivela>
                    <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
                        {[
                            ['Chiami o scrivi', 'Ti facciamo due domande al telefono per capire se ha senso muoverci.'],
                            ['Sopralluogo gratuito', 'Circa un’ora in giardino, con i campioni di sabbia al seguito.'],
                            ['Preventivo dettagliato', 'Entro una o due settimane, scomposto voce per voce.'],
                        ].map(([t, d], i) => (
                            <Rivela as="li" key={t} delay={i * 100} className="rounded-2xl bg-white/5 p-6">
                                <span className="font-display text-2xl text-oro-400">{i + 1}</span>
                                <h3 className="mt-2 text-base text-white">{t}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-sabbia-300">{d}</p>
                            </Rivela>
                        ))}
                    </ol>
                    <Rivela className="mt-10">
                        <Link to="/contatti" className="bottone-chiaro">Inizia dal sopralluogo</Link>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Domande frequenti" titolo="Sui costi, senza giri di parole" />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-pietra-200 border-y border-pietra-200">
                    {FAQ_COSTO.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-costo">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                                <h3 className="font-display text-lg text-pietra-900 sm:text-xl">{v.domanda}</h3>
                                <span className="mt-1 shrink-0 text-acqua-700 transition group-open:rotate-45" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="testo-lungo mt-3 pr-10">{v.risposta}</p>
                        </details>
                    ))}
                </div>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <IntestazioneSezione
                        occhiello="Preventivo"
                        titolo="Dicci due cose e ti diamo un ordine di grandezza"
                        testo={`Più dettagli ci dai — superficie disponibile, budget indicativo, accessi — più il primo riscontro sarà preciso. ${AZIENDA.referente} ti risponde entro 24 ore lavorative.`}
                    />
                    <Rivela delay={100}>
                        <ModuloContatto titolo="Richiedi il preventivo" />
                    </Rivela>
                </div>
            </Sezione>
        </>
    )
}
