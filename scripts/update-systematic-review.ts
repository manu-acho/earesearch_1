import { db } from "../src/db/client";
import { researchProjects } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function updateResearchProject() {
  console.log("🔄 Updating research project...");

  const updatedData = {
    title: "Building Farmer Agency and Equitable Value Distribution in Digital Agricultural Markets",
    slug: "farmer-agency-digital-markets",
    shortDescription: "Designing and evaluating voice-first AI and blockchain systems that enhance smallholder farmer agency, transparency, and equitable value distribution in coffee and cocoa supply chains across Sub-Saharan Africa.",
    fullDescription: `This research project investigates how voice-first AI technologies and blockchain-enabled supply chain systems can be designed to genuinely enhance smallholder farmer agency and promote equitable value distribution in agricultural commodity markets. Through systematic evidence synthesis, participatory co-design, and prototype development, we examine the socio-technical conditions under which digital agricultural technologies can address persistent power asymmetries and value capture inequalities in coffee and cocoa supply chains.`,
    startDate: new Date("2025-10-01"),
    estimatedCompletion: new Date("2026-10-31"),
    milestones: JSON.stringify([
      {
        id: "m1",
        title: "Systematic Literature Review",
        description: "Comprehensive synthesis of 546 records on voice-first AI, blockchain, and agricultural supply chains with 47 included studies examining empirical evidence of farmer impact and value distribution",
        status: "completed",
        dueDate: "2025-11-08",
        completedDate: "2025-11-05"
      },
      {
        id: "m2",
        title: "Peer-Reviewed Publication Submission",
        description: "Submit systematic review manuscript to open-access journal specializing in agricultural technology, digital development, and socio-technical systems",
        status: "in-progress",
        dueDate: "2026-01-15"
      },
      {
        id: "m3",
        title: "Stakeholder Engagement and Co-Design",
        description: "Conduct participatory design sessions with smallholder farmers, cooperatives, and supply chain actors in Sub-Saharan Africa to identify priorities, constraints, and design requirements for voice AI and blockchain systems",
        status: "not-started",
        dueDate: "2026-03-31"
      },
      {
        id: "m4",
        title: "Voice-First AI Prototype Development",
        description: "Build working prototype of low-resource ASR system for agricultural market access, integrating offline-capable voice interfaces, local language support (Amharic, Kiswahili), and farmer-centered design principles",
        status: "not-started",
        dueDate: "2026-06-30"
      },
      {
        id: "m5",
        title: "Blockchain Traceability Prototype",
        description: "Develop blockchain-enabled supply chain traceability system with privacy-preserving mechanisms (zero-knowledge proofs), smart contract automation, and transparent value distribution tracking for coffee/cocoa chains",
        status: "not-started",
        dueDate: "2026-06-30"
      },
      {
        id: "m6",
        title: "Integrated System Testing and Evaluation",
        description: "Pilot test integrated voice AI and blockchain prototypes with farmer cooperatives, measuring adoption, usability, trust perceptions, and preliminary evidence of market access and value distribution impacts",
        status: "not-started",
        dueDate: "2026-09-30"
      },
      {
        id: "m7",
        title: "Open-Source Release and Documentation",
        description: "Release prototype code, datasets, design frameworks, and evaluation findings as digital public goods to enable community-driven iteration and sovereign AI capacity building",
        status: "not-started",
        dueDate: "2026-10-31"
      }
    ])
  };

  try {
    // Update the first research project (ID: 1)
    const result = await db
      .update(researchProjects)
      .set(updatedData)
      .where(eq(researchProjects.id, 1))
      .returning();

    if (result.length === 0) {
      throw new Error("No research project found with ID 1");
    }

    console.log("✅ Research project updated successfully!");
    console.log(`   ID: ${result[0].id}`);
    console.log(`   New Title: ${result[0].title}`);
    console.log(`   New Slug: ${result[0].slug}`);
    console.log(`   Start Date: ${result[0].startDate}`);
    console.log(`   Estimated Completion: ${result[0].estimatedCompletion}`);
    console.log(`\n🔗 View at: http://localhost:3000/research/${result[0].slug}`);
  } catch (error) {
    console.error("❌ Error updating research project:", error);
    throw error;
  }
}

// Run the update function
updateResearchProject()
  .then(() => {
    console.log("\n✨ Update completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Update failed:", error);
    process.exit(1);
  });
