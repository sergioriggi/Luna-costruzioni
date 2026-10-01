import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from './lib/instradamento'
import { precaricaTutte } from './lib/pigra'
import App from './App.jsx'

/**
 * Usato da scripts/prerender.mjs per generare HTML statico per ogni rotta.
 *
 * Asincrona perché prima del render si carica il codice di tutti i componenti
 * pigri (pagine e sezioni sotto la piega): `renderToString` non sa aspettare,
 * e senza questo l'HTML statico conterrebbe dei vuoti.
 */
export async function render(percorso) {
    await precaricaTutte()
    // Il pre-rendering passa rotte senza prefisso: qui si antepone il `base`,
    // così StaticRouter e BrowserRouter vedono la stessa posizione.
    const base = import.meta.env.BASE_URL || '/'
    const posizione = base.replace(/\/$/, '') + percorso

    return renderToString(
        <StrictMode>
            <StaticRouter location={posizione} basename={base}>
                <App />
            </StaticRouter>
        </StrictMode>,
    )
}
