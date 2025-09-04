<template>
  <section class="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-secondary">
    <!-- OPTIONAL: decorative blobs (can remove for stricter minimalism) -->
    <div aria-hidden="true">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-40 -right-24 w-[60vmax] h-[60vmax] rounded-full bg-accent/10 blur-3xl mix-blend-multiply"></div>
        <div class="absolute top-1/2 -left-32 w-[50vmax] h-[50vmax] rounded-full bg-primary/5 blur-3xl mix-blend-multiply"></div>
        <div class="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-secondary to-transparent"></div>
      </div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-20">
      <div class="max-w-5xl">
        <h1
          v-reveal
          class="font-funnel font-thin leading-[0.95] tracking-tight text-primary text-[clamp(2.75rem,8vw,7.2rem)]"
        >
          A video-first content engine for regulated FinTech.
        </h1>

        <p
          v-reveal="{ delay: 100 }"
          class="mt-6 font-dm text-primary/85 text-[clamp(1rem,1.4vw,1.35rem)] leading-relaxed"
        >
          Your fastest route to consensus in compliance-heavy sales.
        </p>

        <p
          v-reveal="{ delay: 180 }"
          class="mt-6 max-w-2xl font-dm text-primary/70 text-[clamp(.95rem,1.15vw,1.15rem)] leading-relaxed"
        >
          Transform a single expert interview each month into a powerful set of LinkedIn highlights, podcast episodes, and forwardable proof clips. Give your champions everything they need to win faster approvals from <strong>Compliance, Risk, Security, Legal, and Finance.</strong>
        </p>

        <div class="mt-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <a href="https://calendly.com/eduard-nyvocreative/30min" target="_blank" rel="noopener noreferrer"
          class="
          group relative inline-flex h-12 sm:h-12 md:h-12 items-center justify-center overflow-hidden
          rounded-md border border-primary bg-transparent px-6 sm:px-6 md:px-6 font-medium
          text-sm sm:text-base text-primary transition-all duration-200 
          shadow-[5px_5px_0px_0px_theme(colors.accent-strong)] 
          hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
          touch-button
          cursor-pointer font-dm
          ">
          Book an intro call
          </a>

          <div
            v-reveal="{ delay: 260 }"
            class="flex flex-wrap gap-x-4 gap-y-1 font-dm text-[11px] sm:text-xs md:text-sm text-primary/60 max-w-xl"
          >
            <span class="inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> ≤90 min SME time
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> 5‑day turnaround
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> 2 revisions
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Stakeholder variants included
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Claims &amp; Controls review
            </span>
          </div>
        </div>
      </div>

      <div
        v-parallax="{ speed: 0.12, axis: 'y', max: 80 }"
        class="select-none pointer-events-none font-funnel font-thin text-primary/5 text-[min(36vw,620px)] leading-none tracking-tighter whitespace-nowrap mt-10"
        aria-hidden="true"
      >
        CONSENSUS
      </div>

    </div>

  </section>
</template>

<script setup>
</script>

<style scoped>
@keyframes scroll-cue {
  0% { transform: translateY(-100%); }
  60% { transform: translateY(100%); }
  100% { transform: translateY(100%); }
}
.animate-scroll-cue { animation: scroll-cue 2.2s cubic-bezier(.65,.05,.36,1) infinite; }
</style>