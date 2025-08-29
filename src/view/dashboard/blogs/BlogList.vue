<template>
  <section class="flex flex-col gap-6 text-slate-100">
    <header class="mb-2 flex items-center justify-between">
      <h2 class="text-xl font-semibold text-slate-100 font-figtree">{{ title || 'Your Blogs' }}</h2>
      <RouterLink
        class="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow hover:bg-indigo-500"
        :to="{ name: 'DashboardBlogNew' }"
      >+ New</RouterLink>
    </header>

    <!-- Filters Section -->
    <div class="rounded-xl border border-slate-700 bg-slate-800/70 p-5 backdrop-blur">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-4 items-end">
        <!-- Search by Title -->
        <div class="flex flex-col gap-1">
          <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">Search</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search by title..."
            class="w-full rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-slate-400 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
          />
        </div>

        <!-- Status Filter -->
        <div class="flex flex-col gap-1">
          <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">Status</label>
            <select
              v-model="filters.status"
              class="w-full rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
        </div>

        <!-- Quick Date Filters -->
        <div class="flex flex-col gap-1">
          <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">Quick Dates</label>
          <select
            v-model="quickDateFilter"
            @change="onQuickDateChange"
            class="w-full rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
          >
            <option value="">All Time</option>
            <option value="7">Last 7 Days</option>
            <option value="15">Last 15 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <!-- Clear Filters -->
        <div class="flex flex-col gap-1">
          <button
            @click="clearFilters"
            class="rounded-lg border border-slate-600 bg-slate-700/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 hover:bg-slate-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Custom Date Range -->
      <div
        v-if="quickDateFilter === 'custom'"
        class="mt-6 grid grid-cols-1 gap-5 border-t border-slate-700 pt-6 md:grid-cols-2"
      >
        <div class="flex flex-col gap-1">
          <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">Start Date</label>
          <input
            v-model="filters.startDate"
            type="date"
            class="w-full rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">End Date</label>
          <input
            v-model="filters.endDate"
            type="date"
            class="w-full rounded-lg border border-slate-600 bg-slate-700/80 px-3 py-2 text-sm text-slate-100 focus:border-slate-400 focus:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-500/40"
          />
        </div>
      </div>

      <!-- Filter Results Count -->
      <div class="mt-6 border-t border-slate-700 pt-5">
        <span class="text-sm text-slate-400">
          Showing {{ filteredBlogs.length }} of {{ blogs.length }} blogs
          <span
            v-if="hasActiveFilters"
            class="font-semibold text-blue-400"
          >(filtered)</span>
        </span>
      </div>
    </div>

    <div v-if="loading" class="rounded-lg bg-slate-800/60 px-4 py-6 text-center text-sm text-slate-300 font-poppins">
      Loading...
    </div>
    <div v-else>
      <table
        v-if="filteredBlogs.length"
        class="w-full border-separate border-spacing-0 overflow-hidden rounded-xl bg-slate-800/70 font-poppins text-sm text-slate-200 shadow"
      >
        <thead>
          <tr class="bg-slate-900/70 text-xs uppercase tracking-wide text-slate-400">
            <th class="px-3 py-3 text-center font-semibold">Pinned</th>
            <th class="px-3 py-3 text-left font-semibold">Title</th>
            <th class="px-3 py-3 text-left font-semibold">Status</th>
            <th class="px-3 py-3 text-left font-semibold">Template</th>
            <th class="px-3 py-3 text-left font-semibold">Updated</th>
            <th class="px-3 py-3 text-left font-semibold">Published</th>
            <th class="px-3 py-3 text-left font-semibold">To be published</th>
            <th class="px-3 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="b in filteredBlogs"
            :key="b.id"
            class="border-t border-slate-700/70 hover:bg-slate-700/40 transition"
          >
            <td class="px-3 py-3 text-center">
              <input
                class="h-4 w-4 cursor-pointer rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                :id="`sel-${b.id}`"
                type="checkbox"
                :checked="b.selection"
                :disabled="b.status !== 'published' || togglingIds.has(b.id)"
                :title="b.status !== 'published' ? 'Only published blogs can be selected' : 'Toggle selection'"
                @change="onToggleSelection(b)"
              />
            </td>
            <td class="px-3 py-3">
              <RouterLink
                class="text-slate-100 underline-offset-2 hover:text-indigo-400 hover:underline"
                :to="{ name: 'DashboardBlogEdit', params: { id: b.id } }"
              >
                {{ b.title }}
              </RouterLink>
            </td>
            <td class="px-3 py-3">
              <span
                :class="[
                  'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  b.status === 'published'
                    ? 'bg-emerald-600/20 text-emerald-300 ring-1 ring-emerald-600/40'
                    : 'bg-slate-600/30 text-slate-300 ring-1 ring-slate-500/40'
                ]"
              >
                {{ b.status }}
              </span>
            </td>
            <td class="px-3 py-3 text-slate-300">
              {{ b.template }}
            </td>
            <td class="px-3 py-3 text-slate-300">
              {{ formatDate(b.updated_at) }}
            </td>
            <td class="px-3 py-3 text-slate-300">
              {{ b.published_at ? formatDate(b.published_at) : '—' }}
            </td>
            <td class="px-3 py-3 text-slate-300">
              {{ b.to_be_published_date ? formatDate(b.to_be_published_date) : '—' }}
            </td>
            <td class="px-3 py-3">
              <div class="flex flex-wrap gap-3 text-xs">
                <RouterLink
                  class="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline"
                  :to="{ name: 'PublicBlog', params: { slug: b.slug } }"
                  target="_blank"
                >View</RouterLink>
                <button
                  v-if="b.status === 'published'"
                  class="text-amber-400 hover:text-amber-300 underline-offset-2 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="togglingIds.has(b.id)"
                  @click="confirmUnpublish(b)"
                  :title="togglingIds.has(b.id) ? 'Processing...' : 'Unpublish this blog'"
                >
                  {{ togglingIds.has(b.id) ? 'Processing...' : 'Unpublish' }}
                </button>
                <button
                  class="text-red-400 hover:text-red-300 underline-offset-2 hover:underline"
                  @click="confirmDelete(b)"
                >
                  Delete
                </button>
                <RouterLink
                  class="text-slate-300 hover:text-slate-100 underline-offset-2 hover:underline"
                  :to="{ name: 'DashboardBlogEdit', params: { id: b.id } }"
                >Edit</RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-else-if="hasActiveFilters"
        class="rounded-lg bg-slate-800/60 p-6 text-sm text-slate-300 font-poppins"
      >
        No blogs match your current filters.
        <button
          @click="clearFilters"
          class="ml-1 text-indigo-400 underline-offset-2 hover:text-indigo-300 hover:underline"
        >Clear filters</button>
        to see all blogs.
      </div>

      <p v-else class="rounded-lg bg-slate-800/60 p-6 text-sm text-slate-300 font-poppins">
        No blogs yet. Create one.
      </p>
    </div>

    <!-- Delete Confirmation Dialog -->
    <dialog ref="confirmDialog" class="rounded-xl border border-slate-700 bg-slate-800 p-6 text-slate-100 backdrop:bg-slate-950/70">
      <form method="dialog" class="flex flex-col gap-4 font-poppins" @submit.prevent="performDelete">
        <p>Delete blog "{{ pendingDelete?.title }}"?</p>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-600"
            @click="cancelDelete"
          >Cancel</button>
          <button
            type="button"
            class="rounded-md bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-red-500"
            @click="performDelete"
          >
            Delete
          </button>
        </div>
      </form>
    </dialog>

    <!-- Unpublish Confirmation Dialog -->
    <dialog ref="unpublishDialog" class="rounded-xl border border-slate-700 bg-slate-800 p-6 text-slate-100 backdrop:bg-slate-950/70">
      <form method="dialog" class="flex flex-col gap-4 font-poppins" @submit.prevent="performUnpublish">
        <p>Unpublish blog "{{ pendingUnpublish?.title }}"?</p>
        <p class="text-sm text-slate-400">
          This will make the blog unavailable to the public and change its status to draft.
        </p>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-600"
            @click="cancelUnpublish"
          >Cancel</button>
          <button
            type="button"
            class="rounded-md bg-amber-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-amber-500"
            @click="performUnpublish"
          >
            Unpublish
          </button>
        </div>
      </form>
    </dialog>

    <p v-if="error" class="text-sm text-red-400 font-poppins">{{ error }}</p>
  </section>
</template>

<script setup>
import { onMounted, ref, computed, reactive, watch } from 'vue'
import { useBlogs } from '../../../composables/useBlogs'

defineProps({ title: String })

const { ownBlogs, refreshOwn, remove, loading, error, setBlogAsSelection, save } = useBlogs()
const pendingDelete = ref(null)
const pendingUnpublish = ref(null)
const confirmDialog = ref()
const unpublishDialog = ref()
const togglingIds = ref(new Set())
const quickDateFilter = ref('')

const filters = reactive({
  search: '',
  status: '',
  startDate: '',
  endDate: ''
})

onMounted(refreshOwn)

const blogs = computed(() => ownBlogs.value)

const hasActiveFilters = computed(() => {
  return filters.search.trim() !== '' || 
         filters.status !== '' || 
         filters.startDate !== '' || 
         filters.endDate !== '' ||
         quickDateFilter.value !== ''
})

const filteredBlogs = computed(() => {
  let result = [...blogs.value]

  // Filter by search term (title)
  if (filters.search.trim()) {
    const searchTerm = filters.search.trim().toLowerCase()
    result = result.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm)
    )
  }

  // Filter by status
  if (filters.status) {
    result = result.filter(blog => blog.status === filters.status)
  }

  // Filter by date range
  if (filters.startDate || filters.endDate) {
    result = result.filter(blog => {
      const blogDate = new Date(blog.updated_at)
      const startDate = filters.startDate ? new Date(filters.startDate) : null
      const endDate = filters.endDate ? new Date(filters.endDate + 'T23:59:59') : null

      if (startDate && blogDate < startDate) return false
      if (endDate && blogDate > endDate) return false
      return true
    })
  }

  return result
})

function formatDate(str) {
  return new Date(str).toLocaleString()
}

function onQuickDateChange() {
  if (quickDateFilter.value === '') {
    filters.startDate = ''
    filters.endDate = ''
  } else if (quickDateFilter.value === 'custom') {
  } else {
    // Quick date option (7, 15, 30 days)
    const days = parseInt(quickDateFilter.value)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - days)
    
    filters.startDate = startDate.toISOString().split('T')[0]
    filters.endDate = endDate.toISOString().split('T')[0]
  }
}

function clearFilters() {
  filters.search = ''
  filters.status = ''
  filters.startDate = ''
  filters.endDate = ''
  quickDateFilter.value = ''
}

function confirmDelete(blog) {
  pendingDelete.value = blog
  if (confirmDialog.value?.showModal) confirmDialog.value.showModal()
  else if (window.confirm('Delete?')) performDelete()
}

function cancelDelete() {
  pendingDelete.value = null
  if (confirmDialog.value?.close) confirmDialog.value.close()
}

async function performDelete() {
  if (!pendingDelete.value) return
  try {
    await remove(pendingDelete.value.id)
  } finally {
    cancelDelete()
  }
}

function confirmUnpublish(blog) {
  pendingUnpublish.value = blog
  if (unpublishDialog.value?.showModal) unpublishDialog.value.showModal()
  else if (window.confirm('Unpublish this blog?')) performUnpublish()
}

function cancelUnpublish() {
  pendingUnpublish.value = null
  if (unpublishDialog.value?.close) unpublishDialog.value.close()
}

async function performUnpublish() {
  if (!pendingUnpublish.value) return
  const blog = pendingUnpublish.value
  
  togglingIds.value.add(blog.id)
  try {
    // Create payload to unpublish the blog
    const payload = {
      id: blog.id,
      title: blog.title,
      template: blog.template,
      body: blog.body || '',
      cover_url: blog.cover_url,
      status: 'draft', // Change status to draft
      published_at: null, // Clear the published date
      to_be_published_date: blog.to_be_published_date,
      assets: [], // We don't need to modify assets for unpublishing
      relatedBlogs: [] // We don't need to modify related blogs for unpublishing
    }
    
    await save(payload, { publishNow: false })
    
    // Refresh the blog list to show updated status
    await refreshOwn()
  } catch (err) {
    console.error('Error unpublishing blog:', err)
  } finally {
    togglingIds.value.delete(blog.id)
    cancelUnpublish()
  }
}

async function onToggleSelection(blog) {
  if (blog.status !== 'published' || togglingIds.value.has(blog.id)) return
  togglingIds.value.add(blog.id)
  try {
    await setBlogAsSelection(blog.id, !blog.selection)
  } finally {
    togglingIds.value.delete(blog.id)
  }
}

// Watch for changes in filters to reset quick date filter when custom dates are manually changed
watch([() => filters.startDate, () => filters.endDate], () => {
  if (quickDateFilter.value !== 'custom' && (filters.startDate || filters.endDate)) {
    quickDateFilter.value = 'custom'
  }
})
</script>
