import { knowledgeMockData } from "../../components/knowledge-base/mockData";
import type { KnowledgeEntry } from "../../components/knowledge-base/types";

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
          {knowledgeMockData.map((entry: KnowledgeEntry) => (
            <div
              key={entry.id}
              className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="font-medium">{entry.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {entry.chunks.join(", ")}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {entry.status} • {entry.updatedAt}
              </div>
            </div>
          ))}
        </div> 
      </div> 
    </div>
    );
   };