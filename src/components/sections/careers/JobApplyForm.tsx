"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  resumeLink: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  phone: "",
  experience: "",
  resumeLink: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-[#29B9F2] focus:ring-2 focus:ring-[#29B9F2]/15";

const labelClasses = "text-sm font-medium text-neutral-700";

export default function JobApplyForm({ jobTitle }: { jobTitle: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, roleApplyingFor: jobTitle }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-black/10 bg-white p-6 py-16 text-center shadow-sm sm:p-10">
        <span
          style={{ backgroundImage: BRAND_GRADIENT }}
          className="flex h-14 w-14 items-center justify-center rounded-full text-black"
        >
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-neutral-900">Application received.</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
          Our talent team reviews every application for the {jobTitle} role. If there&apos;s a fit,
          we&apos;ll be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-10">
      <p className={labelClasses}>Applying for</p>
      <p className="mt-1 text-lg font-semibold text-neutral-900">{jobTitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="fullName">
              Full Name <span className="text-[#E8500A]">*</span>
            </label>
            <input
              id="fullName"
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputClasses}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="email">
              Email <span className="text-[#E8500A]">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClasses}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="phone">
              Phone Number <span className="text-[#E8500A]">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClasses}
              placeholder="+91"
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="experience">
              Years of Experience
            </label>
            <input
              id="experience"
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
              className={inputClasses}
              placeholder="e.g. 3 years"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className={labelClasses} htmlFor="resumeLink">
              Resume / Portfolio Link
            </label>
            <input
              id="resumeLink"
              type="url"
              value={form.resumeLink}
              onChange={(e) => update("resumeLink", e.target.value)}
              className={inputClasses}
              placeholder="Google Drive / LinkedIn URL"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClasses} htmlFor="message">
            Anything else we should know?
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClasses}
            placeholder="Tell us why you'd be a great fit"
          />
        </div>

        {status === "error" && <p className="text-sm font-medium text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          style={{ backgroundImage: BRAND_GRADIENT }}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-black shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Submitting…" : "Submit Application"}
          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </form>
    </div>
  );
}
