import { KnowledgeList } from "../../components/knowledge-base/KnowledgeSection";
import { KnowledgeModal } from "../../components/knowledge-base/KnowledgeSection";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export const KnowledgeBasePage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="p-6 space-y-6"> 
    {/* Page header */} 
    <div className="flex items-center justify-between">
      {/* Big bold text for page title */} 
      <h1 className="text-2xl font-semibold">
        {t("knowledgeBase")}
      </h1> 
      {/* Add Knowledge button */}
      <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded-lg bg-primary text-black">
        {t("addKnowledge")}
      </button>
      </div>

      {/* Knowledge list (cards + search + filter + pagination) */} 
        <KnowledgeList/>

        {/* Add Knowledge Modal */}
        <KnowledgeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
    </div>
    );
   };