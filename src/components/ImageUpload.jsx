import { useState, useRef } from 'react'
import { uploadProductImage, imgCard } from '../lib/images'
import { supabase } from '../lib/supabase'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const FT  = '#999999'
const BR  = '#E4E0D8'
const RD  = '#B91C1C'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

export default function ImageUpload({ product, onSuccess }) {
  const [dragging,  setDragging]  = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview,   setPreview]   = useState(null)
  const [error,     setError]     = useState(null)
  const [done,      setDone]      = useState(false)
  const inputRef = useRef()

  function handleDrag(e) {
    e.preventDefault()
    setDragging(e.type === 'dragover')
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleFile(file) {
    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, WebP)')
      return
    }
    // Validate size — 10MB max
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Max 10MB.')
      return
    }
    setError(null)
    setDone(false)
    // Show preview
    const reader = new FileReader()
    reader.onload = e => setPreview({ url: e.target.result, file, name: file.name, size: (file.size / 1024).toFixed(0) + 'KB' })
    reader.readAsDataURL(file)
  }

  async function handleUpload() {
    if (!preview?.file) return
    setUploading(true)
    setError(null)

    try {
      // Upload to Supabase Storage
      const storagePath = await uploadProductImage(preview.file, product.slug)

      // Update the product's image_url in the database
      const { error: dbError } = await supabase
        .from('products')
        .update({ image_url: storagePath })
        .eq('id', product.id)

      if (dbError) throw dbError

      setDone(true)
      if (onSuccess) onSuccess(storagePath)
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  function reset() {
    setPreview(null)
    setDone(false)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div style={{ ...F }}>

      {/* Current image */}
      {product.image_url && !done && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, color: FT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Current Image
          </p>
          <div style={{ width: '80px', height: '100px', overflow: 'hidden', background: OW }}>
            <img
              src={imgCard(product.image_url)}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
        </div>
      )}

      {/* Success state */}
      {done ? (
        <div style={{ padding: '20px', background: '#F0FDF4', border: `1px solid #BBF7D0`, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>✓</span>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: GR, marginBottom: '2px' }}>Image uploaded successfully</p>
            <p style={{ fontSize: '12px', fontWeight: 300, color: MD }}>The new image is now live.</p>
          </div>
          <button onClick={reset} style={{ marginLeft: 'auto', background: 'none', border: `1px solid #BBF7D0`, padding: '6px 14px', fontSize: '11px', fontWeight: 500, color: GR, cursor: 'pointer' }}>
            Replace
          </button>
        </div>
      ) : preview ? (
        /* Preview state */
        <div style={{ border: `1px solid ${BR}`, overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {/* Preview image */}
            <div style={{ width: '100px', height: '130px', flexShrink: 0, overflow: 'hidden', background: OW }}>
              <img src={preview.url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* File info */}
            <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '4px' }}>{preview.name}</p>
                <p style={{ fontSize: '12px', fontWeight: 300, color: MD }}>{preview.size}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  style={{ flex: 1, padding: '10px', background: uploading ? MD : BK, color: W, border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', transition: 'background 0.2s' }}
                  onMouseEnter={e => { if (!uploading) e.currentTarget.style.background = G }}
                  onMouseLeave={e => { if (!uploading) e.currentTarget.style.background = uploading ? MD : BK }}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  onClick={reset}
                  disabled={uploading}
                  style={{ padding: '10px 16px', background: 'transparent', border: `1px solid ${BR}`, cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: MD, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? G : BR}`,
            background: dragging ? GL : OW,
            padding: '32px 24px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}>
          <div style={{ width: '44px', height: '44px', background: dragging ? G : BR, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', transition: 'background 0.2s' }}>
            📷
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '4px' }}>
              Drop image here or <span style={{ color: G }}>browse</span>
            </p>
            <p style={{ fontSize: '11px', fontWeight: 300, color: FT }}>
              JPEG, PNG, WebP — max 10MB
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]) }}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ marginTop: '8px', padding: '10px 14px', background: '#FEF2F2', border: `1px solid #FECACA`, borderLeft: `3px solid ${RD}` }}>
          <p style={{ fontSize: '12px', color: RD, fontWeight: 500 }}>{error}</p>
        </div>
      )}

    </div>
  )
}
