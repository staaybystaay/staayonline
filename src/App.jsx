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
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'


export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"            element={<Home />}     />
          <Route path="/shop"        element={<Shop />}     />
          <Route path="/cart"        element={<Cart />}     />
          <Route path="/login"       element={<Auth />}     />
          <Route path="/product/:id" element={<Product />}  />
          <Route path="/featured"    element={<Featured />} />
          <Route path="/brand"       element={<Brand />}    />
          <Route path="/terms"       element={<Terms />}    />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}
