import { createRouter, createWebHistory } from 'vue-router'

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
