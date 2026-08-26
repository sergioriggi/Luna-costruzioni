/**
 * Convalida della richiesta di contatto, lato server.
 *
 * Rispecchia le regole che i moduli applicano nel browser. Non è una
 * ripetizione inutile: la convalida nel browser è un servizio all'utente, non
 * una garanzia — chiunque può inviare una richiesta senza passare dal modulo.
 */

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/

/** Limiti di lunghezza: un campo lungo un megabyte è sempre un abuso. */
const LUNGHEZZE = {
    nome: 120,
    email: 254,
    telefono: 40,
    comune: 120,
    provincia: 120,
    tipo: 60,
    interesse: 120,
    dimensione: 120,
    budget: 120,
    messaggio: 4000,
    origine: 200,
}

/** I due moduli usano nomi leggermente diversi: qui convergono. */
const ALIAS = { tel: 'telefono', privacy: 'consenso', msg: 'messaggio' }

function normalizza(grezzo) {
    const dati = {}
    for (const [chiave, valore] of Object.entries(grezzo ?? {})) {
        const nome = ALIAS[chiave] ?? chiave
        dati[nome] = typeof valore === 'string' ? valore.trim() : valore
    }
    return dati
}

export function convalidaLead(grezzo) {
    const dati = normalizza(grezzo)
    const errori = {}

    if (!dati.nome || dati.nome.length < 2) errori.nome = 'Inserisci il tuo nome.'
    if (!dati.email || !EMAIL.test(dati.email)) errori.email = 'Inserisci un indirizzo valido.'
    if (!dati.telefono || dati.telefono.replace(/\D/g, '').length < 8) {
        errori.telefono = 'Inserisci un numero valido.'
    }
    if (dati.consenso !== true) errori.consenso = 'È necessario acconsentire al trattamento dei dati.'

    for (const [campo, massimo] of Object.entries(LUNGHEZZE)) {
        if (typeof dati[campo] === 'string' && dati[campo].length > massimo) {
            errori[campo] = `Testo troppo lungo (massimo ${massimo} caratteri).`
        }
    }

    return { dati, errori, valido: Object.keys(errori).length === 0 }
}

/** L'esca anti-spam del modulo: invisibile alle persone, appetibile ai robot. */
export function sembraUnRobot(grezzo) {
    const esca = (grezzo ?? {}).sito
    return typeof esca === 'string' && esca.trim().length > 0
}
