import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { ChatSession } from "../../types/dashboard";

export function ChatHistorySection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock data - replace with API calls
  const activePendingSessions: ChatSession[] = [
    {
      id: "1",
      userId: "user123",
      startTime: "2023-12-15T10:00:00Z",
      duration: "30 min",
      messagesCount: 5,
      status: "active",
    },
    {
      id: "2",
      userId: "user456",
      startTime: "2023-12-15T09:30:00Z",
      duration: "45 min",
      messagesCount: 8,
      status: "pending",
    },
    {
      id: "3",
      userId: "user789",
      startTime: "2023-12-15T08:15:00Z",
      duration: "20 min",
      messagesCount: 3,
      status: "active",
    },
  ];

  const completedSessions: ChatSession[] = [
    {
      id: "4",
      userId: "user101",
      startTime: "2023-12-14T14:00:00Z",
      endTime: "2023-12-14T14:25:00Z",
      duration: "25 min",
      messagesCount: 6,
      status: "completed",
    },
    {
      id: "5",
      userId: "user202",
      startTime: "2023-12-14T13:00:00Z",
      endTime: "2023-12-14T13:40:00Z",
      duration: "40 min",
      messagesCount: 12,
      status: "completed",
    },
  ];

  const [activePage, setActivePage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const itemsPerPage = 10;

  const handleViewSession = (sessionId: string) => {
    navigate(`/chat-history/session/${sessionId}`);
  };

  const handleAnswerManual = (sessionId: string) => {
    // Navigate to session details for manual answering
    navigate(`/chat-history/session/${sessionId}`);
  };

  const renderTable = (
    sessions: ChatSession[],
    title: string,
    showAnswerManual: boolean,
    currentPage: number,
    setPage: (_page: number) => void,
  ) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSessions = sessions.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sessions.length / itemsPerPage);

    return (
      <div className="sm:bg-white dark:sm:bg-[#0d1f2d] rounded-2xl sm:shadow-xl sm:border border-gray-200 dark:border-[#1e3a5f] p-0 sm:p-8 mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white px-1 sm:px-0 flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#0066cc] dark:bg-[#3b82f6] rounded-full sm:hidden"></div>
          {title}
        </h2>

        {/* Desktop Table View (> 1024px) */}
        <div className="hidden lg:block rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#0066cc] dark:bg-[#3b82f6]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {t("sessionId")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {t("userId")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {t("startTime")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {t("duration")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {t("messagesCount")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {t("sessionStatus")}
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedSessions.map((session, index) => (
                  <tr
                    key={session.id}
                    className={`border-b border-gray-200 dark:border-[#1e3a5f] transition-colors ${index % 2 === 0
                      ? "bg-white dark:bg-[#0a1929] hover:bg-gray-100 dark:hover:bg-[#15304a]"
                      : "bg-gray-50 dark:bg-[#0d2943] hover:bg-gray-100 dark:hover:bg-[#1a3f5f]"
                      }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{session.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {session.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(session.startTime).toLocaleDateString([], { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {session.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {session.messagesCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${session.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                          : session.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30"
                            : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                          }`}
                      >
                        {t(session.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-center">
                      {showAnswerManual ? (
                        <button
                          onClick={() => handleAnswerManual(session.id)}
                          className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                        >
                          {t("answerManual")}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewSession(session.id)}
                          className="text-[#0066cc] hover:text-[#0052a3] dark:text-[#3b82f6] dark:hover:text-[#60a5fa] transition-colors"
                        >
                          {t("view")}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View (<= 1024px) */}
        <div className="lg:hidden space-y-4">
          {paginatedSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white dark:bg-[#0d2133] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-[#1e3a5f] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#0066cc] dark:text-[#3b82f6]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-0.5">
                      #{session.id}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {session.userId}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${session.status === "active"
                    ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                    : session.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30"
                      : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                    }`}
                >
                  {t(session.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-medium uppercase tracking-wider">
                    {t("startTime")}
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {new Date(session.startTime).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-medium uppercase tracking-wider">
                    {t("duration")}
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {session.duration}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-medium uppercase tracking-wider">
                    {t("messagesCount")}
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {session.messagesCount} {t("messages")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-[#1e3a5f]">
                {showAnswerManual ? (
                  <button
                    onClick={() => handleAnswerManual(session.id)}
                    className="flex-1 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                  >
                    {t("answerManual")}
                  </button>
                ) : (
                  <button
                    onClick={() => handleViewSession(session.id)}
                    className="flex-1 py-3.5 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                  >
                    {t("view")}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-[#1e3a5f]">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
              {t("showing")}{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {startIndex + 1}
              </span>{" "}
              {t("to")}{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.min(endIndex, sessions.length)}
              </span>{" "}
              {t("of")}{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {sessions.length}
              </span>{" "}
              {t("sessions")}
            </p>
            <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-sm bg-white dark:bg-[#0a1929] text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-[#1e3a5f] disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-[#1a2f45] transition-colors"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setPage(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${page === currentPage
                        ? "bg-[#0066cc] dark:bg-[#3b82f6] text-white shadow-md"
                        : "bg-white dark:bg-[#0a1929] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1e3a5f] hover:bg-gray-50 dark:hover:bg-[#1a2f45]"
                        }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-sm bg-white dark:bg-[#0a1929] text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-[#1e3a5f] disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-[#1a2f45] transition-colors"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-full overflow-x-hidden bg-gray-50/50 dark:bg-transparent min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("chatHistory")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("chatHistorySubtitle")}
          </p>
        </div>
      </div>

      {renderTable(
        activePendingSessions,
        t("activePendingSessions"),
        true,
        activePage,
        setActivePage,
      )}

      {renderTable(
        completedSessions,
        t("completedSessions"),
        false,
        completedPage,
        setCompletedPage,
      )}
    </div>
  );
}
