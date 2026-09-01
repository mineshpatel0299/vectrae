import { NextResponse } from "next/server";

type ApplicationPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  roleApplyingFor?: string;
  experience?: string;
  resumeLink?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ApplicationPayload | null;

  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { fullName, email, phone, roleApplyingFor } = body;

  if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !roleApplyingFor?.trim()) {
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

  // No email/ATS provider is wired up yet (deferred at the user's request during
  // this build phase), applications are only logged server-side right now and are
  // NOT delivered to anyone. Wire this up to a real provider (e.g. Resend, an ATS)
  // via the Vercel Marketplace before this form collects real applications.
  console.log("[careers] New application received:", body);

  return NextResponse.json({ ok: true });
}
