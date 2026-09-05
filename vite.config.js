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
 * Modello HTML di partenza: `index.html` nella radice, il nome convenzionale
 * che Vite — e gli hosting con preset Vite — si aspettano di trovare.
 *
 * Per un periodo il file si è chiamato `sorgente.html`, perché il sito
 * compilato veniva committato nella radice del repository e lì `index.html`
 * era la home vera: ogni pubblicazione avrebbe sovrascritto il modello. Ora è
 * l'hosting a compilare e la radice contiene solo codice, quindi quella
 * ragione è decaduta. Anzi si è rovesciata: sotto un preset gestito, tenere
 * una pagina già compilata di nome `index.html` accanto al modello è il
 * rischio, perché il preset prende `index.html` come ingresso.
 */
const INGRESSO = fileURLToPath(new URL('./index.html', import.meta.url))

export default defineConfig({
    base: BASE,
    // L'anno del copyright viene fissato alla compilazione: a runtime
    // differirebbe fra markup pre-renderizzato e markup idratato.
    define: { __ANNO_COMPILAZIONE__: new Date().getFullYear() },
    plugins: [react(), anteprimaPreRenderizzata()],
    build: {
        target: 'es2020',
        cssCodeSplit: false,
        reportCompressedSize: false,
        // La chiave `index` fa emettere dist/index.html e asset index-[hash]
        rollupOptions: { input: { index: INGRESSO } },
    },
})
