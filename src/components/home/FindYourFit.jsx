import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const W = '#FFFFFF'
const DK = '#1A1612'
const F = { fontFamily: "'Inter', sans-serif" }

const categories = [
  { label: 'Women',           path: '/shop',             image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=75&fit=crop&crop=top' },
  { label: 'Eden Collection', path: '/shop?col=eden',    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=75&fit=crop' },
  { label: 'The Love Edit',   path: '/shop?col=love-edit',image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=300&q=75&fit=crop' },
  { label: 'Bold & Beautiful',path: '/shop?col=bold',    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&q=75&fit=crop' },
  { label: 'New In',          path: '/shop',             image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=300&q=75&fit=crop' },
  { label: 'Children',        path: '/shop',             image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300&q=75&fit=crop' },
  { label: 'Accessories',     path: '/shop',             image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&q=75&fit=crop' },
  { label: 'Featured',        path: '/featured',         image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=75&fit=crop' },
]

// Duplicate for seamless infinite loop
const doubled = [...categories, ...categories]

function Circle({ cat }) {
  return (
    <Link
      to={cat.path}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0, textDecoration: 'none', width: '120px' }}>
      <div
        style={{
          width: '110px', height: '110px', borderRadius: '50%',
          overflow: 'hidden', position: 'relative',
          border: '2px solid #E8E4DF',
          transition: 'border-color 0.25s, transform 0.3s',
          flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8903A'; e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E4DF'; e.currentTarget.style.transform = 'scale(1)' }}>
        <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...F, fontSize: '10px', fontWeight: 700, color: W, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', padding: '0 6px', lineHeight: 1.3 }}>
            {cat.label}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function FindYourFit() {
  return (
    <section style={{ background: '#fff', padding: '40px 0 36px', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto 28px' }}>
        <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.01em', marginBottom: '6px' }}>
          FIND YOUR FIT
        </h2>
        <div style={{ width: '40px', height: '3px', background: DK }} />
      </div>

      {/* Auto-scrolling marquee — like Damsyn */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Left fade */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        {/* Right fade */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '28px', paddingLeft: '40px' }}>
          {doubled.map((cat, i) => (
            <Circle key={`${cat.label}-${i}`} cat={cat} />
          ))}
        </motion.div>
      </div>

    </section>
  )
}
