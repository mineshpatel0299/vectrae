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
              className="group relative flex h-28 items-center justify-center overflow-hidden bg-white p-5 sm:h-40 sm:p-7"
              data-aos="zoom-in"
              data-aos-delay={Math.min(i * 50, 400)}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(132,217,108,0.16), rgba(37,217,199,0.14) 45%, transparent 75%)",
                }}
              />
              <Image
                src={logo}
                alt={name}
                width={180}
                height={100}
                className="relative h-full w-full object-contain grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0"
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
