import { supabase } from './supabase'

const BUCKET = 'products'

// ─── Get optimized image URL from Supabase Storage ───
// Uses Supabase's built-in image transformation to serve
// resized WebP images — turns a 3MB JPEG into ~150KB WebP
export function getImageUrl(path, options = {}) {
  if (!path) return null

  // If it's already a full URL (old /public/ paths), return as-is
  if (path.startsWith('http') || path.startsWith('/')) return path

  const {
    width   = 800,
    height,
    quality = 80,
    format  = 'webp',
  } = options

  const transform = { width, quality, format }
  if (height) transform.height = height

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path, { transform })

  return data?.publicUrl || null
}

// ─── Preset sizes for different use cases ─────────────
export const imgCard      = (path) => getImageUrl(path, { width: 400,  quality: 80 })
export const imgHero      = (path) => getImageUrl(path, { width: 1400, quality: 85 })
export const imgThumb     = (path) => getImageUrl(path, { width: 160,  quality: 75 })
export const imgFull      = (path) => getImageUrl(path, { width: 800,  quality: 85 })

// ─── Upload image to Supabase Storage ─────────────────
export async function uploadProductImage(file, productSlug) {
  // Sanitise filename
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
  return data.path  // returns the storage path, not the full URL
}

// ─── Delete image from Supabase Storage ───────────────
export async function deleteProductImage(path) {
  if (!path || path.startsWith('/') || path.startsWith('http')) return
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw error
}
