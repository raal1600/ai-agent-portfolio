import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import { metadata, root } from './metadata.mjs'

metadata({ check: true })
const destination = resolve(root, 'dist')
const marker = resolve(destination, '.portfolio-build')
// Never clear an unknown output directory, symlink, or user-supplied path.
if (destination !== resolve(root) + sep + 'dist') throw new Error('Invalid build path')
if (existsSync(destination)) {
  if (lstatSync(destination).isSymbolicLink() || !lstatSync(destination).isDirectory()) throw new Error('dist must be a regular directory')
  if (readdirSync(destination).length && (!existsSync(marker) || readFileSync(marker, 'utf8') !== 'ai-agent-portfolio build output\n')) throw new Error('Refusing to replace an unrecognized dist directory')
  rmSync(destination, { recursive: true })
}
mkdirSync(destination)
writeFileSync(marker, 'ai-agent-portfolio build output\n')
// Explicit public allowlist: no Git, tooling, local recordings, or test artifacts.
for (const path of ['index.html', 'work.html', 'projects', 'assets', 'evidence', 'sitemap.xml', 'robots.txt']) {
  cpSync(resolve(root, path), resolve(destination, path), { recursive: true, filter: source => {
    if (lstatSync(source).isSymbolicLink()) throw new Error(`Symlink in public files: ${source}`)
    return true
  } })
}
console.log('Static site built in dist/. No deployment was performed.')
