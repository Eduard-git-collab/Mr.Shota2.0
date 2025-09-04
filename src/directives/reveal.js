// Simple IntersectionObserver-based reveal directive.
// Usage: v-reveal or v-reveal="{ once: true, threshold: 0.15, delay: i * 60 }"
export default {
    mounted(el, binding) {
      const opts = binding.value || {}
      const {
        once = true,
        threshold = 0.15,
        root = null,
        rootMargin = '0px',
        delay = 0
      } = opts
  
      el.style.transition = 'opacity .8s cubic-bezier(.4,0,.2,1), transform .8s cubic-bezier(.4,0,.2,1)'
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      if (delay) el.style.transitionDelay = `${delay}ms`
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            if (once) observer.unobserve(el)
          } else if (!once) {
            el.classList.remove('reveal-visible')
            el.style.opacity = '0'
            el.style.transform = 'translateY(40px)'
          }
        })
      }, { threshold, root, rootMargin })
  
      observer.observe(el)
    }
  }