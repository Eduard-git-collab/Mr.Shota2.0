<template>
    <div class="p-6 space-y-6">
      <!-- Header / Create -->
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 class="text-xl font-semibold text-slate-100">Block Templates</h1>
        <router-link
          :to="{ name: 'BlogTemplateNew' }"
          class="self-start rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-indigo-500"
        >
          + New Template
        </router-link>
      </div>
  
      <!-- Filters -->
      <div class="rounded-xl border border-slate-700 bg-slate-800/70 p-4 space-y-4">
        <div class="grid gap-4 md:grid-cols-3">
          <label class="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
            Search (Name / Code)
            <input
              v-model="filters.search"
              type="text"
              placeholder="e.g. feature, template_1"
              class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:outline-none"
            />
          </label>
  
          <div class="grid grid-cols-2 gap-3">
            <label class="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
              Min Blocks
              <input
                v-model.number="filters.minBlocks"
                type="number"
                min="0"
                class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-slate-400 focus:outline-none"
              />
            </label>
            <label class="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
              Max Blocks
              <input
                v-model.number="filters.maxBlocks"
                type="number"
                min="0"
                class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-slate-400 focus:outline-none"
              />
            </label>
          </div>
  
          <div class="grid grid-cols-2 gap-3">
            <label class="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
              Created From
              <input
                v-model="filters.dateFrom"
                type="date"
                class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-slate-400 focus:outline-none"
              />
            </label>
            <label class="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
              Created To
              <input
                v-model="filters.dateTo"
                type="date"
                class="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-xs text-slate-100 focus:border-slate-400 focus:outline-none"
              />
            </label>
          </div>
        </div>
  
        <div class="flex flex-wrap items-center gap-3">
          <label class="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-300">
            Sort
            <select
              v-model="sort.key"
              class="rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 focus:border-slate-400 focus:outline-none"
            >
              <option value="created_at">Created Date</option>
              <option value="name">Name</option>
              <option value="blocks"># Blocks</option>
            </select>
          </label>
          <label class="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-300">
            Direction
            <select
              v-model="sort.dir"
              class="rounded-md border border-slate-600 bg-slate-700 px-2 py-1 text-[11px] text-slate-100 focus:border-slate-400 focus:outline-none"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </label>
          <button
            type="button"
            @click="resetFilters"
            class="rounded-md bg-slate-600 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
          >
            Reset
          </button>
          <div class="ml-auto text-[11px] text-slate-400">
            Showing {{ filteredTemplates.length }} / {{ templates.length }}
          </div>
        </div>
      </div>
  
      <!-- Table -->
      <div class="overflow-auto rounded-xl border border-slate-700 bg-slate-800/60">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-slate-800/80 text-[11px] uppercase tracking-wide text-slate-400">
            <tr>
              <th class="px-4 py-3 font-semibold">Name</th>
              <th class="px-4 py-3 font-semibold">Code</th>
              <th class="px-4 py-3 font-semibold">Blocks</th>
              <th class="px-4 py-3 font-semibold">Description</th>
              <th class="px-4 py-3 font-semibold whitespace-nowrap">Created</th>
              <th class="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="loading"
              class="text-slate-300"
            >
              <td colspan="6" class="px-4 py-6 text-center text-xs">Loading...</td>
            </tr>
              <tr
                v-else-if="!filteredTemplates.length"
                class="text-slate-400"
              >
                <td colspan="6" class="px-4 py-6 text-center text-xs italic">No templates match filters.</td>
              </tr>
            <tr
              v-for="t in filteredTemplates"
              :key="t.id"
              class="border-t border-slate-700/70 hover:bg-slate-700/30 transition"
            >
              <td class="px-4 py-3 align-top">
                <div class="flex flex-col">
                  <span class="font-medium text-slate-100 text-sm leading-tight">{{ t.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 align-top">
                <code class="text-[11px] bg-slate-700/70 px-2 py-1 rounded text-slate-300">
                  {{ t.code }}
                </code>
              </td>
              <td class="px-4 py-3 align-top">
                <span class="inline-flex items-center justify-center rounded bg-slate-700/60 px-2 py-1 text-[11px] font-semibold text-slate-200">
                  {{ (t.blocks || []).length }}
                </span>
              </td>
              <td class="px-4 py-3 align-top text-xs text-slate-300">
                {{ truncatedDescription(t.description) }}
              </td>
              <td class="px-4 py-3 align-top text-xs text-slate-400 whitespace-nowrap">
                {{ formatDate(t.created_at) }}
              </td>
              <td class="px-4 py-3 align-top">
                <div class="flex justify-end gap-2">
                  <button
                    type="button"
                    class="rounded bg-slate-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                    @click="openView(t)"
                  >
                    View
                  </button>
                  <router-link
                    :to="{ name: 'BlogTemplateEdit', params: { id: t.id } }"
                    class="rounded bg-indigo-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-indigo-500"
                  >
                    Edit
                  </router-link>
                  <button
                    type="button"
                    class="rounded bg-red-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-red-500"
                    @click="askDelete(t)"
                  >
                    Del
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
  
      <!-- View Modal -->
      <div
        v-if="viewing"
        class="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/70 backdrop-blur p-4"
        @click.self="closeView"
      >
        <div class="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-800 shadow-xl">
          <div class="flex items-start justify-between gap-4 border-b border-slate-700 px-6 py-4">
            <div>
              <h2 class="m-0 text-lg font-semibold text-slate-100 leading-tight">
                {{ viewing.name }}
              </h2>
              <p class="m-0 text-[11px] uppercase tracking-wide text-slate-400">
                {{ viewing.code }}
              </p>
            </div>
            <button
              type="button"
              @click="closeView"
              class="rounded bg-slate-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
            >
              Close
            </button>
          </div>
          <div class="px-6 py-5 space-y-6 max-h-[70vh] overflow-auto">
            <div v-if="viewing.description" class="space-y-1">
              <h3 class="text-[11px] font-semibold uppercase tracking-wide text-slate-300">Description</h3>
              <p class="text-sm text-slate-200 whitespace-pre-wrap">{{ viewing.description }}</p>
            </div>
  
            <div class="space-y-2">
              <h3 class="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                Blocks ({{ (viewing.blocks || []).length }})
              </h3>
              <ol class="list-decimal pl-4 space-y-1 text-xs text-slate-200">
                <li
                  v-for="(b, i) in viewing.blocks"
                  :key="i"
                  class="flex flex-wrap items-center gap-2"
                >
                  <span class="font-mono">{{ b.type }}</span>
                  <span
                    v-if="b.type==='media' && b.content?.mediaType"
                    class="rounded bg-slate-700/70 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300"
                  >
                    {{ b.content.mediaType }}
                  </span>
                  <span
                    v-if="b.type==='callout' && b.content?.variant"
                    class="rounded bg-slate-700/70 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300"
                  >
                    {{ b.content.variant }}
                  </span>
                  <span
                    v-if="b.type==='cta' && b.content?.style"
                    class="rounded bg-slate-700/70 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300"
                  >
                    {{ b.content.style }}
                  </span>
                </li>
              </ol>
            </div>
  
            <div class="grid grid-cols-2 gap-4 text-[11px] text-slate-400">
              <div>
                <span class="uppercase tracking-wide font-semibold text-slate-300">Created:</span>
                <div>{{ formatDateTime(viewing.created_at) }}</div>
              </div>
              <div v-if="viewing.updated_at">
                <span class="uppercase tracking-wide font-semibold text-slate-300">Updated:</span>
                <div>{{ formatDateTime(viewing.updated_at) }}</div>
              </div>
            </div>
  
            <div class="flex justify-end gap-3 pt-2">
              <router-link
                :to="{ name: 'BlogTemplateEdit', params: { id: viewing.id } }"
                class="rounded-md bg-indigo-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-indigo-500"
                @click="closeView"
              >
                Edit Template
              </router-link>
              <button
                type="button"
                class="rounded-md bg-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-red-500"
                @click="() => { closeView(); askDelete(viewing) }"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div
        v-if="deleteTarget"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
        @click.self="closeDeleteModal"
      >
        <div
          class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 shadow-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="deleteTemplateTitle"
        >
          <div class="px-6 py-5 space-y-5">
            <div>
              <h2 id="deleteTemplateTitle" class="text-lg font-semibold text-slate-100">
                Delete Template
              </h2>
              <p class="mt-2 text-sm text-slate-300">
                Are you sure you want to delete
                <span class="font-semibold text-slate-100">"{{ deleteTarget.name }}"</span>?
                This action cannot be undone.
              </p>
            </div>
  
            <div class="rounded-lg bg-slate-700/40 border border-slate-600 px-4 py-3 text-xs text-slate-300">
              <p class="m-0">
                Code: <code class="text-slate-100">{{ deleteTarget.code }}</code><br>
                Blocks: {{ (deleteTarget.blocks || []).length }}
              </p>
            </div>
  
            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="rounded-md bg-slate-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-500"
                @click="closeDeleteModal"
                :disabled="deleting"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-md bg-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="confirmDelete"
                :disabled="deleting"
              >
                {{ deleting ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
  import { useBlogs } from '../../../composables/useBlogs'
  
  const {
    listBlockTemplates,
    blockTemplates: templates,
    deleteBlockTemplate,
    loading,
    error
  } = useBlogs()
  
  /* Filters & Sorting */
  const filters = ref({
    search: '',
    minBlocks: null,
    maxBlocks: null,
    dateFrom: '',
    dateTo: ''
  })
  const sort = ref({ key: 'created_at', dir: 'desc' })
  
  function resetFilters() {
    filters.value = {
      search: '',
      minBlocks: null,
      maxBlocks: null,
      dateFrom: '',
      dateTo: ''
    }
    sort.value = { key: 'created_at', dir: 'desc' }
  }
  
  const filteredTemplates = computed(() => {
    let list = [...templates.value]
  
    // Search
    if (filters.value.search.trim()) {
      const term = filters.value.search.trim().toLowerCase()
      list = list.filter(t =>
        (t.name || '').toLowerCase().includes(term) ||
        (t.code || '').toLowerCase().includes(term)
      )
    }
  
    // Blocks count filters
    list = list.filter(t => {
      const count = (t.blocks || []).length
      if (filters.value.minBlocks != null && count < filters.value.minBlocks) return false
      if (filters.value.maxBlocks != null && count > filters.value.maxBlocks) return false
      return true
    })
  
    // Date range
    if (filters.value.dateFrom) {
      const fromTs = new Date(filters.value.dateFrom + 'T00:00:00Z').getTime()
      list = list.filter(t => new Date(t.created_at).getTime() >= fromTs)
    }
    if (filters.value.dateTo) {
      const toTs = new Date(filters.value.dateTo + 'T23:59:59Z').getTime()
      list = list.filter(t => new Date(t.created_at).getTime() <= toTs)
    }
  
    // Sorting
    list.sort((a,b) => {
      let av, bv
      switch (sort.value.key) {
        case 'name':
          av = (a.name || '').toLowerCase()
          bv = (b.name || '').toLowerCase()
          break
        case 'blocks':
          av = (a.blocks || []).length
          bv = (b.blocks || []).length
          break
        case 'created_at':
        default:
          av = new Date(a.created_at).getTime()
          bv = new Date(b.created_at).getTime()
      }
      if (av === bv) return 0
      const cmp = av > bv ? 1 : -1
      return sort.value.dir === 'asc' ? cmp : -cmp
    })
  
    return list
  })
  
  /* View Modal */
  const viewing = ref(null)
  function openView(t) {
    viewing.value = t
    trapFocus()
  }
  function closeView() {
    viewing.value = null
    releaseFocus()
  }
  
  /* Delete Modal */
  const deleteTarget = ref(null)
  const deleting = ref(false)
  
  function askDelete(t) {
    deleteTarget.value = t
    trapFocus()
  }
  
  function closeDeleteModal() {
    if (deleting.value) return
    deleteTarget.value = null
    releaseFocus()
  }
  
  async function confirmDelete() {
    if (!deleteTarget.value) return
    deleting.value = true
    try {
      await deleteBlockTemplate(deleteTarget.value.id)
      deleteTarget.value = null
    } finally {
      deleting.value = false
      releaseFocus()
    }
  }
  
  /* Utility */
  function truncatedDescription(desc) {
    if (!desc) return ''
    if (desc.length <= 40) return desc
    return desc.slice(0, 40).trimEnd() + '…'
  }
  function formatDate(iso) {
    if (!iso) return ''
    try {
      return new Date(iso).toLocaleDateString()
    } catch {
      return iso
    }
  }
  function formatDateTime(iso) {
    if (!iso) return ''
    try {
      return new Date(iso).toLocaleString()
    } catch {
      return iso
    }
  }
  
  onMounted(() => {
    listBlockTemplates()
  })
  
  /* Persist filters in sessionStorage (optional) */
  const STORAGE_KEY = 'templateListFiltersV1'
  onMounted(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        Object.assign(filters.value, parsed.filters || {})
        Object.assign(sort.value, parsed.sort || {})
      }
    } catch {}
  })
  watch([filters, sort], () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        filters: filters.value,
        sort: sort.value
      }))
    } catch {}
  }, { deep: true })
  
  /* Simple focus trap */
  let previousActive = null
  function trapFocus() {
    previousActive = document.activeElement
    // focus first button inside modal after next tick
    requestAnimationFrame(() => {
      const modal = document.querySelector('[role="dialog"]')
      if (modal) {
        const focusable = modal.querySelector('button, a, input, select, textarea')
        focusable?.focus()
      }
    })
    document.addEventListener('keydown', onKeydown)
  }
  function releaseFocus() {
    document.removeEventListener('keydown', onKeydown)
    if (!viewing.value && !deleteTarget.value && previousActive instanceof HTMLElement) {
      previousActive.focus()
      previousActive = null
    }
  }
  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (viewing.value) closeView()
      else if (deleteTarget.value) closeDeleteModal()
    }
  }
  
  onBeforeUnmount(() => {
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