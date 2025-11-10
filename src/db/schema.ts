import { pgTable, serial, text, integer, timestamp, boolean, varchar } from "drizzle-orm/pg-core";

// External papers from other researchers (library section)
export const externalPapers = pgTable("external_papers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  year: integer("year").notNull(),
  abstract: text("abstract"),
  downloadUrl: text("download_url").notNull(), // Link to external site
  sourceWebsite: text("source_website"), // e.g., arXiv, ResearchGate, etc.
  doi: text("doi"),
  tags: text("tags"), // JSON string array
  category: varchar("category", { length: 50 }), // e.g., "ASR", "Agriculture", "ML"
  notes: text("notes"), // Personal notes about why this paper is relevant
  createdAt: timestamp("created_at").defaultNow(),
  featured: boolean("featured").default(false),
});

// Your working papers with file uploads
export const workingPapers = pgTable("working_papers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  abstract: text("abstract").notNull(),
  authors: text("authors").notNull(), // JSON string array
  coAuthors: text("co_authors"), // JSON string array
  version: varchar("version", { length: 20 }).default("v1.0"),
  status: varchar("status", { length: 30 }).notNull(), // "draft", "under-review", "revised", "completed"
  pdfUrl: text("pdf_url"), // Uploaded PDF file URL
  fileSize: integer("file_size"), // In bytes
  tags: text("tags"), // JSON string array
  keywords: text("keywords"), // JSON string array
  researchArea: varchar("research_area", { length: 100 }),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  publishedDate: timestamp("published_date"),
});

// Literature reviews and synthesis documents
export const literatureReviews = pgTable("literature_reviews", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  topic: text("topic").notNull(),
  summary: text("summary").notNull(),
  fullReview: text("full_review").notNull(), // Full markdown content
  papersCovered: integer("papers_covered"), // Number of papers reviewed
  tags: text("tags"), // JSON string array
  keyFindings: text("key_findings"), // JSON string array
  pdfUrl: text("pdf_url"), // Optional PDF version
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Social media posts (LinkedIn, Twitter/X, etc.)
export const socialPosts = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  platform: varchar("platform", { length: 30 }).notNull(), // "linkedin", "twitter", "medium"
  postUrl: text("post_url").notNull(),
  excerpt: text("excerpt"),
  publishedDate: timestamp("published_date").notNull(),
  tags: text("tags"), // JSON string array
  engagement: integer("engagement"), // likes, shares, etc.
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Research artifacts (interviews, videos, datasets, field notes, etc.)
export const researchArtifacts = pgTable("research_artifacts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "interview", "video", "fieldnotes", "dataset", "image", "audio"
  description: text("description").notNull(),
  fileUrl: text("file_url"), // For uploaded files
  externalUrl: text("external_url"), // For YouTube, Vimeo, etc.
  youtubeId: varchar("youtube_id", { length: 50 }), // For embedding YouTube videos
  metadata: text("metadata"), // JSON: duration, location, participants, etc.
  tags: text("tags"), // JSON string array
  collectionDate: timestamp("collection_date"),
  relatedPaper: integer("related_paper"), // FK to working_papers
  thumbnail: text("thumbnail"),
  fileSize: integer("file_size"),
  createdAt: timestamp("created_at").defaultNow(),
  featured: boolean("featured").default(false),
});

// Prototypes - experimental systems and tools
export const prototypes = pgTable("prototypes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  description: text("description").notNull(),
  fullDescription: text("full_description"), // Detailed markdown description
  status: varchar("status", { length: 30 }).notNull(), // "prototype", "pilot", "production", "archived"
  demoUrl: text("demo_url"), // Link to live demo
  repoUrl: text("repo_url"), // GitHub/GitLab repository
  externalUrl: text("external_url"), // External hosting if not demo
  stack: text("stack"), // JSON array: ["Next.js", "Python", "FastAPI"]
  useCases: text("use_cases"), // JSON array of use cases
  tags: text("tags"), // JSON array
  screenshots: text("screenshots"), // JSON array of image URLs
  videoUrl: text("video_url"), // Demo video URL
  relatedPaper: integer("related_paper"), // FK to working_papers
  relatedDataset: integer("related_dataset"), // Could link to datasets table
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  org: varchar("org", { length: 160 }),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  processed: boolean("processed").default(false),
});
