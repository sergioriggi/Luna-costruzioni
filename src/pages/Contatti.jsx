import Seo, { schemaAzienda, schemaBriciole } from '../components/Seo'
import ModuloContatto from '../components/ModuloContatto'
import Rivela from '../components/Rivela'
import Immagine from '../components/Immagine'
import { Sezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/contatti', label: 'Contatti' },
]

export default function Contatti() {
    return (
        <>
            <Seo
                titolo="Contatti: sopralluogo e preventivo gratuiti | Luna Costruzioni, Sicilia"
                descrizione="Contatta Luna Costruzioni srl, concessionario autorizzato Piscine Rocks Design per la Sicilia. Referente Luciano Naro, +39 340 490 0710. Sopralluogo e preventivo gratuiti."
                percorso="/contatti"
                schema={[schemaAzienda(), schemaBriciole(BRICIOLE)]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
                    <Rivela>
                        <p className="occhiello">Contatti</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                            Parliamo del tuo giardino
                        </h1>
                        <p className="testo-lungo mt-6">
                            Sopralluogo e preventivo sono gratuiti e senza impegno, in tutta la {AZIENDA.zona}.
                            Ti richiamiamo entro 24 ore lavorative.
                        </p>

                        <dl className="mt-10 space-y-5 text-[1.0625rem]">
                            <div>
                                <dt className="text-sm text-pietra-500">Azienda</dt>
                                <dd className="font-medium text-pietra-900">{AZIENDA.nome}</dd>
                                <dd className="text-sm text-pietra-600">{AZIENDA.ruolo}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-pietra-500">Referente</dt>
                                <dd className="font-medium text-pietra-900">{AZIENDA.referente}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-pietra-500">Telefono e WhatsApp</dt>
                                <dd>
                                    <a className="link-sottile font-medium text-pietra-900" href={`tel:${AZIENDA.telefonoRaw}`}>
                                        {AZIENDA.telefono}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-pietra-500">E-mail</dt>
                                <dd>
                                    <a className="link-sottile font-medium text-pietra-900" href={`mailto:${AZIENDA.email}`}>
                                        {AZIENDA.email}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-pietra-500">Zona servita</dt>
                                <dd className="text-pietra-800">
                                    {PROVINCE.map(p => p.nome).join(' · ')}
                                </dd>
                            </div>
                        </dl>

                        <p className="mt-10 rounded-xl border border-pietra-200 bg-white/70 px-5 py-4 text-sm leading-relaxed text-pietra-600">
                            Il marchio e la tecnologia sono di {ROCKS_DESIGN.nome}.{' '}
                            <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="link-sottile font-medium text-pietra-800">
                                Visita il sito ufficiale
                            </a>.
                        </p>

                        <Immagine
                            slug="riflessi-al-tramonto"
                            ratio="16 / 9"
                            className="mt-10 rounded-2xl shadow-morbida"
                            sizes="(min-width: 1024px) 42vw, 92vw"
                        />
                    </Rivela>

                    <Rivela delay={110}>
                        <ModuloContatto />
                    </Rivela>
                </div>
            </Sezione>
        </>
    )
}
