import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from './AdminLayout'
import {
  getAllProductsAdmin,
  getCollections,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '../../lib/api'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#888'
const FT  = '#5B564F'
const BR  = '#E8E4DF'
const LG  = '#F7F6F4'
const RD  = '#C0392B'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const emptyForm = {
  name: '', slug: '', price: '', discount_percent: '', stock_quantity: '', collection_id: '',
  image_url: '', image_url_2: '', sort_order: '0', active: true, sizes: [...ALL_SIZES],
}

// ─── Product row ───────────────────────────────
function ProductRow({ product, onEdit, onDeleteRequest }) {
  return (
    <div className="admin-product-row" style={{ display: 'grid', gridTemplateColumns: '56px 1fr 140px 110px 90px 90px', alignItems: 'center', gap: '14px', padding: '12px 16px', borderBottom: `1px solid ${BR}` }}>
      <div style={{ width: '48px', height: '60px', background: LG, overflow: 'hidden', flexShrink: 0 }}>
        <img src={product.image_url} alt={product.name} onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
        <p style={{ ...F, fontSize: '11px', color: MD }}>{product.collection?.name || '—'}</p>
      </div>
      <div className="admin-product-price">
        <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>GH₵{Number(product.price).toLocaleString()}</p>
        {!!product.discount_percent && (
          <p style={{ ...F, fontSize: '11px', color: RD, fontWeight: 600 }}>-{product.discount_percent}%</p>
        )}
      </div>
      <div className="admin-product-status">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '100px', background: product.active ? '#ECFDF3' : '#FEF2F2', ...F, fontSize: '11px', fontWeight: 600, color: product.active ? GR : RD }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: product.active ? GR : RD }} />
          {product.active ? 'Active' : 'Hidden'}
        </span>
      </div>
      <button onClick={() => onEdit(product)}
        style={{ background: 'none', border: `1px solid ${BR}`, borderRadius: '6px', padding: '7px 12px', ...F, fontSize: '12px', fontWeight: 600, color: DK, cursor: 'pointer', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = DK }}>
        Edit
      </button>
      <button onClick={() => onDeleteRequest(product)}
        style={{ background: 'none', border: 'none', ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', justifySelf: 'start' }}
        onMouseEnter={e => { e.currentTarget.style.color = RD }}
        onMouseLeave={e => { e.currentTarget.style.color = MD }}>
        Delete
      </button>
    </div>
  )
}

// ─── Delete confirm ─────────────────────────────
function DeleteConfirmModal({ product, onCancel, onConfirm, deleting }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}
      style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div onClick={e => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        style={{ background: W, borderRadius: '12px', padding: '28px', maxWidth: '380px', width: '100%' }}>
        <h3 style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK, marginBottom: '8px' }}>Delete this product?</h3>
        <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.6, marginBottom: '24px' }}>
          "{product.name}" will be permanently removed. This can't be undone — consider hiding it instead if you might want it back.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} disabled={deleting}
            style={{ flex: 1, padding: '11px', background: LG, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={deleting}
            style={{ flex: 1, padding: '11px', background: RD, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, color: W, cursor: deleting ? 'not-allowed' : 'pointer', opacity: deleting ? 0.7 : 1 }}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Add / Edit drawer ──────────────────────────
function ProductDrawer({ open, product, collections, onClose, onSaved }) {
  const [form, setForm]         = useState(emptyForm)
  const [slugTouched, setSlugTouched] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')
  const fileRef  = useRef()
  const fileRef2 = useRef()

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        slug: product.slug || '',
        price: String(product.price ?? ''),
        discount_percent: product.discount_percent != null ? String(product.discount_percent) : '',
        stock_quantity: product.stock_quantity != null ? String(product.stock_quantity) : '',
        collection_id: product.collection?.id || product.collection_id || '',
        image_url: product.image_url || '',
        image_url_2: product.image_url_2 || '',
        sort_order: String(product.sort_order ?? '0'),
        active: product.active !== false,
        sizes: product.sizes?.length ? product.sizes : [...ALL_SIZES],
      })
      setSlugTouched(true)
    } else {
      setForm(emptyForm)
      setSlugTouched(false)
    }
    setError('')
  }, [product, open])

  function handleNameChange(val) {
    setForm(f => ({ ...f, name: val, slug: slugTouched ? f.slug : slugify(val) }))
  }

  async function handleImageUpload(e, field) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadProductImage(file)
      setForm(f => ({ ...f, [field]: url }))
    } catch (err) {
      setError(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    if (!form.name.trim())   { setError('Product name is required.'); return }
    if (!form.slug.trim())   { setError('Slug is required.'); return }
    if (!form.price || isNaN(Number(form.price))) { setError('Enter a valid price.'); return }

    setSaving(true)
    setError('')
    try {
      const payload = {
        name: form.name.trim(),
        slug: slugify(form.slug),
        price: Number(form.price),
        discount_percent: form.discount_percent ? Number(form.discount_percent) : null,
        stock_quantity: form.stock_quantity !== '' ? Number(form.stock_quantity) : null,
        collection_id: form.collection_id || null,
        image_url: form.image_url || null,
        image_url_2: form.image_url_2 || null,
        sort_order: Number(form.sort_order) || 0,
        active: form.active,
        sizes: form.sizes,
      }
      if (product) {
        await updateProduct(product.id, payload)
      } else {
        await createProduct(payload)
      }
      onSaved()
    } catch (err) {
      setError(err.message || 'Something went wrong saving this product.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.5)' }} />
          <motion.div key="drw" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '440px', maxWidth: '94vw', zIndex: 301, background: W, display: 'flex', flexDirection: 'column', boxShadow: '-12px 0 50px rgba(0,0,0,0.18)' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
              <h2 style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK }}>{product ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={onClose} style={{ width: '34px', height: '34px', border: `1px solid ${BR}`, background: W, borderRadius: '8px', cursor: 'pointer', ...F, fontSize: '14px', color: MD }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Image 1 (Front) */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Image 1 (Front)</p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '72px', height: '90px', background: LG, borderRadius: '6px', overflow: 'hidden', flexShrink: 0, border: `1px solid ${BR}` }}>
                    {form.image_url && <img src={form.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={e => handleImageUpload(e, 'image_url')} style={{ display: 'none' }} />
                    <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                      style={{ padding: '9px 16px', background: LG, border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 600, color: DK, cursor: uploading ? 'not-allowed' : 'pointer' }}>
                      {uploading ? 'Uploading...' : form.image_url ? 'Change Image' : 'Upload Image'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Image 2 (Back) */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Image 2 (Back)</p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '72px', height: '90px', background: LG, borderRadius: '6px', overflow: 'hidden', flexShrink: 0, border: `1px solid ${BR}` }}>
                    {form.image_url_2 && <img src={form.image_url_2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div>
                    <input ref={fileRef2} type="file" accept="image/*" onChange={e => handleImageUpload(e, 'image_url_2')} style={{ display: 'none' }} />
                    <button type="button" onClick={() => fileRef2.current?.click()} disabled={uploading}
                      style={{ padding: '9px 16px', background: LG, border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '12px', fontWeight: 600, color: DK, cursor: uploading ? 'not-allowed' : 'pointer' }}>
                      {uploading ? 'Uploading...' : form.image_url_2 ? 'Change Image' : 'Upload Image'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Name</p>
                <input value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="e.g. ARI"
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* Slug */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Slug <span style={{ fontWeight: 300, color: MD }}>(used in the product URL)</span></p>
                <input value={form.slug} onChange={e => { setSlugTouched(true); setForm(f => ({ ...f, slug: e.target.value })) }} placeholder="ari"
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* Price + Discount */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Price (GH₵)</p>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="1650"
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Discount % <span style={{ fontWeight: 300, color: MD }}>(optional)</span></p>
                  <input type="number" value={form.discount_percent} onChange={e => setForm(f => ({ ...f, discount_percent: e.target.value }))} placeholder="20"
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* Stock quantity */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>
                  Stock Quantity <span style={{ fontWeight: 300, color: MD }}>(leave blank if untracked)</span>
                </p>
                <input type="number" min="0" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))} placeholder="e.g. 12"
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* Collection */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Collection</p>
                <select value={form.collection_id} onChange={e => setForm(f => ({ ...f, collection_id: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '6px', background: W, ...F, fontSize: '13px', color: DK, outline: 'none', cursor: 'pointer' }}>
                  <option value="">No collection</option>
                  {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Sizes */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>
                  Available Sizes <span style={{ fontWeight: 300, color: MD }}>(tick the sizes this product comes in)</span>
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ALL_SIZES.map(s => {
                    const on = form.sizes.includes(s)
                    return (
                      <button key={s} type="button"
                        onClick={() => setForm(f => ({ ...f, sizes: on ? f.sizes.filter(x => x !== s) : [...f.sizes, s] }))}
                        style={{ padding: '7px 16px', border: `1.5px solid ${on ? G : BR}`, background: on ? GL : W, ...F, fontSize: '12px', fontWeight: on ? 700 : 400, color: on ? G : MD, cursor: 'pointer', borderRadius: '4px', transition: 'all 0.15s' }}>
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sort order */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Sort Order <span style={{ fontWeight: 300, color: MD }}>(lower shows first)</span></p>
                <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '6px', ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* Active toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <button type="button" onClick={() => setForm(f => ({ ...f, active: !f.active }))}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', background: form.active ? G : '#D1D5DB', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: W, position: 'absolute', top: '3px', left: form.active ? '23px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </button>
                <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>
                  {form.active ? 'Visible on site' : 'Hidden from site'}
                </span>
              </label>

              {error && (
                <p style={{ ...F, fontSize: '12px', color: RD, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', padding: '10px 12px' }}>
                  {error}
                </p>
              )}
            </div>

            <div style={{ padding: '16px 24px', borderTop: `1px solid ${BR}`, flexShrink: 0, display: 'flex', gap: '10px' }}>
              <button onClick={onClose} disabled={saving}
                style={{ flex: 1, padding: '12px', background: LG, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || uploading}
                style={{ flex: 1, padding: '12px', background: G, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 700, color: W, cursor: (saving || uploading) ? 'not-allowed' : 'pointer', opacity: (saving || uploading) ? 0.7 : 1 }}>
                {saving ? 'Saving...' : product ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════
export default function AdminProducts() {
  const [products,    setProducts]    = useState([])
  const [collections, setCollections] = useState([])
  const [loading,      setLoading]     = useState(true)
  const [error,        setError]       = useState('')
  const [search,       setSearch]      = useState('')
  const [colFilter,    setColFilter]   = useState('all')

  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const [prods, cols] = await Promise.all([getAllProductsAdmin(), getCollections()])
      setProducts(prods || [])
      setCollections(cols || [])
    } catch (err) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (colFilter !== 'all' && p.collection?.id !== colFilter) return false
      if (search.trim() && !p.name.toLowerCase().includes(search.trim().toLowerCase())) return false
      return true
    })
  }, [products, search, colFilter])

  function openAdd() { setEditingProduct(null); setDrawerOpen(true) }
  function openEdit(p) { setEditingProduct(p); setDrawerOpen(true) }
  function closeDrawer() { setDrawerOpen(false) }

  async function handleSaved() {
    setDrawerOpen(false)
    await load()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteProduct(deleteTarget.id)
      setDeleteTarget(null)
      await load()
    } catch (err) {
      setError(err.message || 'Failed to delete product')
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminLayout title="Products">

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
          style={{ flex: 1, minWidth: '200px', padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '8px', ...F, fontSize: '13px', color: DK, outline: 'none' }} />
        <select value={colFilter} onChange={e => setColFilter(e.target.value)}
          style={{ padding: '10px 14px', border: `1px solid ${BR}`, borderRadius: '8px', background: W, ...F, fontSize: '13px', color: DK, outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Collections</option>
          {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button onClick={openAdd}
          style={{ padding: '10px 20px', background: G, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 700, color: W, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          + Add Product
        </button>
      </div>

      {error && (
        <div style={{ padding: '14px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', ...F, fontSize: '13px', color: RD, marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <div style={{ background: W, border: `1px solid ${BR}`, borderRadius: '10px', overflow: 'hidden' }}>

        {/* Header row */}
        <div className="admin-product-row admin-product-header" style={{ display: 'grid', gridTemplateColumns: '56px 1fr 140px 110px 90px 90px', gap: '14px', padding: '12px 16px', background: LG, borderBottom: `1px solid ${BR}` }}>
          {[
            { label: '', cls: '' },
            { label: 'Product', cls: '' },
            { label: 'Price', cls: 'admin-product-price' },
            { label: 'Status', cls: 'admin-product-status' },
            { label: '', cls: '' },
            { label: '', cls: '' },
          ].map((h, i) => (
            <span key={i} className={h.cls} style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h.label}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p style={{ ...F, fontSize: '13px', color: MD }}>Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '6px' }}>No products found</p>
            <p style={{ ...F, fontSize: '13px', color: MD, marginBottom: '20px' }}>
              {products.length === 0 ? 'Add your first product to get started.' : 'Try a different search or filter.'}
            </p>
            {products.length === 0 && (
              <button onClick={openAdd} style={{ padding: '11px 28px', background: G, border: 'none', borderRadius: '8px', ...F, fontSize: '13px', fontWeight: 700, color: W, cursor: 'pointer' }}>
                + Add Product
              </button>
            )}
          </div>
        ) : (
          filtered.map(p => (
            <ProductRow key={p.id} product={p} onEdit={openEdit} onDeleteRequest={setDeleteTarget} />
          ))
        )}
      </div>

      <p style={{ ...F, fontSize: '12px', color: MD, marginTop: '14px' }}>
        {filtered.length} of {products.length} {products.length === 1 ? 'product' : 'products'}
      </p>

      <ProductDrawer
        open={drawerOpen}
        product={editingProduct}
        collections={collections}
        onClose={closeDrawer}
        onSaved={handleSaved}
      />

      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            product={deleteTarget}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={confirmDelete}
            deleting={deleting}
          />
        )}
      </AnimatePresence>

    </AdminLayout>
  )
}
