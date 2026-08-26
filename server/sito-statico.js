/**
 * Servizio del sito compilato.
 *
 * È la traduzione di `public/.htaccess`, che resta nel repository come
 * riferimento (e per un eventuale ritorno all'hosting statico): le due
 * implementazioni vanno tenute allineate.
 *
 * Differenza sostanziale rispetto ad Apache: là il sito compilato conviveva
 * nella stessa cartella del codice sorgente, e `media-sources/`, `src/` e i
 * file di configurazione erano resi irraggiungibili da una lista di percorsi
 * da ricordarsi di aggiornare. Qui si serve **solo** la cartella del sito
 * compilato: quel materiale non è protetto da una regola, è fuori dalla radice
 * servita. Sparisce l'intera classe di errore «ho aggiunto una cartella e ho
 * dimenticato di negarla».
 */
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import compression from 'compression'

const ANNO = 31536000
const MESE = 2592000

/** Cache come nel .htaccess: per estensione, non per percorso. */
function intestazioniDiCache(res, file) {
    const estensione = path.extname(file).toLowerCase()
    if (estensione === '.html') {
        // L'HTML va sempre riconvalidato, altrimenti gli aggiornamenti non si vedono
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
    } else if (['.js', '.mjs', '.css', '.woff2'].includes(estensione)) {
        // Gli asset compilati portano l'hash nel nome: non cambiano mai
        res.setHeader('Cache-Control', `public, max-age=${ANNO}, immutable`)
    } else if (['.webp', '.jpg', '.jpeg', '.png', '.svg', '.avif'].includes(estensione)) {
        res.setHeader('Cache-Control', `public, max-age=${MESE}`)
    } else {
        res.setHeader('Cache-Control', `public, max-age=${MESE}`)
    }
}

/**
 * Elenco delle rotte pre-renderizzate, calcolato una volta all'avvio.
 *
 * Si preferisce alla verifica su disco a ogni richiesta per due motivi: evita
 * un accesso al filesystem per ogni navigazione, e rende impossibile servire
 * un `index.html` che la build non ha prodotto. Conseguenza da conoscere: dopo
 * una ricompilazione il processo va riavviato (l'hosting lo fa da sé a fine
 * deploy; in locale no).
 */
function rotteConIndice(radice) {
    const trovate = new Set()
    const scandisci = (cartella, prefisso) => {
        for (const voce of fs.readdirSync(cartella, { withFileTypes: true })) {
            if (!voce.isDirectory() || voce.name.startsWith('.')) continue
            const completa = path.join(cartella, voce.name)
            const rotta = `${prefisso}/${voce.name}`
            if (fs.existsSync(path.join(completa, 'index.html'))) trovate.add(rotta)
            scandisci(completa, rotta)
        }
    }
    scandisci(radice, '')
    return trovate
}

export function montaSito(app, { cartellaSito, politicaContenuti }) {
    const radice = path.resolve(cartellaSito)

    // Un'app che risponde solo 404 sembra un dominio rotto: meglio non partire
    // affatto, così la causa finisce nel log del pannello.
    if (!fs.existsSync(path.join(radice, 'index.html'))) {
        throw new Error(
            `Sito compilato assente in ${radice}. Eseguire \`npm run build\` prima di avviare il server.`,
        )
    }

    const rotte = rotteConIndice(radice)
    const paginaNonTrovata = fs.existsSync(path.join(radice, '404.html'))
        ? fs.readFileSync(path.join(radice, '404.html'))
        : Buffer.from('<!doctype html><title>Pagina non trovata</title><h1>Pagina non trovata</h1>')

    app.disable('x-powered-by')

    // Intestazioni di sicurezza su ogni risposta: statica, API e 404.
    app.use((_req, res, avanti) => {
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
        res.setHeader('Content-Security-Policy', politicaContenuti)
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        avanti()
    })

    app.use(compression({ threshold: 1024 }))

    /**
     * URL puliti: `/galleria` serve `dist/galleria/index.html` **senza
     * redirect**, come faceva `DirectorySlash Off` più la RewriteRule.
     * L'indirizzo deve restare quello dichiarato nel canonical della pagina.
     *
     * Si riscrive soltanto `req.url`: la risoluzione su disco resta a
     * `express.static`, che rifiuta già i `..`. Non si costruisce mai un
     * percorso a mano.
     */
    app.use((req, _res, avanti) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return avanti()
        let percorso
        try {
            percorso = decodeURIComponent(req.path)
        } catch {
            return avanti() // percorso malformato: lo gestisce il 404 finale
        }
        if (percorso === '/' || path.extname(percorso)) return avanti()
        const senzaBarra = percorso.endsWith('/') ? percorso.slice(0, -1) : percorso
        if (rotte.has(senzaBarra)) {
            req.url = `${senzaBarra}/index.html${req.url.slice(req.path.length)}`
        }
        return avanti()
    })

    app.use(
        express.static(radice, {
            // Senza questo, `dist/.htaccess` sarebbe scaricabile come /.htaccess
            dotfiles: 'ignore',
            index: 'index.html',
            etag: true,
            lastModified: true,
            redirect: false,
            setHeaders: intestazioniDiCache,
        }),
    )

    return { rotte, paginaNonTrovata }
}

/** Catch-all finale: equivalente di `ErrorDocument 404 /404.html`. */
export function montaNonTrovata(app, paginaNonTrovata) {
    app.use((req, res) => {
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ ok: false, motivo: 'endpoint-inesistente' })
        }
        res.status(404)
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
        res.send(paginaNonTrovata)
    })
}
