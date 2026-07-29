import Image from "next/image";
import { clientLogos } from "@/data/clients";
import Reveal from "./Reveal";

function splitColumns<T>(items: T[], count: number) {
  const columns: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => columns[i % count].push(item));
  return columns;
}

const COLUMN_COUNT = 4;
const DIRECTIONS = ["up", "down", "up", "down"] as const;
const SPEEDS = [38, 46, 34, 42];

export default function LogoWaterfall() {
  const columns = splitColumns(clientLogos, COLUMN_COUNT);

  return (
    <section className="relative overflow-hidden border-t border-neutral-200 bg-white py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0f9ac9]">
            The Enterprise Standard
          </p>
          <h2 className="mx-auto mt-4 text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            Trusted by 2,300+ enterprises across India
          </h2>
        </Reveal>

        <div className="relative mt-14 grid h-105 grid-cols-2 gap-4 overflow-hidden sm:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent" />

          {columns.map((col, i) => (
            <div key={i} className="relative overflow-hidden">
              <div
                className={`flex flex-col gap-4 ${
                  DIRECTIONS[i] === "up" ? "animate-column-up" : "animate-column-down"
                }`}
                style={{ animationDuration: `${SPEEDS[i]}s` }}
              >
                {[...col, ...col].map((client, j) => (
                  <div
                    key={`${client.name}-${j}`}
                    className="flex h-24 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition duration-300 hover:border-[#29B9F2]/40 hover:bg-white hover:shadow-sm"
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={140}
                      height={80}
                      className="h-full w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
