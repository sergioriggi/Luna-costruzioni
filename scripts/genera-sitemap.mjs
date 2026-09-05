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

Sitemap: ${SITE_URL}/sitemap.xml
`

await fs.mkdir(DIST, { recursive: true })
await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(DIST, 'robots.txt'), robots)
console.log(`✓ sitemap.xml (${voci.length} URL) e robots.txt${ANTEPRIMA ? ' — anteprima: robots chiude tutto' : ''}`)
