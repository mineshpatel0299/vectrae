import { priorityPartnerLogos } from "@/data/partners";

const firstRow = priorityPartnerLogos.filter((_, i) => i % 2 === 0);
const secondRow = priorityPartnerLogos.filter((_, i) => i % 2 === 1);

function MarqueeRow({
  names,
  reverse,
  durationSeconds,
}: {
  names: readonly string[];
  reverse?: boolean;
  durationSeconds: number;
}) {
  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-black to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-black to-transparent sm:w-32" />
      <div
        className={`flex w-max items-center gap-16 sm:gap-20 md:gap-24 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {[...names, ...names].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 text-2xl font-semibold tracking-tight text-white/25 transition-colors duration-300 hover:text-white/70 sm:text-3xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PartnersMarquee() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-black py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30">
          Trusted By The World&apos;s Leading Technology Brands
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        <MarqueeRow names={firstRow} durationSeconds={34} />
        <MarqueeRow names={secondRow} reverse durationSeconds={38} />
      </div>
    </section>
  );
}
