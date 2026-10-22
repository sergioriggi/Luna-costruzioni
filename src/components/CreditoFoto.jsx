import { useLingua } from '../i18n/lingua'

/**
 * La riga fissa che dice di chi sono le piscine nelle fotografie.
 *
 * Tutte le foto di piscine del sito sono piscine espositive di Piscine Rocks
 * Design in Lombardia, usate su licenza. Nessuna foto, didascalia o titolo
 * deve farle passare per lavori di Luna (e il sito non dice mai né che Luna ha
 * realizzato piscine in Sicilia né che non le ha realizzate: Sergio, 22/10/2026). Questa riga accompagna ogni foto o gruppo di foto di
 * piscine, sempre con le stesse parole: così non dipende da chi scriverà la
 * prossima didascalia.
 *
 * Non va sulle foto che non mostrano piscine (i campioni di sabbia).
 *
 * `data-credito-foto` serve a scripts/misura-ripetizioni.mjs: è una ripetizione
 * voluta, come il riquadro finale di contatto, e non va contata.
 */
export default function CreditoFoto({ className = '' }) {
    const { t } = useLingua()
    return (
        <p className={`credito-foto ${className}`.trim()} data-credito-foto="">
            {t('Piscine espositive Piscine Rocks Design, in Lombardia.', 'Piscine Rocks Design display pools, in Lombardy.')}
        </p>
    )
}
