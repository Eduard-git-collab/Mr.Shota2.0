// Lightweight parallax directive. Usage:
// v-parallax="{ speed: 0.2, axis: 'y', rotate: 0.02, max: 40, clamp: true }"
// or use data-parallax-speed="0.2" data-parallax-axis="y"
const prefersReduced = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const registry = new Set()
let ticking = false

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)) }

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const vh = window.innerHeight
    registry.forEach((item) => {
      const { el, opts } = item
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const delta = (center - vh / 2) // px from viewport center

      const base = (delta / vh) // -1..1-ish
      const speed = opts.speed ?? parseFloat(el.dataset.parallaxSpeed || '0.15')
      const axis = opts.axis || el.dataset.parallaxAxis || 'y'
      const rotate = opts.rotate ?? parseFloat(el.dataset.parallaxRotate || '0')
      const max = opts.max ?? parseFloat(el.dataset.parallaxMax || '48')
      const clamped = opts.clamp === false ? base : clamp(base, -1.2, 1.2)

      const translate = clamped * max * speed
      const rot = clamped * (rotate * 180) // degrees

      let transform = ''
      if (axis === 'x') transform += ` translateX(${translate}px)`
      else transform += ` translateY(${translate}px)`
      if (rotate) transform += ` rotate(${rot}deg)`

      el.style.transform = `translateZ(0) ${transform}`
    })
    ticking = false
  })
}

export default {
  mounted(el, binding) {
    if (prefersReduced) return
    const opts = binding?.value || {}
    el.style.willChange = 'transform'
    registry.add({ el, opts })
    if (registry.size === 1) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      onScroll()
    } else {
      onScroll()
    }
  },
  unmounted(el) {
    for (const item of registry) {
      if (item.el === el) registry.delete(item)
    }
    if (registry.size === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }
}