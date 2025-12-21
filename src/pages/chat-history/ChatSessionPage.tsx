import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ChatSessionDetails } from "../../types/dashboard";

export const ChatSessionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with API call
  const session: ChatSessionDetails = {
    id: id || "1",
    userId: "user123",
    startTime: "2023-12-15T10:00:00Z",
    endTime: "2023-12-15T10:30:00Z",
    duration: "30 min",
    messagesCount: 5,
    status: "active",
    messages: [
      {
        id: "1",
        senderType: "user",
        content: "Hello, I need help with my order.",
        timestamp: "2023-12-15T10:00:00Z",
        emotion: "neutral",
      },
      {
        id: "2",
        senderType: "ai",
        content:
          "Hi! I'd be happy to help you with your order. Could you please provide your order number?",
        timestamp: "2023-12-15T10:01:00Z",
      },
      {
        id: "3",
        senderType: "user",
        content: "My order number is #12345",
        timestamp: "2023-12-15T10:02:00Z",
        emotion: "frustrated",
      },
      {
        id: "4",
        senderType: "ai",
        content:
          "Thank you for providing your order number. Let me check the status of your order #12345.",
        timestamp: "2023-12-15T10:03:00Z",
      },
      {
        id: "5",
        senderType: "staff",
        content:
          "I've taken over this conversation. Your order #12345 is currently being processed and will ship within 24 hours.",
        timestamp: "2023-12-15T10:05:00Z",
      },
    ],
  };

  const handleBack = () => {
    navigate("/chat-history");
  };

  const handleSendMessage = () => {
    // TODO: Implement send message
    console.log("Send message");
  };

  return (
    <div className="p-6 max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("sessionDetails")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("sessionDetailsSubtitle", {
              defaultValue: "View full conversation transcript and session metadata.",
            })}
          </p>
        </div>
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md active:scale-95 text-sm sm:text-base whitespace-nowrap border border-gray-200 dark:border-slate-700"
        >
          {t("backToChatHistory")}
        </button>
      </div>

      {/* Session Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("sessionId")}
            </label>
            <p className="text-gray-900 dark:text-white">{session.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("sessionStatus")}
            </label>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${session.status === "active"
                ? "bg-green-100 text-green-800"
                : session.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
                }`}
            >
              {t(session.status)}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("startTime")}
            </label>
            <p className="text-gray-900 dark:text-white">
              {new Date(session.startTime).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("userId")}
            </label>
            <p className="text-gray-900 dark:text-white">{session.userId}</p>
          </div>
          {session.endTime && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("endTime")}
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(session.endTime).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-6 overflow-hidden">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {t("messageContent")}
        </h2>
        <div className="space-y-4 max-h-96 overflow-y-auto overflow-x-hidden">
          {session.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === "user" ? "justify-end" : "justify-start"} w-full`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg break-words ${message.senderType === "user"
                  ? "bg-blue-500 text-white"
                  : message.senderType === "ai"
                    ? "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white"
                    : "bg-green-500 text-white"
                  }`}
              >
                <div className="text-xs opacity-75 mb-1">
                  {t(message.senderType)} •{" "}
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
                <div>{message.content}</div>
                {message.emotion && (
                  <div className="text-xs opacity-75 mt-1">
                    {t("detectedEmotion")}: {message.emotion}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Send Message (only for active/pending) */}
      {(session.status === "active" || session.status === "pending") && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 overflow-hidden">
          <div className="flex space-x-4 flex-wrap gap-4">
            <input
              type="text"
              placeholder={t("messagePlaceholder")}
              className="flex-1 min-w-0 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {t("sendMessage")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
