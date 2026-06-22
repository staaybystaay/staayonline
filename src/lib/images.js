import { supabase } from './supabase'

const BUCKET = 'products'

// Matches a full Supabase storage URL and captures the path after /object/public/<bucket>/
const SUPABASE_STORAGE_RE = /\/storage\/v1\/object\/public\/([^?#]+)/

// ─── Get optimized image URL ──────────────────
export function getImageUrl(path, options = {}) {
  if (!path) return null

  const {
    width   = 800,
    height,
    quality = 80,
    format  = 'webp',
  } = options

  const params = new URLSearchParams({ width: String(width), quality: String(quality), format })
  if (height) params.set('height', String(height))

  // Case 1: full Supabase storage URL — rewrite to the render/image endpoint
  const match = path.match(SUPABASE_STORAGE_RE)
  if (match) {
    const storageBase = path.split('/storage/v1/')[0]
    return `${storageBase}/storage/v1/render/image/public/${match[1]}?${params}`
  }

  // Case 2: relative storage path — use the SDK helper
  if (!path.startsWith('http') && !path.startsWith('/')) {
    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path, { transform: { width, quality, format, ...(height ? { height } : {}) } })
    return data?.publicUrl || null
  }

  // Case 3: external URL or local /public/ path — return as-is (can't transform)
  return path
}

// ─── Preset sizes ─────────────────────────────
export const imgCard  = (path) => getImageUrl(path, { width: 400,  quality: 80 })
export const imgHero  = (path) => getImageUrl(path, { width: 1400, quality: 85 })
export const imgThumb = (path) => getImageUrl(path, { width: 160,  quality: 75 })
export const imgFull  = (path) => getImageUrl(path, { width: 800,  quality: 85 })

// ─── Upload image to Supabase Storage ─────────
export async function uploadProductImage(file, productSlug) {
  const ext      = file.name.split('.').pop().toLowerCase()
  const filename = `${productSlug}-${Date.now()}.${ext}`
  const path     = `collection/${filename}`

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    })

  if (error) throw error
  return data.path
}

// ─── Delete image from Supabase Storage ───────
export async function deleteProductImage(path) {
  if (!path || path.startsWith('/') || path.startsWith('http')) return
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw error
}
