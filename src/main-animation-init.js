// Call this from your main.js after app.mount() if you want progress bar & prefers-reduced-motion handling.
import { initScrollProgress } from './plugins/ScrollProgress.js'

export function initEnhancements() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReduced) {
    initScrollProgress()
  }
}