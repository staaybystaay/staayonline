import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../../store/useCartStore'
import useFavoritesStore from '../../store/useFavoritesStore'
import { supabase } from '../../lib/supabase'
import { imgCard } from '../../lib/images'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#666'
const LG  = '#F5F5F5'
const RD  = '#E53E3E'
const F   = { fontFamily: "'Inter', sans-serif" }

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem     = useCartStore(s => s.addItem)
  const toggle      = useFavoritesStore(s => s.toggle)
  const isFavorited = useFavoritesStore(s => s.isFavorited)
  const faved = isFavorited(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: W }}>

      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '3/4', background: LG, overflow: 'hidden' }}>
        <img
          src={imgCard(product.image_url)}
          alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Heart — top right white circle */}
        <button
          onClick={e => { e.stopPropagation(); toggle({ ...product, category: product.collection?.name }) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', background: W, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.12)', fontSize: '16px', color: faved ? RD : '#CCC', transition: 'color 0.2s, transform 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = RD }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = faved ? RD : '#CCC' }}>
          {faved ? '♥' : '♡'}
        </button>

        {/* Badge */}
        {product.badge && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: product.badge === 'Sale' ? RD : DK, color: W, padding: '3px 8px', ...F, fontSize: '11px', fontWeight: 700 }}>
            {product.badge}
          </div>
        )}

        {/* Hover buttons — Quick View + Add to Cart like Damsyn */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', gap: '6px' }}>
              <button
                style={{ flex: 1, background: 'rgba(255,255,255,0.92)', border: 'none', padding: '10px 8px', ...F, fontSize: '11px', fontWeight: 600, color: DK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = W }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.92)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6s1.7-4 5-4 5 4 5 4-1.7 4-5 4-5-4-5-4z" stroke="currentColor" strokeWidth="1.2"/></svg>
                Quick View
              </button>
              <button
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY', badge: product.badge })}
                style={{ flex: 1, background: DK, border: 'none', padding: '10px 8px', ...F, fontSize: '11px', fontWeight: 600, color: W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = G }}
                onMouseLeave={e => { e.currentTarget.style.background = DK }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1h1.5l1.2 5.5H9l1-3.5H3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="5.5" cy="9.5" r="0.8" fill="currentColor"/><circle cx="8.5" cy="9.5" r="0.8" fill="currentColor"/></svg>
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div style={{ padding: '10px 2px 14px' }}>
        <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: MD, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '3px' }}>
          {product.collection?.name}
        </p>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '6px', lineHeight: 1.3 }}>
          {product.name}
        </p>
        <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '6px' }}>
          GH₵{Number(product.price).toLocaleString()}
        </p>
        <div style={{ display: 'inline-block', background: '#FFF9C4', border: '1px solid #F6E05E', padding: '2px 8px', ...F, fontSize: '10px', fontWeight: 500, color: '#744210' }}>
          In Stock
        </div>
      </div>
    </motion.div>
  )
}

export default function DiscoverProducts() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    supabase
      .from('products')
      .select('*, collection:collections(id, slug, name)')
      .eq('active', true)
      .eq('in_stock', true)
      .order('sort_order', { ascending: true })
      .limit(8)
      .then(({ data }) => { setProducts(data || []); setLoading(false) })
  }, [])

  return (
    <section style={{ background: W, padding: '48px 40px 56px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px' }}>
          <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.01em' }}>
            Discover Your Best Products
          </h2>
          <Link to="/shop" style={{ ...F, fontSize: '13px', fontWeight: 500, color: G }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            View all →
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div style={{ aspectRatio: '3/4', background: LG, animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '13px', background: LG, margin: '10px 0 6px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '15px', background: LG, width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
              </div>
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}

        {/* View All Products button — like Damsyn */}
        {!loading && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: DK, color: W,
                padding: '14px 48px',
                ...F, fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = G }}
              onMouseLeave={e => { e.currentTarget.style.background = DK }}>
              View All Products →
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
