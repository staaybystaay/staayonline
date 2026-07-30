import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import { useAuth } from '../hooks/useAuth'
import { createOrder, initializePayment } from '../lib/api'

const INK   = 'var(--text-strong)'
const LINE  = 'var(--border)'
const MUTE  = 'var(--text-muted)'
const FAINT = 'var(--text-faint)'
const W     = 'var(--white)'
const RD    = 'var(--danger)'
const BG    = 'var(--bg)'
const CARD  = 'var(--bg-card)'
const BTN   = 'var(--ink)'
const F     = { fontFamily: "'Inter', sans-serif" }

function Field({ label, value, onChange, type = 'text', required = false, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ display: 'block', ...F, fontSize: '11px', fontWeight: 600, color: focused ? INK : MUTE, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '7px' }}>
        {label} {required && <span style={{ color: RD }}>*</span>}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '12px 14px', border: `1px solid ${focused ? INK : LINE}`,
          background: CARD, ...F, fontSize: '14px', color: INK,
          outline: 'none', transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const items     = useCartStore(s => s.items)
  const { user } = useAuth()

  const [form, setForm] = useState({
    full_name: '', phone: '', address: '', city: '', country: 'Ghana',
    email: user?.email || '',
  })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- backfills the email field once the async auth check resolves, not a render-loop
    if (user?.email) setForm(f => f.email ? f : { ...f, email: user.email })
  }, [user])

  useEffect(() => {
    if (items.length === 0) navigate('/cart', { replace: true })
  }, [items, navigate])

  function set(key, value) { setForm(f => ({ ...f, [key]: value })); setError('') }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)

  async function handlePay(e) {
    e.preventDefault()
    if (!form.full_name.trim())  { setError('Please enter your full name.'); return }
    if (!form.phone.trim())      { setError('Please enter a phone number.'); return }
    if (!form.address.trim())    { setError('Please enter your delivery address.'); return }
    if (!form.city.trim())       { setError('Please enter your city.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setError('Please enter a valid email address.'); return }

    setLoading(true)
    setError('')
    try {
      const order = await createOrder({
        email: form.email.trim(),
        total: subtotal,
        status: 'pending',
        payment_status: 'unpaid',
        shipping_address: {
          full_name: form.full_name.trim(),
          phone:     form.phone.trim(),
          address:   form.address.trim(),
          city:      form.city.trim(),
          country:   form.country.trim(),
        },
        items,
      })

      const { authorization_url } = await initializePayment(order.id)
      window.location.href = authorization_url
    } catch (err) {
      setError(err.message || 'Something went wrong starting your payment. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div className="page-padding" style={{ borderBottom: `1px solid ${LINE}`, padding: '36px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MUTE }}>Home</Link>
            <span style={{ color: FAINT, fontSize: '12px' }}>/</span>
            <Link to="/cart" style={{ ...F, fontSize: '12px', fontWeight: 400, color: MUTE }}>Bag</Link>
            <span style={{ color: FAINT, fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: INK }}>Checkout</span>
          </div>
          <h1 style={{ ...F, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: INK, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Checkout
          </h1>
        </div>
      </div>

      {/* ── BODY ── */}
      <form onSubmit={handlePay}
        className="layout-sidebar page-padding"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 40px 96px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px', alignItems: 'start' }}>

        {/* ── SHIPPING FORM ── */}
        <div style={{ border: `1px solid ${LINE}`, padding: '28px' }}>
          <h2 style={{ ...F, fontSize: '15px', fontWeight: 700, color: INK, letterSpacing: '-0.01em', marginBottom: '22px' }}>
            Delivery Details
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Field label="Full Name" required value={form.full_name} onChange={v => set('full_name', v)} placeholder="e.g. Ama Owusu" />

            <div className="checkout-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Phone Number" required type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="+233 XX XXX XXXX" />
              <Field label="Email" required type="email" value={form.email} onChange={v => set('email', v)} placeholder="you@email.com" />
            </div>

            <Field label="Delivery Address" required value={form.address} onChange={v => set('address', v)} placeholder="Street address" />

            <div className="checkout-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="City" required value={form.city} onChange={v => set('city', v)} placeholder="e.g. Accra" />
              <Field label="Country" required value={form.country} onChange={v => set('country', v)} />
            </div>
          </div>

          {error && (
            <p style={{ ...F, fontSize: '12px', color: RD, marginTop: '18px', padding: '10px 14px', background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)' }}>
              {error}
            </p>
          )}

          <p style={{ ...F, fontSize: '12px', fontWeight: 300, color: FAINT, marginTop: '18px', lineHeight: 1.7 }}>
            You'll be taken to Paystack's secure payment page to pay by Mobile Money (MTN, Vodafone, AirtelTigo) or card. All charges are processed in Ghanaian Cedi (GH₵).
          </p>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className="cart-summary" style={{ position: 'sticky', top: '24px' }}>
          <div style={{ border: `1px solid ${LINE}` }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${LINE}` }}>
              <h2 style={{ ...F, fontSize: '15px', fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>
                Order Summary
              </h2>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px', maxHeight: '260px', overflowY: 'auto' }}>
                {items.map(item => (
                  <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <span style={{ ...F, fontSize: '13px', color: MUTE, flex: 1 }}>
                      {item.name} <span style={{ color: FAINT }}>×{item.qty}</span>
                    </span>
                    <span style={{ ...F, fontSize: '13px', fontWeight: 600, color: INK, whiteSpace: 'nowrap' }}>
                      GH₵{Number(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: `1px solid ${INK}`, marginBottom: '20px' }}>
                <span style={{ ...F, fontSize: '14px', fontWeight: 700, color: INK }}>Total</span>
                <span style={{ ...F, fontSize: '21px', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>
                  GH₵{Number(subtotal).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '16px', background: loading ? MUTE : BTN, color: W, border: 'none', cursor: loading ? 'wait' : 'pointer', ...F, fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em', transition: 'background 0.2s' }}>
                {loading ? 'Redirecting to Paystack…' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>

      </form>

    </div>
  )
}
