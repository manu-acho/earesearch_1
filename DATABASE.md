# E.A Research - Publications Database Schema

This document describes the database schema for the comprehensive publications management system.

## Overview

The publications system is designed to handle 5 types of content:
1. **External Papers** - Curated library of research from other authors
2. **Working Papers** - Your original research with version control
3. **Literature Reviews** - Comprehensive synthesis documents
4. **Social Posts** - LinkedIn and other social media content
5. **Research Artifacts** - Videos, interviews, field notes, datasets

## Database Tables

### 1. external_papers

Curated collection of research papers from other authors. Papers link to external download sites (arXiv, ResearchGate, author websites, etc.)

```sql
CREATE TABLE external_papers (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  year INTEGER NOT NULL,
  abstract TEXT,
  download_url TEXT NOT NULL,  -- Link to external site
  source_website TEXT,          -- e.g., "arXiv", "ResearchGate"
  doi TEXT,
  tags TEXT,                     -- JSON array: ["ASR", "Agriculture"]
  category VARCHAR(50),          -- e.g., "Voice AI", "Digital Agriculture"
  notes TEXT,                    -- Why this paper is relevant
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Use Case**: Add papers you reference, find inspiring, or want to share with others.

### 2. working_papers

Your original research papers with full version control and file upload support.

```sql
CREATE TABLE working_papers (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug VARCHAR(160) UNIQUE NOT NULL,
  abstract TEXT NOT NULL,
  authors TEXT NOT NULL,         -- JSON array: ["Emmanuel M."]
  co_authors TEXT,               -- JSON array: ["John Doe", "Jane Smith"]
  version VARCHAR(20) DEFAULT 'v1.0',
  status VARCHAR(30) NOT NULL,   -- "draft", "under-review", "revised", "completed"
  pdf_url TEXT,                  -- Uploaded PDF file URL
  file_size INTEGER,             -- In bytes
  tags TEXT,                     -- JSON array
  keywords TEXT,                 -- JSON array for SEO
  research_area VARCHAR(100),    -- e.g., "Voice-First ASR"
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  published_date TIMESTAMP
);
```

**Workflow**:
1. Upload initial draft (v1.0)
2. Update to v1.1 after revisions
3. Change status as paper progresses through review
4. Optional: Publish final version with published_date

### 3. literature_reviews

Comprehensive review documents synthesizing multiple research papers.

```sql
CREATE TABLE literature_reviews (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug VARCHAR(160) UNIQUE NOT NULL,
  topic TEXT NOT NULL,           -- Main topic of review
  summary TEXT NOT NULL,         -- Short summary
  full_review TEXT NOT NULL,     -- Full markdown content
  papers_covered INTEGER,        -- Number of papers reviewed
  tags TEXT,                     -- JSON array
  key_findings TEXT,             -- JSON array of main insights
  pdf_url TEXT,                  -- Optional PDF export
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose**: Synthesize research across multiple papers, identify gaps, suggest future directions.

### 4. social_posts

Links to your social media content (LinkedIn, Twitter/X, Medium, etc.)

```sql
CREATE TABLE social_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  platform VARCHAR(30) NOT NULL, -- "linkedin", "twitter", "medium"
  post_url TEXT NOT NULL,        -- Direct link to post
  excerpt TEXT,                  -- Brief excerpt/summary
  published_date TIMESTAMP NOT NULL,
  tags TEXT,                     -- JSON array
  engagement INTEGER,            -- Likes, shares, etc. (optional)
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Use Case**: Showcase research insights shared on social platforms, drive engagement.

### 5. research_artifacts

Rich media and supporting materials: interviews, videos, field notes, images, audio recordings.

```sql
CREATE TABLE research_artifacts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,     -- "interview", "video", "fieldnotes", "dataset", "image", "audio"
  description TEXT NOT NULL,
  file_url TEXT,                 -- For uploaded files
  external_url TEXT,             -- For external hosting (YouTube, Vimeo)
  youtube_id VARCHAR(50),        -- For embedding YouTube videos
  metadata TEXT,                 -- JSON: {duration, location, participants, etc.}
  tags TEXT,                     -- JSON array
  collection_date TIMESTAMP,     -- When data was collected
  related_paper INTEGER,         -- FK to working_papers.id
  thumbnail TEXT,                -- Thumbnail image URL
  file_size INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Examples**:
- YouTube videos of presentations
- Interview transcripts from field research
- Field notes from Kiambu County visits
- Voice recordings in Kiswahili
- Photos from research sites

### 6. contacts

Contact form submissions (existing table).

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  org VARCHAR(160),
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE
);
```

## Next Steps

### 1. Generate Migration

```bash
npm run db:generate
```

This will create a migration file in `drizzle/` based on the schema changes.

### 2. Push to Database

```bash
npm run db:push
```

This applies the schema to your PostgreSQL database.

### 3. Set Environment Variables

Create `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/earesearch"
```

### 4. API Routes to Create

- `/api/publications/library` - GET/POST for external papers
- `/api/publications/working` - GET/POST for working papers  
- `/api/publications/reviews` - GET/POST for literature reviews
- `/api/publications/social` - GET/POST for social posts
- `/api/publications/artifacts` - GET/POST for research artifacts

Each endpoint will:
- **GET**: Return all records (with optional filtering)
- **POST**: Create new record with validation
- Support file uploads for PDFs, images, etc.

### 5. File Upload Strategy

For file uploads (PDFs, images, videos), consider:

**Option A: Netlify Blob Storage** (Recommended)
- Integrated with Netlify deployment
- Simple API for uploads
- CDN-backed

**Option B: AWS S3 / DigitalOcean Spaces**
- More control
- Cost-effective for large files
- Requires additional configuration

**Option C: Local Storage (Development Only)**
- Store in `public/uploads/`
- Not recommended for production

## JSON Field Examples

### Tags Array
```json
["ASR", "Voice-First", "Agriculture", "Kenya"]
```

### Authors Array
```json
["Emmanuel M.", "John Doe", "Jane Smith"]
```

### Metadata for Artifacts
```json
{
  "duration": "45:30",
  "location": "Kiambu County, Kenya",
  "participants": ["Farmer Group A", "Extension Officer"],
  "language": "Kiswahili",
  "equipment": "Audio recorder + smartphone"
}
```

### Key Findings for Reviews
```json
[
  "Voice-first interfaces show 40% higher adoption among smallholder farmers",
  "Sub-500ms latency is critical for natural conversation",
  "Code-switching between English and Kiswahili is common"
]
```

## Admin Interface

The admin routes (`/admin/publications/*`) will provide forms for:

1. **Adding external papers**: Title, authors, year, abstract, download URL, tags
2. **Uploading working papers**: PDF upload, metadata, version control
3. **Writing literature reviews**: Rich text editor, paper count, key findings
4. **Linking social posts**: Platform, URL, excerpt, publication date
5. **Adding artifacts**: File/video upload, YouTube embed, metadata

Simple password protection will be added to admin routes to prevent unauthorized access.

## Future Enhancements

- **Full-text search** across all content types
- **Citation management** (BibTeX export)
- **Related content suggestions** (ML-based)
- **Analytics dashboard** (views, downloads, engagement)
- **RAG AI Assistant** (Flowise/n8n integration)
- **Automated paper discovery** (arXiv API integration)
- **Email notifications** when new papers are added

---

**Note**: Remember to run database migrations before deploying to production!
