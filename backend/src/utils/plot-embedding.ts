import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GENERATIVE_AI_API_KEY as string
);
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

async function getEmbedding(text: string) {
  try {
    // Generate embeddings for the input text
    const result = await embeddingModel.embedContent(text);

    // Get the embedding values
    const embedding = result.embedding.values;
    const scaledEmbedding = embedding.map((value) => value);

    return scaledEmbedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

// import { pipeline } from "@xenova/transformers";

// // Function to generate embeddings for a given data source
// async function getEmbedding2(data: string) {
//   const embedder = await pipeline(
//     "feature-extraction",
//     "Xenova/nomic-embed-text-v1"
//   );
//   const results = await embedder(data, { pooling: "mean", normalize: true });
//   return Array.from(results.data);
// }

export { getEmbedding };
