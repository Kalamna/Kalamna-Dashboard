export interface KnowledgeEntry {
  id: string;
  title: string;
  type: "text" | "file";
  chunks: string[]; // places of content
  updatedAt: string; // ISO date string
  status: "active" | "inactive";
}
