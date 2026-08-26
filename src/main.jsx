import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const contenitore = document.getElementById('root')
const albero = (
    <StrictMode>
        <BrowserRouter>
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
