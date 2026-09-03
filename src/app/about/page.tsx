import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutImpact from "@/components/sections/about/AboutImpact";
import AboutCapabilities from "@/components/sections/about/AboutCapabilities";
// import AboutTrust from "@/components/sections/about/AboutTrust";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import AboutVision from "@/components/sections/about/AboutVision";
import AboutMission from "@/components/sections/about/AboutMission";
import AboutLeadership from "@/components/sections/about/AboutLeadership";
import AboutCertifications from "@/components/sections/about/AboutCertifications";
import AboutGallery from "@/components/sections/about/AboutGallery";

export const metadata: Metadata = {
  title: "About Vectrae | Enterprise Technology Solutions",
  description:
    "Vectrae Infotech Pvt. Ltd. is a full-spectrum enterprise technology solutions provider headquartered in New Delhi, India, delivering AV, Networking, Data Center, End Computing, and Power solutions to 2,300+ enterprises PAN-India.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutImpact />
      <AboutVision />
      <AboutCapabilities />
      <AboutMission />
      <AboutLeadership />
      <AboutCertifications />
      <AboutGallery />
      {/* <AboutTrust /> */}
      <CTA />
      <Footer />
    </>
  );
}
