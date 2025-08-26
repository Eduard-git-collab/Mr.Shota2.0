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

      <div v-if="blocks.length" class="blocks">
        <BlockRenderer
          v-for="b in blocks"
          :key="b.id || b.localKey"
          :block="b"
        />
      </div>

      <template v-else>
        <div class="body" v-html="formattedBody"></div>
        <div v-if="blog.template === 'gallery'" class="gallery">
          <div class="g-item" v-for="a in imageAssets" :key="a.id">
            <img :src="a.url" :alt="a.caption || 'Image'" />
            <div class="cap" v-if="a.caption">{{ a.caption }}</div>
          </div>
        </div>
        <div v-else-if="blog.template === 'feature'" class="feature-media">
          <div v-if="videoAsset" class="video-wrapper">
            <LegacyVideo :asset="videoAsset" />
          </div>
          <div class="feature-images">
            <div class="f-item" v-for="a in imageAssets" :key="a.id">
              <img :src="a.url" :alt="a.caption || 'Image'" />
              <div class="cap" v-if="a.caption">{{ a.caption }}</div>
            </div>
          </div>
        </div>
      </template>

      <div v-if="relatedBlogs.length" class="related-section">
        <h3 class="related-title">Related Articles</h3>
        <div class="related-grid">
          <article 
            v-for="related in relatedBlogs" 
            :key="related.id"
            class="related-item"
          >
            <router-link :to="`/blog/${related.slug}`" class="related-link">
              <div class="related-image" v-if="related.cover_url">
                <img :src="related.cover_url" :alt="related.title" />
              </div>
              <div class="related-content">
                <h4 class="related-item-title">{{ related.title }}</h4>
                <p class="related-date" v-if="related.published_at">
                  {{ formatDate(related.published_at) }}
                </p>
              </div>
            </router-link>
          </article>
        </div>
      </div>
    </article>
  </div>
  <div v-else-if="loading" class="fallback font-poppins">Loading...</div>
  <div v-else class="fallback font-poppins">Not found or not published.</div>
</template>

<script setup>
import { ref, onMounted, computed, watch, defineComponent, h } from 'vue'
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
  } catch (error) {
    console.error('Error loading blog:', error)
    blog.value = null
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(()=>route.params.slug, s => { slug.value = s; load() })

const blocks = computed(() => {
  if (!blog.value?.blog_blocks) return []
  return [...blog.value.blog_blocks]
    .sort((a,b)=> (a.position||0)-(b.position||0))
})
const imageAssets = computed(()=> (blog.value?.blog_assets||[]).filter(a=>a.type==='image').sort((a,b)=>a.position-b.position))
const videoAsset = computed(()=> (blog.value?.blog_assets||[]).find(a=>a.type==='video'))

const relatedBlogs = computed(() => {
  if (!blog.value?.related_blogs) return []
  return blog.value.related_blogs
    .filter(r => r.related_blog && r.related_blog.status === 'published')
    .sort((a,b)=>(a.position||0)-(b.position||0))
    .map(r=>r.related_blog)
})

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
function youtubeEmbedUrl(url){
  const m=url.match(/(?:v=|youtu\.be\/)([\w-]{6,})/)
  return m?`https://www.youtube.com/embed/${m[1]}`:url
}

/* Linkify: markdown links first, then bare URLs */
function linkify(rawEscaped) {
  // markdown: [text](https://...)
  let html = rawEscaped.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
  // bare URLs (avoid ones already inside href)
  html = html.replace(/(^|[\s>])(https?:\/\/[^\s<]+)(?=$|[\s<])/g, (m, pre, url) => {
    return `${pre}<a href="${url}" target="_blank" rel="noopener">${url}</a>`
  })
  return html
}

const BlockRenderer = defineComponent({
  name: 'BlockRenderer',
  props: { block:{type:Object, required:true} },
  setup(props){
    return () => {
      const b = props.block
      switch(b.type){
        case 'paragraph': {
          const raw = b.content?.text || ''
          const paragraphs = raw.split(/\n{2,}/).map(seg=>{
            const safe = linkify(escapeHtml(seg)).replace(/\n/g,'<br/>')
            return h('p',{innerHTML:safe})
          })
          return h('div',{class:'b-paragraph'}, paragraphs)
        }
        case 'media': {
          const mediaType = b.content?.mediaType
          const caption = b.content?.caption
          const url = b.content?.url
          if (mediaType === 'video') {
            if (!url) return null
            const isYT = /youtube\.com|youtu\.be/.test(url)
            let node
            if (isYT) {
              const embed = youtubeEmbedUrl(url)
              node = h('div',{class:'video-wrapper'},[
                h('iframe',{src:embed, allowfullscreen:'', frameborder:'0'})
              ])
            } else {
              node = h('div',{class:'video-wrapper'},[
                h('video',{class:'inline-video', controls:true}, [ h('source',{src:url}) ])
              ])
            }
            return h('div',{class:'b-media video'},[ node, caption? h('div',{class:'media-cap'}, caption):null ])
          } else {
            if (!url) return null
            return h('figure',{class:'b-media image'},[
              h('img',{src:url, alt:caption||'Image'}),
              caption ? h('figcaption',{class:'media-cap'}, caption) : null
            ])
          }
        }
        case 'callout': {
          const variant = b.content?.variant || 'general'
          const text = b.content?.text || ''
          const html = escapeHtml(text).replace(/\n/g,'<br/>')
          return h('div',{class:['b-callout', variant]},[
            h('div',{class:'callout-inner', innerHTML:html})
          ])
        }
        case 'cta': {
          const { style='template1', heading='', body='', buttonText='', buttonUrl='' } = b.content || {}
          const children = []
          if (heading) children.push(h('h4',{class:'cta-heading'},heading))
          if (body) children.push(h('p',{class:'cta-body'},body))
          if (buttonText && buttonUrl) {
            children.push(h('a',{class:'cta-btn', href:buttonUrl, target:'_blank', rel:'noopener'}, buttonText))
          }
          return h('div',{class:['b-cta', style]}, children)
        }
        case 'bullets': {
          const items = Array.isArray(b.content?.items)? b.content.items: []
          return h('ul',{class:'b-bullets'},
            items.map((it,i)=>{
              const safe = linkify(escapeHtml(it))
              return h('li',{key:i, innerHTML:safe})
            })
          )
        }
        default:
          return h('div',{class:'b-unknown'}, `Unsupported block type: ${b.type}`)
      }
    }
  }
})

const LegacyVideo = defineComponent({
  name:'LegacyVideo',
  props:{ asset:{type:Object, required:true} },
  setup(props){
    return () => {
      const url = props.asset.url
      if (!url) return null
      const isYT = /youtube\.com|youtu\.be/.test(url)
      if (isYT) {
        const embed = youtubeEmbedUrl(url)
        return h('div',{class:'yt'},[
          h('iframe',{src:embed, allowfullscreen:'', frameborder:'0'})
        ])
      }
      return h('video',{class:'inline-video', controls:true}, [
        h('source',{src:url})
      ])
    }
  }
})
</script>

<style scoped>
/* (styles unchanged except already present in prior message) */
.public-blog { max-width:820px; margin:0 auto; padding:1.5rem 1rem 4rem; line-height:1.6; font-size:1rem; }
.hero-img { width:100%; max-height:420px; object-fit:cover; border-radius:12px; margin-bottom:1.25rem; }
.title { font-size:clamp(2rem,4vw,2.6rem); margin:0 0 .5rem; line-height:1.1; font-weight:700; }
.meta { font-size:.7rem; text-transform:uppercase; letter-spacing:1px; opacity:.65; margin:0 0 1.25rem; display:flex; gap:.7rem; flex-wrap:wrap; align-items:center; }
.blocks { display:flex; flex-direction:column; gap:1.5rem; }
.b-media.image img, .b-media.video iframe, .b-media.video video { width:100%; border-radius:12px; display:block; max-height:520px; object-fit:cover; }
.video-wrapper { position:relative; padding-bottom:56.25%; height:0; }
.video-wrapper iframe, .video-wrapper video, .inline-video { position:absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius:12px; }
.media-cap { font-size:.65rem; text-transform:uppercase; letter-spacing:.5px; opacity:.6; margin-top:.4rem; }
.b-callout { border-left:6px solid; padding:1rem 1rem 1rem 1.25rem; border-radius:8px; background:#f8fafc; font-size:.95rem; }
.b-callout.general { border-color:#64748b; background:#f1f5f9; }
.b-callout.warning { border-color:#d97706; background:#fef3c7; }
.b-callout.good { border-color:#16a34a; background:#dcfce7; }
.b-callout.bad { border-color:#dc2626; background:#fee2e2; }
.b-cta { padding:1.5rem 1.25rem; border-radius:14px; background:linear-gradient(135deg,#1e3a8a,#3b82f6); color:#fff; text-align:center; }
.b-cta.template2 { background:linear-gradient(135deg,#047857,#10b981); }
.cta-heading { margin:0 0 .5rem; font-size:1.25rem; }
.cta-body { margin:.25rem 0 1rem; font-size:.9rem; }
.cta-btn { display:inline-block; background:#fff; color:#1e3a8a; font-weight:600; padding:.6rem 1.1rem; border-radius:999px; text-decoration:none; font-size:.75rem; letter-spacing:.5px; text-transform:uppercase; }
.b-cta.template2 .cta-btn { color:#047857; }
.b-bullets { padding-left:1.1rem; margin:0; display:flex; flex-direction:column; gap:.4rem; }
.b-bullets li { line-height:1.4; }
.gallery { margin-top:2rem; display:grid; gap:.75rem; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
.g-item img { width:100%; height:140px; object-fit:cover; border-radius:8px; }
.cap { font-size:.6rem; text-transform:uppercase; letter-spacing:.5px; margin-top:.25rem; opacity:.6; }
.feature-media { margin-top:2rem; display:flex; flex-direction:column; gap:1.5rem; }
.related-section { margin-top:3rem; padding-top:2rem; border-top:1px solid #e5e7eb; }
.related-title { font-size:1.25rem; font-weight:600; margin:0 0 1.5rem; }
.related-grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fill, minmax(280px,1fr)); }
.related-item { background:#fff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; transition:.2s; }
.related-item:hover { transform:translateY(-2px); box-shadow:0 4px 12px -2px rgba(0,0,0,.1); }
.related-image { width:100%; height:140px; overflow:hidden; }
.related-image img { width:100%; height:100%; object-fit:cover; transition:.2s; }
.related-item:hover .related-image img { transform:scale(1.05); }
.related-content { padding:1rem; }
.related-item-title { font-size:.9rem; font-weight:600; margin:0 0 .5rem; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.related-date { font-size:.75rem; text-transform:uppercase; letter-spacing:.5px; opacity:.65; margin:0; }
.fallback { text-align:center; padding:3rem 1rem; }
@media (max-width:640px){ .related-grid { grid-template-columns:1fr; } }
</style>