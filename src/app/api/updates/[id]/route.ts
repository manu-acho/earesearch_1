import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { updates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single update by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateId = parseInt(id);

    if (isNaN(updateId)) {
      return NextResponse.json({ error: "Invalid update ID" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(updates)
      .where(eq(updates.id, updateId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Update not found" }, { status: 404 });
    }

    const update = result[0];
    const parsedUpdate = {
      ...update,
      tags: update.tags ? JSON.parse(update.tags) : [],
      images: update.images ? JSON.parse(update.images) : [],
    };

    return NextResponse.json(parsedUpdate, { status: 200 });
  } catch (error) {
    console.error("Error fetching update:", error);
    return NextResponse.json(
      { error: "Failed to fetch update" },
      { status: 500 }
    );
  }
}

// PUT: Update update
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
    const updateId = parseInt(id);

    if (isNaN(updateId)) {
      return NextResponse.json({ error: "Invalid update ID" }, { status: 400 });
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
        .from(updates)
        .where(eq(updates.slug, body.slug))
        .limit(1);

      if (existing.length > 0 && existing[0].id !== updateId) {
        return NextResponse.json(
          { error: "An update with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Update the update
    const [updatedUpdate] = await db
      .update(updates)
      .set({
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        images: body.images ? JSON.stringify(body.images) : null,
        date: body.date ? new Date(body.date) : null,
        lastUpdated: new Date(),
      })
      .where(eq(updates.id, updateId))
      .returning();

    if (!updatedUpdate) {
      return NextResponse.json({ error: "Update not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Update updated successfully", update: updatedUpdate },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating update:", error);
    return NextResponse.json(
      { error: "Failed to update update" },
      { status: 500 }
    );
  }
}

// DELETE: Delete update
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
    const updateId = parseInt(id);

    if (isNaN(updateId)) {
      return NextResponse.json({ error: "Invalid update ID" }, { status: 400 });
    }

    await db.delete(updates).where(eq(updates.id, updateId));

    return NextResponse.json(
      { message: "Update deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting update:", error);
    return NextResponse.json(
      { error: "Failed to delete update" },
      { status: 500 }
    );
  }
}
