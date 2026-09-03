/**
 * Shared careers shapes. Safe to import from client components (types are
 * erased, and the helpers here are pure) — the database access lives in
 * `src/lib/careers.ts`.
 */

import { Briefcase, Clock, Users, Wrench, type LucideIcon } from "lucide-react";

export const departments = [
  "Engineering & Technical",
  "Sales & Business Development",
  "Operations & Support",
  "Corporate & Admin",
] as const;

export type Department = (typeof departments)[number];

// Each department maps to exactly one icon across the site (marquee, job
// cards, job detail badge), so postings are constrained to this fixed set
// rather than allowing freeform department names.
export const departmentIcons: Record<Department, LucideIcon> = {
  "Engineering & Technical": Wrench,
  "Sales & Business Development": Briefcase,
  "Operations & Support": Clock,
  "Corporate & Admin": Users,
};

export const jobTypes = ["Full-time", "Internship"] as const;

export type JobType = (typeof jobTypes)[number];

export type JobOpening = {
  slug: string;
  title: string;
  department: Department;
  location: string;
  type: JobType;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export function isDepartment(value: string): value is Department {
  return (departments as readonly string[]).includes(value);
}

export function isJobType(value: string): value is JobType {
  return (jobTypes as readonly string[]).includes(value);
}
