import { ROCKS_DESIGN, AZIENDA } from '../data/site'

/**
 * Logo «Concessionario Autorizzato Piscine Rocks Design».
 *
 * Direttiva marketing Rocks Design: il logo va inserito nella fascia
 * superiore del sito (zona menu) e deve linkare alla pagina ufficiale
 * Piscine Rocks Design, indicando la zona di riferimento.
 */
export default function BadgeConcessionario({ compatto = false, className = '' }) {
    return (
        <a
            href={ROCKS_DESIGN.sito}
            target="_blank"
            rel="noopener"
            title={`Sito ufficiale ${ROCKS_DESIGN.nome} — ${AZIENDA.nome} è concessionario autorizzato per la ${AZIENDA.zona}`}
            className={`group flex items-center gap-2.5 rounded-xl bg-sabbia-100 px-3 py-1.5 ring-1 ring-sabbia-300/70
                        transition hover:bg-sabbia-200/80 hover:ring-sabbia-400 ${className}`}
        >
            <img
                src="/brand/rocks-design-logo.png"
                width="900"
                height="188"
                alt="Piscine Rocks Design — logo ufficiale"
                className={compatto ? 'h-7 w-auto sm:h-8' : 'h-9 w-auto sm:h-10'}
            />
            <span className={`hidden border-l border-sabbia-400/70 pl-3 leading-tight ${compatto ? 'xl:block' : 'sm:block'}`}>
                <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-pietra-500">
                    Concessionario autorizzato
                </span>
                <span className="block text-[0.78rem] font-semibold text-pietra-800">
                    {compatto ? AZIENDA.zona : `${AZIENDA.zona} · ${AZIENDA.nome}`}
                </span>
            </span>
        </a>
    )
}
