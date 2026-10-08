"""
Misura i valori di src/fonts-riserva.css per il carattere del sito.

Il carattere di riserva (Arial / Liberation Sans, oppure DejaVu Sans) si
riscala perché occupi lo stesso spazio del carattere vero mentre questo non è
ancora arrivato: così al cambio (`font-display: swap`) il testo non va a capo
in punti diversi e la pagina non salta.

  size-adjust      = larghezza media del carattere / larghezza della riserva,
                     misurata su un brano dei testi del sito al peso 400
  ascent-override  = ascendente del carattere / unità per em / size-adjust
  descent-override = discendente del carattere / unità per em / size-adjust

Serve fontTools (pip install fonttools brotli). Uso:

  python3 scripts/misura-riserva.py src/fonts-woff2/geist-latin.woff2
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

BRANO = (
    'La tua Piscina Rocks Design, dal primo scavo al primo bagno. '
    'Luna Costruzioni S.r.l.s. è concessionario autorizzato Piscine Rocks Design '
    'per la Sicilia e, in quanto impresa edile, realizza la piscina chiavi in mano: '
    'scavi, realizzazione, messa in opera e collaudo. Si entra camminando, come al '
    'mare: il fondo digrada dolcemente e sotto i piedi c’è sabbia vera. Chiedi un '
    'preventivo, ti richiamiamo entro 24 ore lavorative. Prezzo a partire da 1.250 € '
    'al metro quadrato, IVA esclusa.'
)

RISERVE = {
    'Arial / Liberation Sans': '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    'DejaVu Sans': '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
}


def larghezza_media(font):
    cmap = font.getBestCmap()
    metriche = font['hmtx'].metrics
    upm = font['head'].unitsPerEm
    totale = sum(metriche[cmap[ord(c)]][0] for c in BRANO if ord(c) in cmap)
    return totale / upm / len(BRANO)


def main(percorso):
    font = TTFont(percorso)
    if 'fvar' in font:
        font = instantiateVariableFont(font, {'wght': 400})
    upm = font['head'].unitsPerEm
    hhea = font['hhea']
    vero = larghezza_media(font)
    for nome, file in RISERVE.items():
        scala = vero / larghezza_media(TTFont(file))
        print(f'{nome}:')
        print(f'    size-adjust: {scala * 100:.2f}%;')
        print(f'    ascent-override: {hhea.ascent / upm / scala * 100:.2f}%;')
        print(f'    descent-override: {abs(hhea.descent) / upm / scala * 100:.2f}%;')
        print(f'    line-gap-override: 0%;')


if __name__ == '__main__':
    main(sys.argv[1])
