// Checks every page at desktop and phone width: local links and fragments, images, horizontal overflow,
// console errors and axe WCAG A/AA. Also searches the published files for names that must not appear.
// External links are listed, never opened.
import { chromium } from 'playwright-core'
import { readFileSync, readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname, join, relative, extname } from 'node:path'
import { createRequire } from 'node:module'
import { serve } from './serve.mjs'

const root = process.cwd()
const require = createRequire(import.meta.url)
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')
const out = resolve('test-results')
mkdirSync(out, { recursive: true })

const walk = dir => readdirSync(dir).flatMap(name => {
  const path = join(dir, name)
  if (['node_modules', '.git', 'test-results'].includes(name)) return []
  return statSync(path).isDirectory() ? walk(path) : [path]
})
const files = walk(root)
const pages = files.filter(f => f.endsWith('.html')).map(f => relative(root, f)).sort()

// 1. Names of clients, employers, partners and people. Matched case-insensitively in text files and file paths.
const banned = /\b(miun|mittuniversitet|mid sweden university|nord univ|interreg|lilly|vidaxl|dropxl|hngz55|sics|cosafe|volvo|hektor|h-sami|barbro|ingrid|gränslös)/i
const textTypes = new Set(['.py', '.html', '.css', '.js', '.mjs', '.json', '.md', '.txt', '.vtt', '.yml', '.yaml', '.svg'])
const nameHits = []
for (const file of files) {
  const rel = relative(root, file)
  if (rel === 'scripts/verify-portfolio.mjs') continue // holds the pattern itself
  if (banned.test(rel)) nameHits.push(`${rel} (path)`)
  if (!textTypes.has(extname(file))) continue
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => { if (banned.test(line)) nameHits.push(`${rel}:${i + 1}: ${line.match(banned)[0]}`) })
}

// 2. Local links, assets and fragments.
const linkProblems = [], external = new Set()
for (const page of pages) {
  const html = readFileSync(page, 'utf8')
  for (const [, url] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (/^https?:/.test(url)) { external.add(url); continue }
    if (/^(mailto:|data:)/.test(url)) continue
    const [pathPart, fragment] = url.replace(/&amp;/g, '&').split('#')
    const target = pathPart ? resolve(dirname(page), pathPart.split('?')[0]) : resolve(page)
    if (!existsSync(target)) { linkProblems.push(`${page}: missing ${url}`); continue }
    if (fragment && target.endsWith('.html') && !readFileSync(target, 'utf8').includes(`id="${fragment}"`)) linkProblems.push(`${page}: missing #${fragment} in ${url}`)
  }
}

// 3. Browser checks, in the default dark theme and the light theme.
const server = await serve(root, 8111)
const browser = await chromium.launch({ channel: 'chrome' })
const pageProblems = [], axeProblems = []
try {
  for (const theme of ['dark', 'light']) for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
    await context.addInitScript(t => { try { localStorage.setItem('theme', t) } catch {} }, theme)
    for (const file of pages) {
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', e => errors.push(e.message))
      page.on('console', m => { if (m.type() === 'error' && !m.location().url?.endsWith('/favicon.ico')) errors.push(m.text()) })
      const response = await page.goto(`http://127.0.0.1:8111/${file}`, { waitUntil: 'load' })
      if (!response.ok()) pageProblems.push(`${file}: HTTP ${response.status()}`)
      await page.evaluate(async () => {
        for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager'
        await Promise.all([...document.images].map(img => img.complete ? null : new Promise(r => { img.onload = img.onerror = r })))
        await document.fonts?.ready
      })
      const issues = await page.evaluate(() => {
        const found = []
        if (document.documentElement.scrollWidth > innerWidth + 1) found.push(`horizontal overflow (${document.documentElement.scrollWidth}px)`)
        for (const img of document.images) if (!img.naturalWidth) found.push(`broken image ${img.getAttribute('src')}`)
        return found
      })
      for (const issue of [...issues, ...errors]) pageProblems.push(`${file} @${viewport.width}px ${theme}: ${issue}`)
      await page.addScriptTag({ content: axeSource })
      const result = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }))
      for (const v of result.violations) axeProblems.push(`${file} @${viewport.width}px ${theme}: ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0].target.join(' ')}`)
      if (viewport.width === 390 || file === 'index.html') await page.screenshot({ path: join(out, `${file.replace(/[\\/]/g, '_')}-${viewport.width}-${theme}.png`), fullPage: true })
      await page.close()
    }
    await context.close()
  }
} finally {
  await browser.close(); server.close()
}

const report = { pages: pages.length, nameHits, linkProblems, pageProblems, axeProblems, externalLinks: [...external].sort() }
writeFileSync(join(out, 'verify-report.json'), JSON.stringify(report, null, 2))
console.log(`Pages checked: ${pages.length} at 1440 and 390 px, dark and light`)
for (const [label, list] of [['Name search hits', nameHits], ['Link problems', linkProblems], ['Page problems', pageProblems], ['Axe violations', axeProblems]]) {
  console.log(`${label}: ${list.length}`)
  list.slice(0, 40).forEach(x => console.log('  ' + x))
}
console.log(`External links (listed, not opened): ${external.size}`)
if (nameHits.length || linkProblems.length || pageProblems.length || axeProblems.length) process.exit(1)
