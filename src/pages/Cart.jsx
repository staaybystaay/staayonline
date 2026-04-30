import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// SUGGESTED PRODUCTS
// ─────────────────────────────────────────────
const suggested = [
  { id: 9,  name: 'PHANTOM BOMBER',  price: 360, category: 'Jackets', image: '/phantom.jpg' },
  { id: 10, name: 'STEEL CARGO',     price: 210, category: 'Bottoms', image: '/steelbaggy.jpg' },
  { id: 11, name: 'ARC ZIP HOODIE',  price: 175, category: 'Tops',    image: '/archoodie.jpg' },
  { id: 12, name: 'MONOLITH COAT',   price: 640, category: 'Coats',   image: '/coat.jpg' },
]

// ─────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        borderTop: '2px solid var(--text)',
        padding: '120px 0',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '20px',
        textAlign: 'center',
      }}>
      <p style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(80px, 12vw, 160px)',
        color: 'var(--text-faint)',
        letterSpacing: '0.02em', lineHeight: 1,
        userSelect: 'none',
      }}>
        EMPTY
      </p>
      <p style={{
        fontFamily: "'Fraunces', serif",
        fontStyle: 'italic', fontWeight: 300,
        fontSize: '16px', color: 'var(--text-muted)',
        lineHeight: 1.6,
      }}>
        Your bag is empty. Time to change that.
      </p>
      <Link
        to="/shop"
        style={{
          background: 'var(--text)', color: 'var(--bg)',
          padding: '14px 48px', marginTop: '8px',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px', letterSpacing: '0.1em',
          display: 'inline-block', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
        Shop Now
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// CART ITEM
// ─────────────────────────────────────────────
function CartItem({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const { updateQty, removeItem } = useCartStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '88px 1fr auto',
        gap: '0',
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--bg-surface)' : 'transparent',
        transition: 'background 0.2s',
      }}>

      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        width: '88px', aspectRatio: '3/4',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '8px', letterSpacing: '0.2em',
            color: 'var(--text-faint)',
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
      <div style={{
        padding: '20px 24px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid var(--border)',
      }}>
        <div>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', letterSpacing: '0.24em',
            textTransform: 'uppercase', color: 'var(--text-faint)',
            marginBottom: '4px', fontWeight: 300,
          }}>
            {item.category}
          </p>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '20px', color: 'var(--text)',
            letterSpacing: '0.04em', lineHeight: 1.1,
            marginBottom: '10px',
          }}>
            {item.name}
          </h3>
          {/* Size / color tags */}
          <div style={{ display: 'flex', gap: '0' }}>
            {['Size M', 'Black'].map((tag, i) => (
              <span key={tag} style={{
                padding: '4px 10px',
                border: '1px solid var(--border)',
                borderLeft: i > 0 ? 'none' : '1px solid var(--border)',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--text-faint)',
                fontWeight: 300,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Qty stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '16px' }}>
          <button
            onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeItem(item.id)}
            style={{
              width: '32px', height: '32px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Outfit', sans-serif", fontSize: '16px',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--text)'; e.currentTarget.style.color = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
            −
          </button>
          <span style={{
            width: '40px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '16px', color: 'var(--text)',
            border: '1px solid var(--border)',
            borderLeft: 'none', borderRight: 'none',
            letterSpacing: '0.04em',
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
              fontFamily: "'Outfit', sans-serif", fontSize: '16px',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--text)'; e.currentTarget.style.color = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
            +
          </button>
          <button
            onClick={() => removeItem(item.id)}
            style={{
              marginLeft: '12px',
              background: 'transparent', border: 'none',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--text-faint)',
              cursor: 'pointer', transition: 'color 0.2s',
              padding: '0',
              textDecoration: 'underline', textUnderlineOffset: '3px',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e63946' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}>
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div style={{
        padding: '20px 24px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', justifyContent: 'space-between',
        minWidth: '120px',
      }}>
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic', fontSize: '24px',
          color: 'var(--accent)',
        }}>
          ${(item.price * item.qty).toLocaleString()}
        </span>
        {item.qty > 1 && (
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', color: 'var(--text-faint)',
            letterSpacing: '0.08em',
          }}>
            ${item.price} each
          </span>
        )}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// ORDER SUMMARY
// ─────────────────────────────────────────────
function OrderSummary({ items }) {
  const [promo,        setPromo]        = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState(false)
  const [focused,      setFocused]      = useState(false)

  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount  = promoApplied ? subtotal * 0.1 : 0
  const shipping  = subtotal >= 200 ? 0 : 15
  const total     = subtotal - discount + shipping
  const pctToFree = Math.min((subtotal / 200) * 100, 100)
  const remaining = 200 - subtotal

  function applyPromo() {
    if (promo.toUpperCase() === 'STAAY10') {
      setPromoApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
      setPromoApplied(false)
    }
  }

  return (
    <div style={{ position: 'sticky', top: '80px' }}>

      {/* Gold top accent */}
      <div style={{ height: '3px', background: 'var(--accent)' }} />

      <div style={{
        border: '1px solid var(--border)',
        borderTop: 'none',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '2px solid var(--text)',
        }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '20px', color: 'var(--text)',
            letterSpacing: '0.1em', margin: 0,
          }}>
            ORDER SUMMARY
          </h2>
        </div>

        <div style={{ padding: '24px' }}>

          {/* Free shipping progress */}
          <div style={{
            marginBottom: '24px',
            padding: '14px 16px',
            border: '1px solid var(--border)',
            background: 'var(--bg-surface)',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
                fontWeight: 300,
              }}>
                {pctToFree >= 100 ? 'Free shipping unlocked' : `$${remaining} to free shipping`}
              </span>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '13px', color: 'var(--accent)',
              }}>
                {Math.round(pctToFree)}%
              </span>
            </div>
            <div style={{ height: '3px', background: 'var(--border)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pctToFree}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--accent)' }}
              />
            </div>
          </div>

          {/* Line items */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: '0', marginBottom: '20px',
          }}>
            {[
              { label: 'Subtotal',                             value: `$${subtotal.toLocaleString()}`, special: false },
              ...(promoApplied ? [{ label: 'Promo — STAAY10', value: `-$${discount.toFixed(0)}`,      special: 'gold' }] : []),
              { label: `Shipping${shipping === 0 ? ' — Free' : ''}`, value: shipping === 0 ? 'FREE' : `$${shipping}`, special: shipping === 0 ? 'green' : false },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '11px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', fontWeight: 300,
                }}>
                  {row.label}
                </span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px', fontWeight: 500,
                  color: row.special === 'gold' ? 'var(--accent)'
                       : row.special === 'green' ? '#2a7a2a'
                       : 'var(--text)',
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '0' }}>
              <input
                value={promo}
                onChange={e => { setPromo(e.target.value); setPromoError(false) }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={e => { if (e.key === 'Enter') applyPromo() }}
                placeholder="Promo code"
                style={{
                  flex: 1,
                  background: 'var(--bg)',
                  border: `1px solid ${promoError ? '#e63946' : promoApplied ? 'var(--accent)' : focused ? 'var(--text)' : 'var(--border)'}`,
                  borderRight: 'none',
                  padding: '11px 14px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--text)',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
              />
              <button
                onClick={applyPromo}
                style={{
                  padding: '0 16px',
                  background: promoApplied ? 'var(--accent)' : 'var(--text)',
                  color: promoApplied ? '#0C0B09' : 'var(--bg)',
                  border: 'none', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.18em',
                  textTransform: 'uppercase', fontWeight: 600,
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
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
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', color: '#e63946',
                    marginTop: '6px', letterSpacing: '0.1em',
                  }}>
                  Invalid code. Try STAAY10
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Total */}
          <div style={{
            display: 'flex', alignItems: 'baseline',
            justifyContent: 'space-between',
            borderTop: '2px solid var(--text)',
            paddingTop: '16px', marginBottom: '20px',
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '18px', color: 'var(--text)',
              letterSpacing: '0.1em',
            }}>
              TOTAL
            </span>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontSize: '32px',
              color: 'var(--accent)',
            }}>
              ${total.toLocaleString()}
            </span>
          </div>

          {/* Checkout CTA */}
          <button
            style={{
              width: '100%', padding: '16px',
              background: 'var(--text)', color: 'var(--bg)',
              border: 'none', cursor: 'pointer',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '18px', letterSpacing: '0.14em',
              transition: 'opacity 0.2s', marginBottom: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '10px',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            CHECKOUT NOW →
          </button>

          <Link
            to="/shop"
            style={{
              display: 'block', textAlign: 'center',
              padding: '13px',
              border: '1px solid var(--border)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--text)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}>
            Continue Shopping
          </Link>

          {/* Trust */}
          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            {[
              'SSL encrypted checkout',
              'Free returns within 30 days',
              'Free shipping over $200',
            ].map(text => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'block', width: '4px', height: '4px',
                  borderRadius: '50%', background: 'var(--accent)', flexShrink: 0,
                }} />
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
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// COMPLETE THE LOOK
// ─────────────────────────────────────────────
function CompleteTheLook() {
  const [hovered, setHovered] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: '72px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        {/* Header */}
        <div style={{
          borderTop: '2px solid var(--text)',
          paddingTop: '32px', marginBottom: '40px',
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: 'var(--text)', lineHeight: 0.9,
            letterSpacing: '0.01em',
          }}>
            COMPLETE<br />
            <span style={{ color: 'var(--accent)' }}>THE LOOK</span>
          </h2>
          <Link
            to="/shop"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border)', paddingBottom: '3px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderBottomColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderBottomColor = 'var(--border)' }}>
            View All
          </Link>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0',
        }}>
          {suggested.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderTop: '2px solid var(--text)',
                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                padding: '0 16px',
                cursor: 'pointer',
              }}>
              <div style={{
                position: 'relative', aspectRatio: '3/4',
                background: 'var(--bg-surface)', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '10px', letterSpacing: '0.3em',
                    color: 'var(--text-faint)',
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
                    transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                    transform: hovered === product.id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                {/* Slide-up add button */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'var(--text)',
                  transform: hovered === product.id ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}>
                  <button
                    onClick={() => addItem({ ...product, badge: null })}
                    style={{
                      width: '100%', padding: '11px',
                      background: 'transparent', border: 'none',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '9px', fontWeight: 600,
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: 'var(--bg)', cursor: 'pointer',
                    }}>
                    Quick Add
                  </button>
                </div>
              </div>

              <div style={{ padding: '10px 0 20px' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--text-faint)',
                  marginBottom: '3px', fontWeight: 300,
                }}>
                  {product.category}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <h4 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '17px', color: 'var(--text)',
                    letterSpacing: '0.04em',
                  }}>
                    {product.name}
                  </h4>
                  <span style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: 'italic', fontSize: '16px',
                    color: 'var(--accent)',
                  }}>
                    ${product.price}
                  </span>
                </div>
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

      {/* ── PAGE HEADER ── */}
      <div style={{
        borderBottom: '2px solid var(--text)',
        padding: '0 80px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{
            borderBottom: '1px solid var(--border)',
            padding: '14px 0',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Link to="/" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 300,
            }}>
              Home
            </Link>
            <span style={{ color: 'var(--text-faint)', fontSize: '10px' }}>/</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--accent)',
            }}>
              Bag
            </span>
          </div>

          {/* Heading row */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '36px 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(52px, 8vw, 100px)',
                  color: 'var(--text)', lineHeight: 0.9,
                  letterSpacing: '0.01em', margin: 0,
                }}>
                YOUR<br />
                <span style={{ color: 'var(--accent)' }}>BAG</span>
              </motion.h1>

              {/* Item count badge */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0',
                    marginBottom: '8px',
                  }}>
                  <div style={{
                    padding: '8px 14px',
                    border: '1px solid var(--border)',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '20px', color: 'var(--text)',
                    letterSpacing: '0.06em',
                  }}>
                    {totalQty}
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    border: '1px solid var(--border)',
                    borderLeft: 'none',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: 'var(--text-faint)',
                    fontWeight: 300,
                  }}>
                    {totalQty === 1 ? 'Item' : 'Items'}
                  </div>
                </motion.div>
              )}
            </div>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'transparent', border: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--text-faint)',
                  cursor: 'pointer', transition: 'color 0.2s', padding: 0,
                  textDecoration: 'underline', textUnderlineOffset: '3px',
                  marginBottom: '8px',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#e63946' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}>
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px 80px' }}>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: '0', alignItems: 'flex-start',
          }}>

            {/* Left — items */}
            <div style={{ borderRight: '1px solid var(--border)', paddingRight: '48px', paddingTop: '32px' }}>

              {/* Column headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr auto',
                gap: '0',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '10px', marginBottom: '0',
              }}>
                {['Product', '', 'Total'].map((label, i) => (
                  <span key={i} style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: 'var(--text-faint)',
                    fontWeight: 300,
                    textAlign: i === 2 ? 'right' : 'left',
                    paddingLeft: i === 1 ? '24px' : 0,
                    paddingRight: i === 2 ? '24px' : 0,
                  }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Items list */}
              <AnimatePresence>
                {items.map((item, i) => (
                  <CartItem key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>

            </div>

            {/* Right — order summary */}
            <div style={{ paddingLeft: '48px', paddingTop: '32px' }}>
              <OrderSummary items={items} />
            </div>

          </div>
        )}
      </div>

      {/* ── COMPLETE THE LOOK ── */}
      <CompleteTheLook />

    </div>
  )
}
