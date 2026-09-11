import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'
import { metadata, root } from './metadata.mjs'
import config from '../site.config.mjs'

metadata({ check: true })
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(resolve(dir, entry.name)) : [resolve(dir, entry.name)])
const files = ['index.html', 'work.html', ...walk(resolve(root, 'projects')), ...walk(resolve(root, 'evidence'))].map(file => resolve(root, file)).filter(file => file.endsWith('.html'))
let links = 0
for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs: ${relative(root, file)}`)
  for (const match of html.matchAll(/<(?:a|link|img|source|track|script)\b[^>]*?\b(?:href|src)="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&')
    if (/^(https?:|data:|mailto:)/.test(href)) continue
    const url = new URL(href, `https://local.invalid/${relative(root, file).replaceAll('\\', '/')}`)
    let target = resolve(root, '.' + decodeURIComponent(url.pathname))
    assert(target.startsWith(resolve(root) + sep), `Link escapes site: ${href}`)
    assert(existsSync(target), `Missing target in ${relative(root, file)}: ${href}`)
    if (statSync(target).isDirectory()) target = resolve(target, 'index.html')
    if (url.hash && target.endsWith('.html')) assert(readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing fragment in ${relative(root, file)}: ${href}`)
    links++
  }
}
for (const page of config.pages) {
  const html = readFileSync(resolve(root, page.path), 'utf8')
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Expected one h1: ${page.path}`)
  assert(existsSync(resolve(root, page.image)), `Missing social preview: ${page.image}`)
  assert(!/<(?:script|iframe)[^>]+src="https?:/.test(html), 'Unexpected external script or frame')
  assert(!/<form\b/.test(html), 'Contact must not imply a form backend')
  for (const match of html.matchAll(/href="(https:\/\/www.linkedin.com[^\"]+)"/g)) assert.equal(match[1], config.contact, 'Contact destination differs from verified config')
}
console.log(`PASS: metadata, ${files.length} HTML pages, ${links} internal links/assets/fragments, public contact destinations, and no external scripts or forms.`)
