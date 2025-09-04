<template>
    <div class="w-screen h-fit overflow-visible bg-secondary">
      <div class="w-full h-full p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24">
        <div class="h-auto lg:h-5/6 flex flex-col justify-center items-start my-6 sm:my-8 md:my-10 lg:my-12">
          <!-- Main Heading - Responsive text sizes and line breaks -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl leading-tight tracking-tight font-funnel text-primary font-thin subpixel-antialiased my-3 sm:my-4 md:my-5 lg:my-6">
            <span class="block sm:inline">A video-first consensus engine</span>
            <br class="hidden sm:block"> 
            <span class="block sm:inline">For regulated FinTech.</span>
          </h1>
          
          <!-- Subtitle - Responsive text sizes -->
          <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-dm text-primary">
            Built for complex, multi-stakeholder sales
          </h2>
          
          <!-- Gradient line - Responsive width -->
          <div class="w-full sm:w-xl md:w-2xl mt-4 sm:mt-5 md:mt-6 h-[2px] rounded-full bg-gradient-to-r from-accent via-primary to-accent"></div>
          
          <!-- Description - Responsive text and spacing -->
          <p class="my-6 sm:my-8 md:my-10 max-w-full sm:max-w-xl md:max-w-2xl text-sm sm:text-base md:text-lg font-dm text-primary/70 text-left sm:text-justify">
            Turn one 45–60 minute expert interview per month into 12 stakeholder‑ready LinkedIn clips and a podcast episode—packaged so your champion can forward proof to <strong>Compliance/MLRO, Risk & FinCrime, Security & Privacy, Legal, and Finance/Procurement</strong> to accelerate approvals and vendor review.
          </p>
          
          <!-- Button with touch-friendly styling -->
          <a href="https://calendly.com/eduard-nyvocreative/30min" target="_blank" rel="noopener noreferrer"
          class="
          group relative inline-flex h-12 sm:h-12 md:h-12 items-center justify-center overflow-hidden
          rounded-md border border-primary bg-transparent px-6 sm:px-6 md:px-6 font-medium
          text-sm sm:text-base text-primary transition-all duration-200 
          shadow-[5px_5px_0px_0px_theme(colors.accent)] 
          hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
          touch-button
          cursor-pointer font-dm
          ">
          Book an intro call
          </a>
        </div>
        
        <!-- Card Section - Touch-friendly design -->
        <div class="py-8 sm:py-12 md:py-14 lg:py-16 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 cards-container">
          <div 
            v-for="(card, i) in cardData" 
            :key="i"
            class="
              card-item relative block h-auto sm:h-80 md:h-80 lg:h-96
              w-full sm:basis-1/3
              transition-all duration-300 ease-out
              transform-gpu cursor-pointer
              group
            "
            @click="toggleCard(i)"
          >
            <!-- Dashed border shadow -->
            <span class="absolute translate-2 inset-0 border-2 border-dashed border-primary/60"></span>
          
            <div class="
              relative flex flex-col h-full transform
              border-2 border-primary bg-background/90 
              transition-all duration-300 ease-out
              shadow-lg
            "
            :class="{ 'card-expanded': expandedCard === i }"
            >
              <!-- Default content -->
              <div class="
                p-4 sm:p-5 md:p-6 flex flex-col justify-between h-full
                transition-all duration-300 ease-out
              "
              :class="{ 'opacity-0 absolute': expandedCard === i }"
              >
                <!-- Top section - Icon and Title -->
                <div class="space-y-3 sm:space-y-4">
                  <!-- Icon -->
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/60 flex items-center justify-center">
                    <component :is="card.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-primary/30" />
                  </div>
            
                  <!-- Title -->
                  <h2 class="text-lg sm:text-xl md:text-xl font-dm font-semibold text-primary leading-tight">
                    {{ card.title }}
                  </h2>
                  <p class="opacity-0 group-hover:opacity-100 duration-300 transition-all font-dm font-semibold text-accent-bold flex items-center gap-2 text-sm sm:text-base">
                    Learn more 
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </p>
                </div>
                
                <!-- Bottom section - Category description -->
                <div class="mt-auto">
                  <p class="text-xs sm:text-sm text-primary/70 font-dm leading-relaxed">
                    {{ card.category }}
                  </p>
                  <!-- Mobile: Show tap indicator -->
                  <p class="text-xs text-accent-bold font-dm mt-2 sm:hidden">
                    Tap to learn more
                  </p>
                </div>
              </div>
          
              <!-- Expanded content -->
              <div class="
                p-4 sm:p-5 md:p-6 w-full h-full flex flex-col justify-between
                transition-all duration-300 ease-out
              "
              :class="{ 
                'opacity-0 absolute pointer-events-none': expandedCard !== i,
                'opacity-100 relative': expandedCard === i 
              }"
              >
                <div>
                  <!-- Category badge -->
                  <div class="inline-flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-accent/60 border border-accent/90 mb-3 sm:mb-4">
                    <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent"></div>
                    <span class="text-xs font-medium text-primary/50 font-dm">{{ card.categoryShort }}</span>
                  </div>
                  
                  <h3 class="text-lg sm:text-xl md:text-xl font-dm font-semibold text-primary mb-3 sm:mb-4 leading-tight">
                    {{ card.title }}
                  </h3>
          
                  <p class="text-xs sm:text-sm md:text-base text-primary/80 font-dm leading-relaxed">
                    {{ card.description }}
                  </p>
                </div>
                
                <div class="mt-4 sm:mt-6 flex justify-between items-center">
                  <RouterLink :to=card.route class="font-dm font-semibold text-accent flex items-center gap-2 text-sm sm:text-base">
                    Learn more 
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </RouterLink>
                  <!-- Close button for mobile -->
                  <button 
                    @click.stop="expandedCard = null"
                    class="text-primary/50 hover:text-primary/80 sm:hidden"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { h, ref } from 'vue'

// Reactive state for card expansion
const expandedCard = ref(null)

const toggleCard = (index) => {
  expandedCard.value = expandedCard.value === index ? null : index
}

// Icon components
const ShieldIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const LockIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
])

const CogIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
])

const cardData = [
  {
    category: "Accelerate compliance processes with automated verification, real-time monitoring, and comprehensive audit trails that satisfy regulatory requirements.",
    categoryShort: "FinCrime",
    title: "FinCrime (KYC/AML/Sanctions)",
    description: "Translate controls, detection metrics, and escalation into forwardable clips MLRO/Risk can circulate.",
    icon: ShieldIcon,
    route: "/fincrime"
  },
  {
    category: "Speed up vendor reviews with clips that clearly explain your data flows, security controls, and retention policies—in language every approver understands.", 
    categoryShort: "Security",
    title: "Data Privacy & Security",
    description: "Make DPIA/VRM approvable: clear data‑flows, RBAC, key management, and purge timelines.",
    icon: LockIcon,
    route: "/security"
  },
  {
    category: "Secure fast internal buy-in for new controls and AI/ML rollouts—content curated specially for each stakeholder group.",
    categoryShort: "RegOps",
    title: "In‑house RegOps",
    description: "Transform common objections into concise video answers, pre-empting compliance hurdles and paving the way for quick rollouts.",
    icon: CogIcon,
    route: "/regops"
  }
]
</script>

<style scoped>
/* Touch-friendly button styles */
.touch-button {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Desktop hover effects - only on devices that support hover */
@media (hover: hover) and (pointer: fine) {
  .card-item:hover .card-hover\:opacity-0 {
    opacity: 0;
    position: absolute;
  }

  .card-item:hover .card-hover\:opacity-100 {
    opacity: 1;
    position: relative;
  }

  .card-item:hover .card-hover\:-translate-x-2 {
    transform: translateX(-0.5rem) translateY(-0.5rem);
  }

  .card-item:hover .card-hover\:shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Desktop card expansion on hover */
  @media (min-width: 640px) {
    .card-item:hover {
      flex-basis: calc(50% - 1rem) !important;
    }
  }

  @media (min-width: 1024px) {
    .cards-container:hover .card-item:not(:hover) {
      flex-basis: calc(25% - 1rem);
    }
  }
}

/* Touch device optimizations */
@media (hover: none) {
  .card-item {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
}

/* Card expansion animation */
.card-expanded {
  transform: translateX(-0.25rem) translateY(-0.25rem) !important;
}

@media (min-width: 640px) {
  .card-expanded {
    transform: translateX(-0.5rem) translateY(-0.5rem) !important;
  }
}

/* Card transitions */
.card-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>