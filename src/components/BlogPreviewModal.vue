<template>
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
         @keydown.esc.prevent.stop="emitClose"
         @click.self="emitClose">
      <div class="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col preview-surface">
        <!-- HEADER -->
        <div class="flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div class="flex flex-col">
            <h2 class="m-0 text-lg font-semibold text-slate-800 leading-tight">
              Live Preview
            </h2>
            <p class="m-0 text-xs text-slate-500">
              This is a non-published preview. Media not yet uploaded uses temporary object URLs.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="toggleToc"
              class="rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
            >
              {{ showToc ? 'Hide TOC' : 'Show TOC' }}
            </button>
            <button
              type="button"
              @click="emitClose"
              class="rounded-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
            >
              Close
            </button>
          </div>
        </div>
  
        <!-- BODY -->
        <div class="flex-1 overflow-auto">
          <div class="blog-layout-preview" v-if="blog">
            <!-- Side TOC mimic -->
              <nav
                v-if="showToc && tocBlocks.length"
                class="toc-nav"
                aria-label="Article sections">
                <div class="toc-title">On this page</div>
                <ol class="toc-list">
                  <li v-for="item in tocBlocks"
                      :key="item.anchorId"
                      :class="['toc-item', { active: activeAnchor === item.anchorId }]">
                    <a href="javascript:void(0)"
                       @click="scrollToAnchor(item.anchorId)"
                       :aria-current="activeAnchor === item.anchorId ? 'true' : 'false'">
                      {{ item.label }}
                    </a>
                  </li>
                </ol>
              </nav>
  
            <div class="public-blog">
              <article :class="['template', blog.template]">
                <header v-if="blog.cover_url" class="hero">
                  <img :src="blog.cover_url" :alt="blog.title" class="hero-img" />
                </header>
                <h1 class="title">{{ blog.title }}</h1>
                <p class="meta" v-if="blog.published_at">
                  Previewed {{ formatDate(blog.published_at) }}
                </p>
  
                <!-- Block rendering -->
                <div v-if="blocks.length" class="blocks">
                  <div
                    v-for="b in blocks"
                    :key="b.position + '-' + (b.id || b.content?.anchorId || b.position)"
                    :id="b.content?.includeInToc && b.content?.anchorId ? b.content.anchorId : null"
                    class="block-container"
                    :data-anchor="b.content?.anchorId || ''">
                    <BlockRenderer :block="b" />
                  </div>
                </div>
  
                <!-- Body fallback -->
                <template v-else>
                  <div class="body" v-html="formattedBody"></div>
                </template>
  
                <!-- Related (preview) -->
                <div v-if="relatedBlogs.length" class="related-section">
                  <h3 class="related-title">Related Articles (Preview)</h3>
                  <div class="related-grid">
                    <article
                      v-for="r in relatedBlogs"
                      :key="r.id"
                      class="related-item"
                    >
                      <div class="related-link">
                        <div class="related-image" v-if="r.cover_url">
                          <img :src="r.cover_url" :alt="r.title" />
                        </div>
                        <div class="related-content">
                          <h4 class="related-item-title">{{ r.title }}</h4>
                          <p class="related-date" v-if="r.published_at">
                            {{ formatDate(r.published_at) }}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
  
              </article>
            </div>
          </div>
          <div v-else class="p-8 text-center text-slate-500 text-sm">
            Nothing to preview.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  /*
    A lightweight modal replicating the public blog layout styling
    for an in-editor preview. Receives a blog object similar to the
    one returned by getBlogBySlug (fields used: title, cover_url,
    template, published_at, blog_blocks, blog_assets, related_blogs).
  */
  import { computed, ref, watch, defineComponent, h, onMounted, onBeforeUnmount } from 'vue'
  
  const props = defineProps({
    blog: { type: Object, required: true },
    loading: { type: Boolean, default: false }
  })
  const emit = defineEmits(['close'])
  
  function emitClose() { emit('close') }
  
  const showToc = ref(true)
  
  /* Blocks */
  const blocks = computed(() => {
    if (!props.blog?.blog_blocks) return []
    return [...props.blog.blog_blocks]
      .sort((a,b)=> (a.position||0)-(b.position||0))
      .map(b => ({
        ...b,
        content: {
          ...b.content,
          includeInToc: !!b.content?.includeInToc,
          anchorLabel: b.content?.anchorLabel || '',
          anchorId: b.content?.anchorId || ''
        }
      }))
  })
  
  /* TOC */
  const tocBlocks = computed(() =>
    blocks.value
      .filter(b => b.content?.includeInToc && b.content?.anchorId && b.content.anchorLabel)
      .map(b => ({
        anchorId: b.content.anchorId,
        label: b.content.anchorLabel
      }))
  )
  
  const activeAnchor = ref('')
  let io = null
  
  function setupObserver() {
    cleanupObserver()
    if (!tocBlocks.value.length) return
    const opts = {
      root: document.querySelector('.blog-layout-preview'),
      rootMargin: '0px 0px -70% 0px',
      threshold: [0, 1]
    }
    io = new IntersectionObserver(handleIntersect, opts)
    tocBlocks.value.forEach(t => {
      const el = document.getElementById(t.anchorId)
      if (el) io.observe(el)
    })
  }
  function handleIntersect(entries) {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b)=> a.boundingClientRect.top - b.boundingClientRect.top)
    if (visible.length) {
      activeAnchor.value = visible[0].target.id
    }
  }
  function cleanupObserver() {
    if (io) {
      io.disconnect()
      io = null
    }
  }
  onMounted(()=>{
    setTimeout(setupObserver, 30)
  })
  watch(blocks, () => {
    setTimeout(setupObserver, 30)
  })
  
  onBeforeUnmount(cleanupObserver)
  
  function scrollToAnchor(id) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior:'smooth', block:'start' })
      activeAnchor.value = id
    }
  }
  
  /* Related preview flatten */
  const relatedBlogs = computed(()=>{
    if(!props.blog?.related_blogs) return []
    return props.blog.related_blogs
      .map(r => r.related_blog)
      .filter(Boolean)
  })
  
  /* Legacy body */
  const formattedBody = computed(()=>{
    if(!props.blog?.body) return ''
    return props.blog.body
      .split(/\n{2,}/)
      .map(p=>`<p>${escapeHtml(p).replace(/\n/g,'<br/>')}</p>`)
      .join('')
  })
  
  function formatDate(str){
    const d=new Date(str)
    return isNaN(d)?str:d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})
  }
  function escapeHtml(str){
    return (str||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
  }
  function youtubeEmbedUrl(url){
    const m=url?.match(/(?:v=|youtu\.be\/)([\w-]{6,})/)
    return m?`https://www.youtube.com/embed/${m[1]}`:url
  }
  function linkify(rawEscaped) {
    let html = rawEscaped.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" class="preview-link" rel="noopener">$1</a>')
    html = html.replace(/(^|[\s>])(https?:\/\/[^\s<]+)(?=$|[\s<])/g, (m, pre, url) => {
      return `${pre}<a href="${url}" class="preview-link" target="_blank" rel="noopener">${url}</a>`
    })
    return html
  }
  
  /* Block Renderer (mirrors public view) */
  const BlockRenderer = defineComponent({
    name:'PreviewBlockRenderer',
    props:{ block:{type:Object, required:true} },
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
  
  function toggleToc(){ showToc.value = !showToc.value }
  </script>
  
  <style scoped>
  .preview-surface {
    font-family: system-ui,-apple-system,Inter,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial,sans-serif;
  }
  /* Reuse styles (trimmed subset) */
  .blog-layout-preview {
    display:flex;
    align-items:flex-start;
    gap:2.2rem;
    padding:1.5rem 1.25rem 3rem;
    background:linear-gradient(180deg,#f8fafc,#f1f5f9 80%);
    color:#1e293b;
    min-height:100%;
  }
  @media (max-width:1100px){
    .blog-layout-preview { flex-direction:column; }
    .toc-nav { position:relative; width:auto; order:2; }
  }
  .toc-nav {
    width:230px;
    flex-shrink:0;
    position:sticky;
    top:1rem;
    max-height:calc(90vh - 4rem);
    overflow:auto;
    background:#ffffff;
    border:1px solid #e2e8f0;
    border-radius:12px;
    padding:.8rem .75rem;
    box-shadow:0 2px 6px -2px rgba(0,0,0,.08);
  }
  .toc-title {
    font-size:.65rem;
    font-weight:700;
    letter-spacing:.07em;
    text-transform:uppercase;
    color:#475569;
    margin:0 0 .5rem;
  }
  .toc-list {
    list-style:none;
    margin:0;
    padding:0;
    display:flex;
    flex-direction:column;
    gap:.35rem;
  }
  .toc-item a {
    display:block;
    text-decoration:none;
    font-size:.74rem;
    line-height:1.25;
    padding:.35rem .55rem;
    border-radius:6px;
    color:#334155;
    transition:background .15s, color .15s;
  }
  .toc-item a:hover { background:#f1f5f9; }
  .toc-item.active > a {
    background:#2563eb;
    color:#fff;
    font-weight:600;
  }
  
  .public-blog { flex:1; line-height:1.6; font-size:1rem; }
  .hero-img {
    width:100%; max-height:420px; object-fit:cover;
    border-radius:14px; margin-bottom:1.25rem;
  }
  .title {
    font-size:clamp(2rem,3.5vw,2.5rem);
    margin:0 0 .65rem;
    font-weight:700;
    line-height:1.08;
    color:#1e3a8a;
  }
  .meta {
    font-size:.65rem;
    letter-spacing:.06em;
    text-transform:uppercase;
    opacity:.65;
    display:flex;
    gap:.6rem;
    margin:0 0 1.25rem;
    flex-wrap:wrap;
  }
  .blocks { display:flex; flex-direction:column; gap:1.4rem; }
  .block-container:target { scroll-margin-top:80px; }
  
  .b-paragraph p { margin:0 0 1rem; }
  .b-media.image img, .b-media.video iframe, .b-media.video video {
    width:100%; border-radius:14px; display:block;
    max-height:520px; object-fit:cover;
  }
  .video-wrapper { position:relative; padding-bottom:56.25%; height:0; }
  .video-wrapper iframe, .video-wrapper video, .inline-video {
    position:absolute; top:0; left:0; width:100%; height:100%;
    border:none; border-radius:14px;
  }
  .media-cap {
    font-size:.6rem;
    text-transform:uppercase;
    letter-spacing:.5px;
    opacity:.65;
    margin-top:.45rem;
  }
  .b-callout {
    border-left:6px solid;
    padding:1rem 1rem 1rem 1.15rem;
    border-radius:10px;
    background:#f1f5f9;
    font-size:.95rem;
  }
  .b-callout.general { border-color:#64748b; background:#f1f5f9; }
  .b-callout.warning { border-color:#d97706; background:#fef3c7; }
  .b-callout.good { border-color:#16a34a; background:#dcfce7; }
  .b-callout.bad { border-color:#dc2626; background:#fee2e2; }
  .b-cta {
    padding:1.5rem 1.25rem;
    border-radius:16px;
    background:linear-gradient(135deg,#1e3a8a,#3b82f6);
    color:#fff;
    text-align:center;
    position:relative;
    overflow:hidden;
  }
  .b-cta.template2 {
    background:linear-gradient(135deg,#047857,#10b981);
  }
  .cta-heading { margin:0 0 .55rem; font-size:1.25rem; line-height:1.2; font-weight:600; }
  .cta-body { margin:.3rem 0 1rem; font-size:.9rem; opacity:.95; }
  .cta-btn {
    display:inline-block;
    background:#fff;
    color:#1e3a8a;
    font-weight:600;
    padding:.6rem 1.1rem;
    border-radius:999px;
    text-decoration:none;
    font-size:.7rem;
    letter-spacing:.5px;
    text-transform:uppercase;
  }
  .b-cta.template2 .cta-btn { color:#047857; }
  .b-bullets { padding-left:1.1rem; margin:0; display:flex; flex-direction:column; gap:.45rem; }
  .b-bullets li { line-height:1.45; }
  .b-unknown { font-size:.7rem; opacity:.6; font-style:italic; }
  
  .related-section {
    margin-top:3rem;
    padding-top:2rem;
    border-top:1px solid #e2e8f0;
  }
  .related-title {
    font-size:1.2rem;
    font-weight:600;
    margin:0 0 1rem;
    color:#1e3a8a;
  }
  .related-grid {
    display:grid;
    gap:.9rem;
    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
  }
  .related-item {
    border:1px solid #e2e8f0;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    transition:.18s;
  }
  .related-item:hover {
    transform:translateY(-3px);
    box-shadow:0 6px 14px -4px rgba(0,0,0,.12);
  }
  .related-image { height:130px; background:#f1f5f9; overflow:hidden; }
  .related-image img { width:100%; height:100%; object-fit:cover; transition:.3s; }
  .related-item:hover .related-image img { transform:scale(1.06); }
  .related-content { padding:.85rem .9rem 1rem; }
  .related-item-title {
    font-size:.85rem;
    font-weight:600;
    margin:0 0 .35rem;
    line-height:1.25;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
  }
  .related-date {
    font-size:.6rem;
    text-transform:uppercase;
    letter-spacing:.5px;
    opacity:.6;
    margin:0;
  }
  
  .preview-link {
    color:#1d4ed8;
    text-decoration:underline;
  }
  
  </style>