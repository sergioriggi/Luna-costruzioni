import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import {
    CONFRONTO_CEMENTO,
    QUANDO_CEMENTO,
    QUANDO_ROCKS,
    VANTAGGI_CEMENTO,
    VANTAGGI_ROCKS,
} from '../data/content'

/**
 * «Piscina in cemento o Piscina Rocks Design?»
 *
 * PERCHÉ QUESTA PAGINA ESISTE, visto che /piscine-rocks-design ha già una
 * tabella di confronto. Quella confronta la FISICA delle due piscine —
 * struttura, fondale, bordo — e risponde a «com'è fatta». Questa risponde a
 * «quale scelgo», che è l'unica domanda per cui la gente cerca davvero. I due
 * assi non si sovrappongono: se un giorno cominciano a somigliarsi, una delle
 * due pagine ha cambiato mestiere.
 *
 * PERCHÉ IL CEMENTO VINCE, in una pagina nostra. Non è cortesia. Un confronto
 * in cui l'altro prodotto non vince mai su niente non convince chi sta
 * scegliendo sul serio, e in Italia la pubblicità comparativa è lecita
 * (D.Lgs. 145/2007, art. 4) solo se è oggettiva, pertinente, verificabile e
 * non denigratoria. Le due esigenze chiedono la stessa pagina. La sezione
 * «Dove il cemento vince davvero» è il motore di credibilità di tutto il
 * resto: va aggiornata se cambia il prodotto, non annacquata se qualcuno la
 * trova scomoda.
 *
 * LE TRE AFFERMAZIONI DA NON FARE MAI QUI — costa meno, si mantiene con meno
 * lavoro, ha bisogno di meno permessi. Sono le prime tre che verrebbero in
 * mente a chiunque scriva una pagina di confronto, e il sito stesso dice il
 * contrario altrove (QuantoCosta.jsx, Home.jsx, Tecnologia.jsx). La sezione
 * «Due cose che non cambiano» le mette in chiaro di proposito: è la parte che
 * dimostra che la pagina non sta vendendo, ed è per questo che la sezione
 * successiva viene creduta.
 *
 * La locuzione «piscina naturale» non compare, nemmeno seguita dal marchio: su
 * una pagina che nomina di continuo la piscina in cemento sarebbe l'accostamento
 * più facile da fraintendere. Si scrive «Piscina Rocks Design».
 */

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/piscina-in-cemento-o-rocks-design', label: 'Cemento o Rocks Design' },
]

const FAQ_CONFRONTO = [
    {
        domanda: 'Costa meno di una piscina in cemento?',
        risposta:
            'No, e diffida di chi te lo dice. A parità di superficie e di livello di finitura i due ordini di grandezza sono confrontabili. Cambia la distribuzione della spesa: qui pesano di più la selezione e la movimentazione dei massi, mentre spariscono getti, casseri e rivestimenti. Il confronto ha senso solo a parità di che cosa è incluso — scavo, smaltimento, impianti, spiaggia e verde sono voci che in una piscina tradizionale vengono spesso preventivate a parte.',
    },
    {
        domanda: 'Ha bisogno di meno manutenzione?',
        risposta:
            'No. Dietro l’aspetto di una caletta lavorano impianti di filtrazione e sanificazione come in qualsiasi altra piscina, e le operazioni da fare sono le stesse: controllo dei valori dell’acqua, trattamento, pulizia del fondo, gestione stagionale. Chi ti promette una piscina che non si mantiene ti sta descrivendo un laghetto, che è un’altra cosa.',
    },
    {
        domanda: 'Serve il permesso anche per una Piscina Rocks Design?',
        risposta:
            'Sì. Una piscina interrata richiede un titolo edilizio in entrambi i casi: quale, dipende dal Comune, dal piano regolatore e dai vincoli sul lotto. L’assenza di opere in cemento armato è un elemento che gioca a favore nella valutazione, ma non è un’esenzione automatica e la giurisprudenza in materia non è uniforme. Va verificato con il tuo tecnico prima di firmare qualsiasi cosa.',
    },
    {
        domanda: 'Ci si può nuotare o è solo scenografica?',
        risposta:
            'Ci si nuota: è una piscina a tutti gli effetti, con profondità di nuoto e impianti veri. Quello che non è, è una vasca da allenamento: non ci sono corsie, la lunghezza non è costante e il fondale non è a quota uniforme. Se il tuo obiettivo è fare vasche a cronometro, una piscina in cemento ti serve meglio, e te lo diciamo già al telefono.',
    },
    {
        domanda: 'Come so se il risultato mi piacerà più di una vasca in cemento?',
        risposta:
            'Guardando sul tuo terreno le parti che decidi tu. I campioni di sabbia li portiamo in giardino e li confronti con la luce di casa tua; la forma della vasca viene disegnata sulle misure reali del lotto, spiaggia compresa, prima di firmare. Se davanti al disegno ti accorgi che volevi una vasca per nuotare, è il momento giusto per scegliere il cemento.',
    },
]

export default function ConfrontoCemento() {
    return (
        <>
            <Seo
                titolo="Piscina in cemento o Piscina Rocks Design | Luna Costruzioni"
                descrizione="Cemento o Rocks Design: costi, tempi, permessi e forma, dove vince il cemento (corsie, giardini piccoli) e chi costruisce le due piscine in Sicilia."
                percorso="/piscina-in-cemento-o-rocks-design"
                immagine="spiaggia-di-sabbia-privata-1280.jpg"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ_CONFRONTO)]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">Il confronto</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        Piscina in cemento o Piscina Rocks Design?
                    </h1>
                    <p className="testo-lungo mt-6">
                        <strong className="font-semibold text-testo">La risposta non è sempre noi.</strong> Sono
                        due piscine vere, tutte e due con impianti veri, e per certi giardini e certe persone la
                        vasca in cemento resta la scelta giusta. Questa pagina serve a capire in quale dei due casi
                        ti trovi, prima di spendere il tempo di un sopralluogo.
                    </p>
                    <p className="testo-lungo mt-4">
                        La differenza non è la qualità: è che cosa vuoi fare nell’acqua, e che cosa vuoi che
                        diventi il giardino attorno.
                    </p>
                </Rivela>
            </Sezione>

            {/*
              Il blocco progettato per essere citato: autoconsistente, simmetrico,
              stessa lunghezza sulle due colonne. È quello che un assistente
              conversazionale riporta testualmente quando gli si chiede quale
              delle due scegliere, quindi deve reggere da solo, fuori dal sito.
            */}
            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello="In trenta secondi"
                    titolo="La decisione, in breve"
                    testo="Se ti riconosci in una delle due colonne, hai già la risposta."
                />
                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <Rivela className="scheda">
                        <h2 className="font-display text-2xl">Scegli una piscina in cemento se…</h2>
                        <ul className="mt-5 space-y-3.5 text-[1.0625rem] leading-relaxed text-neutro-300">
                            {QUANDO_CEMENTO.map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutro-500" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                    </Rivela>
                    <Rivela delay={120} className="scheda">
                        <h2 className="font-display text-2xl">Scegli una Piscina Rocks Design se…</h2>
                        <ul className="mt-5 space-y-3.5 text-[1.0625rem] leading-relaxed text-neutro-300">
                            {QUANDO_ROCKS.map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutro-500" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello="Voce per voce"
                    titolo="Le otto cose che cambiano davvero"
                    testo="Otto righe, senza aggettivi. Dove le due piscine si equivalgono è scritto che si equivalgono."
                />
                <Rivela className="mt-10 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                        <caption className="sr-only">
                            Confronto fra piscina in cemento e Piscina Rocks Design, voce per voce
                        </caption>
                        <thead>
                            <tr className="border-b border-testo/[0.16]">
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500"> </th>
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500">Piscina in cemento</th>
                                <th scope="col" className="py-4 font-semibold text-testo">Piscina Rocks Design</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CONFRONTO_CEMENTO.map(([voce, cemento, rocks]) => (
                                <tr key={voce} className="border-b border-testo/[0.16]">
                                    <th scope="row" className="py-4 pr-4 font-medium text-testo">{voce}</th>
                                    <td className="py-4 pr-4 text-neutro-500">{cemento}</td>
                                    <td className="py-4 font-medium text-testo">{rocks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Rivela>
                <Rivela className="mt-6 max-w-prosa text-sm leading-relaxed text-neutro-500">
                    Manca volutamente una riga su durata e rifacimento. Sarebbe l’argomento più efficace della
                    tabella, e non abbiamo dati verificabili da metterci: preferiamo una riga in meno a un numero
                    inventato. È anche una buona domanda da fare a chiunque ti presenti un preventivo.
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello="Senza giri di parole"
                    titolo="Dove il cemento vince davvero"
                    testo="Quattro cose su cui una vasca tradizionale è semplicemente più adatta. Se sono le tue, è lì che devi guardare."
                />
                <ul className="mt-12 grid gap-6 md:grid-cols-2">
                    {VANTAGGI_CEMENTO.map((v, i) => (
                        <Rivela as="li" key={v.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-xl">{v.titolo}</h2>
                            <p className="testo-lungo mt-2.5 text-[0.95rem]">{v.testo}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <Rivela>
                        <Immagine
                            slug="spiaggia-di-sabbia-privata"
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                        <CreditoFoto />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello="L’altra metà"
                        titolo="Dove vince la Piscina Rocks Design"
                    >
                        <ul className="mt-8 space-y-6">
                            {VANTAGGI_ROCKS.map(v => (
                                <li key={v.titolo}>
                                    <h3 className="font-display text-lg text-testo">{v.titolo}</h3>
                                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-neutro-400">{v.testo}</p>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-[0.95rem] leading-relaxed text-neutro-400">
                            Come sono fatte pareti, fondo e impianti lo spiega la pagina{' '}
                            <Link to="/piscine-rocks-design" className="link-sottile font-medium text-accento">
                                La Piscina Rocks Design
                            </Link>
                            . A quali condizioni l'ingresso digradante cambia l'aliquota IVA sta invece in{' '}
                            <Link to="/quanto-costa" className="link-sottile font-medium text-accento">
                                Quanto costa
                            </Link>
                            .
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            {/*
              La sezione che dimostra che la pagina non sta vendendo. Sono le tre
              cose che un confronto scritto d'istinto affermerebbe a favore
              nostro, e sono false: il sito stesso dice il contrario altrove.
              Toglierla non farebbe guadagnare un contatto in più — farebbe
              perdere la ragione per cui si crede a tutto il resto.
            */}
            <Sezione sfondo="bg-notte-800 text-neutro-200">
                <div className="mx-auto max-w-3xl">
                    <Rivela className="text-center">
                        <p className="occhiello text-accento-300">Le promesse che non ti facciamo</p>
                        <h2 className="titolo-sezione text-testo">Tre cose che non cambiano</h2>
                    </Rivela>
                    <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                        {[
                            [
                                'Il costo',
                                'A parità di superficie e finitura gli ordini di grandezza sono confrontabili. Cambia dove va la spesa, non quanta.',
                            ],
                            [
                                'La manutenzione',
                                'Stessi impianti, stesse operazioni, stessa stagionalità. L’aspetto è quello di una caletta; il lavoro è quello di una piscina.',
                            ],
                            [
                                'I permessi',
                                'Serve un titolo edilizio in entrambi i casi. Niente cemento armato aiuta nella valutazione, non esonera da nulla.',
                            ],
                        ].map(([t, d], i) => (
                            <Rivela as="div" key={t} delay={i * 100} className="rounded-lg bg-testo/[0.05] p-6">
                                <dt className="font-display text-xl text-testo">{t}</dt>
                                <dd className="mt-2.5 text-sm leading-relaxed text-neutro-400">{d}</dd>
                            </Rivela>
                        ))}
                    </dl>
                    <Rivela className="mt-10 text-center">
                        <p className="mx-auto max-w-xl text-[0.95rem] leading-relaxed text-neutro-400">
                            Se stai leggendo un preventivo in cui una di queste tre compare come vantaggio, è il
                            momento di chiedere su quali dati si basa.
                        </p>
                        <Link to="/quanto-costa" className="link-sottile mt-5 inline-block text-sm font-medium text-accento-300">
                            Che cosa sposta davvero il prezzo
                        </Link>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Domande frequenti" titolo="Le domande che ci fanno a questo punto" />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ_CONFRONTO.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-confronto">
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

            <ChiusuraContatto
                occhiello="Il modo più rapido per decidere"
                titolo="Facci vedere il giardino"
                testo="Un’ora sul posto dice più di qualsiasi tabella: misuriamo lo spazio e ti diciamo quale delle due strade ha senso nel tuo caso, anche quando la risposta è la piscina in cemento."
                modulo={{ titolo: 'Cemento o Rocks Design, nel mio giardino' }}
            />
        </>
    )
}
