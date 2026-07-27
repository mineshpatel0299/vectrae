import About from "@/components/sections/About";
import CoreValues from "@/components/sections/CoreValues";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Services from "@/components/sections/Services";
import TrustSignals from "@/components/sections/TrustSignals";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Blog from "@/components/sections/Blog";
import FootprintMap from "@/components/sections/FootprintMap";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <About />
      <WhyChooseUs />
      <ProductShowcase />
      <Services />
      <CoreValues />
      <Blog />
      <FootprintMap />
      <CTA />
      <Footer />
    </>
  );
}
