/**
 * La guida: articoli che rispondono alle domande vere di chi cerca una piscina
 * in Sicilia, scelti dai dati di Search Console e non a calendario.
 *
 * ── COME SI AGGIUNGE UN ARTICOLO ─────────────────────────────────────────
 * 1. Un file `src/data/guida/<slug>.js` che esporta per default un oggetto
 *    con la forma descritta in `scripts/verifica-guida.mjs` (il nome del file
 *    È lo slug, e la verifica lo controlla).
 * 2. Una riga di import qui sotto e il nome in `ARTICOLI`.
 * 3. `npm run verifica:guida`, poi la build completa e `npm run verifica`.
 *
 * Tutto il resto segue da solo: rotta, pre-rendering, sitemap, llms.txt,
 * indice della guida e collegamento nel piè di pagina. Finché `ARTICOLI` è
 * vuoto la sezione non esiste da nessuna parte: niente pagina indice vuota,
 * niente voce di menù che porta al nulla.
 *
 * ── CHE COSA UN ARTICOLO NON PUÒ DIRE ────────────────────────────────────
 * Le stesse regole del resto del sito, controllate dalla verifica:
 * Luna non ha ancora consegnato piscine in Sicilia; le foto sono piscine
 * espositive della casa madre in Lombardia; nessun invito a visitare sedi o
 * piscine; il prezzo è solo `PREZZO` da `src/data/site.js`; ogni altra cifra
 * in euro va dichiarata con la sua fonte.
 */

const ARTICOLI = []

/** Dal più recente. A parità di data, l'ordine di `ARTICOLI`. */
export const GUIDA = ARTICOLI.map((a, i) => [a, i])
    .sort(([a, i], [b, j]) => b.pubblicato.localeCompare(a.pubblicato) || i - j)
    .map(([a]) => a)

export const PERCORSO_GUIDA = '/guida'

export const percorsoArticolo = articolo => `${PERCORSO_GUIDA}/${articolo.slug}`
