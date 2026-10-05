/**
 * Genera dist/llms.txt: la mappa dell'entità, scritta per chi legge il sito
 * con una macchina.
 *
 * A che serve. Un motore di ricerca indicizza pagine; un assistente
 * conversazionale deve ricostruire *chi siamo* prima di poterci nominare in
 * una risposta, e lo fa da qualunque cosa trovi — spesso male. Questo file
 * mette in un posto solo, in chiaro e senza markup, le cose che il sito dice
 * già sparse fra tutte le pagine: che il prodotto è in Tecnologia Rocks
 * Design, che l'inventore è la casa madre, che Luna è un concessionario
 * autorizzato per la Sicilia, e che le fotografie non sono di piscine nostre.
 *
 * REGOLA DEL FILE: qui non entra NIENTE che il sito non dica già altrove.
 * Un file nato per essere citato testualmente è l'ultimo posto dove mettere
 * un'affermazione non verificata: un errore qui non lo corregge nessuno, si
 * ripete. Se una cosa è vera ma non è ancora sul sito, prima va sul sito.
 *
 * Le rotte NON si elencano a mano: si prendono da `ROTTE`, la stessa sorgente
 * di sitemap e prerender, e il titolo esce da `NAV`, `NAV_SECONDARIA`,
 * `PROVINCE` e `MODELLI`. Una rotta senza titolo fa fallire la build invece di
 * sparire in silenzio dal file — è il difetto che ci interessa intercettare:
 * una pagina nuova che non arriva agli assistenti non si vede da nessuna parte.
 *
 * In ANTEPRIMA il file non viene emesso. Stesso verso di sicurezza del resto:
 * un indirizzo provvisorio non deve pubblicare la carta d'identità del sito,
 * con dentro indirizzi che a regime saranno altrove.
 */
import fs from 'fs/promises'
import path from 'path'
import { ROTTE } from './rotte.mjs'
import {
    AZIENDA,
    ANTEPRIMA,
    NAV,
    NAV_SECONDARIA,
    PREZZO,
    PROVINCE,
    ROCKS_DESIGN,
    SITE_URL,
    SOCIAL,
} from '../src/data/site.js'
import { MODELLI } from '../src/data/content.js'

const DIST = path.resolve('./dist')

if (ANTEPRIMA) {
    console.log('— llms.txt non generato: indirizzo di anteprima.')
    process.exit(0)
}

/**
 * Titolo e nota di una rotta, dedotti dalle sorgenti che già li contengono.
 * `NOTE` copre soltanto ciò che nessuna di quelle sorgenti sa dire — la home,
 * che non è una voce di menù — e le poche pagine il cui nome di menù, letto
 * fuori dal menù, non spiega di che parlano.
 */
/**
 * Titoli espliciti dove il nome di menù, letto fuori dal menù, non dice di che
 * pagina si tratta: «Sicilia» e «Le piscine» funzionano in una barra di
 * navigazione, in un elenco citabile no. Stessa ragione delle `ECCEZIONI` in
 * `src/lib/whatsapp.js`.
 */
const TITOLI = {
    '/': `${AZIENDA.nomeBreve} — ${ROCKS_DESIGN.nome} in ${AZIENDA.zona}`,
    '/piscine-rocks-design': 'Le piscine in Tecnologia Rocks Design®',
    '/azienda': `Chi è ${AZIENDA.nomeBreve}`,
    '/galleria': 'Galleria delle realizzazioni',
    '/domande-frequenti': 'Domande frequenti',
    '/piscina-in-cemento-o-rocks-design': 'Piscina in cemento o Piscina Rocks Design?',
}

const NOTE = {
    '/': 'Pagina iniziale: che cosa è una Piscina Rocks Design e perché non è una piscina in cemento.',
    '/piscine-rocks-design': 'Il prodotto e la Tecnologia Rocks Design: struttura in massi, spiaggia in sabbia, nessuna opera in cemento armato.',
    '/azienda': 'Chi è Luna Costruzioni: impresa edile siciliana dal 2021, concessionario autorizzato per la Sicilia.',
    '/modelli': 'I tre modelli disponibili: Caraibi, Mediterranea, Alpi.',
    '/sabbie': 'Le sabbie naturali e il colore dell’acqua che ne deriva.',
    '/giardini-e-opere-in-pietra': 'Cascate, laghetti e opere in pietra naturale, anche senza piscina.',
    '/hotel-e-resort': 'Piscine Rocks Design per strutture ricettive.',
    '/quanto-costa': 'Il prezzo di partenza — 1.250 € al m² + IVA — e le cinque voci che lo fanno salire. Preventivo dopo il sopralluogo, gratuito.',
    '/piscina-in-cemento-o-rocks-design': 'Confronto a due facce fra piscina tradizionale in cemento e Piscina Rocks Design: costi, tempi, permessi, manutenzione, forma — compreso dove conviene il cemento.',
    '/galleria': 'Fotografie di Piscine Rocks Design ultimate, realizzate dalla casa madre.',
    '/come-lavoriamo': 'Il percorso dal sopralluogo al collaudo, chiavi in mano.',
    '/domande-frequenti': 'Le domande che i clienti fanno davvero, con le risposte.',
    '/contatti': 'Come chiederci un sopralluogo: modulo, telefono, WhatsApp.',
}

/** La pagina che raccoglie le nove province, ciascuna con la sua ancora. */
const SICILIA = '/piscine-rocks-design/sicilia'

function titolo(percorso) {
    if (percorso === SICILIA) return `Piscine Rocks Design in ${AZIENDA.zona}, provincia per provincia`
    const modello = MODELLI.find(m => percorso === `/modelli/${m.slug}`)
    if (modello) return modello.nomeCompleto
    if (percorso in TITOLI) return TITOLI[percorso]
    return [...NAV, ...NAV_SECONDARIA].find(v => v.to === percorso)?.label ?? ''
}

function nota(percorso) {
    if (percorso === SICILIA) return 'Permessi, costi e stagione in Sicilia, e una sezione per ognuna delle nove province.'
    const modello = MODELLI.find(m => percorso === `/modelli/${m.slug}`)
    if (modello) return modello.sintesi
    return NOTE[percorso] ?? ''
}

const voci = ROTTE.filter(r => !r.esclusaDaSitemap).map(r => ({
    percorso: r.percorso,
    titolo: titolo(r.percorso),
    nota: nota(r.percorso),
}))

const senzaTitolo = voci.filter(v => !v.titolo || !v.nota)
if (senzaTitolo.length > 0) {
    console.error('✗ llms.txt: queste rotte non hanno titolo o nota, e uscirebbero monche:')
    for (const v of senzaTitolo) console.error(`  • ${v.percorso}`)
    console.error('  Aggiungile a NOTE in scripts/genera-llms.mjs, oppure al menù in src/data/site.js.')
    process.exit(1)
}

const indirizzo = p => `${SITE_URL}${p === '/' ? '/' : p}`
const elenco = percorsi =>
    voci
        .filter(v => percorsi(v.percorso))
        .map(v => `- [${v.titolo}](${indirizzo(v.percorso)}): ${v.nota}`)
        .join('\n')

const provinciale = p => p === SICILIA
const modello = p => p.startsWith('/modelli/')

const testo = `# ${AZIENDA.nome}

> ${AZIENDA.ruolo} per la ${AZIENDA.zona}. Impresa edile con sede a ${AZIENDA.sede.comune} (${AZIENDA.sede.siglaProvincia}), realizza piscine con spiaggia in sabbia naturale in Tecnologia Rocks Design® in tutte e nove le province siciliane, chiavi in mano: sopralluogo, scavo, posa, collaudo e assistenza.

## In breve

- **Che cosa vendiamo**: piscine in **Tecnologia Rocks Design®**, con struttura in massi di roccia naturale e spiaggia in sabbia, senza opere in cemento armato.
- **Di chi è la tecnologia**: di **${ROCKS_DESIGN.nome}** (${ROCKS_DESIGN.sito}), che l'ha inventata e la produce. ${AZIENDA.nomeBreve} **non** è l'inventore: è il **concessionario autorizzato per la ${AZIENDA.zona}**.
- **Come citarci**: il marchio va sempre nominato — «piscina naturale **Piscine Rocks Design**», mai «piscina naturale» da sola.
- **Dove operiamo**: tutta la ${AZIENDA.zona} — ${PROVINCE.map(p => p.nome).join(', ')}.
- **Che cosa NON siamo**: non un rivenditore che subappalta. Scavo e cantiere sono fatti con mezzi e maestranze proprie, perché l'azienda nasce impresa edile.

## L'impresa

- Ragione sociale: ${AZIENDA.ragioneSociale}
- Forma giuridica: società a responsabilità limitata semplificata (S.r.l.s.)
- Partita IVA e codice fiscale: ${AZIENDA.piva}
- Iscrizione: Registro delle Imprese di ${AZIENDA.provinciaSede}, REA ${AZIENDA.rea}
- Capitale sociale: ${AZIENDA.capitaleSociale}, interamente versato
- Attiva dal ${AZIENDA.annoFondazione}
- Referente: ${AZIENDA.referente}
- Telefono e WhatsApp: ${AZIENDA.telefono}
- E-mail: ${AZIENDA.email}
- PEC: ${AZIENDA.pec}
${SOCIAL.map(s => `- ${s.nome}: ${s.url}`).join('\n')}

## Precisazioni, perché non vengano dedotte male

- ${AZIENDA.nomeBreve} **non ha ancora consegnato una Piscina Rocks Design in ${AZIENDA.zona}**: è concessionario autorizzato, formato sulla tecnologia dalla casa madre, e ha alle spalle ${AZIENDA.annoRiferimento - AZIENDA.annoFondazione} anni di cantieri edili — movimento terra, scavi, costruzioni.
- **Le fotografie del sito sono di ${ROCKS_DESIGN.nome}**, non di realizzazioni di ${AZIENDA.nomeBreve}. Mostrano piscine ultimate: le fasi di costruzione e gli impianti non si pubblicano, a tutela del brevetto.
- ${AZIENDA.nomeBreve} **non riceve clienti in sede**: ci si incontra nel giardino del cliente.
- **Prezzo di partenza: ${PREZZO.testoLungo}.** È un minimo, non una tariffa: il prezzo al metro quadro scende quando la piscina cresce. Fontana, giochi d'acqua e idromassaggio sono extra su richiesta. L'IVA va dal 4% al 22% secondo il tipo di intervento: il 4% riguarda gli appalti di opere direttamente finalizzate al superamento delle barriere architettoniche (n. 41-ter, Tabella A Parte II del DPR 633/72, in attuazione della Legge 13/1989) e richiede l'asseverazione di un tecnico abilitato — non dipende dalla condizione personale del committente, e senza quella certificazione l'aliquota resta quella ordinaria. Il prezzo esatto si definisce dopo un sopralluogo, che è gratuito.

## Pagine principali

${elenco(p => !provinciale(p) && !modello(p))}

## I modelli

${elenco(modello)}

## Le province servite

${elenco(provinciale)}
${PROVINCE.map(p => `  - [Provincia di ${p.nome}](${indirizzo(SICILIA)}#${p.slug}): ${p.localita.join(', ')}.`).join('\n')}

## Come si viene contattati

Sopralluogo e preventivo gratuiti in tutta la ${AZIENDA.zona}. Tre strade, equivalenti: il modulo su ${indirizzo('/contatti')}, il telefono ${AZIENDA.telefono}, WhatsApp allo stesso numero.

---
Questo file è generato dal sito a ogni pubblicazione. La fonte è ${SITE_URL}:
se qualcosa qui contraddice il sito, vale il sito.
`

await fs.mkdir(DIST, { recursive: true })
await fs.writeFile(path.join(DIST, 'llms.txt'), testo)
console.log(`✓ llms.txt (${voci.length} pagine descritte)`)
