import type { Metadata } from "next";
import ServicesHero from "@/components/sections/ServicesHero";
import ServiceCards from "@/components/sections/ServiceCards";
import ServiceProcess from "@/components/sections/ServiceProcess";
import TrustSignals from "@/components/sections/TrustSignals";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Solutions | Vectrae Enterprise Technology Solutions",
  description:
    "Explore Vectrae's full-spectrum enterprise technology solutions — Audio Visual, Networking & Security, Data Center, End Computing, IT Spares, Power, and Managed IT — delivered PAN-India.",
};

export default function SolutionsPage() {
  return (
    <>
      <ServicesHero />
      <div id="solutions">
        <ServiceCards />
      </div>
      <ServiceProcess />
      <ServiceFAQ />
      <TrustSignals />
      <CTA />
      <Footer />
    </>
  );
}
