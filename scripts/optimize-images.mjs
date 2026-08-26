import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const publicDir = path.resolve('./public')
const srcPaths = [
  // hero and a selection of gallery images — adjust as needed
  'public/foto/Immagine WhatsApp 2025-07-24 ore 20.05.57_45dce3cd.jpg',
  'public/foto/Immagine WhatsApp 2025-07-24 ore 20.05.57_50de26eb.jpg',
  'public/foto/Immagine WhatsApp 2025-07-24 ore 20.05.57_abd63650.jpg',
  '/public/catalogo/0001.jpg',
  '/public/catalogo/0002.jpg',
  '/public/catalogo/0003.jpg'
]

async function ensureDir(dir){
  try{ await fs.mkdir(dir, { recursive: true }) }catch(e){}
}

function basename(p){
  return path.basename(p).replace(/\s+/g, '_')
}

async function optimize(){
  const outDir = path.join(publicDir, 'optimized')
  await ensureDir(outDir)

  for(const rel of srcPaths){
    const src = rel.startsWith('/') ? rel.slice(1) : rel
    const full = path.resolve(src)
    try{
      await fs.access(full)
    }catch(e){
      console.warn('skip (not found):', full)
      continue
    }
    const name = basename(full)
    const out = path.join(outDir, name)
    console.log('Optimizing', full, '→', out)
    await sharp(full)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(out)
  }
  console.log('Optimized images written to', path.join('public','optimized'))
}

optimize().catch(err=>{ console.error(err); process.exit(1) })
