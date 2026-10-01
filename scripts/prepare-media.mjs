/**
 * Pipeline immagini del sito Luna Costruzioni srl.
 *
 *   media-sources/foto/*  ──▶  public/media/<slug>-<w>.webp | .jpg
 *                              public/media/<slug>-verticale-<w>.webp | .jpg
 *                              src/data/media.json
 *
 * Su ogni fotografia di piscina viene impressa la filigrana
 * «PISCINE ROCKS DESIGN», come prescritto dalle direttive del
 * dipartimento marketing Rocks Design.
 *
 *   npm run media              genera le immagini mancanti e il manifest
 *   npm run media -- --rifai   ricodifica tutto, anche i file già presenti
 *   npm run media -- --manifest rigenera solo src/data/media.json
 *
 * REGOLA INCREMENTALE. Un file di uscita che esiste già in `public/media`
 * non viene ricodificato: la sorgente non cambia mai (è una whitelist di
 * scatti approvati) e il nome del file ne fissa slug, taglio e larghezza.
 * Così aggiungere una foto o un ritaglio costa solo i file nuovi, invece di
 * riscrivere ~115 binari identici a ogni esecuzione e sporcare `git status`.
 * Quando cambiano davvero la filigrana, la qualità o la sorgente di uno
 * scatto, si passa `--rifai` (oppure si cancellano a mano i file da rifare).
 *
 * La modalità `--manifest` serve quando cambiano solo i testi (alt, didascalie,
 * tag): non tocca nessun file grafico e scrive il manifest dalla sola config.
 */
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { PHOTOS, SOURCE_DIR, WIDTHS, FALLBACK_WIDTH } from './media.config.mjs'

const ROOT = path.resolve('.')
const OUT_DIR = path.join(ROOT, 'public', 'media')
const DATA_FILE = path.join(ROOT, 'src', 'data', 'media.json')
const WATERMARK = path.join(ROOT, 'public', 'brand', 'watermark.png')

async function watermarkFor(width) {
    // la filigrana occupa il 38% della larghezza, con margine proporzionale
    const target = Math.round(width * 0.34)
    return sharp(WATERMARK)
        .resize({ width: target })
        .composite([{
            input: Buffer.from([255, 255, 255, Math.round(255 * 0.72)]),
            raw: { width: 1, height: 1, channels: 4 },
            tile: true,
            blend: 'dest-in',
        }])
        .png()
        .toBuffer()
}

async function lqip(src) {
    const buf = await sharp(src).resize({ width: 20 }).blur(1).webp({ quality: 35 }).toBuffer()
    return `data:image/webp;base64,${buf.toString('base64')}`
}

async function esiste(file) {
    try {
        await fs.access(file)
        return true
    } catch {
        return false
    }
}

const soloManifest = process.argv.includes('--manifest')
const rifai = process.argv.includes('--rifai')

/**
 * Codifica una variante (webp + eventuale jpeg di riserva) a partire da un
 * `resize` già impostato. Applica la regola incrementale: se il file c'è
 * e non si è chiesto `--rifai`, non lo tocca. Ritorna i nomi scritti.
 */
async function codifica(ridimensionata, photo, nome, width, conJpeg) {
    const webp = path.join(OUT_DIR, `${nome}.webp`)
    const jpg = path.join(OUT_DIR, `${nome}.jpg`)
    const daFare = []
    if (rifai || !(await esiste(webp))) daFare.push('webp')
    if (conJpeg && (rifai || !(await esiste(jpg)))) daFare.push('jpg')
    if (daFare.length === 0) return []

    const composited = photo.noWatermark
        ? ridimensionata
        : ridimensionata.composite([{ input: await watermarkFor(width), gravity: 'southeast' }])

    const pipeline = composited.clone()
    if (daFare.includes('webp')) await pipeline.clone().webp({ quality: 74 }).toFile(webp)
    if (daFare.includes('jpg')) await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(jpg)
    return daFare.map(ext => `${nome}.${ext}`)
}

async function run() {
    await fs.mkdir(OUT_DIR, { recursive: true })
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })

    const manifest = []
    let scritti = 0
    for (const photo of PHOTOS) {
        const src = path.join(ROOT, SOURCE_DIR, photo.file)
        if (!(await esiste(src))) {
            console.warn('⚠︎  sorgente mancante, salto:', photo.file)
            continue
        }

        const meta = await sharp(src).rotate().metadata()
        const natural = { width: meta.width, height: meta.height }
        // non si ingrandisce mai la sorgente: l'ultimo passo è la larghezza nativa
        const cap = Math.min(natural.width, Math.max(...WIDTHS))
        const widths = [...new Set([...WIDTHS.filter(w => w < cap), cap])]

        // un solo JPEG di riserva per browser datati e per le anteprime social
        const jpegWidth = Math.max(...widths.filter(w => w <= FALLBACK_WIDTH), widths[0])

        const nuovi = []
        for (const w of widths) {
            if (soloManifest) continue
            const base = sharp(src).rotate().resize({ width: w, withoutEnlargement: true })
            nuovi.push(...await codifica(base, photo, `${photo.slug}-${w}`, w, w === jpegWidth))
        }

        const ratio = natural.height / natural.width

        // Ritaglio verticale (vedi `verticale` in media.config.mjs): stesso
        // scatto, proporzione alta, tagliato con `fit: 'cover'`. Anche qui non
        // si ingrandisce: la larghezza massima è quella che la sorgente regge
        // a quella proporzione.
        let verticale = null
        if (photo.verticale) {
            const { proporzione: [pw, ph], larghezze, posizione } = photo.verticale
            // senza larghezze `Math.max()` darebbe -Infinity e il manifest
            // uscirebbe sbagliato in silenzio: meglio fermarsi subito
            if (!larghezze?.length) throw new Error(`${photo.slug}: \`verticale.larghezze\` è vuoto, servono una o più larghezze in px`)
            const capV = Math.min(natural.width, Math.floor(natural.height * pw / ph))
            const widthsV = [...new Set([...larghezze.filter(w => w < capV), Math.min(capV, Math.max(...larghezze))])]
            const alto = w => Math.round(w * ph / pw)
            const wMax = Math.max(...widthsV)
            const nomeV = w => `${photo.slug}-verticale-${w}`
            for (const w of widthsV) {
                if (soloManifest) continue
                const base = sharp(src).rotate().resize({ width: w, height: alto(w), fit: 'cover', position: posizione })
                // Niente JPEG di riserva: la <source> che usa il ritaglio è solo
                // WebP e l'<img> conserva come `src` il JPEG dell'orizzontale.
                nuovi.push(...await codifica(base, photo, nomeV(w), w, false))
            }
            verticale = {
                width: wMax,
                height: alto(wMax),
                widths: widthsV,
                srcset: widthsV.map(w => `/media/${nomeV(w)}.webp ${w}w`).join(', '),
            }
        }

        manifest.push({
            slug: photo.slug,
            alt: photo.alt,
            caption: photo.caption ?? null,
            tags: photo.tags,
            hero: Boolean(photo.hero),
            width: natural.width,
            height: natural.height,
            aspect: Number((natural.width / natural.height).toFixed(4)),
            widths,
            fallback: `/media/${photo.slug}-${jpegWidth}.jpg`,
            srcset: widths.map(w => `/media/${photo.slug}-${w}.webp ${w}w`).join(', '),
            sizes: widths.map(w => ({ w, h: Math.round(w * ratio) })),
            lqip: await lqip(src),
            ...(verticale && { verticale }),
        })
        scritti += nuovi.length
        const taglio = verticale ? ` + verticale ${verticale.widths.join('/')}` : ''
        const stato = soloManifest ? '' : nuovi.length ? ` — scritti ${nuovi.join(', ')}` : ' — già presenti'
        console.log('✓', photo.slug, `(${widths.join('/')}${taglio})${stato}`)
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(manifest, null, 2) + '\n')
    console.log(
        soloManifest
            ? `\nManifest aggiornato per ${manifest.length} immagini (file grafici invariati).`
            : `\n${manifest.length} immagini in public/media (${scritti} file scritti${rifai ? ', ricodifica forzata' : ''}), manifest in src/data/media.json`,
    )
}

run().catch(err => { console.error(err); process.exit(1) })
