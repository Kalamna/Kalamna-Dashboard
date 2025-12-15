import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { knowledgeMockData } from "./mockData";
import type { KnowledgeEntry } from "./types";
import { FileText, Folder, Eye, Edit2, Trash2 } from "lucide-react";
import { X } from "lucide-react";

export function KnowledgeSection() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("knowledgeBase")}</h2>
      {/* TODO: Add Knowledge Base content */}
    </div>
  );
}

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
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg border border-gray-200 dark:border-[#1e3a5f] shadow-md">
      {/* Top-level flex container: left + right */}
      <div className="flex justify-between items-start">
        {/* Left: Icon + Title + Info */}
        <div className="flex items-start space-x-4">
          {/* Document icon */}
          <div className="w-6 h-6 text-blue-800 dark:text-blue-400 mt-1">
            {type === "text" ? <FileText /> : <Folder />}
          </div>

          {/* Title and info */}
          <div>
            <h2 className="font-medium mb-2 text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground text-gray-900 dark:text-white">
              <span>
                {t("updated")}: {updatedAt}
              </span>{" "}
              &nbsp; | &nbsp;
              <span>
                {t("chunks")}: {chunksCount}{" "}
                {type === "text" ? "chunks" : "files"}
              </span>{" "}
              &nbsp; | &nbsp;
              <span
                className={`text-xs text-black dark:text-white mb-1 px-2 py-1 rounded-full ${
                  status === "active"
                    ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30"
                    : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-500/30"
                }`}
              >
                {t(status)}
              </span>
            </p>
          </div>
        </div>

        {/* Right: Action icons */}
        <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
          <button onClick={onView} title="View">
            <Eye className="w-5 h-5 text-blue-800 dark:text-blue-400 mt-1" />
          </button>
          <button onClick={onEdit} title="Edit">
            <Edit2 className="w-5 h-5 text-blue-800 dark:text-blue-400 mt-1" />
          </button>
          <button onClick={onDelete} title="Delete">
            <Trash2 className="w-5 h-5 text-blue-800 dark:text-blue-400 mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const KnowledgeList: React.FC = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState(""); //search input
  const [filterType, setFilterType] = useState<"all" | "text" | "file">("all"); //type filter

  const [currentPage, setCurrentPage] = useState(1); //current page number
  const itemsPerPage = 10; //show 10 cards per page

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  //filter data based on search & type
  const filteredData = knowledgeMockData.filter((entry: KnowledgeEntry) => {
    const matchesSearch = entry.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  //calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); //user to render the page number
  const startIndex = (currentPage - 1) * itemsPerPage; // where the current page start
  const endIndex = startIndex + itemsPerPage; // where it ends
  const paginatedData = filteredData.slice(startIndex, endIndex); // returns only the items for that age

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex space-x-4 items-center">
        {/* Search input */}
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="app-header__search px-4 py-2 rounded-lg w-full focus:outline-none text-left"
        />

        {/* Type filter */}
        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "all" | "text" | "file")
          }
          className="app-header__search px-3 py-2 rounded-lg w-64 text-left bg-blue-500 text-white focus:outline-none disabled:opacity-50"
        >
          <option value="all">{t("all")}</option>
          <option value="text">{t("text")}</option>
          <option value="file">{t("file")}</option>
        </select>
      </div>

      {/* Knowledge cards */}
      <div className="space-y-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((entry) => (
            <KnowledgeCard
              key={entry.id}
              title={entry.title}
              type={entry.type}
              updatedAt={entry.updatedAt}
              chunksCount={entry.chunks.length}
              status={entry.status}
              onView={() => console.log("View", entry.id)}
              onEdit={() => console.log("Edit", entry.id)}
              onDelete={() => console.log("Delete", entry.id)}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No knowledge found.</p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            {/* Prev button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] dark:bg-[#3b82f6] text-white dark:text-white shadow-smflex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] dark:bg-[#3b82f6] text-white dark:text-white shadow-sm"
            >
              {t("prev")}
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] dark:bg-[#3b82f6] text-white dark:text-white shadow-sm ${
                  currentPage === page ? "bg-primary text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] dark:bg-[#3b82f6] text-white dark:text-white shadow-sm"
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  /* -----------------------------
   * Local UI State
   * ----------------------------- */
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"text" | "file">("text");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  /* -----------------------------
   * Validation (UI ONLY)
   * ----------------------------- */
  const handleSubmit = () => {
    if (!title.trim()) {
      setError(t("titleRequired"));
      return;
    }

    if (type === "text" && !content.trim()) {
      setError(t("textRequired"));
      return;
    }

    if (type === "file" && !file) {
      setError(t("fileRequired"));
      return;
    }

    // UI only — no logic yet
    console.log("Add Knowledge");

    // Reset + close
    setTitle("");
    setContent("");
    setFile(null);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#0d1f2d] rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("addKnowledge")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {t("title")}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#14283b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type switch */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {t("type")}
          </label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as "text" | "file");
              setError("");
            }}
            className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#14283b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text">{t("text")}</option>
            <option value="file">{t("file")}</option>
          </select>
        </div>

        {/* Conditional content */}
        {type === "text" ? (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {t("textContent")}
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError("");
              }}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#14283b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        ) : (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {t("uploadFile")}
            </label>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setError("");
              }}
              className="w-full mt-1 text-gray-900 dark:text-gray-100"
            />
            {file && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Selected file: {file.name}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-blue-600 dark:bg-blue-500 text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-400"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-blue-600 dark:bg-blue-500 text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-400"
          >
            {t("add")}
          </button>
        </div>
      </div>
    </div>
  );
};
