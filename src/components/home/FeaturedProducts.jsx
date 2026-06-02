
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

const featured = [
  {
    id: 'e1',
    name: 'ARI',
    collection: 'Eden Collection',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80&fit=crop',
  },
  {
    id: 'e4',
    name: 'SOLENNE',
    collection: 'Eden Collection',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80&fit=crop',
  },
  {
    id: 'e6',
    name: 'AURA',
    collection: 'Eden Collection',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fit=crop',
  },
]

export default function FeaturedProducts() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{ background: W, padding: '80px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Hand-picked
            </p>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: DK, letterSpacing: '-0.025em' }}>
              Featured Products
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

        {/* 3 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}>

              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '3/4', background: B2, overflow: 'hidden', marginBottom: '16px' }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === p.id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                <span style={{
                  position: 'absolute', top: '12px', left: '12px',
                  background: G, color: W, padding: '4px 10px',
                  ...F, fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  New
                </span>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: BK,
                  transform: hovered === p.id ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform 0.3s',
                }}>
                  <button
                    onClick={() => addItem({ ...p, badge: 'New', category: 'Eden Collection' })}
                    style={{ width: '100%', padding: '14px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Add to Bag
                  </button>
                </div>
              </div>

              {/* Info */}
              <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {p.collection}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK }}>{p.name}</p>
                <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK }}>GH₵{p.price.toLocaleString()}</p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
