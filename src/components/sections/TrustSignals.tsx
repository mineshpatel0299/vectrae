import Image from "next/image";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { clientLogos } from "@/data/clients";

export default function TrustSignals() {
  const clientItems = clientLogos.map(({ name, logo }) => (
    <div
      key={name}
      className="flex h-20 w-36 items-center justify-center px-2 sm:h-28 sm:w-48 lg:h-32 lg:w-56"
    >
      <Image
        src={logo}
        alt={name}
        width={200}
        height={120}
        className="h-full w-full object-contain"
      />
    </div>
  ));

  return (
    <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="px-6 text-center text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Trusted by 2,300+ enterprises across India
        </p>
        <div className="mt-10">
          <LogoMarquee items={clientItems} durationSeconds={60} />
        </div>
      </div>
    </section>
  );
}
