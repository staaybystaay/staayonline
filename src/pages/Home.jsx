import PromoPopup       from '../components/home/PromoPopup'
import Hero             from '../components/home/Hero'
import FindYourFit      from '../components/home/FindYourFit'
import EditorialBanner  from '../components/home/EditorialBanner'
import DiscoverProducts from '../components/home/DiscoverProducts'
// import CollectionGrid   from '../components/home/CollectionGrid'

export default function Home() {
  return (
    <main style={{ background: '#fff' }}>
      <PromoPopup />
      <Hero />
      <FindYourFit />
      <EditorialBanner />
      <DiscoverProducts />
      {/* <CollectionGrid /> */}
    </main>
  )
}
