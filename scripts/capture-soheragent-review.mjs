// Capture the review deck only. Does not encode video or modify public assets.
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { createServer } from 'node:net'
import { isolateSlide } from './capture-slide.mjs'
import { localized, story } from '../presentations/review/soheragent-story.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
if (Number(process.versions.node.split('.')[0]) < 22) throw new Error('Use Node 22.12 or newer.')
const destination = resolve(root, 'docs/reviews/soheragent')
mkdirSync(destination, { recursive: true })
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const browser = await chromium.launch(process.platform === 'win32' ? { channel:'chrome' } : {})
const report = []
try {
  for (const locale of ['en', 'sv']) {
    const reservation = createServer()
    reservation.listen(0, '127.0.0.1'); await once(reservation, 'listening')
    const port = reservation.address().port
    await new Promise(done => reservation.close(done))
    let output = '', spawnError
    const child = spawn(process.execPath, [resolve(root,'presentations/node_modules/@slidev/cli/bin/slidev.mjs'), `soheragent-review.${locale}.md`, '--port', String(port)], { cwd:resolve(root,'presentations'), windowsHide:true, stdio:['ignore','pipe','pipe'] })
    child.stdout.on('data', data => { output += data })
    child.stderr.on('data', data => { output += data })
    child.on('error', error => { spawnError = error })
    const page = await browser.newPage({ viewport:{width:1600,height:900}, reducedMotion:'reduce' })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    try {
      let ready = false
      for (let attempt=0; attempt<100; attempt++) {
        if (spawnError || child.exitCode !== null) throw new Error(`Slidev failed: ${spawnError || output}`)
        try { if ((await fetch(`http://localhost:${port}/`, { signal:AbortSignal.timeout(1000) })).ok) {ready=true; break} } catch {}
        await new Promise(done => setTimeout(done,500))
      }
      if (!ready) throw new Error(`Slidev failed to start: ${output}`)
      for (let index=0; index<story.length; index++) {
        await page.goto(`http://localhost:${port}/${index+1}`,{waitUntil:'networkidle'})
        const slide = page.locator('.slidev-page:visible .sa-story').first()
        await slide.waitFor()
        await page.evaluate(() => document.fonts.ready)
        await isolateSlide(page, slide)
        const captured = page.locator('[data-slide-capture]')
        const title = await captured.locator('h1').innerText()
        if (title !== localized(index,locale).title) throw new Error(`Unexpected slide: ${title}`)
        const issues = await captured.evaluate(el => {
          const area=el.getBoundingClientRect(), footer=el.querySelector('footer').getBoundingClientRect()
          const takeaway=el.querySelector('.takeaway')?.getBoundingClientRect()
          const walker=document.createTreeWalker(el.querySelector('main'),NodeFilter.SHOW_TEXT)
          const issues=[]
          while(walker.nextNode()) {
            const node=walker.currentNode
            if (!node.textContent.trim()) continue
            const range=document.createRange();range.selectNodeContents(node)
            for(const r of range.getClientRects()) {
              if(r.left<area.left || r.right>area.right || r.bottom>footer.top || r.top<area.top) issues.push(`Outside slide: ${node.textContent}`)
              if(takeaway && !node.parentElement.closest('.takeaway') && r.bottom>takeaway.top-4) issues.push(`Overlaps takeaway: ${node.textContent}`)
            }
          }
          return issues
        })
        const file=`${locale}-${String(index+1).padStart(2,'0')}.png`
        await captured.screenshot({path:resolve(destination,file),animations:'disabled'})
        if(issues.length) throw new Error(`${file}: ${issues.join('; ')}`)
        report.push({locale,slide:index+1,title,file})
        console.log(`Captured ${file}; no overflow or player overlays.`)
      }
      if(errors.length) throw new Error(errors.join('\n'))
    } finally {
      await page.close()
      if(child.exitCode===null){const stopped=once(child,'exit');child.kill();await stopped}
    }
  }
  const figures = locale => report.filter(s=>s.locale===locale).map(s=>`<figure id="${locale}-${s.slide}"><a href="${s.file}"><img src="${s.file}" alt="${escape(s.title.replaceAll('\n',' '))}" width="1600" height="900"></a><figcaption>${s.slide}. ${escape(s.title.replaceAll('\n',' '))}</figcaption></figure>`).join('\n')
  writeFileSync(resolve(destination,'index.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>SoherAgent — storyboard review</title><style>body{margin:0;background:#edf1eb;color:#15382f;font:17px/1.6 system-ui,sans-serif}header,main{max-width:1200px;margin:auto;padding:28px}header h1{margin:0;font-size:34px}header p{max-width:820px}a{color:#086345}nav{display:flex;gap:12px;margin:20px 0}button{font:inherit;border:1px solid #8aaa98;border-radius:6px;background:white;color:#15382f;padding:9px 22px;cursor:pointer}button[aria-pressed=true]{background:#15382f;color:white}button:focus-visible,a:focus-visible{outline:3px solid #087c58;outline-offset:4px}.gallery{display:grid;grid-template-columns:1fr;gap:28px}.gallery[hidden]{display:none}figure{margin:0}img{width:100%;height:auto;display:block;border-radius:8px}figcaption{padding:9px 0;font-size:15px}.sheet .gallery{grid-template-columns:1fr 1fr;gap:20px}.sheet header{display:none}.sheet main{width:1600px;max-width:none;padding:24px;box-sizing:border-box}.sheet figcaption{font-size:14px}@media(max-width:600px){header,main{padding:18px}header h1{font-size:28px}}</style></head><body><header><h1>SoherAgent · storyboard review</h1><p>Eight slides following one illustrative software project. Review the story and visuals before recording. The example is a concept, not a customer case study or live product.</p><p>These are actual Slidev captures. Hektor, the published website and existing videos have not been changed.</p><nav aria-label="Slide language"><button aria-pressed="true" data-locale="en">English</button><button aria-pressed="false" data-locale="sv">Svenska</button></nav><a href="README.md">Source and reproduction instructions</a></header><main><section class="gallery" id="en" lang="en" aria-label="English slides">${figures('en')}</section><section class="gallery" id="sv" lang="sv" aria-label="Svenska bilder" hidden>${figures('sv')}</section></main><script>const params=new URLSearchParams(location.search);if(params.has('sheet'))document.body.classList.add('sheet');function select(locale){for(const section of document.querySelectorAll('.gallery'))section.hidden=section.id!==locale;for(const button of document.querySelectorAll('button'))button.setAttribute('aria-pressed',String(button.dataset.locale===locale));document.documentElement.lang=locale}for(const button of document.querySelectorAll('button'))button.addEventListener('click',()=>select(button.dataset.locale));select(params.get('lang')==='sv'?'sv':'en');</script></body></html>`)
  const gallery=await browser.newPage({viewport:{width:1600,height:900}})
  for(const locale of ['en','sv']) {
    await gallery.goto(`${pathToFileURL(resolve(destination,'index.html'))}?sheet&lang=${locale}`)
    await gallery.screenshot({path:resolve(destination,`${locale}-overview.png`),fullPage:true})
  }
  await gallery.goto(pathToFileURL(resolve(destination,'index.html')).href)
  await gallery.setViewportSize({width:390,height:844})
  await gallery.getByRole('button',{name:'Svenska'}).click()
  if(!await gallery.locator('#sv').isVisible() || await gallery.locator('#en').isVisible()) throw new Error('Language switch failed')
  if(await gallery.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Review gallery overflows mobile viewport')
  await gallery.close()
  console.log('Review gallery: language toggle and 390px layout passed. 16 slides captured; no videos generated.')
} finally { await browser.close() }
