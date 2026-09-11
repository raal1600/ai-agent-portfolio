<script setup>
import { computed } from 'vue'
import { demos, slidesFor } from '../../content/demos.mjs'
const props = defineProps({ demo: String, locale: String, index: Number })
const project = computed(() => demos.find(d => d.id === props.demo))
const slides = computed(() => slidesFor(project.value, props.locale))
const slide = computed(() => slides.value[props.index])
const sv = computed(() => props.locale === 'sv')
</script>

<template>
  <article class="pitch" :class="[slide.layout, project.accent]">
    <header><span class="identity"><b>rh.</b> {{ project.name }}</span><span>{{ project.category[locale] }}</span><span>{{ locale.toUpperCase() }}</span></header>
    <div class="pitch-content">
      <p class="pitch-kicker">{{ String(index + 1).padStart(2, '0') }} / {{ project.name }}</p>
      <h1>{{ slide.title }}</h1>
      <p class="pitch-summary">{{ slide.summary }}</p>
      <div class="pitch-items">
        <div v-for="(item, i) in slide.items" :key="i" class="pitch-item">
          <span v-if="!['cover', 'closing', 'chat'].includes(slide.layout)" class="item-number">{{ String(i + 1).padStart(2, '0') }}</span>
          <h2>{{ item.title }}</h2><p>{{ item.text }}</p>
        </div>
      </div>
    </div>
    <footer><span>Rami Halabi · {{ sv ? 'Skräddarsydda AI-agenter' : 'Custom AI agent development' }}</span><span>{{ sv ? 'Illustrerad genomgång · inte en livekörning' : 'Illustrated walkthrough · not a live execution' }}</span><span>{{ index + 1 }} / {{ slides.length }}</span></footer>
    <div class="progress" :style="{ width: `${((index + 1) / slides.length) * 100}%` }"></div>
  </article>
</template>
