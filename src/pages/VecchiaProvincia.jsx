import { Navigate, useParams } from '../lib/instradamento'
import { PROVINCE } from '../data/site'

/**
 * Le nove pagine provinciali di prima, ora sezioni di /piscine-rocks-design/sicilia.
 *
 * In produzione non si arriva mai qui: il server risponde 301 prima ancora di
 * servire la pagina (`public/.htaccess`, `server/sito-statico.js`). Questo
 * copre il server di sviluppo e un eventuale link interno dimenticato.
 */
export default function VecchiaProvincia() {
    const { provincia } = useParams()
    const p = PROVINCE.find(x => x.slug === provincia)
    if (!p) return <Navigate to="/404" replace />
    return <Navigate to={`/piscine-rocks-design/sicilia#${p.slug}`} replace />
}
