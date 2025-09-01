import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../auth/useAuth'

// Lazy imports (public/general)
const Home = () => import('../view/Home.vue')
const About = () => import('../view/About.vue')
const NotFound = () => import('../view/NotFound.vue')


const routes = [

  // Public / General
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const { isAuthenticated, loadingInitial, authReadyPromise } = useAuth()

  if (loadingInitial.value) {
    await authReadyPromise
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'Login' && isAuthenticated.value) {
    return { name: 'DashboardBlogs' }
  }

  return true
})