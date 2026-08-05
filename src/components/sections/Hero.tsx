import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";


export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black" />
      <div className="absolute inset-x-0 top-0 h-130 bg-linear-to-b from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-105 w-225 -translate-x-1/2 rounded-full bg-blue-600/30 blur-[120px]" />

      <header className="relative z-20 grid grid-cols-2 items-center px-6 py-6 md:grid-cols-3 md:px-10">
        <div
          className="flex items-center"
          data-aos="fade-down"
          data-aos-duration="600"
          data-aos-once="true"
        >
          <Image src="/logo.png" alt="Vectrae" width={154} height={32} className="h-8 w-auto" priority />
        </div>

        <nav
          className="hidden items-center gap-1 justify-self-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm md:flex"
          data-aos="fade-down"
          data-aos-delay="100"
          data-aos-once="true"
        >
          <a
            href="#"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white"
          >
            Product
          </a>
          <a
            href="#"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition hover:text-white"
          >
            Company
          </a>
          <a
            href="#"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition hover:text-white"
          >
            Enterprise
          </a>
        </nav>

        <div
          className="col-span-1 flex justify-self-end"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-once="true"
        >
          <a
            href="#"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Request access
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
              <ArrowRight className="h-3 w-3" />
            </span>
          </a>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-once="true"
        >
          Trusted by <span className="font-semibold text-white">2,300+ Enterprises</span>{" "}
          Across India
        </div>

        <h1 className="w-full px-4 text-center text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          <span
            className="block"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-once="true"
          >
            <span className="xl:whitespace-nowrap">Integrated Technology Solutions&nbsp;For</span> <br className="hidden md:block" />
            <span
              className="text-transparent bg-clip-text"
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
          className="mt-6 max-w-2xl text-lg text-white/60"
          data-aos="fade-up"
          data-aos-delay="250"
          data-aos-once="true"
        >
          From AV and Networking to Data Centers and Power — Vectrae delivers end-to-end enterprise technology across PAN-India.
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
          Trusted by 2,300+ enterprises&nbsp;|&nbsp;250+ Technology Experts&nbsp;|&nbsp;PAN-India Delivery
        </p>
      </div>


    </section>
  );
}
