import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import useFavoritesStore from '../store/useFavoritesStore'
import { getSaleProducts } from '../lib/api'
import QuickView from '../components/QuickView'

const G   = '#B8903A'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const RD  = '#E11D48'
const F   = { fontFamily: "'Inter', sans-serif" }

const SORT_OPTIONS = [
  { label: 'Biggest Discount', value: 'discount' },
  { label: 'Price: Low',       value: 'price_asc' },
  { label: 'Price: High',      value: 'price_desc' },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#E0DBD5">
          <path d="M5 1l1 3h3L6.5 6l1 3L5 7.5 2.5 9l1-3L1 4h3z"/>
        </svg>
      ))}
    </div>
  )
}

function SaleCard({ product, onQuickView }) {
  const [hovered, setHovered] = useState(false)
  const addItem     = useCartStore(s => s.addItem)
  const toggle      = useFavoritesStore(s => s.toggle)
  const isFavorited = useFavoritesStore(s => s.isFavorited)
  const faved       = isFavorited(product.id)

  const discount    = product.discount_percent
  const origPrice   = Math.round(product.price / (1 - discount / 100))

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: W }}>

      <div style={{ position: 'relative', aspectRatio: '3/4', background: LG, overflow: 'hidden', marginBottom: '10px' }}>
        <img src={product.image_url} alt={product.name} onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />

        <div style={{ position: 'absolute', top: '10px', left: '10px', background: RD, color: W, padding: '4px 10px', borderRadius: '4px', ...F, fontSize: '12px', fontWeight: 800, letterSpacing: '0.02em' }}>
          -{discount}%
        </div>

        <button onClick={e => { e.stopPropagation(); toggle({ ...product, category: product.collection?.name }) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', background: W, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.12)', fontSize: '16px', color: faved ? RD : '#CCC', transition: 'all 0.2s' }}>
          {faved ? '♥' : '♡'}
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
              className="desktop-only"
              style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', gap: '6px' }}>
              <button onClick={() => onQuickView(product)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.93)', border: 'none', padding: '9px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
                Quick View
              </button>
              <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY' })}
                style={{ flex: 1, background: DK, border: 'none', padding: '9px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer' }}>
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <Stars />
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginTop: '4px', marginBottom: '2px', lineHeight: 1.3 }}>{product.name}</p>
        <p style={{ ...F, fontSize: '11px', color: MD, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>{product.collection?.name || 'STAAY'}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ ...F, fontSize: '16px', fontWeight: 700, color: RD }}>GH₵{Number(product.price).toLocaleString()}</span>
          <span style={{ ...F, fontSize: '13px', color: FT, textDecoration: 'line-through' }}>GH₵{origPrice.toLocaleString()}</span>
        </div>

        {/* Mobile quick actions */}
        <div className="mobile-only" style={{ display: 'none', gap: '6px', marginTop: '10px' }}>
          <button onClick={() => onQuickView(product)}
            style={{ flex: 1, background: LG, border: `1px solid ${BR}`, padding: '8px 6px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
            Quick View
          </button>
          <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY' })}
            style={{ flex: 1, background: DK, border: 'none', padding: '8px 6px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Sale() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [sortBy,   setSortBy]   = useState('discount')
  const [sortOpen, setSortOpen] = useState(false)
  const [qvProduct, setQvProduct] = useState(null)

  useEffect(() => {
    getSaleProducts()
      .then(data => setProducts(data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'price_asc')  return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      return (b.discount_percent || 0) - (a.discount_percent || 0)
    })
  }, [products, sortBy])

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding" style={{ background: '#FFF1F2', borderBottom: `1px solid ${BR}`, padding: '28px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = RD }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Sale</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: RD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Limited Time
              </p>
              <h1 style={{ ...F, fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 900, color: DK, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                Sale
              </h1>
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, marginTop: '6px' }}>
                Pieces you love, for less — while stocks last.
              </p>
            </div>
            {!loading && <p style={{ ...F, fontSize: '13px', color: MD }}>{sorted.length} {sorted.length === 1 ? 'item' : 'items'} on sale</p>}
          </div>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      {sorted.length > 0 && (
        <div className="page-padding" style={{ background: W, borderBottom: `1px solid ${BR}`, padding: '0 40px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'flex-end', height: '52px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortOpen(v => !v)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0', background: 'transparent', border: 'none', ...F, fontSize: '12px', color: DK, cursor: 'pointer' }}>
                Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 48 }} onClick={() => setSortOpen(false)} />
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                      style={{ position: 'absolute', top: '100%', right: 0, zIndex: 49, minWidth: '180px', background: W, border: `1px solid ${BR}`, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                      {SORT_OPTIONS.map(opt => (
                        <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                          style={{ width: '100%', textAlign: 'left', padding: '11px 16px', border: 'none', borderBottom: `1px solid ${BR}`, background: sortBy === opt.value ? LG : W, ...F, fontSize: '13px', fontWeight: sortBy === opt.value ? 600 : 400, color: sortBy === opt.value ? RD : DK, cursor: 'pointer' }}>
                          {sortBy === opt.value && '✓ '}{opt.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 40px 96px' }}>

        {loading ? (
          <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 14px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div style={{ aspectRatio: '3/4', background: LG, animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '12px', background: LG, margin: '10px 0 6px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '16px', background: LG, width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
              </div>
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          </div>
        ) : error ? (
          <div style={{ padding: '16px', background: '#FEF2F2', border: '1px solid #FECACA', ...F, fontSize: '13px', color: RD }}>
            Failed to load sale items: {error}
          </div>
        ) : sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏷️</div>
            <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, marginBottom: '8px' }}>No items on sale right now</h2>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, marginBottom: '28px', maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
              We don't have any discounted pieces at the moment — check back soon or explore our full collection.
            </p>
            <Link to="/shop"
              style={{ display: 'inline-block', background: BK, color: W, padding: '14px 40px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = G }}
              onMouseLeave={e => { e.currentTarget.style.background = BK }}>
              Shop All Collections
            </Link>
          </div>
        ) : (
          <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 14px' }}>
            {sorted.map(p => <SaleCard key={p.id} product={p} onQuickView={setQvProduct} />)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {qvProduct && <QuickView product={qvProduct} onClose={() => setQvProduct(null)} />}
      </AnimatePresence>

    </div>
  )
}
