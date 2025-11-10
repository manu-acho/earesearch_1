import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { researchArtifacts } from "@/db/schema";
import { desc } from "drizzle-orm";

// GET: Fetch all research artifacts with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured");

    let artifacts = await db
      .select()
      .from(researchArtifacts)
      .orderBy(desc(researchArtifacts.createdAt));

    // Apply filters
    if (query) {
      artifacts = artifacts.filter(
        (a: typeof researchArtifacts.$inferSelect) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type) {
      artifacts = artifacts.filter((a: typeof researchArtifacts.$inferSelect) => a.type === type.toLowerCase());
    }

    if (featured === "true") {
      artifacts = artifacts.filter((a: typeof researchArtifacts.$inferSelect) => a.featured);
    }

    // Parse JSON fields
    const parsedArtifacts = artifacts.map((artifact: typeof researchArtifacts.$inferSelect) => ({
      ...artifact,
      tags: artifact.tags ? JSON.parse(artifact.tags) : [],
      metadata: artifact.metadata ? JSON.parse(artifact.metadata) : {},
    }));

    return NextResponse.json(parsedArtifacts, { status: 200 });
  } catch (error) {
    console.error("Error fetching research artifacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch research artifacts" },
      { status: 500 }
    );
  }
}

// POST: Add new research artifact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      type,
      description,
      fileUrl,
      externalUrl,
      youtubeId,
      metadata,
      tags,
      collectionDate,
      relatedPaper,
      thumbnail,
      fileSize,
      featured = false,
    } = body;

    // Validation
    if (!title || !type || !description) {
      return NextResponse.json(
        { error: "Missing required fields: title, type, description" },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = [
      "interview",
      "video",
      "fieldnotes",
      "dataset",
      "image",
      "audio",
    ];
    if (!validTypes.includes(type.toLowerCase())) {
      return NextResponse.json(
        { error: `Type must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Must have either fileUrl, externalUrl, or youtubeId
    if (!fileUrl && !externalUrl && !youtubeId) {
      return NextResponse.json(
        {
          error: "Must provide at least one of: fileUrl, externalUrl, youtubeId",
        },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (externalUrl) {
      try {
        new URL(externalUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid external URL" },
          { status: 400 }
        );
      }
    }

    if (fileUrl) {
      try {
        new URL(fileUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid file URL" },
          { status: 400 }
        );
      }
    }

    // Validate YouTube ID format if provided
    if (youtubeId && !/^[a-zA-Z0-9_-]{11}$/.test(youtubeId)) {
      return NextResponse.json(
        { error: "Invalid YouTube ID format" },
        { status: 400 }
      );
    }

    // Validate collection date if provided
    let collDate = null;
    if (collectionDate) {
      collDate = new Date(collectionDate);
      if (isNaN(collDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid collection date" },
          { status: 400 }
        );
      }
    }

    // Insert into database
    const [newArtifact] = await db
      .insert(researchArtifacts)
      .values({
        title,
        type: type.toLowerCase(),
        description,
        fileUrl: fileUrl || null,
        externalUrl: externalUrl || null,
        youtubeId: youtubeId || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
        tags: tags ? JSON.stringify(tags) : null,
        collectionDate: collDate,
        relatedPaper: relatedPaper || null,
        thumbnail: thumbnail || null,
        fileSize: fileSize || null,
        featured,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Research artifact added successfully",
        artifact: {
          ...newArtifact,
          tags: newArtifact.tags ? JSON.parse(newArtifact.tags) : [],
          metadata: newArtifact.metadata
            ? JSON.parse(newArtifact.metadata)
            : {},
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding research artifact:", error);
    return NextResponse.json(
      { error: "Failed to add research artifact" },
      { status: 500 }
    );
  }
}
