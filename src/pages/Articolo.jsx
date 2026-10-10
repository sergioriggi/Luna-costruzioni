import { Link, Navigate, useParams } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaArticolo, schemaFaq } from '../components/Seo'
import Immagine, { foto } from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import TestoRicco from '../components/TestoRicco'
import Rivela from '../components/Rivela'
import { Sezione, Briciole, Cta } from '../components/Sezione'
import { GUIDA, PERCORSO_GUIDA, percorsoArticolo } from '../data/guida'
import { formattaData } from '../lib/date'
import { testoPiano } from '../lib/testo-ricco'
import { useLingua } from '../i18n/lingua'

/** Un blocco del corpo. Le forme ammesse le controlla scripts/verifica-guida.mjs. */
function Blocco({ blocco }) {
    const { t } = useLingua()
    const testo = t(blocco.it, blocco.en)
    switch (blocco.tipo) {
        case 'h2':
            return <h2 className="pt-6 font-display text-2xl leading-snug text-testo sm:text-3xl">{testo}</h2>
        case 'h3':
            return <h3 className="pt-2 font-display text-xl leading-snug text-testo">{testo}</h3>
        case 'elenco':
            return (
                <ul className="testo-lungo list-disc space-y-2 pl-5 marker:text-neutro-500">
                    {testo.map((voce, i) => (
                        <li key={i}><TestoRicco testo={voce} /></li>
                    ))}
                </ul>
            )
        case 'nota':
            return (
                <p className="rounded-lg border border-testo/[0.16] bg-superficie px-5 py-4 text-[0.95rem] leading-relaxed text-neutro-300">
                    <TestoRicco testo={testo} />
                </p>
            )
        default:
            return <p className="testo-lungo"><TestoRicco testo={testo} /></p>
    }
}

export default function Articolo() {
    const { t, lingua } = useLingua()
    const { articolo } = useParams()
    const a = GUIDA.find(x => x.slug === articolo)
    if (!a) return <Navigate to="/404" replace />

    const percorso = percorsoArticolo(a)
    const immagine = `${a.foto}-1280.jpg`
    const briciole = [
        { to: '/', label: 'Home', labelEn: 'Home' },
        { to: PERCORSO_GUIDA, label: 'Guida', labelEn: 'Guide' },
        { to: percorso, label: a.titolo, labelEn: a.titoloEn },
    ]
    const domande = a.domande ?? []
    const altri = GUIDA.filter(x => x.slug !== a.slug).slice(0, 3)
    // Le foto di materiali (i campioni di sabbia) non mostrano piscine: niente credito.
    const credito = !foto(a.foto).tags.includes('materiali')

    return (
        <>
            <Seo
                titolo={a.seo.titolo}
                descrizione={a.seo.descrizione}
                percorso={percorso}
                immagine={immagine}
                tipo="article"
                schema={[
                    schemaBriciole(briciole),
                    schemaArticolo({
                        titolo: a.titolo,
                        descrizione: a.seo.descrizione,
                        percorso,
                        immagine,
                        pubblicato: a.pubblicato,
                        aggiornato: a.aggiornato,
                    }),
                    ...(domande.length
                        ? [schemaFaq(domande.map(d => ({ domanda: d.domanda, risposta: testoPiano(d.risposta) })))]
                        : []),
                ]}
            />
            <Briciole voci={briciole} />

            <Sezione>
                <Rivela className="max-w-prosa">
                    <p className="occhiello">{t('Guida', 'Guide')}</p>
                    <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{t(a.titolo, a.titoloEn)}</h1>
                    <p className="testo-lungo mt-6">{t(a.sintesi, a.sintesiEn)}</p>
                    <p className="mt-6 text-xs text-neutro-500">
                        <time dateTime={a.pubblicato}>
                            {t('Pubblicato il ', 'Published ')}
                            {formattaData(a.pubblicato, lingua)}
                        </time>
                        {a.aggiornato && (
                            <>
                                {' · '}
                                <time dateTime={a.aggiornato}>
                                    {t('aggiornato il ', 'updated ')}
                                    {formattaData(a.aggiornato, lingua)}
                                </time>
                            </>
                        )}
                    </p>
                </Rivela>

                <div className="mt-12 max-w-4xl">
                    <Immagine slug={a.foto} ratio="16 / 9" className="rounded-lg" sizes="(min-width: 1024px) 56rem, 92vw" />
                    {credito && <CreditoFoto />}
                </div>

                <article className="mt-12 max-w-prosa space-y-5">
                    {a.corpo.map((blocco, i) => (
                        <Blocco key={i} blocco={blocco} />
                    ))}
                </article>

                {domande.length > 0 && (
                    <div className="mt-16 max-w-prosa">
                        <h2 className="titolo-sezione">{t('Domande frequenti', 'Frequently asked questions')}</h2>
                        <dl className="mt-8 space-y-6">
                            {domande.map(d => (
                                <div key={d.domanda}>
                                    <dt className="font-display text-lg text-testo">{t(d.domanda, d.domandaEn)}</dt>
                                    <dd className="testo-lungo mt-2"><TestoRicco testo={t(d.risposta, d.rispostaEn)} /></dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                {(a.correlati?.length > 0 || altri.length > 0) && (
                    <nav aria-label={t('Da leggere anche', 'Read next')} className="mt-16 max-w-prosa">
                        <h2 className="font-display text-xl text-testo">{t('Da leggere anche', 'Read next')}</h2>
                        <ul className="mt-4 space-y-2 text-[0.95rem]">
                            {(a.correlati ?? []).map(c => (
                                <li key={c.to}>
                                    <Link to={c.to} className="link-sottile">{t(c.label, c.labelEn)}</Link>
                                </li>
                            ))}
                            {altri.map(x => (
                                <li key={x.slug}>
                                    <Link to={percorsoArticolo(x)} className="link-sottile">{t(x.titolo, x.titoloEn)}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}

                {a.fonti?.length > 0 && (
                    <div className="mt-12 max-w-prosa border-t border-testo/[0.16] pt-6">
                        <p className="text-xs uppercase tracking-[0.12em] text-neutro-500">{t('Fonti', 'Sources')}</p>
                        <ul className="mt-3 space-y-1.5 text-sm text-neutro-400">
                            {a.fonti.map(f => (
                                <li key={f.url}>
                                    <a href={f.url} className="link-sottile" target="_blank" rel="noopener noreferrer nofollow">
                                        {f.titolo}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Sezione>

            <Cta
                titolo={t('Il passo successivo è vedere il tuo giardino', 'The next step is seeing your garden')}
                testo={t(
                    'Il sopralluogo è gratuito e non ti impegna: è lì che il progetto e il prezzo diventano tuoi.',
                    'The site visit is free and commits you to nothing: that is where the design and the price become yours.',
                )}
                whatsapp
            />
        </>
    )
}
