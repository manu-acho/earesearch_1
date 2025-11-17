import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { updates } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get("featured");
    const updateType = searchParams.get("type");
    const published = searchParams.get("published");

    type UpdateRow = typeof updates.$inferSelect;
    let updatesList: UpdateRow[] = await db
      .select()
      .from(updates)
      .orderBy(desc(updates.date));

    // Filter by featured
    if (featured === "true") {
      updatesList = updatesList.filter((update) => update.featured === true);
    }

    // Filter by type
    if (updateType) {
      updatesList = updatesList.filter((update) => update.updateType === updateType);
    }

    // Filter by published status (default to only published)
    if (published !== "all") {
      updatesList = updatesList.filter((update) => update.published === true);
    }

    // Parse JSON fields
    const updatesWithParsedJson = updatesList.map((update) => ({
      ...update,
      tags: update.tags ? JSON.parse(update.tags) : [],
      images: update.images ? JSON.parse(update.images) : [],
    }));

    return NextResponse.json(updatesWithParsedJson);
  } catch (error) {
    console.error("Error fetching updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch updates" },
      { status: 500 }
    );
  }
}

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

    // Validate required fields
    if (!body.title || !body.summary || !body.content || !body.author || !body.date) {
      return NextResponse.json(
        { error: "Missing required fields: title, summary, content, author, date" },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    // Stringify JSON fields
    const updateData = {
      title: body.title,
      slug: slug,
      summary: body.summary,
      content: body.content,
      author: body.author,
      date: new Date(body.date),
      location: body.location || null,
      updateType: body.updateType || "research-update",
      tags: body.tags ? JSON.stringify(body.tags) : null,
      images: body.images ? JSON.stringify(body.images) : null,
      relatedTheme: body.relatedTheme || null,
      relatedPublication: body.relatedPublication || null,
      featured: body.featured || false,
      published: body.published !== undefined ? body.published : true,
    };

    const result = await db.insert(updates).values(updateData).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating update:", error);
    return NextResponse.json(
      { error: "Failed to create update" },
      { status: 500 }
    );
  }
}
