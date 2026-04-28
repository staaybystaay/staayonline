import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import Product from './pages/Product'
import Featured from './pages/Featured'
import Brand from './pages/Brand'

function AnnouncementBar() {
  return (
    <div style={{
      background: 'var(--accent)',
      padding: '9px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '24px',
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#0C0B09', fontWeight: 500,
        }}>
          Free shipping on orders over $200
        </span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '20px',
        flexWrap: 'wrap',
      }}>
        {/* ✅ FIX: All three <a> tags were missing their opening "<a" — restored below */}
        <a
          href="https://instagram.com/staaybystaay"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', letterSpacing: '0.12em',
            color: '#0C0B09', fontWeight: 400,
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
          IG: @staaybystaay
        </a>
        <span style={{ color: 'rgba(12,11,9,0.3)', fontSize: '10px' }}>|</span>
        <a
          href="https://tiktok.com/@staaybystaay"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', letterSpacing: '0.12em',
            color: '#0C0B09', fontWeight: 400,
          }}>
          TikTok: @staaybystaay
        </a>
        <span style={{ color: 'rgba(12,11,9,0.3)', fontSize: '10px' }}>|</span>
        <a
          href="https://wa.me/233503977985"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px', letterSpacing: '0.12em',
            color: '#0C0B09', fontWeight: 400,
          }}>
          WhatsApp: +233 50 397 7985
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnnouncementBar />
        <Navbar />
        <Routes>
          <Route path="/"            element={<Home />}    />
          <Route path="/shop"        element={<Shop />}    />
          <Route path="/cart"        element={<Cart />}    />
          <Route path="/login"       element={<Auth />}    />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/brand" element={<Brand />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}
