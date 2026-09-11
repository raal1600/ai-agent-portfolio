import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chromium } from 'playwright-core'
import { isolateSlide, assertCleanCapture } from './capture-slide.mjs'

test('capture rejects overlaid navigation labels and removes them from rendered pixels', async () => {
  const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
    await page.setContent('<style>body{margin:0}article{width:1600px;height:900px;background:#17382f;color:white}nav{position:fixed;top:0;left:0;z-index:999;color:black}</style><article data-slide-capture><h1>Actual slide</h1></article><nav>Go to next slide · Show slide overview</nav>')
    const slide = page.locator('article')
    const contaminated = await slide.screenshot()
    await assert.rejects(assertCleanCapture(page), /Go to next slide/)
    await isolateSlide(page, slide)
    const clean = await slide.screenshot()
    assert(!clean.equals(contaminated), 'The overlaid pixels must change')
    await page.locator('nav').evaluate(el => el.remove())
    assert(clean.equals(await slide.screenshot()), 'Isolated capture must match a page with navigation removed')
  } finally { await browser.close() }
})
