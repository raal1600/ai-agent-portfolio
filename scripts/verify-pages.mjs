import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { root } from './metadata.mjs'
import config from '../site.config.mjs'

export function verifyPages(directory = resolve(root, 'pages-dist')) {
  const base = resolve(directory)
  assert(existsSync(resolve(base, 'index.html')), 'Main homepage is required')
  assert(existsSync(resolve(base, 'preview/index.html')), 'Customer homepage is required')
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(resolve(dir, entry.name)) : [resolve(dir, entry.name)])
  const files = walk(base)
  let links = 0
  for (const file of files.filter(file => file.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8')
    const isPreview = relative(base, file).startsWith('preview' + sep)
    if (isPreview) assert(html.includes('<meta name="robots" content="noindex, follow">'), `Unmarked preview: ${file}`)
    for (const match of html.matchAll(/<(?:a|link|img|source|track|script)\b[^>]*?\b(?:href|src)="([^"<>]+)"/g)) {
      const href = match[1].replaceAll('&amp;', '&')
      if (/^(https?:|data:|mailto:)/.test(href)) continue
      const url = new URL(href, `https://local.invalid/${relative(base, file).replaceAll('\\', '/')}`)
      let target = resolve(base, '.' + decodeURIComponent(url.pathname))
      assert(target.startsWith(base + sep), `Link escapes artifact: ${href}`)
      assert(existsSync(target), `Broken link in ${relative(base, file)}: ${href}`)
      if (statSync(target).isDirectory()) target = resolve(target, 'index.html')
      if (url.hash && target.endsWith('.html')) assert(readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing fragment: ${href}`)
      if (isPreview) assert(relative(base, target).startsWith('preview' + sep), `Preview link unexpectedly leaves its version: ${href}`)
      links++
    }
  }
  for (const page of config.pages) {
    const html = readFileSync(resolve(base, 'preview', page.path), 'utf8')
    const expected = new URL(page.path === 'index.html' ? '' : page.path, new URL('preview/', config.url)).href
    assert(html.includes(`<link rel="canonical" href="${expected}">`), `Preview canonical: ${page.path}`)
    assert(html.includes(`<meta property="og:url" content="${expected}">`), `Preview social URL: ${page.path}`)
  }
  for (const path of ['.git', '.github', 'node_modules', 'scripts', 'docs', 'site.config.mjs', '.env']) {
    assert(!existsSync(resolve(base, path)), `Development files in root: ${path}`)
    assert(!existsSync(resolve(base, 'preview', path)), `Development files in preview: ${path}`)
  }
  console.log(`PASS: both versions present; ${files.filter(file => file.endsWith('.html')).length} HTML pages and ${links} local links/assets/fragments; preview URLs and noindex; no development directories.`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) verifyPages(process.argv[2])
