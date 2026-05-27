import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const G   = '#B8903A';
const GL  = '#F5ECD8';
const W   = '#FFFFFF';
const OW  = '#F8F7F4';
const BK  = '#111111';
const DK  = '#222222';
const MD  = '#666666';
const FT  = '#999999';
const BR  = '#E4E0D8';
const F   = { fontFamily: "'Inter', sans-serif" };

const shopLinks = [
  { label: 'New Arrivals',  path: '/shop'     },
  { label: 'Tops',          path: '/shop'     },
  { label: 'Bottoms',       path: '/shop'     },
  { label: 'Coats',         path: '/shop'     },
];

const companyLinks = [
  { label: 'Our Brand',     path: '/brand'    },
  { label: 'FAQ',           path: '/'         },
  { label: 'Size Guide',    path: '/'         },
];

const supportLinks = [
  { label: 'Track My Order',      path: '/' },
  { label: 'Returns & Exchanges', path: '/terms' },
  { label: 'Contact Support',     path: '/contact' },
];

const legalLinks = [
  { label: 'Terms of Service',    path: '/terms'  },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Shipping Information', path: '/terms'      },
  { label: 'Cookie Policy',       path: '/'       },
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
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

const scrollTop = () => window.scrollTo(0, 0);

function LinkColumn({ heading, links }) {
  return (
    <div>
      <h4 style={{
        ...F, fontSize: '13px', fontWeight: 700,
        color: DK, letterSpacing: '0.02em',
        marginBottom: '18px',
      }}>
        {heading}
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map(link => (
          <li key={link.label}>
            <Link
              to={link.path}
              onClick={scrollTop}
              style={{
                ...F, fontSize: '13px', fontWeight: 300,
                color: MD, letterSpacing: '0.01em',
                transition: 'color 0.2s', display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Brand Column Component (formerly part of the original code)
function BrandColumn() {
  return (
    <div>
      <Link to="/" onClick={scrollTop} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <img
          src="/stayonlinelogo.jpeg"
          alt="Staay"
          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ ...F, fontSize: '18px', fontWeight: 800, color: DK, letterSpacing: '-0.01em' }}>
            STAAY
          </span>
          <span style={{ ...F, fontSize: '8px', fontWeight: 500, color: G, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '2px' }}>
            ONLINE
          </span>
        </div>
      </Link>

      <p style={{
        ...F, fontSize: '13px', fontWeight: 300,
        lineHeight: 1.7, color: MD, marginBottom: '20px',
        maxWidth: '220px',
      }}>
        Designed for women who live beyond limits. Effortless. Intentional. Always in season.
      </p>

      {/* SSL badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: G, flexShrink: 0 }} />
        <span style={{ ...F, fontSize: '11px', fontWeight: 400, color: FT }}>
          SSL secured checkout
        </span>
      </div>

      {/* Social icons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {socialLinks.map(social => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            style={{
              width: '36px', height: '36px',
              border: `1px solid ${BR}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: MD, transition: 'all 0.2s', background: W,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BR; e.currentTarget.style.color = MD }}>
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

// Popup Subscription Form Component
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

  if (submitted) {
    return (
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
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        animation: 'slideIn 0.3s ease-out',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: MD,
          }}
        >
          ×
        </button>
        <div style={{
          border: `1px solid ${G}`,
          background: GL,
          padding: '20px',
          textAlign: 'center',
        }}>
          <span style={{ ...F, fontSize: '16px', fontWeight: 500, color: G }}>
            You're in. Welcome to Staay.
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease-out',
        }}
      />
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
        animation: 'slideIn 0.3s ease-out',
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
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = BK }}
          onMouseLeave={e => { e.currentTarget.style.color = MD }}
        >
          ×
        </button>

        <div style={{ marginTop: '20px' }}>
          <p style={{
            ...F, fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: G, marginBottom: '12px',
          }}>
            Stay in the loop
          </p>
          <h3 style={{
            ...F, fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 800, color: DK,
            letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px',
          }}>
            The STAAY Woman Starts Here
          </h3>
          <p style={{
            ...F, fontSize: '15px', fontWeight: 300,
            lineHeight: 1.65, color: MD, marginBottom: '32px',
          }}>
            Early access to new pieces, thoughtful releases, and everything we're creating for you.
          </p>
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
              placeholder="your@email.com"
              style={{
                flex: 1, background: W,
                border: `1px solid ${focused ? BK : BR}`,
                borderRight: 'none', padding: '14px 16px',
                ...F, fontSize: '14px', color: DK,
                outline: 'none', transition: 'border-color 0.2s',
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                background: BK, border: `1px solid ${BK}`,
                color: W, padding: '14px 28px',
                ...F, fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.borderColor = G }}
              onMouseLeave={e => { e.currentTarget.style.background = BK; e.currentTarget.style.borderColor = BK }}>
              Subscribe
            </button>
          </div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 300, color: FT, marginTop: '8px' }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

// Popup Button Component
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
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'transform 0.2s, background 0.2s',
        zIndex: 998,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = BK }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = G }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    </button>
  );
}

export default function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const year = new Date().getFullYear();

  // Auto-popup when scrolling to the end of the home screen
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      // When user scrolls to bottom (with 50px threshold)
      if (scrollPosition >= pageHeight - 50) {
        // Only show if not already open and hasn't been shown too many times
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

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 40px',
          '@media (minWidth: 768px)': { padding: '64px 40px 40px' },
          '@media (minWidth: 1024px)': { padding: '64px 64px 40px' },
        }}>

          {/* ── MAIN GRID with Brand Column ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px',
            marginBottom: '56px',
          }}>
            <BrandColumn />
            <LinkColumn heading="Shop"    links={shopLinks}    />
            <LinkColumn heading="Company" links={companyLinks} />
            <LinkColumn heading="Support" links={supportLinks} />
            <LinkColumn heading="Legal"   links={legalLinks}   />
          </div>

          {/* ── BOTTOM BAR ── */}
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
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'transparent', border: 'none',
                ...F, fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: MD, cursor: 'pointer', transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = MD }}>
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Popup Button and Subscription Popup */}
      <PopupButton onClick={() => setIsPopupOpen(true)} />
      <SubscriptionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
