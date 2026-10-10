/** Elenco delle rotte pubbliche: alimenta prerender, sitemap e controlli. */
import { MODELLI } from '../src/data/content.js'
import { GUIDA, PERCORSO_GUIDA, percorsoArticolo } from '../src/data/guida/index.js'

/**
 * La guida esiste solo se ha almeno un articolo: un indice vuoto sarebbe una
 * pagina sottile nella sitemap, e un collegamento verso il nulla.
 */
const ROTTE_GUIDA = GUIDA.length
    ? [
          { percorso: PERCORSO_GUIDA, priorita: 0.7, frequenza: 'weekly' },
          ...GUIDA.map(a => ({ percorso: percorsoArticolo(a), priorita: 0.7, frequenza: 'monthly' })),
      ]
    : []

export const ROTTE = [
    // `fotoApertura`: la foto dell'eroe, che prerender.mjs precarica nel <head>.
    { percorso: '/', priorita: 1.0, frequenza: 'monthly', fotoApertura: 'villa-con-spiaggia-in-ghiaia' },
    { percorso: '/piscine-rocks-design', priorita: 0.9, frequenza: 'monthly' },
    { percorso: '/azienda', priorita: 0.7, frequenza: 'yearly' },
    { percorso: '/modelli', priorita: 0.9, frequenza: 'monthly' },
    ...MODELLI.map(m => ({ percorso: `/modelli/${m.slug}`, priorita: 0.9, frequenza: 'monthly' })),
    { percorso: '/sabbie', priorita: 0.8, frequenza: 'monthly' },
    { percorso: '/giardini-e-opere-in-pietra', priorita: 0.8, frequenza: 'monthly' },
    { percorso: '/hotel-e-resort', priorita: 0.9, frequenza: 'monthly' },
    { percorso: '/quanto-costa', priorita: 0.9, frequenza: 'monthly' },
    { percorso: '/piscina-in-cemento-o-rocks-design', priorita: 0.9, frequenza: 'monthly' },
    { percorso: '/galleria', priorita: 0.8, frequenza: 'monthly' },
    { percorso: '/come-lavoriamo', priorita: 0.7, frequenza: 'yearly' },
    { percorso: '/domande-frequenti', priorita: 0.7, frequenza: 'monthly' },
    { percorso: '/contatti', priorita: 0.9, frequenza: 'yearly' },
    // Una pagina per tutta l'isola, con una sezione per provincia. Le nove
    // pagine provinciali di prima rispondono 301 verso la loro ancora.
    { percorso: '/piscine-rocks-design/sicilia', priorita: 0.8, frequenza: 'monthly' },
    ...ROTTE_GUIDA,
    // Conferma dopo l'invio del modulo: fuori dalla sitemap e noindex, non è
    // una pagina da far trovare su Google. Serve come indirizzo di conversione.
    { percorso: '/grazie', priorita: 0.0, frequenza: 'yearly', esclusaDaSitemap: true },
    // Le note legali restano fuori dalla sitemap DI PROPOSITO (decisione del
    // 1° ottobre 2026). Le pagine escono `noindex`, e robots.txt le lascia
    // leggere perché quel `noindex` si veda. Una sitemap che le elencasse
    // direbbe ai motori «indicizzate questa» e la pagina stessa «no» — Search
    // Console lo segnala come errore. La regola è
    // una sola: una rotta sta nella sitemap se e solo se è indicizzabile, e
    // `npm run verifica` la controlla in entrambi i versi.
    { percorso: '/privacy', priorita: 0.1, frequenza: 'yearly', esclusaDaSitemap: true },
    { percorso: '/cookie-policy', priorita: 0.1, frequenza: 'yearly', esclusaDaSitemap: true },
    { percorso: '/404', priorita: 0.0, frequenza: 'yearly', esclusaDaSitemap: true },
]
