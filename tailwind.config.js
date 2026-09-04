/**
 * Sistema visivo del sito, ripreso dal blueprint approvato (index.html).
 * Tema scuro: fondo blu notte, testo chiaro, accento turchese —
 * il colore dell'acqua della piscina.
 * I nomi dei token sono in italiano come il resto del codice.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                /**
                 * Stessa palette di `src/nocturne.css`, che è la fonte di
                 * verità: le due vanno tenute allineate. Qui i nomi sono in
                 * italiano perché li usano le pagine di approfondimento.
                 */

                /** Fondo pagina e superfici */
                notte: {
                    DEFAULT: '#12202b',
                    800: '#2e434c',
                    900: '#1a2a33',
                },
                superficie: {
                    DEFAULT: '#1b2f3c',
                    alta: '#24404f',
                },
                testo: '#eef6f7',

                /** Rampa neutra, una sola scala di luminosità */
                neutro: {
                    100: '#f2f8f9',
                    200: '#e2eef0',
                    300: '#cbdfe3',
                    400: '#a9c5cb',
                    500: '#8aa8b0',
                    600: '#6f8b95',
                    700: '#526972',
                    800: '#2e434c',
                    900: '#1a2a33',
                },

                /** Accento: il turchese dell'acqua */
                accento: {
                    DEFAULT: '#38c6c0',
                    100: '#eefbfa',
                    200: '#d3f5f2',
                    300: '#a9ece7',
                    400: '#6fdcd5',
                    500: '#38c6c0',
                    600: '#22a49f',
                    700: '#1a8380',
                    800: '#14615f',
                    900: '#103f3f',
                },
            },
            fontFamily: {
                display: ['Inter', 'system-ui', 'sans-serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            fontSize: {
                // scala del blueprint
                eroe: ['58px', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
                sezione: ['40px', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
            },
            maxWidth: {
                prosa: '34em',
            },
            borderRadius: {
                md: '8px',
                lg: '14px',
            },
            boxShadow: {
                morbida: '0 24px 60px -28px rgba(0, 0, 0, 0.7)',
            },
        },
    },
    plugins: [],
}
