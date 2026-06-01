import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const BR  = '#E4E0D8'
const F   = { fontFamily: "'Inter', sans-serif" }

// Replace this URL with your own campaign photo when ready
const HERO_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=85&fit=crop'

export default function Hero() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: '90vh',
      background: '#F8F4EE',
    }}>

      {/* ── LEFT — Text Panel ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 72px',
        position: 'relative',
      }}>

        {/* Season label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '36px',
          }}>
          <div style={{ width: '32px', height: '1px', background: G }} />
          <span style={{
            ...F, fontSize: '11px', fontWeight: 600,
            color: G, letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            New Season — SS 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            ...F, fontWeight: 800,
            fontSize: 'clamp(48px, 5.5vw, 80px)',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            color: DK,
            margin: '0 0 24px',
          }}>
          Where<br />
          Beauty<br />
          <span style={{ color: G }}>Begins.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            ...F, fontWeight: 300,
            fontSize: '16px', lineHeight: 1.75,
            color: MD, marginBottom: '44px',
            maxWidth: '320px',
          }}>
          Soft, feminine, intentional — pieces designed for the woman who moves through the world with grace and strength.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '60px' }}>

          <Link
            to="/shop"
            style={{
              background: BK, color: W,
              padding: '16px 40px',
              ...F, fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              display: 'inline-block',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = BK }}>
            Shop the Collection
          </Link>

          <Link
            to="/brand"
            style={{
              ...F, fontSize: '12px', fontWeight: 500,
              color: MD, letterSpacing: '0.04em',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = DK }}
            onMouseLeave={e => { e.currentTarget.style.color = MD }}>
            Our Brand →
          </Link>

        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'flex', gap: '32px',
            paddingTop: '32px',
            borderTop: `1px solid ${BR}`,
          }}>
          {[
            { num: '3', label: 'Collections' },
            { num: '23', label: 'Pieces' },
            { num: 'GH₵', label: 'Local pricing' },
          ].map(stat => (
            <div key={stat.label}>
              <p style={{ ...F, fontSize: '20px', fontWeight: 800, color: DK, letterSpacing: '-0.02em', marginBottom: '2px' }}>
                {stat.num}
              </p>
              <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: MD, letterSpacing: '0.04em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bottom corner brand mark */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '72px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <img
            src="/stayonlinelogo.jpeg"
            alt="Staay"
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', opacity: 0.5 }}
          />
          <span style={{ ...F, fontSize: '11px', fontWeight: 500, color: MD, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Staay Online
          </span>
        </div>

      </div>

      {/* ── RIGHT — Image Panel ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}>

        <img
          src={HERO_IMAGE}
          alt="Staay Collection"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />

        {/* Floating collection tag — bottom left of image */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '32px',
          background: W,
          padding: '14px 20px',
          boxShadow: '0 8px 32px rgba(17,17,17,0.12)',
          display: 'flex', flexDirection: 'column', gap: '2px',
          minWidth: '160px',
        }}>
          <span style={{ ...F, fontSize: '10px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Now Available
          </span>
          <span style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK }}>
            Eden Collection
          </span>
          <span style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD }}>
            10 pieces from GH₵1,450
          </span>
        </div>

        {/* Top right season badge */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: GL,
          border: `1px solid ${G}`,
          padding: '6px 14px',
          ...F, fontSize: '10px', fontWeight: 600,
          color: G, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          SS 2026
        </div>

      </motion.div>

    </section>
  )
}
