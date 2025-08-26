<template>
  <div class="bg-white/85 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col gap-5">
    <!-- HEADER -->
    <header class="flex justify-between flex-wrap items-center gap-4 border-b border-slate-100 pb-3">
      <h2 class="text-xl font-bold text-slate-800 tracking-wide">
        {{ isEdit ? 'Edit Blog' : 'New Blog' }}
      </h2>
      <div class="flex gap-3 flex-wrap">
        <button @click="saveDraft" :disabled="saving"
          class="btn-base btn-slate disabled:opacity-50 disabled:cursor-default">
          {{ saving ? 'Saving...' : 'Save Draft' }}
        </button>
        <button @click="showScheduleModal = true" :disabled="saving"
          class="btn-base btn-blue disabled:opacity-50 disabled:cursor-default">
          Publish Later
        </button>
        <button @click="publish" :disabled="saving"
          class="btn-base btn-blue-dark disabled:opacity-50 disabled:cursor-default">
          {{ saving ? 'Publishing…' : 'Publish Now' }}
        </button>
      </div>
    </header>

    <form @submit.prevent="saveDraft" class="flex flex-col gap-6">
      <!-- META -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label class="lbl">Title *</label>
          <input v-model="form.title" required maxlength="140" class="input" />
        </div>
      </div>

      <!-- COVER -->
      <div class="flex flex-col gap-2">
        <label class="lbl">Cover Image</label>
        <input type="file" accept="image/*" @change="onCoverChange" class="input" />
        <div v-if="coverPreview" class="mt-2 relative inline-block">
          <img :src="coverPreview" alt="Cover preview"
               class="max-w-80 border border-slate-300 rounded-xl object-cover shadow-lg" />
          <button type="button"
                  class="btn-small bg-red-600 hover:bg-red-700 text-white absolute top-2 right-2"
                  @click="removeCover">
            Remove
          </button>
        </div>
      </div>

      <!-- BLOCK EDITOR -->
      <div class="panel panel--blocks">
        <div class="panel-header-top">
          <div>
            <h3 class="panel-title">Content Blocks</h3>
            <p class="sub-hint">Drag to reorder. Markdown links: [text](https://url)</p>
          </div>
          <!-- (Add Block controls moved to bottom) -->
        </div>

        <div v-if="!blocks.length" class="text-sm text-slate-500 italic mb-2">
          No blocks yet. Add your first block below.
        </div>

        <!-- DRAG CONTAINER -->
        <div class="flex flex-col gap-3 blocks-scroll"
             @dragover.prevent="onBlocksDragOver"
             @drop.prevent="onBlocksDrop">
          <div v-for="(block, idx) in blocks" :key="block.localKey"
               class="block-wrapper group"
               :data-index="idx"
               draggable="true"
               @dragstart="onBlockDragStart($event, idx)"
               @dragenter.prevent="onBlockDragEnter($event, idx)"
               @dragend="onBlockDragEnd"
               :class="{'dragging': dragState.draggingIndex===idx, 'drag-over': dragState.overIndex===idx && dragState.draggingIndex!==idx}">
            <!-- BLOCK HEADER -->
            <div class="block-header">
              <div class="flex items-center gap-2">
                <span class="drag-handle" title="Drag to reorder" aria-hidden="true">⋮⋮</span>
                <span class="block-label">{{ labelFor(block) }}</span>
                <span class="idx">#{{ idx+1 }}</span>
                <span v-if="dragState.overIndex===idx && dragState.draggingIndex!==idx"
                      class="drag-indicator">
                  Drop {{ dragState.draggingIndex < idx ? 'after' : 'before' }}
                </span>
              </div>
              <div class="flex gap-1">
                <button type="button" @click="moveBlock(idx, -1)" :disabled="idx===0"
                  class="btn-xxs" title="Move up (Alt+↑)">↑</button>
                <button type="button" @click="moveBlock(idx, 1)"
                  :disabled="idx===blocks.length-1" class="btn-xxs"
                  title="Move down (Alt+↓)">↓</button>
                <button type="button" @click="duplicateBlock(idx)" class="btn-xxs"
                  title="Duplicate (Alt+D)">⧉</button>
                <button type="button" @click="removeBlock(idx)"
                  class="btn-xxs btn-xxs--danger"
                  title="Delete (Del)">✕</button>
              </div>
            </div>

            <!-- BLOCK BODY -->
            <div class="p-4 space-y-3">
              <!-- Paragraph -->
              <div v-if="block.type==='paragraph'" class="flex flex-col gap-2">
                <div class="flex gap-2 flex-wrap items-center">
                  <button type="button" class="btn-xxs-alt btn-xxs-alt--primary"
                          @click="insertLink(block)">
                    Insert Link
                  </button>
                  <span class="text-[11px] text-slate-400">Use markdown: [text](https://...)</span>
                </div>
                <textarea v-model="block.content.text"
                          :data-block-key="block.localKey"
                          rows="5"
                          class="textarea"
                          placeholder="Write paragraph text. Example: See our [help page](https://example.com/help).">
                </textarea>
              </div>

              <!-- Media -->
              <div v-else-if="block.type==='media'" class="flex flex-col gap-3">
                <div class="flex flex-wrap gap-4">
                  <label class="lbl-inline">
                    Type:
                    <select v-model="block.content.mediaType" class="select-xs">
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </label>
                  <div v-if="block.content.mediaType==='video'" class="flex-1">
                    <input v-model="block.content.url" placeholder="Video URL (YouTube or MP4)" class="input-xs" />
                  </div>
                  <div v-else class="flex-1">
                    <input type="file" accept="image/*" @change="onMediaFileChange($event, block)" class="input-xs" />
                  </div>
                </div>
                <input v-model="block.content.caption" placeholder="Caption (optional)" class="input-xs w-full" />
                <div v-if="mediaPreview(block)" class="mt-2">
                  <img v-if="block.content.mediaType==='image'" :src="mediaPreview(block)"
                       class="max-h-48 rounded-lg border border-slate-300 object-cover shadow" />
                </div>
              </div>

              <!-- Callout -->
              <div v-else-if="block.type==='callout'" class="flex flex-col gap-3">
                <label class="lbl-inline">
                  Variant:
                  <select v-model="block.content.variant" class="select-xs">
                    <option value="general">General</option>
                    <option value="warning">Warning</option>
                    <option value="good">Good</option>
                    <option value="bad">Bad</option>
                  </select>
                </label>
                <textarea v-model="block.content.text" rows="3" placeholder="Callout content..."
                          class="textarea textarea--sm"></textarea>
              </div>

              <!-- CTA -->
              <div v-else-if="block.type==='cta'" class="flex flex-col gap-3">
                <label class="lbl-inline">
                  Style:
                  <select v-model="block.content.style" class="select-xs">
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                  </select>
                </label>
                <input v-model="block.content.heading" placeholder="Heading" class="input-xs" />
                <textarea v-model="block.content.body" rows="3" placeholder="Body text" class="textarea textarea--sm"></textarea>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input v-model="block.content.buttonText" placeholder="Button Text" class="input-xs" />
                  <input v-model="block.content.buttonUrl" placeholder="Button URL (https://...)" class="input-xs" />
                </div>
              </div>

              <!-- Bullets -->
              <div v-else-if="block.type==='bullets'" class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <span class="lbl-inline">Bullet Items</span>
                  <button type="button" @click="addBullet(block)" class="btn-xxs-alt btn-xxs-alt--primary">
                    + Item
                  </button>
                </div>
                <div class="flex flex-col gap-2 bullet-container"
                     @dragover.prevent="onBulletsDragOver($event, block)"
                     @drop.prevent="onBulletsDrop($event, block)">
                  <div v-for="(item,i) in block.content.items"
                       :key="i"
                       class="flex gap-2 items-start bullet-item"
                       draggable="true"
                       :data-bullet-index="i"
                       @dragstart="onBulletDragStart($event, block, i)"
                       @dragenter.prevent="onBulletDragEnter($event, block, i)"
                       @dragend="onBulletDragEnd">
                    <span class="drag-handle-bullet" aria-hidden="true">⋮</span>
                    <input v-model="block.content.items[i]" placeholder="Bullet point text" class="input-xs flex-1" />
                    <button type="button" class="btn-xxs" @click="moveBullet(block,i,-1)" :disabled="i===0">↑</button>
                    <button type="button" class="btn-xxs" @click="moveBullet(block,i,1)" :disabled="i===block.content.items.length-1">↓</button>
                    <button type="button" class="btn-xxs btn-xxs--danger"
                            @click="removeBullet(block,i)">✕</button>
                  </div>
                </div>
              </div>

              <div v-else class="text-xs text-red-600">
                Unsupported block type: {{ block.type }}
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM ADD BLOCK BAR -->
        <div class="add-block-bar">
          <div class="add-block-inner">
            <select v-model="newBlockType" class="input input--sm add-block-select">
              <option disabled value="">Add new block…</option>
              <option value="paragraph">Paragraph</option>
              <option value="media-image">Image</option>
              <option value="media-video">Video</option>
              <option value="callout">Callout</option>
              <option value="cta">CTA</option>
              <option value="bullets">Bullets</option>
            </select>
            <button type="button"
                    :disabled="!newBlockType"
                    @click="addBlockFromSelector"
                    class="btn-base btn-blue-dark add-block-btn disabled:opacity-40">
              + Add Block
            </button>
            <div class="quick-add">
              <button type="button" class="quick-btn" @click="quickAdd('paragraph')" title="Quick paragraph">P</button>
              <button type="button" class="quick-btn" @click="quickAdd('media-image')" title="Quick image">Img</button>
              <button type="button" class="quick-btn" @click="quickAdd('callout')" title="Quick callout">Callout</button>
              <button type="button" class="quick-btn" @click="quickAdd('bullets')" title="Quick bullets">• • •</button>
            </div>
          </div>
        </div>
      </div>

      <!-- RELATED ARTICLES (legacy) -->
      <div class="panel">
        <h3 class="panel-title">Related Articles</h3>
        <p class="sub-hint">Select up to 4 published articles (legacy feature).</p>

        <div class="flex flex-col gap-3 related-drag-container"
             @dragover.prevent="onRelatedDragOver"
             @drop.prevent="onRelatedDrop">
          <div v-for="(related, idx) in relatedBlogs"
               :key="related.localKey"
               class="related-row"
               draggable="true"
               :data-related-index="idx"
               @dragstart="onRelatedDragStart($event, idx)"
               @dragenter.prevent="onRelatedDragEnter($event, idx)"
               @dragend="onRelatedDragEnd"
               :class="{'drag-over': relationDrag.overIndex===idx && relationDrag.draggingIndex!==idx}">
            <span class="drag-handle" aria-hidden="true">⋮⋮</span>
            <div class="flex-1">
              <select v-model="related.blogId" @change="onRelatedBlogChange(idx)" class="input-xs w-full">
                <option value="">Select an article...</option>
                <option v-for="blog in availableBlogs" :key="blog.id" :value="blog.id"
                        :disabled="isRelatedBlogSelected(blog.id, idx)">
                  {{ blog.title }}
                </option>
              </select>
            </div>
            <button type="button"
              class="btn-xxs btn-xxs--danger"
              @click="removeRelatedBlog(idx)">
              ✕
            </button>
          </div>

          <button v-if="relatedBlogs.length < 4" type="button"
                  class="btn-base btn-blue-dark text-xs"
                  @click="addRelatedBlog">
            + Add Related Article
          </button>
        </div>
      </div>

      <!-- LEGACY ASSETS -->
      <div v-if="form.template === 'gallery'" class="panel">
        <h3 class="panel-title">Gallery Images (legacy)</h3>
        <div class="flex flex-col gap-3"
             @dragover.prevent="onAssetsDragOver"
             @drop.prevent="onAssetsDrop">
          <div v-for="(asset, idx) in assets" :key="asset.localKey"
               class="asset-row"
               draggable="true"
               :data-asset-index="idx"
               @dragstart="onAssetDragStart($event, idx)"
               @dragenter.prevent="onAssetDragEnter($event, idx)"
               @dragend="onAssetDragEnd"
               :class="{'drag-over': assetDrag.overIndex===idx && assetDrag.draggingIndex!==idx}">
            <span class="drag-handle" aria-hidden="true">⋮⋮</span>
            <select v-model="asset.type" disabled class="select-xs">
              <option value="image">Image</option>
            </select>
            <input type="file" accept="image/*" @change="onAssetFile($event, asset)" class="input-xs" />
            <input v-model="asset.caption" placeholder="Caption" class="input-xs" />
            <button type="button"
              class="btn-xxs btn-xxs--danger"
              @click="removeAsset(idx)">✕</button>
            <div v-if="assetPreview(asset)" class="flex justify-center">
              <img :src="assetPreview(asset)" class="thumb" />
            </div>
          </div>
          <button type="button"
            class="btn-base btn-blue-dark text-xs self-start"
            @click="addAsset('image')">
            + Add Image
          </button>
        </div>
      </div>

      <div v-else-if="form.template === 'feature'" class="panel">
        <h3 class="panel-title">Feature Media (legacy)</h3>
        <p class="sub-hint">One optional video & images.</p>
        <div class="flex flex-col gap-3"
             @dragover.prevent="onAssetsDragOver"
             @drop.prevent="onAssetsDrop">
          <div v-for="(asset, idx) in assets" :key="asset.localKey"
               class="asset-row"
               draggable="true"
               :data-asset-index="idx"
               @dragstart="onAssetDragStart($event, idx)"
               @dragenter.prevent="onAssetDragEnter($event, idx)"
               @dragend="onAssetDragEnd"
               :class="{'drag-over': assetDrag.overIndex===idx && assetDrag.draggingIndex!==idx}">
            <span class="drag-handle" aria-hidden="true">⋮⋮</span>
            <select v-model="asset.type" class="select-xs">
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input v-if="asset.type==='video'" v-model="asset.url" placeholder="Video URL"
                   class="input-xs" />
            <input v-else type="file" accept="image/*" @change="onAssetFile($event, asset)" class="input-xs" />
            <input v-model="asset.caption" placeholder="Caption" class="input-xs" />
            <button type="button"
              class="btn-xxs btn-xxs--danger"
              @click="removeAsset(idx)">✕</button>
            <div v-if="asset.type==='image' && assetPreview(asset)" class="flex justify-center">
              <img :src="assetPreview(asset)" class="thumb" />
            </div>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button type="button"
              class="btn-base btn-blue-dark text-xs"
              @click="addAsset('image')">
              + Image
            </button>
            <button type="button"
              class="btn-base btn-blue-dark text-xs disabled:opacity-50"
              @click="addAsset('video')"
              :disabled="hasVideo"
              title="Only one video allowed">
              + Video
            </button>
          </div>
        </div>
      </div>

      <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
    </form>

    <!-- SCHEDULE MODAL -->
    <div v-if="showScheduleModal" class="modal-mask" @click.self="showScheduleModal = false">
      <div class="modal">
        <h3 class="modal-title">Schedule Publication</h3>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="lbl">Publish Date & Time</label>
            <input v-model="scheduledDateTime" type="datetime-local" :min="minDateTime" class="input" />
          </div>
          <div class="flex gap-3 justify-end mt-2">
            <button type="button" @click="showScheduleModal = false" class="btn-base btn-slate text-xs">
              Cancel
            </button>
            <button type="button" @click="confirmSchedule" :disabled="!scheduledDateTime"
              class="btn-base btn-blue text-xs disabled:opacity-50">
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CONFIRM MODAL -->
    <div v-if="showConfirmModal" class="modal-mask" @click.self="showConfirmModal = false">
      <div class="modal">
        <h3 class="modal-title">Confirm Schedule</h3>
        <p class="text-slate-600 mb-6">
          Schedule for <strong class="text-slate-800">{{ formatScheduledDate }}</strong>?
        </p>
        <div class="flex gap-3 justify-end">
          <button type="button" @click="showConfirmModal = false" class="btn-base btn-slate text-xs">
            Cancel
          </button>
          <button type="button" @click="publishScheduled" :disabled="saving"
            class="btn-base btn-green text-xs disabled:opacity-50">
            {{ saving ? 'Scheduling...' : 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* same script logic as previous version, only addition: quickAdd() */
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogs } from '../../../composables/useBlogs'

const route = useRoute()
const router = useRouter()
const blogId = route.params.id
const isEdit = computed(() => !!blogId)
const { loadBlog, currentBlog, save, error, listPublishedBlogs } = useBlogs()

/* FORM STATE */
const form = reactive({
  id: null,
  title: '',
  template: 'basic',
  body: '',
  coverFile: null,
  cover_url: null,
  status: 'draft',
  published_at: null,
  to_be_published_date: null
})

/* COLLECTIONS */
const assets = ref([])
const relatedBlogs = ref([])
const availableBlogs = ref([])
const blocks = ref([])

/* UI STATE */
const newBlockType = ref('')
const saving = ref(false)
const coverPreview = ref(null)
const showScheduleModal = ref(false)
const showConfirmModal = ref(false)
const scheduledDateTime = ref('')

/* DRAG STATE */
const dragState = reactive({ draggingIndex: null, overIndex: null })
const assetDrag = reactive({ draggingIndex: null, overIndex: null })
const relationDrag = reactive({ draggingIndex: null, overIndex: null })
const bulletDrag = reactive({ blockLocalKey: null, draggingIndex: null, overIndex: null })

const minDateTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 16)
})
const formatScheduledDate = computed(() => scheduledDateTime.value
  ? new Date(scheduledDateTime.value).toLocaleString()
  : '')

const hasVideo = computed(() => assets.value.some(a => a.type === 'video'))

async function loadAvailableBlogs() {
  try {
    const blogs = await listPublishedBlogs({ limit: 100 })
    availableBlogs.value = blogs.filter(blog => blog.id !== form.id)
  } catch (e) {
    console.error('Failed to load available blogs:', e)
  }
}
onMounted(async () => {
  await loadAvailableBlogs()
  if (isEdit.value) {
    await loadBlog(blogId)
    if (currentBlog.value) {
      Object.assign(form, {
        id: currentBlog.value.id,
        title: currentBlog.value.title,
        template: currentBlog.value.template,
        body: currentBlog.value.body,
        cover_url: currentBlog.value.cover_url,
        status: currentBlog.value.status,
        published_at: currentBlog.value.published_at,
        to_be_published_date: currentBlog.value.to_be_published_date
      })
      coverPreview.value = form.cover_url
      if (Array.isArray(currentBlog.value.blog_blocks) && currentBlog.value.blog_blocks.length) {
        blocks.value = currentBlog.value.blog_blocks
          .sort((a,b)=> a.position - b.position)
          .map(b => ({
            id: b.id,
            type: b.type,
            position: b.position,
            content: b.content || {},
            localKey: b.id
          }))
      } else if (form.body) {
        blocks.value = [{
          id: null,
          type: 'paragraph',
          position: 0,
          content: { text: form.body },
          localKey: Math.random().toString(36).slice(2)
        }]
      }
      if (Array.isArray(currentBlog.value.blog_assets)) {
        assets.value = currentBlog.value.blog_assets
          .sort((a,b)=> a.position - b.position)
          .map(a => ({
            id: a.id,
            type: a.type,
            url: a.url,
            caption: a.caption,
            position: a.position,
            localKey: a.id
          }))
      }
      if (Array.isArray(currentBlog.value.blog_relations)) {
        relatedBlogs.value = currentBlog.value.blog_relations
          .sort((a,b)=> a.position - b.position)
          .map(r => ({
            id: r.id,
            blogId: r.related_blog_id,
            position: r.position,
            localKey: r.id || Math.random().toString(36).slice(2)
          }))
      }
    }
  }
})

/* QUICK ADD */
function quickAdd(kind) {
  switch(kind) {
    case 'paragraph': addParagraphBlock(); break
    case 'media-image': addMediaBlock('image'); break
    case 'media-video': addMediaBlock('video'); break
    case 'callout': addCalloutBlock(); break
    case 'cta': addCtaBlock(); break
    case 'bullets': addBulletsBlock(); break
  }
  scrollAddBarIntoView()
}
function scrollAddBarIntoView() {
  requestAnimationFrame(()=>{
    const el = document.querySelector('.add-block-bar')
    if (el) el.scrollIntoView({ behavior:'smooth', block:'nearest' })
  })
}

/* INSERT LINK */
function insertLink(block) {
  nextTick(()=>{
    const el = document.querySelector(`textarea[data-block-key="${block.localKey}"]`)
    const original = block.content.text || ''
    let selectionStart = 0
    let selectionEnd = 0
    if (el) {
      selectionStart = el.selectionStart
      selectionEnd = el.selectionEnd
    }
    const selected = original.slice(selectionStart, selectionEnd)
    const url = window.prompt('Enter URL (https://...)')
    if (!url) return
    const safeUrl = normalizeUrl(url)
    const anchorText = selected || window.prompt('Anchor text', 'Click here') || 'link'
    const md = `[${anchorText}](${safeUrl})`
    if (!el) {
      block.content.text = (original ? original + ' ' : '') + md
    } else {
      block.content.text =
        original.slice(0, selectionStart) + md + original.slice(selectionEnd)
      nextTick(()=>{
        const pos = selectionStart + md.length
        el.focus()
        el.setSelectionRange(pos,pos)
      })
    }
  })
}
function normalizeUrl(url){
  if(!/^https?:\/\//i.test(url)) return 'https://' + url
  return url
}

/* BLOCK HELPERS */
function addBlockFromSelector() {
  if (!newBlockType.value) return
  quickAdd(newBlockType.value)
  newBlockType.value = ''
}
function addParagraphBlock(){ blocks.value.push(makeBlock('paragraph',{ text:'' })); reorderBlockPositions() }
function addMediaBlock(mediaType){ blocks.value.push(makeBlock('media',{ mediaType, url:'', caption:'', file:null })); reorderBlockPositions() }
function addCalloutBlock(){ blocks.value.push(makeBlock('callout',{ variant:'general', text:'' })); reorderBlockPositions() }
function addCtaBlock(){ blocks.value.push(makeBlock('cta',{ style:'template1', heading:'', body:'', buttonText:'', buttonUrl:'' })); reorderBlockPositions() }
function addBulletsBlock(){ blocks.value.push(makeBlock('bullets',{ items:[] })); reorderBlockPositions() }
function makeBlock(type, content){
  return { id:null, type, content:JSON.parse(JSON.stringify(content)), position:blocks.value.length, localKey:Math.random().toString(36).slice(2) }
}
function removeBlock(i){ blocks.value.splice(i,1); reorderBlockPositions() }
function moveBlock(i,delta){
  const ni=i+delta
  if(ni<0 || ni>=blocks.value.length) return
  const [it]=blocks.value.splice(i,1)
  blocks.value.splice(ni,0,it)
  reorderBlockPositions()
  scrollAddBarIntoView()
}
function duplicateBlock(i){
  const clone = makeBlock(blocks.value[i].type, blocks.value[i].content)
  blocks.value.splice(i+1,0,clone)
  reorderBlockPositions()
  scrollAddBarIntoView()
}
function reorderBlockPositions(){ blocks.value.forEach((b,i)=> b.position=i) }
function labelFor(block){
  if(block.type==='media') return `Media (${block.content.mediaType})`
  if(block.type==='callout') return `Callout (${block.content.variant})`
  if(block.type==='cta') return `CTA (${block.content.style})`
  return block.type.charAt(0).toUpperCase()+block.type.slice(1)
}

/* BULLETS */
function addBullet(block){ block.content.items.push('') }
function removeBullet(block,i){ block.content.items.splice(i,1) }
function moveBullet(block,i,delta){
  const ni=i+delta
  if(ni<0 || ni>=block.content.items.length) return
  const [it]=block.content.items.splice(i,1)
  block.content.items.splice(ni,0,it)
}
function onBulletDragStart(e, block, index){
  bulletDrag.blockLocalKey = block.localKey
  bulletDrag.draggingIndex = index
  e.dataTransfer.effectAllowed='move'
}
function onBulletDragEnter(e, block, index){
  if(bulletDrag.blockLocalKey!==block.localKey) return
  bulletDrag.overIndex=index
}
function onBulletsDragOver(e){ e.preventDefault() }
function onBulletsDrop(e, block){
  if(bulletDrag.blockLocalKey!==block.localKey) return
  const { draggingIndex, overIndex } = bulletDrag
  if(draggingIndex===null || overIndex===null || draggingIndex===overIndex) { resetBulletDrag(); return }
  const arr=block.content.items
  const [it]=arr.splice(draggingIndex,1)
  arr.splice(overIndex,0,it)
  resetBulletDrag()
}
function onBulletDragEnd(){ resetBulletDrag() }
function resetBulletDrag(){
  bulletDrag.blockLocalKey=null
  bulletDrag.draggingIndex=null
  bulletDrag.overIndex=null
}

/* MEDIA BLOCK FILE */
function onMediaFileChange(e, block){
  const file=e.target.files?.[0]
  if(file){
    block.content.file=file
    block.content.url=''
  }
}
function mediaPreview(block){
  if(block.type!=='media') return null
  if(block.content.mediaType!=='image') return null
  if(block.content.file) return URL.createObjectURL(block.content.file)
  return block.content.url || null
}

/* LEGACY ASSETS */
function addAsset(type){
  assets.value.push({
    id:null,type,
    file:null,
    url:type==='video'?'':'',
    caption:'',
    position:assets.value.length,
    localKey:Math.random().toString(36).slice(2)
  })
}
function removeAsset(i){ assets.value.splice(i,1); reorderAssetPositions() }
function reorderAssetPositions(){ assets.value.forEach((a,i)=> a.position=i) }
function onAssetFile(e, asset){
  const file=e.target.files[0]
  if(file){ asset.file=file; asset.url=null }
}
function assetPreview(asset){
  if(asset.type!=='image') return null
  if(asset.file) return URL.createObjectURL(asset.file)
  return asset.url
}

/* RELATED */
function addRelatedBlog(){
  if(relatedBlogs.value.length<4){
    relatedBlogs.value.push({
      blogId:'',
      position:relatedBlogs.value.length,
      localKey:Math.random().toString(36).slice(2)
    })
  }
}
function removeRelatedBlog(i){ relatedBlogs.value.splice(i,1); reorderRelatedPositions() }
function reorderRelatedPositions(){ relatedBlogs.value.forEach((r,i)=> r.position=i) }
function onRelatedBlogChange(){}
function isRelatedBlogSelected(id,current){
  return relatedBlogs.value.some((r,i)=> r.blogId===id && i!==current)
}

/* COVER */
function onCoverChange(e){
  const file=e.target.files[0]
  if(file){
    form.coverFile=file
    coverPreview.value=URL.createObjectURL(file)
  }
}
function removeCover(){
  form.coverFile=null
  form.cover_url=null
  coverPreview.value=null
}

/* SCHEDULING */
function confirmSchedule(){
  if(!scheduledDateTime.value) return
  showScheduleModal.value=false
  showConfirmModal.value=true
}
async function publishScheduled(){
  if(!scheduledDateTime.value) return
  const scheduledDate=new Date(scheduledDateTime.value).toISOString()
  await submit(true, scheduledDate)
  showConfirmModal.value=false
  scheduledDateTime.value=''
}
async function saveDraft(){ await submit(false) }
async function publish(){ await submit(true) }

/* SUBMIT */
async function submit(publishNow, toBePublishedDate=null){
  saving.value=true
  try {
    const paragraphTexts = blocks.value
      .filter(b=>b.type==='paragraph')
      .map(b=>(b.content.text||'').trim())
      .filter(Boolean)
    form.body = paragraphTexts.join('\n\n')
    const payload = {
      id: form.id,
      title: form.title,
      template: form.template,
      body: form.body,
      coverFile: form.coverFile,
      cover_url: form.cover_url,
      status: form.status,
      published_at: form.published_at,
      to_be_published_date: toBePublishedDate,
      assets: assets.value.map(a=>({
        id:a.id, type:a.type, file:a.file, url:a.url, caption:a.caption, position:a.position
      })),
      relatedBlogs: relatedBlogs.value
        .filter(r=>r.blogId)
        .map(r=>({ id:r.id, related_blog_id:r.blogId, position:r.position })),
      blocks: blocks.value.map(b=>({
        id:b.id,
        type:b.type,
        position:b.position,
        content:b.content
      }))
    }
    const saved = await save(payload, { publishNow, toBePublishedDate })
    if(!form.id){
      form.id=saved.id
      router.replace({ name:'DashboardBlogEdit', params:{ id:saved.id } })
    }
  } catch(e) {
    console.error(e)
  } finally {
    saving.value=false
  }
}

/* DRAG HANDLERS - BLOCKS */
function onBlockDragStart(e, index){
  dragState.draggingIndex=index
  dragState.overIndex=index
  e.dataTransfer.effectAllowed='move'
  try { e.dataTransfer.setData('text/plain', String(index)) } catch(_) {}
}
function onBlockDragEnter(e, index){
  dragState.overIndex=index
}
function onBlocksDragOver(e){ e.preventDefault() }
function onBlocksDrop(){
  if(dragState.draggingIndex===null || dragState.overIndex===null) { resetBlockDrag(); return }
  if(dragState.draggingIndex !== dragState.overIndex){
    const arr=blocks.value
    const [item]=arr.splice(dragState.draggingIndex,1)
    arr.splice(dragState.overIndex,0,item)
    reorderBlockPositions()
  }
  resetBlockDrag()
  scrollAddBarIntoView()
}
function onBlockDragEnd(){ resetBlockDrag() }
function resetBlockDrag(){
  dragState.draggingIndex=null
  dragState.overIndex=null
}

/* DRAG HANDLERS - ASSETS */
function onAssetDragStart(e,index){
  assetDrag.draggingIndex=index
  assetDrag.overIndex=index
  e.dataTransfer.effectAllowed='move'
}
function onAssetDragEnter(e,index){ assetDrag.overIndex=index }
function onAssetsDragOver(e){ e.preventDefault() }
function onAssetsDrop(){
  if(assetDrag.draggingIndex===null || assetDrag.overIndex===null){ resetAssetDrag(); return }
  if(assetDrag.draggingIndex!==assetDrag.overIndex){
    const arr=assets.value
    const [it]=arr.splice(assetDrag.draggingIndex,1)
    arr.splice(assetDrag.overIndex,0,it)
    reorderAssetPositions()
  }
  resetAssetDrag()
}
function onAssetDragEnd(){ resetAssetDrag() }
function resetAssetDrag(){ assetDrag.draggingIndex=null; assetDrag.overIndex=null }

/* DRAG HANDLERS - RELATED */
function onRelatedDragStart(e,index){
  relationDrag.draggingIndex=index
  relationDrag.overIndex=index
  e.dataTransfer.effectAllowed='move'
}
function onRelatedDragEnter(e,index){ relationDrag.overIndex=index }
function onRelatedDragOver(e){ e.preventDefault() }
function onRelatedDrop(){
  if(relationDrag.draggingIndex===null || relationDrag.overIndex===null){ resetRelationDrag(); return }
  if(relationDrag.draggingIndex!==relationDrag.overIndex){
    const arr=relatedBlogs.value
    const [it]=arr.splice(relationDrag.draggingIndex,1)
    arr.splice(relationDrag.overIndex,0,it)
    reorderRelatedPositions()
  }
  resetRelationDrag()
}
function onRelatedDragEnd(){ resetRelationDrag() }
function resetRelationDrag(){ relationDrag.draggingIndex=null; relationDrag.overIndex=null }
</script>

<style scoped>
/* --- Buttons & Inputs (unchanged core) --- */
.btn-base {
  color:#fff;
  font-size:.75rem;
  font-weight:600;
  letter-spacing:.05em;
  text-transform:uppercase;
  padding:.5rem 1rem;
  border:none;
  border-radius:.5rem;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  gap:.4rem;
  transition:background .18s, opacity .18s;
  background:#475569;
}
.btn-base.btn-slate { background:#475569; }
.btn-base.btn-slate:hover { background:#334155; }
.btn-base.btn-blue { background:#2563eb; }
.btn-base.btn-blue:hover { background:#1d4ed8; }
.btn-base.btn-blue-dark { background:#1d4ed8; }
.btn-base.btn-blue-dark:hover { background:#1e40af; }
.btn-base.btn-green { background:#16a34a; }
.btn-base.btn-green:hover { background:#15803d; }

button:disabled { cursor:not-allowed; }

.btn-small {
  font-size:.7rem;
  padding:.35rem .55rem;
  font-weight:600;
  border:none;
  border-radius:.4rem;
  cursor:pointer;
  transition:background .18s;
}

.input, .input-xs, .textarea, .textarea-sm, select {
  background:#f1f5f9;
  border:1px solid #cbd5e1;
  border-radius:.5rem;
  padding:.5rem .75rem;
  font-size:.875rem;
  font-family:inherit;
  transition:border-color .18s, box-shadow .18s, background .18s;
}
.input:focus, .input-xs:focus, .textarea:focus, .textarea-sm:focus, select:focus {
  outline:none;
  border-color:#334155;
  box-shadow:0 0 0 2px #33415522;
  background:#ffffff;
}
.input--sm { padding:.35rem .6rem; font-size:.75rem; }

.input-xs, .select-xs {
  padding:.35rem .45rem;
  font-size:.7rem;
  line-height:1.1;
  border-radius:.4rem;
}

.textarea {
  resize:vertical;
  line-height:1.5;
  font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size:.8rem;
  min-height:5rem;
}
.textarea--sm {
  font-size:.7rem;
}

.lbl, .lbl-inline {
  font-size:.65rem;
  font-weight:600;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:#334155;
}
.lbl-inline {
  display:flex;
  align-items:center;
  gap:.4rem;
}

.hint {
  margin:0;
  font-size:.68rem;
  line-height:1.1;
  color:#64748b;
}
.sub-hint {
  font-size:.65rem;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:#64748b;
  margin:0;
}

.panel {
  background:rgba(248,250,252,0.7);
  border:1px solid #e2e8f0;
  border-radius:1rem;
  padding:1rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  backdrop-filter:blur(4px);
  position:relative;
}
.panel--blocks {
  padding-bottom:4.25rem; /* space for bottom bar */
}

.panel-title {
  margin:0;
  font-size:1rem;
  font-weight:600;
  color:#1e293b;
}

.panel-header-top {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  flex-wrap:wrap;
  gap:1rem;
}

.blocks-scroll {
  max-height:65vh;
  overflow:auto;
  padding-right:.25rem;
  scrollbar-width:thin;
}
.blocks-scroll::-webkit-scrollbar {
  width:8px;
}
.blocks-scroll::-webkit-scrollbar-track {
  background:transparent;
}
.blocks-scroll::-webkit-scrollbar-thumb {
  background:#cbd5e1;
  border-radius:4px;
}
.blocks-scroll:hover::-webkit-scrollbar-thumb {
  background:#94a3b8;
}

/* Bottom Add Block Bar */
.add-block-bar {
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  border-top:1px solid #e2e8f0;
  background:linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
  backdrop-filter:blur(6px);
  padding:.75rem 1rem;
  border-bottom-left-radius:1rem;
  border-bottom-right-radius:1rem;
}
.add-block-inner {
  display:flex;
  gap:.5rem;
  flex-wrap:wrap;
  align-items:center;
}
.add-block-select {
  min-width:170px;
}
.add-block-btn {
  white-space:nowrap;
  font-size:.65rem;
  letter-spacing:.08em;
}
.quick-add {
  display:flex;
  gap:.35rem;
  margin-left:.5rem;
}
.quick-btn {
  background:#e2e8f0;
  border:none;
  padding:.35rem .55rem;
  font-size:.6rem;
  letter-spacing:.05em;
  text-transform:uppercase;
  font-weight:600;
  border-radius:.4rem;
  cursor:pointer;
  color:#334155;
  transition:background .15s;
}
.quick-btn:hover {
  background:#cbd5e1;
}

/* Blocks */
.block-wrapper {
  border:1px solid #cbd5e1;
  border-radius:.9rem;
  background:#fff;
  box-shadow:0 2px 4px -2px rgba(0,0,0,0.08);
  transition:background .15s, border-color .15s, box-shadow .15s;
  position:relative;
}
.block-wrapper.dragging {
  opacity:.55;
  border-style:dashed;
}
.block-wrapper.drag-over:not(.dragging) {
  border-color:#2563eb;
  box-shadow:0 0 0 2px #2563eb33;
}

.block-header {
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:#f1f5f9;
  padding:.4rem .75rem;
  gap:.75rem;
}

.drag-handle, .drag-handle-bullet {
  cursor:grab;
  color:#94a3b8;
  font-size:.95rem;
  user-select:none;
  line-height:1;
  transition:color .15s;
}
.drag-handle:hover, .drag-handle-bullet:hover {
  color:#475569;
}
.drag-handle-bullet { margin-top:.15rem; }

.block-label {
  font-size:.65rem;
  font-weight:600;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:#475569;
}
.idx {
  font-size:.65rem;
  color:#94a3b8;
}
.drag-indicator {
  font-size:.65rem;
  color:#2563eb;
  font-weight:600;
  letter-spacing:.03em;
}

.btn-xxs, .btn-xxs-alt {
  background:#e2e8f0;
  color:#1e293b;
  font-size:.65rem;
  padding:.25rem .45rem;
  border:none;
  border-radius:.4rem;
  cursor:pointer;
  line-height:1;
  font-weight:500;
  display:inline-flex;
  align-items:center;
  transition:background .15s;
}
.btn-xxs:hover, .btn-xxs-alt:hover {
  background:#cbd5e1;
}
.btn-xxs:disabled {
  opacity:.4;
  cursor:not-allowed;
}
.btn-xxs--danger {
  background:#dc2626;
  color:#fff;
}
.btn-xxs--danger:hover {
  background:#b91c1c;
}

.btn-xxs-alt--primary {
  background:#1d4ed8;
  color:#fff;
}
.btn-xxs-alt--primary:hover {
  background:#1e40af;
}

/* Assets / Related */
.asset-row, .related-row {
  background:#fff;
  border:1px solid #e2e8f0;
  border-radius:.85rem;
  padding:.75rem;
  display:grid;
  gap:.5rem;
  align-items:center;
  box-shadow:0 1px 3px rgba(0,0,0,.05);
  position:relative;
}
.asset-row {
  grid-template-columns:24px 110px 1fr 1fr auto 80px;
}
.related-row {
  grid-template-columns:24px 1fr auto;
}

.asset-row.drag-over, .related-row.drag-over {
  border-color:#2563eb;
  box-shadow:0 0 0 2px #2563eb33;
}

.thumb {
  max-width:70px;
  max-height:55px;
  object-fit:cover;
  border-radius:.4rem;
  border:1px solid #cbd5e1;
}

/* Bullets */
.bullet-item {
  border:1px solid #e2e8f0;
  padding:.5rem;
  border-radius:.6rem;
  background:#fff;
  position:relative;
  display:flex;
  gap:.4rem;
}
.bullet-item.drag-over {
  border-color:#2563eb;
  box-shadow:0 0 0 2px #2563eb33;
}

/* Modals */
.modal-mask {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.5);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:50;
  padding:1rem;
}
.modal {
  background:#fff;
  border-radius:1rem;
  padding:1.5rem;
  width:100%;
  max-width:28rem;
  box-shadow:0 10px 25px -5px rgba(0,0,0,.15);
}
.modal-title {
  margin:0 0 1rem;
  font-size:1.125rem;
  font-weight:700;
  color:#1e293b;
}

.space-y-3 > * + * { margin-top:.75rem; }

/* Utility-ish replacements (selected) */
.flex { display:flex; }
.inline-flex { display:inline-flex; }
.flex-1 { flex:1; }
.flex-col { flex-direction:column; }
.flex-wrap { flex-wrap:wrap; }
.items-center { align-items:center; }
.items-start { align-items:flex-start; }
.justify-between { justify-content:space-between; }
.justify-end { justify-content:flex-end; }
.gap-1 { gap:.25rem; }
.gap-2 { gap:.5rem; }
.gap-3 { gap:.75rem; }
.gap-4 { gap:1rem; }
.mt-2 { margin-top:.5rem; }
.p-4 { padding:1rem; }

.grid { display:grid; }
.grid-cols-1 { grid-template-columns:1fr; }
.md\:grid-cols-2 { grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }
@media (min-width:768px){
  .md\:grid-cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
}

.rounded-3xl { border-radius:1.5rem; }

.bg-white\/85 { background:rgba(255,255,255,0.85); }
.border { border:1px solid #e2e8f0; }
.border-slate-200 { border-color:#e2e8f0; }
.shadow-xl { box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1); }
.backdrop-blur-sm { backdrop-filter:blur(4px); }
.text-red-600 { color:#dc2626; }

.text-xs { font-size:.75rem; }

.uppercase { text-transform:uppercase; }
.font-semibold { font-weight:600; }

.disabled\:opacity-50:disabled { opacity:.5; }
.disabled\:cursor-default:disabled { cursor:default; }

.bg-red-600 { background:#dc2626; }
.bg-red-600:hover { background:#b91c1c; }

.bg-white { background:#fff; }
.text-white { color:#fff; }

.text-slate-600 { color:#475569; }
.text-slate-800 { color:#1e293b; }

.border-slate-100 { border-color:#f1f5f9; }
.border-slate-300 { border-color:#cbd5e1; }

.rounded-xl { border-radius:.75rem; }
.rounded-2xl { border-radius:1rem; }

.shadow-lg { box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1); }

/* Focus outline for accessibility */
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline:2px solid #2563eb;
  outline-offset:2px;
}

/* Responsive tweak: bottom bar condense */
@media (max-width:640px){
  .add-block-inner { flex-direction:column; align-items:stretch; }
  .quick-add { margin-left:0; }
  .add-block-select, .add-block-btn { width:100%; }
  .quick-add { width:100%; justify-content:flex-start; flex-wrap:wrap; }
}
</style>