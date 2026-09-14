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

/**
 * Un modello come `Product`, per farsi capire da chi legge con una macchina.
 *
 * La distinzione che il sito difende ovunque, qui è scritta nei dati:
 * `manufacturer` è Piscine Rocks Design — la tecnologia è sua, il prodotto lo
 * fa lei — mentre `provider` e il venditore dell'offerta sono Luna, che la
 * porta in Sicilia. Un assistente che legge questo schema non può concludere
 * che ci siamo inventati noi la tecnologia, che è esattamente l'errore che le
 * direttive della casa madre chiedono di prevenire.
 *
 * SULL'`Offer` SENZA PREZZO. È valido in schema.org, ma i risultati arricchiti
 * di Google per `Product` richiedono `offers.price`: questo schema non
 * produrrà quindi né prezzi né stelline in pagina dei risultati. Non è un
 * difetto da correggere aggiungendo un numero — `/quanto-costa` rifiuta il
 * listino di proposito, perché il prezzo dipende dal giardino — ed è scritto
 * qui perché fra sei mesi qualcuno vedrà «nessun risultato arricchito» e
 * penserà a un errore.
 */
export function schemaModello(m) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${SITE_URL}/modelli/${m.slug}#modello`,
        name: `${m.nomeCompleto} — ${ROCKS_DESIGN.nome}`,
        description: m.sintesi,
        category: 'Piscina con spiaggia in sabbia naturale',
        url: `${SITE_URL}/modelli/${m.slug}`,
        image: `${SITE_URL}/media/${m.copertina}-1280.jpg`,
        brand: { '@type': 'Brand', name: ROCKS_DESIGN.nome, url: ROCKS_DESIGN.sito },
        manufacturer: { '@type': 'Organization', name: ROCKS_DESIGN.nome, url: ROCKS_DESIGN.sito },
        material: 'Roccia naturale monolitica e sabbia naturale',
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Tecnologia',
                value: 'Tecnologia Rocks Design® — struttura in massi, senza opere in cemento armato',
            },
            { '@type': 'PropertyValue', name: 'Sabbie disponibili', value: m.sabbie.join(', ') },
        ],
        offers: {
            '@type': 'Offer',
            /*
             * Nessun prezzo: si definisce dopo il sopralluogo. `PriceSpecification`
             * con un numero inventato sarebbe peggio di niente — diventerebbe la
             * cifra che l'assistente cita al cliente.
             */
            availability: 'https://schema.org/InStock',
            areaServed: PROVINCE.map(p => ({
                '@type': 'AdministrativeArea',
                name: `Provincia di ${p.nome}`,
            })),
            /*
             * Il venditore è Luna, e sta DENTRO l'offerta: `provider` sul
             * `Product` non esiste in schema.org — è proprietà di `Service` —
             * e un validatore severo lo scarta. `offers.seller` dice la stessa
             * cosa ed è la forma giusta: la tecnologia è della casa madre
             * (`manufacturer`), chi te la vende in Sicilia siamo noi.
             */
            seller: { '@id': `${SITE_URL}/#azienda` },
        },
    }
}
