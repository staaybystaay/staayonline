import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const G  = '#B8903A'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#1A1612'
const MD = '#888'
const BR = '#E8E4DF'
const F  = { fontFamily: "'Inter', sans-serif" }

export default function Mission() {
  return (
    <section style={{ background: W, padding: '96px 64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

        {/* Left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ overflow: 'hidden', aspectRatio: '4/5' }}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
            alt="Our Brand"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}>

          <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: G, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Our Story
          </p>

          <h2 style={{ ...F, fontWeight: 700, fontSize: 'clamp(26px, 3vw, 42px)', color: DK, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '28px' }}>
            Designed for women who live beyond limits.
          </h2>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, lineHeight: 1.8, marginBottom: '16px' }}>
            From everyday essentials to standout statement pieces, each item is thoughtfully designed to ensure quality, comfort, and elegance. We take pride in crafting clothing that complements every aspect of your lifestyle.
          </p>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, lineHeight: 1.8, marginBottom: '40px' }}>
            Based in Accra. Built for the world. Worn by women who know exactly who they are.
          </p>

          {/* Stats — clean row, no boxes */}
          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', paddingBottom: '40px', borderBottom: `1px solid ${BR}` }}>
            {[['3', 'Collections'], ['23', 'Pieces'], ['SS 2026', 'Season']].map(([num, label]) => (
              <div key={label}>
                <p style={{ ...F, fontSize: '24px', fontWeight: 700, color: DK, letterSpacing: '-0.02em', lineHeight: 1 }}>{num}</p>
                <p style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, marginTop: '4px' }}>{label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/brand"
            style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${DK}`, paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            Read our story →
          </Link>

        </motion.div>
      </div>
    </section>
  )
}
