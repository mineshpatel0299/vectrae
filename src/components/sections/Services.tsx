"use client";

import {
  Headset,
  Laptop,
  MonitorPlay,
  Network,
  PackageCheck,
  Server,
  Zap,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { services } from "@/data/services";
import { BRAND_GRADIENT } from "@/lib/brand";

const icons = [
  MonitorPlay,
  Network,
  Server,
  Laptop,
  PackageCheck,
  Zap,
  Headset,
];

type ServiceCardProps = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

function ServiceCard({
  title,
  description,
  Icon,
  index,
  total,
  scrollYProgress,
}: ServiceCardProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const range: [number, number, number, number] = [
    start - 0.08,
    start,
    end,
    end + 0.08,
  ];

  const scale = useTransform(scrollYProgress, range, [0.86, 1, 1, 0.86]);
  const opacity = useTransform(scale, [0.86, 1], [0.35, 1]);

  return (
    <motion.div style={{ scale, opacity }} className="w-85 shrink-0 sm:w-100">
      <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-sm">
        <div className="flex h-full flex-col gap-5">
          <span className="text-6xl font-bold text-white/5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#29B9F2]">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-white/55">
            {description}
          </p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function measure() {
      if (rowRef.current) {
        setDistance(rowRef.current.scrollWidth - window.innerWidth);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${services.length * 60}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden border-t border-white/5">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#84D96C]/10 blur-[140px]" />

        <div className="relative mx-auto mb-12 w-full max-w-6xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#29B9F2]">
            Solutions &amp; Services
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Every Layer of Enterprise Technology, Covered
          </h2>
        </div>

        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex gap-6 px-6 sm:gap-8 sm:px-10"
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              Icon={icons[i]}
              index={i}
              total={services.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        <div className="relative mx-auto mt-12 h-1 w-full max-w-6xl overflow-hidden rounded-full bg-white/10 px-6">
          <motion.div
            style={{ width: barWidth, backgroundImage: BRAND_GRADIENT }}
            className="h-full rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
