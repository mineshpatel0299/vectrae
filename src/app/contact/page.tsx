import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact Vectrae | Enterprise Technology Consultation",
  description:
    "Talk to a Vectrae expert about AV, networking, data center, end computing, or power solutions. PAN-India delivery, we respond within 4 business hours.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <Footer />
    </>
  );
}
