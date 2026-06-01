import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const G  = '#B8903A'
const GL = '#F5ECD8'
const W  = '#FFFFFF'
const BK = '#111111'
const F  = { fontFamily: "'Inter', sans-serif" }

// ─────────────────────────────────────────────────────
//  Swap this for your own campaign photo when ready.
//  Needs to be a tall editorial fashion shot (portrait
//  or landscape both work). Model should be well-lit,
//  on a clean or natural background.
// ─────────────────────────────────────────────────────
const IMAGE = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&q=90&fit=crop&crop=top'

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '95vh',
      minHeight: '600px',
      overflow: 'hidden',
      background: BK,
    }}>

      {/* ── FULL BLEED IMAGE — the star ── */}
      <motion.img
        src={IMAGE}
        alt="Staay Collection"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />

      {/* ── GRADIENT — only bottom third, keeps model visible ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.5) 28%, rgba(10,8,6,0.0) 55%)',
      }} />

      {/* ── TOP LEFT — brand mark ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: 'absolute',
          top: '28px',
          left: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
        }}>
        <div style={{
          background: GL,
          padding: '4px 12px',
          ...F,
          fontSize: '10px',
          fontWeight: 700,
          color: G,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          Eden Collection
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '4px 12px',
          ...F,
          fontSize: '10px',
          fontWeight: 500,
          color: W,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          SS 2026
        </div>
      </motion.div>

      {/* ── BOTTOM TEXT — minimal, confident ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: '0 56px 52px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>

        {/* Left — headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ maxWidth: '560px' }}>

          <h1 style={{
            ...F,
            fontWeight: 800,
            fontSize: 'clamp(38px, 5vw, 72px)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: W,
            margin: '0 0 20px',
          }}>
            Where Beauty<br />
            <span style={{ color: G }}>Begins.</span>
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/shop"
              style={{
                background: W,
                color: BK,
                padding: '14px 36px',
                ...F,
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                display: 'inline-block',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = W }}
              onMouseLeave={e => { e.currentTarget.style.background = W; e.currentTarget.style.color = BK }}>
              Shop the Collection
            </Link>
            <Link
              to="/brand"
              style={{
                ...F,
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.04em',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = W; e.currentTarget.style.borderBottomColor = W }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)' }}>
              Our Story →
            </Link>
          </div>

        </motion.div>

        {/* Right — collection info card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '20px 24px',
            minWidth: '200px',
          }}>
          <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Now Available
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Collection', value: 'Eden SS 2026' },
              { label: 'Pieces',     value: '10 styles'   },
              { label: 'From',       value: 'GH₵ 1,450'   },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                <span style={{ ...F, fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.45)' }}>{row.label}</span>
                <span style={{ ...F, fontSize: '12px', fontWeight: 600, color: W }}>{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── SCROLL HINT ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '52px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          zIndex: 2,
        }}>
        <span style={{ ...F, fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.2)' }}
        />
      </motion.div>

    </section>
  )
}
