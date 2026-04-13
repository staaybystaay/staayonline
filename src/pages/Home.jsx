import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { products } from '../data/products'
import useCartStore from '../store/useCartStore'

// ═══════════════════════════════════════════════════════
// HERO SLIDES — your data unchanged
// ═══════════════════════════════════════════════════════
const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=90&fit=crop',
    tag: 'SS 2025 — Footwear',
    lines: ['STAY', 'ON', 'LINE.'],
    italic: 1,
    sub: 'Every step is a statement.',
    cta: 'Shop Sneakers',
    accent: '#e63946',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1600&q=90&fit=crop',
    tag: 'SS 2025 — Tops',
    lines: ['WEAR', 'THE', 'VOID.'],
    italic: 2,
    sub: 'Oversized. Minimal. Yours.',
    cta: 'Shop Hoodies',
    accent: '#c8a44a',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1600&q=90&fit=crop',
    tag: 'SS 2025 — Bottoms',
    lines: ['NEW', 'DROP', '01.'],
    italic: 0,
    sub: 'Cargo culture refined.',
    cta: 'Shop Bottoms',
    accent: '#c8a44a',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=90&fit=crop',
    tag: 'SS 2025 — Collection',
    lines: ['THE', 'EDIT.', ''],
    italic: 1,
    sub: 'Curated for those who refuse definition.',
    cta: 'Shop All',
    accent: '#c8a44a',
  },
]

// ═══════════════════════════════════════════════════════
// FEATURED DROPS — your data unchanged
// ═══════════════════════════════════════════════════════
const featuredDrops = [
  {
    id: 'f1',
    label: 'AIR STAAY 01',
    price: '$320',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80&fit=crop',
    tag: 'New',
  },
  {
    id: 'f2',
    label: 'VOID HOODIE',
    price: '$195',
    image: 'https://images.unsplash.com/photo-1617952236317-0bd127407984?w=400&q=80&fit=crop',
    tag: 'Hot',
  },
  {
    id: 'f3',
    label: 'CARGO PANT 02',
    price: '$240',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80&fit=crop',
    tag: 'New',
  },
  {
    id: 'f4',
    label: 'PHANTOM JACKET',
    price: '$420',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80&fit=crop',
    tag: null,
  },
  {
    id: 'f5',
    label: 'STAAY RUNNER',
    price: '$280',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80&fit=crop',
    tag: 'Sale',
  },
]

// ═══════════════════════════════════════════════════════
// BADGE MAP
// ═══════════════════════════════════════════════════════
const badgeMap = {
  New:  { background: 'var(--badge-new-bg)',  color: 'var(--badge-new-fg)'  },
  Hot:  { background: 'var(--badge-hot-bg)',  color: 'var(--badge-hot-fg)', border: '1px solid var(--accent)' },
  Sale: { background: 'var(--badge-sale-bg)', color: 'var(--badge-sale-fg)' },
}

// ═══════════════════════════════════════════════════════
// THREE.JS — 360 PHOTO SPHERE
// ═══════════════════════════════════════════════════════
function PhotoSphere({ url, opacity = 1 }) {
  const texture = useTexture(url)
  const meshRef = useRef()

  texture.mapping    = THREE.EquirectangularReflectionMapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter  = THREE.LinearFilter
  texture.magFilter  = THREE.LinearFilter

  useFrame(({ clock }) => {
    if (meshRef.current)
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.018
  })

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[8, 80, 40]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        transparent
        opacity={opacity}
        toneMapped={false}
      />
    </mesh>
  )
}

// ═══════════════════════════════════════════════════════
// THREE.JS — CAMERA FOLLOWS MOUSE
// ═══════════════════════════════════════════════════════
function CameraRig() {
  const { camera } = useThree()
  const targetX    = useRef(0)
  const targetY    = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      targetX.current = (e.clientX / window.innerWidth  - 0.5) * 0.35
      targetY.current = (e.clientY / window.innerHeight - 0.5) * 0.18
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.rotation.y += ((-targetX.current) - camera.rotation.y) * 0.04
    camera.rotation.x += ((-targetY.current) - camera.rotation.x) * 0.04
  })

  return null
}

// ═══════════════════════════════════════════════════════
// THREE.JS — DARK VIGNETTE
// ═══════════════════════════════════════════════════════
function VignetteSphere() {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[7.8, 32, 16]} />
      <meshBasicMaterial
        color="#000000"
        side={THREE.BackSide}
        transparent
        opacity={0.48}
        depthWrite={false}
      />
    </mesh>
  )
}

// ═══════════════════════════════════════════════════════
// THREE.JS — CROSSFADE BETWEEN SLIDES
// ═══════════════════════════════════════════════════════
function CrossfadeScene({ currentUrl, prevUrl, fading }) {
  const [opacity, setOpacity] = useState(1)

  useFrame(() => {
    if (fading) setOpacity(o => Math.max(0, o - 0.035))
    else        setOpacity(o => Math.min(1, o + 0.035))
  })

  return (
    <>
      {prevUrl && fading && (
        <PhotoSphere url={prevUrl} opacity={opacity} />
      )}
      <PhotoSphere
        url={currentUrl}
        opacity={fading ? 1 - opacity : opacity}
      />
      <CameraRig />
    </>
  )
}

// ═══════════════════════════════════════════════════════
// SPLIT TEXT — your code unchanged
// ═══════════════════════════════════════════════════════
function SplitText({ text, delay = 0, italic = false, color = '#fff' }) {
  const chars = text.split('')
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.032,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            fontStyle: italic ? 'italic' : 'normal',
            fontWeight: italic ? 300 : 800,
            color,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [prev,    setPrev]    = useState(null)
  const [fading,  setFading]  = useState(false)
  const [paused,  setPaused]  = useState(false)
  const [reveal,  setReveal]  = useState(true)
  const { theme }             = useTheme()

  const slide = heroSlides[current]

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => advance(1), 7000)
    return () => clearInterval(id)
  }, [current, paused])

  const advance = (dir) => {
    const next = (current + dir + heroSlides.length) % heroSlides.length
    setPrev(current)
    setFading(true)
    setReveal(false)
    setTimeout(() => { setCurrent(next); setReveal(true) }, 300)
    setTimeout(() => { setFading(false); setPrev(null)  }, 1200)
  }

  const goTo = (i) => {
    if (i === current) return
    setPrev(current)
    setFading(true)
    setReveal(false)
    setTimeout(() => { setCurrent(i); setReveal(true) }, 300)
    setTimeout(() => { setFading(false); setPrev(null)  }, 1200)
  }

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        minHeight: '560px',
        overflow: 'hidden',
        background: '#000',
        cursor: 'crosshair',
      }}
    >

      {/* ── Three.js 360 sphere canvas ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 0.1], fov: 85 }}
          gl={{
            antialias: true,
            alpha: false,
            toneMapping: THREE.NoToneMapping,
          }}
          style={{ background: '#000' }}
        >
          <Suspense fallback={null}>
            <CrossfadeScene
              currentUrl={heroSlides[current].image}
              prevUrl={prev !== null ? heroSlides[prev].image : null}
              fading={fading}
            />
            <VignetteSphere />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Left gradient ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%)',
      }} />

      {/* ── Bottom gradient ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 40%)',
      }} />

      {/* ── Colored tint strip from slide accent ── */}
      <motion.div
        key={`tint-${slide.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.2 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at 75% 40%, ${slide.accent} 0%, transparent 65%)`,
        }}
      />

      {/* ── Oversized ghost word ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`ghost-${slide.id}`}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            right: '-2%', top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            fontFamily: "'Fraunces', serif",
            fontWeight: 800,
            fontSize: 'clamp(140px, 20vw, 280px)',
            lineHeight: 0.85,
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {slide.lines[0]}
        </motion.div>
      </AnimatePresence>

      {/* ── Text content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center',
        padding: '0 80px',
        maxWidth: '1200px',
        margin: '0 auto',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
      }}>
        {reveal && (
          <div style={{ maxWidth: '580px' }}>

            {/* Tag line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                display: 'flex', alignItems: 'center',
                gap: '12px', marginBottom: '20px',
              }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '28px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  display: 'block', height: '1px',
                  background: slide.accent, overflow: 'hidden',
                }}
              />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: slide.accent, fontWeight: 400,
              }}>
                {slide.tag}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(54px, 7.5vw, 100px)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
              overflow: 'hidden',
            }}>
              {slide.lines.filter(l => l).map((line, i) => (
                <div key={`${slide.id}-${i}`} style={{ overflow: 'hidden', display: 'block' }}>
                  <SplitText
                    text={line}
                    delay={0.15 + i * 0.1}
                    italic={i === slide.italic}
                    color={i === slide.italic ? slide.accent : '#ffffff'}
                  />
                </div>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: '16px', lineHeight: 1.65,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '36px',
              }}
            >
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68 }}
              style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
            >
              <Link
                to="/shop"
                style={{
                  background: '#ffffff', color: '#080808',
                  padding: '14px 36px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 500,
                  display: 'inline-block',
                  transition: 'all 0.3s',
                  border: '1px solid #ffffff',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = slide.accent
                  e.currentTarget.style.borderColor = slide.accent
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = '#ffffff'
                  e.currentTarget.style.borderColor = '#ffffff'
                  e.currentTarget.style.color = '#080808'
                }}
              >
                {slide.cta}
              </Link>
              <Link
                to="/shop"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.65)',
                  padding: '13px 36px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 300,
                  display: 'inline-block',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = slide.accent
                  e.currentTarget.style.color = slide.accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                }}
              >
                Lookbook
              </Link>
            </motion.div>

          </div>
        )}
      </div>

      {/* ── Prev / Next arrows ── */}
      {[
        { dir: -1, side: 'left',  pos: '24px' },
        { dir:  1, side: 'right', pos: '64px' },
      ].map(({ dir, side, pos }) => (
        <button
          key={side}
          onClick={() => advance(dir)}
          style={{
            position: 'absolute',
            [side]: pos,
            top: '50%', transform: 'translateY(-50%)',
            zIndex: 3,
            width: '44px', height: '44px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '16px',
            transition: 'all 0.25s',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background  = slide.accent
            e.currentTarget.style.borderColor = slide.accent
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background  = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
          }}
        >
          {dir === -1 ? '←' : '→'}
        </button>
      ))}

      {/* ── Slide counter top right ── */}
      <div style={{
        position: 'absolute', top: '32px', right: '40px',
        zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 800, fontSize: '18px',
              color: '#fff', lineHeight: 1,
            }}
          >
            {String(current + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', color: 'rgba(255,255,255,0.25)',
        }}>
          / {String(heroSlides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Dot indicators ── */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '80px',
        zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '20px',
      }}>
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '6px',
            }}
          >
            <motion.div
              animate={{
                width: i === current ? '32px' : '16px',
                background: i === current
                  ? slide.accent
                  : 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 0.4 }}
              style={{ height: '2px', borderRadius: '2px' }}
            />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '8px', letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: i === current
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(255,255,255,0.2)',
              transition: 'color 0.3s',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>

      {/* ── Progress bar ── */}
      {!paused && (
        <motion.div
          key={`${slide.id}-bar`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 7, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '2px',
            background: slide.accent,
            transformOrigin: 'left',
            zIndex: 3, opacity: 0.7,
          }}
        />
      )}

      {/* ── Vertical brand label ── */}
      <div style={{
        position: 'absolute', bottom: '120px', left: '20px',
        transform: 'rotate(-90deg)',
        transformOrigin: 'left center',
        zIndex: 3,
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '8px', letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
          whiteSpace: 'nowrap',
        }}>
          stayyonline.com — SS2025
        </span>
      </div>

    </section>
  )
}

// ═══════════════════════════════════════════════════════
// FEATURED DROPS STRIP — your code unchanged
// ═══════════════════════════════════════════════════════
function FeaturedDropsStrip() {
  const [hovered, setHovered] = useState(null)

  const badgeStyle = {
    New:  { background: 'var(--badge-new-bg)',  color: 'var(--badge-new-fg)'  },
    Hot:  { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' },
    Sale: { background: 'var(--badge-sale-bg)', color: 'var(--badge-sale-fg)' },
  }

  return (
    <section style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      padding: '40px 0',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              display: 'block', width: '20px', height: '1px',
              background: 'var(--accent)',
            }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              fontWeight: 400,
            }}>
              Just dropped
            </span>
          </div>
          <Link to="/shop" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-mid)', paddingBottom: '2px',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            See all →
          </Link>
        </div>

        <div
          className="fe-scrollbar"
          style={{
            display: 'flex', gap: '16px',
            overflowX: 'auto', paddingBottom: '4px',
          }}
        >
          {featuredDrops.map((drop, i) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(drop.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flexShrink: 0, width: '200px',
                cursor: 'pointer',
                transition: 'transform 0.35s',
                transform: hovered === drop.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <div style={{
                position: 'relative', width: '200px', height: '220px',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                border: `1px solid ${hovered === drop.id ? 'var(--border-mid)' : 'var(--border)'}`,
                transition: 'border-color 0.3s',
              }}>
                <img
                  src={drop.image} alt={drop.label}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.65s',
                    transform: hovered === drop.id ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
                {drop.tag && (
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    padding: '3px 8px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '9px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 500,
                    ...badgeStyle[drop.tag],
                  }}>
                    {drop.tag}
                  </span>
                )}
              </div>
              <div style={{ padding: '10px 0' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.1em',
                  color: 'var(--text)', fontWeight: 500,
                  marginBottom: '3px',
                }}>
                  {drop.label}
                </p>
                <p style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic', fontSize: '15px',
                  color: 'var(--accent)',
                }}>
                  {drop.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// MARQUEE — your code unchanged
// ═══════════════════════════════════════════════════════
function EditorialMarquee() {
  const words = [
    'STAYYONLINE', '✦', 'SS 2025', '✦',
    'NEW COLLECTION', '✦', 'WEAR THE VOID', '✦',
    'STAYYONLINE', '✦', 'SS 2025', '✦',
  ]
  return (
    <div style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0', overflow: 'hidden',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex', gap: '40px',
          whiteSpace: 'nowrap', width: 'max-content',
        }}
      >
        {[...words, ...words].map((word, i) => (
          <span key={i} style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500, fontSize: '11px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: word === '✦' ? 'var(--accent)' : 'var(--text-faint)',
          }}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// CATEGORIES — your code unchanged
// ═══════════════════════════════════════════════════════
const categoryData = [
  { label: 'All',     icon: '◎' },
  { label: 'Tops',    icon: '◈' },
  { label: 'Bottoms', icon: '▣' },
  { label: 'Jackets', icon: '◉' },
  { label: 'Coats',   icon: '◍' },
  { label: 'Dresses', icon: '◆' },
  { label: 'Shoes',   icon: '◎' },
]

function CategoriesSection({ active, setActive }) {
  const { theme } = useTheme()
  const isLight   = theme === 'light'

  return (
    <section style={{
      background: 'var(--bg)',
      padding: '72px 0 52px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: '36px',
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '10px', fontWeight: 400,
            }}>
              Browse by
            </p>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontWeight: 800,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em',
            }}>
              Categories
            </h2>
          </div>
          <Link to="/shop" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
            transition: 'color 0.22s, border-color 0.22s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderBottomColor = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderBottomColor = 'var(--border-mid)'
            }}
          >
            View All →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
        >
          {categoryData.map(cat => {
            const isActive = active === cat.label
            return (
              <motion.button
                key={cat.label}
                onClick={() => setActive(cat.label)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '9px 18px',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-mid)'}`,
                  color: isActive
                    ? (isLight ? '#fff' : '#080808')
                    : 'var(--text-muted)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px', letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 500 : 300,
                  cursor: 'pointer', transition: 'all 0.22s',
                }}
              >
                <span style={{ fontSize: '11px' }}>{cat.icon}</span>
                {cat.label}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// PRODUCT CARD — your code unchanged
// ═══════════════════════════════════════════════════════
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-mid)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.4s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow)' : 'none',
      }}
    >
      <div style={{
        position: 'relative', aspectRatio: '3/4',
        overflow: 'hidden', background: 'var(--bg-surface)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: '11px', color: 'var(--text-faint)',
          }}>
            {product.category}
          </span>
        </div>
        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.65s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'flex-end', padding: '14px',
        }}>
          <button
            onClick={e => { e.stopPropagation(); addItem(product) }}
            style={{
              width: '100%', background: 'var(--accent)',
              color: '#fff', border: 'none', padding: '11px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 500,
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.target.style.opacity = '0.85' }}
            onMouseLeave={e => { e.target.style.opacity = '1' }}
          >
            Add to Bag
          </button>
        </div>
        {product.badge && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '3px 9px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 500,
            ...badgeMap[product.badge],
          }}>
            {product.badge}
          </span>
        )}
        <button style={{
          position: 'absolute', top: '12px', right: '12px',
          width: '30px', height: '30px',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '13px',
          color: 'var(--text-muted)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          ♡
        </button>
      </div>

      <div style={{ padding: '14px 16px' }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '9px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-faint)',
          marginBottom: '5px', fontWeight: 300,
        }}>
          {product.category}
        </p>
        <h3 style={{
          fontFamily: "'Fraunces', serif", fontWeight: 700,
          fontSize: '14px', color: 'var(--text)',
          marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.3,
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic', fontSize: '17px', color: 'var(--accent)',
          }}>
            ${product.price}
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.1em',
          }}>
            In stock
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// PRODUCT GRID — your code unchanged
// ═══════════════════════════════════════════════════════
function ProductGridSection({ activeCategory }) {
  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section style={{ background: 'var(--bg)', padding: '72px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: '36px',
          }}
        >
          <div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '10px', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '10px', fontWeight: 400,
            }}>
              Featured drops
            </p>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontWeight: 800,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em',
            }}>
              New Arrivals
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', color: 'var(--text-faint)',
            }}>
              {filtered.length} items
            </span>
            <Link to="/shop" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-mid)', paddingBottom: '3px',
              transition: 'color 0.22s',
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-muted)' }}
            >
              Shop All →
            </Link>
          </div>
        </motion.div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
        }}>
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// EDITORIAL SPLIT — your code unchanged
// ═══════════════════════════════════════════════════════
function EditorialSplit() {
  const { theme } = useTheme()
  const isLight   = theme === 'light'

  return (
    <section style={{ background: 'var(--bg)', padding: '0 0 96px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', height: '440px', overflow: 'hidden' }}
          >
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop"
              alt="New Release"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%)',
            }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block',
              }}>
                New Release
              </span>
              <h3 style={{
                fontFamily: "'Fraunces', serif", fontWeight: 800,
                fontSize: '26px', color: '#F2EEE6',
                lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '14px',
              }}>
                Void Series<br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>Drop 01</em>
              </h3>
              <Link to="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px',
              }}>
                Discover the collection →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ position: 'relative', height: '440px', overflow: 'hidden' }}
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop"
              alt="Coming Soon"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block', filter: 'grayscale(30%)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%)',
              borderLeft: '3px solid var(--accent)',
            }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent)',
                marginBottom: '10px', display: 'block',
              }}>
                Coming soon —
              </span>
              <h3 style={{
                fontFamily: "'Fraunces', serif", fontWeight: 800,
                fontSize: '26px', color: '#F2EEE6',
                lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px',
              }}>
                Next drop<br />
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>is coming.</em>
              </h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                {[{ v: '04', l: 'Days' }, { v: '16', l: 'Hours' }, { v: '38', l: 'Min' }].map((t, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: "'Fraunces', serif", fontWeight: 800,
                      fontSize: '24px', color: 'var(--accent)', lineHeight: 1,
                    }}>
                      {t.v}
                    </div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '9px', letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,238,230,0.4)', marginTop: '4px',
                    }}>
                      {t.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <HeroSection />
      <FeaturedDropsStrip />
      <EditorialMarquee />
      <CategoriesSection active={activeCategory} setActive={setActiveCategory} />
      <ProductGridSection activeCategory={activeCategory} />
      <EditorialSplit />
    </main>
  )
}