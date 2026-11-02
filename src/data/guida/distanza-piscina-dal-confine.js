/**
 * Scelto dai dati: «distanza piscina dal confine» 210 ricerche/mese in Italia
 * (Keyword Planner, novembre 2026), domanda che sul sito non aveva risposta.
 * Search Console sui 90 giorni non porta query su questo tema: il sito ha
 * ancora pochissime impressioni, quindi il volume ha deciso più dello storico.
 * Le norme citate sono aperte su Normattiva. Sentenze: Cass. ord. 345/2024
 * (massima su Brocardi) per la piscina come costruzione ai fini dell'art. 873;
 * Cass. ord. 13154/2025 (commento su lexced.com, unica fonte trovata) per
 * l'art. 889 non applicato in automatico alle piscine.
 */

const CC_873 =
    'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=1942-04-04&atto.codiceRedazionale=042U0262&atto.articolo.numero=873&atto.articolo.sottoArticolo=1&atto.articolo.tipoArticolo=0'
const CC_878 =
    'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=1942-04-04&atto.codiceRedazionale=042U0262&atto.articolo.numero=878&atto.articolo.sottoArticolo=1&atto.articolo.tipoArticolo=0'
const CC_889 =
    'https://www.normattiva.it/atto/caricaDettaglioAtto?atto.dataPubblicazioneGazzetta=1942-04-04&atto.codiceRedazionale=042U0262&atto.articolo.numero=889&atto.articolo.sottoArticolo=1&atto.articolo.tipoArticolo=0'

export default {
    slug: 'distanza-piscina-dal-confine',
    pubblicato: '2026-11-01',

    titolo: 'Quanta distanza lasciare dal vicino quando fai la piscina',
    titoloEn: 'How much space to leave your neighbour when you build a pool',
    sintesi:
        'Gli articoli 873, 878 e 889 del codice civile, il regolamento del tuo Comune, che può chiedere di più, e le misure da prendere in giardino prima del sopralluogo.',
    sintesiEn:
        'Articles 873, 878 and 889 of the Italian Civil Code, your municipality’s rules, which can ask for more, and the measurements to take in the garden before the site visit.',

    seo: {
        titolo: 'Distanza della piscina dal confine: codice civile e Comune',
        descrizione:
            'Distanza della piscina dal confine: cosa dice il codice civile e cosa può chiedere in più il regolamento del tuo Comune.',
    },

    foto: 'solarium-in-legno',

    corpo: [
        {
            tipo: 'p',
            it: 'La domanda arriva quasi sempre al sopralluogo, con il metro già in mano: quanto posso avvicinare la piscina al muro del vicino? Nei giardini delle villette a schiera lo spazio è quello che è. Mezzo metro in più o in meno decide se la vasca ci sta. La risposta parte dal codice civile e quasi sempre finisce all’ufficio tecnico del Comune.',
            en: 'The question nearly always comes up at the site visit, tape measure already in hand: how close to the neighbour’s wall can the pool go? In the gardens of terraced houses the space is what it is. Half a metre either way decides whether the pool fits. The answer starts in the Civil Code and nearly always ends at the municipality’s planning office.',
        },
        { tipo: 'h2', it: 'Il codice civile sulle distanze', en: 'The Civil Code on distances' },
        {
            tipo: 'p',
            it: 'Il codice civile dedica alle distanze fra fondi vicini una sezione apposita. Per una vasca scavata in giardino si guarda a due articoli, e nessuno dei due nomina le piscine.',
            en: 'The Civil Code devotes a section of its own to distances between neighbouring plots. For a pool dug in a garden, people look to two of its articles, and neither of them mentions swimming pools.',
        },
        {
            tipo: 'elenco',
            it: [
                `**Articolo 873, le costruzioni.** Le [costruzioni su fondi confinanti](${CC_873}), se non sono unite o aderenti, vanno tenute ad almeno tre metri l’una dall’altra. Il regolamento locale può chiedere una distanza maggiore.`,
                `**Articolo 889, pozzi e cisterne.** Chi apre [pozzi, cisterne, fosse di latrina o di concime vicino al confine](${CC_889}) deve lasciare almeno due metri fra il confine e il punto più vicino del perimetro interno dell’opera. Per i tubi dell’acqua e del gas la distanza minima dal confine è di un metro. Anche qui restano ferme le regole dei regolamenti locali.`,
            ],
            en: [
                `**Article 873, buildings and structures.** [Structures on neighbouring plots](${CC_873}), unless joined or touching, must be kept at least three metres apart. Local regulations may require a greater distance.`,
                `**Article 889, wells and cisterns.** Anyone opening [wells, cisterns, cesspits or manure pits near the boundary](${CC_889}) must leave at least two metres between the boundary and the nearest point of the inner perimeter of the work. For water and gas pipes the minimum distance from the boundary is one metre. Here too, the provisions of local regulations still apply.`,
            ],
        },
        {
            tipo: 'p',
            it: 'Il codice non dice quale dei due valga per una piscina interrata. Per la Cassazione (ordinanza 345/2024) conta come costruzione, ai fini dell’articolo 873, una piscina che non sta tutta sotto il livello del terreno, e comunque quello che esce dal terreno: un solarium rialzato, un muretto, un locale tecnico in muratura, una vasca rialzata sostenuta da un muro. Sull’articolo 889, per la Cassazione (ordinanza 13154/2025) il pericolo che la norma presume per pozzi e cisterne non vale in automatico per le piscine: chi lamenta la violazione deve dimostrare un pericolo concreto. Per questo al tecnico va mostrato tutto il progetto, e prima di disegnare la piscina conviene farsi dare da lui un parere scritto sul tuo caso.',
            en: 'The Code does not say which of the two applies to an in-ground pool. According to the Court of Cassation (order 345/2024), a pool that is not entirely below ground level counts as a structure under Article 873, and so does whatever rises above the ground: a raised sun deck, a low wall, a masonry plant room, a raised pool held up by a wall. On Article 889, according to the Court of Cassation (order 13154/2025), the danger the rule presumes for wells and cisterns does not apply automatically to pools: whoever complains must prove an actual danger. That is why your surveyor or architect needs to see the whole design, and before the pool is drawn up it is worth asking them for a written opinion on your case.',
        },
        { tipo: 'h2', it: 'Se sul confine c’è un muro', en: 'If there is a wall on the boundary' },
        {
            tipo: 'p',
            it: `In Sicilia tanti giardini sono chiusi da un muro: in campagna spesso è un muretto a secco, in paese un muro intonacato con la ringhiera sopra. L’[articolo 878](${CC_878}) dice che un muro di cinta alto non più di tre metri non si considera nel calcolo della distanza dell’articolo 873.`,
            en: `In Sicily many gardens are closed in by a wall: in the countryside it is often a dry-stone wall, in town a rendered wall with railings on top. [Article 878](${CC_878}) says that a boundary wall no higher than three metres is not counted when working out the distance under Article 873.`,
        },
        {
            tipo: 'p',
            it: 'Per l’articolo 889 il muro invece non sposta niente: le sue distanze valgono anche se sul confine c’è un muro divisorio. E con una siepe la domanda vera è dove passi la linea. In un terreno di campagna capita che la siepe piantata quarant’anni fa stia un metro più in qua o più in là del confine catastale. Prima di misurare, i punti di confine vanno trovati sul posto da un tecnico.',
            en: 'For Article 889, on the other hand, the wall changes nothing: its distances apply even when there is a dividing wall on the boundary. And with a hedge, the real question is where the line runs. On a rural plot, the hedge planted forty years ago may stand a metre to one side of the cadastral boundary. Before anyone measures, a surveyor needs to find the boundary points on site.',
        },
        { tipo: 'h2', it: 'Il regolamento del Comune', en: 'Your municipality’s rules' },
        {
            tipo: 'p',
            it: 'Gli articoli 873 e 889 lasciano spazio alle regole locali. La misura che vale per il tuo giardino sta nel regolamento edilizio e nelle norme tecniche del piano regolatore del tuo Comune e cambia da un Comune all’altro. Chi le legge per te è il tecnico che firma la pratica.',
            en: 'Articles 873 and 889 both leave room for local rules. The distance that applies to your garden is set out in your municipality’s building regulations and in the technical rules of its local plan, and it varies from one municipality to the next. The person who reads them for you is the professional who signs the planning application.',
        },
        {
            tipo: 'p',
            it: 'Oltre alle distanze c’è il titolo edilizio. Quale pratica serve per una piscina interrata, e che cosa cambia vicino al mare, è spiegato nell’articolo sui [permessi per la piscina in Sicilia](/guida/piscina-interrata-permessi-sicilia).',
            en: 'Besides distances, there is planning consent. Which application an in-ground pool needs, and what changes near the sea, is explained in the article on [pool permits in Sicily](/guida/piscina-interrata-permessi-sicilia).',
        },
        { tipo: 'h2', it: 'Il metro a nastro, prima del sopralluogo', en: 'The tape measure, before the site visit' },
        {
            tipo: 'p',
            it: 'Bastano un metro a nastro e un foglio, anche disegnato a mano. Annota:',
            en: 'A tape measure and a sheet of paper are enough, even a hand-drawn sketch. Write down:',
        },
        {
            tipo: 'elenco',
            it: [
                'quanto spazio c’è fra il punto dove immagini la vasca e il confine, misurato dalla linea di confine;',
                'le costruzioni del vicino a ridosso del confine, casa, garage o magazzino, e a quanti metri stanno;',
                'i muri di cinta, dove sono e quanto sono alti;',
                'tubi e pozzetti che già passano nel giardino, tuoi o del vicino;',
                'dove ti piacerebbe la pavimentazione intorno alla vasca e dove potrebbe stare il locale tecnico.',
            ],
            en: [
                'how much space there is between where you picture the pool and the boundary, measured from the boundary line;',
                'your neighbour’s buildings close to the boundary, whether a house, garage or shed, and how many metres away they are;',
                'boundary walls, where they are and how high;',
                'any pipes and inspection chambers already running through the garden, yours or your neighbour’s;',
                'where you would like paving around the pool and where the plant room could go.',
            ],
        },
        {
            tipo: 'p',
            it: 'Il sopralluogo parte da lì e va più veloce. In un giardino largo dieci metri, sapere subito quanto spazio lasciare dal lato del vicino cambia la forma della vasca: se il lato verso il vicino è vincolato, la vasca va disegnata lunga e stretta.',
            en: 'The site visit starts from there and goes faster. In a garden ten metres wide, knowing straight away how much room to leave on the neighbour’s side changes the shape of the pool: if the side towards the neighbour is constrained, the pool has to be drawn long and narrow.',
        },
        { tipo: 'h2', it: 'Una vasca disegnata sullo spazio che c’è', en: 'A pool drawn around the space you have' },
        {
            tipo: 'p',
            it: 'Una Piscina Rocks Design non ha una forma a catalogo e si disegna sul giardino. Quando il confine stringe da un lato, la vasca può correre lungo il lato libero, e la fascia verso il vicino diventa bordo di ciottoli e piante che in Sicilia crescono già da sole, come rosmarino e agavi.',
            en: 'A Piscine Rocks Design pool has no catalogue shape and is drawn around the garden. When the boundary closes in on one side, the pool can run along the open side, and the strip towards the neighbour becomes an edge of pebbles and plants that grow in Sicily on their own, such as rosemary and agave.',
        },
        { tipo: 'foto', slug: 'mediterranea-vasca-lunga-e-ulivo' },
        {
            tipo: 'p',
            it: 'Al sopralluogo, che è gratuito, misuriamo il giardino insieme a te e vediamo dove la vasca può stare: Luna Costruzioni è un’impresa edile che fa anche scavi e movimento terra, oltre che concessionario autorizzato Piscine Rocks Design per la Sicilia. Il controllo delle distanze sul regolamento comunale lo fa il tecnico che firma la pratica: il tuo di fiducia oppure, se vuoi, ce ne occupiamo noi come servizio a parte. Per il prezzo la misura della vasca è la prima voce; le altre sono in [Quanto costa](/quanto-costa).',
            en: 'At the site visit, which is free, we measure the garden with you and see where the pool can go: Luna Costruzioni is a building firm that also does excavation and earthworks, as well as an authorised Piscine Rocks Design dealer for Sicily. Checking the distances against the municipal rules is the job of the professional who signs the application: your own, or, if you prefer, we can take care of it as a separate service. On price, the size of the pool is the first item; the others are in [Costs](/quanto-costa).',
        },
    ],

    domande: [
        {
            domanda: 'A quanti metri dal confine si può fare una piscina interrata?',
            domandaEn: 'How far from the boundary can an in-ground pool go?',
            risposta:
                'Il codice civile non dà una misura scritta per le piscine. Si guarda ai tre metri fra costruzioni dell’articolo 873, che di solito riguardano le parti che escono dal terreno (solarium, muretti, locale tecnico), e ai due metri dal confine per pozzi e cisterne dell’articolo 889, che per la Cassazione non si applicano in automatico alle piscine. In tutti e due i casi il regolamento del tuo Comune può chiedere di più. La misura che vale per il tuo terreno te la dà un tecnico dopo aver letto le norme comunali.',
            rispostaEn:
                'The Civil Code gives no written distance for swimming pools. People look to the three metres between structures in Article 873, which usually concern the parts that rise above the ground (sun deck, low walls, plant room), and to the two metres from the boundary for wells and cisterns in Article 889, which, according to the Court of Cassation, do not apply automatically to pools. In both cases your municipality’s rules can ask for more. The distance that applies to your plot comes from a qualified professional who has read the municipal rules.',
        },
        {
            domanda: 'Se sul confine c’è un muro di cinta cambia qualcosa?',
            domandaEn: 'Does a boundary wall change anything?',
            risposta:
                'Per l’articolo 878 un muro di cinta alto fino a tre metri non entra nel calcolo della distanza fra costruzioni dell’articolo 873. Le distanze dell’articolo 889 invece valgono anche quando sul confine c’è un muro divisorio.',
            rispostaEn:
                'Under Article 878, a boundary wall up to three metres high is not counted in the distance between structures under Article 873. The distances in Article 889, however, apply even when there is a dividing wall on the boundary.',
        },
        {
            domanda: 'Chi controlla che le distanze siano rispettate?',
            domandaEn: 'Who checks that the distances are respected?',
            risposta:
                'Il tecnico che firma la pratica edilizia, sul progetto e sulle norme del tuo Comune. Al sopralluogo gratuito misuriamo con te il giardino, così il tecnico parte da numeri veri.',
            rispostaEn:
                'The professional who signs the planning application, working from the design and your municipality’s rules. At the free site visit we measure the garden with you, so they start from real figures.',
        },
    ],

    correlati: [
        { to: '/quanto-costa', label: 'Quanto costa una Piscina Rocks Design', labelEn: 'What a Piscine Rocks Design pool costs' },
        { to: '/come-lavoriamo', label: 'Come lavoriamo, dal sopralluogo alla consegna', labelEn: 'How we work, from site visit to handover' },
        { to: '/domande-frequenti', label: 'Domande frequenti', labelEn: 'Frequently asked questions' },
    ],

    fonti: [
        { titolo: 'Codice civile, art. 873 – Distanze nelle costruzioni (Normattiva)', url: CC_873 },
        { titolo: 'Codice civile, art. 878 – Muro di cinta (Normattiva)', url: CC_878 },
        { titolo: 'Codice civile, art. 889 – Distanze per pozzi, cisterne, fosse e tubi (Normattiva)', url: CC_889 },
        { titolo: 'Cassazione civile, sez. II, ordinanza 345 del 5 gennaio 2024 – piscina e distanze (massima, Brocardi)', url: 'https://brocardi.it/massimario/76513.html' },
        { titolo: 'Cassazione civile, sez. II, ordinanza 13154/2025 – piscina e art. 889 (commento, Lexced)', url: 'https://www.lexced.com/giurisprudenza-civile/distanza-legale-piscina-la-cassazione-chiarisce/' },
    ],
}
