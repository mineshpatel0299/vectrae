import Image from "next/image";
import { clientLogos } from "@/data/clients";

const FEATURED_CLIENTS = [
  "Deloitte",
  "MongoDB",
  "HDFC Bank",
  "Ford",
  "Adobe",
  "Accenture",
  "J.P. Morgan",
  "KPMG",
  "PepsiCo",
  "McKinsey & Company",
  "PwC",
  "American Express",
];

export default function TrustSignals() {
  const featured = FEATURED_CLIENTS.map((name) =>
    clientLogos.find((client) => client.name === name),
  ).filter((client): client is (typeof clientLogos)[number] => Boolean(client));

  return (
    <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p
          className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-500"
          data-aos="fade-up"
        >
          Trusted by 2,300+ enterprises across India
        </p>

        <div
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3 lg:grid-cols-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {featured.map(({ name, logo }, i) => (
            <div
              key={name}
              className="group flex h-24 items-center justify-center bg-white p-6 transition-colors duration-300 hover:bg-neutral-50 sm:h-32"
              data-aos="zoom-in"
              data-aos-delay={Math.min(i * 50, 400)}
            >
              <Image
                src={logo}
                alt={name}
                width={140}
                height={70}
                className="h-full w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        <p
          className="mt-6 text-center text-xs text-neutral-400"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Plus 2,300+ more enterprises across India
        </p>
      </div>
    </section>
  );
}
