import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { join, extname, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const confDir = join(root, 'public', 'conference')
const outFile = join(root, 'content', 'conference-photos.json')

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

async function listImages(dir, base) {
  const results = []
  let entries = []
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return results
  }
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await listImages(full, base)
      results.push(...nested)
    } else if (entry.isFile() && IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
      results.push(relative(base, full).split('\\').join('/'))
    }
  }
  return results.sort()
}

async function main() {
  const manifest = {}
  let folders = []
  try {
    folders = await readdir(confDir, { withFileTypes: true })
  } catch {
    folders = []
  }
  for (const folder of folders) {
    if (!folder.isDirectory()) continue
    const countryKey = folder.name
    const base = join(confDir, countryKey)
    manifest[countryKey] = await listImages(base, base)
  }
  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
  const counts = Object.entries(manifest)
    .map(([k, v]) => `${k}: ${v.length}`)
    .join(', ')
  console.log(`[scan-conference-photos] wrote ${outFile} (${counts})`)
}

main().catch((err) => {
  console.error('[scan-conference-photos] failed:', err)
  process.exit(1)
})
