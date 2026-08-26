# Luna Costruzioni srl — sito web

Sito ufficiale di **Luna Costruzioni srl**: impresa edile e concessionario
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
| `npm run fonts` | Scarica e self-hosta Marcellus e Inter |
| `npm run assets` | `brand` + `media` + `fonts` |
| `npm run lint` | Oxlint |

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

Tema scuro, definito una volta in `tailwind.config.js` e usato ovunque:

| Token | Valore | Uso |
| --- | --- | --- |
| `notte` | `#161826` | fondo pagina |
| `notte-800` | `#292b31` | piè di pagina |
| `superficie` | `#232532` | schede, fasce alternate, campi |
| `testo` | `#e9e9ed` | testo principale |
| `neutro-300…600` | rampa | testi secondari |
| `accento` | `#9184d9` | occhielli, bordi, chiamate all'azione |

I bordi usano `testo/[0.16]`, la stessa trasparenza del blueprint. Tipografia
**Inter** (300–700), self-hostata in `public/fonts`. Le classi di componente
— `.bottone-*`, `.scheda`, `.campo`, `.occhiello`, `.titolo-sezione` — stanno
in `src/index.css`.

> L'accento `#9184d9` arriva dal blueprint. È l'unico token da cambiare se in
> futuro si vuole virare sul turchese dell'acqua: si tocca `accento` in
> `tailwind.config.js` e il resto segue.

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

Variabili d'ambiente (file `.env`, vedi `.env.example`):

| Variabile | Effetto se assente |
| --- | --- |
| `VITE_ENDPOINT_LEAD` | Il modulo contatti apre il client di posta con i dati compilati: nessun contatto va perso |
| `VITE_GA4_ID` | Nessuno script di misurazione viene caricato |

Gli script di misurazione partono **solo dopo il consenso** espresso nel banner
(`src/components/BannerCookie.jsx`): finché l'utente non accetta, il sito non
carica nulla di profilante.

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
main (sorgente)  ──push──▶  GitHub Actions  ──▶  ramo deploy (sito compilato)  ──▶  Hostinger
```

L'hosting è collegato a GitHub ma **copia i file così come sono: non esegue
`npm run build`**. Per questo il ramo `deploy` contiene il sito già compilato,
mentre `main` resta il codice sorgente. Il workflow
`.github/workflows/pubblica.yml` fa tutto a ogni push su `main`.

Prima di pubblicare il workflow esegue lint, build, `npm run verifica` e un
controllo che il risultato contenga davvero `index.html`, `404.html`,
`.htaccess`, `sitemap.xml` e le immagini. **Se la verifica di conformità
fallisce non si pubblica nulla.**

### Configurazione su Hostinger

hPanel → Avanzate → Git: repository del progetto, ramo **`deploy`**, cartella
`public_html`, deploy automatico attivo.

`public/.htaccess` accompagna il sito: 404 personalizzato, compressione, cache
lunga sugli asset con hash e riconvalida sull'HTML. **Non** configurare un
fallback SPA verso `index.html`: annullerebbe il pre-rendering, restituendo la
home per ogni indirizzo.

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
  fonts/              Marcellus e Inter self-hostati (generati)
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
