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
                        <strong className="font-semibold text-testo">non esiste un listino</strong>: una Piscina
                        Rocks Design non ha misure standard, quindi non ha nemmeno un prezzo standard.
                    </p>
                    <p className="testo-lungo mt-4">
                        Quello che possiamo fare — e che quasi nessuno fa — è dirti in anticipo{' '}
                        <strong className="font-semibold text-testo">quali sono le voci che spostano il
                        preventivo</strong>. Se le conosci, quando ricevi un’offerta (la nostra o quella di chiunque
                        altro) sai dove guardare.
                    </p>
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello="Le cinque voci che contano"
                    titolo="Che cosa sposta il prezzo"
                />
                <ol className="mt-12 space-y-5">
                    {FATTORI_COSTO.map((f, i) => (
                        <Rivela as="li" key={f.titolo} delay={i * 70} className="scheda flex flex-col gap-4 sm:flex-row sm:gap-7">
                            <span className="font-display text-3xl leading-none text-accento sm:w-16">
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
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello="Come leggere un preventivo"
                        titolo="Quattro domande da fare a chiunque"
                    >
                        <ul className="mt-7 space-y-4 text-[1.0625rem] text-neutro-300">
                            {[
                                'Che cosa è incluso oltre alla vasca? Scavo, smaltimento del materiale di risulta, impianti, spiaggia, verde: sono voci che possono valere quanto la piscina.',
                                'I tempi sono scritti in contratto o detti a voce?',
                                'Chi segue il cantiere ogni giorno, e con chi parlo se qualcosa non va?',
                                'Che cosa succede dopo la consegna: chi fa l’assistenza, e da quanto lontano arriva?',
                            ].map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accento" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-[0.95rem] leading-relaxed text-neutro-500">
                            Sono le domande che consigliamo di farci. Valgono anche per gli altri preventivi che stai
                            valutando.
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Sezione sfondo="bg-notte-800 text-neutro-200">
                <div className="mx-auto max-w-3xl text-center">
                    <Rivela>
                        <p className="occhiello text-accento-300">In pratica</p>
                        <h2 className="titolo-sezione text-testo">Come si arriva a un numero</h2>
                    </Rivela>
                    <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
                        {[
                            ['Chiami o scrivi', 'Ti facciamo due domande al telefono per capire se ha senso muoverci.'],
                            ['Sopralluogo gratuito', 'Circa un’ora in giardino, con i campioni di sabbia al seguito.'],
                            ['Preventivo dettagliato', 'Entro una o due settimane, scomposto voce per voce.'],
                        ].map(([t, d], i) => (
                            <Rivela as="li" key={t} delay={i * 100} className="rounded-lg bg-testo/[0.05] p-6">
                                <span className="font-display text-2xl text-accento-300">{i + 1}</span>
                                <h3 className="mt-2 text-base text-testo">{t}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutro-400">{d}</p>
                            </Rivela>
                        ))}
                    </ol>
                    <Rivela className="mt-10">
                        <Link to="/contatti" className="bottone-pieno">Inizia dal sopralluogo</Link>
                    </Rivela>
                </div>
            </Sezione>


            {/*
              Bonus ristrutturazione. Va detto con onestà: Luna Costruzioni
              costruisce soprattutto piscine nuove, e su una piscina nuova la
              detrazione di norma NON spetta. Presentarla come un vantaggio
              generico sarebbe fuorviante e si ritorcerebbe contro in fase di
              preventivo. Qui si spiega quando spetta davvero.
            */}
            <Sezione>
                <IntestazioneSezione
                    occhiello="Agevolazioni fiscali"
                    titolo="Bonus ristrutturazione: quando si applica davvero"
                >
                    <p className="testo-lungo mt-6 max-w-prosa">
                        Se rifai una piscina che hai già, puoi recuperare una parte della spesa con la
                        detrazione IRPEF per le ristrutturazioni edilizie. Vale la pena saperlo prima di
                        chiedere il preventivo, perché cambia il conto finale.
                    </p>
                </IntestazioneSezione>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {[
                        ['50%', 'sull’abitazione principale', 'Aliquota in vigore per le spese sostenute entro il 31 dicembre 2026.'],
                        ['36%', 'sulle seconde case', 'Stessa scadenza. Dal 2027 le due aliquote scendono a 36% e 30%.'],
                        ['96.000 €', 'tetto di spesa per unità immobiliare', 'La detrazione si recupera in 10 quote annuali di pari importo.'],
                    ].map(([n, etichetta, nota], i) => (
                        <Rivela key={n} delay={i * 100} className="scheda">
                            <p className="font-display text-3xl text-accento">{n}</p>
                            <p className="mt-1 text-sm text-testo">{etichetta}</p>
                            <p className="mt-3 text-sm leading-relaxed text-neutro-400">{nota}</p>
                        </Rivela>
                    ))}
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <Rivela>
                        <h2 className="font-display text-xl text-testo">Lavori ammessi</h2>
                        <ul className="mt-4 grid gap-2.5 text-[15px] leading-relaxed text-neutro-300">
                            {[
                                'Rifacimento del rivestimento interno o della vasca.',
                                'Sostituzione o miglioramento degli impianti di filtrazione e ricircolo.',
                                'Rinnovo del solarium, dei bordi e della pavimentazione esterna.',
                                'Installazione di impianti di riscaldamento, illuminazione o idromassaggio.',
                                'Riparazione e rinforzo della struttura per cedimenti.',
                            ].map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accento" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                    </Rivela>

                    <Rivela delay={100}>
                        <h2 className="font-display text-xl text-testo">Le due regole per non perderlo</h2>
                        <dl className="mt-4 grid gap-5 text-[15px] leading-relaxed">
                            <div>
                                <dt className="text-testo">Bonifico parlante</dt>
                                <dd className="mt-1 text-neutro-300">
                                    Va usato il bonifico specifico per ristrutturazioni edilizie, con la causale
                                    corretta, il codice fiscale di chi porta in detrazione e la partita IVA
                                    dell’impresa. Un bonifico ordinario fa perdere il beneficio.
                                </dd>
                            </div>
                            <div>
                                <dt className="text-testo">Manutenzione straordinaria</dt>
                                <dd className="mt-1 text-neutro-300">
                                    L’intervento sulla piscina esistente deve configurarsi come manutenzione
                                    straordinaria o restauro e risanamento conservativo. La manutenzione
                                    ordinaria non rientra.
                                </dd>
                            </div>
                        </dl>
                    </Rivela>
                </div>

                <Rivela className="mt-10 rounded-lg border border-accento-700 bg-accento/[0.06] p-6 sm:p-7">
                    <p className="font-display text-lg text-testo">
                        Una piscina nuova, di norma, non rientra nel bonus
                    </p>
                    <p className="testo-lungo mt-3 max-w-prosa text-[15px]">
                        La sola realizzazione di una piscina da zero non dà diritto alla detrazione, a meno
                        che non faccia parte di un intervento più ampio di ristrutturazione dell’edificio.
                        Preferiamo dirtelo subito: se qualcuno ti promette il 50% su una piscina nuova in
                        giardino, ti sta vendendo un’aspettativa che l’Agenzia delle Entrate non conferma.
                    </p>
                    <p className="mt-4 max-w-prosa text-sm leading-relaxed text-neutro-500">
                        Aliquote e regole aggiornate al 2026. Non siamo consulenti fiscali: la valutazione
                        del tuo caso va fatta con il tuo commercialista o con un CAF, prima di firmare.
                    </p>
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Domande frequenti" titolo="Sui costi, senza giri di parole" />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ_COSTO.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-costo">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                                <h3 className="font-display text-lg text-testo sm:text-xl">{v.domanda}</h3>
                                <span className="mt-1 shrink-0 text-accento transition group-open:rotate-45" aria-hidden="true">
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

            <Sezione sfondo="bg-superficie">
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
