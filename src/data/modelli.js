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
            descrizione: 'Spiaggia larga in sabbia Bianco o Giallo, palme e banani, acqua turchese o verde: il Modello Caraibi è per giardini ampi e soleggiati in Sicilia.',
        },
        nome: 'Caraibi',
        nomeCompleto: 'Modello Caraibi',
        nomeCompletoEn: 'Caraibi model',
        claim: 'Sabbia chiara, palme, acqua turchese',
        claimEn: 'Pale sand, palms, turquoise water',
        sintesi:
            'La versione più scenografica: ampia spiaggia in sabbia chiara, vegetazione a foglia larga e acqua sui toni del turchese.',
        sintesiEn:
            'The most striking of the three: a wide beach of pale sand, broad-leaved planting and water in shades of turquoise.',
        testo:
            'Il Caraibi punta tutto sul contrasto fra il chiaro della sabbia e il turchese dell’acqua. Funziona quando c’è spazio per una spiaggia generosa: è lì che si mettono i lettini, ed è lì che si passa metà della giornata. La piantumazione — palme, banani, graminacee — serve a chiudere la scena e a creare ombra dove serve.',
        testoEn:
            'The Caraibi plays on the contrast between pale sand and turquoise water. It works where there is room for a generous beach: that is where the sun loungers go, and where half the day is spent. The planting — palms, bananas, ornamental grasses — frames the scene and gives shade where it is needed.',
        adatto: 'Giardini ampi e soleggiati, ville con vista, strutture ricettive che vogliono una piscina riconoscibile in fotografia.',
        adattoEn: 'Large, sunny gardens, villas with a view, hospitality businesses that want a pool people recognise in photographs.',
        sabbie: ['Bianco', 'Giallo'],
        /** Che cosa fa ogni sabbia su QUESTO modello: le schede generali stanno su /sabbie. */
        noteSabbie: {
            Bianco: 'Dà il turchese più acceso, quello che si vede nelle foto del Caraibi. Sulla spiaggia larga di questo modello serve ombra: palme o una pergola, decise a progetto.',
            Giallo: 'Sposta l’acqua verso il verde e abbaglia meno. Nei giardini esposti a sud per tutto il pomeriggio è la scelta più comoda, anche se la foto è meno bianca.',
        },
        noteSabbieEn: {
            Bianco: 'It gives the brightest turquoise, the one you see in photos of the Caraibi. On this model’s wide beach it needs shade: palms or a pergola, decided at the design stage.',
            Giallo: 'It moves the water towards green and is less dazzling. In gardens facing south all afternoon it is the more comfortable choice, even if the photo looks less white.',
        },
        tag: 'caraibi',
        copertina: 'oasi-con-pontile-e-palme',
        /** Didascalie scritte per questa pagina: le foto sono della casa madre, in Lombardia. */
        galleria: [
            { slug: 'oasi-aerea-sabbia-bianca', didascalia: 'Un Caraibi visto dall’alto: la spiaggia chiara prende più spazio dell’acqua.', didascaliaEn: 'A Caraibi from above: the pale beach takes up more space than the water.' },
            { slug: 'ombre-di-palme-sulla-sabbia', didascalia: 'Le palme piantate nella sabbia fanno l’ombra che una spiaggia chiara chiede.', didascaliaEn: 'Palms planted in the sand give the shade a pale beach needs.' },
            { slug: 'palme-al-tramonto', didascalia: 'Il pontile basso chiude la spiaggia verso l’acqua; dietro, palme e massi grandi.', didascaliaEn: 'A low jetty closes the beach towards the water; behind it, palms and large boulders.' },
            { slug: 'giardino-tropicale', didascalia: 'Banani e palme fanno da quinta: è la vegetazione a dire che è un Caraibi.', didascaliaEn: 'Bananas and palms form the backdrop: it is the planting that makes it a Caraibi.' },
        ],
    },
    {
        slug: 'mediterranea',
        /** <title> (≤60) e description (≤150) della pagina del modello. */
        seo: {
            titolo: 'Modello Mediterranea, piscina tra ulivi | Luna Costruzioni',
            descrizione: 'Ulivi, pietra chiara, acqua sui verdi: il Modello Mediterranea è la piscina con spiaggia in sabbia Giallo o Ticino per masserie e agrumeti di Sicilia.',
        },
        nome: 'Mediterranea',
        nomeCompleto: 'Modello Mediterranea',
        nomeCompletoEn: 'Mediterranea model',
        claim: 'Ulivi, pietra chiara, profumi',
        claimEn: 'Olive trees, pale stone, scented plants',
        sintesi:
            'Il modello che in Sicilia si integra con meno sforzo: pietra locale, essenze mediterranee, acqua sui verdi.',
        sintesiEn:
            'The model that settles most easily into a Sicilian garden: local stone, Mediterranean plants, water in shades of green.',
        testo:
            'Qui la piscina non deve sembrare arrivata da un catalogo tropicale, ma essere sempre stata parte del giardino. Si lavora con pietra dai toni caldi, ghiaia e piante che in Sicilia crescono già da sole — ulivi, lavanda, rosmarino, graminacee. Vicino a un muro a secco o a un agrumeto il risultato è indistinguibile da una conca naturale.',
        testoEn:
            'Here the pool should not look as if it came out of a tropical catalogue, but as if it had always been part of the garden. The work uses warm-toned stone, gravel and plants that already grow on their own in Sicily — olives, lavender, rosemary, ornamental grasses. Next to a dry-stone wall or a citrus grove the result looks just like a natural hollow.',
        adatto: 'Case di campagna, masserie, giardini con ulivi o agrumi, ristrutturazioni in contesti storici.',
        adattoEn: 'Country houses, masserie, gardens with olive or citrus trees, restorations in historic settings.',
        sabbie: ['Giallo', 'Ticino'],
        noteSabbie: {
            Giallo: 'Accanto a tufo, calcare e muri a secco sparisce nel giardino: la vasca sembra una conca che c’era già prima della casa.',
            Ticino: 'Porta l’acqua sul verde scuro e sta bene sotto ulivi e carrubi, dove l’ombra è fitta e la luce arriva filtrata dalle foglie.',
        },
        noteSabbieEn: {
            Giallo: 'Next to tuff, limestone and dry-stone walls it blends into the garden: the pool looks like a hollow that was there before the house.',
            Ticino: 'It takes the water to a dark green and suits the space under olive and carob trees, where the shade is deep and the light comes filtered through the leaves.',
        },
        tag: 'mediterranea',
        copertina: 'villa-con-spiaggia-in-ghiaia',
        galleria: [
            { slug: 'solarium-in-legno', didascalia: 'Deck in legno per i lettini e ghiaia sul lato opposto: niente palme, niente esotico.', didascaliaEn: 'A timber deck for the loungers and gravel on the far side: no palms, nothing exotic.' },
            { slug: 'spiaggia-di-sabbia-privata', didascalia: 'Sabbia chiara e massi tondi davanti a una casa di campagna, senza piante tropicali.', didascaliaEn: 'Pale sand and rounded boulders in front of a country house, with no tropical plants.' },
            { slug: 'bordo-in-legno-e-ciottoli', didascalia: 'Legno e ciottoli grigi: materiali che in un giardino di campagna ci sono già.', didascaliaEn: 'Timber and grey pebbles: materials a country garden already has.' },
            { slug: 'riflessi-al-tramonto', didascalia: 'Al tramonto l’acqua prende il verde dei massi e della ghiaia che la circondano.', didascaliaEn: 'At sunset the water takes on the green of the boulders and gravel around it.' },
        ],
    },
    {
        slug: 'alpi',
        /** <title> (≤60) e description (≤150) della pagina del modello. */
        seo: {
            titolo: 'Modello Alpi: piscina con acqua smeraldo | Luna Costruzioni',
            descrizione: 'Roccia in primo piano, ghiaietto sui bordi, essenze basse, sabbia Ticino e acqua smeraldo: il Modello Alpi regge pendii e giardini piccoli in Sicilia.',
        },
        nome: 'Alpi',
        nomeCompleto: 'Modello Alpi',
        nomeCompletoEn: 'Alpi model',
        claim: 'Roccia, ghiaietto, acqua smeraldo',
        claimEn: 'Rock, fine gravel, emerald water',
        sintesi:
            'Il più sobrio dei tre: prevalgono pietra e ghiaietto, la vegetazione resta rada e l’acqua vira allo smeraldo.',
        sintesiEn:
            'The most restrained of the three: stone and fine gravel lead, planting stays sparse and the water turns emerald.',
        testo:
            'L’Alpi rinuncia alla spiaggia estesa e mette in primo piano la roccia. Ghiaietto al posto della sabbia sui bordi, essenze basse e resistenti, un’acqua che tende al verde profondo dei laghi di montagna. È il modello che regge meglio le pendenze e i giardini piccoli, dove una spiaggia occuperebbe tutto lo spazio.',
        testoEn:
            'The Alpi gives up the wide beach and puts the rock in front. Fine gravel instead of sand at the edges, low, hardy plants, and water that leans towards the deep green of a mountain lake. It is the model that copes best with slopes and small gardens, where a beach would take up all the space.',
        adatto: 'Terreni in pendenza, giardini contenuti, case in collina e nell’entroterra.',
        adattoEn: 'Sloping plots, compact gardens, homes in the hills and inland.',
        sabbie: ['Ticino'],
        noteSabbie: {
            Ticino: 'È la sabbia prevista per questo modello. Con ghiaietto e massi scuri porta l’acqua sul verde profondo di un lago di montagna, senza riflessi chiari sul fondo.',
        },
        noteSabbieEn: {
            Ticino: 'This is the sand intended for this model. With fine gravel and dark boulders it takes the water to the deep green of a mountain lake, with no bright reflections from the floor.',
        },
        tag: 'alpi',
        copertina: 'ghiaietto-e-acqua-smeraldo',
        galleria: [
            { slug: 'masso-luminoso-nell-acqua', didascalia: 'Massi grigi e un salto d’acqua tra i sassi: l’Alpi mette la roccia davanti a tutto.', didascaliaEn: 'Grey boulders and a fall of water between the stones: the Alpi puts rock first.' },
            { slug: 'monolite-al-tramonto', didascalia: 'Un solo masso nell’acqua ferma, con la fascia di luce per la sera.', didascaliaEn: 'A single boulder in still water, with a band of light for the evening.' },
            { slug: 'cascata-e-punto-luce', didascalia: 'Punti luce nei massi e una cascata sullo sfondo, senza spiaggia estesa.', didascaliaEn: 'Lights set in the boulders and a waterfall behind, with no wide beach.' },
            { slug: 'acqua-in-movimento', didascalia: 'Il getto muove l’acqua davanti ai massi scuri della riva.', didascaliaEn: 'The jet stirs the water in front of the dark boulders on the edge.' },
        ],
    },
]
