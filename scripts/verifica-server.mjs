/**
 * Collaudo del server Node.
 *
 *   npm run build && npm run verifica:server
 *
 * Avvia l'applicazione su una porta effimera e verifica che si comporti come
 * l'Apache che sostituisce: URL puliti senza redirect, 404 reale, cache e
 * intestazioni corrette, e — punto più importante — che il materiale non
 * pubblicabile resti irraggiungibile.
 */
import { creaApplicazione } from '../server/avvio.js'
import { CONFIGURAZIONE } from '../server/configurazione.js'
import { creaSegnalatoreAds } from '../server/google-ads.js'
import { convalidaLead } from '../server/convalida.js'

const errori = []
let eseguite = 0

function verifica(descrizione, condizione, dettaglio = '') {
    eseguite += 1
    if (!condizione) errori.push(`${descrizione}${dettaglio ? ` — ${dettaglio}` : ''}`)
}

const server = creaApplicazione(CONFIGURAZIONE).listen(0, '127.0.0.1')
await new Promise(r => server.once('listening', r))
const BASE = `http://127.0.0.1:${server.address().port}`

/** `redirect: 'manual'` è essenziale: un 3xx qui sarebbe un difetto. */
const chiedi = (percorso, opzioni = {}) =>
    fetch(BASE + percorso, { redirect: 'manual', ...opzioni })

// ── pagine ───────────────────────────────────────────────────────────────
{
    const r = await chiedi('/')
    verifica('/ risponde 200', r.status === 200, `ricevuto ${r.status}`)
    verifica('/ è HTML', (r.headers.get('content-type') ?? '').includes('text/html'))
    verifica('/ si riconvalida', (r.headers.get('cache-control') ?? '').includes('must-revalidate'))
    const corpo = await r.text()
    verifica('/ è pre-renderizzata', corpo.includes('Luna Costruzioni'))
}

for (const percorso of ['/galleria', '/galleria/', '/quanto-costa', '/piscine-rocks-design/sicilia']) {
    const r = await chiedi(percorso)
    verifica(`${percorso} risponde 200 senza redirect`, r.status === 200, `ricevuto ${r.status}`)
    const corpo = await r.text()
    verifica(`${percorso} porta markup pre-renderizzato`, corpo.includes('<h1') || corpo.includes('<h2'))
}

// ── vecchie pagine provinciali: 301 verso l'ancora ─────────────────────
for (const percorso of ['/piscine-rocks-design/palermo', '/piscine-rocks-design/enna/', '/piscine-rocks-design/agrigento/index.html']) {
    const r = await chiedi(percorso)
    const slug = percorso.split('/')[2]
    verifica(`${percorso} risponde 301`, r.status === 301, `ricevuto ${r.status}`)
    verifica(`${percorso} porta a #${slug}`, (r.headers.get('location') ?? '') === `/piscine-rocks-design/sicilia#${slug}`,
        r.headers.get('location') ?? 'nessun Location')
}
for (const percorso of ['/showroom', '/showroom/']) {
    const r = await chiedi(percorso)
    verifica(`${percorso} risponde 301`, r.status === 301, `ricevuto ${r.status}`)
    verifica(`${percorso} porta a /galleria`, r.headers.get('location') === '/galleria', r.headers.get('location') ?? 'nessun Location')
}
{
    const r = await chiedi('/piscine-rocks-design/inesistente')
    verifica('/piscine-rocks-design/inesistente resta 404', r.status === 404, `ricevuto ${r.status}`)
}

// ── asset ────────────────────────────────────────────────────────────────
{
    const home = await (await chiedi('/')).text()
    const js = home.match(/\/assets\/[\w.-]+\.js/)?.[0]
    const css = home.match(/\/assets\/[\w.-]+\.css/)?.[0]
    verifica('la home referenzia un bundle JS', Boolean(js))

    if (js) {
        const r = await chiedi(js)
        verifica(`${js} risponde 200`, r.status === 200)
        verifica(`${js} è JavaScript`, (r.headers.get('content-type') ?? '').includes('javascript'),
            r.headers.get('content-type') ?? '')
        verifica(`${js} è immutabile`, (r.headers.get('cache-control') ?? '').includes('immutable'))
    }
    if (css) {
        const r = await chiedi(css)
        verifica(`${css} è CSS`, (r.headers.get('content-type') ?? '').includes('text/css'))
    }

    const r = await chiedi('/media/oasi-aerea-sabbia-bianca-1280.webp')
    verifica('una foto risponde 200', r.status === 200)
    verifica('la foto è image/webp', (r.headers.get('content-type') ?? '').includes('image/webp'))
    verifica('la foto ha cache di un mese', (r.headers.get('cache-control') ?? '').includes('2592000'))
}

// ── 404 ──────────────────────────────────────────────────────────────────
{
    const r = await chiedi('/pagina-che-non-esiste')
    verifica('percorso ignoto → 404', r.status === 404, `ricevuto ${r.status}`)
    const corpo = await r.text()
    verifica('il 404 serve la pagina 404', corpo.toLowerCase().includes('non trovata'))
}

// ── materiale che non deve mai essere raggiungibile ──────────────────────
const VIETATI = [
    '/media-sources/foto/0001.jpg',
    '/media-sources/catalogo/0001.jpg',
    '/src/main.jsx',
    '/scripts/prepare-media.mjs',
    '/server/posta.js',
    '/server/configurazione.js',
    '/app.js',
    '/package.json',
    '/package-lock.json',
    '/vite.config.js',
    '/.env',
    '/.htaccess',
    '/.git/config',
    '/sorgente.html',
    // path traversal, in chiaro e percent-encoded
    '/../package.json',
    '/..%2fpackage.json',
    '/%2e%2e/package.json',
    '/assets/../../package.json',
]
for (const percorso of VIETATI) {
    const r = await chiedi(percorso)
    verifica(`${percorso} è irraggiungibile`, r.status === 404 || r.status === 400,
        `ricevuto ${r.status}`)
}

// ── intestazioni di sicurezza, ovunque ───────────────────────────────────
for (const percorso of ['/', '/galleria', '/pagina-che-non-esiste']) {
    const r = await chiedi(percorso)
    verifica(`${percorso}: nosniff`, r.headers.get('x-content-type-options') === 'nosniff')
    verifica(`${percorso}: Referrer-Policy`, Boolean(r.headers.get('referrer-policy')))
    verifica(`${percorso}: CSP`, Boolean(r.headers.get('content-security-policy')))
    verifica(`${percorso}: niente X-Powered-By`, r.headers.get('x-powered-by') === null)
}

// ── API ──────────────────────────────────────────────────────────────────
const posta = (corpo) =>
    chiedi('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
    })

const VALIDO = {
    nome: 'Mario Rossi', email: 'mario@example.it', telefono: '3330000000',
    comune: 'Palermo', consenso: true, messaggio: 'Buongiorno.',
}

{
    const r = await chiedi('/api/salute')
    verifica('/api/salute risponde 200', r.status === 200)
    const corpo = await r.json()
    verifica('/api/salute dichiara lo stato SMTP', typeof corpo.smtp === 'boolean')
}
{
    const r = await posta({ ...VALIDO, sito: 'sono-un-robot' })
    verifica('esca compilata → 200 e nessun invio', r.status === 200, `ricevuto ${r.status}`)
}
{
    const r = await posta({ nome: '', email: 'non-una-email', telefono: '1' })
    verifica('dati non validi → 400', r.status === 400, `ricevuto ${r.status}`)
    const corpo = await r.json()
    verifica('il 400 elenca i campi in errore', Boolean(corpo.errori?.nome && corpo.errori?.email))
}
{
    const r = await posta({ ...VALIDO, consenso: false })
    verifica('senza consenso → 400', r.status === 400, `ricevuto ${r.status}`)
}
if (!CONFIGURAZIONE.postaAttiva) {
    const r = await posta(VALIDO)
    verifica('SMTP assente → 503 (il modulo ripiega su mailto)', r.status === 503,
        `ricevuto ${r.status}`)
    const corpo = await r.json()
    verifica('il 503 dichiara il motivo', corpo.motivo === 'smtp-non-configurato')
}
{
    // Il limite è per indirizzo IP: dopo LEAD_LIMITE_INVII deve arrivare un 429.
    let visto429 = false
    for (let i = 0; i < CONFIGURAZIONE.lead.limiteInvii + 2; i += 1) {
        const r = await posta(VALIDO)
        if (r.status === 429) { visto429 = true; break }
    }
    verifica('oltre il limite → 429', visto429)
}
{
    const r = await chiedi('/api/inesistente')
    verifica('endpoint API ignoto → 404 JSON', r.status === 404)
}

// ── segnalazione lato server a Google Ads ────────────────────────────────
{
    const GCLID = 'Cj0KCQjw_esempio-1234'
    const VALIDO_ADS = { nome: 'Mario Rossi', email: 'mario@example.it', telefono: '3330000000', consenso: true }

    const c1 = convalidaLead({ ...VALIDO_ADS, gclid: GCLID, idConversione: 'abc-1234567890' })
    verifica('gclid ben formato passa la convalida', c1.dati.gclid === GCLID && c1.valido)
    const c2 = convalidaLead({ ...VALIDO_ADS, gclid: 'x" ; drop', idConversione: 'a b' })
    verifica('gclid malformato viene scartato senza bocciare il contatto',
        c2.valido && c2.dati.gclid === undefined && c2.dati.idConversione === undefined)

    const chiamate = []
    const finto = rispostaAds => async (url, opzioni) => {
        chiamate.push({ url: String(url), opzioni })
        if (String(url).includes('oauth2')) {
            return new Response(JSON.stringify({ access_token: 'tok', expires_in: 3600 }), { status: 200 })
        }
        return new Response(JSON.stringify(rispostaAds), { status: 200 })
    }
    const config = {
        adsAttivo: true,
        ads: {
            customerId: '2804042131', loginCustomerId: '', developerToken: 'dev', clientId: 'id',
            clientSecret: 'sec', refreshToken: 'rt', azioneConversione: 'customers/2804042131/conversionActions/1',
            versioneApi: 'v26', valore: 1, soloConvalida: false,
        },
    }

    const spento = await creaSegnalatoreAds({ adsAttivo: false })({ gclid: GCLID })
    verifica('senza credenziali la segnalazione è disattiva', spento.stato === 'disattivo')

    const esito = await creaSegnalatoreAds(config, { fetchImpl: finto({}), adesso: () => new Date('2026-10-23T12:05:09Z') })(
        { gclid: GCLID, idConversione: 'abc-1234567890' })
    verifica('conversione segnalata', esito.stato === 'segnalata', esito.stato)
    const carico = JSON.parse(chiamate.find(c => c.url.includes('googleads'))?.opzioni.body ?? '{}')
    const conv = carico.conversions?.[0] ?? {}
    verifica('invia gclid, azione e orderId', conv.gclid === GCLID && conv.orderId === 'abc-1234567890'
        && conv.conversionAction === config.ads.azioneConversione)
    verifica('formato data accettato da Ads', conv.conversionDateTime === '2026-10-23 12:05:09+00:00', conv.conversionDateTime)
    verifica('dichiara il consenso e usa partialFailure',
        conv.consent?.adUserData === 'GRANTED' && carico.partialFailure === true)
    verifica('endpoint della customer giusta',
        chiamate.some(c => c.url === 'https://googleads.googleapis.com/v26/customers/2804042131:uploadClickConversions'))

    const rifiutata = await creaSegnalatoreAds(config, {
        fetchImpl: finto({ partialFailureError: { message: 'gclid scaduto' } }),
    })({ gclid: GCLID })
    verifica('un partialFailureError non è un successo', rifiutata.stato === 'rifiutata', rifiutata.stato)

    const guasto = await creaSegnalatoreAds(config, { fetchImpl: async () => { throw new Error('rete') } })({ gclid: GCLID })
    verifica('un errore di rete non lancia', guasto.stato === 'errore', guasto.stato)
}

server.close()

console.log(`\n${eseguite} controlli eseguiti.`)
if (errori.length > 0) {
    console.error(`\n✗ ${errori.length} falliti:\n`)
    for (const e of errori) console.error('  •', e)
    process.exit(1)
}
console.log('✓ Il server si comporta come l’hosting statico che sostituisce.')
