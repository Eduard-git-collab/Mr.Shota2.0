import { createRouter, createWebHistory } from 'vue-router'
import { applySeo } from '../seo/applySeo.js'

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
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/book', name: 'Book', component: Book }, // Add this
  { path: '/fincrime', name: 'fincrime', component: FinCrime },
  { path: '/data-privacy-security', name: 'dataPrivacySecurity', component: Security },
  { path: '/in-house-regops', name: 'inHouseRegOps', component: RegOps },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// Apply SEO metadata on route navigation
router.afterEach((to) => {
  applySeo(to)
})