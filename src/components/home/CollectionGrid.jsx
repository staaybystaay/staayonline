import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const W  = '#FFFFFF'
const DK = '#1A1612'
const F  = { fontFamily: "'Inter', sans-serif" }

const collections = [
  {
    label: 'Eden Collection',
    path:  '/shop?col=eden',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop&crop=top',
    tall:  true,
  },
  {
    label: 'The Love Edit',
    path:  '/shop?col=love-edit',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80&fit=crop',
  },
  {
    label: 'Accessories',
    path:  '/shop',
    image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=600&q=80&fit=crop',
  },
  {
    label: 'Bold & Beautiful',
    path:  '/shop?col=bold',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop',
  },
  {
    label: 'New In',
    path:  '/shop',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&fit=crop',
  },
]

function CollectionCard({ col, tall = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={col.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        position: 'relative', overflow: 'hidden',
        gridRow: tall ? 'span 2' : 'span 1',
      }}>

      <img
        src={col.image}
        alt={col.label}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          minHeight: tall ? '520px' : '240px',
          transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />

      {/* Gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)', transition: 'opacity 0.3s', opacity: hovered ? 1 : 0.85 }} />

      {/* Label — bottom left, Damsyn style */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
        <p style={{
          ...F, fontWeight: 800,
          fontSize: tall ? '22px' : '16px',
          color: W, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: 0,
          textShadow: '0 1px 8px rgba(0,0,0,0.4)',
        }}>
          {col.label}
        </p>
      </div>

    </Link>
  )
}

export default function CollectionGrid() {
  const [tall, ...rest] = collections

  return (
    <section style={{ background: '#F8F5F2', padding: '48px 40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ ...F, fontSize: '20px', fontWeight: 700, color: DK, letterSpacing: '-0.01em', marginBottom: '6px' }}>
            Shop by Collection
          </h2>
          <div style={{ width: '40px', height: '3px', background: DK }} />
        </div>

        {/* Asymmetric grid — tall left, 2x2 right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '6px' }}>

          {/* Tall left card */}
          <CollectionCard col={tall} tall />

          {/* 4 smaller cards in 2x2 */}
          {rest.map(col => (
            <CollectionCard key={col.label} col={col} />
          ))}

        </div>

      </div>
    </section>
  )
}
