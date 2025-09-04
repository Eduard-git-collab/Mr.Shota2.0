// Lightweight parallax directive (GPU friendly).
// Usage: v-parallax or v-parallax="{ speed: 0.25, axis: 'y', max: 120 }"
export default {
    mounted(el, binding) {
      const opts = binding.value || {}
      const speed = typeof opts === 'number' ? opts : (opts.speed ?? 0.25)
      const axis = opts.axis || 'y'
      const max = opts.max || 160
      const initial = el.getBoundingClientRect().top + window.scrollY
      const rafState = { ticking: false }
  
      function update() {
        const scrollY = window.scrollY
        const delta = (scrollY - initial) * speed
        const clamped = Math.max(Math.min(delta, max), -max)
        el.style.transform = `translate${axis.toUpperCase()}(${clamped.toFixed(2)}px)`
        rafState.ticking = false
      }
  
      function onScroll() {
        if (!rafState.ticking) {
          requestAnimationFrame(update)
          rafState.ticking = true
        }
      }
  
      el.style.willChange = 'transform'
      window.addEventListener('scroll', onScroll, { passive: true })
      update()
      el.__parallaxCleanup = () => window.removeEventListener('scroll', onScroll)
    },
    unmounted(el) {
      el.__parallaxCleanup && el.__parallaxCleanup()
    }
  }