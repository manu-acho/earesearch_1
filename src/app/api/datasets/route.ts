import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { datasets } from "@/db/schema";
import { desc, like, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");
    const domain = searchParams.get("domain");
    const featured = searchParams.get("featured");

    type DatasetRow = typeof datasets.$inferSelect;
    let datasetsList: DatasetRow[] = await db
      .select()
      .from(datasets)
      .orderBy(desc(datasets.lastUpdated));

    // Apply filters
    if (q) {
      datasetsList = datasetsList.filter(
        (d) =>
          d.name.toLowerCase().includes(q.toLowerCase()) ||
          d.summary.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (featured === "true") {
      datasetsList = datasetsList.filter((d) => d.featured);
    }

    if (domain) {
      datasetsList = datasetsList.filter((d) => {
        try {
          const domains = JSON.parse(d.domains || "[]");
          return domains.includes(domain);
        } catch {
          return false;
        }
      });
    }

    // Parse JSON fields
    const parsedDatasets = datasetsList.map((d) => ({
      ...d,
      languages: d.languages ? JSON.parse(d.languages) : [],
      domains: d.domains ? JSON.parse(d.domains) : [],
      tags: d.tags ? JSON.parse(d.tags) : [],
      stats: d.stats ? JSON.parse(d.stats) : null,
    }));

    return NextResponse.json(parsedDatasets);
  } catch (error) {
    console.error("Error fetching datasets:", error);
    return NextResponse.json(
      { error: "Failed to fetch datasets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      summary,
      description,
      size,
      format,
      license,
      version,
      downloadUrl,
      documentationUrl,
      doi,
      languages,
      domains,
      tags,
      stats,
      citation,
      relatedPaper,
      featured,
    } = body;

    // Validate required fields
    if (!name || !slug || !summary || !license) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, summary, license" },
        { status: 400 }
      );
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug must contain only lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await db
      .select()
      .from(datasets)
      .where(eq(datasets.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "A dataset with this slug already exists" },
        { status: 400 }
      );
    }

    // Validate URLs
    const urlFields = { downloadUrl, documentationUrl };
    for (const [field, url] of Object.entries(urlFields)) {
      if (url && url.trim()) {
        try {
          new URL(url);
        } catch {
          return NextResponse.json(
            { error: `Invalid ${field}: must be a valid URL` },
            { status: 400 }
          );
        }
      }
    }

    // Insert dataset
    const [newDataset] = await db.insert(datasets).values({
      name,
      slug,
      summary,
      description: description || null,
      size: size || null,
      format: format || null,
      license,
      version: version || "1.0.0",
      downloadUrl: downloadUrl || null,
      documentationUrl: documentationUrl || null,
      doi: doi || null,
      languages: JSON.stringify(languages || []),
      domains: JSON.stringify(domains || []),
      tags: JSON.stringify(tags || []),
      stats: stats ? JSON.stringify(stats) : null,
      citation: citation || null,
      relatedPaper: relatedPaper || null,
      featured: featured || false,
    }).returning();

    return NextResponse.json(newDataset, { status: 201 });
  } catch (error) {
    console.error("Error creating dataset:", error);
    return NextResponse.json(
      { error: "Failed to create dataset" },
      { status: 500 }
    );
  }
}
