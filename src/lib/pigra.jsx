import { use } from 'react'

/**
 * Un componente che scarica il proprio codice solo quando serve.
 *
 * Perché non `React.lazy`: le pagine sono pre-renderizzate con
 * `renderToString`, che non sa aspettare un import. Qui il modulo si può
 * caricare PRIMA del render — con `precarica()` — e allora il componente esce
 * subito, senza sospendere:
 *
 *  - al pre-rendering `entry-server.jsx` precarica tutto, così l'HTML statico
 *    è completo come prima;
 *  - nel browser `main.jsx` precarica la pagina della rotta corrente prima di
 *    idratare, così il markup del client coincide con quello del server;
 *  - tutto il resto (le altre pagine, il modulo in fondo alla home) si scarica
 *    quando viene disegnato. Se succede durante l'idratazione, React lascia al
 *    suo posto l'HTML del server dentro il confine <Suspense> più vicino e lo
 *    idrata quando il codice arriva.
 *
 * `attendi` (facoltativo) ritarda lo scaricamento: una funzione che restituisce
 * una promessa, risolta quando è il momento di caricare.
 */
const tutte = new Set()

/** Per il pre-rendering: carica il codice di ogni componente pigro. */
export function precaricaTutte() {
    return Promise.all([...tutte].map(p => p()))
}

export default function pigra(carica, { attendi } = {}) {
    let Modulo = null
    let promessa = null

    const precarica = () => {
        promessa ??= carica().then(m => {
            Modulo = m.default
        })
        return promessa
    }

    let differita = null
    const quandoServe = () => {
        differita ??= (attendi ? attendi() : Promise.resolve()).then(precarica)
        return differita
    }

    function Pigra(props) {
        if (!Modulo) use(quandoServe())
        return <Modulo {...props} />
    }
    Pigra.precarica = precarica
    tutte.add(precarica)
    return Pigra
}

/**
 * Promessa che si risolve quando il browser ha finito il lavoro urgente:
 * dopo l'evento `load` e alla prima pausa. Serve per ciò che sta sotto la
 * piega e non deve contendere banda e processore all'apertura.
 */
export function aInattivita() {
    return new Promise(risolvi => {
        const dopo = () => {
            if ('requestIdleCallback' in window) window.requestIdleCallback(() => risolvi(), { timeout: 3000 })
            else setTimeout(risolvi, 1)
        }
        if (document.readyState === 'complete') dopo()
        else window.addEventListener('load', dopo, { once: true })
    })
}
