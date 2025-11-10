import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { researchThemes } from "@/db/schema";
import { desc, eq, like, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    type ResearchThemeRow = typeof researchThemes.$inferSelect;
    let themes: ResearchThemeRow[] = await db
      .select()
      .from(researchThemes)
      .orderBy(desc(researchThemes.lastUpdated));

    // Filter by status
    if (status) {
      themes = themes.filter((theme) => theme.status === status);
    }

    // Filter by featured
    if (featured === "true") {
      themes = themes.filter((theme) => theme.featured === true);
    }

    // Search in title and description
    if (search) {
      const searchLower = search.toLowerCase();
      themes = themes.filter(
        (theme) =>
          theme.title.toLowerCase().includes(searchLower) ||
          theme.shortDescription.toLowerCase().includes(searchLower) ||
          (theme.tags && theme.tags.toLowerCase().includes(searchLower))
      );
    }

    // Parse JSON fields for client
    const themesWithParsedJson = themes.map((theme) => ({
      ...theme,
      researchQuestions: theme.researchQuestions
        ? JSON.parse(theme.researchQuestions)
        : [],
      keyFindings: theme.keyFindings ? JSON.parse(theme.keyFindings) : [],
      milestones: theme.milestones ? JSON.parse(theme.milestones) : [],
      geographicFocus: theme.geographicFocus
        ? JSON.parse(theme.geographicFocus)
        : [],
      tags: theme.tags ? JSON.parse(theme.tags) : [],
      relatedPublications: theme.relatedPublications
        ? JSON.parse(theme.relatedPublications)
        : [],
      teamMembers: theme.teamMembers ? JSON.parse(theme.teamMembers) : [],
    }));

    return NextResponse.json(themesWithParsedJson);
  } catch (error) {
    console.error("Error fetching research themes:", error);
    return NextResponse.json(
      { error: "Failed to fetch research themes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.shortDescription || !body.status) {
      return NextResponse.json(
        { error: "Missing required fields: title, shortDescription, status" },
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
    const themeData = {
      title: body.title,
      slug: slug,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription || null,
      status: body.status,
      researchType: body.researchType || null,
      researchQuestions: body.researchQuestions
        ? JSON.stringify(body.researchQuestions)
        : JSON.stringify([]),
      keyFindings: body.keyFindings
        ? JSON.stringify(body.keyFindings)
        : null,
      milestones: body.milestones
        ? JSON.stringify(body.milestones)
        : JSON.stringify([]),
      methodology: body.methodology || null,
      geographicFocus: body.geographicFocus
        ? JSON.stringify(body.geographicFocus)
        : null,
      tags: body.tags ? JSON.stringify(body.tags) : null,
      relatedPublications: body.relatedPublications
        ? JSON.stringify(body.relatedPublications)
        : null,
      references: body.references || null,
      teamMembers: body.teamMembers ? JSON.stringify(body.teamMembers) : null,
      fundingStatus: body.fundingStatus || null,
      fundingSource: body.fundingSource || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      estimatedCompletion: body.estimatedCompletion
        ? new Date(body.estimatedCompletion)
        : null,
      featured: body.featured || false,
    };

    const result = await db.insert(researchThemes).values(themeData).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating research theme:", error);
    return NextResponse.json(
      { error: "Failed to create research theme" },
      { status: 500 }
    );
  }
}
