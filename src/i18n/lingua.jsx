import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Bilingue italiano / inglese.
 *
 * L'italiano è la lingua del sito: è quella pre-renderizzata nell'HTML statico
 * e quindi quella che i motori di ricerca indicizzano. L'inglese è un comodo
 * cambio lato client per i clienti stranieri — molte richieste per hotel e ville
 * in Sicilia arrivano da fuori Italia.
 *
 * Uso:
 *   const { t } = useLingua()
 *   <h1>{t('Piscine su misura', 'Bespoke pools')}</h1>
 */

const CHIAVE = 'luna-lingua'
const ContestoLingua = createContext({ lingua: 'it', setLingua: () => {}, t: it => it })

export function FornitoreLingua({ children }) {
    const [lingua, impostaLingua] = useState('it')

    // La scelta si legge dopo l'idratazione: il markup statico è sempre italiano.
    useEffect(() => {
        try {
            const salvata = localStorage.getItem(CHIAVE)
            if (salvata === 'en' || salvata === 'it') impostaLingua(salvata)
        } catch { /* storage non disponibile */ }
    }, [])

    useEffect(() => {
        document.documentElement.lang = lingua
    }, [lingua])

    const setLingua = useCallback(nuova => {
        impostaLingua(nuova)
        try { localStorage.setItem(CHIAVE, nuova) } catch { /* ignorato */ }
    }, [])

    const valore = useMemo(
        () => ({
            lingua,
            setLingua,
            /** t(italiano, inglese) — se manca l'inglese resta l'italiano. */
            t: (it, en) => (lingua === 'en' && en !== undefined ? en : it),
        }),
        [lingua, setLingua],
    )

    return <ContestoLingua.Provider value={valore}>{children}</ContestoLingua.Provider>
}

export function useLingua() {
    return useContext(ContestoLingua)
}

/** Selettore di lingua, nello stile del blueprint. */
export function SelettoreLingua({ className = '' }) {
    const { lingua, setLingua } = useLingua()
    const opzioni = [
        { codice: 'it', etichetta: 'Italiano' },
        { codice: 'en', etichetta: 'English' },
    ]

    return (
        <div
            role="group"
            aria-label="Lingua / Language"
            className={`inline-flex overflow-hidden rounded-md border border-testo/[0.16] ${className}`}
        >
            {opzioni.map((o, i) => (
                <button
                    key={o.codice}
                    type="button"
                    lang={o.codice}
                    onClick={() => setLingua(o.codice)}
                    aria-pressed={lingua === o.codice}
                    className={`px-3 py-1.5 text-[13px] transition ${i > 0 ? 'border-l border-testo/[0.16]' : ''} ${
                        lingua === o.codice
                            ? 'text-accento shadow-[inset_0_0_0_1px_#9184d9]'
                            : 'text-neutro-400 hover:bg-testo/[0.07]'
                    }`}
                >
                    {o.etichetta}
                </button>
            ))}
        </div>
    )
}
