import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { serve } from './serve.mjs'
import { root } from './metadata.mjs'
import config from '../site.config.mjs'

const output = resolve(root, 'test-results')
mkdirSync(output, { recursive: true })
assert(existsSync(resolve(root, 'dist/index.html')), 'Run npm run build first')
const server = await serve(root, 0)
// /dist exercises relative navigation, assets and chapters under a project base path.
const base = `http://127.0.0.1:${server.address().port}/dist`
let browser
const errors = []
try {
  browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error' && !message.location().url?.endsWith('/favicon.ico')) errors.push(message.text()) })
    page.on('request', request => { if (!request.url().startsWith(base + '/') && !request.url().endsWith('/favicon.ico')) errors.push(`Unexpected request: ${request.url()}`) })
    for (const { path } of config.pages) {
      const response = await page.goto(`${base}/${path}`, { waitUntil: 'networkidle' })
      assert(response.ok(), path)
      assert.equal(await page.locator('h1').count(), 1)
      assert.equal(await page.locator('main').count(), 1)
      assert.equal(await page.locator('link[rel="canonical"]').count(), 1)
      const issues = await page.evaluate(() => {
        const issues = []
        if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('Horizontal page overflow')
        for (const node of document.querySelectorAll('.site-header a, .site-footer a, .button, summary')) {
          const rect = node.getBoundingClientRect()
          if (rect.left < 0 || rect.right > innerWidth + 1) issues.push(`Control overflow: ${node.textContent}`)
          if (!node.textContent.trim() && !node.getAttribute('aria-label')) issues.push('Unnamed control')
        }
        const headings = [...document.querySelectorAll('h1,h2,h3')].filter(node => node.getBoundingClientRect().height).map(node => Number(node.tagName[1]))
        if (headings.some((level, i) => i && level > headings[i - 1] + 1)) issues.push('Skipped heading level')
        return issues
      })
      assert.deepEqual(issues, [], `${path} at ${width}`)
      if (path === 'index.html') {
        // Scroll through all sections to load every lazy image, then inspect them.
        for (const id of ['services', 'demos', 'approach', 'contact']) {
          await page.locator(`#${id}`).scrollIntoViewIfNeeded()
        }
        await page.locator('#demos').scrollIntoViewIfNeeded()
        await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth))
        assert.equal(await page.locator('[data-contact]').getAttribute('href'), config.contact)
        assert.equal(await page.locator('form').count(), 0)
        for (const id of ['services', 'demos', 'approach', 'contact']) {
          await page.locator(`.site-nav a[href="#${id}"]`).click()
          assert.equal(new URL(page.url()).hash, `#${id}`)
        }
        const summary = page.locator('summary').first()
        await summary.focus()
        await page.keyboard.press('Enter')
        assert(await summary.evaluate(node => node.parentElement.open), 'FAQ keyboard interaction')
        await page.keyboard.press('Enter')
        await page.goto(`${base}/index.html`)
        await page.keyboard.press('Tab')
        assert.equal(await page.locator(':focus').innerText(), 'Skip to content')
        await page.keyboard.press('Enter')
        assert.equal(new URL(page.url()).hash, '#content')
        await page.locator('#demos').scrollIntoViewIfNeeded()
        await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth))
        await page.evaluate(() => scrollTo(0, 0))
        await page.screenshot({ path: resolve(output, `customer-home-${width}.png`), fullPage: true })
        await page.screenshot({ path: resolve(output, `customer-hero-${width}.png`) })
      }
    }
    console.log(`OK customer navigation, metadata, layout and keyboard controls at ${width}px`)
    await page.close()
  }
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  page.on('pageerror', error => errors.push(error.message))
  // SoherDocs: actual playback, all seven seeks and loaded caption cues.
  await page.goto(`${base}/projects/soherdocs.html`)
  await page.waitForFunction(() => document.querySelector('video').readyState >= 2)
  const duration = await page.locator('video').evaluate(async video => { await video.play(); video.pause(); return video.duration })
  assert(Math.abs(duration - 35) < .2)
  for (let i = 0; i < 7; i++) {
    await page.locator('[data-chapter-start]').nth(i).click()
    await page.waitForFunction(time => Math.abs(document.querySelector('video').currentTime - time) < 2, i * 5)
    await page.locator('video').evaluate(video => video.pause())
    assert.equal(await page.locator('[aria-current="step"]').getAttribute('data-chapter-start'), String(i * 5))
  }
  const cues = await page.locator('video').evaluate(async video => {
    const track = [...video.textTracks].find(track => track.kind === 'captions')
    track.mode = 'hidden'
    for (let i = 0; i < 50 && !track.cues?.length; i++) await new Promise(done => setTimeout(done, 100))
    return track.cues?.length
  })
  assert.equal(cues, 7)
  console.log('OK SoherDocs playback, seven chapters and captions')
  // SoherAgent: keyboard tabs, playback, every chapter and pausing on tab changes.
  await page.goto(`${base}/projects/pi-agent-harness.html`)
  const tabs = page.locator('[role="tab"]')
  assert.equal(await tabs.count(), 5)
  await tabs.first().focus()
  await page.keyboard.press('End')
  assert.equal(await tabs.last().getAttribute('aria-selected'), 'true')
  await page.keyboard.press('Home')
  assert.equal(await tabs.first().getAttribute('aria-selected'), 'true')
  for (let i = 0; i < 5; i++) {
    await tabs.nth(i).click()
    const panel = page.locator(`#demo-panel-${i + 1}`)
    await panel.locator('video').evaluate(async video => { if (video.readyState < 2) await new Promise(done => video.addEventListener('loadeddata', done, { once: true })); await video.play(); video.pause() })
    const chapters = panel.locator('[data-chapter-start]')
    for (let j = 0; j < await chapters.count(); j++) {
      const start = Number(await chapters.nth(j).getAttribute('data-chapter-start'))
      await chapters.nth(j).click()
      await page.waitForFunction(({ index, start }) => Math.abs(document.querySelector(`#demo-panel-${index} video`).currentTime - start) < 2, { index: i + 1, start })
      await panel.locator('video').evaluate(video => video.pause())
      assert.equal(await chapters.nth(j).getAttribute('aria-current'), 'step')
    }
    await panel.locator('video').evaluate(video => video.play())
    await tabs.nth((i + 1) % 5).click()
    assert(await panel.locator('video').evaluate(video => video.paused), 'Hidden video must pause')
  }
  await page.goto(`${base}/evidence/pi-agent-harness/terminal-05-verify.html?transcript=1`)
  await page.waitForFunction(() => document.documentElement.dataset.proofLoaded === 'true')
  console.log('OK SoherAgent five videos, all 66 chapters, keyboard tabs, hidden-video pause and evidence loading')
  // Static export at an origin root as well as the project prefix.
  const originServer = await serve(resolve(root, 'dist'), 0)
  try {
    await page.goto(`http://127.0.0.1:${originServer.address().port}/`)
    await page.locator('.demo-card h3 a').first().click()
    assert(new URL(page.url()).pathname === '/projects/pi-agent-harness.html')
    assert.equal((await page.request.get(`http://127.0.0.1:${originServer.address().port}/site.config.mjs`)).status(), 404)
  } finally { originServer.close() }
  const plain = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const fallback = await plain.newPage()
  await fallback.goto(`${base}/index.html`)
  await fallback.locator('.site-nav a[href="#contact"]').click()
  assert.equal(await fallback.locator('[data-contact]').getAttribute('href'), config.contact)
  await fallback.locator('summary').first().click()
  assert(await fallback.locator('details').first().getAttribute('open') !== null)
  for (const project of ['soherdocs', 'pi-agent-harness']) {
    await fallback.goto(`${base}/projects/${project}.html`)
    if (project === 'pi-agent-harness') assert.equal(await fallback.locator('[role="tabpanel"]:visible').count(), 5)
    await fallback.locator('[data-chapter-start]').first().click()
    assert(fallback.url().includes('/evidence/'), 'Chapter needs transcript fallback')
  }
  await plain.close()
  assert.deepEqual(errors, [])
  // Existing evidence is immutable in this change, including recordings and proof files.
  const changedEvidence = execFileSync('git', ['diff', '--name-only', '0cf02f0e6f5ace36858af5f13fcd3ed3900f2325', '--', 'evidence'], { cwd: root, encoding: 'utf8' }).trim()
  assert.equal(changedEvidence, '', 'Existing evidence changed')
  console.log('PASS: source evidence unchanged, portable export, truthful contact, no-JS fallbacks and no browser errors.')
} finally { await browser?.close(); server.close() }
