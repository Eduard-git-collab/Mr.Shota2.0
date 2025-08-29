import { supabase } from '../lib/supabaseClient'
import { slugify } from '../utils/slugify'

export async function saveBlog(data, { publishNow = false, toBePublishedDate = null } = {}) {
  const userResp = await supabase.auth.getUser()
  const user = userResp.data.user
  if (!user) throw new Error('Not authenticated')

  const base = {
    title: data.title?.trim(),
    body: data.body || '',
    template: data.template || 'basic',
    block_template_id: data.block_template_id || null
  }

  if (!base.title) throw new Error('Title is required')

  let cover_url = data.cover_url || null
  if (data.coverFile instanceof File) {
    cover_url = await uploadCover(data.coverFile, user.id, data.id)
  }

  let status
  if (publishNow) {
    status = 'published'
  } else if (toBePublishedDate) {
    status = 'draft'
  } else {
    status = data.status || 'draft'
  }

  let published_at
  if (publishNow) {
    published_at = data.published_at || new Date().toISOString()
  } else if (toBePublishedDate) {
    published_at = null
  } else {
    published_at = data.published_at || null
  }

  const to_be_published_date = toBePublishedDate || data.to_be_published_date || null

  if (!data.id) {
    let baseSlug = slugify(base.title)
    baseSlug = await ensureUniqueSlug(baseSlug)
    const insertPayload = {
      title: base.title,
      body: base.body,
      slug: baseSlug,
      template: base.template,
      cover_url,
      author_id: user.id,
      status,
      published_at,
      to_be_published_date,
      block_template_id: base.block_template_id
    }
    const { data: inserted, error } = await supabase
      .from('blogs')
      .insert(insertPayload)
      .select('*')
      .single()
    if (error) throw error
    
    if (Array.isArray(data.blocks) && data.blocks.length) {
      await upsertBlocks(inserted.id, data.blocks, user.id)
    }

    if (Array.isArray(data.assets) && data.assets.length) {
      await upsertAssets(inserted.id, data.assets, user.id)
    }
    
    if (Array.isArray(data.relatedBlogs) && data.relatedBlogs.length) {
      await syncRelatedBlogs(inserted.id, data.relatedBlogs)
    }
    
    return await getBlogById(inserted.id)
  } else {
    const updatePayload = {
      title: base.title,
      body: base.body,
      template: base.template,
      cover_url,
      status,
      published_at,
      to_be_published_date,
      block_template_id: base.block_template_id
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
    if (Array.isArray(data.relatedBlogs)) {
      await syncRelatedBlogs(updated.id, data.relatedBlogs)
    }
    if (Array.isArray(data.blocks)) {
      await syncBlocks(updated.id, data.blocks, user.id)
    }
    
    return await getBlogById(updated.id)
  }
}

export async function unpublishBlog(id) {
  const { data, error } = await supabase
    .from('blogs')
    .update({
      status: 'draft',
      published_at: null
    })
    .eq('id', id)
    .select('*')
    .single()
  
  if (error) throw error
  return data
}

export async function deleteBlog(id) {
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) throw error
  return true
}

export async function listOwnBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, status, template, cover_url, created_at, updated_at, published_at, selection, to_be_published_date, block_template_id')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function listPublishedBlogs({ limit = 20, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, cover_url, template, published_at, selection, block_template_id')
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
    .select('id, title, slug, cover_url, template, published_at, created_at, selection, block_template_id')
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
    .select(`
      *, 
      blog_assets(*),
      blog_blocks(*),
      blog_relations!blog_relations_blog_id_fkey(
        id,
        related_blog_id,
        position
      ),
      block_template:blog_block_templates!blogs_block_template_id_fkey(
        id,
        name,
        code
      )
    `)
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function getBlogBySlug(slug) {
  try {
    const { data: blogData, error: blogError } = await supabase
      .from('blogs')
      .select(`
        *, 
        blog_assets(*),
        blog_blocks(*),
        block_template:blog_block_templates!blogs_block_template_id_fkey(
          id,
          name,
          code
        )
      `)
      .eq('slug', slug)
      .single()
    
    if (blogError) throw blogError
    if (!blogData) return null
    
    const { data: relatedData, error: relatedError } = await supabase
      .from('blog_relations')
      .select(`
        id,
        position,
        related_blog_id,
        related_blog:blogs!blog_relations_related_blog_id_fkey(
          id,
          title,
          slug,
          cover_url,
          published_at,
          status
        )
      `)
      .eq('blog_id', blogData.id)
      .order('position')
    
    if (relatedError) {
      console.warn('Error fetching related blogs:', relatedError)
    }
    
    blogData.related_blogs = relatedData || []
    return blogData
  } catch (error) {
    console.error('Error in getBlogBySlug:', error)
    throw error
  }
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

/* Block Templates CRUD */
export async function listBlockTemplates() {
  const { data, error } = await supabase
    .from('blog_block_templates')
    .select('id, name, code, description, blocks, created_at, updated_at')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getBlockTemplateById(id) {
  const { data, error } = await supabase
    .from('blog_block_templates')
    .select('id, name, code, description, blocks, created_at, updated_at')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function saveBlockTemplate(data) {
  const userResp = await supabase.auth.getUser()
  const user = userResp.data.user
  if (!user) throw new Error('Not authenticated')

  const payload = {
    name: data.name?.trim(),
    code: data.code?.trim(),
    description: data.description || null,
    blocks: Array.isArray(data.blocks) ? data.blocks : [],
    created_by: user.id
  }
  if (!payload.name) throw new Error('Template name required')
  if (!payload.code) throw new Error('Template code required')

  if (!data.id) {
    const { data: inserted, error } = await supabase
      .from('blog_block_templates')
      .insert(payload)
      .select('*')
      .single()
    if (error) throw error
    return inserted
  } else {
    const { data: updated, error } = await supabase
      .from('blog_block_templates')
      .update({
        name: payload.name,
        code: payload.code,
        description: payload.description,
        blocks: payload.blocks
      })
      .eq('id', data.id)
      .select('*')
      .single()
    if (error) throw error
    return updated
  }
}

export async function deleteBlockTemplate(id) {
  const { error } = await supabase
    .from('blog_block_templates')
    .delete()
    .eq('id', id)
  if (error) throw error
  return true
}

/* Slug / Upload Helpers */
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

async function uploadBlockMedia(file, blogId, mediaType) {
  const ext = file.name.split('.').pop()
  const path = `blocks/${blogId}/${mediaType}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('blog-media').upload(path, file, { upsert: true })
  if (error) throw error
  const { data: publicUrl } = supabase.storage.from('blog-media').getPublicUrl(path)
  return publicUrl.publicUrl
}

/* Assets (legacy) */
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

/* Blocks (new) */
async function upsertBlocks(blogId, blocks, userId) {
  if (!blocks.length) return
  const rows = []
  for (const b of blocks) {
    const processedContent = await processBlockContent(blogId, b)
    rows.push({
      blog_id: blogId,
      type: b.type,
      position: b.position ?? 0,
      content: processedContent
    })
  }
  const { error } = await supabase.from('blog_blocks').insert(rows)
  if (error) throw error
}

async function syncBlocks(blogId, blocks, userId) {
  const { data: existing, error: exErr } = await supabase
    .from('blog_blocks')
    .select('id')
    .eq('blog_id', blogId)
  if (exErr) throw exErr
  const existingIds = new Set(existing.map(r => r.id))
  const incomingIds = new Set(blocks.filter(b => b.id).map(b => b.id))
  const toDelete = [...existingIds].filter(id => !incomingIds.has(id))
  if (toDelete.length) {
    const { error: delErr } = await supabase
      .from('blog_blocks')
      .delete()
      .in('id', toDelete)
    if (delErr) throw delErr
  }
  for (const b of blocks) {
    const content = await processBlockContent(blogId, b)
    if (!b.id) {
      const { error } = await supabase.from('blog_blocks').insert({
        blog_id: blogId,
        type: b.type,
        position: b.position ?? 0,
        content
      })
      if (error) throw error
    } else {
      const { error } = await supabase.from('blog_blocks').update({
        type: b.type,
        position: b.position ?? 0,
        content
      }).eq('id', b.id)
      if (error) throw error
    }
  }
}

async function processBlockContent(blogId, block) {
  const cloned = JSON.parse(JSON.stringify(block.content || {}))
  if (block.type === 'media' && cloned.mediaType === 'image' && block.content.file instanceof File) {
    const url = await uploadBlockMedia(block.content.file, blogId, 'image')
    cloned.url = url
    delete cloned.file
  }
  if (cloned.file) delete cloned.file
  return cloned
}

/* Related blogs */
async function syncRelatedBlogs(blogId, relatedBlogs) {
  const { data: existing, error: exErr } = await supabase
    .from('blog_relations')
    .select('id')
    .eq('blog_id', blogId)
  if (exErr) throw exErr
  
  const existingIds = new Set(existing.map(r => r.id))
  const incomingIds = new Set(relatedBlogs.filter(r => r.id).map(r => r.id))
  const toDelete = [...existingIds].filter(id => !incomingIds.has(id))
  
  if (toDelete.length) {
    const { error: delErr } = await supabase
      .from('blog_relations')
      .delete()
      .in('id', toDelete)
    if (delErr) throw delErr
  }
  
  for (const relation of relatedBlogs) {
    if (!relation.id) {
      const { error } = await supabase.from('blog_relations').insert({
        blog_id: blogId,
        related_blog_id: relation.related_blog_id,
        position: relation.position ?? 0
      })
      if (error) throw error
    } else {
      const { error } = await supabase.from('blog_relations').update({
        related_blog_id: relation.related_blog_id,
        position: relation.position ?? 0
      }).eq('id', relation.id)
      if (error) throw error
    }
  }
}

/* Asset upload */
async function uploadAssetFile(file, blogId, type) {
  const ext = file.name.split('.').pop()
  const path = `assets/${blogId}/${type}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('blog-media').upload(path, file, { upsert: true })
  if (error) throw error
  const { data: publicUrl } = supabase.storage.from('blog-media').getPublicUrl(path)
  return publicUrl.publicUrl
}