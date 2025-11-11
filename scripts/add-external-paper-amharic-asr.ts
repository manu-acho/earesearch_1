import { db } from '../src/db/client';
import { externalPapers } from '../src/db/schema';

async function addExternalPaper() {
  console.log('Adding external paper: A Noise-Robust End-to-End Framework for Amharic Speech Recognition');

  try {
    const paper = await db.insert(externalPapers).values({
      title: "A Noise-Robust End-to-End Framework for Amharic Speech Recognition",
      authors: "Yohannes Ayana Ejigu, Tesfa Tegegne Asfaw, Surafel Amsalu Tadesse",
      year: 2025,
      downloadUrl: "https://www.researchsquare.com/article/rs-6419413/v1",
      abstract: "This paper presents a noise-robust, end-to-end automatic speech recognition (ASR) framework tailored to the Amharic language. The proposed model integrates convolutional neural networks (CNNs), bidirectional gated recurrent units (BiGRUs), and Connectionist Temporal Classification (CTC) to directly transcribe speech into text without manual dictionary construction. Evaluated on 20,000 noisy Amharic utterances (44 hours of data), the system achieves a 7% word error rate (WER), demonstrating strong performance under real-world noisy conditions. The framework's combined spectral subtraction and subspace filtering approaches yield the most accurate results, highlighting its practicality for low-resource, noise-prone environments.",
      sourceWebsite: "Research Square",
      doi: "10.21203/rs.3.rs-6419413/v1",
      tags: JSON.stringify([
        "Amharic",
        "Speech Recognition",
        "ASR",
        "End-to-End Deep Learning",
        "Noise Robustness",
        "Low-Resource Languages"
      ]),
      category: "ASR",
      notes: "Relevant for understanding end-to-end ASR design for Amharic and other low-resource African languages. Achieves 7% WER with BiGRU-CTC model on noisy data.",
      featured: true,
    }).returning();

    console.log('✅ External paper added successfully!');
    console.log('Paper ID:', paper[0].id);
    console.log('Title:', paper[0].title);
    console.log('Authors:', paper[0].authors);
    console.log('Year:', paper[0].year);
    console.log('Featured:', paper[0].featured);

  } catch (error) {
    console.error('❌ Error adding external paper:', error);
    throw error;
  }
}

addExternalPaper();
