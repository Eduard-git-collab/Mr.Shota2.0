<template>
    <section id="sectors" class="relative py-28 sm:py-40 bg-secondary">
      <div class="max-w-7xl mx-auto px-4 sm:px-8">
        <header class="mb-14 sm:mb-20">
          <p v-reveal class="font-dm text-accent-bold/70 text-sm tracking-[0.15em] uppercase mb-4">
            Sectors
          </p>
          <h2
            v-reveal
            class="font-funnel font-thin leading-[0.95] tracking-tight text-primary text-[clamp(2.4rem,6.2vw,5rem)] max-w-4xl"
          >
            A focus on FinCrime, Data Privacy & Security, and in‑house RegOps.
          </h2>
        </header>
  
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(card, i) in cards"
            :key="card.title"
            class="group relative border-2 border-primary bg-secondary/70 p-6 sm:p-7 md:p-8 flex flex-col min-h-[380px] overflow-hidden transition-all duration-300"
            @click="toggle(i)"
            :class="expanded === i ? 'ring-2 ring-accent/60' : ''"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3
                  class="font-dm font-semibold text-primary text-xl md:text-2xl leading-tight"
                  v-reveal="{ delay: i * 60 }"
                >
                  {{ card.title }}
                </h3>
              </div>
              <button
                class="relative z-10 shrink-0 w-10 h-10 rounded-md border border-primary flex items-center justify-center text-primary/60 group-hover:text-primary/90 transition-colors"
                :aria-expanded="expanded === i"
                @click.stop="toggle(i)"
              >
                <svg
                  class="w-4 h-4 transition-transform duration-300"
                  :class="expanded === i ? 'rotate-45' : ''"
                  fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
  
            <p
              class="mt-6 font-dm text-primary/70 text-sm leading-relaxed transition-opacity duration-300"
              :class="expanded === i ? 'opacity-0 absolute -z-10' : 'opacity-100'"
            >
              {{ card.preview }}
            </p>
  
              <div
                class="mt-6 font-dm text-primary/80 text-sm leading-relaxed transition-all duration-500"
                :class="expanded === i
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'"
              >
                {{ card.expanded }}
              </div>
  
            <div class="mt-auto pt-6 flex items-center justify-between text-xs font-dm text-primary/50">
              <span>#{{ String(i+1).padStart(2,'0') }}</span>
            </div>
          </div>
        </div>
  
        <!-- OPTIONAL decorative word (comment out to stay strict) -->
        <!--
        <div
          v-parallax="{ speed: 0.18, axis: 'y', max: 100 }"
          class="mt-24 md:mt-40 font-funnel font-thin text-primary/5 text-center text-[min(40vw,620px)] leading-none tracking-tighter select-none pointer-events-none"
          aria-hidden="true"
        >
          APPROVALS
        </div>
        -->
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const expanded = ref(null)
  const toggle = (i) => {
    expanded.value = expanded.value === i ? null : i
  }
  
  const cards = [
    {
      title: 'FinCrime (KYC/AML/Sanctions)',
      preview: 'Accelerate regulatory approvals by showing how your solution reduces false positives, strengthens compliance coverage, and improves reporting quality.',
      expanded: 'Translate controls, detection metrics, and escalation into forwardable clips MLRO/Risk can circulate.'
    },
    {
      title: 'Data Privacy & Security',
      preview: 'Speed up vendor reviews with clips that clearly explain your data flows, security controls, and retention policies—in language every approver understands.',
      expanded: 'Make DPIA/VRM approvable: clear data‑flows, RBAC, key management, and purge timelines.'
    },
    {
      title: 'In‑house RegOps',
      preview: 'Secure fast internal buy-in for new controls and AI/ML rollouts—content curated specially for each stakeholder group.',
      expanded: 'Transform common objections into concise video answers, pre-empting compliance hurdles and paving the way for quick rollouts.'
    }
  ]
  </script>
  
  <style scoped>
  .card-item {
    --hover-raise: -6px;
    transition:
      border-color .3s var(--ease, cubic-bezier(.4,0,.2,1)),
      transform .45s cubic-bezier(.16,1,.3,1),
      background .45s cubic-bezier(.16,1,.3,1);
  }
  .card-item:hover {
    transform: translateY(var(--hover-raise));
    border-color: var(--color-accent);
  }
  </style>