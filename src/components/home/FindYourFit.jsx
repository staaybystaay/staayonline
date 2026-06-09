import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { imgCard } from '../../lib/images'

const DK = '#1A1612'
const MD = '#555'
const W  = '#FFFFFF'
const F  = { fontFamily: "'Inter', sans-serif" }

const collections = [
  { label: 'Eden Collection',  path: '/shop?col=eden',      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80&fit=crop&crop=top' },
  { label: 'The Love Edit',    path: '/shop?col=love-edit',  image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=300&q=80&fit=crop' },
  { label: 'Bold & Beautiful', path: '/shop?col=bold',       image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80&fit=crop' },
  { label: 'New In',           path: '/shop',                image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=300&q=80&fit=crop' },
  { label: 'All Collections',  path: '/shop',                image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=80&fit=crop' },
  { label: 'Featured',         path: '/featured',            image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&q=80&fit=crop' },
]

export default function FindYourFit() {
  return (
    <section style={{ background: '#fff', padding: '40px 40px 32px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.01em', marginBottom: '6px' }}>
            FIND YOUR FIT
          </h2>
          <div style={{ width: '40px', height: '3px', background: DK }} />
        </div>

        {/* Circular bubbles — scrollable */}
        <div className="hide-scroll" style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
          {collections.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <Link to={col.path} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                  width: '130px', height: '130px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '2px solid #E8E4DF',
                  transition: 'border-color 0.2s, transform 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8903A'; e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E4DF'; e.currentTarget.style.transform = 'scale(1)' }}>
                  <img
                    src={col.image}
                    alt={col.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Dark overlay with label */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)' }}>
                    <span style={{
                      ...F, fontSize: '11px', fontWeight: 700,
                      color: W, letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      padding: '0 8px',
                      lineHeight: 1.3,
                    }}>
                      {col.label}
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
