"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, KeyRound, Loader2 } from "lucide-react";
import { changePassword, type ActionState } from "@/lib/admin/actions";
import { BUTTON_GHOST, INPUT, LABEL } from "./tokens";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={BUTTON_GHOST}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Updating…
        </>
      ) : (
        <>
          <KeyRound className="h-4 w-4" aria-hidden />
          Update password
        </>
      )}
    </button>
  );
}

export default function ChangePasswordForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(changePassword, {});

  return (
    <form action={formAction} className="mt-5 space-y-4">
      <div className="space-y-2">
        <label className={LABEL} htmlFor="currentPassword">
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className={INPUT}
        />
      </div>

      <div className="space-y-2">
        <label className={LABEL} htmlFor="newPassword">
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={INPUT}
        />
        <p className="text-xs text-white/40">
          At least 8 characters, with an uppercase letter, a lowercase letter, and a number.
        </p>
      </div>

      <div className="space-y-2">
        <label className={LABEL} htmlFor="confirmPassword">
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className={INPUT}
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {state.error}
        </p>
      )}

      <p className="text-xs text-white/45">
        Changing your password signs you out everywhere, including here.
      </p>

      <SubmitButton />
    </form>
  );
}
