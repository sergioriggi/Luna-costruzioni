/**
 * Controllo del sito PUBBLICATO.
 *
 *   node scripts/verifica-online.mjs https://indirizzo-del-sito
 *
 * `verifica-conformita.mjs` guarda `dist/`, cioè ciò che *abbiamo compilato*.
 * Questo guarda ciò che *risponde a un cliente*. In mezzo ci sono la build di
 * Hostinger, le sue variabili d'ambiente e la sua rete di distribuzione: tre
 * cose che non stanno nel repository e che ci hanno già fatto male una volta.
 * `VITE_SITE_URL` incollata con dentro l'intera riga di istruzioni era
 * invisibile in CI — la CI compilava con le *sue* variabili — e visibile solo
 * interrogando il sito vero.
 *
 * Non richiede dipendenze: `scripts/rotte.mjs` e `src/data/site.js` non
 * importano nulla da `node_modules`. Gira con Node nudo, quindi in CI non
 * serve `npm ci` e non c'è un'installazione che possa fallire.
 *
 * Esce 1 se qualcosa non va, 2 se non è stato possibile controllare (indirizzo
 * mancante o irraggiungibile): un guasto del sito e un guasto della verifica
 * non sono la stessa notizia.
 */
import fs from 'fs/promises'
import { ROTTE } from './rotte.mjs'
import { DOMINIO_DEFINITIVO, ROCKS_DESIGN } from '../src/data/site.js'

const errori = []
const avvisi = []

/** Righe del riepilogo: [esito, controllo, dettaglio]. Vanno su GitHub. */
const riepilogo = []

const grezzo = (process.argv[2] ?? process.env.SITO ?? '').trim()
if (!grezzo) {
    console.error('Uso: node scripts/verifica-online.mjs https://indirizzo-del-sito')
    process.exit(2)
}
let BASE
try {
    BASE = new URL(grezzo)
    if (BASE.protocol !== 'https:' && BASE.protocol !== 'http:') throw new Error('protocollo')
} catch {
    console.error(`Indirizzo non valido: «${grezzo}»`)
    process.exit(2)
}
const ORIGINE = BASE.origin

/**
 * Il sito è «di produzione» solo sul dominio definitivo. Ovunque altro è
 * un'anteprima, e da un'anteprima ci si aspetta l'esatto contrario: tutto
 * noindex. È lo stesso verso di `ANTEPRIMA` in src/data/site.js, ma dedotto
 * dall'indirizzo che stiamo interrogando invece che da una variabile di
 * compilazione — qui la variabile non la vediamo, vediamo il risultato.
 */
const PRODUZIONE = ORIGINE === new URL(DOMINIO_DEFINITIVO).origin
const DI_SERVIZIO = new Set(['/privacy', '/cookie-policy', '/404', '/grazie'])

const indirizzo = percorso => `${ORIGINE}${percorso === '/' ? '/' : percorso}`

/** Una richiesta con scadenza: un sito che non risponde non deve appendere la verifica. */
async function chiedi(url, metodo = 'GET') {
    try {
        const risposta = await fetch(url, {
            method: metodo,
            redirect: 'follow',
            headers: { 'user-agent': 'verifica-online Luna Costruzioni' },
            signal: AbortSignal.timeout(20000),
        })
        const corpo = metodo === 'GET' ? await risposta.text() : ''
        return { stato: risposta.status, intestazioni: risposta.headers, corpo }
    } catch (e) {
        return { stato: 0, intestazioni: new Headers(), corpo: '', errore: e.message }
    }
}

/** Poche richieste alla volta: non serve martellare l'hosting per 29 pagine. */
async function inCoda(elementi, lavoro, quante = 6) {
    const esiti = []
    for (let i = 0; i < elementi.length; i += quante) {
        esiti.push(...(await Promise.all(elementi.slice(i, i + quante).map(lavoro))))
    }
    return esiti
}

const contenuto = (html, attributo) => {
    const espressione =
        attributo === 'canonical'
            ? /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i
            : new RegExp(`<meta[^>]+(?:property|name)="${attributo}"[^>]+content="([^"]*)"`, 'i')
    return html.match(espressione)?.[1] ?? ''
}

const benFormato = valore => /^https?:\/\/[^\s"'<>]+$/.test(valore)

// ───────────────────────────── 1. le pagine ─────────────────────────────

const pagine = await inCoda(ROTTE, async rotta => ({
    percorso: rotta.percorso,
    ...(await chiedi(indirizzo(rotta.percorso))),
}))

const irraggiungibili = pagine.filter(p => p.stato === 0)
if (irraggiungibili.length === pagine.length) {
    console.error(`\n✗ ${ORIGINE} non risponde: ${irraggiungibili[0].errore}`)
    console.error('  Il sito è irraggiungibile, oppure l\'indirizzo è sbagliato. Verifica non eseguita.')
    process.exit(2)
}
for (const p of irraggiungibili) errori.push(`${p.percorso}: nessuna risposta (${p.errore}).`)

const nonDuecento = pagine.filter(p => p.stato !== 200 && p.stato !== 0)
for (const p of nonDuecento) errori.push(`${p.percorso}: risponde ${p.stato} invece di 200.`)

/**
 * Le pagine su cui hanno senso i controlli successivi. Se è vuota, quei
 * controlli non passano: non vengono eseguiti, ed è un'altra cosa. Un ✓ su un
 * insieme vuoto è il modo classico per far sembrare sano un sito spento.
 */
const servite = pagine.filter(p => p.stato === 200)
const eseguito = esito => (servite.length === 0 ? null : esito)

riepilogo.push([irraggiungibili.length + nonDuecento.length === 0, 'Pagine raggiungibili', `${servite.length}/${pagine.length}`])

// Un indirizzo inventato deve dare 404 *e* la nostra pagina: un hosting che
// ripiega sulla home per qualunque percorso trasformerebbe ogni refuso in un
// duplicato indicizzabile della pagina iniziale.
const inventato = await chiedi(`${ORIGINE}/pagina-che-non-esiste-${Date.now()}`)
const quattroCentoQuattro =
    inventato.stato === 404 && /Questa pagina non esiste|Errore 404/i.test(inventato.corpo)
if (!quattroCentoQuattro) {
    errori.push(
        `Un percorso inesistente risponde ${inventato.stato} e non serve la pagina 404 del sito.`,
    )
}
riepilogo.push([
    quattroCentoQuattro,
    'Pagina 404',
    inventato.stato === 404 && !quattroCentoQuattro ? '404 servito da altri' : `stato ${inventato.stato}`,
])

// ──────────────────── 2. indicizzazione coerente con l'indirizzo ────────────────────

let indicizzazioneOk = true
for (const p of servite) {
    const noindex = /name="robots"[^>]*noindex/i.test(p.corpo)
    if (!PRODUZIONE && !noindex) {
        indicizzazioneOk = false
        errori.push(
            `${p.percorso}: servita da ${ORIGINE}, che non è il dominio definitivo, ma non dichiara noindex.`,
        )
    }
    if (PRODUZIONE && noindex && !DI_SERVIZIO.has(p.percorso)) {
        indicizzazioneOk = false
        errori.push(`${p.percorso}: è il sito di produzione ma la pagina dichiara noindex: Google non la vedrà.`)
    }
}
riepilogo.push([
    eseguito(indicizzazioneOk),
    PRODUZIONE ? 'Indicizzabile (produzione)' : 'Tutto noindex (anteprima)',
    `${servite.length} ${servite.length === 1 ? 'pagina servita' : 'pagine servite'}`,
])

// ─────────────────── 3. indirizzi dichiarati e immagini social ───────────────────

const immaginiSocial = new Set()
let fuoriOrigine = 0
let malformati = 0

for (const p of servite) {
    for (const attributo of ['canonical', 'og:url', 'og:image', 'twitter:image']) {
        const valore = contenuto(p.corpo, attributo)
        if (!valore) {
            // Il canonical si emette solo quando l'indirizzo è dichiarato: su
            // un'anteprima la sua assenza è voluta, non un difetto.
            if (attributo === 'canonical' && !PRODUZIONE) continue
            malformati++
            errori.push(`${p.percorso}: manca ${attributo}.`)
            continue
        }
        if (!benFormato(valore)) {
            malformati++
            errori.push(`${p.percorso}: ${attributo} non è un URL ben formato («${valore}»).`)
            continue
        }
        const suQuestoSito = valore.startsWith(ORIGINE)
        if (!suQuestoSito) {
            // In anteprima è la conseguenza nota di VITE_SITE_URL non impostata:
            // si conta e si riassume in un avviso solo, invece di 116 errori.
            if (PRODUZIONE) errori.push(`${p.percorso}: ${attributo} punta fuori dal sito («${valore}»).`)
            fuoriOrigine++
        }
        if (attributo.endsWith('image') && suQuestoSito) immaginiSocial.add(valore)
    }
}

if (fuoriOrigine > 0 && !PRODUZIONE) {
    avvisi.push(
        `${fuoriOrigine} indirizzi dichiarati (canonical, og:url, og:image) puntano a ${DOMINIO_DEFINITIVO} ` +
            `invece che a ${ORIGINE}: è l'effetto di VITE_SITE_URL non impostata. ` +
            'Finché il dominio non è attivo, le anteprime dei link social restano senza immagine.',
    )
}

const immagini = await inCoda([...immaginiSocial], async url => ({ url, ...(await chiedi(url, 'HEAD')) }))
const immaginiRotte = immagini.filter(i => i.stato !== 200)
for (const i of immaginiRotte) errori.push(`Immagine social non raggiungibile (${i.stato}): ${i.url}`)
riepilogo.push([
    eseguito(malformati === 0 && immaginiRotte.length === 0),
    'Metadati e immagini social',
    immagini.length > 0
        ? `${immagini.length - immaginiRotte.length}/${immagini.length} immagini raggiungibili`
        : 'nessuna immagine su questo indirizzo (vedi note)',
])

// ─────────────────────────── 4. sitemap e robots ───────────────────────────

const sitemap = await chiedi(`${ORIGINE}/sitemap.xml`)
const attese = ROTTE.filter(r => !r.esclusaDaSitemap).length
let sitemapOk = sitemap.stato === 200
if (!sitemapOk) {
    errori.push(`sitemap.xml risponde ${sitemap.stato}.`)
} else {
    const loc = [...sitemap.corpo.matchAll(/<loc>([^<]*)<\/loc>/g)].map(t => t[1])
    if (loc.length !== attese) {
        sitemapOk = false
        errori.push(`sitemap.xml elenca ${loc.length} indirizzi invece di ${attese}.`)
    }
    const rotti = loc.filter(l => !benFormato(l))
    for (const l of rotti.slice(0, 5)) {
        sitemapOk = false
        errori.push(`sitemap.xml: <loc> malformato («${l}»).`)
    }
    // Le voci si interrogano solo se stanno su questo sito: in anteprima
    // puntano al dominio definitivo, che non risponde ancora, e chiederle
    // significherebbe segnalare come guasto una cosa già nota.
    const nostre = loc.filter(l => l.startsWith(ORIGINE))
    const morte = (await inCoda(nostre, async l => ({ l, ...(await chiedi(l, 'HEAD')) }))).filter(
        r => r.stato !== 200,
    )
    for (const m of morte) {
        sitemapOk = false
        errori.push(`sitemap.xml: ${m.l} risponde ${m.stato}.`)
    }
}
riepilogo.push([sitemapOk, 'Sitemap', sitemap.stato === 200 ? `${attese} indirizzi attesi` : `stato ${sitemap.stato}`])

/*
 * robots.txt: prima di giudicarlo bisogna sapere di chi è.
 *
 * Sull'indirizzo di anteprima non risponde il nostro: Hostinger ne serve uno
 * suo dal bordo della rete, che blocca Googlebot e lascia passare tutti gli
 * altri. Il nostro viene pubblicato e scavalcato — si vede dalle intestazioni,
 * perché quella risposta è l'unica del sito senza `platform: hostinger` né
 * `last-modified`. Trattarlo come un guasto nostro manderebbe qualcuno a
 * cercare in public_html un file che lì non c'è.
 *
 * Il riconoscimento però si fa sul contenuto, non sulle intestazioni: le due
 * forme che `genera-sitemap.mjs` sa produrre sono note, e ciò che non è
 * nessuna delle due non l'abbiamo scritto noi.
 */
const robots = await chiedi(`${ORIGINE}/robots.txt`)
const chiudeTutto = /^\s*Disallow:\s*\/\s*$/m.test(robots.corpo)
const nostro = /Anteprima su indirizzo provvisorio/.test(robots.corpo) || /Disallow:\s*\/privacy/.test(robots.corpo)
let robotsOk = robots.stato === 200
if (!robotsOk) {
    errori.push(`robots.txt risponde ${robots.stato}.`)
} else if (!nostro) {
    avvisi.push(
        `robots.txt non è quello prodotto dalla build: risponde ${robots.corpo.trim().split('\n').length} righe ` +
            'che non corrispondono a nessuna delle due forme che generiamo. ' +
            'Sugli indirizzi di anteprima è normale — lo impone l\'hosting — e non c\'è nulla da correggere nel repository.',
    )
} else if (PRODUZIONE && chiudeTutto) {
    robotsOk = false
    errori.push(
        'robots.txt del dominio definitivo vieta tutto: il sito è online ma invisibile ai motori. ' +
            'Succede quando VITE_SITE_URL non è impostata sull\'hosting.',
    )
} else if (!PRODUZIONE && !chiudeTutto) {
    robotsOk = false
    errori.push(`robots.txt di ${ORIGINE} non chiude l'indicizzazione, ma questo non è il dominio definitivo.`)
}
riepilogo.push([robotsOk, 'robots.txt', nostro ? 'prodotto dalla build' : 'imposto dall\'hosting'])

// ──────────────── 5. direttive Piscine Rocks Design, sul sito vero ────────────────

let direttiveOk = true
for (const p of servite) {
    const testa = p.corpo.slice(0, p.corpo.indexOf('</header>') + 9)
    if (!testa.includes('/brand/rocks-design-logo.png')) {
        direttiveOk = false
        errori.push(`${p.percorso}: manca il logo Piscine Rocks Design nella fascia superiore.`)
    }
    if (!testa.includes(ROCKS_DESIGN.sito)) {
        direttiveOk = false
        errori.push(`${p.percorso}: il logo concessionario non linka a ${ROCKS_DESIGN.sito}.`)
    }
    const testoVisibile = p.corpo.replace(/<[^>]+>/g, ' ')
    for (const trovato of testoVisibile.matchAll(/piscin[ae]\s+natural[ei]/gi)) {
        if (!/Rocks\s+Design/i.test(testoVisibile.slice(trovato.index, trovato.index + 120))) {
            direttiveOk = false
            errori.push(`${p.percorso}: «${trovato[0]}» non è seguito da «Piscine Rocks Design».`)
        }
    }
}
riepilogo.push([eseguito(direttiveOk), 'Direttive Rocks Design', 'logo in testata, marchio sempre citato'])

// ──────────────────── 6. il materiale riservato non si scarica ────────────────────

/*
 * L'unico posto dove questa si può verificare davvero è il server: il
 * `.htaccess` dentro dist/ dimostra che l'abbiamo scritto, non che Apache lo
 * stia applicando. Dietro c'è il brevetto: `media-sources/` contiene gli
 * originali senza filigrana e il catalogo della casa madre con le fasi di
 * costruzione, che la direttiva vieta di pubblicare.
 */
const riservati = ['/media-sources/', '/media-sources/foto/', '/.htaccess', '/.env']
const esposti = (await inCoda(riservati, async p => ({ p, ...(await chiedi(`${ORIGINE}${p}`)) }))).filter(
    r => r.stato !== 403 && r.stato !== 404,
)
for (const e of esposti) errori.push(`${e.p} è raggiungibile (${e.stato}): deve rispondere 403 o 404.`)
riepilogo.push([esposti.length === 0, 'Materiale riservato protetto', `${riservati.length} percorsi provati`])

// ───────────────────────────── esito ─────────────────────────────

const titolo = `${PRODUZIONE ? 'Produzione' : 'Anteprima'} · ${ORIGINE}`

/** `null` significa «non eseguito», che non è né promosso né bocciato. */
const segno = ok => (ok === null ? '—' : ok ? '✅' : '❌')

if (process.env.GITHUB_STEP_SUMMARY) {
    const tabella = [
        `## ${errori.length === 0 ? '✅' : '❌'} ${titolo}`,
        '',
        '| | Controllo | |',
        '|---|---|---|',
        ...riepilogo.map(([ok, nome, dettaglio]) => `| ${segno(ok)} | ${nome} | ${dettaglio} |`),
        '',
        ...(errori.length > 0 ? ['### Da correggere', '', ...errori.map(e => `- ${e}`), ''] : []),
        ...(avvisi.length > 0 ? ['### Note', '', ...avvisi.map(a => `- ${a}`), ''] : []),
    ].join('\n')
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, `${tabella}\n`)
}

console.log(`\n${titolo}\n`)
for (const [ok, nome, dettaglio] of riepilogo) {
    console.log(`  ${ok === null ? '—' : ok ? '✓' : '✗'} ${nome} — ${dettaglio}`)
}
for (const a of avvisi) console.log(`\n⚠︎  ${a}`)
if (errori.length > 0) {
    console.error(`\n✗ ${errori.length} problemi sul sito pubblicato:\n`)
    for (const e of errori) console.error('  •', e)
    process.exit(1)
}
console.log(`\n✓ ${pagine.length} pagine controllate online: nessun problema.`)
