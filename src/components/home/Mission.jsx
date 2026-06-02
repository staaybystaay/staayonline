import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const G  = '#B8903A'
const GL = '#F5ECD8'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#222222'
const MD = '#666666'
const BR = '#E4E0D8'
const F  = { fontFamily: "'Inter', sans-serif" }

export default function Mission() {
  return (
    <section style={{ background: W, padding: '96px 64px', borderTop: `1px solid ${BR}` }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px', alignItems: 'center',
      }}>

        {/* Left — image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative' }}>
          <div style={{ position: 'relative', overflow: 'hidden', height: '560px' }}>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
              alt="Our Mission"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '-24px', right: '-24px',
              background: W, padding: '20px 28px',
              boxShadow: '0 8px 40px rgba(17,17,17,0.1)',
              border: `1px solid ${BR}`,
              borderTop: `3px solid ${G}`,
            }}>
            <p style={{ ...F, fontSize: '32px', fontWeight: 800, color: DK, letterSpacing: '-0.03em', lineHeight: 1 }}>3</p>
            <p style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, marginTop: '4px' }}>Collections launched</p>
            <div style={{ width: '32px', height: '2px', background: G, marginTop: '10px' }} />
            <p style={{ ...F, fontSize: '32px', fontWeight: 800, color: DK, letterSpacing: '-0.03em', lineHeight: 1, marginTop: '10px' }}>23</p>
            <p style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, marginTop: '4px' }}>Pieces designed</p>
          </motion.div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: G }} />
            <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Our Mission
            </span>
          </div>

          <h2 style={{
            ...F, fontWeight: 800,
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            color: DK, letterSpacing: '-0.025em',
            lineHeight: 1.1, marginBottom: '24px',
          }}>
            Our mission is to empower women to express their unique style confidently.
          </h2>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, lineHeight: 1.8, marginBottom: '16px' }}>
            From everyday essentials to standout statement pieces, each item is thoughtfully designed to ensure quality, comfort, and elegance. We take pride in crafting clothing that complements every aspect of your lifestyle, whether you're dressing for work, play, or special occasions.
          </p>

          <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, lineHeight: 1.8, marginBottom: '36px' }}>
            Sustainability drives us forward. We are committed to responsible practices that respect both people and the planet — producing fashion that lasts as long as it looks.
          </p>

          <Link
            to="/brand"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: BK, color: W, padding: '14px 32px',
              ...F, fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = BK }}>
            About Us →
          </Link>

        </motion.div>

      </div>
    </section>
  )
}
