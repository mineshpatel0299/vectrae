import Hero from "@/components/premium/Hero";
import LogoWaterfall from "@/components/premium/LogoWaterfall";
import About from "@/components/premium/About";
import Services from "@/components/premium/Services";
import Capabilities from "@/components/premium/Capabilities";
import Workspace from "@/components/sections/Workspace";
import WhyChooseUs from "@/components/premium/WhyChooseUs";
import FootprintMap from "@/components/premium/FootprintMap";
import CoreValues from "@/components/premium/CoreValues";
import Insights from "@/components/premium/Insights";
import CTA from "@/components/premium/CTA";
import Footer from "@/components/premium/Footer";

export default function PremiumHome() {
  return (
    <>
      <Hero />
      <LogoWaterfall />
      <About />
      <Services />
      <Capabilities />
      <Workspace />
      <WhyChooseUs />
      <FootprintMap />
      <CoreValues />
      <Insights />
      <CTA />
      <Footer />
    </>
  );
}
