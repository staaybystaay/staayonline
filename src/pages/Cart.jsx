import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 3.5h10M5.5 3.5V2.5h3v1M3.5 3.5l.7 8h5.6l.7-8"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MinusIcon = () => (
  <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
    <path d="M1 1h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.5 1.5h4l5.5 5.5-4 4L1.5 5.5v-4z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="4" cy="4" r="0.8" fill="currentColor"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 1.5L2 3.5v3.5c0 2.5 2 4.5 4.5 5 2.5-.5 4.5-2.5 4.5-5V3.5L6.5 1.5z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M4.5 6.5l1.5 1.5 2.5-2.5"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const TruckIcon = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
    <path d="M1 2h9v7H1zM10 4.5h2.5L14 7v2h-4V4.5z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="3.5" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.1"/>
    <circle cx="11" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
)

const GiftIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1.5" y="4.5" width="10" height="7"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M1.5 4.5h10v2h-10z" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6.5 4.5V11.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6.5 4.5C6.5 3 4.5 2 4 3s1 2 2.5 1.5"
      stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M6.5 4.5C6.5 3 8.5 2 9 3s-1 2-2.5 1.5"
      stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
)

// ─────────────────────────────────────────────
// SUGGESTED PRODUCTS
// ─────────────────────────────────────────────
const suggested = [
  { id: 9,  name: 'PHANTOM BOMBER',   price: 360, category: 'Jackets', image: '/images/product1.jpg' },
  { id: 10, name: 'STEEL CARGO',      price: 210, category: 'Bottoms', image: '/images/product2.jpg' },
  { id: 11, name: 'ARC ZIP HOODIE',   price: 175, category: 'Tops',    image: '/images/product3.jpg' },
  { id: 12, name: 'MONOLITH COAT',    price: 640, category: 'Coats',   image: '/images/product4.jpg' },
]

// ─────────────────────────────────────────────
// EMPTY CART
// ─────────────────────────────────────────────
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 0', gap: '24px',
      }}
    >
      {/* Ghost icon */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '120px', lineHeight: 1,
        color: 'rgba(201,164,74,0.06)',
        letterSpacing: '0.02em', userSelect: 'none',
      }}>
        BAG
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '28px', color: 'var(--text)',
          letterSpacing: '0.06em', marginBottom: '10px',
        }}>
          YOUR BAG IS EMPTY
        </h2>
        <p style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic', fontSize: '15px',
          color: 'var(--text-muted)', lineHeight: 1.6,
        }}>
          Looks like you haven't added anything yet.
        </p>
      </div>

      <Link
        to="/shop"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: 'var(--accent)', color: '#0C0B09',
          padding: '14px 40px',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', letterSpacing: '0.2em',
          textTransform: 'uppercase', fontWeight: 500,
          marginTop: '8px', transition: 'opacity 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      >
        Start Shopping
        <ArrowIcon />
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// CART ITEM ROW
// ─────────────────────────────────────────────
function CartItem({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const { updateQty, removeItem } = useCartStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr auto',
        gap: '24px', alignItems: 'center',
        padding: '22px 0',
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--accent-soft)' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100px', height: '120px',
        background: 'var(--bg-surface)',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '9px', letterSpacing: '0.2em',
            color: 'rgba(201,164,74,0.15)',
          }}>
            {item.category}
          </span>
        </div>
        <img
          src={item.image} alt={item.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
        />
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.24em',
          textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 300,
        }}>
          {item.category}
        </span>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '20px', color: 'var(--text)',
          letterSpacing: '0.04em', lineHeight: 1.1,
        }}>
          {item.name}
        </h3>

        {/* Size / Color tags */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
          {['Size M', 'Black'].map(tag => (
            <span key={tag} style={{
              padding: '3px 10px',
              border: '1px solid var(--border)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '9px', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Qty controls */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '0', marginTop: '10px', width: 'fit-content',
        }}>
          <button
            onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeItem(item.id)}
            style={{
              width: '32px', height: '32px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <MinusIcon />
          </button>

          <span style={{
            width: '40px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '16px', color: 'var(--text)',
            border: '1px solid var(--border)',
            borderLeft: 'none', borderRight: 'none',
          }}>
            {item.qty}
          </span>

          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            style={{
              width: '32px', height: '32px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Price + Remove */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', gap: '10px',
      }}>
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic',
          fontSize: '24px', color: 'var(--accent)',
        }}>
          ${(item.price * item.qty).toLocaleString()}
        </span>
        {item.qty > 1 && (
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', color: 'var(--text-faint)', letterSpacing: '0.1em',
          }}>
            ${item.price} each
          </span>
        )}
        <button
          onClick={() => removeItem(item.id)}
          style={{
            background: 'transparent', border: 'none',
            color: 'var(--text-faint)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '5px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', letterSpacing: '0.14em',
            textTransform: 'uppercase', transition: 'color 0.2s', padding: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#C0392B' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}
        >
          <TrashIcon />
          Remove
        </button>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// ORDER SUMMARY
// ─────────────────────────────────────────────
function OrderSummary({ items }) {
  const [promoCode,    setPromoCode]    = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal >= 200 ? 0 : 15
  const total    = subtotal - discount + shipping

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'STAAY10') {
      setPromoApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
      setPromoApplied(false)
    }
  }

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      padding: '32px',
      position: 'sticky', top: '80px',
    }}>
      {/* Gold top accent */}
      <div style={{
        height: '3px', background: 'var(--accent)',
        margin: '-32px -32px 28px -32px',
      }} />

      <h2 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '20px', color: 'var(--text)',
        letterSpacing: '0.08em', marginBottom: '28px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border)',
      }}>
        ORDER SUMMARY
      </h2>

      {/* Line items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Subtotal',                                          value: `$${subtotal.toLocaleString()}`,    gold: false },
          ...(promoApplied ? [{ label: 'Promo (STAAY10)', value: `-$${discount.toFixed(0)}`, gold: true }] : []),
          { label: `Shipping${shipping === 0 ? ' — Free' : ''}`, value: shipping === 0 ? 'FREE' : `$${shipping}`, green: shipping === 0 },
        ].map((row, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300,
              letterSpacing: '0.06em',
            }}>
              {row.label}
            </span>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 500,
              color: row.gold ? 'var(--accent)' : row.green ? '#4CAF50' : 'var(--text)',
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Promo code */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '0' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{
              position: 'absolute', left: '12px', top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-faint)',
            }}>
              <TagIcon />
            </span>
            <input
              value={promoCode}
              onChange={e => { setPromoCode(e.target.value); setPromoError(false) }}
              onKeyDown={e => { if (e.key === 'Enter') applyPromo() }}
              placeholder="Promo code"
              style={{
                width: '100%',
                background: 'var(--bg)',
                border: `1px solid ${promoError ? '#C0392B' : promoApplied ? 'var(--accent)' : 'var(--border)'}`,
                borderRight: 'none',
                padding: '11px 12px 11px 32px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px', color: 'var(--text)',
                outline: 'none', letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'border-color 0.2s',
              }}
            />
          </div>
          <button
            onClick={applyPromo}
            style={{
              padding: '0 18px',
              background: 'var(--accent-soft)',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.16em',
              textTransform: 'uppercase', fontWeight: 500,
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.color = '#0C0B09'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--accent-soft)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
          >
            Apply
          </button>
        </div>

        <AnimatePresence>
          {promoApplied && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', color: '#4CAF50',
                marginTop: '6px', letterSpacing: '0.1em',
              }}
            >
              ✓ 10% discount applied
            </motion.p>
          )}
          {promoError && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', color: '#C0392B',
                marginTop: '6px', letterSpacing: '0.1em',
              }}
            >
              ✗ Invalid code. Try STAAY10
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', margin: '0 0 20px' }} />

      {/* Total */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: '28px',
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px', color: 'var(--text)', letterSpacing: '0.08em',
        }}>
          TOTAL
        </span>
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic', fontSize: '30px', color: 'var(--accent)',
        }}>
          ${total.toLocaleString()}
        </span>
      </div>

      {/* Checkout CTA */}
      <button
        style={{
          width: '100%', background: 'var(--accent)', color: '#0C0B09',
          border: 'none', padding: '16px',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '16px', letterSpacing: '0.14em',
          textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '10px', transition: 'opacity 0.25s', marginBottom: '12px',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      >
        Checkout Now
        <ArrowIcon />
      </button>

      <Link
        to="/shop"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', width: '100%', padding: '13px',
          border: '1px solid var(--border)',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
          transition: 'all 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.color = 'var(--accent)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.color = 'var(--text-muted)'
        }}
      >
        Continue Shopping
      </Link>

      {/* Trust signals */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '10px',
        marginTop: '24px', paddingTop: '20px',
        borderTop: '1px solid var(--border)',
      }}>
        {[
          { Icon: ShieldIcon, text: 'Secure checkout — SSL encrypted'       },
          { Icon: TruckIcon,  text: 'Free shipping on orders over $200'      },
          { Icon: GiftIcon,   text: 'Free returns within 30 days'            },
        ].map(({ Icon, text }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.7 }}><Icon /></span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', color: 'var(--text-faint)',
              fontWeight: 300, letterSpacing: '0.06em',
            }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// COMPLETE THE LOOK
// ─────────────────────────────────────────────
function CompleteTheLook() {
  const addItem = useCartStore(s => s.addItem)
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: '40px',
        }}>
          <div>
            <div style={{ width: '40px', height: '3px', background: 'var(--accent)', marginBottom: '14px' }} />
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: 'var(--text)', letterSpacing: '0.04em', lineHeight: 1,
            }}>
              COMPLETE THE LOOK
            </h2>
          </div>
          <Link
            to="/shop"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--accent)'
              e.target.style.borderBottomColor = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--text-muted)'
              e.target.style.borderBottomColor = 'var(--border-mid)'
            }}
          >
            View All →
          </Link>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {suggested.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${hovered === product.id ? 'var(--border-mid)' : 'var(--border)'}`,
                overflow: 'hidden', cursor: 'pointer',
                transition: 'border-color 0.3s, transform 0.35s, box-shadow 0.3s',
                transform: hovered === product.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === product.id ? '0 12px 32px rgba(201,164,74,0.1)' : 'none',
              }}
            >
              {/* Image */}
              <div style={{
                aspectRatio: '3/4', position: 'relative',
                background: 'var(--bg-surface)', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '11px', color: 'rgba(201,164,74,0.08)',
                    letterSpacing: '0.2em',
                  }}>
                    {product.category}
                  </span>
                </div>
                <img
                  src={product.image} alt={product.name}
                  onError={e => { e.target.style.display = 'none' }}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s',
                    transform: hovered === product.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />

                {/* Quick add */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(12,11,9,0.85) 0%, transparent 50%)',
                  opacity: hovered === product.id ? 1 : 0,
                  transition: 'opacity 0.3s',
                  display: 'flex', alignItems: 'flex-end', padding: '14px',
                }}>
                  <button
                    onClick={() => addItem({ ...product, badge: null })}
                    style={{
                      width: '100%', background: 'var(--accent)',
                      color: '#0C0B09', border: 'none', padding: '10px',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '9px', letterSpacing: '0.2em',
                      textTransform: 'uppercase', fontWeight: 500,
                      cursor: 'pointer', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.opacity = '0.85' }}
                    onMouseLeave={e => { e.target.style.opacity = '1' }}
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '12px 14px' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--text-faint)',
                  marginBottom: '4px',
                }}>
                  {product.category}
                </p>
                <h4 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '16px', color: 'var(--text)',
                  letterSpacing: '0.04em', marginBottom: '6px',
                }}>
                  {product.name}
                </h4>
                <span style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic', fontSize: '16px', color: 'var(--accent)',
                }}>
                  ${product.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────
export default function Cart() {
  const items     = useCartStore(s => s.items)
  const clearCart = useCartStore(s => s.clearCart)
  const totalQty  = items.reduce((n, i) => n + i.qty, 0)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: '52px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Gold glow */}
        <div style={{
          position: 'absolute', top: '-50%', right: '-5%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,164,74,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Ghost text */}
        <div style={{
          position: 'absolute', right: '-8px', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '180px', lineHeight: 1,
          color: 'rgba(201,164,74,0.04)',
          letterSpacing: '-0.02em',
          userSelect: 'none', pointerEvents: 'none',
        }}>
          BAG
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            {['Home', '/', 'Bag'].map((c, i) => (
              <span key={i} style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: i === 2 ? 'var(--accent)' : 'var(--text-faint)',
                fontWeight: i === 2 ? 400 : 300,
              }}>
                {c}
              </span>
            ))}
          </div>

          {/* Gold accent line */}
          <div style={{ width: '40px', height: '3px', background: 'var(--accent)', marginBottom: '16px' }} />

          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(48px, 6vw, 80px)',
                color: 'var(--text)', lineHeight: 0.92,
                letterSpacing: '0.02em', margin: 0,
              }}
            >
              YOUR<br />
              <span style={{ color: 'var(--accent)' }}>BAG</span>
            </motion.h1>

            {items.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px', color: 'var(--text-muted)',
                }}>
                  {totalQty} {totalQty === 1 ? 'item' : 'items'}
                </span>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(192,57,43,0.3)',
                    color: 'rgba(192,57,43,0.6)',
                    padding: '8px 18px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.18em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#C0392B'
                    e.currentTarget.style.color = '#C0392B'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(192,57,43,0.3)'
                    e.currentTarget.style.color = 'rgba(192,57,43,0.6)'
                  }}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 80px' }}>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: '48px', alignItems: 'flex-start',
          }}>

            {/* Left — items */}
            <div>
              {/* Column headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '24px', padding: '0 0 12px',
                borderBottom: '1px solid var(--border-mid)',
                marginBottom: '4px',
              }}>
                {['Product', '', 'Total'].map((label, i) => (
                  <span key={i} style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--text-faint)', fontWeight: 300,
                    textAlign: i === 2 ? 'right' : 'left',
                  }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Items */}
              <AnimatePresence>
                {items.map((item, i) => (
                  <CartItem key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>

              {/* Free shipping progress */}
              {(() => {
                const subtotal   = items.reduce((s, i) => s + i.price * i.qty, 0)
                const threshold  = 200
                const pct        = Math.min((subtotal / threshold) * 100, 100)
                const remaining  = threshold - subtotal
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      marginTop: '28px', padding: '20px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', marginBottom: '10px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--accent)' }}><TruckIcon /></span>
                        <span style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '11px', color: 'var(--text-muted)',
                          letterSpacing: '0.06em',
                        }}>
                          {pct >= 100
                            ? '🎉 You qualify for free shipping!'
                            : `$${remaining} away from free shipping`}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '14px', color: 'var(--accent)',
                      }}>
                        {Math.round(pct)}%
                      </span>
                    </div>
                    <div style={{
                      height: '3px', background: 'var(--border)',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ height: '100%', background: 'var(--accent)' }}
                      />
                    </div>
                  </motion.div>
                )
              })()}
            </div>

            {/* Right — summary */}
            <OrderSummary items={items} />
          </div>
        )}
      </div>

      {/* Complete the look */}
      <CompleteTheLook />
    </div>
  )
}
