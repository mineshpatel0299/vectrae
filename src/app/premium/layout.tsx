import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vectrae, Enterprise Technology, Live",
  description:
    "A premium, end-to-end enterprise technology partner. AV, Networking, Data Center, and Power, engineered with quiet precision.",
};

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-black text-white antialiased">{children}</div>;
}
