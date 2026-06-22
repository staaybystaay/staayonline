
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

const INK   = '#171614'
const PAPER = '#FAF9F6'
const LINE  = '#E6E2DA'
const MUTE  = '#8C8579'
const FAINT = '#BFBAB0'
const W     = '#FFFFFF'
const RD    = '#A33B34'
const GR    = '#3F6B52'
const F     = { fontFamily: "'Inter', sans-serif" }

const BagIcon = ({ size = 28, color = INK }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M6.5 9h15l-1.1 13.4a2 2 0 0 1-2 1.85H9.6a2 2 0 0 1-2-1.85z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M10 9V7.2a4 4 0 0 1 8 0V9" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

// ─── EMPTY STATE ─────────────────────────────
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '110px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
      <div style={{ width: '64px', height: '64px', border: `1px solid ${LINE}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
        <BagIcon size={24} color={MUTE} />
      </div>
      <h2 style={{ ...F, fontSize: '22px', fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>
        Your bag is empty
      </h2>
      <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MUTE, maxWidth: '280px', lineHeight: 1.7 }}>
        Items you add will appear here. Take a look through our latest pieces.
      </p>
      <Link to="/shop"
        style={{ background: INK, color: W, padding: '14px 40px', marginTop: '8px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', display: 'inline-block', transition: 'background 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#000' }}
        onMouseLeave={e => { e.currentTarget.style.background = INK }}>
        Continue Shopping
      </Link>
    </motion.div>
  )
}

// ─── CART ITEM ───────────────────────────────
function CartItem({ item, index }) {
  const { updateQty, removeItem } = useCartStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{ display: 'grid', gridTemplateColumns: '92px 1fr auto', gap: '20px', padding: '22px 0', borderBottom: `1px solid ${LINE}`, background: W }}>

      {/* Image */}
      <div style={{ width: '92px', aspectRatio: '3/4', background: PAPER, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={item.image} alt={item.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: MUTE, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {item.category || 'STAAY'}
          </p>
          <h3 style={{ ...F, fontSize: '15px', fontWeight: 600, color: INK, letterSpacing: '-0.01em' }}>
            {item.name}
          </h3>
          {item.size && (
            <p style={{ ...F, fontSize: '11px', fontWeight: 500, color: MUTE, marginTop: '2px' }}>
              Size: {item.size}
            </p>
          )}
          {item.customization && (
            <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: MUTE, marginTop: '4px', lineHeight: 1.5 }}>
              {item.customization.color && `Colour: ${item.customization.color}`}
              {item.customization.color && item.customization.note && ' · '}
              {item.customization.note}
            </p>
          )}
        </div>

        {/* Qty + Remove */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'stretch', border: `1px solid ${LINE}` }}>
            <button
              onClick={() => item.qty > 1 ? updateQty(item.cartId, item.qty - 1) : removeItem(item.cartId)}
              style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', borderRight: `1px solid ${LINE}`, color: MUTE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '16px' }}>
              −
            </button>
            <span style={{ width: '40px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '13px', fontWeight: 600, color: INK }}>
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.cartId, item.qty + 1)}
              style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', borderLeft: `1px solid ${LINE}`, color: MUTE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', ...F, fontSize: '16px' }}>
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.cartId)}
            style={{ background: 'transparent', border: 'none', ...F, fontSize: '12px', fontWeight: 400, color: FAINT, cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = RD }}
            onMouseLeave={e => { e.currentTarget.style.color = FAINT }}>
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '90px' }}>
        <p style={{ ...F, fontSize: '15px', fontWeight: 600, color: INK }}>
          GH₵{(item.price * item.qty).toLocaleString()}
        </p>
        {item.qty > 1 && (
          <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: FAINT }}>
            GH₵{item.price.toLocaleString()} each
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── ORDER SUMMARY ───────────────────────────
function OrderSummary({ items }) {
  const navigate = useNavigate()
  const [promo,        setPromo]        = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState(false)
  const [focused,      setFocused]      = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const total    = subtotal - discount

  function applyPromo() {
    if (promo.toUpperCase() === 'STAAY10') {
      setPromoApplied(true); setPromoError(false)
    } else {
      setPromoError(true); setPromoApplied(false)
    }
  }

  return (
    <div className="cart-summary" style={{ position: 'sticky', top: '24px' }}>
      <div style={{ border: `1px solid ${LINE}` }}>

        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${LINE}` }}>
          <h2 style={{ ...F, fontSize: '15px', fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>
            Order Summary
          </h2>
        </div>

        <div style={{ padding: '24px' }}>

          {/* Line items */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${LINE}` }}>
              <span style={{ ...F, fontSize: '13px', fontWeight: 300, color: MUTE }}>Subtotal</span>
              <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: INK }}>GH₵{subtotal.toLocaleString()}</span>
            </div>
            {promoApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${LINE}` }}>
                <span style={{ ...F, fontSize: '13px', fontWeight: 300, color: MUTE }}>Promo STAAY10 (10%)</span>
                <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: GR }}>−GH₵{discount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Promo */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex' }}>
              <input
                value={promo}
                onChange={e => { setPromo(e.target.value); setPromoError(false) }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={e => { if (e.key === 'Enter') applyPromo() }}
                placeholder="Promo code"
                style={{
                  flex: 1, background: W,
                  border: `1px solid ${promoError ? RD : promoApplied ? GR : focused ? INK : LINE}`,
                  borderRight: 'none', padding: '11px 14px',
                  ...F, fontSize: '13px', color: INK,
                  outline: 'none', transition: 'border-color 0.2s',
                  letterSpacing: '0.03em',
                }}
              />
              <button
                onClick={applyPromo}
                style={{ padding: '0 18px', background: promoApplied ? GR : INK, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            <AnimatePresence>
              {promoError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ ...F, fontSize: '11px', color: RD, marginTop: '6px' }}>
                  Invalid code
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Total */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: `1px solid ${INK}`, marginBottom: '6px' }}>
            <span style={{ ...F, fontSize: '14px', fontWeight: 700, color: INK }}>Total</span>
            <span style={{ ...F, fontSize: '21px', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>
              GH₵{total.toLocaleString()}
            </span>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: FAINT, marginBottom: '20px' }}>
            Shipping calculated at checkout
          </p>

          {/* Checkout */}
          <button
            onClick={() => navigate('/checkout')}
            style={{ width: '100%', padding: '16px', background: INK, color: W, border: 'none', cursor: 'pointer', ...F, fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '10px', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#000' }}
            onMouseLeave={e => { e.currentTarget.style.background = INK }}>
            Checkout
          </button>

          <Link to="/shop"
            style={{ display: 'block', textAlign: 'center', padding: '13px', border: `1px solid ${LINE}`, ...F, fontSize: '12px', fontWeight: 500, color: MUTE, letterSpacing: '0.03em', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = INK; e.currentTarget.style.color = INK }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = LINE; e.currentTarget.style.color = MUTE }}>
            Continue Shopping
          </Link>

        </div>
      </div>
    </div>
  )
}

// ─── CART PAGE ───────────────────────────────
export default function Cart() {
  const items     = useCartStore(s => s.items)
  const clearCart = useCartStore(s => s.clearCart)
  const totalQty  = items.reduce((n, i) => n + i.qty, 0)

  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding" style={{ borderBottom: `1px solid ${LINE}`, padding: '36px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MUTE, transition: 'color 0.2s' }}>Home</Link>
            <span style={{ color: FAINT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: INK }}>Bag</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h1 style={{ ...F, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: INK, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Your Bag {totalQty > 0 && <span style={{ color: MUTE, fontWeight: 400 }}>({totalQty})</span>}
            </h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                style={{ background: 'none', border: 'none', ...F, fontSize: '12px', fontWeight: 400, color: FAINT, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = RD }}
                onMouseLeave={e => { e.currentTarget.style.color = FAINT }}>
                Clear bag
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="layout-sidebar page-padding" style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 40px 96px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px', alignItems: 'start' }}>

        {items.length === 0 ? (
          <div style={{ gridColumn: '1 / -1' }}>
            <EmptyCart />
          </div>
        ) : (
          <>
            <div>
              <AnimatePresence>
                {items.map((item, i) => (
                  <CartItem key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>
            </div>

            <OrderSummary items={items} />
          </>
        )}
      </div>

    </div>
  )
}
