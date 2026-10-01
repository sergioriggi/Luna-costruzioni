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
