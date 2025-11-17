import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { datasets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single dataset by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const datasetId = parseInt(id);

    if (isNaN(datasetId)) {
      return NextResponse.json({ error: "Invalid dataset ID" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(datasets)
      .where(eq(datasets.id, datasetId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    const dataset = result[0];
    const parsedDataset = {
      ...dataset,
      languages: dataset.languages ? JSON.parse(dataset.languages) : [],
      domains: dataset.domains ? JSON.parse(dataset.domains) : [],
      tags: dataset.tags ? JSON.parse(dataset.tags) : [],
      stats: dataset.stats ? JSON.parse(dataset.stats) : {},
    };

    return NextResponse.json(parsedDataset, { status: 200 });
  } catch (error) {
    console.error("Error fetching dataset:", error);
    return NextResponse.json(
      { error: "Failed to fetch dataset" },
      { status: 500 }
    );
  }
}

// PUT: Update dataset
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
    const datasetId = parseInt(id);

    if (isNaN(datasetId)) {
      return NextResponse.json({ error: "Invalid dataset ID" }, { status: 400 });
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
        .from(datasets)
        .where(eq(datasets.slug, body.slug))
        .limit(1);

      if (existing.length > 0 && existing[0].id !== datasetId) {
        return NextResponse.json(
          { error: "A dataset with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Update the dataset
    const [updatedDataset] = await db
      .update(datasets)
      .set({
        ...body,
        languages: body.languages ? JSON.stringify(body.languages) : null,
        domains: body.domains ? JSON.stringify(body.domains) : null,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        stats: body.stats ? JSON.stringify(body.stats) : null,
        lastUpdated: new Date(),
      })
      .where(eq(datasets.id, datasetId))
      .returning();

    if (!updatedDataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Dataset updated successfully", dataset: updatedDataset },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating dataset:", error);
    return NextResponse.json(
      { error: "Failed to update dataset" },
      { status: 500 }
    );
  }
}

// DELETE: Delete dataset
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
    const datasetId = parseInt(id);

    if (isNaN(datasetId)) {
      return NextResponse.json({ error: "Invalid dataset ID" }, { status: 400 });
    }

    await db.delete(datasets).where(eq(datasets.id, datasetId));

    return NextResponse.json(
      { message: "Dataset deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting dataset:", error);
    return NextResponse.json(
      { error: "Failed to delete dataset" },
      { status: 500 }
    );
  }
}
