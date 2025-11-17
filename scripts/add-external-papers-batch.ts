import { db } from "../src/db/client";
import { externalPapers } from "../src/db/schema";

const papers = [
  {
    title: "Empowering Smallholder Farmers with Blockchain-Enabled Digital Identities: The Case of CIMMYT for Traceability, Financial Inclusion and Value Chain Integration",
    authors: ["Ivana Radic", "Andrea Gardeazabal"],
    year: 2024,
    abstract: "This working paper explores how blockchain-enabled digital identities and data wallets can empower smallholder farmers by improving financial inclusion, traceability, and data governance. Using case studies from CIMMYT collaborations with Bluenumber and Identi, it demonstrates how secure digital identities enable farmers to control their data, access financial services, meet compliance requirements, and integrate into formal value chains.",
    downloadUrl: "https://repository.cimmyt.org/server/api/core/bitstreams/03616776-e40d-4fcc-9804-c91b1ba3d07c/content",
    sourceWebsite: "CGIAR / IFPRI Working Paper",
    doi: "https://hdl.handle.net/10568/113623",
    tags: ["digital identity", "blockchain", "smallholder farmers", "data wallets", "traceability"],
    relevanceScore: 97,
    notes: "Directly relevant to WAGA identity architecture, data wallets, decentralized governance, and empowering African coffee farmers."
  },
  {
    title: "Beyond Traceability: Decentralised Identity and Digital Twins for Verifiable Product Identity in Agri-Food Supply Chains",
    authors: ["Manuela Cordeiro", "Joao C. Ferreira"],
    year: 2025,
    abstract: "This paper investigates how blockchain, Decentralised Identifiers (DIDs), digital twins, and smart contracts can be combined to establish verifiable digital identities for agricultural products. It identifies major limitations in current traceability systems, proposes a layered architecture integrating digital twins and DIDs, and highlights gaps in interoperability, governance, and maturity. A cold-chain scenario is used to demonstrate the practical application of the proposed model.",
    downloadUrl: "https://www.researchgate.net/publication/392186940_Beyond_Traceability_Decentralised_Identity_and_Digital_Twins_for_Verifiable_Product_Identity_in_Agri-Food_Supply_Chains",
    sourceWebsite: "MDPI Applied Sciences",
    doi: "10.3390/app15116062",
    tags: ["blockchain", "DID", "digital twins", "agri-food", "traceability"],
    relevanceScore: 92,
    notes: "Important for building EUDI-compatible product identity and traceability frameworks for coffee, cocoa, and other agricultural RWA tokenization systems."
  },
  {
    title: "A Noise-Robust End-to-End Framework for Amharic Speech Recognition",
    authors: ["Yohannes Ayana Ejigu", "Tesfa Tegegne Asfaw", "Surafel Amsalu Tadesse"],
    year: 2025,
    abstract: "This paper proposes a noise-robust end-to-end ASR framework for Amharic using CNNs, BiGRUs, and Connectionist Temporal Classification. Trained on 20,000 noisy Amharic utterances, the system achieves a 7% word error rate, demonstrating strong performance in real-world noisy environments and providing a practical model for low-resource ASR development.",
    downloadUrl: "https://www.researchgate.net/publication/394275363_A_Noise-Robust_End-to-End_Framework_for_Amharic_Speech_Recognition",
    sourceWebsite: "Research Square (Preprint)",
    doi: "10.21203/rs.3.rs-6419413/v1",
    tags: ["ASR", "Amharic", "noise-robust", "deep learning", "low-resource languages"],
    relevanceScore: 88,
    notes: "Useful for Addis AI voice-first models and for designing robust ASR pipelines for African languages under noisy field conditions."
  },
  {
    title: "Speech Recognition System Based on Deep Neural Network Acoustic Modeling for Low-Resourced Language – Amharic",
    authors: ["Eshete Derb Emiru", "Yaxing Li", "Shengwu Xiong", "Awet Fesseha"],
    year: 2019,
    abstract: "This conference paper presents a DNN-based acoustic modeling approach for Amharic ASR, using grapheme-to-phoneme conversion and syllable-based pronunciation dictionaries. The study evaluates several DNN architectures and demonstrates substantial improvements in word error rate for Amharic, a low-resource and morphologically rich language.",
    downloadUrl: "https://www.researchgate.net/publication/338519963_Speech_recognition_system_based_on_deep_neural_network_acoustic_modeling_for_low_resourced_language-Amharic",
    sourceWebsite: "ACM ICTCE 2019 Conference",
    doi: "10.1145/3369555.3369564",
    tags: ["Amharic", "ASR", "DNN", "low-resource languages", "G2P"],
    relevanceScore: 80,
    notes: "Relevant for understanding older DNN-HMM hybrid pipelines used in Amharic ASR before the shift to end-to-end models."
  }
];

async function addExternalPapers() {
  try {
    console.log(`\n📚 Adding ${papers.length} external papers to library...\n`);

    for (const paper of papers) {
      const [insertedPaper] = await db
        .insert(externalPapers)
        .values({
          title: paper.title,
          authors: JSON.stringify(paper.authors),
          year: paper.year,
          abstract: paper.abstract,
          downloadUrl: paper.downloadUrl,
          sourceWebsite: paper.sourceWebsite,
          doi: paper.doi,
          tags: JSON.stringify(paper.tags),
          relevanceScore: paper.relevanceScore,
          notes: paper.notes,
        })
        .returning();

      console.log(`✅ Added: ${insertedPaper.title}`);
      console.log(`   Authors: ${paper.authors.join(", ")}`);
      console.log(`   Year: ${paper.year}`);
      console.log(`   Relevance: ${paper.relevanceScore}%`);
      console.log(`   ID: ${insertedPaper.id}\n`);
    }

    console.log(`\n🎉 Successfully added all ${papers.length} papers to the library!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding external papers:", error);
    process.exit(1);
  }
}

addExternalPapers();
