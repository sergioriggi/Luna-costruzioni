import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
// Nocturne definisce i token e le classi del sistema visivo, `pagina.css`
// l'impaginazione del file approvato: entrambi dopo Tailwind, così vincono.
import './nocturne.css'
import './pagina.css'

// Qui c'era `document.documentElement.classList.add('js-anima')`, che accendeva
// le comparse progressive per tutta la pagina in un colpo. Era il difetto: fra
// quella riga e l'effetto di layout di `Rivela` ogni elemento restava a
// `opacity: 0`, sopra la piega compresa, e una pittura in quella finestra
// spostava l'LCP all'idratazione. Ora è `Rivela` a nascondere soltanto ciò che
// sta sotto la piega — vedi il commento in `src/index.css`.

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
