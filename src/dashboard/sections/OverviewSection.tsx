import { useTranslation } from "react-i18next";

export function OverviewSection() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-color-specific dark:text-white">
          {t("dashboardOverview")}
        </h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          {t("downloadReport")}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Conversations */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-light dark:text-secondary mb-1">
                {t("totalConversations")}
              </p>
              <p className="text-3xl font-bold text-text-color-specific dark:text-white">
                1,247
              </p>
              <p className="text-sm text-success mt-2">
                +12.5% {t("thisWeek")}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-light dark:text-secondary mb-1">
                {t("avgResponseTime")}
              </p>
              <p className="text-3xl font-bold text-text-color-specific dark:text-white">
                2.3s
              </p>
              <p className="text-sm text-success mt-2">
                -0.5s {t("improvement")}
              </p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Satisfaction Rate */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-light dark:text-secondary mb-1">
                {t("satisfactionRate")}
              </p>
              <p className="text-3xl font-bold text-text-color-specific dark:text-white">
                94.5%
              </p>
              <p className="text-sm text-success mt-2">
                +2.1% {t("thisMonth")}
              </p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-light dark:text-secondary mb-1">
                {t("activeSessions")}
              </p>
              <p className="text-3xl font-bold text-text-color-specific dark:text-white">
                23
              </p>
              <p className="text-sm text-info mt-2">
                {t("realTimeMonitoring")}
              </p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <svg
                className="w-6 h-6 text-info"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Analytics */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-text-color-specific dark:text-white mb-4">
            {t("conversationAnalytics")}
          </h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-text-light dark:text-secondary">
              Chart visualization would go here
            </p>
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="space-y-6">
          {/* Recent Conversations */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-text-color-specific dark:text-white mb-4">
              {t("recentConversations")}
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-text-color-specific dark:text-white">
                    Session #1
                  </p>
                  <p className="text-sm text-text-light dark:text-secondary">
                    8 {t("messages")} • 5m
                  </p>
                </div>
                <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  {t("completed")}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-text-color-specific dark:text-white">
                    Session #2
                  </p>
                  <p className="text-sm text-text-light dark:text-secondary">
                    15 {t("messages")} • 12m
                  </p>
                </div>
                <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  {t("completed")}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-text-color-specific dark:text-white mb-4">
              {t("recentFeedback")}
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-text-light dark:text-secondary">
                  Very helpful and quick responses!
                </p>
                <p className="text-xs text-text-light dark:text-secondary mt-1">
                  2025-11-17 10:35
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
