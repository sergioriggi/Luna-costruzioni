import { useState } from 'react'
import { Link, useNavigate } from '../lib/instradamento'
import { AZIENDA } from '../data/site'
import { inviaLead, INVIATO, RIPIEGO_POSTA } from '../lib/invia-lead'
import { useLingua } from '../i18n/lingua'

const VUOTO = {
    nome: '',
    tel: '',
    email: '',
    comune: '',
    tipo: 'Casa privata',
    messaggio: '',
    consenso: false,
    /** Esca anti-spam: se un robot la compila, la richiesta viene scartata. */
    sito: '',
}

/**
 * Modulo di contatto della pagina, con i campi del file approvato.
 *
 * L'invio passa da `src/lib/invia-lead.js`, che posta su /api/contatti e
 * ripiega sul client di posta quando dietro non c'è un server (hosting
 * statico) o quando le credenziali SMTP non sono configurate.
 */
export default function ModuloPagina() {
    const { t } = useLingua()
    const navigate = useNavigate()
    const [dati, setDati] = useState(VUOTO)
    const [errori, setErrori] = useState({})
    const [stato, setStato] = useState('pronto') // pronto | invio | inviato | errore

    const aggiorna = e => {
        const { name, value, type, checked } = e.target
        setDati(d => ({ ...d, [name]: type === 'checkbox' ? checked : value }))
        setErrori(err => ({ ...err, [name]: undefined }))
    }

    const valida = () => {
        const err = {}
        if (dati.nome.trim().length < 2) err.nome = t('Inserisci il tuo nome.', 'Please enter your name.')
        if (dati.tel.replace(/\D/g, '').length < 8) err.tel = t('Inserisci un numero valido.', 'Please enter a valid number.')
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(dati.email)) err.email = t('Inserisci un indirizzo valido.', 'Please enter a valid address.')
        if (!dati.comune.trim()) err.comune = t('Indica il comune.', 'Please give us the town.')
        if (!dati.consenso) err.consenso = t('È necessario acconsentire al trattamento dei dati.', 'Consent is required.')
        return err
    }

    const invia = async e => {
        e.preventDefault()
        if (dati.sito) return // robot
        const err = valida()
        setErrori(err)
        if (Object.keys(err).length > 0) {
            // Fuoco sul primo campo da correggere: su telefono gli errori
            // comparivano mezza pagina più su del pulsante, fuori dalla vista.
            const primo = ['nome', 'tel', 'email', 'comune', 'consenso'].find(k => err[k])
            e.currentTarget.elements.namedItem(primo)?.focus()
            return
        }

        setStato('invio')
        const risultato = await inviaLead(
            { ...dati, consenso: dati.consenso },
            { oggetto: 'Richiesta sopralluogo — Piscina Rocks Design' },
        )

        // I due esiti non sono la stessa cosa e non vanno confusi: sul ripiego
        // `mailto` si è solo aperto il programma di posta del visitatore, che
        // potrebbe non premere mai «Invia». Dirgli «richiesta ricevuta» sarebbe
        // falso, e lo lascerebbe ad aspettare una chiamata che non arriverà.
        if (risultato === INVIATO) {
            setStato('inviato')
            setDati(VUOTO)
            navigate('/grazie')
        } else if (risultato === RIPIEGO_POSTA) {
            setStato('posta')
        } else {
            setStato('errore')
        }
    }

    const esito =
        stato === 'inviato'
            ? t('Grazie, ti richiamiamo a breve.', 'Thanks — we will call you back shortly.')
            : stato === 'posta'
              ? t(
                    'Abbiamo aperto il tuo programma di posta con la richiesta già scritta: premi Invia per farcela arrivare. Se non si è aperto nulla, scrivici o chiamaci.',
                    'We have opened your email program with the request already written: press Send so it reaches us. If nothing opened, write or call us instead.',
                )
              : stato === 'errore'
                ? t(
                      `Invio non riuscito: chiamaci al ${AZIENDA.telefono}.`,
                      `Could not send: please call us on ${AZIENDA.telefono}.`,
                  )
                : ''

    return (
        <form className="pg-modulo" onSubmit={invia} noValidate>
            <div className="pg-coppia">
                <div className="field">
                    <label htmlFor="nome">{t('Nome e cognome', 'Full name')}</label>
                    <input
                        className="input" id="nome" name="nome" type="text"
                        value={dati.nome} onChange={aggiorna} autoComplete="name"
                        aria-invalid={!!errori.nome}
                        aria-describedby={errori.nome ? 'err-p-nome' : undefined}
                    />
                    {errori.nome && <p className="pg-errore" id="err-p-nome">{errori.nome}</p>}
                </div>
                <div className="field">
                    <label htmlFor="tel">{t('Telefono', 'Phone')}</label>
                    <input
                        className="input" id="tel" name="tel" type="tel"
                        value={dati.tel} onChange={aggiorna} autoComplete="tel"
                        aria-invalid={!!errori.tel}
                        aria-describedby={errori.tel ? 'err-p-tel' : undefined}
                    />
                    {errori.tel && <p className="pg-errore" id="err-p-tel">{errori.tel}</p>}
                </div>
            </div>

            <div className="pg-coppia">
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        className="input" id="email" name="email" type="email"
                        value={dati.email} onChange={aggiorna} autoComplete="email"
                        aria-invalid={!!errori.email}
                        aria-describedby={errori.email ? 'err-p-email' : undefined}
                    />
                    {errori.email && <p className="pg-errore" id="err-p-email">{errori.email}</p>}
                </div>
                <div className="field">
                    <label htmlFor="comune">{t('Comune', 'Town')}</label>
                    <input
                        className="input" id="comune" name="comune" type="text"
                        value={dati.comune} onChange={aggiorna} autoComplete="address-level2"
                        aria-invalid={!!errori.comune}
                        aria-describedby={errori.comune ? 'err-p-comune' : undefined}
                    />
                    {errori.comune && <p className="pg-errore" id="err-p-comune">{errori.comune}</p>}
                </div>
            </div>

            <div className="field">
                <span className="etichetta-seg">
                    {t('Tipo di progetto', 'Project type')}
                </span>
                <div className="seg" role="radiogroup" aria-label={t('Tipo di progetto', 'Project type')}>
                    {[
                        { valore: 'Casa privata', it: 'Casa privata', en: 'Private home' },
                        { valore: 'Struttura ricettiva', it: 'Struttura ricettiva', en: 'Hotel or B&B' },
                    ].map(o => (
                        <label key={o.valore} className="seg-opt">
                            <input
                                type="radio" name="tipo" value={o.valore}
                                checked={dati.tipo === o.valore} onChange={aggiorna}
                            />
                            {t(o.it, o.en)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="field">
                <label htmlFor="messaggio">{t('Il tuo giardino', 'Your garden')}</label>
                <textarea
                    className="input" id="messaggio" name="messaggio" rows="5"
                    placeholder={t('Spazio disponibile, idee, tempi…', 'Space available, ideas, timing…')}
                    value={dati.messaggio} onChange={aggiorna}
                />
            </div>

            {/* Esca anti-spam: invisibile alle persone, appetibile ai robot. */}
            <div className="pg-esca" aria-hidden="true">
                <label htmlFor="sito">Sito</label>
                <input id="sito" name="sito" type="text" tabIndex={-1} autoComplete="off" value={dati.sito} onChange={aggiorna} />
            </div>

            {/* Richiesto dal GDPR: senza consenso il contatto non si può trattare. */}
            <div>
                <label className="pg-consenso" htmlFor="consenso">
                    <input
                        id="consenso" name="consenso" type="checkbox" checked={dati.consenso} onChange={aggiorna}
                        aria-invalid={!!errori.consenso}
                        aria-describedby={errori.consenso ? 'err-p-consenso' : undefined}
                    />
                    <span>
                        {t('Ho letto l’', 'I have read the ')}
                        <Link to="/privacy">{t('informativa privacy', 'privacy notice')}</Link>
                        {t(' e acconsento al trattamento dei dati per essere ricontattato.', ' and consent to being contacted.')}
                    </span>
                </label>
                {errori.consenso && <p className="pg-errore" id="err-p-consenso">{errori.consenso}</p>}
            </div>

            <div className="pg-invio">
                <button className="btn pg-btn-pieno pg-btn-grande" type="submit" disabled={stato === 'invio'}>
                    {stato === 'invio' ? t('Invio in corso…', 'Sending…') : t('Invia la richiesta', 'Send the request')}
                </button>
                <span className="pg-invio-nota">
                    {t(`Oppure chiama il ${AZIENDA.telefono}.`, `Or call ${AZIENDA.telefono}.`)}
                </span>
            </div>

            <p className="pg-esito" role="status">{esito}</p>
        </form>
    )
}
