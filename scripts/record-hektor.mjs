// Capture the actual Swedish Slidev deck and encode every slide into one silent video.
// No synthetic product UI, narration, or runtime results are added.
import { chromium } from 'playwright-core'
import ffmpeg from 'ffmpeg-static'
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'

const data = JSON.parse(readFileSync('evidence/hektor-agent/storyboard.json', 'utf8'))
const dir = resolve('evidence/hektor-agent')
const scratch = resolve('.capture')
mkdirSync(join(dir, 'slides'), { recursive: true })
mkdirSync(scratch, { recursive: true })
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const stamp = seconds => `00:${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}.000`
const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
let duration = 0
data.slides.forEach((slide, i) => { slide.number = i + 1; slide.start = duration; duration += slide.seconds; slide.end = duration; slide.image = `slides/${String(i + 1).padStart(2, '0')}.png` })
data.chapters.forEach((chapter, i) => { chapter.start = data.slides[chapter.slide - 1].start; chapter.end = data.slides[(data.chapters[i + 1]?.slide ?? data.slides.length + 1) - 2].end; chapter.id = data.slides[chapter.slide - 1].id })

const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'chrome' } : {})
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', e => errors.push(e.message))
  for (const slide of data.slides) {
    const response = await page.goto(`${data.source}/${slide.number}/`, { waitUntil: 'networkidle' })
    if (!response.ok()) throw new Error(`Slide ${slide.number}: HTTP ${response.status()}`)
    const layout = page.locator('.slidev-page:visible .slidev-layout').first()
    await layout.waitFor()
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() => [...document.querySelectorAll('.slidev-page:not([style*="display: none"]) .mermaid')].filter(el => el.getBoundingClientRect().width).every(el => el.shadowRoot?.querySelector('svg')))
    await page.waitForTimeout(400)
    const heading = await layout.locator('h1').innerText()
    if (heading.trim() !== slide.title) throw new Error(`Source changed: slide ${slide.number}: ${heading}`)
    await layout.screenshot({ path: join(dir, slide.image), animations: 'disabled' })
    slide.text = await layout.evaluate(root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      const parts = []
      while (walker.nextNode()) {
        const node = walker.currentNode
        if (!node.parentElement.closest('header, footer, .footer, .kicker, .mermaid, h1, svg, style, script')) parts.push(node.textContent.trim())
      }
      return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
    })
    console.log(`Captured ${slide.number}/${data.slides.length}: ${slide.title}`)
  }
  if (errors.length) throw new Error(errors.join('\n'))
} finally { await browser.close() }

copyFileSync(join(dir, data.slides[0].image), join(dir, 'hektor-demo-poster.png'))
// ffconcat repeats the final input so its full duration is encoded.
const quote = file => file.replaceAll('\\', '/').replaceAll("'", "'\\''")
writeFileSync(join(scratch, 'hektor.ffconcat'), data.slides.map(s => `file '${quote(join(dir, s.image))}'\nduration ${s.seconds}`).join('\n') + `\nfile '${quote(join(dir, data.slides.at(-1).image))}'\n`)
writeFileSync(join(scratch, 'hektor.ffmetadata'), ';FFMETADATA1\ntitle=Hektor Demo\ncomment=Swedish concept presentation; no runtime claims or audio\n' + data.chapters.map(c => `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${c.start * 1000}\nEND=${c.end * 1000}\ntitle=${c.title}\n`).join(''))
await new Promise((done, reject) => {
  const child = spawn(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', join(scratch, 'hektor.ffconcat'), '-i', join(scratch, 'hektor.ffmetadata'), '-map_metadata', '1', '-an', '-vf', 'fps=24', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-t', String(duration), '-movflags', '+faststart', join(dir, 'hektor-demo.mp4')], { stdio: 'inherit', windowsHide: true })
  child.once('error', reject); child.once('exit', code => code === 0 ? done() : reject(new Error(`FFmpeg exit ${code}`)))
})
writeFileSync(join(dir, 'hektor-demo.sv.vtt'), 'WEBVTT\n\n' + data.slides.map(s => `${s.number}\n${stamp(s.start)} --> ${stamp(s.end)}\n${s.summary}\n`).join('\n'))
writeFileSync(join(dir, 'hektor-demo.chapters.vtt'), 'WEBVTT\n\n' + data.chapters.map(c => `${stamp(c.start)} --> ${stamp(c.end)}\n${c.title}\n`).join('\n'))

const header = `<header class="site-header"><a class="brand" href="../index.html">Rami Halabi</a><nav class="site-nav" aria-label="Huvudmeny"><a href="../index.html">Work</a><a href="pi-agent-harness.html">SoherAgent</a><a href="soherdocs.html">SoherDocs</a><a href="hektor-agent.html" aria-current="page">Hektor Agent</a></nav></header>`
writeFileSync('projects/hektor-agent.html', `<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Hektor Agent: en svensk videogenomgång om kundservice via chatt och telefon, enklare diktering och mindre rutinarbete för supportteamet.">
  <title>Hektor Agent — Rami Halabi</title>
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="../assets/style.css"><script src="../assets/site.js" defer></script>
</head>
<body class="hektor-page">
<a class="skip-link" href="#content">Hoppa till innehåll</a>
${header}
<main id="content">
  <section class="project-hero">
    <div data-reveal><h1>Hektor Agent</h1><p class="lead">Snabbare hjälp för kunderna. Mindre rutinarbete för teamet. En gemensam agent för webbchatt, telefon och diktering.</p><a class="text-link" href="#product-view">Se Hektor Demo</a></div>
    <div class="project-hero-note" data-reveal><p>En svensk genomgång av erbjudandet: hur agenten kan svara på vanliga frågor, lämna över med bakgrunden och förbereda dokumentation.</p><p>Konceptpresentation med illustrativa exempel. Telefon- och ärendekopplingar återstår att verifiera.</p></div>
  </section>
  <section class="section-block" id="product-view" aria-labelledby="workflow-title">
    <div class="section-heading" data-reveal><h2 id="workflow-title">En agent.<br>Värde för ett helt team.</h2><p>Se hela den svenska presentationen på ${clock(duration)} minuter, eller välj ett av sju avsnitt. Alla 14 bilder ingår. Videon är utan ljud; svenska textbeskrivningar kan slås på i spelaren.</p></div>
    <div class="workflow-demo hektor-demo" data-workflow-demo data-step-label="Avsnitt" data-reveal>
      <nav class="workflow-chapters" aria-label="Avsnitt i Hektor Demo">
${data.chapters.map((c, i) => `        <a class="workflow-chapter" href="../evidence/hektor-agent/hektor-demo-transcript.html#${c.id}" data-chapter-start="${c.start}" data-chapter-end="${c.end}"${i === 0 ? ' aria-current="step"' : ''}><span class="workflow-chapter-number">${String(i + 1).padStart(2, '0')}</span><span><strong>${esc(c.title)}</strong><span>${esc(c.description)}</span></span></a>`).join('\n')}
      </nav>
      <div class="workflow-stage">
        <div class="workflow-truth">Svensk konceptpresentation · 14 bilder · ${clock(duration)} · utan ljud</div>
        <video controls playsinline preload="metadata" poster="../evidence/hektor-agent/hektor-demo-poster.png" aria-label="Hektor Demo, hela den svenska presentationen utan ljud" aria-describedby="workflow-disclosure">
          <source src="../evidence/hektor-agent/hektor-demo.mp4" type="video/mp4">
          <track kind="chapters" src="../evidence/hektor-agent/hektor-demo.chapters.vtt" srclang="sv" label="Svenska avsnitt" default>
          <track kind="captions" src="../evidence/hektor-agent/hektor-demo.sv.vtt" srclang="sv" label="Svenska textbeskrivningar">
          Din webbläsare kan inte spela videon. <a href="../evidence/hektor-agent/hektor-demo.mp4">Öppna MP4-filen</a> eller <a href="../evidence/hektor-agent/hektor-demo-transcript.html">läs genomgången</a>.
        </video>
        <div class="workflow-footer"><p data-chapter-status aria-live="polite"><strong>Avsnitt 1 · Kundnyttan.</strong> Snabbare hjälp och mindre rutin.</p><a href="../evidence/hektor-agent/hektor-demo-transcript.html">Läs genomgången</a></div>
      </div>
    </div>
    <p class="visualization-note" id="workflow-disclosure" data-reveal>Inspelade bilder från <a href="${data.source}/">Hektor Demo</a>. Exemplen visar föreslagna arbetssätt, inte en driftsatt telefonintegration eller uppmätta besparingar. Använd helskärm för att läsa detaljerna.</p>
    <div class="hektor-links" data-reveal><a href="${data.source}/">Öppna presentationen</a><a href="${data.source}/Hektor-Demo.pdf">Ladda ner PDF</a><a href="../evidence/hektor-agent/hektor-demo.mp4" download>Ladda ner videon</a></div>
  </section>
  <section class="section-block" aria-labelledby="value-title">
    <div class="section-heading" data-reveal><h2 id="value-title">Mer service.<br>Mindre rutin.</h2><p>En agent till kostnaden av en supportmedarbetare, med potential att automatisera ett helt teams återkommande arbete.</p></div>
    <div class="hektor-values" data-reveal><div><h3>Hjälp fler kunder</h3><p>Ge tydliga svar med Hektors godkända kunskap och en väg till mänsklig hjälp.</p></div><div><h3>Avlasta teamet</h3><p>Förbered underlag och anteckningar så att medarbetarna kan fokusera på nästa steg.</p></div><div><h3>Behåll kontrollen</h3><p>Hektor bestämmer information, åtkomst och när en människa tar över.</p></div></div>
    <p class="visualization-note" data-reveal>Detta är erbjudandets inriktning. Omfattning och kostnadsram preciseras i offert. Kapacitet och automatiseringsgrad är ännu inte uppmätta.</p>
  </section>
  <section class="source-note" data-reveal><p>Vill du prata om hur Hektor Agent kan avlasta kundservice?</p><a href="https://www.linkedin.com/in/rami-halabi-2a5573195/">Kontakta Rami på LinkedIn</a></section>
</main>
<footer class="site-footer"><p>Hektor Agent · kundnytta, avlastning och kontroll.</p><nav aria-label="Sidfotsmeny"><a href="../index.html">Work</a><a href="pi-agent-harness.html">SoherAgent</a><a href="soherdocs.html">SoherDocs</a></nav></footer>
</body></html>
`)

writeFileSync(join(dir, 'hektor-demo-transcript.html'), `<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Läsbar genomgång av alla 14 bilder i den svenska Hektor Demo-videon."><title>Hektor Demo — läs genomgången</title><link rel="stylesheet" href="../../assets/style.css"></head>
<body class="hektor-page"><header class="site-header"><a class="brand" href="../../index.html">Rami Halabi</a><nav class="site-nav" aria-label="Huvudmeny"><a href="../../projects/hektor-agent.html">Hektor Agent</a></nav></header>
<main class="hektor-transcript"><p><a href="../../projects/hektor-agent.html#product-view">← Tillbaka till videon</a></p><h1>Hektor Demo</h1><p class="lead">Alla 14 bilder i ordning. Svensk konceptpresentation, ${clock(duration)} minuter utan ljud. Exemplen beskriver tänkta flöden, inte en driftsatt telefonintegration.</p>
<nav class="hektor-links" aria-label="Avsnitt">${data.chapters.map(c => `<a href="#${c.id}">${esc(c.title)}</a>`).join('')}</nav>
${data.slides.map(s => `<section id="${s.id}" class="hektor-transcript-slide"><p>Bild ${s.number} av 14 · ${clock(s.start)}–${clock(s.end)}</p><h2>${esc(s.title)}</h2><p class="lead">${esc(s.summary)}</p><details><summary>Visa bild ${s.number} och texten i bilden</summary><img loading="lazy" width="1600" height="900" src="${s.image}" alt="Bild ${s.number}: ${esc(s.title)}"><p>${esc(s.text)}</p></details></section>`).join('\n')}
<p>Underlag: <a href="${data.source}/">Hektor Demo</a>, grenen <code>${data.branch}</code>, revision <a href="${data.repository}/commit/${data.revision}">${data.revision}</a>. <a href="recording.json">Information om inspelningen</a>.</p></main>
<footer class="site-footer"><p>Hektor Demo · konceptpresentation på svenska.</p></footer></body></html>
`)
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex')
writeFileSync(join(dir, 'recording.json'), JSON.stringify({ recordedAt: new Date().toISOString(), source: data.source, sourceRepository: data.repository, sourceBranch: data.branch, sourceRevision: data.revision, method: 'Lossless browser captures of all 14 rendered slides, held for the storyboard durations and encoded as H.264 MP4. No audio or fabricated runtime footage.', durationSeconds: duration, width: 1600, height: 900, slideCount: data.slides.length, videoSha256: hash(join(dir, 'hektor-demo.mp4')), chapters: data.chapters, slides: data.slides.map(({ number, title, start, end, image }) => ({ number, title, start, end, image, sha256: hash(join(dir, image)) })) }, null, 2) + '\n')
console.log(`Created Hektor Demo: ${duration}s, ${data.slides.length} slides, ${data.chapters.length} chapters, MP4 + transcript + text tracks.`)
