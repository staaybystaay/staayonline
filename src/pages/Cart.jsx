import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 3.5h10M5.5 3.5V2.5h3v1M3.5 3.5l.7 8h5.6l.7-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MinusIcon = () => (
  <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
    <path d="M1 1h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.5 1.5h4l5.5 5.5-4 4L1.5 5.5v-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="4" cy="4" r="0.8" fill="currentColor" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 1.5L2 3.5v3.5c0 2.5 2 4.5 4.5 5 2.5-.5 4.5-2.5 4.5-5V3.5L6.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M4.5 6.5l1.5 1.5 2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const TruckIcon = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
    <path d="M1 2h9v7H1zM10 4.5h2.5L14 7v2h-4V4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="3.5" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="11" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
  </svg>
)

const GiftIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1.5" y="4.5" width="10" height="7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M1.5 4.5h10v2h-10z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6.5 4.5V11.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6.5 4.5C6.5 3 4.5 2 4 3s1 2 2.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M6.5 4.5C6.5 3 8.5 2 9 3s-1 2-2.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

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
      {/* Big ghost icon */}
      <div style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: '100px', lineHeight: 1,
        color: 'rgba(244,240,232,0.04)',
        letterSpacing: '-0.04em', userSelect: 'none',
      }}>
        ∅
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: '22px', color: '#f4f0e8',
          letterSpacing: '-0.02em', marginBottom: '10px',
        }}>
          YOUR BAG IS EMPTY
        </h2>
        <p style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic', fontSize: '16px',
          color: 'rgba(244,240,232,0.35)', lineHeight: 1.6,
        }}>
          Looks like you haven't added anything yet.
        </p>
      </div>

      <Link
        to="/shop"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: '#c8a44a', color: '#050505',
          padding: '14px 40px',
          fontFamily: "'Outfit', sans-serif", fontSize: '11px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          fontWeight: 500, textDecoration: 'none',
          marginTop: '8px', transition: 'background 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f4f0e8' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#c8a44a' }}
      >
        Start Shopping
        <ArrowIcon />
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// CART ITEM ROW (StockX-style data row)
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
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr auto',
        gap: '24px', alignItems: 'center',
        padding: '20px 0',
        borderBottom: '1px solid rgba(244,240,232,0.06)',
        transition: 'background 0.2s',
        background: hovered ? 'rgba(244,240,232,0.015)' : 'transparent',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100px', height: '120px',
        background: '#111', position: 'relative', overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg,
            #${['1a1200','0e1a0e','1a0e1a','0e0e1a'][item.id % 4]}
            0%, #111 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontSize: '8px',
            letterSpacing: '0.25em', color: 'rgba(244,240,232,0.1)',
            textTransform: 'uppercase',
          }}>
            {item.category}
          </span>
        </div>
        <img
          src={item.image} alt={item.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: '9px',
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'rgba(244,240,232,0.28)', fontWeight: 300,
        }}>
          {item.category}
        </span>
        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '15px', color: '#f4f0e8',
          letterSpacing: '-0.01em', lineHeight: 1.3,
        }}>
          {item.name}
        </h3>

        {/* Size / Color tags — StockX style */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          {['Size M', 'Black'].map(tag => (
            <span key={tag} style={{
              padding: '3px 10px',
              border: '1px solid rgba(244,240,232,0.1)',
              fontFamily: "'Outfit', sans-serif", fontSize: '9px',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(244,240,232,0.35)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Qty controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '8px', width: 'fit-content' }}>
          <button
            onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeItem(item.id)}
            style={{
              width: '32px', height: '32px',
              background: 'transparent',
              border: '1px solid rgba(244,240,232,0.12)',
              color: 'rgba(244,240,232,0.5)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8a44a'; e.currentTarget.style.color = '#c8a44a' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,240,232,0.12)'; e.currentTarget.style.color = 'rgba(244,240,232,0.5)' }}
          >
            <MinusIcon />
          </button>

          <span style={{
            width: '40px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '13px', color: '#f4f0e8',
            border: '1px solid rgba(244,240,232,0.08)',
            borderLeft: 'none', borderRight: 'none',
          }}>
            {item.qty}
          </span>

          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            style={{
              width: '32px', height: '32px',
              background: 'transparent',
              border: '1px solid rgba(244,240,232,0.12)',
              color: 'rgba(244,240,232,0.5)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8a44a'; e.currentTarget.style.color = '#c8a44a' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,240,232,0.12)'; e.currentTarget.style.color = 'rgba(244,240,232,0.5)' }}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Price + Remove */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', gap: '12px',
      }}>
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: '22px', color: '#c8a44a',
          letterSpacing: '-0.01em',
        }}>
          ${(item.price * item.qty).toLocaleString()}
        </span>

        {item.qty > 1 && (
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontSize: '10px',
            color: 'rgba(244,240,232,0.25)', letterSpacing: '0.1em',
          }}>
            ${item.price} each
          </span>
        )}

        <button
          onClick={() => removeItem(item.id)}
          style={{
            background: 'transparent', border: 'none',
            color: 'rgba(244,240,232,0.25)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '5px',
            fontFamily: "'Outfit', sans-serif", fontSize: '10px',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            transition: 'color 0.2s', padding: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#c0392b' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(244,240,232,0.25)' }}
        >
          <TrashIcon />
          Remove
        </button>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// ORDER SUMMARY (StockX / Nike checkout style)
// ─────────────────────────────────────────────
function OrderSummary({ items }) {
  const [promoCode,    setPromoCode]    = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState(false)

  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount  = promoApplied ? subtotal * 0.1 : 0
  const shipping  = subtotal >= 200 ? 0 : 15
  const total     = subtotal - discount + shipping

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'STAY10') {
      setPromoApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
      setPromoApplied(false)
    }
  }

  const rows = [
    { label: 'Subtotal',                   value: `$${subtotal.toLocaleString()}`,          muted: false },
    ...(promoApplied ? [{ label: 'Promo (STAY10)',  value: `-$${discount.toFixed(0)}`, muted: false, gold: true }] : []),
    { label: `Shipping${shipping === 0 ? ' (Free)' : ''}`, value: shipping === 0 ? 'FREE' : `$${shipping}`, muted: shipping === 0 },
  ]

  return (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid rgba(244,240,232,0.07)',
      padding: '32px', position: 'sticky', top: '80px',
    }}>
      {/* Header */}
      <h2 style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: '16px', color: '#f4f0e8',
        letterSpacing: '0.04em', marginBottom: '28px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(244,240,232,0.07)',
      }}>
        ORDER SUMMARY
      </h2>

      {/* Line items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '12px',
              color: 'rgba(244,240,232,0.4)', fontWeight: 300,
              letterSpacing: '0.08em',
            }}>
              {row.label}
            </span>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '13px',
              color: row.gold ? '#c8a44a' : row.muted ? '#4caf50' : '#f4f0e8',
              fontWeight: 500,
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
              transform: 'translateY(-50%)',
              color: 'rgba(244,240,232,0.25)',
            }}>
              <TagIcon />
            </span>
            <input
              value={promoCode}
              onChange={e => { setPromoCode(e.target.value); setPromoError(false) }}
              placeholder="Promo code"
              style={{
                width: '100%', background: '#111',
                border: `1px solid ${promoError ? 'rgba(192,57,43,0.5)' : promoApplied ? 'rgba(200,164,74,0.4)' : 'rgba(244,240,232,0.1)'}`,
                borderRight: 'none',
                padding: '11px 12px 11px 32px',
                fontFamily: "'Outfit', sans-serif", fontSize: '12px',
                color: '#f4f0e8', outline: 'none',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                transition: 'border-color 0.2s',
              }}
            />
          </div>
          <button
            onClick={applyPromo}
            style={{
              padding: '0 18px', background: 'rgba(200,164,74,0.12)',
              border: '1px solid rgba(200,164,74,0.25)',
              color: '#c8a44a', cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '10px',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              fontWeight: 500, transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c8a44a'; e.currentTarget.style.color = '#050505' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,164,74,0.12)'; e.currentTarget.style.color = '#c8a44a' }}
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
                fontFamily: "'Outfit', sans-serif", fontSize: '10px',
                color: '#4caf50', marginTop: '6px', letterSpacing: '0.1em',
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
                fontFamily: "'Outfit', sans-serif", fontSize: '10px',
                color: '#c0392b', marginTop: '6px', letterSpacing: '0.1em',
              }}
            >
              ✗ Invalid code. Try STAY10
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(244,240,232,0.07)', margin: '0 0 20px' }} />

      {/* Total */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: '28px',
      }}>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: '14px', color: '#f4f0e8',
          letterSpacing: '0.08em',
        }}>
          TOTAL
        </span>
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: '28px', color: '#c8a44a',
        }}>
          ${total.toLocaleString()}
        </span>
      </div>

      {/* Checkout CTA — Nike boldness */}
      <button
        style={{
          width: '100%', background: '#c8a44a', color: '#050505',
          border: 'none', padding: '16px',
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: '13px', letterSpacing: '0.12em',
          textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '10px', transition: 'background 0.25s',
          marginBottom: '12px',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f4f0e8' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#c8a44a' }}
      >
        Checkout Now
        <ArrowIcon />
      </button>

      <Link
        to="/shop"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', width: '100%', padding: '13px',
          border: '1px solid rgba(244,240,232,0.1)',
          fontFamily: "'Outfit', sans-serif", fontSize: '11px',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(244,240,232,0.4)', textDecoration: 'none',
          transition: 'all 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(244,240,232,0.25)'; e.currentTarget.style.color = '#f4f0e8' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,240,232,0.1)'; e.currentTarget.style.color = 'rgba(244,240,232,0.4)' }}
      >
        Continue Shopping
      </Link>

      {/* Trust signals — Nike / Adidas style */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '10px',
        marginTop: '24px', paddingTop: '20px',
        borderTop: '1px solid rgba(244,240,232,0.06)',
      }}>
        {[
          { Icon: ShieldIcon, text: 'Secure checkout — SSL encrypted' },
          { Icon: TruckIcon,  text: 'Free shipping on orders over $200' },
          { Icon: GiftIcon,   text: 'Free returns within 30 days'      },
        ].map(({ Icon, text }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'rgba(200,164,74,0.5)', flexShrink: 0 }}><Icon /></span>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '10px',
              color: 'rgba(244,240,232,0.25)', fontWeight: 300,
              letterSpacing: '0.06em',
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
// RECENTLY VIEWED (Adidas bottom section)
// ─────────────────────────────────────────────
const suggested = [
  { id: 9,  name: 'Phantom Bomber',    price: 360, category: 'Jackets' },
  { id: 10, name: 'Steel Cargo Pants', price: 210, category: 'Bottoms' },
  { id: 11, name: 'Arc Zip Hoodie',    price: 175, category: 'Tops'    },
  { id: 12, name: 'Monolith Coat',     price: 640, category: 'Coats'   },
]

function SuggestedProducts() {
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{
      borderTop: '1px solid rgba(244,240,232,0.06)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 80px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: '40px',
        }}>
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '10px',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#c8a44a', marginBottom: '10px', fontWeight: 300,
            }}>
              You might also like
            </p>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(28px, 3vw, 40px)', color: '#f4f0e8',
              letterSpacing: '-0.02em', lineHeight: 1,
            }}>
              COMPLETE THE LOOK
            </h2>
          </div>
          <Link
            to="/shop"
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '11px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(244,240,232,0.35)', textDecoration: 'none',
              borderBottom: '1px solid rgba(244,240,232,0.12)',
              paddingBottom: '3px', transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = '#c8a44a'; e.target.style.borderBottomColor = '#c8a44a' }}
            onMouseLeave={e => { e.target.style.color = 'rgba(244,240,232,0.35)'; e.target.style.borderBottomColor = 'rgba(244,240,232,0.12)' }}
          >
            View All →
          </Link>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {suggested.map((product, i) => {
            const [hovered, setHovered] = useState(false)
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  background: '#0e0e0e',
                  border: `1px solid ${hovered ? 'rgba(200,164,74,0.2)' : 'rgba(244,240,232,0.06)'}`,
                  overflow: 'hidden', cursor: 'pointer',
                  transition: 'border-color 0.3s, transform 0.35s',
                  transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Image */}
                <div style={{ aspectRatio: '3/4', position: 'relative', background: '#1a1a1a', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg,
                      #${['0d1a0d','1a0d1a','1a1a0d','0d0d1a'][i % 4]}
                      0%, #111 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: "'Syne', sans-serif", fontSize: '8px',
                      letterSpacing: '0.3em', color: 'rgba(244,240,232,0.07)',
                      textTransform: 'uppercase',
                    }}>
                      {product.category}
                    </span>
                  </div>

                  {/* Quick add */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 55%)',
                    opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
                    display: 'flex', alignItems: 'flex-end', padding: '14px',
                  }}>
                    <button
                      onClick={() => addItem({ ...product, image: '' })}
                      style={{
                        width: '100%', background: '#c8a44a', color: '#050505',
                        border: 'none', padding: '10px',
                        fontFamily: "'Outfit', sans-serif", fontSize: '9px',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 14px' }}>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: '9px',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(244,240,232,0.25)', marginBottom: '4px',
                  }}>
                    {product.category}
                  </p>
                  <h4 style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: '12px', color: '#f4f0e8', marginBottom: '6px',
                  }}>
                    {product.name}
                  </h4>
                  <span style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: '16px', color: '#c8a44a',
                  }}>
                    ${product.price}
                  </span>
                </div>
              </motion.div>
            )
          })}
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
    <div style={{ background: '#050505', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(244,240,232,0.05)',
        padding: '48px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ghost text */}
        <div style={{
          position: 'absolute', right: '-10px', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: '140px', lineHeight: 1,
          color: 'rgba(200,164,74,0.04)',
          letterSpacing: '-0.04em', userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          BAG
        </div>

        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            {['Home', '/', 'Bag'].map((c, i) => (
              <span key={i} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '10px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: i === 2 ? '#c8a44a' : 'rgba(244,240,232,0.25)',
              }}>
                {c}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(40px, 5.5vw, 70px)',
                color: '#f4f0e8', lineHeight: 0.95,
                letterSpacing: '-0.03em', margin: 0,
              }}
            >
              YOUR<br />
              <span style={{ color: '#c8a44a' }}>BAG</span>
            </motion.h1>

            {items.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '12px',
                  color: 'rgba(244,240,232,0.3)',
                }}>
                  {totalQty} {totalQty === 1 ? 'item' : 'items'}
                </span>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'transparent', border: '1px solid rgba(192,57,43,0.3)',
                    color: 'rgba(192,57,43,0.6)', padding: '8px 18px',
                    fontFamily: "'Outfit', sans-serif", fontSize: '10px',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c0392b'; e.currentTarget.style.color = '#c0392b' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(192,57,43,0.3)'; e.currentTarget.style.color = 'rgba(192,57,43,0.6)' }}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '48px 80px' }}>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'flex-start' }}>

            {/* Left — items list */}
            <div>
              {/* Column headers — StockX data table style */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '24px',
                padding: '0 0 12px',
                borderBottom: '1px solid rgba(244,240,232,0.08)',
                marginBottom: '4px',
              }}>
                {['Product', '', 'Total'].map((label, i) => (
                  <span key={i} style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: '9px',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'rgba(244,240,232,0.2)', fontWeight: 300,
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
                const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
                const threshold = 200
                const pct = Math.min((subtotal / threshold) * 100, 100)
                const remaining = threshold - subtotal
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      marginTop: '28px', padding: '20px',
                      background: '#0a0a0a',
                      border: '1px solid rgba(244,240,232,0.07)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#c8a44a' }}><TruckIcon /></span>
                        <span style={{
                          fontFamily: "'Outfit', sans-serif", fontSize: '11px',
                          color: 'rgba(244,240,232,0.5)', letterSpacing: '0.08em',
                        }}>
                          {pct >= 100
                            ? '🎉 You qualify for free shipping!'
                            : `$${remaining} away from free shipping`}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 700,
                        fontSize: '12px', color: '#c8a44a',
                      }}>
                        {Math.round(pct)}%
                      </span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(244,240,232,0.08)', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ height: '100%', background: '#c8a44a' }}
                      />
                    </div>
                  </motion.div>
                )
              })()}
            </div>

            {/* Right — order summary */}
            <OrderSummary items={items} />
          </div>
        )}
      </div>

      {/* Suggested products */}
      <SuggestedProducts />
    </div>
  )
}