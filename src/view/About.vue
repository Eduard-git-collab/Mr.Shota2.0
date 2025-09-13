<template>
    <div class="min-h-screen bg-background">
      <!-- Hero Section -->
      <section class="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <!-- Background Pattern -->
        <div aria-hidden="true" class="absolute inset-0">
          <div class="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <!-- Flowing lines -->
          <svg class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600">
            <path d="M0,300 Q250,100 500,300 T1000,300" stroke="currentColor" stroke-width="2" fill="none" class="text-accent"/>
            <path d="M0,400 Q250,200 500,400 T1000,400" stroke="currentColor" stroke-width="1" fill="none" class="text-primary"/>
          </svg>
        </div>
  
        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div class="text-center" v-reveal="{ delay: 200 }">
            <div class="inline-flex items-center gap-3 mb-8">
              <div class="w-12 h-px bg-gradient-to-r from-transparent to-accent"></div>
              <span class="font-dm text-accent font-medium tracking-wide">ABOUT NYVO CREATIVE</span>
              <div class="w-12 h-px bg-gradient-to-r from-accent to-transparent"></div>
            </div>
            
            <h1 class="font-funnel font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary leading-tight mb-8">
              Accelerating approvals<br>
              <span class="bg-gradient-to-r from-accent to-accent-bold bg-clip-text text-transparent">
                through clarity
              </span>
            </h1>
            
            <p class="font-dm text-xl sm:text-2xl text-primary/70 max-w-4xl mx-auto leading-relaxed">
              We turn one expert interview into a stakeholder-ready content engine that accelerates approvals across Security, Compliance, Legal, and Finance.
            </p>
          </div>
        </div>
      </section>
  
      <!-- Main Content -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-20 sm:pb-28">
        
        <!-- Why We Exist -->
        <section class="mb-20" v-reveal="{ delay: 400 }">
          <div class="relative">
            <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent to-accent-bold rounded-full"></div>
            <div class="pl-12">
              <h2 class="font-funnel font-bold text-3xl sm:text-4xl text-primary mb-6">
                Why we exist
              </h2>
              <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed">
                Enterprise fintech deals stall when approvers can't see clear, consistent answers. We fix the "ACV time tax" by replacing scattered docs and repeat meetings with reviewer-ready assets—so decisions move weeks faster.
              </p>
            </div>
          </div>
        </section>
  
        <!-- What We Do -->
        <section class="mb-20" v-reveal="{ delay: 600 }">
            <div class="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 sm:p-12 border border-accent/20">
                <h2 class="font-funnel font-bold text-3xl sm:text-4xl text-primary mb-6">
                  What we do
                </h2>
                
                <!-- Original Copy -->
                <div class="text-center mb-8">
                  <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed">
                    Interview → engineered narratives for each stakeholder → compact Proof Pack → approval-locked files your champion can forward the same day.
                  </p>
                </div>
                
                <!-- Visual Breakdown -->
                <div class="relative">
                  <!-- Progress Line -->
                  <div class="absolute top-8 left-8 right-8 h-0.5 bg-accent/30 hidden sm:block"></div>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-4 gap-8 relative">
                    <div class="text-center">
                      <div class="w-16 h-16 rounded-full bg-accent-bold text-white flex items-center justify-center mx-auto mb-4 text-xl font-funnel font-bold relative z-10">
                        1
                      </div>
                      <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Interview</h3>
                      <p class="font-dm text-sm text-primary/70">Expert session</p>
                    </div>
                    
                    <div class="text-center">
                      <div class="w-16 h-16 rounded-full bg-accent-bold text-white flex items-center justify-center mx-auto mb-4 text-xl font-funnel font-bold relative z-10">
                        2
                      </div>
                      <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Engineer</h3>
                      <p class="font-dm text-sm text-primary/70">Stakeholder narratives</p>
                    </div>
                    
                    <div class="text-center">
                      <div class="w-16 h-16 rounded-full bg-accent-bold text-white flex items-center justify-center mx-auto mb-4 text-xl font-funnel font-bold relative z-10">
                        3
                      </div>
                      <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Package</h3>
                      <p class="font-dm text-sm text-primary/70">Compact Proof Pack</p>
                    </div>
                    
                    <div class="text-center">
                      <div class="w-16 h-16 rounded-full bg-accent-bold text-white flex items-center justify-center mx-auto mb-4 text-xl font-funnel font-bold relative z-10">
                        ✓
                      </div>
                      <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Deliver</h3>
                      <p class="font-dm text-sm text-primary/70">Approval-locked files</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8 text-center">
                  <div class="inline-flex items-center gap-3 bg-accent-soft/20 rounded-full px-6 py-3 border border-accent/30">
                    <svg class="w-5 h-5 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span class="font-dm font-medium text-primary">Your champion can forward the same day</span>
                  </div>
                </div>
              </div>
        </section>
  
        <!-- Who We Serve -->
        <section class="mb-20" v-reveal="{ delay: 800 }">
          <h2 class="font-funnel font-bold text-3xl sm:text-4xl text-primary mb-8">
            Who we serve
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative group">
              <div class="absolute -inset-2 bg-gradient-to-br from-accent/20 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div class="relative bg-background border border-accent/30 rounded-xl p-6 h-full">
                <div class="w-12 h-12 rounded-lg bg-accent/20 mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-semibold text-xl text-primary mb-3">Financial Services Vendors</h3>
                <p class="font-dm text-primary/70">RegTech, FinCrime, Privacy/GRC, Payments/Infra selling into banks and financial institutions.</p>
              </div>
            </div>
            
            <div class="relative group">
              <div class="absolute -inset-2 bg-gradient-to-br from-primary/20 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div class="relative bg-background border border-primary/30 rounded-xl p-6 h-full">
                <div class="w-12 h-12 rounded-lg bg-primary/20 mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-semibold text-xl text-primary mb-3">In-House RegOps Teams</h3>
                <p class="font-dm text-primary/70">Internal compliance and operations teams communicating change and earning stakeholder buy-in.</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- How We Work -->
        <section class="mb-20" v-reveal="{ delay: 1000 }">
          <h2 class="font-funnel font-bold text-3xl sm:text-4xl text-primary mb-8">
            How we work
          </h2>
          <div class="bg-background border-2 border-accent/30 rounded-2xl p-8 sm:p-12">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div class="text-center" v-stagger="{ delay: 100 }">
                <div class="w-16 h-16 rounded-full bg-accent-bold text-white flex items-center justify-center mx-auto mb-4 text-2xl font-funnel font-bold">
                  1
                </div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">≤150 minutes</h3>
                <p class="font-dm text-sm text-primary/70">Two short touchpoints per month</p>
              </div>
              
              <div class="text-center" v-stagger="{ delay: 100 }">
                <div class="w-16 h-16 rounded-full bg-accent-bold text-white flex items-center justify-center mx-auto mb-4 text-2xl font-funnel font-bold">
                  2
                </div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Producer-led</h3>
                <p class="font-dm text-sm text-primary/70">Interview & solution-focused Q&A mapping</p>
              </div>
              
              <div class="text-center" v-stagger="{ delay: 100 }">
                <div class="w-16 h-16 rounded-full bg-accent-bold text-white flex items-center justify-center mx-auto mb-4 text-2xl font-funnel font-bold">
                  3
                </div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">5-day turnaround</h3>
                <p class="font-dm text-sm text-primary/70">Platform-ready files + Link Pack</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- What Makes Us Different -->
        <section class="mb-20" v-reveal="{ delay: 1200 }">
          <h2 class="font-funnel font-bold text-3xl sm:text-4xl text-primary mb-8">
            What makes us different
          </h2>
          <div class="space-y-6" v-stagger="{ delay: 150 }">
            <div class="flex items-start gap-4 group">
              <div class="w-3 h-3 rounded-full bg-accent-bold flex-shrink-0 mt-2 group-hover:scale-125 transition-transform"></div>
              <div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Approver-first by design</h3>
                <p class="font-dm text-primary/70">Every asset answers one real reviewer question: data flow, access, encryption, retention, controls, effort, unit economics.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 group">
              <div class="w-3 h-3 rounded-full bg-accent-bold flex-shrink-0 mt-2 group-hover:scale-125 transition-transform"></div>
              <div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Proof over promises</h3>
                <p class="font-dm text-primary/70">A Proof Pack sits behind each clip: claims & controls, data-flow visual, retention/purge note, access & key-management summary, testing cadence.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 group">
              <div class="w-3 h-3 rounded-full bg-accent-bold flex-shrink-0 mt-2 group-hover:scale-125 transition-transform"></div>
              <div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Compliance lane</h3>
                <p class="font-dm text-primary/70">Binary Accept/Change on claims before edit-lock; qualified wording, ranges, and caveats.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 group">
              <div class="w-3 h-3 rounded-full bg-accent-bold flex-shrink-0 mt-2 group-hover:scale-125 transition-transform"></div>
              <div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Operational safety</h3>
                <p class="font-dm text-primary/70">Redaction/blur where needed; approval-locked finals; raws purged on schedule (90-day raws / 30-day intermediates / finals retained for the term, then 30-day purge).</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4 group">
              <div class="w-3 h-3 rounded-full bg-accent-bold flex-shrink-0 mt-2 group-hover:scale-125 transition-transform"></div>
              <div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">No system access required</h3>
                <p class="font-dm text-primary/70">Privacy-safe tracking of results with unique share links and a lightweight results inbox.</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Outcomes -->
        <section class="mb-20" v-reveal="{ delay: 1400 }">
          <div class="bg-gradient-to-br from-accent-soft/20 to-accent/10 rounded-2xl p-8 sm:p-12 border border-accent/30">
            <h2 class="font-funnel font-bold text-3xl sm:text-4xl text-primary mb-8 text-center">
              Outcomes we optimise for
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center" v-stagger="{ delay: 100 }">
              <div>
                <div class="text-3xl sm:text-4xl font-funnel font-bold text-accent-bold mb-2">3–6 weeks</div>
                <div class="font-dm text-primary/70">off enterprise approvals</div>
              </div>
              <div>
                <div class="text-3xl sm:text-4xl font-funnel font-bold text-accent-bold mb-2">15–30%</div>
                <div class="font-dm text-primary/70">shorter supplier onboarding</div>
              </div>
              <div>
                <div class="text-3xl sm:text-4xl font-funnel font-bold text-accent-bold mb-2">12–28 hours</div>
                <div class="font-dm text-primary/70">saved per deal</div>
              </div>
            </div>
            <p class="font-dm text-sm text-primary/60 text-center mt-6">
              Results vary by product complexity and buyer process.
            </p>
          </div>
        </section>
  
        <!-- Team & Location -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20" v-reveal="{ delay: 1600 }">
          <section>
            <h2 class="font-funnel font-bold text-3xl text-primary mb-6">Our team</h2>
            <p class="font-dm text-lg text-primary/80 leading-relaxed">
              RegOps-savvy <strong class="text-accent-bold">editorial + production</strong>: researchers, writers, producers, editors, and motion designers—<strong class="text-accent-bold">KPI-first</strong>, not vanity-views. We speak approver language and keep legal comfortable.
            </p>
          </section>
          
          <section>
            <h2 class="font-funnel font-bold text-3xl text-primary mb-6">Where we're based</h2>
            <p class="font-dm text-lg text-primary/80 leading-relaxed">
              <strong class="text-accent-bold">Albania (EU time)</strong> with clients across the EU/UK and North America. Meetings in your timezone; assets built to your frameworks and terminology.
            </p>
          </section>
        </div>
  
        <!-- Principles -->
        <section class="mb-20" v-reveal="{ delay: 1800 }">
          <h2 class="font-funnel font-bold text-3xl sm:text-4xl text-primary mb-8 text-center">
            Our principles
          </h2>
          <div class="bg-primary/5 rounded-2xl p-8 sm:p-12 border border-primary/20">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-8" v-stagger="{ delay: 100 }">
              <div>
                <div class="font-funnel font-bold text-xl text-accent-bold mb-2">Clarity beats cleverness</div>
              </div>
              <div>
                <div class="font-funnel font-bold text-xl text-accent-bold mb-2">Evidence beats adjectives</div>
              </div>
              <div>
                <div class="font-funnel font-bold text-xl text-accent-bold mb-2">Consistency beats charisma</div>
              </div>
            </div>
            <p class="font-dm text-lg text-primary/80 text-center leading-relaxed">
              We earn trust with precise language, documented proof, and fast, predictable delivery.
            </p>
          </div>
        </section>
  
        <!-- Disclaimer -->
        <section class="text-center" v-reveal="{ delay: 2000 }">
          <div class="inline-block bg-accent/10 rounded-lg px-6 py-3 border border-accent/30">
            <p class="font-dm text-sm text-primary/70 italic">
              Operational enablement content only; not legal advice.
            </p>
          </div>
        </section>
      </div>
    </div>
    <FooterSection />
  </template>
  
  <script setup>
  import FooterSection from '../components/layout/FooterSection.vue'
  import { useAnimations } from '../composables/useAnimations'
  const { vReveal, vStagger } = useAnimations()
  </script>