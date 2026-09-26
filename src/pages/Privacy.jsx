import Seo from '../components/Seo'
import { Sezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import BottoneTelefono from '../components/BottoneTelefono'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/privacy', label: 'Privacy policy' },
]

/**
 * Informativa privacy.
 *
 * Resa bilingue e integrata il 26 settembre 2026, con il passaggio al Consent
 * Mode v2 avanzato. Prima di quella data questa pagina **non nominava Google**
 * da nessuna parte, pur essendo attivi Google Ads e Analytics: era una lacuna
 * già prima, ed è diventata insostenibile da quando il tag si carica a ogni
 * visita anziché soltanto dopo il consenso.
 *
 * Come per la cookie policy: qui si descrive ciò che il codice fa. Se cambia
 * `src/components/BannerCookie.jsx`, cambia anche questo file, nello stesso
 * commit.
 */
export default function Privacy() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Privacy policy | Luna Costruzioni S.r.l.s."
                descrizione="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)."
                percorso="/privacy"
                noindex
            />
            <Briciole voci={BRICIOLE} />
            <Sezione>
                <article className="max-w-prosa space-y-5 text-[1.0625rem] leading-relaxed text-neutro-400">
                    <h1 className="font-display text-4xl text-testo">{t('Privacy policy', 'Privacy policy')}</h1>
                    <p className="text-sm text-neutro-500">
                        {t(
                            'Informativa ai sensi degli artt. 13-14 del Regolamento UE 2016/679 (GDPR).',
                            'Notice under Articles 13-14 of Regulation (EU) 2016/679 (GDPR).',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">
                        {t('Titolare del trattamento', 'Data controller')}
                    </h2>
                    <p>
                        {AZIENDA.nome}, {AZIENDA.ruolo} {t('per la', 'for')} {AZIENDA.zona}.{' '}
                        {t(
                            'Per ogni richiesta relativa ai tuoi dati puoi scrivere a',
                            'For any request concerning your data you can write to',
                        )}{' '}
                        <a className="link-sottile" href={`mailto:${AZIENDA.email}`}>{AZIENDA.email}</a>{' '}
                        {t('o chiamare il', 'or call')}{' '}
                        <BottoneTelefono className="link-sottile" />.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">
                        {t('Dati raccolti e finalità', 'Data collected and purposes')}
                    </h2>
                    <p>
                        {t(
                            'Attraverso i moduli di contatto raccogliamo nome, e-mail, telefono, provincia, comune e il testo del messaggio. I dati sono trattati esclusivamente per rispondere alla tua richiesta, formulare un preventivo e organizzare il sopralluogo. Non vengono usati per finalità di marketing senza un tuo consenso ulteriore e separato.',
                            'Through the contact forms we collect name, e-mail, telephone, province, town and the text of your message. The data are processed solely to reply to your enquiry, prepare a quote and arrange the site visit. They are not used for marketing purposes without a further, separate consent from you.',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">{t('Base giuridica', 'Legal basis')}</h2>
                    <p>
                        {t(
                            'Il trattamento si fonda sul tuo consenso (art. 6.1.a GDPR) e sull’esecuzione di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR).',
                            'Processing is based on your consent (Art. 6(1)(a) GDPR) and on pre-contractual measures taken at your request (Art. 6(1)(b) GDPR).',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">{t('Conservazione', 'Retention')}</h2>
                    <p>
                        {t(
                            'I dati sono conservati per il tempo necessario a gestire la richiesta e, in caso di rapporto contrattuale, per i termini di legge civilistici e fiscali. In assenza di seguito, i dati sono cancellati entro 24 mesi.',
                            'Data are kept for as long as needed to handle the enquiry and, where a contract follows, for the periods required by civil and tax law. Where nothing follows, the data are deleted within 24 months.',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">
                        {t('Misurazione e pubblicità', 'Measurement and advertising')}
                    </h2>
                    <p>
                        {t(
                            'Il sito usa Google Ads e Google Analytics 4, forniti da Google Ireland Ltd. Il tag di Google si carica a ogni visita, ma parte in stato negato: finché non acconsenti tramite il banner non installa cookie e non legge nulla dal tuo dispositivo. In quello stato invia a Google soltanto segnali anonimi di funzionamento e di conversione, privi di identificatori, da cui Google ricava una stima aggregata di quanti contatti provengono dagli annunci.',
                            'The site uses Google Ads and Google Analytics 4, provided by Google Ireland Ltd. Google’s tag loads on every visit but starts in a denied state: until you consent through the banner it sets no cookies and reads nothing from your device. In that state it sends Google only anonymous operational and conversion signals, without identifiers, from which Google derives an aggregate estimate of how many enquiries come from the ads.',
                        )}
                    </p>
                    <p>
                        {t(
                            'Anche in stato negato la richiesta raggiunge i server di Google e comporta il tuo indirizzo IP e l’indirizzo della pagina visitata: è un trattamento, fondato sul nostro legittimo interesse a sapere se la pubblicità funziona (art. 6.1.f GDPR), e puoi opporti scrivendoci. Se acconsenti si attivano i cookie dei due strumenti e il trattamento si fonda sul consenso (art. 6.1.a GDPR). Google può trasferire i dati negli Stati Uniti, sulla base del quadro UE-USA per la protezione dei dati di cui è certificata. Il dettaglio dei cookie, delle durate e il modo per revocare il consenso in un clic stanno nella',
                            'Even in the denied state the request reaches Google’s servers and involves your IP address and the address of the page visited: this is processing, based on our legitimate interest in knowing whether the advertising works (Art. 6(1)(f) GDPR), and you may object by writing to us. If you consent, the cookies of both tools are enabled and processing is based on consent (Art. 6(1)(a) GDPR). Google may transfer data to the United States under the EU-US Data Privacy Framework, for which it is certified. The details of the cookies, their duration and how to withdraw consent in one click are in the',
                        )}{' '}
                        <a className="link-sottile text-accento" href="/cookie-policy">{t('cookie policy', 'cookie policy')}</a>.
                    </p>

                    <h2 className="pt-4 font-display text-2xl">
                        {t('Comunicazione dei dati', 'Disclosure of data')}
                    </h2>
                    <p>
                        {t(
                            'I dati possono essere comunicati a fornitori tecnici che agiscono come responsabili del trattamento (hosting, servizi di posta elettronica e di gestione moduli). Qualora la richiesta riguardi aspetti tecnici di competenza della casa madre, i dati strettamente necessari possono essere condivisi con',
                            'Data may be disclosed to technical suppliers acting as processors (hosting, e-mail and form-handling services). Where the enquiry concerns technical matters that fall to the manufacturer, strictly necessary data may be shared with',
                        )}{' '}
                        {ROCKS_DESIGN.nome}.{' '}
                        {t('Non vendiamo né cediamo i dati a terzi.', 'We do not sell or transfer data to third parties.')}
                    </p>
                    <p>
                        {t('L’invio dei moduli è gestito da', 'Form submission is handled by')}{' '}
                        <strong>Web3Forms</strong>
                        {t(
                            ', che inoltra il contenuto della richiesta alla nostra casella di posta senza conservarlo. Il servizio opera su server situati negli Stati Uniti: compilando il modulo i dati transitano quindi fuori dallo Spazio economico europeo, sulla base del consenso che presti al momento dell’invio (art. 49.1.a GDPR). Se preferisci evitarlo, puoi scriverci direttamente a',
                            ', which forwards the content of your enquiry to our mailbox without storing it. The service runs on servers located in the United States: by filling in the form the data therefore leave the European Economic Area, on the basis of the consent you give when submitting (Art. 49(1)(a) GDPR). If you would rather avoid this, you can write to us directly at',
                        )}{' '}
                        <a href={`mailto:${AZIENDA.email}`} className="link-sottile text-accento">{AZIENDA.email}</a>{' '}
                        {t(
                            'oppure chiamare: il risultato per te è lo stesso.',
                            'or call: the outcome for you is the same.',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">{t('I tuoi diritti', 'Your rights')}</h2>
                    <p>
                        {t(
                            'Puoi in ogni momento chiedere accesso, rettifica, cancellazione, limitazione, portabilità dei dati e opporti al trattamento (artt. 15-22 GDPR), oltre a revocare il consenso prestato. Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali.',
                            'You may at any time request access, rectification, erasure, restriction and portability of your data, and object to processing (Arts. 15-22 GDPR), as well as withdraw the consent you have given. You also have the right to lodge a complaint with the Italian Data Protection Authority.',
                        )}
                    </p>
                </article>
            </Sezione>
        </>
    )
}
