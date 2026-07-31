import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── DESIGN TOKENS ───────────────────────────────────────────────
// BK/CHAR stay fixed — they're this editorial page's permanently-dark
// chrome (title bar, video sections, image-loading placeholders),
// the same treatment as the site's other full-bleed dark hero sections.
const BK    = '#0A0A0A'
const CHAR  = '#2D2D2D'
const W     = 'var(--white)'
const BG    = 'var(--bg)'
const CARD  = 'var(--bg-card)'
const CREAM = 'var(--bg-alt)'
const INK   = 'var(--text-strong)'
const GREY  = 'var(--text-muted)'
const FAINT = 'var(--text-faint)'
const LGREY = 'var(--border)'
const XLGREY= '#F2F2F0'

const F     = { fontFamily: "'Inter', sans-serif" }

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
    { src: '/featured/feature5.jpeg', caption: 'Running in the Halls at the British Museum' },
    { src: '/featured/feature6.jpeg', caption: 'Running in the Halls in The Great Court' },
    { src: '/featured/feature1.jpeg', caption: 'STAAY at the British Museum' },
    { src: '/featured/feature3.jpeg', caption: 'RITH, Running in the Halls' },
  ]

  return (
    <article style={{ marginBottom: '0' }}>

      {/* ── HERO: full-bleed video ── */}
      <div style={{ position: 'relative', height: 'clamp(500px, 75vh, 780px)', overflow: 'hidden' }}>
        <video
          src="/edenvid2.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.82) 100%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(32px,5vw,64px)' }}>
          {/* Label */}
          <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', display: 'block' }}>
            Runway · The British Museum × My Runway Group
          </span>

          <h2 style={{ ...F, fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', lineHeight: 0.95, marginBottom: '20px' }}>
            Running<br />in the Halls
          </h2>

       
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ background: BG }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(48px,7vw,96px) clamp(24px,5vw,64px)' }}>

          {/* Intro 2-col */}
          <div className="featured-intro-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'clamp(32px,5vw,80px)', alignItems: 'start', marginBottom: 'clamp(64px,8vw,120px)' }}>

            {/* Portrait */}
            <Tile src="/featured/feature8.jpeg" caption="STAAY · British Museum steps"
              style={{ aspectRatio: '3/4' }}
            />

            {/* Text block */}
            <div style={{ paddingTop: '8px' }}>
              <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREY, display: 'block', marginBottom: '24px' }}>
                Editorial
              </span>

              <h3 style={{ ...F, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '36px' }}>
                About R.I.T.H
              </h3>

              {/* Pull quote */}
              <blockquote style={{ margin: '0 0 48px', padding: '28px 0 28px 28px', borderLeft: `4px solid ${INK}` }}>
                <p style={{ ...F, fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 700, color: INK, lineHeight: 1.5, marginBottom: '14px' }}>
                  "Rather than viewing history at a distance, audiences are invited to move with the programme and experience the Museum as a living cultural space where past and present exist side by side."
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
              The Runway, click any image to enlarge
            </span>
            <span style={{ ...F, fontSize: '11px', color: FAINT }}>04 images</span>
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

// ─── MOMENTS SECTION ─────────────────────────────────────────────
function MomentsSection() {
  const clips = [
    { src: '/Nyahvid.mp4',   caption: 'NYAH Moments' },
    { src: '/featured1.mp4', caption: 'STAAY Runway'  },
  ]

  return (
    <article style={{ background: BK, padding: 'clamp(56px,8vw,96px) clamp(24px,5vw,64px)' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '16px' }}>
          In Motion
        </span>
        <h2 style={{ ...F, fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 'clamp(32px,5vw,56px)' }}>
          STAAY Moments
        </h2>

        <div className="featured-moments-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {clips.map(clip => (
            <div key={clip.src} style={{ position: 'relative', aspectRatio: '9/16', overflow: 'hidden', background: CHAR }}>
              <video
                src={clip.src}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px', background: 'linear-gradient(0deg, rgba(0,0,0,0.6), transparent)' }}>
                <span style={{ ...F, fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: W }}>
                  {clip.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

// ─── EDEN SECTION ────────────────────────────────────────────────
function EdenSection() {
  const gallery = [
    { src: '/featured/feature2.jpeg', caption: 'The Eden Collection by STAAY' },
    { src: '/featured/feature4.jpeg', caption: 'Eden Editorial'               },
  ]

  return (
    <article style={{ background: CREAM }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>

        {/* Text + second image — reversed col */}
        <div className="featured-eden-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,6fr) minmax(0,5fr)', gap: 'clamp(40px,6vw,96px)', alignItems: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>

          {/* Text */}
          <div>
            <p style={{ ...F, fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREY, marginBottom: '28px' }}>
              Inspired by the Garden of Eden
            </p>

            {/* Pull quote */}
            <blockquote style={{ margin: '0 0 52px', padding: '32px', background: CARD, borderTop: `4px solid ${INK}` }}>
              <p style={{ ...F, fontSize: 'clamp(19px, 2vw, 26px)', fontWeight: 700, color: INK, lineHeight: 1.45, marginBottom: '16px' }}>
                "The collection tells a story of a woman in her purest form, uncovered, unafraid, and blooming."
              </p>
              <cite style={{ ...F, fontSize: '11px', fontWeight: 700, color: GREY, letterSpacing: '0.12em', textTransform: 'uppercase', fontStyle: 'normal' }}>
                STAAY
              </cite>
            </blockquote>
          </div>

          {/* Second image */}
          <Tile src={gallery[1].src} caption={gallery[1].caption}
            style={{ aspectRatio: '3/4' }}
          />
        </div>

      </div>
    </article>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────
export default function Featured() {
  return (
    <div style={{ background: BG, minHeight: '100vh' }}>


      {/* ── PAGE TITLE BAR ── */}
      <div style={{ background: BK, padding: 'clamp(40px,5vw,72px) clamp(24px,5vw,64px) clamp(36px,4vw,60px)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span style={{ ...F, fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '12px' }}>
              Editorials &amp; Events
            </span>
            <h1 style={{ ...F, fontSize: 'clamp(44px, 7vw, 96px)', fontWeight: 800, color: W, letterSpacing: '-0.02em', lineHeight: 0.9, margin: 0 }}>
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
      <MomentsSection />
      <EdenSection />

    </div>
  )
}
