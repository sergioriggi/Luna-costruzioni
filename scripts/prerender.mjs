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
import { SCHERMO_STRETTO, SCHERMO_LARGO } from '../src/lib/schermi.js'

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

/**
 * Precariche della foto d'apertura, scritte direttamente nel <head>.
 *
 * Senza, il browser scopre l'immagine solo quando legge il <body> — e, per il
 * <picture>, dopo aver valutato la <source>: su telefono era il primo ritardo
 * dell'LCP. Con la precarica parte insieme al CSS.
 *
 * Due <link> con media complementari, uno per variante, con lo stesso srcset
 * e lo stesso sizes (100vw) che usa `Foto.jsx`: il browser ne usa uno solo, e
 * quando poi incontra il <picture> riconosce il file già in arrivo. Mai
 * entrambe le varianti sullo stesso schermo.
 *
 * Perché qui e non in un componente React: un <link rel="preload"> reso da
 * React finiva nel <head> spostato da questo script, ma al client React lo
 * cercava altrove e l'idratazione della home falliva (errore #418). La
 * precarica serve solo all'HTML del primo caricamento: è il suo posto.
 */
const MEDIA = JSON.parse(await fs.readFile(path.join(ROOT, 'src', 'data', 'media.json'), 'utf8'))
const BASE = (process.env.VITE_BASE || '/').replace(/\/$/, '')
const conBase = srcset =>
    srcset
        .split(',')
        .map(voce => {
            const [url, ...resto] = voce.trim().split(/\s+/)
            return [BASE + url, ...resto].join(' ')
        })
        .join(', ')

export function precaricheFoto(slug) {
    const m = MEDIA.find(x => x.slug === slug)
    if (!m) throw new Error(`fotoApertura sconosciuta: ${slug}`)
    const link = (srcset, media) =>
        `<link rel="preload" as="image" type="image/webp"${media ? ` media="${media}"` : ''} imagesrcset="${conBase(srcset)}" imagesizes="100vw" fetchpriority="high">`
    if (!m.verticale) return [link(m.srcset)]
    return [link(m.verticale.srcset, SCHERMO_STRETTO), link(m.srcset, SCHERMO_LARGO)]
}

async function run() {
    // Vite emette il modello con il nome del file di ingresso: `index.html`.
    //
    // Modello e prima destinazione coincidono, quindi l'ordine conta: il
    // template si legge INTERAMENTE IN MEMORIA qui, prima del ciclo. La rotta
    // `/` — la prima dell'elenco — riscrive poi lo stesso file con la home
    // pre-renderizzata. Spostare questa lettura dentro il ciclo, o rileggere
    // il file più avanti, significherebbe usare come modello una pagina già
    // compilata.
    const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8')
    const { render } = await import(SSR)

    for (const rotta of ROTTE) {
        const reso = await render(rotta.percorso)
        const { testa, corpo } = separaTestaCorpo(reso)

        // Le precariche vanno prima del CSS e del JavaScript nel <head>: il
        // browser le mette in coda nell'ordine in cui le legge.
        const precariche = rotta.fotoApertura ? precaricheFoto(rotta.fotoApertura) : []
        let modello = ripulisciTemplate(template, testa)
        if (precariche.length) {
            const primoAsset = modello.search(/<script type="module"|<link rel="(?:stylesheet|modulepreload)"/)
            const dove = primoAsset >= 0 ? primoAsset : modello.indexOf(CHIUSURA_HEAD)
            modello = modello.slice(0, dove) + precariche.join('\n    ') + '\n    ' + modello.slice(dove)
        }
        const html = modello
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

    // Nessun modello da rimuovere: `dist/index.html` è ora la home vera,
    // riscritta dalla rotta `/`.

    console.log(`\n${ROTTE.length} pagine pre-renderizzate in dist/`)
}

run().catch(err => { console.error(err); process.exit(1) })
