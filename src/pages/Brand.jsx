'use client'

import { useState, useEffect, useRef } from 'react'

const T = {
  gold: '#B8903A',
  goldPale: '#FBF7EF',
  bone: '#EDE8DE',
  ink: '#111111',
  charcoal: '#1E1E1E',
  warm: '#FAF8F5',
  off: '#F4F1EB',
  mid: '#6B6460',
  faint: '#9E9890',
  line: '#E5DFD4',
}

const SERIF = "'Cormorant Garamond', Georgia, serif"
const SANS = "'Outfit', sans-serif"

const values = [
  { n: '01', title: 'Intentional Design', body: 'Every seam, silhouette, and fabric choice is deliberate. We do not make filler pieces. Everything earns its place in your wardrobe and in your life.' },
  { n: '02', title: 'Made for African Women', body: 'Not adapted, not translated, designed from scratch for the bodies, lifestyles, and boldness of African women. You are not an afterthought.' },
  { n: '03', title: 'Softness is Strength', body: 'We build pieces that honour femininity in all its forms. You never have to choose between elegance and confidence - STAAY holds both.' },
  { n: '04', title: 'Community First', body: 'Our customers are not buyers. They are the first people we think about when we sketch, cut, and finish. STAAY is built by community, for community.' },
]

const stats = [
  { v: '16', l: 'Years of Craft' },
  { v: '2,400+', l: 'Pieces in Circulation' },
  { v: '50+', l: 'Countries Reached' },
  { v: '98%', l: 'Customer Satisfaction' },
]

const contacts = [
  { k: 'Email', v: 'info@staayonline.com', h: 'mailto:info@staayonline.com' },
  { k: 'WhatsApp', v: '+233 50 397 7985', h: 'https://wa.me/233503977985' },
  { k: 'Instagram', v: '@staaybystaay', h: 'https://instagram.com/staaybystaay' },
  { k: 'TikTok', v: '@staaybystaay', h: 'https://tiktok.com/@staaybystaay' },
  { k: 'Address', v: 'Nii Osabu Nsuta Lk. Street, Dzen Ayor Area, Adentan District, GD-137-2393, Ghana' },
]

function FontLoader() {
  useEffect(() => {
    if (document.getElementById('staay-fonts')) return
    const l = document.createElement('link')
    l.id = 'staay-fonts'
    l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap'
    document.head.appendChild(l)
  }, [])
  return null
}

function useIsMobile(bp = 780) {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`)
    setMobile(mq.matches)
    const h = e => setMobile(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [bp])

  return mobile
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true)
        obs.unobserve(el)
      }
    }, { threshold: 0.1 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const SectionLabel = ({ tag }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
    <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.gold, flexShrink: 0 }} />
    <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.gold }}>
      {tag}
    </span>
  </div>
)

const SH2 = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,3.8vw,48px)', fontWeight: 600, color: T.ink, lineHeight: 1.1, letterSpacing: '-.01em', ...style }}>
    {children}
  </h2>
)

function Nav() {
  const mobile = useIsMobile(520)

  return (
    <nav style={{
      background: T.warm,
      borderBottom: `1px solid ${T.line}`,
      padding: '0 clamp(20px,5vw,72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <span />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: T.mid, fontFamily: SANS }}>
        <a href="/" style={{ color: T.mid }}>Home</a>
        <span style={{ color: T.faint }}>/</span>
        <strong style={{ fontWeight: 500, color: T.ink }}>Our Brand</strong>
      </div>

      {!mobile && (
        <span style={{ fontFamily: SANS, fontSize: 11, color: T.faint, letterSpacing: '.06em' }}>
          Est. 2009 — Accra, Ghana
        </span>
      )}
    </nav>
  )
}

function Hero() {
  const mobile = useIsMobile(780)

  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      borderBottom: `1px solid ${T.line}`,
    }}>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: mobile ? 'auto' : 560,
        background: T.off,
      }}>
        <img
          src="/sefah.png"
          alt="Stacey Sefah, Founder of STAAY"
          style={{
            width: '100%',
            height: mobile ? '420px' : '100%',
            objectFit: mobile ? 'cover' : 'contain',
            objectPosition: 'top center',
            display: 'block',
            ...(mobile ? {} : {
              position: 'absolute',
              inset: 0,
              padding: 20,
              boxSizing: 'border-box',
            }),
          }}
          onError={e => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.style.background = 'linear-gradient(160deg,#3a2a10,#1a1409)'
          }}
        />

        <span style={{
          position: 'absolute',
          top: 24,
          left: 24,
          background: T.gold,
          color: '#fff',
          fontFamily: SANS,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          padding: '6px 16px',
          zIndex: 2,
        }}>
          Founded 2009
        </span>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: T.gold, zIndex: 2 }} />
      </div>

      <div style={{
        background: T.off,
        padding: 'clamp(32px,4vw,56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: mobile ? 'auto' : 560,
      }}>
        <div>
          <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.gold, marginBottom: 14 }}>
            Who We Are
          </p>

          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px,4.5vw,62px)', fontWeight: 600, lineHeight: 1.06, letterSpacing: '-.01em', color: T.ink, margin: '0 0 20px' }}>
            Designed for Women<br />Who Bloom
          </h1>

          <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: T.mid, maxWidth: 340 }}>
            A Ghanaian womenswear brand rooted in intention, craftsmanship, and grace built by a woman who understands what it means to come into your own.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: `1px solid ${T.line}`, marginTop: 32 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: T.gold,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: SERIF,
            fontSize: 18,
            fontWeight: 600,
            color: '#fff',
          }}>
            SS
          </div>

          <div>
            <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: T.ink }}>Stacey Sefah</p>
            <p style={{ fontFamily: SANS, fontSize: 11, color: T.faint, letterSpacing: '.04em', marginTop: 2 }}>Founder & Creative Director</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Manifesto() {
  return (
    <section style={{ background: T.charcoal, padding: 'clamp(56px,8vw,100px) clamp(24px,6vw,80px)' }}>
      <FadeUp style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 32, height: 2, background: T.gold, flexShrink: 0 }} />
          <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.gold }}>
            Our Manifesto
          </span>
        </div>

        <p style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3.2vw,36px)', fontWeight: 400, lineHeight: 1.5, color: '#E8E1D4', fontStyle: 'italic' }}>
          "Women were never meant to shrink. They were meant to bloom, to evolve, and most importantly —{' '}
          <span style={{ color: T.gold, fontStyle: 'normal' }}>to STAAY true to themselves.</span>"
        </p>
      </FadeUp>
    </section>
  )
}

function Story() {
  const mobile = useIsMobile(780)

  return (
    <section style={{ padding: 'clamp(56px,8vw,96px) clamp(24px,6vw,80px)', borderBottom: `1px solid ${T.line}` }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '280px 1fr',
        gap: mobile ? 32 : 72,
        alignItems: 'start',
      }}>
        <FadeUp style={mobile ? {} : { position: 'sticky', top: 88 }}>
          <SectionLabel tag="Our Story" />
          <SH2>Born from a Belief.<br />Built with Grace.</SH2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: T.mid }}>
              Founded by <strong style={{ fontWeight: 500, color: T.ink }}>Stacey Sefah</strong>, STAAY began long before the first collection was released. From a young age, fashion became Stacey's way of expressing herself in seasons where words often fell short.
            </p>

            <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: T.mid }}>
              Today, STAAY is a Ghanaian womenswear brand rooted in intention, craftsmanship, and grace. Every piece is thoughtfully designed for women who want to feel effortlessly put together.
            </p>

            <div style={{ borderLeft: `2px solid ${T.gold}`, paddingLeft: 20, margin: '4px 0' }}>
              <p style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: T.ink, lineHeight: 1.55 }}>
                "That realisation changed everything."
              </p>
            </div>

            <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: T.mid }}>
              STAAY creates pieces that are meant to move with you through every season of life. We believe true style is not about trends; it is about how a garment makes you feel.
            </p>

            <div style={{ background: T.goldPale, border: `1px solid ${T.bone}`, padding: 'clamp(20px,3vw,32px)', marginTop: 8 }}>
              {[
                'But beyond the fabric, STAAY is a love letter to women becoming.',
                'Women learning to take up space.',
                'Women embracing elegance without apology.',
                'Women choosing confidence, grace, and authenticity every single day.',
              ].map((line, i, arr) => (
                <p key={i} style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 400, fontStyle: 'italic', color: T.charcoal, lineHeight: 1.7, marginBottom: i < arr.length - 1 ? 8 : 0 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Values() {
  const [hov, setHov] = useState(null)
  const smallMobile = useIsMobile(600)

  return (
    <section style={{ background: T.off, padding: 'clamp(56px,8vw,96px) clamp(24px,6vw,80px)', borderBottom: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeUp style={{ marginBottom: 48 }}>
          <SectionLabel tag="What We Stand For" />
          <SH2>Our Values</SH2>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: smallMobile ? '1fr' : '1fr 1fr', border: `1px solid ${T.line}` }}>
          {values.map((v, i) => (
            <FadeUp key={v.n} delay={i * 0.07}>
              <div
                onMouseEnter={() => setHov(v.n)}
                onMouseLeave={() => setHov(null)}
                style={{
                  padding: 'clamp(24px,3.5vw,40px)',
                  borderTop: `3px solid ${hov === v.n ? T.gold : 'transparent'}`,
                  background: hov === v.n ? T.warm : 'transparent',
                  transition: 'all .22s',
                  borderRight: !smallMobile && i % 2 === 0 ? `1px solid ${T.line}` : 'none',
                  borderBottom: smallMobile ? i < values.length - 1 ? `1px solid ${T.line}` : 'none' : i < 2 ? `1px solid ${T.line}` : 'none',
                  height: '100%',
                }}
              >
                <p style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 700, color: T.gold, opacity: .22, lineHeight: 1, marginBottom: 14 }}>{v.n}</p>
                <h3 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 300, color: T.mid, lineHeight: 1.7 }}>{v.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const smallMobile = useIsMobile(600)

  return (
    <section style={{ background: T.ink, padding: 'clamp(40px,6vw,72px) clamp(24px,6vw,80px)' }}>
      <FadeUp>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: smallMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          border: '1px solid rgba(255,255,255,.08)',
        }}>
          {stats.map((s, i) => (
            <div key={s.l} style={{
              padding: 'clamp(24px,3.5vw,40px)',
              borderRight: smallMobile ? i % 2 === 0 ? '1px solid rgba(255,255,255,.08)' : 'none' : i < stats.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none',
              borderTop: smallMobile && i >= 2 ? '1px solid rgba(255,255,255,.08)' : 'none',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(34px,3.8vw,52px)', fontWeight: 600, color: T.gold, lineHeight: 1, marginBottom: 8 }}>{s.v}</p>
              <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,.4)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  )
}

function Contact() {
  const mobile = useIsMobile(780)

  return (
    <section style={{ background: T.warm, padding: 'clamp(56px,8vw,96px) clamp(24px,6vw,80px)' }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        border: `1px solid ${T.line}`,
      }}>
        <FadeUp style={{ padding: 'clamp(32px,4vw,56px)', borderBottom: mobile ? `1px solid ${T.line}` : 'none', borderRight: !mobile ? `1px solid ${T.line}` : 'none' }}>
          <SectionLabel tag="Ready to wear STAAY?" />
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.2vw,42px)', fontWeight: 600, color: T.ink, lineHeight: 1.1, margin: '12px 0 16px' }}>
            Shop the Collection
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 300, color: T.mid, lineHeight: 1.7, marginBottom: 32, maxWidth: 300 }}>
            Every piece in the SS 2025 collection is available now. Designed for the woman ready to show up fully as herself.
          </p>
          <a href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.ink, color: '#fff', padding: '14px 32px', fontFamily: SANS, fontSize: 13, fontWeight: 500, letterSpacing: '.05em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Shop Now →
          </a>
        </FadeUp>

        <FadeUp delay={0.1} style={{ padding: 'clamp(32px,4vw,56px)' }}>
          <SectionLabel tag="Get in Touch" />

          <div style={{ marginTop: 12 }}>
            {contacts.map(c => (
              <div key={c.k} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, padding: '16px 0', borderBottom: `1px solid ${T.line}` }}>
                <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: T.faint, letterSpacing: '.06em', textTransform: 'uppercase', flexShrink: 0 }}>
                  {c.k}
                </span>

                {c.h ? (
                  <a href={c.h} target={c.h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ fontFamily: SANS, fontSize: 14, fontWeight: 400, color: T.ink, textDecoration: 'none', textAlign: 'right', lineHeight: 1.5 }}>
                    {c.v}
                  </a>
                ) : (
                  <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 400, color: T.ink, textAlign: 'right', lineHeight: 1.5, maxWidth: 320 }}>
                    {c.v}
                  </span>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <div style={{ background: T.charcoal, padding: '20px clamp(20px,5vw,72px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
      <p style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(255,255,255,.28)' }}>© 2025 STAAY by Stacey Sefah. All rights reserved.</p>
      <p style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(255,255,255,.28)' }}>Accra, Ghana — Designed with intention.</p>
    </div>
  )
}

export default function Brand() {
  return (
    <div style={{ background: T.warm, minHeight: '100vh' }}>
      <FontLoader />
      <Nav />
      <Hero />
      <Manifesto />
      <Story />
      <Values />
      <Stats />
      <Contact />
      <Footer />
    </div>
  )
}
