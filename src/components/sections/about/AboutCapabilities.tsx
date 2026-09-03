"use client";

import Image from "next/image";
import { Layers, Workflow, Handshake, MapPin, ShieldCheck } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TiltCard from "@/components/ui/TiltCard";
import { whyChooseUs } from "@/data/whyChooseUs";

const icons = [Layers, Workflow, Handshake, MapPin, ShieldCheck];

export default function AboutCapabilities() {
  const [featured, ...rest] = whyChooseUs;
  const FeaturedIcon = icons[0];

  return (
    <section className="relative overflow-hidden border-t border-black/5 bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/4 top-0 h-100 w-100 -translate-y-1/2 rounded-full bg-[#84D96C]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
            What Sets Us Apart
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl">
            Five reasons enterprises choose Vectrae.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
          <div className="lg:col-span-2 lg:row-span-2" data-aos="fade-up">
            <TiltCard className="h-full">
              <div className="group relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-black/10">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <FeaturedIcon className="h-6 w-6 text-[#29B9F2]" />
                  <h3 className="mt-4 text-2xl font-semibold text-black">
                    {featured.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-black/60">
                    {featured.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {rest.map((item, i) => {
            const Icon = icons[i + 1];
            return (
              <div key={item.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <SpotlightCard className="h-full rounded-3xl border border-black/10 bg-black/[0.03] p-6 transition hover:border-black/20">
                  <Icon className="h-5 w-5 text-[#25D9C7]" />
                  <h3 className="mt-4 text-base font-semibold text-black">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/50">
                    {item.description}
                  </p>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
