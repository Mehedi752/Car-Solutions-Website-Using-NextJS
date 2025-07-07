import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";
import ServicesSection from "./components/ServicesSection";

export default function Home () {
  return (
    <div className='container mx-auto'>
      <Banner></Banner>
      <AboutUs></AboutUs>
      <ServicesSection></ServicesSection>
    </div>
  )
}
