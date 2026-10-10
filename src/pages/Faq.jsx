import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Rivela from '../components/Rivela'
import { Sezione, Briciole, Cta } from '../components/Sezione'
import { FAQ } from '../data/content'
import { useLingua } from '../i18n/lingua'

const BRICIOLE = [
    { to: '/', label: 'Home', labelEn: 'Home' },
    { to: '/domande-frequenti', label: 'Domande frequenti', labelEn: 'FAQ' },
]

export default function Faq() {
    const { t } = useLingua()
    const briciole = BRICIOLE.map(v => ({ to: v.to, label: t(v.label, v.labelEn) }))

    return (
        <>
            <Seo
                titolo="Domande frequenti sulla piscina di sabbia | Luna Costruzioni"
                descrizione="Serve il permesso per una piscina di sabbia? Quanto costa? La sabbia intorbidisce l’acqua? È una biopiscina? Le risposte per chi vive in Sicilia."
                percorso="/domande-frequenti"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ)]}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">{t('Domande frequenti', 'Frequently asked questions')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">
                        {t('Le risposte prima di chiamarci', 'Answers before you call')}
                    </h1>
                    <p className="testo-lungo mt-6">
                        {t(
                            'Le domande che ci fa più spesso chi ci scrive dalla Sicilia. Se non trovi la tua, scrivici: rispondiamo volentieri anche prima del sopralluogo.',
                            'The questions we are asked most often by people writing to us from Sicily. If yours is not here, get in touch: we are happy to answer before any site visit.',
                        )}
                    </p>
                </Rivela>

                <div className="mx-auto mt-12 max-w-3xl divide-y divide-testo/16 border-y border-testo/16">
                    {FAQ.map((v, i) => (
                        <Rivela key={v.domanda} delay={i * 50}>
                            <details className="group py-5" name="faq">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                                    <h2 className="font-display text-lg text-testo sm:text-xl">{t(v.domanda, v.domandaEn)}</h2>
                                    <span className="mt-1 shrink-0 text-accento transition group-open:rotate-45" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </summary>
                                <p className="testo-lungo mt-3 pr-10">{t(v.risposta, v.rispostaEn)}</p>
                            </details>
                        </Rivela>
                    ))}
                </div>
            </Sezione>

            <Cta
                titolo={t('Hai un’altra domanda?', 'Another question?')}
                testo={t(
                    'Chiamaci o scrivici: ti rispondiamo con chiarezza, senza formule di rito.',
                    'Call or write to us: you will get a clear answer, without the stock phrases.',
                )}
                primaria={{ to: '/contatti', label: t('Chiedi un preventivo', 'Ask for a quote') }}
                secondaria={{ to: '/piscine-rocks-design', label: t('La tecnologia', 'The technology') }}
                whatsapp
            />
        </>
    )
}
