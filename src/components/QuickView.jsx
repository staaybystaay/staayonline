import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import useFavoritesStore from '../store/useFavoritesStore'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const BK  = '#111111'
const DK  = '#1A1612'
const MD  = '#888'
const FT  = '#BBB'
const LG  = '#F7F6F4'
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

function StarRow({ score = 0, count = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(i => (
          <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill={i <= score ? G : '#E8E4DF'} stroke={i <= score ? G : '#D4CFC9'} strokeWidth="0.5">
            <path d="M6.5 1l1.3 4H12L8.6 7.8l1.3 4L6.5 9.5 3.1 11.8l1.3-4L1 5h4.2z"/>
          </svg>
        ))}
      </div>
      <span style={{ ...F, fontSize: '12px', color: MD }}>{score.toFixed(1)} ({count})</span>
    </div>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: BR, margin: '4px 0' }} />
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
    setTimeout(() => setAddedToBag(false), 2500)
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.55)' }}
      />

      {/* Drawer */}
      <motion.div
        key="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '760px',
          maxWidth: '96vw',
          zIndex: 301,
          background: W,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-12px 0 60px rgba(0,0,0,0.18)',
        }}>

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '3px', height: '20px', background: G }} />
            <div>
              <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: MD, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Quick View</p>
              <h2 style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK, letterSpacing: '-0.01em', marginTop: '1px' }}>{product.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: '38px', height: '38px', border: `1px solid ${BR}`, background: W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '16px', color: MD, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = DK; e.currentTarget.style.color = W; e.currentTarget.style.borderColor = DK }}
            onMouseLeave={e => { e.currentTarget.style.background = W; e.currentTarget.style.color = MD; e.currentTarget.style.borderColor = BR }}>
            ✕
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ flex: 1, overflowY: 'auto' }}>

          {/* IMAGE + DETAILS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr 1fr', height: '480px', borderBottom: `1px solid ${BR}` }}>

            {/* Thumbnails */}
            <div style={{ background: LG, borderRight: `1px solid ${BR}`, display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 8px', overflowY: 'auto' }}>
              {images.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)}
                  style={{ width: '54px', height: '68px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? G : 'transparent'}`, flexShrink: 0, transition: 'border-color 0.2s' }}>
                  <img src={img} alt="" onError={e => { e.target.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div style={{ overflow: 'hidden', background: LG }}>
              <img src={images[activeImg]} alt={product.name}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            {/* Product details panel */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px', borderLeft: `1px solid ${BR}` }}>

              {/* Rating */}
              <StarRow score={0} count={0} />

              {/* Price */}
              <div>
                <p style={{ ...F, fontSize: '28px', fontWeight: 800, color: G, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  GH₵{Number(product.price).toLocaleString()}
                </p>
                <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: MD, marginTop: '4px' }}>
                  {product.collection?.name || 'STAAY Collection'}
                </p>
              </div>

              {/* Stock */}
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '8px 14px', ...F, fontSize: '12px', fontWeight: 600, color: '#92400E' }}>
                Only {Math.floor(Math.random() * 4) + 1} left in stock
              </div>

              <Divider />

              {/* Color */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Colour — <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: MD }}>{COLORS[selectedColor].name}</span>
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {COLORS.map((c, i) => (
                    <button key={i} onClick={() => setSelectedColor(i)}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.hex, border: `3px solid ${W}`, cursor: 'pointer', padding: 0, outline: `2px solid ${selectedColor === i ? G : 'transparent'}`, outlineOffset: '2px', transition: 'outline-color 0.2s' }} />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Size</p>
                  <button style={{ background: 'none', border: 'none', ...F, fontSize: '11px', color: G, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0 }}>Size Guide</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {SIZES.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      style={{ padding: '7px 14px', border: `1.5px solid ${selectedSize === s ? G : BR}`, background: selectedSize === s ? GL : W, ...F, fontSize: '12px', fontWeight: selectedSize === s ? 700 : 400, color: selectedSize === s ? G : DK, cursor: 'pointer', transition: 'all 0.15s', minWidth: '46px', textAlign: 'center' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                  Quantity <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0, color: MD }}>(Max 5)</span>
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: `1px solid ${BR}` }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{ width: '40px', height: '40px', background: LG, border: 'none', borderRight: `1px solid ${BR}`, cursor: 'pointer', ...F, fontSize: '20px', color: DK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ width: '50px', textAlign: 'center', ...F, fontSize: '15px', fontWeight: 600, color: DK }}>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(5, q + 1))}
                    style={{ width: '40px', height: '40px', background: LG, border: 'none', borderLeft: `1px solid ${BR}`, cursor: 'pointer', ...F, fontSize: '20px', color: DK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>

              {/* Add to Cart + Wishlist */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleAddToCart}
                  style={{ flex: 1, padding: '13px', background: addedToBag ? GR : BK, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', transition: 'background 0.2s' }}
                  onMouseEnter={e => { if (!addedToBag) e.currentTarget.style.background = G }}
                  onMouseLeave={e => { if (!addedToBag) e.currentTarget.style.background = addedToBag ? GR : BK }}>
                  {addedToBag ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <button onClick={() => toggle({ ...product, category: product.collection?.name })}
                  style={{ width: '46px', height: '46px', border: `1px solid ${faved ? RD : BR}`, background: faved ? '#FEF2F2' : W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: faved ? RD : FT, transition: 'all 0.2s', flexShrink: 0 }}>
                  {faved ? '♥' : '♡'}
                </button>
              </div>

            </div>
          </div>

          {/* ── SHIPPING INFO — no emojis ── */}
          <div style={{ padding: '20px 28px', borderBottom: `1px solid ${BR}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {[
              { title: 'Free Shipping',    sub: 'On all orders within Accra'    },
              { title: 'Fast Delivery',    sub: '2–3 business days'             },
              { title: 'Easy Returns',     sub: 'Free returns within 7 days'    },
            ].map(item => (
              <div key={item.title} style={{ padding: '12px 16px', background: LG, borderLeft: `2px solid ${G}` }}>
                <p style={{ ...F, fontSize: '12px', fontWeight: 700, color: DK, marginBottom: '3px' }}>{item.title}</p>
                <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: MD }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* ── PRODUCT DETAILS TOGGLE ── */}
          <div style={{ borderBottom: `1px solid ${BR}` }}>
            <button onClick={() => setDetailsOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', padding: '16px 28px', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 600, color: DK }}>
              Product Details
              <motion.span animate={{ rotate: detailsOpen ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: '16px', color: MD }}>›</motion.span>
            </button>
            {detailsOpen && (
              <div style={{ padding: '0 28px 20px', ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.8 }}>
                Part of the {product.collection?.name || 'STAAY'} collection. Designed for the modern woman who carries herself with grace and intention. Soft fabric, thoughtful cut, built to last.
              </div>
            )}
          </div>

          {/* ── REVIEWS ── */}
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK }}>Reviews & Ratings</h3>
              <button style={{ background: G, border: 'none', color: W, padding: '9px 20px', ...F, fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                Write a Review
              </button>
            </div>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div style={{ textAlign: 'center', flexShrink: 0, paddingTop: '4px' }}>
                <p style={{ ...F, fontSize: '48px', fontWeight: 900, color: DK, lineHeight: 1, letterSpacing: '-0.03em' }}>0.0</p>
                <StarRow score={0} count={0} />
                <p style={{ ...F, fontSize: '11px', color: MD, marginTop: '6px' }}>Based on 0 reviews</p>
              </div>
              <div style={{ flex: 1 }}>
                {[5,4,3,2,1].map(star => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ ...F, fontSize: '12px', color: MD, width: '12px', textAlign: 'right', flexShrink: 0 }}>{star}</span>
                    <div style={{ flex: 1, height: '8px', background: BR, borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '0%', height: '100%', background: G, borderRadius: '4px' }} />
                    </div>
                    <span style={{ ...F, fontSize: '12px', color: MD, width: '12px', flexShrink: 0 }}>0</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '32px 0', border: `1px dashed ${BR}` }}>
              <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '8px' }}>No Reviews Yet</p>
              <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, marginBottom: '20px' }}>
                Be the first to review this product
              </p>
              <button style={{ background: G, border: 'none', color: W, padding: '11px 36px', ...F, fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                Write First Review
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}
