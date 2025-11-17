import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { workingPapers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single working paper by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const paperId = parseInt(id);

    if (isNaN(paperId)) {
      return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
    }

    const papers = await db
      .select()
      .from(workingPapers)
      .where(eq(workingPapers.id, paperId))
      .limit(1);

    if (papers.length === 0) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    const paper = papers[0];
    const parsedPaper = {
      ...paper,
      authors: paper.authors ? JSON.parse(paper.authors) : [],
      coAuthors: paper.coAuthors ? JSON.parse(paper.coAuthors) : [],
      tags: paper.tags ? JSON.parse(paper.tags) : [],
      keywords: paper.keywords ? JSON.parse(paper.keywords) : [],
    };

    return NextResponse.json(parsedPaper, { status: 200 });
  } catch (error) {
    console.error("Error fetching working paper:", error);
    return NextResponse.json(
      { error: "Failed to fetch working paper" },
      { status: 500 }
    );
  }
}

// PUT: Update working paper
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const hasAccess = await isAdmin();
  if (!hasAccess) {
    return NextResponse.json(
      { error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const paperId = parseInt(id);

    if (isNaN(paperId)) {
      return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      abstract,
      authors,
      coAuthors,
      version,
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
          error: "Missing required fields: title, slug, abstract, authors, status",
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

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug must be lowercase with hyphens only" },
        { status: 400 }
      );
    }

    // Check if slug is taken by another paper
    const existingPapers = await db
      .select()
      .from(workingPapers)
      .where(eq(workingPapers.slug, slug));

    if (existingPapers.length > 0 && existingPapers[0].id !== paperId) {
      return NextResponse.json(
        { error: "A paper with this slug already exists" },
        { status: 400 }
      );
    }

    // Update the paper
    const [updatedPaper] = await db
      .update(workingPapers)
      .set({
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
        lastUpdated: new Date(),
      })
      .where(eq(workingPapers.id, paperId))
      .returning();

    if (!updatedPaper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Working paper updated successfully",
        paper: {
          ...updatedPaper,
          authors: JSON.parse(updatedPaper.authors),
          coAuthors: updatedPaper.coAuthors ? JSON.parse(updatedPaper.coAuthors) : [],
          tags: updatedPaper.tags ? JSON.parse(updatedPaper.tags) : [],
          keywords: updatedPaper.keywords ? JSON.parse(updatedPaper.keywords) : [],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating working paper:", error);
    return NextResponse.json(
      { error: "Failed to update working paper" },
      { status: 500 }
    );
  }
}

// DELETE: Delete working paper
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const hasAccess = await isAdmin();
  if (!hasAccess) {
    return NextResponse.json(
      { error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const paperId = parseInt(id);

    if (isNaN(paperId)) {
      return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
    }

    await db.delete(workingPapers).where(eq(workingPapers.id, paperId));

    return NextResponse.json(
      { message: "Working paper deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting working paper:", error);
    return NextResponse.json(
      { error: "Failed to delete working paper" },
      { status: 500 }
    );
  }
}
