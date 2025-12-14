import { knowledgeMockData } from "../../components/knowledge-base/mockData";
import type { KnowledgeEntry } from "../../components/knowledge-base/types";
import { KnowledgeCard } from "../../components/knowledge-base/KnowledgeSection";
import { KnowledgeList } from "../../components/knowledge-base/KnowledgeSection";

export const KnowledgeBasePage = () => {
  return (
    <div className="p-6 space-y-6"> 
    {/* Page header */} 
    <div className="flex items-center justify-between">
      {/* Big bold text for page title */} 
      <h1 className="text-2xl font-semibold">
        Knowledge Base
      </h1> 
      {/* Add Knowledge button */}
      <button className="px-4 py-2 rounded-lg bg-primary text-black"> 
        Add Knowledge 
      </button> 
      </div>
      {/* Page content placeholder */} 
      <div className="text-sm text-muted-foreground">
        <div className="space-y-4">
        <KnowledgeList/>
        </div> 
      </div> 
    </div>
    );
   };