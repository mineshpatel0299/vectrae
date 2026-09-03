import type { LucideIcon } from "lucide-react";

type Tone = "neutral" | "info" | "progress" | "positive" | "negative";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "border-white/15 bg-white/5 text-white/70",
  info: "border-[#29B9F2]/35 bg-[#29B9F2]/10 text-[#7bd4f7]",
  progress: "border-amber-400/35 bg-amber-400/10 text-amber-200",
  positive: "border-[#84D96C]/35 bg-[#84D96C]/10 text-[#b6e8a5]",
  negative: "border-red-500/35 bg-red-500/10 text-red-300",
};

export type StatusMeta = {
  label: string;
  tone: Tone;
};

/**
 * Status is carried by label text as well as colour, so it stays legible for
 * colour-blind users and in greyscale printouts.
 */
export default function StatusBadge({
  meta,
  icon: Icon,
}: {
  meta: StatusMeta;
  icon?: LucideIcon;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${TONE_CLASSES[meta.tone]}`}
    >
      {Icon && <Icon className="h-3 w-3" aria-hidden />}
      {meta.label}
    </span>
  );
}
