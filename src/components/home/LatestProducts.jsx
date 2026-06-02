import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCartStore from '../../store/useCartStore'

const G  = '#B8903A'
const W  = '#FFFFFF'
const OW = '#F8F7F4'
const BK = '#111111'
const DK = '#222222'
const MD = '#666666'
const BR = '#E4E0D8'
const B2 = '#F2EFE9'
const F  = { fontFamily: "'Inter', sans-serif" }

const products = [
  { id: 'e1',  name: 'ARI',     price: 1650, collection: 'Eden',   image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&q=75&fit=crop' },
  { id: 'e2',  name: 'MIRA',    price: 1950, collection: 'Eden',   image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=75&fit=crop' },
  { id: 'e3',  name: 'VERA',    price: 1700, collection: 'Eden',   image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=75&fit=crop' },
  { id: 'e5',  name: 'AYLA',    price: 1900, collection: 'Eden',   image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=75&fit=crop' },
  { id: 'l1',  name: 'AMOR',    price: 2900, collection: 'Love',   image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=75&fit=crop' },
  { id: 'l2',  name: 'LIEBE',   price: 1900, collection: 'Love',   image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500&q=75&fit=crop' },
  { id: 'b1',  name: 'ZURI',    price: 3500, collection: 'Bold',   image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=75&fit=crop' },
  { id: 'b3',  name: 'ZAYA',    price: 1900, collection: 'Bold',   image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=75&fit=crop' },
]

const collectionLabel = {
  Eden: 'Eden Collection',
  Love: 'The Love Edit',
  Bold: 'Bold & Beautiful',
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{ position: 'relative', aspectRatio: '3/4', background: B2, overflow: 'hidden', marginBottom: '12px' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <span style={{
          position: 'absolute', top: '10px', left: '10px',
          background: G, color: W, padding: '3px 10px',
          ...F, fontSize: '9px', fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          New
        </span>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, background: BK,
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s',
        }}>
          <button
            onClick={() => addItem({ ...product, badge: 'New', category: collectionLabel[product.collection] })}
            style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Add to Bag
          </button>
        </div>
      </div>

      <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>
        {collectionLabel[product.collection]}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK }}>{product.name}</p>
        <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK }}>GH₵{product.price.toLocaleString()}</p>
      </div>

    </motion.div>
  )
}

export default function LatestProducts() {
  return (
    <section style={{ background: OW, padding: '80px 64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              All Collections
            </p>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: DK, letterSpacing: '-0.025em' }}>
              Latest Products
            </h2>
          </div>
          <Link
            to="/shop"
            style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, borderBottom: `1px solid ${DK}`, paddingBottom: '1px', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            View All Products →
          </Link>
        </div>

        {/* 4x2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px 16px' }}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            to="/shop"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: BK, color: W, padding: '14px 48px',
              ...F, fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.04em', transition: 'background 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = BK }}>
            View All Products →
          </Link>
        </div>

      </div>
    </section>
  )
}
