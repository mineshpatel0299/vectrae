import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vectrae OS",
  description: "Explore Vectrae as a desktop, folders, projects, and resources, one click away.",
};

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen overflow-hidden bg-black text-white antialiased">{children}</div>;
}
