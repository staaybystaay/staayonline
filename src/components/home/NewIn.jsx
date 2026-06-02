import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCartStore from '../../store/useCartStore'

const G  = '#B8903A'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#1A1612'
const MD = '#888'
const BR = '#E8E4DF'
const B2 = '#F4F1ED'
const F  = { fontFamily: "'Inter', sans-serif" }

const items = [
  { id: 'e1', name: 'ARI',     price: 1650, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&q=80&fit=crop' },
  { id: 'e4', name: 'SOLENNE', price: 2600, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80&fit=crop' },
  { id: 'e6', name: 'AURA',    price: 2900, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80&fit=crop' },
  { id: 'e8', name: 'EVE',     price: 2400, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80&fit=crop' },
]

export default function NewIn() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{ background: W, padding: '72px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ ...F, fontSize: '22px', fontWeight: 600, color: DK, letterSpacing: '-0.01em' }}>New In</h2>
          <Link to="/shop" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, letterSpacing: '0.02em', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = DK }}
            onMouseLeave={e => { e.currentTarget.style.color = MD }}>
            View all →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ position: 'relative', cursor: 'pointer' }}>

              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '2/3', background: B2, overflow: 'hidden' }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === p.id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                {/* Minimal add to bag */}
                <button
                  onClick={() => addItem({ ...p, badge: 'New', category: p.label })}
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(255,255,255,0.92)',
                    border: 'none', padding: '13px',
                    ...F, fontSize: '11px', fontWeight: 500,
                    color: DK, cursor: 'pointer',
                    letterSpacing: '0.04em',
                    opacity: hovered === p.id ? 1 : 0,
                    transform: hovered === p.id ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.25s, transform 0.25s',
                  }}>
                  Add to bag
                </button>
              </div>

              {/* Info */}
              <div style={{ padding: '10px 0 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: MD, marginBottom: '2px' }}>{p.label}</p>
                    <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK }}>{p.name}</p>
                  </div>
                  <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK }}>GH₵{p.price.toLocaleString()}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
