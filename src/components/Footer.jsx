import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const B2  = '#F2EFE9'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const FT  = '#999999'
const BR  = '#E4E0D8'
const F   = { fontFamily: "'Inter', sans-serif" }

// Using actual Eden collection pieces — consistent, on-brand
const drops = [
  { id: 'e1',  name: 'ARI',     price: 1650, image: '/Ari.jpeg',     collection: 'Eden Collection' },
  { id: 'e6',  name: 'AURA',    price: 2900, image: '/Aura.jpeg',    collection: 'Eden Collection' },
  { id: 'e7',  name: 'KAIA',    price: 2900, image: '/Kaia.png',     collection: 'Eden Collection' },
  { id: 'e8',  name: 'EVE',     price: 2400, image: '/Eve.png',      collection: 'Eden Collection' },
  { id: 'e10', name: 'DAHLIA',  price: 2200, image: '/Dahlia.jpeg',  collection: 'Eden Collection' },
]

export default function JustDropped() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{ background: W, padding: '80px 64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '24px', height: '1px', background: G }} />
              <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Just In
              </span>
            </div>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            style={{
              ...F, fontSize: '13px', fontWeight: 500, color: DK,
              display: 'flex', alignItems: 'center', gap: '6px',
              borderBottom: `1px solid ${DK}`, paddingBottom: '1px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            View All →
          </Link>
        </div>

        {/* Grid — 5 cards, uniform */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {drops.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}>

              {/* Image */}
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                background: B2,
                overflow: 'hidden',
                marginBottom: '12px',
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={e => { e.target.style.display = 'none' }}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === item.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />

                {/* New badge */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  background: G, color: W,
                  padding: '4px 10px',
                  ...F, fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  New
                </div>

                {/* Add to bag — slide up on hover */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: BK,
                  transform: hovered === item.id ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform 0.3s',
                }}>
                  <button
                    onClick={() => addItem({ ...item, badge: 'New', category: 'Eden Collection' })}
                    style={{
                      width: '100%', padding: '13px',
                      background: 'transparent', border: 'none',
                      color: W, cursor: 'pointer',
                      ...F, fontSize: '11px', fontWeight: 600,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                    Add to Bag
                  </button>
                </div>
              </div>

              {/* Info */}
              <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>
                Eden Collection
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK }}>{item.name}</p>
                <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK }}>GH₵{item.price.toLocaleString()}</p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
