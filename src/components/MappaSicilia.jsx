import { PROVINCE } from '../data/site'
import { useLingua } from '../i18n/lingua'

/**
 * La Sicilia con i nove capoluoghi, in SVG dentro la pagina: niente librerie
 * di mappe, niente richieste a terzi, qualche centinaio di byte.
 *
 * Il contorno è una linea di costa semplificata (una cinquantina di punti),
 * proiettata da longitudine e latitudine reali con la correzione del coseno a
 * 37,5° N: le proporzioni dell'isola sono giuste, il dettaglio no, e non deve
 * esserlo — serve a dire «tutta l'isola», non a orientarsi.
 *
 * È decorativa: i collegamenti alle province stanno nell'elenco accanto, che
 * è testo vero, leggibile e navigabile da tastiera. Qui ogni capoluogo è un
 * punto e un nome. Caltanissetta è segnata in sabbia: è la provincia in cui
 * l'impresa è nata. Non indica una sede da visitare (vedi README).
 */
const COSTA =
    'M800 37 L776 61 L745 112 L714 163 L695 199 L686 244 L667 268 L669 298 L698 349 L698 382 L714 397 L679 445 L674 484 L681 511 L645 508 L610 502 L538 484 L503 433 L467 400 L393 388 L348 367 L293 331 L236 304 L189 268 L122 244 L72 223 L34 178 L43 133 L50 112 L74 88 L108 64 L131 94 L141 109 L189 73 L217 58 L255 79 L298 85 L336 124 L412 106 L479 112 L557 97 L586 70 L634 67 L703 37 L741 40 L800 37Z'

/** Capoluoghi proiettati come la costa; `a` è l'ancoraggio dell'etichetta. */
const CAPOLUOGHI = {
    palermo: { x: 255, y: 82, a: 'middle', dy: 34 },
    catania: { x: 667, y: 268, a: 'end', dx: -14 },
    messina: { x: 776, y: 61, a: 'end', dx: -14, dy: 18 },
    siracusa: { x: 714, y: 397, a: 'end', dx: -14 },
    ragusa: { x: 581, y: 439, a: 'end', dx: -14 },
    trapani: { x: 53, y: 112, a: 'start', dx: 14, dy: 18 },
    agrigento: { x: 308, y: 325, a: 'middle', dy: -16 },
    caltanissetta: { x: 422, y: 271, a: 'middle', dy: 30 },
    enna: { x: 474, y: 247, a: 'start', dx: 14, dy: -8 },
}

export default function MappaSicilia() {
    const { t } = useLingua()
    return (
        <figure className="pg-mappa">
            <svg viewBox="0 0 820 530" role="img" aria-label={t('Mappa della Sicilia con i nove capoluoghi di provincia', 'Map of Sicily with its nine provincial capitals')}>
                <path d={COSTA} className="pg-mappa-isola" />
                {PROVINCE.map(p => {
                    const c = CAPOLUOGHI[p.slug]
                    if (!c) return null
                    const nascita = p.slug === 'caltanissetta'
                    return (
                        <g key={p.slug} className={nascita ? 'pg-mappa-punto pg-mappa-nascita' : 'pg-mappa-punto'}>
                            {nascita && <circle cx={c.x} cy={c.y} r="16" className="pg-mappa-alone" />}
                            <circle cx={c.x} cy={c.y} r="6" />
                            <text x={c.x + (c.dx ?? 0)} y={c.y + (c.dy ?? 5)} textAnchor={c.a}>
                                {p.nome}
                            </text>
                        </g>
                    )
                })}
            </svg>
            <figcaption>
                <span className="pg-mappa-legenda" aria-hidden="true" />
                {t('Caltanissetta, la provincia in cui l’impresa è nata', 'Caltanissetta, the province where the company started')}
            </figcaption>
        </figure>
    )
}
