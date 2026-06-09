import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const G = '#B8903A'
const W = '#FFFFFF'
const F = { fontFamily: "'Inter', sans-serif" }

export default function EditorialBanner() {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '480px', overflow: 'hidden', background: '#1A0A0A' }}>

      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1800&q=85&fit=crop"
        alt="STAAY"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', opacity: 0.55 }}
      />

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,5,5,0.85) 0%, rgba(20,5,5,0.4) 60%, rgba(20,5,5,0.2) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '480px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <p style={{
            ...F, fontSize: '13px', fontWeight: 400,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: '16px', fontStyle: 'italic',
          }}>
            Style without rules or limits.
          </p>

          <h2 style={{
            ...F, fontWeight: 900,
            fontSize: 'clamp(52px, 8vw, 110px)',
            color: W, lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: '0 0 32px',
          }}>
            WEAR YOUR<br />
            <span style={{ color: G }}>STORY.</span>
          </h2>

          <Link
            to="/shop"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: W, color: '#1A0A0A',
              padding: '14px 36px',
              ...F, fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = W }}
            onMouseLeave={e => { e.currentTarget.style.background = W; e.currentTarget.style.color = '#1A0A0A' }}>
            Shop Now
          </Link>

        </motion.div>
      </div>
    </section>
  )
}
