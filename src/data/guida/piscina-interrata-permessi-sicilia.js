/**
 * Scelto dai dati: «piscina interrata permessi» 320 ricerche/mese in Italia,
 * «permesso per costruire piscina» 70, «permessi piscina» 40 (Keyword Planner,
 * ottobre 2026). Il sito ne parlava solo in poche righe (Tecnologia, Sicilia,
 * FAQ): qui la risposta per esteso, con le norme aperte e citate.
 */

const DPR_380_ART_3 =
    'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=2001-10-20&atto.codiceRedazionale=001G0429&atto.articolo.numero=3&atto.articolo.sottoArticolo=1&atto.articolo.tipoArticolo=0'
const DPR_380_ART_10 =
    'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=2001-10-20&atto.codiceRedazionale=001G0429&atto.articolo.numero=10&atto.articolo.sottoArticolo=1&atto.articolo.tipoArticolo=0'
const LR_16_2016 = 'https://w3.ars.sicilia.it/lex/L_2016_016.htm'
const CODICE_ART_142 =
    'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=2004-02-24&atto.codiceRedazionale=004G0066&atto.articolo.numero=142&atto.articolo.sottoArticolo=1&atto.articolo.tipoArticolo=0'
const CODICE_ART_146 =
    'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=2004-02-24&atto.codiceRedazionale=004G0066&atto.articolo.numero=146&atto.articolo.sottoArticolo=1&atto.articolo.tipoArticolo=0'
const CORTE_72_2025 = 'https://www.cortecostituzionale.it/stampa-pdf-pronuncia/2025/72'

export default {
    slug: 'piscina-interrata-permessi-sicilia',
    pubblicato: '2026-10-10',

    titolo: 'Piscina interrata in Sicilia: quali permessi servono',
    titoloEn: 'In-ground pools in Sicily: which permits you need',
    sintesi:
        'Permesso di costruire, vincolo paesaggistico, fascia dei 150 metri dal mare: che cosa chiede la legge per una piscina interrata in Sicilia e che cosa controllare prima del preventivo.',
    sintesiEn:
        'Building permit, landscape protection, the 150-metre strip from the sea: what the law requires for an in-ground pool in Sicily, and what to check before you ask for a quote.',

    seo: {
        titolo: 'Piscina interrata in Sicilia: quali permessi servono',
        descrizione:
            'Permesso di costruire, vincolo paesaggistico e fascia dei 150 metri: cosa serve per una piscina interrata in Sicilia, con le norme citate.',
    },

    foto: 'villa-con-spiaggia-in-ghiaia',

    corpo: [
        {
            tipo: 'p',
            it: 'Chi pensa a una piscina in giardino di solito chiede prima quanto costa, poi se serve il permesso. Conviene fare le due domande al contrario: se il titolo edilizio non si può ottenere, il preventivo non serve a niente. Qui trovi le regole che valgono in Sicilia per una piscina interrata, con i riferimenti di legge, e le verifiche da fare prima di firmare qualsiasi cosa.',
            en: 'Anyone thinking about a pool in the garden usually asks first what it costs, then whether they need permission. It pays to ask the other way round: if planning consent cannot be obtained, the quote is worthless. Here are the rules that apply in Sicily to an in-ground pool, with the legal references, and the checks to make before you sign anything.',
        },
        { tipo: 'h2', it: 'La regola di partenza: serve un titolo edilizio', en: 'The starting point: you need planning consent' },
        {
            tipo: 'p',
            it: `Una piscina interrata è un'opera edilizia, non un arredo da giardino. In Sicilia le definizioni degli interventi sono quelle del Testo unico dell'edilizia, il DPR 380/2001, che la [legge regionale 16/2016](${LR_16_2016}) applica sull'isola insieme alle sue modifiche successive.`,
            en: `An in-ground pool is building work, not a piece of garden furniture. In Sicily, the categories of building work are those of the national Consolidated Building Act, Presidential Decree 380/2001, which [Regional Law 16/2016](${LR_16_2016}) applies on the island together with its later amendments.`,
        },
        {
            tipo: 'p',
            it: `Il punto che decide quasi tutto sta nell'[articolo 3 del DPR 380](${DPR_380_ART_3}): un intervento pertinenziale conta come **nuova costruzione** quando le norme tecniche del piano regolatore lo qualificano così, oppure quando realizza un volume superiore al 20% del volume dell'edificio principale. Le nuove costruzioni richiedono il **permesso di costruire**: lo dice l'[articolo 10 del DPR 380](${DPR_380_ART_10}), e per la Sicilia l'articolo 5 della legge regionale 16/2016.`,
            en: `The point that decides almost everything is in [Article 3 of Decree 380](${DPR_380_ART_3}): an ancillary structure counts as **new construction** when the technical rules of the local plan classify it that way, or when it creates a volume greater than 20% of the volume of the main building. New construction requires a **building permit** (permesso di costruire): that is [Article 10 of Decree 380](${DPR_380_ART_10}), and in Sicily Article 5 of Regional Law 16/2016.`,
        },
        {
            tipo: 'p',
            it: 'In pratica: se il tuo Comune classifica la piscina come nuova costruzione, serve il permesso di costruire. Se non lo fa, il titolo può essere un altro. La domanda «SCIA o permesso di costruire?» non ha una risposta valida per tutta l’isola. Ce l’ha per il tuo terreno, e la dà un tecnico abilitato dopo aver letto il piano regolatore del tuo Comune.',
            en: 'In practice: if your municipality classifies the pool as new construction, you need a building permit. If it does not, a different kind of consent may apply. The question “SCIA or building permit?” has no single answer for the whole island. It has one for your plot, and a qualified professional gives it after reading your municipality’s local plan.',
        },
        {
            tipo: 'nota',
            it: 'Se qualcuno ti promette una piscina «senza permessi» prima di aver visto il terreno, sta semplificando troppo. Una Piscina Rocks Design non ha opere in cemento armato: è un elemento a favore nella valutazione, ma non esonera dalla pratica.',
            en: 'If someone promises you a pool “with no permits” before they have seen the land, they are oversimplifying. A Piscine Rocks Design pool has no reinforced concrete: that counts in its favour in the assessment, but it does not exempt you from the application.',
        },
        { tipo: 'h2', it: 'Vicino al mare: due vincoli diversi', en: 'Near the sea: two separate constraints' },
        {
            tipo: 'p',
            it: 'Per le case sulla costa ci sono due regole da tenere distinte, perché funzionano in modo diverso: una vieta, l’altra chiede un’autorizzazione in più.',
            en: 'For houses on the coast there are two rules to keep apart, because they work differently: one prohibits, the other requires an extra authorisation.',
        },
        {
            tipo: 'elenco',
            it: [
                `**La fascia dei 150 metri dalla battigia.** L'articolo 15 della legge regionale siciliana 78/1976 stabilisce che, nelle zone del piano regolatore diverse dalle A e dalle B, le costruzioni devono arretrarsi di 150 metri dalla battigia. Una legge regionale del 1991 ha chiarito che il divieto vale direttamente anche per i privati, e la [Corte costituzionale, con la sentenza 72/2025](${CORTE_72_2025}), ha respinto i dubbi sollevati su quella norma.`,
                `**Il vincolo paesaggistico sulla costa.** Il [Codice dei beni culturali e del paesaggio, all'articolo 142](${CODICE_ART_142}), tutela per legge i territori costieri compresi in una fascia di 300 metri dalla linea di battigia, con alcune eccezioni per le aree che nel 1985 erano già zone A e B. Qui, come nelle altre aree vincolate, serve anche l'**autorizzazione paesaggistica**.`,
            ],
            en: [
                `**The 150-metre strip from the shoreline.** Article 15 of Sicilian Regional Law 78/1976 states that, in zones of the local plan other than A and B, buildings must be set back 150 metres from the shoreline. A regional law of 1991 made clear that the ban applies directly to private owners too, and the [Constitutional Court, in judgment 72/2025](${CORTE_72_2025}), rejected the challenges raised against that rule.`,
                `**Landscape protection on the coast.** [Article 142 of the Code of Cultural Heritage and Landscape](${CODICE_ART_142}) protects by law the coastal land within 300 metres of the shoreline, with some exceptions for areas that were already zones A and B in 1985. Here, as in other protected areas, you also need **landscape authorisation**.`,
            ],
        },
        {
            tipo: 'p',
            it: `L'autorizzazione paesaggistica non sostituisce il titolo edilizio. Per l'[articolo 146 del Codice](${CODICE_ART_146}) è un atto autonomo e viene prima del permesso di costruire, e i lavori non possono partire finché non è stata rilasciata. Sono due pratiche distinte, e il calendario va costruito tenendo conto di entrambe.`,
            en: `Landscape authorisation does not replace planning consent. Under [Article 146 of the Code](${CODICE_ART_146}) it is a separate act that comes before the building permit, and work cannot start until it has been granted. These are two separate applications, and the timetable has to allow for both.`,
        },
        {
            tipo: 'p',
            it: 'Oltre al paesaggio, sul terreno possono esserci vincoli idrogeologici o archeologici. Dal giardino non si vedono: si leggono nelle carte del Comune e degli enti competenti.',
            en: 'Besides landscape, the plot may be subject to hydrogeological or archaeological constraints. You cannot see them from the garden: they are in the records of the municipality and the relevant authorities.',
        },
        { tipo: 'h2', it: 'Che cosa controllare prima del preventivo', en: 'What to check before asking for a quote' },
        {
            tipo: 'p',
            it: 'Prima di chiedere un prezzo conviene avere in mano poche informazioni. Le trovi con il tuo tecnico, oppure le verifichiamo insieme al sopralluogo.',
            en: 'Before asking for a price, it helps to have a few facts to hand. You can get them with your own surveyor or architect, or we can check them together at the site visit.',
        },
        {
            tipo: 'elenco',
            it: [
                'In che zona del piano regolatore ricade il terreno, e che cosa dicono le norme tecniche sulle pertinenze.',
                'Il volume dell’edificio principale, se la piscina va valutata come pertinenza.',
                'La distanza dalla battigia, se la casa è sul mare.',
                'Se il terreno ricade in un’area con vincolo paesaggistico, idrogeologico o archeologico.',
                'Se sull’immobile ci sono pratiche edilizie ancora aperte o difformità da sistemare.',
            ],
            en: [
                'Which zone of the local plan the land falls in, and what the technical rules say about ancillary structures.',
                'The volume of the main building, if the pool is to be assessed as an ancillary structure.',
                'The distance from the shoreline, if the house is by the sea.',
                'Whether the land lies in an area with landscape, hydrogeological or archaeological constraints.',
                'Whether the property has building applications still open or irregularities to be put right.',
            ],
        },
        {
            tipo: 'p',
            it: 'Con queste risposte si capisce quale titolo serve, quanto tempo può richiedere e se il progetto si può fare. A volte la risposta è no. Saperlo prima evita di pagare un progetto che resta sulla carta.',
            en: 'With these answers you know which consent you need, roughly how long it may take and whether the project can go ahead at all. Sometimes the answer is no. Knowing that early saves you paying for a design that never leaves the drawing board.',
        },
        { tipo: 'h2', it: 'Chi segue la pratica', en: 'Who handles the application' },
        {
            tipo: 'p',
            it: 'La pratica la firma un tecnico abilitato: geometra, architetto o ingegnere. Puoi affidarla al tuo professionista di fiducia. Se preferisci, Luna Costruzioni, concessionario autorizzato Piscine Rocks Design per la Sicilia, può occuparsi anche del disbrigo delle pratiche: è un servizio a parte, quotato separatamente dai lavori, e lo attivi solo se vuoi.',
            en: 'The application is signed by a qualified professional: a surveyor (geometra), architect or engineer. You can give it to the professional you already trust. If you prefer, Luna Costruzioni, an authorised Piscine Rocks Design dealer for Sicily, can also handle the paperwork: it is a separate service, priced separately from the works, and you take it only if you want it.',
        },
        {
            tipo: 'p',
            it: 'La verifica di quale titolo serve, invece, la facciamo comunque e prima del preventivo, perché da lì dipende se il progetto si può fare. Le voci che fanno variare il prezzo sono spiegate in [Quanto costa](/quanto-costa). Se stai ancora scegliendo fra una vasca tradizionale e una Rocks Design, il confronto su costi, tempi e permessi è in [Piscina in cemento o Rocks Design](/piscina-in-cemento-o-rocks-design).',
            en: 'Checking which consent is needed, on the other hand, we always do, and before the quote, because that decides whether the project can go ahead. What moves the price is explained in [Costs](/quanto-costa). If you are still choosing between a conventional pool and a Rocks Design one, the comparison of cost, timing and permits is in [Concrete pool or Rocks Design](/piscina-in-cemento-o-rocks-design).',
        },
        { tipo: 'h2', it: 'Quando partire', en: 'When to start' },
        {
            tipo: 'p',
            it: 'La stagione dei bagni in Sicilia è lunga, ma i mesi che si perdono sono quasi sempre quelli dell’ufficio tecnico. Se vuoi la piscina pronta per l’estate, la pratica va avviata in inverno, e prima ancora vanno controllati i vincoli. Le informazioni provincia per provincia sono nella pagina [Piscine Rocks Design in Sicilia](/piscine-rocks-design/sicilia).',
            en: 'The swimming season in Sicily is long, but the months that get lost are almost always at the council’s planning office. If you want the pool ready for summer, the application needs to go in during the winter, and the constraints need checking before that. Information province by province is on the [Piscine Rocks Design in Sicily](/piscine-rocks-design/sicilia) page.',
        },
        {
            tipo: 'nota',
            it: 'Questo articolo riassume norme generali e non sostituisce il parere del tuo tecnico. Le regole del tuo Comune e i vincoli del tuo terreno contano più di qualsiasi testo valido per tutta l’isola.',
            en: 'This article summarises general rules and is no substitute for advice from your own professional. The rules of your municipality and the constraints on your plot count for more than any text written for the whole island.',
        },
    ],

    domande: [
        {
            domanda: 'Per una piscina interrata serve sempre il permesso di costruire?',
            domandaEn: 'Does an in-ground pool always need a building permit?',
            risposta:
                'Serve quando la piscina è una nuova costruzione: succede se le norme tecniche del piano regolatore la qualificano così, o se realizza un volume superiore al 20% di quello dell’edificio principale. Negli altri casi il titolo può essere diverso. Quale, lo dicono le norme del tuo Comune, e lo verifica un tecnico abilitato.',
            rispostaEn:
                'It does when the pool counts as new construction: that happens if the technical rules of the local plan classify it that way, or if it creates a volume greater than 20% of that of the main building. In other cases a different kind of consent may apply. Which one depends on your municipality’s rules, and a qualified professional checks it.',
        },
        {
            domanda: 'Posso fare una piscina vicino al mare in Sicilia?',
            domandaEn: 'Can I build a pool near the sea in Sicily?',
            risposta:
                'Dipende dalla distanza e dalla zona. Entro 150 metri dalla battigia, fuori dalle zone A e B del piano regolatore, la legge regionale vieta le costruzioni. Entro 300 metri dalla battigia l’area è di norma soggetta a vincolo paesaggistico, e prima dei lavori serve anche l’autorizzazione paesaggistica.',
            rispostaEn:
                'It depends on the distance and the zone. Within 150 metres of the shoreline, outside zones A and B of the local plan, regional law prohibits building. Within 300 metres of the shoreline the land is normally under landscape protection, and landscape authorisation is also needed before work starts.',
        },
        {
            domanda: 'La pratica edilizia la seguite voi?',
            domandaEn: 'Do you handle the planning application?',
            risposta:
                'Se vuoi, sì: è un servizio a parte, quotato separatamente dai lavori. La verifica di quale titolo serve la facciamo comunque e prima del preventivo, perché da lì dipende se il progetto si può fare.',
            rispostaEn:
                'If you like, yes: it is a separate service, priced separately from the works. Checking which consent is needed we always do, and before the quote, because that decides whether the project can go ahead.',
        },
    ],

    correlati: [
        { to: '/quanto-costa', label: 'Quanto costa una Piscina Rocks Design', labelEn: 'What a Piscine Rocks Design pool costs' },
        { to: '/piscina-in-cemento-o-rocks-design', label: 'Piscina in cemento o Rocks Design', labelEn: 'Concrete pool or Rocks Design' },
        { to: '/domande-frequenti', label: 'Domande frequenti', labelEn: 'Frequently asked questions' },
    ],

    fonti: [
        { titolo: 'DPR 380/2001, art. 3 – Definizioni degli interventi edilizi (Normattiva)', url: DPR_380_ART_3 },
        { titolo: 'DPR 380/2001, art. 10 – Interventi subordinati a permesso di costruire (Normattiva)', url: DPR_380_ART_10 },
        { titolo: 'Legge regionale siciliana 10 agosto 2016, n. 16 (Assemblea Regionale Siciliana)', url: LR_16_2016 },
        { titolo: 'D.Lgs. 42/2004, art. 142 – Aree tutelate per legge (Normattiva)', url: CODICE_ART_142 },
        { titolo: 'D.Lgs. 42/2004, art. 146 – Autorizzazione paesaggistica (Normattiva)', url: CODICE_ART_146 },
        { titolo: 'Corte costituzionale, sentenza n. 72/2025 – fascia dei 150 metri dalla battigia', url: CORTE_72_2025 },
    ],

    cifre: [{ valore: '20%', fonte: DPR_380_ART_3 }],
}
