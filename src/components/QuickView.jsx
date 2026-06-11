import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import useFavoritesStore from '../store/useFavoritesStore'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#666'
const LG  = '#F5F5F5'
const BR  = '#E8E4DF'
const RD  = '#E53E3E'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

const SIZES  = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const COLORS = [
  { name: 'Gold',  hex: '#B8903A' },
  { name: 'Black', hex: '#1A1612' },
  { name: 'Nude',  hex: '#C8A882' },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#EEE" stroke="#DDD" strokeWidth="0.8">
          <path d="M6.5 1l1.3 4H12L8.6 7.8l1.3 4L6.5 9.5 3.1 11.8l1.3-4L1 5h4.2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function QuickView({ product, onClose }) {
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [qty,           setQty]           = useState(1)
  const [activeImg,     setActiveImg]     = useState(0)
  const [addedToBag,    setAddedToBag]    = useState(false)
  const [detailsOpen,   setDetailsOpen]   = useState(false)

  const addItem     = useCartStore(s => s.addItem)
  const toggle      = useFavoritesStore(s => s.toggle)
  const isFavorited = useFavoritesStore(s => s.isFavorited)
  const faved = isFavorited(product?.id)

  if (!product) return null

  const images = [product.image_url, product.image_url]

  function handleAddToCart() {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image_url, category: product.collection?.name || 'STAAY', badge: product.badge, qty })
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2000)
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.5)' }}
      />

      {/* Full-height right drawer */}
      <motion.div
        key="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '580px',
          maxWidth: '100vw',
          zIndex: 301,
          background: W,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.2)',
        }}>

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
          <div>
            <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: MD, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Quick View</p>
            <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, letterSpacing: '-0.01em' }}>{product.name}</h2>
          </div>
          <button onClick={onClose} style={{ width: '36px', height: '36px', border: `1px solid ${BR}`, background: W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '18px', color: MD, flexShrink: 0, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
            ✕
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ flex: 1, overflowY: 'auto' }}>

          {/* IMAGE SECTION */}
          <div style={{ display: 'flex', gap: '0', height: '420px', borderBottom: `1px solid ${BR}` }}>

            {/* Thumbnails — left */}
            <div style={{ width: '72px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 8px', borderRight: `1px solid ${BR}`, background: LG }}>
              {images.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)}
                  style={{ width: '54px', height: '68px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? G : 'transparent'}`, transition: 'border-color 0.2s', flexShrink: 0 }}>
                  <img src={img} alt="" onError={e => { e.target.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div style={{ flex: 1, overflow: 'hidden', background: LG }}>
              <img
                src={images[activeImg]}
                alt={product.name}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Stars + share */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stars />
              <button style={{ background: 'none', border: 'none', ...F, fontSize: '12px', color: MD, cursor: 'pointer' }}>Share</button>
            </div>

            {/* Price */}
            <p style={{ ...F, fontSize: '26px', fontWeight: 800, color: G, letterSpacing: '-0.01em' }}>
              GH₵{Number(product.price).toLocaleString()}
            </p>

            {/* Stock */}
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '10px 14px', ...F, fontSize: '13px', fontWeight: 600, color: '#92400E' }}>
              Only {Math.floor(Math.random() * 5) + 1} left in stock
            </div>

            {/* Color */}
            <div>
              <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '10px' }}>
                Color: <span style={{ fontWeight: 400, color: MD }}>{COLORS[selectedColor].name}</span>
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {COLORS.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)}
                    style={{ width: '26px', height: '26px', borderRadius: '50%', background: c.hex, border: `3px solid ${W}`, cursor: 'pointer', padding: 0, outline: `2px solid ${selectedColor === i ? G : 'transparent'}`, outlineOffset: '2px', transition: 'outline 0.2s' }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>Size</p>
                <button style={{ background: 'none', border: 'none', ...F, fontSize: '12px', color: G, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                  View Size Guide
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    style={{ padding: '8px 16px', border: `1.5px solid ${selectedSize === s ? G : BR}`, background: selectedSize === s ? GL : W, ...F, fontSize: '13px', fontWeight: selectedSize === s ? 600 : 400, color: selectedSize === s ? G : DK, cursor: 'pointer', transition: 'all 0.15s', minWidth: '52px' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK, marginBottom: '10px' }}>Quantity (Max: 5)</p>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BR}`, width: 'fit-content' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: '40px', height: '40px', background: LG, border: 'none', cursor: 'pointer', ...F, fontSize: '20px', color: DK, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid ${BR}` }}>
                  −
                </button>
                <span style={{ width: '48px', textAlign: 'center', ...F, fontSize: '15px', fontWeight: 600, color: DK }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(5, q + 1))}
                  style={{ width: '40px', height: '40px', background: LG, border: 'none', cursor: 'pointer', ...F, fontSize: '20px', color: DK, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1px solid ${BR}` }}>
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart + Heart */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleAddToCart}
                style={{ flex: 1, padding: '14px', background: addedToBag ? GR : BK, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em', transition: 'background 0.2s' }}
                onMouseEnter={e => { if (!addedToBag) e.currentTarget.style.background = G }}
                onMouseLeave={e => { if (!addedToBag) e.currentTarget.style.background = addedToBag ? GR : BK }}>
                {addedToBag ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggle({ ...product, category: product.collection?.name })}
                style={{ width: '50px', height: '50px', border: `1px solid ${faved ? RD : BR}`, background: faved ? '#FEF2F2' : W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: faved ? RD : '#BBB', transition: 'all 0.2s', flexShrink: 0 }}>
                {faved ? '♥' : '♡'}
              </button>
            </div>

            {/* Shipping info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '14px', background: LG }}>
              {[
                { icon: '🚚', text: 'Free Shipping within Accra' },
                { icon: '📦', text: '2-3 Business Days delivery'  },
                { icon: '↩️', text: 'Free returns within 7 days'  },
              ].map(row => (
                <div key={row.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px' }}>{row.icon}</span>
                  <span style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD }}>{row.text}</span>
                </div>
              ))}
            </div>

            {/* Product Details toggle */}
            <button
              onClick={() => setDetailsOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: `1px solid ${BR}`, padding: '12px 16px', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 600, color: DK }}>
              Product Details
              <span style={{ transition: 'transform 0.2s', display: 'inline-block', transform: detailsOpen ? 'rotate(90deg)' : 'rotate(0)' }}>›</span>
            </button>
            {detailsOpen && (
              <div style={{ padding: '12px 16px', background: LG, borderLeft: `3px solid ${G}`, ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7 }}>
                <p>Part of the {product.collection?.name || 'STAAY'} collection. Designed for the modern woman who moves through the world with grace and confidence. Soft, intentional, always in season.</p>
              </div>
            )}

          </div>

          {/* ── REVIEWS SECTION ── */}
          <div style={{ borderTop: `2px solid ${BR}`, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK }}>Reviews & Ratings</h3>
              <button style={{ background: G, border: 'none', color: W, padding: '8px 18px', ...F, fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                Write Review
              </button>
            </div>

            {/* Rating bars */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <p style={{ ...F, fontSize: '40px', fontWeight: 900, color: DK, lineHeight: 1 }}>0.0</p>
                <Stars />
                <p style={{ ...F, fontSize: '11px', color: MD, marginTop: '4px' }}>0 reviews</p>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[5,4,3,2,1].map(star => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ ...F, fontSize: '12px', color: MD, width: '10px', textAlign: 'right' }}>{star}</span>
                    <div style={{ flex: 1, height: '8px', background: BR, borderRadius: '4px' }} />
                    <span style={{ ...F, fontSize: '12px', color: MD, width: '10px' }}>0</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty reviews */}
            <div style={{ textAlign: 'center', padding: '28px 0' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>☆</div>
              <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '6px' }}>No Customer Reviews</p>
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, marginBottom: '18px' }}>
                Be the first to share your thoughts about this product
              </p>
              <button style={{ background: G, border: 'none', color: W, padding: '11px 32px', ...F, fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                Write First Review
              </button>
            </div>
          </div>

        </div>
        {/* ── END SCROLLABLE ── */}

      </motion.div>
    </AnimatePresence>
  )
}
