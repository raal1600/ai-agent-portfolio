// Approved storyboard shared by the Slidev deck and published demo transcript.
export const story = [
  {
    stage: ['The idea', 'Idén'],
    title: ['From a business request\nto software you can review.', 'Från verksamhetens behov\ntill programvara att granska.'],
    intro: ['SoherAgent is a concept for coordinating software agents around a shared plan, connected tools and human decisions.', 'SoherAgent är ett koncept för att samordna mjukvaruagenter med en gemensam plan, anslutna verktyg och mänskliga beslut.'],
    labels: [['Your request', 'Ditt behov'], ['A shared plan', 'En gemensam plan'], ['Coordinated work', 'Samordnat arbete'], ['Your decision', 'Ditt beslut']],
    note: ['One example. From request to review.', 'Ett exempel. Från behov till granskning.'],
  },
  {
    stage: ['01 / Request', '01 / Behov'],
    title: ['Start with a problem\nyour team recognizes.', 'Börja med ett problem\nsom teamet känner igen.'],
    intro: ['Example: your team needs an internal tool to find service contracts and see when they renew.', 'Exempel: teamet behöver ett internt verktyg för att hitta serviceavtal och se när de förnyas.'],
    labels: [['The request', 'Önskemålet'], ['“Help us find the right contract without searching through folders.”', '”Hjälp oss att hitta rätt avtal utan att leta i mappar.”'], ['The context', 'Förutsättningarna'], ['Approved contract sources', 'Godkända avtalskällor'], ['Existing access rules', 'Befintliga behörigheter'], ['A person responsible for review', 'En ansvarig granskare']],
    note: ['Illustrative project brief — not a customer case study.', 'Illustrativ projektbeskrivning — inget kundcase.'],
  },
  {
    stage: ['02 / Plan', '02 / Plan'],
    title: ['Agree on the work\nbefore the agents begin.', 'Kom överens om arbetet\ninnan agenterna börjar.'],
    intro: ['Turn the request into a small, reviewable scope. Resolve open questions with the team.', 'Gör önskemålet till ett avgränsat uppdrag som går att granska. Red ut öppna frågor med teamet.'],
    labels: [['Proposed scope', 'Föreslagen omfattning'], ['Connect an approved source', 'Anslut en godkänd källa'], ['Build search and a contract view', 'Bygg sökning och avtalsvy'], ['Check permissions and results', 'Kontrollera behörigheter och resultat'], ['Outside this example', 'Utanför detta exempel'], ['Editing or signing contracts', 'Att ändra eller signera avtal'], ['Decision before execution', 'Beslut före genomförandet'], ['The team approves the scope.', 'Teamet godkänner omfattningen.']],
    note: ['A clear scope gives every agent the same target.', 'En tydlig omfattning ger alla agenter samma mål.'],
  },
  {
    stage: ['03 / Coordinate', '03 / Samordna'],
    title: ['Different tasks.\nOne shared plan.', 'Olika uppgifter.\nEn gemensam plan.'],
    intro: ['A coordinator divides the work, connects the results and brings unresolved questions back to a person.', 'En samordnare delar upp arbetet, sammanför resultaten och lyfter olösta frågor till en människa.'],
    labels: [['Coordinator', 'Samordnare'], ['Keeps scope and dependencies together', 'Håller ihop omfattning och beroenden'], ['Interface agent', 'Gränssnittsagent'], ['Builds search and the contract view', 'Bygger sökning och avtalsvy'], ['Integration agent', 'Integrationsagent'], ['Connects the approved data source', 'Ansluter den godkända datakällan'], ['Review agent', 'Granskningsagent'], ['Checks the proposed changes', 'Kontrollerar föreslagna ändringar']],
    note: ['Illustrative roles, chosen to fit the assignment.', 'Illustrativa roller som anpassas till uppdraget.'],
  },
  {
    stage: ['04 / Connect', '04 / Anslut'],
    title: ['Tools make the work possible.\nPermissions set the limits.', 'Verktyg gör arbetet möjligt.\nBehörigheter sätter gränserna.'],
    intro: ['The workflow is designed around the systems you allow it to use and the actions you approve.', 'Arbetsflödet utformas efter de system du ger tillgång till och de åtgärder du godkänner.'],
    labels: [['Software agents', 'Mjukvaruagenter'], ['Allowed connections', 'Tillåtna anslutningar'], ['Code repository', 'Kodarkiv'], ['Prepare a proposed change', 'Förbered ett ändringsförslag'], ['Approved API', 'Godkänt API'], ['Read the agreed data', 'Läs överenskomna data'], ['Test environment', 'Testmiljö'], ['Check behavior before review', 'Kontrollera beteendet före granskning'], ['Production access', 'Åtkomst till produktion'], ['Requires a separate decision', 'Kräver ett separat beslut']],
    note: ['Access is defined for the project, not assumed.', 'Åtkomst bestäms för projektet och tas inte för given.'],
  },
  {
    stage: ['05 / Review', '05 / Granska'],
    title: ['Make the handoff\neasy to judge.', 'Gör resultatet\nenkelt att bedöma.'],
    intro: ['The proposed handoff brings the software change, checks and open questions together for your reviewer.', 'Den tänkta överlämningen samlar programändringen, kontrollerna och öppna frågor för din granskare.'],
    labels: [['For your review', 'För din granskning'], ['Proposed change', 'Föreslagen ändring'], ['Contract search and detail view', 'Avtalssökning och detaljvy'], ['Checks to inspect', 'Kontroller att granska'], ['Search behavior and access rules', 'Sökfunktion och behörighetsregler'], ['Question to resolve', 'Fråga att reda ut'], ['Who can see renewal dates?', 'Vem får se förnyelsedatum?'], ['Your decision', 'Ditt beslut'], ['Approve the next step', 'Godkänn nästa steg'], ['Request changes', 'Begär ändringar'], ['Pause and clarify', 'Pausa och förtydliga']],
    note: ['A proposed result is ready for review, not automatically released.', 'Ett föreslaget resultat är klart för granskning, inte automatiskt publicerat.'],
  },
  {
    stage: ['06 / Outcome', '06 / Resultat'],
    title: ['A useful internal tool.\nA clear next decision.', 'Ett användbart internt verktyg.\nEtt tydligt nästa beslut.'],
    intro: ['The target is a tool your team can assess in a test environment before deciding how to introduce it.', 'Målet är ett verktyg som teamet kan bedöma i en testmiljö innan ni bestämmer hur det ska införas.'],
    labels: [['Illustration of the intended tool', 'Illustration av det tänkta verktyget'], ['Find a service contract', 'Hitta ett serviceavtal'], ['Search approved contracts…', 'Sök bland godkända avtal…'], ['Example contract', 'Exempelavtal'], ['Source document', 'Källdokument'], ['Renewal date', 'Förnyelsedatum'], ['Access follows company rules', 'Åtkomst följer företagets regler'], ['What the team evaluates', 'Det teamet bedömer'], ['Can people find what they need?', 'Hittar användarna det de behöver?'], ['Are permissions correct?', 'Är behörigheterna rätt?'], ['What needs another iteration?', 'Vad behöver förbättras?']],
    note: ['Concept illustration with placeholders — not a live product screen.', 'Konceptillustration med platshållare — ingen skärmbild av en fungerande produkt.'],
  },
  {
    stage: ['Your project', 'Ditt projekt'],
    title: ['Bring one task\nyour company needs done.', 'Ta med en uppgift\nsom företaget behöver lösa.'],
    intro: ['I can help shape a custom agent workflow around your systems, permissions and review process.', 'Jag kan hjälpa dig att utforma ett anpassat agentflöde utifrån era system, behörigheter och sätt att granska arbetet.'],
    labels: [['The task', 'Uppgiften'], ['What should the team be able to do?', 'Vad ska teamet kunna göra?'], ['The systems', 'Systemen'], ['Which tools and data are involved?', 'Vilka verktyg och data berörs?'], ['The decision', 'Beslutet'], ['Who reviews and approves the work?', 'Vem granskar och godkänner arbetet?']],
    note: ['Rami Halabi · Custom AI-agent development', 'Rami Halabi · Utveckling av anpassade AI-agenter'],
  },
]

export const localized = (index, locale) => {
  const lang = locale === 'sv' ? 1 : 0
  return Object.fromEntries(Object.entries(story[index]).map(([key, value]) => [key, key === 'labels' ? value.map(pair => pair[lang]) : value[lang]]))
}
