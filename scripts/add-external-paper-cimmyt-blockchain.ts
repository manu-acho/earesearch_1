import { db } from '../src/db/client';
import { externalPapers } from '../src/db/schema';

async function addExternalPaper() {
  console.log('Adding external paper: CIMMYT Blockchain-Enabled Digital Identities for Smallholder Farmers');

  try {
    const paper = await db.insert(externalPapers).values({
      title: "Empowering Smallholder Farmers with Blockchain-Enabled Digital Identities: The Case of CIMMYT for Traceability, Financial Inclusion and Value Chain Integration",
      authors: "Ivana Radic, Andrea Gardeazabal",
      year: 2024,
      downloadUrl: "https://cgspace.cgiar.org/server/api/core/bitstreams/4f7974ab-07c2-4cb5-9077-8fdb7a3961c2/content",
      abstract: "This paper examines the transformative potential of blockchain-enabled digital identities in empowering smallholder farmers, with a specific focus on CIMMYT's initiatives in the Global South. By providing farmers with secure, verifiable credentials and data wallets, these technologies address critical challenges in financial inclusion, supply chain traceability, and data governance. Leveraging case studies from CIMMYT's partnerships with Bluenumber and Identi, the paper explores the application of blockchain to enhance data ownership, improve market access, and foster transparency within agrifood systems. Findings highlight how digital identities enable farmers to control and monetize their data, access financial services, and comply with traceability standards, thereby strengthening their position in global value chains. Despite significant potential, challenges such as digital literacy gaps, infrastructure limitations, and regulatory disparities persist. The paper concludes with recommendations for scaling these solutions, emphasizing region-specific adaptations, collaborative frameworks, and robust data governance to maximize impact and inclusivity.",
      sourceWebsite: "CGIAR / IFPRI Working Paper Repository",
      doi: "https://hdl.handle.net/10568/113623",
      tags: JSON.stringify([
        "Blockchain",
        "Digital Identities",
        "Smallholder Farmers",
        "Data Wallets",
        "Financial Inclusion",
        "Traceability",
        "Data Governance",
        "Agrifood Systems",
        "Global South",
        "CIMMYT"
      ]),
      category: "Blockchain & Digital Identity",
      notes: "This paper provides a detailed case study of CIMMYT's blockchain-based digital identity pilots with Bluenumber and Identi, focusing on data sovereignty, market access, and traceability. It is highly relevant for designing decentralized socio-technical systems in agriculture that emphasize farmer agency, data ownership, and equitable value distribution.",
      featured: true,
    }).returning();

    console.log('✅ External paper added successfully!');
    console.log('Paper ID:', paper[0].id);
    console.log('Title:', paper[0].title);
    console.log('Authors:', paper[0].authors);
    console.log('Year:', paper[0].year);
    console.log('Category:', paper[0].category);
    console.log('Featured:', paper[0].featured);
    console.log('Tags:', paper[0].tags);

  } catch (error) {
    console.error('❌ Error adding external paper:', error);
    throw error;
  }
}

addExternalPaper();
