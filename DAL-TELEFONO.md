# Gestire il sito da iPad e iPhone

Nessuna operazione su questo sito richiede un terminale. Se da qualche parte
trovi scritto `npm ci && npm run build && npm run verifica`, **non è un comando
da eseguire tu**: è testo da incollare in un campo del pannello Hostinger, e a
eseguirlo sono i loro server a ogni push.

## Chi esegue cosa

| Chi | Che cosa esegue | Dove lo vedi |
| --- | --- | --- |
| Claude, in sessione | build, lint, conformità, prove nel browser | nella conversazione |
| GitHub Actions | gli stessi controlli a ogni push su `main` | ✓ o ✗ accanto al commit, app GitHub |
| Hostinger | compila e pubblica a ogni push su `main` | log di deploy in hPanel |
| Tu | tre campi in hPanel, una volta sola | moduli web |

## I tre campi in hPanel

Uno per riga, mai copiati da una tabella: la prima volta `VITE_SITE_URL` è
finita in produzione con dentro l'intera riga di istruzioni, separatore
compreso, e ogni canonical del sito puntava a quella stringa.

**Comando di build:**

```
npm ci && npm run build && npm run verifica
```

Quel `npm run verifica` in coda non è ornamentale: è il cancello che **fa
fallire la pubblicazione** se il sito viola le direttive Piscine Rocks Design o
se una build non di produzione uscisse indicizzabile. Senza, Hostinger pubblica
qualunque cosa compili.

**Variabile `VITE_BASE`:**

```
/
```

**Variabile `VITE_SITE_URL`:** si lascia **vuota** finché il dominio non è
pagato e attivo. Vuota significa «anteprima», e l'anteprima è il verso sicuro:
tutte le pagine escono `noindex` e nessun indirizzo provvisorio finisce
nell'indice di Google a fare concorrenza al dominio vero.

La versione di Node può restare quella impostata: 20.19 o superiore va bene.

## Dopo ogni modifica

1. **Il segno di spunta sul commit** (app GitHub, scheda del commit o Actions):
   verde vuol dire che lint, build e conformità sono passati. Il riepilogo in
   cima al run dice quante pagine sono state compilate e se sono indicizzabili.
2. **Il log di deploy in hPanel**: Hostinger ricompila da sé, ci mette un paio
   di minuti.
3. **Il controllo del sito pubblicato**, qui sotto.

Il punto 1 controlla il *codice*; il punto 3 controlla il *sito che vede un
cliente*. Non sono la stessa cosa: in mezzo ci sono la build di Hostinger e le
sue variabili d'ambiente, che non stanno nel repository.

## Il controllo del sito pubblicato, con un tocco

App GitHub → **Actions** → **Controllo del sito pubblicato** → *Run workflow*.
L'indirizzo è già compilato; il giorno del dominio nuovo si sostituisce lì,
nel campo, senza toccare il codice.

In pochi secondi risponde verde o rosso, con una tabella leggibile sul
telefono: pagine che rispondono, indicizzazione coerente con l'indirizzo,
metadati e immagini social, sitemap, `robots.txt`, direttive Rocks Design e —
la più importante — che `media-sources/` e il catalogo della casa madre non
siano scaricabili da nessuno.

## Il `robots.txt` dell'anteprima non è nostro

Sull'indirizzo provvisorio `/robots.txt` risponde così:

```
User-agent: Googlebot
Disallow: /

User-agent: *
Allow: /
```

Non è il nostro file e **non c'è niente da cancellare in `public_html`**: lo
serve la rete di distribuzione di Hostinger, che protegge i domini di anteprima.
Si riconosce dalle intestazioni HTTP — ogni file davvero pubblicato risponde con
`platform: hostinger` e un `last-modified`, quello lì con nessuno dei due. Il
controllo automatico lo riconosce e lo segnala come nota, non come guasto.

Sparirà da sé quando il dominio definitivo sarà collegato. È allora che va
guardato sul serio, perché a quel punto risponde il nostro — e finché
`VITE_SITE_URL` è vuota, il nostro dice `Disallow: /` a tutti.

## Il giorno del go-live

L'ordine conta. Fatto a metà, il sito è online e invisibile a Google senza che
niente sembri rotto.

1. Collega il dominio a Hostinger e aspetta che risponda.
2. **Nello stesso momento** imposta `VITE_SITE_URL` in hPanel:

   ```
   https://www.lunacostruzioni.it
   ```

   Solo l'indirizzo, niente altro sulla riga.
3. Ripubblica (un push, o *Deploy* dal pannello): l'indicizzazione si riapre da
   sé, canonical e sitemap si riscrivono sul dominio nuovo.
4. Lancia il **Controllo del sito pubblicato** con il nuovo indirizzo. Deve
   essere tutto verde: se `robots.txt` chiude ancora tutto, il punto 2 non ha
   fatto effetto.
5. Attiva la casella `info@lunacostruzioni.it`. Finché non esiste, il modulo di
   contatto apre il programma di posta del visitatore invece di spedire.

Se il dominio finale non fosse `www.lunacostruzioni.it`, va aggiornato anche
`DOMINIO_DEFINITIVO` in `src/data/site.js` — chiedilo a Claude in sessione, è
una riga.
