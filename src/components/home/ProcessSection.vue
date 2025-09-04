<template>
    <section class="relative py-32 sm:py-44 bg-secondary">
      <div class="max-w-7xl mx-auto px-4 sm:px-10">
        <div class="grid lg:grid-cols-2 gap-20 items-start">
          <div class="space-y-12">
            <div class="space-y-6">
              <p v-reveal class="font-dm text-accent-bold/70 text-sm tracking-[0.15em] uppercase">Process</p>
              <h2
                v-reveal
                class="font-funnel font-thin text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-primary"
              >
                Process Built for Audit‑Readiness
              </h2>
              <p v-reveal class="font-dm text-primary/70 text-base leading-relaxed max-w-xl">
                Every detail you share is verified, reviewed, and auditable—so you stay protected and always compliance-ready.
                Structured metadata, claim/control mapping, and human review ensure no unvetted assertions ship.
              </p>
            </div>
  
            <div class="space-y-8">
              <div v-reveal class="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div class="w-14 h-14 rounded-md border-2 border-primary flex items-center justify-center font-dm text-primary/50 text-sm">
                  01
                </div>
                <div class="space-y-3">
                  <h3 class="font-dm font-semibold text-primary">Interview Capture</h3>
                  <p class="font-dm text-primary/70 text-sm leading-relaxed">
                    One structured expert session (~45–60 min) with prompt scaffolding for claims, controls, risk narratives, and outcome framing.
                  </p>
                </div>
              </div>
              <div v-reveal class="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div class="w-14 h-14 rounded-md border-2 border-primary flex items-center justify-center font-dm text-primary/50 text-sm">
                  02
                </div>
                <div class="space-y-3">
                  <h3 class="font-dm font-semibold text-primary">Verification & Reduction</h3>
                  <p class="font-dm text-primary/70 text-sm leading-relaxed">
                    Claims cross-checked. Sensitive phrasing normalized. Unsupported assertions flagged. Output chunked into approver‑ready blocks.
                  </p>
                </div>
              </div>
              <div v-reveal class="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div class="w-14 h-14 rounded-md border-2 border-primary flex items-center justify-center font-dm text-primary/50 text-sm">
                  03
                </div>
                <div class="space-y-3">
                  <h3 class="font-dm font-semibold text-primary">Stakeholder Varianting</h3>
                  <p class="font-dm text-primary/70 text-sm leading-relaxed">
                    Messaging reframed for Compliance, Risk, Security, Privacy, and Finance. Each asset isolates relevant controls + impact framing.
                  </p>
                </div>
              </div>
              <div v-reveal class="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div class="w-14 h-14 rounded-md border-2 border-primary flex items-center justify-center font-dm text-primary/50 text-sm">
                  04
                </div>
                <div class="space-y-3">
                  <h3 class="font-dm font-semibold text-primary">Delivery & Iteration</h3>
                  <p class="font-dm text-primary/70 text-sm leading-relaxed">
                    5‑day turnaround. Two revision passes. Archive + audit trail preserved. Ready for onward circulation same week.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Right Column -->
          <div class="space-y-16">
            <div
              v-reveal
              class="relative rounded-xl border-2 border-primary p-10 bg-secondary/60 backdrop-blur-sm overflow-hidden"
            >
              <div class="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
              <h3 class="font-funnel font-thin text-[clamp(2.2rem,4.6vw,3.5rem)] leading-[0.95] tracking-tight text-primary">
                12+ Video Specialists
              </h3>
              <p class="mt-6 font-dm text-primary/70 text-sm sm:text-base leading-relaxed max-w-lg">
                RegOps‑savvy producers, editors, and motion designers with a tight KPI-first approach. Lean process, zero fluff. Every deliverable mapped to forwardability, confidence or velocity outcomes.
              </p>
              <div class="mt-8 flex flex-wrap gap-2 font-dm text-[10px] tracking-wide uppercase text-primary/50">
                <span class="px-3 py-1 border border-primary/30 rounded-full bg-primary/5">Editors</span>
                <span class="px-3 py-1 border border-primary/30 rounded-full bg-primary/5">RegOps Lens</span>
                <span class="px-3 py-1 border border-primary/30 rounded-full bg-primary/5">Controls Fluency</span>
                <span class="px-3 py-1 border border-primary/30 rounded-full bg-primary/5">Framework Mapping</span>
                <span class="px-3 py-1 border border-primary/30 rounded-full bg-primary/5">Audit Trail</span>
              </div>
            </div>
  
            <div
              v-parallax="{ speed: 0.14, axis: 'y', max: 80 }"
              class="font-funnel font-thin text-primary/5 text-center md:text-right text-[min(40vw,560px)] leading-none tracking-tighter select-none pointer-events-none"
              aria-hidden="true"
            >
              STRUCTURE
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>