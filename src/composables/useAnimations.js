import { ref, onMounted, onUnmounted } from 'vue'

export function useAnimations() {
  const observer = ref(null)

  const createRevealDirective = () => {
    return {
      mounted(el, binding) {
        const options = binding.value || {}
        const delay = options.delay || 0
        const duration = options.duration || 600
        const distance = options.distance || 30
        const direction = options.direction || 'up'

        // Set initial state
        el.style.opacity = '0'
        el.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        
        switch(direction) {
          case 'up':
            el.style.transform = `translateY(${distance}px)`
            break
          case 'down':
            el.style.transform = `translateY(-${distance}px)`
            break
          case 'left':
            el.style.transform = `translateX(${distance}px)`
            break
          case 'right':
            el.style.transform = `translateX(-${distance}px)`
            break
          case 'scale':
            el.style.transform = 'scale(0.95)'
            break
        }

        const reveal = () => {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = direction === 'scale' ? 'scale(1)' : 'translate(0, 0)'
          }, delay)
        }

        if (!observer.value) {
          observer.value = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.reveal?.()
                observer.value.unobserve(entry.target)
              }
            })
          }, { threshold: 0.1, rootMargin: '50px' })
        }

        el.reveal = reveal
        observer.value.observe(el)
      },
      unmounted(el) {
        if (observer.value) {
          observer.value.unobserve(el)
        }
      }
    }
  }

  const createStaggerDirective = () => {
    return {
      mounted(el, binding) {
        const options = binding.value || {}
        const delay = options.delay || 100
        const children = el.children

        Array.from(children).forEach((child, index) => {
          child.style.opacity = '0'
          child.style.transform = 'translateY(20px)'
          child.style.transition = 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
        })

        const reveal = () => {
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1'
              child.style.transform = 'translateY(0)'
            }, index * delay)
          })
        }

        if (!observer.value) {
          observer.value = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.reveal?.()
                observer.value.unobserve(entry.target)
              }
            })
          }, { threshold: 0.1 })
        }

        el.reveal = reveal
        observer.value.observe(el)
      }
    }
  }

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return {
    vReveal: createRevealDirective(),
    vStagger: createStaggerDirective()
  }
}