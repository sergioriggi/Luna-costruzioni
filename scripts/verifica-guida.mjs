/**
 * Verifica degli articoli della guida, sui DATI e non sul compilato.
 *
 *   npm run verifica:guida        (da sola, in un secondo, senza build)
 *   npm run verifica              (la richiama, e blocca il deploy)
 *
 * Perché un controllo a parte. Gli articoli li prepara anche un'automazione e
 * li approva una persona che legge dal telefono: questa verifica è la rete che
 * resta se entrambe sbagliano. Controlla ciò che la verifica del compilato non
 * può vedere — il testo inglese non è nell'HTML statico — e ciò che vale solo
 * per un testo informativo: affermazioni non vere su Luna, cifre senza fonte.
 *
 * ── FORMA DI UN ARTICOLO (src/data/guida/<slug>.js) ─────────────────────
 *   slug          kebab-case, uguale al nome del file
 *   pubblicato    'AAAA-MM-GG', non nel futuro
 *   aggiornato    facoltativo, 'AAAA-MM-GG', non prima di `pubblicato`
 *   titolo, titoloEn, sintesi, sintesiEn
 *   seo           { titolo ≤ 60, descrizione ≤ 150 }
 *   foto          uno slug della whitelist (scripts/media.config.mjs)
 *   corpo         [{ tipo: 'p'|'h2'|'h3'|'nota', it, en } | { tipo: 'elenco', it: [], en: [] }]
 *   domande       facoltativo: [{ domanda, domandaEn, risposta, rispostaEn }]
 *   correlati     facoltativo: [{ to, label, labelEn }] verso pagine che esistono
 *   fonti         facoltativo: [{ titolo, url }] — ogni link esterno del testo sta qui
 *   cifre         facoltativo: [{ valore: '22%' | '96.000 €', fonte: 'https://…' }]
 *
 * Nei testi: **grassetto** e [collegamenti](/percorso). Nient'altro.
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { PHOTOS } from './media.config.mjs'
import { PREZZO } from '../src/data/site.js'
import { GUIDA, percorsoArticolo } from '../src/data/guida/index.js'
import { ROTTE } from './rotte.mjs'
import { FRASI_DELLA_CASA_MADRE } from './frasi-casa-madre.mjs'
import { scomponi, testoPiano, interno } from '../src/lib/testo-ricco.js'

const CARTELLA = path.resolve('./src/data/guida')
const SLUG_FOTO = new Set(PHOTOS.map(p => p.slug))
const TIPI = new Set(['p', 'h2', 'h3', 'nota', 'elenco'])
const PAROLE_MIN = 500
const PAROLE_MAX = 2500

/**
 * Affermazioni che il sito non può fare, in italiano e in inglese.
 *
 * Ognuna corrisponde a un fatto: Luna non ha ancora consegnato piscine in
 * Sicilia e non ha clienti di piscine da citare; non ha una sede visitabile
 * né una piscina espositiva, e dal 30/09/2026 il sito non invita più a vedere
 * quelle della casa madre; la tecnologia e il brevetto sono di Piscine Rocks
 * Design. I superlativi sono fuori perché nessuno li può dimostrare.
 */
const VIETATE = [
    [/showroom/i, 'showroom: il sito non ne ha e non ne promette'],
    [/\bvarese\b/i, 'Varese: il sito non invita a visitare piscine della casa madre'],
    [/vien[ie]\s+a\s+(trovarci|vederl[ae])|venite\s+a\s+trovarci/i, 'invito a visitare'],
    [/\b(nella|la|alla)\s+nostra\s+sede\b|\bin\s+sede\b(?!\s+di\b)/i, 'sede visitabile: via Speranza è un indirizzo legale, non una sede'],
    [/visit(a|are|ate)\s+(la|le|una|alla|alle)\s+(nostr[ae]\s+)?piscin/i, 'invito a visitare una piscina'],
    [/piscin[ae]\s+espositiv[ae]\s+(in|di|a)\s+sicilia/i, 'piscina espositiva in Sicilia: non esiste'],
    [/(abbiamo|ho)\s+(già\s+)?(realizzato|costruito|consegnato|installato)/i, 'piscine già realizzate: Luna non ne ha ancora consegnate'],
    [/\bnostr[aei]\s+(piscine|realizzazioni|lavori\s+realizzati|progetti\s+realizzati)/i, '«le nostre piscine/realizzazioni»: le foto sono della casa madre'],
    [/\bnostri\s+clienti\b/i, 'clienti di piscine: non ce ne sono ancora'],
    [/\b(decine|centinaia)\s+di\s+(piscine|clienti|progetti)/i, 'numeri di piscine o clienti'],
    [/\bnostr[ao]\s+(brevetto|tecnologia|invenzione)|abbiamo\s+inventato/i, 'la tecnologia è di Piscine Rocks Design'],
    [/\bleader\b|\bil\s+migliore\b|\bi\s+migliori\b|\bnumero\s+(1|uno)\b/i, 'superlativo non dimostrabile'],
    [/garanzia\s+(a\s+vita|totale|illimitata)/i, 'garanzia non concordata'],
    [/\bvisit\s+(us|our)\b|\bcome\s+and\s+see\b/i, 'EN: invito a visitare'],
    [/\b(we\s+have|we've)\s+(already\s+)?(built|delivered|installed|completed)\b/i, 'EN: piscine già realizzate'],
    [/\bour\s+(pools|projects|clients|customers|patent|technology|showroom)\b/i, 'EN: rivendicazione non vera'],
    [/\b(leading|the\s+best|number\s+one)\b/i, 'EN: superlativo non dimostrabile'],
    [/\bdisplay\s+pool\s+in\s+sicily\b/i, 'EN: piscina espositiva in Sicilia'],
]

/** Cifre in euro e percentuali, normalizzate: «1.250 €» → «1250€», «22 %» → «22%». */
function cifreNelTesto(testo) {
    const trovate = []
    const euro = /€\s*(\d[\d.,]*)|(\d[\d.,]*)\s*(?:€|euro\b)/gi
    for (const m of testo.matchAll(euro)) trovate.push({ grezza: m[0].trim(), chiave: `${(m[1] ?? m[2]).replace(/[^\d]/g, '')}€` })
    for (const m of testo.matchAll(/(\d[\d.,]*)\s*%/g)) trovate.push({ grezza: m[0].trim(), chiave: `${m[1].replace(/[.,]$/, '')}%` })
    return trovate
}
const chiaveDichiarata = valore => {
    const v = String(valore)
    if (v.includes('%')) return `${v.replace(/[^\d.,]/g, '').replace(/[.,]$/, '')}%`
    return `${v.replace(/[^\d]/g, '')}€`
}

/**
 * «Oggi» con un giorno di margine: la data dell'articolo è quella italiana, la
 * macchina che compila può essere ancora a ieri in UTC (fra mezzanotte e le due).
 */
const oggi = () => new Date(Date.now() + 864e5).toISOString().slice(0, 10)
const dataValida = d => /^\d{4}-\d{2}-\d{2}$/.test(d ?? '') && !Number.isNaN(Date.parse(`${d}T00:00:00Z`)) && new Date(`${d}T00:00:00Z`).toISOString().slice(0, 10) === d
const pieno = v => typeof v === 'string' && v.trim().length > 0
const parole = t => testoPiano(t).split(/\s+/).filter(Boolean).length

export async function verificaGuida() {
    const errori = []
    const avvisi = []

    // Registro completo: ogni file è un articolo registrato, e viceversa.
    const file = (await fs.readdir(CARTELLA)).filter(f => f.endsWith('.js') && f !== 'index.js')
    const registrati = new Set(GUIDA.map(a => `${a?.slug}.js`))
    for (const f of file) {
        if (!registrati.has(f)) errori.push(`guida: ${f} esiste ma non è registrato in src/data/guida/index.js (o il suo slug non coincide col nome del file).`)
    }

    const percorsiSito = new Set(ROTTE.map(r => r.percorso))
    const slugVisti = new Set()

    for (const a of GUIDA) {
        const dove = `guida/${a?.slug ?? '?'}`
        const err = m => errori.push(`${dove}: ${m}`)

        // ── Forma ────────────────────────────────────────────────────────
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug ?? '') || a.slug.length > 70) err('slug non valido (minuscole, cifre e trattini, al massimo 70 caratteri).')
        if (slugVisti.has(a.slug)) err('slug duplicato.')
        slugVisti.add(a.slug)
        if (!file.includes(`${a.slug}.js`)) err(`il file dovrebbe chiamarsi ${a.slug}.js.`)

        if (!dataValida(a.pubblicato)) err('`pubblicato` non è una data AAAA-MM-GG.')
        else if (a.pubblicato > oggi()) err(`\`pubblicato\` (${a.pubblicato}) è nel futuro.`)
        if (a.aggiornato != null) {
            if (!dataValida(a.aggiornato)) err('`aggiornato` non è una data AAAA-MM-GG.')
            else if (a.aggiornato < a.pubblicato || a.aggiornato > oggi()) err('`aggiornato` deve stare fra la pubblicazione e oggi.')
        }

        for (const campo of ['titolo', 'titoloEn', 'sintesi', 'sintesiEn']) {
            if (!pieno(a[campo])) err(`manca \`${campo}\`.`)
        }
        // Titolo e sintesi si mostrano come testo semplice (indice, briciole,
        // llms.txt, anteprime): il markup lì uscirebbe letterale.
        for (const campo of ['titolo', 'titoloEn', 'sintesi', 'sintesiEn']) {
            if (pieno(a[campo]) && scomponi(a[campo]).some(p => p.tipo !== 'testo')) err(`\`${campo}\` non può contenere markup.`)
        }

        if (!pieno(a.seo?.titolo)) err('manca `seo.titolo`.')
        else if (a.seo.titolo.length > 60) err(`seo.titolo di ${a.seo.titolo.length} caratteri, il massimo è 60.`)
        if (!pieno(a.seo?.descrizione)) err('manca `seo.descrizione`.')
        else if (a.seo.descrizione.length > 150) err(`seo.descrizione di ${a.seo.descrizione.length} caratteri, il massimo è 150.`)
        else if (a.seo.descrizione.length < 70) avvisi.push(`${dove}: seo.descrizione di soli ${a.seo.descrizione.length} caratteri.`)

        if (!SLUG_FOTO.has(a.foto)) err(`foto «${a.foto}» fuori dalla whitelist di scripts/media.config.mjs.`)

        // ── Corpo ────────────────────────────────────────────────────────
        const corpo = Array.isArray(a.corpo) ? a.corpo : []
        if (corpo.length < 6) err('il corpo ha meno di sei blocchi.')
        let titoletti = 0
        corpo.forEach((b, i) => {
            if (!TIPI.has(b?.tipo)) return err(`blocco ${i + 1}: tipo «${b?.tipo}» non ammesso.`)
            if (b.tipo === 'h2') titoletti++
            if (b.tipo === 'elenco') {
                if (!Array.isArray(b.it) || !Array.isArray(b.en) || b.it.length === 0 || b.it.length !== b.en.length || ![...b.it, ...b.en].every(pieno)) {
                    err(`blocco ${i + 1}: un elenco vuole \`it\` ed \`en\` come liste piene della stessa lunghezza.`)
                }
            } else if (!pieno(b.it) || !pieno(b.en)) {
                err(`blocco ${i + 1} (${b.tipo}): manca il testo italiano o quello inglese.`)
            }
        })
        if (titoletti < 2) err('servono almeno due sottotitoli (h2): un articolo senza struttura non si legge.')

        const domande = a.domande ?? []
        domande.forEach((d, i) => {
            if (![d?.domanda, d?.domandaEn, d?.risposta, d?.rispostaEn].every(pieno)) err(`domanda ${i + 1}: servono domanda, domandaEn, risposta, rispostaEn.`)
            else if ([d.domanda, d.domandaEn].some(q => scomponi(q).some(p => p.tipo !== 'testo'))) err(`domanda ${i + 1}: la domanda non può contenere markup.`)
        })

        // ── Collegamenti e fonti ─────────────────────────────────────────
        const fonti = a.fonti ?? []
        const urlFonti = new Set(fonti.map(f => f?.url))
        for (const f of fonti) {
            if (!pieno(f?.titolo) || !/^https:\/\/[^\s]+$/.test(f?.url ?? '')) err(`fonte non valida: servono titolo e un URL https («${f?.url}»).`)
        }
        for (const c of a.correlati ?? []) {
            const destinazione = (c?.to ?? '').split(/[?#]/)[0]
            const esiste = percorsiSito.has(destinazione) || GUIDA.some(x => percorsoArticolo(x) === destinazione)
            if (!esiste) err(`correlato verso «${c?.to}», che non è una pagina del sito.`)
            if (!pieno(c?.label) || !pieno(c?.labelEn)) err(`correlato «${c?.to}»: servono label e labelEn.`)
            if (destinazione === percorsoArticolo(a)) err('un articolo non può essere correlato a sé stesso.')
        }

        // ── Tutti i testi, nelle due lingue ──────────────────────────────
        const testi = [
            ['titolo', a.titolo], ['titoloEn', a.titoloEn], ['sintesi', a.sintesi], ['sintesiEn', a.sintesiEn],
            ['seo.titolo', a.seo?.titolo], ['seo.descrizione', a.seo?.descrizione],
            ...corpo.flatMap((b, i) => [b?.it, b?.en].flat().map(t => [`blocco ${i + 1}`, t])),
            ...domande.flatMap((d, i) => [[`domanda ${i + 1}`, d?.domanda], [`domanda ${i + 1}`, d?.domandaEn], [`risposta ${i + 1}`, d?.risposta], [`risposta ${i + 1}`, d?.rispostaEn]]),
        ].filter(([, t]) => pieno(t))

        const cifreAmmesse = new Set([`${PREZZO.daMq}€`, ...(a.cifre ?? []).map(c => chiaveDichiarata(c?.valore))])
        for (const c of a.cifre ?? []) {
            if (!pieno(String(c?.valore ?? '')) || !/^https:\/\/[^\s]+$/.test(c?.fonte ?? '')) err(`cifra «${c?.valore}»: serve una fonte https.`)
        }

        for (const [campo, testo] of testi) {
            // markup: dopo i due costrutti ammessi non deve restare nulla di simile
            const resto = scomponi(testo).filter(p => p.tipo === 'testo').map(p => p.testo).join('')
            if (/\*\*|\]\(|\[[^\]]*\]\s*\(/.test(resto)) err(`${campo}: markup malformato («${resto.slice(0, 60)}…»).`)

            for (const p of scomponi(testo).filter(x => x.tipo === 'link')) {
                if (interno(p.href)) {
                    const destinazione = p.href.split(/[?#]/)[0]
                    if (!percorsiSito.has(destinazione) && !GUIDA.some(x => percorsoArticolo(x) === destinazione)) {
                        err(`${campo}: collegamento a «${p.href}», che non è una pagina del sito.`)
                    }
                } else if (!/^https:\/\/[^\s]+$/.test(p.href)) {
                    err(`${campo}: collegamento «${p.href}» non è né interno né https.`)
                } else if (!urlFonti.has(p.href)) {
                    err(`${campo}: il collegamento esterno «${p.href}» va elencato anche fra le \`fonti\`.`)
                }
            }

            const piano = testoPiano(testo)
            for (const [regola, motivo] of VIETATE) {
                const m = piano.match(regola)
                if (m) err(`${campo}: «${m[0]}» — ${motivo}.`)
            }
            for (const m of piano.matchAll(/piscin[ae]\s+natural[ei]/gi)) {
                if (!/Rocks\s+Design/i.test(piano.slice(m.index, m.index + 120))) err(`${campo}: «${m[0]}» non è seguito da «Piscine Rocks Design».`)
            }
            for (const frase of FRASI_DELLA_CASA_MADRE) {
                if (piano.toLowerCase().includes(frase.toLowerCase())) err(`${campo}: frase ripresa dai materiali della casa madre («${frase}»).`)
            }
            for (const c of cifreNelTesto(piano)) {
                if (!cifreAmmesse.has(c.chiave)) {
                    err(`${campo}: la cifra «${c.grezza}» non ha fonte. Il prezzo viene solo da PREZZO (src/data/site.js); ogni altra cifra va dichiarata in \`cifre\` con la sua fonte.`)
                }
            }
        }

        // ── Sostanza ─────────────────────────────────────────────────────
        const corpoIt = corpo.flatMap(b => [b?.it].flat()).filter(pieno).join(' ')
        const corpoEn = corpo.flatMap(b => [b?.en].flat()).filter(pieno).join(' ')
        const n = parole(corpoIt)
        if (n < PAROLE_MIN) err(`corpo italiano di ${n} parole: il minimo è ${PAROLE_MIN}.`)
        if (n > PAROLE_MAX) err(`corpo italiano di ${n} parole: il massimo è ${PAROLE_MAX}.`)
        if (!/Rocks\s+Design/.test(testoPiano(corpoIt)) || !/Rocks\s+Design/.test(testoPiano(corpoEn))) err('il corpo deve nominare Piscine Rocks Design, in entrambe le lingue.')
        if (!/Sicilia/.test(testoPiano(corpoIt))) err('il corpo italiano deve nominare la Sicilia (SEO locale, direttiva della casa madre).')
        if (!/concessionari/i.test(testoPiano(corpoIt))) avvisi.push(`${dove}: il corpo non ricorda che Luna è concessionario autorizzato.`)
    }

    return { errori, avvisi }
}

// Eseguito da solo: `npm run verifica:guida`.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const { errori, avvisi } = await verificaGuida()
    for (const a of avvisi) console.log('⚠︎ ', a)
    if (errori.length) {
        console.error(`\n✗ ${errori.length} problemi negli articoli della guida:\n`)
        for (const e of errori) console.error('  •', e)
        process.exit(1)
    }
    console.log(`✓ ${GUIDA.length} articoli della guida conformi.`)
}
