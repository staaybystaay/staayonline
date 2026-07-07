
import { motion } from 'framer-motion'

const G  = '#B8903A'
const GL = '#F5ECD8'
const W  = '#FFFFFF'
const OW = '#F8F7F4'
const DK = '#222222'
const MD = '#666666'
const BR = '#E4E0D8'
const F  = { fontFamily: "'Inter', sans-serif" }

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    title: 'Free Shipping',
    desc: 'Enjoy the convenience of free delivery on all orders within Accra. Fast and reliable.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    title: 'Fast Delivery',
    desc: 'Experience fast delivery with personalised assistance, ensuring your order arrives on time.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    title: 'Flexible Payment',
    desc: 'Shop now and pay your way with flexible payment options designed to fit your budget.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Premium Support',
    desc: 'Enjoy premium support with personalised assistance, a seamless shopping experience every time.',
  },
]

export default function Features() {
  return (
    <section style={{ background: OW, padding: '80px 64px', borderTop: `1px solid ${BR}` }}>
      <div className="features-layout" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

        {/* Left — image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', overflow: 'hidden', height: '500px' }}>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&fit=crop"
            alt="STAAY Quality"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Gold accent line */}
          <div style={{
            position: 'absolute', left: 0, top: '10%', bottom: '10%',
            width: '3px', background: G,
          }} />
        </motion.div>

        {/* Right — 2x2 feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{
                width: '44px', height: '44px',
                background: GL,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: G, marginBottom: '14px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '8px', letterSpacing: '-0.01em' }}>
                {f.title}
              </h3>
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
