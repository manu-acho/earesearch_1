import { db } from "../src/db/client";
import { adminUsers } from "../src/db/schema";
import bcrypt from "bcryptjs";

async function createAdminUser() {
  try {
    const email = "emmanuel@earesearch.net";
    const password = "Password123!";
    const name = "Emmanuel Acho";

    // Hash the password with bcrypt (10 salt rounds)
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert admin user
    const [user] = await db
      .insert(adminUsers)
      .values({
        email,
        passwordHash,
        name,
        role: "super_admin",
        isActive: true,
      })
      .returning();

    console.log("✅ Admin user created successfully!");
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Name: ${user.name}`);
    console.log(`🔑 Role: ${user.role}`);
    console.log(`🆔 User ID: ${user.id}`);
    console.log("\n🔐 You can now login at /admin/login");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
