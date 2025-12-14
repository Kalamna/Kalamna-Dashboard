import type { KnowledgeEntry } from "./types";

export const knowledgeMockData: KnowledgeEntry[] = [
  {
    id: "1",
    title: "Product Return Policy",
    type: "text",
    chunks: ["Step 1: Log in", "Step 2: Click on Dashboard", "Step 3: Navigate menus"],
    updatedAt: "2025-12-14",
    status: "active",
  },
  {
    id: "2",
    title: "Shipping Guidelines",
    type: "file",
    chunks: ["File instructions.pdf"],
    updatedAt: "2025-12-12",
    status: "inactive",
  },
  {
    id: "3",
    title: "Custom FAQ",
    type: "text",
    chunks: ["Q1: How to reset password?", "Q2: How to change email?"],
    updatedAt: "2025-12-10",
    status: "active",
  },
];
