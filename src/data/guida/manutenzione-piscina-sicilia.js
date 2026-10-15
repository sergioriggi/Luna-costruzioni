/**
 * Scelto dai dati: «manutenzione piscina» 880 ricerche/mese in Italia,
 * «quanto costa mantenere una piscina» 210 (Keyword Planner, ottobre 2026).
 * Il sito ne parlava solo in una risposta delle domande frequenti e in una
 * riga del confronto con il cemento: qui la risposta per esteso, con le
 * ordinanze comunali sull'acqua aperte e citate.
 */

import { PREZZO } from '../site.js'

const TRAPANI_ORD_37_2024 = 'https://comune.trapani.it/wp-content/uploads/2024/05/su-det-ords-t-37-2024.pdf'
const SINAGRA_ORD_11_2024 = 'https://sinagra-api.municipiumapp.it/s3/6907/allegati/news/2024/2024-06-03-n-11-ordinanza-sindacale.pdf'

export default {
    slug: 'manutenzione-piscina-sicilia',
    pubblicato: '2026-10-15',

    titolo: 'Manutenzione della piscina in Sicilia: che cosa comporta e da cosa dipende la spesa',
    titoloEn: 'Pool maintenance in Sicily: what it involves and what drives the cost',
    sintesi:
        'Le operazioni di ogni settimana, le voci che fanno la spesa, la stagione lunga dell’isola e le regole sull’acqua: che cosa vuol dire tenere una piscina in Sicilia.',
    sintesiEn:
        'The weekly jobs, the items that make up the cost, the island’s long season and the rules on water: what keeping a pool in Sicily really means.',

    seo: {
        titolo: 'Manutenzione della piscina in Sicilia: lavori e spese',
        descrizione:
            'Che cosa comporta la manutenzione di una piscina in Sicilia, quali voci pesano sulla spesa e che cosa sapere sull’acqua prima di riempirla.',
    },

    foto: 'fondale-illuminato',

    corpo: [
        {
            tipo: 'p',
            it: 'Chi pensa a una piscina chiede prima quanto costa farla. La domanda che viene subito dopo è quanto costa tenerla. Una cifra uguale per tutti non esiste: dipende da quanto è grande la vasca, da quanti mesi la tieni aperta, da dove si trova e da chi fa il lavoro. Qui trovi che cosa comporta la manutenzione di una piscina in Sicilia, quali voci pesano sulla spesa e che cosa cambia con l’acqua, che sull’isola è un tema a parte.',
            en: 'Anyone thinking about a pool first asks what it costs to build. The question that comes straight after is what it costs to keep. There is no figure that fits everyone: it depends on how big the pool is, how many months you keep it open, where it is and who does the work. Here you will find what pool maintenance in Sicily involves, which items make up the cost and what changes when it comes to water, which on the island is a subject of its own.',
        },
        { tipo: 'h2', it: 'Che cosa vuol dire manutenzione, in pratica', en: 'What maintenance means in practice' },
        {
            tipo: 'p',
            it: 'Le operazioni sono poche e sempre le stesse. Cambia quanto spesso le fai.',
            en: 'The jobs are few and always the same. What changes is how often you do them.',
        },
        {
            tipo: 'elenco',
            it: [
                '**Controllo dei valori dell’acqua.** Si misurano con regolarità e si correggono con i prodotti indicati da chi ha installato l’impianto. È il lavoro più frequente, ed è quello che tiene l’acqua limpida.',
                '**Pulizia.** Foglie, polvere e insetti finiscono in acqua ogni giorno: vanno tolti dalla superficie e dal fondo.',
                '**Impianti in funzione.** La filtrazione lavora ogni giorno della stagione e va tenuta pulita.',
                '**Rabbocco.** L’acqua evapora e un po’ se ne va con chi esce dalla vasca: il livello va riportato a quota.',
                '**Apertura e chiusura stagionale.** All’inizio della stagione la piscina si rimette in funzione, alla fine si mette a riposo.',
            ],
            en: [
                '**Checking the water.** The readings are taken regularly and corrected with the products specified by whoever installed the plant. It is the most frequent job, and the one that keeps the water clear.',
                '**Cleaning.** Leaves, dust and insects land in the water every day: they have to be taken off the surface and the floor.',
                '**Plant running.** Filtration works every day of the season and has to be kept clean.',
                '**Topping up.** Water evaporates and some leaves with every swimmer who climbs out: the level has to be brought back up.',
                '**Opening and closing for the season.** At the start of the season the pool is brought back into use; at the end it is put to rest.',
            ],
        },
        {
            tipo: 'p',
            it: 'Sono le stesse operazioni per una vasca in cemento e per una Piscina Rocks Design, con gli stessi impianti: lo trovi nel [confronto fra le due](/piscina-in-cemento-o-rocks-design). C’è chi confonde una Piscina Rocks Design con una biopiscina e pensa che l’acqua si curi da sola con le piante. Non è così: l’acqua è trattata da impianti tecnologici tradizionali, e la gestione è quella di una piscina normale.',
            en: 'The jobs are the same for a concrete pool and for a Piscine Rocks Design pool, with the same plant: you will find this in the [comparison between the two](/piscina-in-cemento-o-rocks-design). Some people confuse a Piscine Rocks Design pool with a planted swimming pond and think the water looks after itself through the plants. It does not: the water is treated by conventional technical plant, and the upkeep is that of an ordinary pool.',
        },
        {
            tipo: 'p',
            it: 'La differenza che noti è il fondale in sabbia. Per pulirlo non si svuota la vasca, e alla consegna ti spieghiamo di persona come si fa.',
            en: 'The difference you notice is the sand floor. Cleaning it does not mean emptying the pool, and at handover we show you in person how it is done.',
        },
        { tipo: 'h2', it: 'Perché in Sicilia la stagione conta di più', en: 'Why the season counts for more in Sicily' },
        {
            tipo: 'p',
            it: 'In Sicilia una piscina si può tenere in funzione da aprile a ottobre. Sono tanti mesi di bagni, e sono anche tanti mesi di manutenzione: ogni settimana di apertura vuol dire controlli, pulizia, energia elettrica per gli impianti e acqua di rabbocco.',
            en: 'In Sicily a pool can stay in use from April to October. That is a lot of months of swimming, and it is also a lot of months of upkeep: every week the pool is open means checks, cleaning, electricity for the plant and water for topping up.',
        },
        {
            tipo: 'p',
            it: 'Il sole e il caldo fanno evaporare più acqua. Il vento porta polvere e foglie. Una piscina sotto alberi grandi si sporca di più; una in pieno sole perde più acqua. Sono cose che si valutano al sopralluogo, quando si decide dove mettere la vasca, e che pesano sulla manutenzione per tutti gli anni a venire.',
            en: 'Sun and heat make more water evaporate. Wind brings dust and leaves. A pool under large trees gets dirtier; one in full sun loses more water. These are things to weigh up at the site visit, when you decide where the pool goes, and they bear on the upkeep for every year that follows.',
        },
        { tipo: 'h2', it: 'Le voci che fanno la spesa', en: 'The items that make up the cost' },
        {
            tipo: 'p',
            it: 'Per capire quanto ti costerà tenere la piscina, ragiona per voci. Queste sono quelle che contano:',
            en: 'To work out what keeping the pool will cost you, think item by item. These are the ones that count:',
        },
        {
            tipo: 'elenco',
            it: [
                '**Volume d’acqua.** Più acqua vuol dire più prodotti, più ore di filtrazione e più rabbocco.',
                '**Mesi di apertura.** Se la usi da aprile a ottobre spendi più di chi la apre solo a luglio e agosto.',
                '**Energia elettrica.** Gli impianti lavorano ogni giorno della stagione: il conto dipende dalle ore di funzionamento e dalla tua tariffa.',
                '**Prodotti per l’acqua.** Il consumo cresce con il caldo e con il numero di persone che fanno il bagno.',
                '**Acqua di rabbocco.** Dipende da sole, vento e uso, e dalla tariffa del gestore del tuo Comune.',
                '**Chi fa il lavoro.** Se controlli e pulizia li fai tu, paghi i materiali. Se li affidi a un manutentore, paghi anche le sue uscite.',
            ],
            en: [
                '**Volume of water.** More water means more products, more hours of filtration and more topping up.',
                '**Months open.** If you use it from April to October you spend more than someone who opens it only in July and August.',
                '**Electricity.** The plant runs every day of the season: the bill depends on the hours it runs and on your tariff.',
                '**Water products.** Consumption rises with the heat and with the number of people swimming.',
                '**Top-up water.** It depends on sun, wind and use, and on your local water supplier’s tariff.',
                '**Who does the work.** If you do the checks and cleaning yourself, you pay for materials. If you hand them to a pool technician, you pay for their visits too.',
            ],
        },
        {
            tipo: 'p',
            it: `Il costo di costruzione è un’altra cosa: per una Piscina Rocks Design si parte da ${PREZZO.cifraLunga}, e le voci che lo fanno variare sono spiegate in [Quanto costa](/quanto-costa). Quando confronti più preventivi, chiedi a ciascuno quali operazioni di manutenzione servono per quella vasca e chi le può fare.`,
            en: `The cost of building is a separate matter: a Piscine Rocks Design pool starts from ${PREZZO.cifraLunga}, and what moves that figure is explained in [Costs](/quanto-costa). When you compare quotes, ask each contractor which maintenance jobs that pool will need and who can carry them out.`,
        },
        { tipo: 'h2', it: 'L’acqua: che cosa sapere prima di riempire', en: 'Water: what to know before you fill' },
        {
            tipo: 'p',
            it: `In Sicilia l’acqua è un tema concreto. Nel 2024, con la crisi idrica, alcuni Comuni hanno limitato l’uso dell’acqua potabile per le piscine private. A Trapani l’[ordinanza n. 37 dell’8 maggio 2024](${TRAPANI_ORD_37_2024}) ha vietato di usare acqua potabile per alimentare fontane ornamentali, vasche e piscine private non dotate di dispositivi per il riciclo, fino alla fine dell’emergenza idrica. Le stesse attività restavano consentite solo con un pozzo privato. A Sinagra l’[ordinanza n. 11 del 3 giugno 2024](${SINAGRA_ORD_11_2024}) ha vietato di prelevare acqua potabile per fontane ornamentali, vasche e piscine fino al 31 ottobre 2024, o comunque fino alla fine dello stato di crisi.`,
            en: `In Sicily water is a practical matter. In 2024, during the water crisis, some municipalities restricted the use of mains drinking water for private pools. In Trapani, [Order no. 37 of 8 May 2024](${TRAPANI_ORD_37_2024}) banned the use of drinking water to supply ornamental fountains, tanks and private pools not fitted with recycling devices, until the water emergency ended. Those same activities remained allowed only with a private well. In Sinagra, [Order no. 11 of 3 June 2024](${SINAGRA_ORD_11_2024}) banned drawing drinking water for ornamental fountains, tanks and pools until 31 October 2024, or in any case until the end of the state of crisis.`,
        },
        {
            tipo: 'p',
            it: 'Per chi sta progettando una piscina, la conseguenza è semplice: prima di riempirla, chiedi al tuo Comune e al gestore del servizio idrico se ci sono limiti in vigore. L’acqua del primo riempimento la paghi una volta, quella di rabbocco ogni estate. L’ordinanza di Trapani, per esempio, permetteva di conservare l’acqua già presente nella vasca, se trattata nel modo giusto: un’acqua tenuta in buono stato è acqua che non devi cambiare.',
            en: 'For anyone planning a pool, the consequence is simple: before you fill it, ask your municipality and your water supplier whether any restrictions are in force. You pay for the first fill once; you pay for top-up water every summer. The Trapani order, for example, allowed the water already in the pool to be kept, provided it was properly treated: water kept in good condition is water you do not have to replace.',
        },
        { tipo: 'h2', it: 'Se la piscina è di una struttura ricettiva', en: 'If the pool belongs to a hospitality business' },
        {
            tipo: 'p',
            it: 'Per hotel, agriturismi e b&b la manutenzione va pensata insieme agli adempimenti richiesti alle piscine ad uso pubblico, che sono in più rispetto a quelli di una piscina di casa. Per questi adempimenti ci coordiniamo con i tuoi tecnici. Il resto è nella pagina [Hotel e resort](/hotel-e-resort).',
            en: 'For hotels, agriturismi and B&Bs, maintenance has to be planned together with the requirements that apply to pools for public use, which go beyond those for a private pool. We coordinate with your own technical advisers on those requirements. The rest is on the [Hotels and resorts](/hotel-e-resort) page.',
        },
        { tipo: 'h2', it: 'Che cosa fa Luna Costruzioni', en: 'What Luna Costruzioni does' },
        {
            tipo: 'p',
            it: 'Luna Costruzioni è concessionario autorizzato Piscine Rocks Design per la Sicilia. Alla consegna ti lasciamo istruzioni scritte su come gestire la piscina e ti mostriamo di persona come si pulisce il fondale. Dopo la consegna restiamo disponibili per l’assistenza, e siamo in Sicilia. Le altre domande pratiche sono nelle [domande frequenti](/domande-frequenti).',
            en: 'Luna Costruzioni is an authorised Piscine Rocks Design dealer for Sicily. At handover we leave you written instructions on running the pool and show you in person how to clean the floor. After handover we remain available for support, and we are in Sicily. Other practical questions are answered in the [frequently asked questions](/domande-frequenti).',
        },
        {
            tipo: 'nota',
            it: 'Questo articolo descrive la manutenzione in generale. Per la tua piscina valgono le istruzioni lasciate alla consegna e, per l’acqua, le regole in vigore nel tuo Comune.',
            en: 'This article describes maintenance in general terms. For your own pool, the instructions left at handover apply and, for water, the rules in force in your municipality.',
        },
    ],

    domande: [
        {
            domanda: 'Quanto costa all’anno la manutenzione di una piscina?',
            domandaEn: 'How much does pool maintenance cost per year?',
            risposta:
                'Non c’è una cifra valida per tutte le piscine. Contano il volume d’acqua, i mesi di apertura, l’energia elettrica, i prodotti per l’acqua, il rabbocco e se il lavoro lo fai tu o lo affidi a un manutentore. Conviene ragionare voce per voce sulla tua vasca.',
            rispostaEn:
                'There is no figure that holds for every pool. What counts is the volume of water, the months it is open, electricity, water products, topping up, and whether you do the work yourself or hand it to a technician. It is best to go through it item by item for your own pool.',
        },
        {
            domanda: 'Una Piscina Rocks Design richiede più manutenzione di una piscina in cemento?',
            domandaEn: 'Does a Piscine Rocks Design pool need more maintenance than a concrete one?',
            risposta:
                'No. Le operazioni sono le stesse, con gli stessi impianti. La differenza è il fondale in sabbia, che si pulisce senza svuotare la vasca: alla consegna ti spieghiamo di persona come si fa.',
            rispostaEn:
                'No. The jobs are the same, with the same plant. The difference is the sand floor, which is cleaned without emptying the pool: at handover we show you in person how it is done.',
        },
        {
            domanda: 'Posso riempire la piscina con l’acqua dell’acquedotto?',
            domandaEn: 'Can I fill the pool from the mains water supply?',
            risposta:
                'Dipende dalle regole in vigore nel tuo Comune. Nel 2024, con la crisi idrica, Trapani e Sinagra hanno limitato con ordinanza l’uso dell’acqua potabile per le piscine. Prima di riempire, chiedi al Comune e al gestore del servizio idrico se ci sono limiti.',
            rispostaEn:
                'It depends on the rules in force in your municipality. In 2024, during the water crisis, Trapani and Sinagra restricted by order the use of drinking water for pools. Before you fill, ask your municipality and your water supplier whether any restrictions apply.',
        },
    ],

    correlati: [
        { to: '/piscina-in-cemento-o-rocks-design', label: 'Piscina in cemento o Rocks Design', labelEn: 'Concrete pool or Rocks Design' },
        { to: '/quanto-costa', label: 'Quanto costa una Piscina Rocks Design', labelEn: 'What a Piscine Rocks Design pool costs' },
        { to: '/domande-frequenti', label: 'Domande frequenti', labelEn: 'Frequently asked questions' },
    ],

    fonti: [
        { titolo: 'Comune di Trapani, ordinanza sindacale n. 37 dell’8 maggio 2024 – emergenza idrica', url: TRAPANI_ORD_37_2024 },
        { titolo: 'Comune di Sinagra, ordinanza sindacale n. 11 del 3 giugno 2024 – crisi idrica', url: SINAGRA_ORD_11_2024 },
    ],
}
