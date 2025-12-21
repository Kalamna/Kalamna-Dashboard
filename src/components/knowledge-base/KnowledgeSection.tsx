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
              defaultValue: "Organize FAQs, policies, and reference files for your team and widget.",
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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Top-level flex container: left + right */}
      <div className="flex justify-between items-start gap-4 flex-wrap">
        {/* Left: Icon + Title + Info */}
        <div className="flex items-start space-x-4">
          {/* Document icon */}
          <div className="w-6 h-6 text-blue-600 dark:text-[#3b82f6] mt-1">
            {type === "text" ? <FileText /> : <Folder />}
          </div>

          {/* Title and info */}
          <div>
            <h2 className="font-medium mb-2 text-gray-900 dark:text-white break-words">
              {title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
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
                className={`text-xs mb-1 px-2 py-1 rounded-full border ${
                  status === "active"
                    ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
                    : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
                }`}
              >
                {t(status)}
              </span>
            </p>
          </div>
        </div>

        {/* Right: Action icons */}
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300">
          <button
            onClick={onView}
            title="View"
            className="text-blue-600 hover:text-blue-700 dark:text-[#3b82f6] dark:hover:text-blue-300 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
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
      <div className="flex space-x-4 items-center flex-wrap gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="app-header__search px-4 py-2 rounded-lg w-full flex-1 min-w-0 focus:outline-none text-left text-gray-900 dark:text-white"
        />

        {/* Type filter */}
        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "all" | "text" | "file")
          }
          className="app-header__search px-3 py-2 rounded-lg w-64 max-w-full text-left text-gray-900 dark:text-white focus:outline-none disabled:opacity-50"
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
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-[#e5e7eb] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
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
            "Only PDF, DOC/DOCX, XLS/XLSX, CSV, or image files are allowed."
        );
        return;
      }
    }

    const successMessage =
      t("Knowledge added successfully.");
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
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700 my-8">
        <div className="flex flex-wrap justify-between items-center gap-3 px-6 pt-6 border-b border-gray-200 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("addKnowledge")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {t("addKnowledgeSubtitle", {
                defaultValue: "Add training materials to enhance AI learning",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0a1929] active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 px-3 py-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("title")}
                <span className="text-red-500 dark:text-red-400 ml-1">*</span>
              </label>
            </div>
            <div className="relative">
              <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-[#1e3a5f] rounded-lg bg-white dark:bg-[#0a1929] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3b82f6] focus:border-transparent shadow-sm"
                placeholder={t("title")}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("titleHelper", {
                defaultValue: "Keep it short and clear, e.g. 'Return Policy' or 'FAQ'.",
              })}
            </p>
          </div>

          {/* Type switch */}
          <div className="space-y-2">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3b82f6] focus:border-transparent shadow-sm appearance-none"
              >
                <option value="text">{t("text")}</option>
                <option value="file">{t("file")}</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
            </div>
          </div>

          {/* Conditional content */}
          {type === "text" ? (
            <div className="space-y-2">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3b82f6] focus:border-transparent shadow-sm"
                  rows={4}
                  placeholder={t("textContent")}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("textContentHelper", {
                  defaultValue: "Add a concise summary; bullets or short paragraphs work best.",
                })}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("uploadFile")}
                <span className="text-red-500 dark:text-red-400 ml-1">*</span>
              </label>
              <div className="flex items-center gap-3">
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 cursor-pointer shadow-sm"
                >
                  <Upload className="w-4 h-4" />
                  {t("chooseFile") || "Choose file"}
                </label>
                {file && (
                  <span className="text-sm text-gray-700 dark:text-white truncate">
                    {file.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("fileTypeHint", {
                  defaultValue: "Allowed: PDF, DOC/DOCX, XLS/XLSX, CSV, PNG, JPG, JPEG, GIF, WEBP.",
                })}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white shadow-lg hover:shadow-xl w-full"
            >
              <Plus className="w-6 h-6" />
              {t("add")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
