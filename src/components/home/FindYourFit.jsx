import { Link } from 'react-router-dom'
const G  = '#B8903A'
const W  = '#FFFFFF'
const DK = '#1A1612'
const F  = { fontFamily: "'Inter', sans-serif" }
const categories = [
  { label: 'Eden Collection',  path: '/shop?col=eden',      image: '/edenBanner.jpg'},
  { label: 'The Love Edit',    path: '/shop?col=love-edit', image: '/loveEdits.jpg' },
  { label: 'Bold & Beautiful', path: '/shop?col=bold',      image: '/boldBeauty.jpg'},
  { label: 'Featured',         path: '/featured',           image: '/featured.jpg' },
  { label: 'All Collections',  path: '/shop',               image: '/collection.jpg' },
  { label: 'Sales Promotion',  path: '/sale',                image: '/sale.jpg' },
  { label: 'Gift Card',        path: '/sale',                image: '/giftcard.jpeg' },
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
