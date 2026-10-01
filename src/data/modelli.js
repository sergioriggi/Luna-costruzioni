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
        claim: 'Sabbia chiara, palme, acqua turchese',
        sintesi:
            'La versione più scenografica: ampia spiaggia in sabbia chiara, vegetazione a foglia larga e acqua sui toni del turchese.',
        testo:
            'Il Caraibi punta tutto sul contrasto fra il chiaro della sabbia e il turchese dell’acqua. Funziona quando c’è spazio per una spiaggia generosa: è lì che si mettono i lettini, ed è lì che si passa metà della giornata. La piantumazione — palme, banani, graminacee — serve a chiudere la scena e a creare ombra dove serve.',
        adatto: 'Giardini ampi e soleggiati, ville con vista, strutture ricettive che vogliono una piscina riconoscibile in fotografia.',
        sabbie: ['Bianco', 'Giallo'],
        /** Che cosa fa ogni sabbia su QUESTO modello: le schede generali stanno su /sabbie. */
        noteSabbie: {
            Bianco: 'Dà il turchese più acceso, quello che si vede nelle foto del Caraibi. Sulla spiaggia larga di questo modello serve ombra: palme o una pergola, decise a progetto.',
            Giallo: 'Sposta l’acqua verso il verde e abbaglia meno. Nei giardini esposti a sud per tutto il pomeriggio è la scelta più comoda, anche se la foto è meno bianca.',
        },
        tag: 'caraibi',
        copertina: 'oasi-con-pontile-e-palme',
        /** Didascalie scritte per questa pagina: le foto sono della casa madre, in Lombardia. */
        galleria: [
            { slug: 'oasi-aerea-sabbia-bianca', didascalia: 'Un Caraibi visto dall’alto: la spiaggia chiara prende più spazio dell’acqua.' },
            { slug: 'ombre-di-palme-sulla-sabbia', didascalia: 'Le palme piantate nella sabbia fanno l’ombra che una spiaggia chiara chiede.' },
            { slug: 'palme-al-tramonto', didascalia: 'Il pontile basso chiude la spiaggia verso l’acqua; dietro, palme e massi grandi.' },
            { slug: 'giardino-tropicale', didascalia: 'Banani e palme fanno da quinta: è la vegetazione a dire che è un Caraibi.' },
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
        claim: 'Ulivi, pietra chiara, profumi',
        sintesi:
            'Il modello che in Sicilia si integra con meno sforzo: pietra locale, essenze mediterranee, acqua sui verdi.',
        testo:
            'Qui la piscina non deve sembrare arrivata da un catalogo tropicale, ma essere sempre stata parte del giardino. Si lavora con pietra dai toni caldi, ghiaia e piante che in Sicilia crescono già da sole — ulivi, lavanda, rosmarino, graminacee. Vicino a un muro a secco o a un agrumeto il risultato è indistinguibile da una conca naturale.',
        adatto: 'Case di campagna, masserie, giardini con ulivi o agrumi, ristrutturazioni in contesti storici.',
        sabbie: ['Giallo', 'Ticino'],
        noteSabbie: {
            Giallo: 'Accanto a tufo, calcare e muri a secco sparisce nel giardino: la vasca sembra una conca che c’era già prima della casa.',
            Ticino: 'Porta l’acqua sul verde scuro e sta bene sotto ulivi e carrubi, dove l’ombra è fitta e la luce arriva filtrata dalle foglie.',
        },
        tag: 'mediterranea',
        copertina: 'villa-con-spiaggia-in-ghiaia',
        galleria: [
            { slug: 'solarium-in-legno', didascalia: 'Deck in legno per i lettini e ghiaia sul lato opposto: niente palme, niente esotico.' },
            { slug: 'spiaggia-di-sabbia-privata', didascalia: 'Sabbia chiara e massi tondi davanti a una casa di campagna, senza piante tropicali.' },
            { slug: 'bordo-in-legno-e-ciottoli', didascalia: 'Legno e ciottoli grigi: materiali che in un giardino di campagna ci sono già.' },
            { slug: 'riflessi-al-tramonto', didascalia: 'Al tramonto l’acqua prende il verde dei massi e della ghiaia che la circondano.' },
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
        claim: 'Roccia, ghiaietto, acqua smeraldo',
        sintesi:
            'Il più sobrio dei tre: prevalgono pietra e ghiaietto, la vegetazione resta rada e l’acqua vira allo smeraldo.',
        testo:
            'L’Alpi rinuncia alla spiaggia estesa e mette in primo piano la roccia. Ghiaietto al posto della sabbia sui bordi, essenze basse e resistenti, un’acqua che tende al verde profondo dei laghi di montagna. È il modello che regge meglio le pendenze e i giardini piccoli, dove una spiaggia occuperebbe tutto lo spazio.',
        adatto: 'Terreni in pendenza, giardini contenuti, case in collina e nell’entroterra.',
        sabbie: ['Ticino'],
        noteSabbie: {
            Ticino: 'È la sabbia prevista per questo modello. Con ghiaietto e massi scuri porta l’acqua sul verde profondo di un lago di montagna, senza riflessi chiari sul fondo.',
        },
        tag: 'alpi',
        copertina: 'ghiaietto-e-acqua-smeraldo',
        galleria: [
            { slug: 'masso-luminoso-nell-acqua', didascalia: 'Massi grigi e un salto d’acqua tra i sassi: l’Alpi mette la roccia davanti a tutto.' },
            { slug: 'monolite-al-tramonto', didascalia: 'Un solo masso nell’acqua ferma, con la fascia di luce per la sera.' },
            { slug: 'cascata-e-punto-luce', didascalia: 'Punti luce nei massi e una cascata sullo sfondo, senza spiaggia estesa.' },
            { slug: 'acqua-in-movimento', didascalia: 'Il getto muove l’acqua davanti ai massi scuri della riva.' },
        ],
    },
]
