import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Content blocks mirror the `BlogBlock` union that the public blog renderer
 * already understands, so posts authored in the admin panel render through the
 * exact same components as the ones seeded from `src/data/blogPosts.ts`.
 */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    // "owner" can manage other admin users; "editor" is read-only on people data.
    role: text("role").notNull().default("admin"),
    // Bumping this invalidates every session token already issued to the user.
    sessionVersion: integer("session_version").notNull().default(0),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("admin_users_email_key").on(table.email)],
);

export const contactEnquiries = pgTable(
  "contact_enquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: text("full_name").notNull(),
    companyName: text("company_name").notNull(),
    workEmail: text("work_email").notNull(),
    phone: text("phone").notNull(),
    designation: text("designation"),
    companySize: text("company_size"),
    solutionInterest: text("solution_interest").array().notNull().default([]),
    message: text("message"),
    howHeard: text("how_heard"),
    // new | in_progress | qualified | won | archived
    status: text("status").notNull().default("new"),
    internalNotes: text("internal_notes"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("contact_enquiries_created_at_idx").on(table.createdAt),
    index("contact_enquiries_status_idx").on(table.status),
  ],
);

export const jobApplications = pgTable(
  "job_applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    roleApplyingFor: text("role_applying_for").notNull(),
    // Slug of the opening in `src/data/careers.ts`; null for open applications.
    jobSlug: text("job_slug"),
    experience: text("experience"),
    // Uploaded to Vercel Blob (private) — see `src/lib/admin/resume.ts`.
    resumeUrl: text("resume_url"),
    resumeFilename: text("resume_filename"),
    resumeSize: integer("resume_size"),
    // Legacy/optional: candidates could previously paste a link instead.
    resumeLink: text("resume_link"),
    message: text("message"),
    // new | shortlisted | interviewing | offered | rejected | hired
    status: text("status").notNull().default("new"),
    internalNotes: text("internal_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("job_applications_created_at_idx").on(table.createdAt),
    index("job_applications_status_idx").on(table.status),
    index("job_applications_job_slug_idx").on(table.jobSlug),
  ],
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    category: text("category").notNull().default("Insights"),
    readTime: text("read_time").notNull().default("5 min read"),
    // Accent hex used by the public blog cards.
    color: text("color").notNull().default("#29B9F2"),
    image: text("image").notNull().default(""),
    featured: boolean("featured").notNull().default(false),
    // draft | published
    status: text("status").notNull().default("draft"),
    authorName: text("author_name").notNull().default(""),
    authorRole: text("author_role").notNull().default(""),
    authorInitials: text("author_initials").notNull().default(""),
    tags: text("tags").array().notNull().default([]),
    content: jsonb("content").$type<BlogBlock[]>().notNull().default([]),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("blog_posts_slug_key").on(table.slug),
    index("blog_posts_status_published_at_idx").on(table.status, table.publishedAt),
  ],
);

export const jobOpenings = pgTable(
  "job_openings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    // One of the four fixed department names — each maps to a single icon
    // across the site (marquee, cards, detail badge).
    department: text("department").notNull(),
    location: text("location").notNull().default(""),
    // "Full-time" | "Internship"
    type: text("type").notNull().default("Full-time"),
    experience: text("experience").notNull().default(""),
    summary: text("summary").notNull().default(""),
    responsibilities: text("responsibilities").array().notNull().default([]),
    requirements: text("requirements").array().notNull().default([]),
    // draft | published
    status: text("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("job_openings_slug_key").on(table.slug),
    index("job_openings_status_idx").on(table.status),
  ],
);

export type AdminUser = typeof adminUsers.$inferSelect;
export type ContactEnquiry = typeof contactEnquiries.$inferSelect;
export type JobApplication = typeof jobApplications.$inferSelect;
export type BlogPostRow = typeof blogPosts.$inferSelect;
export type JobOpeningRow = typeof jobOpenings.$inferSelect;
