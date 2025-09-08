// Simple reveal-on-scroll directive with variants and reduced-motion support
const prefersReduced = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function applyInitial(el, variant) {
  el.style.opacity = '0'
  el.style.willChange = 'transform, opacity'
  el.style.transition = 'transform 700ms cubic-bezier(.2,.65,.25,1), opacity 700ms ease-out'

  const map = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(24px)',
    right: 'translateX(-24px)',
    fade: 'translateY(0px)',
    zoom: 'scale(0.98)'
  }
  el.style.transform = map[variant] || map.up
}

function reveal(el) {
  el.style.opacity = '1'
  el.style.transform = 'none'
}

const instances = new WeakMap()

export default {
  mounted(el, binding) {
    if (prefersReduced) {
      // No animation under reduced motion
      return
    }

    const variant = binding?.value || el.dataset.reveal || 'up'
    applyInitial(el, variant)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(el)
          observer.unobserve(el)
        }
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })

    observer.observe(el)
    instances.set(el, observer)
  },
  unmounted(el) {
    const obs = instances.get(el)
    if (obs) obs.disconnect()
    instances.delete(el)
  }
}