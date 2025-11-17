import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { researchProjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single research project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const projects = await db
      .select()
      .from(researchProjects)
      .where(eq(researchProjects.id, projectId))
      .limit(1);

    if (projects.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = projects[0];
    const parsedProject = {
      ...project,
      researchQuestions: project.researchQuestions ? JSON.parse(project.researchQuestions) : [],
      keyFindings: project.keyFindings ? JSON.parse(project.keyFindings) : [],
      milestones: project.milestones ? JSON.parse(project.milestones) : [],
      geographicFocus: project.geographicFocus ? JSON.parse(project.geographicFocus) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
      relatedPublications: project.relatedPublications ? JSON.parse(project.relatedPublications) : [],
      references: project.references || "",
      teamMembers: project.teamMembers ? JSON.parse(project.teamMembers) : [],
    };

    return NextResponse.json(parsedProject, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Error fetching research project:", error);
    return NextResponse.json(
      { error: "Failed to fetch research project" },
      { status: 500 }
    );
  }
}

// PUT: Update research project
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
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const body = await request.json();

    // Update the project
    const [updatedProject] = await db
      .update(researchProjects)
      .set({
        ...body,
        researchQuestions: body.researchQuestions ? JSON.stringify(body.researchQuestions) : null,
        keyFindings: body.keyFindings ? JSON.stringify(body.keyFindings) : null,
        milestones: body.milestones ? JSON.stringify(body.milestones) : null,
        geographicFocus: body.geographicFocus ? JSON.stringify(body.geographicFocus) : null,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        relatedPublications: body.relatedPublications ? JSON.stringify(body.relatedPublications) : null,
        references: body.references || null,
        teamMembers: body.teamMembers ? JSON.stringify(body.teamMembers) : null,
        startDate: body.startDate ? new Date(body.startDate) : null,
        estimatedCompletion: body.estimatedCompletion ? new Date(body.estimatedCompletion) : null,
        lastUpdated: new Date(),
      })
      .where(eq(researchProjects.id, projectId))
      .returning();

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Research project updated successfully", project: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating research project:", error);
    return NextResponse.json(
      { error: "Failed to update research project" },
      { status: 500 }
    );
  }
}

// DELETE: Delete research project
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
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    await db.delete(researchProjects).where(eq(researchProjects.id, projectId));

    return NextResponse.json(
      { message: "Research project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting research project:", error);
    return NextResponse.json(
      { error: "Failed to delete research project" },
      { status: 500 }
    );
  }
}
