import { KnowledgeList } from "../../components/knowledge-base/KnowledgeSection";
import { KnowledgeModal } from "../../components/knowledge-base/KnowledgeSection";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Plus } from "lucide-react";

export const KnowledgeBasePage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | "">("");
  return (
    <div className="p-6 space-y-6 max-w-full overflow-x-hidden">
      {successMessage && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 px-4 py-3 text-sm text-green-700 dark:text-green-200 shadow-sm">
          <CheckCircle2 className="w-5 h-5 mt-0.5" />
          <div>
            <p className="font-semibold">{successMessage}</p>
          </div>
        </div>
      )}
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("knowledgeBase")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("knowledgeBaseSubtitle")}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-5 h-5 flex-shrink-0" />
          {t("addKnowledge")}
        </button>
      </div>

      {/* Knowledge list (cards + search + filter + pagination) */}
      <KnowledgeList />

      {/* Add Knowledge Modal */}
      <KnowledgeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(msg) => {
          setSuccessMessage(msg);
          setIsModalOpen(false);
          setTimeout(() => setSuccessMessage(""), 3000);
        }}
      />
    </div>
  );
};
