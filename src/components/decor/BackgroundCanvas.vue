<script setup>
import parallax from '../../directives/parallax.js'
</script>

<template>
  <!-- Full-viewport decorative background -->
  <div class="pointer-events-none fixed inset-0 -z-10">
    <!-- Layer 1: Dark base -->
    <div class="absolute inset-0 bg-secondary"></div>

    <!-- Layer 2: Subtle grid overlay -->
    <div class="absolute inset-0 opacity-[0.07] mix-blend-soft-light bg-[linear-gradient(to_right,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:48px_48px]"></div>

    <!-- Layer 3: Radial vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(255,255,255,0.08),transparent)]"></div>

    <!-- Layer 4: Slow-moving accent orbs -->
    <div
      v-parallax="{ speed: 0.12, axis: 'y', rotate: 0 }"
      class="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--color-accent),transparent_60%)] opacity-25 blur-3xl animate-drift-slow"
    />
    <div
      v-parallax="{ speed: 0.18, axis: 'y' }"
      class="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_70%_40%,var(--color-accent-soft),transparent_60%)] opacity-25 blur-2xl animate-drift"
    />
    <div
      v-parallax="{ speed: 0.08, axis: 'y' }"
      class="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-strong),transparent_60%)] opacity-15 blur-2xl animate-drift-slower"
    />
  </div>
</template>

<style scoped>
@keyframes drift {
  0% { transform: translate3d(0, 0, 0) }
  50% { transform: translate3d(10px, -8px, 0) }
  100% { transform: translate3d(0, 0, 0) }
}
.animate-drift { animation: drift 18s ease-in-out infinite; }
.animate-drift-slow { animation: drift 28s ease-in-out infinite; }
.animate-drift-slower { animation: drift 36s ease-in-out infinite; }
</style>