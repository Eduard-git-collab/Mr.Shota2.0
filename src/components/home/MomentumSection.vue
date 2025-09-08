<template>
  <section class="relative w-full min-h-screen bg-secondary overflow-hidden">
    <!-- Refined geometric background -->
    <div aria-hidden="true" class="absolute inset-0">
      <svg class="absolute top-20 left-1/4 opacity-10" width="2" height="120" viewBox="0 0 2 120">
        <line x1="1" y1="0" x2="1" y2="120" stroke="currentColor" stroke-width="1" stroke-dasharray="4,4" class="text-primary"/>
      </svg>
      <svg class="absolute top-40 right-1/3 opacity-20" width="2" height="80" viewBox="0 0 2 80">
        <line x1="1" y1="0" x2="1" y2="80" stroke="currentColor" stroke-width="1" stroke-dasharray="2,6" class="text-accent"/>
      </svg>
      <div class="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-accent/20 animate-pulse"></div>
      <div class="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-primary/15"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-20">
      
      <!-- Enhanced header layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24">
        <!-- Left side - Title section -->
        <div class="lg:col-span-7">
          <div class="flex items-center gap-6 mb-8">
            <div class="w-16 h-px bg-gradient-to-r from-accent to-transparent"></div>
            <p class="font-dm text-accent-bold text-sm tracking-[0.15em] uppercase whitespace-nowrap">
              Driving momentum
            </p>
          </div>
          
          <h1 class="font-funnel font-thin text-[clamp(2.5rem,6vw,5rem)] text-primary leading-[0.9] tracking-tight">
            Behind Regulated<br/>
            <span class="relative">
              Buy‑In
              <div class="absolute -bottom-2 left-0 w-full h-1 bg-accent/30 rounded-full"></div>
            </span>
          </h1>
        </div>
        
        <!-- Right side - Description -->
        <div class="lg:col-span-5 lg:pt-12">
          <div class="relative">
            <!-- Enhanced floating effect -->
            <div class="absolute -inset-6 bg-gradient-to-br from-accent/5 via-accent/10 to-transparent rounded-3xl blur-xl"></div>
            <div class="relative bg-background/95 backdrop-blur-sm border border-accent/30 rounded-2xl p-8 shadow-lg">
              <p class="font-dm text-primary/80 text-lg leading-relaxed">
                We specialize in <strong class="text-accent-bold font-semibold">Podcast & LinkedIn</strong> content engines for regulated FinTech. By turning interview-style videos into short, forwardable clips. We help your champion earn trust, surface risk controls, and keep multi‑stakeholder decisions moving.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Improved process timeline with fixed positioning -->
      <div class="relative">
        <!-- Central timeline line -->
        <div class="absolute left-8 lg:left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-accent via-primary/30 to-accent transform lg:-translate-x-px"></div>
        
        <div class="space-y-24">
          
          <!-- Step 1 -->
          <div class="relative">
            <!-- Step number positioned outside content area -->
            <div class="absolute left-0 top-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-bold shadow-lg flex items-center justify-center">
              <span class="font-funnel font-bold text-lg text-white">01</span>
            </div>
            
            <!-- Content with proper spacing -->
            <div class="ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <!-- Content - Left side on desktop -->
              <div class="lg:text-right lg:pr-8">
                <div class="relative">
                  <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                  <div class="relative bg-background border-2 border-primary rounded-xl p-8">
                    <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                      Focus on Approvals & Vendor Review
                    </h2>
                    <p class="font-dm text-base text-primary/70 leading-relaxed">
                      Built for Compliance, Risk, and Security threads, what approvers need to see, in their language. Each piece is designed to be pasted into internal threads, cutting rounds of questions and shortening review cycles.
                    </p>
                  </div>
                </div>
              </div>
              <!-- Empty space for circle on desktop -->
              <div class="hidden lg:block"></div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative">
            <!-- Step number positioned outside content area -->
            <div class="absolute left-0 top-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg flex items-center justify-center">
              <span class="font-funnel font-bold text-lg text-secondary">02</span>
            </div>
            
            <!-- Content with proper spacing -->
            <div class="ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <!-- Empty space for circle on desktop -->
              <div class="hidden lg:block"></div>
              <!-- Content - Right side on desktop -->
              <div class="lg:pl-8">
                <div class="relative">
                  <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                  <div class="relative bg-background border-2 border-primary rounded-xl p-8">
                    <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                      Clips that Clear Compliance
                    </h2>
                    <p class="font-dm text-base text-primary/70 leading-relaxed">
                      Every clip answers one approver question in 60–90 seconds: the outcome, the safeguard, and the trade-off—plus a simple scope note when needed. Stakeholder variants (Compliance, Security, Legal, Finance) make forwarding effortless the same day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative">
            <!-- Step number positioned outside content area -->
            <div class="absolute left-0 top-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent-bold to-accent-strong shadow-lg flex items-center justify-center">
              <span class="font-funnel font-bold text-lg text-white">03</span>
            </div>
            
            <!-- Content with proper spacing -->
            <div class="ml-24 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <!-- Content - Left side on desktop -->
              <div class="lg:text-right lg:pr-8">
                <div class="relative">
                  <span class="absolute translate-x-2 translate-y-2 inset-0 border-2 border-dashed border-primary/30 rounded-xl"></span>
                  <div class="relative bg-background border-2 border-primary rounded-xl p-8">
                    <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary mb-4 leading-tight">
                      Process Built for Audit‑Readiness
                    </h2>
                    <p class="font-dm text-base text-primary/70 leading-relaxed">
                      Nothing ships without proof. Claims are paired with evidence and caveats, approved in a binary Accept/Change lane, and version-stamped. Sensitive details are redacted, files are approval-locked, and a compact proof pack sits alongside every clip—so you move faster and stay protected.
                    </p>
                  </div>
                </div>
              </div>
              <!-- Empty space for circle on desktop -->
              <div class="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced team section -->
      <div class="mt-32">
        <div class="relative text-center mb-16">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent rounded-3xl"></div>
          <div class="relative py-12">
            <h2 class="font-funnel font-bold text-4xl sm:text-5xl lg:text-6xl text-primary mb-6 leading-tight">
              12+ Video Specialists
            </h2>
            <p class="font-dm text-xl text-primary/70 max-w-3xl mx-auto leading-relaxed">
              RegOps-savvy <strong class="text-accent-bold font-semibold">content team</strong>—researchers, writers, producers, editors, and motion designers—with a <strong class="text-accent-bold font-semibold">KPI-first</strong> approach.
            </p>
          </div>
        </div>

        <!-- Improved team roles grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div v-for="(role, index) in teamRoles" :key="role.title" 
               :class="['group relative', index === 2 ? 'md:col-span-3 lg:col-span-1' : '']">
            <div class="relative h-full">
              <span class="absolute translate-x-1 translate-y-1 inset-0 border border-dashed border-accent/40 rounded-lg"></span>
              <div class="relative h-full bg-background border border-accent/30 rounded-lg p-6 transition-all duration-300 group-hover:bg-accent/5">
                <div class="w-10 h-10 rounded-lg bg-accent/20 mb-4 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/30">
                  <component :is="role.icon" class="w-5 h-5 text-accent-bold" />
                </div>
                <h3 class="font-funnel font-semibold text-primary text-base mb-2">{{ role.title }}</h3>
                <p class="font-dm text-sm text-primary/60 leading-relaxed">{{ role.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

// Icons for team roles
const ResearchIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
])

const WriteIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' })
])

const VideoIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' })
])

const EditIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' })
])

const DesignIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7' })
])

const teamRoles = [
  { title: 'Researchers', description: 'Regulatory landscape analysis', icon: ResearchIcon },
  { title: 'Writers', description: 'Compliance-aware copy', icon: WriteIcon },
  { title: 'Producers', description: 'Interview orchestration', icon: VideoIcon },
  { title: 'Editors', description: 'Precision clip creation', icon: EditIcon },
  { title: 'Motion Designers', description: 'Visual explanation aids', icon: DesignIcon }
]
</script>