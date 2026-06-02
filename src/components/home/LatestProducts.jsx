import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCartStore from '../../store/useCartStore'

const G  = '#B8903A'
const W  = '#FFFFFF'
const BK = '#111111'
const DK = '#1A1612'
const MD = '#888'
const BR = '#E8E4DF'
const B2 = '#F4F1ED'
const F  = { fontFamily: "'Inter', sans-serif" }

const products = [
  { id: 'e2',  name: 'MIRA',   price: 1950, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=75&fit=crop' },
  { id: 'e3',  name: 'VERA',   price: 1700, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=400&q=75&fit=crop' },
  { id: 'e5',  name: 'AYLA',   price: 1900, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=75&fit=crop' },
  { id: 'e9',  name: 'ELARA',  price: 2400, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=400&q=75&fit=crop' },
  { id: 'e10', name: 'DAHLIA', price: 2200, label: 'Eden Collection', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&q=75&fit=crop' },
  { id: 'l1',  name: 'AMOR',   price: 2900, label: 'The Love Edit',   image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=75&fit=crop' },
  { id: 'b1',  name: 'ZURI',   price: 3500, label: 'Bold & Beautiful', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75&fit=crop' },
  { id: 'b2',  name: 'NYAH',   price: 2600, label: 'Bold & Beautiful', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=75&fit=crop' },
  { id: 'b4',  name: 'LOIS',   price: 1450, label: 'Bold & Beautiful', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=75&fit=crop' },
  { id: 'b9',  name: 'ESME',   price: 2700, label: 'Bold & Beautiful', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=75&fit=crop' },
]

function Card({ p, i }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: (i % 5) * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{ position: 'relative', aspectRatio: '2/3', background: B2, overflow: 'hidden', marginBottom: '10px' }}>
        <img
          src={p.image} alt={p.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />
        <button
          onClick={() => addItem({ ...p, badge: 'New', category: p.label })}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(255,255,255,0.94)', border: 'none',
            padding: '11px', ...F, fontSize: '11px', fontWeight: 500,
            color: DK, cursor: 'pointer', letterSpacing: '0.03em',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.2s, transform 0.2s',
          }}>
          Add to bag
        </button>
      </div>

      <p style={{ ...F, fontSize: '10px', fontWeight: 400, color: MD, marginBottom: '2px' }}>{p.label}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <p style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK }}>{p.name}</p>
        <p style={{ ...F, fontSize: '12px', fontWeight: 400, color: DK }}>GH₵{p.price.toLocaleString()}</p>
      </div>

    </motion.div>
  )
}

export default function LatestProducts() {
  return (
    <section style={{ background: W, padding: '72px 64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ ...F, fontSize: '22px', fontWeight: 600, color: DK, letterSpacing: '-0.01em' }}>Latest Products</h2>
          <Link to="/shop" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = DK }}
            onMouseLeave={e => { e.currentTarget.style.color = MD }}>
            View all →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px 12px' }}>
          {products.map((p, i) => <Card key={p.id} p={p} i={i} />)}
        </div>

      </div>
    </section>
  )
}
