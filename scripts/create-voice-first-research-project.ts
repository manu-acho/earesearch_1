import { db } from "../src/db/client";
import { researchProjects } from "../src/db/schema";

async function createVoiceFirstProject() {
  try {
    const project = {
      title: "Voice-First Digital Identity for Equitable Value Distribution: A Socio-Technical Framework for Smallholder Coffee Farmers in East Africa",
      slug: "voice-first-digital-identity-equitable-value-distribution",
      shortDescription: "A research project examining how voice-first ASR, blockchain-enabled digital identities, and zero-knowledge proofs can measurably enhance smallholder farmer agency, data sovereignty, and equitable value capture in East African coffee supply chains.",
      fullDescription: "This project addresses the critical gap between technical capabilities (voice AI, blockchain traceability) and measured social impact for smallholder farmers identified in systematic literature reviews. Building on evidence that <10% of coffee value remains in producing countries, we develop and test a socio-technical framework integrating voice-first interfaces in Amharic/Kiswahili, decentralized digital identities (DIDs) with data wallets, privacy-preserving compliance mechanisms (zero-knowledge proofs), and farmer-centric governance structures. The project emphasizes co-design with coffee cooperatives, rigorous impact measurement of farmer empowerment (beyond income), and replicable implementation patterns for low-resource agricultural contexts.",
      status: "active",
      researchType: "field-research",
      researchQuestions: JSON.stringify([
        {
          id: 1,
          question: "How can voice-first interfaces combined with blockchain-enabled digital identities measurably increase smallholder farmer agency and market access?",
          description: "Examines the causal relationship between voice ASR technology, DID-based data wallets, and quantifiable outcomes in farmer negotiating power, market participation, and income."
        },
        {
          id: 2,
          question: "What governance mechanisms ensure that blockchain traceability translates to equitable value redistribution rather than reinforcing existing power asymmetries?",
          description: "Investigates DAO structures, multi-stakeholder decision-making, and smart contract designs that embed fairness principles and farmer representation."
        },
        {
          id: 3,
          question: "How do zero-knowledge proofs enable EUDR compliance and premium market access while protecting farmer data sovereignty and competitive information?",
          description: "Tests privacy-preserving verification mechanisms for certification, origin, and quality claims without exposing sensitive farmer or cooperative data."
        },
        {
          id: 4,
          question: "How do we empirically measure farmer empowerment beyond income metrics in digitalized agricultural value chains?",
          description: "Develops and validates measurement frameworks capturing data ownership, decision-making power, exit options, and perceived agency alongside economic outcomes."
        }
      ]),
      keyFindings: null,
      milestones: JSON.stringify([
        {
          id: 1,
          title: "Systematic Literature Review Completion",
          description: "47-study synthesis examining voice AI, blockchain, and agricultural supply chains (2015-2025), identifying evidence gaps in farmer impact measurement",
          dueDate: "2024-12-15",
          status: "completed",
          completedDate: "2024-12-10"
        },
        {
          id: 2,
          title: "Co-Design Workshops with Coffee Cooperatives",
          description: "Participatory design sessions with 3-5 cooperatives in Ethiopia and Kenya to develop voice interface requirements, identity architecture, and governance preferences",
          dueDate: "2025-03-31",
          status: "planned"
        },
        {
          id: 3,
          title: "Low-Resource ASR Corpus Development",
          description: "Collection and transcription of 50+ hours agricultural domain speech in Amharic and Kiswahili for fine-tuning voice models",
          dueDate: "2025-06-30",
          status: "planned"
        },
        {
          id: 4,
          title: "DID and Data Wallet Prototype",
          description: "Functional prototype of blockchain-enabled digital identity system with verifiable credentials, integrated with voice interface for farmer testing",
          dueDate: "2025-09-15",
          status: "planned"
        },
        {
          id: 5,
          title: "Zero-Knowledge Compliance Mechanism",
          description: "Implementation of ZK proof system for EUDR traceability and certification verification without exposing sensitive data",
          dueDate: "2025-11-30",
          status: "planned"
        },
        {
          id: 6,
          title: "Pilot Deployment and Impact Measurement",
          description: "6-month field trial with 200-300 farmers measuring agency, data sovereignty, market access, and income outcomes using mixed methods",
          dueDate: "2026-06-30",
          status: "planned"
        }
      ]),
      methodology: "Mixed-methods participatory action research combining: (1) Co-design ethnography with farmer cooperatives to understand voice interface needs, trust mechanisms, and governance preferences; (2) Technical development of integrated voice ASR, DID architecture, and ZK compliance systems with open-source transparency; (3) Randomized controlled trial or stepped-wedge design for causal impact evaluation; (4) Qualitative assessment of farmer agency, data sovereignty perceptions, and empowerment using semi-structured interviews and focus groups; (5) Economic analysis of value distribution across supply chain actors pre/post intervention.",
      geographicFocus: JSON.stringify(["East Africa", "Ethiopia", "Kenya", "Tanzania"]),
      tags: JSON.stringify(["voice-first AI", "ASR", "blockchain", "digital identity", "DIDs", "data wallets", "zero-knowledge proofs", "coffee", "smallholder farmers", "value distribution", "farmer agency", "EUDR compliance", "socio-technical systems", "participatory design"]),
      relatedPublications: JSON.stringify([1]), // ID of the working paper
      references: "See systematic literature review bibliography (47 sources) including key works: Ejigu et al. (2025) on Amharic ASR; Bager et al. (2022) REALISTIC coffee blockchain case; Cordeiro & Ferreira (2025) on DIDs and digital twins; Radic & Gardeazabal (2024) CIMMYT digital identities case; Miatton & Amado (2020) on commodity fairness index.",
      teamMembers: JSON.stringify([
        { name: "Emmanuel Acho, PhD", role: "Principal Investigator" },
        { name: "Biniyam Daniel (Addis AI)", role: "Collaborator" }
      ]),
      fundingStatus: "seeking-funding",
      fundingSource: null,
      startDate: new Date("2024-12-01T00:00:00Z"),
      estimatedCompletion: new Date("2026-12-31T00:00:00Z"),
      featured: true,
    };

    const [insertedProject] = await db
      .insert(researchProjects)
      .values(project)
      .returning();

    console.log("\n✅ Research Project Created Successfully!\n");
    console.log(`📋 Title: ${insertedProject.title}`);
    console.log(`🔗 Slug: ${insertedProject.slug}`);
    console.log(`📊 Status: ${insertedProject.status}`);
    console.log(`🔬 Research Type: ${insertedProject.researchType}`);
    console.log(`🌍 Geographic Focus: ${project.geographicFocus}`);
    console.log(`👥 Team: Emmanuel Acho, PhD (PI) & Biniyam Daniel/Addis AI (Collaborator)`);
    console.log(`📅 Timeline: ${insertedProject.startDate?.toLocaleDateString()} → ${insertedProject.estimatedCompletion?.toLocaleDateString()}`);
    console.log(`🆔 Project ID: ${insertedProject.id}`);
    console.log(`\n🎯 Research Questions: 4`);
    console.log(`📍 Milestones: 6 (1 completed, 5 planned)`);
    console.log(`\n🔗 You can edit this project at: /admin/research-themes\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating research project:", error);
    process.exit(1);
  }
}

createVoiceFirstProject();
