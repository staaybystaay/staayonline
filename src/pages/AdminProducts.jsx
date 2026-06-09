import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { imgThumb } from '../lib/images'
import ImageUpload from '../components/ImageUpload'
import { useAuth } from '../hooks/useAuth'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const FT  = '#999999'
const BR  = '#E4E0D8'
const F   = { fontFamily: "'Inter', sans-serif" }

// ─── ADMIN EMAILS — add yours here ────────────
const ADMIN_EMAILS = [
  'info@staayonline.com',
  // add more admin emails here
]

export default function AdminProducts() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()

  const [products,    setProducts]    = useState([])
  const [collections, setCollections] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [selected,    setSelected]    = useState(null)
  const [filter,      setFilter]      = useState('all')
  const [search,      setSearch]      = useState('')

  // Guard — only admins
  useEffect(() => {
    if (authLoading) return
    if (!user) { navigate('/login'); return }
    if (!ADMIN_EMAILS.includes(user.email)) { navigate('/'); return }
  }, [user, authLoading, navigate])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [prodRes, colRes] = await Promise.all([
        supabase.from('products').select('*, collection:collections(id, slug, name)').order('sort_order', { ascending: true }),
        supabase.from('collections').select('*').order('created_at', { ascending: true }),
      ])
      if (prodRes.data)  setProducts(prodRes.data)
      if (colRes.data)   setCollections(colRes.data)
      setLoading(false)
    }
    if (user && ADMIN_EMAILS.includes(user.email)) load()
  }, [user])

  function handleUploadSuccess(path, productId) {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, image_url: path } : p))
    setSelected(null)
  }

  const filtered = products.filter(p => {
    const matchCol    = filter === 'all' || p.collection?.slug === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCol && matchSearch
  })

  if (authLoading || loading) {
    return (
      <div style={{ background: W, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...F, fontSize: '14px', color: MD }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ background: OW, minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '24px 64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Link to="/" style={{ ...F, fontSize: '12px', color: MD }}>Home</Link>
              <span style={{ color: FT, fontSize: '12px' }}>/</span>
              <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Admin — Products</span>
            </div>
            <h1 style={{ ...F, fontSize: '24px', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              Product Images
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ ...F, fontSize: '13px', fontWeight: 400, color: MD, padding: '8px 16px', background: OW, border: `1px solid ${BR}` }}>
              {products.length} products · {products.filter(p => p.image_url && !p.image_url.startsWith('/')).length} on Supabase Storage
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 64px 96px' }}>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
          <input
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '10px 14px', border: `1px solid ${BR}`, background: W, ...F, fontSize: '13px', color: DK, outline: 'none', width: '240px' }}
          />
          <div style={{ display: 'flex', gap: '6px' }}>
            {[{ slug: 'all', name: 'All' }, ...collections].map(col => (
              <button key={col.slug || col.id}
                onClick={() => setFilter(col.slug || 'all')}
                style={{ padding: '8px 16px', background: filter === (col.slug || 'all') ? BK : 'transparent', border: `1px solid ${filter === (col.slug || 'all') ? BK : BR}`, color: filter === (col.slug || 'all') ? W : DK, ...F, fontSize: '12px', fontWeight: filter === (col.slug || 'all') ? 600 : 400, cursor: 'pointer', borderRadius: '100px', transition: 'all 0.18s', whiteSpace: 'nowrap' }}>
                {col.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {filtered.map((product, i) => {
            const hasStorageImage = product.image_url && !product.image_url.startsWith('/')
            const isSelected = selected?.id === product.id

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                style={{ background: W, border: `1px solid ${isSelected ? G : BR}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>

                {/* Image area */}
                <div style={{ position: 'relative', aspectRatio: '3/4', background: OW }}>
                  {product.image_url ? (
                    <img
                      src={imgThumb(product.image_url)}
                      alt={product.name}
                      onError={e => { e.target.style.display = 'none' }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '28px' }}>📷</span>
                      <p style={{ ...F, fontSize: '11px', color: FT }}>No image</p>
                    </div>
                  )}

                  {/* Storage badge */}
                  <div style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: hasStorageImage ? '#F0FDF4' : '#FEF9C3',
                    border: `1px solid ${hasStorageImage ? '#BBF7D0' : '#FDE68A'}`,
                    padding: '2px 8px',
                    ...F, fontSize: '9px', fontWeight: 600,
                    color: hasStorageImage ? '#166534' : '#854D0E',
                    letterSpacing: '0.04em',
                  }}>
                    {hasStorageImage ? 'Supabase' : 'Local'}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {product.collection?.name}
                  </p>
                  <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK, marginBottom: '4px' }}>
                    {product.name}
                  </p>
                  <p style={{ ...F, fontSize: '13px', fontWeight: 400, color: MD, marginBottom: '12px' }}>
                    GH₵{Number(product.price).toLocaleString()}
                  </p>

                  <button
                    onClick={() => setSelected(isSelected ? null : product)}
                    style={{ width: '100%', padding: '9px', background: isSelected ? GL : 'transparent', border: `1px solid ${isSelected ? G : BR}`, color: isSelected ? G : MD, ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}}
                    onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}}>
                    {isSelected ? 'Cancel' : 'Upload Image'}
                  </button>
                </div>

                {/* Upload panel */}
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ padding: '0 14px 14px', borderTop: `1px solid ${BR}` }}>
                    <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: DK, letterSpacing: '0.04em', margin: '12px 0 10px' }}>
                      New Image for {product.name}
                    </p>
                    <ImageUpload
                      product={product}
                      onSuccess={(path) => handleUploadSuccess(path, product.id)}
                    />
                  </motion.div>
                )}

              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK, marginBottom: '8px' }}>No products found</p>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD }}>Try adjusting your search or filter.</p>
          </div>
        )}

      </div>
    </div>
  )
}
