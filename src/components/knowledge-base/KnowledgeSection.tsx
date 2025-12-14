import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { knowledgeMockData } from "./mockData";
import type { KnowledgeEntry } from "./types";

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

export const KnowledgeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("") //search input
  const [filterType, setFilterType] = useState<"all" | "text" | "file">("all"); //type filter

  const [currentPage, setCurrentPage] = useState(1); //current page number 
  const itemsPerPage = 10 //show 10 cards per page

  useEffect( ()=> {
    setCurrentPage(1);
  }, [searchTerm, filterType] );

  //filter data based on search & type
  const filteredData = knowledgeMockData.filter( (entry: KnowledgeEntry) => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesType
  } );

  //calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) //user to render the page number
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
          placeholder="Search knowledge..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-lg flex-1"
        />

        {/* Type filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "all" | "text" | "file")}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
      </div>

      {/* Knowledge cards */}
      <div className="space-y-2">
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
            onClick={() => setCurrentPage( (prev) => Math.max(prev - 1, 1) )} 
            disabled = {currentPage === 1} 
            className="px-3 py-1 border rounded disabled:opacity-50">
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
          </div>

        ) }

      </div>
    </div>
  )};
