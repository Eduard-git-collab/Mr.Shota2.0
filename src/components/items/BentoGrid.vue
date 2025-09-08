<template>
    <section class="relative w-full min-h-screen bg-secondary overflow-hidden">
        <!-- Decorative background elements (matching your style) -->
        <div aria-hidden="true">
          <div class="pointer-events-none absolute inset-0">
            <div class="absolute -top-40 -right-24 w-[60vmax] h-[60vmax] rounded-full bg-accent/15 blur-3xl mix-blend-multiply"></div>
            <div class="absolute top-1/2 -left-32 w-[50vmax] h-[50vmax] rounded-full bg-primary/5 blur-3xl mix-blend-multiply"></div>
          </div>
        </div>
    
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-20">
          <!-- Section Title -->
          <div class="mb-12 sm:mb-16">
            <h1 
              v-reveal
              class="font-funnel text-right font-thin leading-[0.95] tracking-tight text-primary text-[clamp(2.5rem,6vw,5rem)] mb-6"
            >
              Pull decision latency forward
            </h1>
            <p 
              v-reveal="{ delay: 100 }"
              class="font-dm text-primary/70 text-[clamp(1rem,1.2vw,1.25rem)] leading-relaxed text-right"
            >
              Transform scattered explanations into reviewer-ready assets that accelerate enterprise decisions
            </p>
          </div>
          
          <!-- Bento Grid -->
          <div class="grid grid-cols-5 grid-rows-7 gap-4 h-[800px] sm:h-[900px] lg:h-[1000px]">
            
            <!-- Box 1: Information Security & Privacy Review -->
            <div class="row-span-3">
              <div class="relative h-full">
                <!-- Dashed border shadow -->
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="
                  relative h-full flex flex-col justify-center items-center text-center
                  border-2 border-primary bg-background/90 rounded-lg p-4 sm:p-6
                ">
                  <div class="mb-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 class="font-funnel font-semibold text-sm sm:text-base lg:text-lg text-primary leading-tight mb-2">
                      Information Security & Privacy Review
                    </h3>
                    <div class="font-funnel font-thin text-2xl sm:text-3xl lg:text-4xl text-accent-bold">
                      30-50%
                    </div>
                  </div>
                  <p class="font-dm text-xs sm:text-sm text-primary/60 leading-relaxed">
                    Reduce review cycles
                  </p>
                </div>
              </div>
            </div>
    
            <!-- Box 2: Main Feature - Total Sales & Onboarding Cycle (Different Color) -->
            <div class="col-span-3 row-span-3 col-start-2 row-start-3">
              <div class="relative h-full">
                <!-- Dashed border shadow with accent color -->
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-accent/60 rounded-lg"></span>
                
                <div class="
                  relative h-full flex flex-col justify-center text-center
                  border-2 border-accent bg-accent-soft/50 rounded-lg p-6 sm:p-8
                ">
                  <h2 class="font-funnel font-semibold text-xl sm:text-2xl lg:text-3xl text-primary mb-4 leading-tight">
                    Total Sales & Onboarding Cycle Reduced
                  </h2>
                  <div class="font-funnel font-thin text-5xl sm:text-6xl lg:text-7xl text-accent-bold mb-6">
                    15–30%
                  </div>
                  <div class="space-y-3 text-xs sm:text-sm lg:text-base text-primary/70 leading-relaxed font-dm max-w-2xl mx-auto">
                    <p>Provide pre-approved, <strong class="text-primary font-medium">audit-ready</strong> explainer clips + written artifacts to <strong class="text-primary font-medium">cut security/VRM back-and-forth by 1–3 weeks</strong>.</p>
                    <p>Stakeholder-specific clips reduce second-meeting stalls and <strong class="text-primary font-medium">pull decision latency forward by 2–4 weeks</strong> enterprise level Fintech.</p>
                    <p>Shift repeated explanations into reusable clips; expect <strong class="text-primary font-medium">fewer live reviews</strong> and <strong class="text-primary font-medium">faster first-pass approvals</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
    
            <!-- Box 3: Compliance & Risk Evidence Gap -->
            <div class="col-span-2 row-span-2 col-start-2 row-start-1">
              <div class="relative h-full">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="
                  relative h-full flex flex-col justify-center items-center text-center
                  border-2 border-primary bg-background/90 rounded-lg p-4 sm:p-6
                ">
                  <div class="mb-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>
                      </svg>
                    </div>
                    <h3 class="font-funnel font-semibold text-sm sm:text-base lg:text-lg text-primary leading-tight mb-2">
                      Compliance & Risk Evidence Gap
                    </h3>
                    <div class="font-funnel font-thin text-2xl sm:text-3xl lg:text-4xl text-accent-bold">
                      35-55%
                    </div>
                  </div>
                  <p class="font-dm text-xs sm:text-sm text-primary/60 leading-relaxed">
                    Faster evidence delivery
                  </p>
                </div>
              </div>
            </div>
    
            <!-- Box 4: Legal Language Rework -->
            <div class="col-span-2 row-span-2 col-start-4 row-start-1">
              <div class="relative h-full">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="
                  relative h-full flex flex-col justify-center items-center text-center
                  border-2 border-primary bg-background/90 rounded-lg p-4 sm:p-6
                ">
                  <div class="mb-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h3 class="font-funnel font-semibold text-sm sm:text-base lg:text-lg text-primary leading-tight mb-2">
                      Legal Language Rework
                    </h3>
                    <div class="font-funnel font-thin text-2xl sm:text-3xl lg:text-4xl text-accent-bold">
                      40-60%
                    </div>
                  </div>
                  <p class="font-dm text-xs sm:text-sm text-primary/60 leading-relaxed">
                    Reduce redlines & rewrites
                  </p>
                </div>
              </div>
            </div>
    
            <!-- Box 5: Finance & Procurement Review -->
            <div class="row-span-4 col-start-5 row-start-3">
              <div class="relative h-full">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="
                  relative h-full flex flex-col justify-center items-center text-center
                  border-2 border-primary bg-background/90 rounded-lg p-4 sm:p-6
                ">
                  <div class="mb-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                      </svg>
                    </div>
                    <h3 class="font-funnel font-semibold text-sm sm:text-base lg:text-lg text-primary leading-tight mb-2">
                      Finance & Procurement Review
                    </h3>
                    <div class="font-funnel font-thin text-2xl sm:text-3xl lg:text-4xl text-accent-bold">
                      25-40%
                    </div>
                  </div>
                  <p class="font-dm text-xs sm:text-sm text-primary/60 leading-relaxed">
                    Clearer cost/benefit clarity
                  </p>
                </div>
              </div>
            </div>
    
            <!-- Box 6: Supplier Onboarding -->
            <div class="row-span-3 row-start-4">
              <div class="relative h-full">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="
                  relative h-full flex flex-col justify-center items-center text-center
                  border-2 border-primary bg-background/90 rounded-lg p-4 sm:p-6
                ">
                  <div class="mb-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                    </div>
                    <h3 class="font-funnel font-semibold text-sm sm:text-base lg:text-lg text-primary leading-tight mb-2">
                      Supplier Onboarding
                    </h3>
                    <div class="font-funnel font-thin text-2xl sm:text-3xl lg:text-4xl text-accent-bold">
                      15-30%
                    </div>
                  </div>
                  <p class="font-dm text-xs sm:text-sm text-primary/60 leading-relaxed">
                    Streamlined processes
                  </p>
                </div>
              </div>
            </div>
    
            <!-- Box 7: Call-to-Action -->
            <div class="col-span-3 col-start-2 row-start-6">
              <div class="relative h-full">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="
                  relative h-full flex flex-col justify-center text-center
                  border-2 border-primary bg-background/90 rounded-lg pb-0 px-4
                ">
                  <p class="font-dm text-sm sm:text-base lg:text-lg text-primary leading-relaxed">
                    Transform scattered explanations into <strong class="font-funnel font-semibold text-accent-bold">reviewer-ready, audit-safe assets</strong> that accelerate enterprise decisions
                  </p>
                  
                  <!-- CTA Button -->
                  <div class="mt-4">
                    <span @click.prevent="triggerBookCall" target="_blank" rel="noopener noreferrer"
                       class="
                       inline-flex items-center justify-center
                       bg-transparent px-4 pt-0 pb-2 font-medium
                       text-lg text-accent-bold transition-all duration-200 rounded-md
                       font-dm
                       ">
                      Book an intro call
                  </span>
                  </div>
                </div>
              </div>
            </div>
    
          </div>
        </div>
      </section>
    </template>
    
    <script setup>
    import { useBookCallNavigation } from '../../composables/useBookCallNavigation'
    const { triggerBookCall } = useBookCallNavigation()
    </script>
    