import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { researchProjects } from "@/db/schema";
import { desc, eq, like, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    type ResearchProjectRow = typeof researchProjects.$inferSelect;
    let projects: ResearchProjectRow[] = await db
      .select()
      .from(researchProjects)
      .orderBy(desc(researchProjects.lastUpdated));

    // Filter by status
    if (status) {
      projects = projects.filter((project) => project.status === status);
    }

    // Filter by featured
    if (featured === "true") {
      projects = projects.filter((project) => project.featured === true);
    }

    // Search in title and description
    if (search) {
      const searchLower = search.toLowerCase();
      projects = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchLower) ||
          project.shortDescription.toLowerCase().includes(searchLower) ||
          (project.tags && project.tags.toLowerCase().includes(searchLower))
      );
    }

    // Parse JSON fields for client
    const projectsWithParsedJson = projects.map((project) => ({
      ...project,
      researchQuestions: project.researchQuestions
        ? JSON.parse(project.researchQuestions)
        : [],
      keyFindings: project.keyFindings ? JSON.parse(project.keyFindings) : [],
      milestones: project.milestones ? JSON.parse(project.milestones) : [],
      geographicFocus: project.geographicFocus
        ? JSON.parse(project.geographicFocus)
        : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
      relatedPublications: project.relatedPublications
        ? JSON.parse(project.relatedPublications)
        : [],
      teamMembers: project.teamMembers ? JSON.parse(project.teamMembers) : [],
    }));

    return NextResponse.json(projectsWithParsedJson);
  } catch (error) {
    console.error("Error fetching research projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch research projects" },
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
    const projectData = {
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

    const result = await db.insert(researchProjects).values(projectData).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating research project:", error);
    return NextResponse.json(
      { error: "Failed to create research project" },
      { status: 500 }
    );
  }
}
