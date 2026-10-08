# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Il cliente principale è il proprietario privato di una villa o di una casa
in Sicilia che sta scegliendo una piscina per il proprio giardino. Arriva
con domande concrete: quanto costa, quali permessi servono, quanto dura il
cantiere, come apparirà la vasca nel suo terreno, chi lo seguirà dopo.

Hotel, resort e strutture ricettive sono un pubblico secondario, con una
pagina dedicata (`/hotel-e-resort`). I clienti stranieri con casa in
Sicilia leggono la versione inglese, tradotta lato client sulle pagine
principali.

## Product Purpose

Luna Costruzioni S.r.l.s. è un'impresa edile siciliana e concessionario
autorizzato Piscine Rocks Design per la Sicilia. Realizza la piscina in
Tecnologia Rocks Design® chiavi in mano (sopralluogo, scavi, realizzazione,
messa in opera e collaudo) e, come secondo mestiere, giardini e opere in
pietra anche senza piscina.

Il successo sul sito è una richiesta inviata dal modulo contatti (per un
sopralluogo o un preventivo). Telefono e WhatsApp restano disponibili come
canali di riserva.

## Positioning

È il sito del concessionario, non della casa madre. Il visitatore deve
capire in tre secondi che parla con Luna Costruzioni, un'impresa che opera
in Sicilia, con un solo referente (Luciano Naro) dal primo sopralluogo al
collaudo. Piscine Rocks Design compare come tecnologia del prodotto e come
credenziale, mai come intestazione del sito. Il brevetto e il marchio sono
di Piscine Rocks Design; Luna Costruzioni ne è concessionario autorizzato,
non l'inventrice, e il sito lo dichiara apertamente.

## Operating Context

- Copertura: tutte le nove province siciliane, con una pagina Sicilia e
  una sezione per provincia (`src/data/site.js`, `PROVINCE`).
- Il cliente confronta tipicamente con la piscina tradizionale in cemento
  armato (`/piscina-in-cemento-o-rocks-design`) e valuta costi, permessi e tempi prima di
  chiedere un sopralluogo.
- Al sopralluogo Luciano Naro porta i campioni delle tre sabbie; il
  progetto viene disegnato sulle misure vere del giardino prima della
  firma.
- Luna non ha una sede visitabile e l'indirizzo legale è un'abitazione
  privata: il sito non propone visite né showroom (decisione del
  30/09/2026).

## Capabilities and Constraints

- Vite + React con pre-rendering statico di ogni rotta, server Node per
  `dist/` e l'endpoint contatti, pubblicato da Hostinger a ogni push su
  `main`. Il comando di build in hPanel include `npm run verifica`, che fa
  fallire la pubblicazione se il sito viola le direttive Rocks Design.
- Italiano lingua pubblicata e indicizzata; inglese come cambio lato
  client sulle pagine principali.
- Direttive della casa madre, applicate nel codice (vedi README):
  - logo «Concessionario Autorizzato» nella fascia superiore di ogni
    pagina, con link alla pagina ufficiale;
  - «piscina naturale» sempre seguita da «Piscine Rocks Design»;
  - vietato pubblicare tecnica costruttiva, fasi di cantiere o impianti
    (scavi, teli, geotessili, tubazioni, locali tecnici, mezzi d'opera);
  - ogni foto porta la filigrana Piscine Rocks Design impressa nel file;
  - ogni pagina indicizzabile cita la zona di riferimento;
  - testi scritti ex novo, mai frasi del catalogo o del sito della casa
    madre;
  - taggare `@piscinerocksdesign` sui social.
- Le immagini pubblicabili sono solo quelle nella whitelist di
  `scripts/media.config.mjs`.

## Brand Commitments

- Nome: Luna Costruzioni apre ogni `<title>`, domina la testata ed è il
  soggetto dei testi; `og:site_name` è l'impresa.
- Il logo Piscine Rocks Design usato è quello ufficiale estratto dal
  catalogo, mai ricostruito.
- L'impianto della home segue il blueprint approvato dal committente.
  Il sistema visivo esistente (`src/nocturne.css`, documentato nel
  README) è l'autorità incombente.

## Evidence on Hand

- Fotografie del prodotto fornite dal produttore, filigranate
  (`public/media/`, manifest in `src/data/media.json`). Mostrano il
  prodotto Rocks Design, non lavori realizzati da Luna.
- Cinque anni di movimento terra e opere edili in Sicilia, più la
  formazione Rocks Design sulla tecnologia.
- Dati aziendali (NAP, P.IVA, contatti) in `src/data/site.js`.
- Non esistono testimonianze, recensioni o cantieri di clienti
  pubblicabili: il lavoro futuro non deve inventarli né presentare le foto
  del produttore come realizzazioni di Luna.

## Product Principles

1. Chi parla è Luna Costruzioni; Rocks Design è la tecnologia e la
   credenziale.
2. Rispondere ai dubbi reali del proprietario (costi, permessi, tempi)
   con onestà, senza promesse che dipendono dal Comune o dal terreno.
3. Le fotografie della piscina sono ciò che vende: tutto il resto le
   serve.
4. Le direttive della casa madre non si aggirano: sono vincoli, non
   suggerimenti.
