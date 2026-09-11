<script setup>
import { useSlideContext } from '@slidev/client'
const { $slidev } = useSlideContext()
defineProps({ page: Number, note: { type: String, default: 'Hektor Demo / Kundnytta och avlastning' }, source: String })
</script>

<template>
  <footer class="footer">
    <a v-if="source" :href="source">{{ note }}</a><span v-else>{{ note }}</span>
    <div class="page-position"><span class="page-track" aria-hidden="true"><i :style="{ width: `${page / $slidev.nav.total * 100}%` }"></i></span><span>{{ String(page).padStart(2, '0') }} <b>/ {{ $slidev.nav.total }}</b></span></div>
  </footer>
</template>
