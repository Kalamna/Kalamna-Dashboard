// src/components/common/Pagination.tsx

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (_page: number) => void;
  itemName?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemName = "items",
}) => {
  const { t } = useTranslation();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-background-card-light dark:bg-background-card-dark px-4 py-3 rounded-lg border border-border-light dark:border-border-dark">
      {/* Info Text */}
      <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
        {t("showing") || "Showing"} {startIndex + 1} {t("to") || "to"}{" "}
        {endIndex} {t("of") || "of"} {totalItems} {t(itemName) || itemName}
      </div>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-border-light dark:border-border-dark hover:bg-table-hover-light dark:hover:bg-table-hover-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
        </button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 text-text-secondary-light dark:text-text-secondary-dark">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-table-header-light dark:bg-table-header-dark text-white dark:text-text-primary-dark font-semibold"
                    : "border border-border-light dark:border-border-dark hover:bg-table-hover-light dark:hover:bg-table-hover-dark text-text-primary-light dark:text-text-primary-dark"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-border-light dark:border-border-dark hover:bg-table-hover-light dark:hover:bg-table-hover-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
