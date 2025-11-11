import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { adminAccessRequests, adminUsers } from "@/db/schema";
import { canManageUsers, getCurrentAdminUser } from "@/lib/auth-utils";
import { sendAccessApprovedEmail, sendAccessRejectedEmail } from "@/lib/email";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";

// GET /api/admin/access-requests - List all access requests
export async function GET() {
  try {
    // Check permissions
    const hasPermission = await canManageUsers();
    if (!hasPermission) {
      return NextResponse.json(
        { error: "Unauthorized. Super admin access required." },
        { status: 403 }
      );
    }

    // Fetch all requests
    const requests = await db
      .select()
      .from(adminAccessRequests)
      .orderBy(adminAccessRequests.createdAt);

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Error fetching access requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/access-requests - Approve or reject a request
export async function PATCH(request: NextRequest) {
  try {
    // Check permissions
    const hasPermission = await canManageUsers();
    if (!hasPermission) {
      return NextResponse.json(
        { error: "Unauthorized. Super admin access required." },
        { status: 403 }
      );
    }

    const currentUser = await getCurrentAdminUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { requestId, action, tempPassword, reviewNotes } = body;

    if (!requestId || !action) {
      return NextResponse.json(
        { error: "Request ID and action are required" },
        { status: 400 }
      );
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    // Fetch the request
    const [accessRequest] = await db
      .select()
      .from(adminAccessRequests)
      .where(eq(adminAccessRequests.id, requestId))
      .limit(1);

    if (!accessRequest) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }

    if (accessRequest.status !== "pending") {
      return NextResponse.json(
        { error: "Request has already been reviewed" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      // Validate temporary password
      if (!tempPassword || tempPassword.length < 8) {
        return NextResponse.json(
          { error: "Temporary password must be at least 8 characters" },
          { status: 400 }
        );
      }

      // Check if user already exists
      const [existingUser] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.email, accessRequest.email))
        .limit(1);

      if (existingUser) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 409 }
        );
      }

      // Hash the temporary password
      const passwordHash = await bcrypt.hash(tempPassword, 10);

      // Create the admin user with "pending" role
      await db.insert(adminUsers).values({
        email: accessRequest.email,
        name: accessRequest.name,
        passwordHash,
        role: "pending", // Start as pending, super admin can upgrade
        isActive: true,
      });

      // Update the request status
      await db
        .update(adminAccessRequests)
        .set({
          status: "approved",
          reviewedBy: currentUser.id,
          reviewedAt: new Date(),
          reviewNotes: reviewNotes || null,
        })
        .where(eq(adminAccessRequests.id, requestId));

      // Send approval email
      try {
        await sendAccessApprovedEmail(
          accessRequest.email,
          accessRequest.name,
          tempPassword
        );
      } catch (emailError) {
        console.error("Failed to send approval email:", emailError);
        // Don't fail the request if email fails
      }

      return NextResponse.json({
        success: true,
        message: "Request approved and user account created",
      });
    } else {
      // Reject the request
      await db
        .update(adminAccessRequests)
        .set({
          status: "rejected",
          reviewedBy: currentUser.id,
          reviewedAt: new Date(),
          reviewNotes: reviewNotes || null,
        })
        .where(eq(adminAccessRequests.id, requestId));

      // Send rejection email
      try {
        await sendAccessRejectedEmail(
          accessRequest.email,
          accessRequest.name,
          reviewNotes || undefined
        );
      } catch (emailError) {
        console.error("Failed to send rejection email:", emailError);
        // Don't fail the request if email fails
      }

      return NextResponse.json({
        success: true,
        message: "Request rejected",
      });
    }
  } catch (error) {
    console.error("Error processing access request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
