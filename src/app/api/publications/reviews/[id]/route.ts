import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { literatureReviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single literature review by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const reviews = await db
      .select()
      .from(literatureReviews)
      .where(eq(literatureReviews.id, reviewId))
      .limit(1);

    if (reviews.length === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const review = reviews[0];
    const parsedReview = {
      ...review,
      tags: review.tags ? JSON.parse(review.tags) : [],
      keyFindings: review.keyFindings ? JSON.parse(review.keyFindings) : [],
    };

    return NextResponse.json(parsedReview, { status: 200 });
  } catch (error) {
    console.error("Error fetching literature review:", error);
    return NextResponse.json(
      { error: "Failed to fetch literature review" },
      { status: 500 }
    );
  }
}

// PUT: Update literature review
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
    const reviewId = parseInt(id);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const body = await request.json();

    // Validate slug format if provided
    if (body.slug && !/^[a-z0-9-]+$/.test(body.slug)) {
      return NextResponse.json(
        { error: "Slug must contain only lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    // Check for duplicate slug if slug is being changed
    if (body.slug) {
      const existing = await db
        .select()
        .from(literatureReviews)
        .where(eq(literatureReviews.slug, body.slug))
        .limit(1);

      if (existing.length > 0 && existing[0].id !== reviewId) {
        return NextResponse.json(
          { error: "A review with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Update the review
    const [updatedReview] = await db
      .update(literatureReviews)
      .set({
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        keyFindings: body.keyFindings ? JSON.stringify(body.keyFindings) : null,
        lastUpdated: new Date(),
      })
      .where(eq(literatureReviews.id, reviewId))
      .returning();

    if (!updatedReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Literature review updated successfully", review: updatedReview },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating literature review:", error);
    return NextResponse.json(
      { error: "Failed to update literature review" },
      { status: 500 }
    );
  }
}

// DELETE: Delete literature review
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
    const reviewId = parseInt(id);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    await db.delete(literatureReviews).where(eq(literatureReviews.id, reviewId));

    return NextResponse.json(
      { message: "Literature review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting literature review:", error);
    return NextResponse.json(
      { error: "Failed to delete literature review" },
      { status: 500 }
    );
  }
}
