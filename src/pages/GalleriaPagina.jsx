import Seo, { schemaBriciole } from '../components/Seo'
import Galleria from '../components/Galleria'
import Rivela from '../components/Rivela'
import { Sezione, Briciole, Cta } from '../components/Sezione'
import { ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/galleria', label: 'Galleria', labelEn: 'Gallery' },
]

export default function GalleriaPagina() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Foto di Piscine Rocks Design | Luna Costruzioni, Sicilia"
                descrizione="Foto del produttore Piscine Rocks Design: massi, spiagge in sabbia, cascate, idromassaggio, luci notturne. Il prodotto che costruiamo per la Sicilia."
                percorso="/galleria"
                schema={schemaBriciole(BRICIOLE)}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">{t('Galleria', 'Gallery')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        {t('Piscine Rocks Design, una per una', 'Piscine Rocks Design pools, one by one')}
                    </h1>
                    <p className="testo-lungo mt-6">
                        {t(
                            'Le foto mostrano più Piscine Rocks Design, alcune da più angolazioni. Usa i filtri per modello o per dettaglio.',
                            'The photos show several Piscine Rocks Design pools, some from more than one angle. Filter by model or by detail.',
                        )}
                    </p>
                    <p className="testo-lungo mt-4">
                        {t(
                            `Sono piscine espositive della casa madre, in Lombardia, fotografate da ${ROCKS_DESIGN.nome} e usate su licenza: è il prodotto che costruiamo. In Sicilia non ne abbiamo ancora consegnata una, e la tua sarà disegnata sul tuo giardino.`,
                            `They are the manufacturer's display pools in Lombardy, photographed by ${ROCKS_DESIGN.nome} and used under licence: this is the product we build. We have not yet handed one over in Sicily, and yours will be designed around your garden.`,
                        )}
                    </p>
                </Rivela>

                <Rivela className="mt-12">
                    <Galleria />
                </Rivela>

                <p className="mt-10 text-sm text-neutro-500">
                    {t(
                        `Le immagini riportano il marchio ${ROCKS_DESIGN.nome}. Condividendole sui social, tagga `,
                        `The images carry the ${ROCKS_DESIGN.nome} mark. If you share them on social media, tag `,
                    )}
                    <span className="font-semibold text-neutro-300">{ROCKS_DESIGN.tag}</span>.
                </p>
            </Sezione>

            <Cta
                titolo={t('Ti immagini la tua, qui dentro?', 'Can you picture yours among them?')}
                testo={t(
                    'Raccontaci il tuo giardino: dal sopralluogo nasce un progetto disegnato su quel terreno.',
                    'Tell us about your garden: the site visit is where a design for that plot begins.',
                )}
                secondaria={{ to: '/quanto-costa', label: t('Quanto costa', 'What it costs') }}
                whatsapp
            />
        </>
    )
}
