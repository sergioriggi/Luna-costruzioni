import { Link, Navigate, useParams } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine, { tutteLeFoto } from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { MODELLI, conArticolo } from '../data/content'
import { ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'

export default function Modello() {
    const { t } = useLingua()
    const { modello } = useParams()
    const m = MODELLI.find(x => x.slug === modello)
    if (!m) return <Navigate to="/404" replace />

    const altri = MODELLI.filter(x => x.slug !== m.slug)
    const briciole = [
        { to: '/', label: 'Home' },
        { to: '/modelli', label: 'Modelli' },
        { to: `/modelli/${m.slug}`, label: m.nome },
    ]
    // Lo schema resta in italiano; le briciole a schermo seguono la lingua.
    const bricioleVisibili = briciole.map(v => (v.to === '/modelli' ? { ...v, label: t(v.label, 'Models') } : v))
    const nomeCompleto = t(m.nomeCompleto, m.nomeCompletoEn)
    const altroNome = x => t(x.nomeCompleto, x.nomeCompletoEn)

    return (
        <>
            <Seo
                titolo={m.seo.titolo}
                descrizione={m.seo.descrizione}
                percorso={`/modelli/${m.slug}`}
                immagine={tutteLeFoto.find(f => f.slug === m.copertina)?.fallback}
                schema={[
                    schemaBriciole(briciole),
                    /*
                     * Qui c'era anche un `Product` (`schemaModello`), e Google
                     * l'ha rifiutato due volte: un `Product` senza prezzo non è
                     * catalogabile, e il prezzo non si può dichiarare perché
                     * dipende dal giardino. Vedi il commento in fondo a
                     * `src/components/Seo.jsx`.
                     *
                     * L'attribuzione della tecnologia — il punto per cui quello
                     * schema esisteva — vive adesso qui: `schemaServizio` porta
                     * già `brand` su Piscine Rocks Design e `provider` su Luna,
                     * e la `descrizione` lo dice a parole. Non è decorazione:
                     * serve a impedire che chi legge il sito con una macchina
                     * concluda che la tecnologia l'abbiamo inventata noi.
                     */
                    schemaServizio({
                        nome: `${m.nomeCompleto} — piscina Rocks Design`,
                        descrizione: `${m.sintesi} Realizzato con Tecnologia Rocks Design® di ${ROCKS_DESIGN.nome}: Luna Costruzioni S.r.l.s. è concessionario autorizzato per la Sicilia, non l'inventore della tecnologia.`,
                        area: 'Sicilia',
                    }),
                ]}
            />
            <Briciole voci={bricioleVisibili} />

            <Sezione>
                <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    <Rivela className="max-w-prosa">
                        <p className="occhiello">{t(m.claim, m.claimEn)}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl sm:leading-none">{nomeCompleto}</h1>
                        <p className="testo-lungo mt-6">{t(m.testo, m.testoEn)}</p>
                        <p className="mt-6 rounded-lg bg-superficie px-5 py-4 text-[0.95rem] leading-relaxed text-neutro-200">
                            <strong className="font-semibold">{t('Quando ha senso sceglierlo:', 'When it makes sense:')}</strong>{' '}
                            {t(m.adatto, m.adattoEn)}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contatti" className="bottone-pieno">{t('Chiedi un preventivo', 'Ask for a quote')}</Link>
                            <Link to="/quanto-costa" className="bottone-secondario">{t('Quanto costa', 'Costs')}</Link>
                        </div>
                    </Rivela>
                    <Rivela delay={120}>
                        <Immagine
                            slug={m.copertina}
                            ratio="4 / 3"
                            className="rounded-lg"
                            sizes="(min-width: 1024px) 48vw, 92vw"
                            priority
                        />
                        <CreditoFoto />
                    </Rivela>
                </div>
            </Sezione>

            <Sezione sfondo="bg-superficie">
                <IntestazioneSezione
                    occhiello={t('Le sabbie', 'The sands')}
                    titolo={t('Il colore dell’acqua lo decide il fondale', 'The floor decides the colour of the water')}
                    testo={t(
                        'Le sabbie Rocks Design sono cinque. Quali si possono usare su questo modello lo verifichiamo a progetto, con i campioni veri sotto il sole del tuo giardino.',
                        'There are five Rocks Design sands. Which ones can be used on this model is checked at the design stage, with the real samples in the sun in your garden.',
                    )}
                />
                <Rivela className="mt-8">
                    <Link to="/sabbie" className="link-sottile text-sm font-medium text-accento">
                        {t('Le cinque sabbie, una per una', 'The five sands, one by one')}
                    </Link>
                </Rivela>
            </Sezione>

            {m.galleria.length > 0 && <Sezione>
                <IntestazioneSezione
                    occhiello={t('Foto Piscine Rocks Design', 'Piscine Rocks Design photos')}
                    titolo={t(`${conArticolo(m.nome, true)} nelle foto Piscine Rocks Design`, `The ${m.nome} in Piscine Rocks Design photos`)}
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        voci={m.galleria.map(v => ({ slug: v.slug, didascalia: t(v.didascalia, v.didascaliaEn) }))}
                    />
                </Rivela>
            </Sezione>}

            {/*
              Gli altri due modelli come semplici link: le schede complete
              stanno su /modelli. Ripeterle qui metteva lo stesso testo su
              quattro pagine.
            */}
            <Sezione sfondo="bg-superficie" className="py-12!">
                <p className="max-w-prosa text-[0.95rem] leading-relaxed text-neutro-400">
                    {t('Se il giardino chiede altro, guarda anche il', 'If your garden calls for something else, look at the')}{' '}
                    <Link to={`/modelli/${altri[0].slug}`} className="link-sottile font-medium text-accento">
                        {altroNome(altri[0])}
                    </Link>{' '}
                    {t('e il', 'and the')}{' '}
                    <Link to={`/modelli/${altri[1].slug}`} className="link-sottile font-medium text-accento">
                        {altroNome(altri[1])}
                    </Link>
                    {t(', oppure i tre', ', or see all three')}{' '}
                    <Link to="/modelli" className="link-sottile font-medium text-accento">
                        {t('messi a confronto', 'side by side')}
                    </Link>
                    .
                </p>
            </Sezione>

            <ChiusuraContatto
                occhiello={t('Preventivo', 'Quote')}
                titolo={t(`Un ${m.nome} nel tuo giardino`, `A ${m.nome} in your garden`)}
                testo={t(
                    `Mandaci due righe su spazio ed esposizione: capiamo presto se ${conArticolo(m.nome)} ci sta, o se ti conviene un altro modello.`,
                    `Send us a couple of lines about the space and which way it faces: we will soon tell you whether the ${m.nome} fits, or whether another model suits you better.`,
                )}
                modulo={{ titolo: t(`Richiedi un progetto ${m.nome}`, `Request a ${m.nome} design`) }}
            />
        </>
    )
}
