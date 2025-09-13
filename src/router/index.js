import { createRouter, createWebHistory } from 'vue-router'

// Lazy imports (public/general)
const Home = () => import('../view/Home.vue')
const Book = () => import('../view/Book.vue')
const NotFound = () => import('../view/NotFound.vue')
const FinCrime = () => import('../view/FinCrime.vue')
const Security = () => import('../view/Security.vue')
const RegOps = () => import('../view/RegOps.vue')
const About = () => import('../view/About.vue')
const Contact = () => import('../view/Contact.vue')

const ogImage = 'https://nyvocreative.co/og/default.jpg' // TODO: replace with your real OG image

const routes = [
  // Public / General
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      seo: {
        title: 'Audit-Ready B2B Video for FinTech RegOps | Nyvo Creative',
        description: 'Turn one 60-min interview into 12 LinkedIn-ready clips + a podcast—stakeholder variants that help Compliance, Risk, Security & Finance approve faster.',
        canonical: 'https://nyvocreative.co/',
        og: {
          title: 'Audit-Ready B2B Video for FinTech RegOps | Nyvo Creative',
          description: 'One interview → 12 forwardable clips + a podcast, built to speed internal approvals across Compliance, Risk, Security & Finance.',
          type: 'website',
          url: 'https://nyvocreative.co/',
          site_name: 'Nyvo Creative',
          
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Audit-Ready B2B Video for FinTech RegOps | Nyvo Creative',
          description: 'One interview → 12 forwardable clips + a podcast, built to speed internal approvals across Compliance, Risk, Security & Finance.',
          
        }
      }
    }
  },
  {
    path: '/fincrime',
    name: 'FinCrime',
    component: FinCrime,
    meta: {
      seo: {
        title: 'FinCrime: Audit-Ready KYC/AML Video | Nyvo Creative',
        description: 'Audit-ready video for KYC/AML/Sanctions. We package controls and outcomes into 60–90s clips your champion can forward to MLRO, Compliance, Risk, Security.',
        canonical: 'https://nyvocreative.co/fincrime',
        og: {
          title: 'FinCrime: Audit-Ready KYC/AML Video | Nyvo Creative',
          description: 'Short, forwardable clips that translate controls, coverage and outcomes for MLRO, Compliance, Risk and Security—built for approvals in regulated FinTech.',
          type: 'website',
          url: 'https://nyvocreative.co/fincrime',
          site_name: 'Nyvo Creative',
          
        },
        twitter: {
          card: 'summary_large_image',
          title: 'FinCrime: Audit-Ready KYC/AML Video | Nyvo Creative',
          description: 'Short, forwardable clips that translate controls, coverage and outcomes for MLRO, Compliance, Risk and Security—built for approvals in regulated FinTech.',
          
        }
      }
    }
  },
  // Updated path to match desired slug: /data-privacy-security
  {
    path: '/data-privacy-security',
    name: 'DataPrivacySecurity',
    component: Security,
    meta: {
      seo: {
        title: 'Data Privacy & Security: Vendor Review | Nyvo Creative',
        description: 'Data Privacy & Security stories that accelerate vendor review. Short, audit-ready clips map data flow, controls and evidence for DPA/DPIA, SOC 2/ISO buyers.',
        canonical: 'https://nyvocreative.co/data-privacy-security',
        og: {
          title: 'Data Privacy & Security: Vendor Review | Nyvo Creative',
          description: 'Make diligence easy: concise clips that show data flow, access, encryption and controls—aligned to DPA/DPIA and SOC 2/ISO expectations.',
          type: 'website',
          url: 'https://nyvocreative.co/data-privacy-security',
          site_name: 'Nyvo Creative',
          
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Data Privacy & Security: Vendor Review | Nyvo Creative',
          description: 'Make diligence easy: concise clips that show data flow, access, encryption and controls—aligned to DPA/DPIA and SOC 2/ISO expectations.',
          
        }
      }
    }
  },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  // 301-style client redirect from old path to new slug
  { path: '/security', redirect: '/data-privacy-security' },

  // Updated path to match desired slug: /in-house-regops
  {
    path: '/in-house-regops',
    name: 'InHouseRegOps',
    component: RegOps,
    meta: {
      seo: {
        title: 'In-House RegOps: Faster Approvals | Nyvo Creative',
        description: 'In-house RegOps enablement: 12 stakeholder-ready clips + a podcast from one interview—built to win approvals from Compliance, Risk, Security and Finance.',
        canonical: 'https://nyvocreative.co/in-house-regops',
        og: {
          title: 'In-House RegOps: Faster Approvals | Nyvo Creative',
          description: 'From one session to a month of forwardable clips that help RegOps secure Compliance, Risk, Security and Finance buy-in—fast.',
          type: 'website',
          url: 'https://nyvocreative.co/in-house-regops',
          site_name: 'Nyvo Creative',
          
        },
        twitter: {
          card: 'summary_large_image',
          title: 'In-House RegOps: Faster Approvals | Nyvo Creative',
          description: 'From one session to a month of forwardable clips that help RegOps secure Compliance, Risk, Security and Finance buy-in—fast.',
        }
      }
    }
  },
  // 301-style client redirect from old path to new slug
  { path: '/regops', redirect: '/in-house-regops' },

  { path: '/book', name: 'Book', component: Book },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// --- Simple dynamic head management without extra deps ---
function setOrCreateMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    el.setAttribute('data-managed', 'router-seo')
    document.head.appendChild(el)
  } else {
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  }
}

function setOrCreateLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"][data-managed="router-seo"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute('data-managed', 'router-seo')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function clearManagedTags() {
  document.head.querySelectorAll('meta[data-managed="router-seo"]').forEach(n => n.remove())
  // Keep canonical managed too
  // Note: We don't remove GA or other user-added tags
}

router.afterEach((to) => {
  const recordWithSEO = to.matched.slice().reverse().find(r => r.meta && r.meta.seo)
  if (!recordWithSEO) return
  const seo = recordWithSEO.meta.seo || {}

  // Clear previously managed tags to avoid duplicates
  clearManagedTags()

  // Title
  if (seo.title) document.title = seo.title

  // Description
  if (seo.description) {
    setOrCreateMeta('meta[name="description"]', { name: 'description', content: seo.description })
  }

  // Robots (optional, defaults to index/follow)
  setOrCreateMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' })

  // Canonical
  if (seo.canonical) {
    setOrCreateLink('canonical', seo.canonical)
  }

  // Open Graph
  const og = seo.og || {}
  const ogPairs = {
    'og:title': og.title || seo.title,
    'og:description': og.description || seo.description,
    'og:type': og.type || 'website',
    'og:url': og.url || (typeof window !== 'undefined' ? window.location.href : ''),
    'og:site_name': og.site_name || 'Nyvo Creative',
    'og:image': og.image || ''
  }
  Object.entries(ogPairs).forEach(([property, content]) => {
    if (!content) return
    setOrCreateMeta(`meta[property="${property}"]`, { property, content })
  })

  // Twitter
  const tw = seo.twitter || {}
  const twPairs = {
    'twitter:card': tw.card || 'summary_large_image',
    'twitter:title': tw.title || seo.title,
    'twitter:description': tw.description || seo.description,
    'twitter:image': tw.image || og.image || ''
  }
  Object.entries(twPairs).forEach(([name, content]) => {
    if (!content) return
    setOrCreateMeta(`meta[name="${name}"]`, { name, content })
  })
})