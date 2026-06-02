import { motion } from 'framer-motion'

const G  = '#B8903A'
const DK = '#222222'
const MD = '#999999'
const BR = '#E4E0D8'
const F  = { fontFamily: "'Inter', sans-serif" }

const items = [
  'Accra Fashion Week',
  'Ghana Style Magazine',
  'Vogue Africa',
  'The Label GH',
  'ARISE Fashion',
  'Glam Africa',
  'Africa Fashion Week',
  'Style Rave',
]

export default function BrandBar() {
  return (
    <section style={{
      borderTop: `1px solid ${BR}`,
      borderBottom: `1px solid ${BR}`,
      padding: '20px 0',
      overflow: 'hidden',
      background: '#FAFAF8',
    }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', alignItems: 'center', gap: '0', whiteSpace: 'nowrap' }}>
          {[...items, ...items].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0' }}>
              <span style={{
                ...F, fontSize: '13px', fontWeight: 500,
                color: MD, letterSpacing: '0.06em',
                textTransform: 'uppercase', padding: '0 40px',
              }}>
                {item}
              </span>
              <span style={{ color: G, fontSize: '10px', opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
