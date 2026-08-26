import { SITE_URL, INDIRIZZO_DICHIARATO, ANTEPRIMA, AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'

const OG_IMAGE = `${SITE_URL}/media/oasi-aerea-sabbia-bianca-1280.jpg`

/**
 * React 19 solleva automaticamente <title>, <meta> e <link> nel <head>,
 * quindi ogni pagina può dichiarare qui i propri metadati.
 */
export default function Seo({ titolo, descrizione, percorso, immagine = OG_IMAGE, noindex = false, schema }) {
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
            <meta property="og:image" content={immagine} />
            <meta property="og:image:alt" content="Piscina realizzata in Tecnologia Rocks Design" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={titolo} />
            <meta name="twitter:description" content={descrizione} />
            <meta name="twitter:image" content={immagine} />

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
        image: OG_IMAGE,
        logo: `${SITE_URL}/brand/rocks-design-logo.png`,
        address: {
            '@type': 'PostalAddress',
            addressRegion: 'Sicilia',
            addressCountry: 'IT',
        },
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
        sameAs: [ROCKS_DESIGN.sito, ROCKS_DESIGN.instagram],
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
