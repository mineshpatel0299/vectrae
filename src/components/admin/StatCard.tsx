import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { SURFACE } from "./tokens";

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  href,
  accent = "#29B9F2",
}: {
  label: string;
  value: number | string;
  hint?: string;
  icon: LucideIcon;
  href?: string;
  accent?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{ borderColor: `${accent}40`, backgroundColor: `${accent}14`, color: accent }}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        {href && (
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 text-white/25 transition-colors duration-200 group-hover:text-white/70"
          />
        )}
      </div>

      <p className="mt-5 text-3xl font-semibold tabular-nums tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm font-medium text-white/70">{label}</p>
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </>
  );

  if (!href) {
    return <div className={`${SURFACE} p-5`}>{body}</div>;
  }

  return (
    <Link
      href={href}
      className={`${SURFACE} group block p-5 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]`}
    >
      {body}
    </Link>
  );
}
