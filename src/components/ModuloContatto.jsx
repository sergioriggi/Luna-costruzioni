import { useState } from 'react'
import { Link, useNavigate } from '../lib/instradamento'
import { AZIENDA, PROVINCE } from '../data/site'
import { useLingua } from '../i18n/lingua'
import { inviaLead, INVIATO, RIPIEGO_POSTA } from '../lib/invia-lead'
import BottoneWhatsApp from './BottoneWhatsApp'
import BottoneTelefono from './BottoneTelefono'

const VUOTO = {
    nome: '',
    email: '',
    telefono: '',
    provincia: '',
    comune: '',
    interesse: 'Nuova piscina Rocks Design',
    tipologia: 'Abitazione privata',
    dimensione: '',
    budget: '',
    messaggio: '',
    privacy: false,
    // honeypot anti-spam: se compilato, la richiesta viene scartata
    sito: '',
}

/**
 * Campi di qualificazione: fanno risparmiare un giro di telefonate.
 * Come per INTERESSI qui sotto, `valore` è ciò che arriva nella richiesta e
 * resta in italiano in entrambe le lingue: chi legge le mail riconosce le voci
 * di sempre. `en` è solo ciò che si legge nel menù in inglese.
 */
const TIPOLOGIE = [
    { valore: 'Abitazione privata', en: 'Private home' },
    { valore: 'Struttura ricettiva', en: 'Hotel, resort or B&B' },
    { valore: 'Ristorante o locale', en: 'Restaurant or venue' },
    { valore: 'Altro', en: 'Other' },
]

const DIMENSIONI = [
    { valore: 'Non lo so ancora', en: 'I don’t know yet' },
    { valore: 'Fino a 30 m² d’acqua', en: 'Up to 30 m² of water' },
    { valore: 'Tra 30 e 60 m²', en: '30 to 60 m²' },
    { valore: 'Tra 60 e 100 m²', en: '60 to 100 m²' },
    { valore: 'Oltre 100 m²', en: 'Over 100 m²' },
]

const BUDGET = [
    { valore: 'Preferisco non indicarlo', en: 'I’d rather not say' },
    { valore: 'Sto ancora valutando', en: 'Still deciding' },
    { valore: 'Fino a 50.000 €', en: 'Up to €50,000' },
    { valore: 'Tra 50.000 e 100.000 €', en: '€50,000 to €100,000' },
    { valore: 'Oltre 100.000 €', en: 'Over €100,000' },
]

/** Ordine dei campi obbligatori: il primo con un errore riceve il fuoco. */
const ORDINE = ['nome', 'email', 'telefono', 'provincia', 'privacy']

/**
 * `valore` è ciò che arriva nella richiesta e non cambia: chi legge le mail
 * riconosce le voci di sempre. `etichetta` è ciò che si legge nel menù, e
 * qui «sopralluogo» si toglie perché il modulo lo nomina già due volte.
 */
const INTERESSI = [
    { valore: 'Nuova piscina Rocks Design', etichetta: 'Nuova piscina Rocks Design', en: 'A new Piscine Rocks Design pool' },
    { valore: 'Preventivo e sopralluogo', etichetta: 'Un preventivo per il mio giardino', en: 'A quote for my garden' },
    { valore: 'Struttura ricettiva / progetto commerciale', etichetta: 'Struttura ricettiva / progetto commerciale', en: 'Hotel or commercial project' },
    { valore: 'Altro', etichetta: 'Altro', en: 'Other' },
]

/**
 * Modulo di richiesta preventivo.
 *
 * L'invio passa da `src/lib/invia-lead.js`, che posta su /api/contatti e
 * ripiega sul client di posta quando dietro non c'è un server. Il contatto
 * non si perde in nessuno dei due casi.
 */
export default function ModuloContatto({
    provinciaPreselezionata,
    // Sulla pagina hotel il modulo parte già impostato su «struttura
    // ricettiva»: prima proponeva «abitazione privata» proprio agli albergatori.
    tipologiaPreselezionata,
    interessePreselezionato,
    titolo,
    compatto = false,
}) {
    const navigate = useNavigate()
    const { t } = useLingua()
    const iniziale = {
        ...VUOTO,
        provincia: provinciaPreselezionata ?? '',
        tipologia: tipologiaPreselezionata ?? VUOTO.tipologia,
        interesse: interessePreselezionato ?? VUOTO.interesse,
    }
    const [dati, setDati] = useState(iniziale)
    const [errori, setErrori] = useState({})
    const [stato, setStato] = useState('pronto') // pronto | invio | inviato | errore

    const aggiorna = e => {
        const { name, value, type, checked } = e.target
        setDati(d => ({ ...d, [name]: type === 'checkbox' ? checked : value }))
        setErrori(e2 => ({ ...e2, [name]: undefined }))
    }

    const valida = () => {
        const err = {}
        if (dati.nome.trim().length < 2) err.nome = t('Inserisci il tuo nome.', 'Please enter your name.')
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(dati.email)) err.email = t('Inserisci un indirizzo e-mail valido.', 'Please enter a valid email address.')
        if (dati.telefono.replace(/[^\d]/g, '').length < 8) err.telefono = t('Inserisci un numero di telefono valido.', 'Please enter a valid phone number.')
        if (!dati.provincia) err.provincia = t('Seleziona la provincia.', 'Please choose the province.')
        if (!dati.privacy) err.privacy = t('È necessario acconsentire al trattamento dei dati.', 'Consent to data processing is required.')
        return err
    }

    const invia = async e => {
        e.preventDefault()
        const err = valida()
        setErrori(err)
        if (Object.keys(err).length > 0) {
            // Il primo campo con errore, preso dall'oggetto appena calcolato e
            // cercato DENTRO questo modulo. Prima si interrogava il documento per
            // `[aria-invalid]` subito dopo setErrori, cioè prima che React
            // aggiornasse la pagina: il fuoco restava sul pulsante, oppure finiva
            // su un campo segnato al tentativo precedente.
            const primo = ORDINE.find(k => err[k])
            e.currentTarget.elements.namedItem(primo)?.focus()
            return
        }
        if (dati.sito) return // bot

        setStato('invio')
        const esito = await inviaLead(dati, { oggetto: 'Richiesta preventivo Piscina Rocks Design' })

        // Due esiti diversi, due schermate diverse. Sul ripiego `mailto` la
        // richiesta non è ancora partita: si è solo aperto il programma di
        // posta del visitatore. Dirgli «ricevuta» lo lascerebbe ad aspettare
        // una chiamata che non arriverà mai.
        if (esito === INVIATO) {
            setDati(iniziale)
            navigate('/grazie')
        } else if (esito === RIPIEGO_POSTA) {
            setStato('posta')
        } else {
            setStato('errore')
        }
    }

    if (stato === 'posta') {
        return (
            <div className="scheda" role="status">
                <p className="font-display text-2xl text-testo">{t('Manca un passaggio.', 'One step left.')}</p>
                <p className="testo-lungo mt-3">
                    {t('Abbiamo aperto il tuo programma di posta con la richiesta già compilata:', 'We have opened your email program with the request already filled in:')}
                    <strong className="text-testo">{t(' premi Invia', ' press Send')}</strong>
                    {t(' perché ci arrivi. Finché non lo fai, non l’abbiamo ricevuta.', ' so that it reaches us. Until you do, we have not received it.')}
                </p>
                <p className="testo-lungo mt-3">
                    {t('Se non si è aperto nulla, scrivici a', 'If nothing opened, write to')}{' '}
                    <a href={`mailto:${AZIENDA.email}`} className="link-sottile text-accento">{AZIENDA.email}</a>{' '}
                    {t('oppure chiamaci: è la via più rapida.', 'or call us: it is the quickest way.')}
                </p>
                {/*
                  * Qui l'invio non è riuscito, quindi oltre alla mail si offrono
                  * i due canali che non dipendono dal programma di posta di chi
                  * scrive: il telefono e WhatsApp.
                  */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <BottoneTelefono className="bottone-pieno">{t('Chiama', 'Call')} {AZIENDA.telefono}</BottoneTelefono>
                    <BottoneWhatsApp icona>{t('Scrivi su WhatsApp', 'Message us on WhatsApp')}</BottoneWhatsApp>
                </div>
            </div>
        )
    }

    const campoErrore = nome =>
        errori[nome] ? (
            <p id={`err-${nome}`} className="mt-1.5 text-sm text-red-300">
                {errori[nome]}
            </p>
        ) : null

    const props = nome => ({
        id: nome,
        name: nome,
        value: dati[nome],
        onChange: aggiorna,
        className: `campo ${errori[nome] ? 'border-red-500' : ''}`,
        'aria-invalid': errori[nome] ? 'true' : undefined,
        'aria-describedby': errori[nome] ? `err-${nome}` : undefined,
    })

    return (
        <form onSubmit={invia} noValidate className="scheda">
            <h2 className={compatto ? 'font-display text-xl' : 'font-display text-2xl sm:text-[1.75rem]'}>
                {titolo ?? t('Chiedi un preventivo', 'Ask for a quote')}
            </h2>
            <p className="mt-2 text-sm text-neutro-500">
                {t(
                    `Sopralluogo e preventivo sono gratuiti e senza impegno, in tutta la ${AZIENDA.zona}.`,
                    'The site visit and the quote are free and carry no obligation, anywhere in Sicily.',
                )}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">{t('Nome e cognome *', 'Full name *')}</label>
                    <input type="text" autoComplete="name" {...props('nome')} />
                    {campoErrore('nome')}
                </div>

                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">{t('E-mail *', 'Email *')}</label>
                    <input type="email" autoComplete="email" {...props('email')} />
                    {campoErrore('email')}
                </div>

                <div>
                    <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium">{t('Telefono *', 'Phone *')}</label>
                    <input type="tel" autoComplete="tel" inputMode="tel" {...props('telefono')} />
                    {campoErrore('telefono')}
                </div>

                <div>
                    <label htmlFor="provincia" className="mb-1.5 block text-sm font-medium">{t('Provincia *', 'Province *')}</label>
                    <select {...props('provincia')}>
                        <option value="">{t('Seleziona…', 'Choose…')}</option>
                        {PROVINCE.map(p => (
                            <option key={p.slug} value={p.nome}>{p.nome}</option>
                        ))}
                        <option value="Altra provincia">{t('Altra provincia', 'Another province')}</option>
                    </select>
                    {campoErrore('provincia')}
                </div>

                <div>
                    <label htmlFor="comune" className="mb-1.5 block text-sm font-medium">{t('Comune', 'Town')}</label>
                    <input type="text" autoComplete="address-level2" {...props('comune')} />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="interesse" className="mb-1.5 block text-sm font-medium">{t('Di cosa hai bisogno?', 'What do you need?')}</label>
                    <select {...props('interesse')}>
                        {INTERESSI.map(i => <option key={i.valore} value={i.valore}>{t(i.etichetta, i.en)}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="tipologia" className="mb-1.5 block text-sm font-medium">{t('Dove va realizzata', 'Where it will go')}</label>
                    <select {...props('tipologia')}>
                        {TIPOLOGIE.map(o => <option key={o.valore} value={o.valore}>{t(o.valore, o.en)}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="dimensione" className="mb-1.5 block text-sm font-medium">{t('Dimensione indicativa', 'Approximate size')}</label>
                    <select {...props('dimensione')}>
                        <option value="">{t('Seleziona…', 'Choose…')}</option>
                        {DIMENSIONI.map(o => <option key={o.valore} value={o.valore}>{t(o.valore, o.en)}</option>)}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
                        {t('Budget orientativo', 'Rough budget')}{' '}
                        <span className="font-normal text-neutro-500">
                            {t('(serve solo a proporti soluzioni realistiche)', '(only so we can suggest realistic options)')}
                        </span>
                    </label>
                    <select {...props('budget')}>
                        <option value="">{t('Seleziona…', 'Choose…')}</option>
                        {BUDGET.map(o => <option key={o.valore} value={o.valore}>{t(o.valore, o.en)}</option>)}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="messaggio" className="mb-1.5 block text-sm font-medium">
                        {t('Raccontaci il tuo giardino', 'Tell us about your garden')}
                    </label>
                    <textarea
                        rows={compatto ? 3 : 4}
                        {...props('messaggio')}
                        placeholder={t('Superficie disponibile, esposizione, tempi ideali…', 'Space available, sun, ideal timing…')}
                    />
                </div>
            </div>

            {/* honeypot: invisibile agli utenti, irresistibile per i bot */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                <label htmlFor="sito">Non compilare</label>
                <input id="sito" name="sito" type="text" tabIndex={-1} autoComplete="off" value={dati.sito} onChange={aggiorna} />
            </div>

            <div className="mt-5 flex items-start gap-3">
                <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    checked={dati.privacy}
                    onChange={aggiorna}
                    aria-invalid={errori.privacy ? 'true' : undefined}
                    aria-describedby={errori.privacy ? 'err-privacy' : undefined}
                    className="mt-1 h-4 w-4 rounded border-testo/[0.45] text-accento focus:ring-accento"
                />
                <label htmlFor="privacy" className="text-sm text-neutro-400">
                    {t('Ho letto l’', 'I have read the ')}
                    <Link to="/privacy" className="link-sottile">{t('informativa privacy', 'privacy notice')}</Link>
                    {t(' e acconsento al trattamento dei dati per essere ricontattato. *', ' and consent to my data being used to contact me. *')}
                </label>
            </div>
            {campoErrore('privacy')}

            {stato === 'errore' && (
                <p className="mt-4 rounded-md bg-red-950/40 px-4 py-3 text-sm text-red-300" role="alert">
                    {t('Invio non riuscito. Chiamaci allo', 'Sending failed. Call us on')}{' '}
                    <BottoneTelefono className="font-semibold underline" />{' '}
                    {t('oppure scrivi a', 'or write to')}{' '}
                    <a className="font-semibold underline" href={`mailto:${AZIENDA.email}`}>{AZIENDA.email}</a>.
                </p>
            )}

            {/* Riepilogo annunciato: chi usa un lettore di schermo sente che cosa
                manca, non solo che il fuoco si è spostato. */}
            {Object.keys(errori).filter(k => errori[k]).length > 0 && (
                <p className="mt-4 text-sm text-red-300" role="alert">
                    {(() => {
                        const n = Object.keys(errori).filter(k => errori[k]).length
                        return n === 1
                            ? t('C’è un campo da correggere.', 'One field needs correcting.')
                            : t(`Ci sono ${n} campi da correggere.`, `${n} fields need correcting.`)
                    })()}
                </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="bottone-pieno min-h-[44px]" disabled={stato === 'invio'}>
                    {stato === 'invio' ? t('Invio in corso…', 'Sending…') : t('Invia la richiesta', 'Send the request')}
                </button>
                <BottoneWhatsApp>{t('Preferisco WhatsApp', 'I’d rather use WhatsApp')}</BottoneWhatsApp>
            </div>
            <p className="mt-3 text-xs text-neutro-500">{t('* Campi obbligatori', '* Required fields')}</p>
        </form>
    )
}
