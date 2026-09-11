import { chromium } from 'playwright-core'
import { fileURLToPath } from 'node:url'

const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.goto(new URL('../assets/social-preview.svg', import.meta.url).href)
  await page.screenshot({ path: fileURLToPath(new URL('../assets/social-preview.png', import.meta.url)) })
} finally { await browser.close() }
