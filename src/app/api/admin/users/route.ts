import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { adminUsers } from "@/db/schema";
import { canManageUsers } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";

// GET /api/admin/users - List all users
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

    // Fetch all users
    const users = await db
      .select({
        id: adminUsers.id,
        email: adminUsers.email,
        name: adminUsers.name,
        role: adminUsers.role,
        isActive: adminUsers.isActive,
        createdAt: adminUsers.createdAt,
        lastLogin: adminUsers.lastLogin,
      })
      .from(adminUsers)
      .orderBy(adminUsers.createdAt);

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users - Update user role or active status
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

    const body = await request.json();
    const { userId, role, isActive } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Build update object
    const updates: any = {};
    if (role !== undefined) {
      if (!["super_admin", "admin", "pending"].includes(role)) {
        return NextResponse.json(
          { error: "Invalid role" },
          { status: 400 }
        );
      }
      updates.role = role;
    }
    if (isActive !== undefined) {
      updates.isActive = isActive;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No updates provided" },
        { status: 400 }
      );
    }

    // Update user
    const [updatedUser] = await db
      .update(adminUsers)
      .set(updates)
      .where(eq(adminUsers.id, userId))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users - Permanently delete a user
export async function DELETE(request: NextRequest) {
  try {
    // Check permissions
    const hasPermission = await canManageUsers();
    if (!hasPermission) {
      return NextResponse.json(
        { error: "Unauthorized. Super admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Delete the user
    const [deletedUser] = await db
      .delete(adminUsers)
      .where(eq(adminUsers.id, userId))
      .returning();

    if (!deletedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
