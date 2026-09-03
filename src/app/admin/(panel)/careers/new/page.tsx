import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import JobEditor, { type JobDraft } from "@/components/admin/JobEditor";
import { requireWriteAccess } from "@/lib/admin/auth";
import { departments } from "@/lib/careers-types";

const EMPTY_DRAFT: JobDraft = {
  slug: "",
  title: "",
  department: departments[0],
  location: "",
  type: "Full-time",
  experience: "",
  summary: "",
  responsibilities: [],
  requirements: [],
  status: "draft",
};

export default async function NewJobPage() {
  await requireWriteAccess();

  return (
    <div className="space-y-7">
      <Link
        href="/admin/careers"
        className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All job openings
      </Link>

      <PageHeader
        eyebrow="Careers page"
        title="New job posting"
        description="Saved as a draft unless you set the status to published."
      />

      <JobEditor draft={EMPTY_DRAFT} />
    </div>
  );
}
