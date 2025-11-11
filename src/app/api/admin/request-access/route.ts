import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { adminAccessRequests } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, organization, reason } = body;

    // Validate required fields
    if (!name || !email || !reason) {
      return NextResponse.json(
        { error: "Name, email, and reason are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create the request
    const [newRequest] = await db
      .insert(adminAccessRequests)
      .values({
        name,
        email,
        organization: organization || null,
        reason,
        status: "pending",
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully",
      requestId: newRequest.id,
    });
  } catch (error: any) {
    console.error("Error creating access request:", error);
    
    // Check for duplicate email
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A request with this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
