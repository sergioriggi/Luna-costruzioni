/**
 * Il poco markup ammesso nei testi della guida, e nient'altro.
 *
 *   **grassetto**
 *   [testo del collegamento](/percorso-interno)
 *   [testo del collegamento](https://fonte-esterna.it/pagina)
 *
 * Perché non Markdown completo: gli articoli li scrive anche un'automazione,
 * e ogni costrutto in più è un modo in più di pubblicare qualcosa di rotto.
 * Con due soli costrutti `scripts/verifica-guida.mjs` può controllare tutto:
 * che ogni collegamento interno porti a una pagina che esiste, che non resti
 * un `**` spaiato, che le fonti esterne siano https.
 *
 * Modulo senza React di proposito: lo usano sia la pagina (`TestoRicco`)
 * sia gli script di Node che verificano e descrivono gli articoli.
 */

const SEGNO = /\*\*([^*]+?)\*\*|\[([^\]\n]+?)\]\(([^)\s]+)\)/g

/** `testo` → `[{ tipo: 'testo'|'grassetto'|'link', testo, href? }]` */
export function scomponi(testo) {
    const pezzi = []
    let ultimo = 0
    for (const m of String(testo).matchAll(SEGNO)) {
        if (m.index > ultimo) pezzi.push({ tipo: 'testo', testo: testo.slice(ultimo, m.index) })
        if (m[1] !== undefined) pezzi.push({ tipo: 'grassetto', testo: m[1] })
        else pezzi.push({ tipo: 'link', testo: m[2], href: m[3] })
        ultimo = m.index + m[0].length
    }
    if (ultimo < testo.length) pezzi.push({ tipo: 'testo', testo: testo.slice(ultimo) })
    return pezzi
}

/** Il testo senza markup: per JSON-LD, llms.txt e il conteggio delle parole. */
export function testoPiano(testo) {
    return scomponi(testo)
        .map(p => p.testo)
        .join('')
}

/** `true` per i collegamenti che restano dentro il sito. */
export const interno = href => href.startsWith('/')
