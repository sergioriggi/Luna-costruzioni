/**
 * Punto di ingresso dell'applicazione.
 *
 * Il nome è quello che l'hosting propone di default come file di avvio, ed è
 * anche il bersaglio di `npm start`: così il pannello funziona senza dover
 * correggere alcun campo. Il contenuto vero sta in `server/`.
 */
import { avvia } from './server/avvio.js'

avvia()
