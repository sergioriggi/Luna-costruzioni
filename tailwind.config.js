/**
 * Sistema visivo del sito, ripreso dal blueprint approvato (index.html).
 * Tema scuro: fondo indaco profondo, testo chiaro, accento tenue.
 * I nomi dei token sono in italiano come il resto del codice.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                /** Fondo pagina e superfici */
                notte: {
                    DEFAULT: '#161826',
                    800: '#292b31',
                    900: '#101220',
                },
                superficie: {
                    DEFAULT: '#232532',
                    alta: '#2b2e3d',
                },
                testo: '#e9e9ed',

                /** Rampa neutra, una sola scala di luminosità */
                neutro: {
                    100: '#f3f5fe',
                    200: '#e4e7f5',
                    300: '#cfd3e5',
                    400: '#b2b6ca',
                    500: '#9397ab',
                    600: '#75798c',
                    700: '#595d6c',
                    800: '#3f424d',
                    900: '#292b31',
                },

                /** Accento */
                accento: {
                    DEFAULT: '#9184d9',
                    100: '#f5f4ff',
                    200: '#e7e5fe',
                    300: '#d2cefd',
                    400: '#b5abfc',
                    500: '#968ae0',
                    600: '#796cbf',
                    700: '#5d5294',
                    800: '#423a6a',
                    900: '#2b2741',
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
