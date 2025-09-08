<template>
    <div class="w-full bg-secondary text-primary">
      
      <main>
        <!-- Hero Section with geometric grid -->
        <section class="relative w-full min-h-screen bg-secondary overflow-hidden">
          <!-- Grid background -->
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3"></div>
            <svg class="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" class="text-primary"/>
            </svg>
          </div>
  
          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
            <div class="min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] flex flex-col justify-center">
              
              <!-- Header -->
              <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <span class="font-dm text-primary/80 text-xs sm:text-sm tracking-[0.15em] uppercase">In‑house RegOps</span>
              </div>
              
              <!-- Main content grid -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-start">
                
                <!-- Title section -->
                <div class="lg:col-span-2">
                  <h1 class="font-funnel font-thin text-[clamp(2rem,8vw,6rem)] sm:text-[clamp(2.5rem,7vw,6rem)] text-primary leading-[0.9] tracking-tight mb-6 sm:mb-8">
                    Internal Buy‑In for<br/>
                    <span class="text-accent-bold">Controls & AI/ML</span><br/>
                    Rollouts
                  </h1>
                  
                  <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <button class="group relative bg-accent-bold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-dm font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-accent-strong hover:scale-105">
                      Get Started
                      <div class="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </button>
                  </div>
                </div>
  
                <!-- Feature highlight -->
                <div class="lg:col-span-1 mt-4 lg:mt-0">
                  <div class="relative">
                    <span class="absolute translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-lg sm:rounded-xl"></span>
                    <div class="relative bg-background border-2 border-primary rounded-lg sm:rounded-xl p-4 sm:p-6">
                      <h3 class="font-funnel font-bold text-lg sm:text-xl text-primary mb-2 sm:mb-4">Accelerate Approvals</h3>
                      <p class="font-dm text-primary/70 text-xs sm:text-sm mb-3 sm:mb-4">Confidence for Every Audit</p>
                      <div class="space-y-2">
                        <div class="flex items-center gap-2">
                          <div class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent-bold flex-shrink-0"></div>
                          <span class="font-dm text-xs text-primary/60">MLRO alignment</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <div class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent-bold flex-shrink-0"></div>
                          <span class="font-dm text-xs text-primary/60">Risk & Privacy sign-offs</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <div class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent-bold flex-shrink-0"></div>
                          <span class="font-dm text-xs text-primary/60">Finance approvals</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Description -->
              <div class="mt-8 sm:mt-12 max-w-full lg:max-w-4xl">
                <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed">
                  One monthly expert interview becomes a <strong class="text-accent-bold">Podcast + LinkedIn</strong> content engine that wins buy‑in for new controls, AI/ML governance, and policy changes—tailored for <strong class="text-accent-bold">MLRO, Risk, Privacy, Security, and Finance</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Process Section with hexagonal design -->
        <section class="relative w-full py-16 sm:py-24 md:py-32 bg-primary text-secondary overflow-hidden">
          <!-- Hexagonal pattern background -->
          <div class="absolute inset-0">
            <svg class="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="hexagon" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                  <polygon points="10,0 20,5.77 20,11.55 10,17.32 0,11.55 0,5.77" fill="none" stroke="currentColor" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexagon)" class="text-secondary"/>
            </svg>
          </div>
  
          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div class="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-4 sm:mb-6">How it works</h2>
            </div>
  
            <!-- Hexagonal process layout -->
            <div class="relative max-w-6xl mx-auto">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                
                <!-- Step 1 -->
                <div class="relative group sm:col-span-2 md:col-span-1">
                  <div class="absolute -inset-2 sm:-inset-4 bg-accent/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full">
                    <div class="text-center mb-4 sm:mb-6">
                      <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-xl sm:text-2xl mb-3 sm:mb-4">1</div>
                      <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary">Build</h3>
                    </div>
                    <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed text-center">
                      Zero in on governance roadblocks, policy debates, and AI/ML uncertainty, in a focused 45 minute session. Shape answers around what RegOps, Risk, and Finance need to unlock alignment and faster sign-offs.
                    </p>
                  </div>
                </div>
  
                <!-- Step 2 -->
                <div class="relative group sm:col-span-2 md:col-span-1 md:mt-6 lg:mt-12">
                  <div class="absolute -inset-2 sm:-inset-4 bg-accent/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full">
                    <div class="text-center mb-4 sm:mb-6">
                      <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-xl sm:text-2xl mb-3 sm:mb-4">2</div>
                      <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary">Record</h3>
                    </div>
                    <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed text-center">
                      Host-led, 60-minute, interview-style recording session captures expert insights from real governance scenarios and recurring objections—so every team receives clear, actionable clips that turn complexity into buy-in.
                    </p>
                  </div>
                </div>
  
                <!-- Step 3 -->
                <div class="relative group sm:col-span-2 md:col-span-1">
                  <div class="absolute -inset-2 sm:-inset-4 bg-accent/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full">
                    <div class="text-center mb-4 sm:mb-6">
                      <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-xl sm:text-2xl mb-3 sm:mb-4">3</div>
                      <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary">Distribute</h3>
                    </div>
                    <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed text-center">
                      Deliver LinkedIn-ready clips and monthly podcast episodes. Each piece designed to knock down recurring objections and quickly drive internal consensus.
                    </p>
                  </div>
                </div>
              </div>
  
              <!-- Proof strip -->
              <div class="text-center mt-12 sm:mt-16 md:mt-20">
                <div class="inline-block bg-accent/10 border border-accent/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4">
                  <p class="font-dm text-secondary/80 text-sm sm:text-base md:text-lg">
                    <strong class="text-accent">≤90 min SME time</strong> · <strong class="text-accent">5‑day turnaround</strong> · <strong class="text-accent">2 revisions</strong> · <strong class="text-accent">Claims & Controls review before edit lock</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Key Features with masonry layout -->
        <section class="relative w-full py-16 sm:py-24 md:py-32 bg-secondary">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div class="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-4 sm:mb-6">Key Features</h2>
            </div>
  
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <!-- Feature 1 - Tall -->
              <div class="relative group md:col-span-2 lg:col-span-1 lg:row-span-2">
                <span class="absolute translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-lg sm:rounded-xl"></span>
                <div class="relative bg-background border-2 border-primary rounded-lg sm:rounded-xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 mb-4 sm:mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/30">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">Faster Internal Approvals</h3>
                  <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed mb-6 sm:mb-8">
                    Clips designed to circulate in governance threads and stand on their own.
                  </p>
                  <div class="space-y-2 sm:space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                      <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-bold flex-shrink-0"></div>
                      <span class="font-dm text-xs sm:text-sm text-primary/60">Governance thread ready</span>
                    </div>
                    <div class="flex items-center gap-2 sm:gap-3">
                      <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-bold flex-shrink-0"></div>
                      <span class="font-dm text-xs sm:text-sm text-primary/60">Self-contained explanations</span>
                    </div>
                    <div class="flex items-center gap-2 sm:gap-3">
                      <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-bold flex-shrink-0"></div>
                      <span class="font-dm text-xs sm:text-sm text-primary/60">Quick consensus building</span>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Feature 2 -->
              <div class="relative group">
                <span class="absolute translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 inset-0 border-2 border-dashed border-accent/40 rounded-lg sm:rounded-xl"></span>
                <div class="relative bg-background border-2 border-accent rounded-lg sm:rounded-xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 mb-4 sm:mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/30">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">AI/ML De‑Risked</h3>
                  <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                    Transparency on monitoring, overrides, and accountability—approved by Compliance/Security.
                  </p>
                </div>
              </div>
  
              <!-- Feature 3 -->
              <div class="relative group">
                <span class="absolute translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 inset-0 border-2 border-dashed border-accent/40 rounded-lg sm:rounded-xl"></span>
                <div class="relative bg-background border-2 border-accent rounded-lg sm:rounded-xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:bg-accent/5">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 mb-4 sm:mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/30">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                  </div>
                  <h3 class="font-funnel font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">Reusable Answers</h3>
                  <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                    Build a compounding library that addresses repeat objections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Deliverables -->
        <section class="relative w-full py-16 sm:py-24 md:py-32 bg-primary text-secondary">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 sm:mb-8">Deliverables</h2>
            <h3 class="font-funnel font-bold text-2xl sm:text-3xl md:text-4xl text-accent mb-6 sm:mb-8">Stakeholder-Ready Clip Set</h3>
            <p class="font-dm text-lg sm:text-xl text-secondary/80 leading-relaxed max-w-4xl mx-auto">
              12 LinkedIn clips + titles, thumbnails, SRTs, audiograms, <strong class="text-accent">stakeholder clip packs</strong> (forwardable email blurbs + 2–3 clips per stakeholder), podcast episode (Apple/Spotify).
            </p>
          </div>
        </section>
  
        <!-- CTA Section -->
        <section class="relative w-full py-16 sm:py-24 md:py-32 bg-secondary">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-4 sm:mb-6">Move Internal Decisions Forward</h2>
            <p class="font-dm text-xl sm:text-2xl text-primary/80 mb-8 sm:mb-12">Turn one conversation into a month of buy-in.</p>
            
            <button @click.prevent="triggerBookCall" class="group relative bg-accent-bold text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl font-dm font-semibold text-lg sm:text-xl transition-all duration-300 hover:bg-accent-strong hover:scale-105">
              Book an intro call
              <div class="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </section>
      </main>
      
      <FooterSection />
    </div>
  </template>
  
  <script setup>
  import FooterSection from '../components/layout/FooterSection.vue'
  import { useBookCallNavigation } from '../composables/useBookCallNavigation'

const { triggerBookCall } = useBookCallNavigation()
  </script>