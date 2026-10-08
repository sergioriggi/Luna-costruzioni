import { useCallback, useEffect, useMemo, useState } from 'react'
import Immagine, { tutteLeFoto, testiFoto } from './Immagine'
import CreditoFoto from './CreditoFoto'
import { pubblico, pubblicoSrcset } from '../lib/percorso'
import { MODELLI } from '../data/modelli'
import { useLingua } from '../i18n/lingua'

const FILTRI = [
    { tag: null, label: 'Tutte', labelEn: 'All' },
    { tag: 'caraibi', label: 'Modello Caraibi', labelEn: 'Caraibi model' },
    { tag: 'mediterranea', label: 'Modello Mediterranea', labelEn: 'Mediterranea model' },
    { tag: 'alpi', label: 'Modello Alpi', labelEn: 'Alpi model' },
    { tag: 'cascate', label: 'Cascate', labelEn: 'Waterfalls' },
    { tag: 'idromassaggio', label: 'Idromassaggio', labelEn: 'Hydromassage' },
    { tag: 'sabbia', label: 'Sabbie naturali', labelEn: 'Natural sands' },
    { tag: 'notte', label: 'Illuminazione', labelEn: 'Lighting' },
]

/**
 * Feste, ricevimenti e matrimoni: scatti della casa madre che raccontano un
 * evento, non la piscina. Restano dove servono (la pagina hotel ne usa
 * alcuni, con la sua didascalia), ma non nella galleria del prodotto.
 */
const FUORI_GALLERIA = new Set(['notte-luci-e-festa', 'ricevimento-a-bordo-acqua', 'cascata-e-massi-al-crepuscolo', 'cena-in-giardino'])

/**
 * I filtri per modello seguono le pagine dei modelli: una foto mostrata su
 * /modelli/mediterranea è una Mediterranea anche qui. Prima i tag del
 * manifest dicevano altro (la stessa foto «Caraibi» in galleria e
 * «Mediterranea» sulla pagina del modello). Le foto che nessuna pagina di
 * modello usa tengono il tag del manifest.
 */
const TAG_MODELLO = new Set(MODELLI.map(m => m.tag))
const MODELLO_DI = new Map(MODELLI.flatMap(m => [m.copertina, ...m.galleria.map(g => g.slug)].map(slug => [slug, m.tag])))
const FOTO_GALLERIA = tutteLeFoto
    .filter(f => !FUORI_GALLERIA.has(f.slug))
    .map(f => {
        const modello = MODELLO_DI.get(f.slug)
        if (!modello) return f
        return { ...f, tags: [...f.tags.filter(tag => !TAG_MODELLO.has(tag)), modello] }
    })

/**
 * Galleria con lightbox.
 *
 * Senza `voci` mostra tutte le fotografie con la didascalia del manifest
 * (media.json): è la pagina /galleria, ed è l'unico posto dove quelle
 * didascalie si leggono.
 *
 * Con `voci` — `[{ slug, didascalia }]` — mostra solo quelle foto, e la
 * didascalia la scrive la pagina che le usa. È obbligatoria: la stessa
 * didascalia su più pagine era uno dei testi più ripetuti del sito, e una
 * foto sulla pagina delle sabbie va raccontata per la sabbia, non come in
 * galleria.
 */
export default function Galleria({ filtrabile = true, voci, colonne = 'md:grid-cols-3' }) {
    const { t, lingua } = useLingua()
    const [filtro, setFiltro] = useState(null)
    const [aperta, setAperta] = useState(null)

    const foto = useMemo(() => {
        const base = voci
            ? voci.map(v => {
                  const f = tutteLeFoto.find(x => x.slug === v.slug)
                  if (!f) throw new Error(`Immagine non trovata nel manifest: ${v.slug}`)
                  if (!v.didascalia) throw new Error(`Manca la didascalia di pagina per ${v.slug}`)
                  return { ...f, alt: testiFoto(f, lingua).alt, caption: v.didascalia }
              })
            : FOTO_GALLERIA.map(f => ({ ...f, ...testiFoto(f, lingua) }))
        return filtro ? base.filter(f => f.tags.includes(filtro)) : base
    }, [filtro, voci, lingua])

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
                            {t(f.label, f.labelEn)}
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
                                <span data-didascalia="" className="block bg-superficie px-4 py-3 text-sm text-neutro-400">{f.caption}</span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Ogni galleria del sito mostra piscine della casa madre: la riga lo dice sempre. */}
            {foto.length > 0 && <CreditoFoto className="mt-6" />}

            {foto.length === 0 && (
                <p className="testo-lungo">{t('Nessuna immagine per questo filtro.', 'No images for this filter.')}</p>
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
                        aria-label={t('Chiudi', 'Close')}
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={e => { e.stopPropagation(); scorri(-1) }}
                        className="absolute left-2 rounded-full bg-superficie/10 p-3 text-testo hover:bg-superficie/20 sm:left-6"
                        aria-label={t('Immagine precedente', 'Previous image')}
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <figure className="max-h-full w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                        <img
                            src={pubblico(corrente.fallback)}
                            srcSet={pubblicoSrcset(corrente.srcset)}
                            sizes="(min-width: 1024px) 900px, 92vw"
                            alt={corrente.alt}
                            width={corrente.width}
                            height={corrente.height}
                            // `async` e non `lazy`: il lightbox si apre su clic,
                            // l'immagine deve partire subito — ma decodificarla
                            // fuori dal thread principale evita lo scatto
                            // dell'animazione di apertura su telefono.
                            decoding="async"
                            className="mx-auto max-h-[76vh] w-auto rounded-lg object-contain"
                        />
                        <figcaption className="mt-4 text-center text-sm text-neutro-300">
                            {corrente.caption ?? corrente.alt}
                        </figcaption>
                    </figure>

                    <button
                        type="button"
                        onClick={e => { e.stopPropagation(); scorri(1) }}
                        className="absolute right-2 rounded-full bg-superficie/10 p-3 text-testo hover:bg-superficie/20 sm:right-6"
                        aria-label={t('Immagine successiva', 'Next image')}
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
