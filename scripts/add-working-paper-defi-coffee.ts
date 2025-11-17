import { db } from '../src/db/client';
import { workingPapers } from '../src/db/schema';

async function addWorkingPaper() {
  console.log('Adding working paper: DeFi and RWA Tokenization for SMEs in Coffee Value Chain');

  try {
    const paper = await db.insert(workingPapers).values({
      title: "Decentralized Finance (DeFi) and RWA Tokenization: Solving the Collateral and Liquidity Gap for SMEs in the Coffee Value Chain — A Conceptual Framework",
      slug: "defi-rwa-tokenization-sme-coffee-value-chain",
      abstract: "This review synthesizes research on specific financing challenges SMEs face in the coffee value chain, such as access to credit, high-interest rates, and lack of collateral, to address barriers limiting their financial inclusion and growth. The review aimed to evaluate financing barriers, institutional constraints, effectiveness of financing models, innovative strategies, and risk-sharing mechanisms affecting SMEs. A systematic analysis of 50 studies from Latin America, Africa, and South-east Asia employing qualitative, quantitative, and mixed methods was conducted. Findings reveal pervasive collateral scarcity and high-interest rates as primary obstacles restricting formal credit access, compounded by institutional inefficiencies including complex loan procedures and weak legal enforcement. Innovative financing models, notably fintech platforms, crowdfunding, and public credit guarantees, show potential to enhance credit accessibility and affordability, though empirical evaluations remain limited. This paper introduces Decentralized Finance (DeFi) as a conceptual counter-framework, highlighting how Real-World Asset (RWA) tokenization, DAOs, and smart contracts could transform collateral requirements and reduce capital costs for SMEs in the coffee value chain by enabling tokenized inventory and on-chain lending mechanisms.",
      authors: JSON.stringify(["Emmanuel Acho"]),
      coAuthors: JSON.stringify([]),
      version: "v1.0",
      status: "completed",
      pdfUrl: "https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreidvqk6nksvra3yu7giqmm6o5adwxq2ecwrxu5n45a4q5f6mzm6e2u",
      fileSize: 2048000,
      tags: JSON.stringify(["SMEs", "DeFi", "RWA Tokenization", "Coffee Value Chain"]),
      keywords: JSON.stringify(["collateral scarcity", "credit access", "Decentralized Finance", "tokenization", "SME financing", "coffee sector"]),
      researchArea: "Decentralized Finance and Agricultural Value Chain Financing",
      publishedDate: new Date("2025-11-01"),
    }).returning();

    console.log('✅ Working paper added successfully!');
    console.log('Paper ID:', paper[0].id);
    console.log('Title:', paper[0].title);
    console.log('Slug:', paper[0].slug);
    console.log('Authors:', paper[0].authors);
    console.log('Status:', paper[0].status);
    console.log('Version:', paper[0].version);
    console.log('Research Area:', paper[0].researchArea);
    console.log('Published Date:', paper[0].publishedDate);
    console.log('PDF URL:', paper[0].pdfUrl);
    console.log('Tags:', paper[0].tags);
    console.log('Keywords:', paper[0].keywords);

  } catch (error) {
    console.error('❌ Error adding working paper:', error);
    throw error;
  }
}

addWorkingPaper();
