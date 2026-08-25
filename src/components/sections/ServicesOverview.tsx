import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { solutions } from "@/data/solutions";

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

        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {solutions.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/solutions/${service.slug}`}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="group relative flex h-[350px] w-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-neutral-200 hover:shadow-[0_28px_60px_-20px_rgba(15,23,42,0.22)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.334px)]"
              >
                {/* brand accent line drawing in on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ backgroundImage: BRAND_GRADIENT }}
                />
                {/* soft radial wash on hover */}
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(120%_100%_at_50%_-10%,rgba(37,217,199,0.09),transparent_60%)]" />

                {/* index numeral */}
                <span className="absolute right-7 top-7 text-4xl font-bold text-neutral-100 transition-colors duration-500 group-hover:text-neutral-200">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex h-full flex-col justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-[#0f9ac9] transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-[#25D9C7]/40 group-hover:bg-[#25D9C7]/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-900 sm:pr-8">
                    {service.title}
                  </h3>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="translate-y-1 pt-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm leading-relaxed text-neutral-500">
                          {service.tagline}
                        </p>

                        <ul className="mt-3 space-y-2">
                          {service.capabilities.slice(0, 3).map((cap) => (
                            <li key={cap.title} className="flex items-start gap-2 text-sm text-neutral-600">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#25D9C7]" />
                              {cap.title}
                            </li>
                          ))}
                        </ul>

                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition group-hover:text-[#0f9ac9]">
                          Explore
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center" data-aos="fade-up">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition hover:opacity-90"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            View All Solutions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
