/** Genera dist/sitemap.xml e dist/robots.txt dalle rotte pubbliche. */
import fs from 'fs/promises'
import path from 'path'
import { ROTTE } from './rotte.mjs'
import { SITE_URL, ANTEPRIMA } from '../src/data/site.js'

const DIST = path.resolve('./dist')

/**
 * `lastmod` va omesso, non inventato.
 *
 * Prima ci finiva la data della compilazione, uguale per tutte e 25 le voci:
 * a ogni pubblicazione il sito dichiarava che *ogni* pagina era cambiata. È
 * un segnale che i motori imparano in fretta a ignorare, e quando una pagina
 * cambia davvero non lo crede più nessuno.
 *
 * La data vera per rotta si ricaverebbe dal commit che ha toccato l'ultima
 * volta i file che la compongono, ma una rotta nasce da parecchi file — dati,
 * componenti, contenuti condivisi — e la corrispondenza sarebbe comunque
 * approssimativa. Meglio nessuna dichiarazione che una falsa: `lastmod` è
 * facoltativo, e i motori sanno benissimo datare le pagine da soli.
 */
const voci = ROTTE.filter(r => !r.esclusaDaSitemap)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${voci
    .map(
        r => `  <url>
    <loc>${SITE_URL}${r.percorso === '/' ? '/' : r.percorso}</loc>
    <changefreq>${r.frequenza}</changefreq>
    <priority>${r.priorita.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n')}
</urlset>
`

/**
 * Gli assistenti conversazionali, dichiarati per nome.
 *
 * Il gruppo `User-agent: *` qui sopra già li ammetterebbe tutti: nominarli
 * serve a rendere la scelta esplicita e a non subirla per distrazione il
 * giorno in cui qualcuno stringesse la regola generale. Il sito vuole essere
 * *citato* nelle risposte, non solo indicizzato, e finora non lo diceva.
 *
 * Due avvertenze, perché il file non prometta più di quello che fa:
 *
 * - `Google-Extended` e `Applebot-Extended` NON sono crawler. Sono token di
 *   rinuncia all'addestramento: ammetterli non cambia di una virgola la
 *   scansione, dichiara soltanto che non ci opponiamo all'uso dei contenuti.
 *   Innocuo e coerente con il resto, ma non è ciò che porta citazioni.
 * - `LLM-Content:` NON è una direttiva standard di robots.txt. Oggi non la
 *   legge nessun crawler; le righe sconosciute vengono ignorate, quindi non
 *   rompe niente. Sta qui perché costa zero ed è un'ipotesi ragionevole sul
 *   futuro — ma è una scommessa, non un meccanismo. Chi la ritrova fra un
 *   anno deve sapere che non ha mai fatto nulla di misurabile: il file
 *   `llms.txt` si fa trovare perché è linkato e perché sta all'indirizzo
 *   convenzionale, non per questa riga.
 *
 * Le due pagine legali restano escluse anche qui: non aggiungono nulla a chi
 * cerca di capire che cosa facciamo, e un assistente che le citasse al posto
 * di una pagina di prodotto sprecherebbe la risposta.
 */
const ASSISTENTI = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'Bingbot',
    'CCBot',
    'Amazonbot',
    'meta-externalagent',
    'Bytespider',
]

const GRUPPO_ASSISTENTI = `# Assistenti conversazionali: ammessi di proposito.
${ASSISTENTI.map(a => `User-agent: ${a}`).join('\n')}
Allow: /
Disallow: /privacy
Disallow: /cookie-policy
`

// Su indirizzo provvisorio il sito resta fuori dai motori di ricerca
const robots = ANTEPRIMA
    ? `# Anteprima su indirizzo provvisorio: non indicizzare.
User-agent: *
Disallow: /
`
    : `User-agent: *
Allow: /
Disallow: /privacy
Disallow: /cookie-policy

${GRUPPO_ASSISTENTI}
Sitemap: ${SITE_URL}/sitemap.xml
LLM-Content: ${SITE_URL}/llms.txt
`

await fs.mkdir(DIST, { recursive: true })
await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(DIST, 'robots.txt'), robots)
console.log(`✓ sitemap.xml (${voci.length} URL) e robots.txt${ANTEPRIMA ? ' — anteprima: robots chiude tutto' : ''}`)
