<template>
  <div class="public-blog font-poppins" v-if="blog">
    <article :class="['template', blog.template]">
      <header v-if="blog.cover_url" class="hero">
        <img :src="blog.cover_url" :alt="blog.title" class="hero-img" />
      </header>
      <h1 class="title font-figtree">{{ blog.title }}</h1>
      <p class="meta" v-if="blog.published_at">
        Published {{ formatDate(blog.published_at) }}
        <span v-if="blog.selection" class="badge-pinned">Pinned</span>
      </p>
      <div class="body" v-html="formattedBody"></div>

      <div v-if="blog.template === 'gallery'" class="gallery">
        <div class="g-item" v-for="a in imageAssets" :key="a.id">
          <img :src="a.url" :alt="a.caption || 'Image'" />
          <div class="cap" v-if="a.caption">{{ a.caption }}</div>
        </div>
      </div>

      <div v-else-if="blog.template === 'feature'" class="feature-media">
        <div v-if="videoAsset" class="video-wrapper">
          <component :is="videoComponent(videoAsset)" />
        </div>
        <div class="feature-images">
          <div class="f-item" v-for="a in imageAssets" :key="a.id">
            <img :src="a.url" :alt="a.caption || 'Image'" />
            <div class="cap" v-if="a.caption">{{ a.caption }}</div>
          </div>
        </div>
      </div>
    </article>
  </div>
  <div v-else-if="loading" class="fallback font-poppins">Loading...</div>
  <div v-else class="fallback font-poppins">Not found or not published.</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogBySlug } from '../services/blogServices'

const route = useRoute()
const slug = ref(route.params.slug)
const blog = ref(null)
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    const data = await getBlogBySlug(slug.value)
    blog.value = (data && data.status === 'published') ? data : null
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(()=>route.params.slug, s => { slug.value = s; load() })

const imageAssets = computed(()=> (blog.value?.blog_assets||[]).filter(a=>a.type==='image').sort((a,b)=>a.position-b.position))
const videoAsset = computed(()=> (blog.value?.blog_assets||[]).find(a=>a.type==='video'))

const formattedBody = computed(()=>{
  if(!blog.value?.body) return ''
  return blog.value.body
    .split(/\n{2,}/)
    .map(p=>`<p>${escapeHtml(p).replace(/\n/g,'<br/>')}</p>`)
    .join('')
})

function formatDate(str) {
  const d = new Date(str)
  return isNaN(d) ? str : d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})
}
function escapeHtml(str){
  return str.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
}
function videoComponent(asset){
  const url=asset.url
  if(/youtube\.com|youtu\.be/.test(url)){
    const embed = youtubeEmbedUrl(url)
    return { template:`<div class="yt"><iframe src="${embed}" allowfullscreen frameborder="0"></iframe></div>` }
  }
  return { template:`<video controls class="inline-video"><source src="${url}"></video>` }
}
function youtubeEmbedUrl(url){
  const m=url.match(/(?:v=|youtu\.be\/)([\w-]{6,})/)
  return m?`https://www.youtube.com/embed/${m[1]}`:url
}
</script>

<style scoped>
.public-blog {
  max-width:820px;
  margin:0 auto;
  padding:1.5rem 1rem 4rem;
  line-height:1.6;
  font-size:1rem;
  color:var(--color-text);
  background:var(--color-bg);
}
.hero-img {
  width:100%; max-height:420px; object-fit:cover;
  border-radius:12px;
  margin-bottom:1.25rem;
}
.title {
  font-size:clamp(2rem,4vw,2.6rem);
  margin:0 0 .5rem;
  line-height:1.1;
  font-weight:700;
  color:var(--color-primary);
}
.meta {
  font-size:.7rem;
  text-transform:uppercase;
  letter-spacing:1px;
  opacity:.65;
  margin:0 0 1.25rem;
  display:flex;
  gap:.7rem;
  flex-wrap:wrap;
  align-items:center;
}
.body p { margin:0 0 1rem; }
.gallery {
  margin-top:2rem;
  display:grid;
  gap:.75rem;
  grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
}
.g-item img {
  width:100%; height:140px; object-fit:cover;
  border-radius:8px;
}
.cap {
  font-size:.6rem;
  text-transform:uppercase;
  letter-spacing:.5px;
  margin-top:.25rem;
  opacity:.6;
}
.feature-media { margin-top:2rem; display:flex; flex-direction:column; gap:1.5rem; }
.video-wrapper, .yt {
  position:relative;
  padding-bottom:56.25%;
  height:0;
}
.yt iframe, .video-wrapper iframe, .video-wrapper video, .inline-video {
  position:absolute; top:0; left:0; width:100%; height:100%;
  border:none; border-radius:12px;
}
.feature-images {
  display:grid; gap:.8rem;
  grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
}
.f-item img {
  width:100%; height:160px; object-fit:cover; border-radius:10px;
}
.fallback {
  text-align:center;
  padding:3rem 1rem;
  color:var(--color-text-mute);
}
</style>