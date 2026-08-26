/**
 * Estrae il logo ufficiale "Rocks Design - Piscine Naturali" dal catalogo
 * fornito dalla casa madre e genera:
 *   public/brand/rocks-design-logo.png   -> logo su sfondo trasparente
 *   public/brand/watermark.png           -> filigrana applicata a ogni foto
 *
 * Il logo e' materiale ufficiale Piscine Rocks Design, utilizzato da
 * Luna Costruzioni srl in qualita' di concessionario autorizzato.
 */
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const ROOT = path.resolve('.')
const OUT = path.join(ROOT, 'public', 'brand')

// Ritaglio del marchio dalla copertina del catalogo (fondo sabbia chiaro)
const SOURCE = path.join(ROOT, 'media-sources', 'catalogo', '0001.jpg')
const CROP = { left: 0, top: 0, width: 260, height: 1684 } // colonna sinistra, marchio ruotato
const LOGO_BOX = { left: 380, top: 18, width: 950, height: 205 } // dopo rotazione 90°

const smoothstep = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)
}

async function extractLogo() {
    const rotated = await sharp(SOURCE).extract(CROP).rotate(90).png().toBuffer()
    const { data, info } = await sharp(rotated)
        .extract(LOGO_BOX)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

    // colore di fondo campionato nell'angolo alto-sinistro
    let br = 0, bg = 0, bb = 0, n = 0
    for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 40; x++) {
            const i = (y * info.width + x) * info.channels
            br += data[i]; bg += data[i + 1]; bb += data[i + 2]; n++
        }
    }
    br /= n; bg /= n; bb /= n

    for (let i = 0; i < data.length; i += info.channels) {
        const d = Math.hypot(data[i] - br, data[i + 1] - bg, data[i + 2] - bb)
        data[i + 3] = Math.round(255 * smoothstep(26, 50, d))
    }

    // Ricostruisce la banda bianca del tricolore, che il chroma key rimuove
    // insieme al fondo sabbia: individua le barre verde e rossa e riempie il vuoto.
    const box = (test) => {
        let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1
        for (let y = 0; y < info.height; y++) {
            for (let x = 0; x < info.width; x++) {
                const i = (y * info.width + x) * info.channels
                if (data[i + 3] > 120 && test(data[i], data[i + 1], data[i + 2])) {
                    if (x < x0) x0 = x
                    if (x > x1) x1 = x
                    if (y < y0) y0 = y
                    if (y > y1) y1 = y
                }
            }
        }
        return x1 < 0 ? null : { x0, y0, x1, y1 }
    }
    const green = box((r, g, b) => g > r + 45 && g > b + 35 && g > 90)
    const red = box((r, g, b) => r > g + 60 && r > b + 60 && r > 110)
    if (green && red && red.x0 > green.x1) {
        const top = Math.min(green.y0, red.y0)
        const bottom = Math.max(green.y1, red.y1)
        for (let y = top; y <= bottom; y++) {
            for (let x = green.x1 + 1; x < red.x0; x++) {
                const i = (y * info.width + x) * info.channels
                data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; data[i + 3] = 255
            }
        }
    }

    await fs.mkdir(OUT, { recursive: true })
    await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
        .trim({ threshold: 1 })
        .resize({ width: 900, withoutEnlargement: true })
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUT, 'rocks-design-logo.png'))

    console.log('✓ public/brand/rocks-design-logo.png')
}

async function buildWatermark() {
    // filigrana testuale obbligatoria su ogni fotografia di piscina Rocks Design
    // La filigrana include gia' il margine (padding a destra e in basso):
    // viene composita con gravity "southeast" e resta staccata dal bordo.
    // La filigrana include gia' il margine (padding a destra e in basso):
    // viene compositata con gravity "southeast" e resta staccata dal bordo.
    // Il contorno scuro (paint-order: stroke) la rende leggibile anche sulla
    // sabbia bianca, senza bisogno di un riquadro opaco.
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="230">
  <g fill="#ffffff" stroke="#0a2226" stroke-opacity="0.55" stroke-linejoin="round"
     paint-order="stroke fill" font-family="Georgia, 'Times New Roman', serif">
    <text x="24" y="86" font-size="58" letter-spacing="13" stroke-width="7">PISCINE ROCKS DESIGN</text>
    <text x="28" y="134" font-size="27" letter-spacing="6.4" stroke-width="4.5">LUNA COSTRUZIONI · CONCESSIONARIO SICILIA</text>
  </g>
</svg>`
    await fs.mkdir(OUT, { recursive: true })
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'watermark.png'))
    console.log('✓ public/brand/watermark.png')
}

await extractLogo()
await buildWatermark()
