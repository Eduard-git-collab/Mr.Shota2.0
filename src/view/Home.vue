<template>
  <div class="w-full bg-secondary text-primary">
    
    <main>
      <HeroSection />
      
      <DeRiskingSection 
        ref="deRiskingSectionRef"
        :items="[
          {
            number: '01',
            title: 'Security & Privacy review depth',
            subhead: 'Unstructured answers create iterative questionnaires.',
            description: 'Reviewers need a single, approvable explanation of data flow, access, encryption, retention/purge, key management, and test cadence. When details live across PDFs and email threads, the review expands into multiple rounds.',
            delay: '1–3 weeks per deal'
          },
          {
            number: '02',
            title: 'Compliance & Risk evidence gap',
            subhead: 'The sponsor cannot transmit the control narrative.',
            description: 'Controls coverage, monitoring, overrides, and change governance aren\'t captured in concise, reusable formats aligned to reviewer expectations. Clarification requests multiply, and momentum drifts.',
            delay: '2–4 weeks per deal'
          },
          {
            number: '03',
            title: 'Legal language rework',
            subhead: 'Unqualified claims invite redlines and rewrites.',
            description: 'Performance numbers without sources and imprecise wording trigger multi-pass edits. Even minor phrasing issues can extend contract timelines when language isn\'t regulator-safe from the outset.',
            delay: '2–5 days per deal'
          },
          {
            number: '04',
            title: 'Finance & Procurement clarity deficit',
            subhead: 'Benefits and effort aren\'t expressed in executive terms.',
            description: 'Finance needs a crisp view of cost/benefit and total cost to integrate; procurement needs a complete, consistent vendor pack. Without them, approval cycles add unnecessary loops.',
            delay: '3–7 days per deal'
          }
        ]" 
      />
      <BentoGrid/>
      <MomentumSection ref="momentumSectionRef"/>
    </main>
    <FooterSection />
    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import HeroSection from '../components/home/HeroSection.vue'
import MomentumSection from '../components/home/MomentumSection.vue'
import BentoGrid from '../components/items/BentoGrid.vue'
import DeRiskingSection from '../components/home/DeRiskingSection.vue'
import FooterSection from '../components/layout/FooterSection.vue'

const deRiskingSectionRef = ref(null)
const momentumSectionRef = ref(null)

let isInverted = false
let ticking = false

const setColorScheme = (shouldInvert) => {
  if (shouldInvert === isInverted) return
  
  isInverted = shouldInvert
  console.log('Setting color scheme to:', shouldInvert ? 'inverted' : 'normal')
  
  if (shouldInvert) {
    document.documentElement.classList.add('invert-scheme')
  } else {
    document.documentElement.classList.remove('invert-scheme')
  }
}

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const deRiskingEl = deRiskingSectionRef.value?.$el
      const momentumEl = momentumSectionRef.value?.$el
      
      if (!deRiskingEl || !momentumEl) {
        ticking = false
        return
      }
      
      const scrollY = window.scrollY
      const deRiskingTop = deRiskingEl.offsetTop - 20
      const momentumTop = momentumEl.offsetTop
      
      // Check if we're in the DeRisking section area
      if (scrollY >= deRiskingTop && scrollY < momentumTop) {
        setColorScheme(true)
      } else {
        setColorScheme(false)
      }
      
      ticking = false
    })
    ticking = true
  }
}

onMounted(async () => {
  await nextTick()
  
  console.log('Setting up scroll listener...')
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Initial check
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // Reset to normal on unmount
  setColorScheme(false)
})
</script>