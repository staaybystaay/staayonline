import { supabase } from './supabase'

const BUCKET = 'products'

// ─── Get image URL ────────────────────────────
// Serves the plain public URL rather than routing through Supabase's
// image-transformation endpoint (/storage/v1/render/image/...), which
// requires a paid add-on. When that add-on isn't enabled, every image
// using it fails to load — this keeps things working at the cost of
// automatic resizing.
export function getImageUrl(path) {
  if (!path) return null

  // Full URL (Supabase storage URL or any external URL) — use as-is
  if (path.startsWith('http')) return path

  // Local /public/ path — use as-is
  if (path.startsWith('/')) return path

  // Relative storage path — resolve to its public URL
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data?.publicUrl || null
}

// ─── Preset sizes ──────────────────────────────
// No longer size-differentiated since transformation is unavailable;
// kept as named exports so call sites still read semantically.
export const imgCard  = (path) => getImageUrl(path)
export const imgHero  = (path) => getImageUrl(path)
export const imgThumb = (path) => getImageUrl(path)
export const imgFull  = (path) => getImageUrl(path)

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
