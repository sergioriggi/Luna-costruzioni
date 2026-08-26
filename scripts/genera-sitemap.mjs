/** Genera dist/sitemap.xml e dist/robots.txt dalle rotte pubbliche. */
import fs from 'fs/promises'
import path from 'path'
import { ROTTE } from './rotte.mjs'
import { SITE_URL } from '../src/data/site.js'

const DIST = path.resolve('./dist')
const oggi = new Date().toISOString().slice(0, 10)

const voci = ROTTE.filter(r => !r.esclusaDaSitemap)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${voci
    .map(
        r => `  <url>
    <loc>${SITE_URL}${r.percorso === '/' ? '/' : r.percorso}</loc>
    <lastmod>${oggi}</lastmod>
    <changefreq>${r.frequenza}</changefreq>
    <priority>${r.priorita.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /
Disallow: /privacy
Disallow: /cookie-policy

Sitemap: ${SITE_URL}/sitemap.xml
`

await fs.mkdir(DIST, { recursive: true })
await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(DIST, 'robots.txt'), robots)
console.log(`✓ sitemap.xml (${voci.length} URL) e robots.txt`)
