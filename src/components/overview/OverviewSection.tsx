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
} from "lucide-react";

export function OverviewSection() {
  const { t } = useTranslation();

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
      icon: Users,
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
  ];

  const recentConversations = [
    {
      id: "12345",
      messages: 12,
      duration: "5m 30s",
      status: "completed",
    },
    {
      id: "12346",
      messages: 8,
      duration: "3m 15s",
      status: "active",
    },
    {
      id: "12347",
      messages: 15,
      duration: "7m 45s",
      status: "completed",
    },
  ];

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("dashboardOverview")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("overviewSubtitle", {
              defaultValue: "Monitor your AI assistant's performance and recent activity at a glance.",
            })}
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0a1929] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f] overflow-hidden"
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
                    <TrendingUp className="text-green-500" size={16} />
                  ) : (
                    <TrendingDown className="text-red-500" size={16} />
                  )}
                  <p
                    className={`text-sm ml-1 ${card.positive ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {card.change} {t("thisWeek")}
                  </p>
                </div>
              </div>
              <card.icon className="text-[#0066cc] dark:text-[#3b82f6]" size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-[#1e3a5f] mb-8 overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t("conversationAnalytics")}
        </h3>
        <div className="h-64 bg-gray-100 dark:bg-[#0a1929] rounded border border-gray-200 dark:border-[#1e3a5f] flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
        </div>
      </div>

      {/* Recent Conversations */}
      <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-[#1e3a5f] mb-8 overflow-hidden">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("recentConversations")}
          </h3>
          <Link
            to="/chat-history"
            className="text-[#0066cc] hover:text-[#0052a3] dark:text-[#3b82f6] dark:hover:text-[#60a5fa]"
          >
            {t("viewAll")}
          </Link>
        </div>
        {/* Desktop Table View (> 1024px) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0066cc] dark:bg-[#3b82f6]">
              <tr>
                <th className="text-left px-4 py-3 text-white font-semibold">
                  {t("sessionId")}
                </th>
                <th className="text-left px-4 py-3 text-white font-semibold">
                  {t("messageCount")}
                </th>
                <th className="text-left px-4 py-3 text-white font-semibold">
                  {t("duration")}
                </th>
                <th className="text-left px-4 py-3 text-white font-semibold">
                  {t("status")}
                </th>
              </tr>
            </thead>
            <tbody>
              {recentConversations.map((conv, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 dark:border-[#1e3a5f] transition-colors ${index % 2 === 0
                    ? "bg-white dark:bg-[#0a1929] hover:bg-gray-100 dark:hover:bg-[#15304a]"
                    : "bg-gray-50 dark:bg-[#0d2943] hover:bg-gray-100 dark:hover:bg-[#1a3f5f]"
                    }`}
                >
                  <td className="px-4 py-4 text-gray-900 dark:text-white font-medium">
                    #{conv.id}
                  </td>
                  <td className="px-4 py-4 text-gray-900 dark:text-white">
                    {conv.messages}
                  </td>
                  <td className="px-4 py-4 text-gray-900 dark:text-white">
                    {conv.duration}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${conv.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                        : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                        }`}
                    >
                      {t(conv.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (<= 1024px) */}
        <div className="lg:hidden space-y-4">
          {recentConversations.map((conv, index) => (
            <div
              key={index}
              className="bg-white dark:bg-transparent p-4 rounded-lg border border-gray-200 dark:border-transparent shadow-md dark:shadow-none dark:border-b dark:border-[#1e3a5f] dark:rounded-none last:border-0"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  #{conv.id}
                </h4>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${conv.status === "active"
                    ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                    : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                    }`}
                >
                  {t(conv.status)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-0.5">{t("messages")}</p>
                  <p className="text-gray-900 dark:text-white font-semibold">{conv.messages}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-0.5">{t("duration")}</p>
                  <p className="text-gray-900 dark:text-white font-semibold">{conv.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-[#1e3a5f] mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("recentFeedback")}
          </h3>
          <Link
            to="/feedback"
            className="text-[#0066cc] hover:text-[#0052a3] dark:text-[#3b82f6] dark:hover:text-[#60a5fa]"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="space-y-4">
          {recentFeedback.map((feedback, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-transparent border border-gray-100 dark:border-transparent dark:border-b dark:border-[#1e3a5f] dark:rounded-none last:border-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < feedback.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feedback.date}
                </p>
                <p className="text-gray-900 dark:text-white">
                  {feedback.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white dark:bg-[#0d1f2d] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-[#1e3a5f]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("notifications")}
          </h3>
          <button className="text-[#0066cc] hover:text-[#0052a3] dark:text-[#3b82f6] dark:hover:text-[#60a5fa]">
            {t("viewAll")}
          </button>
        </div>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-transparent border border-gray-100 dark:border-transparent dark:border-b dark:border-[#1e3a5f] dark:rounded-none last:border-0">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
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
