/**
 * Misura quanto il sito si ripete, pagina per pagina.
 *
 *   node scripts/misura-ripetizioni.mjs          (dopo `npm run build`)
 *   node scripts/misura-ripetizioni.mjs --severo (esce con 1 se un obiettivo non è rispettato)
 *
 * Legge ogni pagina pre-renderizzata in dist/, prende il testo dentro <main> e
 * riporta:
 *
 *   1. ogni blocco di testo di almeno 25 caratteri che compare su più di 2
 *      pagine. La riga sulle foto (marcata `data-credito-foto`) non si conta.
 *      Il riquadro finale di contatto (marcato `data-cta-finale`) è
 *      l'unica ripetizione ammessa: si conta a parte e non entra nell'elenco;
 *   2. quante volte compare «sopralluogo» (e «sopralluoghi») in ogni pagina —
 *      obiettivo: 3 o meno;
 *   3. la somiglianza fra ogni coppia di pagine — obiettivo: sotto il 60%;
 *   4. le didascalie delle foto (elementi marcati `data-didascalia`) presenti
 *      su più di una pagina — obiettivo: nessuna.
 *
 * La somiglianza è l'indice di Jaccard sulle sequenze di 5 parole consecutive
 * del testo di <main>, riquadro finale compreso: una misura severa, perché
 * conta anche la parte che si ripete per scelta.
 *
 * Nessuna dipendenza: l'HTML è quello che produce il nostro pre-rendering,
 * non HTML qualsiasi, e qualche espressione regolare basta.
 */
import fs from 'node:fs'
import path from 'node:path'
import { ROTTE } from './rotte.mjs'

const DIST = path.resolve('dist')
const MIN_BLOCCO = 25
const MAX_PAGINE_PER_BLOCCO = 2
const MAX_SOPRALLUOGO = 3
const MAX_SOMIGLIANZA = 0.6
const SEVERO = process.argv.includes('--severo')

/** Le pagine legali e di servizio non sono pagine di contenuto. */
const ESCLUSE = new Set(['/privacy', '/cookie-policy', '/404', '/grazie'])

const ENTITA = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", '#x27': "'", nbsp: ' ' }
const decodifica = s =>
    s
        .replace(/&(amp|lt|gt|quot|#39|#x27|nbsp);/g, (_, e) => ENTITA[e])
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))

const BLOCCHI = 'p|h[1-6]|li|summary|figcaption|dt|dd|td|th|label|blockquote|legend|option|div|section|article|header|footer|ul|ol|dl|figure|form|details|nav|table|tr'

/** Toglie un elemento con tutto il suo contenuto, gestendo l'annidamento. */
function togliElementi(html, attributo) {
    let out = html
    for (;;) {
        const apertura = new RegExp(`<([a-z0-9]+)\\b[^>]*\\b${attributo}\\b[^>]*>`, 'i').exec(out)
        if (!apertura) return out
        const tag = apertura[1]
        const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi')
        re.lastIndex = apertura.index
        let profondita = 0
        let fine = out.length
        for (let m; (m = re.exec(out)); ) {
            profondita += m[1] ? -1 : 1
            if (profondita === 0) {
                fine = m.index + m[0].length
                break
            }
        }
        out = out.slice(0, apertura.index) + ' ' + out.slice(fine)
    }
}

function testoDiMain(html) {
    const m = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html)
    if (!m) return { blocchi: [], testo: '', cta: [] }
    let corpo = m[1]
        .replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<!--[\s\S]*?-->/g, '')
    // La riga che dice di chi sono le piscine in foto (CreditoFoto.jsx) si
    // ripete per scelta su ogni pagina con foto: non è testo duplicato.
    corpo = togliElementi(corpo, 'data-credito-foto')

    // I pulsanti (link con classe bottone/btn) contano come blocchi a sé: due
    // pulsanti affiancati non sono una frase, e le loro etichette si ripetono
    // per scelta («Chiedi un preventivo» è la stessa su tutto il sito).
    corpo = corpo.replace(/<a\b[^>]*class="[^"]*\b(?:bottone|btn)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, '<p>$1</p>')

    const conCta = corpo
    corpo = togliElementi(corpo, 'data-cta-finale')

    const spezza = frammento =>
        frammento
            .split(new RegExp(`</?(?:${BLOCCHI})\\b[^>]*>|<br\\s*/?>`, 'gi'))
            .map(s => decodifica(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim())
            .filter(Boolean)

    const blocchi = spezza(corpo)
    const tutti = spezza(conCta)
    const cta = tutti.filter(b => !blocchi.includes(b))
    return { blocchi, testo: tutti.join(' '), cta }
}

function didascalie(html) {
    const m = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html)
    if (!m) return []
    return [...m[1].matchAll(/<([a-z]+)\b[^>]*\bdata-didascalia\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(x =>
        decodifica(x[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(),
    )
}

function pagina(percorso) {
    const file =
        percorso === '/' ? path.join(DIST, 'index.html') : path.join(DIST, percorso.slice(1), 'index.html')
    return fs.readFileSync(file, 'utf8')
}

function shingle(testo, n = 5) {
    const parole = testo.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean)
    const s = new Set()
    for (let i = 0; i + n <= parole.length; i++) s.add(parole.slice(i, i + n).join(' '))
    return s
}

function jaccard(a, b) {
    let comuni = 0
    for (const x of a) if (b.has(x)) comuni++
    const unione = a.size + b.size - comuni
    return unione ? comuni / unione : 0
}

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('dist/ assente: eseguire prima `npm run build`.')
    process.exit(1)
}

const pagine = ROTTE.filter(r => !ESCLUSE.has(r.percorso)).map(r => {
    const html = pagina(r.percorso)
    const { blocchi, testo, cta } = testoDiMain(html)
    return { percorso: r.percorso, blocchi, testo, cta, shingle: shingle(testo), didascalie: didascalie(html) }
})

let violazioni = 0

// 1. Blocchi ripetuti
const dove = new Map()
for (const p of pagine) {
    for (const b of new Set(p.blocchi)) {
        if (b.length < MIN_BLOCCO) continue
        if (!dove.has(b)) dove.set(b, new Set())
        dove.get(b).add(p.percorso)
    }
}
const ripetuti = [...dove].filter(([, s]) => s.size > MAX_PAGINE_PER_BLOCCO).sort((a, b) => b[1].size - a[1].size)
console.log(`Pagine misurate: ${pagine.length}\n`)
console.log(`1. Blocchi di ${MIN_BLOCCO}+ caratteri presenti su più di ${MAX_PAGINE_PER_BLOCCO} pagine (riquadro finale escluso): ${ripetuti.length}`)
for (const [b, s] of ripetuti) {
    console.log(`   ${String(s.size).padStart(2)} pagine · «${b.length > 90 ? b.slice(0, 87) + '…' : b}»`)
}
violazioni += ripetuti.length

const ctaUniche = new Set(pagine.flatMap(p => p.cta))
const conCta = pagine.filter(p => p.cta.length).length
console.log(`   (riquadro finale ammesso: presente su ${conCta} pagine, ${ctaUniche.size} blocchi di testo distinti)`)

// 2. «sopralluogo»
console.log(`\n2. «sopralluogo» per pagina (obiettivo: ${MAX_SOPRALLUOGO} o meno)`)
for (const p of pagine) {
    const n = (p.testo.match(/sopralluog\w*/gi) ?? []).length
    const fuori = n > MAX_SOPRALLUOGO
    if (fuori) violazioni++
    console.log(`   ${fuori ? '✗' : '✓'} ${String(n).padStart(2)}  ${p.percorso}`)
}

// 3. Somiglianza a coppie
const coppie = []
for (let i = 0; i < pagine.length; i++) {
    for (let j = i + 1; j < pagine.length; j++) {
        coppie.push([pagine[i].percorso, pagine[j].percorso, jaccard(pagine[i].shingle, pagine[j].shingle)])
    }
}
coppie.sort((a, b) => b[2] - a[2])
const oltre = coppie.filter(c => c[2] >= MAX_SOMIGLIANZA)
violazioni += oltre.length
console.log(`\n3. Somiglianza a coppie (Jaccard su 5 parole, obiettivo: sotto il ${MAX_SOMIGLIANZA * 100}%)`)
console.log(`   coppie misurate: ${coppie.length} · sopra la soglia: ${oltre.length}`)
console.log('   le dieci più simili:')
for (const [a, b, v] of coppie.slice(0, 10)) {
    console.log(`   ${v >= MAX_SOMIGLIANZA ? '✗' : '✓'} ${(v * 100).toFixed(1).padStart(5)}%  ${a}  ↔  ${b}`)
}

// 4. Didascalie
const didascaliaDove = new Map()
for (const p of pagine) {
    for (const d of new Set(p.didascalie)) {
        if (!didascaliaDove.has(d)) didascaliaDove.set(d, new Set())
        didascaliaDove.get(d).add(p.percorso)
    }
}
const didascalieRipetute = [...didascaliaDove].filter(([, s]) => s.size > 1)
violazioni += didascalieRipetute.length
console.log(`\n4. Didascalie su più di una pagina (obiettivo: nessuna): ${didascalieRipetute.length} su ${didascaliaDove.size} didascalie distinte`)
for (const [d, s] of didascalieRipetute) console.log(`   ${s.size} pagine · «${d}» (${[...s].join(', ')})`)

console.log(`\n${violazioni ? `✗ ${violazioni} obiettivi non rispettati` : '✓ tutti gli obiettivi rispettati'}`)
if (SEVERO && violazioni) process.exit(1)
