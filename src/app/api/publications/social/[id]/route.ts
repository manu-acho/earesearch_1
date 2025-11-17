import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { socialPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch single social post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const posts = await db
      .select()
      .from(socialPosts)
      .where(eq(socialPosts.id, postId))
      .limit(1);

    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = posts[0];
    const parsedPost = {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
    };

    return NextResponse.json(parsedPost, { status: 200 });
  } catch (error) {
    console.error("Error fetching social post:", error);
    return NextResponse.json(
      { error: "Failed to fetch social post" },
      { status: 500 }
    );
  }
}

// PUT: Update social post
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
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const body = await request.json();

    // Update the post
    const [updatedPost] = await db
      .update(socialPosts)
      .set({
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        publishedDate: body.publishedDate ? new Date(body.publishedDate) : null,
      })
      .where(eq(socialPosts.id, postId))
      .returning();

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Social post updated successfully", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating social post:", error);
    return NextResponse.json(
      { error: "Failed to update social post" },
      { status: 500 }
    );
  }
}

// DELETE: Delete social post
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
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    await db.delete(socialPosts).where(eq(socialPosts.id, postId));

    return NextResponse.json(
      { message: "Social post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting social post:", error);
    return NextResponse.json(
      { error: "Failed to delete social post" },
      { status: 500 }
    );
  }
}
