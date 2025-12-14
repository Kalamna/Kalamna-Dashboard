import { useTranslation } from "react-i18next";

export function KnowledgeSection() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("knowledgeBase")}</h2>
      {/* TODO: Add Knowledge Base content */}
    </div>
  );
}

import React from "react";

interface KnowledgeCardProps {
  title: string;
  type: "text" | "file";
  updatedAt: string;
  chunksCount: number;
  status: "active" | "inactive";
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  title,
  type,
  updatedAt,
  chunksCount,
  status,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
      {/* Left: Icon + Title + Info */}
      <div className="flex items-center space-x-4">
        {/* Document icon */}
        <div className="text-xl">
          {type === "text" ? "📄" : "📁"}
        </div>

        {/* Title and info */}
        <div>
          <h2 className="font-medium">{title}</h2>
          <p className="text-sm text-muted-foreground">
              Updated: {updatedAt} -
              {chunksCount} {type === "text" ? "chunks" : "files"}
              <span className={`px-2 py-1 text-xs rounded-full ${
                status === "active" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"
              }`} >
              {status}
              </span>
            </p>
        </div>
      </div>

      {/* Right: Status badge + action icons */}
      <div className="flex items-center space-x-4">
        {/* Action icons */}
        <div className="flex space-x-2 text-gray-500">
          <button onClick={onView} title="View">
            👁️
          </button>
          <button onClick={onEdit} title="Edit">
            ✏️
          </button>
          <button onClick={onDelete} title="Delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};