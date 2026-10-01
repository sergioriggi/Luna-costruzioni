import media from '../data/media.json'
import { pubblico, pubblicoSrcset } from '../lib/percorso'

const indice = new Map(media.map(m => [m.slug, m]))

export function scheda(slug) {
    const m = indice.get(slug)
    if (!m) throw new Error(`Immagine non trovata nel manifest: ${slug}`)
    return m
}

/** Sotto questa larghezza il browser preferisce il ritaglio verticale. */
const SCHERMO_STRETTO = '(max-width: 900px)'

/**
 * Immagine come nel file approvato: un solo <img>, con la classe `.lighten`
 * del sistema Nocturne, posato direttamente sul fondo della pagina.
 *
 * Rispetto a un `<img>` semplice aggiunge soltanto `srcset`: la stessa foto
 * viene servita a 640, 1280 o 1920 px secondo lo schermo. Ogni scatto esce
 * dalla pipeline con la filigrana «Piscine Rocks Design» già impressa.
 *
 * Se il manifest porta anche un ritaglio `verticale` (vedi media.config.mjs),
 * l'<img> viene avvolto in un <picture> con una <source> per gli schermi
 * stretti: il telefono scarica il taglio alto, il desktop resta com'era.
 * Il punto di rottura è lo stesso di `.pg-eroe` in pagina.css. La <source>
 * porta anche width/height del ritaglio, così il rapporto implicito
 * dell'immagine è giusto anche fuori dall'eroe, in un contenitore a flusso.
 */
export default function Foto({ slug, className = '', sizes = '100vw', priority = false, alt }) {
    const m = scheda(slug)

    const img = (
        <img
            className={`lighten ${className}`.trim()}
            src={pubblico(m.fallback)}
            srcSet={pubblicoSrcset(m.srcset)}
            sizes={sizes}
            alt={alt ?? m.alt}
            width={m.width}
            height={m.height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding={priority ? 'sync' : 'async'}
        />
    )

    if (!m.verticale) return img

    return (
        <picture>
            <source
                media={SCHERMO_STRETTO}
                type="image/webp"
                srcSet={pubblicoSrcset(m.verticale.srcset)}
                sizes={sizes}
                width={m.verticale.width}
                height={m.verticale.height}
            />
            {img}
        </picture>
    )
}
