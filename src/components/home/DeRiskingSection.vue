<script setup>
import { defineProps } from 'vue';

const { items } = defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-10">
    <!-- Header Section -->
    <div class="mb-16">
      <h1 class="text-6xl sm:text-8xl font-funnel mb-6 text-primary leading-tight">
        De-Risking Decisions
      </h1>
      <h2 class="text-xl sm:text-3xl max-w-5xl font-funnel mb-4 font-thin text-primary/90 leading-relaxed">
        As deal size grows, review depth grows disproportionally. These are the recurring friction points we aim to eliminate
      </h2>
    </div>

    <!-- Items Grid -->
    <div class="space-y-12 sm:space-y-16">
      <div 
        v-for="item in items" 
        :key="item.number"
        class="group relative"
      >
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
            <span class="text-6xl sm:text-7xl lg:text-8xl font-funnel font-thin text-primary/30 group-hover:text-primary/50 transition-colors duration-300">
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

    <div class="flex flex-col items-center justify-center gap-3 my-12">
      <h1 class="text-6xl font-funnel font-medium text-primary">
        Net effect 
      </h1>
      <p class="text-lg sm:text-xl text-center max-w-5xl font-dm mb-4 font-thin text-primary/90 leading-relaxed">
        These four bottlenecks routinely add<strong class="text-accent-bold"> 3–6 weeks </strong>to enterprise cycles. We replace scattered explanations with <strong class="text-accent-bold font-bolf"> reviewer-ready, audit-safe assets</strong> that move decisions forward.
      </p>
    </div>
  </div>
</template>