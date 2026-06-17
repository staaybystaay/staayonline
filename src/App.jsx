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
import AuthCallback  from './pages/AuthCallback'
import ResetPassword from './pages/ResetPassword'
import Account from './pages/Account'
import Favorites from './pages/Favorites'
import Sale from './pages/Sale'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders    from './pages/AdminOrders'
import ScrollToTop from './components/ScrollToTop'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'




// import ContactSupport from './pages/ContactSupport'


export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
          <ScrollToTop />
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
          <Route path="/auth/callback"       element={<AuthCallback />}  />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/account" element={<Account />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/admin"        element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}
