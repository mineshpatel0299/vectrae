import { ArrowRight, ChevronDown } from "lucide-react";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import Navbar from "@/components/sections/Navbar";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#141414]">
      <WovenCanvas />

      {/* Subtle overlays to ensure text readability without hiding the 3D canvas */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[130px] bg-gradient-to-b from-black via-black/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[105px] w-[225px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

      <Navbar />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-once="true"
        >
          Trusted by{" "}
          <span className="font-semibold text-white">2,300+ Enterprises</span>{" "}
          Across India
        </div>

        <h1 className="w-full px-4 text-center text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
          <span
            className="block drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-once="true"
          >
            <span className="xl:whitespace-nowrap">
              Integrated Technology Solutions&nbsp;For
            </span>{" "}
            <br className="hidden md:block" />
            <span
              className="text-transparent bg-clip-text drop-shadow-sm"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #B6D93B 0%, #84D96C 35%, #25D9C7 68%, #29B9F2 100%)",
              }}
            >
              The Modern Enterprise
            </span>
          </span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg text-white"
          data-aos="fade-up"
          data-aos-delay="250"
          data-aos-once="true"
        >
          From AV and Networking to Data Centers and Power, Vectrae delivers
          end-to-end enterprise technology across PAN-India.
        </p>

        <div
          className="mt-10 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center"
          data-aos="fade-up"
          data-aos-delay="350"
          data-aos-once="true"
        >
          <button
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 sm:w-auto"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #B6D93B 0%, #84D96C 35%, #25D9C7 68%, #29B9F2 100%)",
            }}
          >
            Request a Free Consultation
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto">
            Explore Our Solutions
          </button>
        </div>

        <p
          className="mt-6 text-xs font-medium tracking-wide text-white/40"
          data-aos="fade-up"
          data-aos-delay="450"
          data-aos-once="true"
        >
          Trusted by 2,300+ enterprises&nbsp;|&nbsp;250+ Technology
          Experts&nbsp;|&nbsp;PAN-India Delivery
        </p>
      </div>
    </section>
  );
}
