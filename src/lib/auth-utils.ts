import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { db } from "@/db/client";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";

export type UserRole = "super_admin" | "admin" | "pending";

export interface AdminUser {
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
  isActive: boolean;
}

/**
 * Get the current authenticated admin user with their role
 */
export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  const [user] = await db
    .select({
      id: adminUsers.id,
      email: adminUsers.email,
      name: adminUsers.name,
      role: adminUsers.role,
      isActive: adminUsers.isActive,
    })
    .from(adminUsers)
    .where(eq(adminUsers.email, session.user.email))
    .limit(1);

  return user || null;
}

/**
 * Check if the current user is a super admin
 */
export async function isSuperAdmin(): Promise<boolean> {
  const user = await getCurrentAdminUser();
  return user?.role === "super_admin" && user?.isActive === true;
}

/**
 * Check if the current user is an admin (includes super_admin)
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentAdminUser();
  return (
    (user?.role === "admin" || user?.role === "super_admin") &&
    user?.isActive === true
  );
}

/**
 * Check if user has permission to manage other users
 * Only super admins can manage users
 */
export async function canManageUsers(): Promise<boolean> {
  return await isSuperAdmin();
}

/**
 * Check if user can change roles
 * Super admins can change any role including promoting to super_admin
 */
export async function canChangeRole(targetRole: UserRole): Promise<boolean> {
  const user = await getCurrentAdminUser();
  
  if (!user || !user.isActive) {
    return false;
  }

  // Only super admins can manage roles
  if (user.role !== "super_admin") {
    return false;
  }

  return true;
}
