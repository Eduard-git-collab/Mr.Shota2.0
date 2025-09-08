import { createRouter, createWebHistory } from 'vue-router'

// Lazy imports (public/general)
const Home = () => import('../view/Home.vue')
const About = () => import('../view/About.vue')
const Book = () => import('../view/Book.vue') // Add this
const NotFound = () => import('../view/NotFound.vue')
const FinCrime = () => import('../view/FinCrime.vue')
const Security = () => import('../view/Security.vue')
const RegOps = () => import('../view/RegOps.vue')

const routes = [
  // Public / General
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/book', name: 'Book', component: Book }, // Add this
  { path: '/fincrime', name: 'FinCrime', component: FinCrime },
  { path: '/security', name: 'Privacy & Security', component: Security },
  { path: '/regops', name: 'RegOps', component: RegOps },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})