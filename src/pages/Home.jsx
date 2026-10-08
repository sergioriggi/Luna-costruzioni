import { Link } from '../lib/instradamento'
import Seo, { schemaAzienda, schemaFaq, schemaBriciole } from '../components/Seo'
import { Suspense } from 'react'
import Foto from '../components/Foto'
import pigra, { aInattivita } from '../lib/pigra'
import BottoneWhatsApp from '../components/BottoneWhatsApp'
import { AZIENDA, ROCKS_DESIGN, PREZZO, PROVINCE } from '../data/site'
import { MODELLI } from '../data/modelli'
import MappaSicilia from '../components/MappaSicilia'
import CreditoFoto from '../components/CreditoFoto'
import { FOTO_APERTURA_SIZES } from '../lib/schermi'
import { useLingua } from '../i18n/lingua'
import BottoneTelefono from '../components/BottoneTelefono'

/**
 * Il modulo in fondo alla pagina si scarica a pagina caricata, quando il
 * browser è libero: è lontano dalla piega e non deve contendere banda e
 * processore alla foto d'apertura. Il suo HTML c'è comunque da subito
 * (pre-renderizzato); diventa interattivo appena arriva il codice.
 */
const ModuloPagina = pigra(() => import('../components/ModuloPagina'), { attendi: aInattivita })

/*
 * Pagina iniziale: riproduce il file approvato `Luna_Costruzioni.dc.html`,
 * sezione per sezione. Le classi `pg-` stanno in `src/pagina.css` e portano
 * gli stessi valori degli attributi `style` del file di partenza.
 *
 * Le fotografie del file approvato sono indicate qui con lo slug del
 * manifesto: sono le stesse inquadrature, servite in tre larghezze e con la
 * filigrana «Piscine Rocks Design» già impressa.
 */

/** Fascia «chiavi in mano» sotto l'apertura. */
const FASCIA = [
    {
        titolo: 'Impresa edile',
        titoloEn: 'Building contractor',
        testo: 'Scavi e cantiere con mezzi e maestranze nostre.',
        testoEn: 'Excavation and site work with our own crews and machines.',
    },
    {
        titolo: 'Chiavi in mano',
        titoloEn: 'Turnkey',
        testo: 'Dal progetto al collaudo, senza appalti da coordinare.',
        testoEn: 'From design to commissioning, with no contractors to juggle.',
    },
    {
        titolo: 'Concessionario autorizzato',
        titoloEn: 'Authorised dealer',
        testo: 'Piscine Rocks Design per la Sicilia: Tecnologia Rocks Design brevettata.',
        testoEn: 'Piscine Rocks Design for Sicily: patented Rocks Design Technology.',
    },
    {
        // Vedi la nota estesa in `content.js` (CREDENZIALI): la credenziale
        // vera sono i cantieri edili, non piscine già realizzate.
        titolo: 'Cantieri dal 2021',
        titoloEn: 'On site since 2021',
        testo: 'Cinque anni di movimento terra e opere edili, più la formazione Rocks Design.',
        testoEn: 'Five years of earthmoving and building work, plus Rocks Design training.',
    },
]

/** Le tre righe di definizione della sezione «Perché Piscine Rocks Design». */
const DEFINIZIONI = [
    {
        nome: 'Forme libere',
        nomeEn: 'Free forms',
        testo: 'Nessuno stampo e nessun angolo obbligato: ogni Piscina Rocks Design è disegnata sul giardino che la ospita.',
        testoEn: 'No mould, no forced corner: every basin is drawn around the garden that holds it.',
    },
    {
        nome: 'Pietra e acqua',
        nomeEn: 'Stone and water',
        testo: 'Rocce, ghiaia e finiture Rocks Design scelte per stare bene al sole forte e alla salsedine.',
        testoEn: 'Rock, gravel and finishes chosen to live with strong sun and salt air.',
    },
    {
        nome: 'Si vive di sera',
        nomeEn: 'Made for evenings',
        testo: 'Illuminazione integrata nelle rocce e nei bordi: la Piscina Rocks Design resta il centro del giardino anche al buio.',
        testoEn: 'Lighting set into the rock and the edges: the pool stays the centre of the garden after dark.',
    },
]

/** Le cinque fasi del cantiere. */
const FASI = [
    {
        titolo: 'Sopralluogo e progetto',
        durata: 'Circa un’ora',
        durataEn: 'About an hour',
        titoloEn: 'Site visit and design',
        testo: 'Veniamo sul posto, misuriamo e ascoltiamo. Dal rilievo nasce il disegno della vasca e di tutto il contorno.',
        testoEn: 'We come out, measure and listen. The survey becomes the drawing of the basin and its surroundings.',
    },
    {
        titolo: 'Scavi',
        durata: 'Mezzi nostri',
        durataEn: 'Our own machines',
        titoloEn: 'Excavation',
        testo: 'Scavo e movimentazione terra li eseguiamo noi, con mezzi e maestranze dell’impresa.',
        testoEn: 'We carry out the digging and earthworks ourselves, with our own machines and crews.',
    },
    {
        titolo: 'Realizzazione',
        durata: 'Tecnologia Rocks Design®',
        durataEn: 'Rocks Design Technology',
        titoloEn: 'Construction',
        testo: 'Realizzazione in Tecnologia Rocks Design e finiture in pietra: la vasca prende la forma disegnata.',
        testoEn: 'Rocks Design Technology and stone finishes: the basin takes the shape it was drawn.',
    },
    {
        titolo: 'Messa in opera',
        durata: 'Impianti',
        durataEn: 'Plant',
        titoloEn: 'Installation',
        testo: 'Filtrazione, illuminazione e allacciamenti installati e regolati sul posto.',
        testoEn: 'Filtration, lighting and connections installed and tuned on site.',
    },
    {
        titolo: 'Collaudo e consegna',
        durata: 'Piena e pronta',
        durataEn: 'Full and ready',
        titoloEn: 'Commissioning and handover',
        testo: 'Prove di tenuta e funzionamento, primo avviamento e istruzioni d’uso. La Piscina Rocks Design si consegna piena e pronta.',
        testoEn: 'Leak and function tests, first start-up and usage instructions. The pool is handed over full and ready.',
    },
]

/**
 * Mosaico delle realizzazioni: sette inquadrature, non più quindici. Sulla
 * home servono a dire «ecco il prodotto», non a sostituire la galleria; su
 * telefono quindici foto impilate erano quasi diecimila pixel di scorrimento.
 * L'ordine segue le caselle di `.pg-mosaico` (la prima è la grande, le ultime
 * due sono larghe). Le foto dell'apertura, della sezione «perché» e delle
 * schede dei modelli sono escluse: nessuna compare due volte.
 */
const MOSAICO = [
    'oasi-aerea-sabbia-bianca',
    'palme-e-monoliti',
    'acqua-turchese-notturna',
    'riflessi-al-tramonto',
    'area-benessere-vista-alto',
    'spiaggia-di-sabbia-privata',
    'idromassaggio-naturale',
]

/**
 * Schede dei modelli in home. La riga sotto il nome è scritta per questa
 * pagina: `claim` e `sintesi` compaiono già su /modelli e sulla pagina del
 * modello, e una terza copia farebbe scattare misura-ripetizioni.mjs. Le foto
 * non sono le copertine delle pagine dei modelli (quella del Mediterranea è
 * l'apertura di questa pagina), ma inquadrature dalle loro gallerie.
 */
const SCHEDE_MODELLI = {
    caraibi: { foto: 'oasi-con-pontile-e-palme', riga: 'Per giardini ampi e soleggiati.', rigaEn: 'For large, sunny gardens.' },
    mediterranea: { foto: 'solarium-in-legno', riga: 'Per masserie, ulivi e agrumeti.', rigaEn: 'For farmhouses, olive and citrus groves.' },
    alpi: { foto: 'ghiaietto-e-acqua-smeraldo', riga: 'Per pendii e giardini piccoli.', rigaEn: 'For slopes and small gardens.' },
}

/** I quattro dubbi che fermano chi vuole una piscina. */
const DUBBI = [
    {
        domanda: '«Non so quanto costerà davvero.»',
        domandaEn: '“I have no idea what it will really cost.”',
        risposta:
            'Preventivo con voci separate per scavi, realizzazione, messa in opera e collaudo, scritto dopo aver visto il giardino e firmato prima di iniziare. Nessuna voce «imprevisti» aperta. Il disbrigo delle pratiche, se lo affidi a noi, è una voce a parte: la vedi e decidi.',
        rispostaEn:
            'A quote itemised by excavation, construction, installation and commissioning, written once we have seen the garden and signed before work starts. No open-ended contingency line. Permit paperwork, if you hand it to us, is a separate line you can see and decide on.',
    },
    {
        domanda: '«Il cantiere mi occupa il giardino per mesi.»',
        domandaEn: '“The site will take over my garden for months.”',
        risposta:
            'Un’unica impresa in cantiere, con date di inizio e fine concordate in preventivo. Non ci sono squadre diverse che si aspettano a vicenda: scavi e realizzazione sono nostri.',
        rispostaEn:
            'One company on site, with start and finish dates agreed in the quote. There are no separate crews waiting on each other: the digging and the build are both ours.',
    },
    {
        domanda: '«Dopo la consegna, chi mi assiste?»',
        domandaEn: '“Once it is handed over, who helps me?”',
        risposta:
            'Luna Costruzioni S.r.l.s. è concessionario autorizzato per la Sicilia: restiamo sull’isola e il referente resta Luciano Naro, lo stesso che è venuto a vedere il giardino la prima volta. Un numero, non un centralino.',
        rispostaEn:
            'Luna Costruzioni S.r.l.s. is an authorised dealer for Sicily: we stay on the island and your contact stays Luciano Naro, the same person who first came to see your garden. One number, not a call centre.',
    },
    {
        domanda: '«Sarà una vasca come tante.»',
        domandaEn: '“It will end up looking like every other pool.”',
        risposta:
            'La Tecnologia Rocks Design è brevettata e le forme non sono a catalogo: la vasca si disegna sul tuo giardino, quindi non può somigliare a quella di un altro.',
        rispostaEn:
            'Rocks Design Technology is patented and the shapes are not from a catalogue: the pool is drawn around your garden, so it cannot copy anyone else’s.',
    },
]

/** Argomenti per hotel, resort e B&B. */
const RICETTIVO = [
    {
        titolo: 'Cantiere fuori stagione',
        titoloEn: 'Off-season build',
        testo: 'Programmiamo scavi e realizzazione nei mesi di chiusura, con date concordate in preventivo.',
        testoEn: 'We schedule excavation and construction in your closed months, on dates agreed in the quote.',
    },
    {
        titolo: 'Un unico appalto',
        titoloEn: 'One contract',
        testo: 'Impresa edile e concessionario nella stessa azienda: nessun coordinamento tra fornitori a tuo carico.',
        testoEn: 'Contractor and dealer in one company: no supplier coordination left to you.',
    },
    {
        titolo: 'Assistenza dopo il collaudo',
        titoloEn: 'Support after handover',
        testo: 'Restiamo il riferimento per impianto e manutenzione: siamo in Sicilia, non a mille chilometri.',
        testoEn: 'We remain your contact for plant and upkeep: we are in Sicily, not a thousand kilometres away.',
    },
]

/** Le sei domande del file approvato. */
const DOMANDE = [
    {
        domanda: 'È una biopiscina con le piante?',
        domandaEn: 'Is it a bio-pool with plants?',
        risposta:
            'No. La Piscina Rocks Design ha un impianto di filtrazione tradizionale: l’aspetto è quello di un laghetto in pietra, il funzionamento e la manutenzione sono quelli di una piscina.',
        rispostaEn:
            'No. A Piscine Rocks Design pool runs on conventional filtration: it looks like a stone lagoon, it works and is maintained like a pool.',
    },
    {
        domanda: 'Quanto costa?',
        domandaEn: 'What does it cost?',
        risposta:
            'Dipende da dimensioni, accessibilità del giardino e finiture. Quando abbiamo visto il giardino ricevi un preventivo con voci separate per scavi, realizzazione, messa in opera e collaudo: sai cosa paghi e per cosa.',
        rispostaEn:
            'It depends on size, garden access and finishes. Once we have seen the garden you get a quote itemised by excavation, construction, installation and commissioning: you know what you are paying for.',
    },
    {
        domanda: 'Chi fa gli scavi?',
        domandaEn: 'Who does the digging?',
        risposta:
            'Noi. Luna Costruzioni è un’impresa edile: scavo, movimentazione terra e cantiere sono nostri, non subappaltati a terzi che poi non trovi più.',
        rispostaEn:
            'We do. Luna Costruzioni is a building contractor: digging, earthworks and site management are ours, not subcontracted to someone you can never reach again.',
    },
    {
        domanda: 'Servono permessi?',
        domandaEn: 'Do I need permits?',
        risposta:
            'Dipende dal tuo Comune, e lo verifichiamo noi: te lo diciamo prima del preventivo, non dopo. Le pratiche possiamo seguirle noi — è un servizio a parte, che quotiamo separatamente e attivi solo se vuoi.',
        rispostaEn:
            'It depends on your municipality, and we check it for you: you know before the quote, not after. We can handle the paperwork for you — it is a separate service, quoted on its own, and entirely optional.',
    },
    {
        domanda: 'Va bene anche un giardino piccolo?',
        domandaEn: 'Does it work in a small garden?',
        risposta:
            'La forma non è a catalogo, quindi si adatta allo spazio che c’è. Il vincolo vero è l’accesso dei mezzi al giardino: lo valutiamo sul posto e te lo diciamo subito.',
        rispostaEn:
            'The shape is not from a catalogue, so it adapts to the space you have. The real constraint is machine access to the garden: we assess it on site and tell you straight away.',
    },
    {
        domanda: 'Ci sono agevolazioni fiscali?',
        domandaEn: 'Are there tax breaks?',
        risposta:
            'Se rifai una piscina che hai già, sì: la detrazione IRPEF per ristrutturazioni vale il 50% sull’abitazione principale e il 36% sulle seconde case, entro 96.000 € per unità immobiliare, in 10 quote annuali. Su una piscina nuova in giardino, di norma, non spetta: meglio saperlo prima del preventivo che dopo.',
        rispostaEn:
            'If you are renovating a pool you already have, yes: the Italian renovation tax deduction is 50% on a main home and 36% on second homes, up to €96,000 per property, spread over ten years. On a brand-new garden pool it normally does not apply: better to know before the quote than after.',
    },
    {
        domanda: 'Che manutenzione richiede?',
        domandaEn: 'What upkeep does it need?',
        risposta:
            'Filtrazione e trattamento dell’acqua come in una piscina tradizionale. Al collaudo spieghiamo l’uso dell’impianto e restiamo il riferimento per l’assistenza in Sicilia.',
        rispostaEn:
            'Filtration and water treatment as in a conventional pool. At handover we walk you through the plant, and we stay your service contact in Sicily.',
    },
]

export default function Home() {
    const { t } = useLingua()

    return (
        <div className="pg">
            <Seo
                titolo="Luna Costruzioni | Piscine Rocks Design in tutta la Sicilia"
                descrizione="Impresa edile e concessionario autorizzato Piscine Rocks Design per la Sicilia: piscina con spiaggia in sabbia chiavi in mano, scavi con mezzi propri."
                percorso="/"
                schema={[
                    schemaAzienda(),
                    schemaFaq(DOMANDE.map(d => ({ domanda: d.domanda, risposta: d.risposta }))),
                    schemaBriciole([{ to: '/', label: 'Home' }]),
                ]}
            />

            {/* ─────────────────────────── apertura ─────────────────────────── */}
            {/*
              Apertura divisa: testo sul fondo, foto a fianco e a piena
              luce. Prima la foto stava sotto il testo con un velo dell'80%:
              per leggere il titolo si spegneva proprio ciò che vende. Ora la
              foto è di giorno, turchese, e nessun velo la copre.
              La foto è precaricata da prerender.mjs con gli stessi `sizes`
              (vedi `fotoApertura` in scripts/rotte.mjs): se cambiano qui,
              vanno cambiati là, o il browser scarica due volte.
            */}
            <section id="top" className="pg-eroe">
                <div className="pg-eroe-testo">
                    <p className="pg-eroe-occhiello">
                        {t('Piscine Rocks Design in Sicilia', 'Piscine Rocks Design in Sicily')}
                    </p>
                    <h1 className="pg-eroe-titolo">
                        {t(
                            'La tua Piscina Rocks Design, dal primo scavo al primo bagno.',
                            'Your Piscine Rocks Design pool, from the first dig to the first swim.',
                        )}
                    </h1>
                    <p className="pg-eroe-sommario">
                        {t(
                            'Luna Costruzioni S.r.l.s. è concessionario autorizzato Piscine Rocks Design per la Sicilia e, in quanto impresa edile, realizza la piscina in Tecnologia Rocks Design chiavi in mano: scavi, realizzazione, messa in opera e collaudo. Un solo interlocutore per tutto il cantiere.',
                            'Luna Costruzioni S.r.l.s. is an authorised Piscine Rocks Design dealer in Sicily and, as a building contractor, delivers your Rocks Design Technology pool turnkey: excavation, construction, installation and commissioning. One point of contact for the whole job.',
                        )}
                    </p>
                    <div className="pg-azioni">
                        <a className="btn pg-btn-pieno pg-btn-grande" href="#contatti">
                            {t('Chiedi un preventivo', 'Ask for a quote')}
                        </a>
                        <a className="btn btn-secondary pg-btn-grande" href="#foto">
                            {t('Guarda le piscine', 'See the pools')}
                        </a>
                    </div>
                    {/* Il prezzo di partenza viene da PREZZO, unica fonte: mai riscriverlo a mano. */}
                    <Link to="/quanto-costa" className="pg-eroe-prezzo">
                        <span className="pg-eroe-prezzo-cifra">{t(PREZZO.testo, `from €${PREZZO.daMq.toLocaleString('en-GB')} per m² + VAT`)}</span>
                        <span className="pg-eroe-prezzo-link">{t('Che cosa sposta il prezzo', 'What moves the price')} →</span>
                    </Link>
                </div>
                <figure className="pg-eroe-figura">
                    <Foto
                        slug="villa-con-spiaggia-in-ghiaia"
                        className="pg-eroe-foto"
                        sizes={FOTO_APERTURA_SIZES}
                        priority
                        alt={t('Piscina Rocks Design di giorno: acqua turchese, massi chiari e riva in ghiaia davanti a una villa', 'Piscine Rocks Design pool by day: turquoise water, pale boulders and a gravel shore in front of a villa')}
                    />
                    <figcaption className="pg-figura-credito"><CreditoFoto /></figcaption>
                </figure>
                <ul className="pg-fascia">
                    {FASCIA.map(voce => (
                        <li key={voce.titolo}>
                            <p className="pg-fascia-titolo">{t(voce.titolo, voce.titoloEn)}</p>
                            <p className="pg-fascia-testo">{t(voce.testo, voce.testoEn)}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ─────────────────── perché Piscine Rocks Design ──────────────── */}
            <section id="piscine" className="pg-sezione pg-piscine">
                <div>
                    <h2 className="pg-titolo" style={{ maxWidth: '20em' }}>
                        {t('Sembra un laghetto. Funziona come una piscina.', 'It looks like a lagoon. It works like a pool.')}
                    </h2>
                    <p className="pg-intro" style={{ maxWidth: '38em', marginBottom: 40 }}>
                        {t(
                            'Le Piscine Rocks Design non hanno forme di serie: la vasca nasce dal giardino, dalle rocce e dalla luce del posto. Il risultato è un bagno che si vive a piedi nudi, con bordi in pietra e spiagge d’ingresso al posto della scaletta. La Tecnologia Rocks Design è brevettata: Luna Costruzioni la realizza come concessionario autorizzato.',
                            'Piscine Rocks Design have no stock shapes: the basin grows out of the garden, the rock and the light of the place. The result is a pool you live barefoot, with stone edges and walk-in beaches instead of a ladder. Rocks Design Technology is patented: Luna Costruzioni builds it as an authorised dealer.',
                        )}
                    </p>
                    <div className="pg-definizioni">
                        {DEFINIZIONI.map(d => (
                            <div key={d.nome} className="pg-definizione">
                                <p className="pg-definizione-nome">{t(d.nome, d.nomeEn)}</p>
                                <p className="pg-definizione-testo">{t(d.testo, d.testoEn)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <figure>
                    <Foto
                        slug="oasi-con-pontile"
                        className="pg-piscine-foto"
                        sizes="(max-width: 900px) calc(100vw - 40px), 45vw"
                        alt={t('Piscina Rocks Design con bordo in pietra e pontile in legno', 'Piscine Rocks Design pool with a stone edge and a timber jetty')}
                    />
                    {/*
                      Qui c'era l'invito a visitare la piscina della casa madre
                      in Lombardia. Tolto per decisione del 30/09/2026: il sito
                      non propone più visite né viaggi. Resta la didascalia
                      della foto, che dice che cosa si vede.
                    */}
                    <figcaption data-didascalia="">
                        {t(
                            'Bordo in massi, due getti che partono dalla roccia e una dépendance in legno alle spalle.',
                            'A rock edge, two jets rising from the stone and a timber annexe behind.',
                        )}
                    </figcaption>
                    <CreditoFoto />
                </figure>
            </section>

            {/* ────────────────────────── realizzazioni ─────────────────────── */}
            <section id="foto" className="pg-sezione pg-tinta">
                <h2 className="pg-titolo" style={{ maxWidth: '20em' }}>
                    {t(
                        'Com’è una Piscina Rocks Design finita.',
                        'What a finished Piscine Rocks Design pool looks like.',
                    )}
                </h2>
                <p className="pg-intro" style={{ maxWidth: '38em', marginBottom: 40 }}>
                    {t('È il prodotto che costruiamo. In Sicilia non ne abbiamo ancora consegnata una.', 'It is the product we build. We have not yet handed one over in Sicily.')}
                </p>
                <div className="pg-mosaico">
                    {MOSAICO.map((slug, i) => (
                        <Foto
                            key={slug}
                            slug={slug}
                            sizes={
                                i === 0
                                    ? '(max-width: 700px) 82vw, 50vw'
                                    : '(max-width: 700px) 82vw, (max-width: 1100px) 50vw, 25vw'
                            }
                        />
                    ))}
                </div>
                <CreditoFoto />
                <Link to="/galleria" className="pg-link-freccia">
                    {t('Tutte le fotografie, con i filtri per modello', 'Every photo, filterable by model')} →
                </Link>
            </section>

            {/* ──────────────────────────── i modelli ───────────────────────── */}
            <section id="modelli" className="pg-sezione">
                <p className="pg-occhiello">{t('I modelli', 'The models')}</p>
                <h2 className="pg-titolo" style={{ marginBottom: 40, maxWidth: '18em' }}>
                    {t('Tre punti di partenza, nessuna vasca uguale.', 'Three starting points, no two pools alike.')}
                </h2>
                <div className="pg-modelli">
                    {MODELLI.map((m, i) => {
                        const scheda = SCHEDE_MODELLI[m.slug]
                        return (
                            <Link key={m.slug} to={`/modelli/${m.slug}`} className="pg-modello">
                                <Foto
                                    slug={scheda.foto}
                                    className="pg-modello-foto"
                                    sizes={i === 0 ? '(max-width: 900px) calc(100vw - 40px), 55vw' : '(max-width: 900px) calc(100vw - 40px), 20vw'}
                                />
                                <span className="pg-modello-testo">
                                    <span className="pg-modello-nome">{m.nomeCompleto}</span>
                                    <span className="pg-modello-riga">{t(scheda.riga, scheda.rigaEn)}</span>
                                    <span className="pg-modello-sabbie">
                                        {m.sabbie.map(sabbia => (
                                            <span key={sabbia} className="pg-sabbia">{t(`Sabbia ${sabbia}`, `${sabbia} sand`)}</span>
                                        ))}
                                    </span>
                                </span>
                            </Link>
                        )
                    })}
                </div>
                <CreditoFoto />
                <Link to="/modelli" className="pg-link-freccia">
                    {t('Confronta i modelli', 'Compare the models')} →
                </Link>
            </section>

            {/* ───────────────────────── chiavi in mano ─────────────────────── */}
            <section id="processo" className="pg-sezione pg-processo">
                <h2 className="pg-titolo" style={{ maxWidth: '22em' }}>
                    {t('Cinque fasi, un’unica impresa.', 'Five stages, one company.')}
                </h2>
                <p className="pg-intro" style={{ maxWidth: '42em' }}>
                    {t(
                        'Luna Costruzioni segue tutto il processo: non ci limitiamo a fornire la Piscina Rocks Design, la costruiamo. Scavi, realizzazione, messa in opera e collaudo restano nelle stesse mani, dal preventivo alla consegna.',
                        'Luna Costruzioni handles the whole process: we do not merely supply the pool, we build it. Excavation, construction, installation and commissioning all stay in the same hands, from quote to handover.',
                    )}
                </p>
                <ol className="pg-fasi">
                    {FASI.map((fase, i) => (
                        <li key={fase.titolo} className="pg-fase">
                            <span className="pg-fase-numero" aria-hidden="true">{i + 1}</span>
                            <p className="pg-fase-durata">{t(fase.durata, fase.durataEn)}</p>
                            <p className="pg-cella-titolo">{t(fase.titolo, fase.titoloEn)}</p>
                            <p className="pg-cella-testo">{t(fase.testo, fase.testoEn)}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* ───────────────────────── prima di decidere ──────────────────── */}
            <section id="dubbi" className="pg-sezione">
                <h2 className="pg-titolo" style={{ maxWidth: '21em' }}>
                    {t(
                        'Quattro dubbi fermano chi vuole una piscina. Li mettiamo sul tavolo subito.',
                        'Four doubts stop people from building a pool. We put them on the table first.',
                    )}
                </h2>
                <p className="pg-intro" style={{ maxWidth: '42em' }}>
                    {t(
                        'Sono i motivi reali per cui un preventivo resta nel cassetto. A ciascuno rispondiamo con un impegno preciso; tempi e voci di costo finiscono nel contratto.',
                        'These are the real reasons a quote stays in a drawer. We answer each with a specific commitment; timing and cost lines go into the contract.',
                    )}
                </p>
                <div className="pg-dubbi">
                    {DUBBI.map(d => (
                        <div key={d.domanda} className="pg-dubbio">
                            <p className="pg-etichetta">{t('Il dubbio', 'The doubt')}</p>
                            <p className="pg-domanda">{t(d.domanda, d.domandaEn)}</p>
                            <p className="pg-etichetta pg-etichetta-accento">{t('La nostra risposta', 'Our answer')}</p>
                            <p className="pg-risposta">{t(d.risposta, d.rispostaEn)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ────────────────────────── hotel e resort ────────────────────── */}
            <section id="hotel" className="pg-hotel">
                <figure className="pg-hotel-figura">
                    <Foto
                        slug="blu-della-sera"
                        className="pg-hotel-foto"
                        sizes="(max-width: 900px) 100vw, 45vw"
                        alt={t('Piscina Rocks Design illuminata di sera, con gli ospiti di un evento ai tavoli sullo sfondo', 'Piscine Rocks Design pool lit in the evening, with guests at tables in the background')}
                    />
                    <figcaption className="pg-figura-credito"><CreditoFoto /></figcaption>
                </figure>
                <div className="pg-hotel-testo">
                    <p className="pg-occhiello">{t('Hotel, resort e B&B', 'Hotels, resorts and guest houses')}</p>
                    <h2 className="pg-titolo" style={{ maxWidth: '16em' }}>
                        {t(
                            'Per una struttura ricettiva la piscina è la prima foto che il cliente guarda.',
                            'For a hospitality business, the pool is the first photo a guest looks at.',
                        )}
                    </h2>
                    <p className="pg-intro" style={{ maxWidth: '36em', marginBottom: 36 }}>
                        {t(
                            'Massi, sabbia e un ingresso a spiaggia, al posto della solita vasca rettangolare. Lavoriamo con i tempi e i vincoli di chi deve restare aperto.',
                            'Boulders, sand and a walk-in beach instead of the usual rectangular tank. We work to the timings and constraints of a business that has to stay open.',
                        )}
                    </p>
                    <div className="pg-tre">
                        {RICETTIVO.map(v => (
                            <div key={v.titolo} className="pg-tre-voce">
                                <p className="pg-cella-titolo">{t(v.titolo, v.titoloEn)}</p>
                                <p className="pg-cella-testo">{t(v.testo, v.testoEn)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="pg-azioni">
                        <a className="btn btn-primary pg-btn-grande" href="#contatti">
                            {t('Richiedi una proposta per la struttura', 'Request a proposal for your property')}
                        </a>
                        <Link className="btn btn-ghost pg-btn-grande" to="/hotel-e-resort">
                            {t('Hotel e resort, nel dettaglio', 'Hotels and resorts in detail')} →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ────────────────────────── zona operativa ────────────────────── */}
            <section id="sicilia" className="pg-sezione pg-sicilia">
                <MappaSicilia />
                <div className="pg-sicilia-testo">
                    <div>
                        <h2 className="pg-titolo">{t('Su tutta la Sicilia.', 'Across Sicily.')}</h2>
                        <p className="pg-sicilia-intro">
                            {t(
                                'Luna Costruzioni S.r.l.s. è concessionario autorizzato Piscine Rocks Design per la Sicilia. Lavoriamo in tutte e nove le province, per ville private e per strutture ricettive.',
                                'Luna Costruzioni S.r.l.s. is an authorised Piscine Rocks Design dealer in Sicily. We work in all nine provinces, for private villas and for hotels and guest houses.',
                            )}
                        </p>
                    </div>
                    <div>
                        <ul className="pg-province" aria-label={t('Le nove province', 'The nine provinces')}>
                            {PROVINCE.map(p => (
                                <li key={p.slug}>
                                    <Link to={`/piscine-rocks-design/sicilia#${p.slug}`}>{p.nome}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="pg-azioni">
                            <a className="btn btn-primary pg-btn-grande" href="#contatti">
                                {t('Chiedi un preventivo', 'Ask for a quote')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────────────────────── domande frequenti ──────────────────── */}
            <section id="faq" className="pg-sezione pg-tinta pg-faq-sezione">
                <div className="pg-faq-testata">
                    <h2 className="pg-titolo">
                        {t('Quello che ci chiedono prima di ogni preventivo.', 'What people ask us before any quote.')}
                    </h2>
                    <Link to="/domande-frequenti" className="pg-link-freccia">
                        {t('Tutte le domande', 'All questions')} →
                    </Link>
                </div>
                <div className="pg-faq">
                    {DOMANDE.map(d => (
                        <details key={d.domanda}>
                            <summary>{t(d.domanda, d.domandaEn)}</summary>
                            <p>{t(d.risposta, d.rispostaEn)}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────  contatti ──────────────────────── */}
            {/* Riquadro finale: `data-cta-finale` lo riconosce scripts/misura-ripetizioni.mjs. */}
            <section id="contatti" className="pg-sezione pg-contatti" data-cta-finale="">
                <div>
                    <p className="pg-occhiello">{t('Contatti', 'Contact')}</p>
                    <h2 className="pg-titolo" style={{ maxWidth: '18em' }}>
                        {t('Raccontaci il giardino.', 'Tell us about the garden.')}
                    </h2>
                    <p style={{ color: 'var(--color-neutral-300)', maxWidth: '32em', margin: '0 0 36px' }}>
                        {t(
                            `Ci servono nome, telefono, e-mail e comune; due righe sullo spazio che hai ci aiutano. Fissiamo un sopralluogo, gratuito come il preventivo, e ti diciamo cosa si può fare, con tempi e costi del progetto chiavi in mano. ${AZIENDA.referente} ti richiama entro 24 ore lavorative.`,
                            `We need your name, phone, email and town; a couple of lines about your space help. We will arrange a site visit, free, as is the quote, and tell you what is possible, with timing and costs for the turnkey project. ${AZIENDA.referente} will call you back within 24 working hours.`,
                        )}
                    </p>
                    <div className="pg-recapiti">
                        <div>
                            <p className="pg-recapito-etichetta">{t('Referente', 'Contact person')}</p>
                            <p className="pg-recapito-valore">{AZIENDA.referente}</p>
                        </div>
                        <div>
                            <p className="pg-recapito-etichetta">{t('Telefono', 'Phone')}</p>
                            <BottoneTelefono className="pg-recapito-link" />
                        </div>
                        <BottoneWhatsApp className="btn btn-secondary pg-recapito-whatsapp">
                            WhatsApp {AZIENDA.telefono}
                        </BottoneWhatsApp>
                    </div>
                </div>
                <Suspense fallback={null}>
                    <ModuloPagina />
                </Suspense>
            </section>

            {/* Il ruolo di concessionario, per esteso: la tecnologia è della casa madre. */}
            <p className="pg-nota-brevetto">
                {t(
                    `La Tecnologia Rocks Design è brevettata da ${ROCKS_DESIGN.nome}. ${AZIENDA.nome} ne è concessionario autorizzato per la Sicilia, non l’inventrice.`,
                    `Rocks Design Technology is patented by ${ROCKS_DESIGN.nome}. ${AZIENDA.nome} is one of its authorised dealers in Sicily, not its inventor.`,
                )}
            </p>
        </div>
    )
}
