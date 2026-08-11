import { coreValues } from "@/data/coreValues";
import { BRAND_GRADIENT } from "@/lib/brand";

// Split across two explicit rows (3 + 2) instead of leaving the wrap to
// flex-wrap, which left a lone value stranded on the second line.
const ROWS = [coreValues.slice(0, 3), coreValues.slice(3)];

export default function CoreValues() {
  let index = 0;

  return (
    <section className="relative border-t border-black/5 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-[#0f9ac9]"
          data-aos="fade-up"
        >
          Our Core Values
        </p>

        <div className="mt-8 flex flex-col items-center gap-y-5">
          {ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-5 sm:gap-x-6"
            >
              {row.map((value, i) => {
                const delay = index++ * 80;
                return (
                  <div key={value} className="flex items-center gap-x-4 sm:gap-x-6">
                    <span
                      className="cursor-default text-2xl font-semibold tracking-tight text-neutral-900 transition-colors duration-300 hover:text-[#0f9ac9] sm:text-4xl"
                      data-aos="fade-up"
                      data-aos-delay={delay}
                    >
                      {value}
                    </span>
                    {i < row.length - 1 && (
                      <span
                        aria-hidden
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundImage: BRAND_GRADIENT }}
                        data-aos="fade-up"
                        data-aos-delay={delay}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
