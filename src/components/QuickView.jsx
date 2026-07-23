import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import { useWishlist } from '../hooks/useWishlist'
import { imgFull } from '../lib/images'
import { useAuth } from '../hooks/useAuth'
import { getReviewsByProduct, createReview } from '../lib/api'
import useCurrencyStore from '../store/useCurrencyStore'

const G    = 'var(--accent)'
const GL   = 'var(--accent-soft)'
const W    = 'var(--white)'   // fixed white text/foreground
const CARD = 'var(--bg-card)'
const BK   = 'var(--ink)'     // fixed dark chrome
const DK   = 'var(--text-strong)'
const MD   = 'var(--text-muted)'
const FT   = 'var(--text-faint)'
const LG   = 'var(--bg-panel)'
const BR   = 'var(--border)'
const RD   = 'var(--danger)'
const GR   = 'var(--success)'
const F    = { fontFamily: "'Inter', sans-serif" }

const DEFAULT_SIZES     = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const CUSTOMIZATION_FEE = 300
const COLORS = [
  { name: 'Gold',  hex: '#B8903A' },
  { name: 'Black', hex: '#1A1612' },
  { name: 'Nude',  hex: '#C8A882' },
  { name: 'White', hex: '#F7F5F2' },
  { name: 'Navy',  hex: '#1E3A5F' },
]

function StarRow({ score = 0, count = 0, hideLabel = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(i => (
          <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill={i <= Math.round(score) ? G : 'var(--border)'} stroke={i <= Math.round(score) ? G : 'var(--border-mid)'} strokeWidth="0.5">
            <path d="M6.5 1l1.3 4H12L8.6 7.8l1.3 4L6.5 9.5 3.1 11.8l1.3-4L1 5h4.2z"/>
          </svg>
        ))}
      </div>
      {!hideLabel && <span style={{ ...F, fontSize: '12px', color: MD }}>{score.toFixed(1)} ({count})</span>}
    </div>
  )
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 13 13" fill={i <= (hovered || value) ? G : 'var(--border)'} stroke={i <= (hovered || value) ? G : 'var(--border-mid)'} strokeWidth="0.5">
            <path d="M6.5 1l1.3 4H12L8.6 7.8l1.3 4L6.5 9.5 3.1 11.8l1.3-4L1 5h4.2z"/>
          </svg>
        </button>
      ))}
    </div>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: BR, margin: '4px 0' }} />
}

export default function QuickView({ product, onClose }) {
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [customize,     setCustomize]     = useState(false)
  const [customColor,   setCustomColor]   = useState(null)
  const [customNote,    setCustomNote]    = useState('')
  const [qty,           setQty]           = useState(1)
  const [activeImg,     setActiveImg]     = useState(0)
  const [addedToBag,    setAddedToBag]    = useState(false)
  const [sizeError,     setSizeError]     = useState(false)
  const [detailsOpen,   setDetailsOpen]   = useState(false)

  const [reviews,        setReviews]        = useState([])
  const [reviewsLoading,  setReviewsLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewName,    setReviewName]    = useState('')
  const [reviewRating,  setReviewRating]  = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewError,   setReviewError]   = useState('')
  const [submitting,    setSubmitting]    = useState(false)
  const [submitted,     setSubmitted]     = useState(false)

  const addItem     = useCartStore(s => s.addItem)
  const { toggle, isFavorited } = useWishlist()
  const faved = isFavorited(product?.id)
  const { user, profile } = useAuth()
  const format = useCurrencyStore(s => s.format)

  useEffect(() => {
    if (!product?.id) return
    setReviewsLoading(true)
    getReviewsByProduct(product.id)
      .then(data => setReviews(data || []))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false))
  }, [product?.id])

  useEffect(() => {
    if (user && profile?.first_name) setReviewName(profile.first_name)
  }, [user, profile])

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  }, [reviews])

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(r => { counts[r.rating] = (counts[r.rating] || 0) + 1 })
    return counts
  }, [reviews])

  if (!product) return null

  const images    = [product.image_url, product.image_url_2].filter(Boolean).map(imgFull)
  const availSizes = (product.sizes && product.sizes.length > 0) ? product.sizes : DEFAULT_SIZES

  function handleAddToCart() {
    if (availSizes.length > 0 && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    const finalPrice = product.price + (customize ? CUSTOMIZATION_FEE : 0)
    addItem({
      id: product.id,
      name: customize ? `${product.name} (Customized)` : product.name,
      price: finalPrice,
      image: product.image_url,
      category: product.collection?.name || 'STAAY',
      badge: product.badge,
      size: selectedSize,
      qty,
      customization: customize ? { color: customColor, note: customNote.trim() || null } : null,
    })
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2500)
  }

  async function handleSubmitReview(e) {
    e.preventDefault()
    if (!reviewName.trim())  { setReviewError('Please enter your name.'); return }
    if (!reviewRating)       { setReviewError('Please select a star rating.'); return }
    if (!reviewComment.trim()) { setReviewError('Please write a short review.'); return }

    setSubmitting(true)
    setReviewError('')
    try {
      const newReview = await createReview({
        productId: product.id,
        customerId: user?.id || null,
        name: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim(),
      })
      setReviews(prev => [newReview, ...prev])
      setSubmitted(true)
      setReviewComment('')
      setReviewRating(0)
      setTimeout(() => { setSubmitted(false); setShowReviewForm(false) }, 1800)
    } catch (err) {
      setReviewError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
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
        className="qv-drawer"
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '760px',
          maxWidth: '96vw',
          zIndex: 301,
          background: CARD,
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
            style={{ width: '38px', height: '38px', border: `1px solid ${BR}`, background: CARD, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '16px', color: MD, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = BK; e.currentTarget.style.color = W; e.currentTarget.style.borderColor = BK }}
            onMouseLeave={e => { e.currentTarget.style.background = CARD; e.currentTarget.style.color = MD; e.currentTarget.style.borderColor = BR }}>
            ✕
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ flex: 1, overflowY: 'auto' }}>

          {/* IMAGE + DETAILS ROW */}
          <div className="qv-image-grid" style={{ display: 'grid', gridTemplateColumns: '72px 1fr 1fr', height: '480px', borderBottom: `1px solid ${BR}` }}>

            {/* Thumbnails */}
            <div style={{ background: LG, borderRight: `1px solid ${BR}`, display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 8px', overflowY: 'auto' }}>
              {images.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)}
                  style={{ width: '54px', height: '68px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? G : 'transparent'}`, flexShrink: 0, transition: 'border-color 0.2s' }}>
                  <img src={img} alt="" loading="lazy" decoding="async" onError={e => { e.target.style.display = 'none' }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div style={{ overflow: 'hidden', background: LG }}>
              <img src={images[activeImg]} alt={product.name}
                decoding="async"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            {/* Product details panel */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px', borderLeft: `1px solid ${BR}` }}>

              {/* Rating */}
              <StarRow score={avgRating} count={reviews.length} />

              {/* Price */}
              <div>
                <p style={{ ...F, fontSize: '28px', fontWeight: 800, color: G, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {format(product.price + (customize ? CUSTOMIZATION_FEE : 0))}
                </p>
                {customize && (
                  <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: MD, marginTop: '4px' }}>
                    {format(product.price)} + {format(CUSTOMIZATION_FEE)} customization
                  </p>
                )}
                <p style={{ ...F, fontSize: '11px', fontWeight: 400, color: MD, marginTop: '4px' }}>
                  {product.collection?.name || 'STAAY Collection'}
                </p>
              </div>

              {/* Stock */}
              {product.stock_quantity === 0 ? (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '8px 14px', ...F, fontSize: '12px', fontWeight: 600, color: '#B91C1C' }}>
                  Out of stock
                </div>
              ) : product.stock_quantity > 0 && product.stock_quantity <= 5 ? (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '8px 14px', ...F, fontSize: '12px', fontWeight: 600, color: '#92400E' }}>
                  Only {product.stock_quantity} left in stock
                </div>
              ) : product.stock_quantity > 5 ? (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '8px 14px', ...F, fontSize: '12px', fontWeight: 600, color: '#166534' }}>
                  In stock
                </div>
              ) : null}

              <Divider />

              {/* Customization */}
              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <button
                    type="button"
                    onClick={() => setCustomize(v => { const next = !v; if (!next) { setCustomColor(null); setCustomNote('') } return next })}
                    style={{ width: '44px', height: '24px', borderRadius: '12px', background: customize ? G : 'var(--bg-surface)', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s', marginTop: '1px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: W, position: 'absolute', top: '3px', left: customize ? '23px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </button>
                  <div>
                    <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>
                      Customize this piece <span style={{ color: G, fontWeight: 700 }}>+{format(CUSTOMIZATION_FEE)}</span>
                    </p>
                    <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: MD, marginTop: '2px', lineHeight: 1.5 }}>
                      Request a custom colour or adjustments to fit, length, or styling. We'll follow up to confirm details.
                    </p>
                  </div>
                </label>

                {customize && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden', marginTop: '14px' }}>

                    {/* Custom color picker */}
                    <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>
                      Preferred Colour {customColor && <span style={{ fontWeight: 400, color: MD }}>— {customColor}</span>}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                      {COLORS.map(c => (
                        <button key={c.name} type="button" onClick={() => setCustomColor(c.name)} title={c.name}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.hex, border: `3px solid ${W}`, cursor: 'pointer', padding: 0, outline: `2px solid ${customColor === c.name ? G : 'transparent'}`, outlineOffset: '2px', transition: 'outline-color 0.2s' }} />
                      ))}
                    </div>

                    <textarea
                      value={customNote}
                      onChange={e => setCustomNote(e.target.value)}
                      placeholder="Optional — tell us what you'd like customized (e.g. shorten sleeves, take in waist)"
                      rows={3}
                      style={{ width: '100%', padding: '10px 12px', border: `1px solid ${BR}`, background: LG, ...F, fontSize: '12px', color: DK, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                  </motion.div>
                )}
              </div>


              {/* Size */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: sizeError ? RD : DK, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Size {sizeError && <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— please select a size</span>}
                  </p>
                  <button style={{ background: 'none', border: 'none', ...F, fontSize: '11px', color: G, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0 }}>Size Guide</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {availSizes.map(s => (
                    <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false) }}
                      style={{ padding: '7px 14px', border: `1.5px solid ${selectedSize === s ? G : sizeError ? RD : BR}`, background: selectedSize === s ? GL : CARD, ...F, fontSize: '12px', fontWeight: selectedSize === s ? 700 : 400, color: selectedSize === s ? G : DK, cursor: 'pointer', transition: 'all 0.15s', minWidth: '46px', textAlign: 'center' }}>
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
                  style={{ width: '46px', height: '46px', border: `1px solid ${faved ? RD : BR}`, background: faved ? 'rgba(229,83,75,0.15)' : CARD, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: faved ? RD : FT, transition: 'all 0.2s', flexShrink: 0 }}>
                  {faved ? '♥' : '♡'}
                </button>
              </div>

            </div>
          </div>

          {/* ── SHIPPING LINK ── */}
          <div style={{ padding: '14px 28px', borderBottom: `1px solid ${BR}` }}>
            <a href="/terms" style={{ ...F, fontSize: '12px', fontWeight: 500, color: MD, textDecoration: 'underline', textUnderlineOffset: '3px', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              View shipping &amp; returns information →
            </a>
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
              {!showReviewForm && (
                <button onClick={() => setShowReviewForm(true)} style={{ background: G, border: 'none', color: W, padding: '9px 20px', ...F, fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                  Write a Review
                </button>
              )}
            </div>

            {/* Rating summary */}
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div style={{ textAlign: 'center', flexShrink: 0, paddingTop: '4px' }}>
                <p style={{ ...F, fontSize: '48px', fontWeight: 900, color: DK, lineHeight: 1, letterSpacing: '-0.03em' }}>{avgRating.toFixed(1)}</p>
                <StarRow score={avgRating} count={reviews.length} />
                <p style={{ ...F, fontSize: '11px', color: MD, marginTop: '6px' }}>Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
              </div>
              <div style={{ flex: 1 }}>
                {[5,4,3,2,1].map(star => {
                  const count = ratingCounts[star] || 0
                  const pct = reviews.length ? (count / reviews.length) * 100 : 0
                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ ...F, fontSize: '12px', color: MD, width: '12px', textAlign: 'right', flexShrink: 0 }}>{star}</span>
                      <div style={{ flex: 1, height: '8px', background: BR, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: G, borderRadius: '4px', transition: 'width 0.4s ease' }} />
                      </div>
                      <span style={{ ...F, fontSize: '12px', color: MD, width: '16px', flexShrink: 0 }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Write review form */}
            <AnimatePresence>
              {showReviewForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ background: LG, padding: '20px', border: `1px solid ${BR}` }}>
                    {submitted ? (
                      <div style={{ textAlign: 'center', padding: '12px 0' }}>
                        <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: GR }}>✓ Thank you for your review!</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                          <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Your Rating</p>
                          <StarPicker value={reviewRating} onChange={setReviewRating} />
                        </div>
                        <div>
                          <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Your Name</p>
                          <input value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="e.g. Ama K."
                            style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, background: CARD, ...F, fontSize: '13px', color: DK, outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <p style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, marginBottom: '8px' }}>Your Review</p>
                          <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} rows={3} placeholder="Tell us what you thought of this piece..."
                            style={{ width: '100%', padding: '10px 14px', border: `1px solid ${BR}`, background: CARD, ...F, fontSize: '13px', color: DK, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                        </div>
                        {reviewError && <p style={{ ...F, fontSize: '12px', color: RD }}>{reviewError}</p>}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button type="submit" disabled={submitting}
                            style={{ flex: 1, padding: '11px', background: submitting ? FT : G, color: W, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em' }}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                          </button>
                          <button type="button" onClick={() => setShowReviewForm(false)}
                            style={{ padding: '11px 20px', background: 'transparent', border: `1px solid ${BR}`, color: MD, cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 500 }}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Review list / empty state */}
            {reviewsLoading ? (
              <p style={{ ...F, fontSize: '13px', color: FT, textAlign: 'center', padding: '20px 0' }}>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0', border: `1px dashed ${BR}` }}>
                <p style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK, marginBottom: '8px' }}>No Reviews Yet</p>
                <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, marginBottom: '20px' }}>
                  Be the first to review this product
                </p>
                {!showReviewForm && (
                  <button onClick={() => setShowReviewForm(true)} style={{ background: G, border: 'none', color: W, padding: '11px 36px', ...F, fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                    Write First Review
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {reviews.map(r => (
                  <div key={r.id} style={{ borderTop: `1px solid ${BR}`, paddingTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <p style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK }}>{r.name}</p>
                      <span style={{ ...F, fontSize: '11px', color: FT }}>
                        {new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <StarRow score={r.rating} hideLabel />
                    </div>
                    <p style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, lineHeight: 1.7 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}
