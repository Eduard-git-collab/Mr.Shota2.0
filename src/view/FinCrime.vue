<template>
  <div class="w-full bg-secondary text-primary">
    
    <main>
      <!-- Hero Section with diagonal split design -->
      <section class="relative w-full min-h-screen bg-secondary overflow-hidden">
        <!-- Diagonal split background -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5"></div>
          <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="rgba(185, 177, 255, 0.03)" points="0,0 100,0 85,100 0,100" />
          </svg>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]">
            
            <!-- Left content -->
            <div class="lg:col-span-7" v-stagger="{ delay: 200 }">
              <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 flex items-center justify-center transition-all duration-300 hover:bg-accent/30 hover:scale-110">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="font-dm text-accent-bold text-xs sm:text-sm tracking-[0.15em] uppercase">FinCrime (KYC/AML/Sanctions)</span>
              </div>
              
              <h1 class="font-funnel font-thin text-[clamp(2rem,8vw,6rem)] sm:text-[clamp(2.5rem,7vw,6rem)] text-primary leading-[0.9] tracking-tight mb-6 sm:mb-8">
                Strategic Buy‑In<br/>
                <span class="text-accent-bold relative">
                  Narrative
                  <div class="absolute -bottom-2 left-0 w-full h-1 bg-accent-bold/30 rounded-full animate-pulse"></div>
                </span>
              </h1>
              
              <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed mb-8 sm:mb-12 max-w-full lg:max-w-2xl">
                A <strong class="text-accent-bold">Podcast & LinkedIn</strong> content engine that builds immediate confidence and keeps internal conversations moving asynchronously across Compliance, Risk, Security, Legal, and Finance.
              </p>

              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button class="group relative bg-accent-bold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-dm font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-accent-strong hover:scale-105 overflow-hidden">
                  Get Started
                  <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button class="border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-dm font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-primary hover:text-secondary hover:scale-105">
                  How it works
                </button>
              </div>
            </div>

            <!-- Right visual element -->
            <div class="lg:col-span-5 mt-8 lg:mt-0">
              <div 
                v-reveal="{ delay: 600, direction: 'scale' }"
                class="relative transition-all duration-500 hover:scale-105"
              >
                <div class="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-accent/10 to-accent-bold/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl animate-pulse"></div>
                <div class="relative bg-background/90 backdrop-blur-sm border border-accent/30 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                  <h3 class="font-funnel font-bold text-xl sm:text-2xl text-primary mb-4 sm:mb-6">Lightning-Fast Buy-In.<br/>No More Bottlenecks.</h3>
                  <div class="space-y-3 sm:space-y-4" v-stagger="{ delay: 150 }">
                    <div class="flex items-center gap-3 group transition-all duration-200 hover:translate-x-2">
                      <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 animate-pulse"></div>
                      <span class="font-dm text-sm sm:text-base text-primary/70">AML review challenges</span>
                    </div>
                    <div class="flex items-center gap-3 group transition-all duration-200 hover:translate-x-2" style="animation-delay: 0.1s">
                      <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 animate-pulse"></div>
                      <span class="font-dm text-sm sm:text-base text-primary/70">KYC & sanctions controls</span>
                    </div>
                    <div class="flex items-center gap-3 group transition-all duration-200 hover:translate-x-2" style="animation-delay: 0.2s">
                      <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 animate-pulse"></div>
                      <span class="font-dm text-sm sm:text-base text-primary/70">Compliance sign-off</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section with staggered cards -->
      <section class="relative w-full py-16 sm:py-24 md:py-32 bg-primary text-secondary overflow-hidden">
        <!-- Flowing background pattern -->
        <div class="absolute inset-0">
          <svg class="absolute top-0 right-0 w-1/2 h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,20 Q50,0 100,30 L100,100 L0,100 Z" fill="currentColor"/>
          </svg>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div class="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 
              v-reveal
              class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-4 sm:mb-6"
            >
              How it works
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" v-stagger="{ delay: 200 }">
            <!-- Step 1 -->
            <div class="relative group md:col-span-2 lg:col-span-1 transition-all duration-500 hover:scale-105">
              <div class="absolute -inset-2 sm:-inset-4 bg-accent/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full">
                <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-lg sm:text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">1</div>
                  <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary">Build</h3>
                </div>
                <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed">
                  Pinpoint AML, KYC, and sanctions review challenges in a focused 45-minute session. Map out pain points—false positives, shifting controls, audit prep—and shape messaging that makes approval smooth for Compliance, Risk, and MLRO teams.
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="relative group md:col-span-2 lg:col-span-1 lg:mt-12 transition-all duration-500 hover:scale-105">
              <div class="absolute -inset-2 sm:-inset-4 bg-accent/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full">
                <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-lg sm:text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">2</div>
                  <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary">Record</h3>
                </div>
                <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed">
                  Host-led, 90-minute, interview-style recording session captures expert insights and rapid-fire clips that highlight your strongest controls and fastest onboarding wins. Stakeholders receive proof-ready assets that clear vendor reviews—no endless meetings needed.
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="relative group md:col-span-2 lg:col-span-1 lg:mt-24 transition-all duration-500 hover:scale-105">
              <div class="absolute -inset-2 sm:-inset-4 bg-accent/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full">
                <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-lg sm:text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">3</div>
                  <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary">Distribute</h3>
                </div>
                <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed">
                  Receive tailored LinkedIn clips, and a podcast episode, all designed to emphasize transparent controls and real risk reduction—making compliance sign-off easier every month.
                </p>
              </div>
            </div>
          </div>

          <!-- Proof strip -->
          <div class="text-center mt-12 sm:mt-16 md:mt-20" v-reveal="{ delay: 800 }">
            <div class="inline-block bg-accent/10 border border-accent/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 transition-all duration-300 hover:bg-accent/20 hover:scale-105">
              <p class="font-dm text-secondary/80 text-sm sm:text-base md:text-lg">
                <strong class="text-accent">≤150 min SME time</strong> · <strong class="text-accent">5‑day turnaround</strong> · <strong class="text-accent">2 revisions</strong> · <strong class="text-accent">Claims & Controls review before edit lock</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Features with alternating layout -->
      <section class="relative w-full py-16 sm:py-24 md:py-32 bg-secondary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div class="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 
              v-reveal
              class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-4 sm:mb-6"
            >
              Key Features
            </h2>
          </div>

          <div class="space-y-16 sm:space-y-20 md:space-y-24">
            <!-- Feature 1 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center" v-reveal="{ delay: 200 }">
              <div class="order-2 lg:order-1">
                <h3 class="font-funnel font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-4 sm:mb-6">Accelerated Consensus Clarity</h3>
                <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed">
                  Short, definitive narratives approvers in Security, Compliance, Legal, and Finance can absorb in seconds, with no ambiguity. Built to pre-answer diligence questions, they reduce clarification rounds and shorten vendor-review timelines.
                </p>
              </div>
              <div class="relative order-1 lg:order-2 group">
                <div class="absolute -inset-2 sm:-inset-4 bg-accent/5 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl transition-all duration-500 group-hover:bg-accent/10"></div>
                <div class="relative bg-accent/10 border border-accent/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <svg class="w-12 h-12 sm:w-16 sm:h-16 text-accent-bold transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center" v-reveal="{ delay: 400 }">
              <div class="lg:order-2">
                <h3 class="font-funnel font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-4 sm:mb-6">Instant Founder/SME Presence</h3>
                <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed">
                  Short, definitive narratives approvers in Security, Compliance, Legal, and Finance can absorb in seconds, with no ambiguity. Built to pre-answer diligence questions, they reduce clarification rounds and shorten vendor-review timelines.
                </p>
              </div>
              <div class="relative lg:order-1 group">
                <div class="absolute -inset-2 sm:-inset-4 bg-accent/5 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl transition-all duration-500 group-hover:bg-accent/10"></div>
                <div class="relative bg-accent/10 border border-accent/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <svg class="w-12 h-12 sm:w-16 sm:h-16 text-accent-bold transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center" v-reveal="{ delay: 600 }">
              <div class="order-2 lg:order-1">
                <h3 class="font-funnel font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-4 sm:mb-6">Outreach With Certainty</h3>
                <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed">
                  Account teams share consistent, claim-safe messages powered by a <strong class="text-accent-bold">stakeholder content engine</strong> for Compliance, Risk, Security, and Finance. Every asset draws from one approved source of truth (claims, controls, caveats), so nothing drifts as opportunities progress.
                </p>
              </div>
              <div class="relative order-1 lg:order-2 group">
                <div class="absolute -inset-2 sm:-inset-4 bg-accent/5 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl transition-all duration-500 group-hover:bg-accent/10"></div>
                <div class="relative bg-accent/10 border border-accent/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <svg class="w-12 h-12 sm:w-16 sm:h-16 text-accent-bold transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Deliverables -->
      <section class="relative w-full py-16 sm:py-24 md:py-32 bg-primary text-secondary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 
            v-reveal
            class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 sm:mb-8"
          >
            Deliverables
          </h2>
          <h3 
            v-reveal="{ delay: 200 }"
            class="font-funnel font-bold text-2xl sm:text-3xl md:text-4xl text-accent mb-6 sm:mb-8"
          >
            Stakeholder-Ready Clip Set
          </h3>
          <p 
            v-reveal="{ delay: 400 }"
            class="font-dm text-lg sm:text-xl text-secondary/80 leading-relaxed max-w-4xl mx-auto"
          >
            Ready-to-post LinkedIn clips + titles, thumbnails, SRTs, audiograms, <strong class="text-accent">stakeholder clip packs</strong> (forwardable email blurbs + 2–3 clips per stakeholder), podcast episode (Apple/Spotify).
          </p>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="relative w-full py-16 sm:py-24 md:py-32 bg-secondary">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center" v-stagger="{ delay: 200 }">
          <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-4 sm:mb-6">Move Internal Decisions Forward</h2>
          <p class="font-dm text-xl sm:text-2xl text-primary/80 mb-8 sm:mb-12">Turn one conversation into a month of buy-in.</p>
          
          <button 
            @click.prevent="triggerBookCall" 
            class="group relative bg-accent-bold text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl font-dm font-semibold text-lg sm:text-xl transition-all duration-300 hover:bg-accent-strong hover:scale-105 overflow-hidden"
          >
            Book an intro call
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
import { useAnimations } from '../composables/useAnimations'

const { triggerBookCall } = useBookCallNavigation()
const { vReveal, vStagger } = useAnimations()
</script>