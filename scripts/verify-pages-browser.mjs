import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { serve } from './serve.mjs'
import { root } from './metadata.mjs'
import config from '../site.config.mjs'

const output = resolve(root, 'test-results')
mkdirSync(output, { recursive: true })
const server = await serve(root, 0)
const base = `http://127.0.0.1:${server.address().port}/pages-dist`
const errors = []
let browser
try {
  browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error' && !message.location().url?.endsWith('/favicon.ico')) errors.push(message.text()) })
    for (const version of ['', '/preview']) {
      const url = base + version
      const response = await page.goto(url + '/', { waitUntil: 'networkidle' })
      assert(response.ok())
      assert.equal(await page.locator(version ? '.demo-card' : '.project-row').count(), 3)
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
      if (version) {
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), new URL('preview/', config.url).href)
        assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, follow')
        await page.locator('.site-nav a[href="#contact"]').click()
        assert.equal(await page.locator('[data-contact]').getAttribute('href'), config.contact)
        await page.locator('#demos').scrollIntoViewIfNeeded()
      } else await page.locator('.project-row').last().scrollIntoViewIfNeeded()
      await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth))
      await page.evaluate(() => scrollTo(0, 0))
      await page.screenshot({ path: resolve(output, `pages-${version ? 'preview' : 'main'}-${width}.png`), fullPage: true })
      for (const project of ['pi-agent-harness', 'soherdocs', 'hektor-agent']) {
        assert((await page.goto(`${url}/projects/${project}.html`)).ok())
        if (project === 'pi-agent-harness') await page.locator('[role="tab"]').last().click()
        const video = page.locator('video:visible')
        await video.evaluate(async media => {
          if (media.readyState < 2) await new Promise(done => media.addEventListener('loadeddata', done, { once: true }))
          await media.play()
          media.pause()
        })
        const chapter = page.locator('[data-chapter-start]:visible').last()
        const start = Number(await chapter.getAttribute('data-chapter-start'))
        await chapter.click()
        await page.waitForFunction(({ start }) => {
          const video = [...document.querySelectorAll('video')].find(node => node.getBoundingClientRect().height)
          return Math.abs(video.currentTime - start) < 2
        }, { start })
        await video.evaluate(media => media.pause())
        await page.locator('.site-header .brand').click()
        assert.equal(new URL(page.url()).pathname, `/pages-dist${version}/index.html`, 'Return navigation must stay in the selected version')
      }
      assert((await page.goto(`${url}/evidence/pi-agent-harness/terminal-01-describe.html?transcript=1#scene-13`)).ok())
      assert.equal(new URL(page.url()).hash, '#scene-13')
      console.log(`OK ${version || '/'} at ${width}px: homepage, three demo players, chapter seeks, return links, transcript query/fragment`)
    }
    await page.close()
  }
  const plain = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' })
  const page = await plain.newPage()
  await page.goto(base + '/preview/')
  await page.locator('.site-nav a[href="#contact"]').click()
  assert.equal(await page.locator('[data-contact]').getAttribute('href'), config.contact)
  await page.goto(base + '/preview/projects/hektor-agent.html')
  await page.locator('[data-chapter-start]').first().click()
  assert(page.url().includes('/preview/evidence/hektor-agent/hektor-demo-transcript.html#introduktion'))
  await plain.close()
  assert.deepEqual(errors, [])
  console.log('PASS: main and preview work together below a project path, mobile/desktop media and navigation, no-JS fallback and no browser errors.')
} finally { await browser?.close(); server.close() }
