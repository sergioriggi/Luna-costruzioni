import { createContext, useId, useCallback, useContext, useEffect, useMemo, useState } from 'react'

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
    //
    // `?lang=en` (o `?lang=it`) nell'indirizzo vince sulla scelta salvata e la
    // salva. Serve alle email in inglese per agenzie e proprietari stranieri:
    // un link a www.lunacostruzioni.it si apriva in italiano, e il visitatore
    // doveva trovare da solo il selettore IT · EN. Il parametro poi si toglie
    // dall'indirizzo (se la scelta è salvata), così non finisce in condivisioni
    // o statistiche.
    useEffect(() => {
        const dallIndirizzo = linguaDallIndirizzo()
        if (dallIndirizzo) {
            impostaLingua(dallIndirizzo)
            // Il parametro si toglie solo se la scelta è salvata: senza storage
            // resta nell'indirizzo, così una ricarica riapre la stessa lingua.
            try {
                localStorage.setItem(CHIAVE, dallIndirizzo)
                togliParametroLingua()
            } catch { /* storage non disponibile: il parametro resta */ }
            return
        }
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

/** `it` o `en` dal parametro `lang` dell'indirizzo, altrimenti null. */
export function linguaDallIndirizzo(search = typeof window !== 'undefined' ? window.location.search : '') {
    try {
        const valore = new URLSearchParams(search).get('lang')
        const codice = valore ? valore.trim().toLowerCase().slice(0, 2) : ''
        return codice === 'en' || codice === 'it' ? codice : null
    } catch {
        return null
    }
}

function togliParametroLingua() {
    try {
        const url = new URL(window.location.href)
        url.searchParams.delete('lang')
        window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
    } catch { /* ignorato */ }
}

export function useLingua() {
    return useContext(ContestoLingua)
}

/**
 * Selettore di lingua: il gruppo `.seg` del file approvato.
 *
 * Compare due volte nella stessa pagina (testata e piè), quindi ogni copia ha
 * il suo `name`: con lo stesso nome i due gruppi di radio diventerebbero uno
 * solo e scegliere in uno toglierebbe la spunta dall'altro. `compatto` mostra
 * «IT · EN» per la testata; il nome per esteso resta nell'etichetta accessibile.
 */
export function SelettoreLingua({ className = '', compatto = false }) {
    const { lingua, setLingua } = useLingua()
    const nome = `lingua-${useId()}`
    const opzioni = [
        { codice: 'it', etichetta: 'Italiano', breve: 'IT' },
        { codice: 'en', etichetta: 'English', breve: 'EN' },
    ]

    return (
        <div className={`seg ${compatto ? 'seg-compatto' : ''} ${className}`.trim()} role="group" aria-label="Lingua / Language">
            {opzioni.map(o => (
                <label key={o.codice} className="seg-opt" lang={o.codice}>
                    <input
                        type="radio"
                        name={nome}
                        value={o.codice}
                        checked={lingua === o.codice}
                        onChange={() => setLingua(o.codice)}
                        aria-label={compatto ? o.etichetta : undefined}
                    />
                    {compatto ? o.breve : o.etichetta}
                </label>
            ))}
        </div>
    )
}
