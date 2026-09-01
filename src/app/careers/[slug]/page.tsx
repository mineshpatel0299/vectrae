import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PremiumHeroBackdrop from "@/components/ui/PremiumHeroBackdrop";
import ReadingProgress from "@/components/sections/blog/ReadingProgress";
import JobApplyForm from "@/components/sections/careers/JobApplyForm";
import { BRAND_GRADIENT } from "@/lib/brand";
import { departmentIcons, jobOpenings, getJobOpening } from "@/data/careers";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jobOpenings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobOpening(slug);
  if (!job) return {};

  return {
    title: `${job.title} | Careers at Vectrae`,
    description: job.summary,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobOpening(slug);
  if (!job) notFound();

  const Icon = departmentIcons[job.department];
  const otherRoles = jobOpenings.filter((j) => j.slug !== job.slug).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <section className="relative overflow-hidden bg-black">
        <PremiumHeroBackdrop />

        <Navbar />

        <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-6 text-center sm:pb-28">
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-white/40" data-aos="fade-up">
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/careers" className="transition hover:text-white/70">
              Careers
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/70">{job.title}</span>
          </div>

          <span
            className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#29B9F2] shadow-[0_0_25px_rgba(41,185,242,0.25)]"
            data-aos="zoom-in"
          >
            <Icon className="h-6 w-6" />
          </span>

          <h1
            className="mx-auto mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {job.title}
          </h1>

          <div
            className="mx-auto mt-6 flex flex-wrap justify-center gap-2"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/60">
              <MapPin className="h-3.5 w-3.5" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/60">
              <Clock className="h-3.5 w-3.5" /> {job.type}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/60">
              {job.experience}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/60">
              {job.department}
            </span>
          </div>

          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {job.summary}
          </p>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <a
              href="#apply"
              style={{ backgroundImage: BRAND_GRADIENT }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Apply for this Role
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/careers#openings"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              View All Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Responsibilities & requirements */}
      <section className="relative overflow-hidden bg-[#f5f5f0] py-20 sm:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-[#29B9F2]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <div className="grid gap-12 sm:grid-cols-2">
            <div data-aos="fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#29B9F2]">
                Responsibilities
              </p>
              <ul className="mt-6 space-y-4">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#25D9C7]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0f9ac9]">
                Requirements
              </p>
              <ul className="mt-6 space-y-4">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#29B9F2]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="relative bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center" data-aos="fade-up">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0f9ac9]">Apply Now</p>
            <h2 className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
              Tell us about yourself.
            </h2>
          </div>

          <div className="mt-12" data-aos="fade-up" data-aos-delay="100">
            <JobApplyForm jobTitle={job.title} />
          </div>
        </div>
      </section>

      {/* Other roles */}
      {otherRoles.length > 0 && (
        <section className="relative overflow-hidden bg-[#f5f5f0] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Other Open Roles
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {otherRoles.map((role) => (
                <Link
                  key={role.slug}
                  href={`/careers/${role.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-[0_0_0_1.5px_rgba(37,217,199,0.45),0_20px_45px_-15px_rgba(15,23,42,0.18)]"
                >
                  <h3 className="text-sm font-semibold text-neutral-900">{role.title}</h3>
                  <p className="mt-2 text-xs text-neutral-500">
                    {role.location} · {role.type}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0f9ac9]">
                    View Role
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/careers#openings"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_0_0_1.5px_rgba(37,217,199,0.4),0_10px_25px_-8px_rgba(15,23,42,0.2)]"
              >
                View All Open Roles
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
