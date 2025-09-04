// Optional: attach a scroll progress bar (used by HeroSection).
export function initScrollProgress() {
    const bar = document.querySelector('.progress-bar')
    if (!bar) return
    function update() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
  }