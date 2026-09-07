import { ArrowRight } from "lucide-react";
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

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-6 text-center sm:px-6">
        {/* Top Badge */}
        <div
          className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-md sm:mb-6 sm:px-4 sm:py-1.5 sm:text-sm"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-once="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D9C7] animate-pulse" />
          <span>
            Trusted by <span className="font-semibold text-white">2,300+ Enterprises</span>
          </span>
        </div>

        {/* Responsive Heading - Strictly 2 Lines */}
        <h1
          className="w-full max-w-4xl text-lg font-extrabold leading-tight tracking-tight text-white min-[380px]:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-[0_4px_30px_rgba(0,0,0,1)]"
          data-aos="fade-up"
          data-aos-duration="900"
          data-aos-once="true"
        >
          <span className="block truncate sm:overflow-visible sm:whitespace-normal drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            Integrated Technology Solutions
          </span>
          <span className="block mt-0.5 sm:mt-1">
            <span className="text-white/90">For </span>
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

        {/* Subtitle - Tailored for Mobile & Desktop */}
        <p
          className="mt-3.5 max-w-2xl text-xs leading-relaxed text-white/80 sm:mt-6 sm:text-lg sm:text-white"
          data-aos="fade-up"
          data-aos-delay="250"
          data-aos-once="true"
        >
          <span className="sm:hidden">
            End-to-end Audio Visual & enterprise IT infrastructure delivered PAN-India.
          </span>
          <span className="hidden sm:inline">
            From AV and Networking to Data Centers and Power, Vectrae delivers end-to-end enterprise technology across PAN-India.
          </span>
        </p>

        {/* CTAs */}
        <div
          className="mt-6 flex w-full max-w-md flex-row items-center gap-2.5 justify-center sm:mt-10 sm:gap-3"
          data-aos="fade-up"
          data-aos-delay="350"
          data-aos-once="true"
        >
          <button
            className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-3 text-xs font-bold text-black transition hover:brightness-110 active:scale-95 sm:flex-initial sm:px-6 sm:py-3.5 sm:text-sm"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #B6D93B 0%, #84D96C 35%, #25D9C7 68%, #29B9F2 100%)",
            }}
          >
            Request Consultation
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 active:scale-95 sm:flex-initial sm:px-6 sm:py-3.5 sm:text-sm">
            Explore Solutions
          </button>
        </div>

        {/* Trust metrics footer - Hidden on mobile to keep viewport clean */}
        <p
          className="mt-6 hidden text-xs font-medium tracking-wide text-white/40 sm:block"
          data-aos="fade-up"
          data-aos-delay="450"
          data-aos-once="true"
        >
          250+ Technology Experts&nbsp;|&nbsp;PAN-India Delivery&nbsp;|&nbsp;2,300+ Enterprise Clients
        </p>
      </div>
    </section>
  );
}
