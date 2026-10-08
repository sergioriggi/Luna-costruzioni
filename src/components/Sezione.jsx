import { Link } from '../lib/instradamento'
import Rivela from './Rivela'
import BottoneWhatsApp from './BottoneWhatsApp'

/**
 * Sezione delle pagine interne. Stesso ritmo della home (pagina.css,
 * `.pg-sezione`): 120/128 px sopra e sotto su schermo largo, 88/96 sotto i
 * 1100, 72/80 su telefono; colonna di 1320 px (`.contenitore`). Prima le
 * pagine interne avevano 80-96 px e 1240: uscendo dalla home sembrava un
 * altro sito.
 */
export function Sezione({ id, className = '', sfondo = '', children }) {
    return (
        <section id={id} className={`pt-[72px] pb-20 md:pt-[88px] md:pb-24 xl:pt-[120px] xl:pb-32 ${sfondo} ${className}`}>
            <div className="contenitore">{children}</div>
        </section>
    )
}

/**
 * Intestazione di sezione: titolo e, se c'è, una riga di testo.
 *
 * `occhiello` non si stampa più. La regola del sito (DESIGN.md, «The Rationed
 * Label Rule») ammette al massimo un occhiello ogni tre sezioni, e le pagine
 * interne ne avevano uno su ogni sezione: l'unico rimasto è quello in apertura
 * di pagina. La prop resta accettata per non toccare ogni chiamata, e perché
 * dice a chi legge il codice di che sezione si tratta.
 */
// eslint-disable-next-line no-unused-vars
export function IntestazioneSezione({ occhiello, titolo, testo, allineamento = 'sinistra', children }) {
    const centro = allineamento === 'centro'
    return (
        <Rivela className={`max-w-prosa ${centro ? 'mx-auto text-center' : ''}`}>
            <h2 className="titolo-sezione">{titolo}</h2>
            {testo && <p className="testo-lungo mt-5">{testo}</p>}
            {children}
        </Rivela>
    )
}

export function Briciole({ voci }) {
    return (
        <nav aria-label="Percorso di navigazione" className="border-b border-testo/[0.16] bg-superficie">
            <div className="contenitore">
                <ol className="flex flex-wrap items-center gap-2 py-3 text-xs text-neutro-500">
                    {voci.map((v, i) => (
                        <li key={v.to} className="flex items-center gap-2">
                            {i > 0 && <span aria-hidden="true">/</span>}
                            {i === voci.length - 1 ? (
                                <span aria-current="page" className="font-medium text-neutro-300">{v.label}</span>
                            ) : (
                                <Link to={v.to} className="hover:text-testo">{v.label}</Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}

/**
 * Blocco di chiusura di una pagina.
 *
 * `whatsapp` aggiunge il tasto per scrivere subito: serve alle pagine che non
 * ospitano il modulo di contatto, dove l'unica strada era un rimando a
 * /contatti. Su telefono la barra in basso c'è già; su computer, senza
 * questo, non c'era nulla.
 */
export function Cta({ titolo, testo, primaria = { to: '/contatti', label: 'Chiedi un preventivo' }, secondaria, whatsapp = false }) {
    // `data-cta-finale`: è il riquadro di chiusura, che la misura delle
    // ripetizioni (scripts/misura-ripetizioni.mjs) conta a parte.
    return (
        <div data-cta-finale="">
        <Sezione>
            <Rivela className="overflow-hidden rounded-lg border border-testo/[0.08] bg-superficie px-6 py-14 text-center sm:px-14">
                <h2 className="font-display text-3xl text-testo sm:text-4xl">{titolo}</h2>
                <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-neutro-400">{testo}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link to={primaria.to} className="bottone-pieno">{primaria.label}</Link>
                    {secondaria && (
                        <Link to={secondaria.to} className="bottone-secondario">
                            {secondaria.label}
                        </Link>
                    )}
                    {whatsapp && (
                        <BottoneWhatsApp icona className="bottone-secondario" />
                    )}
                </div>
            </Rivela>
        </Sezione>
        </div>
    )
}
