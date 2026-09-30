import Rivela from './Rivela'
import ModuloContatto from './ModuloContatto'
import { Sezione, IntestazioneSezione } from './Sezione'
import { AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'

/**
 * Il riquadro finale con il modulo di contatto.
 *
 * È l'unica parte che si ripete da una pagina all'altra, e per scelta: chi
 * arriva in fondo deve trovare il modulo sempre nello stesso posto. Tutto il
 * resto — titolo e testo — lo scrive la pagina, e va scritto per quella
 * pagina.
 *
 * La promessa di richiamata sta qui e da nessun'altra parte. Ripeterla nel
 * corpo delle pagine era uno dei motivi per cui il sito sembrava lo stesso
 * testo con le parole in ordine diverso.
 *
 * `data-cta-finale` lo riconosce `scripts/misura-ripetizioni.mjs`, che conta
 * questo blocco a parte.
 */
export default function ChiusuraContatto({ id = 'contatti', occhiello, titolo, testo, modulo = {} }) {
    const { t } = useLingua()
    return (
        <div data-cta-finale="">
            <Sezione id={id}>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <IntestazioneSezione occhiello={occhiello} titolo={titolo} testo={testo}>
                        <p className="testo-lungo mt-4">
                            {t(
                                `${AZIENDA.referente} ti richiama entro 24 ore lavorative.`,
                                `${AZIENDA.referente} will call you back within 24 working hours.`,
                            )}
                        </p>
                    </IntestazioneSezione>
                    <Rivela delay={100}>
                        <ModuloContatto {...modulo} />
                    </Rivela>
                </div>
            </Sezione>
        </div>
    )
}
