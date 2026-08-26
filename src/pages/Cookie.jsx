import Seo from '../components/Seo'
import { Sezione, Briciole } from '../components/Sezione'
import { AZIENDA } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/cookie-policy', label: 'Cookie policy' },
]

export default function Cookie() {
    return (
        <>
            <Seo
                titolo="Cookie policy | Luna Costruzioni srl"
                descrizione="Informativa sull'uso dei cookie sul sito di Luna Costruzioni srl."
                percorso="/cookie-policy"
                noindex
            />
            <Briciole voci={BRICIOLE} />
            <Sezione>
                <article className="max-w-prosa space-y-5 text-[1.0625rem] leading-relaxed text-neutro-400">
                    <h1 className="font-display text-4xl text-testo">Cookie policy</h1>

                    <h2 className="pt-4 font-display text-2xl">Cookie tecnici</h2>
                    <p>
                        Questo sito utilizza esclusivamente cookie tecnici e di memorizzazione locale necessari al
                        funzionamento delle pagine (ad esempio la memorizzazione della scelta sul banner). Per questi
                        cookie non è richiesto il consenso preventivo.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Cookie statistici e di marketing</h2>
                    <p>
                        Strumenti di misurazione e remarketing (ad esempio Google Analytics 4 o Meta Pixel) vengono
                        attivati <strong>solo dopo il tuo consenso esplicito</strong> tramite il banner. Finché non
                        accetti, nessuno script di profilazione viene caricato.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Come revocare il consenso</h2>
                    <p>
                        Puoi modificare la tua scelta in qualsiasi momento cancellando i dati del sito dalle
                        impostazioni del browser: al successivo accesso il banner ti verrà riproposto. Puoi inoltre
                        bloccare i cookie direttamente dalle preferenze del tuo browser.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Contatti</h2>
                    <p>
                        Per qualsiasi chiarimento scrivi a{' '}
                        <a className="link-sottile" href={`mailto:${AZIENDA.email}`}>{AZIENDA.email}</a>.
                    </p>
                </article>
            </Sezione>
        </>
    )
}
