import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, posix } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { demos, languages, slidesFor, chaptersFor } from '../content/demos.mjs'
import { siteCopy } from '../content/site.mjs'
import config from '../site.config.mjs'

const root = new URL('../', import.meta.url)
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const route = (path, lang) => (lang === 'sv' ? 'sv/' : '') + path
const href = (from, to) => posix.relative(posix.dirname(from), to) || posix.basename(to)
const media = (demo, lang) => `evidence/presentations/${demo.id}/${lang}`
const versions = new Map()
const versioned = (from, path) => {
  if (!versions.has(path)) versions.set(path, createHash('sha256').update(readFileSync(new URL(path, root))).digest('hex').slice(0,12))
  return href(from, path) + '?v=' + versions.get(path)
}
const clock = n => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`
const stamp = n => `00:${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}.000`
const write = (path, text) => { mkdirSync(dirname(fileURLToPath(new URL(path, root))), { recursive: true }); writeFileSync(new URL(path, root), text) }

function header(path, lang, counterpart) {
  const c = siteCopy[lang], home = href(path, route('index.html', lang))
  const other = lang === 'en' ? 'sv' : 'en'
  return `<a class="skip-link" href="#content">${c.skip}</a>
<header class="site-header"><a class="brand" href="${home}" aria-label="Rami Halabi · ${c.home}"><span class="brand-mark" aria-hidden="true">rh.</span>Rami Halabi</a>
<nav class="site-nav" aria-label="${lang === 'sv' ? 'Huvudmeny' : 'Primary navigation'}">${['services', 'demos', 'approach', 'contact'].map((id, i) => `<a${i === 3 ? ' class="nav-contact"' : ''} href="${home}#${id}">${c.nav[i]}</a>`).join('')}</nav>
<nav class="language-switch" aria-label="${c.language}">${languages.map(l => l === lang ? `<span lang="${l}" aria-current="page">${l === 'en' ? 'EN' : 'SV'}</span>` : `<a href="${href(path, counterpart)}" lang="${other}" hreflang="${other}" data-language-link aria-label="${other === 'sv' ? 'Visa samma sida på svenska' : 'View the same page in English'}">${other.toUpperCase()}</a>`).join('')}</nav></header>`
}
function footer(path, lang) {
  const c = siteCopy[lang]
  return `<footer class="site-footer"><div><strong>Rami Halabi</strong><p>${c.footer}</p></div><nav aria-label="${lang === 'sv' ? 'Sidfotsmeny' : 'Footer navigation'}"><a href="${href(path, route('work.html', lang))}">${c.gallery}</a><a data-contact href="${config.contact}">LinkedIn ↗</a></nav></footer>`
}
function shell(path, lang, counterpart, title, description, body, extraClass = '') {
  const asset = name => href(path, `assets/${name}`)
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="${asset('style.css')}"><link rel="stylesheet" href="${asset('customer.css')}"><link rel="stylesheet" href="${asset('bilingual.css')}">
<script src="${asset('site.js')}" defer></script><script src="${asset('language.js')}" defer></script>
</head><body class="customer-site ${extraClass}">${header(path, lang, counterpart)}<main id="content">${body}</main>${footer(path, lang)}</body></html>\n`
}
function demoCards(path, lang, selected = demos) {
  const c = siteCopy[lang]
  return `<div class="demo-grid">${selected.map(d => `<article class="demo-card"><a class="demo-image" href="${href(path, route(d.path, lang))}" tabindex="-1" aria-hidden="true"><img src="${versioned(path, `${media(d, lang)}/slide-01.png`)}" alt="" width="1600" height="900" loading="lazy" decoding="async"></a><div class="demo-card-body"><p class="demo-kind">${esc(d.status[lang])}</p><h3><a href="${href(path, route(d.path, lang))}">${d.name}<span aria-hidden="true">↗</span></a></h3><p class="demo-subtitle">${d.category[lang]}</p><p>${esc(d.tagline[lang])}</p><p class="demo-disclosure">${esc(d.id === 'soherdocs' ? (lang === 'sv' ? 'CV är det aktuella exemplet. Andra dokumenttyper är framtida omfattning.' : 'CVs are the current example. Other document types are future scope.') : d.id === 'hektor' ? (lang === 'sv' ? 'Illustrativt koncept. Telefon- och ärendekopplingar är inte verifierade.' : 'Illustrative concept. Telephone and case integrations are not verified.') : (lang === 'sv' ? 'Ett koncept för planering, samordning och mänsklig granskning av utvecklingsarbete.' : 'A concept for planning, coordination and human review of development work.'))}</p><a class="text-link" href="${href(path, route(d.path, lang))}">${c.watch} →</a></div></article>`).join('')}</div>`
}
function heading(label, title, intro) { return `<div class="customer-heading"><div><p class="eyebrow">${label}</p><h2>${title}</h2></div><p>${intro}</p></div>` }

for (const lang of languages) {
  const c = siteCopy[lang], other = lang === 'en' ? 'sv' : 'en', path = route('index.html', lang)
  const body = `<section class="customer-hero" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow"><span class="small-rule" aria-hidden="true"></span>${c.eyebrow}</p><h1 id="hero-title">${c.hero}<br><span>${c.heroMuted}</span></h1><p class="hero-intro">${c.intro}</p><div class="actions"><a class="button primary" href="#contact">${c.discuss} ↗</a><a class="button secondary" href="#demos">${c.explore} ↓</a></div><p class="hero-footnote">${c.footnote}</p></div>
<figure class="system-diagram"><div class="diagram-heading"><span>${c.diagram}</span><span aria-hidden="true">01 / 04</span></div>${c.nodes.map((n, i) => `${i ? '<div class="flow-line" aria-hidden="true"></div>' : ''}${i === 1 ? `<div class="agent-node"><div class="agent-node-title"><span class="agent-symbol" aria-hidden="true">✳</span><strong>${n[0]}</strong></div><p>${n[1]}</p><div class="tool-pills">${c.pills.map(p => `<span>${p}</span>`).join('')}</div></div>` : `<div class="flow-node${i === 2 ? ' review-node' : ''}"><span class="node-number">0${i + 1}</span><div><strong>${n[0]}</strong><span>${n[1]}</span></div></div>`}`).join('')}<figcaption>${c.architecture}</figcaption></figure></section>
<div class="capability-strip">${c.strip.map(x => `<span>${x}</span>`).join('')}</div>
<section class="customer-section" id="services">${heading(c.servicesLabel, c.servicesTitle, c.servicesIntro)}<div class="service-grid">${c.services.map(s => `<article class="service-card"><span class="service-number">${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p><ul>${s[3].map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('')}</div><p class="section-note">${c.servicesNote}</p></section>
<section class="customer-section" id="demos">${heading(c.demosLabel, c.demosTitle, c.demosIntro)}${demoCards(path, lang)}</section>
<section class="engineering-section"><div><p class="eyebrow">${c.eyebrow}</p><h2>${c.distinctionTitle}</h2><p class="engineering-intro">${c.distinctionIntro}</p></div><dl class="engineering-list">${c.distinctions.map(x => `<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join('')}</dl></section>
<section class="customer-section" id="approach">${heading(c.approachLabel, c.approachTitle, c.approachIntro)}<ol class="process-list">${c.process.map((x, i) => `<li><span class="process-number">0${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p></li>`).join('')}</ol></section>
<section class="customer-section faq-section"><h2>${c.faqTitle}</h2><div class="faq-list">${c.faqs.map(x => `<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join('')}</div></section>
<section class="contact-section" id="contact"><div><p class="eyebrow">${c.contactLabel}</p><h2>${c.contactTitle}</h2><p>${c.contactText}</p><a class="button primary" data-contact href="${config.contact}">${c.contactButton} ↗</a><p class="contact-note">${c.contactNote}</p></div><aside class="brief-card"><span class="brief-label">${c.briefLabel}</span><h3>${c.briefTitle}</h3><ul>${c.brief.map(x => `<li>${x}</li>`).join('')}</ul><p>${c.briefNote}</p></aside></section>`
  write(path, shell(path, lang, route('index.html', other), c.title, c.description, body))
  const work = route('work.html', lang)
  write(work, shell(work, lang, route('work.html', other), c.workTitle, c.demosIntro, `<section class="demo-hero"><p class="eyebrow">${c.demosLabel}</p><h1>${c.workHeading}</h1><p class="lead">${c.demosIntro}</p></section><section class="customer-section"><div class="presentation-heading"><h2>${c.gallery}</h2></div>${demoCards(work, lang)}</section>`))

  for (const d of demos) {
    const path = route(d.path, lang), slides = slidesFor(d, lang), dir = media(d, lang), chapters = chaptersFor(d, lang)
    const transcript = `${dir}/index.html`, link = target => /\.(png|mp4|vtt)$/.test(target) ? versioned(path,target) : href(path, target), duration = slides.at(-1).end
    write(`${dir}/chapters.vtt`, 'WEBVTT\n\n' + chapters.map(s => `${stamp(s.start)} --> ${stamp(s.end)}\n${s.title.replaceAll('\n', ' ')}\n`).join('\n'))
    write(`${dir}/captions.vtt`, 'WEBVTT\n\n' + slides.map(s => `${s.number}\n${stamp(s.start)} --> ${stamp(s.end)}\n${s.summary}\n`).join('\n'))
    const original = d.id === 'soheragent' ? null : d.id === 'soherdocs' ? ['projects/soherdocs-original.html', c.archiveDocs] : ['projects/hektor-agent-original.html', c.archiveHektor]
    const body = `<section class="demo-hero"><a class="breadcrumb" href="${link(route('work.html', lang))}">← ${c.gallery}</a><p class="eyebrow">${c.demoLabel} / ${d.category[lang]}</p><h1>${d.name}</h1><p class="demo-tagline">${esc(d.tagline[lang])}</p><p class="lead">${esc(d.description[lang])}</p><div class="actions"><a class="button primary" href="#product-view">${c.view} ↓</a><a class="button secondary" href="${link(transcript)}">${c.transcript}</a></div></section>
<section class="presentation-section" id="product-view" aria-labelledby="workflow-title"><div class="presentation-heading"><h2 id="workflow-title">${c.view}</h2><p>${c.silent} · ${slides.length} ${lang === 'sv' ? 'bilder' : 'slides'} · ${clock(duration)}</p></div>
<div class="workflow-demo localized-demo" data-workflow-demo data-step-label="${c.chapter}"><nav class="workflow-chapters" aria-label="${c.chapters}">${chapters.map((s, i) => `<a class="workflow-chapter" href="${link(transcript)}#${s.id}" data-chapter-id="${s.id}" data-chapter-start="${s.start}" data-chapter-end="${s.end}"${i === 0 ? ' aria-current="step"' : ''}><span class="workflow-chapter-number">${String(i + 1).padStart(2, '0')}</span><span><strong>${esc(s.title.replaceAll('\n', ' '))}</strong><span>${clock(s.start)}</span></span></a>`).join('')}</nav><div class="workflow-stage"><div class="workflow-truth">${esc(d.status[lang])}</div><video controls playsinline preload="metadata" poster="${link(`${dir}/slide-01.png`)}" aria-label="${d.name} · ${c.silent}" aria-describedby="workflow-disclosure" data-presentation-video><source src="${link(`${dir}/walkthrough.mp4`)}" type="video/mp4"><track kind="chapters" src="${link(`${dir}/chapters.vtt`)}" srclang="${lang}" label="${c.chapters}" default><track kind="captions" src="${link(`${dir}/captions.vtt`)}" srclang="${lang}" label="${lang === 'sv' ? 'Svenska beskrivningar' : 'English descriptions'}">${c.fallback} <a href="${link(`${dir}/walkthrough.mp4`)}">${c.openVideo}</a> · <a href="${link(transcript)}">${c.transcript}</a></video><div class="workflow-footer"><p data-chapter-status aria-live="polite">${c.chapter} 1 · ${esc(slides[0].title.replaceAll('\n', ' '))}</p><a href="${link(transcript)}">${c.transcript}</a></div></div></div><div class="presentation-links"><a href="${link(`${dir}/walkthrough.mp4`)}" download>${c.download} ↓</a>${d.id === 'soheragent' ? '' : `<a href="${link(`${dir}/recording.json`)}">${c.recordingDetails}</a>`}</div></section>
<section class="demo-context" id="workflow-disclosure"><div><p class="eyebrow">${c.boundaries}</p><p>${esc(d.disclosure[lang])}</p></div><div><p class="eyebrow">${c.fitTitle}</p><p>${esc(d.fit[lang])}</p></div></section>
${original ? `<section class="evidence-section" id="technical-evidence"><h2>${c.archiveTitle}</h2><p>${c.archiveNote}</p><a href="${link(original[0])}" lang="${d.id === 'hektor' ? 'sv' : 'en'}">${original[1]} ↗</a></section>` : ''}
<section class="demo-cta"><div><h2>${c.nextTitle}</h2><p>${esc(d.next[lang])}</p></div><a class="button primary" href="${link(route('index.html', lang))}#contact">${c.nextButton} ↗</a></section><section class="customer-section"><div class="presentation-heading"><h2>${c.otherDemos}</h2></div>${demoCards(path, lang, demos.filter(x => x.id !== d.id))}</section>`
    write(path, shell(path, lang, route(d.path, other), `${d.name} — ${d.category[lang]} | Rami Halabi`, d.description[lang], body, 'presentation-page'))
    const textBody = `<section class="demo-hero"><a class="breadcrumb" href="${href(transcript, path)}#product-view">← ${c.back}</a><p class="eyebrow">${c.silent} · ${clock(duration)}</p><h1>${d.name}</h1><p class="lead">${c.transcriptIntro}</p><p>${esc(d.disclosure[lang])}</p></section><nav class="transcript-index" aria-label="${c.chapters}">${slides.map(s => `<a href="#${s.id}">${String(s.number).padStart(2, '0')} ${esc(s.title.replaceAll('\n', ' '))}</a>`).join('')}</nav>${slides.map((s, i) => `<section class="transcript-slide" id="${s.id}">${(s.aliases || []).map(id => `<span id="${id}"></span>`).join('')}<p class="eyebrow">${c.slide} ${s.number} / ${slides.length} · ${clock(s.start)}–${clock(s.end)}</p><h2>${esc(s.title.replaceAll('\n', ' '))}</h2><p class="lead">${esc(s.summary)}</p><img src="${versioned(transcript, `${dir}/slide-${String(s.number).padStart(2, '0')}.png`)}" alt="${d.name} · ${c.slide} ${s.number}: ${esc(s.title.replaceAll('\n', ' '))}. ${lang === 'sv' ? 'Bildtexten finns nedan.' : 'Slide text is included below.'}" width="1600" height="900" loading="lazy"><dl class="slide-text">${s.items.map(item => `<div><dt>${esc(item.title)}</dt><dd>${esc(item.text)}</dd></div>`).join('')}</dl><nav class="slide-pagination" aria-label="${c.slide} ${s.number}">${i ? `<a href="#${slides[i - 1].id}">← ${c.previous}</a>` : '<span></span>'}${i < slides.length - 1 ? `<a href="#${slides[i + 1].id}">${c.nextSlide} →</a>` : `<a href="${href(transcript, path)}#product-view">${c.back} →</a>`}</nav></section>`).join('')}`
    write(transcript, shell(transcript, lang, `${media(d, other)}/index.html`, `${d.name} — ${c.transcript}`, d.description[lang], textBody, 'transcript-page'))


  }
}

// Keep historical playback and deep links intact; add an explicit route to the
// translated presentation without changing any original video or source evidence.
for (const [path, demoId] of [['projects/pi-agent-harness.html', 'soheragent'], ['projects/soherdocs-original.html', 'soherdocs'], ['projects/hektor-agent-original.html', 'hektor']]) {
  const d = demos.find(x => x.id === demoId)
  let html = readFileSync(new URL(path, root), 'utf8')
  const note = `<aside class="archive-notice" aria-label="Original material"><p><strong>Original material / Originalmaterial</strong> · ${d.name}</p><p>Updated presentation / Uppdaterad presentation: <a href="${href(path, d.path)}" lang="en">English</a> · <a href="${href(path, route(d.path, 'sv'))}" lang="sv">Svenska</a></p></aside>`
  if (!html.includes('assets/bilingual.css')) html = html.replace('</head>', `<link rel="stylesheet" href="../assets/bilingual.css">\n</head>`)
  html = html.includes('<aside class="archive-notice"') ? html.replace(/<aside class="archive-notice"[\s\S]*?<\/aside>/, note) : html.replace(/(<main\b[^>]*>)/, `$1\n${note}`)
  html = html.replace(/<!-- site-meta:start -->[\s\S]*?<!-- site-meta:end -->/, '<meta name="robots" content="noindex, follow">')
  write(path, html)
}
console.log('Generated paired static customer pages, six transcripts and text tracks; original evidence retained.')
