import type { Metadata } from "next";
import PartnersHero from "@/components/sections/partners/PartnersHero";
import PartnersMarquee from "@/components/sections/partners/PartnersMarquee";
import PartnersCategories from "@/components/sections/partners/PartnersCategories";
import PartnersWhy from "@/components/sections/partners/PartnersWhy";
import PartnersCTA from "@/components/sections/partners/PartnersCTA";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "OEM Partners | Vectrae Enterprise Technology Solutions",
  description:
    "Vectrae partners with 43 leading OEMs and technology brands, including Cisco, Microsoft, Crestron, Dell, HP, and Palo Alto Networks, to deliver best-in-class AV, Networking, Data Center, End Computing, and Power solutions PAN-India.",
};

export default function OemPartnersPage() {
  return (
    <>
      <PartnersHero />
      <PartnersMarquee />
      <PartnersCategories />
      <PartnersWhy />
      <PartnersCTA />
      <Footer />
    </>
  );
}
