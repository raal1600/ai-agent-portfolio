<script setup>
import { computed } from 'vue'
import { localized } from '../review/soheragent-story.mjs'
const props = defineProps({ index: Number, locale: String })
const s = computed(() => localized(props.index, props.locale))
</script>

<template>
  <article class="sa-story" :class="[{ dark: index === 0 || index === 7 }, `scene-${index}`]" :lang="locale">
    <header><div class="brand"><i></i>Soher<span>Agent</span></div><span>{{ locale === 'sv' ? 'KONCEPTPRESENTATION' : 'CONCEPT PRESENTATION' }}</span><b>{{ locale.toUpperCase() }}</b></header>
    <main>
      <div class="heading"><p class="eyebrow">{{ s.stage }}</p><h1>{{ s.title }}</h1><p class="intro">{{ s.intro }}</p></div>

      <div v-if="index === 0" class="journey">
        <div v-for="(label, n) in s.labels" :key="label" class="journey-stop"><span class="orbit">{{ String(n + 1).padStart(2, '0') }}</span><h2>{{ label }}</h2><span v-if="n < 3" class="next">→</span></div>
      </div>

      <div v-if="index === 1" class="request-layout">
        <div class="brief"><p class="eyebrow">{{ s.labels[0] }}</p><blockquote>{{ s.labels[1] }}</blockquote><div class="brief-line"></div><span>{{ s.note }}</span></div>
        <div class="context"><h2>{{ s.labels[2] }}</h2><p v-for="n in [3,4,5]" :key="n"><span class="small-dot"></span>{{ s.labels[n] }}</p></div>
      </div>

      <div v-if="index === 2" class="plan-layout">
        <div class="plan"><h2>{{ s.labels[0] }}</h2><div v-for="n in [1,2,3]" :key="n" class="plan-row"><b>0{{ n }}</b><span>{{ s.labels[n] }}</span></div></div>
        <div class="plan-side"><div class="outside"><p class="eyebrow">{{ s.labels[4] }}</p><h2>{{ s.labels[5] }}</h2></div><div class="gate"><span class="gate-symbol">↳</span><p class="eyebrow">{{ s.labels[6] }}</p><h2>{{ s.labels[7] }}</h2></div></div>
      </div>

      <div v-if="index === 3" class="orchestration">
        <div class="coordinator"><span class="node-icon">◎</span><div><h2>{{ s.labels[0] }}</h2><p>{{ s.labels[1] }}</p></div></div>
        <svg class="branches" viewBox="0 0 1072 70" preserveAspectRatio="none" aria-hidden="true"><path d="M536 0V30 M171 70V30H901V70 M536 30V70" /></svg>
        <div class="workers"><div v-for="n in [2,4,6]" :key="n" class="worker"><b class="worker-id">0{{ n / 2 }}</b><h2>{{ s.labels[n] }}</h2><p>{{ s.labels[n+1] }}</p></div></div>
      </div>

      <div v-if="index === 4" class="connections">
        <div class="agent-node"><span>◎</span><h2>{{ s.labels[0] }}</h2></div><div class="connector">→</div>
        <div class="access"><p class="eyebrow">{{ s.labels[1] }}</p><div v-for="n in [2,4,6]" :key="n" class="tool-row"><span class="tool-symbol">{{ n === 2 ? '⌘' : n === 4 ? '↔' : '✓' }}</span><div><h2>{{ s.labels[n] }}</h2><p>{{ s.labels[n+1] }}</p></div></div></div>
        <div class="separate"><span>⊘</span><h2>{{ s.labels[8] }}</h2><p>{{ s.labels[9] }}</p></div>
      </div>

      <div v-if="index === 5" class="review-layout"><div class="review-sheet"><p class="eyebrow">{{ s.labels[0] }}</p><div v-for="n in [1,3,5]" :key="n"><h2>{{ s.labels[n] }}</h2><p>{{ s.labels[n+1] }}</p></div></div><span class="review-arrow">→</span><div class="decisions"><p class="eyebrow">{{ s.labels[7] }}</p><div v-for="n in [8,9,10]" :key="n" :class="{ primary: n === 8 }"><span>{{ n === 8 ? '↗' : n === 9 ? '↩' : 'Ⅱ' }}</span>{{ s.labels[n] }}</div></div></div>

      <div v-if="index === 6" class="outcome-layout"><div class="mockup"><div class="mockup-bar"><span>● ● ●</span><b>{{ s.labels[0] }}</b></div><div class="mockup-body"><h2>{{ s.labels[1] }}</h2><div class="search"><span>⌕</span>{{ s.labels[2] }}</div><div class="result"><b>{{ s.labels[3] }}</b><span>{{ s.labels[4] }} ↗</span><span>{{ s.labels[5] }} <em>—</em></span></div><p class="access-note">{{ s.labels[6] }}</p></div></div><div class="evaluation"><p class="eyebrow">{{ s.labels[7] }}</p><p v-for="n in [8,9,10]" :key="n"><span>0{{ n - 7 }}</span>{{ s.labels[n] }}</p></div></div>

      <div v-if="index === 7" class="closing-grid"><div v-for="n in [0,2,4]" :key="n"><span class="closing-number">0{{ n/2+1 }}</span><h2>{{ s.labels[n] }}</h2><p>{{ s.labels[n+1] }}</p></div></div>
      <p v-if="index !== 1" class="takeaway">{{ s.note }}</p>
    </main>
    <footer><span>Rami Halabi</span><span>{{ locale === 'sv' ? 'Illustrerat koncept · ingen livekörning' : 'Illustrated concept · not a live execution' }}</span><span>{{ String(index+1).padStart(2,'0') }} / 08</span></footer>
    <div class="story-progress" :style="{width: `${(index+1)/8*100}%`}"></div>
  </article>
</template>

<style scoped>
.sa-story{width:1200px;height:675px;position:relative;overflow:hidden;background:#f6f8f5;color:#15382f;font-family:'Segoe UI',Arial,sans-serif;--green:#087c58;--line:#d7e2db;--muted:#586d66}
.sa-story *{box-sizing:border-box}.sa-story header{position:absolute;inset:26px 64px auto;display:flex;align-items:center;gap:25px;font-size:10px;letter-spacing:1.5px;color:var(--muted)}.brand{display:flex;align-items:center;font-size:25px;letter-spacing:-1px;font-weight:700;margin-right:auto}.brand span{font-weight:400}.brand i{display:block;width:8px;height:22px;background:var(--green);transform:skew(-14deg);margin-right:10px}.sa-story header b{padding:5px 8px;border:1px solid var(--line);border-radius:4px;font-weight:500}
.sa-story main{position:absolute;inset:98px 64px 58px}.sa-story .eyebrow{font-size:11px;line-height:1.4;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:var(--green);margin:0 0 12px}.sa-story h1{font-size:42px;line-height:1.12;letter-spacing:-1.5px;font-weight:650;white-space:pre-line;margin:0 0 14px}.sa-story .intro{font-size:19px;line-height:1.45;max-width:940px;color:var(--muted);margin:0}.sa-story h2{font-size:23px;line-height:1.25;letter-spacing:-.5px;font-weight:600;margin:0}.sa-story p{opacity:1}.sa-story .takeaway{position:absolute;bottom:0;left:0;font-size:14px;line-height:1.35;color:var(--muted);margin:0;padding-left:14px;border-left:3px solid var(--green)}.sa-story footer{position:absolute;inset:auto 64px 20px;display:flex;justify-content:space-between;font-size:10px;color:var(--muted)}.story-progress{position:absolute;left:0;bottom:0;height:3px;background:var(--green)}
.sa-story.dark{background:#102f27;color:#f5faf6;--green:#72e0b3;--muted:#c3d8ce;--line:#37594c}.dark h1{font-size:52px}.dark .intro{max-width:900px;font-size:21px}.dark .brand i{background:#72e0b3}
.journey{display:flex;margin-top:39px;gap:38px}.journey-stop{flex:1;position:relative}.orbit{display:grid;place-items:center;width:66px;height:66px;border:1px solid #649480;border-radius:50%;background:#1e4438;font-size:21px;color:#a9edcf;margin-bottom:21px}.journey-stop h2{font-size:23px;max-width:210px}.next{position:absolute;right:10px;top:7px;color:#72e0b3;font-size:36px}
.request-layout{display:grid;grid-template-columns:1.15fr 1fr;gap:52px;margin-top:25px;align-items:center}.brief{padding:27px 32px;background:#e2f2e9;border-left:4px solid #087c58;border-radius:0 12px 12px 0}.brief blockquote{font-size:28px;line-height:1.3;letter-spacing:-.5px;margin:0;font-weight:500;padding:0;border:0}.brief-line{width:42px;height:2px;background:#a6c5b5;margin:20px 0 12px}.brief>span{font-size:11px;color:#586d66}.context h2{margin-bottom:18px}.context p{display:flex;gap:15px;align-items:center;font-size:19px;margin:14px 0;color:var(--muted)}.small-dot{width:7px;height:7px;border-radius:50%;background:var(--green);flex:none}
.plan-layout{display:grid;grid-template-columns:1.15fr 1fr;gap:28px;margin-top:23px}.plan{background:white;border:1px solid var(--line);padding:24px 28px;border-radius:12px}.plan h2{margin-bottom:10px}.plan-row{display:flex;align-items:center;gap:18px;padding:13px 0;border-top:1px solid #e8eee8;font-size:19px}.plan-row b{font-size:12px;color:var(--green)}.plan-side{display:grid;grid-template-rows:1fr 1fr;gap:12px}.outside,.gate{padding:19px 25px;border-radius:10px}.outside{background:#e9ede7}.outside h2,.gate h2{font-size:21px}.outside .eyebrow,.gate .eyebrow{margin-bottom:8px}.gate{background:#15382f;color:white;position:relative}.gate .eyebrow{color:#a9edcf}.gate-symbol{position:absolute;right:24px;top:21px;font-size:30px;color:#a9edcf}
.orchestration{margin-top:20px}.coordinator{width:520px;display:flex;align-items:center;gap:22px;background:#15382f;color:white;padding:17px 24px;border-radius:10px;margin:auto}.coordinator p{font-size:16px;margin:5px 0 0;color:#c3d8ce}.node-icon{font-size:43px;color:#72e0b3}.branches{width:100%;height:39px;display:block;overflow:visible}.branches path{fill:none;stroke:#86ad9a;stroke-width:1.5;vector-effect:non-scaling-stroke}.workers{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.worker{background:white;border:1px solid var(--line);border-top:3px solid #087c58;border-radius:8px;padding:18px 23px;position:relative}.worker-id{font-size:10px;letter-spacing:1px;color:var(--green);display:block;margin-bottom:10px}.worker h2{font-size:22px}.worker p{font-size:17px;color:var(--muted);line-height:1.35;margin:9px 0 0}
.connections{display:grid;grid-template-columns:210px 50px 470px 1fr;gap:18px;align-items:center;margin-top:24px}.agent-node{border:1px solid #aac9b7;background:#e2f2e9;padding:25px 16px;text-align:center;border-radius:12px}.agent-node>span{font-size:50px;color:var(--green);display:block;margin-bottom:14px}.agent-node h2{font-size:22px}.connector{font-size:35px;color:var(--green);text-align:center}.access{border:1px solid #aac9b7;border-radius:12px;padding:17px 23px}.access .eyebrow{margin-bottom:5px}.tool-row{display:flex;gap:17px;align-items:center;padding:10px 0}.tool-row h2{font-size:20px}.tool-row p{font-size:16px;color:var(--muted);margin:3px 0 0}.tool-symbol{font-size:25px;color:var(--green);width:24px;text-align:center}.separate{border-left:1px dashed #a7b6ac;padding:20px 0 20px 22px;align-self:center}.separate>span{font-size:29px;color:#766048;display:block;margin-bottom:15px}.separate h2{font-size:21px}.separate p{font-size:16px;color:var(--muted);margin:9px 0 0;line-height:1.4}
.review-layout{display:grid;grid-template-columns:1.15fr 60px 1fr;gap:24px;align-items:center;margin-top:23px}.review-sheet{background:white;border:1px solid var(--line);border-radius:10px;padding:22px 28px}.review-sheet>div{padding:10px 0;border-top:1px solid #e3eae3}.review-sheet h2{font-size:18px}.review-sheet p:not(.eyebrow){font-size:17px;margin:5px 0 0;color:var(--muted)}.review-arrow{font-size:37px;color:var(--green);text-align:center}.decisions>div{font-size:20px;border:1px solid #c5d4c9;border-radius:7px;margin:11px 0;padding:15px 19px;background:white}.decisions>div.primary{background:#15382f;border-color:#15382f;color:white}.decisions>div>span{display:inline-block;margin-right:18px}.decisions .eyebrow{margin-bottom:16px}
.outcome-layout{display:grid;grid-template-columns:1.3fr 1fr;gap:43px;align-items:center;margin-top:22px}.mockup{border:1px solid #c5d4c9;border-radius:12px;background:white;overflow:hidden;box-shadow:0 12px 25px #15382f08}.mockup-bar{background:#e7eee8;padding:12px 18px;display:flex;gap:24px;align-items:center;font-size:10px;color:#586d66}.mockup-bar>span{color:#9caf9f;letter-spacing:3px}.mockup-bar b{font-weight:500}.mockup-body{padding:22px}.mockup h2{font-size:22px}.search{display:flex;align-items:center;gap:13px;border:1px solid var(--line);border-radius:6px;padding:10px 14px;font-size:16px;color:var(--muted);margin-top:14px}.search>span{font-size:24px;line-height:1}.result{display:grid;grid-template-columns:1fr 1fr;gap:10px;background:#f4f7f3;padding:15px;margin-top:12px;font-size:13px;color:#586d66;border-radius:6px}.result>b{grid-column:1 / -1;font-size:16px;color:#15382f}.result em{font-style:normal;margin-left:12px}.access-note{font-size:11px;color:#586d66;margin:12px 0 0}.evaluation>p:not(.eyebrow){display:flex;align-items:center;gap:17px;font-size:20px;line-height:1.3;margin:24px 0}.evaluation>p>span{font-size:11px;color:var(--green);font-weight:700}
.closing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;margin-top:34px}.closing-grid>div{border-top:1px solid #497361;padding-top:20px}.closing-number{font-size:12px;color:#72e0b3;display:block;margin-bottom:15px}.closing-grid h2{font-size:25px}.closing-grid p{font-size:19px;line-height:1.4;color:#c3d8ce;max-width:285px;margin:12px 0 0}
</style>
