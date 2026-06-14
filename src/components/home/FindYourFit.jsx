import { Link } from 'react-router-dom'

const G  = '#B8903A'
const W  = '#FFFFFF'
const DK = '#1A1612'
const F  = { fontFamily: "'Inter', sans-serif" }

const categories = [
  { label: 'Eden Collection',  path: '/shop?col=eden',      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80&fit=crop' },
  { label: 'The Love Edit',    path: '/shop?col=love-edit', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80&fit=crop' },
  { label: 'Bold & Beautiful', path: '/shop?col=bold',      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80&fit=crop' },
  { label: 'New In',           path: '/shop',               image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=300&q=80&fit=crop' },
  { label: 'Accessories',      path: '/shop',               image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&q=80&fit=crop' },
  { label: 'Featured',         path: '/featured',           image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80&fit=crop' },
  { label: 'All Collections',  path: '/shop',               image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80&fit=crop' },
  { label: 'Sale',             path: '/shop',               image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&q=80&fit=crop' },
]

const doubled = [...categories, ...categories]

export default function FindYourFit() {
  return (
    <section style={{ background: '#FBFAF8', padding: '40px 0', overflow: 'hidden' }}>
      <div className="page-padding" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', marginBottom: '24px' }}>
        <h2 style={{ ...F, fontSize: '22px', fontWeight: 700, color: DK }}>Find Your Fit</h2>
        <div style={{ width: '40px', height: '3px', background: G, marginTop: '8px' }} />
      </div>

      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '60px', background: 'linear-gradient(90deg, #FBFAF8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '60px', background: 'linear-gradient(270deg, #FBFAF8, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div className="marquee-track" style={{ display: 'flex', gap: '24px', animation: 'marquee 36s linear infinite', width: 'max-content', padding: '0 40px' }}>
          {doubled.map((cat, i) => (
            <Link key={i} to={cat.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
              <div className="fit-circle" style={{ width: '108px', height: '108px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${W}`, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', flexShrink: 0 }}>
                <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <span style={{ ...F, fontSize: '12px', fontWeight: 600, color: DK, textAlign: 'center', whiteSpace: 'nowrap' }}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
