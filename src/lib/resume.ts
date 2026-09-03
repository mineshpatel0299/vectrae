import "server-only";

import { put, del, get } from "@vercel/blob";

/**
 * Resumes live in their own *private* Blob store, separate from the public
 * store that serves blog cover images — a public store cannot hold private
 * blobs, and candidate CVs must never be publicly addressable. That store is
 * therefore addressed by an explicit token rather than the ambient default.
 */
function resumeStoreToken(): string {
  const token = process.env.BLOB_RESUMES_READ_WRITE_TOKEN;

  if (!token) {
    throw new Error(
      "BLOB_RESUMES_READ_WRITE_TOKEN is not set. Run `vercel env pull .env.local`.",
    );
  }

  return token;
}

export const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = new Map<string, string>([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
]);

export const RESUME_ACCEPT_ATTRIBUTE = ".pdf,.doc,.docx";

export type StoredResume = {
  url: string;
  filename: string;
  size: number;
};

export function describeResumeProblem(file: File): string | null {
  if (file.size === 0) {
    return "The uploaded file is empty.";
  }

  if (file.size > MAX_RESUME_BYTES) {
    return "Resume must be 5 MB or smaller.";
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return "Resume must be a PDF, DOC, or DOCX file.";
  }

  return null;
}

function safeSegment(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 48) || "candidate"
  );
}

/**
 * Stores a CV in private Blob storage. Resumes are candidate PII, so they are
 * never publicly addressable — the admin panel streams them back through an
 * authenticated route (`/api/admin/resume`).
 */
export async function uploadResume(file: File, candidateName: string): Promise<StoredResume> {
  const extension = ALLOWED_TYPES.get(file.type) ?? "pdf";
  const pathname = `resumes/${safeSegment(candidateName)}-${Date.now()}.${extension}`;

  const blob = await put(pathname, file, {
    access: "private",
    addRandomSuffix: true,
    contentType: file.type,
    token: resumeStoreToken(),
  });

  return {
    url: blob.url,
    filename: file.name,
    size: file.size,
  };
}

export async function deleteResume(url: string): Promise<void> {
  await del(url, { token: resumeStoreToken() });
}

/** Reads a stored CV back for an authenticated admin. */
export async function readResume(url: string) {
  return get(url, { access: "private", token: resumeStoreToken() });
}
