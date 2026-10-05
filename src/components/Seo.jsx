import { SITE_URL, INDIRIZZO_DICHIARATO, ANTEPRIMA, AZIENDA, ROCKS_DESIGN, PROVINCE, SOCIAL } from '../data/site'

/** Immagine di condivisione predefinita: solo il nome del file. */
const OG_IMAGE = 'oasi-aerea-sabbia-bianca-1280.jpg'

/**
 * Costruisce l'URL assoluto di un'immagine di condivisione.
 *
 * Le pagine passano il solo nome del file. Otto di loro incollavano l'URL
 * completo con il dominio definitivo scritto a mano — un dominio che non
 * risponde: su qualunque altro host, cioè oggi, quelle immagini davano 404 e
 * le anteprime social e su Meta uscivano senza immagine. Passando dal nome del
 * file, l'indirizzo lo decide `SITE_URL` e segue l'host che serve davvero.
 *
 * Un URL assoluto passato di proposito resta onorato: serve per immagini
 * ospitate altrove.
 */
export function risolviImmagine(immagine) {
    if (!immagine) return `${SITE_URL}/media/${OG_IMAGE}`
    if (/^https?:\/\//i.test(immagine)) return immagine
    if (immagine.startsWith('/')) return `${SITE_URL}${immagine}`
    return `${SITE_URL}/media/${immagine}`
}

/**
 * React 19 solleva automaticamente <title>, <meta> e <link> nel <head>,
 * quindi ogni pagina può dichiarare qui i propri metadati.
 */
export default function Seo({ titolo, descrizione, percorso, immagine, noindex = false, schema }) {
    const immagineAssoluta = risolviImmagine(immagine)
    const url = percorso === '/' ? `${SITE_URL}/` : `${SITE_URL}${percorso}`
    const blocchi = Array.isArray(schema) ? schema : schema ? [schema] : []

    return (
        <>
            <title>{titolo}</title>
            <meta name="description" content={descrizione} />
            {/*
              Il canonical si dichiara solo se sappiamo da quale indirizzo il
              sito è servito. Senza VITE_SITE_URL punteremmo al dominio
              definitivo da un indirizzo che non è quello: un canonical
              sbagliato manda i motori su una pagina diversa da quella che
              stanno leggendo, ed è peggio di nessun canonical.
            */}
            {INDIRIZZO_DICHIARATO && <link rel="canonical" href={url} />}
            {(noindex || ANTEPRIMA) && (
                <meta name="robots" content={ANTEPRIMA ? 'noindex, nofollow' : 'noindex, follow'} />
            )}

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={`${AZIENDA.nome} — ${AZIENDA.attivita}`} />
            <meta property="og:locale" content="it_IT" />
            <meta property="og:title" content={titolo} />
            <meta property="og:description" content={descrizione} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={immagineAssoluta} />
            <meta property="og:image:alt" content="Piscina realizzata in Tecnologia Rocks Design" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={titolo} />
            <meta name="twitter:description" content={descrizione} />
            <meta name="twitter:image" content={immagineAssoluta} />

            {blocchi.map((blocco, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blocco).replace(/</g, '\\u003c') }}
                />
            ))}
        </>
    )
}

/** Scheda attività locale: alimenta i risultati «vicino a me» su Google. */
export function schemaAzienda() {
    return {
        '@context': 'https://schema.org',
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${SITE_URL}/#azienda`,
        name: AZIENDA.nome,
        description: `Impresa siciliana specializzata in piscine con spiaggia in sabbia e opere in pietra. ${AZIENDA.ruolo} per la ${AZIENDA.zona}.`,
        url: SITE_URL,
        telephone: AZIENDA.telefonoRaw,
        email: AZIENDA.email,
        image: risolviImmagine(OG_IMAGE),
        /*
         * `sameAs` in schema.org AFFERMA IDENTITÀ: dice «questa entità è anche
         * quel profilo». Puntandolo al sito e all'Instagram della casa madre —
         * com'era fino a settembre 2026 — il markup dichiarava a Google che
         * Luna Costruzioni *è* Piscine Rocks Design: una dichiarazione falsa
         * scritta in dati strutturati, non una sfumatura di comunicazione.
         *
         * Ora che Luna ha un profilo proprio il campo torna, con i valori di
         * Luna e nient'altro: `SOCIAL` contiene solo ciò che le appartiene.
         *
         * `logo` invece resta fuori, ed è la stessa ragione di prima: l'unico
         * logo nel progetto è quello di Piscine Rocks Design, e dichiararlo
         * come logo di Luna sarebbe di nuovo un'identità sbagliata. Rientra il
         * giorno che esiste un marchio di Luna, non prima.
         *
         * La relazione vera — Luna realizza un prodotto altrui su licenza —
         * resta espressa da `brand`, qui sotto, che è il campo giusto.
         */
        sameAs: SOCIAL.map(profilo => profilo.url),

        /*
         * Manca DI PROPOSITO anche `streetAddress`: Via Speranza 42 è
         * l'abitazione privata del titolare, non una sede visitabile. In un
         * HomeAndConstructionBusiness quel campo è proprio ciò che alimenta le
         * schede luogo e spinge Google a proporre indicazioni stradali e orari
         * di apertura: mandare un cliente al citofono di casa sarebbe un
         * errore, non una sfumatura SEO.
         *
         * Restano comune, CAP, provincia e nazione: danno il segnale
         * territoriale che serve al posizionamento locale senza indicare una
         * porta a cui presentarsi. Restano anche `vatID`, `taxID` e
         * `foundingDate`: identificano l'impresa, non un luogo dove andare.
         *
         * La via resta invece nelle note legali del piè di pagina, dove
         * l'art. 2250 c.c. la impone: quello è un obbligo di trasparenza
         * verso chi contratta, non un invito a passare.
         */
        address: {
            '@type': 'PostalAddress',
            addressLocality: AZIENDA.sede.comune,
            postalCode: AZIENDA.sede.cap,
            addressRegion: AZIENDA.sede.siglaProvincia,
            addressCountry: 'IT',
        },
        vatID: AZIENDA.piva,
        taxID: AZIENDA.piva,
        foundingDate: AZIENDA.fondazione,
        areaServed: PROVINCE.map(p => ({
            '@type': 'AdministrativeArea',
            name: `Provincia di ${p.nome}`,
        })),
        brand: { '@type': 'Brand', name: ROCKS_DESIGN.nome, url: ROCKS_DESIGN.sito },
        knowsAbout: [
            'Piscine Rocks Design',
            'Tecnologia Rocks Design',
            'piscine con spiaggia in sabbia',
            'piscine effetto spiaggia',
            'piscine di sabbia',
            'cascate da giardino in roccia naturale',
        ],
    }
}

export function schemaBriciole(voci) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: voci.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: v.label,
            item: v.to === '/' ? `${SITE_URL}/` : `${SITE_URL}${v.to}`,
        })),
    }
}

export function schemaFaq(voci) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: voci.map(v => ({
            '@type': 'Question',
            name: v.domanda,
            acceptedAnswer: { '@type': 'Answer', text: v.risposta },
        })),
    }
}

export function schemaServizio({ nome, descrizione, area }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Realizzazione piscine in Tecnologia Rocks Design',
        name: nome,
        description: descrizione,
        provider: { '@id': `${SITE_URL}/#azienda` },
        areaServed: { '@type': 'AdministrativeArea', name: area },
        brand: { '@type': 'Brand', name: ROCKS_DESIGN.nome, url: ROCKS_DESIGN.sito },
    }
}

/*
 * ── PERCHÉ NON C'È UN `Product` SULLE PAGINE DEI MODELLI ────────────────
 *
 * Qui c'era `schemaModello()`, che emetteva un `Product`. È stata rimossa il
 * 4 ottobre 2026, dopo due tentativi sbagliati che vale la pena non ripetere.
 *
 * 1. Prima il `Product` aveva un `offers` senza prezzo. Search Console ha
 *    aperto due segnalazioni con gravità ERROR — «Snippet prodotto» e «Schede
 *    commercianti» — con lo stesso messaggio: «è necessario specificare
 *    `price` o `priceSpecification`». Dichiarare un'offerta obbliga a
 *    dichiarare un prezzo.
 * 2. Allora `offers` è stato tolto. Ma Google, per uno snippet prodotto,
 *    pretende almeno uno fra `offers`, `review` e `aggregateRating`, e non
 *    abbiamo nessuno dei tre: `RECENSIONI` in `src/data/content.js` è vuoto di
 *    proposito, perché ci vanno solo recensioni vere.
 *
 * ── LA PREMESSA È CAMBIATA IL 5 OTTOBRE 2026, E LA CONCLUSIONE NO ───────
 * Quando ho scritto queste righe il sito non dichiarava alcun prezzo, e il
 * motivo del `Product` assente era che un prezzo non c'era. Adesso c'è:
 * `PREZZO` in `src/data/site.js`, 1.250 € al m² + IVA, pubblicato su
 * /quanto-costa.
 *
 * Il `Product` resta comunque fuori, per una ragione diversa e più solida: è
 * un **minimo al metro quadro**, e per lo snippet prodotto Google vuole un
 * prezzo ASSOLUTO del bene. Un `UnitPriceSpecification` con `minPrice` 1250
 * per `MTK` sarebbe veritiero in schema.org e insufficiente per Google: la
 * segnalazione appena chiusa si riaprirebbe, con un messaggio diverso.
 *
 * Chi legge questo file fra sei mesi non trovi quindi una ragione scaduta: il
 * prezzo esiste, e non basta. Se un giorno interessa davvero il risultato
 * arricchito, la strada è `review`/`aggregateRating` con recensioni reali.
 *
 * Dove è finita l'attribuzione della tecnologia, che era il senso di quello
 * schema: nel nodo `Service` della stessa pagina. `schemaServizio` qui sopra
 * porta già `brand` su Piscine Rocks Design e `provider` su Luna, e
 * `src/pages/Modello.jsx` gli passa una `description` che dice a parole chi ha
 * inventato la tecnologia e chi la realizza in Sicilia. `Service` non ammette
 * `material` né `additionalProperty` — verificato sul vocabolario schema.org,
 * non a memoria — quindi la tecnologia sta nel testo e in `serviceType`.
 *
 * Se serve un giorno un risultato arricchito su queste pagine, la strada è
 * `review`/`aggregateRating` con recensioni reali, non un `Product` muto e
 * non un prezzo inventato.
 */
