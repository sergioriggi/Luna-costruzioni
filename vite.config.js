import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * In sviluppo il sito è una SPA (fallback su index.html), ma in produzione
 * ogni rotta è un file HTML pre-renderizzato. Questo plugin allinea
 * `vite preview` al comportamento dell'hosting statico: se esiste
 * dist/<rotta>/index.html, serve quello invece del fallback SPA.
 * Senza, l'anteprima mostrerebbe sempre la home e l'idratazione fallirebbe.
 */
function anteprimaPreRenderizzata() {
    return {
        name: 'anteprima-pre-renderizzata',
        configurePreviewServer(server) {
            const dist = path.resolve('./dist')
            server.middlewares.use((req, _res, next) => {
                const percorso = (req.url ?? '/').split('?')[0]
                if (percorso === '/' || path.extname(percorso)) return next()
                const file = path.join(dist, percorso, 'index.html')
                if (file.startsWith(dist) && fs.existsSync(file)) {
                    req.url = path.posix.join(percorso, 'index.html')
                }
                next()
            })
        },
    }
}

/**
 * `base` configurabile: '/' per un dominio proprio, '/Luna-costruzioni/' per
 * le GitHub Pages di progetto. Lo imposta il workflow di pubblicazione.
 */
const BASE = process.env.VITE_BASE || '/'

/**
 * L'HTML di partenza si chiama `sorgente.html`, non `index.html`.
 *
 * Il sito compilato viene pubblicato nella radice del repository, dove
 * `index.html` è la home vera: se il modello di Vite si chiamasse allo stesso
 * modo, ogni pubblicazione lo sovrascriverebbe e la compilazione successiva
 * partirebbe da un file già compilato.
 */
const INGRESSO = fileURLToPath(new URL('./sorgente.html', import.meta.url))

/** In sviluppo la radice serve il modello, come ci si aspetta da un sito. */
function radiceVersoSorgente() {
    return {
        name: 'radice-verso-sorgente',
        configureServer(server) {
            server.middlewares.use((req, _res, next) => {
                if (req.url === '/' || req.url.startsWith('/?')) req.url = '/sorgente.html'
                next()
            })
        },
    }
}

export default defineConfig({
    base: BASE,
    plugins: [react(), radiceVersoSorgente(), anteprimaPreRenderizzata()],
    build: {
        target: 'es2020',
        cssCodeSplit: false,
        reportCompressedSize: false,
        // La chiave `index` fa emettere dist/index.html e asset index-[hash]
        rollupOptions: { input: { index: INGRESSO } },
    },
})
