<template>
    <section class="relative bg-secondary py-32 sm:py-44">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 space-y-24">
        <div class="grid md:grid-cols-2 gap-16">
          <div class="space-y-8">
            <p v-reveal class="font-dm text-accent-bold/70 text-sm tracking-[0.15em] uppercase">Behind Regulated Buy‑In</p>
            <h2
              v-reveal
              class="font-funnel font-thin text-[clamp(2rem,5.2vw,4.5rem)] leading-[0.95] tracking-tight text-primary"
            >
             Driving momentum
            </h2>
            <p v-reveal class="font-dm text-primary/70 text-[clamp(.95rem,1.15vw,1.05rem)] max-w-xl leading-relaxed">
              We specialize in Podcast & LinkedIn content engines for regulated FinTech. By turning interview-style videos into short, forwardable clips. We help your champion earn trust, surface risk controls, and keep multi‑stakeholder decisions moving.
            </p>
          </div>
          <div class="space-y-16">
            <div v-reveal class="space-y-3">
              <h3 class="font-dm font-semibold text-primary text-xl sm:text-2xl">Focus on Approvals & Vendor Review</h3>
              <p class="font-dm text-primary/70 text-sm sm:text-base leading-relaxed">
                Built for Compliance, Risk, and Security threads—what approvers need to see, in their language.
              </p>
            </div>
            <div v-reveal class="space-y-3">
              <h3 class="font-dm font-semibold text-primary text-xl sm:text-2xl">Clips that Clear Compliance</h3>
              <p class="font-dm text-primary/70 text-sm sm:text-base leading-relaxed">
                Each asset highlights outcomes, guardrails, and trade‑offs that approvers can forward internally the same day.
              </p>
            </div>
          </div>
        </div>
  
        <!-- Image / placeholder collage (optional padding) -->
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="n in 3"
            :key="n"
            v-reveal="{ delay: n * 90 }"
            class="relative aspect-[4/5] rounded-lg overflow-hidden border-2 border-primary bg-gradient-to-br from-accent/15 to-primary/5 flex items-end p-4"
          >
            <div class="font-dm text-primary/60 text-xs uppercase tracking-wider">
              Placeholder {{ n }}
            </div>
          </div>
        </div>
  
        <div
          v-parallax="{ speed: 0.16, axis: 'y', max: 90 }"
          class="font-funnel font-thin text-primary/5 text-center text-[min(42vw,640px)] leading-none tracking-tighter select-none pointer-events-none"
          aria-hidden="true"
        >
          MOMENTUM
        </div>
      </div>
      
    </section>
  </template>
  <script setup>
  </script>
  
  <style scoped>
  </style>