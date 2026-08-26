/**
 * Pre-rendering statico.
 *
 * Ogni rotta viene renderizzata in HTML completo (titoli, meta, JSON-LD,
 * testi) e scritta in dist/<rotta>/index.html. Il sito resta una SPA React,
 * ma i motori di ricerca e le anteprime social ricevono markup reale,
 * senza dipendere dall'esecuzione di JavaScript.
 *
 *   npm run build   →  vite build && vite build --ssr && node scripts/prerender.mjs
 */
import fs from 'fs/promises'
import path from 'path'
import { ROTTE } from './rotte.mjs'

const ROOT = path.resolve('.')
const DIST = path.join(ROOT, 'dist')
const SSR = path.join(ROOT, 'dist-ssr', 'entry-server.js')

const SEGNAPOSTO = '<!--app-html-->'
const CHIUSURA_HEAD = '</head>'

/**
 * React 19 tratta <title>, <meta> e <link> come tag "sollevabili": in fase di
 * idratazione li cerca nel <head>, non nel punto in cui compaiono nel markup.
 * Qui li spostiamo lì, replicando il comportamento del client.
 *
 * I blocchi JSON-LD restano invece dove React li rende (nel corpo): <script>
 * non è un tag sollevabile e spostarlo romperebbe l'idratazione. Google legge
 * i dati strutturati indifferentemente da <head> o da <body>.
 */
const TAG_DI_TESTA = [
    /<title>[\s\S]*?<\/title>/gi,
    /<meta\b[^>]*>/gi,
    /<link\b[^>]*>/gi,
]

function separaTestaCorpo(html) {
    const testa = []
    let corpo = html
    for (const espressione of TAG_DI_TESTA) {
        corpo = corpo.replace(espressione, tag => {
            testa.push(tag)
            return ''
        })
    }
    return { testa, corpo }
}

/** Rimuove dal template i tag che la pagina ridefinisce (title, description). */
function ripulisciTemplate(template, testa) {
    let out = template
    if (testa.some(t => /^<title/i.test(t))) out = out.replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    if (testa.some(t => /name="description"/i.test(t))) {
        out = out.replace(/\s*<meta\s+name="description"[\s\S]*?>/i, '')
    }
    return out
}

async function run() {
    // Vite emette il modello con il nome del file di ingresso
    const template = await fs.readFile(path.join(DIST, 'sorgente.html'), 'utf8')
    const { render } = await import(SSR)

    for (const rotta of ROTTE) {
        const reso = render(rotta.percorso)
        const { testa, corpo } = separaTestaCorpo(reso)

        const html = ripulisciTemplate(template, testa)
            .replace(CHIUSURA_HEAD, `  ${testa.join('\n    ')}\n  ${CHIUSURA_HEAD}`)
            .replace(SEGNAPOSTO, corpo)

        const destinazione =
            rotta.percorso === '/'
                ? path.join(DIST, 'index.html')
                : path.join(DIST, rotta.percorso.replace(/^\//, ''), 'index.html')

        await fs.mkdir(path.dirname(destinazione), { recursive: true })
        await fs.writeFile(destinazione, html)
        console.log('✓', rotta.percorso)
    }

    // 404 servito dalle piattaforme statiche e da Apache (ErrorDocument)
    await fs.copyFile(path.join(DIST, '404', 'index.html'), path.join(DIST, '404.html'))

    // Il modello non fa parte del sito pubblicato
    await fs.rm(path.join(DIST, 'sorgente.html'), { force: true })

    console.log(`\n${ROTTE.length} pagine pre-renderizzate in dist/`)
}

run().catch(err => { console.error(err); process.exit(1) })
