"use client";

import { useState, useTransition } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import type { StatusMeta } from "./StatusBadge";

export default function StatusSelect({
  id,
  current,
  options,
  action,
  disabled,
}: {
  id: string;
  current: string;
  options: { value: string; meta: StatusMeta }[];
  action: (id: string, status: string) => Promise<void>;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(current);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function change(next: string) {
    const previous = value;
    setValue(next);
    setError(null);

    startTransition(async () => {
      try {
        await action(id, next);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch {
        // Put the control back where it was so it never lies about the state.
        setValue(previous);
        setError("Couldn't update the status.");
      }
    });
  }

  return (
    <div>
      <div className="relative">
        <label htmlFor={`status-${id}`} className="sr-only">
          Status
        </label>
        <select
          id={`status-${id}`}
          value={value}
          disabled={disabled || pending}
          onChange={(event) => change(event.target.value)}
          className="min-h-11 w-full appearance-none rounded-xl border border-white/12 bg-black/40 pl-4 pr-10 text-sm font-medium text-white outline-none transition-colors duration-200 focus:border-[#29B9F2] focus:ring-2 focus:ring-[#29B9F2]/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0B0D0E]">
              {option.meta.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : saved ? (
            <Check className="h-4 w-4 text-[#84D96C]" aria-hidden />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden />
          )}
        </span>
      </div>

      <p aria-live="polite" className="sr-only">
        {pending ? "Saving status" : saved ? "Status saved" : ""}
      </p>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
