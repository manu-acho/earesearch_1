# E.A Research Website

Modern research website for E.A Research, focused on equitable digital agriculture with voice-first interfaces, tokenization, and zero-knowledge privacy.

## 🚀 Features

### Publications CMS
Complete content management system with 5 publication types:
- **Library**: Curated external papers from other researchers
- **Working Papers**: Your research with version control and PDF uploads
- **Literature Reviews**: Comprehensive synthesis documents
- **Social Posts**: LinkedIn, Twitter, Medium, YouTube content tracking
- **Research Artifacts**: Videos, interviews, field notes with YouTube embedding

### Database-Backed Prototypes
- Dynamic prototype listing with status tracking
- External links, demo URLs, repository links
- Tech stack and use case tagging
- Related papers and datasets linking

### Content Management
- **Research Themes**: MDX-powered theme pages
- **Datasets**: Agricultural corpus and research data
- **Updates**: Blog-style field notes and announcements
- **Partners**: Featured partner organizations

### Contact & Communication
- Contact form with email notifications to emmanuel@earesearch.net
- Physical address in Orpund, Switzerland
- Database storage of all inquiries

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS with Web3-inspired theme
- **Content**: Contentlayer2 for MDX, Drizzle ORM for database
- **Database**: PostgreSQL (Neon)
- **Email**: Resend for notifications
- **UI Components**: shadcn/ui
- **Deployment**: Netlify

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd earesearch

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
# DATABASE_URL=postgresql://...
# RESEND_API_KEY=re_...
# ADMIN_PASSWORD=your_secure_password
```

## 🗄️ Database Setup

### 1. Create Neon Database
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

### 2. Run Migrations
```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push

# Or use Drizzle Studio to inspect
npm run db:studio
```

### 3. Verify Tables
The following tables should be created:
- `external_papers`
- `working_papers`
- `literature_reviews`
- `social_posts`
- `research_artifacts`
- `prototypes`
- `contacts`

## 📧 Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (earesearch.net)
3. Create an API key
4. Add to `.env.local`:
```bash
RESEND_API_KEY=re_your_api_key_here
```

Contact form submissions will email to emmanuel@earesearch.net

## 🔐 Admin Access

Admin forms are currently unprotected. Need to add authentication before production:

### Option 1: Simple Password Middleware
Create `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  }
  
  return NextResponse.next();
}
```

### Option 2: NextAuth.js
For more robust authentication, implement NextAuth.js with credentials provider.

## 🚀 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── (public pages)
│   │   ├── page.tsx                 # Home
│   │   ├── research/                # Research themes
│   │   ├── publications/            # Publications CMS
│   │   ├── datasets/                # Datasets
│   │   ├── prototypes/              # Prototypes
│   │   ├── updates/                 # Blog/updates
│   │   ├── partners/                # Partners
│   │   └── contact/                 # Contact form
│   ├── admin/
│   │   ├── publications/
│   │   │   ├── library/new/        # Add external papers
│   │   │   ├── working/new/        # Add working papers
│   │   │   ├── reviews/new/        # Add literature reviews
│   │   │   ├── social/new/         # Add social posts
│   │   │   └── artifacts/new/      # Add artifacts
│   │   └── prototypes/new/         # Add prototypes
│   └── api/
│       ├── publications/
│       │   ├── library/route.ts
│       │   ├── working/route.ts
│       │   ├── reviews/route.ts
│       │   ├── social/route.ts
│       │   └── artifacts/route.ts
│       ├── prototypes/route.ts
│       └── contact/route.ts
├── components/
│   ├── navigation.tsx
│   ├── *-card.tsx                  # Various card components
│   └── ui/                         # shadcn/ui components
├── db/
│   ├── client.ts                   # Drizzle client
│   └── schema.ts                   # Database schema
└── lib/
    ├── content.ts                  # Contentlayer utilities
    └── utils.ts                    # Utility functions

content/                            # MDX content files
├── themes/
├── datasets/
└── updates/
```

## 🌐 Deployment to Netlify

### 1. Initial Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

### 2. Configure Environment Variables
In Netlify dashboard, add:
```
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_SITE_URL=https://earesearch.net
```

### 3. Link Neon Database
```bash
# In your local project
netlify env:set DATABASE_URL "postgresql://user:pass@host.neon.tech/db?sslmode=require"
```

### 4. Run Migrations on Production
After first deployment:
```bash
# Generate migration
npm run db:generate

# Push to production database
npm run db:push
```

## 📝 Content Management

### Adding Content via Admin Forms

1. **External Papers**: `/admin/publications/library/new`
   - Add papers from other researchers
   - Include download links and citations

2. **Working Papers**: `/admin/publications/working/new`
   - Upload your research papers
   - Track versions and review status

3. **Literature Reviews**: `/admin/publications/reviews/new`
   - Write comprehensive reviews
   - Track papers covered and key findings

4. **Social Posts**: `/admin/publications/social/new`
   - Link LinkedIn, Twitter, Medium posts
   - Track engagement metrics

5. **Research Artifacts**: `/admin/publications/artifacts/new`
   - Upload videos, interviews, field notes
   - Embed YouTube videos with ID

6. **Prototypes**: `/admin/prototypes/new`
   - Add experimental systems
   - Link to demos, repos, external projects

### Adding MDX Content

For themes, datasets, and updates, create `.mdx` files in `content/` folders:

```mdx
---
title: "New Dataset"
description: "Description here"
date: "2024-11-10"
---

Your content here with **markdown** support.
```

## 🎨 Design System

### Colors
- Primary: `hsl(217, 91%, 60%)` - Blue
- Background: White with blue tints
- Accents: Blue gradients

### Components
All styled with Web3-inspired aesthetics:
- Gradient backgrounds
- Glassmorphism effects
- Hover lift animations
- Blue shadow tints

## 📚 Documentation

- `DATABASE.md` - Complete database schema documentation
- `IMPLEMENTATION_STATUS.md` - Current implementation status
- `.env.example` - Environment variable template

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

## 📄 License

Proprietary - E.A Research

## 📞 Contact

**E.A Research**  
Hauptstrasse 194  
2552 Orpund  
Bern, Switzerland

Email: emmanuel@earesearch.net
