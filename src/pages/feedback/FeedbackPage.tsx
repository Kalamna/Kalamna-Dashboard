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
    <div className="space-y-6">
      {/* Top Bar with Title and Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-color-specific dark:text-white">
          {t("customerFeedback", "Customer Feedback")}
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition-colors"
          onClick={() => navigate("/chat-history")}
        >
          <MessageSquare className="w-5 h-5" />
          {t("goToChatSession", "Go to Chat Session")}
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
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <StarRating rating={feedback.rating} />
                <p className="text-sm text-gray-600 dark:text-secondary mt-1">
                  Session: {feedback.sessionId}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-secondary">
                {feedback.date}
              </span>
            </div>

            {/* Comment */}
            <p className="text-gray-700 dark:text-secondary">
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-secondary mb-2">{title}</p>
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
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}
