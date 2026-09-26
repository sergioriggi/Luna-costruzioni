import Seo from '../components/Seo'
import { Sezione, Briciole } from '../components/Sezione'
import RevocaConsenso from '../components/RevocaConsenso'
import { AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/cookie-policy', label: 'Cookie policy' },
]

/**
 * Cookie policy.
 *
 * Riscritta il 26 settembre 2026, quando il sito è passato al Consent Mode v2
 * in modalità avanzata. Prima questa pagina affermava che «finché non accetti,
 * nessuno script di profilazione viene caricato: non è una formula di cortesia,
 * è il modo in cui il sito è costruito». Quella frase adesso sarebbe falsa, ed è
 * il genere di falso peggiore: un'informativa che descrive un sito diverso da
 * quello che l'utente sta usando.
 *
 * La regola per chi la aggiorna: qui si descrive ciò che il codice FA, non ciò
 * che vorremmo che facesse. Se si cambia `src/components/BannerCookie.jsx`, si
 * cambia anche questo file, nello stesso commit.
 */
export default function Cookie() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Cookie policy | Luna Costruzioni S.r.l.s."
                descrizione="Informativa sull'uso dei cookie sul sito di Luna Costruzioni S.r.l.s.."
                percorso="/cookie-policy"
                noindex
            />
            <Briciole voci={BRICIOLE} />
            <Sezione>
                <article className="max-w-prosa space-y-5 text-[1.0625rem] leading-relaxed text-neutro-400">
                    <h1 className="font-display text-4xl text-testo">{t('Cookie policy', 'Cookie policy')}</h1>

                    <h2 className="pt-4 font-display text-2xl">{t('Cookie tecnici', 'Technical cookies')}</h2>
                    <p>
                        {t(
                            'Questo sito utilizza cookie tecnici e memorizzazione locale necessari al funzionamento delle pagine — per esempio per ricordare la scelta che fai su questo banner e la lingua selezionata. Per questi non è richiesto il consenso preventivo.',
                            'This site uses technical cookies and local storage required for the pages to work — for example to remember the choice you make on the banner and the language you select. These do not require prior consent.',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">
                        {t('Il tag di Google, e in che stato si trova', 'Google’s tag, and the state it is in')}
                    </h2>
                    <p>
                        {t(
                            'Il tag di Google si carica a ogni visita, ma parte in stato negato. Finché non acconsenti non installa alcun cookie e non legge nulla dal tuo dispositivo: invia a Google soltanto segnali anonimi — che una pagina è stata vista, che una richiesta è partita — senza identificatori e senza collegare fra loro due visite. Google li usa in forma aggregata per stimare quanti contatti arrivano dagli annunci. È la configurazione che Google chiama Consent Mode.',
                            'Google’s tag loads on every visit, but it starts in a denied state. Until you consent it sets no cookies and reads nothing from your device: it sends Google anonymous signals only — that a page was viewed, that an enquiry was submitted — with no identifiers and no way to link two visits. Google uses them in aggregate to estimate how many enquiries come from the ads. This is the configuration Google calls Consent Mode.',
                        )}
                    </p>
                    <p>
                        {t(
                            'Va detto con precisione, perché è un trattamento e non un nulla: anche in questo stato la richiesta raggiunge i server di Google e comporta il tuo indirizzo IP e l’indirizzo della pagina. Quello che non avviene è la memorizzazione sul tuo dispositivo.',
                            'This should be stated precisely, because it is processing and not nothing: even in this state the request reaches Google’s servers and involves your IP address and the address of the page. What does not happen is any storage on your device.',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">
                        {t('Cosa cambia se accetti', 'What changes if you accept')}
                    </h2>
                    <p>
                        {t(
                            'Con «Accetta» si attivano i cookie di due strumenti, entrambi forniti da Google Ireland Ltd.:',
                            'With “Accept” the cookies of two tools are enabled, both provided by Google Ireland Ltd.:',
                        )}
                    </p>
                    <ul className="ml-5 list-disc space-y-2">
                        <li>
                            <strong>Google Ads</strong> {t('(identificativo', '(identifier')} AW-18447146211){t(
                                ': serve a capire quali annunci portano richieste di preventivo e a riproporti i nostri annunci su altri siti. I cookie sono di tipo pubblicitario e di profilazione, con durata fino a novanta giorni.',
                                ': used to understand which ads bring quote requests and to show you our ads again on other sites. These are advertising and profiling cookies, lasting up to ninety days.',
                            )}
                        </li>
                        <li>
                            <strong>Google Analytics 4</strong>{t(
                                ': misura come vengono usate le pagine — quante visite, da dove arrivano, quali pagine vengono lette. I cookie sono di tipo statistico, con durata fino a due anni.',
                                ': measures how the pages are used — how many visits, where they come from, which pages are read. These are statistical cookies, lasting up to two years.',
                            )}
                        </li>
                    </ul>
                    <p>
                        {t(
                            'Oggi il consenso è unico: accettando si attivano entrambi. Eventuali strumenti futuri passeranno dallo stesso banner e verranno elencati qui.',
                            'Consent is currently a single choice: accepting enables both. Any future tools will go through the same banner and will be listed here.',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">
                        {t('Come revocare il consenso', 'How to withdraw consent')}
                    </h2>
                    <p>
                        {t(
                            'Da qui, in un clic. Revocare cancella i cookie di Google già presenti su questo dispositivo e riporta il tag in modalità anonima.',
                            'From here, in one click. Withdrawing deletes the Google cookies already on this device and returns the tag to anonymous mode.',
                        )}
                    </p>
                    <RevocaConsenso />
                    <p className="text-[0.95rem]">
                        {t(
                            'In alternativa puoi bloccare i cookie dalle preferenze del tuo browser, oppure cancellare i dati di questo sito: al successivo accesso il banner ti verrà riproposto.',
                            'Alternatively you can block cookies in your browser settings, or clear this site’s data: the banner will be shown again on your next visit.',
                        )}
                    </p>

                    <h2 className="pt-4 font-display text-2xl">{t('Contatti', 'Contact')}</h2>
                    <p>
                        {t('Per qualsiasi chiarimento scrivi a', 'For any clarification write to')}{' '}
                        <a className="link-sottile" href={`mailto:${AZIENDA.email}`}>{AZIENDA.email}</a>.
                    </p>
                </article>
            </Sezione>
        </>
    )
}
