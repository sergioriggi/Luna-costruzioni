/**
 * Il punto di rottura fra telefono e schermo largo per le foto d'apertura.
 *
 * Lo usano due file che non devono mai essere in disaccordo: `Foto.jsx`, per
 * la <source> del ritaglio verticale, e `scripts/prerender.mjs`, per le due
 * precariche nel <head>. È lo stesso valore dei `@media (max-width: 900px)`
 * di `.pg-eroe` in pagina.css, dove il velo diventa verticale.
 */
export const SCHERMO_STRETTO = '(max-width: 900px)'

/** Il complemento esatto: le due precariche non devono mai valere insieme. */
export const SCHERMO_LARGO = '(min-width: 901px)'

/**
 * `sizes` della foto d'apertura della home. La usano `Home.jsx` sull'<img> e
 * `scripts/prerender.mjs` sulla precarica nel <head>: se non coincidono il
 * browser sceglie due larghezze diverse e scarica la foto due volte, proprio
 * sull'LCP. Fino all'apertura divisa era `100vw` per entrambe.
 */
export const FOTO_APERTURA_SIZES = '(max-width: 900px) 100vw, 52vw'
