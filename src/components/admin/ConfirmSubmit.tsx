"use client";

import { useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function Inner({
  label,
  pendingLabel,
  icon,
  className,
  armed,
  onArm,
  onCancel,
  confirmLabel,
  formAction,
}: {
  label: string;
  pendingLabel: string;
  icon: ReactNode;
  className: string;
  armed: boolean;
  onArm: () => void;
  onCancel: () => void;
  confirmLabel: string;
  formAction?: (form: FormData) => Promise<void>;
}) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <button type="button" disabled className={className}>
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        {pendingLabel}
      </button>
    );
  }

  // Two-step rather than window.confirm: it is keyboard-navigable, styled with
  // the rest of the panel, and easy to back out of.
  if (armed) {
    return (
      <span className="flex flex-wrap items-center gap-2">
        <button type="submit" formAction={formAction} className={className}>
          {icon}
          {confirmLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-full px-4 text-sm font-medium text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button type="button" onClick={onArm} className={className}>
      {icon}
      {label}
    </button>
  );
}

/**
 * Wraps a destructive server action in an explicit confirm step.
 * Must be rendered inside a <form action={...}>.
 *
 * `icon` takes a rendered element rather than a component: this is a client
 * component, and a component function cannot cross the server/client boundary.
 */
export default function ConfirmSubmit({
  label,
  confirmLabel,
  pendingLabel,
  icon,
  className,
  formAction,
}: {
  label: string;
  confirmLabel: string;
  pendingLabel: string;
  icon: ReactNode;
  className: string;
  /** Overrides the enclosing form's action — used for delete inside an edit form. */
  formAction?: (form: FormData) => Promise<void>;
}) {
  const [armed, setArmed] = useState(false);

  return (
    <Inner
      label={label}
      confirmLabel={confirmLabel}
      pendingLabel={pendingLabel}
      icon={icon}
      className={className}
      formAction={formAction}
      armed={armed}
      onArm={() => setArmed(true)}
      onCancel={() => setArmed(false)}
    />
  );
}
