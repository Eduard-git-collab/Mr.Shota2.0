<script setup>
import { defineProps } from 'vue'
import { useAnimations } from '../../composables/useAnimations'

const { vReveal, vStagger } = useAnimations()

const { items } = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-10">
    <!-- Header Section -->
    <div class="mb-16" v-stagger="{ delay: 200 }">
      <h1 class="text-6xl sm:text-8xl font-funnel mb-6 text-primary leading-tight">
        De-Risking Decisions
      </h1>
      <h2 class="text-xl sm:text-3xl max-w-5xl font-funnel mb-4 font-thin text-primary/90 leading-relaxed">
        As deal size grows, review depth grows disproportionally. These are the recurring friction points we aim to eliminate.
      </h2>
    </div>

    <!-- Items Grid -->
    <div class="space-y-12 sm:space-y-16" v-stagger="{ delay: 300 }">
      <div 
        v-for="(item, index) in items" 
        :key="item.number"
        class="group relative transition-all duration-500 hover:translate-x-2"
        :style="{ animationDelay: `${index * 150}ms` }"
      >
        <!-- Item Header -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8 mb-6">
          <div class="flex-1">
            <h3 class="text-3xl sm:text-4xl lg:text-5xl font-funnel font-thin text-primary leading-tight mb-3 transition-all duration-300 group-hover:text-accent-bold">
              {{ item.title }}
            </h3>
            <h4 class="text-lg sm:text-xl font-funnel font-medium text-primary/80 leading-relaxed transition-all duration-300">
              {{ item.subhead }}
            </h4>
          </div>
          <div class="flex-shrink-0 self-start">
            <span class="text-6xl sm:text-7xl lg:text-8xl font-funnel font-thin text-primary/30 group-hover:text-primary/50 transition-all duration-500 group-hover:scale-110">
              {{ item.number }}
            </span>
          </div>
        </div>

        <!-- Separator Line -->
        <div class="w-full h-[1px] bg-gradient-to-r from-primary/40 via-primary/20 to-transparent mb-6 transition-all duration-500 group-hover:from-accent/60 group-hover:via-accent/30"></div>

        <!-- Content Section -->
        <div class="max-w-4xl">
          <p class="text-base sm:text-lg text-primary/80 leading-relaxed font-dm mb-4 transition-all duration-300">
            {{ item.description }}
          </p>
          <div v-if="item.delay" class="inline-flex items-center gap-2 px-4 py-2 bg-accent-soft border border-accent rounded-lg transition-all duration-300 hover:bg-accent/20 hover:scale-105">
            <span class="text-sm font-medium text-accent-strong">Delay added:</span>
            <span class="text-sm font-bold text-accent-bold">{{ item.delay }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Net Effect Section with Enhanced Animation -->
    <div 
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 my-20 sm:my-28 lg:my-32"
      v-reveal="{ delay: 800, direction: 'scale' }"
    >
      <h1 class="text-[clamp(6rem,16vw,20rem)] font-funnel font-medium leading-[0.8] text-center px-4 transition-all duration-700 hover:scale-110">
        <span class="bg-gradient-to-b from-primary via-primary/50 to-secondary bg-clip-text text-transparent relative">
          Net effect
          <div class="absolute -inset-4 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-full blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
        </span>
      </h1>
      <p 
        class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-center max-w-6xl font-dm font-thin text-primary/90 leading-relaxed px-4 transition-all duration-500"
        v-reveal="{ delay: 1000 }"
      >
        These four bottlenecks routinely add<strong class="text-accent-bold transition-all duration-300 hover:scale-110 inline-block"> 3–6 weeks </strong>to enterprise cycles. We replace scattered explanations with <strong class="text-accent-bold font-bold transition-all duration-300 hover:scale-110 inline-block"> reviewer-ready, audit-safe assets</strong> that move decisions forward.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Additional smooth transitions */
.group:hover strong {
  @apply scale-110;
}

/* Pulse animation for emphasis elements */
@keyframes gentle-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-gentle-pulse {
  animation: gentle-pulse 3s ease-in-out infinite;
}
</style>