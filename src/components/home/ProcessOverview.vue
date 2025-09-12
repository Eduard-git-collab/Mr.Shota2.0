<template>
    <section class="relative w-full py-20 sm:py-28 md:py-36 bg-secondary overflow-hidden">
      <!-- Refined geometric background -->
      <div aria-hidden="true" class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3"></div>
        <!-- Flowing connection lines -->
        <svg class="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,200 Q250,100 500,200 T1000,200" stroke="currentColor" stroke-width="2" fill="none" class="text-primary"/>
          <path d="M0,800 Q250,700 500,800 T1000,800" stroke="currentColor" stroke-width="2" fill="none" class="text-accent"/>
        </svg>
        <!-- Decorative dots -->
        <div class="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-accent/20"></div>
        <div class="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-primary/15"></div>
      </div>
  
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <!-- Section Header -->
        <div class="text-center mb-16 sm:mb-20 md:mb-24" v-stagger="{ delay: 200 }">
          <div class="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <div class="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <span class="font-dm text-accent-bold text-xs sm:text-sm tracking-[0.2em] uppercase">Process</span>
            <div class="w-12 h-px bg-gradient-to-r from-accent via-transparent to-transparent"></div>
          </div>
          
          <h1 class="font-funnel font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-6 sm:mb-8 leading-tight">
            Efficient by design
          </h1>
          
          <p class="font-dm text-lg sm:text-xl md:text-2xl text-primary/80 leading-relaxed max-w-4xl mx-auto">
            Two short touchpoints a month, <strong class="text-accent-bold">≤ 150 minutes</strong> of your SME's time. We handle the rest end-to-end.
          </p>
        </div>
  
        <!-- Process Timeline -->
        <div class="relative">
          <!-- Central timeline line for desktop -->
          <div class="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary/30 via-accent via-primary/30 to-accent transform lg:-translate-x-px hidden sm:block"></div>
          
          <div class="space-y-16 sm:space-y-20 md:space-y-24">
            
            <!-- Step 1: Build Session -->
            <div class="relative" v-reveal="{ delay: 400 }">
              <div class="absolute left-0 top-8 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-bold shadow-lg flex items-center justify-center">
                <span class="font-funnel font-bold text-lg text-white">01</span>
              </div>
              
              <div class="ml-20 sm:ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div class="lg:text-right lg:pr-8">
                  <div class="relative">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                    <div class="relative bg-background border-2 border-primary rounded-xl p-6 sm:p-8">
                      <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                        Streamlined Build Session
                      </h2>
                      <p class="font-dm text-base sm:text-lg text-primary/70 leading-relaxed mb-4">
                        <strong class="text-accent-bold">We learn what must be approved—and by whom.</strong>
                      </p>
                      <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                        A producer leads a working call to align on this month's priority (security/privacy, compliance, legal, finance). We gather context, evidence, and boundaries, then share a one-page <strong class="text-accent-bold">Angle Map</strong> with the targets for the month.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="hidden lg:block"></div>
              </div>
            </div>
  
            <!-- Step 2: Q&A Mapping -->
            <div class="relative" v-reveal="{ delay: 600 }">
              <div class="absolute left-0 top-8 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg flex items-center justify-center">
                <span class="font-funnel font-bold text-lg text-secondary">02</span>
              </div>
              
              <div class="ml-20 sm:ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div class="hidden lg:block"></div>
                <div class="lg:pl-8">
                  <div class="relative">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                    <div class="relative bg-background border-2 border-primary rounded-xl p-6 sm:p-8">
                      <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                        Solution-Focused Q&A Mapping
                      </h2>
                      <p class="font-dm text-base sm:text-lg text-primary/70 leading-relaxed mb-4">
                        <strong class="text-accent-bold">Questions engineered to farm approvable clips.</strong>
                      </p>
                      <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                        Research-backed prompts are crafted to "farm" approvable clips for each reviewer group. The pack includes a <strong class="text-accent-bold">Q&A Map</strong> and a <strong class="text-accent-bold">Claims & Controls</strong> sheet (sources, safe phrasing, caveats). Final prompts are circulated <strong class="text-accent-bold">24–48h</strong> before recording.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Step 3: Authority Co-Host (Optional) -->
            <div class="relative" v-reveal="{ delay: 800 }">
              <div class="absolute left-0 top-8 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent-strong to-accent shadow-lg flex items-center justify-center">
                <span class="font-funnel font-bold text-lg text-white">03</span>
              </div>
              
              <div class="ml-20 sm:ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div class="lg:text-right lg:pr-8">
                  <div class="relative">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-accent/40 rounded-xl"></span>
                    <div class="relative bg-background border-2 border-accent rounded-xl p-6 sm:p-8">
                      <div class="flex items-center gap-2 mb-3">
                        <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary leading-tight">
                          Authority Co-Host
                        </h2>
                        <span class="px-2 py-1 bg-accent/20 text-accent-bold text-xs font-dm font-medium rounded">
                          Optional
                        </span>
                      </div>
                      <p class="font-dm text-base sm:text-lg text-primary/70 leading-relaxed mb-4">
                        <strong class="text-accent-bold">Borrow trust from recognized experts.</strong>
                      </p>
                      <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                        We invite an ex-auditor, former financial-crime lead, privacy counsel, or partner to co-host. Their perspective & questions "pressure test" your solution and give you space to show how it holds up.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="hidden lg:block"></div>
              </div>
            </div>
  
            <!-- Step 4: Remote Recording -->
            <div class="relative" v-reveal="{ delay: 1000 }">
              <div class="absolute left-0 top-8 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent-bold to-accent-strong shadow-lg flex items-center justify-center">
                <span class="font-funnel font-bold text-lg text-white">04</span>
              </div>
              
              <div class="ml-20 sm:ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div class="hidden lg:block"></div>
                <div class="lg:pl-8">
                  <div class="relative">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                    <div class="relative bg-background border-2 border-primary rounded-xl p-6 sm:p-8">
                      <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                        Remote, Producer-Hosted Recording
                      </h2>
                      <p class="font-dm text-base sm:text-lg text-primary/70 leading-relaxed mb-4">
                        <strong class="text-accent-bold">High-signal session, minimal lift.</strong>
                      </p>
                      <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                        A <strong class="text-accent-bold">90-minute</strong> virtual interview (studio-quality capture) guided by your producer. We cover the main narrative, then run a short "clip farm" for clean 60–90s answers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Step 5: Produce & Package -->
            <div class="relative" v-reveal="{ delay: 1200 }">
              <div class="absolute left-0 top-8 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary/90 to-primary shadow-lg flex items-center justify-center">
                <span class="font-funnel font-bold text-lg text-secondary">05</span>
              </div>
              
              <div class="ml-20 sm:ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div class="lg:text-right lg:pr-8">
                  <div class="relative">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                    <div class="relative bg-background border-2 border-primary rounded-xl p-6 sm:p-8">
                      <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                        Produce & Package
                      </h2>
                      <p class="font-dm text-base sm:text-lg text-primary/70 leading-relaxed mb-6">
                        <strong class="text-accent-bold">From one session to a month of reviewer-ready proof.</strong>
                      </p>
                      
                      <!-- Deliverables list -->
                      <div class="space-y-4 text-left" v-stagger="{ delay: 100 }">
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 mt-2.5"></div>
                          <div>
                            <h4 class="font-dm font-semibold text-primary text-sm mb-1 leading-tight">LinkedIn Short Videos (60–90s)</h4>
                            <p class="font-dm text-xs text-primary/60 leading-relaxed">with captions, titles, thumbnails</p>
                          </div>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 mt-2.5"></div>
                          <div>
                            <h4 class="font-dm font-semibold text-primary text-sm mb-1 leading-tight">Stakeholder Clip Packs</h4>
                            <p class="font-dm text-xs text-primary/60 leading-relaxed">Compliance • Risk/Security • Legal • Finance</p>
                          </div>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 mt-2.5"></div>
                          <div>
                            <h4 class="font-dm font-semibold text-primary text-sm mb-1 leading-tight">Monthly Podcast Episodes</h4>
                            <p class="font-dm text-xs text-primary/60 leading-relaxed">video + audio, titles & show notes, Spotify-ready</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="hidden lg:block"></div>
              </div>
            </div>
  
            <!-- Step 6: Review & Release -->
            <div class="relative" v-reveal="{ delay: 1400 }">
              <div class="absolute left-0 top-8 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-bold shadow-lg flex items-center justify-center">
                <span class="font-funnel font-bold text-lg text-white">06</span>
              </div>
              
              <div class="ml-20 sm:ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div class="hidden lg:block"></div>
                <div class="lg:pl-8">
                  <div class="relative">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                    <div class="relative bg-background border-2 border-primary rounded-xl p-6 sm:p-8">
                      <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                        Review & Release
                      </h2>
                      <p class="font-dm text-base sm:text-lg text-primary/70 leading-relaxed mb-4">
                        <strong class="text-accent-bold">Review window for tweaks.</strong>
                      </p>
                      <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                        We route only the <strong class="text-accent-bold">claims</strong> through the compliance lane (binary Approve/Change). Creative feedback gets <strong class="text-accent-bold">2 revision rounds</strong>, then we <strong class="text-accent-bold">edit-lock</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Step 7: Distribute & Measure -->
            <div class="relative" v-reveal="{ delay: 1600 }">
              <div class="absolute left-0 top-8 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg flex items-center justify-center">
                <span class="font-funnel font-bold text-lg text-secondary">07</span>
              </div>
              
              <div class="ml-20 sm:ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div class="lg:text-right lg:pr-8">
                  <div class="relative">
                    <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                    <div class="relative bg-background border-2 border-primary rounded-xl p-6 sm:p-8">
                      <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                        Distribute & Measure
                      </h2>
                      <p class="font-dm text-base sm:text-lg text-primary/70 leading-relaxed mb-4">
                        <strong class="text-accent-bold">Everything arrives approval-locked and ready to post.</strong>
                      </p>
                      <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                        We package assets in platform-native formats and give you a single doc with <strong class="text-accent-bold">ready-to-share links</strong> so your team can publish instantly.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="hidden lg:block"></div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Add-ons Section -->
        <div class="mt-20 sm:mt-24 md:mt-28 flex flex-col items-center" v-reveal="{ delay: 700 }">
          <div class="mb-12 sm:mb-16 flex flex-row items-start justify-center w-fit">
            <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-4 sm:mb-6">
              Add-ons
            </h2>
            <div class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 -translate-y-2 sm:-translate-y-3 md:-translate-y-5 flex items-center justify-center bg-gradient-to-tr from-accent-soft to-accent-strong mx-auto mt-2 sm:mt-3 md:mt-4 rounded-full">
              <span class="font-funnel font-bold text-xs sm:text-sm md:text-sm text-white mb-px">+</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-6" v-stagger="{ delay: 150 }">
            <div v-for="addon in addons" :key="addon" class="relative">
              <span class="absolute translate-x-1 translate-y-1 inset-0 border border-dashed border-accent/40 rounded-lg"></span>
              <div class="relative h-full bg-background border border-accent/30 rounded-lg p-4 text-center">
                <div class="w-8 h-8 rounded-lg bg-accent/20 mb-3 flex items-center justify-center mx-auto">
                  <div class="w-3 h-3 rounded-full bg-accent-bold"></div>
                </div>
                <h3 class="font-dm font-medium text-primary text-xs sm:text-sm leading-tight">
                  {{ addon }}
                </h3>
              </div>
            </div>
          </div>
        </div>
  
        <!-- CTA Section -->
        <div class="mt-20 sm:mt-24 md:mt-28 text-center" v-reveal="{ delay: 2000 }">
          <div class="relative inline-block">
            <div class="absolute -inset-6 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 rounded-3xl blur-xl"></div>
            <div class="relative bg-background/95 backdrop-blur-sm border border-accent/30 rounded-2xl p-8 sm:p-12">
              <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-6 leading-tight">
                Ready to streamline your approvals?
              </h2>
              <p class="font-dm text-lg sm:text-xl text-primary/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Transform scattered explanations into reviewer-ready assets in just 150 minutes of your time.
              </p>
              
              <button @click.prevent="triggerBookCall" class="group relative bg-accent-bold text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl font-dm font-semibold text-lg sm:text-xl transition-all duration-300 hover:bg-accent-strong hover:scale-105 overflow-hidden">
                Book an intro call
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
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
  
  const addons = [
    'Extra recording block',
    'More episodes', 
    'Clip expansion pack',
    'Revisions boost',
    'Rush Turnaround',
    'Expert Co-Host',
    'Proof pack'
  ]
  </script>