import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { externalPapers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single external paper by ID
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
      .from(externalPapers)
      .where(eq(externalPapers.id, paperId))
      .limit(1);

    if (papers.length === 0) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    const paper = papers[0];
    const parsedPaper = {
      ...paper,
      tags: paper.tags ? JSON.parse(paper.tags) : [],
    };

    return NextResponse.json(parsedPaper, { status: 200 });
  } catch (error) {
    console.error("Error fetching external paper:", error);
    return NextResponse.json(
      { error: "Failed to fetch external paper" },
      { status: 500 }
    );
  }
}

// PUT: Update external paper
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

    // Update the paper
    const [updatedPaper] = await db
      .update(externalPapers)
      .set({
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : null,
      })
      .where(eq(externalPapers.id, paperId))
      .returning();

    if (!updatedPaper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "External paper updated successfully", paper: updatedPaper },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating external paper:", error);
    return NextResponse.json(
      { error: "Failed to update external paper" },
      { status: 500 }
    );
  }
}

// DELETE: Delete external paper
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

    await db.delete(externalPapers).where(eq(externalPapers.id, paperId));

    return NextResponse.json(
      { message: "External paper deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting external paper:", error);
    return NextResponse.json(
      { error: "Failed to delete external paper" },
      { status: 500 }
    );
  }
}
