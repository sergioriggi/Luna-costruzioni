import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
// Nocturne definisce i token e le classi del sistema visivo, `pagina.css`
// l'impaginazione del file approvato: entrambi dopo Tailwind, così vincono.
import './nocturne.css'
import './pagina.css'

const contenitore = document.getElementById('root')
const albero = (
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
        </BrowserRouter>
    </StrictMode>
)

// Le pagine sono pre-renderizzate in fase di build: se il markup è già
// presente si idrata, altrimenti si esegue un render classico.
if (contenitore.hasChildNodes()) {
    hydrateRoot(contenitore, albero)
} else {
    createRoot(contenitore).render(albero)
}
