import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const G  = '#B8903A'
const GL = '#F5ECD8'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#1A1612'
const MD = '#555'
const F  = { fontFamily: "'Inter', sans-serif" }

const thumbs = [
  { image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=70&fit=crop', name: 'AYLA',  price: 'GH₵1,900' },
  { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=70&fit=crop', name: 'ELARA', price: 'GH₵2,400' },
]

const MARQUEE = 'WEAR YOUR BEAUTY  ✦  EDEN COLLECTION  ✦  SS 2026  ✦  MADE IN ACCRA  ✦  '

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '92vh', minHeight: '580px', overflow: 'hidden' }}>

      {/* Split background */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ background: '#F0EAE0' }} />
        <div style={{ background: '#E4E8EF' }} />
      </div>

      {/* Scrolling marquee behind model */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {[...Array(4)].map((_, i) => (
              <span key={i} style={{ ...F, fontWeight: 900, fontSize: 'clamp(52px, 7vw, 96px)', letterSpacing: '-0.02em', color: 'rgba(26,22,18,0.07)', textTransform: 'uppercase', userSelect: 'none', lineHeight: 1 }}>
                {MARQUEE}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Centered model */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', width: '38%', maxWidth: '480px', zIndex: 2 }}>
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85&fit=crop&crop=top"
          alt="Eden Collection"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      {/* Left content */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '44%', zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 56px 56px' }}>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', width: 'fit-content' }}>
          <div style={{ width: '20px', height: '1px', background: G }} />
          <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.12em', textTransform: 'uppercase' }}>New Season — SS 2026</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} style={{ ...F, fontWeight: 400, fontSize: '15px', lineHeight: 1.7, color: '#4A4035', marginBottom: '28px', maxWidth: '320px' }}>
          Discover a curated collection of intentional designs crafted for the modern Ghanaian woman. Soft, graceful, always in season.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} style={{ marginBottom: '36px' }}>
          <Link
            to="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: BK, color: W, padding: '14px 28px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', transition: 'background 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = BK }}>
            Shop Now
            <span style={{ width: '26px', height: '26px', background: G, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>→</span>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} style={{ background: W, padding: '14px 18px', display: 'inline-flex', alignItems: 'center', gap: '12px', width: 'fit-content', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex' }}>
            {['#E8D5C0', '#D4C4B0', '#C8B8A4'].map((bg, i) => (
              <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid white', marginLeft: i === 0 ? 0 : '-8px', background: bg }} />
            ))}
          </div>
          <div>
            <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK, lineHeight: 1 }}>3 Collections</p>
            <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: MD, marginTop: '2px' }}>23 pieces available now</p>
          </div>
        </motion.div>

      </div>

      {/* Bottom right thumbnails */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 3, display: 'flex', gap: '10px' }}>
        {thumbs.map((t, i) => (
          <Link key={i} to="/shop" style={{ textDecoration: 'none' }}>
            <div style={{ width: '110px', background: W, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ height: '140px', overflow: 'hidden' }}>
                <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '8px 10px' }}>
                <p style={{ ...F, fontSize: '10px', fontWeight: 700, color: DK, letterSpacing: '0.04em' }}>{t.name}</p>
                <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, marginTop: '2px' }}>{t.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* SS 2026 badge */}
      <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 3, background: GL, border: `1px solid ${G}`, padding: '5px 14px', ...F, fontSize: '10px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        SS 2026
      </div>

    </section>
  )
}
