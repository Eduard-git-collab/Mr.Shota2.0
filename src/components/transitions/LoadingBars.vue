<template>
    <div 
      v-if="showBars" 
      class="fixed inset-0 z-[9999] pointer-events-none"
    >
      <!-- Three animated bars -->
      <div 
        v-for="(delay, index) in [0, 150, 300]" 
        :key="index"
        class="absolute bottom-0 w-1/3 h-full bg-accent-soft transition-transform duration-1000 ease-out"
        :class="[
          index === 0 ? 'left-0' : index === 1 ? 'left-1/3' : 'left-2/3',
          barsUp ? 'translate-y-0' : 'translate-y-full'
        ]"
        :style="{ 
          transitionDelay: `${delay}ms`
        }"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useBookCallNavigation } from '../../composables/useBookCallNavigation'
  
  const { isLoading } = useBookCallNavigation()
  
  const showBars = ref(false)
  const barsUp = ref(false)
  
  // Watch for loading state changes
  watch(isLoading, (newValue) => {
    console.log('Loading state changed:', newValue)
    
    if (newValue) {
      // Start animation - bars go up
      showBars.value = true
      setTimeout(() => {
        barsUp.value = true
      }, 50)
    } else {
      // Reverse animation - bars go down
      barsUp.value = false
      
      // Hide bars after animation completes
      setTimeout(() => {
        showBars.value = false
      }, 1150) // 1000ms duration + 150ms max delay
    }
  })
  </script>