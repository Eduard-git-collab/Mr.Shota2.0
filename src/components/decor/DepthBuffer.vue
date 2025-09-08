<script setup>
import parallax from '../../directives/parallax.js'
</script>

<template>
  <!-- Decorative buffer between sections to add perceived depth/scale -->
  <div class="relative w-full h-28 sm:h-36 md:h-44">
    <!-- Accent band -->
    <div
      v-parallax="{ speed: 0.15 }"
      class="absolute inset-x-0 top-1/3 h-16 sm:h-20 opacity-20 bg-[linear-gradient(90deg,transparent,rgba(184,177,255,0.25),transparent)]"
    />
    <!-- Soft separator curve -->
    <div class="absolute inset-x-0 -bottom-6 sm:-bottom-8 h-12 sm:h-16">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-full opacity-15">
        <path d="M0,0 C300,100 900,0 1200,80 L1200,120 L0,120 Z" fill="var(--color-primary)"></path>
      </svg>
    </div>
  </div>
</template>