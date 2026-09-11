import { hektorSlides, hektorChapters } from './hektor.mjs'

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
    slides: [
      slide('overview', 'cover', pair('An agent needs a plan.\nAnd clear boundaries.', 'En agent behöver en plan.\nOch tydliga ramar.'), pair('SoherAgent explores how software agents can move from a request to reviewable work, with a person deciding what is accepted.', 'SoherAgent utforskar hur mjukvaruagenter kan gå från en begäran till granskningsbart arbete, där en människa avgör vad som godkänns.'), [item(pair('Request → plan → execute → review', 'Begäran → plan → utför → granska'), pair('A guided engineering workflow', 'Ett väglett utvecklingsflöde'))]),
      slide('problem', 'cards', pair('The hard part is coordinating the work.', 'Det svåra är att samordna arbetet.'), pair('Generating code is one step. A useful development workflow also needs shared context, ownership and a way to judge the result.', 'Att generera kod är ett steg. Ett användbart utvecklingsflöde behöver också gemensam kontext, ansvar och ett sätt att bedöma resultatet.'), [
        item(pair('What should change?', 'Vad ska ändras?'), pair('Turn a broad request into an explicit scope and acceptance criteria.', 'Gör en bred begäran till en tydlig omfattning och acceptanskriterier.')),
        item(pair('Who can do what?', 'Vem får göra vad?'), pair('Assign bounded tasks and permissions before execution.', 'Tilldela avgränsade uppgifter och behörigheter före körning.')),
        item(pair('How do we check it?', 'Hur kontrollerar vi det?'), pair('Keep outputs and checks available for human review.', 'Gör resultat och kontroller tillgängliga för mänsklig granskning.')),
      ]),
      slide('plan', 'flow', pair('Make the task concrete before execution.', 'Gör uppgiften konkret före körning.'), pair('For example, a team wants an internal tool to understand service contracts. Agree what it should do and which information it may use.', 'Till exempel vill ett team ha ett internt verktyg för att förstå tjänsteavtal. Bestäm vad det ska göra och vilken information det får använda.'), [
        item(pair('A request', 'En begäran'), pair('Help a team understand service contracts.', 'Hjälp ett team att förstå tjänsteavtal.')),
        item(pair('A reviewed specification', 'En granskad specifikation'), pair('Define inputs, boundaries and expected outputs.', 'Definiera indata, gränser och förväntade resultat.')),
        item(pair('A work plan', 'En arbetsplan'), pair('Break the scope into steps that can be checked.', 'Dela upp arbetet i steg som går att kontrollera.')),
      ]),
      slide('coordinate', 'flow', pair('Divide the work. Keep a shared plan.', 'Dela upp arbetet. Behåll en gemensam plan.'), pair('A coordinating agent holds the plan. Other agents take on specific tasks and bring their results back for review.', 'En samordnande agent håller i planen. Andra agenter tar hand om avgränsade uppgifter och lämnar tillbaka resultaten för granskning.'), [
        item(pair('Coordinator', 'Samordnare'), pair('Holds the approved scope and delegates work.', 'Håller den godkända omfattningen och delegerar arbete.')),
        item(pair('Task workers', 'Delagenter'), pair('Operate within assigned task boundaries.', 'Arbetar inom tilldelade uppgiftsgränser.')),
        item(pair('Review point', 'Granskningspunkt'), pair('Collect outputs, checks and unresolved questions.', 'Samlar resultat, kontroller och öppna frågor.')),
      ]),
      slide('controls', 'cards', pair('Your team sets the boundaries.', 'Ert team sätter ramarna.'), pair('You choose the scope and the tools. The agent works within those limits and brings decisions back to your team.', 'Ni väljer uppgiften och verktygen. Agenten arbetar inom de ramarna och lämnar besluten till ert team.'), [
        item(pair('An agreed task', 'En överenskommen uppgift'), pair('Focus on the work approved for this request.', 'Fokusera på det arbete som godkänts för uppgiften.')),
        item(pair('Allowed tools', 'Tillåtna verktyg'), pair('Use only agreed systems and information.', 'Använd bara överenskomna system och information.')),
        item(pair('Human checkpoints', 'Mänskliga beslut'), pair('Ask for a decision when work needs approval.', 'Be om ett beslut när arbetet behöver godkännas.')),
      ]),
      { ...slide('use-cases', 'cards', pair('Start with work your team needs done.', 'Börja med arbete ert team behöver få gjort.'), pair('Possible starting points include an internal tool, a connection between systems or a focused change to existing software.', 'Möjliga utgångspunkter är ett internt verktyg, en koppling mellan system eller en avgränsad ändring i befintlig programvara.'), [
        item(pair('An internal tool', 'Ett internt verktyg'), pair('Help staff find and work with approved information.', 'Hjälp medarbetare att hitta och arbeta med godkänd information.')),
        item(pair('A system connection', 'En systemkoppling'), pair('Connect a defined step between existing tools.', 'Koppla ihop ett avgränsat steg mellan befintliga verktyg.')),
        item(pair('A software change', 'En programändring'), pair('Prepare a focused improvement for your team to review.', 'Förbered en avgränsad förbättring som ert team kan granska.')),
      ]), aliases: ['evidence'] },
      slide('review', 'split', pair('Your team decides what happens next.', 'Ert team avgör nästa steg.'), pair('The agent presents the proposed change and any open questions. Your team reviews the result before accepting it.', 'Agenten presenterar den föreslagna ändringen och eventuella öppna frågor. Ert team granskar resultatet innan det godkänns.'), [
        item(pair('Agent prepares', 'Agenten förbereder'), pair('Proposed change · a clear summary · remaining questions', 'Föreslagen ändring · en tydlig sammanfattning · kvarstående frågor')),
        item(pair('A person decides', 'En människa avgör'), pair('Accept · request changes · adjust scope', 'Godkänn · begär ändringar · justera omfattningen')),
      ]),
      slide('next-step', 'closing', pair('Start with one reviewable task.', 'Börja med en uppgift som går att granska.'), pair('We can scope an engineering-agent workflow around your tools, permissions and review process. The first conversation starts with the work your team needs to do.', 'Vi kan utforma ett agentflöde för utveckling runt era verktyg, behörigheter och granskningar. Det första samtalet börjar med arbetet ert team behöver få gjort.'), [item(pair('Bring the task. Define the checks.', 'Ta med uppgiften. Definiera kontrollerna.'), pair('Custom engineering, scoped to your systems.', 'Skräddarsydd utveckling utifrån era system.'))]),
    ],
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
