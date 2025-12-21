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
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#0a1929] dark:hover:bg-[#1a2f45] text-gray-700 dark:text-gray-300 px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md active:scale-95 text-sm sm:text-base whitespace-nowrap border border-gray-200 dark:border-[#1e3a5f]"
        >
          {t("backToChatHistory")}
        </button>
      </div>

      {/* Session Header */}
      <div className="bg-white dark:bg-[#0d1f2d] rounded-lg shadow-xl p-6 mb-6 border border-gray-200 dark:border-[#1e3a5f]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {t("sessionId")}
            </label>
            <p className="text-gray-900 dark:text-white font-bold">{session.id}</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {t("sessionStatus")}
            </label>
            <span
              className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${session.status === "active"
                ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                : session.status === "pending"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30"
                  : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                }`}
            >
              {t(session.status)}
            </span>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {t("startTime")}
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {new Date(session.startTime).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {t("userId")}
            </label>
            <p className="text-gray-900 dark:text-white font-medium">{session.userId}</p>
          </div>
          {session.endTime && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                {t("endTime")}
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {new Date(session.endTime).toLocaleString()}
              </p>
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {t("duration")}
            </label>
            <p className="text-gray-900 dark:text-white font-medium">{session.duration}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white dark:bg-[#0d1f2d] rounded-lg shadow-xl p-6 mb-6 overflow-hidden border border-gray-200 dark:border-[#1e3a5f]">
        <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-6 bg-[#0066cc] dark:bg-[#3b82f6] rounded-full"></div>
          {t("messageContent")}
        </h2>
        <div className="space-y-6 max-h-[500px] overflow-y-auto overflow-x-hidden px-2">
          {session.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === "user" ? "justify-end" : "justify-start"} w-full`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-md break-words ${message.senderType === "user"
                  ? "bg-[#0066cc] dark:bg-[#3b82f6] text-white rounded-tr-none"
                  : message.senderType === "ai"
                    ? "bg-gray-100 dark:bg-[#0a1929] text-gray-900 dark:text-white border border-gray-200 dark:border-[#1e3a5f] rounded-tl-none"
                    : "bg-green-600 dark:bg-green-500/20 text-white dark:text-green-400 border-0 dark:border dark:border-green-500/30 rounded-tl-none"
                  }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70 ${message.senderType === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                  {t(message.senderType)} •{" "}
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
                <div className="text-sm sm:text-base leading-relaxed">{message.content}</div>
                {message.emotion && (
                  <div className={`text-[10px] font-medium mt-2 px-2 py-0.5 rounded-full inline-block ${message.senderType === "user" ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-[#1a2f45] text-gray-700 dark:text-gray-300"}`}>
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
        <div className="bg-white dark:bg-[#0d1f2d] rounded-lg shadow-xl p-6 overflow-hidden border border-gray-200 dark:border-[#1e3a5f]">
          <div className="flex space-x-4 flex-wrap gap-4">
            <input
              type="text"
              placeholder={t("messagePlaceholder")}
              className="flex-1 min-w-0 px-4 py-3 border border-gray-300 dark:border-[#1e3a5f] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc] dark:focus:ring-[#3b82f6] focus:border-transparent bg-white dark:bg-[#0a1929] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white rounded-lg transition-all duration-200 font-bold shadow-lg hover:shadow-xl active:scale-95"
            >
              {t("sendMessage")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
