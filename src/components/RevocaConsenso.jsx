import { useEffect, useState } from 'react'
import { CHIAVE, negaConsenso } from './BannerCookie'
import { useLingua } from '../i18n/lingua'

/**
 * Revoca del consenso, dalla cookie policy.
 *
 * Perché esiste: l'art. 7.3 GDPR chiede che revocare sia facile come
 * acconsentire, e fino al 26 settembre 2026 la pagina si limitava a consigliare
 * di svuotare i dati del browser. Con il Consent Mode il punto è più visibile,
 * perché ora il tag di Google si carica a ogni visita.
 *
 * ── L'errore da non fare ──────────────────────────────────────────────────
 * `gtag('consent','update', denied)` **non cancella niente** di ciò che è già
 * sul dispositivo: dice a Google di non scriverne altri. Fermarsi lì darebbe
 * una revoca finta — il tasto risponde «fatto» e i cookie restano. Per questo
 * il grosso di questo file è la cancellazione, non la chiamata a gtag.
 *
 * ── Perché tanti tentativi per cancellare ─────────────────────────────────
 * Un cookie si cancella solo riscrivendolo con la stessa coppia dominio+percorso
 * con cui è stato creato, e `document.cookie` non rivela quale sia: restituisce
 * nomi e valori, non gli attributi. Non resta che provare le combinazioni
 * plausibili — host nudo, host con punto davanti, dominio registrabile con
 * punto — e lasciare che quelle sbagliate cadano nel vuoto. Non è elegante ed è
 * il modo in cui funziona.
 *
 * `_ga` e `_ga_<contenitore>` sono di Analytics; `_gcl_*` e `_gac_*` sono gli
 * identificatori del clic pubblicitario, quelli che contano davvero.
 */

const PREFISSI = ['_ga', '_gcl', '_gac', '_gid']

/** Le varianti di dominio con cui tentare la cancellazione. */
function domini() {
    const host = window.location.hostname
    const parti = host.split('.')
    // «lunacostruzioni.it» da «www.lunacostruzioni.it». Su localhost resta host.
    const registrabile = parti.length > 2 ? parti.slice(-2).join('.') : host
    return [undefined, host, `.${host}`, registrabile, `.${registrabile}`]
}

function cancellaCookieDiGoogle() {
    const nomi = document.cookie
        .split(';')
        .map(c => c.split('=')[0].trim())
        .filter(n => PREFISSI.some(p => n.startsWith(p)))

    let cancellati = 0
    for (const nome of new Set(nomi)) {
        for (const dominio of domini()) {
            const dove = dominio ? `; domain=${dominio}` : ''
            document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dove}`
        }
        cancellati++
    }
    return cancellati
}

export default function RevocaConsenso() {
    const { t } = useLingua()
    /**
     * `null` finché non si sa. Lo stato del consenso vive in `localStorage`, che
     * in pre-renderizzazione non esiste: partire da un valore inventato
     * produrrebbe markup diverso fra server e browser, cioè un errore di
     * idratazione. Si legge al mount e prima di allora non si afferma niente.
     */
    const [scelta, setScelta] = useState(null)
    const [revocato, setRevocato] = useState(false)

    useEffect(() => {
        try { setScelta(localStorage.getItem(CHIAVE) ?? 'nessuna') } catch { setScelta('nessuna') }
    }, [])

    const revoca = () => {
        negaConsenso()
        cancellaCookieDiGoogle()
        try { localStorage.setItem(CHIAVE, 'rifiutato') } catch { /* ignorato */ }
        setScelta('rifiutato')
        setRevocato(true)
    }

    return (
        <div className="mt-5 rounded-lg border border-testo/[0.16] bg-superficie/60 p-5">
            <p className="text-[0.95rem] leading-relaxed text-neutro-400">
                {scelta === null
                    ? t('Verifico la tua scelta attuale…', 'Checking your current choice…')
                    : scelta === 'accettato'
                      ? t(
                            'Attualmente hai acconsentito ai cookie di Google Ads e Analytics.',
                            'You have currently consented to the Google Ads and Analytics cookies.',
                        )
                      : t(
                            'Attualmente non hai dato il consenso: il tag di Google funziona in modalità anonima e non installa cookie.',
                            'You have not given consent: Google’s tag runs in anonymous mode and sets no cookies.',
                        )}
            </p>

            {scelta === 'accettato' && (
                <button type="button" onClick={revoca} className="bottone-secondario mt-4 px-5 py-2.5">
                    {t('Revoca il consenso', 'Withdraw consent')}
                </button>
            )}

            {revocato && (
                <p className="mt-4 text-[0.95rem] leading-relaxed text-accento" role="status">
                    {t(
                        'Consenso revocato. I cookie di Google presenti su questo dispositivo sono stati cancellati e non ne verranno installati altri.',
                        'Consent withdrawn. The Google cookies on this device have been deleted and no further ones will be set.',
                    )}
                </p>
            )}
        </div>
    )
}
