import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

/** Usato da scripts/prerender.mjs per generare HTML statico per ogni rotta. */
export function render(percorso) {
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
