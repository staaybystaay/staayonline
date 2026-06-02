import { useState, useRef } from 'react'
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
  { id: 'e2',  name: 'MIRA',   price: 1950, label: 'Eden Collection',  image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=75&fit=crop' },
  { id: 'e3',  name: 'VERA',   price: 1700, label: 'Eden Collection',  image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=400&q=75&fit=crop' },
  { id: 'e5',  name: 'AYLA',   price: 1900, label: 'Eden Collection',  image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=75&fit=crop' },
  { id: 'e9',  name: 'ELARA',  price: 2400, label: 'Eden Collection',  image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=400&q=75&fit=crop' },
  { id: 'e10', name: 'DAHLIA', price: 2200, label: 'Eden Collection',  image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&q=75&fit=crop' },
  { id: 'l1',  name: 'AMOR',   price: 2900, label: 'The Love Edit',    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=75&fit=crop' },

]

const CARD_WIDTH  = 220
const CARD_GAP    = 12
const VISIBLE     = 5
const STEP        = CARD_WIDTH + CARD_GAP

function Card({ p }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <div
      style={{ flexShrink: 0, width: `${CARD_WIDTH}px` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{ position: 'relative', aspectRatio: '2/3', background: B2, overflow: 'hidden', marginBottom: '10px' }}>
        <img
          src={p.image} alt={p.name}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
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

    </div>
  )
}

export default function LatestProducts() {
  const [offset, setOffset] = useState(0)
  const maxOffset = (products.length - VISIBLE) * STEP

  function prev() {
    setOffset(o => Math.max(0, o - STEP * 2))
  }

  function next() {
    setOffset(o => Math.min(maxOffset, o + STEP * 2))
  }

  const atStart = offset === 0
  const atEnd   = offset >= maxOffset

  return (
    <section style={{ background: W, padding: '72px 64px', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ ...F, fontSize: '22px', fontWeight: 600, color: DK, letterSpacing: '-0.01em' }}>
            Latest Products
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/shop" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = DK }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              View all →
            </Link>

            {/* Arrow controls */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {[{ fn: prev, label: '←', disabled: atStart }, { fn: next, label: '→', disabled: atEnd }].map(({ fn, label, disabled }) => (
                <button
                  key={label}
                  onClick={fn}
                  disabled={disabled}
                  style={{
                    width: '36px', height: '36px',
                    border: `1px solid ${disabled ? BR : DK}`,
                    background: 'transparent',
                    color: disabled ? BR : DK,
                    cursor: disabled ? 'default' : 'pointer',
                    ...F, fontSize: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = DK; e.currentTarget.style.color = W }}}
                  onMouseLeave={e => { if (!disabled) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = DK }}}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel track */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            animate={{ x: -offset }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            style={{ display: 'flex', gap: `${CARD_GAP}px` }}>
            {products.map(p => <Card key={p.id} p={p} />)}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '24px', justifyContent: 'center' }}>
          {Array.from({ length: products.length - VISIBLE + 1 }).map((_, i) => {
            const active = i === Math.round(offset / STEP)
            return (
              <button
                key={i}
                onClick={() => setOffset(Math.min(i * STEP, maxOffset))}
                style={{
                  height: '2px', padding: 0, border: 'none',
                  borderRadius: '1px', cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: active ? '24px' : '6px',
                  background: active ? DK : BR,
                }} />
            )
          })}
        </div>

      </div>
    </section>
  )
}
