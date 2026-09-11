// Render actual local Slidev slides. No live-agent footage or audio is simulated.
import { chromium } from 'playwright-core'
import ffmpegStatic from 'ffmpeg-static'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { once } from 'node:events'
import { demos, languages, slidesFor } from '../content/demos.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const ffmpeg = process.env.FFMPEG_PATH || ffmpegStatic
if (Number(process.versions.node.split('.')[0]) < 22) throw new Error('Presentation rendering requires Node 22.12 or newer.')
const hash = (path, text = false) => createHash('sha256').update(text ? readFileSync(resolve(root, path), 'utf8').replaceAll('\r\n', '\n') : readFileSync(resolve(root, path))).digest('hex')
const scratch = resolve(root, '.capture/bilingual')
mkdirSync(scratch, { recursive: true })
const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
const selected = process.argv[2] ? demos.filter(d => d.id === process.argv[2]) : demos
if (!selected.length) throw new Error('Unknown demo ID')
try {
  for (const demo of selected) for (const lang of languages) {
    const slides = slidesFor(demo, lang), duration = slides.at(-1).end
    const dir = `evidence/presentations/${demo.id}/${lang}`
    mkdirSync(resolve(root, dir), { recursive: true })
    const logPath = resolve(scratch, `${demo.id}-${lang}.log`)
    let output = ''
    const child = spawn(process.execPath, ['node_modules/@slidev/cli/bin/slidev.mjs', `${demo.id}.${lang}.md`, '--port', '3035', '--bind', '127.0.0.1'], { cwd: resolve(root, 'presentations'), windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] })
    child.stdout.on('data', data => { output += data.toString(); writeFileSync(logPath, output) })
    child.stderr.on('data', data => { output += data.toString(); writeFileSync(logPath, output) })
    let spawnError
    child.on('error', error => { spawnError = error })
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: 'reduce' })
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    try {
      let ready = false
      for (let attempt = 0; attempt < 120; attempt++) {
        if (spawnError || child.exitCode !== null) throw new Error(`Slidev failed: ${spawnError || output}`)
        try { const r = await fetch('http://localhost:3035/', { signal: AbortSignal.timeout(1500) }); if (r.ok) { ready = true; break } } catch {}
        await new Promise(r => setTimeout(r, 500))
      }
      if (!ready) throw new Error(`Slidev did not become ready: ${output}`)
      for (const s of slides) {
        await page.goto(`http://localhost:3035/${s.number}`, { waitUntil: 'networkidle' })
        const pitch = page.locator('.slidev-page:visible .pitch').first()
        await pitch.waitFor({ timeout: 60000 })
        await page.evaluate(() => document.fonts.ready)
        const title = await pitch.locator('h1').innerText()
        if (title.replace(/\s+/g, ' ').trim() !== s.title.replace(/\s+/g, ' ').trim()) throw new Error(`Wrong slide: ${demo.id} ${lang} ${s.number}: ${title}`)
        const overflow = await pitch.evaluate(el => {
          const footerTop = el.querySelector('footer').getBoundingClientRect().top
          const content = el.querySelector('.pitch-content').getBoundingClientRect()
          return [...el.querySelectorAll('.pitch-content > *, .pitch-item, .pitch-item h2, .pitch-item p')].filter(x => {
            const r = x.getBoundingClientRect()
            return r.bottom > footerTop - 8 || r.right > content.right + 2 || r.left < content.left - 2 || (!x.classList.contains('pitch-item') && x.scrollWidth > x.clientWidth + 2)
          }).map(x => x.className || x.tagName)
        })
        if (overflow.length) throw new Error(`Slide overflow: ${demo.id} ${lang} ${s.number}: ${overflow}`)
        await pitch.screenshot({ path: resolve(root, dir, `slide-${String(s.number).padStart(2, '0')}.png`), animations: 'disabled' })
        console.log(`Captured ${demo.id} ${lang}: ${s.number}/${slides.length}`)
      }
      if (errors.length) throw new Error(errors.join('\n'))
    } finally {
      writeFileSync(logPath, output)
      await page.close()
      if (child.exitCode === null) { const stopped = once(child, 'exit'); child.kill(); await stopped }
    }
    const quote = path => path.replaceAll('\\', '/').replaceAll("'", "'\\''")
    const concat = resolve(scratch, `${demo.id}-${lang}.ffconcat`)
    const image = s => resolve(root, dir, `slide-${String(s.number).padStart(2, '0')}.png`)
    writeFileSync(concat, slides.map(s => `file '${quote(image(s))}'\nduration ${s.seconds}`).join('\n') + `\nfile '${quote(image(slides.at(-1)))}'\n`)
    await new Promise((done, reject) => {
      const encoder = spawn(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', concat, '-an', '-vf', 'fps=24,scale=1600:900', '-c:v', 'libx264', '-preset', 'fast', '-crf', '21', '-pix_fmt', 'yuv420p', '-t', String(duration), '-movflags', '+faststart', resolve(root, dir, 'walkthrough.mp4')], { windowsHide: true, stdio: 'inherit' })
      encoder.once('error', reject)
      encoder.once('exit', code => code === 0 ? done() : reject(new Error(`FFmpeg exit ${code}`)))
    })
    const sources = ['content/demos.mjs', 'presentations/components/PitchSlide.vue', 'presentations/style.css', 'presentations/package-lock.json', `presentations/${demo.id}.${lang}.md`]
    writeFileSync(resolve(root, dir, 'recording.json'), JSON.stringify({ demo: demo.id, language: lang, recordedAt: new Date().toISOString(), method: 'Local Slidev browser captures encoded as a silent H.264 presentation. Illustrative slides, not a recording of live agent execution.', slidevVersion: '52.19.1', durationSeconds: duration, width: 1600, height: 900, audio: false, sourceHashNormalization: 'UTF-8 with LF line endings', sources: Object.fromEntries(sources.map(path => [path, hash(path, true)])), videoSha256: hash(`${dir}/walkthrough.mp4`), slides: slides.map(s => ({ id: s.id, number: s.number, title: s.title, start: s.start, end: s.end, image: `slide-${String(s.number).padStart(2, '0')}.png`, sha256: hash(`${dir}/slide-${String(s.number).padStart(2, '0')}.png`) })) }, null, 2) + '\n')
    console.log(`Recorded ${demo.name} ${lang}: ${duration}s, ${slides.length} slides, no audio.`)
  }
} finally { await browser.close() }
