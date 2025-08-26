<template>
  <section>
    <header class="list-header">
      <h2 class="font-figtree">{{ title || 'Your Blogs' }}</h2>
      <RouterLink class="btn" :to="{ name: 'DashboardBlogNew' }">+ New</RouterLink>
    </header>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="filters-row">
        <!-- Search by Title -->
        <div class="filter-group">
          <label class="filter-label">Search</label>
          <input 
            v-model="filters.search" 
            type="text" 
            placeholder="Search by title..."
            class="filter-input"
          />
        </div>

        <!-- Status Filter -->
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <select v-model="filters.status" class="filter-select">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <!-- Quick Date Filters -->
        <div class="filter-group">
          <label class="filter-label">Quick Dates</label>
          <select v-model="quickDateFilter" @change="onQuickDateChange" class="filter-select">
            <option value="">All Time</option>
            <option value="7">Last 7 Days</option>
            <option value="15">Last 15 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <!-- Clear Filters -->
        <div class="filter-group">
          <button @click="clearFilters" class="btn secondary small">Clear Filters</button>
        </div>
      </div>

      <!-- Custom Date Range (shown when Custom Range is selected) -->
      <div v-if="quickDateFilter === 'custom'" class="date-range-row">
        <div class="filter-group">
          <label class="filter-label">Start Date</label>
          <input 
            v-model="filters.startDate" 
            type="date" 
            class="filter-input"
          />
        </div>
        <div class="filter-group">
          <label class="filter-label">End Date</label>
          <input 
            v-model="filters.endDate" 
            type="date" 
            class="filter-input"
          />
        </div>
      </div>

      <!-- Filter Results Count -->
      <div class="filter-results">
        <span class="results-text">
          Showing {{ filteredBlogs.length }} of {{ blogs.length }} blogs
          <span v-if="hasActiveFilters" class="active-filters-indicator">
            (filtered)
          </span>
        </span>
      </div>
    </div>

    <div v-if="loading" class="loading font-poppins">Loading...</div>
    <div v-else>
      <table v-if="filteredBlogs.length" class="table-basic font-poppins">
        <thead>
          <tr>
            <th style="width:42px;">TWP</th>
            <th>Title</th>
            <th>Status</th>
            <th>Template</th>
            <th>Updated</th>
            <th>Published</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filteredBlogs" :key="b.id">
            <td style="text-align:center;">
              <input
                class="input-check"
                :id="`sel-${b.id}`"
                type="checkbox"
                :checked="b.selection"
                :disabled="b.status !== 'published' || togglingIds.has(b.id)"
                :title="b.status !== 'published' ? 'Only published blogs can be selected' : 'Toggle selection'"
                @change="onToggleSelection(b)"
              />
            </td>
            <td>
              <RouterLink class="link-inline" :to="{ name: 'DashboardBlogEdit', params: { id: b.id } }">
                {{ b.title }}
              </RouterLink>
            </td>
            <td>
              <span :class="['status-chip', b.status]">{{ b.status }}</span>
            </td>
            <td>{{ b.template }}</td>
            <td>{{ formatDate(b.updated_at) }}</td>
            <td>{{ b.published_at ? formatDate(b.published_at) : '—' }}</td>
            <td class="actions">
              <RouterLink class="link-inline" :to="{ name: 'PublicBlog', params: { slug: b.slug } }" target="_blank">View</RouterLink>
              <button 
                v-if="b.status === 'published'" 
                class="link-inline warning-btn" 
                :disabled="togglingIds.has(b.id)"
                @click="confirmUnpublish(b)"
                :title="togglingIds.has(b.id) ? 'Processing...' : 'Unpublish this blog'"
              >
                {{ togglingIds.has(b.id) ? 'Processing...' : 'Unpublish' }}
              </button>
              <button class="link-inline danger-btn" @click="confirmDelete(b)">Delete</button>
              <RouterLink class="link-inline" :to="{ name: 'DashboardBlogEdit', params: { id: b.id } }">Edit</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else-if="hasActiveFilters" class="empty font-poppins">
        No blogs match your current filters. <button @click="clearFilters" class="link-inline">Clear filters</button> to see all blogs.
      </div>
      <p v-else class="empty font-poppins">No blogs yet. Create one.</p>
    </div>

    <!-- Delete Confirmation Dialog -->
    <dialog ref="confirmDialog">
      <form method="dialog" class="confirm-form font-poppins" @submit.prevent="performDelete">
        <p>Delete blog "{{ pendingDelete?.title }}"?</p>
        <div class="btn-row">
          <button type="button" class="btn secondary" @click="cancelDelete">Cancel</button>
          <button type="button" class="btn" style="background:var(--color-danger); border-color:var(--color-danger);" @click="performDelete">
            Delete
          </button>
        </div>
      </form>
    </dialog>

    <!-- Unpublish Confirmation Dialog -->
    <dialog ref="unpublishDialog">
      <form method="dialog" class="confirm-form font-poppins" @submit.prevent="performUnpublish">
        <p>Unpublish blog "{{ pendingUnpublish?.title }}"?</p>
        <p class="warning-text">This will make the blog unavailable to the public and change its status to draft.</p>
        <div class="btn-row">
          <button type="button" class="btn secondary" @click="cancelUnpublish">Cancel</button>
          <button type="button" class="btn warning" @click="performUnpublish">
            Unpublish
          </button>
        </div>
      </form>
    </dialog>

    <p v-if="error" class="error font-poppins">{{ error }}</p>
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

<style scoped>
.list-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1rem;
}

.filters-section {
  background: var(--color-surface, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.filters-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;
}

.date-range-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-muted, #6b7280);
}

.filter-input,
.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--color-primary, #2563eb);
  box-shadow: 0 0 0 2px var(--color-primary-light, #dbeafe);
}

.btn.small {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  height: fit-content;
}

.filter-results {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
}

.results-text {
  font-size: 0.875rem;
  color: var(--color-text-muted, #6b7280);
}

.active-filters-indicator {
  font-weight: 600;
  color: var(--color-primary, #2563eb);
}

.actions {
  display:flex;
  gap:.5rem;
  flex-wrap:wrap;
}
.loading, .empty { padding:1rem; }
.error { color:var(--color-danger); margin-top:1rem; }
dialog {
  border:1px solid var(--color-border);
  border-radius:8px;
  padding:1rem 1.25rem;
  background:var(--color-surface);
}
.btn-row {
  display:flex;
  justify-content:flex-end;
  gap:.75rem;
  margin-top:.75rem;
}
.danger-btn {
  background:none;
  border:none;
  padding:0;
  cursor:pointer;
  color:var(--color-danger);
  font-weight:600;
  font-size:.75rem;
}
.danger-btn:hover { text-decoration:underline; }

.warning-btn {
  background:none;
  border:none;
  padding:0;
  cursor:pointer;
  color:var(--color-warning, #f59e0b);
  font-weight:600;
  font-size:.75rem;
}
.warning-btn:hover { text-decoration:underline; }
.warning-btn:disabled { 
  opacity: 0.5; 
  cursor: default; 
  text-decoration: none;
}

.warning-text {
  font-size: 0.875rem;
  color: var(--color-text-muted, #6b7280);
  margin: 0.5rem 0;
}

.btn.warning {
  background: var(--color-warning, #f59e0b);
  border-color: var(--color-warning, #f59e0b);
  color: white;
}
.btn.warning:hover {
  background: var(--color-warning-dark, #d97706);
  border-color: var(--color-warning-dark, #d97706);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filters-row,
  .date-range-row {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>