/**
 * Pipeline immagini del sito Luna Costruzioni srl.
 *
 *   media-sources/foto/*  ──▶  public/media/<slug>-<w>.webp | .jpg
 *                              src/data/media.json
 *
 * Su ogni fotografia di piscina viene impressa la filigrana
 * «PISCINE ROCKS DESIGN», come prescritto dalle direttive del
 * dipartimento marketing Rocks Design.
 *
 *   npm run media              rigenera immagini e manifest
 *   npm run media -- --manifest rigenera solo src/data/media.json
 *
 * La modalità `--manifest` serve quando cambiano solo i testi (alt, didascalie,
 * tag): evita di ricodificare centinaia di file identici e di sporcare la
 * cronologia del repository con 20 MB di differenze binarie.
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

const soloManifest = process.argv.includes('--manifest')

async function run() {
    await fs.mkdir(OUT_DIR, { recursive: true })
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })

    const manifest = []
    for (const photo of PHOTOS) {
        const src = path.join(ROOT, SOURCE_DIR, photo.file)
        try {
            await fs.access(src)
        } catch {
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

        const sources = []
        for (const w of widths) {
            if (soloManifest) {
                sources.push(w)
                continue
            }
            const base = sharp(src).rotate().resize({ width: w, withoutEnlargement: true })
            const composited = photo.noWatermark
                ? base
                : base.composite([{ input: await watermarkFor(w), gravity: 'southeast' }])

            const pipeline = composited.clone()
            await pipeline.clone().webp({ quality: 74 }).toFile(path.join(OUT_DIR, `${photo.slug}-${w}.webp`))
            if (w === jpegWidth) {
                await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT_DIR, `${photo.slug}-${w}.jpg`))
            }
            sources.push(w)
        }

        const ratio = natural.height / natural.width

        manifest.push({
            slug: photo.slug,
            alt: photo.alt,
            caption: photo.caption ?? null,
            tags: photo.tags,
            hero: Boolean(photo.hero),
            width: natural.width,
            height: natural.height,
            aspect: Number((natural.width / natural.height).toFixed(4)),
            widths: sources,
            fallback: `/media/${photo.slug}-${jpegWidth}.jpg`,
            srcset: sources.map(w => `/media/${photo.slug}-${w}.webp ${w}w`).join(', '),
            sizes: sources.map(w => ({ w, h: Math.round(w * ratio) })),
            lqip: await lqip(src),
        })
        console.log('✓', photo.slug, `(${sources.join('/')})`)
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(manifest, null, 2) + '\n')
    console.log(
        soloManifest
            ? `\nManifest aggiornato per ${manifest.length} immagini (file grafici invariati).`
            : `\n${manifest.length} immagini pubblicate in public/media, manifest in src/data/media.json`,
    )
}

run().catch(err => { console.error(err); process.exit(1) })
