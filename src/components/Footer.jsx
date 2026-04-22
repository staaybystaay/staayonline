import { useState } from 'react'
import { Link } from 'react-router-dom'

const shopLinks = [
  { label: 'New Arrivals', path: '/shop' },
  { label: 'Footwear', path: '/shop' },
  { label: 'Tops', path: '/shop' },
  { label: 'Bottoms', path: '/shop' },
  { label: 'Coats', path: '/shop' },
  { label: 'Sale', path: '/shop' },
]

const companyLinks = [
  { label: 'Our Brand', path: '/' },
   { label: 'Return Policy', path: '/' },
 
]

const supportLinks = [
  { label: 'Contact Us', path: '/' },
  { label: 'Shipping Info', path: '/' },
  { label: 'Size Guide', path: '/' },
  { label: 'FAQ', path: '/' },
]

const legalLinks = [
  { label: 'Privacy Policy', path: '/' },
  { label: 'Terms of Use', path: '/' },
  { label: 'Cookie Policy', path: '/' },
  { label: 'Accessibility', path: '/' },
]

const trustItems = [
  'Free shipping on orders over $200',
  'Free returns within 30 days',
  'SSL secured checkout',
]

const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Paystack']

function LinkColumn(props) {
  return (
    <div>
      <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', color: 'var(--text)', letterSpacing: '0.1em', marginBottom: '18px' }}>
        {props.heading}
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {props.links.map(function(link) {
          return (
            <li key={link.label}>
              <Link
                to={link.path}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300, letterSpacing: '0.04em', transition: 'color 0.2s', display: 'inline-block' }}
                onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-muted)' }}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Newsletter() {
  var s1 = useState('')
  var email = s1[0]
  var setEmail = s1[1]
  var s2 = useState(false)
  var submitted = s2[0]
  var setSubmitted = s2[1]
  var s3 = useState(false)
  var focused = s3[0]
  var setFocused = s3[1]

  function handleSubmit() {
    if (!email || email.indexOf('@') === -1) return
    setSubmitted(true)
    setEmail('')
    setTimeout(function() { setSubmitted(false) }, 4000)
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: '440px', padding: '14px 20px', border: '1px solid var(--accent)', background: 'var(--accent-soft)' }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          You are in. Welcome to Staay.
        </span>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '440px' }}>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', fontWeight: 400 }}>
        Stay in the loop
      </p>
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px, 3vw, 36px)', color: 'var(--text)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: '10px' }}>
        JOIN THE STAAY MOVEMENT
      </h3>
      <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '14px', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '24px' }}>
        New drops, exclusive offers and editorial content. Delivered first.
      </p>
      <div style={{ display: 'flex' }}>
        <input
          type="email"
          value={email}
          onChange={function(e) { setEmail(e.target.value) }}
          onFocus={function() { setFocused(true) }}
          onBlur={function() { setFocused(false) }}
          onKeyDown={function(e) { if (e.key === 'Enter') handleSubmit() }}
          placeholder="your@email.com"
          style={{ flex: 1, background: 'var(--bg-surface)', border: focused ? '1px solid var(--accent)' : '1px solid var(--border)', borderRight: 'none', padding: '13px 16px', fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'var(--text)', outline: 'none', letterSpacing: '0.08em', transition: 'border-color 0.2s' }} />
        <button
          onClick={handleSubmit}
          onMouseEnter={function(e) { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={function(e) { e.currentTarget.style.opacity = '1' }}
          style={{ background: 'var(--accent)', border: '1px solid var(--accent)', color: '#0C0B09', padding: '13px 20px', fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Subscribe
        </button>
      </div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'var(--text-faint)', marginTop: '10px', letterSpacing: '0.04em', fontWeight: 300 }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}

export default function Footer() {
  var year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ height: '3px', background: 'var(--accent)' }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 80px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%' }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: 'var(--text)', letterSpacing: '0.06em' }}>
                  STAAY
                </span>
              </div>
            </Link>
            <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '13px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '220px' }}>
              Garments built for those who exist between edges. No rules. No season.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {trustItems.map(function(item) {
                return (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'var(--text-faint)', fontWeight: 300, letterSpacing: '0.04em' }}>
                      {item}
                    </span>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                style={{ width: '36px', height: '36px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.22s', fontFamily: "'Outfit', sans-serif", fontSize: '10px', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                IG
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer"
                style={{ width: '36px', height: '36px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.22s', fontFamily: "'Outfit', sans-serif", fontSize: '10px', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                X
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"
                style={{ width: '36px', height: '36px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.22s', fontFamily: "'Outfit', sans-serif", fontSize: '10px', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                TT
              </a>
            </div>
          </div>
          {/* Contact info */}
<div style={{
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: '1px solid var(--border)',
  display: 'flex', flexDirection: 'column', gap: '8px',
}}>
  
    href="mailto:info@staayonline.com"
    style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: '11px', color: 'var(--text-muted)',
      fontWeight: 300, letterSpacing: '0.04em',
      transition: 'color 0.2s', display: 'block',
    }}
    onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
    onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-muted)' }}>
    info@staayonline.com
  </a>
  
    href="https://wa.me/233503977985"
    target="_blank"
    rel="noreferrer"
    style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: '11px', color: 'var(--text-muted)',
      fontWeight: 300, letterSpacing: '0.04em',
      transition: 'color 0.2s', display: 'block',
    }}
    onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
    onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-muted)' }}>
    +233 50 397 7985
  </a>
  <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
    
      href="https://instagram.com/staaybystaay"
      target="_blank"
      rel="noreferrer"
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '10px', color: 'var(--text-faint)',
        letterSpacing: '0.08em', transition: 'color 0.2s',
      }}
      onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-faint)' }}>
      @staaybystaay
    </a>
  </div>
</div>
          <LinkColumn heading="Shop" links={shopLinks} />
          <LinkColumn heading="Company" links={companyLinks} />
          <LinkColumn heading="Support" links={supportLinks} />
          <LinkColumn heading="Legal" links={legalLinks} />
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '52px', marginBottom: '52px' }}>
          <Newsletter />
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.06em', fontWeight: 300 }}>
            {year} Staay Online. All rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {paymentMethods.map(function(method) {
              return (
                <span key={method} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', border: '1px solid var(--border)', padding: '4px 8px', fontWeight: 400 }}>
                  {method}
                </span>
              )
            })}
          </div>
          <button
            onClick={function() { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-muted)' }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', fontFamily: "'Outfit', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
