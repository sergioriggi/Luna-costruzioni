import { useCallback, useEffect, useMemo, useState } from 'react'
import Immagine, { tutteLeFoto } from './Immagine'

const FILTRI = [
    { tag: null, label: 'Tutte' },
    { tag: 'caraibi', label: 'Modello Caraibi' },
    { tag: 'mediterranea', label: 'Modello Mediterranea' },
    { tag: 'alpi', label: 'Modello Alpi' },
    { tag: 'cascate', label: 'Cascate' },
    { tag: 'idromassaggio', label: 'Idromassaggio' },
    { tag: 'sabbia', label: 'Sabbie naturali' },
    { tag: 'notte', label: 'Illuminazione' },
]

export default function Galleria({ filtrabile = true, slugs, colonne = 'md:grid-cols-3' }) {
    const [filtro, setFiltro] = useState(null)
    const [aperta, setAperta] = useState(null)

    const foto = useMemo(() => {
        const base = slugs ? slugs.map(s => tutteLeFoto.find(f => f.slug === s)).filter(Boolean) : tutteLeFoto
        return filtro ? base.filter(f => f.tags.includes(filtro)) : base
    }, [filtro, slugs])

    const chiudi = useCallback(() => setAperta(null), [])
    const scorri = useCallback(
        passo => setAperta(i => (i === null ? null : (i + passo + foto.length) % foto.length)),
        [foto.length],
    )

    useEffect(() => {
        if (aperta === null) return
        const onKey = e => {
            if (e.key === 'Escape') chiudi()
            if (e.key === 'ArrowRight') scorri(1)
            if (e.key === 'ArrowLeft') scorri(-1)
        }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [aperta, chiudi, scorri])

    const corrente = aperta === null ? null : foto[aperta]

    return (
        <div>
            {filtrabile && (
                <div className="mb-8 flex flex-wrap gap-2">
                    {FILTRI.map(f => (
                        <button
                            key={f.label}
                            type="button"
                            onClick={() => setFiltro(f.tag)}
                            aria-pressed={filtro === f.tag}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                                filtro === f.tag
                                    ? 'bg-notte-800 text-neutro-200'
                                    : 'border border-testo/[0.16] text-neutro-400 hover:border-testo/[0.45] hover:text-testo'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            )}

            <ul className={`grid gap-4 sm:grid-cols-2 ${colonne}`}>
                {foto.map((f, i) => (
                    <li key={f.slug}>
                        <button
                            type="button"
                            onClick={() => setAperta(i)}
                            className="group block w-full overflow-hidden rounded-lg text-left shadow-sm transition hover:shadow-morbida"
                        >
                            <Immagine
                                slug={f.slug}
                                ratio="4 / 3"
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                                imgClassName="transition duration-700 group-hover:scale-105"
                            />
                            {f.caption && (
                                <span className="block bg-superficie px-4 py-3 text-sm text-neutro-400">{f.caption}</span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            {foto.length === 0 && (
                <p className="testo-lungo">Nessuna immagine per questo filtro.</p>
            )}

            {corrente && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-notte-800/95 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={corrente.alt}
                    onClick={chiudi}
                >
                    <button
                        type="button"
                        onClick={chiudi}
                        className="absolute right-4 top-4 rounded-full bg-superficie/10 p-3 text-testo hover:bg-superficie/20"
                        aria-label="Chiudi"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={e => { e.stopPropagation(); scorri(-1) }}
                        className="absolute left-2 rounded-full bg-superficie/10 p-3 text-testo hover:bg-superficie/20 sm:left-6"
                        aria-label="Immagine precedente"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <figure className="max-h-full w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                        <img
                            src={corrente.fallback}
                            srcSet={corrente.srcset}
                            sizes="(min-width: 1024px) 900px, 92vw"
                            alt={corrente.alt}
                            width={corrente.width}
                            height={corrente.height}
                            className="mx-auto max-h-[76vh] w-auto rounded-xl object-contain"
                        />
                        <figcaption className="mt-4 text-center text-sm text-neutro-300">
                            {corrente.caption ?? corrente.alt}
                        </figcaption>
                    </figure>

                    <button
                        type="button"
                        onClick={e => { e.stopPropagation(); scorri(1) }}
                        className="absolute right-2 rounded-full bg-superficie/10 p-3 text-testo hover:bg-superficie/20 sm:right-6"
                        aria-label="Immagine successiva"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}
