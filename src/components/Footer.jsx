import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const G = '#B8903A';
const GL = '#F5ECD8';
const W = '#FFFFFF';
const OW = '#F8F7F4';
const BK = '#111111';
const DK = '#222222';
const MD = '#666666';
const FT = '#999999';
const BR = '#E4E0D8';
const F = { fontFamily: "'Inter', sans-serif" };

const shopLinks = [
  { label: 'New Arrivals', path: '/shop' },
  { label: 'Tops', path: '/shop' },
  { label: 'Bottoms', path: '/shop' },
  { label: 'Coats', path: '/shop' },
];

const companyLinks = [
  { label: 'Our Brand', path: '/brand' },
  { label: 'FAQ', path: '/' },
  { label: 'Size Guide', path: '/' },
];

const supportLinks = [
  { label: 'Track My Order', path: '/' },
  { label: 'Returns & Exchanges', path: '/terms' },
  { label: 'Contact Support', path: '/contact' },
];

const legalLinks = [
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Shipping Information', path: '/terms' },
  { label: 'Cookie Policy', path: '/' },
];

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
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    ),
  },
];

const scrollTop = () => window.scrollTo(0, 0);

function LinkColumn({ heading, links }) {
  return (
    <div>
      <h4 style={{ ...F, fontSize: '13px', fontWeight: 700, color: DK, marginBottom: '18px' }}>
        {heading}
      </h4>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map(link => (
          <li key={link.label}>
            <Link
              to={link.path}
              onClick={scrollTop}
              style={{ ...F, fontSize: '13px', fontWeight: 300, color: MD, textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = G; }}
              onMouseLeave={e => { e.currentTarget.style.color = MD; }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandColumn() {
  return (
    <div className="footer-brand">
      <Link to="/" onClick={scrollTop} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', textDecoration: 'none' }}>
        <img src="/stayonlinelogo.jpeg" alt="Staay" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ ...F, fontSize: '18px', fontWeight: 800, color: DK }}>STAAY</span>
          <span style={{ ...F, fontSize: '8px', fontWeight: 500, color: G, letterSpacing: '0.25em' }}>ONLINE</span>
        </div>
      </Link>

      <p style={{ ...F, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: MD, marginBottom: '20px' }}>
        Designed for women who live beyond limits. Effortless. Intentional. Always in season.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: G }} />
        <span style={{ ...F, fontSize: '11px', color: FT }}>SSL secured checkout</span>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {socialLinks.map(social => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            style={{
              width: '40px',
              height: '40px',
              border: `1px solid ${BR}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: MD,
              background: W,
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function SubscriptionPopup({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSubmit() {
    if (!email || !email.includes('@')) return;

    setSubmitted(true);
    setEmail('');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  }

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }} />

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '480px',
        background: W,
        boxShadow: '-4px 0 30px rgba(0,0,0,0.1)',
        zIndex: 1000,
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: submitted ? 'center' : 'flex-start',
        overflowY: 'auto',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: MD,
          }}
        >
          ×
        </button>

        {submitted ? (
          <div style={{ border: `1px solid ${G}`, background: GL, padding: '20px', textAlign: 'center' }}>
            <span style={{ ...F, fontSize: '16px', fontWeight: 500, color: G }}>
              You're in. Welcome to Staay.
            </span>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <p style={{ ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: G }}>
              Stay in the loop
            </p>

            <h3 style={{ ...F, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: DK }}>
              The STAAY Woman Starts Here
            </h3>

            <p style={{ ...F, fontSize: '15px', fontWeight: 300, lineHeight: 1.65, color: MD, marginBottom: '32px' }}>
              Early access to new pieces, thoughtful releases, and everything we're creating for you.
            </p>

            <div style={{ display: 'flex', marginBottom: '16px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  border: `1px solid ${focused ? BK : BR}`,
                  borderRight: 'none',
                  padding: '14px 16px',
                  ...F,
                  fontSize: '14px',
                  outline: 'none',
                }}
              />

              <button
                onClick={handleSubmit}
                style={{
                  background: BK,
                  border: `1px solid ${BK}`,
                  color: W,
                  padding: '14px 24px',
                  ...F,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </div>

            <p style={{ ...F, fontSize: '11px', color: FT }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function PopupButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: G,
        color: W,
        border: 'none',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 998,
      }}
    >
      ✉
    </button>
  );
}

export default function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 50) {
        const popupShown = sessionStorage.getItem('subscriptionPopupShown');

        if (!popupShown && !isPopupOpen) {
          setIsPopupOpen(true);
          sessionStorage.setItem('subscriptionPopupShown', 'true');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPopupOpen]);

  return (
    <>
      <footer style={{ background: OW, borderTop: `1px solid ${BR}` }}>
        <div style={{ height: '3px', background: G }} />

        <div className="footer-container">
          <div className="footer-grid">
            <BrandColumn />

            <LinkColumn heading="Shop" links={shopLinks} />
            <LinkColumn heading="Company" links={companyLinks} />
            <LinkColumn heading="Support" links={supportLinks} />
            <LinkColumn heading="Legal" links={legalLinks} />
          </div>

          <div style={{
            borderTop: `1px solid ${BR}`,
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <span style={{ ...F, fontSize: '12px', fontWeight: 300, color: FT }}>
              © {year} STAAY. All rights reserved.
            </span>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: 'transparent',
                border: 'none',
                ...F,
                fontSize: '11px',
                fontWeight: 500,
                color: MD,
                cursor: 'pointer',
              }}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      <PopupButton onClick={() => setIsPopupOpen(true)} />
      <SubscriptionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <style>{`
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 24px 40px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-bottom: 56px;
        }

        .footer-brand {
          grid-column: 1 / -1;
        }

        @media (min-width: 768px) {
          .footer-container {
            padding: 64px 40px 40px;
          }
        }

        @media (min-width: 1024px) {
          .footer-container {
            padding: 64px 64px 40px;
          }

          .footer-grid {
            grid-template-columns: 1.4fr repeat(4, 1fr);
            align-items: start;
          }

          .footer-brand {
            grid-column: auto;
          }
        }
      `}</style>
    </>
  );
}
