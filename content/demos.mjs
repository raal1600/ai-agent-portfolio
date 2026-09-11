import { hektorSlides, hektorChapters } from './hektor.mjs'
import { soherAgentSlides } from './soheragent.mjs'

// Paired content is the source for Slidev, the website, captions and transcripts.
// A shared ID and timing make the same chapter addressable in both languages.
const pair = (en, sv) => ({ en, sv })
const slide = (id, layout, title, summary, items = [], seconds = 16) => ({ id, layout, title, summary, items, seconds })
const item = (title, text) => ({ title, text })

export const demos = [
  {
    id: 'soheragent', name: 'SoherAgent', path: 'projects/soheragent.html', accent: 'green',
    category: pair('Engineering agent', 'Agent för utveckling'),
    tagline: pair('From an idea to work you can review.', 'Från idé till arbete du kan granska.'),
    description: pair('An engineering-agent concept that turns a request into a plan, coordinates the work and brings the result back for your team to review.', 'Ett koncept för en utvecklingsagent som gör en begäran till en plan, samordnar arbetet och lämnar resultatet till ert team för granskning.'),
    status: pair('Concept presentation', 'Konceptpresentation'),
    disclosure: pair('An illustrated concept for planning, coordinating and reviewing software-development work, with a person deciding what to approve.', 'Ett illustrerat koncept för att planera, samordna och granska mjukvaruutveckling, där en människa avgör vad som godkänns.'),
    fit: pair('For teams exploring agent-assisted software delivery while retaining control over scope, permissions and acceptance.', 'För team som vill utforska agentstödd mjukvaruutveckling med kontroll över omfattning, behörigheter och godkännande.'),
    next: pair('Bring a development task and your review process. We can define a bounded workflow and the checks it should pass.', 'Ta med en utvecklingsuppgift och er granskningsprocess. Vi kan definiera ett avgränsat flöde och de kontroller det ska klara.'),
    presentationComponent: 'SoherAgentStory',
    slides: soherAgentSlides,
  },
  {
    id: 'soherdocs', name: 'SoherDocs', path: 'projects/soherdocs.html', accent: 'blue',
    category: pair('Document tool service', 'Verktygstjänst för dokument'),
    tagline: pair('A document tool your agent can use.', 'Ett dokumentverktyg för din agent.'),
    description: pair('SoherDocs is designed as a tool service an agent can call to tailor a document from approved material and a target brief. The current example is a CV; other document types are future scope.', 'SoherDocs är utformat som en verktygstjänst som en agent kan anropa för att anpassa ett dokument utifrån godkänt underlag och ett syfte. CV är det aktuella exemplet; andra dokumenttyper är framtida omfattning.'),
    status: pair('Tool-service concept · synthetic CV example', 'Koncept för verktygstjänst · fiktivt CV-exempel'),
    disclosure: pair('This presentation illustrates the intended service and workflow with synthetic examples. The public repository does not expose a live document API. Contract tailoring is a possible future extension, not a demonstrated feature.', 'Presentationen visar den avsedda tjänsten och arbetsflödet med fiktiva exempel. Det publika repositoryt exponerar inget fungerande dokument-API. Anpassning av avtal är en möjlig framtida utökning, inte en demonstrerad funktion.'),
    fit: pair('For document-heavy workflows where an agent needs a focused drafting tool, approved source material and a reviewable output.', 'För dokumentintensiva flöden där en agent behöver ett avgränsat skrivverktyg, godkänt källmaterial och ett resultat som går att granska.'),
    next: pair('Bring a document type, its source material and the rules for a good result. We can define the tool contract, review step and integration.', 'Ta med en dokumenttyp, dess underlag och kriterier för ett bra resultat. Vi kan definiera verktygets gränssnitt, granskningssteg och integration.'),
    slides: [
      slide('overview', 'cover', pair('The agent coordinates.\nSoherDocs tailors the document.', 'Agenten samordnar.\nSoherDocs anpassar dokumentet.'), pair('A focused tool service for a larger agent workflow. CV tailoring is the current illustration of the idea.', 'En avgränsad verktygstjänst i ett större agentflöde. CV-anpassning är den aktuella illustrationen av idén.'), [item(pair('Agent → document tool → reviewed output', 'Agent → dokumentverktyg → granskat resultat'), pair('Service concept · synthetic examples', 'Tjänstekoncept · fiktiva exempel'))]),
      slide('roles', 'flow', pair('One workflow. Distinct responsibilities.', 'Ett arbetsflöde. Tydliga ansvarsområden.'), pair('The tool is one capability the agent uses. It does not need to own the conversation or every step of the business process.', 'Verktyget är en förmåga som agenten använder. Det behöver inte sköta samtalet eller varje steg i verksamhetens process.'), [
        item(pair('Your agent', 'Er agent'), pair('Understands the request and chooses when to call the tool.', 'Förstår begäran och väljer när verktyget ska anropas.')),
        item(pair('SoherDocs', 'SoherDocs'), pair('Uses source material and a target brief to prepare a tailored draft.', 'Använder källmaterial och ett syfte för att förbereda ett anpassat utkast.')),
        item(pair('Your workflow', 'Ert arbetsflöde'), pair('Reviews, approves and decides where the document goes.', 'Granskar, godkänner och avgör vart dokumentet ska skickas.')),
      ]),
      slide('inputs', 'split', pair('Useful drafts start with useful inputs.', 'Bra utkast börjar med bra underlag.'), pair('This is a conceptual service boundary, not a published API schema. The actual input and output contract would be agreed during implementation.', 'Detta är en konceptuell tjänstegräns, inte ett publicerat API-schema. Det faktiska in- och utdataformatet bestäms vid implementation.'), [
        item(pair('The agent provides', 'Agenten skickar'), pair('Approved source material · target brief · format and writing constraints', 'Godkänt källmaterial · syfte · format och skrivregler')),
        item(pair('The tool prepares', 'Verktyget förbereder'), pair('A tailored document draft for review, grounded in the supplied material', 'Ett anpassat dokumentutkast för granskning, förankrat i underlaget')),
      ]),
      slide('cv-example', 'document', pair('Current example: tailor a CV to a role.', 'Aktuellt exempel: anpassa ett CV till en roll.'), pair('Use a job posting as the target and a saved profile as evidence. Emphasize relevant experience without inventing qualifications.', 'Använd en jobbannons som mål och en sparad profil som underlag. Lyft relevant erfarenhet utan att hitta på meriter.'), [
        item(pair('Target brief', 'Mål'), pair('A role asks for API integrations and document workflows.', 'En roll efterfrågar API-integrationer och dokumentflöden.')),
        item(pair('Approved profile', 'Godkänd profil'), pair('The synthetic profile contains experience connecting business APIs.', 'Den fiktiva profilen innehåller erfarenhet av att koppla verksamhetens API:er.')),
        item(pair('Tailored draft', 'Anpassat utkast'), pair('Bring that supported experience forward. Flag missing information for review.', 'Lyft den belagda erfarenheten. Markera saknad information för granskning.')),
      ]),
      slide('cv-workflow', 'flow', pair('The CV walkthrough shows the full journey.', 'CV-genomgången visar hela flödet.'), pair('The existing seven-step visualization covers a job posting, saved CV evidence, tailored CV, cover letter, advisory review, optional saving and PDF export.', 'Den befintliga visualiseringen i sju steg omfattar jobbannons, sparat CV-underlag, anpassat CV, personligt brev, vägledande granskning, valfri lagring och PDF-export.'), [
        item(pair('Prepare', 'Förbered'), pair('Add the job posting and find relevant profile evidence.', 'Lägg till jobbannonsen och hitta relevant profilunderlag.')),
        item(pair('Draft & review', 'Skriv och granska'), pair('Tailor the CV and letter; check the draft against the brief.', 'Anpassa CV och brev; kontrollera utkastet mot målet.')),
        item(pair('Keep & export', 'Spara och exportera'), pair('Optionally save a variant and produce PDF outputs.', 'Spara en variant vid behov och skapa PDF-filer.')),
      ]),
      slide('review', 'cards', pair('Tailoring should not invent the facts.', 'Anpassning ska inte hitta på fakta.'), pair('Human review is part of the intended workflow. The original advisory ATS score uses fabricated data; it is not an employer result or a hiring prediction.', 'Mänsklig granskning ingår i det tänkta flödet. Den ursprungliga vägledande ATS-poängen använder fiktiva data; den är inte ett arbetsgivarresultat eller en prognos för anställning.'), [
        item(pair('Source boundaries', 'Avgränsat underlag'), pair('Agree which documents the tool may use.', 'Bestäm vilka dokument verktyget får använda.')),
        item(pair('Reviewable changes', 'Granskningsbara ändringar'), pair('Check facts, emphasis and missing information before use.', 'Kontrollera fakta, betoning och saknad information före användning.')),
        item(pair('Controlled delivery', 'Kontrollerad leverans'), pair('Let the surrounding workflow decide when to save or send.', 'Låt det omgivande flödet avgöra när något sparas eller skickas.')),
      ]),
      slide('future-documents', 'split', pair('A CV is the example.\nDocuments are the wider direction.', 'CV är exemplet.\nDokument är den större inriktningen.'), pair('Other document types need their own sources, templates and review rules. They should be scoped and validated separately.', 'Andra dokumenttyper behöver egna källor, mallar och granskningsregler. De behöver avgränsas och valideras var för sig.'), [
        item(pair('Illustrated today', 'Illustrerat i dag'), pair('CV and cover-letter tailoring, shown with synthetic data.', 'Anpassning av CV och personligt brev, visat med fiktiva data.')),
        item(pair('Possible future scope', 'Möjlig framtida omfattning'), pair('Contracts or other business documents, with domain-specific human review. Not implemented in this public demo.', 'Avtal eller andra affärsdokument, med sakkunnig mänsklig granskning. Inte implementerat i denna publika demo.')),
      ]),
      slide('next-step', 'closing', pair('What document does your workflow need?', 'Vilket dokument behöver ert arbetsflöde?'), pair('Start with one document type and one clear use case. We can design the tool around your agent, your source material and your approval process.', 'Börja med en dokumenttyp och ett tydligt användningsfall. Vi kan utforma verktyget runt er agent, ert underlag och er godkännandeprocess.'), [item(pair('Source material → tailored draft → approval', 'Källmaterial → anpassat utkast → godkännande'), pair('Document engineering, designed for your workflow.', 'Dokumentutveckling utifrån ert arbetsflöde.'))]),
    ],
  },
  {
    id: 'hektor', name: 'Hektor Agent', path: 'projects/hektor-agent.html', accent: 'green',
    category: pair('Support-agent concept', 'Koncept för supportagent'),
    tagline: pair('Helpful answers. A clear route to a person.', 'Hjälpsamma svar. En tydlig väg till en människa.'),
    description: pair('A support-agent concept connecting approved knowledge, customer conversations and staff documentation. Explore chat, a proposed voice flow, and handover with context.', 'Ett koncept för en supportagent som kopplar ihop godkänd kunskap, kundsamtal och personalens dokumentation. Utforska chatt, ett föreslaget röstflöde och överlämning med sammanhang.'),
    status: pair('Concept presentation · illustrative support scenarios', 'Konceptpresentation · illustrativa supportscenarier'),
    disclosure: pair('Hektor is the subject of this support concept, not the name of this development business or a verified customer endorsement. Telephone and case-system integrations remain unverified. Examples are illustrative.', 'Hektor är ämnet för detta supportkoncept, inte namnet på denna utvecklingsverksamhet eller en verifierad kundreferens. Telefon- och ärendesystemintegrationer återstår att verifiera. Exemplen är illustrativa.'),
    fit: pair('For support teams exploring answers from approved knowledge, better handovers and reviewed case notes.', 'För supportteam som vill utforska svar från godkänd kunskap, bättre överlämningar och granskade ärendeanteckningar.'),
    next: pair('Bring a recurring support question and the source your team trusts. We can scope the answer, escalation path and systems involved.', 'Ta med en återkommande supportfråga och den källa ert team litar på. Vi kan definiera svaret, vägen till mänsklig hjälp och berörda system.'),
    presentationDirectory: 'presentations/hektor',
    presentationFile: { en: 'en.md', sv: 'sv.md' },
    chapters: hektorChapters,
    slides: hektorSlides,  },
]

export const languages = ['en', 'sv']
export const localize = (value, lang) => typeof value === 'object' && value !== null && 'en' in value ? value[lang] : value
export const slidesFor = (demo, lang) => {
  let start = 0
  return demo.slides.map((s, i) => {
    const result = { ...s, number: i + 1, title: s.title[lang], summary: s.summary[lang], items: s.items.map(x => ({ title: x.title[lang], text: x.text[lang] })), start, end: start + s.seconds }
    start = result.end
    return result
  })
}

export const chaptersFor = (demo, lang) => {
  const slides = slidesFor(demo, lang)
  return demo.chapters ? demo.chapters.map((c,i) => ({
    id: slides[c.slide - 1].id, title: c.title[lang], summary: c.description[lang],
    start: slides[c.slide - 1].start,
    end: slides[(demo.chapters[i + 1]?.slide ?? slides.length + 1) - 2].end,
  })) : slides
}
