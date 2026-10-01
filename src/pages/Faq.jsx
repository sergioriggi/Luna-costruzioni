import Seo, { schemaBriciole, schemaFaq } from '../components/Seo'
import Rivela from '../components/Rivela'
import { Sezione, Briciole, Cta } from '../components/Sezione'
import { FAQ } from '../data/content'

const BRICIOLE = [
    { to: '/', label: 'Home' },
    { to: '/domande-frequenti', label: 'Domande frequenti' },
]

export default function Faq() {
    return (
        <>
            <Seo
                titolo="Domande frequenti sulla piscina di sabbia | Luna Costruzioni"
                descrizione="Serve il permesso per una piscina di sabbia? Quanto costa? La sabbia intorbidisce l’acqua? È una biopiscina? Le risposte per chi vive in Sicilia."
                percorso="/domande-frequenti"
                schema={[schemaBriciole(BRICIOLE), schemaFaq(FAQ)]}
            />
            <Briciole voci={BRICIOLE} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">Domande frequenti</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                        Le risposte prima di chiamarci
                    </h1>
                    <p className="testo-lungo mt-6">
                        Le domande che ci fanno più spesso i clienti siciliani. Se non trovi la tua, scrivici: rispondiamo
                        volentieri anche prima del sopralluogo.
                    </p>
                </Rivela>

                <div className="mx-auto mt-12 max-w-3xl divide-y divide-testo/[0.16] border-y border-testo/[0.16]">
                    {FAQ.map((v, i) => (
                        <Rivela key={v.domanda} delay={i * 50}>
                            <details className="group py-5" name="faq">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                                    <h2 className="font-display text-lg text-testo sm:text-xl">{v.domanda}</h2>
                                    <span className="mt-1 shrink-0 text-accento transition group-open:rotate-45" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </summary>
                                <p className="testo-lungo mt-3 pr-10">{v.risposta}</p>
                            </details>
                        </Rivela>
                    ))}
                </div>
            </Sezione>

            <Cta
                titolo="Hai un’altra domanda?"
                testo="Chiamaci o scrivici: ti rispondiamo con chiarezza, senza formule di rito."
                primaria={{ to: '/contatti', label: 'Contattaci' }}
                secondaria={{ to: '/piscine-rocks-design', label: 'La tecnologia' }}
                whatsapp
            />
        </>
    )
}
