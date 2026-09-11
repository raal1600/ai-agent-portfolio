---
theme: default
title: Hektor Demo
info: |
  En agent som hjälper kunderna och avlastar hela teamet.
  Webbchatt, telefon och diktering för Hektor.
lang: sv
colorSchema: light
transition: fade
aspectRatio: 16/9
canvasWidth: 1200
fonts:
  sans: Segoe UI
  provider: none
defaults:
  layout: default
drawings:
  persist: false
---

<DeckHeader :chapter="0" />

<div class="kicker">MER SERVICE. MINDRE RUTINARBETE.</div>

# Hektor Demo

<div class="sv-cover"><div><p class="sv-cover-lead">En agent som hjälper kunderna<br>och avlastar hela teamet.</p><div class="sv-cover-channels"><span>Webbchatt</span><span>Telefon</span><span>Diktering</span></div><p class="sv-cover-note">Hektors kunskap. Hektors arbetssätt.<br>Fler frågor hanterade på samma gång.</p></div><div class="sv-cover-orbit"><div class="sv-orbit-core"><DeckIcon name="chat" /><strong>Hektor Agent</strong><span>En gemensam tjänst</span></div><div class="sv-orbit-outcomes"><span>Hjälper kunden</span><span>Förbereder ärendet</span><span>Avlastar teamet</span></div></div></div>

<DeckFooter :page="1" note="Hektor Demo / Ett samlat erbjudande för kundservice" />

<!--
Öppna med värdet: en gemensam agent som kan hjälpa kunder i chatten och på telefon samt förbereda personalens dokumentation. Hektor Demo är presentationens namn; Hektor Agent är tjänsten. Exemplen visar det tänkta erbjudandet, inte en driftsatt telefonlösning. Ingen faktisk Hektor-koppling eller uppnådd kapacitet är verifierad i detta presentationsrepo.
-->

---

<DeckHeader :chapter="1" />

<div class="kicker">VÄRDET FÖR KUNDEN</div>

# Snabbare hjälp. En enklare kundvardag.

<p class="intro">Kunden ska kunna få ett svar och förstå nästa steg.</p><div class="sv-cards"><section><div class="icon-tile"><DeckIcon name="clock" /></div><h2>Hjälp när frågan uppstår.</h2><p>Vanliga frågor kan få svar även när den bemannade supporten är stängd.</p></section><section><div class="icon-tile"><DeckIcon name="chat" /></div><h2>Flera får hjälp samtidigt.</h2><p>Samtal och chattar kan hanteras parallellt, så fler kunder kan få ett första svar.</p></section><section><div class="icon-tile"><DeckIcon name="person" /></div><h2>En väg vidare.</h2><p>När en fråga behöver en människa följer bakgrunden med till rätt person.</p></section></div><div class="sv-band">En tillgängligare första kontakt, med Hektors människor nära till hands.</div>

<DeckFooter :page="2" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Tre tänkta kundfördelar: tillgänglighet, parallell hjälp och en tydlig väg vidare. Lova inte obegränsad samtidighet, noll kötid eller oavbruten drift. Kapacitet dimensioneras efter trafik och leverantörsvillkor. Mänsklig hjälp beror på bemanning; när supporten är stängd ska en överenskommen uppföljning erbjudas.
-->

---

<DeckHeader :chapter="1" />

<div class="kicker">VÄRDET FÖR TEAMET</div>

# Samma frågor. Mindre dubbelarbete.

<p class="intro">Samma frågor, förklaringar och anteckningar tar tid varje dag.</p><div class="sv-before-after"><section><span class="card-label">I DAG</span><h2>Varje fråga kräver ny arbetstid.</h2><p>En medarbetare letar upp svaret, förklarar samma sak igen och skriver en anteckning.</p><div class="sv-task-tags"><span>Hitta svaret</span><span>Förklara</span><span>Dokumentera</span></div></section><div class="sv-between"><DeckIcon name="arrow" /></div><section class="sv-after"><span class="card-label">MED HEKTOR AGENT</span><h2>Kunskapen kan hjälpa fler.</h2><p>Agenten använder godkända svar, guidar kunden och förbereder underlaget för nästa steg.</p><div class="sv-task-tags"><span>Återanvänd kunskap</span><span>Avlasta</span><span>Följ upp</span></div></section></div><div class="sv-band">Mer tid för de kundärenden som behöver erfarenhet, ansvar och personlig kontakt.</div>

<DeckFooter :page="3" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Detta är en jämförelse av arbetssätt, inte en mätning av Hektors nuvarande process eller sparade timmar. Förklara konkret vilka återkommande arbetsmoment tjänsten är avsedd att automatisera. Att dokumentation förbereds innebär inte att ett ärende redan är sparat i Hektors system.
-->

---

<DeckHeader :chapter="2" />

<div class="kicker">ETT SAMLAT ERBJUDANDE</div>

# En agent. Tre sätt att skapa nytta.

<p class="intro">Samma kunskap och regler följer med mellan kanalerna.</p><div class="sv-cards"><section><div class="icon-tile"><DeckIcon name="chat" /></div><h2>Webbchatt</h2><p>Kunden skriver en fråga och får hjälp direkt på webbplatsen.</p></section><section><div class="icon-tile"><DeckIcon name="phone" /></div><h2>Telefon</h2><p>Kunden pratar på svenska och får ett begripligt svar eller hjälp vidare.</p></section><section><div class="icon-tile"><DeckIcon name="mic" /></div><h2>Diktering</h2><p>Medarbetaren berättar vad som hänt. Agenten förbereder en tydlig ärendeanteckning.</p></section></div><div class="sv-band"><b>Hektor Agent</b> knyter ihop kundfrågor, vägledning och dokumentation.</div>

<DeckFooter :page="4" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Skilj på kundkanaler och personalens arbetsflöde. Chatt och telefon ger kundhjälp; diktering hjälper personalen att dokumentera. Telefon och ärendesystem behöver tekniska kopplingar före drift. Leverantörsnamn och protokoll hör hemma i bakgrundsmaterialet, inte i denna översikt.
-->

---

<DeckHeader :chapter="2" />

<div class="kicker">EXEMPEL / WEBBCHATT</div>

# Så kan kunden få hjälp i chatten.

<div class="demo-layout"><div class="product-chat"><div class="product-chat-head"><div class="agent-symbol small"><DeckIcon name="chat" /></div><div><b>Hektor Agent</b><span>Här för att hjälpa dig</span></div><span class="concept-tag">EXEMPEL</span></div><div class="chat-body"><div class="message customer">Hur fungerar wifi-samtal?</div><div class="message agent">Du ringer via wifi i stället för mobilnätet. Din telefon behöver stödja tjänsten.<a href="https://hektormobil.se/kontakta-oss"><DeckIcon name="link" />Hektors vanliga frågor</a></div><div class="human-request"><DeckIcon name="person" />Prata med supporten</div><div class="message agent follow-up">Är supporten stängd kan du lämna en kontaktförfrågan.</div></div></div><div class="demo-explanation"><div class="explanation-step"><span class="annotation">1</span><div><h2>Ett begripligt svar.</h2><p>Kunden får en förklaring med stöd i Hektors egen information.</p></div></div><div class="explanation-step"><span class="annotation">2</span><div><h2>Ett tydligt nästa steg.</h2><p>Kunden kan gå vidare till en människa när det behövs.</p></div></div><div class="takeaway"><DeckIcon name="arrow" /><span>Hjälp utan krångliga omvägar.</span></div></div></div>

<DeckFooter :page="5" note="Hektor Demo / Illustrativ dialog utifrån Hektors vanliga frågor, S18" />

<!--
Dialogen är illustrativ och bygger på Hektors allmänna förklaring av wifi-samtal. Källa S18: https://hektormobil.se/kontakta-oss (forskningsunderlag kontrollerat 10 september 2026). Bilden är en redigerbar presentation, inte en livechatt. Tillgänglighet, kontaktförfrågningar och överlämning ska följa Hektors godkända arbetssätt.
-->

---

<DeckHeader :chapter="2" />

<div class="kicker">NI ÄGER INNEHÅLLET</div>

# Hektors kunskap bakom varje svar.

<p class="intro">Kunderna ska få hjälp utifrån den information ni står bakom.</p><div class="knowledge-diagram"><div class="knowledge-input"><div class="diagram-label">HEKTORS UNDERLAG</div><div class="source-document"><DeckIcon name="book" /><span>Vanliga frågor &amp; vägledning</span></div><div class="source-document"><DeckIcon name="document" /><span>Tjänster &amp; villkor</span></div></div><div class="diagram-arrow"><DeckIcon name="arrow" /></div><div class="knowledge-engine"><div class="agent-symbol"><DeckIcon name="chat" /></div><div class="diagram-label">HEKTOR AGENT</div><h2>Hitta svaret.<br>Förklara enkelt.</h2></div><div class="diagram-arrow"><DeckIcon name="arrow" /></div><div class="knowledge-answer"><div class="diagram-label">KUNDENS NYTTA</div><h2>Lättare att förstå.</h2><p>Ett svar som hjälper<br>kunden vidare.</p><div class="source-stamp"><DeckIcon name="link" />Hektors egen information</div></div></div><div class="dark-principle"><DeckIcon name="person" /><strong>Hektor bestämmer.</strong><span>Ni godkänner svar, regler och när en människa tar över.</span></div>

<DeckFooter :page="6" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Bilden visar det tänkta arbetssättet. Hektor behöver äga och hålla underlaget aktuellt. En källa hjälper granskning men garanterar inte korrekthet. Vid motstridig eller saknad information ska agenten kunna avstå från att svara och hänvisa vidare. Kopplingen till den befintliga agentens kunskapshantering är en förutsättning att verifiera.
-->

---

<DeckHeader :chapter="2" />

<div class="kicker">EXEMPEL / TELEFON PÅ SVENSKA</div>

# Samma hjälp, även när kunden ringer.

<div class="dialogue-label">ILLUSTRATIVT SAMTAL</div><div class="phone-dialogue"><div><b>Hektor</b><p>Hej! Du pratar med Hektors AI-assistent. Jag kan hjälpa dig med vanliga frågor eller hjälpa dig att nå supporten.</p></div><div class="caller"><b>Kunden</b><p>Hur fungerar wifi-samtal?</p></div><div><b>Hektor</b><p>Du ringer via wifi i stället för mobilnätet. Din telefon behöver stödja tjänsten.</p></div><div class="caller"><b>Kunden</b><p>Kan du kontrollera mitt abonnemang?</p></div><div class="boundary"><b>Hektor</b><p>Jag kan inte se dina abonnemangsuppgifter här. Jag hjälper dig vidare till supporten.</p></div></div><div class="sv-band">Kunden får hjälp med det agenten kan svara på och en tydlig väg vidare.</div>

<DeckFooter :page="7" note="Hektor Demo / Illustrativt samtal / Allmän information: Hektors FAQ, S18" />

<!--
Illustrativt telefonsamtal, inte inspelning eller testresultat. Allmänna svaret bygger på Hektors FAQ, S18 https://hektormobil.se/kontakta-oss . Agenten har ingen verifierad åtkomst till abonnemang i denna demo. Inledningen tydliggör att kunden talar med AI; den är inte ett godkänt fullständigt integritets- eller inspelningsmeddelande. Telefonkoppling, svensk talupplevelse och överlämning behöver verifieras före användning.
-->

---

<DeckHeader :chapter="2" />

<div class="kicker">EN ENKLARE ÖVERLÄMNING</div>

# Nästa kollega får med sig bakgrunden.

<p class="intro">Kunden ska inte behöva börja om när en människa tar över.</p><div class="handover-layout"><div class="handover-path"><div class="handover-event"><span class="path-circle"><DeckIcon name="chat" /></span><div><h2>Kunden behöver mer hjälp.</h2><p>Agenten samlar frågan och det som redan har sagts.</p></div></div><div class="handover-event"><span class="path-circle"><DeckIcon name="document" /></span><div><h2>Ett tydligt underlag följer med.</h2><p>Vad kunden vill, vad som är gjort och nästa steg.</p></div></div><div class="handover-event"><span class="path-circle"><DeckIcon name="person" /></span><div><h2>Rätt person tar vid.</h2><p>Direkt när det går, annars enligt överenskommen uppföljning.</p></div></div></div><div class="support-case"><div class="case-top"><span><DeckIcon name="document" />UNDERLAG TILL SUPPORT</span><span class="case-status">Exempel</span></div><h2>Fråga om abonnemang</h2><dl><dt>Kundens önskemål</dt><dd>Kontrollera abonnemanget</dd><dt>Redan förklarat</dt><dd>Så fungerar wifi-samtal</dd><dt>Kontroll utförd</dt><dd>Ingen abonnemangskontroll</dd></dl><div class="case-next"><DeckIcon name="arrow" /><div><b>Nästa steg</b><span>Supporten hjälper kunden vidare.</span></div></div></div></div>

<DeckFooter :page="8" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Överlämning av ett telefonsamtal och leverans av ärendeunderlag är separata kopplingar. Ärendet i bilden är fiktivt. Bekräfta mottagare, öppettider och uppföljning vid upptaget eller uteblivet svar. Misslyckad ärendeleverans ska fångas upp och försöka igen utan att blockera en brådskande kontakt med en människa. Underlaget ska skilja vad kunden sagt från vad systemen faktiskt bekräftat.
-->

---

<DeckHeader :chapter="2" />

<div class="kicker">DIKTERING FÖR MEDARBETARNA</div>

# Berätta vad som hänt. Få anteckningen klar.

<p class="intro">Mindre tid framför ett tomt ärendefält efter kundkontakten.</p><div class="voice-diagram sv-diagram">

```mermaid {scale:0.85}
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#e6f0e7","primaryTextColor":"#173d29","primaryBorderColor":"#9abda4","edgeLabelBackground":"transparent","lineColor":"#658a70","fontFamily":"Segoe UI","fontSize":"22px"},"flowchart":{"htmlLabels":false,"curve":"basis","rankSpacing":30,"nodeSpacing":22,"padding":15}}}%%
flowchart LR
 D["Medarbetaren\nberättar"] --> H["Hektor Agent\nförbereder texten"]
 H --> R["Medarbetaren\ngranskar och rättar"]
 R --> C["Godkänd anteckning\nsparas i ärendet"]
 style H fill:#173d29,color:#ffffff,stroke:#173d29
```

</div><div class="sv-note-example"><span class="card-label">EXEMPEL PÅ UNDERLAG</span><p><b>Kundens fråga</b> · Vad vi vet · Vad som har gjorts · Nästa steg · Vem som följer upp</p></div><div class="sv-band">Agenten förbereder. Medarbetaren kontrollerar och godkänner.</div>

<DeckFooter :page="9" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Separat personalflöde för diktering eller godkänd ljudfil. En transkriptionstjänst gör ljudet till text; Hektor förbereder ett utkast och en behörig ärendekoppling sparar först efter granskning. Föreslagen leverantör finns i bakgrundsmaterialet S12: https://elevenlabs.io/docs/overview/capabilities/speech-to-text . Namn, siffror, datum, löften och osäkra fält ska granskas. Dikterade instruktioner får inte direkt ändra ett kundkonto. Återanvänd AI-samtalets text och bekräftade resultat utan en extra transkribering som standard. Den mänskliga delen av ett överlämnat samtal kräver separat beslutad inspelning/transkribering; den ingår inte automatiskt.
-->

---

<DeckHeader :chapter="3" />

<div class="kicker">TRYGGHET OCH KONTROLL</div>

# Hektor sätter gränserna.

<p class="intro">Tjänsten ska följa era regler i varje kundkontakt.</p><div class="sv-cards"><section><div class="icon-tile"><DeckIcon name="book" /></div><h2>Ni väljer informationen.</h2><p>Agenten ska utgå från Hektors godkända svar och vägledning.</p></section><section><div class="icon-tile"><DeckIcon name="lock" /></div><h2>Ni styr åtkomsten.</h2><p>Personliga uppgifter kräver rätt behörighet och en godkänd identitetskontroll.</p></section><section><div class="icon-tile"><DeckIcon name="person" /></div><h2>En människa kan ta över.</h2><p>Kunden ska kunna få hjälp vidare när frågan kräver det eller något går fel.</p></section></div><div class="sv-band">Allmän hjälp först. Personlig support förutsätter godkända kopplingar och kontroller.</div>

<DeckFooter :page="10" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Detta är krav på den föreslagna tjänsten, inte verifierad säkerhet eller juridiskt godkännande. Identitet och behörigheter måste styras i Hektors system; ett påstående i chatten eller samtalet ger inte åtkomst. Telefonnummer ensamt är inte identifiering. Lova inte BankID eller kundkontouppslag som befintligt. Databehandling, leverantörer, meddelanden till kunden, lagring och felvägar behöver granskas. Den som inte verifierats ska ändå kunna nå en människa.
-->

---

<DeckHeader :chapter="3" />

<div class="kicker">ETT NYTT SÄTT ATT FÖRDELA ARBETET</div>

# Agenten tar rutinen. Teamet tar det vidare.

<div class="responsibility-pair"><section class="agent-role"><div class="role-top"><div class="icon-tile"><DeckIcon name="chat" /></div><span class="role-label">HEKTOR AGENT</span></div><h2>Det återkommande arbetet</h2><ul class="check-list"><li><DeckIcon name="check" />Förklara vanliga frågor</li><li><DeckIcon name="check" />Guida till rätt nästa steg</li><li><DeckIcon name="check" />Förbereda ärendeunderlag</li></ul><div class="role-bottom">Samma kunskap kan hjälpa många.</div></section><section class="human-role"><div class="role-top"><div class="icon-tile"><DeckIcon name="person" /></div><span class="role-label">HEKTORS TEAM</span></div><h2>Det som kräver omdöme</h2><ul class="check-list"><li><DeckIcon name="check" />Hantera undantag och känsliga frågor</li><li><DeckIcon name="check" />Ta ansvar för beslut och löften</li><li><DeckIcon name="check" />Utveckla kundrelationen</li></ul><div class="role-bottom">Mer utrymme för mänsklig service.</div></section></div>

<DeckFooter :page="11" note="Hektor Demo / Så kan tjänsten fungera" />

<!--
Visa vilka arbetsmoment som kan flyttas från repetitiv handläggning till automation. Det betyder inte att alla medarbetaruppgifter försvinner. Kontoändringar, kommersiella åtaganden och känsliga ärenden ligger kvar hos behöriga personer tills särskilt godkända funktioner finns. Undvik påhittade antal ersatta medarbetare eller sparade timmar.
-->

---

<DeckHeader :chapter="3" />

<div class="kicker">VÄXA MED BEHOVET</div>

# Fler kundkontakter med samma team.

<p class="intro">En gemensam agent kan avlasta flera medarbetare samtidigt.</p><div class="voice-diagram sv-diagram">

```mermaid {scale:0.75}
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#e6f0e7","primaryTextColor":"#173d29","primaryBorderColor":"#9abda4","edgeLabelBackground":"transparent","lineColor":"#658a70","fontFamily":"Segoe UI","fontSize":"22px"},"flowchart":{"htmlLabels":false,"curve":"basis","rankSpacing":30,"nodeSpacing":22,"padding":15}}}%%
flowchart LR
 C1["Kund i chatten"] <--> H["HEKTOR AGENT\nGemensam kunskap"]
 C2["Kund på telefon"] <--> H
 M["Medarbetarens anteckning"] --> H
 H --> S["Svar och vägledning"]
 H --> U["Förberett ärendeunderlag"]
 H --> P["Mänsklig hjälp vid behov"]
 style H fill:#173d29,color:#ffffff,stroke:#173d29,stroke-width:3px
```

</div><div class="sv-band">Potentialen ligger i att automatisera återkommande arbetsmoment över hela teamet.</div>

<DeckFooter :page="12" note="Hektor Demo / Kapacitet anpassas till trafik och överenskommen omfattning" />

<!--
En agent betyder här en gemensam konfigurerad tjänst, inte en obegränsad teknisk instans. Samtidighet, svarstid och tillgänglighet beror på dimensionering, trafik och avtal. Figuren visar tänkta parallella flöden utan uppmätt kapacitetslöfte. Ambitionen är teamomfattande avlastning, inte ett verifierat löfte om att ersätta ett visst antal personer.
-->

---

<DeckHeader :chapter="4" />

<div class="kicker">ETT ERBJUDANDE SOM HÄNGER IHOP</div>

# Det här är värdet för Hektor.

<p class="intro">Från den första frågan till ett tydligt nästa steg.</p><div class="sv-value-grid"><section><span>01</span><div><h2>Tillgängligare kundservice</h2><p>Hjälp med vanliga frågor via chatt och telefon.</p></div></section><section><span>02</span><div><h2>Mindre återkommande arbete</h2><p>Samma godkända kunskap kan hjälpa fler kunder.</p></div></section><section><span>03</span><div><h2>Enklare dokumentation</h2><p>Diktering och förberedda underlag avlastar medarbetarna.</p></div></section><section><span>04</span><div><h2>Hektor behåller kontrollen</h2><p>Ni bestämmer information, åtkomst och mänsklig uppföljning.</p></div></section></div>

<DeckFooter :page="13" note="Hektor Demo / Kundnytta, avlastning och kontroll" />

<!--
Samla nyttan utan att återgå till teknik eller en förfrågan om pilot. Chatt, telefon och personaldiktering ingår i erbjudandets tänkta helhet; exakt leveransomfattning och löpande kostnader fastställs i offert. Inga av dessa mål är uppmätta besparingar i denna demo.
-->

---

<DeckHeader :chapter="4" />

<div class="kicker">VÅRT ERBJUDANDE TILL HEKTOR</div>

# En agent. Värde för ett helt team.

<div class="sv-close"><div class="sv-close-price"><span class="sv-close-one">1</span><div><strong>Hektor Agent</strong><p>till kostnaden av<br>en supportmedarbetare</p></div></div><div class="sv-close-value"><h2>Potential att automatisera<br>ett helt teams<br>återkommande arbete.</h2><p>Fler kunder får hjälp.<br>Mindre rutin för medarbetarna.<br>Hektor behåller kontrollen.</p></div></div><div class="sv-close-bottom">Webbchatt · Telefon · Diktering<span>En gemensam tjänst. Nytta i varje kundkontakt.</span></div>

<DeckFooter :page="14" note="Erbjudandets omfattning och kostnadsram preciseras i offert. Automatiseringsgrad är ännu inte uppmätt." />

<!--
Avsluta på erbjudandet, inte med en fråga om pilot. Kostnadsjämförelsen kommer från uppdragsgivarens uttryckliga kommersiella inriktning: en agent ska erbjudas till kostnaden av en supportmedarbetare. Den är inte en oberoende marknadsuppgift eller färdig kalkyl. Innan offert behöver parterna definiera om jämförelsen avser lön eller full arbetsgivarkostnad och vilka införande-, drift-, telefoni-, användnings- och granskningskostnader som ingår. Inga kronor, lönebelopp eller besparingsprocent är fastställda här. Formuleringen om ett helt team avser potentialen att automatisera dess återkommande arbete; den lovar inte att all mänsklig support kan ersättas. Kapacitet och faktisk automatiseringsgrad återstår att verifiera.
-->
