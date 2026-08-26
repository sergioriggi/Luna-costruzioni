/**
 * WHITELIST FOTOGRAFICA — Luna Costruzioni srl / Piscine Rocks Design
 * =====================================================================
 * Solo le immagini elencate qui vengono pubblicate sul sito.
 *
 * DIRETTIVE DIPARTIMENTO MARKETING ROCKS DESIGN (vincolanti):
 *  - vietato pubblicare foto che mostrino la tecnica costruttiva,
 *    le fasi di realizzazione o gli impianti utilizzati (tutela del brevetto);
 *  - ogni fotografia di piscina Rocks Design deve riportare il marchio
 *    «Piscine Rocks Design» (la filigrana viene impressa da prepare-media.mjs).
 *
 * I file sorgente vivono in `media-sources/` e NON sono serviti dal sito.
 * Prima di aggiungere una voce, verificare che lo scatto non riveli
 * scavi, teli, geotessili, tubazioni, locali tecnici o mezzi d'opera.
 */

export const SOURCE_DIR = 'media-sources/foto'

/** @type {{slug:string,file:string,alt:string,caption?:string,tags:string[],hero?:boolean}[]} */
export const PHOTOS = [
    {
        slug: 'oasi-aerea-sabbia-bianca',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_0235cc71.jpg',
        alt: 'Vista aerea di una piscina Piscine Rocks Design con spiaggia in sabbia bianca, palme e massi monolitici',
        caption: 'Spiaggia privata in sabbia bianca e acqua turchese: una Piscina Rocks Design vista dall’alto.',
        tags: ['caraibi', 'sabbia', 'aerea'],
        hero: true,
    },
    {
        slug: 'palme-al-tramonto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_29ba5994.jpg',
        alt: 'Piscina Rocks Design al tramonto tra palme e sabbia chiara',
        caption: 'La luce del tramonto sull’acqua: atmosfera tropicale a pochi passi da casa.',
        tags: ['caraibi', 'tramonto'],
        hero: true,
    },
    {
        slug: 'oasi-con-pontile',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.15_3235a88a.jpg',
        alt: 'Piscina Rocks Design con pontile in legno e bordo in massi naturali',
        caption: 'Ogni piscina Rocks Design nasce sulla morfologia del giardino che la ospita.',
        tags: ['caraibi', 'aerea'],
        hero: true,
    },
    {
        slug: 'villa-con-spiaggia-in-ghiaia',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.08.28_6a7296b8.jpg',
        alt: 'Piscina Rocks Design davanti a una villa, con bordo in ciottoli e massi di granito',
        caption: 'Acqua cristallina, ciottoli e monoliti: nessuna piscina Rocks Design è uguale a un’altra.',
        tags: ['mediterranea', 'giorno'],
        hero: true,
    },
    {
        slug: 'notte-luci-e-festa',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.05.57_45dce3cd.jpg',
        alt: 'Piscina Rocks Design illuminata di sera durante un ricevimento in giardino',
        caption: 'Di sera l’illuminazione subacquea trasforma la piscina nel cuore del giardino.',
        tags: ['notte', 'eventi'],
    },
    {
        slug: 'cascata-e-massi-al-crepuscolo',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.05.57_50de26eb.jpg',
        alt: 'Cascata naturale in massi monolitici su una piscina Rocks Design al crepuscolo',
        caption: 'Le cascate in roccia monolitica regalano il suono dell’acqua in caduta.',
        tags: ['cascate', 'notte'],
    },
    {
        slug: 'ricevimento-a-bordo-acqua',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.05.57_abd63650.jpg',
        alt: 'Festa serale a bordo di una piscina Rocks Design con fuochi d’artificio',
        caption: 'Uno scenario che vale un evento: la piscina Rocks Design come palcoscenico.',
        tags: ['notte', 'eventi'],
    },
    {
        slug: 'cena-in-giardino',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.06.50_18e1e00f.jpg',
        alt: 'Zona pranzo in giardino accanto a una piscina Rocks Design illuminata',
        caption: 'Il giardino diventa vivibile anche dopo il tramonto.',
        tags: ['notte'],
    },
    {
        slug: 'acqua-turchese-notturna',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.06.51_51e07404.jpg',
        alt: 'Piscina Rocks Design con illuminazione subacquea turchese di notte',
        tags: ['notte'],
    },
    {
        slug: 'blu-della-sera',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.06.51_a269a728.jpg',
        alt: 'Piscina Rocks Design all’ora blu con arredi da giardino',
        tags: ['notte'],
    },
    {
        slug: 'illuminazione-calda-sui-monoliti',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.47_4539b1a7.jpg',
        alt: 'Monoliti illuminati con luce calda attorno a una piscina Rocks Design',
        caption: 'La luce radente esalta la texture delle rocce monolitiche.',
        tags: ['notte', 'monoliti'],
    },
    {
        slug: 'solarium-in-legno',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.48_af48d0ac.jpg',
        alt: 'Solarium in legno affacciato su una piscina Rocks Design',
        tags: ['giorno', 'mediterranea'],
    },
    {
        slug: 'spiaggia-di-sabbia-privata',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.48_c6e00978.jpg',
        alt: 'Ampia spiaggia in sabbia naturale davanti a una piscina Rocks Design',
        caption: 'L’effetto spiaggia: sabbia naturale che assorbe e restituisce il calore del sole.',
        tags: ['sabbia', 'caraibi'],
    },
    {
        slug: 'bordo-in-legno-e-ciottoli',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.48_f7c53137.jpg',
        alt: 'Bordo in legno e ciottoli di una piscina Rocks Design',
        tags: ['giorno', 'alpi'],
    },
    {
        slug: 'ghiaietto-e-acqua-smeraldo',
        file: 'Immagine WhatsApp 2025-10-02 ore 14.01.58_6a645cd2.jpg',
        alt: 'Piscina Rocks Design modello Alpi con ghiaietto e acqua color smeraldo',
        caption: 'Modello Alpi: pietra e ghiaietto per una texture rustica e naturale.',
        tags: ['alpi', 'giorno'],
    },
    {
        slug: 'fondale-illuminato',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_12e87d2d.jpg',
        alt: 'Fondale in sabbia di una piscina Rocks Design illuminato di notte',
        caption: 'Il fondale in sabbia libera simula il fondale marino, senza intorbidire l’acqua.',
        tags: ['notte', 'sabbia'],
    },
    {
        slug: 'cascata-su-roccia-rossa',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_1dabba43.jpg',
        alt: 'Cascata su rocce rosse e granito in una piscina Rocks Design',
        caption: 'Salti d’acqua modellati sulle rocce: ogni cascata è un pezzo unico.',
        tags: ['cascate'],
    },
    {
        slug: 'ombre-di-palme-sulla-sabbia',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_48b42cc3.jpg',
        alt: 'Ombre di palme sulla sabbia bianca attorno a una piscina Rocks Design',
        tags: ['caraibi', 'sabbia', 'aerea'],
    },
    {
        slug: 'masso-luminoso-nell-acqua',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_8a2a9330.jpg',
        alt: 'Masso monolitico con anello luminoso immerso in una piscina Rocks Design',
        caption: 'Dettagli su misura: i monoliti diventano sedute, isole e punti luce.',
        tags: ['monoliti', 'notte'],
    },
    {
        slug: 'riflessi-al-tramonto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_c0347d2e.jpg',
        alt: 'Riflessi caldi al tramonto su una piscina Rocks Design',
        tags: ['tramonto'],
    },
    {
        slug: 'giardino-tropicale',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.13_6bf6cf67.jpg',
        alt: 'Piscina Rocks Design immersa in un giardino tropicale con palme',
        tags: ['caraibi'],
    },
    {
        slug: 'cascata-e-punto-luce',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.13_8cb94644.jpg',
        alt: 'Cascata e masso illuminato in una piscina Rocks Design',
        tags: ['cascate', 'monoliti'],
    },
    {
        slug: 'verde-tropicale-sull-acqua',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.13_8f99bfcb.jpg',
        alt: 'Vegetazione tropicale affacciata su una piscina Rocks Design',
        tags: ['caraibi'],
    },
    {
        slug: 'palme-e-monoliti',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_3d49fbf4.jpg',
        alt: 'Palme e massi monolitici attorno a una piscina Rocks Design',
        tags: ['caraibi', 'monoliti'],
    },
    {
        slug: 'monolite-al-tramonto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_49ac44bd.jpg',
        alt: 'Primo piano di un masso monolitico illuminato in una piscina Rocks Design',
        caption: 'Le splendide rocce monolitiche creano pareti solide e stabili.',
        tags: ['monoliti'],
    },
    {
        slug: 'getto-d-acqua',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_9eb7ca9a.jpg',
        alt: 'Getto d’acqua su una piscina Rocks Design con spiaggia in sabbia',
        tags: ['cascate', 'sabbia'],
    },
    {
        slug: 'acqua-in-movimento',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_edcd5853.jpg',
        alt: 'Acqua in movimento in una piscina Rocks Design tra palme e rocce',
        tags: ['cascate'],
    },
    {
        slug: 'idromassaggio-naturale',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.15_864599fa.jpg',
        alt: 'Area idromassaggio di una piscina Rocks Design con acqua turchese',
        caption: 'Aree benessere e idromassaggio integrate nel disegno della vasca.',
        tags: ['idromassaggio'],
    },
    {
        slug: 'area-benessere-vista-alto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.15_f5037eaa.jpg',
        alt: 'Vista dall’alto dell’area idromassaggio di una piscina Rocks Design',
        tags: ['idromassaggio', 'aerea'],
    },
    {
        slug: 'oasi-con-pontile-e-palme',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.16_14197f21.jpg',
        alt: 'Piscina Rocks Design con pontile in legno, palme e sabbia bianca',
        tags: ['caraibi', 'aerea'],
    },
    {
        slug: 'sabbie-naturali-campioni',
        file: 'Immagine WhatsApp 2025-09-18 ore 16.57.33_d58977f4.jpg',
        alt: 'Campioni delle sabbie naturali Rocks Design: Bianco, Giallo e Ticino',
        caption: 'Le tre sabbie naturali selezionate: Bianco, Giallo e Ticino.',
        tags: ['sabbia', 'materiali'],
        noWatermark: true,
    },
    {
        slug: 'sabbie-naturali-granulometria',
        file: 'Immagine WhatsApp 2025-09-18 ore 16.57.32_df8c08ee.jpg',
        alt: 'Granulometria a confronto delle sabbie naturali Bianco, Giallo e Ticino',
        tags: ['sabbia', 'materiali'],
        noWatermark: true,
    },
]

export const WIDTHS = [640, 1280, 1920]
export const FALLBACK_WIDTH = 1280
