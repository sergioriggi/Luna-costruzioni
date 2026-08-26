/** Elenco delle rotte pubbliche: alimenta prerender, sitemap e controlli. */
import { PROVINCE } from '../src/data/site.js'
import { MODELLI } from '../src/data/content.js'

export const ROTTE = [
    { percorso: '/', priorita: 1.0, frequenza: 'monthly' },
    { percorso: '/piscine-rocks-design', priorita: 0.9, frequenza: 'monthly' },
    { percorso: '/azienda', priorita: 0.7, frequenza: 'yearly' },
    { percorso: '/modelli', priorita: 0.9, frequenza: 'monthly' },
    ...MODELLI.map(m => ({ percorso: `/modelli/${m.slug}`, priorita: 0.9, frequenza: 'monthly' })),
    { percorso: '/sabbie', priorita: 0.8, frequenza: 'monthly' },
    { percorso: '/giardini-e-opere-in-pietra', priorita: 0.8, frequenza: 'monthly' },
    { percorso: '/hotel-e-resort', priorita: 0.9, frequenza: 'monthly' },
    { percorso: '/quanto-costa', priorita: 0.9, frequenza: 'monthly' },
    { percorso: '/galleria', priorita: 0.8, frequenza: 'monthly' },
    { percorso: '/showroom', priorita: 0.8, frequenza: 'monthly' },
    { percorso: '/come-lavoriamo', priorita: 0.7, frequenza: 'yearly' },
    { percorso: '/domande-frequenti', priorita: 0.7, frequenza: 'monthly' },
    { percorso: '/contatti', priorita: 0.9, frequenza: 'yearly' },
    ...PROVINCE.map(p => ({
        percorso: `/piscine-rocks-design/${p.slug}`,
        priorita: 0.8,
        frequenza: 'monthly',
    })),
    { percorso: '/privacy', priorita: 0.1, frequenza: 'yearly', esclusaDaSitemap: true },
    { percorso: '/cookie-policy', priorita: 0.1, frequenza: 'yearly', esclusaDaSitemap: true },
    { percorso: '/404', priorita: 0.0, frequenza: 'yearly', esclusaDaSitemap: true },
]
