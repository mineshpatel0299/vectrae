"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Check, ExternalLink, Loader2, Save, Trash2 } from "lucide-react";
import ConfirmSubmit from "./ConfirmSubmit";
import { BUTTON_DANGER, BUTTON_PRIMARY, CARD, INPUT, LABEL, SURFACE } from "./tokens";
import { createJob, deleteJob, updateJob, type ActionState } from "@/lib/admin/actions";
import { departments, jobTypes, type Department, type JobType } from "@/lib/careers-types";
import { slugifyTitle } from "@/lib/slug";
import { BRAND_GRADIENT } from "@/lib/brand";

export type JobDraft = {
  id?: string;
  slug: string;
  title: string;
  department: Department;
  location: string;
  type: JobType;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status: "draft" | "published";
};

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{ backgroundImage: BRAND_GRADIENT }}
      className={BUTTON_PRIMARY}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Saving…
        </>
      ) : (
        <>
          <Save className="h-4 w-4" aria-hidden />
          {label}
        </>
      )}
    </button>
  );
}

export default function JobEditor({
  draft,
  readOnly,
}: {
  draft: JobDraft;
  readOnly?: boolean;
}) {
  const isNew = !draft.id;
  const action = isNew ? createJob : updateJob;
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});

  const [title, setTitle] = useState(draft.title);

  // The slug is the public URL, so it follows the title until someone types
  // over it, after which the manual value wins — computed during render
  // rather than synced through an effect.
  const [slugOverride, setSlugOverride] = useState<string | null>(draft.slug || null);
  const slug = slugOverride ?? slugifyTitle(title);

  return (
    <form action={formAction} className="space-y-5">
      {draft.id && <input type="hidden" name="id" value={draft.id} />}

      {state.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {state.error}
        </p>
      )}

      {state.success && (
        <p
          role="status"
          className="flex items-start gap-2 rounded-xl border border-[#84D96C]/30 bg-[#84D96C]/10 px-4 py-3 text-sm text-[#b6e8a5]"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {state.success}
        </p>
      )}

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <section className={CARD}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className={LABEL} htmlFor="title">
                  Role title
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  disabled={readOnly}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className={`${INPUT} text-base font-medium`}
                  placeholder="AV Solutions Engineer"
                />
              </div>

              <div className="space-y-2">
                <label className={LABEL} htmlFor="slug">
                  URL slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-sm text-white/35">/careers/</span>
                  <input
                    id="slug"
                    name="slug"
                    disabled={readOnly}
                    value={slug}
                    onChange={(event) => setSlugOverride(event.target.value)}
                    className={INPUT}
                    placeholder="av-solutions-engineer"
                  />
                </div>
                <p className="text-xs text-white/40">
                  Changing this on a published posting breaks any existing links to it.
                </p>
              </div>

              <div className="space-y-2">
                <label className={LABEL} htmlFor="summary">
                  Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={3}
                  disabled={readOnly}
                  defaultValue={draft.summary}
                  className={`${INPUT} resize-y leading-relaxed`}
                  placeholder="One or two sentences shown on the role card and detail page."
                />
              </div>
            </div>
          </section>

          <section className={CARD} aria-labelledby="job-responsibilities">
            <h2 id="job-responsibilities" className="text-sm font-semibold text-white">
              Responsibilities
            </h2>
            <p className="mt-1 text-xs text-white/40">One per line.</p>
            <textarea
              name="responsibilities"
              rows={6}
              disabled={readOnly}
              defaultValue={draft.responsibilities.join("\n")}
              className={`${INPUT} mt-4 resize-y leading-relaxed`}
              placeholder={"Design, install, and commission AV systems\nSupport pre-sales with technical scoping"}
            />
          </section>

          <section className={CARD} aria-labelledby="job-requirements">
            <h2 id="job-requirements" className="text-sm font-semibold text-white">
              Requirements
            </h2>
            <p className="mt-1 text-xs text-white/40">One per line.</p>
            <textarea
              name="requirements"
              rows={6}
              disabled={readOnly}
              defaultValue={draft.requirements.join("\n")}
              className={`${INPUT} mt-4 resize-y leading-relaxed`}
              placeholder={"Diploma/degree in a related field\nCTS or OEM certifications preferred"}
            />
          </section>
        </div>

        <aside className="space-y-5">
          <section className={CARD}>
            <h2 className="text-sm font-semibold text-white">Publishing</h2>

            <div className="mt-4 space-y-2">
              <label className={LABEL} htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                disabled={readOnly}
                defaultValue={draft.status}
                className={`${INPUT} appearance-none`}
              >
                <option value="draft" className="bg-[#0B0D0E]">
                  Draft — not visible publicly
                </option>
                <option value="published" className="bg-[#0B0D0E]">
                  Published — live on the site
                </option>
              </select>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
              {!readOnly && <SaveButton label={isNew ? "Create posting" : "Save changes"} />}
              {draft.id && draft.status === "published" && (
                <a
                  href={`/careers/${draft.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#7bd4f7] transition-opacity hover:opacity-80"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  View live
                </a>
              )}
            </div>
          </section>

          <section className={CARD}>
            <h2 className="text-sm font-semibold text-white">Role details</h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className={LABEL} htmlFor="department">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  disabled={readOnly}
                  defaultValue={draft.department}
                  className={`${INPUT} appearance-none`}
                >
                  {departments.map((department) => (
                    <option key={department} value={department} className="bg-[#0B0D0E]">
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={LABEL} htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  disabled={readOnly}
                  defaultValue={draft.type}
                  className={`${INPUT} appearance-none`}
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#0B0D0E]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={LABEL} htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  disabled={readOnly}
                  defaultValue={draft.location}
                  className={INPUT}
                  placeholder="New Delhi"
                />
              </div>

              <div className="space-y-2">
                <label className={LABEL} htmlFor="experience">
                  Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  disabled={readOnly}
                  defaultValue={draft.experience}
                  className={INPUT}
                  placeholder="2-5 years"
                />
              </div>
            </div>
          </section>
        </aside>
      </div>

      {draft.id && !readOnly && (
        <div className={`${SURFACE} p-5`}>
          <h2 className="text-sm font-semibold text-white">Danger zone</h2>
          <p className="mt-1 text-xs leading-relaxed text-white/45">
            Deleting removes the posting permanently and takes it off the live site.
          </p>
          <div className="mt-4">
            {/* A nested <form> is invalid HTML, so delete overrides the action here. */}
            <ConfirmSubmit
              label="Delete posting"
              confirmLabel="Yes, delete permanently"
              pendingLabel="Deleting…"
              icon={<Trash2 className="h-4 w-4" aria-hidden />}
              className={BUTTON_DANGER}
              formAction={deleteJob}
            />
          </div>
        </div>
      )}
    </form>
  );
}
