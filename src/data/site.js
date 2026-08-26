/**
 * Dati aziendali e costanti di sito.
 * Unica fonte di verità per NAP (Name, Address, Phone), rotte e SEO locale.
 */

/** Dominio definitivo, quello a cui il sito punterà a regime. */
export const DOMINIO_DEFINITIVO = 'https://www.lunacostruzioni.it'

/**
 * Indirizzo pubblico del sito: alimenta canonical, Open Graph e sitemap.
 * Si imposta con VITE_SITE_URL, così l'anteprima su hosting temporaneo
 * dichiara il proprio indirizzo invece di uno che non risponde ancora.
 */
const indirizzoDaAmbiente =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
    (typeof process !== 'undefined' && process.env && process.env.VITE_SITE_URL) ||
    ''

/**
 * L'indirizzo *dichiarato*, distinto da quello di ripiego. La differenza non è
 * cosmetica: è ciò che permette di distinguere «non è stato configurato» da
 * «è stato configurato con il dominio definitivo».
 */
export const INDIRIZZO_DICHIARATO = indirizzoDaAmbiente.replace(/\/+$/, '')

export const SITE_URL = INDIRIZZO_DICHIARATO || DOMINIO_DEFINITIVO

/**
 * Finché il sito vive su un indirizzo provvisorio è un'anteprima: va tenuto
 * fuori dai motori di ricerca, altrimenti l'indirizzo temporaneo finisce
 * indicizzato e poi compete con il dominio vero.
 *
 * ATTENZIONE AL VERSO. Il sito è considerato di produzione **solo** se
 * VITE_SITE_URL è stata dichiarata e vale esattamente il dominio definitivo.
 * Se la variabile manca, si assume l'anteprima.
 *
 * Prima era il contrario, e il difetto si è visto in produzione: Hostinger
 * compila il progetto da sé, senza quella variabile, e il sito ripiegava sul
 * dominio definitivo — quindi si dichiarava sito vero, usciva senza `noindex`
 * e metteva come canonical un dominio che non rispondeva ancora.
 *
 * Una configurazione mancante non può significare «sono il sito di produzione».
 * Nel dubbio, il sito sta fuori dai motori di ricerca: è l'errore reversibile.
 */
export const ANTEPRIMA = INDIRIZZO_DICHIARATO !== DOMINIO_DEFINITIVO

export const AZIENDA = {
    nome: 'Luna Costruzioni srl',
    nomeBreve: 'Luna Costruzioni',
    /** Che cosa fa l'azienda: viene prima del marchio del prodotto. */
    attivita: 'Piscine e opere in pietra in Sicilia',
    ruolo: 'Concessionario Autorizzato Piscine Rocks Design',
    zona: 'Sicilia',
    referente: 'Luciano Naro',
    telefono: '+39 340 490 0710',
    telefonoRaw: '+393404900710',
    whatsapp: '393404900710',
    email: 'info@lunacostruzioni.it',
    piva: '',
    provinciaSede: 'Sicilia',
    /** Anno del copyright: costante, così il markup statico e quello
        idratato coincidono anche a cavallo di capodanno. */
    annoRiferimento: 2026,
}

/** Sito ufficiale della casa madre: il logo concessionario deve linkare qui. */
export const ROCKS_DESIGN = {
    nome: 'Piscine Rocks Design',
    sito: 'https://www.piscinerocksdesign.com',
    instagram: 'https://www.instagram.com/piscinerocksdesign',
    tag: '@piscinerocksdesign',
    email: 'info@rocksgardens.it',
}

export const SOCIAL = [
    { nome: 'Facebook', url: 'https://www.facebook.com/piscinerocksdesign' },
    { nome: 'Instagram', url: ROCKS_DESIGN.instagram },
]

/**
 * Province servite: alimentano le pagine locali e lo schema areaServed.
 * «Aggiungi sempre la tua città»: ogni pagina ripete la zona di riferimento.
 */
export const PROVINCE = [
    {
        slug: 'palermo',
        nome: 'Palermo',
        sigla: 'PA',
        intro:
            'Dalla costa di Mondello alle ville dell’entroterra palermitano, una Piscina Rocks Design trasforma il giardino in una spiaggia privata, senza cemento e senza il cantiere infinito di una piscina tradizionale.',
        localita: ['Mondello', 'Bagheria', 'Cefalù', 'Carini', 'Monreale', 'Termini Imerese'],
    },
    {
        slug: 'catania',
        nome: 'Catania',
        sigla: 'CT',
        intro:
            'Tra l’Etna e il mare Ionio, le rocce monolitiche delle Piscine Rocks Design dialogano naturalmente con la pietra lavica del paesaggio catanese.',
        localita: ['Aci Castello', 'Acireale', 'Mascalucia', 'Giarre', 'Caltagirone', 'Bronte'],
    },
    {
        slug: 'messina',
        nome: 'Messina',
        sigla: 'ME',
        intro:
            'Dalle colline dei Nebrodi alle ville affacciate sullo Stretto, realizziamo Piscine Rocks Design che seguono la pendenza naturale del terreno.',
        localita: ['Taormina', 'Milazzo', 'Barcellona Pozzo di Gotto', 'Sant’Agata di Militello', 'Capo d’Orlando'],
    },
    {
        slug: 'siracusa',
        nome: 'Siracusa',
        sigla: 'SR',
        intro:
            'Nel barocco del Val di Noto una Piscina Rocks Design si inserisce senza stonare: pietra, sabbia e acqua, gli stessi materiali del paesaggio ibleo.',
        localita: ['Noto', 'Avola', 'Augusta', 'Floridia', 'Marzamemi'],
    },
    {
        slug: 'ragusa',
        nome: 'Ragusa',
        sigla: 'RG',
        intro:
            'Masserie, ville di campagna e resort del ragusano: la Piscina Rocks Design è la scelta di chi vuole un’oasi che sembri lì da sempre.',
        localita: ['Modica', 'Scicli', 'Marina di Ragusa', 'Vittoria', 'Comiso'],
    },
    {
        slug: 'trapani',
        nome: 'Trapani',
        sigla: 'TP',
        intro:
            'Dal sale di Marsala alle alture di Erice, portiamo in provincia di Trapani piscine in Tecnologia Rocks Design con spiaggia in sabbia naturale.',
        localita: ['Marsala', 'Erice', 'Mazara del Vallo', 'Alcamo', 'Castellammare del Golfo'],
    },
    {
        slug: 'agrigento',
        nome: 'Agrigento',
        sigla: 'AG',
        intro:
            'Il bianco della Scala dei Turchi ispira le sabbie naturali delle Piscine Rocks Design che realizziamo nell’agrigentino.',
        localita: ['Sciacca', 'Licata', 'Favara', 'Realmonte', 'Menfi'],
    },
    {
        slug: 'caltanissetta',
        nome: 'Caltanissetta',
        sigla: 'CL',
        intro:
            'Nel cuore della Sicilia, dove l’estate è lunga, una Piscina Rocks Design è un investimento che si gode da aprile a ottobre.',
        localita: ['Gela', 'Niscemi', 'San Cataldo', 'Mazzarino'],
    },
    {
        slug: 'enna',
        nome: 'Enna',
        sigla: 'EN',
        intro:
            'Tra i borghi e le campagne ennesi realizziamo Piscine Rocks Design che rispettano il terreno: nessuna opera in cemento armato.',
        localita: ['Piazza Armerina', 'Nicosia', 'Leonforte', 'Aidone'],
    },
]

/**
 * Navigazione principale, come nel blueprint approvato.
 * `labelEn` alimenta il cambio di lingua.
 */
export const NAV = [
    { to: '/piscine-rocks-design', label: 'Piscine', labelEn: 'Pools' },
    { to: '/come-lavoriamo', label: 'Chiavi in mano', labelEn: 'Turnkey' },
    { to: '/galleria', label: 'Realizzazioni', labelEn: 'Projects' },
    { to: '/hotel-e-resort', label: 'Hotel e resort', labelEn: 'Hotels' },
    { to: '/domande-frequenti', label: 'FAQ', labelEn: 'FAQ' },
    { to: '/azienda', label: 'Sicilia', labelEn: 'Sicily' },
    { to: '/contatti', label: 'Contatti', labelEn: 'Contact' },
]

/** Voci secondarie, presenti nel piè di pagina. */
export const NAV_SECONDARIA = [
    { to: '/modelli', label: 'I modelli', labelEn: 'Models' },
    { to: '/sabbie', label: 'Le sabbie', labelEn: 'Sands' },
    { to: '/giardini-e-opere-in-pietra', label: 'Giardini e opere in pietra', labelEn: 'Gardens and stonework' },
    { to: '/quanto-costa', label: 'Quanto costa', labelEn: 'Costs' },
    { to: '/showroom', label: 'Showroom', labelEn: 'Showroom' },
]
