import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
function PlusIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="11" height="3" viewBox="0 0 11 3" fill="none">
      <path d="M1 1.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? 'var(--accent)' : 'none'}>
      <path d="M8 13.5S2 9.8 2 5.8A3.3 3.3 0 0 1 8 4a3.3 3.3 0 0 1 6 2c0 4-6 7.5-6 7.5z"
        stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="3" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M10.5 3.8L4.5 6.8M4.5 8.2l6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
      style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
      <path d="M2 4.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// ─────────────────────────────────────────────
// ACCORDION
// ─────────────────────────────────────────────
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 0', cursor: 'pointer',
        }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text)',
          fontWeight: 500,
        }}>
          {title}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>
          <ChevronIcon open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: '20px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────
// RELATED CARD
// ─────────────────────────────────────────────
function RelatedCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '2px solid var(--text)',
        cursor: 'pointer',
      }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
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
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
          {product.badge && (
            <span style={{
              position: 'absolute', top: 0, left: 0,
              background: product.badge === 'Sale' ? '#e63946' : 'var(--accent)',
              color: product.badge === 'Sale' ? '#fff' : '#0C0B09',
              padding: '5px 10px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              {product.badge}
            </span>
          )}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'var(--text)',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product) }}
              style={{
                width: '100%', padding: '12px',
                background: 'transparent', border: 'none',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--bg)', cursor: 'pointer',
              }}>
              Add to Bag
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
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────
// PRODUCT PAGE
// ─────────────────────────────────────────────
export default function Product() {
  const { id }   = useParams()
  const product  = products.find(p => p.id === Number(id))
  const addItem  = useCartStore(s => s.addItem)

  const [activeImage,   setActiveImage]   = useState(0)
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty,           setQty]           = useState(1)
  const [wishlisted,    setWishlisted]    = useState(false)
  const [addedToBag,    setAddedToBag]    = useState(false)
  const [sizeError,     setSizeError]     = useState(false)

  if (!product) {
    return (
      <div style={{
        background: 'var(--bg)', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '24px',
      }}>
        <p style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '80px', color: 'var(--text-faint)',
          letterSpacing: '0.06em',
        }}>
          404
        </p>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>
          Product not found
        </p>
        <Link
          to="/shop"
          style={{
            background: 'var(--text)', color: 'var(--bg)',
            padding: '14px 36px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '16px', letterSpacing: '0.1em',
          }}>
          Back to Shop
        </Link>
      </div>
    )
  }

  function handleAddToBag() {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    addItem({ ...product, qty })
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2500)
  }

  const images = product.images || [product.image, product.image, product.image]
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── BREADCRUMB BAR ── */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '14px 80px',
        background: 'var(--bg-surface)',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {[
            { label: 'Home',           to: '/'     },
            { label: '/',              to: null    },
            { label: 'Shop',           to: '/shop' },
            { label: '/',              to: null    },
            { label: product.category, to: '/shop' },
            { label: '/',              to: null    },
            { label: product.name,     to: null    },
          ].map((c, i) => c.to ? (
            <Link key={i} to={c.to} style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--text-faint)',
              fontWeight: 300, transition: 'color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)' }}>
              {c.label}
            </Link>
          ) : (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px',
              color: i === 6 ? 'var(--accent)' : 'var(--text-faint)',
              letterSpacing: i === 6 ? '0.1em' : '0',
              fontWeight: i === 6 ? 400 : 300,
              textTransform: i === 6 ? 'uppercase' : 'none',
              maxWidth: i === 6 ? '200px' : 'auto',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {c.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN PRODUCT LAYOUT ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--border)',
        }}>

          {/* ── LEFT — Image gallery ── */}
          <div style={{
            borderRight: '1px solid var(--border)',
            position: 'sticky', top: '64px',
            alignSelf: 'flex-start',
          }}>
            {/* Main image */}
            <div style={{
              position: 'relative',
              aspectRatio: '4/5',
              background: 'var(--bg-surface)',
              overflow: 'hidden',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '14px', letterSpacing: '0.3em',
                  color: 'var(--text-faint)',
                }}>
                  {product.category}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage] || product.image}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={e => { e.target.style.display = 'none' }}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                  }}
                />
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <span style={{
                  position: 'absolute', top: 0, left: 0,
                  background: product.badge === 'Sale' ? '#e63946' : 'var(--accent)',
                  color: product.badge === 'Sale' ? '#fff' : '#0C0B09',
                  padding: '7px 14px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                }}>
                  {product.badge}
                </span>
              )}

              {/* Gold bottom stripe */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '3px', background: 'var(--accent)',
              }} />
            </div>

            {/* Thumbnails row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {images.slice(0, 3).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    position: 'relative', aspectRatio: '1/1',
                    background: 'var(--bg-surface)',
                    border: 'none', padding: 0, cursor: 'pointer',
                    borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                    borderTop: '1px solid var(--border)',
                    borderBottom: activeImage === i ? '3px solid var(--accent)' : '3px solid transparent',
                    transition: 'border-bottom-color 0.2s',
                    overflow: 'hidden',
                  }}>
                  <img
                    src={img} alt={`View ${i + 1}`}
                    onError={e => { e.target.style.display = 'none' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Active overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'var(--accent)',
                    opacity: activeImage === i ? 0.1 : 0,
                    transition: 'opacity 0.2s',
                  }} />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Product info ── */}
          <div style={{ padding: '48px 0 48px 56px' }}>

            {/* Category + SKU */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '20px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.32em',
                textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 400,
              }}>
                {product.category}
              </span>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.16em',
                color: 'var(--text-faint)', fontWeight: 300,
              }}>
                {product.sku || 'SOL-001'}
              </span>
            </div>

            {/* 2px top border — editorial */}
            <div style={{ height: '2px', background: 'var(--text)', marginBottom: '20px' }} />

            {/* Name */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: 'var(--text)', lineHeight: 0.9,
              letterSpacing: '0.01em', margin: '0 0 20px',
            }}>
              {product.name}
            </h1>

            {/* Price row */}
            <div style={{
              display: 'flex', alignItems: 'baseline',
              gap: '14px', marginBottom: '24px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontSize: '40px',
                color: 'var(--accent)', lineHeight: 1,
              }}>
                ${product.price}
              </span>
              {product.badge === 'Sale' && (
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '14px', color: 'var(--text-faint)',
                  textDecoration: 'line-through',
                }}>
                  ${Math.round(product.price * 1.3)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '15px', lineHeight: 1.75,
              color: 'var(--text-muted)',
              marginBottom: '32px',
              paddingBottom: '32px',
              borderBottom: '1px solid var(--border)',
            }}>
              {product.description || 'A statement piece built to outlast trends and defined by precision.'}
            </p>

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '12px',
                }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: 'var(--text-muted)',
                    fontWeight: 400,
                  }}>
                    Colour
                  </span>
                  {selectedColor && (
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '11px', color: 'var(--accent)',
                      letterSpacing: '0.1em',
                    }}>
                      {selectedColor}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
                  {product.colors.map(color => {
                    const active = selectedColor === color
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                          padding: '10px 18px',
                          background: active ? 'var(--text)' : 'transparent',
                          border: '1px solid var(--border)',
                          borderLeft: 'none',
                          color: active ? 'var(--bg)' : 'var(--text-muted)',
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '11px', letterSpacing: '0.1em',
                          cursor: 'pointer', transition: 'all 0.18s',
                          marginLeft: '0',
                        }}
                        style={{
                          padding: '10px 18px',
                          background: active ? 'var(--text)' : 'transparent',
                          border: `1px solid ${active ? 'var(--text)' : 'var(--border)'}`,
                          color: active ? 'var(--bg)' : 'var(--text-muted)',
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '11px', letterSpacing: '0.1em',
                          cursor: 'pointer', transition: 'all 0.18s',
                          marginRight: '6px', marginBottom: '6px',
                        }}>
                        {color}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '12px',
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: sizeError ? '#e63946' : 'var(--text-muted)',
                  fontWeight: 400, transition: 'color 0.2s',
                }}>
                  {sizeError ? 'Select a size to continue' : 'Size'}
                </span>
                <button style={{
                  background: 'transparent', border: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}>
                  Size Guide
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0' }}>
                {(product.sizes || ['XS','S','M','L','XL','XXL']).map((size, i, arr) => {
                  const active = selectedSize === size
                  return (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      style={{
                        aspectRatio: '1/1',
                        background: active ? 'var(--text)' : 'transparent',
                        border: `1px solid ${sizeError ? '#e63946' : active ? 'var(--text)' : 'var(--border)'}`,
                        borderLeft: i > 0 ? 'none' : `1px solid ${sizeError ? '#e63946' : active ? 'var(--text)' : 'var(--border)'}`,
                        color: active ? 'var(--bg)' : 'var(--text-muted)',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '11px', fontWeight: active ? 600 : 300,
                        letterSpacing: '0.06em',
                        cursor: 'pointer', transition: 'all 0.18s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          e.currentTarget.style.background = 'var(--bg-surface)'
                          e.currentTarget.style.color = 'var(--text)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = 'var(--text-muted)'
                        }
                      }}>
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Qty + Add to bag */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '14px' }}>

              {/* Qty stepper */}
              <div style={{
                display: 'flex', alignItems: 'stretch',
                border: '1px solid var(--border)',
                flexShrink: 0,
              }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{
                    width: '48px',
                    background: 'transparent', border: 'none',
                    borderRight: '1px solid var(--border)',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                  <MinusIcon />
                </button>
                <span style={{
                  width: '48px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '18px', color: 'var(--text)',
                  letterSpacing: '0.04em',
                }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{
                    width: '48px',
                    background: 'transparent', border: 'none',
                    borderLeft: '1px solid var(--border)',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                  <PlusIcon />
                </button>
              </div>

              {/* Add to bag */}
              <button
                onClick={handleAddToBag}
                style={{
                  flex: 1,
                  background: addedToBag ? '#2a7a2a' : 'var(--text)',
                  color: 'var(--bg)', border: 'none',
                  borderLeft: 'none',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '17px', letterSpacing: '0.1em',
                  cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px',
                }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={addedToBag ? 'added' : 'add'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}>
                    {addedToBag ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            {/* Wishlist + Share */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '36px' }}>
              <button
                onClick={() => setWishlisted(v => !v)}
                style={{
                  flex: 1, padding: '13px',
                  background: 'transparent',
                  border: `1px solid ${wishlisted ? 'var(--accent)' : 'var(--border)'}`,
                  color: wishlisted ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.18em',
                  textTransform: 'uppercase', transition: 'all 0.22s',
                }}>
                <HeartIcon filled={wishlisted} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button
                style={{
                  width: '50px', padding: '13px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderLeft: 'none',
                  color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                <ShareIcon />
              </button>
            </div>

            {/* Shipping info strip */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              marginBottom: '32px',
            }}>
              {[
                { label: 'Free shipping', sub: 'On orders over $200' },
                { label: 'Free returns',  sub: 'Within 30 days'      },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--border)',
                    borderLeft: i === 1 ? 'none' : '1px solid var(--border)',
                  }}>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.08em', color: 'var(--text)',
                    marginBottom: '2px',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', fontWeight: 300,
                    letterSpacing: '0.06em', color: 'var(--text-faint)',
                  }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <Accordion title="Product Details">
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(product.details || [
                    'Premium quality fabric',
                    'Designed in Accra, Ghana',
                    'Limited edition run',
                    'Dry clean recommended',
                  ]).map((d, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        color: 'var(--accent)', flexShrink: 0, marginTop: '2px',
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '12px', letterSpacing: '0.1em',
                      }}>
                        —
                      </span>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '13px', color: 'var(--text-muted)',
                        fontWeight: 300, lineHeight: 1.6,
                      }}>
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Size & Fit">
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px', color: 'var(--text-muted)',
                  fontWeight: 300, lineHeight: 1.7,
                }}>
                  Model is 5'10" and wears size M. This piece runs true to size. For an oversized look, size up. For a tailored fit, size down.
                </p>
              </Accordion>

              <Accordion title="Shipping & Returns">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Standard delivery: 3–5 business days',
                    'Express delivery: 1–2 business days',
                    'Free shipping on orders over $200',
                    'Free returns within 30 days of delivery',
                    'Items must be unworn, with tags attached',
                  ].map((line, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        color: 'var(--accent)', flexShrink: 0,
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '12px',
                      }}>
                        —
                      </span>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '13px', color: 'var(--text-muted)',
                        fontWeight: 300, lineHeight: 1.6,
                      }}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>

          </div>
        </div>
      </div>

      {/* ── YOU MAY ALSO LIKE ── */}
      {related.length > 0 && (
        <section style={{ padding: '72px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

            {/* Section header */}
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
                YOU MAY<br />
                <span style={{ color: 'var(--accent)' }}>ALSO LIKE</span>
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

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(related.length, 4)}, 1fr)`,
              gap: '0',
            }}>
              {related.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    borderRight: i < related.length - 1 ? '1px solid var(--border)' : 'none',
                    padding: '0 20px',
                  }}>
                  <RelatedCard product={p} />
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  )
}
