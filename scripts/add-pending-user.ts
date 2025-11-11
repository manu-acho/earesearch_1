import { db } from "../src/db/client";
import { adminUsers } from "../src/db/schema";
import * as bcrypt from "bcryptjs";

async function addPendingUser() {
  try {
    const email = "emmanuel.acho@gmail.com";
    const password = "TestPassword123!"; // Temporary password
    const name = "Emmanuel Acho";

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create pending user
    const [newUser] = await db
      .insert(adminUsers)
      .values({
        email,
        passwordHash,
        name,
        role: "pending", // User starts as pending
        isActive: false, // Inactive until approved
      })
      .returning();

    console.log("✅ Successfully created pending user!");
    console.log(`📧 Email: ${newUser.email}`);
    console.log(`👤 Name: ${newUser.name}`);
    console.log(`🔑 Role: ${newUser.role}`);
    console.log(`🔒 Active: ${newUser.isActive}`);
    console.log(`🆔 User ID: ${newUser.id}`);
    console.log(`\n🔐 Temporary password: ${password}`);
    console.log("\n⏳ This user needs to be approved by a super admin before they can access the admin dashboard.");
  } catch (error: any) {
    if (error.code === "23505") {
      console.error("❌ User with this email already exists!");
    } else {
      console.error("❌ Error creating user:", error);
    }
    process.exit(1);
  }
}

addPendingUser();
