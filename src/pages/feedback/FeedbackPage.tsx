import React, { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Feedback {
  id: number;
  sessionId: string;
  rating: number;
  comment: string;
  date: string;
}

interface FeedbackPageProps {
  feedbacks?: Feedback[];
}

export default function FeedbackPage({
  feedbacks: initialFeedbacks,
}: FeedbackPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [feedbacks] = useState<Feedback[]>(
    initialFeedbacks || [
      {
        id: 1,
        sessionId: "SES-001",
        rating: 5,
        comment: "Excellent service and support!",
        date: "2025-12-10",
      },
      {
        id: 2,
        sessionId: "SES-002",
        rating: 4,
        comment: "Good experience, could be improved.",
        date: "2025-12-11",
      },
      {
        id: 3,
        sessionId: "SES-003",
        rating: 5,
        comment: "Very satisfied with the platform.",
        date: "2025-12-12",
      },
    ],
  );

  const averageRating =
    feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length || 0;

  const positiveRate =
    (feedbacks.filter((f) => f.rating >= 4).length / feedbacks.length) * 100 ||
    0;

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("customerFeedback", "Customer Feedback")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("feedbackSubtitle", {
              defaultValue: "Monitor and analyze customer satisfaction and feedback",
            })}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base whitespace-nowrap"
          onClick={() => navigate("/chat-history")}
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
          {t("goToChatSession", "View Chat Sessions")}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={t("averageRating", "Average Rating")}
          value={averageRating.toFixed(1)}
        >
          <StarRating rating={Math.round(averageRating)} />
        </StatCard>

        <StatCard
          title={t("totalFeedback", "Total Feedback")}
          value={feedbacks.length}
        />

        <StatCard
          title={t("positiveRate", "Positive Rate")}
          value={`${positiveRate.toFixed(0)}%`}
        />
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f] overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <StarRating rating={feedback.rating} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {t("session", "Session")}: <span className="font-medium text-[#0066cc] dark:text-[#3b82f6]">{feedback.sessionId}</span>
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {new Date(feedback.date).toLocaleDateString()}
              </span>
            </div>

            {/* Comment */}
            <p className="text-gray-700 dark:text-white leading-relaxed">
              {feedback.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f] hover:shadow-md transition-shadow duration-200">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
      <div className="flex items-center gap-3">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {children}
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "text-yellow-400 fill-yellow-400 dark:text-yellow-500 dark:fill-yellow-500"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}
