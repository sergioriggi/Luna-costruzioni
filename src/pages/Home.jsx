import Seo, { schemaAzienda, schemaFaq, schemaBriciole } from '../components/Seo'
import Foto from '../components/Foto'
import ModuloPagina from '../components/ModuloPagina'
import { AZIENDA, ROCKS_DESIGN } from '../data/site'
import { useLingua } from '../i18n/lingua'

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
        titolo: 'Numerosi progetti',
        titoloEn: 'Many projects',
        testo: 'Operativi da oltre un anno, con diversi cantieri eseguiti.',
        testoEn: 'Operating for over a year, with several jobs completed.',
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
        titoloEn: 'Site visit and design',
        testo: 'Veniamo sul posto, misuriamo e ascoltiamo. Dal rilievo nasce il disegno della vasca e di tutto il contorno.',
        testoEn: 'We come out, measure and listen. The survey becomes the drawing of the basin and its surroundings.',
    },
    {
        titolo: 'Scavi',
        titoloEn: 'Excavation',
        testo: 'Scavo e movimentazione terra li eseguiamo noi, con mezzi e maestranze dell’impresa.',
        testoEn: 'We carry out the digging and earthworks ourselves, with our own machines and crews.',
    },
    {
        titolo: 'Realizzazione',
        titoloEn: 'Construction',
        testo: 'Realizzazione in Tecnologia Rocks Design e finiture in pietra: la vasca prende la forma disegnata.',
        testoEn: 'Rocks Design Technology and stone finishes: the basin takes the shape it was drawn.',
    },
    {
        titolo: 'Messa in opera',
        titoloEn: 'Installation',
        testo: 'Filtrazione, illuminazione e allacciamenti installati e regolati sul posto.',
        testoEn: 'Filtration, lighting and connections installed and tuned on site.',
    },
    {
        titolo: 'Collaudo e consegna',
        titoloEn: 'Commissioning and handover',
        testo: 'Prove di tenuta e funzionamento, primo avviamento e istruzioni d’uso. La Piscina Rocks Design si consegna piena e pronta.',
        testoEn: 'Leak and function tests, first start-up and usage instructions. The pool is handed over full and ready.',
    },
]

/**
 * Mosaico delle realizzazioni: quindici inquadrature, con la prima, la quarta
 * e l'ultima a doppia colonna come nel file approvato.
 */
const MOSAICO = [
    { slug: 'oasi-aerea-sabbia-bianca', doppia: true },
    { slug: 'palme-e-monoliti' },
    { slug: 'ghiaietto-e-acqua-smeraldo' },
    { slug: 'spiaggia-di-sabbia-privata', doppia: true },
    { slug: 'villa-con-spiaggia-in-ghiaia' },
    { slug: 'solarium-in-legno' },
    { slug: 'riflessi-al-tramonto' },
    { slug: 'area-benessere-vista-alto' },
    { slug: 'bordo-in-legno-e-ciottoli' },
    { slug: 'giardino-tropicale' },
    { slug: 'acqua-turchese-notturna' },
    { slug: 'oasi-con-pontile-e-palme' },
    { slug: 'ombre-di-palme-sulla-sabbia' },
    { slug: 'blu-della-sera' },
    { slug: 'idromassaggio-naturale', doppia: true },
]

/** I quattro dubbi che fermano chi vuole una piscina. */
const DUBBI = [
    {
        domanda: '«Non so quanto costerà davvero.»',
        domandaEn: '“I have no idea what it will really cost.”',
        risposta:
            'Preventivo con voci separate per scavi, realizzazione, messa in opera e collaudo, redatto dopo il sopralluogo e firmato prima di iniziare. Nessuna voce «imprevisti» aperta. Il disbrigo delle pratiche, se lo affidi a noi, è una voce a parte: la vedi e decidi.',
        rispostaEn:
            'A quote itemised by excavation, construction, installation and commissioning, written after the site visit and signed before work starts. No open-ended contingency line. Permit paperwork, if you hand it to us, is a separate line you can see and decide on.',
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
            'Luna Costruzioni srl è concessionario per la Sicilia: restiamo sull’isola e il referente resta Luciano Naro, lo stesso del primo sopralluogo. Un numero, non un centralino.',
        rispostaEn:
            'Luna Costruzioni srl is the dealer for Sicily: we stay on the island and your contact stays Luciano Naro, the same person who came for the first visit. One number, not a call centre.',
    },
    {
        domanda: '«Sarà una vasca come tante.»',
        domandaEn: '“It will end up looking like every other pool.”',
        risposta:
            'La Tecnologia Rocks Design è brevettata e le forme non sono a catalogo: la vasca si disegna sul tuo giardino. Nelle realizzazioni qui sopra non ce ne sono due uguali.',
        rispostaEn:
            'Rocks Design Technology is patented and the shapes are not from a catalogue: the basin is drawn around your garden. No two projects above are the same.',
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
            'Dipende da dimensioni, accessibilità del giardino e finiture. Dopo il sopralluogo ricevi un preventivo con voci separate per scavi, realizzazione, messa in opera e collaudo: sai cosa paghi e per cosa.',
        rispostaEn:
            'It depends on size, garden access and finishes. After the site visit you get a quote itemised by excavation, construction, installation and commissioning: you know what you are paying for.',
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
            'Dipende dal tuo Comune, e la verifica fa parte del sopralluogo: te lo diciamo prima del preventivo, non dopo. Le pratiche possiamo seguirle noi — è un servizio a parte, che quotiamo separatamente e attivi solo se vuoi.',
        rispostaEn:
            'It depends on your municipality, and we check during the site visit: you know before the quote, not after. We can handle the paperwork for you — it is a separate service, quoted on its own, and entirely optional.',
    },
    {
        domanda: 'Va bene anche un giardino piccolo?',
        domandaEn: 'Does it work in a small garden?',
        risposta:
            'La forma non è a catalogo, quindi si adatta allo spazio che c’è. Il vincolo vero è l’accesso dei mezzi al giardino: lo valutiamo in sopralluogo e te lo diciamo subito.',
        rispostaEn:
            'The shape is not from a catalogue, so it adapts to the space you have. The real constraint is machine access to the garden: we assess it on site and tell you straight away.',
    },
    {
        domanda: 'Ci sono agevolazioni fiscali?',
        domandaEn: 'Are there tax breaks?',
        risposta:
            'Se rifai una piscina che hai già, sì: la detrazione IRPEF per ristrutturazioni vale il 50% sull’abitazione principale e il 36% sulle seconde case, entro 96.000 € per unità immobiliare, in 10 quote annuali. Su una piscina nuova in giardino, di norma, non spetta. Ne parliamo apertamente in sopralluogo.',
        rispostaEn:
            'If you are renovating a pool you already have, yes: the Italian renovation tax deduction is 50% on a main home and 36% on second homes, up to €96,000 per property, spread over ten years. On a brand-new garden pool it normally does not apply. We are upfront about this at the site visit.',
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
                titolo="Luna Costruzioni srl — Concessionario Autorizzato Piscine Rocks Design in Sicilia"
                descrizione="Luna Costruzioni srl, impresa edile e concessionario autorizzato Piscine Rocks Design per la Sicilia: progetto, scavi, realizzazione, messa in opera e collaudo chiavi in mano. Piscina espositiva visitabile in sede."
                percorso="/"
                schema={[
                    schemaAzienda(),
                    schemaFaq(DOMANDE.map(d => ({ domanda: d.domanda, risposta: d.risposta }))),
                    schemaBriciole([{ to: '/', label: 'Home' }]),
                ]}
            />

            {/* ─────────────────────────── apertura ─────────────────────────── */}
            <section id="top" className="pg-eroe">
                <Foto
                    slug="illuminazione-calda-sui-monoliti"
                    className="pg-eroe-foto"
                    sizes="100vw"
                    priority
                    alt="Piscina Rocks Design illuminata di sera, con i massi monolitici in luce calda"
                />
                <div className="pg-eroe-velo" />
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
                            'Luna Costruzioni srl è concessionario autorizzato Piscine Rocks Design per la Sicilia e, in quanto impresa edile, realizza la piscina in Tecnologia Rocks Design chiavi in mano: scavi, realizzazione, messa in opera e collaudo. Un solo interlocutore per tutto il cantiere.',
                            'Luna Costruzioni srl is the authorised Piscine Rocks Design dealer for Sicily and, as a building contractor, delivers your Rocks Design Technology pool turnkey: excavation, construction, installation and commissioning. One point of contact for the whole job.',
                        )}
                    </p>
                    <div className="pg-azioni">
                        <a className="btn btn-primary pg-btn-grande" href="#contatti">
                            {t('Richiedi un sopralluogo', 'Book a site visit')}
                        </a>
                        <a className="btn btn-secondary pg-btn-grande" href="#realizzazioni">
                            {t('Guarda le realizzazioni', 'See the projects')}
                        </a>
                    </div>
                </div>
            </section>

            {/* ────────────────────── fascia chiavi in mano ─────────────────── */}
            <div className="pg-fascia">
                <div className="pg-fascia-griglia">
                    {FASCIA.map(voce => (
                        <div key={voce.titolo}>
                            <p className="pg-fascia-titolo">{t(voce.titolo, voce.titoloEn)}</p>
                            <p className="pg-fascia-testo">{t(voce.testo, voce.testoEn)}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─────────────────── perché Piscine Rocks Design ──────────────── */}
            <section id="piscine" className="pg-sezione pg-piscine">
                <div>
                    <h6 className="pg-occhiello">
                        {t('Perché Piscine Rocks Design', 'Why Piscine Rocks Design')}
                    </h6>
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
                        sizes="(max-width: 900px) 100vw, 45vw"
                        alt="Piscina Rocks Design con bordo in pietra e pontile in legno"
                    />
                    {/* Direttiva Piscine Rocks Design: la piscina espositiva va
                        segnalata in prima pagina, con l'invito a venirci a trovare. */}
                    <figcaption>
                        {t(
                            'Piscina Rocks Design ultimata e in funzione. Vieni a trovarci presso la nostra sede.',
                            'A completed, working Piscine Rocks Design pool. Come and see ours at our premises.',
                        )}
                    </figcaption>
                </figure>
            </section>

            {/* ───────────────────────── chiavi in mano ─────────────────────── */}
            <section id="processo" className="pg-sezione pg-bordo">
                <h6 className="pg-occhiello">{t('Chiavi in mano', 'Turnkey')}</h6>
                <h2 className="pg-titolo" style={{ maxWidth: '22em' }}>
                    {t('Cinque fasi, un’unica impresa.', 'Five stages, one company.')}
                </h2>
                <p className="pg-intro" style={{ maxWidth: '42em' }}>
                    {t(
                        'Luna Costruzioni segue tutto il processo: non ci limitiamo a fornire la Piscina Rocks Design, la costruiamo. Scavi, realizzazione, messa in opera e collaudo restano nelle stesse mani, dal preventivo alla consegna.',
                        'Luna Costruzioni handles the whole process: we do not merely supply the pool, we build it. Excavation, construction, installation and commissioning all stay in the same hands, from quote to handover.',
                    )}
                </p>
                <div className="pg-celle pg-celle-strette">
                    {FASI.map((fase, i) => (
                        <div key={fase.titolo} className="pg-cella">
                            <p className="pg-numero">{String(i + 1).padStart(2, '0')}</p>
                            <p className="pg-cella-titolo">{t(fase.titolo, fase.titoloEn)}</p>
                            <p className="pg-cella-testo">{t(fase.testo, fase.testoEn)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ────────────────────────── realizzazioni ─────────────────────── */}
            <section id="realizzazioni" className="pg-sezione pg-bordo">
                <div className="pg-testata">
                    <div>
                        <h6 className="pg-occhiello">{t('Realizzazioni', 'Projects')}</h6>
                        <h2 className="pg-titolo" style={{ margin: 0, maxWidth: '20em' }}>
                            {t(
                                'Piscine Rocks Design ultimate, arredate e in funzione.',
                                'Piscine Rocks Design finished, furnished and running.',
                            )}
                        </h2>
                    </div>
                    <p className="pg-testata-nota">
                        {t('Ogni immagine è un progetto consegnato.', 'Every image is a delivered project.')}
                    </p>
                </div>
                <div className="pg-mosaico">
                    {MOSAICO.map(voce => (
                        <Foto
                            key={voce.slug}
                            slug={voce.slug}
                            className={voce.doppia ? 'pg-doppia' : ''}
                            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ))}
                </div>
            </section>

            {/* ───────────────────────── prima di decidere ──────────────────── */}
            <section id="dubbi" className="pg-sezione pg-bordo">
                <h6 className="pg-occhiello">{t('Prima di decidere', 'Before you decide')}</h6>
                <h2 className="pg-titolo" style={{ maxWidth: '21em' }}>
                    {t(
                        'Quattro dubbi fermano chi vuole una piscina. Li mettiamo sul tavolo subito.',
                        'Four doubts stop people from building a pool. We put them on the table first.',
                    )}
                </h2>
                <p className="pg-intro" style={{ maxWidth: '42em' }}>
                    {t(
                        'Non sono obiezioni da smontare: sono i motivi reali per cui un preventivo resta nel cassetto. A ciascuno rispondiamo con un impegno che finisce nero su bianco nel contratto.',
                        'These are not objections to argue away: they are the real reasons a quote stays in a drawer. To each we answer with a commitment that ends up in writing in the contract.',
                    )}
                </p>
                <div className="pg-celle pg-celle-larghe">
                    {DUBBI.map(d => (
                        <div key={d.domanda} className="pg-cella-larga">
                            <p className="pg-etichetta">{t('Il dubbio', 'The doubt')}</p>
                            <p className="pg-domanda">{t(d.domanda, d.domandaEn)}</p>
                            <p className="pg-etichetta pg-etichetta-accento">{t('La nostra risposta', 'Our answer')}</p>
                            <p className="pg-risposta">{t(d.risposta, d.rispostaEn)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ────────────────────────── hotel e resort ────────────────────── */}
            <section id="hotel" className="pg-sezione pg-bordo">
                <h6 className="pg-occhiello">{t('Hotel, resort e B&B', 'Hotels, resorts and guest houses')}</h6>
                <h2 className="pg-titolo" style={{ maxWidth: '22em' }}>
                    {t(
                        'Per una struttura ricettiva la piscina è la prima foto che il cliente guarda.',
                        'For a hospitality business, the pool is the first photo a guest looks at.',
                    )}
                </h2>
                <p className="pg-intro" style={{ maxWidth: '42em', marginBottom: 48 }}>
                    {t(
                        'Una Piscina Rocks Design non somiglia a nessun’altra vasca del territorio: è un motivo per scegliere la struttura e un contenuto che gira sui social dei tuoi ospiti. Lavoriamo con tempi e vincoli di chi deve restare aperto.',
                        'A Piscine Rocks Design pool looks like nothing else nearby: it is a reason to book and content your guests share. We work around the constraints of a business that has to stay open.',
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
                <a className="btn btn-primary pg-btn-grande" href="#contatti">
                    {t('Richiedi una proposta per la struttura', 'Request a proposal for your property')}
                </a>
            </section>

            {/* ───────────────────────── domande frequenti ──────────────────── */}
            <section id="faq" className="pg-sezione pg-bordo">
                <h6 className="pg-occhiello">{t('Domande frequenti', 'Frequently asked')}</h6>
                <h2 className="pg-titolo" style={{ marginBottom: 48, maxWidth: '20em' }}>
                    {t('Quello che ci chiedono al primo sopralluogo.', 'What people ask us on the first visit.')}
                </h2>
                <div className="pg-faq">
                    {DOMANDE.map(d => (
                        <details key={d.domanda}>
                            <summary>{t(d.domanda, d.domandaEn)}</summary>
                            <p>{t(d.risposta, d.rispostaEn)}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* ────────────────────────── zona operativa ────────────────────── */}
            <section id="sicilia" className="pg-sezione pg-bordo pg-sicilia">
                <figure>
                    <Foto
                        slug="verde-tropicale-sull-acqua"
                        className="pg-sicilia-foto"
                        sizes="(max-width: 900px) 100vw, 45vw"
                        alt="Piscina Rocks Design ultimata, con vegetazione affacciata sull’acqua"
                    />
                </figure>
                <div>
                    <h6 className="pg-occhiello">{t('Zona operativa', 'Where we work')}</h6>
                    <h2 className="pg-titolo">{t('Su tutta la Sicilia.', 'Across Sicily.')}</h2>
                    <p style={{ color: 'var(--color-neutral-300)', maxWidth: '34em', margin: '0 0 20px' }}>
                        {t(
                            'Luna Costruzioni srl è concessionario autorizzato Piscine Rocks Design per la Sicilia. Facciamo sopralluoghi e apriamo cantieri su tutta l’isola, per ville private e per strutture ricettive.',
                            'Luna Costruzioni srl is the authorised Piscine Rocks Design dealer for Sicily. We survey and build across the whole island, for private villas and for hotels and guest houses.',
                        )}
                    </p>
                    <p style={{ color: 'var(--color-neutral-400)', maxWidth: '34em', margin: '0 0 32px', fontSize: 14 }}>
                        {t(
                            'Il referente di cantiere è sempre lo stesso, dal primo sopralluogo al collaudo: si parla con una persona, non con un ufficio.',
                            'The same person follows the job from the first visit to commissioning: you talk to a person, not an office.',
                        )}
                    </p>
                    <a className="btn btn-primary pg-btn-grande" href="#contatti">
                        {t('Parlane con Luciano', 'Talk to Luciano')}
                    </a>
                </div>
            </section>

            {/* ─────────────────────────────  contatti ──────────────────────── */}
            <section id="contatti" className="pg-sezione pg-bordo pg-contatti">
                <div>
                    <h6 className="pg-occhiello">{t('Contatti', 'Contact')}</h6>
                    <h2 className="pg-titolo" style={{ maxWidth: '18em' }}>
                        {t('Raccontaci il giardino.', 'Tell us about the garden.')}
                    </h2>
                    <p style={{ color: 'var(--color-neutral-300)', maxWidth: '32em', margin: '0 0 36px' }}>
                        {t(
                            'Basta il comune e due righe sullo spazio che hai. Fissiamo un sopralluogo e ti diciamo cosa si può fare, con tempi e costi del progetto chiavi in mano.',
                            'Your town and a couple of lines about your space are enough. We will arrange a visit and tell you what is possible, with timing and costs for the turnkey project.',
                        )}
                    </p>
                    <div className="pg-recapiti">
                        <div>
                            <p className="pg-recapito-etichetta">{t('Referente', 'Contact person')}</p>
                            <p className="pg-recapito-valore">{AZIENDA.referente}</p>
                        </div>
                        <div>
                            <p className="pg-recapito-etichetta">{t('Telefono', 'Phone')}</p>
                            <a href={`tel:${AZIENDA.telefonoRaw}`} className="pg-recapito-link">
                                {AZIENDA.telefono}
                            </a>
                        </div>
                        <a
                            className="btn btn-secondary"
                            href={`https://wa.me/${AZIENDA.whatsapp}`}
                            target="_blank"
                            rel="noopener"
                            style={{ textDecoration: 'none', justifyContent: 'flex-start', padding: '10px 16px' }}
                        >
                            WhatsApp {AZIENDA.telefono}
                        </a>
                    </div>
                </div>
                <ModuloPagina />
            </section>

            {/* Il ruolo di concessionario, per esteso: la tecnologia è della casa madre. */}
            <p className="pg-sezione" style={{ padding: '0 40px 56px', margin: 0, fontSize: 12, color: 'var(--color-neutral-600)', maxWidth: '60em' }}>
                {t(
                    `La Tecnologia Rocks Design è brevettata da ${ROCKS_DESIGN.nome}. ${AZIENDA.nome} ne è concessionario autorizzato per la Sicilia, non l’inventrice.`,
                    `Rocks Design Technology is patented by ${ROCKS_DESIGN.nome}. ${AZIENDA.nome} is its authorised dealer for Sicily, not its inventor.`,
                )}
            </p>
        </div>
    )
}
