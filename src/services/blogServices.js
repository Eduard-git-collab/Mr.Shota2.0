import { supabase } from '../lib/supabaseClient'
import { slugify } from '../utils/slugify'

export async function saveBlog(data, { publishNow = false } = {}) {
  const userResp = await supabase.auth.getUser()
  const user = userResp.data.user
  if (!user) throw new Error('Not authenticated')

  const base = {
    title: data.title?.trim(),
    body: data.body || '',
    template: data.template || 'basic'
  }

  if (!base.title) throw new Error('Title is required')

  let cover_url = data.cover_url || null
  if (data.coverFile instanceof File) {
    cover_url = await uploadCover(data.coverFile, user.id, data.id)
  }

  const status = publishNow ? 'published' : (data.status || 'draft')
  const published_at = (publishNow && data.status !== 'published')
    ? new Date().toISOString()
    : data.published_at || null

  if (!data.id) {
    let slug = slugify(base.title)
    slug = await ensureUniqueSlug(slug)
    const insertPayload = {
      ...base,
      slug,
      cover_url,
      author_id: user.id,
      status,
      published_at
    }
    const { data: inserted, error } = await supabase
      .from('blogs')
      .insert(insertPayload)
      .select('*')
      .single()
    if (error) throw error
    if (Array.isArray(data.assets) && data.assets.length) {
      await upsertAssets(inserted.id, data.assets, user.id)
    }
    return inserted
  } else {
    const updatePayload = {
      ...base,
      cover_url,
      status,
      published_at
    }
    const { data: updated, error } = await supabase
      .from('blogs')
      .update(updatePayload)
      .eq('id', data.id)
      .select('*')
      .single()
    if (error) throw error
    if (Array.isArray(data.assets)) {
      await syncAssets(updated.id, data.assets, user.id)
    }
    return updated
  }
}

export async function deleteBlog(id) {
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) throw error
  return true
}

export async function listOwnBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, status, template, cover_url, created_at, updated_at, published_at, selection')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function listPublishedBlogs({ limit = 20, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, cover_url, template, published_at, selection')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return data
}

export async function listPublishedBlogsOrdered({ limit = 50, offset = 0, newestFirst = true } = {}) {
    const createdOrder = newestFirst ? { ascending: false } : { ascending: true }
  
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, cover_url, template, published_at, created_at, selection')
      .eq('status', 'published')
      .order('selection', { ascending: false })
      .order('created_at', createdOrder)
      .range(offset, offset + limit - 1)
  
    if (error) throw error
    return data
  }

export async function getBlogById(id) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*, blog_assets(*)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function getBlogBySlug(slug) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*, blog_assets(*)')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

export async function updateBlogSelection(id, value) {
  const { data, error } = await supabase
    .from('blogs')
    .update({ selection: value })
    .eq('id', id)
    .select('id, selection')
    .single()
  if (error) throw error
  return data
}

async function ensureUniqueSlug(base) {
  let slug = base
  let counter = 1
  while (true) {
    const { data, error } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (error) throw error
    if (!data) return slug
    slug = `${base}-${counter++}`
    if (counter > 99) throw new Error('Could not generate unique slug')
  }
}

async function uploadCover(file, userId, blogId) {
  const ext = file.name.split('.').pop()
  const path = `${userId}/covers/${blogId || 'new'}-${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from('blog-media')
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data: publicUrl } = supabase.storage.from('blog-media').getPublicUrl(path)
  return publicUrl.publicUrl
}

async function upsertAssets(blogId, assets) {
  const rows = []
  for (const a of assets) {
    let url = a.url
    if (a.file instanceof File) {
      url = await uploadAssetFile(a.file, blogId, a.type)
    }
    rows.push({
      blog_id: blogId,
      type: a.type,
      url,
      caption: a.caption || null,
      position: a.position ?? 0,
      metadata: a.metadata || null
    })
  }
  if (!rows.length) return
  const { error } = await supabase.from('blog_assets').insert(rows)
  if (error) throw error
}

async function syncAssets(blogId, assets) {
  const { data: existing, error: exErr } = await supabase
    .from('blog_assets')
    .select('id')
    .eq('blog_id', blogId)
  if (exErr) throw exErr
  const existingIds = new Set(existing.map(a => a.id))
  const incomingIds = new Set(assets.filter(a => a.id).map(a => a.id))
  const toDelete = [...existingIds].filter(id => !incomingIds.has(id))
  if (toDelete.length) {
    const { error: delErr } = await supabase
      .from('blog_assets')
      .delete()
      .in('id', toDelete)
    if (delErr) throw delErr
  }
  for (const a of assets) {
    let url = a.url
    if (a.file instanceof File) {
      url = await uploadAssetFile(a.file, blogId, a.type)
    }
    if (!a.id) {
      const { error } = await supabase.from('blog_assets').insert({
        blog_id: blogId,
        type: a.type,
        url,
        caption: a.caption || null,
        position: a.position ?? 0,
        metadata: a.metadata || null
      })
      if (error) throw error
    } else {
      const { error } = await supabase.from('blog_assets').update({
        type: a.type,
        url,
        caption: a.caption || null,
        position: a.position ?? 0,
        metadata: a.metadata || null
      }).eq('id', a.id)
      if (error) throw error
    }
  }
}

async function uploadAssetFile(file, blogId, type) {
  const ext = file.name.split('.').pop()
  const path = `assets/${blogId}/${type}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('blog-media').upload(path, file, { upsert: true })
  if (error) throw error
  const { data: publicUrl } = supabase.storage.from('blog-media').getPublicUrl(path)
  return publicUrl.publicUrl
}