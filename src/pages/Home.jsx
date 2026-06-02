import PromoPopup       from '../components/home/PromoPopup'
import Hero             from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Features         from '../components/home/Features'
import BrandBar         from '../components/home/BrandBar'
import Mission          from '../components/home/Mission'
import LatestProducts   from '../components/home/LatestProducts'

export default function Home() {
  return (
    <main>
      <PromoPopup />
      <Hero />
      <FeaturedProducts />
      <Features />
      <BrandBar />
      <Mission />
      <LatestProducts />
    </main>
  )
}
