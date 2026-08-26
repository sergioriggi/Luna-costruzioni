import { ROCKS_DESIGN, AZIENDA } from '../data/site'
import { useLingua } from '../i18n/lingua'

/**
 * Marchio «Concessionario Autorizzato Piscine Rocks Design».
 *
 * Direttiva marketing Rocks Design: il logo va nella fascia superiore del sito
 * (zona menu) e deve linkare alla pagina ufficiale, indicando la zona di
 * riferimento. Sul fondo scuro il logo — oro su trasparente — viene posato su
 * una placchetta chiara, la stessa resa che ha sui materiali della casa madre.
 */
export default function BadgeConcessionario({ className = '' }) {
    const { t } = useLingua()

    return (
        <a
            href={ROCKS_DESIGN.sito}
            target="_blank"
            rel="noopener"
            title={`${ROCKS_DESIGN.nome} — sito ufficiale. ${AZIENDA.nome} è concessionario autorizzato per la ${AZIENDA.zona}`}
            className={`flex shrink-0 items-center gap-2.5 rounded-md border border-accento-700 bg-accento/[0.08] px-2.5 py-1.5
                        no-underline transition hover:bg-accento/[0.16] ${className}`}
        >
            <span className="rounded-[5px] bg-[#F5EFE6] px-1.5 py-1">
                <img
                    src="/brand/rocks-design-logo.png"
                    width="900"
                    height="188"
                    alt={`${ROCKS_DESIGN.nome} — logo ufficiale`}
                    className="h-[13px] w-auto"
                />
            </span>
            <span className="flex flex-col gap-px leading-tight">
                <span className="text-[9px] uppercase tracking-[0.14em] text-accento-300">
                    {t('Concessionario autorizzato', 'Authorised dealer')} · {AZIENDA.zona}
                </span>
                <span className="font-display text-[13px] tracking-[0.04em] text-testo">
                    {ROCKS_DESIGN.nome}
                </span>
            </span>
        </a>
    )
}
