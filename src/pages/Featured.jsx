import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const BK    = '#0A0A0A'
const W     = '#FFFFFF'
const CREAM = '#FAF9F7'
const INK   = '#1C1C1C'
const CHAR  = '#2D2D2D'
const GREY  = '#5A5A5A'
const LGREY = '#E5E5E5'
const XLGREY= '#F2F2F0'

// Per-story accent colors — no gold carpet everywhere
const TERRA  = '#C4673A'   // terracotta  — RITH / runway
const SAGE   = '#3D5A47'   // forest sage — Eden Collection
const SLATE  = '#3A4A5C'   // slate blue  — editorial labels

const F     = { fontFamily: "'Inter', sans-serif" }
const SERIF = { fontFamily: "'Georgia', 'Times New Roman', serif" }

// ─── LIGHTBOX ────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <button onClick={onClose}
        style={{ position: 'absolute', top: '24px', right: '28px', background: 'none', border: 'none', color: W, fontSize: '32px', cursor: 'pointer', lineHeight: 1, opacity: 0.7 }}>×</button>

      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length) }}
          style={{ position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: W, width: '52px', height: '52px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
      )}

      <motion.img key={idx} src={images[idx].src} alt={images[idx].caption || ''}
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', userSelect: 'none' }} />

      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length) }}
          style={{ position: 'absolute', right: '24px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: W, width: '52px', height: '52px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
      )}

      <p style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', ...F, fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
        {images[idx].caption} &nbsp;·&nbsp; {idx + 1} / {images.length}
      </p>
    </motion.div>
  )
}

// ─── ZOOMABLE TILE ───────────────────────────────────────────────
function Tile({ src, caption, style = {}, imgStyle = {} }) {
  const [lb, setLb] = useState(false)
  return (
    <>
      <div onClick={() => setLb(true)} style={{ overflow: 'hidden', cursor: 'zoom-in', background: CHAR, ...style }}>
        <img src={src} alt={caption || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.55s cubic-bezier(.25,.46,.45,.94)', ...imgStyle }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        />
      </div>
      <AnimatePresence>
        {lb && <Lightbox images={[{ src, caption }]} startIndex={0} onClose={() => setLb(false)} />}
      </AnimatePresence>
    </>
  )
}

// ─── RITH SECTION ────────────────────────────────────────────────
function RITHSection() {
  const [lb, setLb] = useState(null)
  const runway = [
    { src: '/featured/feature5.jpeg', caption: 'Running in the Halls — British Museum' },
    { src: '/featured/feature6.jpeg', caption: 'Running in the Halls — The Great Court' },
    { src: '/featured/feature1.jpeg', caption: 'STAAY at the British Museum' },
    { src: '/featured/feature3.jpeg', caption: 'RITH — Running in the Halls' },
  ]

  return (
    <article style={{ marginBottom: '0' }}>

      {/* ── HERO: full-bleed crowd shot ── */}
      <div style={{ position: 'relative', height: 'clamp(500px, 75vh, 780px)', overflow: 'hidden' }}>
        <img src="/featured/feature6.jpeg" alt="Running in the Halls — British Museum"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.82) 100%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(32px,5vw,64px)' }}>
          {/* Label */}
          <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: TERRA, marginBottom: '16px', display: 'block' }}>
            Runway · The British Museum × My Runway Group
          </span>

          <h2 style={{ ...SERIF, fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 700, color: W, letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '20px' }}>
            Running<br />in the Halls
          </h2>

          <p style={{ ...F, fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 500, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em', maxWidth: '480px', lineHeight: 1.7 }}>
            Friday, 17th April &nbsp;·&nbsp; The British Museum, London &nbsp;·&nbsp; 5:30 – 8:30 pm
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ background: W }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(48px,7vw,96px) clamp(24px,5vw,64px)' }}>

          {/* Intro 2-col */}
          <div className="featured-intro-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'clamp(32px,5vw,80px)', alignItems: 'start', marginBottom: 'clamp(64px,8vw,120px)' }}>

            {/* Portrait */}
            <Tile src="/featured/feature8.jpeg" caption="STAAY · British Museum steps"
              style={{ aspectRatio: '3/4' }}
            />

            {/* Text block */}
            <div style={{ paddingTop: '8px' }}>
              <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SLATE, display: 'block', marginBottom: '24px' }}>
                Editorial
              </span>

              <h3 style={{ ...SERIF, fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: INK, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '36px' }}>
                About R.I.T.H
              </h3>

              <p style={{ ...F, fontSize: '16px', fontWeight: 500, color: CHAR, lineHeight: 1.85, marginBottom: '22px' }}>
                As part of the British Museum's Young People's Lates programme, <em>Running in the Halls</em> invited audiences to encounter the Museum in an entirely new way — bodies moving through galleries, ideas crossing centuries.
              </p>

              <p style={{ ...F, fontSize: '16px', fontWeight: 500, color: CHAR, lineHeight: 1.85, marginBottom: '22px' }}>
                Curated by My Runway Group — who work to amplify underrepresented voices and champion emerging creatives — the evening brought together DJs, live performance, visual interventions and interactive workshops responding directly to the Museum's architecture and permanent collection.
              </p>

              <p style={{ ...F, fontSize: '16px', fontWeight: 500, color: CHAR, lineHeight: 1.85, marginBottom: '48px' }}>
                Ancestral memory met present-day expression. Contemporary diasporic voices were placed deliberately within one of the world's most recognised cultural institutions — not as guests, but as inheritors.
              </p>

              {/* Pull quote */}
              <blockquote style={{ margin: '0 0 48px', padding: '28px 0 28px 28px', borderLeft: `4px solid ${TERRA}` }}>
                <p style={{ ...SERIF, fontSize: 'clamp(18px, 2vw, 24px)', fontStyle: 'italic', color: INK, lineHeight: 1.55, marginBottom: '14px' }}>
                  "Rather than viewing history at a distance, audiences are invited to move with the programme — to experience the Museum as a living cultural space where past and present exist side by side."
                </p>
                <cite style={{ ...F, fontSize: '11px', fontWeight: 700, color: GREY, letterSpacing: '0.1em', textTransform: 'uppercase', fontStyle: 'normal' }}>
                  My Runway Group
                </cite>
              </blockquote>
            </div>
          </div>

          {/* ── RUNWAY GALLERY ── */}
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${LGREY}`, paddingTop: '28px' }}>
            <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREY }}>
              The Runway — click any image to enlarge
            </span>
            <span style={{ ...F, fontSize: '11px', color: LGREY }}>04 images</span>
          </div>

          {/* Asymmetric 3-col editorial grid */}
          <div className="featured-runway-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '8px' }}>
            <Tile src={runway[0].src} caption={runway[0].caption} style={{ gridColumn: '1', gridRow: '1', aspectRatio: '4/5' }} />
            <Tile src={runway[1].src} caption={runway[1].caption} style={{ gridColumn: '2', gridRow: '1', aspectRatio: '4/5' }} />
            <Tile src={runway[2].src} caption={runway[2].caption} style={{ gridColumn: '3', gridRow: '1 / 3', minHeight: '500px' }} />
            <Tile src={runway[3].src} caption={runway[3].caption} style={{ gridColumn: '1 / 3', gridRow: '2', aspectRatio: '16/8' }} />
          </div>

        </div>
      </div>

      <AnimatePresence>
        {lb !== null && <Lightbox images={runway} startIndex={lb} onClose={() => setLb(null)} />}
      </AnimatePresence>
    </article>
  )
}

// ─── EDEN SECTION ────────────────────────────────────────────────
function EdenSection() {
  const [lb, setLb] = useState(null)
  const gallery = [
    { src: '/featured/feature2.jpeg', caption: 'The Eden Collection — STAAY' },
    { src: '/featured/feature4.jpeg', caption: 'Eden Editorial'               },
  ]

  return (
    <article style={{ background: CREAM }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>

        {/* Section label bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 'clamp(48px,6vw,80px)' }}>
          <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SAGE }}>
            Collection · 2025
          </span>
          <div style={{ flex: 1, height: '1px', background: LGREY }} />
          <span style={{ ...F, fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREY }}>
            STAAY
          </span>
        </div>

        {/* Big headline */}
        <h2 style={{ ...SERIF, fontSize: 'clamp(52px, 9vw, 120px)', fontWeight: 700, color: INK, letterSpacing: '-0.035em', lineHeight: 0.92, marginBottom: 'clamp(48px,7vw,96px)' }}>
          The Eden<br />Collection
        </h2>

        {/* Full-bleed hero image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '21/9', marginBottom: 'clamp(48px,6vw,80px)', cursor: 'zoom-in' }}
          onClick={() => setLb(0)}>
          <img src={gallery[0].src} alt={gallery[0].caption}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.6s cubic-bezier(.25,.46,.45,.94)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          />
          <div style={{ position: 'absolute', bottom: '24px', right: '28px', background: 'rgba(0,0,0,0.55)', padding: '8px 16px' }}>
            <span style={{ ...F, fontSize: '10px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              The Eden Collection
            </span>
          </div>
        </div>

        {/* Text + second image — reversed col */}
        <div className="featured-eden-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,6fr) minmax(0,5fr)', gap: 'clamp(40px,6vw,96px)', alignItems: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>

          {/* Text */}
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SAGE, marginBottom: '28px' }}>
              Inspired by the Garden of Eden
            </p>

            <p style={{ ...F, fontSize: 'clamp(16px, 1.6vw, 19px)', fontWeight: 500, color: CHAR, lineHeight: 1.8, marginBottom: '24px' }}>
              The Eden Collection is rooted in the beauty and purity of the Garden of Eden — a place symbolic of life, innocence, abundance, and divine harmony.
            </p>

            <p style={{ ...F, fontSize: 'clamp(16px, 1.6vw, 19px)', fontWeight: 500, color: CHAR, lineHeight: 1.8, marginBottom: '24px' }}>
              It reflects a return to the beginning. Femininity is effortless here. Confidence is natural. Beauty exists without apology or limitation — each piece embodies grace, softness, and quiet strength.
            </p>

            <p style={{ ...F, fontSize: 'clamp(16px, 1.6vw, 19px)', fontWeight: 500, color: CHAR, lineHeight: 1.8, marginBottom: '48px' }}>
              The collection captures the feeling of being fully seen, fully present, and unapologetically radiant. An Eden for the modern African woman.
            </p>

            {/* Pull quote */}
            <blockquote style={{ margin: '0 0 52px', padding: '32px', background: W, borderTop: `4px solid ${SAGE}` }}>
              <p style={{ ...SERIF, fontSize: 'clamp(20px, 2.2vw, 28px)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '16px' }}>
                "The collection tells a story of a woman in her purest form — uncovered, unafraid, and blooming."
              </p>
              <cite style={{ ...F, fontSize: '11px', fontWeight: 700, color: SAGE, letterSpacing: '0.12em', textTransform: 'uppercase', fontStyle: 'normal' }}>
                STAAY
              </cite>
            </blockquote>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/shop"
                style={{ background: INK, color: W, padding: '16px 40px', ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.25s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = SAGE }}
                onMouseLeave={e => { e.currentTarget.style.background = INK }}>
                Shop the Collection
              </Link>
              <Link to="/shop"
                style={{ background: 'transparent', border: `1.5px solid ${LGREY}`, color: INK, padding: '16px 32px', ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = INK }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = LGREY }}>
                Explore More
              </Link>
            </div>
          </div>

          {/* Second image */}
          <Tile src={gallery[1].src} caption={gallery[1].caption}
            style={{ aspectRatio: '3/4' }}
          />
        </div>

        {/* Mood keywords */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Femininity', 'Grace', 'Quiet Strength', 'Radiance', 'Garden of Eden', 'Effortless Beauty', 'African Fashion', 'Womenswear'].map(t => (
            <span key={t} style={{ padding: '8px 18px', border: `1px solid ${LGREY}`, ...F, fontSize: '11px', fontWeight: 500, color: GREY, letterSpacing: '0.04em' }}>
              {t}
            </span>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {lb !== null && <Lightbox images={gallery} startIndex={lb} onClose={() => setLb(null)} />}
      </AnimatePresence>
    </article>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function Featured() {
  return (
    <div style={{ background: W, minHeight: '100vh' }}>

      {/* ── BANNER SLOT — upload your image here ── */}
      {/* Replace the src below with your banner image path, e.g. /featured/banner.jpg */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: BK }}>
        <img
          src="/featured/feature8.png"
          alt="STAAY Featured"
          style={{ width: '100%', display: 'block', maxHeight: '90vh', objectFit: 'cover' }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />

        {/* Overlay breadcrumb — shows on top of banner or alone if no banner yet */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '28px clamp(24px,5vw,64px)', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
          <Link to="/" style={{ ...F, fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = W }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>/</span>
          <span style={{ ...F, fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em' }}>Featured</span>
        </div>
      </div>

      {/* ── PAGE TITLE BAR ── */}
      <div style={{ background: BK, padding: 'clamp(40px,5vw,72px) clamp(24px,5vw,64px) clamp(36px,4vw,60px)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '12px' }}>
              Editorials &amp; Events
            </span>
            <h1 style={{ ...SERIF, fontSize: 'clamp(52px, 8vw, 110px)', fontWeight: 700, color: W, letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0 }}>
              Featured
            </h1>
          </div>
          <p style={{ ...F, fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', maxWidth: '360px', lineHeight: 1.8 }}>
            Runway moments, editorials, and curated stories from the STAAY world.
          </p>
        </div>
      </div>

      {/* ── STORIES ── */}
      <RITHSection />
      <EdenSection />

      {/* ── FOOTER CTA ── */}
      <div style={{ background: BK, padding: 'clamp(72px,8vw,120px) clamp(24px,5vw,64px)', textAlign: 'center' }}>
        <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '20px' }}>
          Stay Connected
        </span>
        <h3 style={{ ...SERIF, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: W, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '20px' }}>
          More stories<br />coming soon
        </h3>
        <p style={{ ...F, fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginBottom: '44px', maxWidth: '400px', margin: '0 auto 44px', lineHeight: 1.8 }}>
          Be first to know when new editorials, events, and collection stories drop.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop"
            style={{ background: W, color: BK, padding: '16px 44px', ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.2s', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
            Shop All Collections
          </Link>
          <Link to="/"
            style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', padding: '16px 36px', ...F, fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = W; e.currentTarget.style.color = W }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
            Back to Home
          </Link>
        </div>
      </div>

    </div>
  )
}
