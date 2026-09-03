import type { StatusMeta } from "@/components/admin/StatusBadge";

export const ENQUIRY_STATUSES = [
  "new",
  "in_progress",
  "qualified",
  "won",
  "archived",
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const ENQUIRY_STATUS_META: Record<EnquiryStatus, StatusMeta> = {
  new: { label: "New", tone: "info" },
  in_progress: { label: "In progress", tone: "progress" },
  qualified: { label: "Qualified", tone: "positive" },
  won: { label: "Won", tone: "positive" },
  archived: { label: "Archived", tone: "neutral" },
};

export const APPLICATION_STATUSES = [
  "new",
  "shortlisted",
  "interviewing",
  "offered",
  "hired",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_META: Record<ApplicationStatus, StatusMeta> = {
  new: { label: "New", tone: "info" },
  shortlisted: { label: "Shortlisted", tone: "progress" },
  interviewing: { label: "Interviewing", tone: "progress" },
  offered: { label: "Offered", tone: "positive" },
  hired: { label: "Hired", tone: "positive" },
  rejected: { label: "Rejected", tone: "negative" },
};

export const POST_STATUS_META: Record<"draft" | "published", StatusMeta> = {
  draft: { label: "Draft", tone: "neutral" },
  published: { label: "Published", tone: "positive" },
};

export function enquiryStatusMeta(status: string): StatusMeta {
  return ENQUIRY_STATUS_META[status as EnquiryStatus] ?? { label: status, tone: "neutral" };
}

export function applicationStatusMeta(status: string): StatusMeta {
  return APPLICATION_STATUS_META[status as ApplicationStatus] ?? { label: status, tone: "neutral" };
}

export function postStatusMeta(status: string): StatusMeta {
  return POST_STATUS_META[status as "draft" | "published"] ?? { label: status, tone: "neutral" };
}

export function isEnquiryStatus(value: string): value is EnquiryStatus {
  return (ENQUIRY_STATUSES as readonly string[]).includes(value);
}

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return (APPLICATION_STATUSES as readonly string[]).includes(value);
}
