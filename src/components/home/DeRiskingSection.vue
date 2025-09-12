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
      <div v-for="(item, index) in items" :key="item.number" class="relative">
        <!-- Item Header -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8 mb-6">
          <div class="flex-1">
            <h3 class="text-3xl sm:text-4xl lg:text-5xl font-funnel font-thin text-primary leading-tight mb-3">
              {{ item.title }}
            </h3>
            <h4 class="text-lg sm:text-xl font-funnel font-medium text-primary/80 leading-relaxed">
              {{ item.subhead }}
            </h4>
          </div>
          <div class="flex-shrink-0 self-start">
            <span class="text-6xl sm:text-7xl lg:text-8xl font-funnel font-thin text-primary/30">
              {{ item.number }}
            </span>
          </div>
        </div>

        <!-- Separator Line -->
        <div class="w-full h-[1px] bg-gradient-to-r from-primary/40 via-primary/20 to-transparent mb-6"></div>

        <!-- Content Section -->
        <div class="max-w-4xl">
          <p class="text-base sm:text-lg text-primary/80 leading-relaxed font-dm mb-4">
            {{ item.description }}
          </p>
          <div v-if="item.delay" class="inline-flex items-center gap-2 px-4 py-2 bg-accent-soft border border-accent rounded-lg">
            <span class="text-sm font-medium text-accent-strong">Delay added:</span>
            <span class="text-sm font-bold text-accent-bold">{{ item.delay }}</span>
          </div>
        </div>
      </div>
    </div>

<!-- Net Effect Section - Fresh Design -->
<div class="relative my-20 sm:my-28 lg:my-32 overflow-hidden">
  <!-- Subtle background pattern -->
  <div aria-hidden="true" class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"></div>
    <!-- Geometric grid -->
    <svg class="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
      <defs>
        <pattern id="netGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="currentColor" class="text-primary"/>
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#netGrid)"/>
    </svg>
  </div>

  <div class="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
    
    <!-- Main content in a distinctive container -->
    <div class="relative" v-reveal="{ delay: 600 }">
      <!-- Multiple border effect -->
      <div class="absolute -inset-4 border-2 border-dashed border-accent/30 rounded-2xl"></div>
      <div class="absolute -inset-2 border border-primary/20 rounded-xl"></div>
      
      <div class="relative bg-background/95 backdrop-blur-sm border-2 border-accent rounded-xl p-8 sm:p-12 md:p-16">
        
        <!-- Title with emphasis -->
        <div class="text-center mb-8 sm:mb-12" v-reveal="{ delay: 800 }">
          <div class="inline-flex items-center gap-4 mb-6">
            <div class="w-12 h-px bg-gradient-to-r from-transparent to-accent"></div>
            <h2 class="font-funnel font-bold text-4xl sm:text-5xl md:text-6xl text-primary">
              Net effect
            </h2>
            <div class="w-12 h-px bg-gradient-to-r from-accent to-transparent"></div>
          </div>
        </div>
        
        <!-- Your exact copy in a clean, centered layout -->
        <div class="text-center" v-reveal="{ delay: 1000 }">
          <p class="font-dm text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary/90 leading-relaxed max-w-5xl mx-auto">
            These four bottlenecks routinely add<strong class="text-accent-bold"> 3–6 weeks </strong>to enterprise cycles. We replace scattered explanations with <strong class="text-accent-bold"> reviewer-ready, audit-safe assets</strong> that move decisions forward.
          </p>
        </div>
        
        <!-- Subtle bottom accent -->
        <div class="mt-8 sm:mt-12 flex justify-center" v-reveal="{ delay: 1200 }">
          <div class="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>