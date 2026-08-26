import Seo, { schemaBriciole } from '../components/Seo'
import Galleria from '../components/Galleria'
import Rivela from '../components/Rivela'
import { Sezione, Briciole, Cta } from '../components/Sezione'
import { ROCKS_DESIGN } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/galleria', label: 'Galleria' },
]

export default function GalleriaPagina() {
    return (
        <>
            <Seo
                titolo="Le nostre realizzazioni in Sicilia | Luna Costruzioni"
                descrizione="Fotografie di Piscine Rocks Design: monoliti, sabbie naturali, cascate, aree idromassaggio e illuminazione notturna. Realizzazioni in Tecnologia Rocks Design®."
                percorso="/galleria"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">Galleria</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        Piscine Rocks Design, una per una
                    </h1>
                    <p className="testo-lungo mt-6">
                        Ogni immagine mostra una vasca diversa: forma, rocce e sabbia cambiano ogni volta. Usa i filtri
                        per modello o per dettaglio. Tutte le fotografie sono di piscine realizzate in Tecnologia
                        Rocks Design®.
                    </p>
                </Rivela>

                <Rivela className="mt-12">
                    <Galleria />
                </Rivela>

                <p className="mt-10 text-sm text-neutro-500">
                    Le immagini riportano il marchio {ROCKS_DESIGN.nome}. Condividendole sui social, taggaci con{' '}
                    <span className="font-semibold text-neutro-300">{ROCKS_DESIGN.tag}</span>.
                </p>
            </Sezione>

            <Cta
                titolo="Ti immagini la tua, qui dentro?"
                testo="Raccontaci il tuo giardino: dal sopralluogo nasce un progetto che non somiglia a nessun altro."
                primaria={{ to: '/contatti', label: 'Richiedi un preventivo' }}
                secondaria={{ to: '/showroom', label: 'Visita lo showroom' }}
            />
        </>
    )
}
