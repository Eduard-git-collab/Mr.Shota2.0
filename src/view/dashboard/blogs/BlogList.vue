<template>
  <section>
    <header class="list-header">
      <h2 class="font-figtree">{{ title || 'Your Blogs' }}</h2>
      <RouterLink class="btn" :to="{ name: 'DashboardBlogNew' }">+ New</RouterLink>
    </header>

    <div v-if="loading" class="loading font-poppins">Loading...</div>
    <div v-else>
      <table v-if="blogs.length" class="table-basic font-poppins">
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
          <tr v-for="b in blogs" :key="b.id">
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
              <button class="link-inline danger-btn" @click="confirmDelete(b)">Delete</button>
              <RouterLink class="link-inline" :to="{ name: 'DashboardBlogEdit', params: { id: b.id } }">Edit</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty font-poppins">No blogs yet. Create one.</p>
    </div>

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

    <p v-if="error" class="error font-poppins">{{ error }}</p>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useBlogs } from '../../../composables/useBlogs'

defineProps({ title: String })

const { ownBlogs, refreshOwn, remove, loading, error, setBlogAsSelection } = useBlogs()
const pendingDelete = ref(null)
const confirmDialog = ref()
const togglingIds = ref(new Set())

onMounted(refreshOwn)

const blogs = computed(() => ownBlogs.value)

function formatDate(str) {
  return new Date(str).toLocaleString()
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

async function onToggleSelection(blog) {
  if (blog.status !== 'published' || togglingIds.value.has(blog.id)) return
  togglingIds.value.add(blog.id)
  try {
    await setBlogAsSelection(blog.id, !blog.selection)
  } finally {
    togglingIds.value.delete(blog.id)
  }
}
</script>

<style scoped>
.list-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1rem;
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
</style>