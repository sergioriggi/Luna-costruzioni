import { Link } from '../lib/instradamento'
import { scomponi, interno } from '../lib/testo-ricco'

/**
 * Rende un testo della guida con il suo poco markup (vedi `src/lib/testo-ricco.js`).
 *
 * I collegamenti interni passano dal router, come ogni altro link del sito;
 * quelli esterni sono fonti citate e si aprono in una scheda nuova, senza
 * passare autorevolezza (`nofollow`) né il riferimento della pagina.
 */
export default function TestoRicco({ testo }) {
    return scomponi(testo).map((p, i) => {
        if (p.tipo === 'grassetto') return <strong key={i} className="font-semibold text-testo">{p.testo}</strong>
        if (p.tipo === 'link') {
            return interno(p.href) ? (
                <Link key={i} to={p.href} className="link-sottile">{p.testo}</Link>
            ) : (
                <a key={i} href={p.href} className="link-sottile" target="_blank" rel="noopener noreferrer nofollow">
                    {p.testo}
                </a>
            )
        }
        return p.testo
    })
}
