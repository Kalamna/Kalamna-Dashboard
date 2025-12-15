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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {t("knowledgeBase")}
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] dark:bg-[#3b82f6] text-white dark:text-white shadow-sm"
        >
          {t("addKnowledge")}
        </button>
      </div>

      {/* Knowledge list (cards + search + filter + pagination) */}
      <KnowledgeList />

      {/* Add Knowledge Modal */}
      <KnowledgeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
