/**
 * Invio della richiesta di contatto per posta elettronica.
 *
 * Il trasporto si crea alla prima richiesta e si riusa. Niente `verify()`
 * all'avvio: aggiungerebbe latenza e farebbe fallire il boot per un problema
 * di rete passeggero, mettendo offline un sito che funziona benissimo.
 */
import nodemailer from 'nodemailer'
import { AZIENDA } from '../src/data/site.js'

let trasporto = null

function ottieniTrasporto(smtp) {
    trasporto ??= nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: { user: smtp.user, pass: smtp.pass },
    })
    return trasporto
}

/**
 * Nessun valore scritto dal visitatore finisce in un'intestazione senza essere
 * ripulito: un ritorno a capo dentro `Reply-To` o nell'oggetto permetterebbe
 * di iniettare intestazioni arbitrarie nel messaggio.
 */
const perIntestazione = valore => String(valore ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, 200)

const CAMPI = [
    ['nome', 'Nome'],
    ['telefono', 'Telefono'],
    ['email', 'Email'],
    ['comune', 'Comune'],
    ['provincia', 'Provincia'],
    ['tipo', 'Tipo di progetto'],
    ['interesse', 'Interesse'],
    ['dimensione', 'Dimensione'],
    ['budget', 'Budget'],
    ['origine', 'Origine'],
]

function corpi(dati) {
    const righe = CAMPI.filter(([c]) => dati[c]).map(([c, etichetta]) => [etichetta, dati[c]])
    const testo = [
        ...righe.map(([e, v]) => `${e}: ${v}`),
        '',
        'Messaggio:',
        dati.messaggio || '(nessun messaggio)',
    ].join('\n')

    const scappa = v =>
        String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

    const html = [
        '<table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">',
        ...righe.map(
            ([e, v]) =>
                `<tr><td style="color:#666">${scappa(e)}</td><td><strong>${scappa(v)}</strong></td></tr>`,
        ),
        '</table>',
        `<p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${scappa(dati.messaggio || '(nessun messaggio)')}</p>`,
    ].join('')

    return { testo, html }
}

export async function inviaLead(dati, { smtp, lead }) {
    const { testo, html } = corpi(dati)
    const comune = dati.comune ? ` — ${perIntestazione(dati.comune)}` : ''

    await ottieniTrasporto(smtp).sendMail({
        // Il mittente è sempre una casella del dominio: usare l'indirizzo del
        // visitatore farebbe scartare il messaggio da SPF e DKIM.
        from: { name: AZIENDA.nomeBreve, address: lead.mittente },
        to: lead.destinatario,
        replyTo: perIntestazione(dati.email),
        subject: `Richiesta dal sito — ${perIntestazione(dati.nome)}${comune}`,
        text: testo,
        html,
    })
}
