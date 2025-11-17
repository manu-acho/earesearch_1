import { db } from "../src/db/client";
import { researchProjects } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function updateVoiceFirstProject() {
  try {
    const updatedMilestones = [
      {
        id: 1,
        title: "Systematic Literature Review Completion",
        description: "47-study synthesis examining voice AI, blockchain, and agricultural supply chains (2015-2025), identifying evidence gaps in farmer impact measurement",
        dueDate: "2025-12-15",
        status: "completed",
        completedDate: "2025-12-10"
      },
      {
        id: 2,
        title: "Co-Design Workshops with Coffee Cooperatives",
        description: "Participatory design sessions with 3-5 cooperatives in Ethiopia and Kenya to develop voice interface requirements, identity architecture, and governance preferences",
        dueDate: "2026-03-31",
        status: "planned"
      },
      {
        id: 3,
        title: "Low-Resource ASR Corpus Development",
        description: "Collection and transcription of 50+ hours agricultural domain speech in Amharic and Kiswahili for fine-tuning voice models",
        dueDate: "2026-06-30",
        status: "planned"
      },
      {
        id: 4,
        title: "DID and Data Wallet Prototype",
        description: "Functional prototype of blockchain-enabled digital identity system with verifiable credentials, integrated with voice interface for farmer testing",
        dueDate: "2026-09-15",
        status: "planned"
      },
      {
        id: 5,
        title: "Zero-Knowledge Compliance Mechanism",
        description: "Implementation of ZK proof system for EUDR traceability and certification verification without exposing sensitive data",
        dueDate: "2026-11-30",
        status: "planned"
      },
      {
        id: 6,
        title: "Pilot Deployment and Impact Measurement",
        description: "6-month field trial with 200-300 farmers measuring agency, data sovereignty, market access, and income outcomes using mixed methods",
        dueDate: "2027-06-30",
        status: "planned"
      }
    ];

    const [updated] = await db
      .update(researchProjects)
      .set({
        title: "Voice-First AI and Digital Identities for Equitable Value Distribution: A Socio-Technical Framework for Smallholder Coffee Farmers",
        slug: "voice-first-ai-digital-identities-value-distribution",
        startDate: new Date("2025-11-01"),
        estimatedCompletion: new Date("2027-11-30"),
        milestones: JSON.stringify(updatedMilestones),
      })
      .where(eq(researchProjects.id, 1))
      .returning();

    console.log("✅ Updated!");
    console.log("Title:", updated.title);
    console.log("Slug:", updated.slug);
    console.log("Timeline:", updated.startDate?.toLocaleDateString(), "→", updated.estimatedCompletion?.toLocaleDateString());
    console.log("Milestones updated: 6 milestones with dates from Dec 2025 → Jun 2027");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

updateVoiceFirstProject();
