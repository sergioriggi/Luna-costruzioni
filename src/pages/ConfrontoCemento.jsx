import { Link } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import {
    CONFRONTO_CEMENTO,
    CONFRONTO_CEMENTO_EN,
    QUANDO_CEMENTO,
    QUANDO_CEMENTO_EN,
    QUANDO_ROCKS,
    QUANDO_ROCKS_EN,
    VANTAGGI_CEMENTO,
    VANTAGGI_ROCKS,
} from '../data/content'
import { useLingua } from '../i18n/lingua'

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
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/piscina-in-cemento-o-rocks-design', label: 'Cemento o Rocks Design', labelEn: 'Concrete or Rocks Design' },
]

const FAQ_CONFRONTO = [
    {
        domanda: 'Costa meno di una piscina in cemento?',
        domandaEn: 'Does it cost less than a concrete pool?',
        risposta:
            'No, e diffida di chi te lo dice. A parità di superficie e di livello di finitura i due ordini di grandezza sono confrontabili. Cambia la distribuzione della spesa: qui pesano di più la selezione e la movimentazione dei massi, mentre spariscono getti, casseri e rivestimenti. Il confronto ha senso solo a parità di che cosa è incluso — scavo, smaltimento, impianti, spiaggia e verde sono voci che in una piscina tradizionale vengono spesso preventivate a parte.',
        rispostaEn:
            'No, and be wary of anyone who says so. For the same area and level of finish the two are in the same order of magnitude. What changes is where the money goes: here the selection and handling of the boulders weigh more, while pours, formwork and linings disappear. The comparison only makes sense when the same things are included — excavation, disposal, plant, beach and planting are often quoted separately for a conventional pool.',
    },
    {
        domanda: 'Ha bisogno di meno manutenzione?',
        domandaEn: 'Does it need less maintenance?',
        risposta:
            'No. Dietro l’aspetto di una caletta lavorano impianti di filtrazione e sanificazione come in qualsiasi altra piscina, e le operazioni da fare sono le stesse: controllo dei valori dell’acqua, trattamento, pulizia del fondo, gestione stagionale. Chi ti promette una piscina che non si mantiene ti sta descrivendo un laghetto, che è un’altra cosa.',
        rispostaEn:
            'No. Behind the look of a small cove, filtration and sanitation plant works as it does in any other pool, and the tasks are the same: checking the water, treatment, cleaning the floor, seasonal care. Anyone promising you a pool that needs no upkeep is describing a pond, which is something else.',
    },
    {
        domanda: 'Serve il permesso anche per una Piscina Rocks Design?',
        domandaEn: 'Does a Piscine Rocks Design pool need planning consent too?',
        risposta:
            'Sì. Una piscina interrata richiede un titolo edilizio in entrambi i casi: quale, dipende dal Comune, dal piano regolatore e dai vincoli sul lotto. L’assenza di opere in cemento armato è un elemento che gioca a favore nella valutazione, ma non è un’esenzione automatica e la giurisprudenza in materia non è uniforme. Va verificato con il tuo tecnico prima di firmare qualsiasi cosa.',
        rispostaEn:
            'Yes. An in-ground pool needs planning consent in both cases: which kind depends on the municipality, the local plan and constraints on the plot. The absence of reinforced concrete counts in its favour in the assessment, but it is not an automatic exemption and case law on the subject is not consistent. Check it with your own surveyor or architect before signing anything.',
    },
    {
        domanda: 'Ci si può nuotare o è solo scenografica?',
        domandaEn: 'Can you swim in it, or is it just for show?',
        risposta:
            'Ci si nuota: è una piscina a tutti gli effetti, con profondità di nuoto e impianti veri. Non è però una vasca da allenamento: non ci sono corsie, la lunghezza non è costante e il fondale non è a quota uniforme. Se il tuo obiettivo è fare vasche a cronometro, una piscina in cemento ti serve meglio, e te lo diciamo già al telefono.',
        rispostaEn:
            'You can swim in it: it is a pool in every respect, with swimming depth and real plant. It is not, however, a training pool: there are no lanes, the length is not constant and the floor is not at a uniform depth. If your aim is timed lengths, a concrete pool will serve you better, and we will tell you so on the phone.',
    },
    {
        domanda: 'Come so se il risultato mi piacerà più di una vasca in cemento?',
        domandaEn: 'How do I know I will like the result more than a concrete pool?',
        risposta:
            'Guardando sul tuo terreno le parti che decidi tu. I campioni di sabbia li portiamo in giardino e li confronti con la luce di casa tua; la forma della vasca viene disegnata sulle misure reali del lotto, spiaggia compresa, prima di firmare. Se davanti al disegno ti accorgi che volevi una vasca per nuotare, è il momento giusto per scegliere il cemento.',
        rispostaEn:
            'By looking, on your own land, at the parts you decide. We bring the sand samples to your garden so you can compare them in the light at your home; the shape of the pool is drawn on the real measurements of the plot, beach included, before you sign. If, looking at the drawing, you realise you wanted a pool for swimming, that is the right moment to choose concrete.',
    },
]

const TRE_COSE = [
    {
        titolo: 'Il costo',
        titoloEn: 'Cost',
        testo: 'A parità di superficie e finitura gli ordini di grandezza sono confrontabili. Cambia solo la distribuzione della spesa.',
        testoEn: 'For the same area and finish the orders of magnitude are comparable. Only the way the money is spread changes.',
    },
    {
        titolo: 'La manutenzione',
        titoloEn: 'Maintenance',
        testo: 'Stessi impianti, stesse operazioni, stessa stagionalità. L’aspetto è quello di una caletta; il lavoro è quello di una piscina.',
        testoEn: 'Same plant, same tasks, same seasons. It looks like a small cove; the work is that of a pool.',
    },
    {
        titolo: 'I permessi',
        titoloEn: 'Permits',
        testo: 'Serve un titolo edilizio in entrambi i casi. L’assenza di cemento armato aiuta nella valutazione, ma il titolo resta necessario.',
        testoEn: 'Planning consent is needed in both cases. The absence of reinforced concrete helps the assessment, but consent is still required.',
    },
]

export default function ConfrontoCemento() {
    const { t } = useLingua()
    const briciole = BRICIOLE.map(v => ({ to: v.to, label: t(v.label, v.labelEn) }))
    const quandoCemento = t(QUANDO_CEMENTO, QUANDO_CEMENTO_EN)
    const quandoRocks = t(QUANDO_ROCKS, QUANDO_ROCKS_EN)

    return (
        <>
            <Seo
                titolo="Piscina in cemento o Piscina Rocks Design | Luna Costruzioni"
                descrizione="Cemento o Rocks Design: costi, tempi, permessi e forma, dove vince il cemento (corsie, giardini piccoli) e chi costruisce le due piscine in Sicilia."
                percorso="/piscina-in-cemento-o-rocks-design"
                immagine="spiaggia-di-sabbia-privata-1280.jpg"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ_CONFRONTO)]}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">{t('Il confronto', 'The comparison')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        {t('Piscina in cemento o Piscina Rocks Design?', 'Concrete pool or Piscine Rocks Design pool?')}
                    </h1>
                    <p className="testo-lungo mt-6">
                        <strong className="font-semibold text-testo">
                            {t('La risposta non è sempre noi.', 'The answer is not always us.')}
                        </strong>{' '}
                        {t(
                            'Sono due piscine vere, tutte e due con impianti veri, e per certi giardini e certe persone la vasca in cemento resta la scelta giusta. Questa pagina serve a capire in quale dei due casi ti trovi, prima di spendere il tempo di un sopralluogo.',
                            'Both are real pools, both with real plant, and for some gardens and some people a concrete pool is still the right choice. This page is here to help you work out which case you are in, before you spend time on a site visit.',
                        )}
                    </p>
                    <p className="testo-lungo mt-4">
                        {t(
                            'La differenza non è la qualità: è che cosa vuoi fare nell’acqua, e che cosa vuoi che diventi il giardino attorno.',
                            'The difference is not quality. It is what you want to do in the water, and what you want the garden around it to become.',
                        )}
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
                    occhiello={t('In trenta secondi', 'In thirty seconds')}
                    titolo={t('La decisione, in breve', 'The decision, in brief')}
                    testo={t(
                        'Se ti riconosci in una delle due colonne, hai già la risposta.',
                        'If you recognise yourself in one of the two columns, you already have your answer.',
                    )}
                />
                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <Rivela className="scheda">
                        <h2 className="font-display text-2xl">{t('Scegli una piscina in cemento se…', 'Choose a concrete pool if…')}</h2>
                        <ul className="mt-5 space-y-3.5 text-[1.0625rem] leading-relaxed text-neutro-300">
                            {quandoCemento.map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutro-500" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                    </Rivela>
                    <Rivela delay={120} className="scheda">
                        <h2 className="font-display text-2xl">{t('Scegli una Piscina Rocks Design se…', 'Choose a Piscine Rocks Design pool if…')}</h2>
                        <ul className="mt-5 space-y-3.5 text-[1.0625rem] leading-relaxed text-neutro-300">
                            {quandoRocks.map(v => (
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
                    occhiello={t('Voce per voce', 'Point by point')}
                    titolo={t('Le otto cose che cambiano davvero', 'The eight things that actually differ')}
                    testo={t(
                        'Otto righe, senza aggettivi. Dove le due piscine si equivalgono è scritto che si equivalgono.',
                        'Eight rows, no adjectives. Where the two pools are equal, it says so.',
                    )}
                />
                <Rivela className="mt-10 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                        <caption className="sr-only">
                            {t(
                                'Confronto fra piscina in cemento e Piscina Rocks Design, voce per voce',
                                'Concrete pool and Piscine Rocks Design pool compared, point by point',
                            )}
                        </caption>
                        <thead>
                            <tr className="border-b border-testo/[0.16]">
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500"> </th>
                                <th scope="col" className="py-4 pr-4 font-semibold text-neutro-500">
                                    {t('Piscina in cemento', 'Concrete pool')}
                                </th>
                                <th scope="col" className="py-4 font-semibold text-testo">Piscina Rocks Design</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CONFRONTO_CEMENTO.map((riga, i) => {
                                const [voce, cemento, rocks] = t(riga, CONFRONTO_CEMENTO_EN[i])
                                return (
                                    <tr key={riga[0]} className="border-b border-testo/[0.16]">
                                        <th scope="row" className="py-4 pr-4 font-medium text-testo">{voce}</th>
                                        <td className="py-4 pr-4 text-neutro-500">{cemento}</td>
                                        <td className="py-4 font-medium text-testo">{rocks}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Rivela>
                <Rivela className="mt-6 max-w-prosa text-sm leading-relaxed text-neutro-500">
                    {t(
                        'Manca volutamente una riga su durata e rifacimento. Sarebbe l’argomento più efficace della tabella, e non abbiamo dati verificabili da metterci: preferiamo una riga in meno a un numero inventato. È anche una buona domanda da fare a chiunque ti presenti un preventivo.',
                        'There is deliberately no row on lifespan and refurbishment. It would be the strongest point in the table, and we have no verifiable data to put in it: we would rather leave a row out than invent a number. It is also a good question to ask anyone who gives you a quote.',
                    )}
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Senza giri di parole', 'Plainly put')}
                    titolo={t('Dove il cemento vince davvero', 'Where concrete genuinely wins')}
                    testo={t(
                        'Quattro cose su cui una vasca tradizionale è semplicemente più adatta. Se sono le tue, è lì che devi guardare.',
                        'Four things a conventional pool is simply better suited to. If they are yours, that is where to look.',
                    )}
                />
                <ul className="mt-12 grid gap-6 md:grid-cols-2">
                    {VANTAGGI_CEMENTO.map((v, i) => (
                        <Rivela as="li" key={v.titolo} delay={i * 80} className="scheda">
                            <h2 className="text-xl">{t(v.titolo, v.titoloEn)}</h2>
                            <p className="testo-lungo mt-2.5 text-[0.95rem]">{t(v.testo, v.testoEn)}</p>
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
                        occhiello={t('L’altra metà', 'The other half')}
                        titolo={t('Dove vince la Piscina Rocks Design', 'Where a Piscine Rocks Design pool wins')}
                    >
                        <ul className="mt-8 space-y-6">
                            {VANTAGGI_ROCKS.map(v => (
                                <li key={v.titolo}>
                                    <h3 className="font-display text-lg text-testo">{t(v.titolo, v.titoloEn)}</h3>
                                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-neutro-400">{t(v.testo, v.testoEn)}</p>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-[0.95rem] leading-relaxed text-neutro-400">
                            {t('Come sono fatte pareti, fondo e impianti lo spiega la pagina', 'How the walls, floor and plant are built is explained on the page')}{' '}
                            <Link to="/piscine-rocks-design" className="link-sottile font-medium text-accento">
                                {t('La Piscina Rocks Design', 'The Piscine Rocks Design pool')}
                            </Link>
                            {t(
                                ". A quali condizioni l'ingresso digradante cambia l'aliquota IVA sta invece in",
                                '. The conditions under which a sloping entry changes the VAT rate are set out in',
                            )}{' '}
                            <Link to="/quanto-costa" className="link-sottile font-medium text-accento">
                                {t('Quanto costa', 'Costs')}
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
                        <p className="occhiello text-accento-300">{t('Le promesse che non ti facciamo', 'Promises we do not make')}</p>
                        <h2 className="titolo-sezione text-testo">{t('Tre cose che non cambiano', 'Three things that stay the same')}</h2>
                    </Rivela>
                    <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                        {TRE_COSE.map((v, i) => (
                            <Rivela as="div" key={v.titolo} delay={i * 100} className="rounded-lg bg-testo/[0.05] p-6">
                                <dt className="font-display text-xl text-testo">{t(v.titolo, v.titoloEn)}</dt>
                                <dd className="mt-2.5 text-sm leading-relaxed text-neutro-400">{t(v.testo, v.testoEn)}</dd>
                            </Rivela>
                        ))}
                    </dl>
                    <Rivela className="mt-10 text-center">
                        <p className="mx-auto max-w-xl text-[0.95rem] leading-relaxed text-neutro-400">
                            {t(
                                'Se stai leggendo un preventivo in cui una di queste tre compare come vantaggio, è il momento di chiedere su quali dati si basa.',
                                'If you are reading a quote that lists any of these three as an advantage, it is time to ask what data it is based on.',
                            )}
                        </p>
                        <Link to="/quanto-costa" className="link-sottile mt-5 inline-block text-sm font-medium text-accento-300">
                            {t('Che cosa sposta davvero il prezzo', 'What actually moves the price')}
                        </Link>
                    </Rivela>
                </div>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Domande frequenti', 'Frequently asked questions')}
                    titolo={t('Le domande che ci fanno a questo punto', 'The questions people ask at this point')}
                />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ_CONFRONTO.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-confronto">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                                <h3 className="font-display text-lg text-testo sm:text-xl">{t(v.domanda, v.domandaEn)}</h3>
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

            <ChiusuraContatto
                occhiello={t('Il modo più rapido per decidere', 'The quickest way to decide')}
                titolo={t('Facci vedere il giardino', 'Show us the garden')}
                testo={t(
                    'Un’ora sul posto dice più di qualsiasi tabella: misuriamo lo spazio e ti diciamo quale delle due strade ha senso nel tuo caso, anche quando la risposta è la piscina in cemento.',
                    'An hour on site tells you more than any table: we measure the space and tell you which of the two makes sense in your case, even when the answer is a concrete pool.',
                )}
                modulo={{ titolo: t('Cemento o Rocks Design, nel mio giardino', 'Concrete or Rocks Design, in my garden') }}
            />
        </>
    )
}
