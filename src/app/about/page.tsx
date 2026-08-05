import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Globe2,
  Target,
  Sparkles,
  ShieldCheck,
  Users,
  Clock,
} from "lucide-react";
import Odometer from "@/components/ui/Odometer";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import { BRAND_GRADIENT } from "@/lib/brand";
import { stats } from "@/data/stats";

export const metadata: Metadata = {
  title: "About Vectrae | Enterprise Technology Solutions",
  description:
    "Vectrae Infotech Pvt. Ltd. is a full-spectrum enterprise technology solutions provider headquartered in New Delhi, India — delivering AV, Networking, Data Center, End Computing, and Power solutions to 2,300+ enterprises PAN-India.",
};

const certifications = [
  "Cisco",
  "Palo Alto Networks",
  "Crestron",
  "Microsoft",
  "Dell",
  "HP",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute left-1/2 top-0 h-130 w-225 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#29B9F2]/15 blur-[140px]" />

        <header className="relative z-20 grid grid-cols-2 items-center px-6 py-6 md:grid-cols-3 md:px-10">
          <div className="flex items-center" data-aos="fade-down" data-aos-duration="600">
            <Link href="/">
              <Image src="/logo.png" alt="Vectrae" width={154} height={32} className="h-8 w-auto" priority />
            </Link>
          </div>

          <nav
            className="hidden items-center gap-1 justify-self-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm md:flex"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <Link href="/" className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition hover:text-white">
              Product
            </Link>
            <Link href="/about" className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Company
            </Link>
            <a href="#" className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition hover:text-white">
              Enterprise
            </a>
          </nav>

          <div className="col-span-1 flex justify-self-end" data-aos="fade-down" data-aos-delay="200">
            <a
              href="#"
              style={{ backgroundImage: BRAND_GRADIENT }}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Request access
            </a>
          </div>
        </header>

        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-10 text-center sm:pb-28 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]" data-aos="fade-up">
            About Vectrae
          </p>
          <h1
            className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-6xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            India&apos;s most trusted{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: BRAND_GRADIENT }}>
              full-spectrum
            </span>{" "}
            enterprise technology partner.
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Vectrae Infotech Pvt. Ltd. is a full-spectrum enterprise technology solutions provider
            headquartered in New Delhi, India. Founded to simplify technology for enterprises, we
            deliver Audio Visual, IT Infrastructure, Networking &amp; Security, Data Center, End
            Computing, and Power solutions to 2,300+ enterprise clients across PAN-India.
          </p>

          <div
            className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <Clock className="h-4 w-4 text-[#29B9F2]" />
              Founded 25+ Years Ago
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 text-[#25D9C7]" />
              HQ — New Delhi, India
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <Globe2 className="h-4 w-4 text-[#84D96C]" />
              PAN-India Footprint
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-black/5 bg-white py-20 sm:py-28">
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-100 w-100 translate-y-1/2 rounded-full bg-[#25D9C7]/15 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div
              className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
              data-aos="fade-up"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-black/3 text-[#0f9ac9]">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-neutral-900">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                To simplify technology decisions for enterprises — delivering the right solutions,
                the right partners, and the right outcomes, every time.
              </p>
            </div>
            <div
              className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-black/3 text-[#0d9488]">
                <Target className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-neutral-900">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                To be India&apos;s most trusted end-to-end enterprise technology partner, enabling
                organisations to grow, innovate, and operate with confidence.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-black/10 pt-14 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col" data-aos="fade-up" data-aos-delay={i * 100}>
                <Odometer value={stat.value} suffix={stat.suffix} className="text-4xl font-bold text-neutral-900 sm:text-5xl" />
                <span className="mt-1 max-w-[160px] text-xs font-semibold uppercase leading-snug tracking-wider text-neutral-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-black py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]" data-aos="fade-up">
            Our Story
          </p>
          <h2
            className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            From a specialist AV integrator to a full-spectrum technology partner.
          </h2>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/60"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Vectrae began as a specialist Audio Visual integrator serving enterprise clients in
            Delhi NCR. Over two decades, the company expanded into Networking, Data Centers, End
            Computing, and Power — growing its client base to 2,300+ enterprises and its workforce
            to 250+ certified technology professionals.
          </p>

          <div
            className="mt-10 flex items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-5"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Clock className="h-5 w-5 shrink-0 text-white/30" />
            <p className="text-sm text-white/40">
              A detailed milestone timeline is on its way — check back soon.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-black/5 bg-white py-20 sm:py-28">
        <div className="pointer-events-none absolute left-1/4 top-0 h-100 w-100 -translate-y-1/2 rounded-full bg-[#84D96C]/15 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0f9ac9]" data-aos="fade-up">
            Leadership
          </p>
          <h2
            className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Meet the people behind Vectrae
          </h2>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-6"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-300">
                  <Users className="h-6 w-6" />
                </span>
                <p className="mt-4 text-xs text-neutral-400">Profile coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-black py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]" data-aos="fade-up">
              Achievements
            </p>
            <h2
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Certified across the industry&apos;s leading platforms
            </h2>
          </div>

          <div
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {certifications.map((name) => (
              <span
                key={name}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
              >
                <ShieldCheck className="h-4 w-4 text-[#25D9C7]" />
                {name}
              </span>
            ))}
          </div>

          <p
            className="mx-auto mt-8 max-w-md text-center text-sm text-white/40"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Awards and industry recognition — announcements coming soon.
          </p>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
