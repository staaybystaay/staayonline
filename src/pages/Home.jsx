import PromoPopup    from '../components/home/PromoPopup'
import Hero          from '../components/home/Hero'
import NewIn         from '../components/home/NewIn'
import Collections   from '../components/home/Collections'
import Mission       from '../components/home/Mission'
import LatestProducts from '../components/home/LatestProducts'

export default function Home() {
  return (
    <main>
      <PromoPopup />
      <Hero />
      <NewIn />
      <Collections />
      <Mission />
      <LatestProducts />
    </main>
  )
}
