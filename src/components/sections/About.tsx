import { Award, Building2, Handshake, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import StatCounter from "@/components/ui/StatCounter";
import TiltCard from "@/components/ui/TiltCard";
import { stats } from "@/data/stats";
import { BRAND_GRADIENT } from "@/lib/brand";

const statIcons = [Building2, Users, Handshake, Award];

export default function About() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-225 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
            About Vectrae
          </p>
          <h2 className="mx-auto mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Simplifying Enterprise Technology, End to End
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6">
          <StaggerItem className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-pulse rounded-full bg-[#29B9F2]/20 blur-[80px]" />

              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="space-y-5">
                  <p className="text-lg leading-relaxed text-white/60">
                    Vectrae Infotech is a full-spectrum enterprise technology
                    solutions provider, delivering Audio Visual, IT
                    Infrastructure, Networking &amp; Security, Data Center,
                    End Computing, and Power solutions to enterprises across
                    India.
                  </p>
                  <p className="text-lg leading-relaxed text-white/60">
                    With 250+ technology experts, 43 OEM and technology
                    partnerships, and a PAN-India delivery footprint, Vectrae
                    has supported 2,300+ enterprise clients from initial
                    consultation through to long-term managed support.
                  </p>
                </div>

                <blockquote className="border-l-2 border-[#29B9F2]/50 pl-6 text-xl font-medium leading-relaxed text-white sm:text-2xl">
                  &ldquo;Our mission is to simplify technology decisions for
                  enterprises — delivering the right solutions, the right
                  partners, and the right outcomes, every time.&rdquo;
                </blockquote>
              </div>
            </TiltCard>
          </StaggerItem>

          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <StaggerItem key={stat.label}>
                <TiltCard className="h-full">
                  <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center backdrop-blur-sm transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div
                      className="bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
                      style={{ backgroundImage: BRAND_GRADIENT }}
                    >
                      <StatCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm font-medium text-white/50">
                      {stat.label}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
