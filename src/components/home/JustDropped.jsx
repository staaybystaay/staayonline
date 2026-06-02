import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../../store/useCartStore'

const G   = '#B8903A'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const B2  = '#F2EFE9'
const BK  = '#111111'
const DK  = '#222222'
const RD  = '#B91C1C'
const BR  = '#E4E0D8'
const F   = { fontFamily: "'Inter', sans-serif" }

const drops = [
  { id: 'f1', name: 'Air STAAY 01',   price: 320, image: '/Kaia-new.jpg',    tag: 'New'  },
  { id: 'f2', name: 'Void Hoodie',    price: 195, image: '/hoodie.jpg',  tag: null   },
  { id: 'f3', name: 'Cargo Pant 02',  price: 240, image: '/Elara-new.jpg',  tag: 'New'  },
  { id: 'f4', name: 'Phantom Jacket', price: 420, image: '/phantom.jpg', tag: null   },
  { id: 'f5', name: 'STAAY Crocs',    price: 280, image: '/Vera.new.jpg',   tag: 'Sale' },
]

export default function JustDropped() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{ background: W, padding: '64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Just In
            </p>
            <h2 style={{ ...F, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, display: 'flex', alignItems: 'center', gap: '6px', borderBottom: `1px solid ${DK}`, paddingBottom: '1px', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            View All →
          </Link>
        </div>

        <div className="hide-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
          {drops.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ flexShrink: 0, width: '210px' }}>
              <div style={{ position: 'relative', height: '260px', background: B2, overflow: 'hidden', marginBottom: '12px' }}>
                <img
                  src={item.image} alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s', transform: hovered === item.id ? 'scale(1.05)' : 'scale(1)' }}
                />
                {item.tag && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: item.tag === 'Sale' ? RD : BK, color: W, padding: '4px 10px', ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {item.tag}
                  </span>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: BK, transform: hovered === item.id ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s' }}>
                  <button
                    onClick={() => addItem({ ...item, badge: item.tag })}
                    style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Add to Bag
                  </button>
                </div>
              </div>
              <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, marginBottom: '3px' }}>{item.name}</p>
              <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: G }}>GH₵{item.price}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
