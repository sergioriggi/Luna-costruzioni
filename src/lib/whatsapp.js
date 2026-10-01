import { AZIENDA, NAV, NAV_SECONDARIA, PROVINCE } from '../data/site'
import { MODELLI } from '../data/modelli'

/**
 * Il link di WhatsApp, costruito in un posto solo.
 *
 * Il numero sta in `AZIENDA.whatsapp` e da nessun'altra parte: scriverlo a mano
 * in un componente significa che il giorno che Luciano cambia numero un tasto
 * resta indietro, e nessuno se ne accorge finché un cliente non scrive a uno
 * sconosciuto.
 *
 * Il messaggio precompilato non è cortesia: finché `info@lunacostruzioni.it`
 * non esiste, WhatsApp e il telefono sono gli unici canali che consegnano
 * davvero un contatto. Dire da quale pagina arriva il cliente trasforma un
 * «Ciao» in una richiesta a cui si può rispondere.
 */

/**
 * Come si chiama la pagina, nel messaggio.
 *
 * Le etichette si prendono da `NAV`, `NAV_SECONDARIA`, `PROVINCE` e `MODELLI`,
 * che sono già la sorgente unica dei nomi: un secondo elenco qui divergerebbe
 * al primo rinomino. Le poche voci di menù che come frase suonano male hanno
 * un'eccezione dichiarata qui sotto — «vi scrivo dalla pagina Sicilia» non
 * vuol dire niente.
 */
const ECCEZIONI = {
    '/': '', // la pagina iniziale non aggiunge informazione: messaggio generico
    '/azienda': 'L’azienda',
    '/piscine-rocks-design': 'Piscine Rocks Design',
    '/galleria': 'Galleria',
}

/**
 * `ancora` è il frammento dell'indirizzo, con o senza `#`: sulla pagina
 * Sicilia dice da quale provincia arriva il cliente (`#enna` → «Sicilia —
 * Enna»). Si accettano anche i nove indirizzi provinciali di prima, che il
 * server ridirige ma che possono ancora circolare in vecchi link.
 */
export function etichettaPagina(percorso = '', ancora = '') {
    const pulito = percorso.replace(/\/+$/, '') || '/'
    if (pulito in ECCEZIONI) return ECCEZIONI[pulito]

    if (pulito === '/piscine-rocks-design/sicilia') {
        const slug = String(ancora).replace(/^#/, '')
        const provincia = PROVINCE.find(p => p.slug === slug)
        return provincia ? `Sicilia — ${provincia.nome}` : 'Sicilia'
    }

    const vecchia = PROVINCE.find(p => pulito === `/piscine-rocks-design/${p.slug}`)
    if (vecchia) return `Sicilia — ${vecchia.nome}`

    const modello = MODELLI.find(m => pulito === `/modelli/${m.slug}`)
    if (modello) return modello.nomeCompleto ?? modello.nome

    return [...NAV, ...NAV_SECONDARIA].find(v => v.to === pulito)?.label ?? ''
}

/** Indirizzo di WhatsApp con il messaggio già scritto. */
export function linkWhatsApp(pagina = '') {
    const testo = pagina
        ? `Buongiorno, vi scrivo dalla pagina «${pagina}» del sito: vorrei informazioni su una Piscina Rocks Design.`
        : 'Buongiorno, vorrei informazioni su una Piscina Rocks Design.'
    return `https://wa.me/${AZIENDA.whatsapp}?text=${encodeURIComponent(testo)}`
}
