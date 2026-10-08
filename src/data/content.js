import { PREZZO } from './site.js'

/**
 * Contenuti editoriali del sito.
 *
 * NOTA REDAZIONALE — testi originali
 * ----------------------------------
 * Tutti i testi di questo file sono scritti ex novo per Luna Costruzioni S.r.l.s..
 * Descrivono le stesse caratteristiche tecniche documentate dalla casa madre,
 * ma non riprendono frasi né dal catalogo Piscine Rocks Design né dal sito
 * piscinerocksdesign.com. Due ragioni:
 *   1. il materiale della casa madre è opera sua e resta tale;
 *   2. i contenuti duplicati fra i siti dei concessionari si penalizzano a
 *      vicenda nei motori di ricerca: testo proprio significa posizionamento
 *      proprio.
 * Chi aggiorna il sito è pregato di mantenere questa regola.
 *
 * Il prodotto è in Tecnologia Rocks Design®: Luna Costruzioni S.r.l.s. è
 * concessionario autorizzato per la Sicilia, non l'inventore della tecnologia.
 */

/**
 * Le caratteristiche del prodotto, una per una.
 *
 * Si mostrano SOLO su /piscine-rocks-design (Tecnologia.jsx). Ripetute su
 * altre pagine erano diventate il blocco di testo più duplicato del sito:
 * altrove si rimanda a quella pagina con una frase, e basta.
 */
export const PUNTI_DI_FORZA = [
    {
        icona: 'onde',
        titolo: 'Si entra camminando, come al mare',
        titoloEn: 'You walk in, as you would at the beach',
        testo:
            'Niente scaletta, niente gradino di cemento: il fondo digrada dolcemente e sotto i piedi c’è sabbia vera. È la prima differenza che si nota, soprattutto con i bambini.',
        testoEn:
            'No ladder and no concrete step: the floor slopes gently and there is real sand underfoot. It is the first difference people notice, especially with children.',
    },
    {
        icona: 'pietra',
        titolo: 'Pareti in roccia, senza cemento armato',
        titoloEn: 'Rock walls, no reinforced concrete',
        testo:
            'La struttura è tenuta da massi monolitici scelti uno per uno. Sono loro a dare solidità alla vasca e a contenere la sabbia del fondale, senza getti di calcestruzzo.',
        testoEn:
            'The structure is held by monolithic boulders, chosen one by one. They give the basin its strength and hold the sand of the floor in place, with no concrete pours.',
    },
    {
        icona: 'foglia',
        titolo: 'Materiali naturali e riciclabili',
        titoloEn: 'Natural, recyclable materials',
        testo:
            'Pietra, sabbia, ghiaia e un telo in EPDM chimicamente inerte. Il cantiere lascia sul terreno un’impronta molto più leggera di quella di una piscina tradizionale.',
        testoEn:
            'Stone, sand, gravel and a chemically inert EPDM liner. The build leaves a much lighter mark on the ground than a conventional pool.',
    },
    {
        icona: 'palma',
        titolo: 'Acqua limpida, gestione semplice',
        titoloEn: 'Clear water, simple upkeep',
        testo:
            'Dietro l’aspetto naturale lavorano impianti di filtrazione e sanificazione moderni. L’effetto è quello di una caletta; la manutenzione è quella di una piscina di qualità.',
        testoEn:
            'Behind the natural look, modern filtration and sanitation plant does the work. It looks like a small cove; the upkeep is that of a well-made pool.',
    },
]

export const ELEMENTI = [
    {
        slug: 'monoliti',
        titolo: 'Massi monolitici',
        titoloEn: 'Monolithic boulders',
        occhiello: 'La struttura',
        occhielloEn: 'The structure',
        testo:
            'Ogni masso arriva in cantiere con la sua forma, le sue venature e il suo peso. Non si tagliano a misura: si scelgono e si posizionano come si comporrebbe una scultura, tenendo conto di dove batte il sole e di dove ci si siederà. Per questo due vasche non possono somigliarsi davvero, nemmeno volendo.',
        testoEn:
            'Each boulder reaches the site with its own shape, grain and weight. They are not cut to size: they are chosen and placed the way you would compose a sculpture, with an eye on where the sun falls and where people will sit. That is why no two pools can truly look alike, even if you wanted them to.',
        tag: 'monoliti',
    },
    {
        slug: 'sabbie',
        titolo: 'Sabbie naturali',
        titoloEn: 'Natural sands',
        occhiello: 'Il fondale',
        occhielloEn: 'The floor',
        testo:
            'Il fondo è di sabbia, senza piastrelle né teli stampati. Scegliendo fra le tre selezioni disponibili — Bianco, Giallo e Ticino — decidi insieme al colore della spiaggia anche quello dell’acqua, perché è il fondale a restituire la tonalità che vedrai. La sabbia trattiene il calore del sole e lo restituisce a chi ci cammina sopra.',
        testoEn:
            'The floor is sand, with no tiles and no printed liner. When you choose between the three selections available — Bianco, Giallo and Ticino — you are choosing the colour of the water as well as the beach, because it is the floor that gives the water its shade. The sand holds the warmth of the sun and gives it back to whoever walks on it.',
        tag: 'sabbia',
    },
    {
        slug: 'cascate',
        titolo: 'Cascate e giochi d’acqua',
        titoloEn: 'Waterfalls and water features',
        occhiello: 'Il suono',
        occhielloEn: 'The sound',
        testo:
            'Un salto d’acqua cambia il modo in cui si vive un giardino: copre il rumore della strada e riempie il silenzio delle sere d’estate. Le cascate vengono disegnate sui massi realmente posati, quindi il percorso dell’acqua si decide in cantiere.',
        testoEn:
            'A fall of water changes how a garden feels: it covers the noise of the road and fills the quiet of summer evenings. Waterfalls are designed around the boulders actually laid, so the path of the water is decided on site.',
        tag: 'cascate',
    },
    {
        slug: 'idromassaggio',
        titolo: 'Zone benessere',
        titoloEn: 'Wellness areas',
        occhiello: 'Il relax',
        occhielloEn: 'Relaxing',
        testo:
            'Sedute ricavate nella roccia, panche sommerse a mezz’acqua, bocchette per l’idromassaggio: sono decisioni che si prendono in fase di progetto, misurando dove passerai più tempo. Il risultato è una piccola area termale a cielo aperto.',
        testoEn:
            'Seats shaped into the rock, benches half under water, hydromassage jets: these are decisions made at the design stage, based on where you will spend most of your time. The result is a small open-air spa.',
        tag: 'idromassaggio',
    },
]

/** I tre modelli stanno in un file loro: vedi il commento in `modelli.js`. */
export { MODELLI } from './modelli.js'

export const SABBIE = [
    {
        nome: 'Bianco',
        acqua: 'Turchese chiaro, molto luminoso',
        acquaEn: 'Light turquoise, very bright',
        carattere: 'La scelta più scenografica: massimo contrasto con il verde del giardino.',
        carattereEn: 'The most striking choice: the strongest contrast with the green of the garden.',
        nota: 'Sotto il sole pieno riflette molto; in Sicilia conviene prevedere zone d’ombra sulla spiaggia.',
        notaEn: 'In full sun it reflects a lot; in Sicily it is worth planning shade on the beach.',
    },
    {
        nome: 'Giallo',
        acqua: 'Verde acqua caldo',
        acquaEn: 'Warm aqua green',
        carattere: 'La via di mezzo, fra il turchese del Bianco e lo smeraldo del Ticino.',
        carattereEn: 'The middle ground, between the turquoise of Bianco and the emerald of Ticino.',
        nota: 'Si accorda bene con pietra calcarea e tufo, materiali diffusi nell’edilizia siciliana.',
        notaEn: 'It sits well with limestone and tuff, materials common in Sicilian building.',
    },
    {
        nome: 'Ticino',
        acqua: 'Verde smeraldo profondo',
        acquaEn: 'Deep emerald green',
        carattere: 'Il tono più naturale, da fiume di montagna.',
        carattereEn: 'The most natural tone, like a mountain river.',
        nota: 'Regge bene la vicinanza a rocce scure e vegetazione fitta.',
        notaEn: 'It works well next to dark rock and dense planting.',
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
        durataEn: 'Rocks Design Technology®',
        testo:
            'Realizzazione in Tecnologia Rocks Design® e finiture in pietra: la vasca prende la forma disegnata.',
        testoEn:
            'Built in Rocks Design Technology® with stone finishes: the basin takes the shape it was drawn.',
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
            'Siamo concessionario autorizzato per la Sicilia: restiamo sull’isola e il referente resta Luciano Naro, lo stesso del primo sopralluogo. Un numero, non un centralino.',
        rispostaEn:
            'We are an authorised dealer for Sicily: we stay on the island and your contact stays Luciano Naro, the same person who came for the first visit. One number, not a call centre.',
    },
    {
        dubbio: '«Sarà una vasca come tante.»',
        dubbioEn: '“It will end up looking like every other pool.”',
        risposta:
            'La Tecnologia Rocks Design® è brevettata e le forme non sono a catalogo: la vasca si disegna sul tuo giardino. Non può somigliare a quella di un altro.',
        rispostaEn:
            'Rocks Design Technology® is patented and the shapes are not from a catalogue: the basin is drawn around your garden. It cannot look like anyone else’s.',
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
        /*
         * Questa voce porta la credenziale VERA, e va tenuta precisa.
         *
         * Luna Costruzioni non ha ancora realizzato una piscina: ha fatto il
         * corso Rocks Design ed è concessionaria autorizzata. Ciò che ha
         * davvero alle spalle sono cinque anni di cantieri EDILI — movimento
         * terra, scavi, costruzioni — e per un cliente che deve affidare un
         * cantiere è l'argomento più solido disponibile: la piscina la posa
         * chi scava di mestiere, non un rivenditore che subappalta.
         *
         * Non scrivere qui numeri di piscine, né lasciare formule ambigue tipo
         * «cantieri conclusi» accanto a una galleria di piscine: si legge come
         * un'esperienza che non c'è. Quando la prima piscina sarà finita,
         * questa voce si potrà riscrivere — e sarà una bella notizia.
         */
        titolo: 'Cantieri dal 2021',
        titoloEn: 'On site since 2021',
        testo: 'Cinque anni di movimento terra e opere edili in Sicilia, più la formazione Rocks Design sulla tecnologia.',
        testoEn: 'Five years of earthmoving and building work in Sicily, plus Rocks Design training on the technology.',
    },
]

/**
 * Le voci che spostano il preventivo sopra il prezzo di partenza.
 *
 * Il minimo (`PREZZO` in src/data/site.js) è una cifra sola; questo elenco è
 * ciò che la fa salire. Serve a qualificare i contatti e a intercettare le
 * ricerche «quanto costa»: chi arriva qui vuole sapere perché due preventivi
 * per la stessa superficie possono differire.
 */
export const FATTORI_COSTO = [
    {
        titolo: 'Dimensione e profondità',
        titoloEn: 'Size and depth',
        testo:
            'È la voce principale, ma non cresce in modo lineare: raddoppiare la superficie non raddoppia il prezzo. Le vasche molto piccole hanno un costo al metro quadro più alto, perché scavo, impianti e trasporti restano quasi invariati.',
        testoEn:
            'This is the main item, but it does not grow in a straight line: doubling the area does not double the price. Very small pools cost more per square metre, because excavation, plant and transport stay almost the same.',
    },
    {
        titolo: 'Accessibilità del giardino',
        titoloEn: 'Access to the garden',
        testo:
            'I massi arrivano con mezzi pesanti. Se il camion e l’escavatore entrano senza problemi si risparmia; se bisogna passare da un cancello stretto, smontare una recinzione o lavorare in pendenza, i tempi si allungano.',
        testoEn:
            'The boulders arrive on heavy vehicles. If the lorry and the excavator can drive straight in, you save; if they have to get through a narrow gate, a fence has to come down or the work is on a slope, it takes longer.',
    },
    {
        titolo: 'Modello e selezione delle rocce',
        titoloEn: 'Model and choice of rock',
        testo:
            'Un Alpi con ghiaietto e vegetazione rada costa meno di un Caraibi con spiaggia estesa e piantumazione tropicale. Anche la scelta dei singoli massi incide: quelli di grande formato richiedono mezzi più impegnativi.',
        testoEn:
            'An Alpi with fine gravel and sparse planting costs less than a Caraibi with a wide beach and tropical planting. The choice of individual boulders matters too: the largest ones need heavier machinery.',
    },
    {
        titolo: 'Cascate, zone benessere, illuminazione',
        titoloEn: 'Waterfalls, wellness areas, lighting',
        testo:
            'Sono le voci che si possono aggiungere dopo: si predispongono durante il cantiere e si completano l’anno successivo, e costa meno che intervenire da zero.',
        testoEn:
            'These can be added later: the groundwork is laid during the build and they are finished the following year, which costs less than starting from scratch.',
    },
    {
        titolo: 'Opere di contorno',
        titoloEn: 'Surrounding works',
        testo:
            'Spiaggia, ciottolati, pontili, solarium in legno, muri di contenimento e verde. Spesso pesano quanto la vasca: vale la pena deciderle insieme fin dall’inizio.',
        testoEn:
            'Beach, cobbles, jetties, timber sun decks, retaining walls and planting. They often cost as much as the pool itself, so it is worth deciding on them together from the start.',
    },
]

export const FAQ = [
    {
        domanda: 'Che cos’è esattamente una Piscina Rocks Design?',
        domandaEn: 'What exactly is a Piscine Rocks Design pool?',
        risposta:
            'È una piscina realizzata con la Tecnologia Rocks Design®: le pareti sono formate da massi monolitici, il fondale è in sabbia naturale e non ci sono getti di cemento armato. L’acqua è mantenuta limpida da impianti di filtrazione e sanificazione. Il risultato somiglia a una caletta o a un’ansa di fiume, ma è una piscina a tutti gli effetti. La tecnologia è di Piscine Rocks Design; Luna Costruzioni S.r.l.s. è un concessionario autorizzato che la realizza in Sicilia.',
        rispostaEn:
            'It is a pool built with Rocks Design Technology®: the walls are formed by monolithic boulders, the floor is natural sand and there is no reinforced concrete. The water is kept clear by filtration and sanitation plant. It looks like a small cove or a bend in a river, but it is a pool in every respect. The technology belongs to Piscine Rocks Design; Luna Costruzioni S.r.l.s. is an authorised dealer that builds it in Sicily.',
    },
    {
        domanda: 'È la stessa cosa di una biopiscina con le piante?',
        domandaEn: 'Is it the same as a planted natural swimming pond?',
        risposta:
            'No, ed è la confusione più frequente. Le biopiscine depurano l’acqua con la fitodepurazione, cioè con piante acquatiche e zone di rigenerazione. Una Piscina Rocks Design usa impianti tecnologici tradizionali: la parte naturale sono i materiali — pietra, sabbia, ghiaia — non il sistema di trattamento dell’acqua. Per questo l’acqua resta cristallina e la gestione è quella di una piscina normale.',
        rispostaEn:
            'No, and it is the most common confusion. Natural swimming ponds clean the water with plants and regeneration zones. A Piscine Rocks Design pool uses conventional treatment plant: what is natural are the materials — stone, sand, gravel — not the water treatment. That is why the water stays crystal clear and the upkeep is that of an ordinary pool.',
    },
    {
        domanda: 'Quanto costa una Piscina Rocks Design in Sicilia?',
        domandaEn: 'How much does a Piscine Rocks Design pool cost in Sicily?',
        risposta:
            `Si parte da ${PREZZO.cifraLunga}. È un minimo e non una tariffa: il prezzo al metro quadro scende quando la vasca cresce, e da lì in su contano superficie, profondità, accessibilità del giardino, modello scelto e gli elementi che decidi di integrare. Fontana, giochi d’acqua e idromassaggio sono extra su richiesta. Nella pagina dedicata ci sono tutte le voci che spostano il preventivo; quando abbiamo visto il giardino ricevi un documento dettagliato, voce per voce.`,
        rispostaEn:
            `Prices start from €${PREZZO.daMq.toLocaleString('en-GB')} per square metre, excluding VAT. That is a minimum, not a rate: the price per square metre falls as the pool gets bigger, and from there it depends on area, depth, access to the garden, the model chosen and the features you decide to include. Fountain, water features and hydromassage are extras on request. The dedicated page lists everything that moves the quote; once we have seen the garden you receive a detailed, itemised document.`,
    },
    {
        domanda: 'Servono permessi? E la piscina fa aumentare le tasse sulla casa?',
        domandaEn: 'Do I need permits? And will the pool raise the tax on my house?',
        risposta:
            'Una piscina interrata richiede un titolo edilizio: quale, dipende dal Comune, dal piano regolatore e dai vincoli sul lotto, e la giurisprudenza in materia è tutt’altro che uniforme. L’assenza di opere in cemento armato è un elemento a favore nella valutazione, ma non è mai una garanzia automatica: chiunque prometta il contrario senza aver visto il tuo terreno sta semplificando troppo. Verifichiamo insieme al tuo tecnico la situazione specifica prima di firmare qualsiasi cosa. Il disbrigo delle pratiche possiamo occuparcene noi: è un servizio opzionale, quotato a parte rispetto ai lavori. Lo stesso vale per gli effetti catastali e fiscali, che vanno valutati caso per caso con il tuo professionista di fiducia.',
        rispostaEn:
            'An in-ground pool needs planning consent: which kind depends on the municipality, the local plan and any constraints on the plot, and case law on the subject is far from consistent. The absence of reinforced concrete counts in its favour in the assessment, but it is never an automatic guarantee: anyone who promises otherwise without having seen your land is oversimplifying. We check your specific situation with your own surveyor or architect before anything is signed. We can handle the paperwork for you: it is an optional service, quoted separately from the works. The same goes for the effects on land registry and tax, which need to be assessed case by case with your own adviser.',
    },
    {
        domanda: 'La sabbia sul fondo non intorbidisce l’acqua?',
        domandaEn: 'Does the sand on the floor not cloud the water?',
        risposta:
            'No. La sabbia è granulometricamente selezionata e resta stabile, trattenuta dalla conformazione del fondale e dai massi. L’impianto di filtrazione lavora costantemente e l’acqua rimane limpida. Alla consegna ti spieghiamo di persona come si pulisce il fondale: è più semplice di quanto sembri e non richiede di svuotare la vasca.',
        rispostaEn:
            'No. The sand is graded by grain size and stays stable, held in place by the shape of the floor and by the boulders. The filtration plant runs continuously and the water stays clear. At handover we show you in person how to clean the floor: it is simpler than it sounds and does not mean emptying the pool.',
    },
    {
        domanda: 'Quanta manutenzione richiede?',
        domandaEn: 'How much maintenance does it need?',
        risposta:
            'È paragonabile a quella di una piscina di qualità: controllo periodico dei valori dell’acqua, pulizia e apertura e chiusura stagionale. In Sicilia la stagione è lunga: una piscina si può tenere in funzione da aprile a ottobre. Alla consegna lasciamo istruzioni scritte e restiamo disponibili per l’assistenza.',
        rispostaEn:
            'About the same as a well-made pool: regular checks of the water, cleaning, and opening and closing for the season. The season is long in Sicily: a pool can stay in use from April to October. At handover we leave written instructions and remain available for support.',
    },
    {
        domanda: 'Quanto tempo serve per realizzarla?',
        domandaEn: 'How long does it take to build?',
        risposta:
            'Dipende dalle dimensioni, dagli accessi al giardino e dalle opere di contorno. I tempi vengono messi per iscritto in contratto prima di iniziare. In generale un cantiere Rocks Design è più rapido di una piscina tradizionale in cemento armato, perché non ci sono tempi di maturazione dei getti.',
        rispostaEn:
            'It depends on the size, the access to the garden and the surrounding works. The timings are written into the contract before work starts. In general a Rocks Design build is quicker than a conventional reinforced-concrete pool, because there are no concrete pours to wait on while they cure.',
    },
    {
        domanda: 'Si può fare su un terreno in pendenza?',
        domandaEn: 'Can it be built on a slope?',
        risposta:
            'Spesso sì, ed è anzi uno dei casi in cui questa tecnologia dà il meglio: i massi permettono di gestire dislivelli che con una vasca rettangolare richiederebbero muri di contenimento importanti. Il modello Alpi nasce proprio per questi contesti. Serve però vedere il terreno e misurare la pendenza.',
        rispostaEn:
            'Often, yes, and it is one of the cases where this technology does best: the boulders can handle changes in level that a rectangular pool would need substantial retaining walls for. The Alpi model was conceived for exactly these settings. We do need to see the land and measure the slope, though.',
    },
    {
        domanda: 'Come faccio a capire come sarà prima di firmare?',
        domandaEn: 'How can I tell what it will look like before I sign?',
        risposta:
            'Da due cose che vedi nel tuo giardino. Al sopralluogo Luciano Naro porta i campioni delle tre sabbie e li mette sotto il sole del tuo terreno, perché il colore dell’acqua nasce da lì. Poi il progetto disegna la forma della vasca sulle misure vere del giardino, con spiaggia, massi e accessi. Le fotografie del sito mostrano il prodotto; la tua piscina la vedi nel disegno, prima di firmare.',
        rispostaEn:
            'From two things you see in your own garden. At the site visit Luciano Naro brings samples of the three sands and puts them in the sun on your land, because that is where the colour of the water comes from. Then the design draws the shape of the pool on the real measurements of the garden, with beach, boulders and access. The photographs on this site show the product; you see your own pool in the drawing, before you sign.',
    },
    {
        domanda: 'Lavorate anche con hotel, agriturismi e b&b?',
        domandaEn: 'Do you also work with hotels, agriturismi and B&Bs?',
        risposta:
            'Sì. Per le strutture ricettive una piscina riconoscibile è un argomento di vendita diretto: entra nelle fotografie degli annunci, nelle recensioni e nelle richieste dei clienti. Ci occupiamo anche del coordinamento con i vostri tecnici per gli adempimenti richiesti alle piscine ad uso pubblico.',
        rispostaEn:
            'Yes. For hospitality businesses a distinctive pool is a direct selling point: it shows up in listing photos, in reviews and in guest enquiries. We also coordinate with your own technical advisers on the requirements that apply to pools for public use.',
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

/** `DIFFERENZE` in inglese: stesso ordine, riga per riga. */
export const DIFFERENZE_EN = [
    ['Shape', 'Rectangular or from a catalogue', 'Drawn around the garden, never two alike'],
    ['Structure', 'Reinforced concrete or prefabricated panels', 'Monolithic boulders, no concrete pours'],
    ['Floor', 'Tiles, PVC or a printed liner', 'Natural sand: Bianco, Giallo or Ticino'],
    ['Getting in', 'Ladder or steps', 'A sloping beach you walk into'],
    ['Water colour', 'Set by the lining', 'Set by the sand and the depth'],
    ['Edge', 'Marble, porcelain or cut stone', 'Rock, gravel and sand'],
    ['On site', 'Waiting for concrete pours to cure', 'No pours: the elements are laid dry'],
    ['In the landscape', 'An added, obvious feature', 'Looks as if it was there before the house'],
]

/**
 * Il confronto con la piscina in cemento, sull'asse della DECISIONE.
 *
 * Non duplica `DIFFERENZE` qui sopra: quella tabella sta su
 * /piscine-rocks-design e confronta la FISICA delle due piscine — struttura,
 * fondale, bordo. Questa risponde a un'altra domanda, l'unica per cui la
 * gente cerca davvero: «quale delle due scelgo?». Se un giorno le due
 * tabelle cominciano a somigliarsi, è il segno che una delle due ha cambiato
 * mestiere e va rimessa a posto.
 *
 * REGOLA DI QUESTO BLOCCO — si confronta solo ciò che è verificabile.
 * In Italia la pubblicità comparativa è lecita (D.Lgs. 145/2007, art. 4) a
 * condizione che confronti caratteristiche oggettive, pertinenti e
 * verificabili, e che non denigri il prodotto altrui. È lo stesso vincolo che
 * rende la pagina credibile: un confronto in cui l'altro non vince mai su
 * niente non convince chi sta davvero scegliendo.
 *
 * Tre cose che qui NON si possono affermare, perché il sito stesso dice il
 * contrario altrove — ed è il verso giusto:
 *   • costa meno (vedi la FAQ in src/pages/QuantoCosta.jsx: gli ordini di
 *     grandezza sono confrontabili);
 *   • si mantiene con meno lavoro (stessa filtrazione, stesso trattamento);
 *   • ha bisogno di meno permessi (serve un titolo edilizio in entrambi i
 *     casi; l'assenza di cemento armato aiuta la valutazione, non esonera).
 *
 * Una riga su durata e rifacimento sarebbe l'argomento più forte della
 * tabella. Non c'è, e non va aggiunta a sensazione: servono dati sulla vita
 * utile del telo in esercizio e sui cicli di rifacimento di una vasca in
 * cemento. Senza quelli è esattamente il tipo di confronto che l'art. 4
 * esclude.
 */
export const CONFRONTO_CEMENTO = [
    [
        'Costo',
        'Molto variabile secondo dimensione e finiture',
        'Ordini di grandezza confrontabili, a parità di superficie e finitura',
    ],
    [
        'Tempi di cantiere',
        'I getti vanno fatti maturare prima di proseguire',
        'Nessun getto: gli elementi si posano a secco',
    ],
    [
        'Permesso edilizio',
        'Serve. Quale, dipende dal Comune e dai vincoli sul lotto',
        'Serve lo stesso: l’assenza di cemento armato aiuta nella valutazione, senza esonerare',
    ],
    [
        'Manutenzione',
        'Filtrazione, trattamento dell’acqua, pulizia di fondo',
        'Le stesse operazioni, con gli stessi impianti',
    ],
    [
        'Forma e profondità',
        'Qualunque: anche corsie e fondali a quota costante',
        'Disegnata sul giardino; non si fanno corsie',
    ],
    [
        'Ingresso in acqua',
        'Scaletta o gradini',
        'Spiaggia digradante: si entra camminando',
    ],
    [
        'Giardino occupato',
        'Poco oltre il bordo della vasca',
        'Di più: la spiaggia fa parte della piscina',
    ],
    [
        'Chi la costruisce in Sicilia',
        'Molte imprese: preventivi facili da mettere a confronto',
        'I concessionari autorizzati Piscine Rocks Design: in Sicilia sono due',
    ],
]

/** `CONFRONTO_CEMENTO` in inglese: stesso ordine, riga per riga. */
export const CONFRONTO_CEMENTO_EN = [
    [
        'Cost',
        'Varies widely with size and finishes',
        'Comparable orders of magnitude, for the same area and finish',
    ],
    [
        'Build time',
        'Concrete pours must cure before work can continue',
        'No pours: the elements are laid dry',
    ],
    [
        'Planning consent',
        'Required. Which kind depends on the municipality and constraints on the plot',
        'Required as well: no reinforced concrete helps the assessment, without exempting it',
    ],
    [
        'Maintenance',
        'Filtration, water treatment, cleaning the floor',
        'The same tasks, with the same plant',
    ],
    [
        'Shape and depth',
        'Anything: including lap lanes and a constant depth',
        'Drawn around the garden; no lap lanes',
    ],
    [
        'Getting in',
        'Ladder or steps',
        'A sloping beach: you walk in',
    ],
    [
        'Garden taken up',
        'Little beyond the edge of the pool',
        'More: the beach is part of the pool',
    ],
    [
        'Who builds it in Sicily',
        'Many firms: quotes are easy to compare',
        'Authorised Piscine Rocks Design dealers: there are two in Sicily',
    ],
]

/** «Scegli il cemento se…» — scritte per essere lette una accanto all'altra. */
export const QUANDO_CEMENTO = [
    'Vuoi nuotare sul serio: vasche, lunghezza costante, profondità uniforme.',
    'Il giardino è piccolo e vuoi più acqua possibile nello spazio che hai.',
    'Vuoi chiedere tre preventivi e confrontarli in una settimana.',
    'Ti servono copertura a tapparella o accessori a catalogo, pensati per vasche rettangolari.',
]

export const QUANDO_CEMENTO_EN = [
    'You want to swim properly: lengths, a constant run, an even depth.',
    'The garden is small and you want as much water as possible in the space you have.',
    'You want three quotes and to compare them within a week.',
    'You need a slatted cover or off-the-shelf accessories designed for rectangular pools.',
]

/** «Scegli una Piscina Rocks Design se…» — stessa lunghezza, stesso registro. */
export const QUANDO_ROCKS = [
    'Vuoi entrare in acqua camminando: con bambini piccoli, o con chi non nuota, cambia tutto.',
    'Il giardino ha una forma o una pendenza che una vasca rettangolare non rispetta.',
    'Vuoi che la piscina sembri esistesse da prima della casa.',
    'Ti interessa che il colore dell’acqua lo decida la sabbia del fondale.',
]

export const QUANDO_ROCKS_EN = [
    'You want to walk into the water: with small children, or with people who do not swim, that changes everything.',
    'The garden has a shape or a slope that a rectangular pool would not respect.',
    'You want the pool to look as if it was there before the house.',
    'You want the colour of the water to come from the sand on the floor.',
]

/**
 * Dove il cemento vince davvero.
 *
 * Questa sezione è il motore di credibilità della pagina, non una concessione
 * di cortesia: è ciò che rende leggibile tutto il resto. Va tenuta specifica —
 * quattro vantaggi concreti — e va aggiornata se cambia il prodotto, non
 * annacquata se qualcuno la trova scomoda.
 */
export const VANTAGGI_CEMENTO = [
    {
        titolo: 'Qualunque forma, qualunque profondità',
        titoloEn: 'Any shape, any depth',
        testo:
            'Un getto armato prende la geometria che gli si dà: venticinque metri in linea retta, un fondale a quota costante, un bordo a sfioro su un lato solo. Una Piscina Rocks Design nasce dal terreno e dai massi disponibili, e quella libertà non ce l’ha. Se in acqua ci vuoi nuotare per allenarti, il cemento è la risposta giusta.',
        testoEn:
            'A reinforced pour takes whatever geometry you give it: twenty-five metres in a straight line, a constant depth, an infinity edge on one side only. A Piscine Rocks Design pool grows out of the ground and the boulders available, and it does not have that freedom. If you want to swim for training, concrete is the right answer.',
    },
    {
        titolo: 'Occupa meno giardino',
        titoloEn: 'It takes up less garden',
        testo:
            'A parità di acqua, la spiaggia digradante chiede superficie in più. È la parte migliore della piscina, ma resta superficie: in un giardino piccolo una vasca rettangolare rende di più al metro quadro, e in certi lotti è l’unica che ci sta.',
        testoEn:
            'For the same amount of water, a sloping beach needs extra space. It is the best part of the pool, but it is still space: in a small garden a rectangular pool gives more per square metre, and on some plots it is the only one that fits.',
    },
    {
        titolo: 'Più preventivi da confrontare',
        titoloEn: 'More quotes to compare',
        testo:
            'Le imprese che costruiscono piscine in cemento sono tante, in ogni provincia siciliana. È un mercato maturo, e questo è un vantaggio reale per chi compra: si chiedono tre offerte e si confrontano voce per voce. Una Piscina Rocks Design la costruiscono solo i concessionari autorizzati, e in Sicilia sono due: si possono confrontare due preventivi, non dieci.',
        testoEn:
            'There are plenty of firms building concrete pools in every Sicilian province. It is a mature market, and that is a real advantage for the buyer: you ask for three offers and compare them line by line. A Piscine Rocks Design pool is built only by authorised dealers, and there are two in Sicily: you can compare two quotes, not ten.',
    },
    {
        titolo: 'Accessori a catalogo',
        titoloEn: 'Off-the-shelf accessories',
        testo:
            'Coperture a tapparella, teli invernali, robot di pulizia: il mercato è costruito attorno a vasche rettangolari di misure ricorrenti. Su un perimetro irregolare alcune soluzioni vanno adattate su misura e altre non si applicano affatto.',
        testoEn:
            'Slatted covers, winter covers, cleaning robots: the market is built around rectangular pools of standard sizes. On an irregular outline some solutions have to be adapted to measure and others do not apply at all.',
    },
]

/** Dove vince la Piscina Rocks Design. Stessa forma, stessa misura. */
export const VANTAGGI_ROCKS = [
    {
        titolo: 'Chi non nuota entra lo stesso',
        titoloEn: 'People who do not swim can still get in',
        testo:
            'Con una vasca in cemento chi ha bambini piccoli, chi non nuota o chi fatica a camminare resta sul bordo, perché la scaletta verticale è l’unico modo di entrare. Con la spiaggia digradante ci si bagna a piccoli passi, fin dove si tocca. Non è soltanto comodità: quando l’opera si qualifica come eliminazione di barriere architettoniche, previa asseverazione di un tecnico abilitato, cambia anche l’aliquota IVA dell’appalto.',
        testoEn:
            'With a concrete pool, people with small children, people who do not swim or who find walking difficult stay on the edge, because the vertical ladder is the only way in. With a sloping beach you get in a small step at a time, as far as you can stand. It is not only about comfort: when the work qualifies as the removal of architectural barriers, subject to sworn certification by a qualified technician, the VAT rate on the contract changes too.',
    },
    {
        titolo: 'La forma segue il terreno',
        titoloEn: 'The shape follows the land',
        testo:
            'In Sicilia quasi ogni giardino ha una pendenza, un albero da salvare, un muro a secco che vale più della piscina. Una vasca rettangolare impone la propria geometria e chiede al terreno di adeguarsi; qui è il contrario, e su un lotto difficile spesso è ciò che rende il progetto possibile.',
        testoEn:
            'In Sicily almost every garden has a slope, a tree worth saving, a dry-stone wall worth more than the pool. A rectangular pool imposes its own geometry and asks the land to adapt; here it is the other way round, and on a difficult plot that is often what makes the project possible.',
    },
    {
        titolo: 'Nessun getto da far maturare',
        titoloEn: 'No concrete to cure',
        testo:
            'Gli elementi si posano a secco. Sparisce la sequenza casseri-getto-maturazione-disarmo, che in una piscina in cemento detta i tempi di tutto il cantiere e non si può accelerare.',
        testoEn:
            'The elements are laid dry. The sequence of formwork, pour, curing and stripping, which sets the pace of the whole build for a concrete pool and cannot be hurried, simply goes away.',
    },
    {
        titolo: 'Non si legge come un elemento aggiunto',
        titoloEn: 'It does not read as an add-on',
        testo:
            'Pietra, sabbia e ghiaia sono gli stessi materiali del paesaggio siciliano. A lavoro finito la vasca sembra la ragione per cui il giardino è fatto così.',
        testoEn:
            'Stone, sand and gravel are the same materials as the Sicilian landscape. Once the work is done, the pool looks like the reason the garden is shaped the way it is.',
    },
]

/**
 * Recensioni verificate dei clienti siciliani di Luna Costruzioni.
 *
 * Da compilare SOLO con recensioni reali e verificabili raccolte dall'azienda
 * (profilo Google, e-mail di consenso, moduli di soddisfazione). Finché
 * l'elenco è vuoto la sezione non viene mostrata: meglio una sezione assente
 * che una testimonianza inventata.
 *
 * Formato: { testo, testoEn, autore, luogo, fonte, data }
 */
export const RECENSIONI = []
