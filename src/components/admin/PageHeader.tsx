import { BRAND_GRADIENT } from "@/lib/brand";

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-1 w-7 rounded-full"
              style={{ backgroundImage: BRAND_GRADIENT }}
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
