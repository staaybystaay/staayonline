import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const G   = '#B8903A'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const B2  = '#F2EFE9'
const DK  = '#222222'
const BR  = '#E4E0D8'
const F   = { fontFamily: "'Inter', sans-serif" }

const collections = [
  { id: 'eden', image: '/Solenne-new.jpg', label: 'SS 2026', name: 'Eden Collection',  sub: '10 pieces',  href: '/shop' },
  { id: 'love', image: '/Ayla-new.jpg',   label: 'SS 2026', name: 'The Love Edit',    sub: 'New season', href: '/shop' },
  { id: 'bold', image: '/Mira-new.jpg',   label: 'SS 2026', name: 'Bold & Beautiful', sub: 'New season', href: '/shop' },
]

export default function BrandCollections() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: OW, padding: '72px 64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '28px', height: '1px', background: G }} />
            <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Our Collections
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{ ...F, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              Our Brand Collections
            </h2>
            <Link
              to="/shop"
              style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, display: 'flex', alignItems: 'center', gap: '6px', borderBottom: `1px solid ${DK}`, paddingBottom: '1px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
              onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
              Shop All →
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(col.id)}
              onMouseLeave={() => setHovered(null)}>
              <Link
                to={col.href}
                style={{
                  display: 'block', textDecoration: 'none',
                  position: 'relative', overflow: 'hidden',
                  height: '540px', background: B2,
                  outline: hovered === col.id ? `2px solid ${G}` : '2px solid transparent',
                  outlineOffset: '-2px',
                  transition: 'outline-color 0.3s',
                }}>
                <img
                  src={col.image} alt={col.name}
                  onError={e => { e.target.style.display = 'none' }}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === col.id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.05) 50%, transparent 100%)' }} />
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: G, padding: '4px 12px',
                  ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: W,
                }}>
                  {col.label}
                </div>
                <div style={{
                  position: 'absolute', bottom: '0', left: '0', right: '0',
                  padding: '24px',
                  borderTop: `2px solid ${hovered === col.id ? G : 'transparent'}`,
                  transition: 'border-top-color 0.3s',
                }}>
                  <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    {col.sub}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: W, letterSpacing: '-0.01em' }}>
                      {col.name}
                    </p>
                    <span style={{
                      width: '32px', height: '32px',
                      border: '1px solid rgba(255,255,255,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: W, fontSize: '16px',
                      opacity: hovered === col.id ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}>
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
