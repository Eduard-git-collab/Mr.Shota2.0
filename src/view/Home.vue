<template>
  <div class="w-full bg-secondary text-primary">
    <main>
      <Hero/>
      <SectorsSection />
      <MomentumSection />
      <ProcessSection id="process" />
      <BentoGrid />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import BentoGrid from '../components/items/BentoGrid.vue'
import HeroSection from '../components/home/HeroSection.vue'
import SectorsSection from '../components/home/SectorsSection.vue'
import MomentumSection from '../components/home/MomentumSection.vue'
import ProcessSection from '../components/home/ProcessSection.vue'
import FooterSection from '../components/layout/FooterSection.vue'

import reveal from '../directives/reveal.js'
import parallax from '../directives/parallax.js'
</script>

<script>
export default {
  directives: {
    reveal,
    parallax
  }
}
</script>

<style scoped>
/* Additional global scroll progress (attach via JS in onMounted if desired) */
</style>