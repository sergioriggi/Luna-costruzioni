import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import Galleria from '../components/Galleria'
import Rivela from '../components/Rivela'
import ModuloContatto from '../components/ModuloContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { AZIENDA } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/showroom', label: 'Showroom' },
]

const MOTIVI = [
    ['Cammini sulla sabbia', 'Tocchi le tre selezioni — Bianco, Giallo, Ticino — e capisci quale colore d’acqua ti restituiranno.'],
    ['Vedi i monoliti veri', 'Dimensioni, venature e peso delle rocce: in fotografia si perdono, dal vivo no.'],
    ['Senti l’acqua', 'Cascate e idromassaggio in funzione: il suono è parte del progetto quanto la forma.'],
    ['Parli con chi costruisce', 'Nessun intermediario: trovi Luciano Naro, il referente che seguirà anche il tuo cantiere.'],
]

export default function Showroom() {
    return (
        <>
            <Seo
                titolo="Showroom: vieni a trovarci presso la nostra sede | Luna Costruzioni, Sicilia"
                descrizione="Visita la piscina espositiva Rocks Design di Luna Costruzioni srl in Sicilia. Tocca le sabbie naturali, vedi i monoliti e l'acqua in funzione. Visite su appuntamento."
                percorso="/showroom"
                immagine="https://www.lunacostruzioni.it/media/villa-con-spiaggia-in-ghiaia-1280.jpg"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">La nostra piscina espositiva</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Vieni a trovarci presso la nostra sede
                        </h1>
                        <p className="testo-lungo mt-6">
                            Una Piscina Rocks Design va vista, non solo guardata. Nella nostra sede in {AZIENDA.zona}{' '}
                            trovi una vasca completa e funzionante: sabbia, rocce monolitiche, cascate e illuminazione.
                            È il modo più rapido per capire la differenza rispetto a una piscina tradizionale.
                        </p>
                        <p className="testo-lungo mt-4">
                            Le visite sono su appuntamento, così da dedicarti tutto il tempo necessario. Chiama{' '}
                            <a className="link-sottile font-medium text-pietra-900" href={`tel:${AZIENDA.telefonoRaw}`}>
                                {AZIENDA.telefono}
                            </a>{' '}
                            o compila il modulo qui sotto.
                        </p>
                        <a href={`tel:${AZIENDA.telefonoRaw}`} className="bottone-primario mt-8">
                            Prenota la visita
                        </a>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug="villa-con-spiaggia-in-ghiaia"
                            ratio="4 / 3"
                            className="rounded-2xl shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                            priority
                        />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-sabbia-100">
                <IntestazioneSezione
                    occhiello="Perché venire di persona"
                    titolo="Quattro cose che una foto non racconta"
                />
                <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                    {MOTIVI.map(([t, d], i) => (
                        <Rivela as="li" key={t} delay={i * 80} className="scheda">
                            <h2 className="text-lg">{t}</h2>
                            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pietra-600">{d}</p>
                        </Rivela>
                    ))}
                </ul>
            </Sezione>

            <Sezione>
                <IntestazioneSezione occhiello="Uno sguardo" titolo="La piscina espositiva" />
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

            <Sezione sfondo="bg-sabbia-100">
                <div className="mx-auto max-w-2xl">
                    <ModuloContatto titolo="Prenota la tua visita" compatto />
                </div>
            </Sezione>
        </>
    )
}
