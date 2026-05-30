import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const heroFeature = {
  label: 'Runway — SS 2025',
  title: 'THE VOID SERIES',
  sub: 'Our first full runway presentation. 24 looks. One statement.',
  image: '/void.jpg',
  date: 'March 2025',
}

const runways = [
  { id: 1, season: 'SS 2025', title: 'Void Series — Full Show', looks: 24, image: '/feature.jpg', date: 'March 2025' },
  { id: 2, season: 'AW 2024', title: 'Shadow Collection', looks: 18, image: '/fashionlady6.jpg', date: 'October 2024' },
  { id: 3, season: 'SS 2024', title: 'Drift — Opening Show', looks: 16, image: '/prada.jpg', date: 'April 2024' },
]

const lookbook = [
  { id: 1, image: '/feature1.jpg', look: '01', title: 'Void Jacket + Cargo' },
  { id: 2, image: '/denim.jpg', look: '02', title: 'Denim Jeans Set' },
  { id: 3, image: '/feature2.jpg', look: '03', title: 'Phase Silk + Denim' },
  { id: 4, image: '/feature3.jpg', look: '04', title: 'Relic Coat Story' },
  { id: 5, image: '/africanshirt.jpg', look: '05', title: 'Noir Edit' },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fit=crop',
    look: '06',
    title: 'Monolith Coat',
  },
]

const pressFeatures = [
  {
    id: 1,
    outlet: 'GH Fashion Weekly',
    quote: 'Staay is redefining what Ghanaian fashion means on the global stage.',
    date: 'April 2025',
  },
  {
    id: 2,
    outlet: 'Accra Style',
    quote: 'The Void Series show was the most talked-about event of the season.',
    date: 'March 2025',
  },
  {
    id: 3,
    outlet: 'African Fashion Digest',
    quote: 'Bold, intentional, and built for a new generation of African women.',
    date: 'February 2025',
  },
]

const giftCardAmounts = ['Ghc 2,000', 'Ghc 5,000', 'Ghc 7,500', 'Ghc 10,000', 'Ghc 20,000']

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  )
}

function SectionLabel({ number, label }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <div />
      <p>{label}</p>
    </div>
  )
}

function FeaturedHero() {
  return (
    <header className="hero">
      <div className="container">
        <div className="topbar">
          <div>
            <Link to="/">Home</Link>
            <span>/</span>
            <p>Featured</p>
          </div>
          <p>SS 2025</p>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <div>
              <p className="eyebrow">{heroFeature.label}</p>
              <h1>{heroFeature.title}</h1>
              <p className="hero-sub">{heroFeature.sub}</p>
            </div>

            <div className="hero-actions">
              <span>{heroFeature.date}</span>
              <span>24 Looks</span>
              <Link to="/shop">Shop the Look</Link>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroFeature.image} alt={heroFeature.title} />
          </div>
        </div>
      </div>
    </header>
  )
}

function RunwayShows() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="section">
      <div className="container">
        <FadeUp>
          <SectionLabel number="01" label="Runway Shows" />
        </FadeUp>

        <FadeUp>
          <h2 className="section-title">FROM THE RUNWAY</h2>
        </FadeUp>

        <div className="runway-grid">
          {runways.map((show, i) => (
            <article
              key={show.id}
              className={`runway-card ${i === 0 ? 'featured-runway' : ''}`}
              onMouseEnter={() => setHovered(show.id)}
              onMouseLeave={() => setHovered(null)}>
              <img
                src={show.image}
                alt={show.title}
                style={{ transform: hovered === show.id ? 'scale(1.04)' : 'scale(1)' }}
              />
              <div className="overlay" />
              <span className="season-tag">{show.season}</span>

              <div className="runway-info">
                <p>{show.date}</p>
                <h3>{show.title}</h3>
                <span>{show.looks} looks</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Lookbook() {
  return (
    <section className="section">
      <div className="container">
        <FadeUp>
          <SectionLabel number="02" label="Lookbook" />
        </FadeUp>

        <div className="section-head">
          <h2 className="section-title">
            SS 2025<br />
            <span>THE LOOKS</span>
          </h2>
          <Link to="/shop">Shop All Pieces</Link>
        </div>

        <div className="lookbook-grid">
          {lookbook.map((look) => (
            <article key={look.id} className="look-card">
              <div className="look-image">
                <img src={look.image} alt={look.title} />
              </div>

              <div className="look-info">
                <p>
                  <span>{look.look}</span>
                  {look.title}
                </p>
                <Link to="/shop">Shop</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GiftCardSection() {
  return (
    <section className="gift-section">
      <div className="container">
        <FadeUp>
          <SectionLabel number="03" label="Gift Card" />
        </FadeUp>

        <div className="gift-layout">
          <div className="gift-image-wrap">
            <img src="/giftcard.jpeg" alt="STAAY Gift Card" />
          </div>

          <div className="gift-content">
            <p className="eyebrow">Now Available</p>

            <h2>
              STAAY<br />
              <span>GIFT CARD</span>
            </h2>

            <p className="gift-text">
              A refined way to gift choice, confidence, and timeless style. Perfect for birthdays,
              celebrations, wardrobe upgrades, and special moments.
            </p>

            <div className="gift-amounts">
              {giftCardAmounts.map((amount) => (
                <span key={amount}>{amount}</span>
              ))}
            </div>

            <div className="gift-notes">
              <div>
                <h4>Flexible Value</h4>
                <p>Choose from premium gift card amounts starting at Ghc 2,000.</p>
              </div>

              <div>
                <h4>Easy To Gift</h4>
                <p>A classy option for anyone who wants to let them choose their look.</p>
              </div>
            </div>

            <Link to="/shop" className="dark-btn">Get Gift Card</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Press() {
  return (
    <section className="section surface">
      <div className="container">
        <FadeUp>
          <SectionLabel number="04" label="Press" />
        </FadeUp>

        <h2 className="section-title">AS SEEN IN</h2>

        <div className="press-grid">
          {pressFeatures.map((item) => (
            <article key={item.id}>
              <h3>{item.outlet}</h3>
              <blockquote>"{item.quote}"</blockquote>
              <p>{item.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box">
          <div>
            <p className="eyebrow">Now Available</p>
            <h2>
              SHOP THE<br />
              <span>SS 2025</span><br />
              COLLECTION
            </h2>
          </div>

          <div className="cta-actions">
            <Link to="/shop" className="dark-btn">Shop Now</Link>
            <Link to="/shop" className="outline-btn">View Lookbook</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Featured() {
  return (
    <div className="featured-page">
      <StyleBlock />
      <FeaturedHero />
      <RunwayShows />
      <Lookbook />
      <GiftCardSection />
      <Press />
      <CtaBand />
    </div>
  )
}

function StyleBlock() {
  return (
    <style>{`
      .featured-page {
        background: var(--bg);
        min-height: 100vh;
        overflow-x: hidden;
      }

      .container {
        width: min(1200px, calc(100% - 40px));
        margin: 0 auto;
      }

      a {
        text-decoration: none;
      }

      .eyebrow {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: var(--accent);
        margin: 0 0 18px;
        font-weight: 500;
      }

      .section {
        padding: 72px 0;
        border-bottom: 1px solid var(--border);
      }

      .surface {
        background: var(--bg-surface);
      }

      .section-label {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 40px;
      }

      .section-label span {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 11px;
        color: var(--accent);
        letter-spacing: 0.14em;
        flex: 0 0 auto;
      }

      .section-label div {
        flex: 1;
        height: 1px;
        background: var(--border);
      }

      .section-label p {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: var(--text-faint);
        font-weight: 300;
        margin: 0;
        white-space: nowrap;
      }

      .section-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: clamp(38px, 6vw, 68px);
        color: var(--text);
        line-height: 0.9;
        letter-spacing: 0.01em;
        margin: 0 0 40px;
      }

      .section-title span,
      .gift-content h2 span,
      .cta-box h2 span {
        color: var(--accent);
      }

      .topbar {
        border-bottom: 1px solid var(--border);
        padding: 16px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .topbar div {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }

      .topbar a,
      .topbar p,
      .topbar span {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--text-faint);
        font-weight: 300;
        margin: 0;
      }

      .topbar div p {
        color: var(--accent);
      }

      .hero {
        border-bottom: 2px solid var(--text);
      }

      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 520px;
      }

      .hero-copy {
        border-right: 1px solid var(--border);
        padding: 52px 52px 52px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 40px;
      }

      .hero-copy h1 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: clamp(56px, 8vw, 100px);
        color: var(--text);
        line-height: 0.9;
        letter-spacing: 0.01em;
        margin: 0 0 28px;
      }

      .hero-sub {
        font-family: 'Fraunces', serif;
        font-style: italic;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.7;
        color: var(--text-muted);
        max-width: 380px;
        margin: 0;
      }

      .hero-actions {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
      }

      .hero-actions span,
      .hero-actions a {
        padding: 11px 18px;
        border: 1px solid var(--border);
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }

      .hero-actions span {
        color: var(--text-faint);
      }

      .hero-actions a {
        background: var(--accent);
        color: #0C0B09;
        border-color: var(--accent);
        font-weight: 700;
      }

      .hero-image {
        position: relative;
        overflow: hidden;
        min-height: 520px;
      }

      .hero-image img,
      .runway-card img,
      .look-image img,
      .gift-image-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .hero-image::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%);
      }

      .runway-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        border: 1px solid var(--border);
      }

      .runway-card {
        position: relative;
        min-height: 390px;
        overflow: hidden;
        border-right: 1px solid var(--border);
      }

      .runway-card:last-child {
        border-right: 0;
      }

      .featured-runway {
        min-height: 500px;
      }

      .runway-card img {
        position: absolute;
        inset: 0;
        transition: transform 0.7s ease;
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.15), transparent);
      }

      .season-tag {
        position: absolute;
        top: 16px;
        left: 16px;
        background: var(--accent);
        color: #0C0B09;
        padding: 5px 10px;
        font-family: 'Outfit', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .runway-info {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 22px;
      }

      .runway-info p,
      .runway-info span {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        color: rgba(255,255,255,0.55);
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin: 0;
      }

      .runway-info h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 30px;
        color: #fff;
        line-height: 1;
        letter-spacing: 0.04em;
        margin: 8px 0;
      }

      .section-head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 40px;
      }

      .section-head .section-title {
        margin-bottom: 0;
      }

      .section-head a {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border);
        padding-bottom: 4px;
        white-space: nowrap;
      }

      .lookbook-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        border: 1px solid var(--border);
        border-bottom: 0;
      }

      .look-card {
        border-right: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        min-width: 0;
      }

      .look-card:nth-child(3n) {
        border-right: 0;
      }

      .look-image {
        aspect-ratio: 3 / 4;
        overflow: hidden;
      }

      .look-image img {
        transition: transform 0.6s ease;
      }

      .look-card:hover .look-image img {
        transform: scale(1.04);
      }

      .look-info {
        padding: 15px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }

      .look-info p {
        font-family: 'Outfit', sans-serif;
        font-size: 11px;
        color: var(--text-muted);
        letter-spacing: 0.05em;
        font-weight: 300;
        margin: 0;
        min-width: 0;
      }

      .look-info span {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 12px;
        color: var(--accent);
        letter-spacing: 0.12em;
        margin-right: 10px;
      }

      .look-info a {
        font-family: 'Outfit', sans-serif;
        font-size: 9px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--text-faint);
        flex: 0 0 auto;
      }

      .gift-section {
        padding: 88px 0;
        border-bottom: 1px solid var(--border);
        background: linear-gradient(135deg, var(--bg), var(--bg-surface));
      }

      .gift-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(420px, 0.9fr);
        align-items: stretch;
        border: 2px solid var(--text);
        background: var(--bg);
      }

      .gift-image-wrap {
        width: 100%;
        min-height: 100%;
        aspect-ratio: 16 / 9;
        border-right: 1px solid var(--border);
        overflow: hidden;
      }

      .gift-image-wrap img {
        object-fit: cover;
        object-position: center;
      }

      .gift-content {
        padding: clamp(38px, 5vw, 60px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        position: relative;
        z-index: 2;
      }

      .gift-content h2,
      .cta-box h2 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: clamp(44px, 6vw, 78px);
        color: var(--text);
        line-height: 0.9;
        letter-spacing: 0.01em;
        margin: 0 0 24px;
      }

      .gift-text {
        font-family: 'Fraunces', serif;
        font-style: italic;
        font-weight: 300;
        font-size: 16px;
        line-height: 1.8;
        color: var(--text-muted);
        margin: 0 0 30px;
      }

      .gift-amounts {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border: 1px solid var(--border);
        margin-bottom: 30px;
      }

      .gift-amounts span {
        padding: 16px 8px;
        text-align: center;
        border-right: 1px solid var(--border);
        font-family: 'Bebas Neue', sans-serif;
        font-size: 21px;
        color: var(--text);
        letter-spacing: 0.05em;
        white-space: nowrap;
      }

      .gift-amounts span:last-child {
        border-right: 0;
      }

      .gift-notes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        margin-bottom: 30px;
      }

      .gift-notes div {
        border-top: 1px solid var(--border);
        padding-top: 16px;
      }

      .gift-notes h4 {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--accent);
        margin: 0 0 8px;
      }

      .gift-notes p {
        font-family: 'Outfit', sans-serif;
        font-size: 13px;
        line-height: 1.7;
        color: var(--text-muted);
        font-weight: 300;
        margin: 0;
      }

      .dark-btn,
      .outline-btn {
        display: inline-block;
        text-align: center;
        padding: 15px 38px;
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-weight: 700;
      }

      .dark-btn {
        background: var(--text);
        color: var(--bg);
      }

      .outline-btn {
        border: 1px solid var(--accent);
        color: var(--accent);
      }

      .press-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        border-top: 2px solid var(--text);
      }

      .press-grid article {
        padding: 34px;
        border-right: 1px solid var(--border);
      }

      .press-grid article:first-child {
        padding-left: 0;
      }

      .press-grid article:last-child {
        border-right: 0;
      }

      .press-grid h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 14px;
        color: var(--accent);
        letter-spacing: 0.16em;
        margin: 0 0 16px;
      }

      .press-grid blockquote {
        font-family: 'Fraunces', serif;
        font-style: italic;
        font-size: 18px;
        line-height: 1.65;
        color: var(--text);
        margin: 0 0 20px;
      }

      .press-grid p {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--text-faint);
        margin: 0;
      }

      .cta-section {
        padding: 96px 0;
      }

      .cta-box {
        border: 2px solid var(--text);
        padding: clamp(34px, 6vw, 64px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
      }

      .cta-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 220px;
      }

      @media (max-width: 1100px) {
        .gift-layout {
          grid-template-columns: 1fr;
        }

        .gift-image-wrap {
          border-right: 0;
          border-bottom: 1px solid var(--border);
          min-height: auto;
        }
      }

      @media (max-width: 980px) {
        .hero-grid {
          grid-template-columns: 1fr;
        }

        .hero-copy {
          border-right: 0;
          padding: 44px 0;
        }

        .hero-image {
          min-height: 420px;
          border-top: 1px solid var(--border);
        }

        .runway-grid {
          grid-template-columns: 1fr 1fr;
        }

        .featured-runway {
          grid-column: 1 / -1;
        }

        .press-grid {
          grid-template-columns: 1fr;
        }

        .press-grid article,
        .press-grid article:first-child {
          padding: 28px 0;
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }

        .press-grid article:last-child {
          border-bottom: 0;
        }

        .cta-box {
          align-items: flex-start;
          flex-direction: column;
        }

        .cta-actions {
          width: 100%;
        }
      }

      @media (max-width: 640px) {
        .container {
          width: min(100% - 28px, 1200px);
        }

        .section,
        .gift-section {
          padding: 56px 0;
        }

        .section-label {
          gap: 10px;
          margin-bottom: 28px;
        }

        .section-label p {
          font-size: 9px;
          letter-spacing: 0.2em;
        }

        .topbar {
          align-items: flex-start;
          flex-direction: column;
        }

        .hero-copy h1 {
          font-size: clamp(52px, 18vw, 76px);
        }

        .hero-actions {
          flex-direction: column;
          width: 100%;
        }

        .hero-actions span,
        .hero-actions a {
          width: 100%;
          box-sizing: border-box;
          text-align: center;
        }

        .hero-image {
          min-height: 360px;
        }

        .runway-grid {
          grid-template-columns: 1fr;
        }

        .lookbook-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .look-card,
        .look-card:nth-child(3n) {
          border-right: 1px solid var(--border);
        }

        .look-card:nth-child(2n) {
          border-right: 0;
        }

        .runway-card,
        .runway-card:last-child {
          border-right: 0;
        }

        .runway-card,
        .featured-runway {
          min-height: 390px;
        }

        .section-head {
          flex-direction: column;
          align-items: flex-start;
        }

        .look-info {
          padding: 12px 10px;
          align-items: flex-start;
          flex-direction: column;
          gap: 8px;
        }

        .look-info p {
          font-size: 10px;
          line-height: 1.4;
        }

        .gift-content {
          padding: 30px 20px;
        }

        .gift-content h2,
        .cta-box h2 {
          font-size: clamp(48px, 16vw, 68px);
        }

        .gift-amounts {
          grid-template-columns: 1fr;
        }

        .gift-amounts span {
          border-right: 0;
          border-bottom: 1px solid var(--border);
        }

        .gift-amounts span:last-child {
          border-bottom: 0;
        }

        .gift-notes {
          grid-template-columns: 1fr;
        }

        .dark-btn,
        .outline-btn {
          width: 100%;
          box-sizing: border-box;
        }

        .cta-section {
          padding: 64px 0;
        }

        .cta-box {
          padding: 28px 20px;
        }
      }
    `}</style>
  )
}
