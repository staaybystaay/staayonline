import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const G  = '#B8903A'
const GL = '#F5ECD8'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#1A1612'
const MD = '#888'
const F  = { fontFamily: "'Inter', sans-serif" }

const MARQUEE = 'NEW SEASON SS 2026  —  EDEN COLLECTION  —  THE LOVE EDIT  —  BOLD & BEAUTIFUL  —  MADE IN ACCRA  —  '

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '92vh', minHeight: '580px', overflow: 'hidden' }}>

      {/* Split bg */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ background: '#EDE8E1' }} />
        <div style={{ background: '#E2E6EC' }} />
      </div>

      {/* Marquee */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ ...F, fontWeight: 900, fontSize: 'clamp(56px, 8vw, 104px)', letterSpacing: '-0.02em', color: 'rgba(26,22,18,0.055)', textTransform: 'uppercase', userSelect: 'none', lineHeight: 1, flexShrink: 0 }}>
              {MARQUEE}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Model — centered */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', width: '36%', maxWidth: '460px', zIndex: 2 }}>
        <img
          src="/newhero.jpeg"
          alt="STAAY Collection"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      {/* Left */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '44%', zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 52px 52px' }}>
        <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: G, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>
          New Season — SS 2026
        </p>
        <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: '#5A5048', lineHeight: 1.75, marginBottom: '28px', maxWidth: '300px' }}>
          Intentional designs for the modern woman. Soft, graceful, always in season.
        </p>
        <Link
          to="/shop"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: BK, color: W, padding: '13px 28px', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'background 0.2s', width: 'fit-content' }}
          onMouseEnter={e => { e.currentTarget.style.background = G }}
          onMouseLeave={e => { e.currentTarget.style.background = BK }}>
          Shop Now
        </Link>
      </div>

      {/* Right thumbnails */}
      <div style={{ position: 'absolute', bottom: '40px', right: '36px', zIndex: 3, display: 'flex', gap: '8px' }}>
        {[
          { src: '/newhero1.jpeg', name: 'AYLA', price: 'GH₵1,900' },
          { src: 'newhero2.jpeg', name: 'ELARA', price: 'GH₵2,400' },
        ].map((t, i) => (
          <Link key={i} to="/shop" style={{ display: 'block', textDecoration: 'none', width: '100px', background: W, overflow: 'hidden' }}>
            <img src={t.src} alt={t.name} style={{ width: '100%', height: '128px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '7px 8px' }}>
              <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: DK, letterSpacing: '0.04em' }}>{t.name}</p>
              <p style={{ ...F, fontSize: '10px', fontWeight: 400, color: G, marginTop: '1px' }}>{t.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* SS 2026 badge */}
      <div style={{ position: 'absolute', top: '22px', right: '22px', zIndex: 3, background: GL, border: `1px solid ${G}`, padding: '4px 12px', ...F, fontSize: '10px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        SS 2026
      </div>

    </section>
  )
}
