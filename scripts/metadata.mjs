import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import config from '../site.config.mjs'

export const root = fileURLToPath(new URL('../', import.meta.url))
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>')

export function metadata({ check = false, directory = root, url = config.url } = {}) {
  const root = resolve(directory)
  const base = new URL(url)
  if (!['https:', 'http:'].includes(base.protocol) || base.search || base.hash || !base.pathname.endsWith('/')) throw new Error('Site URL must be an absolute HTTP(S) URL ending in / without a query or fragment')
  const update = (path, content) => {
    if (check) {
      let existing
      try { existing = readFileSync(resolve(root, path), 'utf8') } catch {}
      if (existing?.replaceAll('\r\n', '\n') !== content.replaceAll('\r\n', '\n')) throw new Error(`Stale metadata: ${path}. Run npm run metadata.`)
    } else writeFileSync(resolve(root, path), content)
  }
  for (const page of config.pages) {
    const file = resolve(root, page.path)
    let html = readFileSync(file, 'utf8')
    const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '')
    const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '')
    if (!title || !description) throw new Error(`Missing title or description: ${page.path}`)
    const canonical = new URL(page.path.replace(/(^|\/)index\.html$/, '$1'), base).href
    const image = new URL(page.image, base).href
    const favicon = relative(dirname(file), resolve(root, 'assets/favicon.svg')).replaceAll('\\', '/')
    const locale = html.includes('<html lang="sv">') ? 'sv_SE' : 'en_US'
    const tags = [
      `<link rel="canonical" href="${escape(canonical)}">`,
      `<link rel="icon" href="${favicon}" type="image/svg+xml">`,
      '<meta name="theme-color" content="#202d25">',
      '<meta property="og:type" content="website">',
      `<meta property="og:site_name" content="${escape(config.name)}">`,
      `<meta property="og:locale" content="${locale}">`,
      `<meta property="og:title" content="${escape(title)}">`,
      `<meta property="og:description" content="${escape(description)}">`,
      `<meta property="og:url" content="${escape(canonical)}">`,
      `<meta property="og:image" content="${escape(image)}">`,
      `<meta property="og:image:alt" content="${escape(page.imageAlt)}">`,
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${escape(title)}">`,
      `<meta name="twitter:description" content="${escape(description)}">`,
      `<meta name="twitter:image" content="${escape(image)}">`,
      `<meta name="twitter:image:alt" content="${escape(page.imageAlt)}">`,
    ]
    if (page.alternate) {
      const otherLang = page.lang === 'sv' ? 'en' : 'sv'
      const alternate = new URL(page.alternate.replace(/(^|\/)index\.html$/, '$1'), base).href
      tags.push(`<link rel="alternate" hreflang="${page.lang}" href="${escape(canonical)}">`, `<link rel="alternate" hreflang="${otherLang}" href="${escape(alternate)}">`, `<link rel="alternate" hreflang="x-default" href="${escape(page.lang === 'en' ? canonical : alternate)}">`)
    }
    if (['index.html', 'sv/index.html'].includes(page.path)) {
      const data = { '@context': 'https://schema.org', '@type': 'Person', name: config.name, url: canonical, sameAs: [config.contact] }
      tags.push(`<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`)
    }
    const block = `<!-- site-meta:start -->\n  ${tags.join('\n  ')}\n  <!-- site-meta:end -->`
    html = html.includes('<!-- site-meta:start -->') ? html.replace(/<!-- site-meta:start -->[\s\S]*?<!-- site-meta:end -->/, block) : html.replace('</head>', `  ${block}\n</head>`)
    html = html.replace(/(<a\b[^>]*\bdata-contact\b[^>]*\bhref=")[^"]*(")/g, `$1${escape(config.contact)}$2`)
    update(page.path, html)
  }
  const entries = config.pages.map(page => `  <url><loc>${escape(new URL(page.path.replace(/(^|\/)index\.html$/, '$1'), base).href)}</loc></url>`)
  update('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`)
  // robots.txt is effective only at an origin root; see README for project Pages hosting.
  update('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', base).href}\n`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  metadata({ check: process.argv.includes('--check') })
  console.log('Site metadata and sitemap are up to date.')
}
