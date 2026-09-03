import { NextResponse } from "next/server";
import { getDb, withRetry } from "@/db";
import { jobApplications } from "@/db/schema";
import { describeResumeProblem, uploadResume } from "@/lib/resume";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 2000;

function clean(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const fullName = clean(form.get("fullName"));
  const email = clean(form.get("email"));
  const phone = clean(form.get("phone"));
  const roleApplyingFor = clean(form.get("roleApplyingFor"));

  if (!fullName || !email || !phone || !roleApplyingFor) {
    return NextResponse.json(
      { ok: false, error: "Full name, email, phone number, and role are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const resume = form.get("resume");
  const resumeLink = clean(form.get("resumeLink"));
  const hasFile = resume instanceof File && resume.size > 0;

  if (!hasFile && !resumeLink) {
    return NextResponse.json(
      { ok: false, error: "Please attach your resume, or paste a link to it." },
      { status: 400 },
    );
  }

  let stored: Awaited<ReturnType<typeof uploadResume>> | null = null;

  if (hasFile) {
    const problem = describeResumeProblem(resume);

    if (problem) {
      return NextResponse.json({ ok: false, error: problem }, { status: 400 });
    }

    try {
      stored = await uploadResume(resume, fullName);
    } catch (error) {
      console.error("[careers] Resume upload failed:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't upload your resume. Please try again shortly." },
        { status: 500 },
      );
    }
  }

  try {
    await withRetry(() =>
      getDb().insert(jobApplications).values({
        fullName,
        email: email.toLowerCase(),
        phone,
        roleApplyingFor,
        jobSlug: clean(form.get("jobSlug")),
        experience: clean(form.get("experience")),
        resumeUrl: stored?.url ?? null,
        resumeFilename: stored?.filename ?? null,
        resumeSize: stored?.size ?? null,
        resumeLink,
        message: clean(form.get("message")),
      }),
    );
  } catch (error) {
    console.error("[careers] Failed to save application:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your application just now. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
