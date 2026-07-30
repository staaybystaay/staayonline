import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import { verifyPayment } from '../lib/api'

const INK  = 'var(--text-strong)'
const MUTE = 'var(--text-muted)'
const W    = 'var(--white)'
const RD   = 'var(--danger)'
const GR   = 'var(--success)'
const BG   = 'var(--bg)'
const BTN  = 'var(--ink)'
const F    = { fontFamily: "'Inter', sans-serif" }

export default function CheckoutCallback() {
  const [params] = useSearchParams()
  const reference = params.get('reference') || params.get('trxref')
  const clearCart = useCartStore(s => s.clearCart)

  const [state, setState] = useState('checking') // checking | success | failed

  useEffect(() => {
    if (!reference) { setState('failed'); return }
    verifyPayment(reference)
      .then(result => {
        if (result.status === 'success') {
          clearCart()
          setState('success')
        } else {
          setState('failed')
        }
      })
      .catch(() => setState('failed'))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once for the reference in the URL
  }, [reference])

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ textAlign: 'center', maxWidth: '420px' }}>
        {state === 'checking' && (
          <>
            <div style={{ width: '48px', height: '48px', border: `3px solid ${INK}`, borderTop: '3px solid transparent', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }} />
            <h1 style={{ ...F, fontSize: '20px', fontWeight: 700, color: INK, marginBottom: '8px' }}>Confirming your payment…</h1>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MUTE }}>This will only take a moment.</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </>
        )}

        {state === 'success' && (
          <>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: GR, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '26px', color: W }}>✓</div>
            <h1 style={{ ...F, fontSize: '24px', fontWeight: 800, color: INK, marginBottom: '10px' }}>Payment successful</h1>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MUTE, lineHeight: 1.7, marginBottom: '28px' }}>
              Thank you for your order. We've sent a confirmation and will be in touch about delivery.
            </p>
            <Link to="/account"
              style={{ display: 'inline-block', background: BTN, color: W, padding: '14px 36px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', marginRight: '10px' }}>
              View My Orders
            </Link>
            <Link to="/shop"
              style={{ display: 'inline-block', ...F, fontSize: '13px', fontWeight: 500, color: MUTE, padding: '14px 12px' }}>
              Continue Shopping
            </Link>
          </>
        )}

        {state === 'failed' && (
          <>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: RD, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '26px', color: W }}>✕</div>
            <h1 style={{ ...F, fontSize: '24px', fontWeight: 800, color: INK, marginBottom: '10px' }}>We couldn't confirm this payment</h1>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: MUTE, lineHeight: 1.7, marginBottom: '28px' }}>
              If you were charged, contact us on WhatsApp with your details and we'll sort it out. Otherwise, you can try again.
            </p>
            <Link to="/cart"
              style={{ display: 'inline-block', background: BTN, color: W, padding: '14px 36px', ...F, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', marginRight: '10px' }}>
              Back to Bag
            </Link>
            <Link to="/contact"
              style={{ display: 'inline-block', ...F, fontSize: '13px', fontWeight: 500, color: MUTE, padding: '14px 12px' }}>
              Contact Us
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
