/**
 * «12 ottobre 2026» / «12 October 2026» da una data ISO (`2026-10-12`).
 *
 * Scritta a mano e non con `Intl.DateTimeFormat`: il Node che pre-renderizza
 * può avere dati ICU ridotti (vedi la stessa nota in verifica-conformita.mjs),
 * e una data formattata diversamente sul server e nel browser rompe
 * l'idratazione. Qui il risultato è identico ovunque.
 */
const MESI = {
    it: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export function formattaData(iso, lingua = 'it') {
    const [anno, mese, giorno] = String(iso).split('-').map(Number)
    return `${giorno} ${(MESI[lingua] ?? MESI.it)[mese - 1]} ${anno}`
}
