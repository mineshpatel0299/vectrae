import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { serviceDetails } from "@/data/serviceDetails";

const FEATURED_SLUGS = ["boardroom-av", "networking-wifi", "data-center-security"];

const featured = FEATURED_SLUGS.map((slug) =>
  serviceDetails.find((s) => s.slug === slug),
).filter((s): s is (typeof serviceDetails)[number] => Boolean(s));

const remainingCount = serviceDetails.length - featured.length;

export default function ServicesOverview() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-200 bg-white py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#25D9C7]">
            What We Do
          </p>
          <h2 className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl md:whitespace-nowrap lg:text-5xl">
            Enterprise technology,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              end to end
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-500">
            From the boardroom to the data center, here&apos;s exactly what
            Vectrae delivers — engineered, deployed, and supported PAN-India.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:gap-20">
          {featured.map((service, i) => {
            const Icon = service.icon;
            const reversed = i % 2 === 1;
            return (
              <div
                key={service.slug}
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div
                  className="relative h-64 overflow-hidden rounded-3xl border border-neutral-200 shadow-sm sm:h-80 lg:h-96"
                  data-aos={reversed ? "fade-left" : "fade-right"}
                >
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 text-6xl font-bold text-white/25 sm:text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div data-aos={reversed ? "fade-right" : "fade-left"}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-[#0f9ac9]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-neutral-500">
                    {service.tagline}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {service.capabilities.slice(0, 3).map((cap) => (
                      <li key={cap.title} className="flex items-start gap-2.5 text-sm text-neutral-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#25D9C7]" />
                        {cap.title}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition hover:text-[#0f9ac9]"
                  >
                    Explore {service.title}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-center sm:mt-20" data-aos="fade-up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition hover:opacity-90"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            View More Services
            <ArrowRight className="h-4 w-4" />
          </Link>
          {remainingCount > 0 && (
            <p className="text-xs text-neutral-400">
              +{remainingCount} more solution{remainingCount > 1 ? "s" : ""} on our services page
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
