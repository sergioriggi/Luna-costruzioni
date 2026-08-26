import { Link } from 'react-router-dom'
import Seo, { schemaBriciole } from '../components/Seo'
import Immagine from '../components/Immagine'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import { Sezione, IntestazioneSezione, Briciole, Cta } from '../components/Sezione'
import { MODELLI } from '../data/content'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/modelli', label: 'Modelli' },
]

const COPERTINE = {
    caraibi: 'oasi-con-pontile-e-palme',
    mediterranea: 'villa-con-spiaggia-in-ghiaia',
    alpi: 'ghiaietto-e-acqua-smeraldo',
}

export default function Modelli() {
    return (
        <>
            <Seo
                titolo="Modelli Piscine Rocks Design: Caraibi, Mediterranea, Alpi | Luna Costruzioni Sicilia"
                descrizione="Tre modelli di Piscine Rocks Design: Caraibi con sabbia bianca e palme, Mediterranea con ulivi e lavanda, Alpi con pietra e ghiaietto. Realizzati in Sicilia da Luna Costruzioni srl, concessionario autorizzato."
                percorso="/modelli"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">I modelli</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        Tre punti di partenza, infinite varianti
                    </h1>
                    <p className="testo-lungo mt-6">
                        Caraibi, Mediterranea e Alpi non sono misure da catalogo: sono atmosfere. Definiscono la
                        selezione delle rocce, il colore della sabbia e le essenze vegetali. Da lì il progetto prende
                        la forma del tuo giardino, perché nessuna Piscina Rocks Design è uguale a un’altra.
                    </p>
                </Rivela>
            </Sezione>

            {MODELLI.map((m, i) => (
                <Sezione key={m.slug} id={m.slug} sfondo={i % 2 ? 'bg-sabbia-100' : ''}>
                    <Rivela className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? 'lg:[&>figure]:order-2' : ''}`}>
                        <Immagine
                            slug={COPERTINE[m.slug]}
                            ratio="4 / 3"
                            className="rounded-2xl shadow-morbida"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                            priority={i === 0}
                        />
                        <div>
                            <p className="occhiello">{m.claim}</p>
                            <h2 className="mt-3 font-display text-3xl sm:text-4xl">{m.nome}</h2>
                            <p className="testo-lungo mt-5">{m.testo}</p>
                            <p className="mt-5 rounded-xl bg-acqua-50 px-5 py-4 text-[0.95rem] text-acqua-900">
                                <strong className="font-semibold">Quando sceglierlo:</strong> {m.adatto}
                            </p>
                            <Link to="/contatti" className="bottone-secondario mt-7">
                                Chiedi un progetto {m.nome.replace('Modello ', '')}
                            </Link>
                        </div>
                    </Rivela>
                </Sezione>
            ))}

            <Sezione>
                <IntestazioneSezione
                    occhiello="Le sabbie"
                    titolo="Bianco, Giallo, Ticino"
                    testo="La sabbia decide il colore dell’acqua e la temperatura della spiaggia. Ne selezioniamo tre: le vedi e le tocchi durante il sopralluogo o in visita alla piscina espositiva."
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        colonne="md:grid-cols-2"
                        slugs={['sabbie-naturali-campioni', 'sabbie-naturali-granulometria']}
                    />
                </Rivela>
            </Sezione>

            <Cta
                titolo="Quale modello si adatta al tuo giardino?"
                testo="Dopo il sopralluogo ti proponiamo il modello più coerente con l’esposizione, la vegetazione e lo stile della tua casa."
                primaria={{ to: '/contatti', label: 'Richiedi il sopralluogo' }}
                secondaria={{ to: '/galleria', label: 'Sfoglia la galleria' }}
            />
        </>
    )
}
