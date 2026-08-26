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
            className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition
                        ${compatto ? 'hover:bg-sabbia-100' : 'bg-sabbia-100 ring-1 ring-sabbia-300/70 hover:bg-sabbia-200/80'} ${className}`}
        >
            <img
                src="/brand/rocks-design-logo.png"
                width="900"
                height="188"
                alt="Piscine Rocks Design — logo ufficiale"
                className={compatto ? 'h-5 w-auto sm:h-6' : 'h-9 w-auto sm:h-10'}
            />
            <span className={`hidden leading-tight ${compatto ? '2xl:block' : 'sm:block'}`}>
                <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-pietra-400">
                    Concessionario autorizzato
                </span>
                <span className="block text-[0.72rem] font-medium text-pietra-600">
                    {compatto ? `Piscine Rocks Design · ${AZIENDA.zona}` : `${AZIENDA.zona} · ${AZIENDA.nome}`}
                </span>
            </span>
        </a>
    )
}
