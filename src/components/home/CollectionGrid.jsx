import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const W  = '#FFFFFF'
const DK = '#1A1612'
const F  = { fontFamily: "'Inter', sans-serif" }

const collections = [
  { label: 'Eden Collection',  path: '/shop?col=eden',      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80&fit=crop&crop=top', tall: true  },
  { label: 'Matching Sets',    path: '/shop?col=love-edit',  image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=500&q=80&fit=crop'           },
  { label: 'Bottoms',          path: '/shop',                image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80&fit=crop'           },
  { label: 'Accessories',      path: '/shop',                image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80&fit=crop'           },
  { label: 'Trainers',         path: '/shop',                image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80&fit=crop'           },
  { label: 'Tops',             path: '/shop',                image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500&q=80&fit=crop'           },
  { label: 'New In',           path: '/shop',                image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80&fit=crop'           },
]

function Card({ col, tall }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={col.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden', gridRow: tall ? 'span 2' : 'span 1' }}>
      <img
        src={col.image} alt={col.label}
        style={{
          width: '100%', objectFit: 'cover', display: 'block',
          height: tall ? '100%' : '200px',
          minHeight: tall ? '406px' : '200px',
          transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', opacity: hovered ? 1 : 0.75, transition: 'opacity 0.3s' }} />
      <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
        <p style={{ ...F, fontWeight: 800, fontSize: tall ? '18px' : '13px', color: W, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
          {col.label}
        </p>
      </div>
    </Link>
  )
}

export default function CollectionGrid() {
  const [tall, ...rest] = collections
  return (
    <section style={{ background: '#F8F5F2', padding: '40px 40px 48px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.01em', marginBottom: '6px' }}>Shop by Collection</h2>
          <div style={{ width: '40px', height: '3px', background: DK }} />
        </div>
        {/* Damsyn-style: 1 tall left + 3x2 right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: '200px 200px', gap: '4px' }}>
          <Card col={tall} tall />
          {rest.map(col => <Card key={col.label} col={col} />)}
        </div>
      </div>
    </section>
  )
}
