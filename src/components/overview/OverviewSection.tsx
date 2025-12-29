/**
 * NOTE:
 * This file was refactored to improve responsiveness across
 * mobile, tablet, and desktop devices.
 *
 * - No business logic or features were removed.
 * - All changes are layout-only (flex/grid responsiveness).
 * - Data, translations, and UI behavior remain unchanged.
 */

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Clock,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Book,
  ThumbsUp,
  BarChart,
} from "lucide-react";

export function OverviewSection() {
  const { t } = useTranslation();

  // Dashboard summary cards
  const cards = [
    {
      title: "totalConversations",
      value: "1,234",
      change: "+12%",
      icon: MessageSquare,
      positive: true,
    },
    {
      title: "avgSessionsPerDay",
      value: "45",
      change: "+8%",
      icon: BarChart,
      positive: true,
    },
    {
      title: "activeSessions",
      value: "23",
      change: "-5%",
      icon: Activity,
      positive: false,
    },
    {
      title: "avgResponseTime",
      value: "2.3s",
      change: "-10%",
      icon: Clock,
      positive: true,
    },
    {
      title: "knowledgeBase",
      value: "156",
      change: "+5",
      icon: Book,
      positive: true,
    },
    {
      title: "employees",
      value: "12",
      change: "+2",
      icon: Users,
      positive: true,
    },
  ];

  // Recent conversations preview
  const recentConversations = [
    { id: "12345", messages: 12, duration: "5m 30s", status: "completed" },
    { id: "12346", messages: 8, duration: "3m 15s", status: "active" },
    { id: "12347", messages: 15, duration: "7m 45s", status: "completed" },
  ];

  // Recent user feedback
  const recentFeedback = [
    {
      rating: 5,
      date: "2023-12-01",
      comment: "Great service and quick response!",
    },
    {
      rating: 4,
      date: "2023-11-30",
      comment: "Very helpful, but could be faster.",
    },
    {
      rating: 3,
      date: "2023-11-29",
      comment: "Average experience.",
    },
  ];

  // System alerts / notifications
  const alerts = [
    {
      type: "success",
      message: "System updated successfully",
      timestamp: "2 hours ago",
    },
    {
      type: "warning",
      message: "High traffic detected",
      timestamp: "1 hour ago",
    },
    {
      type: "error",
      message: "Server overload",
      timestamp: "30 minutes ago",
    },
    {
      type: "info",
      message: "New feature available",
      timestamp: "10 minutes ago",
    },
  ];

  // Icon selector for alerts
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "warning":
        return <AlertCircle className="text-yellow-500" size={20} />;
      case "error":
        return <XCircle className="text-red-500" size={20} />;
      case "info":
        return <Info className="text-blue-500" size={20} />;
      default:
        return <Info className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("dashboardOverview")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200">
            {t("overviewSubtitle", {
              defaultValue:
                "Monitor your AI assistant's performance and recent activity at a glance.",
            })}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base whitespace-nowrap">
          {t("downloadReport", { defaultValue: "Download Report" })}
        </button>
      </div>

      {/* Overview Cards (responsive grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0a1929] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t(card.title)}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <div className="flex items-center mt-1">
                  {card.positive ? (
                    <TrendingUp
                      className="text-[#115E59] dark:text-green-600"
                      size={16}
                    />
                  ) : (
                    <TrendingDown
                      className="text-[#B45309] dark:text-red-600"
                      size={16}
                    />
                  )}
                  <p
                    className={`text-sm ml-1 ${
                      card.positive
                        ? "text-[#115E59] dark:text-green-600"
                        : "text-[#B45309] dark:text-red-600"
                    } `}
                  >
                    {card.change} {t("thisWeek")}
                  </p>
                </div>
              </div>
              <card.icon
                className="text-[#0666cc] dark:text-[#3b82f6] opacity-20 dark:opacity-50"
                size={45}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart (responsive height) */}
      <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-[#1e3a5f] mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t("conversationAnalytics")}
        </h3>
        <div className="h-48 sm:h-64 bg-gray-100 dark:bg-[#0a1929] rounded border border-gray-200 dark:border-[#1e3a5f] flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
        </div>
      </div>

      {/* Recent Conversations */}
      <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-[#1e3a5f] mb-8">
        {/* Responsive header: stacked on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("recentConversations")}
          </h3>
          <Link to="/chat-history" className="text-blue-600 dark:text-blue-400">
            {t("viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentConversations.map((conv, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0a1929] p-5 rounded-lg border border-gray-200 dark:border-[#1e3a5f]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    #{conv.id}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {conv.duration}
                  </p>
                </div>
                <span className="text-xs">{t(conv.status)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("messages")}</span>
                <span className="font-semibold">{conv.messages}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-[#1e3a5f]">
        {/* Responsive header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("notifications")}
          </h3>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, index) => (
            // Responsive layout: stacked on mobile, row on desktop
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-transparent border border-gray-100 dark:border-[#1e3a5f]"
            >
              {getAlertIcon(alert.type)}
              <div>
                <p className="text-gray-900 dark:text-white">{alert.message}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alert.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
