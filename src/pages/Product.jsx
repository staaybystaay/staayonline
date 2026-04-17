import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? 'var(--accent)' : 'none'}>
    <path d="M8 13.5S2 9.8 2 5.8A3.3 3.3 0 0 1 8 4a3.3 3.3 0 0 1 6 2c0 4-6 7.5-6 7.5z"
      stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)

const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="12" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="3" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M10.5 3.8L4.5 6.8M4.5 8.2l6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
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

const ChevronIcon = ({ open }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
    <path d="M2 4.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const TruckIcon = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
    <path d="M1 2h9v7H1zM10 4.5h2.5L14 7v2h-4V4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="3.5" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.1"/>
    <circle cx="11" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
)

const ReturnIcon = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
    <path d="M1 4h8a4 4 0 0 1 0 8H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M4 1L1 4l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─────────────────────────────────────────────
// ACCORDION PANEL
// ─────────────────────────────────────────────
function AccordionPanel({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '14px', color: 'var(--text)',
          letterSpacing: '0.1em',
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
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '16px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────
// RELATED PRODUCTS
// ─────────────────────────────────────────────
function RelatedProducts({ currentId, category }) {
  const related = products
    .filter(p => p.category === category && p.id !== currentId)
    .slice(0, 4)

  const addItem = useCartStore(s => s.addItem)
  const [hovered, setHovered] = useState(null)

  if (!related.length) return null

  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      padding: '72px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
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
              YOU MAY ALSO LIKE
            </h2>
          </div>
          <Link to="/shop" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => { e.target.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.target.style.color = 'var(--text-muted)' }}
          >
            View All →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {related.map((product, i) => (
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
                transition: 'all 0.3s',
                transform: hovered === product.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === product.id ? '0 12px 32px rgba(201,164,74,0.1)' : 'none',
              }}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ aspectRatio: '3/4', position: 'relative', background: 'var(--bg-surface)', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '11px', color: 'rgba(201,164,74,0.08)', letterSpacing: '0.2em',
                    }}>
                      {product.category}
                    </span>
                  </div>
                  <img
                    src={product.image} alt={product.name}
                    onError={e => { e.target.style.display = 'none' }}
                    style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%',
                      objectFit: 'cover', transition: 'transform 0.6s',
                      transform: hovered === product.id ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                  {/* Quick add */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(12,11,9,0.85) 0%, transparent 55%)',
                    opacity: hovered === product.id ? 1 : 0, transition: 'opacity 0.3s',
                    display: 'flex', alignItems: 'flex-end', padding: '14px',
                  }}>
                    <button
                      onClick={e => { e.preventDefault(); addItem(product) }}
                      style={{
                        width: '100%', background: 'var(--accent)', color: '#0C0B09',
                        border: 'none', padding: '10px',
                        fontFamily: "'Outfit', sans-serif", fontSize: '9px',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      Quick Add
                    </button>
                  </div>
                  {product.badge && (
                    <span style={{
                      position: 'absolute', top: '12px', left: '12px',
                      padding: '3px 9px', background: 'var(--accent)', color: '#0C0B09',
                      fontFamily: "'Outfit', sans-serif", fontSize: '9px',
                      letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: '9px',
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'var(--text-faint)', marginBottom: '4px', fontWeight: 300,
                  }}>
                    {product.category}
                  </p>
                  <h4 style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px',
                    color: 'var(--text)', letterSpacing: '0.04em', marginBottom: '6px',
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PRODUCT PAGE
// ─────────────────────────────────────────────
export default function Product() {
  const { id }       = useParams()
  const product      = products.find(p => p.id === Number(id))
  const addItem      = useCartStore(s => s.addItem)

  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty,           setQty]           = useState(1)
  const [activeImage,   setActiveImage]   = useState(0)
  const [wishlisted,    setWishlisted]    = useState(false)
  const [addedToBag,    setAddedToBag]    = useState(false)
  const [sizeError,     setSizeError]     = useState(false)

  if (!product) return (
    <div style={{
      background: 'var(--bg)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '20px',
    }}>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '80px', color: 'rgba(201,164,74,0.06)',
      }}>
        404
      </span>
      <p style={{
        fontFamily: "'Outfit', sans-serif", fontSize: '12px',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        Product not found
      </p>
      <Link to="/shop" style={{
        background: 'var(--accent)', color: '#0C0B09',
        padding: '12px 28px',
        fontFamily: "'Outfit', sans-serif", fontSize: '11px',
        letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
      }}>
        Back to Shop
      </Link>
    </div>
  )

  const handleAddToBag = () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    addItem({ ...product, qty })
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2500)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 80px',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {['Home', '/', 'Shop', '/', product.category, '/', product.name].map((c, i) => (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: i === 6 ? 'var(--accent)' : 'var(--text-faint)',
              fontWeight: i === 6 ? 400 : 300,
              whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
              maxWidth: i === 6 ? '180px' : 'auto',
            }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Main product layout */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '52px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'flex-start' }}>

          {/* ── LEFT — Images ── */}
          <div style={{ position: 'sticky', top: '80px' }}>

            {/* Main image */}
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                background: 'var(--bg-surface)',
                overflow: 'hidden',
                marginBottom: '12px',
                border: '1px solid var(--border)',
              }}
            >
              {/* Placeholder */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '18px', color: 'rgba(201,164,74,0.06)',
                  letterSpacing: '0.2em',
                }}>
                  {product.category}
                </span>
              </div>

              <img
                src={product.images?.[activeImage] || product.image}
                alt={product.name}
                onError={e => { e.target.style.display = 'none' }}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
              />

              {/* Badge */}
              {product.badge && (
                <span style={{
                  position: 'absolute', top: '16px', left: '16px',
                  padding: '5px 12px',
                  background: 'var(--accent)', color: '#0C0B09',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 600,
                }}>
                  {product.badge}
                </span>
              )}

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(v => !v)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  width: '36px', height: '36px',
                  background: 'var(--bg)',
                  border: `1px solid ${wishlisted ? 'var(--accent)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <HeartIcon filled={wishlisted} />
              </button>
            </motion.div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {(product.images || [product.image]).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: '72px', height: '88px', flexShrink: 0,
                    background: 'var(--bg-surface)',
                    border: `2px solid ${activeImage === i ? 'var(--accent)' : 'var(--border)'}`,
                    overflow: 'hidden', cursor: 'pointer',
                    transition: 'border-color 0.2s', padding: 0,
                    position: 'relative',
                  }}
                >
                  <img
                    src={img} alt={`${product.name} view ${i + 1}`}
                    onError={e => { e.target.style.display = 'none' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
              ))}
            </div>

          </div>

          {/* ── RIGHT — Info ── */}
          <div>

            {/* Category + SKU */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '16px',
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 400,
              }}>
                {product.category}
              </span>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.18em',
                color: 'var(--text-faint)', fontWeight: 300,
              }}>
                SKU: {product.sku}
              </span>
            </div>

            {/* Gold accent line */}
            <div style={{ width: '40px', height: '3px', background: 'var(--accent)', marginBottom: '16px' }} />

            {/* Name */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              color: 'var(--text)', letterSpacing: '0.02em',
              lineHeight: 0.95, marginBottom: '20px',
            }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{
              display: 'flex', alignItems: 'baseline',
              gap: '12px', marginBottom: '28px',
            }}>
              <span style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontSize: '36px',
                color: 'var(--accent)', lineHeight: 1,
              }}>
                ${product.price}
              </span>
              {product.badge === 'Sale' && (
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px', color: 'var(--text-faint)',
                  textDecoration: 'line-through',
                }}>
                  ${Math.round(product.price * 1.25)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '15px', lineHeight: 1.7,
              color: 'var(--text-muted)',
              marginBottom: '32px',
              paddingBottom: '32px',
              borderBottom: '1px solid var(--border)',
            }}>
              {product.description}
            </p>

            {/* Color selector */}
            {product.colors && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '12px',
                }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 400,
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
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '8px 16px',
                        background: selectedColor === color ? 'var(--accent)' : 'transparent',
                        border: `1px solid ${selectedColor === color ? 'var(--accent)' : 'var(--border-mid)'}`,
                        color: selectedColor === color ? '#0C0B09' : 'var(--text-muted)',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '11px', letterSpacing: '0.1em',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {color}
                    </button>
                  ))}
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
                  color: sizeError ? '#C0392B' : 'var(--text-muted)',
                  fontWeight: 400,
                }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </span>
                <button style={{
                  background: 'transparent', border: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '10px', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                  cursor: 'pointer', textDecoration: 'underline',
                }}>
                  Size Guide
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    style={{
                      width: '52px', height: '52px',
                      background: selectedSize === size ? 'var(--accent)' : 'transparent',
                      border: `1px solid ${
                        sizeError
                          ? 'rgba(192,57,43,0.4)'
                          : selectedSize === size
                          ? 'var(--accent)'
                          : 'var(--border-mid)'
                      }`,
                      color: selectedSize === size ? '#0C0B09' : 'var(--text-muted)',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '11px', letterSpacing: '0.08em',
                      fontWeight: selectedSize === size ? 500 : 300,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      if (selectedSize !== size) {
                        e.currentTarget.style.borderColor = 'var(--accent)'
                        e.currentTarget.style.color = 'var(--accent)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (selectedSize !== size) {
                        e.currentTarget.style.borderColor = sizeError ? 'rgba(192,57,43,0.4)' : 'var(--border-mid)'
                        e.currentTarget.style.color = 'var(--text-muted)'
                      }
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to bag */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>

              {/* Qty */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{
                    width: '44px', height: '52px',
                    background: 'transparent', border: 'none',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <MinusIcon />
                </button>
                <span style={{
                  width: '40px', textAlign: 'center',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '18px', color: 'var(--text)',
                  letterSpacing: '0.04em',
                  borderLeft: '1px solid var(--border)',
                  borderRight: '1px solid var(--border)',
                  lineHeight: '52px',
                }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{
                    width: '44px', height: '52px',
                    background: 'transparent', border: 'none',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <PlusIcon />
                </button>
              </div>

              {/* Add to bag */}
              <button
                onClick={handleAddToBag}
                style={{
                  flex: 1, height: '52px',
                  background: addedToBag ? '#2D7A2D' : 'var(--accent)',
                  color: '#0C0B09',
                  border: 'none',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '16px', letterSpacing: '0.1em',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { if (!addedToBag) e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={addedToBag ? 'added' : 'add'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    {addedToBag ? '✓ ADDED TO BAG' : (
                      <>ADD TO BAG <ArrowIcon /></>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

            </div>

            {/* Wishlist + Share row */}
            <div style={{
              display: 'flex', gap: '8px',
              marginBottom: '32px',
            }}>
              <button
                onClick={() => setWishlisted(v => !v)}
                style={{
                  flex: 1, height: '44px',
                  background: 'transparent',
                  border: `1px solid ${wishlisted ? 'var(--accent)' : 'var(--border)'}`,
                  color: wishlisted ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.16em',
                  textTransform: 'uppercase', transition: 'all 0.22s',
                }}
                onMouseEnter={e => {
                  if (!wishlisted) {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }
                }}
                onMouseLeave={e => {
                  if (!wishlisted) {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }
                }}
              >
                <HeartIcon filled={wishlisted} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button style={{
                width: '44px', height: '44px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.22s',
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
                <ShareIcon />
              </button>
            </div>

            {/* Shipping + returns */}
            <div style={{
              display: 'flex', gap: '0',
              marginBottom: '32px',
            }}>
              {[
                { Icon: TruckIcon,  text: 'Free shipping over $200' },
                { Icon: ReturnIcon, text: 'Free returns — 30 days'  },
              ].map(({ Icon, text }, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 14px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderLeft: i === 1 ? 'none' : '1px solid var(--border)',
                  }}
                >
                  <span style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.8 }}><Icon /></span>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', letterSpacing: '0.08em',
                    color: 'var(--text-muted)', fontWeight: 300,
                  }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <AccordionPanel title="Product Details">
                <ul style={{
                  listStyle: 'none',
                  display: 'flex', flexDirection: 'column', gap: '8px',
                }}>
                  {product.details?.map((d, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                    }}>
                      <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>—</span>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '12px', color: 'var(--text-muted)',
                        fontWeight: 300, lineHeight: 1.6,
                      }}>
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionPanel>

              <AccordionPanel title="Size & Fit">
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px', color: 'var(--text-muted)',
                  fontWeight: 300, lineHeight: 1.7,
                }}>
                  Model is 6'1" and wears size M. This piece is designed with an oversized fit — size down if you prefer a more fitted silhouette. For standard fit, take your usual size.
                </p>
              </AccordionPanel>

              <AccordionPanel title="Shipping & Returns">
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '10px',
                }}>
                  {[
                    'Standard delivery: 3–5 business days',
                    'Express delivery: 1–2 business days',
                    'Free shipping on orders over $200',
                    'Free returns within 30 days of delivery',
                    'Items must be unworn, unwashed, with tags attached',
                  ].map((line, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '12px', color: 'var(--text-muted)',
                        fontWeight: 300, lineHeight: 1.6,
                      }}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionPanel>
            </div>

          </div>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts currentId={product.id} category={product.category} />

    </div>
  )
}
