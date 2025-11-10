import { db } from "../src/db/client";
import { researchProjects } from "../src/db/schema";

async function seedSystematicReview() {
  console.log("🌱 Seeding systematic literature review...");

  const projectData = {
    title: "Voice-First AI, Blockchain, and Agricultural Supply Chains: Systematic Literature Review (2015-2025)",
    slug: "voice-ai-blockchain-agriculture-systematic-review",
    shortDescription: "Comprehensive systematic review synthesizing evidence from 546 records examining voice-first AI, blockchain, and agricultural supply chains with emphasis on smallholder farmers, trust mechanisms, and value distribution in Sub-Saharan Africa.",
    fullDescription: `This systematic review synthesizes evidence from 546 initially identified records examining the intersection of voice-first AI technologies, blockchain systems, and agricultural supply chains with emphasis on smallholder farmers, trust mechanisms, and value distribution. After rigorous screening, 47 studies were included, revealing promising technical developments in low-resource ASR and blockchain traceability, but limited empirical evidence of farmer income improvements and equitable value distribution.`,
    status: "active",
    researchType: "systematic-review",
    researchQuestions: JSON.stringify([
      {
        id: "rq1",
        question: "How do voice-first AI and speech recognition technologies enable market access and agency for smallholder farmers in low-resource language contexts?",
        description: "Examines ASR development for African languages (Amharic, Wolof, Pulaar, Sereer), deployment contexts, performance benchmarks, and evidence of farmer adoption and impact."
      },
      {
        id: "rq2",
        question: "What blockchain and tokenization mechanisms enhance trust and transparency in agricultural supply chains (coffee, cocoa)?",
        description: "Analyzes traceability systems (Ethereum, Hyperledger Fabric), farmer participation models, and empirical evidence of value distribution improvements."
      },
      {
        id: "rq3",
        question: "How do zero-knowledge proofs and privacy-preserving technologies enable compliance while protecting farmer data and competitive information?",
        description: "Evaluates ZKP implementations, privacy-compliance trade-offs, computational performance, and deployment barriers in agricultural contexts."
      },
      {
        id: "rq4",
        question: "What socio-technical system designs promote equitable value distribution and farmer agency in digitalized agricultural supply chains?",
        description: "Investigates trust mechanisms beyond technology, power dynamics, governance structures, and design principles for equity in digital agricultural systems."
      }
    ]),
    keyFindings: JSON.stringify({
      rq1: [
        "Amharic end-to-end CNN+RNN+CTC models achieved 7% WER on 20,000 noisy utterances",
        "Gujarati agricultural ASR achieved 5.4% relative WER reduction with domain-specific features",
        "125-hour Kallaama corpus released for Wolof, Pulaar, and Sereer agricultural speech",
        "Generative AI chat systems deployed to 15,000+ farmers with 300,000+ queries across 4 countries",
        "Critical gap: Only 18% of studies measured farmer outcomes (productivity, income)"
      ],
      rq2: [
        "REALISTIC coffee case implemented REA event-based modeling with cryptographic signing across supply chain",
        "Multiple Hyperledger Fabric implementations demonstrate end-to-end traceability",
        "Commodity Fairness Index documents <10% of coffee value stays in producing countries",
        "Critical finding: Only 19% of studies reported quantitative farmer income or price premium data",
        "81% of studies remain at prototype/pilot stage without long-term economic impact assessment"
      ],
      rq3: [
        "zk-BeSC system demonstrates polynomial ZK proofs on Ethereum testnet with 500ms-5s proof generation",
        "Group signatures enable privacy-preserving traceability protecting farmer competitive information",
        "Computational overhead: 3-10x compared to non-private systems",
        "Privacy mechanisms balance GDPR compliance with voluntary certification transparency",
        "Implementation barriers: High computational costs, integration complexity, and farmer understanding"
      ],
      rq4: [
        "Technology alone insufficient: Governance structures and market power dynamics critically shape equity outcomes",
        "Multi-dimensional trust requires technical guarantees, social relationships, and institutional frameworks",
        "Design principles: Co-design with farmers, multi-stakeholder governance, transparent algorithms, interoperability, offline-first, local language support",
        "Power asymmetries: Risk of new dependencies on platform providers and digital divide",
        "Missing middle problem: Few studies bridge pilot projects and scaled deployments"
      ]
    }),
    milestones: JSON.stringify([
      {
        id: "m1",
        title: "Systematic Search and Screening Completed",
        description: "546 records identified across SciSpace, Google Scholar, and ArXiv; 47 studies included after rigorous screening (8.6% inclusion rate)",
        status: "completed",
        dueDate: "2024-10-15",
        completedDate: "2024-10-12"
      },
      {
        id: "m2",
        title: "Data Extraction and Synthesis",
        description: "Comprehensive data extraction covering citation details, geographic context, language technologies, blockchain mechanisms, farmer engagement, and socio-technical considerations",
        status: "completed",
        dueDate: "2024-11-01",
        completedDate: "2024-10-28"
      },
      {
        id: "m3",
        title: "Full Manuscript Draft",
        description: "Complete systematic review manuscript with methods, results, discussion, and recommendations drafted",
        status: "completed",
        dueDate: "2024-11-08",
        completedDate: "2024-11-05"
      },
      {
        id: "m4",
        title: "Peer Review Submission",
        description: "Submit to open-access journal specializing in agricultural technology and development",
        status: "in-progress",
        dueDate: "2025-01-15"
      },
      {
        id: "m5",
        title: "Open Dataset Release",
        description: "Release structured evidence tables, PRISMA flow diagram, and BibTeX references as open research output",
        status: "not-started",
        dueDate: "2025-02-01"
      }
    ]),
    methodology: `**Search Strategy:** Databases searched include SciSpace (500 records), Google Scholar (40 records), and ArXiv (6 records) for total of 546 records identified. Search terms combined voice-first AI, blockchain/tokenization, agricultural supply chains, and socio-technical dimensions.

**Inclusion Criteria:** Voice/speech technologies in agriculture, blockchain/DLT in supply chains, focus on smallholder farmers, empirical evidence or detailed implementations, published 2015-2025, peer-reviewed or rigorous scholarly work.

**Study Selection:** 480 records after deduplication → 480 screened (title/abstract) → 87 full-text assessed → 47 included (8.6% inclusion rate).

**Data Extraction:** Citation details, geographic context, language technologies, blockchain mechanisms, agricultural commodities, farmer engagement models, trust mechanisms, value distribution evidence, implementation status, socio-technical considerations.

**Quality Assessment:** Risk of bias assessment focusing on empirical rigor, transparency of methods, and evidence quality for impact claims.`,
    geographicFocus: JSON.stringify([
      "Sub-Saharan Africa",
      "East Africa (Ethiopia - Amharic)",
      "West Africa (Senegal - Wolof, Pulaar, Sereer)",
      "South Asia",
      "Latin America (Colombia coffee case)"
    ]),
    tags: JSON.stringify([
      "systematic-review",
      "voice-first-AI",
      "speech-recognition",
      "ASR",
      "low-resource-languages",
      "blockchain",
      "zero-knowledge-proofs",
      "agricultural-supply-chains",
      "coffee",
      "cocoa",
      "smallholder-farmers",
      "trust-mechanisms",
      "value-distribution",
      "socio-technical-systems",
      "Amharic",
      "Wolof",
      "Pulaar",
      "Sereer"
    ]),
    relatedPublications: JSON.stringify([]),
    references: `[1] Ejigu, Y. A., Asfaw, T. T., & Tadesse, S. A. (2025). A Noise-Robust End-to-End Framework for Amharic Speech Recognition. Research Square Preprint. https://doi.org/10.21203/rs.3.rs-6419413/v1

[2] Sailor, H. B., & Patil, H. A. (2018). Neural Networks-based Automatic Speech Recognition for Agricultural Commodity in Gujarati Language. SLTU 2018, 162–166. https://doi.org/10.21437/SLTU.2018-34

[3] Gauthier, E., Besacier, L., Voisin, S., Melese, M., & Elingui, U. P. M. (2024). Kallaama: A Transcribed Speech Dataset about Agriculture in the Three Most Widely Spoken Languages in Senegal. arXiv:2404.01991.

[4] Peterson, K., Tong, A. N., & Yu, Y. (2021). OpenASR20: An Open Challenge for Automatic Speech Recognition of Conversational Telephone Speech in Low-Resource Languages. Interspeech 2021, 2363–2367.

[5] Singh, N., Wang'ombe, J., Okanga, N., et al. (2024). Farmer.Chat: Scaling AI-Powered Agricultural Services for Smallholder Farmers. arXiv:2409.08916.

[6] Behravan, M., Mohammadrezaei, E., Azab, M., & Gračanin, D. (2024). Multilingual Standalone Trustworthy Voice-Based Social Network for Disaster Situations. arXiv:2411.08889.

[7] Bager, S. L., Dudder, B., Henglein, F., Hébert, J.-M., & Wu, H. (2022). Event-Based Supply Chain Network Modeling: Blockchain for Good Coffee. Frontiers in Blockchain, 5, 846783.

[8] Babu, E. B., Ritvik, K., Sainath, L. V. A., & Sai, M. T. (2023). Blockchain-driven Agricultural Product Traceability and Supply Chain Management. ICIRCA 2023.

[9] Miatton, F., & Amado, L. (2020). Fairness, Transparency and Traceability in the Coffee Value Chain through Blockchain Innovation. ICTE 2020, 1–6.

[10] Ajayi, O. O., Toromade, A. S., & Olagoke, A. (2024). Agro-Blockchain Markets (ABM): A secure and transparent model for smallholder farmers. GSC Advanced Research and Reviews, 21(2).

[11] Cordeiro, M., & Ferreira, J. C. (2025). Beyond Traceability: Decentralised Identity and Digital Twins for Verifiable Product Identity in Agri-Food Supply Chains. Applied Sciences, 15(11), 6062.

[12] Kamble, S. S., Gunasekaran, A., & Sharma, R. (2019). Modeling the blockchain-enabled traceability in agriculture supply chain. International Journal of Information Management, 52, 101967.

[13] Prasad, S., Tiwari, N., Chawla, M., & Tomar, D. S. (2024). Zero-Knowledge Proofs in Blockchain-Enabled Supply Chain Management. Springer.

[14] Anonymous Authors. (2023). zk-BeSC: Confidential Blockchain Enabled Supply Chain Based on Polynomial Zero-Knowledge Proofs. IWCMC 2023, 1472–1478.

[15] Zhang, J., Chen, J., Cao, X., Liu, S., Ji, H., Yang, Y., & Cheng, L. (2025). A blockchain-based privacy-preserving solution for agricultural product traceability based on group signatures. INMATEH-Agricultural Engineering, 76, 1058–1073.`,
    teamMembers: JSON.stringify([
      {
        name: "Emmanuel Acho, PhD",
        role: "Lead Investigator"
      },
      {
        name: "Biniyam Daniel",
        role: "Collaborator (Addis AI)"
      }
    ]),
    fundingStatus: "seeking-funding",
    fundingSource: null,
    startDate: new Date("2024-09-01"),
    estimatedCompletion: new Date("2025-02-01"),
    featured: true
  };

  try {
    const result = await db.insert(researchProjects).values(projectData).returning();
    console.log("✅ Systematic literature review project created successfully!");
    console.log(`   ID: ${result[0].id}`);
    console.log(`   Slug: ${result[0].slug}`);
    console.log(`   Title: ${result[0].title}`);
    console.log(`\n🔗 View at: http://localhost:3000/research/${result[0].slug}`);
  } catch (error) {
    console.error("❌ Error creating research project:", error);
    throw error;
  }
}

// Run the seed function
seedSystematicReview()
  .then(() => {
    console.log("\n✨ Seeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  });
