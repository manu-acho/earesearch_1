import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { prototypes } from "@/db/schema";
import { desc, like } from "drizzle-orm";

// GET: Fetch all prototypes with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    let protos = await db
      .select()
      .from(prototypes)
      .orderBy(desc(prototypes.lastUpdated));

    // Apply filters
    if (query) {
      protos = protos.filter(
        (p: typeof prototypes.$inferSelect) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status) {
      protos = protos.filter((p: typeof prototypes.$inferSelect) => p.status === status);
    }

    if (featured === "true") {
      protos = protos.filter((p: typeof prototypes.$inferSelect) => p.featured);
    }

    // Parse JSON fields
    const parsedProtos = protos.map((proto: typeof prototypes.$inferSelect) => ({
      ...proto,
      stack: proto.stack ? JSON.parse(proto.stack) : [],
      useCases: proto.useCases ? JSON.parse(proto.useCases) : [],
      tags: proto.tags ? JSON.parse(proto.tags) : [],
      screenshots: proto.screenshots ? JSON.parse(proto.screenshots) : [],
    }));

    return NextResponse.json(parsedProtos, { status: 200 });
  } catch (error) {
    console.error("Error fetching prototypes:", error);
    return NextResponse.json(
      { error: "Failed to fetch prototypes" },
      { status: 500 }
    );
  }
}

// POST: Add new prototype
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      fullDescription,
      status,
      demoUrl,
      repoUrl,
      externalUrl,
      stack,
      useCases,
      tags,
      screenshots,
      videoUrl,
      relatedPaper,
      relatedDataset,
      featured = false,
    } = body;

    // Validation
    if (!name || !slug || !description || !status) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, description, status" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["prototype", "pilot", "production", "archived"];
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

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(prototypes)
      .where(like(prototypes.slug, slug));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "A prototype with this slug already exists" },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    const urls = [
      { url: demoUrl, name: "demo" },
      { url: repoUrl, name: "repo" },
      { url: externalUrl, name: "external" },
      { url: videoUrl, name: "video" },
    ];

    for (const { url, name } of urls) {
      if (url) {
        try {
          new URL(url);
        } catch {
          return NextResponse.json(
            { error: `Invalid ${name} URL` },
            { status: 400 }
          );
        }
      }
    }

    // Insert into database
    const [newProto] = await db
      .insert(prototypes)
      .values({
        name,
        slug,
        description,
        fullDescription: fullDescription || null,
        status,
        demoUrl: demoUrl || null,
        repoUrl: repoUrl || null,
        externalUrl: externalUrl || null,
        stack: stack ? JSON.stringify(stack) : null,
        useCases: useCases ? JSON.stringify(useCases) : null,
        tags: tags ? JSON.stringify(tags) : null,
        screenshots: screenshots ? JSON.stringify(screenshots) : null,
        videoUrl: videoUrl || null,
        relatedPaper: relatedPaper || null,
        relatedDataset: relatedDataset || null,
        featured,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Prototype added successfully",
        prototype: {
          ...newProto,
          stack: newProto.stack ? JSON.parse(newProto.stack) : [],
          useCases: newProto.useCases ? JSON.parse(newProto.useCases) : [],
          tags: newProto.tags ? JSON.parse(newProto.tags) : [],
          screenshots: newProto.screenshots
            ? JSON.parse(newProto.screenshots)
            : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding prototype:", error);
    return NextResponse.json(
      { error: "Failed to add prototype" },
      { status: 500 }
    );
  }
}
