import { chromium } from 'playwright-core'
import { readFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { createHash } from 'node:crypto'
import { serve } from './serve.mjs'

const remote = process.argv[2]?.replace(/\/$/, '')
const server = remote ? null : await serve(process.cwd(), 8111)
const base = remote ?? 'http://127.0.0.1:8111'
const manifest = JSON.parse(readFileSync('evidence/hektor-agent/recording.json', 'utf8'))
const out = resolve('test-results')
mkdirSync(out, { recursive: true })
const pages = ['index.html', 'projects/hektor-agent.html', 'projects/soherdocs.html', 'projects/pi-agent-harness.html', 'evidence/hektor-agent/hektor-demo-transcript.html']
// Validate local assets and fragment destinations in the new service and transcript.
for (const file of ['projects/hektor-agent.html', 'evidence/hektor-agent/hektor-demo-transcript.html']) {
  const html = readFileSync(file, 'utf8')
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const url = match[1]
    if (/^(https?:|data:|mailto:)/.test(url)) continue
    const [path, fragment] = url.split('#')
    const target = path ? resolve(dirname(file), path.split('?')[0]) : resolve(file)
    if (!existsSync(target)) throw new Error(`Broken asset: ${file}: ${url}`)
    if (fragment && target.endsWith('.html') && !readFileSync(target, 'utf8').includes(`id="${fragment}"`)) throw new Error(`Missing fragment: ${url}`)
  }
}
const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
const errors = []
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' })
    page.on('pageerror', e => errors.push(e.message))
    page.on('console', m => {
      // Browsers probe the domain-root favicon even though this portfolio has none.
      if (m.type() === 'error' && !m.location().url?.endsWith('/favicon.ico')) errors.push(`${m.text()} (${m.location().url})`)
    })
    for (const file of pages) {
      const response = await page.goto(`${base}/${file}`, { waitUntil: 'networkidle' })
      if (!response.ok()) throw new Error(`${file}: HTTP ${response.status()}`)
      const problems = await page.evaluate(() => {
        const issues = []
        if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('Page overflows horizontally')
        for (const link of document.querySelectorAll('.site-header a, .site-footer a')) {
          const r = link.getBoundingClientRect()
          if (r.left < 0 || r.right > innerWidth + 1) issues.push(`Navigation overflow: ${link.textContent}`)
        }
        for (const img of document.images) if (img.loading !== 'lazy' && (!img.complete || !img.naturalWidth)) issues.push(`Broken image: ${img.src}`)
        return issues
      })
      if (problems.length) throw new Error(`${file}, ${viewport.width}px: ${problems.join('; ')}`)
      if (file === 'index.html') {
        if (await page.locator('.project-row').count() !== 3) throw new Error('Expected three services')
        await page.locator('.project-row').last().scrollIntoViewIfNeeded()
        await page.waitForFunction(() => [...document.querySelectorAll('.hektor-visual img')].every(img => img.complete && img.naturalWidth))
        await page.screenshot({ path: `${out}/home-${viewport.width}.png` })
      }
      if (file === 'projects/hektor-agent.html') {
        await page.locator('#product-view').scrollIntoViewIfNeeded()
        await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2)
        await page.locator('video').evaluate(async v => { await v.play(); v.pause() })
        await page.screenshot({ path: `${out}/hektor-${viewport.width}.png`, fullPage: viewport.width === 390 })
        const media = await page.locator('video').evaluate(v => ({ duration: v.duration, width: v.videoWidth, height: v.videoHeight, error: v.error?.message }))
        if (media.error || Math.abs(media.duration - 150) > .2 || media.width !== 1600 || media.height !== 900) throw new Error(`Incorrect media: ${JSON.stringify(media)}`)
        // Every chapter must seek the actual MP4 and update the Swedish status.
        const chapters = page.locator('[data-chapter-start]')
        if (await chapters.count() !== 7) throw new Error('Expected seven chapters')
        for (let i = 0; i < 7; i++) {
          await chapters.nth(i).click()
          await page.waitForFunction(start => Math.abs(document.querySelector('video').currentTime - start) < 2, manifest.chapters[i].start)
          await page.locator('video').evaluate(v => v.pause())
          if (await chapters.nth(i).getAttribute('aria-current') !== 'step') throw new Error(`Chapter ${i + 1} not selected`)
        }
        if (!(await page.locator('[data-chapter-status]').innerText()).startsWith('Avsnitt 7')) throw new Error('Status is not localized')
        const cues = await page.locator('video').evaluate(async v => {
          const track = [...v.textTracks].find(t => t.kind === 'captions')
          track.mode = 'hidden'
          for (let i = 0; i < 50 && !track.cues?.length; i++) await new Promise(r => setTimeout(r, 100))
          return track.cues?.length
        })
        if (cues !== 14) throw new Error(`Expected 14 Swedish description cues, got ${cues}`)
      }
      console.log(`OK ${viewport.width}px ${file}`)
    }
    await page.close()
  }
  // Decode a frame inside every slide interval, including the final offer.
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
  await page.goto(`${base}/projects/hektor-agent.html`)
  await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2)
  const fingerprints = new Set()
  for (const slide of manifest.slides) {
    const frame = await page.locator('video').evaluate(async (v, time) => {
      v.pause()
      await new Promise(done => { v.addEventListener('seeked', done, { once: true }); v.currentTime = time })
      const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 90
      canvas.getContext('2d').drawImage(v, 0, 0, 160, 90)
      return canvas.toDataURL()
    }, (slide.start + slide.end) / 2)
    if (fingerprints.has(frame)) throw new Error(`Repeated/blank frame at slide ${slide.number}`)
    fingerprints.add(frame)
    if ([1, 7, 9, 14].includes(slide.number)) await page.locator('video').screenshot({ path: `${out}/video-slide-${slide.number}.png` })
  }
  const response = await page.request.get(`${base}/evidence/hektor-agent/hektor-demo.mp4`)
  if (!response.ok()) throw new Error(`MP4 download HTTP ${response.status()}`)
  const hash = createHash('sha256').update(await response.body()).digest('hex')
  if (hash !== manifest.videoSha256) throw new Error('Published video differs from verified recording')
  // Chapter anchors remain useful if JavaScript is disabled.
  const plain = await browser.newContext({ javaScriptEnabled: false })
  const fallback = await plain.newPage()
  await fallback.goto(`${base}/projects/hektor-agent.html`)
  await fallback.locator('[data-chapter-start]').nth(4).click()
  if (!fallback.url().endsWith('hektor-demo-transcript.html#diktering')) throw new Error('Transcript fallback failed')
  await plain.close()
  if (errors.length) throw new Error(errors.join('\n'))
  console.log('PASS: desktop/mobile, navigation, seven chapter seeks, 14 decoded slides, captions, MP4 integrity, and no-JavaScript transcript.')
} finally { await browser.close(); server?.close() }
