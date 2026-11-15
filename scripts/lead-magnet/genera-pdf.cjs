/**
 * Rende la lista del lead magnet in PDF:
 *   node scripts/lead-magnet/genera-pdf.cjs
 *
 * Fonte: lista-sopralluogo.html in questa cartella (testo controllato il
 * 9/11/2026, non si riscrive qui). Font e copertina stanno accanto all'HTML.
 * Uscita: public/download/lista-sopralluogo-piscina-sicilia.pdf, servito così
 * com'è; robots.txt tiene /download/ fuori dai motori di ricerca.
 *
 * Serve Playwright con Chromium, che NON è una dipendenza del sito: il PDF si
 * rigenera a mano quando cambia il testo, non a ogni build.
 */
const path = require('path')
const { chromium } = require('playwright')

const SORGENTE = path.join(__dirname, 'lista-sopralluogo.html')
const USCITA = path.join(__dirname, '..', '..', 'public', 'download', 'lista-sopralluogo-piscina-sicilia.pdf')

;(async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('file://' + SORGENTE, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({ path: USCITA, format: 'A4', printBackground: true, preferCSSPageSize: true })
    await browser.close()
    console.log('✓', path.relative(process.cwd(), USCITA))
})()
