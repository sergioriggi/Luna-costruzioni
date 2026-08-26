import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const publicDir = path.resolve('./public')

// scan public/catalogo and public/foto for images
async function collectSourcePaths(){
  const dirs = [path.join(publicDir,'catalogo'), path.join(publicDir,'foto')]
  const files = []
  for(const d of dirs){
    try{
      const items = await fs.readdir(d)
      for(const it of items){
        const full = path.join(d,it)
        const stat = await fs.stat(full)
        if(stat.isFile() && /\.(jpe?g|png)$/i.test(it)) files.push(full)
      }
    }catch(e){
      // ignore missing dirs
    }
  }
  return files
}

async function ensureDir(dir){
  try{ await fs.mkdir(dir, { recursive: true }) }catch(e){}
}

function basename(p){
  return path.basename(p).replace(/\s+/g, '_')
}

async function optimize(){
  const outDir = path.join(publicDir, 'optimized')
  await ensureDir(outDir)

  const srcFiles = await collectSourcePaths()
  for(const full of srcFiles){
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
