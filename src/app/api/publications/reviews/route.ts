import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { literatureReviews } from "@/db/schema";
import { desc, like } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch all literature reviews with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const topic = searchParams.get("topic");

    let reviews = await db
      .select()
      .from(literatureReviews)
      .orderBy(desc(literatureReviews.lastUpdated));

    // Apply filters
    if (query) {
      reviews = reviews.filter(
        (r: typeof literatureReviews.$inferSelect) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.topic.toLowerCase().includes(query.toLowerCase()) ||
          r.summary.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (topic) {
      reviews = reviews.filter((r: typeof literatureReviews.$inferSelect) =>
        r.topic.toLowerCase().includes(topic.toLowerCase())
      );
    }

    // Parse JSON fields
    const parsedReviews = reviews.map((review: typeof literatureReviews.$inferSelect) => ({
      ...review,
      tags: review.tags ? JSON.parse(review.tags) : [],
      keyFindings: review.keyFindings ? JSON.parse(review.keyFindings) : [],
    }));

    return NextResponse.json(parsedReviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching literature reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch literature reviews" },
      { status: 500 }
    );
  }
}

// POST: Add new literature review
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
      topic,
      summary,
      fullReview,
      papersCovered,
      tags,
      keyFindings,
      pdfUrl,
    } = body;

    // Validation
    if (!title || !slug || !topic || !summary || !fullReview) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, slug, topic, summary, fullReview",
        },
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

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(literatureReviews)
      .where(like(literatureReviews.slug, slug));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "A review with this slug already exists" },
        { status: 400 }
      );
    }

    // Validate papers covered
    if (papersCovered && (papersCovered < 1 || papersCovered > 10000)) {
      return NextResponse.json(
        { error: "Papers covered must be between 1 and 10000" },
        { status: 400 }
      );
    }

    // Insert into database
    const [newReview] = await db
      .insert(literatureReviews)
      .values({
        title,
        slug,
        topic,
        summary,
        fullReview,
        papersCovered: papersCovered || null,
        tags: tags ? JSON.stringify(tags) : null,
        keyFindings: keyFindings ? JSON.stringify(keyFindings) : null,
        pdfUrl: pdfUrl || null,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Literature review added successfully",
        review: {
          ...newReview,
          tags: newReview.tags ? JSON.parse(newReview.tags) : [],
          keyFindings: newReview.keyFindings
            ? JSON.parse(newReview.keyFindings)
            : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding literature review:", error);
    return NextResponse.json(
      { error: "Failed to add literature review" },
      { status: 500 }
    );
  }
}
