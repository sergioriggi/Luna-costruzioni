/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // sabbia: la palette del catalogo Rocks Design
                sabbia: {
                    50: '#FBF8F3',
                    100: '#F5EFE6',
                    200: '#EDE3D4',
                    300: '#E0D2BC',
                    400: '#CDB99B',
                    500: '#B99C75',
                },
                // pietra: testi e superfici
                pietra: {
                    50: '#F7F6F4',
                    100: '#EDEBE7',
                    200: '#DCD8D1',
                    300: '#C2BBB0',
                    400: '#9A9084',
                    500: '#7A7065',
                    600: '#5D544B',
                    700: '#453E37',
                    800: '#2F2A25',
                    900: '#1C1916',
                },
                // acqua: il turchese delle vasche
                acqua: {
                    50: '#EFFAF9',
                    100: '#D5F2F0',
                    200: '#ABE5E2',
                    300: '#74D1CE',
                    400: '#3EB6B4',
                    500: '#249A99',
                    600: '#187C7C',
                    700: '#136463',
                    800: '#124F4F',
                    900: '#0F4142',
                },
                oro: {
                    400: '#C9A96A',
                    500: '#B08D57',
                },
            },
            fontFamily: {
                display: ['Marcellus', 'Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            maxWidth: {
                prosa: '68ch',
            },
            boxShadow: {
                morbida: '0 24px 60px -28px rgba(28, 25, 22, 0.35)',
            },
        },
    },
    plugins: [],
}
