import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "process";

const genAI = new GoogleGenerativeAI("AIzaSyAM_cFemVyEnPHqAbHCGD9nCmcBFbaRlsk");
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

async function getEmbedding(text: string) {
  try {
    // Generate embeddings for the input text
    const result = await embeddingModel.embedContent(text);

    // Get the embedding values
    const embedding = result.embedding.values;

    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

export { getEmbedding };
