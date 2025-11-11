import { db } from "../src/db/client";
import { adminUsers } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function updateToSuperAdmin() {
  try {
    const email = "emmanuel@earesearch.net";

    // Update user role to super_admin
    const [updatedUser] = await db
      .update(adminUsers)
      .set({ role: "super_admin" })
      .where(eq(adminUsers.email, email))
      .returning();

    if (!updatedUser) {
      console.error("❌ User not found:", email);
      process.exit(1);
    }

    console.log("✅ Successfully updated to Super Admin!");
    console.log(`📧 Email: ${updatedUser.email}`);
    console.log(`👤 Name: ${updatedUser.name}`);
    console.log(`🔑 Role: ${updatedUser.role}`);
    console.log(`🆔 User ID: ${updatedUser.id}`);
    console.log("\n🎉 You now have super admin privileges!");
  } catch (error) {
    console.error("❌ Error updating user role:", error);
    process.exit(1);
  }
}

updateToSuperAdmin();
