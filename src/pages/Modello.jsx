import { Link, Navigate, useParams } from '../lib/instradamento'
import Seo, { schemaBriciole, schemaServizio } from '../components/Seo'
import Immagine from '../components/Immagine'
import CreditoFoto from '../components/CreditoFoto'
import Rivela from '../components/Rivela'
import Galleria from '../components/Galleria'
import ChiusuraContatto from '../components/ChiusuraContatto'
import { Sezione, IntestazioneSezione, Briciole } from '../components/Sezione'
import { MODELLI, SABBIE } from '../data/content'
import { ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'

export default function Modello() {
    const { t } = useLingua()
    const { modello } = useParams()
    const m = MODELLI.find(x => x.slug === modello)
    if (!m) return <Navigate to="/404" replace />

    const altri = MODELLI.filter(x => x.slug !== m.slug)
    const sabbieModello = SABBIE.filter(s => m.sabbie.includes(s.nome))
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
                immagine={`${m.copertina}-1280.jpg`}
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
                        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{nomeCompleto}</h1>
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
                    occhiello={t(`Sabbie per il ${m.nome}`, `Sands for the ${m.nome}`)}
                    titolo={
                        sabbieModello.length > 1
                            ? t('Due strade possibili', 'Two possible routes')
                            : t('La sabbia che lo caratterizza', 'The sand that defines it')
                    }
                />
                <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                    {sabbieModello.map((s, i) => (
                        <Rivela as="li" key={s.nome} delay={i * 90} className="scheda">
                            <h2 className="font-display text-2xl">{t(`Sabbia ${s.nome}`, `${s.nome} sand`)}</h2>
                            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutro-400">
                                {t(m.noteSabbie[s.nome], m.noteSabbieEn?.[s.nome])}
                            </p>
                        </Rivela>
                    ))}
                </ul>
                <Rivela className="mt-8">
                    <Link to="/sabbie" className="link-sottile text-sm font-medium text-accento">
                        {t('Tutte e tre le sabbie', 'All three sands')}
                    </Link>
                </Rivela>
            </Sezione>

            <Sezione>
                <IntestazioneSezione
                    occhiello={t('Foto Piscine Rocks Design', 'Piscine Rocks Design photos')}
                    titolo={t(`Il ${m.nome} nelle foto Piscine Rocks Design`, `The ${m.nome} in Piscine Rocks Design photos`)}
                />
                <Rivela className="mt-12">
                    <Galleria
                        filtrabile={false}
                        voci={m.galleria.map(v => ({ slug: v.slug, didascalia: t(v.didascalia, v.didascaliaEn) }))}
                    />
                </Rivela>
            </Sezione>

            {/*
              Gli altri due modelli come semplici link: le schede complete
              stanno su /modelli. Ripeterle qui metteva lo stesso testo su
              quattro pagine.
            */}
            <Sezione sfondo="bg-superficie" className="!py-12">
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
                    `Mandaci due righe su spazio ed esposizione: capiamo presto se il ${m.nome} ci sta, o se ti conviene un altro modello.`,
                    `Send us a couple of lines about the space and which way it faces: we will soon tell you whether the ${m.nome} fits, or whether another model suits you better.`,
                )}
                modulo={{ titolo: t(`Richiedi un progetto ${m.nome}`, `Request a ${m.nome} design`) }}
            />
        </>
    )
}
