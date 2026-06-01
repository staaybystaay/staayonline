import PromoPopup       from '../components/home/PromoPopup'
import Hero             from '../components/home/Hero'
import BrandCollections from '../components/home/BrandCollections'
import JustDropped      from '../components/home/JustDropped'

export default function Home() {
  return (
    <main>
      <PromoPopup />
      <Hero />
      <BrandCollections />
      <JustDropped />
    </main>
  )
}
