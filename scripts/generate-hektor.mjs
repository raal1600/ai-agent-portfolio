import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { replacements, summaries, chapters } from '../content/hektor-translation.mjs'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8').replaceAll('\r\n', '\n')
const write = (path, value) => writeFileSync(new URL('../' + path, import.meta.url), value)
const original = read('presentations/hektor/sv.md')
const visible = original.replace(/<!--[\s\S]*?-->/g, '')
// One simultaneous replacement pass prevents short words from corrupting longer
// phrases or translating the English output a second time.
const dictionary = new Map(replacements)
const pattern = [...dictionary.keys()].sort((a,b) => b.length - a.length).map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
const translate = text => text.replace(new RegExp(pattern, 'g'), match => dictionary.get(match))
const english = translate(visible).replace('lang: sv', 'lang: en').replaceAll('<DeckHeader ', '<DeckHeaderEnglish ')
const shape = text => [...text.matchAll(/<\/?[A-Za-z][^>]*>/g)].map(m => m[0].replace('DeckHeaderEnglish', 'DeckHeader').replace(/note="[^"]*"/g, 'note="text"')).join('\n')
assert.equal(shape(english), shape(visible), 'The translated deck must preserve the original layout markup')
assert.equal([...english.matchAll(/^# /gm)].length, 14)
write('presentations/hektor/en.md', english)
let header = read('presentations/hektor/components/DeckHeader.vue')
header = header.replace("['Kundnytta', 'Så fungerar det', 'Teamets vardag', 'Erbjudandet']", "['Customer value', 'How it works', 'The team’s day', 'The offering']")
header = header.replace('Avsnitt i presentationen', 'Presentation chapters').replace('KUNDSERVICE MED HEKTOR I CENTRUM', 'CUSTOMER SERVICE WITH HEKTOR AT THE CENTRE')
write('presentations/hektor/components/DeckHeaderEnglish.vue', header)

const storyboard = JSON.parse(read('evidence/hektor-agent/storyboard.json'))
const sections = visible.split(/^---\s*$/m).slice(2)
const englishSections = english.split(/^---\s*$/m).slice(2)
assert.equal(sections.length, 14); assert.equal(englishSections.length, 14)
const text = section => section.replace(/<Deck(?:Header|Footer)[^>]*\/>/g, '').replace(/^# .*$/gm, '').replace(/```mermaid[\s\S]*?```/g, '').replace(/<[^>]*>/g, ' ').replaceAll('&amp;', '&').replace(/\s+/g, ' ').trim()
const aliases = { introduktion: 'overview', kunskap: 'knowledge', chatt: 'chat', telefon: 'voice', overlamning: 'handover', diktering: 'dictation', kontroll: 'boundaries', erbjudande: 'next-step' }
const slides = storyboard.slides.map((s,i) => ({ id:s.id, layout:'original', title:{sv:s.title,en:englishSections[i].match(/^# (.*)$/m)[1]}, summary:{sv:s.summary,en:summaries[i]}, seconds:s.seconds, aliases: aliases[s.id] ? [aliases[s.id]] : [], items:[{title:{en:'Slide text',sv:'Bildtext'},text:{sv:text(sections[i]),en:text(englishSections[i])}}] }))
// Mermaid text is also included in the readable counterpart.
slides[8].items.push({title:{sv:'Flöde',en:'Workflow'},text:{sv:'Medarbetaren berättar → Hektor Agent förbereder texten → Medarbetaren granskar och rättar → Godkänd anteckning sparas i ärendet.',en:'Staff member describes the case → Hektor Agent prepares the text → Staff member reviews and corrects → Approved note is saved to the case.'}})
slides[11].items.push({title:{sv:'Flöde',en:'Workflow'},text:{sv:'Kund i chatten, kund på telefon och medarbetarens anteckning → Hektor Agent med gemensam kunskap → Svar och vägledning, förberett ärendeunderlag och mänsklig hjälp vid behov.',en:'Customer in chat, customer on the phone and staff member’s note → Hektor Agent with shared knowledge → Answers and guidance, prepared case information and human help when needed.'}})
const chapterData = storyboard.chapters.map((c,i) => ({slide:c.slide,title:{sv:c.title,en:chapters[i][0]},description:{sv:c.description,en:chapters[i][1]}}))
write('content/hektor.mjs', '// Generated from the original Hektor deck and its translation.\nexport const hektorSlides = ' + JSON.stringify(slides,null,2) + '\nexport const hektorChapters = ' + JSON.stringify(chapterData,null,2) + '\n')
console.log('Restored original 14-slide Hektor structure and generated its full English translation.')
