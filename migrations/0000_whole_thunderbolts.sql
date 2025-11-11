CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"name" varchar(255),
	"role" varchar(50) DEFAULT 'admin',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"last_login" timestamp,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(160) NOT NULL,
	"org" varchar(160),
	"subject" varchar(200) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"processed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "datasets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(160) NOT NULL,
	"summary" text NOT NULL,
	"description" text,
	"size" varchar(50),
	"format" varchar(100),
	"license" varchar(100) NOT NULL,
	"version" varchar(20) DEFAULT '1.0.0',
	"download_url" text,
	"documentation_url" text,
	"doi" varchar(100),
	"languages" text,
	"domains" text,
	"tags" text,
	"stats" text,
	"citation" text,
	"related_paper" integer,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	CONSTRAINT "datasets_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "external_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"authors" text NOT NULL,
	"year" integer NOT NULL,
	"abstract" text,
	"download_url" text NOT NULL,
	"source_website" text,
	"doi" text,
	"tags" text,
	"category" varchar(50),
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"featured" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "literature_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" varchar(160) NOT NULL,
	"topic" text NOT NULL,
	"summary" text NOT NULL,
	"full_review" text NOT NULL,
	"papers_covered" integer,
	"tags" text,
	"key_findings" text,
	"pdf_url" text,
	"last_updated" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "literature_reviews_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "prototypes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" varchar(160) NOT NULL,
	"description" text NOT NULL,
	"full_description" text,
	"status" varchar(30) NOT NULL,
	"demo_url" text,
	"repo_url" text,
	"external_url" text,
	"stack" text,
	"use_cases" text,
	"tags" text,
	"screenshots" text,
	"video_url" text,
	"related_paper" integer,
	"related_dataset" integer,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	CONSTRAINT "prototypes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "research_artifacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"file_url" text,
	"external_url" text,
	"youtube_id" varchar(50),
	"metadata" text,
	"tags" text,
	"collection_date" timestamp,
	"related_paper" integer,
	"thumbnail" text,
	"file_size" integer,
	"created_at" timestamp DEFAULT now(),
	"featured" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "research_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" varchar(160) NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text,
	"status" varchar(30) NOT NULL,
	"research_type" varchar(50),
	"research_questions" text NOT NULL,
	"key_findings" text,
	"milestones" text NOT NULL,
	"methodology" text,
	"geographic_focus" text,
	"tags" text,
	"related_publications" text,
	"references" text,
	"team_members" text,
	"funding_status" varchar(30),
	"funding_source" text,
	"start_date" timestamp,
	"estimated_completion" timestamp,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	CONSTRAINT "research_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "social_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"platform" varchar(30) NOT NULL,
	"post_url" text NOT NULL,
	"excerpt" text,
	"published_date" timestamp NOT NULL,
	"tags" text,
	"engagement" integer,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "updates" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" varchar(160) NOT NULL,
	"summary" text NOT NULL,
	"content" text NOT NULL,
	"author" varchar(120) NOT NULL,
	"date" timestamp NOT NULL,
	"location" varchar(200),
	"update_type" varchar(50),
	"tags" text,
	"images" text,
	"related_theme" integer,
	"related_publication" integer,
	"featured" boolean DEFAULT false,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	CONSTRAINT "updates_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "working_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" varchar(160) NOT NULL,
	"abstract" text NOT NULL,
	"authors" text NOT NULL,
	"co_authors" text,
	"version" varchar(20) DEFAULT 'v1.0',
	"status" varchar(30) NOT NULL,
	"pdf_url" text,
	"file_size" integer,
	"tags" text,
	"keywords" text,
	"research_area" varchar(100),
	"last_updated" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"published_date" timestamp,
	CONSTRAINT "working_papers_slug_unique" UNIQUE("slug")
);
