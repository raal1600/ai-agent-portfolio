import { demos, languages } from './content/demos.mjs'

// Public facts only. Change this URL and run `npm run metadata` after an approved move.
export default {
  url: 'https://raal1600.github.io/ai-agent-portfolio/',
  name: 'Rami Halabi',
  contact: 'https://www.linkedin.com/in/rami-halabi-2a5573195/',
  pages: [
    ...languages.flatMap(lang => {
      const prefix = lang === 'sv' ? 'sv/' : ''
      const otherPrefix = lang === 'sv' ? '' : 'sv/'
      return [
        ...['index.html', 'work.html'].map(path => ({ path: prefix + path, lang, alternate: otherPrefix + path, image: 'assets/social-preview.png', imageAlt: 'Rami Halabi — custom AI agents / skräddarsydda AI-agenter.' })),
        ...demos.flatMap(d => [
          { path: prefix + d.path, lang, alternate: otherPrefix + d.path, image: `evidence/presentations/${d.id}/${lang}/slide-01.png`, imageAlt: d.tagline[lang] },
          { path: `evidence/presentations/${d.id}/${lang}/index.html`, lang, alternate: `evidence/presentations/${d.id}/${lang === 'sv' ? 'en' : 'sv'}/index.html`, image: `evidence/presentations/${d.id}/${lang}/slide-01.png`, imageAlt: d.tagline[lang] },
        ]),
      ]
    }),
  ],
}
