<template>
  <div class="editor-shell">
    <header class="editor-top">
      <h2 class="title">{{ isEdit ? 'Edit Blog' : 'New Blog' }}</h2>
      <div class="btn-group">
        <button @click="saveDraft" :disabled="saving" class="btn">
          {{ saving ? 'Saving...' : 'Save Draft' }}
        </button>
        <button @click="publish" :disabled="saving" class="btn accent">
          {{ saving ? 'Publishing…' : 'Publish' }}
        </button>
      </div>
    </header>

    <form @submit.prevent="saveDraft" class="editor-form">
      <div class="grid-two">
        <div class="field">
          <label>Title *</label>
          <input v-model="form.title" required maxlength="140" />
        </div>
        <div class="field">
          <label>Template</label>
          <select v-model="form.template">
            <option value="basic">Basic</option>
            <option value="gallery">Gallery</option>
            <option value="feature">Feature</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label>Cover Image</label>
        <input type="file" accept="image/*" @change="onCoverChange" />
        <div v-if="coverPreview" class="cover-preview">
          <img :src="coverPreview" alt="Cover preview" />
          <button type="button" class="mini-btn danger" @click="removeCover">Remove</button>
        </div>
      </div>

      <div class="field">
        <label>Body</label>
        <textarea v-model="form.body" rows="12" placeholder="Write your article content..."></textarea>
      </div>

      <!-- Gallery -->
      <div v-if="form.template === 'gallery'" class="template-section">
        <h3>Gallery Images</h3>
        <div class="assets">
          <div v-for="(asset, idx) in assets" :key="asset.localKey" class="asset-row">
            <span class="drag-handle">::</span>
            <select v-model="asset.type" disabled>
              <option value="image">Image</option>
            </select>
            <input type="file" accept="image/*" @change="onAssetFile($event, asset)" />
            <input v-model="asset.caption" placeholder="Caption" />
            <button type="button" class="mini-btn danger" @click="removeAsset(idx)">✕</button>
            <div v-if="assetPreview(asset)" class="thumb">
              <img :src="assetPreview(asset)" />
            </div>
          </div>
          <button type="button" class="mini-btn add" @click="addAsset('image')">+ Add Image</button>
        </div>
      </div>

      <!-- Feature -->
      <div v-else-if="form.template === 'feature'" class="template-section">
        <h3>Feature Media</h3>
        <p class="hint">One optional video & images.</p>
        <div class="assets">
          <div v-for="(asset, idx) in assets" :key="asset.localKey" class="asset-row">
            <span class="drag-handle">::</span>
            <select v-model="asset.type">
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input
              v-if="asset.type === 'video'"
              v-model="asset.url"
              placeholder="Video URL (YouTube or MP4)"
            />
            <template v-else>
              <input type="file" accept="image/*" @change="onAssetFile($event, asset)" />
            </template>
            <input v-model="asset.caption" placeholder="Caption" />
            <button type="button" class="mini-btn danger" @click="removeAsset(idx)">✕</button>
            <div v-if="asset.type==='image' && assetPreview(asset)" class="thumb">
              <img :src="assetPreview(asset)" />
            </div>
          </div>
          <div class="add-row">
            <button type="button" class="mini-btn add" @click="addAsset('image')">+ Image</button>
            <button
              type="button"
              class="mini-btn add"
              @click="addAsset('video')"
              :disabled="hasVideo"
              title="Only one video allowed"
            >+ Video</button>
          </div>
        </div>
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogs } from '../../../composables/useBlogs'

const route = useRoute()
const router = useRouter()
const blogId = route.params.id
const isEdit = computed(() => !!blogId)
const { loadBlog, currentBlog, save, error } = useBlogs()

const form = reactive({
  id: null,
  title: '',
  template: 'basic',
  body: '',
  coverFile: null,
  cover_url: null,
  status: 'draft',
  published_at: null
})

const assets = ref([])
const saving = ref(false)
const coverPreview = ref(null)

onMounted(async () => {
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
        published_at: currentBlog.value.published_at
      })
      coverPreview.value = form.cover_url
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
    }
  }
})

function onCoverChange(e) {
  const file = e.target.files[0]
  if (file) {
    form.coverFile = file
    coverPreview.value = URL.createObjectURL(file)
  }
}
function removeCover() {
  form.coverFile = null
  form.cover_url = null
  coverPreview.value = null
}
function addAsset(type) {
  assets.value.push({
    id: null,
    type,
    file: null,
    url: type === 'video' ? '' : null,
    caption: '',
    position: assets.value.length,
    localKey: Math.random().toString(36).slice(2)
  })
}
function removeAsset(idx) {
  assets.value.splice(idx, 1)
  reorderPositions()
}
function reorderPositions() {
  assets.value.forEach((a,i)=> a.position = i)
}
function onAssetFile(e, asset) {
  const file = e.target.files[0]
  if (file) {
    asset.file = file
    asset.url = null
  }
}
function assetPreview(asset) {
  if (asset.type !== 'image') return null
  if (asset.file) return URL.createObjectURL(asset.file)
  return asset.url
}
const hasVideo = computed(() => assets.value.some(a => a.type === 'video'))

async function saveDraft() {
  await submit(false)
}
async function publish() {
  await submit(true)
}
async function submit(publishNow) {
  saving.value = true
  try {
    const payload = {
      id: form.id,
      title: form.title,
      template: form.template,
      body: form.body,
      coverFile: form.coverFile,
      cover_url: form.cover_url,
      status: form.status,
      published_at: form.published_at,
      assets: assets.value.map(a => ({
        id: a.id,
        type: a.type,
        file: a.file,
        url: a.url,
        caption: a.caption,
        position: a.position
      }))
    }
    const saved = await save(payload, { publishNow })
    if (!form.id) {
      form.id = saved.id
      router.replace({ name: 'DashboardBlogEdit', params: { id: saved.id } })
    }
  } catch {
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.editor-shell {
  background:#ffffffd8;
  backdrop-filter:blur(8px);
  border:1px solid #00305622;
  border-radius:24px;
  padding:1.4rem 1.6rem 2rem;
  box-shadow:0 8px 28px -12px rgba(0,48,86,.35), 0 4px 12px -4px rgba(0,48,86,.25);
  display:flex;
  flex-direction:column;
  gap:1.25rem;
}

.editor-top {
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
  align-items:center;
  gap:1rem;
  border-bottom:1px solid #0030561f;
  padding-bottom:.6rem;
}

.title {
  margin:0;
  font-size:1.25rem;
  font-weight:700;
  color:#003056;
  letter-spacing:.5px;
}

.btn-group { display:flex; gap:.75rem; flex-wrap:wrap; }

.btn {
  background:#003056;
  color:#FBFBF7;
  border:none;
  padding:.6rem 1.05rem;
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.75px;
  text-transform:uppercase;
  border-radius:10px;
  cursor:pointer;
  transition:background .2s, transform .2s;
}
.btn:hover { background:#00263f; }
.btn:disabled { opacity:.55; cursor:default; }
.btn.accent {
  background:#004777;
}
.btn.accent:hover { background:#00385d; }

.editor-form {
  display:flex;
  flex-direction:column;
  gap:1.1rem;
}

.grid-two {
  display:grid;
  gap:1rem;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
}

.field {
  display:flex;
  flex-direction:column;
  gap:.4rem;
}
.field label {
  font-size:.7rem;
  text-transform:uppercase;
  letter-spacing:.9px;
  font-weight:600;
  color:#003056cc;
}
.field input,
.field select,
.field textarea {
  font:inherit;
  padding:.65rem .7rem;
  border:1px solid #00305633;
  border-radius:10px;
  background:#FBFBF7;
  transition:border-color .2s, box-shadow .2s;
  font-size:.85rem;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  outline:none;
  border-color:#003056;
  box-shadow:0 0 0 3px #00305633;
}

.cover-preview {
  margin-top:.6rem;
  position:relative;
  display:inline-block;
}
.cover-preview img {
  max-width:320px;
  border:1px solid #00305633;
  border-radius:14px;
  object-fit:cover;
  box-shadow:0 4px 10px -4px rgba(0,48,86,.3);
}
.mini-btn {
  background:#003056;
  color:#FBFBF7;
  border:none;
  cursor:pointer;
  font-size:.6rem;
  padding:.45rem .7rem;
  letter-spacing:.6px;
  font-weight:600;
  text-transform:uppercase;
  border-radius:8px;
  transition:background .2s;
}
.mini-btn.add { background:#004777; }
.mini-btn.add:hover { background:#00385d; }
.mini-btn.danger { background:#c51919; }
.mini-btn.danger:hover { background:#961010; }

.template-section {
  padding:1rem 1rem 1.25rem;
  background:#FBFBF7cc;
  border:1px solid #00305624;
  border-radius:18px;
  backdrop-filter:blur(4px);
  display:flex;
  flex-direction:column;
  gap:.9rem;
}
.template-section h3 {
  margin:0;
  font-size:1rem;
  font-weight:600;
  color:#003056;
}
.hint {
  margin:0;
  font-size:.65rem;
  letter-spacing:.6px;
  text-transform:uppercase;
  color:#003056a0;
}

.assets { display:flex; flex-direction:column; gap:.75rem; }

.asset-row {
  display:grid;
  gap:.55rem;
  grid-template-columns: 32px 110px 1fr 1fr auto 80px;
  align-items:center;
  padding:.6rem .7rem;
  background:#ffffff;
  border:1px solid #00305624;
  border-radius:14px;
  box-shadow:0 2px 6px -2px rgba(0,48,86,.18);
}
.asset-row select,
.asset-row input[type="file"],
.asset-row input {
  font:inherit;
  font-size:.7rem;
  padding:.4rem .5rem;
  border:1px solid #00305633;
  border-radius:8px;
  background:#FBFBF7;
}
.drag-handle {
  cursor:grab;
  font-size:.9rem;
  opacity:.55;
  user-select:none;
}
.thumb img {
  max-width:70px;
  max-height:55px;
  object-fit:cover;
  border-radius:8px;
  border:1px solid #00305633;
  box-shadow:0 2px 4px -2px rgba(0,48,86,.35);
}
.add-row {
  display:flex;
  gap:.6rem;
  flex-wrap:wrap;
}

.error-msg {
  color:#b30023;
  font-size:.75rem;
  margin-top:.5rem;
}
</style>