import media from '../data/media.json'
import { pubblico, pubblicoSrcset } from '../lib/percorso'

const indice = new Map(media.map(m => [m.slug, m]))

export function scheda(slug) {
    const m = indice.get(slug)
    if (!m) throw new Error(`Immagine non trovata nel manifest: ${slug}`)
    return m
}

/**
 * Immagine come nel file approvato: un solo <img>, con la classe `.lighten`
 * del sistema Nocturne, posato direttamente sul fondo della pagina.
 *
 * Rispetto a un `<img>` semplice aggiunge soltanto `srcset`: la stessa foto
 * viene servita a 640, 1280 o 1920 px secondo lo schermo. Ogni scatto esce
 * dalla pipeline con la filigrana «Piscine Rocks Design» già impressa.
 */
export default function Foto({ slug, className = '', sizes = '100vw', priority = false, alt }) {
    const m = scheda(slug)

    return (
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
}
