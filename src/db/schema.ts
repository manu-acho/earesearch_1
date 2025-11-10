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

// Datasets - research data and corpora
export const datasets = pgTable("datasets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  summary: text("summary").notNull(),
  description: text("description"), // Full markdown description
  size: varchar("size", { length: 50 }), // e.g., "2.5 GB", "10,000 samples"
  format: varchar("format", { length: 100 }), // e.g., "JSON", "CSV", "Audio (WAV)"
  license: varchar("license", { length: 100 }).notNull(), // e.g., "CC BY 4.0", "MIT"
  version: varchar("version", { length: 20 }).default("1.0.0"),
  downloadUrl: text("download_url"),
  documentationUrl: text("documentation_url"),
  doi: varchar("doi", { length: 100 }),
  languages: text("languages"), // JSON array for multilingual datasets
  domains: text("domains"), // JSON array: ["agriculture", "voice"]
  tags: text("tags"), // JSON array
  stats: text("stats"), // JSON object: {"samples": 10000, "hours": 50}
  citation: text("citation"),
  relatedPaper: integer("related_paper"), // FK to working_papers or external_papers
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Research projects - active research programs with questions, findings, and milestones
export const researchProjects = pgTable("research_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  shortDescription: text("short_description").notNull(), // For listing pages
  fullDescription: text("full_description"), // Detailed context and background
  status: varchar("status", { length: 30 }).notNull(), // "active", "completed", "on-hold"
  researchType: varchar("research_type", { length: 50 }), // "systematic-review", "empirical-study", "field-research", "theoretical"
  researchQuestions: text("research_questions").notNull(), // JSON array of RQ objects: [{id, question, description}]
  keyFindings: text("key_findings"), // JSON array of finding objects: [{rqId, findings: [...]}]
  milestones: text("milestones").notNull(), // JSON array: [{id, title, description, dueDate, status, completedDate}]
  methodology: text("methodology"), // Research approach description
  geographicFocus: text("geographic_focus"), // JSON array: ["Sub Saharan Africa", "Kenya"]
  tags: text("tags"), // JSON array
  relatedPublications: text("related_publications"), // JSON array of IDs or titles
  references: text("references"), // JSON array of citation objects or formatted string
  teamMembers: text("team_members"), // JSON array: [{name, role}]
  fundingStatus: varchar("funding_status", { length: 30 }), // "funded", "seeking-funding", "self-funded"
  fundingSource: text("funding_source"),
  startDate: timestamp("start_date"),
  estimatedCompletion: timestamp("estimated_completion"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Updates - field notes, research updates, and news
export const updates = pgTable("updates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(), // Full markdown content
  author: varchar("author", { length: 120 }).notNull(),
  date: timestamp("date").notNull(),
  location: varchar("location", { length: 200 }), // e.g., "Kiambu, Kenya"
  updateType: varchar("update_type", { length: 50 }), // "field-note", "research-update", "announcement", "blog"
  tags: text("tags"), // JSON array
  images: text("images"), // JSON array of image URLs
  relatedTheme: integer("related_theme"), // FK to research_themes
  relatedPublication: integer("related_publication"), // FK to working_papers
  featured: boolean("featured").default(false),
  published: boolean("published").default(true),
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
