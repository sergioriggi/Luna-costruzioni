/**
 * Segnalazione della conversione a Google Ads dal server (API REST, senza
 * dipendenze: `fetch` c'è in Node 20+).
 *
 * Il server la chiama dopo aver spedito la richiesta di contatto, solo se il
 * modulo ha portato un `gclid`. Il browser lo porta soltanto a chi ha dato il
 * consenso (`src/lib/clic-annuncio.js`), quindi qui non c'è un secondo
 * controllo possibile: si dichiara a Google, nel campo `consent`, ciò che il
 * browser ha già garantito. Se si cambiasse il browser per mandare il `gclid`
 * anche senza consenso, questo file smetterebbe di dire il vero.
 *
 * Non tocca mai la risposta al visitatore e non lancia: ogni esito è una riga
 * di registro senza dati personali (né `gclid`, né indirizzi, né nomi).
 */

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const TIMEOUT_MS = 8000

/** `2026-10-23 12:05:09+00:00`, il formato che l'API vuole per `conversionDateTime`. */
function istante(data) {
    const p = n => String(n).padStart(2, '0')
    return `${data.getUTCFullYear()}-${p(data.getUTCMonth() + 1)}-${p(data.getUTCDate())} ` +
        `${p(data.getUTCHours())}:${p(data.getUTCMinutes())}:${p(data.getUTCSeconds())}+00:00`
}

export function creaSegnalatoreAds(configurazione, { fetchImpl = fetch, adesso = () => new Date() } = {}) {
    if (!configurazione.adsAttivo) return async () => ({ stato: 'disattivo' })
    const ads = configurazione.ads

    let accesso = { token: '', scade: 0 }

    async function tokenDiAccesso() {
        if (accesso.token && Date.now() < accesso.scade - 60_000) return accesso.token
        const r = await fetchImpl(TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: ads.clientId,
                client_secret: ads.clientSecret,
                refresh_token: ads.refreshToken,
            }),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        })
        const corpo = await r.json().catch(() => ({}))
        if (!r.ok || !corpo.access_token) throw new Error(`oauth ${r.status} ${corpo.error ?? ''}`.trim())
        accesso = { token: corpo.access_token, scade: Date.now() + (corpo.expires_in ?? 3600) * 1000 }
        return accesso.token
    }

    return async function segnala({ gclid, idConversione }) {
        try {
            const token = await tokenDiAccesso()
            const intestazioni = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'developer-token': ads.developerToken,
            }
            if (ads.loginCustomerId) intestazioni['login-customer-id'] = ads.loginCustomerId

            const r = await fetchImpl(
                `https://googleads.googleapis.com/${ads.versioneApi}/customers/${ads.customerId}:uploadClickConversions`,
                {
                    method: 'POST',
                    headers: intestazioni,
                    body: JSON.stringify({
                        conversions: [{
                            gclid,
                            conversionAction: ads.azioneConversione,
                            conversionDateTime: istante(adesso()),
                            conversionValue: ads.valore,
                            currencyCode: 'EUR',
                            ...(idConversione ? { orderId: idConversione } : {}),
                            consent: { adUserData: 'GRANTED', adPersonalization: 'GRANTED' },
                        }],
                        partialFailure: true,
                        validateOnly: ads.soloConvalida,
                    }),
                    signal: AbortSignal.timeout(TIMEOUT_MS),
                },
            )
            const corpo = await r.json().catch(() => ({}))
            // Con `partialFailure` un rifiuto della singola conversione arriva
            // come 200 + `partialFailureError`: il solo `r.ok` direbbe il falso.
            const rifiuto = corpo.partialFailureError?.message ?? (r.ok ? '' : corpo.error?.message ?? `http ${r.status}`)
            if (rifiuto) {
                console.error(`[ads] conversione rifiutata: ${String(rifiuto).slice(0, 200)}`)
                return { stato: 'rifiutata' }
            }
            console.log(`[ads] conversione ${ads.soloConvalida ? 'convalidata (non registrata)' : 'segnalata'}`)
            return { stato: ads.soloConvalida ? 'convalidata' : 'segnalata' }
        } catch (errore) {
            console.error('[ads] segnalazione fallita:', errore.message)
            return { stato: 'errore' }
        }
    }
}
