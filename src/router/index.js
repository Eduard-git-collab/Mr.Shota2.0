import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../auth/useAuth'

// Lazy imports (public/general)
const Home = () => import('../view/Home.vue')
const Framework = () => import('../view/Framework.vue')
const FrameworkForm = () => import('../view/FrameworkForm.vue')
const About = () => import('../view/About.vue')
const Login = () => import('../view/Login.vue')
const NotFound = () => import('../view/NotFound.vue')

// Public blog reader
const PublicBlogView = () => import('../view/PublicBlogView.vue')

// Dashboard layout + sections
const DashboardLayout = () => import('../view/dashboard/DashboardLayout.vue')
const ClientsView = () => import('../view/dashboard/ClientsView.vue')

// Blogs CRUD inside dashboard
const BlogList = () => import('../view/dashboard/blogs/BlogList.vue')
const BlogForm = () => import('../view/dashboard/blogs/BlogForm.vue')
const AllBlogs = () => import('../view/AllBlogs.vue')

// Block Template Management
const TemplateList = () => import('../view/dashboard/blogTemplates/TemplateList.vue')
const TemplateForm = () => import('../view/dashboard/blogTemplates/TemplateForm.vue')


const routes = [

  // Public / General
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },

  { path: '/framework', name: 'Framework', component: Framework},
  { path: '/framework/form', name: 'Form', component: FrameworkForm},
  

  { path: '/blog/:slug', name: 'PublicBlog', component: PublicBlogView, meta: { public: true } },
  { path: '/blogs', name: 'AllBlogs', component: AllBlogs, meta: { public: true } },

  { path: '/login', name: 'Login', component: Login, meta: { public: true } },

  {
    //Dashboard only path
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      // Blogs area
      { path: 'blogs', name: 'DashboardBlogs', component: BlogList },
      { path: 'blogs/new', name: 'DashboardBlogNew', component: BlogForm },
      { path: 'blogs/:id/edit', name: 'DashboardBlogEdit', component: BlogForm, props: true },
      { path: 'blogs/all', name: 'Blogs', component: AllBlogs},

      // Templates
      { path: 'blog-templates', name: 'BlogTemplates', component: TemplateList },
      { path: 'blog-templates/new', name: 'BlogTemplateNew', component: TemplateForm },
      { path: 'blog-templates/:id/edit', name: 'BlogTemplateEdit', component: TemplateForm, props: true },
      // Clients placeholder
      { path: 'clients', name: 'DashboardClients', component: ClientsView },

      // Default redirect inside dashboard
      { path: '', redirect: { name: 'DashboardBlogs' } }
    ]
  },

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