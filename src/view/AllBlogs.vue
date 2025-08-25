<template>
  <div class="app-bg min-h-screen relative overflow-hidden">

    <!-- Blurred SVG -->
    <div class="absolute inset-0 -translate-y-2/4 opacity-40 blur-3xl pointer-events-none">
      <img src="../assets/media/blurgradient.svg" alt="" class="w-full h-full object-cover blur-3xl" />
    </div>

    <!-- Noise -->
    <div class="absolute inset-0 opacity-30 noise-texture pointer-events-none"></div>

    <!-- Navigation (mirrors Home) -->
    <nav class="relative z-20 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div class="flex items-center space-x-2">
        <div class="w-14 h-14 flex items-center justify-center">
          <Brandlogo bg-color="" accent-color="#003056" />
        </div>
        <span class="font-semibold text-[#003056] font-figtree">Nyvo Creative</span>
      </div>
      <div class="hidden md:flex items-center space-x-8 text-[#00305699] font-poppins">
        <router-link to="/blogs" class="hover:text-[#003056] transition-colors font-semibold text-[#003056]">Blogs</router-link>
        <a href="#" class="hover:text-[#003056] transition-colors">Projects</a>
        <a href="#" class="hover:text-[#003056] transition-colors">Framework</a>
        <a href="#" class="hover:text-[#003056] transition-colors">FAQ</a>
      </div>
      <div class="flex items-center space-x-4 font-figtree">
        <router-link to="/login" class="text-[#00305699] hover:text-[#003056] font-poppins transition-colors">Log In</router-link>
        <button
          class="px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 bg-[#003056] hover:bg-[#00263f] text-[#FBFBF7]"
        >
          <span>Book a call</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Content -->
    <section class="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
      <header class="text-center max-w-3xl mx-auto mb-14">
        <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-6 text-[#003056] font-figtree">
          <span class="gradient-text">Blogs</span>
        </h1>
        <p class="text-lg md:text-xl text-[#003056cc] font-poppins">
          I dunno man this aint no cow
        </p>
      </header>

      <div v-if="loading" class="state loading-panel">Loading blogs…</div>
      <div v-else-if="error" class="state error-panel">{{ error }}</div>
      <div v-else>
        <div v-if="blogs.length" class="blog-grid">
          <article
            v-for="b in blogs"
            :key="b.id"
            :class="['blog-card', { pinned: b.selection }]"
          >
            <RouterLink
              class="cover-wrapper"
              :to="{ name: 'PublicBlog', params: { slug: b.slug } }"
            >
              <img
                v-if="b.cover_url"
                :src="b.cover_url"
                :alt="`Cover for ${b.title}`"
                class="cover"
                loading="lazy"
              />
              <div v-else class="cover placeholder">
                <span>No Cover</span>
              </div>
              <span v-if="b.selection" class="badge">Pinned</span>
            </RouterLink>
            <div class="content">
              <h2 class="title">
                <RouterLink :to="{ name: 'PublicBlog', params: { slug: b.slug } }">{{ b.title }}</RouterLink>
              </h2>
              <p class="meta">
                <time :datetime="b.created_at">{{ formatDate(b.created_at) }}</time>
                <template v-if="b.published_at">
                  <span class="dot">•</span>
                  <time :datetime="b.published_at">Published {{ timeAgo(b.published_at) }}</time>
                </template>
              </p>
              <RouterLink
                class="read-more"
                :to="{ name: 'PublicBlog', params: { slug: b.slug } }"
              >Read →</RouterLink>
            </div>
          </article>
        </div>
        <p v-else class="state empty-panel">No blogs published yet.</p>
      </div>

      <div v-if="canLoadMore" class="load-more-wrapper">
        <button
          class="load-more-btn"
          :disabled="loadingMore"
          @click="loadMore"
        >
          <span v-if="!loadingMore">Load more</span>
          <span v-else>Loading…</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Brandlogo from '../assets/logos/brandlogo.vue'
import { listPublishedBlogsOrdered } from '../services/blogServices' // ensure function exists

const blogs = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)

const pageSize = 18
let offset = 0
const newestFirst = true
const canLoadMore = ref(true)

onMounted(fetchInitial)

async function fetchInitial() {
  loading.value = true
  error.value = null
  try {
    offset = 0
    const data = await listPublishedBlogsOrdered({ limit: pageSize, offset, newestFirst })
    blogs.value = data
    canLoadMore.value = data.length === pageSize
    offset += data.length
  } catch (e) {
    error.value = e.message || 'Failed to load blogs'
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  if (!canLoadMore.value) return
  loadingMore.value = true
  error.value = null
  try {
    const data = await listPublishedBlogsOrdered({ limit: pageSize, offset, newestFirst })
    blogs.value.push(...data)
    canLoadMore.value = data.length === pageSize
    offset += data.length
  } catch (e) {
    error.value = e.message || 'Failed to load more'
  } finally {
    loadingMore.value = false
  }
}

function formatDate(str) {
  const d = new Date(str)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function timeAgo(iso) {
  const then = new Date(iso)
  const now = new Date()
  const diff = (now - then) / 1000
  if (diff < 60) return 'just now'
  const m = diff / 60
  if (m < 60) return `${Math.floor(m)}m ago`
  const h = m / 60
  if (h < 24) return `${Math.floor(h)}h ago`
  const d = h / 24
  if (d < 30) return `${Math.floor(d)}d ago`
  return formatDate(iso)
}
</script>

<style scoped>
.app-bg { background:#FBFBF7; }

/* Layers (reuse home structure) */
.bg-layer {
  position:absolute; left:50%; transform:translateX(-50%);
  border-radius:9999px 9999px 0 0; pointer-events:none;
}
.layer-1 { bottom:0; width:150vw; height:75vh;
  background:linear-gradient(to bottom,#00305666 0%,#D8EFE366 60%,transparent 80%); opacity:.60; }
.layer-2 { bottom:-20px; width:140vw; height:70vh;
  background:linear-gradient(to bottom,#003056cc 0%,#D8EFE34d 55%,transparent 75%); opacity:.70; }
.layer-3 { bottom:-40px; width:130vw; height:65vh;
  background:linear-gradient(to bottom,#003056b3 0%,#D8EFE340 45%,transparent 70%); opacity:.80; }

/* Noise */
.noise-texture {
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;
}

.gradient-text {
  background: linear-gradient(10deg,#004277 0%,#014f8f 55%,#D8EFE3 90%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
  -webkit-text-fill-color:transparent;
}

.blog-grid {
  display:grid;
  gap:1.35rem;
  grid-template-columns:repeat(auto-fill,minmax(270px,1fr));
}

.blog-card {
  position:relative;
  display:flex;
  flex-direction:column;
  background:#ffffffd9;
  backdrop-filter:blur(4px);
  border:1px solid #00305624;
  border-radius:18px;
  overflow:hidden;
  box-shadow:0 4px 18px -6px rgba(0,48,86,.18), 0 2px 6px -2px rgba(0,48,86,.12);
  transition:box-shadow .25s, transform .25s, border-color .25s;
}
.blog-card:hover {
  transform:translateY(-4px);
  border-color:#00305655;
  box-shadow:0 10px 28px -8px rgba(0,48,86,.35), 0 4px 12px -2px rgba(0,48,86,.18);
}
.blog-card.pinned {
  border-color:#003056;
  box-shadow:0 0 0 2px #003056, 0 12px 30px -8px rgba(0,48,86,.45);
}

.cover-wrapper {
  position:relative;
  display:block;
  aspect-ratio:16/9;
  background:#d8efe3;
  overflow:hidden;
}
.cover { width:100%; height:100%; object-fit:cover; display:block; }
.cover.placeholder {
  display:flex; align-items:center; justify-content:center;
  font-size:.7rem; letter-spacing:.5px; text-transform:uppercase;
  color:#00305699; font-weight:600;
}

.badge {
  position:absolute; top:.6rem; left:.6rem;
  background:#003056;
  color:#FBFBF7;
  font-size:.55rem; letter-spacing:1px; padding:.35rem .55rem;
  border-radius:999px; font-weight:600; text-transform:uppercase;
  box-shadow:0 2px 8px -2px rgba(0,0,0,.4);
}

.content { padding:.9rem 1rem 1.1rem; display:flex; flex-direction:column; gap:.55rem; height:100%; }
.title { margin:0; font-size:1.05rem; line-height:1.25; font-weight:600; }
.title a { text-decoration:none; color:#003056; }
.title a:hover { text-decoration:underline; }

.meta {
  margin:0; font-size:.62rem; text-transform:uppercase; letter-spacing:.75px;
  color:#003056a6; display:flex; gap:.4rem; flex-wrap:wrap;
}
.meta .dot { opacity:.5; }

.read-more {
  margin-top:auto;
  font-size:.75rem;
  font-weight:600;
  text-decoration:none;
  color:#003056;
  display:inline-flex; gap:.3rem; align-items:center;
  padding:.4rem .75rem;
  border:1px solid #00305640;
  border-radius:8px;
  background:#D8EFE320;
  transition:background .2s,border-color .2s;
}
.read-more:hover {
  background:#003056;
  color:#FBFBF7;
  border-color:#003056;
}

.state {
  font-size:.9rem;
  text-align:center;
}

.loading-panel, .empty-panel, .error-panel {
  background:#ffffffcc;
  backdrop-filter:blur(6px);
  border:1px solid #00305622;
  border-radius:14px;
  padding:2rem 1.5rem;
  max-width:480px;
  margin:0 auto;
}

.error-panel {
  border-color:#b30023;
  color:#b30023;
  background:#fff3f5;
}

.load-more-wrapper { margin-top:2.5rem; text-align:center; }
.load-more-btn {
  background:#003056;
  color:#FBFBF7;
  font-weight:600;
  padding:.75rem 1.5rem;
  border-radius:12px;
  border:1px solid #003056;
  letter-spacing:.5px;
  font-size:.8rem;
  box-shadow:0 6px 18px -6px rgba(0,48,86,.45);
  transition:background .25s, box-shadow .25s, transform .25s;
}
.load-more-btn:hover { background:#00263f; box-shadow:0 10px 26px -10px rgba(0,48,86,.55); transform:translateY(-2px); }
.load-more-btn:disabled { opacity:.55; cursor:default; transform:none; box-shadow:none; }

.font-figtree { font-family:'Figtree', system-ui, sans-serif; }
.font-poppins { font-family:'Poppins', system-ui, sans-serif; }
</style>