// Assemble both required branches into ONE artifact; never publish only one side.
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { metadata, root } from './metadata.mjs'
import config from '../site.config.mjs'

const publicPaths = ['index.html', 'assets', 'projects', 'evidence']
const optionalPaths = ['work.html', 'sitemap.xml', 'robots.txt', '404.html', '.nojekyll']
const markerText = 'ai-agent-portfolio combined Pages output\n'

function filesBelow(directory) {
  const stat = lstatSync(directory)
  if (stat.isSymbolicLink()) throw new Error(`Public source contains a symlink: ${directory}`)
  if (!stat.isDirectory()) return [directory]
  return readdirSync(directory).flatMap(name => filesBelow(resolve(directory, name)))
}

function publicFiles(directory) {
  for (const path of publicPaths) {
    if (!existsSync(resolve(directory, path))) throw new Error(`Required branch content missing: ${path}`)
  }
  return [...publicPaths, ...optionalPaths.filter(path => existsSync(resolve(directory, path)))].flatMap(path => filesBelow(resolve(directory, path)))
}

export function assemblePages(mainDirectory, customerDirectory = root) {
  if (!mainDirectory) throw new Error('A checkout of main is required; pass its directory as the argument')
  const main = resolve(mainDirectory)
  const customer = resolve(customerDirectory)
  if (main === customer) throw new Error('Main and customer must be separate checkouts')
  if (existsSync(resolve(main, 'preview'))) throw new Error('main already owns /preview/; refusing to replace it')
  // Validate BOTH sources before touching a previous output directory.
  const mainFiles = publicFiles(main)
  const customerFiles = publicFiles(customer)
  for (const page of config.pages) {
    if (!existsSync(resolve(customer, page.path))) throw new Error(`Customer page missing: ${page.path}`)
  }
  const destination = resolve(customer, 'pages-dist')
  const marker = resolve(destination, '.portfolio-pages-build')
  if (destination !== customer + sep + 'pages-dist') throw new Error('Invalid Pages build path')
  if (existsSync(destination)) {
    if (lstatSync(destination).isSymbolicLink() || !lstatSync(destination).isDirectory()) throw new Error('pages-dist must be a regular directory')
    if (readdirSync(destination).length && (!existsSync(marker) || readFileSync(marker, 'utf8') !== markerText)) throw new Error('Refusing to replace unrecognized pages-dist contents')
    rmSync(destination, { recursive: true })
  }
  mkdirSync(destination)
  writeFileSync(marker, markerText)
  const copy = (files, source, target) => {
    for (const file of files) {
      const output = resolve(target, relative(source, file))
      mkdirSync(dirname(output), { recursive: true })
      copyFileSync(file, output)
    }
  }
  copy(mainFiles, main, destination)
  const preview = resolve(destination, 'preview')
  copy(customerFiles, customer, preview)
  // Rewrite only the EXPORTED preview metadata, never either branch's source.
  metadata({ directory: preview, url: new URL('preview/', config.url).href })
  // Preview remains accessible for review without competing with the public site in search.
  for (const file of filesBelow(preview).filter(file => file.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8').replace(/<meta\s+name="robots"[^>]*>\s*/g, '')
    writeFileSync(file, html.replace('</head>', '<meta name="robots" content="noindex, follow">\n</head>'))
  }
  // A review-only version should not advertise an indexable sitemap.
  rmSync(resolve(preview, 'sitemap.xml'))
  rmSync(resolve(preview, 'robots.txt'))
  if (!existsSync(resolve(destination, '.nojekyll'))) writeFileSync(resolve(destination, '.nojekyll'), '')
  // Refuse to finish if the existing root files changed during assembly.
  for (const file of mainFiles) {
    if (!readFileSync(file).equals(readFileSync(resolve(destination, relative(main, file))))) throw new Error(`Main file changed: ${relative(main, file)}`)
  }
  console.log(`Combined Pages output: ${mainFiles.length} preserved main files at /; ${customerFiles.length} customer files under /preview/.`)
  return destination
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) assemblePages(process.argv[2])
