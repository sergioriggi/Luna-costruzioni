/**
 * Contenuti editoriali del sito.
 *
 * NOTA REDAZIONALE — testi originali
 * ----------------------------------
 * Tutti i testi di questo file sono scritti ex novo per Luna Costruzioni srl.
 * Descrivono le stesse caratteristiche tecniche documentate dalla casa madre,
 * ma non riprendono frasi né dal catalogo Piscine Rocks Design né dal sito
 * piscinerocksdesign.com. Due ragioni:
 *   1. il materiale della casa madre è opera sua e resta tale;
 *   2. i contenuti duplicati fra i siti dei concessionari si penalizzano a
 *      vicenda nei motori di ricerca: testo proprio significa posizionamento
 *      proprio.
 * Chi aggiorna il sito è pregato di mantenere questa regola.
 *
 * Il prodotto è in Tecnologia Rocks Design®: Luna Costruzioni srl è
 * concessionario autorizzato per la Sicilia, non l'inventore della tecnologia.
 */

export const PUNTI_DI_FORZA = [
    {
        icona: 'onde',
        titolo: 'Si entra camminando, come al mare',
        testo:
            'Niente scaletta, niente gradino di cemento: il fondo digrada dolcemente e sotto i piedi c’è sabbia vera. È la differenza che i bambini notano per primi e che gli adulti non vogliono più abbandonare.',
    },
    {
        icona: 'pietra',
        titolo: 'Pareti in roccia, non in cemento armato',
        testo:
            'La struttura è tenuta da massi monolitici scelti uno per uno. Sono loro a dare solidità alla vasca e a contenere la sabbia del fondale, senza getti di calcestruzzo.',
    },
    {
        icona: 'foglia',
        titolo: 'Materiali naturali e riciclabili',
        testo:
            'Pietra, sabbia, ghiaia e un telo in EPDM chimicamente inerte. Il cantiere lascia sul terreno un’impronta molto più leggera di quella di una piscina tradizionale.',
    },
    {
        icona: 'palma',
        titolo: 'Acqua limpida, gestione semplice',
        testo:
            'Dietro l’aspetto naturale lavorano impianti di filtrazione e sanificazione moderni. L’effetto è quello di una caletta; la manutenzione è quella di una piscina di qualità.',
    },
]

export const ELEMENTI = [
    {
        slug: 'monoliti',
        titolo: 'Massi monolitici',
        occhiello: 'La struttura',
        testo:
            'Ogni masso arriva in cantiere con la sua forma, le sue venature e il suo peso. Non si tagliano a misura: si scelgono e si posizionano come si comporrebbe una scultura, tenendo conto di dove batte il sole e di dove ci si siederà. Per questo due vasche non possono somigliarsi davvero, nemmeno volendo.',
        tag: 'monoliti',
    },
    {
        slug: 'sabbie',
        titolo: 'Sabbie naturali',
        occhiello: 'Il fondale',
        testo:
            'Il fondo non è piastrellato né stampato: è sabbia. Scegliendo fra le tre selezioni disponibili — Bianco, Giallo e Ticino — decidi insieme al colore della spiaggia anche quello dell’acqua, perché è il fondale a restituire la tonalità che vedrai. La sabbia trattiene il calore del sole e lo restituisce a chi ci cammina sopra.',
        tag: 'sabbia',
    },
    {
        slug: 'cascate',
        titolo: 'Cascate e giochi d’acqua',
        occhiello: 'Il suono',
        testo:
            'Un salto d’acqua cambia il modo in cui si vive un giardino: copre il rumore della strada e riempie il silenzio delle sere d’estate. Le cascate vengono disegnate sui massi realmente posati, quindi il percorso dell’acqua nasce in cantiere, non su un catalogo.',
        tag: 'cascate',
    },
    {
        slug: 'idromassaggio',
        titolo: 'Zone benessere',
        occhiello: 'Il relax',
        testo:
            'Sedute ricavate nella roccia, panche sommerse a mezz’acqua, bocchette per l’idromassaggio: sono decisioni che si prendono in fase di progetto, misurando dove passerai più tempo. Il risultato è una piccola area termale a cielo aperto.',
        tag: 'idromassaggio',
    },
]

export const MODELLI = [
    {
        slug: 'caraibi',
        nome: 'Caraibi',
        nomeCompleto: 'Modello Caraibi',
        claim: 'Sabbia chiara, palme, acqua turchese',
        sintesi:
            'La versione più scenografica: ampia spiaggia in sabbia chiara, vegetazione a foglia larga e acqua sui toni del turchese.',
        testo:
            'Il Caraibi punta tutto sul contrasto fra il chiaro della sabbia e il turchese dell’acqua. Funziona quando c’è spazio per una spiaggia generosa: è lì che si mettono i lettini, ed è lì che si passa metà della giornata. La piantumazione — palme, banani, graminacee — serve a chiudere la scena e a creare ombra dove serve.',
        adatto: 'Giardini ampi e soleggiati, ville con vista, strutture ricettive che vogliono una piscina riconoscibile in fotografia.',
        sabbie: ['Bianco', 'Giallo'],
        tag: 'caraibi',
        copertina: 'oasi-con-pontile-e-palme',
        galleria: ['oasi-aerea-sabbia-bianca', 'ombre-di-palme-sulla-sabbia', 'palme-al-tramonto', 'giardino-tropicale'],
    },
    {
        slug: 'mediterranea',
        nome: 'Mediterranea',
        nomeCompleto: 'Modello Mediterranea',
        claim: 'Ulivi, pietra chiara, profumi',
        sintesi:
            'Il modello che in Sicilia si integra con meno sforzo: pietra locale, essenze mediterranee, acqua sui verdi.',
        testo:
            'Qui la piscina non deve sembrare arrivata da un catalogo tropicale, ma essere sempre stata parte del giardino. Si lavora con pietra dai toni caldi, ghiaia e piante che in Sicilia crescono già da sole — ulivi, lavanda, rosmarino, graminacee. Vicino a un muro a secco o a un agrumeto il risultato è indistinguibile da una conca naturale.',
        adatto: 'Case di campagna, masserie, giardini con ulivi o agrumi, ristrutturazioni in contesti storici.',
        sabbie: ['Giallo', 'Ticino'],
        tag: 'mediterranea',
        copertina: 'villa-con-spiaggia-in-ghiaia',
        galleria: ['solarium-in-legno', 'spiaggia-di-sabbia-privata', 'bordo-in-legno-e-ciottoli', 'riflessi-al-tramonto'],
    },
    {
        slug: 'alpi',
        nome: 'Alpi',
        nomeCompleto: 'Modello Alpi',
        claim: 'Roccia, ghiaietto, acqua smeraldo',
        sintesi:
            'Il più sobrio dei tre: prevalgono pietra e ghiaietto, la vegetazione resta rada e l’acqua vira allo smeraldo.',
        testo:
            'L’Alpi rinuncia alla spiaggia estesa e mette in primo piano la roccia. Ghiaietto al posto della sabbia sui bordi, essenze basse e resistenti, un’acqua che tende al verde profondo dei laghi di montagna. È il modello che regge meglio le pendenze e i giardini piccoli, dove una spiaggia occuperebbe tutto lo spazio.',
        adatto: 'Terreni in pendenza, giardini contenuti, case in collina e nell’entroterra.',
        sabbie: ['Ticino'],
        tag: 'alpi',
        copertina: 'ghiaietto-e-acqua-smeraldo',
        galleria: ['masso-luminoso-nell-acqua', 'monolite-al-tramonto', 'cascata-e-punto-luce', 'acqua-in-movimento'],
    },
]

export const SABBIE = [
    {
        nome: 'Bianco',
        acqua: 'Turchese chiaro, molto luminoso',
        carattere: 'La scelta più scenografica: massimo contrasto con il verde del giardino.',
        nota: 'Sotto il sole pieno riflette molto; in Sicilia conviene prevedere zone d’ombra sulla spiaggia.',
    },
    {
        nome: 'Giallo',
        acqua: 'Verde acqua caldo',
        carattere: 'La via di mezzo, quella che sceglie la maggior parte dei clienti.',
        nota: 'Si accorda bene con pietra calcarea e tufo, materiali diffusi nell’edilizia siciliana.',
    },
    {
        nome: 'Ticino',
        acqua: 'Verde smeraldo profondo',
        carattere: 'Il tono più naturale, da fiume di montagna.',
        nota: 'Regge bene la vicinanza a rocce scure e vegetazione fitta.',
    },
]

export const PERCORSO = [
    {
        numero: '01',
        titolo: 'Sopralluogo e progetto',
        titoloEn: 'Site visit and design',
        durata: 'Circa un’ora',
        durataEn: 'About an hour',
        testo:
            'Veniamo sul posto, misuriamo e ascoltiamo. Dal rilievo nasce il disegno della vasca e di tutto il contorno.',
        testoEn:
            'We come out, measure and listen. The survey becomes the drawing of the basin and everything around it.',
    },
    {
        numero: '02',
        titolo: 'Scavi',
        titoloEn: 'Excavation',
        durata: 'Mezzi nostri',
        durataEn: 'Our own machines',
        testo:
            'Scavo e movimentazione terra li eseguiamo noi, con mezzi e maestranze dell’impresa. Nessun subappalto.',
        testoEn:
            'We carry out the digging and earthworks ourselves, with our own machines and crews. Nothing subcontracted.',
    },
    {
        numero: '03',
        titolo: 'Realizzazione',
        titoloEn: 'Construction',
        durata: 'Tecnologia Rocks Design®',
        durataEn: 'Rocks Design Technology',
        testo:
            'Realizzazione in Tecnologia Rocks Design® e finiture in pietra: la vasca prende la forma disegnata.',
        testoEn:
            'Built in Rocks Design Technology with stone finishes: the basin takes the shape it was drawn.',
    },
    {
        numero: '04',
        titolo: 'Messa in opera',
        titoloEn: 'Installation',
        durata: 'Impianti',
        durataEn: 'Plant',
        testo:
            'Filtrazione, illuminazione e allacciamenti installati e regolati sul posto.',
        testoEn:
            'Filtration, lighting and connections installed and tuned on site.',
    },
    {
        numero: '05',
        titolo: 'Collaudo e consegna',
        titoloEn: 'Commissioning and handover',
        durata: 'Piena e pronta',
        durataEn: 'Full and ready',
        testo:
            'Prove di tenuta e funzionamento, primo avviamento e istruzioni d’uso. La piscina si consegna piena e pronta.',
        testoEn:
            'Leak and function tests, first start-up and usage instructions. The pool is handed over full and ready.',
    },
]

/**
 * I quattro dubbi che fermano chi vorrebbe una piscina, con l'impegno che
 * Luna Costruzioni mette per iscritto in preventivo. Sono argomenti di
 * vendita solo perché sono verificabili: vanno tenuti onesti.
 */
export const DUBBI = [
    {
        dubbio: '«Non so quanto costerà davvero.»',
        dubbioEn: '“I have no idea what it will really cost.”',
        risposta:
            'Preventivo con voci separate per scavi, realizzazione, messa in opera e collaudo, redatto dopo il sopralluogo e firmato prima di iniziare. Nessuna voce «imprevisti» lasciata aperta.',
        rispostaEn:
            'A quote itemised by excavation, construction, installation and commissioning, written after the site visit and signed before work starts. No open-ended contingency line.',
    },
    {
        dubbio: '«Il cantiere mi occupa il giardino per mesi.»',
        dubbioEn: '“The site will take over my garden for months.”',
        risposta:
            'Un’unica impresa in cantiere, con date di inizio e fine concordate in preventivo. Non ci sono squadre diverse che si aspettano a vicenda: scavi e realizzazione sono nostri.',
        rispostaEn:
            'One company on site, with start and finish dates agreed in the quote. No separate crews waiting on each other: the digging and the build are both ours.',
    },
    {
        dubbio: '«Dopo la consegna, chi mi assiste?»',
        dubbioEn: '“Once it is handed over, who helps me?”',
        risposta:
            'Siamo il concessionario per la Sicilia: restiamo sull’isola e il referente resta Luciano Naro, lo stesso del primo sopralluogo. Un numero, non un centralino.',
        rispostaEn:
            'We are the dealer for Sicily: we stay on the island and your contact stays Luciano Naro, the same person who came for the first visit. One number, not a call centre.',
    },
    {
        dubbio: '«Sarà una vasca come tante.»',
        dubbioEn: '“It will end up looking like every other pool.”',
        risposta:
            'La Tecnologia Rocks Design® è brevettata e le forme non sono a catalogo: la vasca si disegna sul tuo giardino. Fra le realizzazioni qui sopra non ce ne sono due uguali.',
        rispostaEn:
            'Rocks Design Technology is patented and the shapes are not from a catalogue: the basin is drawn around your garden. No two projects above are the same.',
    },
]

/** Argomenti per le strutture ricettive. */
export const RICETTIVO = [
    {
        titolo: 'Cantiere fuori stagione',
        titoloEn: 'Off-season build',
        testo: 'Programmiamo scavi e realizzazione nei mesi di chiusura, con date concordate in preventivo.',
        testoEn: 'We schedule excavation and construction in your closed months, on dates agreed in the quote.',
    },
    {
        titolo: 'Un unico appalto',
        titoloEn: 'One contract',
        testo: 'Impresa edile e concessionario nella stessa azienda: nessun coordinamento tra fornitori a tuo carico.',
        testoEn: 'Contractor and dealer in one company: no supplier coordination left to you.',
    },
    {
        titolo: 'Assistenza dopo il collaudo',
        titoloEn: 'Support after handover',
        testo: 'Restiamo il riferimento per impianto e manutenzione: siamo in Sicilia, non a mille chilometri.',
        testoEn: 'We remain your contact for plant and upkeep: we are in Sicily, not a thousand kilometres away.',
    },
]

/** Le quattro garanzie della fascia sotto l'eroe. */
export const CREDENZIALI = [
    {
        titolo: 'Impresa edile',
        titoloEn: 'Building contractor',
        testo: 'Scavi e cantiere con mezzi e maestranze nostre.',
        testoEn: 'Excavation and site work with our own crews and machines.',
    },
    {
        titolo: 'Chiavi in mano',
        titoloEn: 'Turnkey',
        testo: 'Dal progetto al collaudo, senza appalti da coordinare.',
        testoEn: 'From design to commissioning, with no contractors to juggle.',
    },
    {
        titolo: 'Concessionario autorizzato',
        titoloEn: 'Authorised dealer',
        testo: 'Piscine Rocks Design per la Sicilia: Tecnologia Rocks Design® brevettata.',
        testoEn: 'Piscine Rocks Design for Sicily: patented Rocks Design Technology.',
    },
    {
        titolo: 'Cantieri eseguiti',
        titoloEn: 'Completed jobs',
        testo: 'Operativi da oltre un anno, con diversi cantieri portati a termine.',
        testoEn: 'Operating for over a year, with several jobs completed.',
    },
]

/**
 * Voci di costo: nessun listino, ma i fattori che spostano davvero il prezzo.
 * Serve a qualificare i contatti e a intercettare le ricerche «quanto costa».
 */
export const FATTORI_COSTO = [
    {
        titolo: 'Dimensione e profondità',
        testo:
            'È la voce principale, ma non cresce in modo lineare: raddoppiare la superficie non raddoppia il prezzo. Le vasche molto piccole hanno un costo al metro quadro più alto, perché scavo, impianti e trasporti restano quasi invariati.',
    },
    {
        titolo: 'Accessibilità del giardino',
        testo:
            'I massi arrivano con mezzi pesanti. Se il camion e l’escavatore entrano senza problemi si risparmia; se bisogna passare da un cancello stretto, smontare una recinzione o lavorare in pendenza, i tempi si allungano.',
    },
    {
        titolo: 'Modello e selezione delle rocce',
        testo:
            'Un Alpi con ghiaietto e vegetazione rada costa meno di un Caraibi con spiaggia estesa e piantumazione tropicale. Anche la scelta dei singoli massi incide: quelli di grande formato richiedono mezzi più impegnativi.',
    },
    {
        titolo: 'Cascate, zone benessere, illuminazione',
        testo:
            'Sono le voci che si possono aggiungere dopo. Molti clienti predispongono in fase di cantiere e completano l’anno successivo: costa meno che intervenire da zero.',
    },
    {
        titolo: 'Opere di contorno',
        testo:
            'Spiaggia, ciottolati, pontili, solarium in legno, muri di contenimento e verde. Spesso pesano quanto la vasca: vale la pena deciderle insieme fin dall’inizio.',
    },
]

export const FAQ = [
    {
        domanda: 'Che cos’è esattamente una Piscina Rocks Design?',
        risposta:
            'È una piscina realizzata con la Tecnologia Rocks Design®: le pareti sono formate da massi monolitici, il fondale è in sabbia naturale e non ci sono getti di cemento armato. L’acqua è mantenuta limpida da impianti di filtrazione e sanificazione. Il risultato somiglia a una caletta o a un’ansa di fiume, ma è una piscina a tutti gli effetti. La tecnologia è di Piscine Rocks Design; Luna Costruzioni srl è il concessionario autorizzato che la realizza in Sicilia.',
    },
    {
        domanda: 'È la stessa cosa di una biopiscina con le piante?',
        risposta:
            'No, ed è la confusione più frequente. Le biopiscine depurano l’acqua con la fitodepurazione, cioè con piante acquatiche e zone di rigenerazione. Una Piscina Rocks Design usa impianti tecnologici tradizionali: la parte naturale sono i materiali — pietra, sabbia, ghiaia — non il sistema di trattamento dell’acqua. Per questo l’acqua resta cristallina e la gestione è quella di una piscina normale.',
    },
    {
        domanda: 'Quanto costa una Piscina Rocks Design in Sicilia?',
        risposta:
            'Non esiste un listino, perché non esistono misure standard. Il prezzo dipende da superficie, profondità, accessibilità del giardino, modello scelto e dagli elementi che decidi di integrare. Nella pagina dedicata trovi spiegate tutte le voci che spostano il preventivo; dopo il sopralluogo ricevi un documento dettagliato, gratuito e senza impegno.',
    },
    {
        domanda: 'Servono permessi? E la piscina fa aumentare le tasse sulla casa?',
        risposta:
            'Una piscina interrata richiede un titolo edilizio: quale, dipende dal Comune, dal piano regolatore e dai vincoli sul lotto, e la giurisprudenza in materia è tutt’altro che uniforme. L’assenza di opere in cemento armato è un elemento a favore nella valutazione, ma non è mai una garanzia automatica: chiunque prometta il contrario senza aver visto il tuo terreno sta semplificando troppo. Verifichiamo insieme al tuo tecnico la situazione specifica prima di firmare qualsiasi cosa. Lo stesso vale per gli effetti catastali e fiscali, che vanno valutati caso per caso con il tuo professionista di fiducia.',
    },
    {
        domanda: 'La sabbia sul fondo non intorbidisce l’acqua?',
        risposta:
            'No. La sabbia è granulometricamente selezionata e resta stabile, trattenuta dalla conformazione del fondale e dai massi. L’impianto di filtrazione lavora costantemente e l’acqua rimane limpida. Alla consegna ti spieghiamo di persona come si pulisce il fondale: è più semplice di quanto sembri e non richiede di svuotare la vasca.',
    },
    {
        domanda: 'Quanta manutenzione richiede?',
        risposta:
            'È paragonabile a quella di una piscina di qualità: controllo periodico dei valori dell’acqua, pulizia e apertura e chiusura stagionale. In Sicilia la stagione è lunga, quindi molti clienti la tengono in funzione da aprile a ottobre. Alla consegna lasciamo istruzioni scritte e restiamo disponibili per l’assistenza.',
    },
    {
        domanda: 'Quanto tempo serve per realizzarla?',
        risposta:
            'Dipende dalle dimensioni, dagli accessi al giardino e dalle opere di contorno. I tempi vengono messi per iscritto in contratto prima di iniziare, non stimati a voce. In generale un cantiere Rocks Design è più rapido di una piscina tradizionale in cemento armato, perché non ci sono tempi di maturazione dei getti.',
    },
    {
        domanda: 'Si può fare su un terreno in pendenza?',
        risposta:
            'Spesso sì, ed è anzi uno dei casi in cui questa tecnologia dà il meglio: i massi permettono di gestire dislivelli che con una vasca rettangolare richiederebbero muri di contenimento importanti. Il modello Alpi nasce proprio per questi contesti. Serve però un sopralluogo: la pendenza va misurata, non stimata a occhio.',
    },
    {
        domanda: 'Posso vederne una dal vivo prima di decidere?',
        risposta:
            'Sì, ed è quello che consigliamo a tutti. Vieni a trovarci presso la nostra sede: potrai camminare sulla sabbia, toccare i massi e vedere l’acqua in funzione. Mezz’ora sul posto chiarisce più di qualsiasi fotografia. Le visite sono su appuntamento.',
    },
    {
        domanda: 'Lavorate anche con hotel, agriturismi e b&b?',
        risposta:
            'Sì. Per le strutture ricettive una piscina riconoscibile è un argomento di vendita diretto: entra nelle fotografie degli annunci, nelle recensioni e nelle richieste dei clienti. Ci occupiamo anche del coordinamento con i vostri tecnici per gli adempimenti richiesti alle piscine ad uso pubblico.',
    },
]

export const DIFFERENZE = [
    ['Forma', 'Rettangolare o da catalogo', 'Disegnata sul giardino, mai due uguali'],
    ['Struttura', 'Cemento armato o pannelli prefabbricati', 'Massi monolitici, senza getti'],
    ['Fondale', 'Piastrelle, PVC o telo stampato', 'Sabbia naturale: Bianco, Giallo o Ticino'],
    ['Ingresso in acqua', 'Scaletta o gradini', 'Spiaggia digradante, si entra camminando'],
    ['Colore dell’acqua', 'Deciso dal rivestimento', 'Deciso dalla sabbia e dalla profondità'],
    ['Bordo', 'Marmo, gres o pietra tagliata', 'Roccia, ghiaia e sabbia'],
    ['Cantiere', 'Tempi di maturazione dei getti', 'Nessun getto: posa a secco degli elementi'],
    ['Nel paesaggio', 'Elemento aggiunto, riconoscibile', 'Sembra esistere da prima della casa'],
]

/**
 * Recensioni verificate dei clienti siciliani di Luna Costruzioni.
 *
 * Da compilare SOLO con recensioni reali e verificabili raccolte dall'azienda
 * (profilo Google, e-mail di consenso, moduli di soddisfazione). Finché
 * l'elenco è vuoto la sezione non viene mostrata: meglio una sezione assente
 * che una testimonianza inventata.
 *
 * Formato: { testo, autore, luogo, fonte, data }
 */
export const RECENSIONI = []
