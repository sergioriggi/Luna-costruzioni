import { Link } from '../lib/instradamento'
import { useLingua } from '../i18n/lingua'

/** L'indirizzo della pagina del lead magnet, in un posto solo. */
export const PERCORSO_LISTA = '/guida/lista-sopralluogo'

/**
 * Il riquadro del lead magnet: in fondo a ogni articolo della guida (prima
 * delle fonti) e nella pagina /guida. Uno solo, così nessun articolo resta
 * senza e il testo non diverge da una pagina all'altra.
 *
 * Per chi non è pronto a chiedere un preventivo: la lista in PDF in cambio di
 * nome, e-mail e comune (pagina /guida/lista-sopralluogo).
 */
export default function RiquadroListaSopralluogo({ className = '' }) {
    const { t } = useLingua()
    return (
        <aside
            className={`rounded-lg border border-testo/16 bg-superficie px-6 py-6 sm:px-8 ${className}`.trim()}
            aria-label={t('Lista da compilare prima del sopralluogo', 'Checklist to fill in before the site survey')}
            data-riquadro-lista=""
        >
            <p className="occhiello">{t('PDF da compilare', 'PDF to fill in')}</p>
            <p className="mt-3 font-display text-xl leading-snug text-testo sm:text-2xl">
                {t('Prima di chiamare un tecnico, prendi le misure', 'Before you call a surveyor, take the measurements')}
            </p>
            <p className="testo-lungo mt-3">
                {t(
                    'Cinque pagine con i permessi da verificare, le distanze dal confine, l’accesso dei mezzi, le domande da fare a chi ti fa un preventivo e una scheda del giardino da compilare.',
                    'Five pages, in Italian, on the permits to check, distances from the boundary, access for the machines, the questions to ask whoever quotes you, and a garden form to fill in.',
                )}
            </p>
            <Link to={PERCORSO_LISTA} className="bottone-pieno mt-5 inline-flex min-h-[44px]">
                {t('Scarica la lista', 'Get the checklist')}
            </Link>
        </aside>
    )
}
