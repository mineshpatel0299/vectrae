import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vectrae Admin",
  description: "Internal console for enquiries, applications, and the Vectrae blog.",
  // The panel must never be indexed, and links out of it shouldn't pass referrers.
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-[#08090A] text-white antialiased">{children}</div>;
}
