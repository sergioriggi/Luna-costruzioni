/**
 * Verifica di conformità alle direttive del dipartimento marketing
 * Piscine Rocks Design. Va eseguita sul sito compilato:
 *
 *   npm run build && npm run verifica
 *
 * Controlla che:
 *  1. il logo «Concessionario Autorizzato Piscine Rocks Design» sia presente
 *     nella fascia superiore di ogni pagina e linki al sito ufficiale;
 *  2. la dicitura «piscina naturale» non compaia mai da sola (la direttiva
 *     chiede di puntare esclusivamente sul nome «Piscine Rocks Design»);
 *  3. il sito non serva i file sorgente non filigranati né il catalogo,
 *     che contiene immagini delle fasi di costruzione;
 *  4. ogni fotografia pubblicata provenga dalla whitelist e porti la
 *     filigrana «Piscine Rocks Design»;
 *  5. ogni pagina indicizzabile dichiari la zona di riferimento (SEO locale).
 */
import fs from 'fs/promises'
import path from 'path'
import { PHOTOS } from './media.config.mjs'
import { ROCKS_DESIGN, AZIENDA } from '../src/data/site.js'

const DIST = path.resolve('./dist')
const errori = []
const avvisi = []

async function paginePubblicate(dir = DIST, trovate = []) {
    for (const voce of await fs.readdir(dir, { withFileTypes: true })) {
        const completo = path.join(dir, voce.name)
        if (voce.isDirectory()) await paginePubblicate(completo, trovate)
        else if (voce.name.endsWith('.html')) trovate.push(completo)
    }
    return trovate
}

const pagine = await paginePubblicate()
if (pagine.length === 0) errori.push('Nessuna pagina in dist/: eseguire prima `npm run build`.')

for (const file of pagine) {
    const rel = path.relative(DIST, file)
    const html = await fs.readFile(file, 'utf8')
    const testa = html.slice(0, html.indexOf('</header>') + 9)

    // 1. logo concessionario nella fascia superiore, con link ufficiale
    if (!testa.includes('/brand/rocks-design-logo.png')) {
        errori.push(`${rel}: manca il logo Piscine Rocks Design nella fascia superiore.`)
    }
    if (!testa.includes(ROCKS_DESIGN.sito)) {
        errori.push(`${rel}: il logo concessionario non linka a ${ROCKS_DESIGN.sito}.`)
    }
    if (!html.includes('Concessionario') && !html.includes('concessionario')) {
        errori.push(`${rel}: non è dichiarato il ruolo di concessionario autorizzato.`)
    }

    // 2. «piscina naturale» mai da sola
    const testoVisibile = html.replace(/<[^>]+>/g, ' ')
    for (const trovato of testoVisibile.matchAll(/piscin[ae]\s+natural[ei]/gi)) {
        const seguito = testoVisibile.slice(trovato.index, trovato.index + 120)
        if (!/Rocks\s+Design/i.test(seguito)) {
            errori.push(`${rel}: «${trovato[0]}» non è seguito da «Piscine Rocks Design».`)
        } else {
            avvisi.push(`${rel}: presente «${trovato[0]}»; la direttiva suggerisce di usare solo «Piscine Rocks Design».`)
        }
    }

    // 3. nessun riferimento ai sorgenti non filigranati o al catalogo
    for (const vietato of ['media-sources', '/foto/', '/catalogo/', '/optimized/']) {
        if (html.includes(vietato)) {
            errori.push(`${rel}: riferimento a materiale non pubblicabile (${vietato}).`)
        }
    }

    // 4. immagini solo dalla whitelist
    for (const trovato of html.matchAll(/\/media\/([a-z0-9-]+)-\d+\.(webp|jpg)/g)) {
        if (!PHOTOS.some(p => p.slug === trovato[1])) {
            errori.push(`${rel}: immagine fuori whitelist (${trovato[1]}).`)
        }
    }

    // 5. SEO locale: la zona va sempre citata nelle pagine indicizzabili
    const indicizzabile = !html.includes('name="robots" content="noindex')
    if (indicizzabile && !new RegExp(AZIENDA.zona, 'i').test(html)) {
        errori.push(`${rel}: la zona di riferimento (${AZIENDA.zona}) non è citata.`)
    }
}

// 4-bis. la filigrana è impressa da prepare-media.mjs su ogni foto di piscina
const senzaFiligrana = PHOTOS.filter(p => p.noWatermark && !p.tags.includes('materiali'))
if (senzaFiligrana.length > 0) {
    errori.push(`Foto di piscina senza filigrana nella whitelist: ${senzaFiligrana.map(p => p.slug).join(', ')}.`)
}

for (const a of avvisi) console.log('⚠︎ ', a)
if (errori.length > 0) {
    console.error(`\n✗ ${errori.length} problemi di conformità:\n`)
    for (const e of errori) console.error('  •', e)
    process.exit(1)
}
console.log(`\n✓ ${pagine.length} pagine conformi alle direttive Piscine Rocks Design.`)
