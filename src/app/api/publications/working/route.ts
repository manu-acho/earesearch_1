import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { workingPapers } from "@/db/schema";
import { desc, like, or } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch all working papers with optional filters
export async function GET(request: NextRequest) {
  try {
    console.log("=== Working Papers API Called ===");
    console.log("DB instance:", db ? "exists" : "null");
    
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const status = searchParams.get("status");
    const researchArea = searchParams.get("researchArea");

    console.log("Attempting to query database...");
    let papers = await db
      .select()
      .from(workingPapers)
      .orderBy(desc(workingPapers.lastUpdated));
    
    console.log("Papers fetched:", papers.length);

    // Apply filters
    if (query) {
      papers = papers.filter(
        (p: typeof workingPapers.$inferSelect) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.abstract.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status) {
      papers = papers.filter((p: typeof workingPapers.$inferSelect) => p.status === status);
    }

    if (researchArea) {
      papers = papers.filter((p: typeof workingPapers.$inferSelect) => p.researchArea === researchArea);
    }

    // Parse JSON fields
    const parsedPapers = papers.map((paper: typeof workingPapers.$inferSelect) => ({
      ...paper,
      authors: paper.authors ? JSON.parse(paper.authors) : [],
      coAuthors: paper.coAuthors ? JSON.parse(paper.coAuthors) : [],
      tags: paper.tags ? JSON.parse(paper.tags) : [],
      keywords: paper.keywords ? JSON.parse(paper.keywords) : [],
    }));

    return NextResponse.json(parsedPapers, { status: 200 });
  } catch (error) {
    console.error("=== ERROR fetching working papers ===");
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      { error: "Failed to fetch working papers", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST: Add new working paper
export async function POST(request: NextRequest) {
  // Check authentication
  const hasAccess = await isAdmin();
  if (!hasAccess) {
    return NextResponse.json(
      { error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      abstract,
      authors,
      coAuthors,
      version = "v1.0",
      status,
      pdfUrl,
      fileSize,
      tags,
      keywords,
      researchArea,
      publishedDate,
    } = body;

    // Validation
    if (!title || !slug || !abstract || !authors || !status) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, slug, abstract, authors, status",
        },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["draft", "under-review", "revised", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate slug format (lowercase, hyphens only)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug must be lowercase with hyphens only" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(workingPapers)
      .where(like(workingPapers.slug, slug));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "A paper with this slug already exists" },
        { status: 400 }
      );
    }

    // Insert into database
    const [newPaper] = await db
      .insert(workingPapers)
      .values({
        title,
        slug,
        abstract,
        authors: JSON.stringify(authors),
        coAuthors: coAuthors ? JSON.stringify(coAuthors) : null,
        version,
        status,
        pdfUrl: pdfUrl || null,
        fileSize: fileSize || null,
        tags: tags ? JSON.stringify(tags) : null,
        keywords: keywords ? JSON.stringify(keywords) : null,
        researchArea: researchArea || null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Working paper added successfully",
        paper: {
          ...newPaper,
          authors: JSON.parse(newPaper.authors),
          coAuthors: newPaper.coAuthors ? JSON.parse(newPaper.coAuthors) : [],
          tags: newPaper.tags ? JSON.parse(newPaper.tags) : [],
          keywords: newPaper.keywords ? JSON.parse(newPaper.keywords) : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding working paper:", error);
    return NextResponse.json(
      { error: "Failed to add working paper" },
      { status: 500 }
    );
  }
}
