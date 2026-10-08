import { Link } from '../lib/instradamento'
import BottoneTelefono from '../components/BottoneTelefono'
import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { FATTORI_COSTO } from '../data/content'
import { PREZZO } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/quanto-costa', label: 'Quanto costa', labelEn: 'Cost' },
]

/**
 * La cifra in inglese si costruisce da PREZZO.daMq, unica fonte, come in home:
 * mai riscritta a mano.
 */
const CIFRA_EN = `€${PREZZO.daMq.toLocaleString('en-GB')} per square metre + VAT`

const FAQ_COSTO = [
    {
        domanda: 'Quanto costa al metro quadro?',
        domandaEn: 'What does it cost per square metre?',
        risposta:
            `Una Piscina Rocks Design parte da ${PREZZO.cifraLunga}. È un minimo, non una tariffa: il prezzo al metro quadro scende quando la piscina cresce, perché scavo, impianti e trasporti pesano quasi uguale su una vasca piccola e su una grande. Fontana, giochi d'acqua e idromassaggio sono extra su richiesta. L'IVA va dal 4% al 22% secondo il tipo di intervento — il 4% riguarda i soli lavori che si qualificano come abbattimento di barriere architettoniche, come spiegato nella domanda sulle agevolazioni fiscali — e l'aliquota giusta la conferma il tuo tecnico o il tuo commercialista. Il numero esatto per il tuo giardino arriva dopo il sopralluogo, che è gratuito: sulle cinque voci qui sopra si capisce in anticipo che cosa lo farà salire.`,
        rispostaEn:
            `A Piscine Rocks Design pool starts from ${CIFRA_EN}. That is a minimum, not a rate: the price per square metre falls as the pool gets bigger, because excavation, plant and transport cost almost the same for a small pool as for a large one. Fountains, water features and hydromassage are optional extras. VAT ranges from 4% to 22% depending on the type of work. The 4% rate applies only to works that qualify as removing architectural barriers, as explained in the question on tax relief, and the correct rate is confirmed by your surveyor or your accountant. The exact figure for your garden comes after the site visit, which is free: the five items above tell you in advance what will push it up.`,
    },
    {
        domanda: 'Il sopralluogo e il preventivo si pagano?',
        domandaEn: 'Do I pay for the site visit and the quote?',
        risposta:
            'No. Veniamo a vedere il giardino, misuriamo e prepariamo il preventivo senza alcun costo e senza impegno. Se misurando viene fuori che quello spazio non è adatto, te lo diciamo subito, senza preventivo.',
        rispostaEn:
            'No. We come and look at the garden, take measurements and prepare the quote at no cost and with no obligation. If measuring shows the space is not suitable, we tell you straight away, without a quote.',
    },
    {
        domanda: 'Costa più o meno di una piscina tradizionale?',
        domandaEn: 'Does it cost more or less than a conventional pool?',
        risposta:
            `A parità di superficie e di livello di finitura, i due ordini di grandezza sono confrontabili: si parte da ${PREZZO.cifraLunga}. Cambia però la distribuzione della spesa: qui pesano di più la selezione e la movimentazione dei massi, mentre spariscono getti, casseri e rivestimenti. Nel confronto vanno considerate anche le opere di contorno, che in una piscina tradizionale sono spesso preventivate a parte. Il confronto completo fra le due, voce per voce, sta nella pagina «Piscina in cemento o Piscina Rocks Design?».`,
        rispostaEn:
            `For the same area and the same standard of finish, the two are in the same range: prices start from ${CIFRA_EN}. What changes is where the money goes. Here more of it goes on selecting and moving the boulders, while concrete pours, formwork and linings disappear. The comparison should also include the surrounding works, which for a conventional pool are often quoted separately. The full side-by-side comparison is on the page “Concrete pool or Piscine Rocks Design pool?”.`,
    },
    {
        domanda: 'Si può fare a lotti?',
        domandaEn: 'Can it be done in stages?',
        risposta:
            'Sì, ed è una strada che conviene valutare. Si realizza la vasca con le predisposizioni necessarie e si completano in un secondo momento cascate, illuminazione scenografica, solarium o piantumazione. Predisporre durante il cantiere costa una frazione rispetto a intervenire dopo.',
        rispostaEn:
            'Yes, and it is worth considering. The pool is built with the necessary provisions in place, and waterfalls, feature lighting, sun deck or planting are completed later. Making provision during the build costs a fraction of coming back to it afterwards.',
    },
    {
        domanda: 'Ci sono agevolazioni fiscali?',
        domandaEn: 'Is there any tax relief?',
        risposta:
            'Dipende dal tipo di intervento, dalla situazione dell’immobile e dalle norme in vigore nell’anno in cui apri il cantiere: è una valutazione che spetta al tuo commercialista o al tuo tecnico, non a noi. Diffida di chi te la promette al telefono senza aver visto una pratica. Una strada però esiste, e riguarda l’IVA più che la detrazione: il n. 41-ter della Tabella A, Parte II del DPR 633/72 porta l’aliquota al 4% per gli appalti di opere direttamente finalizzate al superamento delle barriere architettoniche, in attuazione della Legge 13/1989. L’ingresso digradante di una Piscina Rocks Design, dove si entra camminando invece di scendere una scaletta, è il tipo di caratteristica che può sostenere quella qualificazione: non la garantisce. Decide l’opera nel suo insieme, nel rispetto dei requisiti tecnici fissati dalla legge, e serve l’asseverazione di un tecnico abilitato; senza quella certificazione l’aliquota resta quella ordinaria. È cosa diversa dalla detrazione IRPEF per ristrutturazioni, che segue regole proprie.',
        rispostaEn:
            'It depends on the type of work, the situation of the property and the rules in force in the year you start the build: that assessment belongs to your accountant or your surveyor, not to us. Be wary of anyone who promises it over the phone without having seen any paperwork. There is one route, though, and it concerns VAT rather than a tax deduction: item 41-ter of Table A, Part II of Presidential Decree 633/72 reduces the rate to 4% for contracts for works directly aimed at overcoming architectural barriers, under Law 13/1989. The sloping entry of a Piscine Rocks Design pool, where you walk in instead of climbing down a ladder, is the kind of feature that can support that classification: it does not guarantee it. What counts is the work as a whole, meeting the technical requirements set by law, and it must be certified by a qualified professional; without that certification the standard rate applies. This is separate from the IRPEF income tax deduction for renovation work, which has its own rules.',
    },
]

export default function QuantoCosta() {
    const { t } = useLingua()

    return (
        <>
            <Seo
                titolo="Quanto costa una Piscina Rocks Design | Luna Costruzioni"
                descrizione={`Piscine Rocks Design ${PREZZO.testo}. Cosa fa variare il prezzo, extra e IVA. Sopralluogo e preventivo gratuiti in tutta la Sicilia.`}
                percorso="/quanto-costa"
                immagine="villa-con-spiaggia-in-ghiaia-1280.jpg"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ_COSTO)]}
            />
            <Briciole voci={BRICIOLE.map(v => ({ ...v, label: t(v.label, v.labelEn) }))} />

            <Sezione>
                {/* Su schermo largo il prezzo sta a destra del testo d'apertura:
                    prima la colonna di testo lasciava vuota metà pagina. */}
                <Rivela className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-x-16">
                    <div className="max-w-prosa">
                    <p className="occhiello">{t('Prezzi e preventivi', 'Prices and quotes')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        {t('Quanto costa, davvero', 'What it really costs')}
                    </h1>
                    <p className="testo-lungo mt-6">
                        {t(
                            'È la prima domanda di tutti ed è giusto che lo sia. Una Piscina Rocks Design è a',
                            'It is everyone’s first question, and rightly so. A Piscine Rocks Design pool is',
                        )}{' '}
                        <strong className="font-semibold text-testo">{t('forma libera', 'free-form')}</strong>
                        {t(
                            ": non esistono misure da catalogo tipo 8×4, quindi non c'è una riga di prezzo da copiare. C'è però una cifra da cui si parte, ed è questa.",
                            ': there are no catalogue sizes such as 8×4, so there is no price line to copy. There is, however, a starting figure, and this is it.',
                        )}
                    </p>
                    </div>

                    {/*
                      Il riquadro riusa la forma che la pagina ha già più in basso
                      (sezione del bonus): non se ne inventa una nuova. `+ IVA`
                      sta nella riga grande, accanto alla cifra, e non in un
                      asterisco: l'esclusione dell'imposta non è una postilla.
                    */}
                    {/* La riga del prezzo come in home (DESIGN.md, «Price Line»):
                        cifra in sabbia, su lastra appena sabbiata. */}
                    <div className="rounded-lg border border-sabbia/[0.26] bg-sabbia/[0.08] p-6 sm:p-7 lg:row-span-2">
                        <p className="font-display text-2xl leading-snug text-sabbia sm:text-3xl" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {t(
                                `Piscine Rocks Design ${PREZZO.testo}`,
                                `Piscine Rocks Design from €${PREZZO.daMq.toLocaleString('en-GB')} per m² + VAT`,
                            )}
                        </p>
                        {/*
                          PERCHÉ IL 4% È NOMINATO, E PERCHÉ SOLO COME CONDIZIONE.
                          L'intervallo 4%-22% stava già qui senza spiegazione, e
                          sembrava arbitrario. Il 4% viene dal n. 41-ter della
                          Tabella A, Parte II del DPR 633/72: appalti per opere
                          direttamente finalizzate al superamento o
                          all'eliminazione delle barriere architettoniche, in
                          attuazione della Legge 13/1989.
                          IL CONFINE DA NON SUPERARE: l'aliquota NON segue la
                          condizione personale del committente — non basta avere
                          la Legge 104. Segue l'OPERA, che deve rispettare i
                          requisiti tecnici dell'art. 8.1.13 del DM 236/1989 ed
                          essere asseverata da un tecnico abilitato; se manca
                          anche uno solo dei requisiti obbligatori, al punto da
                          impedire la certificazione di conformità, il 4% non si
                          applica. Il DM resta in questo commento e fuori dal
                          testo: in pagina sarebbe rumore, qui serve a chi
                          manutiene.
                          Quindi si scrive sempre una condizione, mai un diritto
                          acquisito, e la chiusura che rimanda al tecnico non va
                          tolta insieme a una riscrittura di stile: è la
                          copertura, non un riempitivo.
                        */}
                        <p className="mt-4 text-[0.95rem] leading-relaxed text-neutro-300">
                            {t(
                                "Il prezzo al metro quadro scende quando la piscina cresce. Fontana, giochi d'acqua e idromassaggio sono extra su richiesta. IVA dal 4% al 22% secondo il tipo di intervento: il 4% è previsto quando l'opera si qualifica come eliminazione di barriere architettoniche ai sensi della Legge 13/1989, previa asseverazione di un tecnico abilitato. L'aliquota giusta la conferma il tuo tecnico o commercialista. Il prezzo esatto lo diamo dopo aver visto il giardino, e venire a vederlo non costa nulla.",
                                'The price per square metre falls as the pool gets bigger. Fountains, water features and hydromassage are optional extras. VAT from 4% to 22% depending on the type of work: the 4% rate applies when the work qualifies as removing architectural barriers under Law 13/1989, subject to certification by a qualified professional. Your surveyor or accountant confirms the correct rate. We give the exact price once we have seen the garden, and coming to see it costs you nothing.',
                            )}
                        </p>
                        <Link to="/contatti" className="bottone-pieno mt-6">
                            {t('Chiedi un preventivo', 'Ask for a quote')}
                        </Link>
                    </div>

                    <p className="testo-lungo max-w-prosa lg:col-start-1">
                        {t('Da lì in su dipende dal giardino. Quello che possiamo fare è dirti in anticipo', 'Above that, it depends on the garden. What we can do is tell you in advance')}{' '}
                        <strong className="font-semibold text-testo">
                            {t('quali sono le cinque voci che spostano il preventivo', 'the five items that move the quote')}
                        </strong>
                        {t(
                            '. Se le conosci, quando ricevi un’offerta (la nostra o quella di chiunque altro) sai dove guardare.',
                            '. Once you know them, whenever you receive a quote (ours or anyone else’s) you know where to look.',
                        )}
                    </p>
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Le cinque voci che contano', 'The five items that matter')}
                    titolo={t('Che cosa sposta il prezzo', 'What moves the price')}
                />
                <ol className="mt-12 space-y-5">
                    {FATTORI_COSTO.map((f, i) => (
                        <Rivela as="li" key={f.titolo} delay={i * 70} className="scheda flex flex-col gap-4 sm:flex-row sm:gap-7">
                            <span className="font-display text-3xl leading-none text-sabbia sm:w-16">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div>
                                <h2 className="text-xl">{t(f.titolo, f.titoloEn)}</h2>
                                <p className="testo-lungo mt-2">{t(f.testo, f.testoEn)}</p>
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
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                        />
                        <CreditoFoto />
                    </Rivela>
                    <IntestazioneSezione
                        occhiello={t('Come leggere un preventivo', 'How to read a quote')}
                        titolo={t('Quattro domande da fare a chiunque', 'Four questions to ask anyone')}
                    >
                        <ul className="mt-7 space-y-4 text-[1.0625rem] text-neutro-300">
                            {[
                                t(
                                    'Che cosa è incluso oltre alla vasca? Scavo, smaltimento del materiale di risulta, impianti, spiaggia, verde: sono voci che possono valere quanto la piscina.',
                                    'What is included besides the pool itself? Excavation, removal of spoil, plant, beach, planting: these items can cost as much as the pool.',
                                ),
                                t('I tempi sono scritti in contratto o detti a voce?', 'Are the timings written into the contract, or only promised verbally?'),
                                t(
                                    'Chi segue il cantiere ogni giorno, e con chi parlo se qualcosa non va?',
                                    'Who oversees the site every day, and who do I speak to if something goes wrong?',
                                ),
                                t(
                                    'Che cosa succede dopo la consegna: chi fa l’assistenza, e da quanto lontano arriva?',
                                    'What happens after handover: who provides aftercare, and how far away are they?',
                                ),
                            ].map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutro-500" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-[0.95rem] leading-relaxed text-neutro-500">
                            {t(
                                'Sono le domande che consigliamo di farci. Valgono anche per gli altri preventivi che stai valutando.',
                                'These are the questions we suggest you ask us. They apply just as well to the other quotes you are weighing up.',
                            )}
                        </p>
                    </IntestazioneSezione>
                </div>
            </Sezione>

            <Sezione sfondo="bg-notte-800 text-neutro-200">
                <div className="mx-auto max-w-3xl text-center">
                    <Rivela>
                        <p className="occhiello text-accento-300">{t('In pratica', 'In practice')}</p>
                        <h2 className="titolo-sezione text-testo">{t('Come si arriva a un numero', 'How we get to a figure')}</h2>
                    </Rivela>
                    <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
                        {[
                            [
                                t('Chiami o scrivi', 'You call or write'),
                                t(
                                    'Ti facciamo due domande al telefono per capire se ha senso muoverci.',
                                    'We ask you a couple of questions on the phone to see whether a visit makes sense.',
                                ),
                            ],
                            [
                                t('Un’ora in giardino', 'An hour in the garden'),
                                t(
                                    'Misuriamo, guardiamo da dove entrano i mezzi e portiamo i campioni di sabbia.',
                                    'We measure, check how the machinery will get in and bring the sand samples.',
                                ),
                            ],
                            [
                                t('Preventivo dettagliato', 'Detailed quote'),
                                t('Entro una o due settimane, scomposto voce per voce.', 'Within one or two weeks, broken down item by item.'),
                            ],
                        ].map(([titolo, d], i) => (
                            <Rivela as="li" key={i} delay={i * 100} className="rounded-lg bg-testo/[0.05] p-6">
                                <span className="font-display text-2xl text-sabbia">{i + 1}</span>
                                <h3 className="mt-2 text-base text-testo">{titolo}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutro-400">{d}</p>
                            </Rivela>
                        ))}
                    </ol>
                    <Rivela className="mt-10">
                        <BottoneTelefono className="bottone-secondario">{t('Comincia da una telefonata', 'Start with a phone call')}</BottoneTelefono>
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
                    occhiello={t('Agevolazioni fiscali', 'Tax relief')}
                    titolo={t('Bonus ristrutturazione: quando si applica davvero', 'Renovation bonus: when it really applies')}
                >
                    <p className="testo-lungo mt-6 max-w-prosa">
                        {t(
                            'Se rifai una piscina che hai già, puoi recuperare una parte della spesa con la detrazione IRPEF per le ristrutturazioni edilizie. Vale la pena saperlo prima di chiedere il preventivo, perché cambia il conto finale.',
                            'If you are rebuilding a pool you already have, you can recover part of the cost through the IRPEF income tax deduction for building renovation. It is worth knowing before you ask for a quote, because it changes the final bill.',
                        )}
                    </p>
                </IntestazioneSezione>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {[
                        [
                            '50%',
                            t('sull’abitazione principale', 'on your main home'),
                            t(
                                'Aliquota in vigore per le spese sostenute entro il 31 dicembre 2026.',
                                'Rate in force for expenses incurred by 31 December 2026.',
                            ),
                        ],
                        [
                            '36%',
                            t('sulle seconde case', 'on second homes'),
                            t(
                                'Stessa scadenza. Dal 2027 le due aliquote scendono a 36% e 30%.',
                                'Same deadline. From 2027 the two rates fall to 36% and 30%.',
                            ),
                        ],
                        [
                            t('96.000 €', '€96,000'),
                            t('tetto di spesa per unità immobiliare', 'spending cap per property unit'),
                            t(
                                'La detrazione si recupera in 10 quote annuali di pari importo.',
                                'The deduction is recovered in 10 equal annual instalments.',
                            ),
                        ],
                    ].map(([n, etichetta, nota], i) => (
                        <Rivela key={i} delay={i * 100} className="scheda">
                            <p className="font-display text-3xl text-sabbia">{n}</p>
                            <p className="mt-1 text-sm text-testo">{etichetta}</p>
                            <p className="mt-3 text-sm leading-relaxed text-neutro-400">{nota}</p>
                        </Rivela>
                    ))}
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <Rivela>
                        <h2 className="font-display text-xl text-testo">{t('Lavori ammessi', 'Eligible work')}</h2>
                        <ul className="mt-4 grid gap-2.5 text-[15px] leading-relaxed text-neutro-300">
                            {[
                                t('Rifacimento del rivestimento interno o della vasca.', 'Relining or rebuilding the pool shell.'),
                                t(
                                    'Sostituzione o miglioramento degli impianti di filtrazione e ricircolo.',
                                    'Replacing or upgrading the filtration and circulation systems.',
                                ),
                                t(
                                    'Rinnovo del solarium, dei bordi e della pavimentazione esterna.',
                                    'Renewing the sun deck, the edges and the outdoor paving.',
                                ),
                                t(
                                    'Installazione di impianti di riscaldamento, illuminazione o idromassaggio.',
                                    'Installing heating, lighting or hydromassage systems.',
                                ),
                                t(
                                    'Riparazione e rinforzo della struttura per cedimenti.',
                                    'Repairing and reinforcing the structure after subsidence.',
                                ),
                            ].map(v => (
                                <li key={v} className="flex gap-3">
                                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutro-500" />
                                    {v}
                                </li>
                            ))}
                        </ul>
                    </Rivela>

                    <Rivela delay={100}>
                        <h2 className="font-display text-xl text-testo">
                            {t('Le due regole per non perderlo', 'Two rules so you do not lose it')}
                        </h2>
                        <dl className="mt-4 grid gap-5 text-[15px] leading-relaxed">
                            <div>
                                <dt className="text-testo">{t('Bonifico parlante', 'Dedicated bank transfer (“bonifico parlante”)')}</dt>
                                <dd className="mt-1 text-neutro-300">
                                    {t(
                                        'Va usato il bonifico specifico per ristrutturazioni edilizie, con la causale corretta, il codice fiscale di chi porta in detrazione e la partita IVA dell’impresa. Un bonifico ordinario fa perdere il beneficio.',
                                        'You must use the specific bank transfer for building renovation, with the correct payment reference, the tax code of the person claiming the deduction and the contractor’s VAT number. An ordinary transfer loses you the benefit.',
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-testo">{t('Manutenzione straordinaria', 'Extraordinary maintenance')}</dt>
                                <dd className="mt-1 text-neutro-300">
                                    {t(
                                        'L’intervento sulla piscina esistente deve configurarsi come manutenzione straordinaria o restauro e risanamento conservativo. La manutenzione ordinaria non rientra.',
                                        'Work on the existing pool must qualify as extraordinary maintenance, or as restoration and conservative refurbishment. Ordinary maintenance does not count.',
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </Rivela>
                </div>

                <Rivela className="scheda mt-10">
                    <p className="font-display text-lg text-testo">
                        {t(
                            'Una piscina nuova, di norma, non rientra nel bonus',
                            'A new pool is not normally covered by the bonus',
                        )}
                    </p>
                    <p className="testo-lungo mt-3 max-w-prosa text-[15px]">
                        {t(
                            'La sola realizzazione di una piscina da zero non dà diritto alla detrazione, a meno che non faccia parte di un intervento più ampio di ristrutturazione dell’edificio. Preferiamo dirtelo subito: se qualcuno ti promette il 50% su una piscina nuova in giardino, ti sta vendendo un’aspettativa che l’Agenzia delle Entrate non conferma.',
                            'Building a pool from scratch does not, on its own, qualify for the deduction, unless it is part of a wider renovation of the building. We would rather tell you now: if someone promises you 50% on a new garden pool, they are selling you an expectation that the Italian Revenue Agency does not support.',
                        )}
                    </p>
                    <p className="mt-4 max-w-prosa text-sm leading-relaxed text-neutro-500">
                        {t(
                            'Aliquote e regole aggiornate al 2026. Non siamo consulenti fiscali: la valutazione del tuo caso va fatta con il tuo commercialista o con un CAF, prima di firmare.',
                            'Rates and rules as of 2026. We are not tax advisers: your own case should be assessed with your accountant or a CAF (tax assistance centre) before you sign.',
                        )}
                    </p>
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Domande frequenti', 'Frequently asked questions')}
                    titolo={t('Sui costi, senza giri di parole', 'About costs, in plain terms')}
                />
                <div className="mx-auto mt-10 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ_COSTO.map(v => (
                        <details key={v.domanda} className="group py-5" name="faq-costo">
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
                <Rivela className="mx-auto mt-8 max-w-3xl text-center text-[0.95rem] leading-relaxed text-neutro-400">
                    {t('Stai ancora decidendo fra le due?', 'Still deciding between the two?')}{' '}
                    <Link to="/piscina-in-cemento-o-rocks-design" className="link-sottile font-medium text-accento">
                        {t('Il confronto con la piscina in cemento', 'The comparison with a concrete pool')}
                    </Link>{' '}
                    {t(
                        'mette a fianco costi, tempi, permessi e manutenzione — e dice anche dove il cemento vince.',
                        'sets costs, timings, permits and maintenance side by side, and says where concrete comes out ahead.',
                    )}
                </Rivela>
            </Sezione>

            <ChiusuraContatto
                occhiello={t('Preventivo', 'Quote')}
                titolo={t('Dicci due cose e ti diamo un ordine di grandezza', 'Tell us a few things and we will give you a ballpark')}
                testo={t(
                    'Più dettagli ci dai — superficie disponibile, budget indicativo, accessi — più il primo riscontro sarà preciso.',
                    'The more detail you give us (space available, rough budget, access), the more precise our first answer will be.',
                )}
                modulo={{ titolo: t('Richiedi il preventivo', 'Ask for a quote') }}
            />
        </>
    )
}
