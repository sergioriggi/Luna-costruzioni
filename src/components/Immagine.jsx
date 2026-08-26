import media from '../data/media.json'

const indice = new Map(media.map(m => [m.slug, m]))

export function foto(slug) {
    const m = indice.get(slug)
    if (!m) throw new Error(`Immagine non trovata nel manifest: ${slug}`)
    return m
}

export function fotoConTag(tag) {
    return media.filter(m => m.tags.includes(tag))
}

export const tutteLeFoto = media

/**
 * <picture> responsive costruito dal manifest generato da `npm run media`.
 * Ogni scatto di piscina porta già impressa la filigrana «Piscine Rocks Design».
 */
export default function Immagine({
    slug,
    sizes = '100vw',
    className = '',
    imgClassName = '',
    priority = false,
    ratio,
    /** riempi: l'immagine copre il contenitore, senza imporre proporzioni. */
    riempi = false,
    children,
}) {
    const m = foto(slug)
    const aspetto = ratio ?? `${m.width} / ${m.height}`

    return (
        <figure
            // con `riempi` il posizionamento lo decide chi usa il componente:
            // non imponiamo `relative`, che vincerebbe su `absolute`.
            className={`overflow-hidden ${riempi ? '' : 'relative'} ${className}`}
            style={riempi ? undefined : { aspectRatio: aspetto }}
        >
            <img
                src={m.lqip}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-105 object-cover blur-lg"
            />
            <img
                src={m.fallback}
                srcSet={m.srcset}
                sizes={sizes}
                alt={m.alt}
                width={m.width}
                height={m.height}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding={priority ? 'sync' : 'async'}
                className={`relative h-full w-full object-cover ${imgClassName}`}
            />
            {children}
        </figure>
    )
}
