import Seo, { schemaAzienda, schemaBriciole } from '../components/Seo'
import ModuloContatto from '../components/ModuloContatto'
import Rivela from '../components/Rivela'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import { Sezione, Briciole } from '../components/Sezione'
import { AZIENDA, ROCKS_DESIGN, PROVINCE } from '../data/site'
import BottoneTelefono from '../components/BottoneTelefono'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/contatti', label: 'Contatti' },
]

export default function Contatti() {
    const { t } = useLingua()
    return (
        <>
            <Seo
                titolo="Contatti: Luciano Naro, +39 340 490 0710 | Luna Costruzioni"
                descrizione="Sopralluogo e preventivo gratuiti in tutta la Sicilia. Telefono, WhatsApp o modulo: risponde Luciano Naro, non un centralino, entro 24 ore lavorative."
                percorso="/contatti"
                schema={[schemaAzienda(), schemaBriciole(BRICIOLE)]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                {/*
                  Tre blocchi in griglia: presentazione, modulo, recapiti. Su
                  telefono il modulo viene subito dopo la presentazione: prima
                  stava sotto recapiti, nota sul marchio e una foto, a circa
                  1.270 px dall'inizio della pagina.
                */}
                <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
                    <Rivela className="lg:col-start-1">
                        <p className="occhiello">{t('Contatti', 'Contact')}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">
                            {t('Parliamo del tuo giardino', 'Let’s talk about your garden')}
                        </h1>
                        <p className="testo-lungo mt-6">
                            {t(
                                'Modulo, telefono o WhatsApp: dall’altra parte c’è sempre la stessa persona, non un centralino. Dicci in che comune si trova il terreno e che cosa hai in mente.',
                                'Form, phone or WhatsApp: the same person answers every time, not a call centre. Tell us which town the land is in and what you have in mind.',
                            )}
                        </p>
                    </Rivela>

                    {/* Il riquadro di contatto, come in fondo alle altre pagine. */}
                    <Rivela delay={110} data-cta-finale="" className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
                        <ModuloContatto />
                        <p className="mt-4 text-sm text-neutro-400">
                            {t(`${AZIENDA.referente} ti richiama entro 24 ore lavorative.`, `${AZIENDA.referente} will call you back within 24 working hours.`)}
                        </p>
                    </Rivela>

                    <Rivela className="lg:col-start-1">
                        <dl className="space-y-5 text-[1.0625rem]">
                            <div>
                                <dt className="text-sm text-neutro-500">{t('Azienda', 'Company')}</dt>
                                <dd className="font-medium text-testo">{AZIENDA.nome}</dd>
                                <dd className="text-sm text-neutro-400">{t(AZIENDA.ruolo, 'Authorised Piscine Rocks Design dealer')}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-neutro-500">{t('Referente', 'Your contact')}</dt>
                                <dd className="font-medium text-testo">{AZIENDA.referente}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-neutro-500">{t('Telefono e WhatsApp', 'Phone and WhatsApp')}</dt>
                                <dd>
                                    <BottoneTelefono className="link-sottile font-medium text-testo" />
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-neutro-500">E-mail</dt>
                                <dd>
                                    <a className="link-sottile font-medium text-testo" href={`mailto:${AZIENDA.email}`}>
                                        {AZIENDA.email}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-neutro-500">{t('Zona servita', 'Area served')}</dt>
                                <dd className="text-testo">
                                    {PROVINCE.map(p => p.nome).join(' · ')}
                                </dd>
                            </div>
                        </dl>

                        <p className="mt-10 rounded-lg border border-testo/16 bg-superficie px-5 py-4 text-sm leading-relaxed text-neutro-400">
                            {t(`Il marchio e la tecnologia sono di ${ROCKS_DESIGN.nome}.`, `The brand and the technology belong to ${ROCKS_DESIGN.nome}.`)}{' '}
                            <a href={ROCKS_DESIGN.sito} target="_blank" rel="noopener" className="link-sottile font-medium text-testo">
                                {t('Visita il sito ufficiale', 'Visit the official site')}
                            </a>.
                        </p>

                        <Immagine
                            slug="riflessi-al-tramonto"
                            ratio="16 / 9"
                            className="mt-10 rounded-lg"
                            sizes="(min-width: 1024px) 42vw, 92vw"
                        />
                        <CreditoFoto />
                    </Rivela>
                </div>
            </Sezione>
        </>
    )
}
