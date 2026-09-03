import type { LucideIcon } from "lucide-react";
import { SURFACE } from "./tokens";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={`${SURFACE} flex flex-col items-center justify-center px-6 py-16 text-center`}>
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40"
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-5 text-base font-semibold text-white">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
