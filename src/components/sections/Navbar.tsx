"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_GRADIENT } from "@/lib/brand";

const NAV_LINKS = [
  // { label: "Product", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label:"Blog", href: "/blog"},
  { label: "Contact", href: "/contact" },
  // { label: "Enterprise", href: "#" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-20 grid grid-cols-2 items-center px-6 py-6 md:grid-cols-3 md:px-10">
      <div className="flex items-center" data-aos="fade-down" data-aos-duration="600" data-aos-once="true">
        <Link href="/">
          <Image src="/logo.png" alt="Vectrae" width={154} height={32} className="h-8 w-auto" priority />
        </Link>
      </div>

      <nav
        className="hidden items-center gap-1 justify-self-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm md:flex"
        data-aos="fade-down"
        data-aos-delay="100"
        data-aos-once="true"
      >
        {NAV_LINKS.map((link) => {
          const isActive = link.href !== "#" && pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="col-span-1 flex justify-self-end" data-aos="fade-down" data-aos-delay="200" data-aos-once="true">
        <a
          href="#"
          style={{ backgroundImage: BRAND_GRADIENT }}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
        >
          Request access
        </a>
      </div>
    </header>
  );
}
