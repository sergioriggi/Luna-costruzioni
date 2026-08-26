/**
 * Dati aziendali e costanti di sito.
 * Unica fonte di verità per NAP (Name, Address, Phone), rotte e SEO locale.
 */

export const SITE_URL = 'https://www.lunacostruzioni.it'

export const AZIENDA = {
    nome: 'Luna Costruzioni srl',
    ruolo: 'Concessionario Autorizzato Piscine Rocks Design',
    zona: 'Sicilia',
    referente: 'Luciano Naro',
    telefono: '+39 340 490 0710',
    telefonoRaw: '+393404900710',
    whatsapp: '393404900710',
    email: 'info@lunacostruzioni.it',
    piva: '',
    provinciaSede: 'Sicilia',
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

export const NAV = [
    { to: '/', label: 'Home' },
    { to: '/piscine-rocks-design', label: 'La tecnologia' },
    { to: '/modelli', label: 'Modelli' },
    { to: '/galleria', label: 'Galleria' },
    { to: '/showroom', label: 'Showroom' },
    { to: '/domande-frequenti', label: 'FAQ' },
    { to: '/contatti', label: 'Contatti' },
]
