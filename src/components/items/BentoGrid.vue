<template>
  <section class="relative w-full min-h-screen bg-secondary overflow-hidden">
      <!-- Decorative background elements -->
      <div aria-hidden="true">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute -top-40 -right-24 w-[60vmax] h-[60vmax] rounded-full bg-accent/15 blur-3xl mix-blend-multiply animate-pulse"></div>
          <div class="absolute top-1/2 -left-32 w-[50vmax] h-[50vmax] rounded-full bg-primary/5 blur-3xl mix-blend-multiply animate-pulse" style="animation-delay: 1s"></div>
        </div>
      </div>
  
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <!-- Section Title -->
        <div class="mb-8 sm:mb-12 lg:mb-16" v-stagger="{ delay: 200 }">
          <h1 class="font-funnel text-center sm:text-right font-thin leading-[0.95] tracking-tight text-primary text-[clamp(2rem,8vw,5rem)] mb-4 sm:mb-6 transition-all duration-500 hover:text-accent">
            Pull decision latency forward
          </h1>
          <p class="font-dm text-primary/70 text-[clamp(0.875rem,2.5vw,1.25rem)] leading-relaxed text-center sm:text-right max-w-2xl sm:max-w-none sm:ml-auto">
            Transform scattered explanations into reviewer-ready assets that accelerate enterprise decisions
          </p>
        </div>
        
        <!-- Responsive Magazine Style Layout -->
        <div class="space-y-4 sm:space-y-6 lg:space-y-8" v-reveal="{ delay: 600 }">
          
          <!-- Mobile: Stacked Layout -->
          <div class="block sm:hidden space-y-4" v-stagger="{ delay: 150 }">
            <!-- Hero card first on mobile -->
            <div class="h-80 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-accent/60 rounded-lg transition-all duration-300 group-hover:border-accent"></span>
                
                <div class="relative h-full flex flex-col justify-center border-2 border-accent bg-accent-soft/50 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent-soft/70">
                  <h2 class="font-funnel font-semibold text-lg text-primary mb-3 leading-tight text-center">
                    Total Sales & Onboarding Cycle Reduced
                  </h2>
                  <div class="font-funnel font-thin text-4xl text-accent-bold mb-4 leading-none text-center transition-all duration-300 group-hover:scale-110">
                    15–30%
                  </div>
                  <div class="space-y-2 text-xs text-primary/70 leading-relaxed font-dm">
                    <p>Provide pre-approved, <strong class="text-primary font-medium">audit-ready</strong> explainer clips + written artifacts to <strong class="text-primary font-medium">cut security/VRM back-and-forth by 1–3 weeks</strong>.</p>
                    <p>Stakeholder-specific clips reduce second-meeting stalls and <strong class="text-primary font-medium">pull decision latency forward by 2–4 weeks</strong> enterprise level Fintech.</p>
                    <p>Shift repeated explanations into reusable clips; expect <strong class="text-primary font-medium">fewer live reviews</strong> and <strong class="text-primary font-medium">faster first-pass approvals</strong>.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Other cards stacked -->
            <div class="h-40 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex items-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-funnel font-semibold text-sm text-primary leading-tight mb-1 transition-colors duration-300 group-hover:text-accent-bold">
                      Information Security & Privacy Review
                    </h3>
                    <div class="font-funnel font-thin text-2xl text-accent-bold mb-1 transition-all duration-300 group-hover:scale-110">
                      30-50%
                    </div>
                    <p class="font-dm text-xs text-primary/60">
                      Reduce review cycles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="h-40 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex items-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-funnel font-semibold text-sm text-primary leading-tight mb-1 transition-colors duration-300 group-hover:text-accent-bold">
                      Compliance & Risk Evidence Gap
                    </h3>
                    <div class="font-funnel font-thin text-2xl text-accent-bold mb-1 transition-all duration-300 group-hover:scale-110">
                      35-55%
                    </div>
                    <p class="font-dm text-xs text-primary/60">
                      Faster evidence delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="h-40 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex items-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-funnel font-semibold text-sm text-primary leading-tight mb-1 transition-colors duration-300 group-hover:text-accent-bold">
                      Legal Language Rework
                    </h3>
                    <div class="font-funnel font-thin text-2xl text-accent-bold mb-1 transition-all duration-300 group-hover:scale-110">
                      40-60%
                    </div>
                    <p class="font-dm text-xs text-primary/60">
                      Reduce redlines & rewrites
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="h-40 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex items-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-funnel font-semibold text-sm text-primary leading-tight mb-1 transition-colors duration-300 group-hover:text-accent-bold">
                      Finance & Procurement Review
                    </h3>
                    <div class="font-funnel font-thin text-2xl text-accent-bold mb-1 transition-all duration-300 group-hover:scale-110">
                      25-40%
                    </div>
                    <p class="font-dm text-xs text-primary/60">
                      Clearer cost/benefit clarity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="h-40 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex items-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-funnel font-semibold text-sm text-primary leading-tight mb-1 transition-colors duration-300 group-hover:text-accent-bold">
                      Supplier Onboarding
                    </h3>
                    <div class="font-funnel font-thin text-2xl text-accent-bold mb-1 transition-all duration-300 group-hover:scale-110">
                      15-30%
                    </div>
                    <p class="font-dm text-xs text-primary/60">
                      Streamlined processes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA Card -->
            <div class="h-32 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="relative h-full flex flex-col justify-center text-center border-2 border-primary bg-background/90 rounded-lg px-4 py-3 transition-all duration-300 group-hover:bg-accent/5">
                  <p class="font-dm text-sm text-primary leading-relaxed mb-3">
                    Transform scattered explanations into <strong class="font-funnel font-semibold text-accent-bold">reviewer-ready, audit-safe assets</strong> that accelerate enterprise decisions
                  </p>
                  
                  <span @click.prevent="triggerBookCall" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center justify-center bg-transparent px-4 py-2 font-medium text-base text-accent-bold transition-all duration-200 rounded-md font-dm cursor-pointer border border-accent-bold/30 hover:border-accent-bold hover:bg-accent-bold hover:text-white">
                    Book an intro call
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tablet: Modified Grid -->
          <div class="hidden sm:block lg:hidden" v-stagger="{ delay: 200 }">
            <!-- Top section - 2 column layout -->
            <div class="grid grid-cols-2 gap-4 h-80 mb-6">
              <!-- Main feature - left column -->
              <div class="h-full group">
                <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                  <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-accent/60 rounded-lg transition-all duration-300 group-hover:border-accent"></span>
                  
                  <div class="relative h-full flex flex-col justify-center border-2 border-accent bg-accent-soft/50 rounded-lg p-6 transition-all duration-300 group-hover:bg-accent-soft/70">
                    <h2 class="font-funnel font-semibold text-xl text-primary mb-4 leading-tight">
                      Total Sales & Onboarding Cycle Reduced
                    </h2>
                    <div class="font-funnel font-thin text-5xl text-accent-bold mb-4 leading-none transition-all duration-300 group-hover:scale-110">
                      15–30%
                    </div>
                    <div class="space-y-2 text-xs text-primary/70 leading-relaxed font-dm">
                      <p>Provide pre-approved, <strong class="text-primary font-medium">audit-ready</strong> explainer clips + written artifacts to <strong class="text-primary font-medium">cut security/VRM back-and-forth by 1–3 weeks</strong>.</p>
                      <p>Stakeholder-specific clips reduce second-meeting stalls and <strong class="text-primary font-medium">pull decision latency forward by 2–4 weeks</strong> enterprise level Fintech.</p>
                      <p>Shift repeated explanations into reusable clips; expect <strong class="text-primary font-medium">fewer live reviews</strong> and <strong class="text-primary font-medium">faster first-pass approvals</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right column - 2 stacked cards -->
              <div class="space-y-4" v-stagger="{ delay: 100 }">
                <div class="h-36 group">
                  <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                    
                    <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                      <div class="w-8 h-8 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110">
                        <svg class="w-4 h-4 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <h3 class="font-funnel font-semibold text-sm text-primary leading-tight mb-1 transition-colors duration-300 group-hover:text-accent-bold">
                        Information Security & Privacy Review
                      </h3>
                      <div class="font-funnel font-thin text-2xl text-accent-bold mb-1 transition-all duration-300 group-hover:scale-110">
                        30-50%
                      </div>
                      <p class="font-dm text-xs text-primary/60">
                        Reduce review cycles
                      </p>
                    </div>
                  </div>
                </div>

                <div class="h-36 group">
                  <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                    
                    <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                      <div class="w-8 h-8 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110">
                        <svg class="w-4 h-4 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>
                        </svg>
                      </div>
                      <h3 class="font-funnel font-semibold text-sm text-primary leading-tight mb-1 transition-colors duration-300 group-hover:text-accent-bold">
                        Compliance & Risk Evidence Gap
                      </h3>
                      <div class="font-funnel font-thin text-2xl text-accent-bold mb-1 transition-all duration-300 group-hover:scale-110">
                        35-55%
                      </div>
                      <p class="font-dm text-xs text-primary/60">
                        Faster evidence delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Middle row - 2 columns -->
            <div class="grid grid-cols-2 gap-4 h-48 mb-6" v-stagger="{ delay: 150 }">
              <div class="relative group">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5 group-hover:scale-105">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-semibold text-base text-primary leading-tight mb-2 transition-colors duration-300 group-hover:text-accent-bold">
                    Legal Language Rework
                  </h3>
                  <div class="font-funnel font-thin text-3xl text-accent-bold mb-2 transition-all duration-300 group-hover:scale-110">
                    40-60%
                  </div>
                  <p class="font-dm text-sm text-primary/60">
                    Reduce redlines & rewrites
                  </p>
                </div>
              </div>

              <div class="relative group">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5 group-hover:scale-105">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-semibold text-base text-primary leading-tight mb-2 transition-colors duration-300 group-hover:text-accent-bold">
                    Finance & Procurement Review
                  </h3>
                  <div class="font-funnel font-thin text-3xl text-accent-bold mb-2 transition-all duration-300 group-hover:scale-110">
                    25-40%
                  </div>
                  <p class="font-dm text-sm text-primary/60">
                    Clearer cost/benefit clarity
                  </p>
                </div>
              </div>
            </div>

            <!-- Bottom row - 2 columns -->
            <div class="grid grid-cols-2 gap-4 h-48" v-stagger="{ delay: 200 }">
              <div class="relative group">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5 group-hover:scale-105">
                  <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                    <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-semibold text-base text-primary leading-tight mb-2 transition-colors duration-300 group-hover:text-accent-bold">
                    Supplier Onboarding
                  </h3>
                  <div class="font-funnel font-thin text-3xl text-accent-bold mb-2 transition-all duration-300 group-hover:scale-110">
                    15-30%
                  </div>
                  <p class="font-dm text-sm text-primary/60">
                    Streamlined processes
                  </p>
                </div>
              </div>

              <!-- CTA -->
              <div class="relative group">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="relative h-full flex flex-col justify-center text-center border-2 border-primary bg-background/90 rounded-lg px-6 py-4 transition-all duration-300 group-hover:bg-accent/5 group-hover:scale-105">
                  <p class="font-dm text-sm text-primary leading-relaxed mb-4">
                    Transform scattered explanations into <strong class="font-funnel font-semibold text-accent-bold">reviewer-ready, audit-safe assets</strong> that accelerate enterprise decisions
                  </p>
                  
                  <span @click.prevent="triggerBookCall" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center justify-center bg-transparent px-4 py-2 font-medium text-base text-accent-bold transition-all duration-200 rounded-md font-dm cursor-pointer border border-accent-bold/30 hover:border-accent-bold hover:bg-accent-bold hover:text-white">
                    Book an intro call
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop: Original Magazine Layout -->
          <div class="hidden lg:block" v-stagger="{ delay: 250 }">
            <!-- Top section - feature story layout -->
            <div class="grid grid-cols-12 gap-6 h-96 mb-8">
              <!-- Main feature - spans 8 columns -->
              <div class="col-span-8 h-full group">
                <div class="relative h-full transition-all duration-500 group-hover:scale-105">
                  <span class="absolute translate-x-3 translate-y-3 inset-0 border-2 border-dashed border-accent/60 rounded-lg transition-all duration-300 group-hover:border-accent"></span>
                  
                  <div class="relative h-full flex flex-col justify-center border-2 border-accent bg-accent-soft/50 rounded-lg p-8 transition-all duration-300 group-hover:bg-accent-soft/70">
                    <h2 class="font-funnel font-semibold text-3xl text-primary mb-6 leading-tight transition-colors duration-300 group-hover:text-accent-bold">
                      Total Sales & Onboarding Cycle Reduced
                    </h2>
                    <div class="font-funnel font-thin text-7xl text-accent-bold mb-6 leading-none transition-all duration-300 group-hover:scale-110">
                      15–30%
                    </div>
                    <div class="grid grid-cols-2 gap-6 text-sm text-primary/70 leading-relaxed font-dm">
                      <div class="space-y-2">
                        <p>Provide pre-approved, <strong class="text-primary font-medium">audit-ready</strong> explainer clips + written artifacts to <strong class="text-primary font-medium">cut security/VRM back-and-forth by 1–3 weeks</strong>.</p>
                        <p>Stakeholder-specific clips reduce second-meeting stalls and <strong class="text-primary font-medium">pull decision latency forward by 2–4 weeks</strong> enterprise level Fintech.</p>
                      </div>
                      <div>
                        <p>Shift repeated explanations into reusable clips; expect <strong class="text-primary font-medium">fewer live reviews</strong> and <strong class="text-primary font-medium">faster first-pass approvals</strong>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Side column - 2 stacked cards -->
              <div class="col-span-4 space-y-4" v-stagger="{ delay: 100 }">
                <div class="h-44 group">
                  <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                    
                    <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                      <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                        <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <h3 class="font-funnel font-semibold text-base text-primary leading-tight mb-2 transition-colors duration-300 group-hover:text-accent-bold">
                        Information Security & Privacy Review
                      </h3>
                      <div class="font-funnel font-thin text-3xl text-accent-bold mb-2 transition-all duration-300 group-hover:scale-110">
                        30-50%
                      </div>
                      <p class="font-dm text-xs text-primary/60">
                        Reduce review cycles
                      </p>
                    </div>
                  </div>
                </div>

                <div class="h-44 group">
                  <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                    
                    <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-4 transition-all duration-300 group-hover:bg-accent/5">
                      <div class="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                        <svg class="w-5 h-5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>
                        </svg>
                      </div>
                      <h3 class="font-funnel font-semibold text-base text-primary leading-tight mb-2 transition-colors duration-300 group-hover:text-accent-bold">
                        Compliance & Risk Evidence Gap
                      </h3>
                      <div class="font-funnel font-thin text-3xl text-accent-bold mb-2 transition-all duration-300 group-hover:scale-110">
                        35-55%
                      </div>
                      <p class="font-dm text-xs text-primary/60">
                        Faster evidence delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Middle row - 3 equal columns -->
            <div class="grid grid-cols-3 gap-6 h-64 mb-8" v-stagger="{ delay: 150 }">
              <div class="relative group">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-6 transition-all duration-300 group-hover:bg-accent/5 group-hover:scale-105">
                  <div class="w-12 h-12 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                    <svg class="w-6 h-6 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-semibold text-lg text-primary leading-tight mb-3 transition-colors duration-300 group-hover:text-accent-bold">
                    Legal Language Rework
                  </h3>
                  <div class="font-funnel font-thin text-4xl text-accent-bold mb-3 transition-all duration-300 group-hover:scale-110">
                    40-60%
                  </div>
                  <p class="font-dm text-sm text-primary/60">
                    Reduce redlines & rewrites
                  </p>
                </div>
              </div>

              <div class="relative group">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-6 transition-all duration-300 group-hover:bg-accent/5 group-hover:scale-105">
                  <div class="w-12 h-12 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                    <svg class="w-6 h-6 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-semibold text-lg text-primary leading-tight mb-3 transition-colors duration-300 group-hover:text-accent-bold">
                    Finance & Procurement Review
                  </h3>
                  <div class="font-funnel font-thin text-4xl text-accent-bold mb-3 transition-all duration-300 group-hover:scale-110">
                    25-40%
                  </div>
                  <p class="font-dm text-sm text-primary/60">
                    Clearer cost/benefit clarity
                  </p>
                </div>
              </div>

              <div class="relative group">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg transition-all duration-300 group-hover:border-primary/60"></span>
                
                <div class="relative h-full flex flex-col justify-center items-center text-center border-2 border-primary bg-background/90 rounded-lg p-6 transition-all duration-300 group-hover:bg-accent/5 group-hover:scale-105">
                  <div class="w-12 h-12 rounded-lg bg-accent/60 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-accent/80 group-hover:scale-110 group-hover:rotate-6">
                    <svg class="w-6 h-6 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-semibold text-lg text-primary leading-tight mb-3 transition-colors duration-300 group-hover:text-accent-bold">
                    Supplier Onboarding
                  </h3>
                  <div class="font-funnel font-thin text-4xl text-accent-bold mb-3 transition-all duration-300 group-hover:scale-110">
                    15-30%
                  </div>
                  <p class="font-dm text-sm text-primary/60">
                    Streamlined processes
                  </p>
                </div>
              </div>
            </div>

            <!-- Bottom CTA - full width banner -->
            <div class="h-32 group">
              <div class="relative h-full transition-all duration-300 group-hover:scale-105">
                <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/40 rounded-lg"></span>
                
                <div class="relative h-full flex items-center justify-between border-2 border-primary bg-background/90 rounded-lg px-8 transition-all duration-300 group-hover:bg-accent/5">
                  <p class="font-dm text-lg text-primary leading-relaxed max-w-2xl">
                    Transform scattered explanations into <strong class="font-funnel font-semibold text-accent-bold">reviewer-ready, audit-safe assets</strong> that accelerate enterprise decisions
                  </p>
                  
                  <span @click.prevent="triggerBookCall" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center justify-center bg-transparent px-6 py-3 font-medium text-xl text-accent-bold transition-all duration-200 rounded-md font-dm cursor-pointer border-2 border-accent-bold hover:bg-accent-bold hover:text-primary hover:scale-105">
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
  import { useAnimations } from '../../composables/useAnimations'

  const { triggerBookCall } = useBookCallNavigation()
  const { vReveal, vStagger } = useAnimations()
  </script>