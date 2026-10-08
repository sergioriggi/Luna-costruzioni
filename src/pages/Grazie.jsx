import { Link } from '../lib/instradamento'
import Seo from '../components/Seo'
import { Sezione } from '../components/Sezione'
import BottoneWhatsApp from '../components/BottoneWhatsApp'
import { AZIENDA } from '../data/site'
import BottoneTelefono from '../components/BottoneTelefono'
import { useLingua } from '../i18n/lingua'

/**
 * Pagina di conferma dopo un invio andato a buon fine.
 *
 * Perché esiste una pagina invece di un messaggio in loco: un indirizzo
 * dedicato è l'unico segnale di conversione che qualunque strumento di
 * misurazione sa leggere senza codice su misura. Prima i due moduli
 * confermavano restando sullo stesso URL, quindi non c'era niente da
 * misurare.
 *
 * Ci si arriva **solo** dall'invio riuscito. Il ripiego su `mailto` non porta
 * qui: lì la richiesta non è ancora partita, e contarla come conversione
 * gonfierebbe i numeri con contatti che non esistono.
 *
 * Fuori dalla sitemap e `noindex`: non è una pagina da far trovare su Google.
 */
export default function Grazie() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo={`Richiesta inviata | ${AZIENDA.nome}`}
                descrizione="La tua richiesta è stata inviata a Luna Costruzioni."
                percorso="/grazie"
                noindex
            />

            <Sezione>
                <div className="mx-auto max-w-2xl text-center">
                    {/* Il titolo prende il fuoco all'arrivo: chi usa un lettore di
                        schermo sente subito che la richiesta è partita. */}
                    <h1 className="titolo-sezione mt-4 outline-none" tabIndex={-1} ref={el => el?.focus({ preventScroll: true })}>
                        {t('Grazie, l’abbiamo ricevuta.', 'Thank you, we have received it.')}
                    </h1>

                    <p className="testo-lungo mx-auto mt-6">
                        {t(
                            `${AZIENDA.referente} ti richiama entro 24 ore lavorative per fissare il sopralluogo. Se nel frattempo ti viene in mente un dettaglio sul giardino, tienilo da parte: è la prima cosa che chiederemo.`,
                            `${AZIENDA.referente} will call you back within 24 working hours to arrange the site visit. If a detail about the garden comes to mind in the meantime, keep it handy: it is the first thing we will ask.`,
                        )}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <BottoneTelefono className="bottone-secondario">{t('Chiama', 'Call')} {AZIENDA.telefono}</BottoneTelefono>
                        <BottoneWhatsApp>{t('Scrivi su WhatsApp', 'Message us on WhatsApp')}</BottoneWhatsApp>
                    </div>

                    <p className="mt-10 text-sm text-neutro-500">
                        {t('Nel frattempo puoi ', 'In the meantime you can ')}
                        <Link to="/galleria" className="link-sottile text-accento">{t('vedere le piscine Rocks Design', 'see the Rocks Design pools')}</Link>
                        {t(' oppure leggere ', ' or read ')}
                        <Link to="/quanto-costa" className="link-sottile text-accento">{t('che cosa sposta il prezzo', 'what moves the price')}</Link>.
                    </p>
                </div>
            </Sezione>
        </>
    )
}
