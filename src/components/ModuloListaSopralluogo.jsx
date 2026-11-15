import { useState } from 'react'
import { Link } from '../lib/instradamento'
import { AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'
import { inviaLead, INVIATO, RIPIEGO_POSTA } from '../lib/invia-lead'
import { pubblico } from '../lib/percorso'
import BottoneWhatsApp from './BottoneWhatsApp'

/** Il PDF sta in public/download/; robots.txt tiene /download/ fuori da Google. */
export const PDF_LISTA = '/download/lista-sopralluogo-piscina-sicilia.pdf'

const VUOTO = {
    nome: '',
    email: '',
    comune: '',
    privacy: false,
    ricontatto: false,
    // honeypot anti-spam, come in ModuloContatto
    sito: '',
}

const ORDINE = ['nome', 'email', 'comune', 'privacy']

/**
 * Modulo del lead magnet: nome, e-mail e comune in cambio della lista in PDF.
 *
 * Passa da `inviaLead()` come il modulo contatti: stesso canale, stesso
 * honeypot, stessi ripieghi, stessa conversione (con `lead_type` =
 * `lista_sopralluogo` in GA4). Il pulsante del PDF compare SOLO con l'esito
 * `INVIATO`: sul ripiego di posta la richiesta non è ancora partita, e
 * sull'errore non è partita affatto.
 *
 * La casella del ricontatto è facoltativa e non blocca l'invio: il suo valore
 * arriva nel testo della notifica come «Ricontatto: sì/no».
 */
export default function ModuloListaSopralluogo() {
    const { t } = useLingua()
    const [dati, setDati] = useState(VUOTO)
    const [errori, setErrori] = useState({})
    const [stato, setStato] = useState('pronto') // pronto | invio | inviato | posta | errore

    const aggiorna = e => {
        const { name, value, type, checked } = e.target
        setDati(d => ({ ...d, [name]: type === 'checkbox' ? checked : value }))
        setErrori(e2 => ({ ...e2, [name]: undefined }))
    }

    const valida = () => {
        const err = {}
        if (dati.nome.trim().length < 2) err.nome = t('Inserisci il tuo nome.', 'Please enter your name.')
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(dati.email)) err.email = t('Inserisci un indirizzo e-mail valido.', 'Please enter a valid email address.')
        if (dati.comune.trim().length < 2) err.comune = t('Inserisci il comune.', 'Please enter your town.')
        if (!dati.privacy) err.privacy = t('È necessario acconsentire al trattamento dei dati.', 'Consent to data processing is required.')
        return err
    }

    const invia = async e => {
        e.preventDefault()
        const err = valida()
        setErrori(err)
        if (Object.keys(err).length > 0) {
            const primo = ORDINE.find(k => err[k])
            e.currentTarget.elements.namedItem(primo)?.focus()
            return
        }
        if (dati.sito) return // bot

        setStato('invio')
        const comune = dati.comune.trim()
        const esito = await inviaLead(
            {
                nome: dati.nome.trim(),
                email: dati.email.trim(),
                comune,
                interesse: 'Lista sopralluogo (PDF)',
                messaggio: `Ricontatto: ${dati.ricontatto ? 'sì' : 'no'}`,
                privacy: dati.privacy,
            },
            { oggetto: `Lista sopralluogo scaricata — ${comune}`, tipoLead: 'lista_sopralluogo' },
        )

        if (esito === INVIATO) setStato('inviato')
        else if (esito === RIPIEGO_POSTA) setStato('posta')
        else setStato('errore')
    }

    if (stato === 'inviato') {
        return (
            <div className="scheda" role="status">
                <p className="font-display text-2xl text-testo outline-hidden" tabIndex={-1} ref={el => el?.focus({ preventScroll: true })}>
                    {t('Ecco la lista.', 'Here is the checklist.')}
                </p>
                <p className="testo-lungo mt-3">
                    {t('Cinque pagine in PDF, da stampare o da compilare sul telefono.', 'Five pages in PDF, in Italian, to print or fill in on your phone.')}
                </p>
                <a href={pubblico(PDF_LISTA)} download className="bottone-pieno mt-6 inline-flex min-h-[44px]">
                    {t('Scarica la lista (PDF)', 'Download the checklist (PDF, in Italian)')}
                </a>
                <p className="testo-lungo mt-6">
                    {t(
                        'Quando hai compilato la scheda dell’ultima pagina, mandacela con qualche foto del giardino su WhatsApp oppure dal ',
                        'Once you have filled in the form on the last page, send it to us with a few photos of the garden on WhatsApp or through the ',
                    )}
                    <Link to="/contatti" className="link-sottile text-accento">{t('modulo contatti', 'contact form')}</Link>.
                </p>
                <div className="mt-5">
                    <BottoneWhatsApp icona>{t('Scrivi su WhatsApp', 'Message us on WhatsApp')}</BottoneWhatsApp>
                </div>
            </div>
        )
    }

    if (stato === 'posta') {
        return (
            <div className="scheda" role="status">
                <p className="font-display text-2xl text-testo">{t('Manca un passaggio.', 'One step left.')}</p>
                <p className="testo-lungo mt-3">
                    {t('L’invio dal sito non è riuscito, quindi abbiamo aperto il tuo programma di posta con la richiesta già compilata:', 'Sending from the site did not work, so we have opened your email program with the request already filled in:')}
                    <strong className="text-testo">{t(' premi Invia', ' press Send')}</strong>
                    {t(' e ti rispondiamo con la lista.', ' and we will reply with the checklist.')}
                </p>
                <p className="testo-lungo mt-3">
                    {t('Se non si è aperto nulla, scrivici su WhatsApp al ', 'If nothing opened, message us on WhatsApp on ')}
                    <strong className="text-testo">{AZIENDA.telefono}</strong>{' '}
                    {t('oppure a', 'or write to')}{' '}
                    <a href={`mailto:${AZIENDA.email}`} className="link-sottile text-accento">{AZIENDA.email}</a>.
                </p>
                <div className="mt-6">
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

    const quanti = Object.keys(errori).filter(k => errori[k]).length

    return (
        <form onSubmit={invia} noValidate className="scheda" id="modulo-lista">
            <h2 className="font-display text-2xl sm:text-[1.75rem]">{t('Scarica la lista', 'Download the checklist')}</h2>
            <p className="mt-2 text-sm text-neutro-500">
                {t(
                    'Lasciaci nome, e-mail e comune: dopo l’invio compare il pulsante per scaricare il PDF.',
                    'Leave your name, email and town: once you send them, the button to download the PDF appears. The checklist is in Italian.',
                )}
            </p>

            <div className="mt-6 grid gap-4">
                <div>
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
                    <label htmlFor="comune" className="mb-1.5 block text-sm font-medium">{t('Comune dove si trova il giardino *', 'Town where the garden is *')}</label>
                    <input type="text" autoComplete="address-level2" {...props('comune')} />
                    {campoErrore('comune')}
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
                    className="mt-1 h-4 w-4 rounded-sm border-testo/45 text-accento focus:ring-accento"
                />
                <label htmlFor="privacy" className="text-sm text-neutro-400">
                    {t('Ho letto l’', 'I have read the ')}
                    <Link to="/privacy" className="link-sottile">{t('informativa privacy', 'privacy notice')}</Link>
                    {t(' e acconsento al trattamento dei dati per ricevere la lista. *', ' and consent to my data being used to give me the checklist. *')}
                </label>
            </div>
            {campoErrore('privacy')}

            <div className="mt-4 flex items-start gap-3">
                <input
                    id="ricontatto"
                    name="ricontatto"
                    type="checkbox"
                    checked={dati.ricontatto}
                    onChange={aggiorna}
                    className="mt-1 h-4 w-4 rounded-sm border-testo/45 text-accento focus:ring-accento"
                />
                <label htmlFor="ricontatto" className="text-sm text-neutro-400">
                    {t(
                        'Potete scrivermi una volta per propormi un sopralluogo sul terreno, senza impegno',
                        'You may write to me once to suggest a site survey on my land, with no obligation',
                    )}{' '}
                    <span className="text-neutro-500">{t('(facoltativo)', '(optional)')}</span>
                </label>
            </div>

            {stato === 'errore' && (
                <p className="mt-4 rounded-md bg-red-950/40 px-4 py-3 text-sm text-red-300" role="alert">
                    {t('Invio non riuscito. Scrivici su WhatsApp al', 'Sending failed. Message us on WhatsApp on')}{' '}
                    <a className="font-semibold underline" href={`https://wa.me/${AZIENDA.whatsapp}`} target="_blank" rel="noopener">{AZIENDA.telefono}</a>{' '}
                    {t('oppure a', 'or write to')}{' '}
                    <a className="font-semibold underline" href={`mailto:${AZIENDA.email}`}>{AZIENDA.email}</a>.
                </p>
            )}

            {quanti > 0 && (
                <p className="mt-4 text-sm text-red-300" role="alert">
                    {quanti === 1
                        ? t('C’è un campo da correggere.', 'One field needs correcting.')
                        : t(`Ci sono ${quanti} campi da correggere.`, `${quanti} fields need correcting.`)}
                </p>
            )}

            <div className="mt-6">
                <button type="submit" className="bottone-pieno min-h-[44px]" disabled={stato === 'invio'}>
                    {stato === 'invio' ? t('Invio in corso…', 'Sending…') : t('Invia e scarica la lista', 'Send and get the checklist')}
                </button>
            </div>
            <p className="mt-3 text-xs text-neutro-500">{t('* Campi obbligatori', '* Required fields')}</p>
        </form>
    )
}
