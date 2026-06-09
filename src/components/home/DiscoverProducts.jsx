import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCartStore from '../../store/useCartStore'
import useFavoritesStore from '../../store/useFavoritesStore'
import { supabase } from '../../lib/supabase'
import { imgCard } from '../../lib/images'

const G   = '#B8903A'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#666'
const LG  = '#F5F5F5'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const F   = { fontFamily: "'Inter', sans-serif" }

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem    = useCartStore(s => s.addItem)
  const toggle     = useFavoritesStore(s => s.toggle)
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
      style={{ background: W, cursor: 'pointer' }}>

      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '3/4', background: LG, overflow: 'hidden' }}>
        <img
          src={imgCard(product.image_url)}
          alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Heart button — top right, circular white */}
        <button
          onClick={e => { e.stopPropagation(); toggle({ ...product, category: product.collection?.name }) }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '34px', height: '34px', borderRadius: '50%',
            background: W, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 6px rgba(0,0,0,0.12)',
            fontSize: '16px', color: faved ? RD : '#CCC',
            transition: 'color 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = RD }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = faved ? RD : '#CCC' }}>
          {faved ? '♥' : '♡'}
        </button>

        {/* Discount badge — top left red */}
        {product.badge === 'Sale' && (
          <div style={{
            position: 'absolute', top: '10px', left: '10px',
            background: RD, color: W,
            padding: '3px 8px',
            ...F, fontSize: '11px', fontWeight: 700,
          }}>
            SALE
          </div>
        )}

        {product.badge === 'New' && (
          <div style={{
            position: 'absolute', top: '10px', left: '10px',
            background: DK, color: W,
            padding: '3px 8px',
            ...F, fontSize: '11px', fontWeight: 700,
          }}>
            NEW
          </div>
        )}

        {/* Quick add — slides up on hover */}
        <button
          onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY', badge: product.badge })}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(26,22,18,0.92)',
            border: 'none', color: W, cursor: 'pointer',
            padding: '13px',
            ...F, fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.25s, transform 0.25s',
          }}>
          Add to Bag
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '12px 4px 16px' }}>

        {/* Collection label */}
        <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: MD, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>
          {product.collection?.name}
        </p>

        {/* Product name */}
        <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK, marginBottom: '8px', lineHeight: 1.3 }}>
          {product.name}
        </p>

        {/* Price */}
        <p style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK }}>
          GH₵{Number(product.price).toLocaleString()}
        </p>

        {/* Stock indicator */}
        {product.in_stock && (
          <div style={{
            display: 'inline-block', marginTop: '8px',
            background: '#FFF9C4', border: '1px solid #F6E05E',
            padding: '3px 10px',
            ...F, fontSize: '11px', fontWeight: 500, color: '#744210',
          }}>
            In Stock
          </div>
        )}

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
      .then(({ data }) => {
        setProducts(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <section style={{ background: W, padding: '48px 40px 56px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px' }}>
          <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.01em' }}>
            Discover Your Best Products
          </h2>
          <Link to="/shop" style={{ ...F, fontSize: '13px', fontWeight: 500, color: G, transition: 'opacity 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            View all →
          </Link>
        </div>

        {/* 4-column grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div style={{ aspectRatio: '3/4', background: LG, animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '14px', background: LG, margin: '10px 0 6px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: '16px', background: LG, width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
              </div>
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}

      </div>
    </section>
  )
}
