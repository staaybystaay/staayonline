import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ─── TOKENS ──────────────────────────────────────────────────────
const G    = '#B8903A'
const GL   = '#F7F0E4'
const W    = '#FFFFFF'
const BK   = '#0A0A0A'
const DK   = '#1A1612'
const MD   = '#666'
const FT   = '#999'
const BR   = '#E8E4DF'
const LG   = '#F7F6F4'
const ROSE = '#C4A882'
const F    = { fontFamily: "'Inter', sans-serif" }
const SERIF = { fontFamily: "'Georgia', 'Times New Roman', serif" }

// ─── LIGHTBOX ────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.94)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Close */}
      <button onClick={onClose}
        style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: W, fontSize: '28px', cursor: 'pointer', lineHeight: 1, zIndex: 2 }}>
        ×
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); prev() }}
          style={{ position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: W, width: '48px', height: '48px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          ‹
        </button>
      )}

      {/* Image */}
      <motion.img
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}
        src={images[idx].src} alt={images[idx].caption}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', userSelect: 'none' }}
      />

      {/* Next */}
      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); next() }}
          style={{ position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: W, width: '48px', height: '48px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          ›
        </button>
      )}

      {/* Caption + counter */}
      {images[idx].caption && (
        <p style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', ...F, fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {images[idx].caption} · {idx + 1}/{images.length}
        </p>
      )}
    </motion.div>
  )
}

// ─── GALLERY GRID ─────────────────────────────────────────────────
function Gallery({ images, layout = 'grid' }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      {layout === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {images.map((img, i) => (
            <motion.div key={i}
              whileHover={{ scale: 1.015 }} transition={{ duration: 0.25 }}
              onClick={() => setLightbox(i)}
              style={{ overflow: 'hidden', cursor: 'zoom-in', aspectRatio: img.ratio || '3/4', background: '#111' }}>
              <img src={img.src} alt={img.caption || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s', transform: 'scale(1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Masonry-style 2-column */
        <div style={{ columns: '2', columnGap: '12px' }}>
          {images.map((img, i) => (
            <div key={i} onClick={() => setLightbox(i)}
              style={{ breakInside: 'avoid', marginBottom: '12px', overflow: 'hidden', cursor: 'zoom-in' }}>
              <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
                src={img.src} alt={img.caption || ''} style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── SECTION TAG ─────────────────────────────────────────────────
function Tag({ children, color = G, bg = GL }) {
  return (
    <span style={{ display: 'inline-block', padding: '4px 12px', background: bg, color, ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px' }}>
      {children}
    </span>
  )
}

// ─── RITH SECTION ─────────────────────────────────────────────────
const RITH_RUNWAY = [
  { src: '/featured/feature3.jpg',   caption: 'STAAY on the steps of the British Museum' },
  { src: '/featured/feature1.jpg', caption: 'Running in the Halls — British Museum', ratio: '4/5' },
  { src: '/featured/feature2.jpg', caption: 'Running in the Halls — British Museum', ratio: '4/5' },
  { src: '/featured/feature4.jpg',   caption: 'The Great Court, British Museum', ratio: '16/10' },
]

function RITHSection() {
  return (
    <section style={{ borderBottom: `1px solid ${BR}`, paddingBottom: '96px', marginBottom: '96px' }}>

      {/* Full-bleed hero */}
      <div style={{ position: 'relative', height: 'clamp(480px, 70vh, 700px)', overflow: 'hidden', marginBottom: '64px' }}>
        <img src="/featured/rith-crowd.jpg" alt="RITH at the British Museum"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 48px' }}>
          <Tag color="#fff" bg="rgba(255,255,255,0.15)">The British Museum × My Runway Group</Tag>
          <h2 style={{ ...SERIF, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, color: W, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: '14px', marginBottom: '8px' }}>
            Running in the Halls
          </h2>
          <p style={{ ...F, fontSize: '14px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>
            Friday, 17th April · The British Museum, London · 5:30–8:30 pm
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="page-padding" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>

        {/* Intro row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start', marginBottom: '64px' }}>

          {/* Left — steps hero */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src="/featured/rith-steps.jpg" alt="STAAY on the British Museum steps"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', padding: '8px 14px' }}>
              <p style={{ ...F, fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em' }}>STAAY · Eden Collection</p>
            </div>
          </div>

          {/* Right — text */}
          <div style={{ paddingTop: '24px' }}>
            <Tag>Editorial</Tag>
            <h3 style={{ ...SERIF, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '16px 0 24px' }}>
              About R.I.T.H
            </h3>
            <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, lineHeight: 1.9, marginBottom: '20px' }}>
              As part of the British Museum's Young People's Lates programme, <em>Running in the Halls</em> invited audiences to encounter the Museum in an entirely new way.
            </p>
            <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, lineHeight: 1.9, marginBottom: '20px' }}>
              Curated by My Runway Group — who work to amplify underrepresented voices and support emerging creatives — the evening brought together DJs, live performance, visual interventions and interactive workshops responding directly to the Museum's architecture and collection.
            </p>
            <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, lineHeight: 1.9, marginBottom: '32px' }}>
              The title speaks to movement; bodies moving through galleries, ideas travelling across histories and culture flowing through spaces often seen as fixed. Ancestral memory met present-day expression, placing contemporary diasporic voices within one of the world's most recognised cultural institutions.
            </p>

            <div style={{ borderLeft: `3px solid ${G}`, paddingLeft: '20px', margin: '32px 0' }}>
              <p style={{ ...SERIF, fontSize: '18px', fontStyle: 'italic', color: DK, lineHeight: 1.6 }}>
                "Rather than viewing history at a distance, audiences are invited to move with the programme — to experience the Museum as a living cultural space where past and present exist side by side."
              </p>
              <p style={{ ...F, fontSize: '12px', color: FT, marginTop: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>My Runway Group</p>
            </div>

            {/* Event details pill */}
            <div style={{ background: LG, border: `1px solid ${BR}`, borderRadius: '12px', padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Date',     value: 'Friday, 17 April' },
                { label: 'Time',     value: '5:30 – 8:30 pm' },
                { label: 'Venue',    value: 'The British Museum' },
                { label: 'Curated by', value: 'My Runway Group' },
              ].map(row => (
                <div key={row.label}>
                  <p style={{ ...F, fontSize: '10px', fontWeight: 600, color: FT, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>{row.label}</p>
                  <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: DK }}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Runway gallery */}
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: FT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Runway — click to enlarge</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { src: '/featured/rith-runway1.jpg', caption: 'Running in the Halls', style: { gridRow: 'span 1' } },
            { src: '/featured/rith-runway2.jpg', caption: 'Running in the Halls', style: { gridRow: 'span 1' } },
            { src: '/featured/rith-steps.jpg',   caption: 'STAAY on the steps', style: { gridRow: 'span 2' } },
            { src: '/featured/rith-poster.jpg',  caption: 'RITH Collection Preview', style: { gridColumn: 'span 2' } },
          ].map((img, i) => (
            <RunwayTile key={i} img={img} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RunwayTile({ img }) {
  const [lb, setLb] = useState(false)
  return (
    <>
      <div onClick={() => setLb(true)} style={{ overflow: 'hidden', cursor: 'zoom-in', background: '#111', ...img.style }}>
        <img src={img.src} alt={img.caption}
          style={{ width: '100%', height: '100%', minHeight: '280px', objectFit: 'cover', display: 'block', transition: 'transform 0.45s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        />
      </div>
      <AnimatePresence>
        {lb && <Lightbox images={[img]} startIndex={0} onClose={() => setLb(false)} />}
      </AnimatePresence>
    </>
  )
}

// ─── EDEN COLLECTION SECTION ──────────────────────────────────────
const EDEN_GALLERY = [
  { src: '/featured/eden-hero.jpg',      caption: 'The Eden Collection — STAAY', ratio: '3/4' },
  { src: '/featured/eden-editorial.jpg', caption: 'Eden Editorial',               ratio: '3/4' },
]

function EdenSection() {
  const [lb, setLb] = useState(null)

  return (
    <section className="page-padding" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px 96px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '680px', margin: '0 auto 64px' }}>
        <Tag>Collection · 2025</Tag>
        <h2 style={{ ...SERIF, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '16px 0 0' }}>
          The Eden Collection
        </h2>
        <p style={{ ...F, fontSize: '13px', fontWeight: 600, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>by STAAY</p>
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '64px' }}>

        {/* Images */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {EDEN_GALLERY.map((img, i) => (
            <div key={i} onClick={() => setLb(i)}
              style={{ overflow: 'hidden', cursor: 'zoom-in', aspectRatio: '3/4', background: '#f0ede8' }}>
              <img src={img.src} alt={img.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </div>
          ))}
        </div>

        {/* Text */}
        <div>
          <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: ROSE, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
            ✦ Inspired by the Garden of Eden
          </p>
          <p style={{ ...F, fontSize: '16px', fontWeight: 300, color: MD, lineHeight: 2, marginBottom: '24px' }}>
            The Eden Collection is inspired by the beauty and purity of the Garden of Eden — a place symbolic of life, innocence, abundance, and divine harmony.
          </p>
          <p style={{ ...F, fontSize: '16px', fontWeight: 300, color: MD, lineHeight: 2, marginBottom: '24px' }}>
            It reflects a return to the beginning where femininity is effortless, confidence is natural, and beauty exists without limitation. Each piece embodies grace, softness, and quiet strength, capturing the feeling of being fully seen, fully present, and unapologetically radiant.
          </p>

          {/* Pull quote */}
          <div style={{ background: GL, borderRadius: '12px', padding: '28px 32px', margin: '36px 0' }}>
            <p style={{ ...SERIF, fontSize: '20px', fontStyle: 'italic', color: DK, lineHeight: 1.65, marginBottom: '12px' }}>
              "The collection tells a story of a woman in her purest form — uncovered, unafraid, and blooming."
            </p>
            <p style={{ ...F, fontSize: '11px', fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase' }}>STAAY</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
            <Link to="/shop"
              style={{ background: BK, color: W, padding: '14px 36px', ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s', display: 'inline-block', borderRadius: '3px' }}
              onMouseEnter={e => { e.currentTarget.style.background = G }}
              onMouseLeave={e => { e.currentTarget.style.background = BK }}>
              Shop the Collection
            </Link>
            <Link to="/shop"
              style={{ background: 'transparent', border: `1px solid ${BR}`, color: DK, padding: '14px 28px', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block', borderRadius: '3px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = DK }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BR }}>
              Explore More
            </Link>
          </div>
        </div>
      </div>

      {/* Mood tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '32px', borderTop: `1px solid ${BR}` }}>
        {['Femininity', 'Grace', 'Quiet Strength', 'Radiance', 'Garden of Eden', 'Effortless Beauty', 'African Fashion'].map(t => (
          <span key={t} style={{ padding: '6px 16px', border: `1px solid ${BR}`, borderRadius: '100px', ...F, fontSize: '12px', color: MD }}>
            {t}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {lb !== null && <Lightbox images={EDEN_GALLERY} startIndex={lb} onClose={() => setLb(null)} />}
      </AnimatePresence>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function Featured() {
  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ background: BK, padding: '64px 48px 56px' }} className="page-padding">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <Link to="/" style={{ ...F, fontSize: '12px', color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = G }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>/</span>
            <span style={{ ...F, fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Featured</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Editorials & Events
              </p>
              <h1 style={{ ...SERIF, fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, color: W, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                Featured
              </h1>
            </div>
            <p style={{ ...F, fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '340px', lineHeight: 1.8, textAlign: 'right' }}>
              Runway moments, editorials, and curated stories from the STAAY world.
            </p>
          </div>
        </div>
      </div>

      {/* ── CONTENT LINE ── */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${G}, #D4A853, ${BK})` }} />

      {/* ── STORIES ── */}
      <div style={{ paddingTop: '80px' }}>
        <RITHSection />
        <EdenSection />
      </div>

      {/* ── FOOTER CTA ── */}
      <div style={{ background: LG, borderTop: `1px solid ${BR}`, padding: '80px 48px', textAlign: 'center' }} className="page-padding">
        <p style={{ ...F, fontSize: '11px', fontWeight: 600, color: G, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Stay Connected
        </p>
        <h3 style={{ ...SERIF, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: DK, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          More stories coming soon
        </h3>
        <p style={{ ...F, fontSize: '15px', fontWeight: 300, color: MD, marginBottom: '36px', maxWidth: '420px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Be first to know when new editorials, events, and collection stories drop.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop"
            style={{ background: G, color: W, padding: '14px 36px', ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '3px', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = DK }}
            onMouseLeave={e => { e.currentTarget.style.background = G }}>
            Shop All Collections
          </Link>
          <Link to="/"
            style={{ background: 'transparent', border: `1px solid ${BR}`, color: DK, padding: '14px 28px', ...F, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '3px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = DK }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BR }}>
            Back to Home
          </Link>
        </div>
      </div>

    </div>
  )
}
