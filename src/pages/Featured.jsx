import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const DK  = '#1A1612'
const MD  = '#666'
const FT  = '#999'
const LG  = '#F7F6F4'
const BR  = '#E8E4DF'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

export default function Featured() {
  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* Header */}
      <div className="page-padding" style={{ background: LG, borderBottom: `1px solid ${BR}`, padding: '28px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Featured</span>
          </div>
          <h1 style={{ ...F, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: DK, letterSpacing: '-0.025em' }}>
            Featured
          </h1>
        </div>
      </div>

      {/* Coming soon */}
      <div className="page-padding" style={{ maxWidth: '640px', margin: '0 auto', padding: '100px 40px 120px', textAlign: 'center' }}>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M13 2l3.2 6.6 7.3 1-5.3 5.2 1.2 7.2L13 18.5 6.6 22l1.2-7.2L2.5 9.6l7.3-1z" stroke={G} strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          </div>

          <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Coming Soon
          </p>

          <h2 style={{ ...F, fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: DK, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '16px' }}>
            No featured content yet
          </h2>

          <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, lineHeight: 1.8, marginBottom: '36px', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}>
            We're working on something special — runway moments, editorials, and curated
            stories from the STAAY world. Check back soon, or explore the collections
            available right now.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop"
              style={{ background: G, color: W, padding: '14px 36px', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = DK }}
              onMouseLeave={e => { e.currentTarget.style.background = G }}>
              Shop All Collections
            </Link>
            <Link to="/"
              style={{ background: 'transparent', border: `1px solid ${BR}`, color: DK, padding: '14px 36px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = DK }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BR }}>
              Back to Home
            </Link>
          </div>

        </motion.div>
      </div>

    </div>
  )
}
