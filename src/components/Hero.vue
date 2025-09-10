<template>
    <section class="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-secondary">
      <!-- OPTIONAL: decorative blobs (can remove for stricter minimalism) -->
      <div aria-hidden="true">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute -top-40 -right-24 w-[60vmax] h-[60vmax] rounded-full bg-accent/10 blur-3xl mix-blend-multiply"></div>
          <div class="absolute top-1/2 -left-32 w-[50vmax] h-[50vmax] rounded-full bg-primary/5 blur-3xl mix-blend-multiply"></div>
          <div class="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-secondary to-transparent"></div>
        </div>
      </div>
  
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-20">
        <div class="max-w-5xl">
          <h1
            v-reveal
            class="font-funnel font-thin leading-[0.95] tracking-tight text-primary text-[clamp(2.75rem,8vw,7.2rem)]"
          >
            A video-first content engine for regulated FinTech.
          </h1>
  
          <p
            v-reveal="{ delay: 100 }"
            class="mt-6 font-dm text-primary/85 text-[clamp(1rem,1.4vw,1.35rem)] leading-relaxed"
          >
            Your fastest route to consensus in compliance-heavy sales.
          </p>
  
          <p
            v-reveal="{ delay: 180 }"
            class="mt-6 max-w-2xl font-dm text-primary/70 text-[clamp(.95rem,1.15vw,1.15rem)] leading-relaxed"
          >
          Transform a single expert interview into a powerful set of LinkedIn highlights, podcast episodes, and forwardable proof clips. Give your champions everything they need to win faster approvals from Compliance, Risk, Security, Legal, and Finance.
          </p>
  
          <div class="mt-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href="https://calendly.com/eduard-nyvocreative/30min" target="_blank" rel="noopener noreferrer"
            class="
            group relative inline-flex h-12 sm:h-12 md:h-12 items-center justify-center overflow-hidden
            rounded-md border border-primary bg-transparent px-6 sm:px-6 md:px-6 font-medium
            text-sm sm:text-base text-primary transition-all duration-200 
            shadow-[5px_5px_0px_0px_theme(colors.accent-strong)] 
            hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
            touch-button
            cursor-pointer font-dm
            ">
            Book an intro call
            </a>
  
            <div
              v-reveal="{ delay: 260 }"
              class="flex flex-wrap gap-x-4 gap-y-1 font-dm text-[11px] sm:text-xs md:text-sm text-primary/60 max-w-xl"
            >
              <span class="inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> ≤ 150 min SME time
              </span>
              <span class="inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> 5‑day turnaround
              </span>
              <span class="inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> 2 revisions
              </span>
              <span class="inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Stakeholder variants included
              </span>
              <span class="inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Claims &amp; Controls review
              </span>
            </div>
          </div>
        </div>
  
        <div class="py-8 sm:py-12 md:py-14 lg:py-16 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 cards-container">
          <div class=" w-fit flex items-center justify-center">
            <p class="-rotate-90 uppercase font-dm text-accent font-semibold -mr-3">
              Sectors
            </p>
          </div>
          
          <SectorCard
            v-for="(card, i) in cardData" 
            :key="i"
            :card="card"
          />
        </div>
      </div>
  
    </section>
  </template>
  
  <script setup>
  import { h } from 'vue'
  import SectorCard from './SectorCard.vue'
  import { inject } from 'vue'

  const handleBookCall = inject('handleBookCall')
  
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
      category: "Accelerate regulatory approvals by showing how your solution reduces false positives, strengthens compliance coverage, and improves reporting quality.",
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
      route: "/data-privacy-security"
    },
    {
      category: "Secure fast internal buy-in for new controls and AI/ML rollouts—content curated specially for each stakeholder group.",
      categoryShort: "RegOps",
      title: "In‑house RegOps",
      description: "Transform common objections into concise video answers, pre-empting compliance hurdles and paving the way for quick rollouts.",
      icon: CogIcon,
      route: "/in-house-regops"
    }
  ]
  </script>
  
  <style scoped>
  @keyframes scroll-cue {
    0% { transform: translateY(-100%); }
    60% { transform: translateY(100%); }
    100% { transform: translateY(100%); }
  }
  .animate-scroll-cue { animation: scroll-cue 2.2s cubic-bezier(.65,.05,.36,1) infinite; }
  
  /* Touch-friendly button styles */
  .touch-button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  </style>