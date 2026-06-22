import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../../store/useCartStore'
import { useWishlist } from '../../hooks/useWishlist'
import { imgCard } from '../../lib/images'
import { supabase } from '../../lib/supabase'
import QuickView from '../QuickView'
import ApproxPrice from '../ApproxPrice'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#666'
const LG  = '#F5F5F5'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const F   = { fontFamily: "'Inter', sans-serif" }

const DISCOUNTS = [null, -22, null, -13, -29, null, -23, -15]

function StarRating() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="#EEE" stroke="#DDD" strokeWidth="0.8">
          <path d="M5.5 1l1.1 3.4h3.5L7.4 6.6l1.1 3.4L5.5 8.4 2.5 10l1.1-3.4L1 4.4h3.5z"/>
        </svg>
      ))}
      <span style={{ ...F, fontSize: '11px', color: MD, marginLeft: '3px' }}>0.0</span>
    </div>
  )
}

function ProductCard({ product, index, discount, onQuickView }) {
  const [hovered, setHovered] = useState(false)
  const addItem     = useCartStore(s => s.addItem)
  const { toggle, isFavorited } = useWishlist()
  const faved = isFavorited(product.id)
  const originalPrice = discount ? Math.round(product.price / (1 - Math.abs(discount) / 100)) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: W, border: `1px solid ${hovered ? '#CCC' : BR}`, transition: 'border-color 0.2s' }}>

      <div style={{ position: 'relative', aspectRatio: '3/4', background: LG, overflow: 'hidden' }}>
        <img
          src={imgCard(product.image_url) || ''}
          alt={product.name}
          loading="lazy" decoding="async"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=75&fit=crop' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {discount && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: RD, color: W, padding: '4px 10px', borderRadius: '4px', ...F, fontSize: '12px', fontWeight: 700 }}>
            {discount}%
          </div>
        )}

        <button
          onClick={e => { e.stopPropagation(); toggle({ ...product, category: product.collection?.name }) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '36px', height: '36px', borderRadius: '50%', background: W, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.15)', fontSize: '17px', color: faved ? RD : '#CCC', transition: 'color 0.2s, transform 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.color = RD }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = faved ? RD : '#CCC' }}>
          {faved ? '♥' : '♡'}
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="desktop-only"
              style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', gap: '6px' }}>
              <button
                onClick={() => onQuickView(product)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.93)', border: 'none', padding: '9px 6px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6s1.5-4 5-4 5 4 5 4-1.5 4-5 4-5-4-5-4z" stroke="currentColor" strokeWidth="1.2"/></svg>
                Quick View
              </button>
              <button
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY', badge: product.badge })}
                style={{ flex: 1, background: DK, border: 'none', padding: '9px 6px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = G }}
                onMouseLeave={e => { e.currentTarget.style.background = DK }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1h1.5l1.5 6h5.5l1.5-4.5H3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="5.5" cy="10" r="0.8" fill="currentColor"/><circle cx="8.5" cy="10" r="0.8" fill="currentColor"/></svg>
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div style={{ padding: '12px 12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
          <StarRating />
        </div>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '2px', lineHeight: 1.35 }}>{product.name}</p>
        <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: MD, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '8px' }}>{product.collection?.name || 'STAAY'}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK }}>GH₵{Number(product.price).toLocaleString()}</span>
          {originalPrice && <span style={{ ...F, fontSize: '13px', color: '#AAA', textDecoration: 'line-through' }}>GH₵{Number(originalPrice).toLocaleString()}</span>}
          <span style={{ ...F, fontSize: '11px', color: MD, marginLeft: 'auto' }}>(0)</span>
        </div>
        <ApproxPrice ghs={product.price} style={{ marginTop: '-6px', marginBottom: '8px' }} />
        <div style={{ display: 'inline-block', background: '#FFF9C4', border: '1px solid #F6E05E', padding: '3px 10px', borderRadius: '4px', ...F, fontSize: '11px', fontWeight: 500, color: '#744210' }}>
          In Stock
        </div>

        {/* Mobile-only quick actions */}
        <div className="mobile-only" style={{ display: 'none', gap: '6px', marginTop: '10px' }}>
          <button
            onClick={() => onQuickView(product)}
            style={{ flex: 1, background: LG, border: `1px solid ${BR}`, padding: '8px 6px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer' }}>
            Quick View
          </button>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY', badge: product.badge })}
            style={{ flex: 1, background: DK, border: 'none', padding: '8px 6px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function DiscoverProducts() {
  const [products,    setProducts]    = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, collection:collections(id, slug, name)')
          .eq('active', true)
          .order('sort_order', { ascending: true })
          .limit(8)
        if (error) throw error
        setProducts(data || [])
      } catch (err) {
        console.error('DiscoverProducts error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="page-padding" style={{ background: W, padding: '48px 40px 56px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ ...F, fontSize: '22px', fontWeight: 700, color: DK }}>Discover Your Best Products</h2>
          <Link to="/shop" style={{ ...F, fontSize: '13px', fontWeight: 500, color: G }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            View all →
          </Link>
        </div>

        {error && (
          <div style={{ padding: '16px', background: '#FEF2F2', border: '1px solid #FECACA', marginBottom: '24px', ...F, fontSize: '13px', color: RD }}>
            Failed to load products: {error}
          </div>
        )}

        {loading && (
          <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ border: `1px solid ${BR}` }}>
                <div style={{ aspectRatio: '3/4', background: LG, animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ height: '12px', background: LG, width: '80%', marginBottom: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '16px', background: LG, width: '50%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid-4-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} discount={DISCOUNTS[i] || null} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ ...F, fontSize: '15px', color: MD }}>No products found.</p>
          </div>
        )}

        {!loading && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: G, color: W, padding: '14px 52px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#9A7830' }}
              onMouseLeave={e => { e.currentTarget.style.background = G }}>
              VIEW ALL PRODUCTS →
            </Link>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </AnimatePresence>

    </section>
  )
}
