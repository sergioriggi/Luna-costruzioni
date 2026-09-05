# Luna Costruzioni S.r.l.s. — sito web

Sito ufficiale di **Luna Costruzioni S.r.l.s.**: impresa edile e concessionario
autorizzato Piscine Rocks Design per la **Sicilia**. Realizza la piscina in
Tecnologia Rocks Design® **chiavi in mano** — sopralluogo, scavi, realizzazione,
messa in opera e collaudo. Italiano con cambio lingua in inglese, SEO locale
sulle nove province.

L'impianto visivo e i contenuti della home seguono il **blueprint approvato**
(`index.html` fornito dal committente): tema scuro, tipografia Inter, sezioni
`piscine · processo · realizzazioni · dubbi · hotel · faq · sicilia · contatti`.

> **Principio guida — di chi è questo sito**
>
> È il sito del *concessionario*, non quello della casa madre. Il cliente deve capire
> in tre secondi che sta parlando con **Luna Costruzioni**, un'impresa che opera in
> Sicilia. Il marchio **Piscine Rocks Design** compare come *tecnologia del prodotto*
> e come *credenziale*, mai come intestazione del sito.
>
> In pratica: Luna Costruzioni apre ogni titolo di pagina e domina la testata; il logo
> del concessionario sta accanto al nome, non al suo posto. Il brevetto e il marchio
> sono di *Piscine Rocks Design*, di cui Luna Costruzioni è concessionario autorizzato
> per la Sicilia — **non** l'inventrice — e il sito lo dichiara apertamente.

---

## Indice

- [Avvio rapido](#avvio-rapido)
- [Struttura del sito](#struttura-del-sito)
- [Conformità alle direttive Rocks Design](#conformità-alle-direttive-rocks-design)
- [Pipeline delle immagini](#pipeline-delle-immagini)
- [SEO](#seo)
- [Configurazione](#configurazione)
- [Pubblicazione](#pubblicazione)
- [Struttura delle cartelle](#struttura-delle-cartelle)

---

## Avvio rapido

```bash
npm install
npm run assets     # logo concessionario, filigrana, immagini, font (una tantum)
npm run dev        # http://localhost:5173
```

Per compilare e verificare il sito di produzione:

```bash
npm run build      # bundle + pre-rendering + sitemap
npm run verifica   # controllo conformità alle direttive Rocks Design
npm run preview    # anteprima identica alla produzione
```

### Script disponibili

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Server di sviluppo con hot reload |
| `npm run build` | Bundle, **pre-rendering statico** di tutte le rotte, `sitemap.xml`, `robots.txt` |
| `npm run preview` | Anteprima di `dist/` che serve le pagine pre-renderizzate come l'hosting |
| `npm run verifica` | Verifica automatica delle direttive marketing Rocks Design su `dist/` |
| `npm run brand` | Estrae il logo ufficiale dal catalogo e genera la filigrana |
| `npm run media` | Genera le immagini responsive filigranate da `media-sources/` |
| `npm run media:manifest` | Rigenera solo `src/data/media.json` (quando cambiano didascalie o tag) |
| `npm run fonts` | Scarica e self-hosta Inter |
| `npm run assets` | `brand` + `media` + `fonts` |
| `npm run lint` | Oxlint |
| `npm start` | Avvia il server Node che serve `dist/` e l'endpoint contatti |
| `npm run verifica:server` | Collauda il server: URL puliti, 404, intestazioni, percorsi protetti, API |

---

## Struttura del sito

| Rotta | Pagina | Ruolo |
| --- | --- | --- |
| `/` | Home | Il blueprint completo: eroe, credenziali, piscine, cinque fasi, realizzazioni, i quattro dubbi, hotel, FAQ, Sicilia, contatti |
| `/piscine-rocks-design` | Come sono fatte | La tecnologia del prodotto, differenze, ambiente e permessi |
| `/modelli` | I modelli | Indice: Caraibi, Mediterranea, Alpi |
| `/modelli/caraibi` `/modelli/mediterranea` `/modelli/alpi` | Pagina per modello | Testo, sabbie consigliate, galleria dedicata |
| `/sabbie` | Le sabbie | Bianco, Giallo, Ticino e il colore d'acqua che restituiscono |
| `/giardini-e-opere-in-pietra` | Giardini e pietra | Il secondo mestiere dell'impresa, anche senza piscina |
| `/hotel-e-resort` | Hotel e resort | Argomenti B2B: cantiere fuori stagione, un solo appalto |
| `/galleria` | Realizzazioni | Tutte le foto, filtrabili, con lightbox |
| `/showroom` | Showroom | «Vieni a trovarci presso la nostra sede» |
| `/quanto-costa` | Quanto costa | Le voci che spostano il preventivo — pagina ad alta intenzione |
| `/come-lavoriamo` | Metodo | I cinque passaggi, con le durate |
| `/domande-frequenti` | FAQ | Permessi, costi, manutenzione, tempi |
| `/azienda` | Chi siamo | L'impresa, gli impegni, le province |
| `/contatti` | Contatti | NAP completo + modulo |
| `/piscine-rocks-design/<provincia>` | 9 pagine locali | Palermo, Catania, Messina, Siracusa, Ragusa, Trapani, Agrigento, Caltanissetta, Enna |
| `/privacy`, `/cookie-policy` | Note legali | GDPR, `noindex` |

Contenuti e dati stanno in `src/data/`:

- `site.js` — dati aziendali (NAP), province servite, voci di menu, URL del sito;
- `content.js` — testi editoriali (punti di forza, elementi, modelli, percorso, FAQ);
- `media.json` — **generato**, manifest delle immagini pubblicate.

Per aggiungere una provincia basta una voce in `PROVINCE`: rotta, pagina locale,
voce in sitemap e link interni si generano da soli.

---

## Conformità alle direttive Rocks Design

Le direttive del dipartimento marketing sono implementate nel codice, non affidate
alla memoria di chi aggiorna il sito:

| Direttiva | Implementazione |
| --- | --- |
| Gerarchia: il sito è del concessionario | Luna Costruzioni apre ogni `<title>`, domina la testata ed è il soggetto dei testi; `og:site_name` è l'impresa, non il marchio |
| Testi propri, non copiati | Ogni riga è scritta ex novo. `npm run verifica` fallisce se ricompare una frase del catalogo o del sito della casa madre |
| Logo *Concessionario Autorizzato* nella fascia superiore, con link alla pagina ufficiale | `src/components/BadgeConcessionario.jsx`, presente in header e footer di ogni pagina |
| Deve essere chiaro che l'azienda è concessionaria, non inventrice | Dichiarato in header, footer, home, pagina tecnologia e ogni pagina provinciale |
| «piscina naturale» va sempre seguito da «Piscine Rocks Design» | I testi usano **solo** «Piscine Rocks Design»; `npm run verifica` blocca ogni uso isolato |
| Foto della piscina espositiva in prima pagina con «Vieni a trovarci presso la nostra sede» | Sezione showroom in home + pagina `/showroom` |
| **Vietato** pubblicare tecnica costruttiva, fasi di cantiere o impianti | I sorgenti stanno in `media-sources/`, **fuori** da `public/`: sul sito arrivano solo le immagini della whitelist in `scripts/media.config.mjs` |
| Ogni foto deve riportare il marchio Piscine Rocks Design | Filigrana **impressa nel file** da `scripts/prepare-media.mjs`, non sovrapposta via CSS |
| Indicare sempre la città / zona di riferimento | Nove pagine provinciali + zona citata in ogni pagina indicizzabile (verificato) |
| Taggare `@piscinerocksdesign` sui social | Indicato in footer e in galleria |
| Testo leggibile: paragrafi, grassetti, elenchi | Impaginazione tipografica dedicata, elenchi e tabelle di confronto |

Il logo usato è quello **ufficiale**, estratto dal catalogo fornito dalla casa madre
(`scripts/build-brand-assets.mjs`): nessuna ricostruzione approssimativa del marchio.

### La verifica automatica

`npm run verifica` analizza il sito compilato e fallisce (exit code 1) se trova:

1. una pagina senza logo concessionario nella fascia superiore o senza link al sito ufficiale;
2. la dicitura «piscina naturale» non seguita da «Piscine Rocks Design»;
3. un riferimento a `media-sources/`, `/catalogo/` o `/foto/` (materiale non filigranato,
   che include le foto delle fasi di costruzione);
4. un'immagine fuori dalla whitelist;
5. una pagina indicizzabile che non cita la zona di riferimento;
6. una frase ripresa alla lettera dal catalogo o dal sito della casa madre — oltre alla
   questione dei diritti, testi identici fra i siti dei concessionari si penalizzano a
   vicenda nei motori di ricerca.

Va eseguita dopo ogni `npm run build`, prima di pubblicare.

---

## Sistema visivo

Tema scuro. La fonte di verità è **`src/nocturne.css`**, che definisce i token
CSS; `tailwind.config.js` li rispecchia con nomi italiani per le pagine di
approfondimento. **Le due vanno tenute allineate.**

| Token | Valore | Uso |
| --- | --- | --- |
| `notte` / `--color-bg` | `#12202b` | fondo pagina, blu notte di mare |
| `notte-900` / `--color-neutral-900` | `#1a2a33` | piè di pagina |
| `superficie` / `--color-surface` | `#1b2f3c` | schede, fasce alternate, campi |
| `testo` / `--color-text` | `#eef6f7` | testo principale |
| `neutro-300…600` | rampa | testi secondari |
| `accento` / `--color-accent` | `#38c6c0` | occhielli, bordi, chiamate all'azione |
| `--color-section` → `--color-section-glow` | `#123f4a` → `#17605f` | fascia «chiavi in mano» |

I bordi usano `testo/[0.16]`, la stessa trasparenza del blueprint. Tipografia
**Inter** (300–700), inclusa nel bundle da `src/fonts-woff2/`: nessuna
richiesta a terze parti, nessun consenso cookie da chiedere per i font. Le classi di componente
— `.bottone-*`, `.scheda`, `.campo`, `.occhiello`, `.titolo-sezione` — stanno
in `src/index.css`.

> Il fondo resta scuro di proposito: è ciò che fa risaltare le fotografie
> delle piscine, che sono la cosa che vende. Un tema chiaro renderebbe il sito
> più luminoso e le foto più piatte.
>
> Ogni coppia testo/fondo è verificata a contrasto WCAG AA. Se cambi un token,
> ricontrolla almeno il testo della fascia sul capo chiaro del gradiente e il
> copyright sul piè di pagina: sono le due che passano per prime sotto soglia.

---

## Bilingue italiano / inglese

`src/i18n/lingua.jsx` espone un contesto e la funzione `t(italiano, inglese)`:

```jsx
const { t } = useLingua()
<h2>{t('Cinque fasi, un’unica impresa.', 'Five stages, one company.')}</h2>
```

Il selettore è nel piè di pagina e la scelta si ricorda nel browser.

**Come è impostato oggi:** l'italiano è la lingua pubblicata — è quello che
finisce nell'HTML pre-renderizzato e quindi nell'indice di Google. L'inglese è
un cambio lato client, pensato per i clienti stranieri che cercano una villa o
gestiscono una struttura ricettiva in Sicilia. Sono tradotte la home, la
navigazione, il piè di pagina, i moduli e la pagina hotel; le pagine interne
restano in italiano.

Se in futuro serve che anche l'inglese sia indicizzato, la strada è duplicare
le rotte sotto `/en/` in `scripts/rotte.mjs` e aggiungere gli `hreflang`: la
struttura di pre-rendering è già pronta a farlo.

---

## Pipeline delle immagini

```
media-sources/foto/*.jpg          (sorgenti, NON serviti dal sito)
        │
        │  scripts/media.config.mjs  ← whitelist: cosa si può pubblicare
        ▼
scripts/prepare-media.mjs
        │  • ridimensiona a 640 / 1280 / 1920 px (mai oltre la risoluzione nativa)
        │  • imprime la filigrana «PISCINE ROCKS DESIGN»
        │  • esporta WebP + un JPEG di riserva
        │  • calcola un segnaposto sfocato (LQIP) inline
        ▼
public/media/<slug>-<larghezza>.webp|jpg   +   src/data/media.json
```

Il componente `src/components/Immagine.jsx` legge il manifest e produce un `<picture>`
responsive con dimensioni esplicite (niente *layout shift*), `loading="lazy"` di default
e `fetchPriority="high"` per le immagini di apertura.

**Per aggiungere una foto:** copiala in `media-sources/foto/`, aggiungi una voce in
`scripts/media.config.mjs` (slug, testo alternativo, tag) e lancia `npm run media`.
Prima di farlo, verifica che lo scatto non mostri scavi, teli, geotessili, tubazioni,
locali tecnici o mezzi d'opera: sono contenuti vietati dalla casa madre a tutela del brevetto.

---

## SEO

- **Pre-rendering statico**: ogni rotta è un file HTML completo, con titolo, meta,
  Open Graph e testi già presenti nella risposta del server. Niente contenuti
  visibili solo dopo l'esecuzione di JavaScript. In pagina il sito resta una SPA
  React, che si idrata sull'HTML pre-renderizzato.
- **Dati strutturati** (`schema.org`): `HomeAndConstructionBusiness` con `areaServed`
  su tutte le province, `Service` per pagina locale, `FAQPage`, `BreadcrumbList`.
- **SEO locale**: nove pagine provinciali con testo, FAQ e località specifiche —
  non testo duplicato con la città sostituita.
- `sitemap.xml` e `robots.txt` generati dall'elenco rotte (`scripts/rotte.mjs`).
- **Prestazioni**: font self-hostati, CSS unico, immagini WebP responsive,
  nessuna richiesta a domini terzi al primo caricamento.

Prima della pubblicazione aggiornare `SITE_URL` in `src/data/site.js` con il dominio reale.

---

## Configurazione

Le variabili si dividono in due famiglie, e la differenza non è formale: decide
**chi può leggerle**. Vedi `.env.example`, che ha la stessa divisione.

### Di compilazione — finiscono nel bundle del browser

Vite incolla nel codice tutto ciò che ha il prefisso `VITE_`, al momento della
compilazione. Sono quindi **pubbliche**: chiunque le legge dal sorgente della
pagina. Non metterci mai un segreto.

| Variabile | Effetto se assente |
| --- | --- |
| `VITE_SITE_URL` | Si usa il dominio definitivo; se diverso, il sito si dichiara anteprima e resta `noindex` |
| `VITE_BASE` | `/` — il sito è servito dalla radice del dominio |
| `VITE_GA4_ID` | Nessuno script di misurazione viene caricato |

### Di runtime — lette solo dal server Node

Esistono soltanto quando il sito gira come applicazione Node.js. Sull'hosting
statico non ci sono, e il modulo ripiega sul client di posta del visitatore.

| Variabile | Effetto se assente |
| --- | --- |
| `PORT` | 3000 (in produzione la impone l'hosting) |
| `SMTP_HOST` `SMTP_USER` `SMTP_PASS` | `/api/contatti` risponde 503 e il modulo apre il client di posta: **nessun contatto va perso** |
| `LEAD_MITTENTE` | Si usa `SMTP_USER`. Dev'essere una casella del dominio, o SPF e DKIM non tornano |
| `LEAD_DESTINATARIO` | Si usa l'indirizzo aziendale di `src/data/site.js` |
| `LEAD_LIMITE_INVII` `LEAD_FINESTRA_MINUTI` `LEAD_TETTO_ORARIO` | 5 invii per IP ogni 10 minuti, 60 all'ora in totale |

`VITE_ENDPOINT_LEAD` sopravvive solo come scorciatoia per chi avesse già
configurato un servizio esterno: senza di essa il modulo posta su
`/api/contatti`, sulla stessa origine.

Gli script di misurazione partono **solo dopo il consenso** espresso nel banner
(`src/components/BannerCookie.jsx`): finché l'utente non accetta, il sito non
carica nulla di profilante.

### Il server Node

`app.js` avvia `server/`, che serve `dist/` e l'endpoint del modulo contatti.
È la traduzione di `public/.htaccess`: URL puliti senza redirect, 404 reale,
cache differenziata per estensione, intestazioni di sicurezza e CSP. **Le due
implementazioni vanno tenute allineate.**

Un guadagno che vale la pena notare: servendo solo `dist/`, il materiale non
pubblicabile (`media-sources/`, con le foto non filigranate e il catalogo della
casa madre) non è protetto da una lista di percorsi da ricordarsi di
aggiornare — è fuori dalla radice servita, e basta.

```
npm run build && npm start        # http://localhost:3000
npm run verifica:server           # collaudo automatico
```

### Da completare prima del go-live

In `src/data/site.js`: dominio reale (`SITE_URL`), indirizzo della sede,
partita IVA ed e-mail definitiva.

In `src/data/content.js`: l'array `RECENSIONI` è **vuoto di proposito**. Va
riempito solo con recensioni reali e verificabili raccolte dall'azienda: finché
resta vuoto la sezione non viene mostrata. Nessuna testimonianza inventata.

**Fotografie mancanti.** Le immagini disponibili ritraggono piscine e le opere di
contorno realizzate insieme a esse. Per la pagina `/giardini-e-opere-in-pietra`
servono scatti di lavori autonomi — muri a secco, pavimentazioni, terrazzamenti
senza piscina — altrimenti la pagina promette un servizio che le foto non
documentano. Una volta disponibili: copiarli in `media-sources/foto/`, aggiungere
la voce in `scripts/media.config.mjs` con `noWatermark: true` (non sono opere
Rocks Design e non devono portarne il marchio) e lanciare `npm run media`.

---

## Pubblicazione

```
main  ──push──▶  Hostinger (npm install && npm run build)  ──▶  serve dist/
                 GitHub Actions ──▶ lint, build, conformità  (verifica, non pubblica)
```

Hostinger importa il repository con **preset Vite** e compila da sé. Il
repository contiene quindi **solo codice sorgente**: niente sito compilato
committato nella radice, niente `.sito-pubblicato`.

`.github/workflows/verifica.yml` esegue lint, build, conformità e collaudo del
server a ogni push, ma **non pubblica nulla**: serve a dare un esito visibile
sul commit prima che l'hosting compili.

### Che cosa non deve mai finire online

**`public/.htaccess` finisce in `dist/`** e dà a Hostinger gli URL puliti, il
404 e gli header di cache. Contiene anche le regole che rendono irraggiungibili
`media-sources/`, `src/`, `scripts/`, `server/` e i file di configurazione:
regole che sotto il preset Vite sono ridondanti — servendo solo `dist/`, quel
materiale è già fuori dalla radice servita — ma che restano perché tengono
aperta la strada di un ritorno all'hosting statico.

`media-sources/` è il punto delicato: contiene le fotografie originali **non
filigranate** e il catalogo della casa madre, che include immagini delle fasi
di cantiere — materiale che le direttive Piscine Rocks Design vietano di
pubblicare. Non entra in `dist/`, e `npm run verifica` lo controlla.

### Configurazione su Hostinger — preset Vite

Hostinger importa il repository con **preset Vite** e **compila da sé**: non
copia file già pronti, esegue `npm install && npm run build` e serve `dist/`.

| Campo | Valore |
| --- | --- |
| Framework preset | Vite |
| Ramo | `main` |
| Radice | `./` |
| Versione di Node | **22** — Vite 8 dichiara `^20.19.0 \|\| >=22.12.0`, e un Node 20 inferiore a 20.19 non compila |
| Comando di build | `npm ci && npm run build && npm run verifica` |

Il `npm run verifica` nel comando di build non è ornamentale: **fa fallire il
deploy** se il sito viola le direttive Piscine Rocks Design, o se una build non
di produzione uscisse indicizzabile.

Variabili d'ambiente da impostare nel pannello:

| Nome | Valore |
| --- | --- |
| `VITE_SITE_URL` | l'indirizzo da cui il sito è **realmente** servito |
| `VITE_BASE` | `/` |
| `VITE_GA4_ID` | quando ci sarà un ID Analytics |

`VITE_SITE_URL` non è facoltativa: senza, il sito si considera anteprima ed
esce interamente `noindex`. Vedi la sezione qui sotto.

### Indirizzo pubblico e indicizzazione

`VITE_SITE_URL` dice al build da quale indirizzo il sito è servito: alimenta
canonical, Open Graph e sitemap. Il workflow oggi usa l'indirizzo provvisorio
Hostinger.

Finché quell'indirizzo è diverso da `DOMINIO_DEFINITIVO`
(`src/data/site.js`), il sito si considera **anteprima**: ogni pagina esce con
`noindex, nofollow` e `robots.txt` chiude tutto. Serve a evitare che
l'indirizzo temporaneo finisca nell'indice di Google e poi faccia concorrenza
al dominio vero.

Quando il dominio definitivo è attivo, basta creare la variabile
`VITE_SITE_URL` in *Settings → Secrets and variables → Actions → Variables*
con l'indirizzo reale: ha la precedenza sul valore di ripiego e **riapre
l'indicizzazione da sé**, senza toccare il codice. Se il dominio non è
`www.lunacostruzioni.it`, aggiornare anche `DOMINIO_DEFINITIVO`.

### Altri hosting

`npm run build` produce in `dist/` un sito statico con una cartella per rotta:
funziona anche su Netlify, Vercel, Cloudflare Pages o nginx, servendo `dist/`
con l'index di cartella e `404.html` come pagina di errore.

---

## Struttura delle cartelle

```
media-sources/        sorgenti fotografici e catalogo — non pubblicati
public/
  brand/              logo ufficiale estratto + filigrana (generati)
  (i font Inter stanno in src/fonts-woff2/, non qui: entrano nel bundle)
  media/              immagini pubblicate e filigranate (generate)
scripts/
  build-brand-assets.mjs   estrae il logo dal catalogo, crea la filigrana
  media.config.mjs         whitelist fotografica
  prepare-media.mjs        pipeline immagini
  scarica-font.mjs         self-hosting dei font
  rotte.mjs                elenco rotte pubbliche
  prerender.mjs            pre-rendering statico
  genera-sitemap.mjs       sitemap.xml e robots.txt
  verifica-conformita.mjs  controllo direttive Rocks Design
src/
  components/         header, footer, moduli, galleria, SEO, immagini
  data/               dati aziendali, contenuti, manifest immagini
  pages/              una pagina per rotta
  entry-server.jsx    ingresso per il pre-rendering
  main.jsx            ingresso client (idratazione)
```
