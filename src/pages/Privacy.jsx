import Seo from '../components/Seo'
import { Sezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/privacy', label: 'Privacy policy' },
]

export default function Privacy() {
    return (
        <>
            <Seo
                titolo="Privacy policy | Luna Costruzioni srl"
                descrizione="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)."
                percorso="/privacy"
                noindex
            />
            <Briciole voci={BRICIOLE} />
            <Sezione>
                <article className="max-w-prosa space-y-5 text-[1.0625rem] leading-relaxed text-neutro-400">
                    <h1 className="font-display text-4xl text-testo">Privacy policy</h1>
                    <p className="text-sm text-neutro-500">
                        Informativa ai sensi degli artt. 13-14 del Regolamento UE 2016/679 (GDPR).
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Titolare del trattamento</h2>
                    <p>
                        {AZIENDA.nome}, {AZIENDA.ruolo} per la {AZIENDA.zona}. Per ogni richiesta relativa ai tuoi dati
                        puoi scrivere a{' '}
                        <a className="link-sottile" href={`mailto:${AZIENDA.email}`}>{AZIENDA.email}</a> o chiamare il{' '}
                        <a className="link-sottile" href={`tel:${AZIENDA.telefonoRaw}`}>{AZIENDA.telefono}</a>.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Dati raccolti e finalità</h2>
                    <p>
                        Attraverso i moduli di contatto raccogliamo <strong>nome, e-mail, telefono, provincia,
                        comune</strong> e il testo del messaggio. I dati sono trattati esclusivamente per rispondere
                        alla tua richiesta, formulare un preventivo e organizzare il sopralluogo. Non vengono usati per
                        finalità di marketing senza un tuo consenso ulteriore e separato.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Base giuridica</h2>
                    <p>
                        Il trattamento si fonda sul tuo consenso (art. 6.1.a GDPR) e sull’esecuzione di misure
                        precontrattuali adottate su tua richiesta (art. 6.1.b GDPR).
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Conservazione</h2>
                    <p>
                        I dati sono conservati per il tempo necessario a gestire la richiesta e, in caso di rapporto
                        contrattuale, per i termini di legge civilistici e fiscali. In assenza di seguito, i dati sono
                        cancellati entro 24 mesi.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">Comunicazione dei dati</h2>
                    <p>
                        I dati possono essere comunicati a fornitori tecnici che agiscono come responsabili del
                        trattamento (hosting, servizi di posta elettronica e di gestione moduli). Qualora la richiesta
                        riguardi aspetti tecnici di competenza della casa madre, i dati strettamente necessari possono
                        essere condivisi con {ROCKS_DESIGN.nome}. Non vendiamo né cediamo i dati a terzi.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">I tuoi diritti</h2>
                    <p>
                        Puoi in ogni momento chiedere accesso, rettifica, cancellazione, limitazione, portabilità dei
                        dati e opporti al trattamento (artt. 15-22 GDPR), oltre a revocare il consenso prestato. Hai
                        inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali.
                    </p>
                </article>
            </Sezione>
        </>
    )
}
