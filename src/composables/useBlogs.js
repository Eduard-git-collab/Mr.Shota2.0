import { ref } from 'vue'
import {
  listOwnBlogs,
  getBlogById,
  saveBlog,
  deleteBlog,
  getBlogBySlug,
  listPublishedBlogs,
  updateBlogSelection,
  unpublishBlog
} from '../services/blogServices'

const ownBlogs = ref([])
const currentBlog = ref(null)
const loading = ref(false)
const error = ref(null)

export function useBlogs() {
  async function refreshOwn() {
    loading.value = true
    error.value = null
    try {
      ownBlogs.value = await listOwnBlogs()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function loadBlog(id) {
    loading.value = true
    error.value = null
    try {
      currentBlog.value = await getBlogById(id)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function save(blogData, { publishNow = false, toBePublishedDate = null } = {}) {
    loading.value = true
    error.value = null
    try {
      const saved = await saveBlog(blogData, { publishNow, toBePublishedDate })
      currentBlog.value = saved
      const idx = ownBlogs.value.findIndex(b => b.id === saved.id)
      if (idx !== -1) {
        ownBlogs.value[idx] = { ...ownBlogs.value[idx], ...saved }
      }
      return saved
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function unpublish(id) {
    loading.value = true
    error.value = null
    try {
      const unpublished = await unpublishBlog(id)
      const idx = ownBlogs.value.findIndex(b => b.id === id)
      if (idx !== -1) {
        ownBlogs.value[idx] = { ...ownBlogs.value[idx], ...unpublished }
      }
      if (currentBlog.value?.id === id) {
        currentBlog.value = { ...currentBlog.value, ...unpublished }
      }
      return unpublished
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function remove(id) {
    loading.value = true
    error.value = null
    try {
      await deleteBlog(id)
      ownBlogs.value = ownBlogs.value.filter(b => b.id !== id)
      if (currentBlog.value?.id === id) currentBlog.value = null
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function setBlogAsSelection(id, explicitValue) {
    error.value = null
    const targetIndex = ownBlogs.value.findIndex(b => b.id === id)
    const target = targetIndex !== -1 ? ownBlogs.value[targetIndex] : null
    const oldValue = target?.selection ?? false
    const nextValue = (typeof explicitValue === 'boolean') ? explicitValue : !oldValue

    if (target) {
      ownBlogs.value[targetIndex] = { ...target, selection: nextValue }
    }
    if (currentBlog.value?.id === id) {
      currentBlog.value = { ...currentBlog.value, selection: nextValue }
    }

    try {
      const updated = await updateBlogSelection(id, nextValue)
      return updated
    } catch (e) {
      if (target) {
        ownBlogs.value[targetIndex] = { ...target, selection: oldValue }
      }
      if (currentBlog.value?.id === id) {
        currentBlog.value = { ...currentBlog.value, selection: oldValue }
      }
      error.value = e.message
      throw e
    }
  }

  return {
    ownBlogs,
    currentBlog,
    loading,
    error,
    refreshOwn,
    loadBlog,
    save,
    unpublish,
    remove,
    setBlogAsSelection,
    getBlogBySlug,
    listPublishedBlogs
  }
}