<template>
  <div class="w-full bg-secondary text-primary">
    
    <main>
      <!-- Hero Section with layered design -->
      <section class="relative w-full min-h-screen bg-secondary overflow-hidden">
        <!-- Layered background -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5"></div>
          <div class="absolute top-10 sm:top-20 right-10 sm:right-20 w-20 h-20 sm:w-40 sm:h-40 rounded-full bg-accent/10 blur-2xl sm:blur-3xl animate-pulse"></div>
          <div class="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-primary/5 blur-2xl sm:blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]">
            
            <!-- Left content -->
            <div class="lg:col-span-3" v-stagger="{ delay: 200 }">
              <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-accent to-accent-bold flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <span class="font-dm text-accent-bold text-xs sm:text-sm tracking-[0.15em] uppercase">Data Privacy & Security</span>
              </div>
              
              <h1 class="font-funnel font-thin text-[clamp(2rem,8vw,6rem)] sm:text-[clamp(2.5rem,7vw,6rem)] text-primary leading-[0.9] tracking-tight mb-6 sm:mb-8">
                Vendor Review,<br/>
                <span class="relative">
                  Clearly Explained
                  <div class="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-accent to-accent-bold rounded-full animate-pulse"></div>
                </span>
              </h1>
              
              <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed mb-8 sm:mb-12">
                We convert one expert interview into a <strong class="text-accent-bold">Podcast & LinkedIn</strong> content engine that accelerates <strong class="text-accent-bold">DPIA and vendor review</strong>—clear data flows, access controls/RBAC, encryption, retention/purge, and key management in plain English.
              </p>

              <button 
                @click.prevent="triggerBookCall" 
                class="group relative bg-accent-bold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-dm font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-accent-strong hover:scale-105 overflow-hidden"
              >
                Book an intro call
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>

            <!-- Right visual stack -->
            <div class="lg:col-span-2 mt-8 lg:mt-0">
              <div class="space-y-4 sm:space-y-6" v-stagger="{ delay: 150 }">
                <div class="relative bg-background/95 backdrop-blur-sm border border-accent/30 rounded-lg sm:rounded-xl p-4 sm:p-6 transform rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-105">
                  <h4 class="font-funnel font-semibold text-base sm:text-lg text-primary mb-1 sm:mb-2">Video solutions</h4>
                  <p class="font-dm text-primary/70 text-xs sm:text-sm">made for every stakeholder</p>
                </div>
                <div class="relative bg-background/95 backdrop-blur-sm border border-accent/30 rounded-lg sm:rounded-xl p-4 sm:p-6 transform -rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-105">
                  <h4 class="font-funnel font-semibold text-base sm:text-lg text-primary mb-1 sm:mb-2">DPIA acceleration</h4>
                  <p class="font-dm text-primary/70 text-xs sm:text-sm">Privacy approvals in plain English</p>
                </div>
                <div class="relative bg-background/95 backdrop-blur-sm border border-accent/30 rounded-lg sm:rounded-xl p-4 sm:p-6 transform rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-105">
                  <h4 class="font-funnel font-semibold text-base sm:text-lg text-primary mb-1 sm:mb-2">Control clarity</h4>
                  <p class="font-dm text-primary/70 text-xs sm:text-sm">RBAC, encryption, key management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section with flowing design -->
      <section class="relative w-full py-16 sm:py-24 md:py-32 bg-gradient-to-br from-primary via-primary to-primary/90 text-secondary overflow-hidden">
        <!-- Flowing lines background -->
        <div class="absolute inset-0">
          <svg class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,300 Q250,200 500,300 T1000,300" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M0,600 Q250,500 500,600 T1000,600" stroke="currentColor" stroke-width="2" fill="none"/>
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

          <!-- Flowing process cards -->
          <div class="relative">
            <div class="absolute left-1/2 top-0 bottom-0 w-px bg-accent/30 transform -translate-x-px hidden lg:block"></div>
            
            <div class="space-y-12 sm:space-y-16" v-stagger="{ delay: 300 }">
              <!-- Step 1 -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div class="lg:text-right lg:pr-8 xl:pr-12">
                  <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:bg-secondary/15">
                    <div class="flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary order-2 lg:order-1">Build</h3>
                      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-lg sm:text-xl flex-shrink-0 order-1 lg:order-2 transition-all duration-300 hover:scale-110 hover:rotate-12">1</div>
                    </div>
                    <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed">
                      Uncover pressing privacy, security, and legal concerns in a focused 45 minute session. Map out DPIA complexity, breach anxiety, and review holdups, then align messaging to speed up stakeholder buy-in and ease compliance worries.
                    </p>
                  </div>
                </div>
                <div class="hidden lg:block"></div>
              </div>

              <!-- Step 2 -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div class="hidden lg:block"></div>
                <div class="lg:pl-8 xl:pl-12">
                  <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:bg-secondary/15">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-lg sm:text-xl flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-12">2</div>
                      <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary">Record</h3>
                    </div>
                    <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed">
                      Host-led, 90-minute, interview-style recording session captures expert clarity—on data flows, encryption, and audit alignment—so every reviewer gets straightforward, benefit-driven answers.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div class="lg:text-right lg:pr-8 xl:pr-12">
                  <div class="relative bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:bg-secondary/15">
                    <div class="flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <h3 class="font-funnel font-bold text-xl sm:text-2xl text-secondary order-2 lg:order-1">Distribute</h3>
                      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-primary flex items-center justify-center font-funnel font-bold text-lg sm:text-xl flex-shrink-0 order-1 lg:order-2 transition-all duration-300 hover:scale-110 hover:rotate-12">3</div>
                    </div>
                    <p class="font-dm text-sm sm:text-base text-secondary/80 leading-relaxed">
                      Concise LinkedIn clips, and podcast episodes. Each asset is crafted for quick DPIA and privacy approvals.
                    </p>
                  </div>
                </div>
                <div class="hidden lg:block"></div>
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

      <!-- Key Features with card grid -->
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

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" v-stagger="{ delay: 200 }">
            <!-- Feature 1 -->
            <div class="relative group md:col-span-2 lg:col-span-1 transition-all duration-500 hover:scale-105">
              <span class="absolute translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 inset-0 border-2 border-dashed border-accent/40 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:border-accent/60"></span>
              <div class="relative bg-background border-2 border-accent rounded-lg sm:rounded-xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:bg-accent/5">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 mb-4 sm:mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/30 group-hover:scale-110">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">Accelerated Vendor Review</h3>
                <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                  Turn complex innovation into a concise, clear story that reviewers can grasp quickly—no technical deep-dives required. By pre-answering data handling, controls, and effort, you cut questionnaire rounds and move from packet sent to approval <strong class="text-accent-bold">weeks faster</strong>.
                </p>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="relative group md:col-span-2 lg:col-span-1 transition-all duration-500 hover:scale-105">
              <span class="absolute translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 inset-0 border-2 border-dashed border-accent/40 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:border-accent/60"></span>
              <div class="relative bg-background border-2 border-accent rounded-lg sm:rounded-xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:bg-accent/5">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 mb-4 sm:mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/30 group-hover:scale-110">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">Transparent Guardrails</h3>
                <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                  SOC 2 / ISO 27001-aligned control descriptions, client-provided pen-test cadence, and DPIA workflow—stated with scope and caveats. Every claim maps to evidence in a claims-and-controls sheet, using regulator-safe language that legal can approve in <strong class="text-accent-bold">one pass</strong>.
                </p>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="relative group md:col-span-2 lg:col-span-1 transition-all duration-500 hover:scale-105">
              <span class="absolute translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 inset-0 border-2 border-dashed border-accent/40 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:border-accent/60"></span>
              <div class="relative bg-background border-2 border-accent rounded-lg sm:rounded-xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:bg-accent/5">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 mb-4 sm:mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/30 group-hover:scale-110">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">Versatile Distribution</h3>
                <p class="font-dm text-sm sm:text-base text-primary/70 leading-relaxed">
                  Assets engineered for email, Slack, and Confluence threads; <strong class="text-accent-bold">day-1 forwardable</strong>. Each stakeholder variant lives in your content engine with clear filenames and shareable links, so champions paste the right proof in <strong class="text-accent-bold">seconds</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Deliverables -->
      <section class="relative w-full py-16 sm:py-24 md:py-32 bg-primary text-secondary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center" v-stagger="{ delay: 200 }">
          <h2 class="font-funnel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-6 sm:mb-8">Deliverables</h2>
          <h3 class="font-funnel font-bold text-2xl sm:text-3xl md:text-4xl text-accent mb-6 sm:mb-8">Stakeholder-Ready Clip Set</h3>
          <p class="font-dm text-lg sm:text-xl text-secondary/80 leading-relaxed max-w-4xl mx-auto">
            12 LinkedIn clips + titles, thumbnails, SRTs, audiograms, <strong class="text-accent">stakeholder clip packs</strong> (forwardable email blurbs + 2–3 clips per stakeholder), podcast episode (Apple/Spotify).
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