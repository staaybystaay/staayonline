import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Auth from './pages/Auth'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/shop"  element={<Shop />} />
          <Route path="/cart"  element={<Cart />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}