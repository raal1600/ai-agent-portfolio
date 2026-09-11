import { writeFileSync } from 'node:fs'
import { demos, languages } from '../content/demos.mjs'

for (const demo of demos) for (const lang of languages) {
  if (demo.presentationDirectory) continue // Hektor retains its completed source deck.
  const front = `---\ntheme: default\ntitle: ${demo.name} — ${lang.toUpperCase()}\nlang: ${lang}\ncolorSchema: light\ntransition: none\naspectRatio: 16/9\ncanvasWidth: 1200\nfonts:\n  sans: Segoe UI\n  provider: none\ndefaults:\n  layout: default\ndrawings:\n  persist: false\n---\n`
  const slides = demo.slides.map((_, index) => `<PitchSlide demo="${demo.id}" locale="${lang}" :index="${index}" />`).join('\n\n---\n\n')
  writeFileSync(new URL(`../presentations/${demo.id}.${lang}.md`, import.meta.url), front + '\n' + slides + '\n')
}
console.log('Generated SoherAgent and SoherDocs decks; the completed Hektor source is preserved separately.')
