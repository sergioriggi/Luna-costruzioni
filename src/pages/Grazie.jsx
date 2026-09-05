import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { Sezione } from '../components/Sezione'
import { AZIENDA } from '../data/site'

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
                    <p className="occhiello text-accento-300">Richiesta inviata</p>
                    <h1 className="titolo-sezione mt-4">Grazie, l’abbiamo ricevuta.</h1>

                    <p className="testo-lungo mx-auto mt-6">
                        {AZIENDA.referente} ti richiama entro 24 ore lavorative per fissare il
                        sopralluogo. Se nel frattempo ti viene in mente un dettaglio sul giardino,
                        tienilo da parte: è la prima cosa che chiederemo.
                    </p>

                    <p className="mx-auto mt-4 max-w-prosa text-[15px] leading-relaxed text-neutro-400">
                        Hai fretta, o preferisci parlarne subito? Chiamare è la via più rapida.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-pieno">
                            Chiama {AZIENDA.telefono}
                        </a>
                        <a
                            href={`https://wa.me/${AZIENDA.whatsapp}`}
                            target="_blank"
                            rel="noopener"
                            className="bottone-secondario"
                        >
                            Scrivi su WhatsApp
                        </a>
                    </div>

                    <p className="mt-10 text-sm text-neutro-500">
                        Nel frattempo puoi <Link to="/galleria" className="link-sottile text-accento">vedere le realizzazioni</Link>{' '}
                        oppure leggere <Link to="/quanto-costa" className="link-sottile text-accento">che cosa sposta il prezzo</Link>.
                    </p>
                </div>
            </Sezione>
        </>
    )
}
