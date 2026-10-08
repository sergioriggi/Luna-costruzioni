import { Link } from '../lib/instradamento'
import { useLingua } from '../i18n/lingua'
import BottoneWhatsApp from './BottoneWhatsApp'
import BottoneTelefono from './BottoneTelefono'

/**
 * Barra di contatto fissata in basso, solo su telefono: WhatsApp, Chiama e
 * Preventivo, a un tocco da ogni pagina.
 *
 * C'è dal primo istante, già nell'HTML pre-renderizzato: niente JavaScript per
 * farla comparire e niente spostamenti. Una versione precedente entrava solo
 * dopo il 60% di schermo scorso, e il collaudo ha mostrato che così su 5
 * pagine su 11 all'apertura non c'era niente da toccare: né telefono né
 * preventivo. Il preventivo non c'era proprio.
 *
 * Mentre il banner dei cookie è aperto la barra si fa da parte (regola
 * `html[data-consenso-aperto]` in pagina.css): i due si coprivano a vicenda.
 *
 * Un solo pulsante pieno, il preventivo. WhatsApp tiene il suo verde solo
 * nell'icona: un secondo colore pieno sullo schermo romperebbe la regola del
 * turchese che vuol dire «si tocca». «Chiama» invece del numero: in 390 px il
 * numero andava a capo.
 */
export default function AzioniRapide() {
    const { t } = useLingua()

    return (
        <div className="pg-barra sm:hidden">
            <BottoneWhatsApp icona className="pg-barra-voce">
                WhatsApp
            </BottoneWhatsApp>
            <BottoneTelefono className="pg-barra-voce">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M6.6 3h3l1.5 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" strokeLinejoin="round" />
                </svg>
                {t('Chiama', 'Call')}
            </BottoneTelefono>
            <Link to="/contatti" className="pg-barra-voce pg-barra-preventivo">
                {t('Preventivo', 'Get a quote')}
            </Link>
        </div>
    )
}
