import { NextResponse } from "next/server";

type ContactPayload = {
  fullName?: string;
  companyName?: string;
  workEmail?: string;
  phone?: string;
  designation?: string;
  companySize?: string;
  solutionInterest?: string[];
  message?: string;
  howHeard?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { fullName, companyName, workEmail, phone } = body;

  if (!fullName?.trim() || !companyName?.trim() || !workEmail?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Full name, company name, work email, and phone number are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(workEmail)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid work email address." },
      { status: 400 },
    );
  }

  // No email/CRM provider is wired up yet (deferred at the user's request during
  // this build phase) — submissions are only logged server-side right now and are
  // NOT delivered to anyone. Wire this up to a real provider (e.g. Resend, Zoho CRM)
  // via the Vercel Marketplace before this form collects real leads.
  console.log("[contact] New enquiry received:", body);

  return NextResponse.json({ ok: true });
}
