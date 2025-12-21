import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { knowledgeMockData } from "./mockData";
import type { KnowledgeEntry } from "./types";
import {
  FileText,
  Folder,
  Eye,
  Trash2,
  X,
  Upload,
  Plus,
  AlertCircle,
} from "lucide-react";

export function KnowledgeSection() {
  const { t } = useTranslation();

  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("knowledgeBase")}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("knowledgeBaseSubtitle", {
              defaultValue:
                "Organize FAQs, policies, and reference files for your team and widget.",
            })}
          </p>
        </div>
      </div>
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
  onDelete?: () => void;
}

export const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  title,
  type,
  updatedAt,
  chunksCount,
  status,
  onView,
  onDelete,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-[#0a1929] p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-[#1e3a5f] shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Top-level flex container: left + right */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Left: Icon + Title + Info */}
        <div className="flex items-start space-x-3 sm:space-x-4 w-full">
          {/* Document icon */}
          <div className="w-6 h-6 text-[#0066cc] dark:text-[#3b82f6] mt-1 flex-shrink-0">
            {type === "text" ? (
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Folder className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </div>

          {/* Title and info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white break-words text-sm sm:text-base">
              {title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span className="whitespace-nowrap">
                {t("updated")}: {updatedAt}
              </span>
              <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
                |
              </span>
              <span className="whitespace-nowrap">
                {t("chunks")}: {chunksCount}{" "}
                {type === "text" ? "chunks" : "files"}
              </span>
              <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
                |
              </span>
              <span
                className={`px-2 py-0.5 rounded-full border text-[10px] sm:text-xs font-medium ${
                  status === "active"
                    ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                    : "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30"
                }`}
              >
                {t(status)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action icons */}
        <div className="flex items-center space-x-3 sm:space-x-4 text-gray-500 dark:text-gray-300 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-[#1e3a5f]">
          <button
            onClick={onView}
            title="View"
            className="flex items-center gap-1.5 text-[#0066cc] hover:text-[#0052a3] dark:text-[#3b82f6] dark:hover:text-[#60a5fa] transition-colors text-xs sm:text-sm font-medium"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="sm:hidden">{t("view")}</span>
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="flex items-center gap-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors text-xs sm:text-sm font-medium"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="sm:hidden">{t("delete")}</span>
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
    <div className="space-y-4 overflow-x-hidden">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="app-header__search px-4 py-2.5 rounded-lg w-full focus:outline-none text-left text-gray-900 dark:text-white border border-gray-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0a1929] shadow-sm"
          />
        </div>

        {/* Type filter */}
        <div className="relative w-full sm:w-48">
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "text" | "file")
            }
            className="app-header__search px-3 py-2.5 rounded-lg w-full text-left text-gray-900 dark:text-white focus:outline-none disabled:opacity-50 border border-gray-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0a1929] shadow-sm appearance-none"
          >
            <option value="all">{t("all")}</option>
            <option value="text">{t("text")}</option>
            <option value="file">{t("file")}</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            ▾
          </span>
        </div>
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
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] hover:bg-[#0052a3] disabled:bg-[#9ec6f5] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white shadow-sm"
            >
              {t("prev")}
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 shadow-sm border ${
                  currentPage === page
                    ? "bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white border-transparent"
                    : "bg-white dark:bg-[#0a1929] text-gray-700 dark:text-gray-300 border-[#e5e7eb] dark:border-[#1e3a5f] hover:bg-gray-50 dark:hover:bg-[#1a2f45]"
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
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] hover:bg-[#0052a3] disabled:bg-[#9ec6f5] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white shadow-sm"
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
  onSuccess?: (message: string) => void;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const allowedFileTypes = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "csv",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp",
  ];
  // Local UI State
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

    if (type === "file" && file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      const isAllowed = extension && allowedFileTypes.includes(extension);
      if (!isAllowed) {
        setError(
          t("fileTypeNotAllowed") ||
            "Only PDF, DOC/DOCX, XLS/XLSX, CSV, or image files are allowed.",
        );
        return;
      }
    }

    const successMessage = t("Knowledge added successfully.");
    onSuccess?.(successMessage);
    setTitle("");
    setContent("");
    setFile(null);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0d1f2d] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-[#1e3a5f] flex flex-col">
        <div className="overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-[#0d1f2d] z-10 flex justify-between items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-[#1e3a5f]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {t("addKnowledge")}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                {t("addKnowledgeSubtitle", {
                  defaultValue: "Add training materials to enhance AI learning",
                })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a2f45] active:scale-95"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
            {error && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 px-3 py-2 text-sm text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Title */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("title")}
                <span className="text-red-500 dark:text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-[#1e3a5f] rounded-lg bg-white dark:bg-[#0a1929] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066cc] dark:focus:ring-[#3b82f6] focus:border-transparent shadow-sm text-sm sm:text-base"
                  placeholder={t("title")}
                />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                {t("titleHelper", {
                  defaultValue:
                    "Keep it short and clear, e.g. 'Return Policy' or 'FAQ'.",
                })}
              </p>
            </div>

            {/* Type switch */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("type")}
              </label>
              <div className="relative">
                <Folder className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value as "text" | "file");
                    setError("");
                  }}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-[#1e3a5f] rounded-lg bg-white dark:bg-[#0a1929] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc] dark:focus:ring-[#3b82f6] focus:border-transparent shadow-sm appearance-none text-sm sm:text-base"
                >
                  <option value="text">{t("text")}</option>
                  <option value="file">{t("file")}</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </span>
              </div>
            </div>

            {/* Conditional content */}
            {type === "text" ? (
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {t("textContent")}
                  <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-[#1e3a5f] rounded-lg bg-white dark:bg-[#0a1929] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066cc] dark:focus:ring-[#3b82f6] focus:border-transparent shadow-sm text-sm sm:text-base"
                    rows={4}
                    placeholder={t("textContent")}
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  {t("textContentHelper", {
                    defaultValue:
                      "Add a concise summary; bullets or short paragraphs work best.",
                  })}
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {t("uploadFile")}
                  <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <input
                    id="kb-file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.gif,.webp"
                    className="hidden"
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null);
                      setError("");
                    }}
                  />
                  <label
                    htmlFor="kb-file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-[#0a1929] dark:text-gray-100 dark:hover:bg-[#1a2f45] border border-gray-200 dark:border-[#1e3a5f] cursor-pointer shadow-sm w-full sm:w-auto justify-center"
                  >
                    <Upload className="w-4 h-4" />
                    {t("chooseFile") || "Choose file"}
                  </label>
                  {file && (
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-white truncate max-w-full">
                      {file.name}
                    </span>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  {t("fileTypeHint", {
                    defaultValue:
                      "Allowed: PDF, DOC/DOCX, XLS/XLSX, CSV, PNG, JPG, JPEG, GIF, WEBP.",
                  })}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-4 sticky bottom-0 bg-white dark:bg-[#0d1f2d] pb-2 sm:pb-0">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-7 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white shadow-lg hover:shadow-xl w-full"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                {t("add")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
