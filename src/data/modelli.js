/** Articolo determinativo giusto: «il Caraibi», «l'Alpi». */
export const conArticolo = (nome, maiuscolo = false) => {
    const vocale = /^[aeiou]/i.test(nome)
    const art = vocale ? "L'" : 'Il '
    const a = maiuscolo ? art : art.toLowerCase()
    return `${a}${nome}`
}

/**
 * I tre modelli: Caraibi, Mediterranea, Alpi.
 *
 * Stanno fuori da `content.js` per una ragione di peso, non di ordine. Il
 * pulsante di WhatsApp — presente su ogni pagina, home compresa — ha bisogno
 * dei nomi dei modelli per scrivere il messaggio; importandoli da
 * `content.js` si portava nel JavaScript della home anche tutte le FAQ, i
 * fattori di costo e i confronti, che la home non usa. `content.js` li
 * riesporta, quindi chi li importava da lì non cambia nulla.
 *
 * Valgono le regole redazionali scritte in testa a `content.js`.
 */
export const MODELLI = [
    {
        slug: 'caraibi',
        /** <title> (≤60) e description (≤150) della pagina del modello. */
        seo: {
            titolo: 'Modello Caraibi: piscina, sabbia e palme | Luna Costruzioni',
            descrizione: 'Spiaggia larga in sabbia chiara, palme e banani: il Modello Caraibi è per giardini ampi e soleggiati in Sicilia.',
        },
        nome: 'Caraibi',
        nomeCompleto: 'Modello Caraibi',
        nomeCompletoEn: 'Caraibi model',
        claim: 'Spiaggia larga, palme, banani',
        claimEn: 'Wide beach, palms, bananas',
        sintesi:
            'La versione più scenografica: ampia spiaggia in sabbia e vegetazione a foglia larga.',
        sintesiEn:
            'The most striking of the three: a wide sand beach and broad-leaved planting.',
        testo:
            'Il Caraibi punta tutto sulla spiaggia. Funziona quando c’è spazio per una spiaggia generosa: è lì che si mettono i lettini, ed è lì che si passa metà della giornata. La piantumazione — palme, banani, graminacee — serve a chiudere la scena e a creare ombra dove serve.',
        testoEn:
            'The Caraibi is all about the beach. It works where there is room for a generous beach: that is where the sun loungers go, and where half the day is spent. The planting — palms, bananas, ornamental grasses — frames the scene and gives shade where it is needed.',
        adatto: 'Giardini ampi e soleggiati, ville con vista, strutture ricettive che vogliono una piscina riconoscibile in fotografia.',
        adattoEn: 'Large, sunny gardens, villas with a view, hospitality businesses that want a pool people recognise in photographs.',
        tag: 'caraibi',
        copertina: 'oasi-aerea-sabbia-bianca',
        /** Didascalie scritte per questa pagina: le foto sono di Piscine Rocks Design. */
        galleria: [
            { slug: 'spiaggia-di-sabbia-privata', didascalia: 'La spiaggia in sabbia chiara davanti alla casa: in acqua si scende camminando.', didascaliaEn: 'The pale sand beach in front of the house: you walk down into the water.' },
            { slug: 'ombre-di-palme-sulla-sabbia', didascalia: 'Le palme piantate nella sabbia fanno l’ombra che una spiaggia chiara chiede.', didascaliaEn: 'Palms planted in the sand give the shade a pale beach needs.' },
            { slug: 'palme-al-tramonto', didascalia: 'Il pontile basso chiude la spiaggia verso l’acqua; dietro, palme e massi grandi.', didascaliaEn: 'A low jetty closes the beach towards the water; behind it, palms and large boulders.' },
            { slug: 'giardino-tropicale', didascalia: 'Banani e palme fanno da quinta: è la vegetazione a dire che è un Caraibi.', didascaliaEn: 'Bananas and palms form the backdrop: it is the planting that makes it a Caraibi.' },
        ],
    },
    {
        slug: 'mediterranea',
        /** <title> (≤60) e description (≤150) della pagina del modello. */
        seo: {
            titolo: 'Modello Mediterranea: piscina e piante mediterranee | Luna',
            descrizione: 'Rocce dai toni caldi, oleandri, agavi e aromatiche: il Modello Mediterranea è la piscina con spiaggia per masserie, uliveti e agrumeti di Sicilia.',
        },
        nome: 'Mediterranea',
        nomeCompleto: 'Modello Mediterranea',
        nomeCompletoEn: 'Mediterranea model',
        claim: 'Rocce calde, oleandri, aromatiche',
        claimEn: 'Warm rock, oleanders, herbs',
        sintesi:
            'Il modello che in Sicilia si integra con meno sforzo: rocce dai toni caldi e piante mediterranee come oleandri, agavi e aromatiche.',
        sintesiEn:
            'The model that settles most easily into a Sicilian garden: warm-toned rock and Mediterranean plants such as oleanders, agaves and herbs.',
        testo:
            'Qui la piscina non deve sembrare arrivata da un catalogo tropicale, ma essere sempre stata parte del giardino. Si lavora con pietra dai toni caldi e piante che in Sicilia crescono già da sole: oleandri, agavi, rosmarino, lavanda, e l’ulivo vicino all’acqua. Vicino a un muro a secco o a un agrumeto il risultato è indistinguibile da una conca naturale.',
        testoEn:
            'Here the pool should not look as if it came out of a tropical catalogue, but as if it had always been part of the garden. The work uses warm-toned stone and plants that already grow on their own in Sicily: oleanders, agaves, rosemary, lavender, and an olive tree by the water. Next to a dry-stone wall or a citrus grove the result looks just like a natural hollow.',
        adatto: 'Case di campagna, masserie, giardini con ulivi o agrumi, ristrutturazioni in contesti storici.',
        adattoEn: 'Country houses, masserie, gardens with olive or citrus trees, restorations in historic settings.',
        tag: 'mediterranea',
        /** Foto con l'ulivo dalla pagina Mediterranea di Rocks Design (indicazione del titolare, 21/10/2026). */
        copertina: 'mediterranea-ulivo-in-primo-piano',
        galleria: [
            { slug: 'mediterranea-vasca-lunga-e-ulivo', didascalia: 'Vasca lunga tra massi e ciottoli, con l’ulivo davanti alla siepe.', didascaliaEn: 'A long pool between boulders and pebbles, with the olive tree in front of the hedge.' },
            { slug: 'mediterranea-agave-e-ulivo', didascalia: 'Agave davanti, ulivo dietro: le piante che in Sicilia ci sono già.', didascaliaEn: 'An agave in front, an olive behind: plants Sicily already has.' },
        ],
    },
    {
        slug: 'alpi',
        /** <title> (≤60) e description (≤150) della pagina del modello. */
        seo: {
            titolo: 'Modello Alpi: roccia e ghiaietto | Luna Costruzioni',
            descrizione: 'Roccia in primo piano, ghiaietto sui bordi ed essenze basse: il Modello Alpi regge pendii e giardini piccoli in Sicilia.',
        },
        nome: 'Alpi',
        nomeCompleto: 'Modello Alpi',
        nomeCompletoEn: 'Alpi model',
        claim: 'Roccia, ghiaietto, essenze basse',
        claimEn: 'Rock, fine gravel, low planting',
        sintesi:
            'Il più sobrio dei tre: prevalgono pietra e ghiaietto e la vegetazione resta rada.',
        sintesiEn:
            'The most restrained of the three: stone and fine gravel lead and planting stays sparse.',
        testo:
            'L’Alpi rinuncia alla spiaggia estesa e mette in primo piano la roccia. Ghiaietto al posto della sabbia sui bordi, essenze basse e resistenti, come in un giardino di montagna. È il modello che regge meglio le pendenze e i giardini piccoli, dove una spiaggia occuperebbe tutto lo spazio.',
        testoEn:
            'The Alpi gives up the wide beach and puts the rock in front. Fine gravel instead of sand at the edges, low, hardy plants, as in a mountain garden. It is the model that copes best with slopes and small gardens, where a beach would take up all the space.',
        adatto: 'Terreni in pendenza, giardini contenuti, case in collina e nell’entroterra.',
        adattoEn: 'Sloping plots, compact gardens, homes in the hills and inland.',
        tag: 'alpi',
        copertina: 'ghiaietto-e-acqua-smeraldo',
        galleria: [
            { slug: 'villa-con-spiaggia-in-ghiaia', didascalia: 'Ciottoli e massi di granito sotto pini e conifere: l’ambiente da cui l’Alpi prende il nome.', didascaliaEn: 'Pebbles and granite boulders under pines and conifers: the setting the Alpi is named after.' },
            { slug: 'masso-luminoso-nell-acqua', didascalia: 'Massi grigi e un salto d’acqua tra i sassi: l’Alpi mette la roccia davanti a tutto.', didascaliaEn: 'Grey boulders and a fall of water between the stones: the Alpi puts rock first.' },
            { slug: 'monolite-al-tramonto', didascalia: 'Un solo masso nell’acqua ferma, con la fascia di luce per la sera.', didascaliaEn: 'A single boulder in still water, with a band of light for the evening.' },
            { slug: 'cascata-e-punto-luce', didascalia: 'Punti luce nei massi e una cascata sullo sfondo, senza spiaggia estesa.', didascaliaEn: 'Lights set in the boulders and a waterfall behind, with no wide beach.' },
        ],
    },
]
