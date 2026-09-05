import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import Galleria from '../components/Galleria'
import Rivela from '../components/Rivela'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'

/*
 * La piscina espositiva è quella di Piscine Rocks Design, in Lombardia: NON è
 * di Luna, e Luna non ha una sede visitabile — l'indirizzo legale è
 * l'abitazione del titolare.
 *
 * Prima questa pagina diceva «la nostra piscina espositiva» e «vieni a
 * trovarci presso la nostra sede», mandando di fatto i clienti a casa di
 * Luciano a vedere una piscina che lì non c'è.
 *
 * La direttiva marketing della casa madre resta rispettata — l'invito a
 * vedere la piscina espositiva c'è — ma con il soggetto giusto, e dicendo
 * subito dove si trova. La distanza va dichiarata in apertura: scoprirla in
 * fondo, dopo essersi convinti, è il modo migliore per perdere il cliente.
 */

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/showroom', label: 'Piscina espositiva' },
]

const MOTIVI = [
    ['Cammini sulla sabbia', 'Tocchi le tre selezioni — Bianco, Giallo, Ticino — e capisci quale colore d’acqua ti restituiranno.'],
    ['Vedi i monoliti veri', 'Dimensioni, venature e peso delle rocce: in fotografia si perdono, dal vivo no.'],
    ['Senti l’acqua', 'Cascate e idromassaggio in funzione: il suono è parte del progetto quanto la forma.'],
    ['Vieni con chi costruirà', 'Non ti mandiamo da solo: ti accompagna Luciano Naro, lo stesso referente che seguirà il tuo cantiere.'],
]

export default function Showroom() {
    return (
        <>
            <Seo
                titolo={`Vedere una Piscina Rocks Design dal vivo | ${AZIENDA.nomeBreve}, Sicilia`}
                descrizione="La piscina espositiva Piscine Rocks Design è visitabile su appuntamento: sabbie naturali, monoliti e acqua in funzione. Luna Costruzioni organizza e accompagna la visita dalla Sicilia."
                percorso="/showroom"
                immagine="villa-con-spiaggia-in-ghiaia-1280.jpg"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">La piscina espositiva {ROCKS_DESIGN.nome}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Una Piscina Rocks Design va vista, non guardata
                        </h1>
                        <p className="testo-lungo mt-6">
                            La piscina espositiva è quella di {ROCKS_DESIGN.nome}, in Lombardia: una vasca completa e in
                            funzione, con sabbia, rocce monolitiche, cascate e illuminazione. Dalla {AZIENDA.zona} è un
                            viaggio, e preferiamo dirtelo subito invece di lasciartelo scoprire alla fine.
                        </p>
                        <p className="testo-lungo mt-4">
                            Se decidi di andarci, la visita la organizziamo noi e ti accompagna {AZIENDA.referente}: si
                            fissa un appuntamento, si guarda con calma, e le domande le fai a chi poi ti costruirà la
                            piscina.
                        </p>
                        <p className="testo-lungo mt-4">
                            Non sei convinto di partire? Sensato. Comincia da una chiamata o da un sopralluogo in
                            giardino: quello lo facciamo in {AZIENDA.zona}, è gratuito, e spesso basta a capire se ha
                            senso proseguire.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-primario">
                                Chiama {AZIENDA.telefono}
                            </a>
                            <a
                                href={`https://wa.me/${AZIENDA.whatsapp}`}
                                target="_blank"
                                rel="noopener"
                                className="bottone-secondario"
                            >
                                Scrivi su WhatsApp
                            </a>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="villa-con-spiaggia-in-ghiaia"
                            ratio="4 / 3"
                            className="rounded-lg shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello="Perché vale il viaggio"
                    titolo="Quattro cose che una foto non racconta"
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {MOTIVI.map(([t, d], i) => (
                        <Rivela as="li" key={t} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{t}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-neutro-400">{d}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello="Uno sguardo"
                    titolo="Che cosa si vede"
                    testo={`Fotografie ${ROCKS_DESIGN.nome} di piscine ultimate e in funzione.`}
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        slugs={[
                            'villa-con-spiaggia-in-ghiaia',
                            'oasi-con-pontile',
                            'illuminazione-calda-sui-monoliti',
                            'solarium-in-legno',
                            'bordo-in-legno-e-ciottoli',
                            'spiaggia-di-sabbia-privata',
                        ]}
                    />
                </Rivela>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <div className="mx-auto max-w-2xl">
                    <ModuloContatto titolo="Parliamone" compatto />
                </div>
            </Sezione>
        </>
    )
}
