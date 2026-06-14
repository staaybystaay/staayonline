import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const W  = '#FFFFFF'
const DK = '#1A1612'
const F  = { fontFamily: "'Inter', sans-serif" }

const collections = [
  {
    label: 'Eden Collection',
    slug:  'eden',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&fit=crop',
    tall:  true,
  },
  {
    label: 'The Love Edit',
    slug:  'love-edit',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop',
  },
  {
    label: 'Bold & Beautiful',
    slug:  'bold',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&fit=crop',
  },
  {
    label: 'New In',
    slug:  null,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&q=80&fit=crop',
  },
  {
    label: 'Accessories',
    slug:  null,
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=80&fit=crop',
  },
  {
    label: 'Featured',
    slug:  null,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop',
    path:  '/featured',
  },
]

function Tile({ item, span }) {
  const to = item.path || (item.slug ? `/shop?col=${item.slug}` : '/shop')
  return (
    <Link to={to} style={{ position: 'relative', overflow: 'hidden', display: 'block', gridRow: span ? 'span 2' : undefined }}>
      <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
        <p style={{ ...F, fontSize: span ? 'clamp(16px,2vw,22px)' : '13px', fontWeight: 800, color: W, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          {item.label}
        </p>
      </div>
    </Link>
  )
}

export default function CollectionGrid() {
  return (
    <section className="page-padding" style={{ background: W, padding: '0 40px 56px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ ...F, fontSize: '22px', fontWeight: 700, color: DK }}>Shop by Collection</h2>
          <div style={{ width: '40px', height: '3px', background: '#B8903A', marginTop: '8px' }} />
        </div>

        <div className="collection-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: '200px 200px', gap: '4px' }}>
          <Tile item={collections[0]} span />
          {collections.slice(1).map(item => <Tile key={item.label} item={item} />)}
        </div>

      </div>
    </section>
  )
}
