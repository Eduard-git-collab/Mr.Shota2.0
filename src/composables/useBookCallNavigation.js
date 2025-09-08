import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Global reactive state - shared across all components
const isLoading = ref(false)
const isNavigating = ref(false)

export function useBookCallNavigation() {
  const router = useRouter()

  // Function to trigger book call navigation
  const triggerBookCall = async () => {
    if (isNavigating.value) return
    
    console.log('Book call triggered')
    isNavigating.value = true
    isLoading.value = true
    
    // Wait for animation to cover screen before navigating
    setTimeout(async () => {
      try {
        await router.push('/book')
        console.log('Navigation completed to /book')
      } catch (error) {
        console.error('Navigation failed:', error)
        // Reset state on error
        isLoading.value = false
        isNavigating.value = false
      }
    }, 1350) // Wait for bars to fully cover screen
  }

  // Function to reset loading state (called when book page loads)
  const resetLoading = () => {
    console.log('Resetting loading state')
    isLoading.value = false
    
    // Reset navigating state after animation completes
    setTimeout(() => {
      isNavigating.value = false
    }, 1200) // Wait for exit animation
  }

  return {
    isLoading,
    isNavigating,
    triggerBookCall,
    resetLoading
  }
}