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
