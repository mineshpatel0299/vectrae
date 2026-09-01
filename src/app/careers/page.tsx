import type { Metadata } from "next";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersCulture from "@/components/sections/careers/CareersCulture";
import CareersOpenings from "@/components/sections/careers/CareersOpenings";
import CareersFAQ from "@/components/sections/careers/CareersFAQ";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Careers at Vectrae | Enterprise Technology Solutions",
  description:
    "Join Vectrae Infotech Pvt. Ltd. and build the AV, Networking, Data Center, End Computing, and Power solutions trusted by 2,300+ enterprises PAN-India. Explore open roles.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersCulture />
      <CareersOpenings />
      <CareersFAQ />
      <Footer />
    </>
  );
}
