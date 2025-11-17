import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { researchArtifacts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single research artifact by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const artifactId = parseInt(id);

    if (isNaN(artifactId)) {
      return NextResponse.json({ error: "Invalid artifact ID" }, { status: 400 });
    }

    const artifacts = await db
      .select()
      .from(researchArtifacts)
      .where(eq(researchArtifacts.id, artifactId))
      .limit(1);

    if (artifacts.length === 0) {
      return NextResponse.json({ error: "Artifact not found" }, { status: 404 });
    }

    const artifact = artifacts[0];
    const parsedArtifact = {
      ...artifact,
      tags: artifact.tags ? JSON.parse(artifact.tags) : [],
      metadata: artifact.metadata ? JSON.parse(artifact.metadata) : {},
    };

    return NextResponse.json(parsedArtifact, { status: 200 });
  } catch (error) {
    console.error("Error fetching research artifact:", error);
    return NextResponse.json(
      { error: "Failed to fetch research artifact" },
      { status: 500 }
    );
  }
}

// PUT: Update research artifact
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
    const artifactId = parseInt(id);

    if (isNaN(artifactId)) {
      return NextResponse.json({ error: "Invalid artifact ID" }, { status: 400 });
    }

    const body = await request.json();

    // Update the artifact
    const [updatedArtifact] = await db
      .update(researchArtifacts)
      .set({
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
        collectionDate: body.collectionDate ? new Date(body.collectionDate) : null,
      })
      .where(eq(researchArtifacts.id, artifactId))
      .returning();

    if (!updatedArtifact) {
      return NextResponse.json({ error: "Artifact not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Research artifact updated successfully", artifact: updatedArtifact },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating research artifact:", error);
    return NextResponse.json(
      { error: "Failed to update research artifact" },
      { status: 500 }
    );
  }
}

// DELETE: Delete research artifact
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
    const artifactId = parseInt(id);

    if (isNaN(artifactId)) {
      return NextResponse.json({ error: "Invalid artifact ID" }, { status: 400 });
    }

    await db.delete(researchArtifacts).where(eq(researchArtifacts.id, artifactId));

    return NextResponse.json(
      { message: "Research artifact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting research artifact:", error);
    return NextResponse.json(
      { error: "Failed to delete research artifact" },
      { status: 500 }
    );
  }
}
