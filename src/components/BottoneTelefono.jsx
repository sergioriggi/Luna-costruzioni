import { AZIENDA } from '../data/site'
import { segnalaConversione } from '../lib/conversione'

/**
 * Collegamento «chiama», con la conversione attaccata.
 *
 * Esiste per lo stesso motivo di `BottoneWhatsApp`: i `tel:` erano tredici,
 * sparsi in dodici file fra testata, piè di pagina, moduli e pagine. Attaccare
 * l'evento a mano su ognuno significa che il quattordicesimo — quello che
 * aggiungerà qualcun altro fra sei mesi — non lo avrà, e nessuno se ne
 * accorgerà: non si rompe niente, semplicemente quelle chiamate non si contano
 * più. Passando tutti da qui, la misura è una proprietà del componente.
 *
 * Il numero non si scrive: viene da `AZIENDA`, unica fonte. `children` regge i
 * casi diversi — icona più numero nella barra mobile, solo il numero altrove.
 *
 * Le proprietà accettate sono solo queste due, come in `BottoneWhatsApp`: un
 * `onClick` o un `href` passati dall'esterno sostituirebbero in silenzio la
 * misura o il numero, cioè proprio ciò che il componente esiste per garantire.
 *
 * Nessun `preventDefault`, nessuna attesa artificiale prima di aprire il
 * telefono. In prova il clic su `tel:` ha fatto ripartire la pagina, ma
 * l'evento è arrivato lo stesso: `gtag` lo consegna prima che la pagina se
 * ne vada. Ritardare l'apertura per essere certi della misura sarebbe far
 * pagare al cliente il conteggio.
 */
export default function BottoneTelefono({ className = '', children = AZIENDA.telefono }) {
    return (
        <a
            href={`tel:${AZIENDA.telefonoRaw}`}
            className={className}
            onClick={() => segnalaConversione('telefono')}
        >
            {children}
        </a>
    )
}
