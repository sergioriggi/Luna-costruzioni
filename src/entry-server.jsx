import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

/** Usato da scripts/prerender.mjs per generare HTML statico per ogni rotta. */
export function render(percorso) {
    return renderToString(
        <StrictMode>
            <StaticRouter location={percorso}>
                <App />
            </StaticRouter>
        </StrictMode>,
    )
}
