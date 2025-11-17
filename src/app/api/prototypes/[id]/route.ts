import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { prototypes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single prototype by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prototypeId = parseInt(id);

    if (isNaN(prototypeId)) {
      return NextResponse.json({ error: "Invalid prototype ID" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(prototypes)
      .where(eq(prototypes.id, prototypeId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Prototype not found" }, { status: 404 });
    }

    const prototype = result[0];
    const parsedPrototype = {
      ...prototype,
      stack: prototype.stack ? JSON.parse(prototype.stack) : [],
      useCases: prototype.useCases ? JSON.parse(prototype.useCases) : [],
      tags: prototype.tags ? JSON.parse(prototype.tags) : [],
      screenshots: prototype.screenshots ? JSON.parse(prototype.screenshots) : [],
    };

    return NextResponse.json(parsedPrototype, { status: 200 });
  } catch (error) {
    console.error("Error fetching prototype:", error);
    return NextResponse.json(
      { error: "Failed to fetch prototype" },
      { status: 500 }
    );
  }
}

// PUT: Update prototype
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
    const prototypeId = parseInt(id);

    if (isNaN(prototypeId)) {
      return NextResponse.json({ error: "Invalid prototype ID" }, { status: 400 });
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
        .from(prototypes)
        .where(eq(prototypes.slug, body.slug))
        .limit(1);

      if (existing.length > 0 && existing[0].id !== prototypeId) {
        return NextResponse.json(
          { error: "A prototype with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Update the prototype
    const [updatedPrototype] = await db
      .update(prototypes)
      .set({
        ...body,
        stack: body.stack ? JSON.stringify(body.stack) : null,
        useCases: body.useCases ? JSON.stringify(body.useCases) : null,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        screenshots: body.screenshots ? JSON.stringify(body.screenshots) : null,
        lastUpdated: new Date(),
      })
      .where(eq(prototypes.id, prototypeId))
      .returning();

    if (!updatedPrototype) {
      return NextResponse.json({ error: "Prototype not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Prototype updated successfully", prototype: updatedPrototype },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating prototype:", error);
    return NextResponse.json(
      { error: "Failed to update prototype" },
      { status: 500 }
    );
  }
}

// DELETE: Delete prototype
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
    const prototypeId = parseInt(id);

    if (isNaN(prototypeId)) {
      return NextResponse.json({ error: "Invalid prototype ID" }, { status: 400 });
    }

    await db.delete(prototypes).where(eq(prototypes.id, prototypeId));

    return NextResponse.json(
      { message: "Prototype deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting prototype:", error);
    return NextResponse.json(
      { error: "Failed to delete prototype" },
      { status: 500 }
    );
  }
}
