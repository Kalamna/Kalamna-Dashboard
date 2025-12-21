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
    setPage: (page: number) => void,
  ) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSessions = sessions.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sessions.length / itemsPerPage);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("sessionId")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("userId")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("startTime")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("duration")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("messagesCount")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("sessionStatus")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedSessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {session.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {session.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(session.startTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {session.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {session.messagesCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        session.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : session.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {t(session.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewSession(session.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {t("view")}
                      </button>
                      {showAnswerManual && (
                        <button
                          onClick={() => handleAnswerManual(session.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          {t("answerManual")}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-text-color-specific dark:text-white">
          {t("chatHistory")}
        </h1>
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
