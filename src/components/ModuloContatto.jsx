import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AZIENDA, PROVINCE } from '../data/site'

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

/** Campi di qualificazione: fanno risparmiare un giro di telefonate. */
const TIPOLOGIE = ['Abitazione privata', 'Struttura ricettiva', 'Ristorante o locale', 'Altro']

const DIMENSIONI = [
    'Non lo so ancora',
    'Fino a 30 m² d’acqua',
    'Tra 30 e 60 m²',
    'Tra 60 e 100 m²',
    'Oltre 100 m²',
]

const BUDGET = [
    'Preferisco non indicarlo',
    'Sto ancora valutando',
    'Fino a 50.000 €',
    'Tra 50.000 e 100.000 €',
    'Oltre 100.000 €',
]

const INTERESSI = [
    'Nuova piscina Rocks Design',
    'Visita alla piscina espositiva',
    'Preventivo e sopralluogo',
    'Struttura ricettiva / progetto commerciale',
    'Altro',
]

/**
 * Modulo di richiesta preventivo.
 *
 * L'invio usa l'endpoint definito in VITE_ENDPOINT_LEAD (form service,
 * funzione serverless o CRM). Se la variabile non è configurata il modulo
 * resta funzionante e propone l'invio via e-mail/WhatsApp, senza perdere il contatto.
 */
export default function ModuloContatto({ provinciaPreselezionata, titolo = 'Richiedi un preventivo su misura', compatto = false }) {
    const [dati, setDati] = useState({ ...VUOTO, provincia: provinciaPreselezionata ?? '' })
    const [errori, setErrori] = useState({})
    const [stato, setStato] = useState('pronto') // pronto | invio | inviato | errore

    const endpoint = import.meta.env.VITE_ENDPOINT_LEAD

    const aggiorna = e => {
        const { name, value, type, checked } = e.target
        setDati(d => ({ ...d, [name]: type === 'checkbox' ? checked : value }))
        setErrori(e2 => ({ ...e2, [name]: undefined }))
    }

    const valida = () => {
        const err = {}
        if (dati.nome.trim().length < 2) err.nome = 'Inserisci il tuo nome.'
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(dati.email)) err.email = 'Inserisci un indirizzo e-mail valido.'
        if (dati.telefono.replace(/[^\d]/g, '').length < 8) err.telefono = 'Inserisci un numero di telefono valido.'
        if (!dati.provincia) err.provincia = 'Seleziona la provincia.'
        if (!dati.privacy) err.privacy = 'È necessario acconsentire al trattamento dei dati.'
        return err
    }

    const invia = async e => {
        e.preventDefault()
        const err = valida()
        setErrori(err)
        if (Object.keys(err).length > 0) {
            const primo = document.querySelector('[aria-invalid="true"]')
            primo?.focus()
            return
        }
        if (dati.sito) return // bot

        setStato('invio')
        const payload = {
            ...dati,
            sito: undefined,
            origine: typeof window !== 'undefined' ? window.location.pathname : '',
            inviatoIl: new Date().toISOString(),
        }

        if (!endpoint) {
            // Nessun endpoint configurato: si apre il client di posta con i dati compilati.
            const corpo = [
                `Nome: ${dati.nome}`,
                `E-mail: ${dati.email}`,
                `Telefono: ${dati.telefono}`,
                `Zona: ${dati.comune ? dati.comune + ' — ' : ''}${dati.provincia}`,
                `Interesse: ${dati.interesse}`,
                `Tipologia: ${dati.tipologia}`,
                `Dimensione: ${dati.dimensione || 'non indicata'}`,
                `Budget: ${dati.budget || 'non indicato'}`,
                '',
                dati.messaggio,
            ].join('\n')
            window.location.href =
                `mailto:${AZIENDA.email}?subject=${encodeURIComponent('Richiesta preventivo Piscina Rocks Design')}` +
                `&body=${encodeURIComponent(corpo)}`
            setStato('inviato')
            return
        }

        try {
            const risposta = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload),
            })
            if (!risposta.ok) throw new Error(String(risposta.status))
            setStato('inviato')
            setDati({ ...VUOTO, provincia: provinciaPreselezionata ?? '' })
        } catch {
            setStato('errore')
        }
    }

    if (stato === 'inviato') {
        return (
            <div className="scheda text-center" role="status">
                <p className="font-display text-2xl text-testo">Grazie, richiesta ricevuta.</p>
                <p className="testo-lungo mx-auto mt-3 max-w-md">
                    {AZIENDA.referente} ti ricontatta entro 24 ore lavorative per fissare il sopralluogo.
                    Se preferisci, puoi chiamarci subito.
                </p>
                <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-primario mt-6">
                    Chiama {AZIENDA.telefono}
                </a>
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
            <h2 className={compatto ? 'font-display text-xl' : 'font-display text-2xl sm:text-[1.75rem]'}>{titolo}</h2>
            <p className="mt-2 text-sm text-neutro-500">
                Sopralluogo e preventivo sono gratuiti e senza impegno, in tutta la {AZIENDA.zona}.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">Nome e cognome *</label>
                    <input type="text" autoComplete="name" {...props('nome')} />
                    {campoErrore('nome')}
                </div>

                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">E-mail *</label>
                    <input type="email" autoComplete="email" {...props('email')} />
                    {campoErrore('email')}
                </div>

                <div>
                    <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium">Telefono *</label>
                    <input type="tel" autoComplete="tel" inputMode="tel" {...props('telefono')} />
                    {campoErrore('telefono')}
                </div>

                <div>
                    <label htmlFor="provincia" className="mb-1.5 block text-sm font-medium">Provincia *</label>
                    <select {...props('provincia')}>
                        <option value="">Seleziona…</option>
                        {PROVINCE.map(p => (
                            <option key={p.slug} value={p.nome}>{p.nome}</option>
                        ))}
                        <option value="Altra provincia">Altra provincia</option>
                    </select>
                    {campoErrore('provincia')}
                </div>

                <div>
                    <label htmlFor="comune" className="mb-1.5 block text-sm font-medium">Comune</label>
                    <input type="text" autoComplete="address-level2" {...props('comune')} />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="interesse" className="mb-1.5 block text-sm font-medium">Di cosa hai bisogno?</label>
                    <select {...props('interesse')}>
                        {INTERESSI.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="tipologia" className="mb-1.5 block text-sm font-medium">Dove va realizzata</label>
                    <select {...props('tipologia')}>
                        {TIPOLOGIE.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="dimensione" className="mb-1.5 block text-sm font-medium">Dimensione indicativa</label>
                    <select {...props('dimensione')}>
                        <option value="">Seleziona…</option>
                        {DIMENSIONI.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
                        Budget orientativo{' '}
                        <span className="font-normal text-neutro-500">— serve solo a proporti soluzioni realistiche</span>
                    </label>
                    <select {...props('budget')}>
                        <option value="">Seleziona…</option>
                        {BUDGET.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="messaggio" className="mb-1.5 block text-sm font-medium">
                        Raccontaci il tuo giardino
                    </label>
                    <textarea rows={compatto ? 3 : 4} {...props('messaggio')} placeholder="Superficie disponibile, esposizione, tempi ideali…" />
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
                    Ho letto l’<Link to="/privacy" className="link-sottile">informativa privacy</Link> e acconsento al
                    trattamento dei dati per essere ricontattato. *
                </label>
            </div>
            {campoErrore('privacy')}

            {stato === 'errore' && (
                <p className="mt-4 rounded-xl bg-red-950/40 px-4 py-3 text-sm text-red-300" role="alert">
                    Invio non riuscito. Chiamaci allo{' '}
                    <a className="font-semibold underline" href={`tel:${AZIENDA.telefonoRaw}`}>{AZIENDA.telefono}</a>{' '}
                    oppure scrivi a{' '}
                    <a className="font-semibold underline" href={`mailto:${AZIENDA.email}`}>{AZIENDA.email}</a>.
                </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="bottone-primario" disabled={stato === 'invio'}>
                    {stato === 'invio' ? 'Invio in corso…' : 'Richiedi il sopralluogo'}
                </button>
                <a
                    href={`https://wa.me/${AZIENDA.whatsapp}`}
                    target="_blank"
                    rel="noopener"
                    className="bottone-secondario"
                >
                    Preferisco WhatsApp
                </a>
            </div>
            <p className="mt-3 text-xs text-neutro-500">* Campi obbligatori</p>
        </form>
    )
}
