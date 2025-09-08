<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const progress = ref(0)
function handler() {
  const h = document.documentElement
  const scrolled = h.scrollTop
  const max = h.scrollHeight - h.clientHeight
  progress.value = max > 0 ? (scrolled / max) * 100 : 0
}
onMounted(() => {
  handler()
  window.addEventListener('scroll', handler, { passive: true })
  window.addEventListener('resize', handler)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handler)
  window.removeEventListener('resize', handler)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
    <div
      class="h-full bg-[var(--color-accent)] transition-[width] duration-150 ease-out"
      :style="{ width: progress + '%' }"
    />
  </div>
</template>