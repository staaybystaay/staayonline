import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const G  = '#B8903A'
const W  = '#FFFFFF'
const DK = '#1A1612'
const MD = '#888'
const F  = { fontFamily: "'Inter', sans-serif" }

const collections = [
  { id: 'eden', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80&fit=crop', name: 'Eden Collection', count: '10 pieces', href: '/shop' },
  { id: 'love', image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=700&q=80&fit=crop', name: 'The Love Edit',   count: '3 pieces',  href: '/shop' },
  { id: 'bold', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=700&q=80&fit=crop', name: 'Bold & Beautiful', count: '10 pieces', href: '/shop' },
]

export default function Collections() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: '#F7F5F2', padding: '72px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ ...F, fontSize: '22px', fontWeight: 600, color: DK, letterSpacing: '-0.01em' }}>Our Collections</h2>
          <Link to="/shop" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = DK }}
            onMouseLeave={e => { e.currentTarget.style.color = MD }}>
            Shop all →
          </Link>
        </div>

        <div className="grid-3-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(col.id)}
              onMouseLeave={() => setHovered(null)}>
              <Link to={col.href} style={{ display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>

                {/* Image */}
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={col.image}
                    alt={col.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
                      transform: hovered === col.id ? 'scale(1.04)' : 'scale(1)',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />

                  {/* Bottom label */}
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                    <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.6)', marginBottom: '3px' }}>{col.count}</p>
                    <p style={{ ...F, fontSize: '17px', fontWeight: 600, color: W, letterSpacing: '-0.01em' }}>{col.name}</p>
                  </div>

                  {/* Hover border */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    border: `2px solid ${G}`,
                    opacity: hovered === col.id ? 1 : 0,
                    transition: 'opacity 0.25s',
                    pointerEvents: 'none',
                  }} />
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
