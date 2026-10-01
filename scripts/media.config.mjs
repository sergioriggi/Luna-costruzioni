/**
 * WHITELIST FOTOGRAFICA — Luna Costruzioni S.r.l.s. / Piscine Rocks Design
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
 *
 * ── PROVENIENZA: PERCHÉ I TESTI NON DICONO «LE NOSTRE, IN SICILIA» ───────
 * Queste fotografie sono materiale di Piscine Rocks Design, non cantieri di
 * Luna. Gli EXIF le collocano in Lombardia, dove sta la casa madre.
 *
 * Il motivo per cui la distinzione conta: **Luna Costruzioni non ha ancora
 * realizzato una piscina.** È un'impresa edile attiva dal 2021 — movimento
 * terra, scavi, opere edili — che ha fatto il corso Rocks Design ed è
 * concessionaria autorizzata. Sa costruirle; non ne ha ancora costruite.
 *
 * Perciò i testi attorno a queste immagini affermano solo ciò che è vero:
 * sono Piscine Rocks Design ultimate e in funzione, cioè il PRODOTTO che
 * Luna realizza. Nessuna rivendicazione di paternità né di luogo. Riguarda
 * `GalleriaPagina.jsx`, `Home.jsx`, `Modello.jsx` e `Giardini.jsx`.
 *
 * NON è una limitazione da tenere per sempre — anzi, è la prima cosa da
 * cambiare quando cambierà la realtà: «le nostre realizzazioni in Sicilia»
 * vende molto più di «Piscine Rocks Design». Appena il primo cantiere è
 * concluso, quelle foto vanno aggiunte qui e i testi possono rivendicare
 * quello che a quel punto sarà vero.
 */

export const SOURCE_DIR = 'media-sources/foto'

/**
 * `verticale` (facoltativo) chiede alla pipeline anche un ritaglio verticale
 * dello stesso scatto, pubblicato come `<slug>-verticale-<w>.webp`: serve a
 * chi mostra la foto in una scatola alta e stretta (il telefono) senza fargli
 * scaricare l'intera orizzontale per poi buttarne via due terzi.
 *  - proporzione: [larghezza, altezza] del ritaglio, es. [2, 3];
 *  - larghezze:   larghezze pubblicate, in px;
 *  - posizione:   dove tagliare (`position`/`gravity` di sharp: 'centre',
 *                 'attention', 'entropy', 'left', 'top'…);
 *  - qualita:     qualità WebP del ritaglio (facoltativa, 74 come le altre).
 * Cambiando `qualita` o `posizione` i file vanno rifatti: la pipeline è
 * incrementale, quindi si cancellano i `-verticale-*` e si rilancia
 * `npm run media`.
 * Il punto di rottura a cui il browser sceglie il ritaglio non sta qui ma nel
 * componente che lo usa (`Foto.jsx`).
 *
 * @type {{slug:string,file:string,alt:string,caption?:string,tags:string[],hero?:boolean,noWatermark?:boolean,verticale?:{proporzione:[number,number],larghezze:number[],posizione:string,qualita?:number}}[]}
 */
export const PHOTOS = [
    {
        slug: 'oasi-aerea-sabbia-bianca',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_0235cc71.jpg',
        alt: 'Vista aerea di una piscina Piscine Rocks Design con spiaggia in sabbia bianca, palme e massi monolitici',
        caption: 'Vista dall’alto: la spiaggia di sabbia bianca gira tutta attorno alla vasca, e le palme ci fanno ombra.',
        tags: ['caraibi', 'sabbia', 'aerea'],
        hero: true,
    },
    {
        slug: 'palme-al-tramonto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_29ba5994.jpg',
        alt: 'Piscina Rocks Design al tramonto tra palme e sabbia chiara',
        caption: 'Palme e massi su una spiaggia di sabbia chiara, con un pontile basso in legno sul bordo dell’acqua.',
        tags: ['caraibi', 'tramonto'],
        hero: true,
    },
    {
        slug: 'oasi-con-pontile',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.15_3235a88a.jpg',
        alt: 'Piscina Rocks Design con pontile in legno e bordo in massi naturali',
        caption: 'Vasca a forma libera davanti a una dépendance in legno, con due getti che partono dai massi.',
        tags: ['caraibi', 'aerea'],
        hero: true,
    },
    {
        slug: 'villa-con-spiaggia-in-ghiaia',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.08.28_6a7296b8.jpg',
        alt: 'Piscina Rocks Design davanti a una villa, con bordo in ciottoli e massi di granito',
        caption: 'Ghiaia e massi al posto del bordo piastrellato: verso la riva l’acqua si fa bassa.',
        tags: ['mediterranea', 'giorno'],
        hero: true,
    },
    {
        slug: 'notte-luci-e-festa',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.05.57_45dce3cd.jpg',
        alt: 'Piscina Rocks Design illuminata di sera durante un ricevimento in giardino',
        caption: 'Festa in giardino: luci appese sopra il prato e la vasca illuminata dal fondo.',
        tags: ['notte', 'eventi'],
    },
    {
        slug: 'cascata-e-massi-al-crepuscolo',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.05.57_50de26eb.jpg',
        alt: 'Cascata naturale in massi monolitici su una piscina Rocks Design al crepuscolo',
        caption: 'Una cascatella tra i massi, allestita al crepuscolo per un matrimonio.',
        tags: ['cascate', 'notte'],
    },
    {
        slug: 'ricevimento-a-bordo-acqua',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.05.57_abd63650.jpg',
        alt: 'Festa serale a bordo di una piscina Rocks Design con fuochi d’artificio',
        caption: 'Il taglio della torta a bordo acqua, con la cascata e le fontane di luce alle spalle.',
        tags: ['notte', 'eventi'],
    },
    {
        slug: 'cena-in-giardino',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.06.50_18e1e00f.jpg',
        alt: 'Zona pranzo in giardino accanto a una piscina Rocks Design illuminata',
        caption: 'Cena sotto gli ombrelloni, con la vasca accesa in primo piano.',
        tags: ['notte'],
    },
    {
        slug: 'acqua-turchese-notturna',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.06.51_51e07404.jpg',
        alt: 'Piscina Rocks Design con illuminazione subacquea turchese di notte',
        caption: 'Di notte la luce subacquea fa turchese l’acqua e lascia al buio il giardino intorno.',
        tags: ['notte'],
    },
    {
        slug: 'blu-della-sera',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.06.51_a269a728.jpg',
        alt: 'Piscina Rocks Design all’ora blu con arredi da giardino',
        caption: 'Tavolo apparecchiato oltre il bordo in ghiaia, con sfere luminose posate tra i ciottoli.',
        tags: ['notte'],
    },
    {
        slug: 'illuminazione-calda-sui-monoliti',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.47_4539b1a7.jpg',
        alt: 'Monoliti illuminati con luce calda attorno a una piscina Rocks Design',
        caption: 'A sera, luce calda sui massi del bordo e luce fredda sotto l’acqua.',
        tags: ['notte', 'monoliti'],
        // È l'apertura della home. Su telefono (≤900px) la scatola è circa 2:3
        // e `object-fit: cover` butta via i due terzi dell'orizzontale: meglio
        // un ritaglio verticale dedicato. Le larghezze sono 1× e 2× di un
        // telefono da 390–430px; ci si ferma al 2× DI PROPOSITO anche per gli
        // schermi 3×, perché la foto sta sotto il velo (`.pg-eroe-velo`, 68–92%
        // di copertura) e il dettaglio in più non si vedrebbe: costerebbe solo
        // byte sul primo caricamento. Il taglio al centro tiene in quadro il
        // monolite illuminato a sinistra, la vasca e i massi caldi a destra.
        // Qualità 64 invece di 74 per lo stesso motivo del 2×: sotto il velo
        // la differenza non si vede, e sull'apertura del telefono ogni KB è LCP.
        verticale: { proporzione: [2, 3], larghezze: [420, 840], posizione: 'centre', qualita: 64 },
    },
    {
        slug: 'solarium-in-legno',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.48_af48d0ac.jpg',
        alt: 'Solarium in legno affacciato su una piscina Rocks Design',
        caption: 'Solarium in doghe di legno con i lettini; sul lato opposto la riva è in ghiaia.',
        tags: ['giorno', 'mediterranea'],
    },
    {
        slug: 'spiaggia-di-sabbia-privata',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.48_c6e00978.jpg',
        alt: 'Ampia spiaggia in sabbia naturale davanti a una piscina Rocks Design',
        caption: 'Spiaggia di sabbia davanti alla casa: in acqua si scende camminando, tra massi tondi.',
        tags: ['sabbia', 'caraibi'],
    },
    {
        slug: 'bordo-in-legno-e-ciottoli',
        file: 'Immagine WhatsApp 2025-07-24 ore 20.09.48_f7c53137.jpg',
        alt: 'Bordo in legno e ciottoli di una piscina Rocks Design',
        caption: 'Da un lato il deck in legno, dall’altro ciottoli grigi e massi arrotondati.',
        tags: ['giorno', 'alpi'],
    },
    {
        slug: 'ghiaietto-e-acqua-smeraldo',
        file: 'Immagine WhatsApp 2025-10-02 ore 14.01.58_6a645cd2.jpg',
        alt: 'Piscina Rocks Design modello Alpi con ghiaietto e acqua color smeraldo',
        caption: 'Ghiaietto sulla riva e lastre di pietra che scendono nell’acqua verde come gradini.',
        tags: ['alpi', 'giorno'],
    },
    {
        slug: 'fondale-illuminato',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_12e87d2d.jpg',
        alt: 'Fondale in sabbia di una piscina Rocks Design illuminato di notte',
        caption: 'Fondale in sabbia illuminato di notte, con due massi luminosi posati nell’acqua.',
        tags: ['notte', 'sabbia'],
    },
    {
        slug: 'cascata-su-roccia-rossa',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_1dabba43.jpg',
        alt: 'Cascata su rocce rosse e granito in una piscina Rocks Design',
        caption: 'Una lama d’acqua che scende da una lastra appoggiata su due massi.',
        tags: ['cascate'],
    },
    {
        slug: 'ombre-di-palme-sulla-sabbia',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_48b42cc3.jpg',
        alt: 'Ombre di palme sulla sabbia bianca attorno a una piscina Rocks Design',
        caption: 'Dall’alto: palme basse piantate nella sabbia bianca, con le ombre corte di mezzogiorno.',
        tags: ['caraibi', 'sabbia', 'aerea'],
    },
    {
        slug: 'masso-luminoso-nell-acqua',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_8a2a9330.jpg',
        alt: 'Masso monolitico con anello luminoso immerso in una piscina Rocks Design',
        caption: 'Due massi cinti da un anello di luce, con una cascatella sullo sfondo.',
        tags: ['monoliti', 'notte'],
    },
    {
        slug: 'riflessi-al-tramonto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.12_c0347d2e.jpg',
        alt: 'Riflessi caldi al tramonto su una piscina Rocks Design',
        caption: 'Massi luminosi e cascata al tramonto, riflessi sull’acqua ferma.',
        tags: ['tramonto'],
    },
    {
        slug: 'giardino-tropicale',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.13_6bf6cf67.jpg',
        alt: 'Piscina Rocks Design immersa in un giardino tropicale con palme',
        caption: 'L’acqua arriva a filo della spiaggia; dietro, palme e banani.',
        tags: ['caraibi'],
    },
    {
        slug: 'cascata-e-punto-luce',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.13_8cb94644.jpg',
        alt: 'Cascata e masso illuminato in una piscina Rocks Design',
        caption: 'Il punto luce sta dentro il masso: di sera fa da lampada, di giorno resta una roccia.',
        tags: ['cascate', 'monoliti'],
    },
    {
        slug: 'verde-tropicale-sull-acqua',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.13_8f99bfcb.jpg',
        alt: 'Vegetazione tropicale affacciata su una piscina Rocks Design',
        caption: 'Banani e palme illuminati dal basso sopra la spiaggia, di notte.',
        tags: ['caraibi'],
    },
    {
        slug: 'palme-e-monoliti',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_3d49fbf4.jpg',
        alt: 'Palme e massi monolitici attorno a una piscina Rocks Design',
        caption: 'Un masso lasciato da solo sulla sabbia, tra palme e piante a foglia larga.',
        tags: ['caraibi', 'monoliti'],
    },
    {
        slug: 'monolite-al-tramonto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_49ac44bd.jpg',
        alt: 'Primo piano di un masso monolitico illuminato in una piscina Rocks Design',
        caption: 'Un masso solo, con la fascia di luce: forma e venature sono quelle naturali della pietra.',
        tags: ['monoliti'],
    },
    {
        slug: 'getto-d-acqua',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_9eb7ca9a.jpg',
        alt: 'Getto d’acqua su una piscina Rocks Design con spiaggia in sabbia',
        caption: 'Riva curva in sabbia chiara e ghiaia, vista da dietro un getto d’acqua.',
        tags: ['cascate', 'sabbia'],
    },
    {
        slug: 'acqua-in-movimento',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.14_edcd5853.jpg',
        alt: 'Acqua in movimento in una piscina Rocks Design tra palme e rocce',
        caption: 'Gli spruzzi del getto in primo piano muovono la superficie davanti alla riva.',
        tags: ['cascate'],
    },
    {
        slug: 'idromassaggio-naturale',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.15_864599fa.jpg',
        alt: 'Area idromassaggio di una piscina Rocks Design con acqua turchese',
        caption: 'Getti d’acqua che partono dal deck in legno e sedute ricavate tra i massi, visti dall’alto.',
        tags: ['idromassaggio'],
    },
    {
        slug: 'area-benessere-vista-alto',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.15_f5037eaa.jpg',
        alt: 'Vista dall’alto dell’area idromassaggio di una piscina Rocks Design',
        caption: 'Dall’alto: quattro getti a cascata sotto il deck e massi sommersi su cui sedersi.',
        tags: ['idromassaggio', 'aerea'],
    },
    {
        slug: 'oasi-con-pontile-e-palme',
        file: 'Immagine WhatsApp 2025-11-15 ore 08.37.16_14197f21.jpg',
        alt: 'Piscina Rocks Design con pontile in legno, palme e sabbia bianca',
        caption: 'Passerella in legno sull’acqua, dépendance sul fondo e palme sulla spiaggia bianca.',
        tags: ['caraibi', 'aerea'],
    },
    {
        slug: 'sabbie-naturali-campioni',
        file: 'Immagine WhatsApp 2025-09-18 ore 16.57.33_d58977f4.jpg',
        alt: 'Campioni delle sabbie naturali Rocks Design: Bianco, Giallo e Ticino',
        caption: 'I campioni delle tre sabbie in barattolo: Bianco, Giallo e Ticino.',
        tags: ['sabbia', 'materiali'],
        noWatermark: true,
    },
    {
        slug: 'sabbie-naturali-granulometria',
        file: 'Immagine WhatsApp 2025-09-18 ore 16.57.32_df8c08ee.jpg',
        alt: 'Granulometria a confronto delle sabbie naturali Bianco, Giallo e Ticino',
        caption: 'Le tre sabbie sparse su un foglio per confrontare la grana: Ticino, Giallo e Bianco.',
        tags: ['sabbia', 'materiali'],
        noWatermark: true,
    },
]

export const WIDTHS = [640, 960, 1280, 1920]
export const FALLBACK_WIDTH = 1280
