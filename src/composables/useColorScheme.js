import { ref, onMounted, onUnmounted } from 'vue'

export function useColorScheme() {
  const isInverted = ref(false)
  
  const setColorScheme = (inverted) => {
    isInverted.value = inverted
    
    if (inverted) {
      document.documentElement.classList.add('invert-scheme')
    } else {
      document.documentElement.classList.remove('invert-scheme')
    }
  }

  return {
    isInverted,
    setColorScheme
  }
}