import Image from "next/image";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { clientLogos } from "@/data/clients";

export default function TrustSignals() {
  const clientItems = clientLogos.map(({ name, logo }) => (
    <div
      key={name}
      className="flex h-16 w-32 items-center justify-center px-2 grayscale transition duration-300 hover:grayscale-0 sm:h-20 sm:w-40"
    >
      <Image
        src={logo}
        alt={name}
        width={200}
        height={120}
        className="h-full w-full object-contain opacity-70"
      />
    </div>
  ));

  return (
    <section className="border-y border-[#1C1917]/10 bg-[#FAFAF9] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <p
          className="px-6 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#78716C]"
          data-aos="fade-up"
        >
          The Enterprise Standard, Trusted PAN-India
        </p>
        <div className="mt-8" data-aos="fade-up" data-aos-delay="100">
          <LogoMarquee items={clientItems} durationSeconds={70} />
        </div>
      </div>
    </section>
  );
}
