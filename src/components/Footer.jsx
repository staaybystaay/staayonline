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
  { label: 'Contact Us', path: '/' },
  { label: 'FAQ', path: '/' },
  { label: 'Size Guide', path: '/' },
]

const supportLinks = [
  { label: 'Track My Order', path: '/' },
  { label: 'Returns & Exchanges', path: '/' },
  { label: 'Help Center', path: '/' },
  { label: 'Contact Support', path: '/' },
]

const legalLinks = [
  { label: 'Privacy Policy', path: '/' },
  { label: 'Shipping Information', path: '/' },
  { label: 'Return Policy', path: '/' },
  { label: 'Cookie Policy', path: '/' },
]

const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Paystack']

const trustItems = ['SSL secured checkout']

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/staaybystaay',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@staaybystaay',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/233503977985',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
]

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
        THE STAAY WOMAN STARTS HERE
      </h3>
      <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '14px', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '24px' }}>
        Early access to new pieces, thoughtful releases, and everything we're creating for you.
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
              Designed for women who live beyond limits. Effortless. Intentional. Always in season.
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
              {socialLinks.map(function(social) {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    style={{ width: '36px', height: '36px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.22s', textDecoration: 'none' }}
                    onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                    {social.icon}
                  </a>
                )
              })}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="mailto:info@staayonline.com"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'var(--text-muted)', fontWeight: 300, letterSpacing: '0.04em', transition: 'color 0.2s', display: 'block' }}
                onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-muted)' }}>
                info@staayonline.com
              </a>
              <a
                href="https://wa.me/233503977985"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'var(--text-muted)', fontWeight: 300, letterSpacing: '0.04em', transition: 'color 0.2s', display: 'block' }}
                onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-muted)' }}>
                +233 50 397 7985
              </a>
              <a
                href="https://instagram.com/staaybystaay"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'var(--text-faint)', letterSpacing: '0.08em', transition: 'color 0.2s' }}
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
            {year} STAAY. All rights reserved.
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
