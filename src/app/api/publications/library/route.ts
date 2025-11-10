import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { externalPapers } from "@/db/schema";
import { desc, like, or } from "drizzle-orm";

// GET: Fetch all external papers with optional search/filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const year = searchParams.get("year");
    const featured = searchParams.get("featured");

    let papers = await db
      .select()
      .from(externalPapers)
      .orderBy(desc(externalPapers.year), desc(externalPapers.createdAt));

    // Apply filters
    if (query) {
      papers = papers.filter(
        (p: typeof externalPapers.$inferSelect) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.authors.toLowerCase().includes(query.toLowerCase()) ||
          p.abstract?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      papers = papers.filter((p: typeof externalPapers.$inferSelect) => p.category === category);
    }

    if (year) {
      papers = papers.filter((p: typeof externalPapers.$inferSelect) => p.year === parseInt(year));
    }

    if (featured === "true") {
      papers = papers.filter((p: typeof externalPapers.$inferSelect) => p.featured);
    }

    // Parse JSON fields
    const parsedPapers = papers.map((paper: typeof externalPapers.$inferSelect) => ({
      ...paper,
      tags: paper.tags ? JSON.parse(paper.tags) : [],
    }));

    return NextResponse.json(parsedPapers, { status: 200 });
  } catch (error) {
    console.error("Error fetching external papers:", error);
    return NextResponse.json(
      { error: "Failed to fetch external papers" },
      { status: 500 }
    );
  }
}

// POST: Add new external paper
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      authors,
      year,
      abstract,
      downloadUrl,
      sourceWebsite,
      doi,
      tags,
      category,
      notes,
      featured = false,
    } = body;

    // Validation
    if (!title || !authors || !year || !downloadUrl) {
      return NextResponse.json(
        { error: "Missing required fields: title, authors, year, downloadUrl" },
        { status: 400 }
      );
    }

    if (year < 1900 || year > new Date().getFullYear() + 1) {
      return NextResponse.json(
        { error: "Invalid year" },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(downloadUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid download URL" },
        { status: 400 }
      );
    }

    // Insert into database
    const [newPaper] = await db
      .insert(externalPapers)
      .values({
        title,
        authors,
        year,
        abstract: abstract || null,
        downloadUrl,
        sourceWebsite: sourceWebsite || null,
        doi: doi || null,
        tags: tags ? JSON.stringify(tags) : null,
        category: category || null,
        notes: notes || null,
        featured,
      })
      .returning();

    return NextResponse.json(
      {
        message: "External paper added successfully",
        paper: {
          ...newPaper,
          tags: newPaper.tags ? JSON.parse(newPaper.tags) : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding external paper:", error);
    return NextResponse.json(
      { error: "Failed to add external paper" },
      { status: 500 }
    );
  }
}
