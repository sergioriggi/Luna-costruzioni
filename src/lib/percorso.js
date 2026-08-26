/**
 * Percorsi pubblici consapevoli del `base` di Vite.
 *
 * Il sito può essere servito dalla radice di un dominio proprio
 * (https://www.lunacostruzioni.it/) oppure da una sottocartella, come accade
 * con GitHub Pages di progetto (https://utente.github.io/Luna-costruzioni/).
 * Ogni riferimento a un file di `public/` passa da qui.
 */
const BASE = import.meta.env.BASE_URL || '/'

export function pubblico(percorso) {
    if (!percorso) return percorso
    // I data URI e gli indirizzi assoluti restano intatti
    if (/^(data:|https?:|\/\/)/.test(percorso)) return percorso
    return BASE.replace(/\/$/, '') + '/' + percorso.replace(/^\//, '')
}

/** Come `pubblico`, ma applicata a un srcset completo. */
export function pubblicoSrcset(srcset) {
    return srcset
        .split(',')
        .map(voce => {
            const [url, ...resto] = voce.trim().split(/\s+/)
            return [pubblico(url), ...resto].join(' ')
        })
        .join(', ')
}

export const BASE_URL = BASE
