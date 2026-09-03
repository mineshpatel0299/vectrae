CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'admin' NOT NULL,
	"session_version" integer DEFAULT 0 NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"category" text DEFAULT 'Insights' NOT NULL,
	"read_time" text DEFAULT '5 min read' NOT NULL,
	"color" text DEFAULT '#29B9F2' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"author_name" text DEFAULT '' NOT NULL,
	"author_role" text DEFAULT '' NOT NULL,
	"author_initials" text DEFAULT '' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"content" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"company_name" text NOT NULL,
	"work_email" text NOT NULL,
	"phone" text NOT NULL,
	"designation" text,
	"company_size" text,
	"solution_interest" text[] DEFAULT '{}' NOT NULL,
	"message" text,
	"how_heard" text,
	"status" text DEFAULT 'new' NOT NULL,
	"internal_notes" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"role_applying_for" text NOT NULL,
	"job_slug" text,
	"experience" text,
	"resume_url" text,
	"resume_filename" text,
	"resume_size" integer,
	"resume_link" text,
	"message" text,
	"status" text DEFAULT 'new' NOT NULL,
	"internal_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_status_published_at_idx" ON "blog_posts" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "contact_enquiries_created_at_idx" ON "contact_enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "contact_enquiries_status_idx" ON "contact_enquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_applications_created_at_idx" ON "job_applications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "job_applications_status_idx" ON "job_applications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_applications_job_slug_idx" ON "job_applications" USING btree ("job_slug");