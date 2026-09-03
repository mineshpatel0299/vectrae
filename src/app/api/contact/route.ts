import { NextResponse } from "next/server";
import { getDb, withRetry } from "@/db";
import { contactEnquiries } from "@/db/schema";

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
const MAX_FIELD_LENGTH = 2000;

function clean(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const fullName = clean(body.fullName);
  const companyName = clean(body.companyName);
  const workEmail = clean(body.workEmail);
  const phone = clean(body.phone);

  if (!fullName || !companyName || !workEmail || !phone) {
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

  const solutionInterest = Array.isArray(body.solutionInterest)
    ? body.solutionInterest.filter((item): item is string => typeof item === "string").slice(0, 20)
    : [];

  try {
    await withRetry(() =>
      getDb().insert(contactEnquiries).values({
        fullName,
        companyName,
        workEmail: workEmail.toLowerCase(),
        phone,
        designation: clean(body.designation),
        companySize: clean(body.companySize),
        solutionInterest,
        message: clean(body.message),
        howHeard: clean(body.howHeard),
        userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      }),
    );
  } catch (error) {
    console.error("[contact] Failed to save enquiry:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your enquiry just now. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
