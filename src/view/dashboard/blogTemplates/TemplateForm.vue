<template>
    <div class="p-6 space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-slate-100">
          {{ isEdit ? 'Edit Template' : 'New Template' }}
        </h1>
        <div class="flex gap-2">
          <router-link
            :to="{ name: 'BlogTemplates' }"
            class="rounded-md bg-slate-600 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
          >
            Back
          </router-link>
          <button
            @click="saveTemplate"
            :disabled="saving"
            class="rounded-md bg-indigo-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
          <button
            v-if="isEdit"
            @click="openDeleteModal"
            :disabled="saving"
            class="rounded-md bg-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-red-500 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
  
      <div v-if="loading" class="text-slate-400 text-sm">Loading...</div>
  
      <div class="grid gap-6 md:grid-cols-2">
        <div class="flex flex-col gap-4">
          <label class="flex flex-col gap-1 text-xs">
            <span class="font-semibold uppercase tracking-wide text-slate-300">Name *</span>
            <input
              v-model="form.name"
              class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:outline-none"
              placeholder="Readable template name"
            />
          </label>
          <label class="flex flex-col gap-1 text-xs">
            <span class="font-semibold uppercase tracking-wide text-slate-300">Code *</span>
            <input
              v-model="form.code"
              class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:outline-none"
              placeholder="Unique code (e.g. template_1)"
            />
          </label>
          <label class="flex flex-col gap-1 text-xs">
            <span class="font-semibold uppercase tracking-wide text-slate-300">Description</span>
            <textarea
              v-model="form.description"
              rows="3"
              class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:outline-none"
            ></textarea>
          </label>
  
          <!-- Add Block -->
          <div class="flex gap-2 items-end">
            <label class="flex flex-col gap-1 text-xs flex-1">
              <span class="font-semibold uppercase tracking-wide text-slate-300">Add Block Type</span>
              <select
                v-model="newBlock"
                class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-slate-400 focus:outline-none"
              >
                <option disabled value="">-- Choose --</option>
                <option value="paragraph">Paragraph</option>
                <option value="media-image">Image</option>
                <option value="media-video">Video</option>
                <option value="callout">Callout</option>
                <option value="cta">CTA</option>
                <option value="bullets">Bullets</option>
              </select>
            </label>
            <button
              type="button"
              :disabled="!newBlock"
              @click="addBlock"
              class="rounded-md bg-indigo-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-indigo-500 disabled:opacity-40"
            >
              + Add
            </button>
          </div>
          <p class="text-[10px] text-slate-400">
            Order matters. Only structural defaults are saved; blog instances can still modify content.
          </p>
        </div>
  
        <!-- Block List -->
        <div class="space-y-3">
          <h2 class="text-sm font-semibold text-slate-100">Blocks ({{ form.blocks.length }})</h2>
          <div
            v-if="!form.blocks.length"
            class="text-xs text-slate-500 italic"
          >No blocks yet.</div>
          <div
            v-for="(b,i) in form.blocks"
            :key="b.localKey"
            class="flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2"
            draggable="true"
            @dragstart="onDragStart($event,i)"
            @dragenter.prevent="onDragEnter($event,i)"
            @dragend="onDragEnd"
            @dragover.prevent
          >
            <span class="cursor-grab text-slate-500">⋮⋮</span>
            <span class="text-[11px] font-mono text-slate-200 flex-1">
              {{ i+1 }}. {{ blockLabel(b) }}
            </span>
            <button
              type="button"
              class="rounded bg-slate-600 px-2 py-1 text-[10px] text-slate-100 hover:bg-slate-500"
              :disabled="i===0"
              @click="move(i,-1)"
            >↑</button>
            <button
              type="button"
              class="rounded bg-slate-600 px-2 py-1 text-[10px] text-slate-100 hover:bg-slate-500"
              :disabled="i===form.blocks.length-1"
              @click="move(i,1)"
            >↓</button>
            <button
              type="button"
              class="rounded bg-red-600 px-2 py-1 text-[10px] text-white hover:bg-red-500"
              @click="remove(i)"
            >✕</button>
          </div>
        </div>
      </div>
  
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
  
      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
        @click.self="closeDeleteModal"
      >
        <div
          class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 shadow-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="deleteTemplateFormTitle"
        >
          <div class="px-6 py-5 space-y-5">
            <div>
              <h2 id="deleteTemplateFormTitle" class="text-lg font-semibold text-slate-100">
                Delete Template
              </h2>
              <p class="mt-2 text-sm text-slate-300">
                Are you sure you want to delete
                <span class="font-semibold text-slate-100">"{{ form.name }}"</span>?
                This cannot be undone.
              </p>
            </div>
            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="rounded-md bg-slate-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                @click="closeDeleteModal"
                :disabled="savingDelete"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-md bg-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-red-500 disabled:opacity-50"
                @click="confirmDelete"
                :disabled="savingDelete"
              >
                {{ savingDelete ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useBlogs } from '../../../composables/useBlogs'
  
  const route = useRoute()
  const router = useRouter()
  const templateId = route.params.id
  const isEdit = computed(()=> !!templateId)
  
  const {
    loadBlockTemplate,
    saveBlockTemplate,
    deleteBlockTemplate,
    currentTemplate,
    loading,
    error
  } = useBlogs()
  
  const form = reactive({
    id: null,
    name: '',
    code: '',
    description: '',
    blocks: []
  })
  const newBlock = ref('')
  const saving = ref(false)
  
  /* Delete modal state */
  const showDeleteModal = ref(false)
  const savingDelete = ref(false)
  
  function openDeleteModal() {
    if (!form.id) return
    showDeleteModal.value = true
    trapFocus()
  }
  function closeDeleteModal() {
    if (savingDelete.value) return
    showDeleteModal.value = false
    releaseFocus()
  }
  async function confirmDelete() {
    if (!form.id) return
    savingDelete.value = true
    try {
      await deleteBlockTemplate(form.id)
      closeDeleteModal()
      router.push({ name: 'BlogTemplates' })
    } finally {
      savingDelete.value = false
    }
  }
  
  /* Drag state */
  const drag = reactive({ draggingIndex: null, overIndex: null })
  
  onMounted(async ()=>{
    if (isEdit.value) {
      await loadBlockTemplate(templateId)
      if (currentTemplate.value) {
        Object.assign(form, {
          id: currentTemplate.value.id,
          name: currentTemplate.value.name,
          code: currentTemplate.value.code,
          description: currentTemplate.value.description,
          blocks: (currentTemplate.value.blocks || []).map((b,i)=> ({
            type: b.type,
            content: b.content || {},
            localKey: Math.random().toString(36).slice(2)
          }))
        })
      }
    }
  })
  
  function addBlock() {
    if (!newBlock.value) return
    const meta = newBlock.value
    let type
    let content = {}
    if (meta.startsWith('media-')) {
      type = 'media'
      content.mediaType = meta.split('-')[1] === 'video' ? 'video' : 'image'
    } else {
      type = meta
    }
    form.blocks.push({
      type,
      content,
      localKey: Math.random().toString(36).slice(2)
    })
    newBlock.value = ''
  }
  
  function blockLabel(b){
    if(b.type==='media') return `media (${b.content.mediaType || 'image'})`
    return b.type
  }
  
  function move(i,delta) {
    const ni = i+delta
    if (ni<0 || ni>=form.blocks.length) return
    const [it] = form.blocks.splice(i,1)
    form.blocks.splice(ni,0,it)
  }
  
  function remove(i) {
    form.blocks.splice(i,1)
  }
  
  function onDragStart(e,i){
    drag.draggingIndex=i
    drag.overIndex=i
    e.dataTransfer.effectAllowed='move'
  }
  function onDragEnter(e,i){
    drag.overIndex=i
    const { draggingIndex, overIndex } = drag
    if (draggingIndex===null || overIndex===null || draggingIndex===overIndex) return
    const [it] = form.blocks.splice(draggingIndex,1)
    form.blocks.splice(overIndex,0,it)
    drag.draggingIndex=overIndex
  }
  function onDragEnd(){
    drag.draggingIndex=null
    drag.overIndex=null
  }
  
  async function saveTemplate() {
    saving.value=true
    try {
      const payload = {
        id: form.id,
        name: form.name,
        code: form.code,
        description: form.description,
        blocks: form.blocks.map((b,i)=> ({
          type: b.type,
          content: b.content || {}
        }))
      }
      const saved = await saveBlockTemplate(payload)
      if (!form.id) {
        router.replace({ name: 'BlogTemplateEdit', params: { id: saved.id } })
      }
    } finally {
      saving.value=false
    }
  }
  
  /* Simple focus trap for modal */
  let previousActive = null
  function trapFocus() {
    previousActive = document.activeElement
    requestAnimationFrame(()=>{
      const modal = document.querySelector('[role="dialog"]')
      if (modal) {
        const focusable = modal.querySelector('button, a')
        focusable?.focus()
      }
    })
    document.addEventListener('keydown', onKeydown)
  }
  function releaseFocus() {
    document.removeEventListener('keydown', onKeydown)
    if (previousActive instanceof HTMLElement && !showDeleteModal.value) {
      previousActive.focus()
      previousActive = null
    }
  }
  function onKeydown(e) {
    if (e.key === 'Escape' && showDeleteModal.value) {
      closeDeleteModal()
    }
  }
  
  onBeforeUnmount(()=> {
    releaseFocus()
  })
  </script>
  
  <style scoped>
  @keyframes fade-in {
    from { opacity:0; transform: translateY(4px); }
    to { opacity:1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.18s ease-out;
  }
  </style>