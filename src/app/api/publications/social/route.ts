import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { socialPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { isAdmin } from "@/lib/auth-utils";

// GET: Fetch all social posts with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const platform = searchParams.get("platform");
    const featured = searchParams.get("featured");

    let posts = await db
      .select()
      .from(socialPosts)
      .orderBy(desc(socialPosts.publishedDate));

    // Apply filters
    if (query) {
      posts = posts.filter(
        (p: typeof socialPosts.$inferSelect) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (platform) {
      posts = posts.filter((p: typeof socialPosts.$inferSelect) => p.platform === platform.toLowerCase());
    }

    if (featured === "true") {
      posts = posts.filter((p: typeof socialPosts.$inferSelect) => p.featured);
    }

    // Parse JSON fields
    const parsedPosts = posts.map((post: typeof socialPosts.$inferSelect) => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
    }));

    return NextResponse.json(parsedPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching social posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch social posts" },
      { status: 500 }
    );
  }
}

// POST: Add new social post
export async function POST(request: NextRequest) {
  // Check authentication
  const hasAccess = await isAdmin();
  if (!hasAccess) {
    return NextResponse.json(
      { error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      title,
      platform,
      postUrl,
      excerpt,
      publishedDate,
      tags,
      engagement,
      featured = false,
    } = body;

    // Validation
    if (!title || !platform || !postUrl || !publishedDate) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, platform, postUrl, publishedDate",
        },
        { status: 400 }
      );
    }

    // Validate platform
    const validPlatforms = ["linkedin", "twitter", "medium", "youtube"];
    if (!validPlatforms.includes(platform.toLowerCase())) {
      return NextResponse.json(
        { error: `Platform must be one of: ${validPlatforms.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(postUrl);
    } catch {
      return NextResponse.json({ error: "Invalid post URL" }, { status: 400 });
    }

    // Validate date
    const pubDate = new Date(publishedDate);
    if (isNaN(pubDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid published date" },
        { status: 400 }
      );
    }

    if (pubDate > new Date()) {
      return NextResponse.json(
        { error: "Published date cannot be in the future" },
        { status: 400 }
      );
    }

    // Insert into database
    const [newPost] = await db
      .insert(socialPosts)
      .values({
        title,
        platform: platform.toLowerCase(),
        postUrl,
        excerpt: excerpt || null,
        publishedDate: pubDate,
        tags: tags ? JSON.stringify(tags) : null,
        engagement: engagement || null,
        featured,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Social post added successfully",
        post: {
          ...newPost,
          tags: newPost.tags ? JSON.parse(newPost.tags) : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding social post:", error);
    return NextResponse.json(
      { error: "Failed to add social post" },
      { status: 500 }
    );
  }
}
