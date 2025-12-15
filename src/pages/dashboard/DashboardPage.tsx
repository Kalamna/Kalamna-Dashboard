import React from "react";
import { OverviewSection } from "../../components/overview/OverviewSection";

export const DashboardPage = () => {
  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <OverviewSection />
    </div>
  );
};

/* ========================
   Reusable Components
======================== */

function StatCard({
  title,
  value,
  children,
}: {
  title: string;
  value: string | number;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-secondary mb-2">
        {title}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-3xl font-bold text-text-color-specific dark:text-white">
          {value}
        </p>
        {children}
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "text-warning fill-warning"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}
