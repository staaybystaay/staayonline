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

const SIZES   = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const COLORS  = [
  { name: 'Gold',  hex: '#B8903A' },
  { name: 'Black', hex: '#1A1612' },
  { name: 'Nude',  hex: '#C8A882' },
]

export default function QuickView({ product, onClose }) {
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [qty,           setQty]           = useState(1)
  const [activeImg,     setActiveImg]      = useState(0)
  const [addedToBag,    setAddedToBag]    = useState(false)

  const addItem     = useCartStore(s => s.addItem)
  const toggle      = useFavoritesStore(s => s.toggle)
  const isFavorited = useFavoritesStore(s => s.isFavorited)
  const faved = isFavorited(product?.id)

  if (!product) return null

  // Use the same image for both thumbnails (replace when you have multiple images)
  const images = [product.image_url, product.image_url]

  function handleAddToCart() {
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    product.image_url,
      category: product.collection?.name || 'STAAY',
      badge:    product.badge,
      qty,
    })
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
      />

      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 60 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: '50%', right: '20px',
          transform: 'translateY(-50%)',
          zIndex: 201,
          background: W,
          width: '640px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
        }}>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{ position: 'sticky', top: 0, float: 'right', margin: '12px 12px 0 0', zIndex: 10, width: '30px', height: '30px', borderRadius: '50%', background: LG, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '16px', color: DK }}>
          ✕
        </button>

        <div style={{ clear: 'both' }} />

        {/* ── TOP SECTION: Image + Details ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr', gap: '0', padding: '0 20px 20px' }}>

          {/* Thumbnails — left column like Damsyn */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                style={{ width: '44px', height: '56px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? G : BR}`, transition: 'border-color 0.2s', flexShrink: 0 }}>
                <img src={img} alt={product.name} onError={e => { e.target.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>

          {/* Main image */}
          <div style={{ height: '320px', background: LG, overflow: 'hidden', margin: '0 8px' }}>
            <img
              src={images[activeImg]}
              alt={product.name}
              onError={e => { e.target.style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Product details */}
          <div style={{ padding: '0 0 0 8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {/* Name + share */}
            <div>
              <h2 style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK, lineHeight: 1.3, marginBottom: '4px' }}>
                {product.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="#EEE" stroke="#DDD" strokeWidth="0.8">
                    <path d="M5.5 1l1.1 3.4h3.5L7.4 6.6l1.1 3.4L5.5 8.4 2.5 10l1.1-3.4L1 4.4h3.5z"/>
                  </svg>
                ))}
                <span style={{ ...F, fontSize: '11px', color: MD }}>Share</span>
              </div>
            </div>

            {/* Price — gold like Damsyn */}
            <p style={{ ...F, fontSize: '20px', fontWeight: 700, color: G }}>
              GH₵{Number(product.price).toLocaleString()}
            </p>

            {/* Stock */}
            <div style={{ background: '#FFF9C4', border: '1px solid #F6E05E', padding: '4px 10px', display: 'inline-block', borderRadius: '4px', ...F, fontSize: '11px', fontWeight: 600, color: '#744210' }}>
              Only {Math.floor(Math.random() * 5) + 1} left in stock
            </div>

            {/* Color */}
            <div>
              <p style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK, marginBottom: '6px' }}>
                Color: <span style={{ fontWeight: 400, color: MD }}>{COLORS[selectedColor].name}</span>
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                {COLORS.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)}
                    style={{ width: '22px', height: '22px', borderRadius: '50%', background: c.hex, border: `2px solid ${selectedColor === i ? G : '#ddd'}`, cursor: 'pointer', padding: 0, transition: 'border-color 0.2s', outline: selectedColor === i ? `2px solid ${G}` : 'none', outlineOffset: '2px' }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <p style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Size</p>
                <button style={{ background: 'none', border: 'none', ...F, fontSize: '11px', color: G, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>View Size Guide</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{ padding: '5px 10px', border: `1px solid ${selectedSize === s ? G : BR}`, background: selectedSize === s ? GL : W, ...F, fontSize: '12px', fontWeight: selectedSize === s ? 600 : 400, color: selectedSize === s ? G : DK, cursor: 'pointer', transition: 'all 0.15s' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div>
              <p style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK, marginBottom: '6px' }}>Quantity (Max: 5)</p>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BR}`, width: 'fit-content' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', ...F, fontSize: '18px', color: MD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ width: '36px', textAlign: 'center', ...F, fontSize: '14px', fontWeight: 600, color: DK }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(5, q + 1))}
                  style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', ...F, fontSize: '18px', color: MD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>

            {/* Add to Cart + Heart */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={handleAddToCart}
                style={{ flex: 1, padding: '12px', background: addedToBag ? GR : BK, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', transition: 'background 0.2s' }}
                onMouseEnter={e => { if (!addedToBag) e.currentTarget.style.background = G }}
                onMouseLeave={e => { if (!addedToBag) e.currentTarget.style.background = BK }}>
                {addedToBag ? '✓ Added!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggle({ ...product, category: product.collection?.name })}
                style={{ width: '42px', height: '42px', border: `1px solid ${faved ? RD : BR}`, background: faved ? '#FEF2F2' : W, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: faved ? RD : '#CCC', transition: 'all 0.2s' }}>
                {faved ? '♥' : '♡'}
              </button>
            </div>

            {/* Shipping info */}
            <div style={{ borderTop: `1px solid ${BR}`, paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                '🚚 Free Shipping within Accra',
                '📦 2-3 Business Days delivery',
                '↩️ Free returns within 7 days',
              ].map(line => (
                <p key={line} style={{ ...F, fontSize: '11px', fontWeight: 300, color: MD }}>{line}</p>
              ))}
            </div>

            {/* Product Details expandable */}
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: `1px solid ${BR}`, padding: '10px 12px', cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, color: DK }}>
              Product Details
              <span style={{ fontSize: '14px' }}>›</span>
            </button>

          </div>
        </div>

        {/* ── REVIEWS SECTION — like Damsyn ── */}
        <div style={{ borderTop: `1px solid ${BR}`, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK }}>Reviews & Ratings</h3>
            <button style={{ background: G, border: 'none', color: W, padding: '8px 16px', ...F, fontSize: '11px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
              Write Review
            </button>
          </div>

          {/* Rating summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ ...F, fontSize: '36px', fontWeight: 800, color: DK, lineHeight: 1 }}>0.0</p>
              <p style={{ ...F, fontSize: '11px', color: MD, marginTop: '4px' }}>Based on 0 reviews</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[5,4,3,2,1].map(star => (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ ...F, fontSize: '11px', color: MD, width: '8px' }}>{star}</span>
                  <div style={{ flex: 1, height: '6px', background: LG, borderRadius: '3px' }}>
                    <div style={{ width: '0%', height: '100%', background: G, borderRadius: '3px' }} />
                  </div>
                  <span style={{ ...F, fontSize: '11px', color: MD, width: '8px' }}>0</span>
                </div>
              ))}
            </div>
          </div>

          {/* Empty reviews */}
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>☆</div>
            <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK, marginBottom: '4px' }}>No Customer Reviews</p>
            <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: MD, marginBottom: '16px' }}>Be the first to share your thoughts about this product</p>
            <button style={{ background: G, border: 'none', color: W, padding: '10px 28px', ...F, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Write First Review
            </button>
          </div>
        </div>

        {/* Close button bottom */}
        <div style={{ padding: '0 20px 20px', textAlign: 'right' }}>
          <button onClick={onClose} style={{ background: 'none', border: `1px solid ${BR}`, padding: '8px 24px', ...F, fontSize: '12px', fontWeight: 500, color: MD, cursor: 'pointer' }}>
            Close
          </button>
        </div>

      </motion.div>
    </AnimatePresence>
  )
}
