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
 *  5. ogni pagina indicizzabile dichiari la zona di riferimento (SEO locale);
 *  6. non compaiano frasi riprese alla lettera dal catalogo o dal sito della
 *     casa madre. Oltre alla questione dei diritti, testi identici a quelli
 *     di piscinerocksdesign.com o di un altro concessionario si penalizzano
 *     a vicenda nei motori di ricerca: il testo va scritto, non copiato.
 */
import fs from 'fs/promises'
import path from 'path'
import { PHOTOS } from './media.config.mjs'
import { ROCKS_DESIGN, AZIENDA, ANTEPRIMA, INDIRIZZO_DICHIARATO } from '../src/data/site.js'

const DIST = path.resolve('./dist')

/**
 * Frasi tratte dal catalogo e dal sito ufficiale Piscine Rocks Design.
 * Sono qui come sentinelle: se ricompaiono nel sito, significa che qualcuno
 * ha incollato del testo invece di scriverlo. Ampliare l'elenco quando si
 * riceve nuovo materiale dalla casa madre.
 */
const FRASI_DELLA_CASA_MADRE = [
    'splendide rocce monolitiche',
    'ode alla bellezza naturale',
    'tributo alla maestosità',
    'omaggio all’incantevole bellezza',
    "omaggio all'incantevole bellezza",
    'fondale come il mare',
    'crediamo nel rispetto dell’ambiente',
    'equiparate ai laghetti',
    'riflessi cromatici',
    'rumore bianco',
    'angolo di paradiso',
    'tre generazioni',
    'trova il tuo angolo di paradiso',
    'la musica dell’acqua',
    'prodotto sartoriale',
]
const errori = []
const avvisi = []

/** Pagine legali e 404: fuori dai controlli SEO, non sono contenuto. */
const paginaDiServizio = rel => /^(privacy|cookie-policy|404)[/.]/.test(rel)

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

    // 6. nessuna frase ripresa dai materiali della casa madre
    const minuscolo = testoVisibile.toLowerCase()
    for (const frase of FRASI_DELLA_CASA_MADRE) {
        if (minuscolo.includes(frase.toLowerCase())) {
            errori.push(`${rel}: frase ripresa dai materiali della casa madre («${frase}»): riscriverla.`)
        }
    }

    // 7. Un'anteprima non deve mai uscire indicizzabile.
    // Il difetto si è già verificato: l'hosting compila il progetto da sé,
    // senza VITE_SITE_URL, e il sito si dichiarava di produzione. Da qui in
    // poi una build del genere non passa la verifica, quindi non va online.
    if (ANTEPRIMA && !paginaDiServizio(rel) && !/name="robots"[^>]*noindex/i.test(html)) {
        const causa = INDIRIZZO_DICHIARATO
            ? `il sito dichiara di essere servito da ${INDIRIZZO_DICHIARATO}, che non è il dominio definitivo`
            : 'VITE_SITE_URL non è impostata, quindi questa build non è di produzione'
        errori.push(`${rel}: ${causa}, ma la pagina non dichiara noindex.`)
    }

    // 5. SEO locale: la zona va citata in ogni pagina di contenuto.
    // Si escludono per percorso le pagine legali e il 404: l'anteprima è
    // interamente noindex, quindi il meta tag non è più un criterio utile.
    if (!paginaDiServizio(rel) && !new RegExp(AZIENDA.zona, 'i').test(html)) {
        errori.push(`${rel}: la zona di riferimento (${AZIENDA.zona}) non è citata.`)
    }

    // 8. Gli indirizzi dichiarati devono essere URL, non testo.
    // Una VITE_SITE_URL corrotta è arrivata in produzione senza far rumore:
    // conteneva l'intera riga di istruzioni, e siccome *conteneva* un URL
    // plausibile la build è passata. Ogni canonical e ogni og:url portavano
    // quella stringa. Ora un valore del genere fa fallire la verifica.
    for (const attributo of ['canonical', 'og:url', 'og:image', 'twitter:image']) {
        const espressione =
            attributo === 'canonical'
                ? /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/gi
                : new RegExp(`<meta[^>]+(?:property|name)="${attributo}"[^>]+content="([^"]*)"`, 'gi')
        for (const trovato of html.matchAll(espressione)) {
            const valore = trovato[1]
            if (!/^https?:\/\/[^\s"'<>]+$/.test(valore)) {
                errori.push(`${rel}: ${attributo} non è un URL assoluto ben formato («${valore}»).`)
            }
        }
    }
}

// 8-bis. Stesso controllo sulla sitemap: è il file che i motori leggono per
// primo, e un <loc> malformato invalida l'intera voce.
try {
    const sitemap = await fs.readFile(path.join(DIST, 'sitemap.xml'), 'utf8')
    for (const trovato of sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)) {
        if (!/^https?:\/\/[^\s]+$/.test(trovato[1])) {
            errori.push(`sitemap.xml: <loc> malformato («${trovato[1]}»).`)
        }
    }
} catch {
    errori.push('sitemap.xml assente in dist/.')
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
