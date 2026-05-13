import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

const G   = '#B8903A'
const GL  = '#F5ECD8'
const W   = '#FFFFFF'
const OW  = '#F8F7F4'
const B2  = '#F2EFE9'
const BK  = '#111111'
const DK  = '#222222'
const MD  = '#666666'
const FT  = '#999999'
const BR  = '#E4E0D8'
const RD  = '#B91C1C'
const GR  = '#16A34A'
const F   = { fontFamily: "'Inter', sans-serif" }

// Eden pieces for "You May Also Like"
const suggested = [
  { id: 'e1', name: 'ARI',     price: 1650, image: '/Ari.jpeg',     collection: 'Eden' },
  { id: 'e3', name: 'VERA',    price: 1700, image: '/Vera.jpeg',    collection: 'Eden' },
  { id: 'e6', name: 'AURA',    price: 2900, image: '/Aura.jpeg',    collection: 'Eden' },
  { id: 'e9', name: 'ELARA',   price: 2400, image: '/Elara.jpeg',   collection: 'Eden' },
]

// ─── EMPTY STATE ─────────────────────────────
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '100px 0',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '16px', textAlign: 'center',
      }}>
      <div style={{
        width: '72px', height: '72px',
        background: OW, border: `1px solid ${BR}`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '28px', marginBottom: '8px',
      }}>
        🛍
      </div>
      <h2 style={{ ...F, fontSize: '24px', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
        Your bag is empty
      </h2>
      <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MD, maxWidth: '280px', lineHeight: 1.65 }}>
        Looks like you haven't added anything yet. Discover our latest collections.
      </p>
      <Link
        to="/shop"
        style={{
          background: BK, color: W,
          padding: '14px 40px', marginTop: '8px',
          ...F, fontSize: '13px', fontWeight: 600,
          letterSpacing: '0.04em', display: 'inline-block',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = G }}
        onMouseLeave={e => { e.currentTarget.style.background = BK }}>
        Shop Now
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
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr auto',
        borderBottom: `1px solid ${BR}`,
        background: W,
      }}>

      {/* Image */}
      <div style={{
        width: '100px', aspectRatio: '3/4',
        background: B2, position: 'relative',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...F, fontSize: '9px', color: FT }}>{item.category}</span>
        </div>
        <img
          src={item.image} alt={item.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Info */}
      <div style={{
        padding: '20px 24px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {item.category || 'Eden Collection'}
          </p>
          <h3 style={{ ...F, fontSize: '16px', fontWeight: 600, color: DK, letterSpacing: '-0.01em', marginBottom: '10px' }}>
            {item.name}
          </h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['One Size', 'Standard'].map((tag, i) => (
              <span key={i} style={{
                padding: '3px 10px',
                border: `1px solid ${BR}`,
                ...F, fontSize: '10px', fontWeight: 400,
                color: MD, letterSpacing: '0.03em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Qty + Remove */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'stretch', border: `1px solid ${BR}` }}>
            <button
              onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeItem(item.id)}
              style={{
                width: '36px', height: '36px',
                background: 'transparent', border: 'none',
                borderRight: `1px solid ${BR}`,
                color: MD, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...F, fontSize: '18px', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = BK; e.currentTarget.style.color = W }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MD }}>
              −
            </button>
            <span style={{
              width: '44px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              ...F, fontSize: '14px', fontWeight: 600, color: DK,
            }}>
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              style={{
                width: '36px', height: '36px',
                background: 'transparent', border: 'none',
                borderLeft: `1px solid ${BR}`,
                color: MD, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...F, fontSize: '18px', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = BK; e.currentTarget.style.color = W }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MD }}>
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            style={{
              background: 'transparent', border: 'none',
              ...F, fontSize: '12px', fontWeight: 400, color: FT,
              cursor: 'pointer', transition: 'color 0.2s',
              textDecoration: 'underline', textUnderlineOffset: '3px',
              padding: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = RD }}
            onMouseLeave={e => { e.currentTarget.style.color = FT }}>
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div style={{
        padding: '20px 0 20px 24px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', justifyContent: 'space-between',
        minWidth: '110px',
      }}>
        <p style={{ ...F, fontSize: '18px', fontWeight: 700, color: DK }}>
          GH₵{(item.price * item.qty).toLocaleString()}
        </p>
        {item.qty > 1 && (
          <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: FT }}>
            GH₵{item.price.toLocaleString()} each
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── ORDER SUMMARY ───────────────────────────
function OrderSummary({ items }) {
  const [promo,        setPromo]        = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState(false)
  const [focused,      setFocused]      = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal >= 500 ? 0 : 50
  const total    = subtotal - discount + shipping

  const freeThreshold = 500
  const pct       = Math.min((subtotal / freeThreshold) * 100, 100)
  const remaining = freeThreshold - subtotal

  function applyPromo() {
    if (promo.toUpperCase() === 'STAAY10') {
      setPromoApplied(true); setPromoError(false)
    } else {
      setPromoError(true); setPromoApplied(false)
    }
  }

  return (
    <div style={{ position: 'sticky', top: '80px' }}>
      <div style={{ background: OW, border: `1px solid ${BR}`, overflow: 'hidden' }}>

        {/* Gold top bar */}
        <div style={{ height: '3px', background: G }} />

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BR}` }}>
          <h2 style={{ ...F, fontSize: '16px', fontWeight: 700, color: DK, letterSpacing: '-0.01em' }}>
            Order Summary
          </h2>
        </div>

        <div style={{ padding: '24px', background: W }}>

          {/* Free shipping bar */}
          <div style={{ marginBottom: '24px', padding: '14px 16px', background: pct >= 100 ? '#F0FDF4' : OW, border: `1px solid ${pct >= 100 ? '#BBF7D0' : BR}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: pct >= 100 ? GR : MD }}>
                {pct >= 100 ? '✓ Free shipping unlocked' : `GH₵${remaining.toLocaleString()} away from free shipping`}
              </span>
              <span style={{ ...F, fontSize: '11px', fontWeight: 600, color: pct >= 100 ? GR : G }}>
                {Math.round(pct)}%
              </span>
            </div>
            <div style={{ height: '4px', background: BR, borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ height: '100%', background: pct >= 100 ? GR : G, borderRadius: '2px' }}
              />
            </div>
          </div>

          {/* Line items */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            {[
              { label: 'Subtotal',   value: `GH₵${subtotal.toLocaleString()}`,          color: DK  },
              ...(promoApplied ? [{ label: 'Promo STAAY10 (10%)', value: `-GH₵${discount.toLocaleString()}`, color: G }] : []),
              { label: `Shipping${shipping === 0 ? ' — Free' : ''}`, value: shipping === 0 ? 'FREE' : `GH₵${shipping}`, color: shipping === 0 ? GR : DK },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${BR}` }}>
                <span style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD }}>{row.label}</span>
                <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: row.color }}>{row.value}</span>
              </div>
            ))}
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
                  border: `1px solid ${promoError ? RD : promoApplied ? G : focused ? BK : BR}`,
                  borderRight: 'none', padding: '11px 14px',
                  ...F, fontSize: '13px', color: DK,
                  outline: 'none', transition: 'border-color 0.2s',
                  letterSpacing: '0.04em',
                }}
              />
              <button
                onClick={applyPromo}
                style={{
                  padding: '0 18px',
                  background: promoApplied ? G : BK,
                  color: W, border: 'none', cursor: 'pointer',
                  ...F, fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.04em', transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                }}>
                {promoApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>
            <AnimatePresence>
              {promoError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ ...F, fontSize: '11px', color: RD, marginTop: '6px' }}>
                  Invalid code. Try STAAY10
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Total */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 0', borderTop: `2px solid ${DK}`,
            marginBottom: '20px',
          }}>
            <span style={{ ...F, fontSize: '15px', fontWeight: 700, color: DK }}>Total</span>
            <span style={{ ...F, fontSize: '22px', fontWeight: 800, color: DK, letterSpacing: '-0.02em' }}>
              GH₵{total.toLocaleString()}
            </span>
          </div>

          {/* Checkout */}
          <button
            style={{
              width: '100%', padding: '16px',
              background: BK, color: W, border: 'none',
              cursor: 'pointer',
              ...F, fontSize: '14px', fontWeight: 600,
              letterSpacing: '0.04em', marginBottom: '10px',
              transition: 'background 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = G }}
            onMouseLeave={e => { e.currentTarget.style.background = BK }}>
            Checkout Now →
          </button>

          <Link
            to="/shop"
            style={{
              display: 'block', textAlign: 'center', padding: '13px',
              border: `1px solid ${BR}`,
              ...F, fontSize: '12px', fontWeight: 500, color: MD,
              letterSpacing: '0.03em', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = DK; e.currentTarget.style.color = DK }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
            Continue Shopping
          </Link>

          {/* Trust badges */}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${BR}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'SSL encrypted checkout',
              'Free returns within 30 days',
              'Free shipping over GH₵500',
            ].map(text => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: G, flexShrink: 0 }} />
                <span style={{ ...F, fontSize: '11px', fontWeight: 300, color: FT }}>{text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── YOU MAY ALSO LIKE ───────────────────────
function YouMayLike() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{ borderTop: `1px solid ${BR}`, background: OW, padding: '64px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Eden Collection
            </p>
            <h2 style={{ ...F, fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em' }}>
              You May Also Like
            </h2>
          </div>
          <Link
            to="/shop"
            style={{ ...F, fontSize: '13px', fontWeight: 500, color: DK, display: 'flex', alignItems: 'center', gap: '6px', borderBottom: `1px solid ${DK}`, paddingBottom: '1px', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderBottomColor = G }}
            onMouseLeave={e => { e.currentTarget.style.color = DK; e.currentTarget.style.borderBottomColor = DK }}>
            View All →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 16px' }}>
          {suggested.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}>
              <div style={{ position: 'relative', aspectRatio: '3/4', background: B2, overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ ...F, fontSize: '10px', color: FT }}>Eden</span>
                </div>
                <img
                  src={product.image} alt={product.name}
                  onError={e => { e.target.style.display = 'none' }}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === product.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                <span style={{ position: 'absolute', top: 0, left: 0, background: G, color: W, padding: '4px 10px', ...F, fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>New</span>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, background: BK,
                  transform: hovered === product.id ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform 0.3s',
                }}>
                  <button
                    onClick={() => addItem({ ...product, category: 'Eden Collection' })}
                    style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: W, cursor: 'pointer', ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Add to Bag
                  </button>
                </div>
              </div>
              <p style={{ ...F, fontSize: '10px', fontWeight: 500, color: G, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>Eden</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ ...F, fontSize: '14px', fontWeight: 600, color: DK }}>{product.name}</p>
                <p style={{ ...F, fontSize: '14px', fontWeight: 700, color: DK }}>GH₵{product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
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
      <div style={{ background: OW, borderBottom: `1px solid ${BR}`, padding: '40px 64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MD, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = G }} onMouseLeave={e => { e.currentTarget.style.color = MD }}>Home</Link>
            <span style={{ color: FT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: DK }}>Your Bag</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Shopping Bag</p>
              <h1 style={{ ...F, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: DK, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Your Bag
                {totalQty > 0 && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: G, color: W,
                    ...F, fontSize: '14px', fontWeight: 700,
                    marginLeft: '12px', verticalAlign: 'middle',
                  }}>
                    {totalQty}
                  </span>
                )}
              </h1>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                style={{ background: 'none', border: 'none', ...F, fontSize: '12px', fontWeight: 400, color: FT, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = RD }}
                onMouseLeave={e => { e.currentTarget.style.color = FT }}>
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 64px 80px' }}>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'start' }}>

            {/* ── ITEMS ── */}
            <div>
              {/* Column headers */}
              <div style={{
                display: 'grid', gridTemplateColumns: '100px 1fr auto',
                paddingBottom: '12px', borderBottom: `1px solid ${BR}`,
                marginBottom: '0',
              }}>
                {['Product', '', 'Total'].map((label, i) => (
                  <span key={i} style={{
                    ...F, fontSize: '11px', fontWeight: 600, color: FT,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    textAlign: i === 2 ? 'right' : 'left',
                    paddingLeft: i === 1 ? '24px' : 0,
                    paddingRight: i === 2 ? '0' : 0,
                  }}>
                    {label}
                  </span>
                ))}
              </div>

              <AnimatePresence>
                {items.map((item, i) => (
                  <CartItem key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {/* ── SUMMARY ── */}
            <OrderSummary items={items} />
          </div>
        )}
      </div>

      {/* ── YOU MAY ALSO LIKE ── */}
      <YouMayLike />

    </div>
  )
}
