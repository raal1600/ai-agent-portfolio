import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { readFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { serve } from './serve.mjs'
import { root } from './metadata.mjs'
import { demos, languages, slidesFor } from '../content/demos.mjs'
import config from '../site.config.mjs'

const remote = process.argv[2]?.replace(/\/$/, '')
const server = remote ? null : await serve(root, 0)
const base = remote || `http://127.0.0.1:${server.address().port}/dist`
const hash = (path, text = false) => createHash('sha256').update(text ? readFileSync(resolve(root, path), 'utf8').replaceAll('\r\n', '\n') : readFileSync(resolve(root, path))).digest('hex')
const errors = []
mkdirSync(resolve(root, 'test-results'), { recursive: true })
const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  page.on('pageerror', e => errors.push(e.message))
  page.on('request', request => { if (!request.url().startsWith(base + '/') && !request.url().endsWith('/favicon.ico')) errors.push(`Unexpected external request: ${request.url()}`) })
  for (const demo of demos) for (const lang of languages) {
    const prefix = lang === 'sv' ? 'sv/' : '', other = lang === 'sv' ? 'en' : 'sv'
    const dir = `evidence/presentations/${demo.id}/${lang}`, slides = slidesFor(demo, lang)
    const record = JSON.parse(readFileSync(resolve(root, dir, 'recording.json'), 'utf8'))
    assert.equal(record.videoSha256, hash(`${dir}/walkthrough.mp4`), 'Recording hash')
    assert.equal(record.audio, false)
    assert.equal(record.durationSeconds, slides.at(-1).end)
    for (const [source, expected] of Object.entries(record.sources)) assert.equal(hash(source, true), expected, `Stale recording source: ${source}`)
    assert.deepEqual(record.slides.map(s => [s.id, s.start, s.end]), slides.map(s => [s.id, s.start, s.end]))
    for (const s of record.slides) assert.equal(hash(`${dir}/${s.image}`), s.sha256)
    const response = await page.goto(`${base}/${prefix}${demo.path}`)
    assert(response.ok())
    assert.equal(await page.locator('html').getAttribute('lang'), lang)
    await page.waitForFunction(() => document.querySelector('video').readyState >= 2)
    const media = await page.locator('video').evaluate(async v => { await v.play(); v.pause(); return { duration: v.duration, width: v.videoWidth, height: v.videoHeight } })
    assert(Math.abs(media.duration - record.durationSeconds) < .2)
    assert.equal(media.width, 1600); assert.equal(media.height, 900)
    const fingerprints = new Set()
    for (const [i, s] of slides.entries()) {
      await page.locator('[data-chapter-id]').nth(i).click()
      await page.waitForFunction(t => Math.abs(document.querySelector('video').currentTime - t) < 2, s.start)
      const frame = await page.locator('video').evaluate(async (v, t) => {
        v.pause()
        await new Promise(done => { v.addEventListener('seeked', done, { once: true }); v.currentTime = t })
        const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 90
        canvas.getContext('2d').drawImage(v, 0, 0, 160, 90)
        return canvas.toDataURL()
      }, s.start + s.seconds / 2)
      assert(!fingerprints.has(frame), 'Duplicated or blank slide frame'); fingerprints.add(frame)
      assert.equal(await page.locator('[aria-current="step"]').getAttribute('data-chapter-id'), s.id)
    }
    const cues = await page.locator('video').evaluate(async v => {
      const track = [...v.textTracks].find(t => t.kind === 'captions'); track.mode = 'hidden'
      for (let i = 0; i < 40 && !track.cues?.length; i++) await new Promise(r => setTimeout(r, 100))
      return { language: track.language, count: track.cues?.length }
    })
    assert.deepEqual(cues, { language: lang, count: slides.length })
    // Keyboard switching must preserve the same demo and position, without autoplay.
    const time = await page.locator('video').evaluate(v => v.currentTime)
    await page.locator('[data-language-link]').focus(); await page.keyboard.press('Enter')
    await page.waitForFunction(l => document.documentElement.lang === l && document.querySelector('video').readyState >= 2, other)
    assert(page.url().includes(demo.path))
    await page.waitForFunction(t => Math.abs(document.querySelector('video').currentTime - t) < .5, time)
    assert(await page.locator('video').evaluate(v => v.paused))
    // Rewinding to zero must not leave a stale time in the switch link.
    await page.locator('video').evaluate(v => { v.currentTime = 0; v.dispatchEvent(new Event('timeupdate')) })
    assert.equal(new URL(await page.locator('[data-language-link]').getAttribute('href')).searchParams.has('t'), false)
    await page.goto(`${base}/${dir}/index.html#${slides[4].id}`)
    assert.equal(await page.locator('.transcript-slide').count(), slides.length)
    await page.locator('[data-language-link]').click()
    assert.equal(new URL(page.url()).hash, '#' + slides[4].id)
    assert.equal(await page.locator('html').getAttribute('lang'), other)
    console.log(`PASS ${demo.name} ${lang}: 8 decoded slides, captions, provenance and language-position switching`)
  }
  // The selected language must persist through normal site navigation and links.
  for (const lang of languages) {
    const prefix = lang === 'sv' ? 'sv/' : ''
    await page.goto(`${base}/${prefix}index.html#demos`)
    await page.locator('.demo-card h3 a').nth(1).click()
    assert.equal(await page.locator('html').getAttribute('lang'), lang)
    await page.locator('.brand').click()
    assert.equal(await page.locator('html').getAttribute('lang'), lang)
    assert.equal(await page.locator('[data-contact]').first().getAttribute('href'), config.contact)
    await page.screenshot({ path: resolve(root, `test-results/bilingual-${lang}-desktop.png`), fullPage: true })
  }
  const plain = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const fallback = await plain.newPage()
  for (const lang of languages) for (const d of demos) {
    await fallback.goto(`${base}/${lang === 'sv' ? 'sv/' : ''}${d.path}`)
    await fallback.locator('[data-chapter-id]').last().click()
    assert.equal(new URL(fallback.url()).hash, '#next-step')
    assert.equal(await fallback.locator('html').getAttribute('lang'), lang)
    assert.equal(await fallback.locator('.transcript-slide').count(), 8)
    // Even without JS, the other-language link resolves to the same transcript.
    await fallback.locator('[data-language-link]').click()
    assert.equal(await fallback.locator('.transcript-slide').count(), 8)
  }
  await plain.close()
  assert.deepEqual(errors, [])
  console.log('PASS: bilingual navigation, truthful contact, no-JavaScript fallbacks and no external requests.')
} finally { await browser.close(); server?.close() }
