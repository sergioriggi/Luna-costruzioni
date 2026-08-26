/**
 * Scarica Inter da Google Fonts e li salva in
 * public/fonts, generando src/fonts.css con i @font-face locali.
 *
 * Servire i font dal proprio dominio evita richieste a server terzi
 * (nessun trasferimento di IP verso Google, rilevante ai fini GDPR)
 * e migliora il tempo di primo rendering.
 *
 * I file finiscono in `src/fonts-woff2` e non in `public/`: così Vite li
 * include nel bundle con l'hash del contenuto e con il `base` corretto,
 * qualunque sia la cartella da cui il sito viene servito.
 *
 *   npm run fonts
 */
import fs from 'fs/promises'
import path from 'path'

const CSS_URL =
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
const OUT_FONT = path.resolve('./src/fonts-woff2')
const OUT_CSS = path.resolve('./src/fonts.css')

// solo i sottoinsiemi utili all'italiano
const SOTTOINSIEMI = ['latin', 'latin-ext']

const risposta = await fetch(CSS_URL, { headers: { 'User-Agent': UA } })
if (!risposta.ok) throw new Error(`Google Fonts ha risposto ${risposta.status}`)
const css = await risposta.text()

await fs.mkdir(OUT_FONT, { recursive: true })

const blocchi = css.split('/*').slice(1)
const regole = []

for (const blocco of blocchi) {
    const sottoinsieme = blocco.slice(0, blocco.indexOf('*/')).trim()
    if (!SOTTOINSIEMI.includes(sottoinsieme)) continue

    const famiglia = /font-family: '([^']+)'/.exec(blocco)?.[1]
    const peso = /font-weight: (\d+)/.exec(blocco)?.[1]
    const url = /src: url\(([^)]+)\)/.exec(blocco)?.[1]
    const intervallo = /unicode-range: ([^;]+);/.exec(blocco)?.[1]
    if (!famiglia || !url) continue

    const nomeFile = `${famiglia.toLowerCase()}-${peso ?? '400'}-${sottoinsieme}.woff2`
    const binario = await fetch(url, { headers: { 'User-Agent': UA } })
    await fs.writeFile(path.join(OUT_FONT, nomeFile), Buffer.from(await binario.arrayBuffer()))

    regole.push(`@font-face {
    font-family: '${famiglia}';
    font-style: normal;
    font-weight: ${peso ?? 400};
    font-display: swap;
    src: url('./fonts-woff2/${nomeFile}') format('woff2');
    unicode-range: ${intervallo};
}`)
    console.log('✓', nomeFile)
}

await fs.writeFile(OUT_CSS, `/* Generato da scripts/scarica-font.mjs — non modificare a mano. */\n\n${regole.join('\n\n')}\n`)
console.log(`\n${regole.length} @font-face scritti in src/fonts.css`)
