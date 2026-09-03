import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import BlogEditor, { type PostDraft } from "@/components/admin/BlogEditor";
import { requireWriteAccess } from "@/lib/admin/auth";
import { getBlogCategories } from "@/lib/admin/categories";

const EMPTY_DRAFT: PostDraft = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  readTime: "",
  color: "#29B9F2",
  image: "",
  featured: false,
  status: "draft",
  authorName: "",
  authorRole: "",
  authorInitials: "",
  tags: [],
  content: [{ type: "paragraph", text: "" }],
};

export default async function NewPostPage() {
  await requireWriteAccess();
  const categories = await getBlogCategories();

  return (
    <div className="space-y-7">
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All posts
      </Link>

      <PageHeader
        eyebrow="Content"
        title="New post"
        description="Saved as a draft unless you set the status to published."
      />

      <BlogEditor draft={EMPTY_DRAFT} categories={categories} />
    </div>
  );
}
