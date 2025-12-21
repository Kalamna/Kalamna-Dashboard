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
    <div className="p-4 sm:p-6 max-w-7xl mx-auto overflow-x-hidden bg-gray-50/50 dark:bg-transparent min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t("sessionDetails")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("sessionDetailsSubtitle", {
              defaultValue:
                "View full conversation transcript and session metadata.",
            })}
          </p>
        </div>
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 bg-white dark:bg-[#0d1f2d] hover:bg-gray-50 dark:hover:bg-[#1a2f45] text-gray-700 dark:text-gray-300 px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-sm hover:shadow-md active:scale-95 text-sm sm:text-base whitespace-nowrap border border-gray-200 dark:border-[#1e3a5f]"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
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
          {t("backToChatHistory")}
        </button>
      </div>

      {/* Session Metadata Grid */}
      <div className="sm:bg-white dark:sm:bg-[#0d1f2d] rounded-2xl sm:shadow-sm sm:border border-gray-100 dark:border-[#1e3a5f] p-4 sm:p-8 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 sm:gap-8">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
              {t("sessionId")}
            </label>
            <p className="text-gray-900 dark:text-white font-bold text-base">
              #{session.id}
            </p>
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
              {t("sessionStatus")}
            </label>
            <div>
              <span
                className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full border ${
                  session.status === "active"
                    ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                    : session.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20"
                      : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20"
                }`}
              >
                {t(session.status)}
              </span>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
              {t("startTime")}
            </label>
            <p className="text-gray-900 dark:text-white font-semibold">
              {new Date(session.startTime).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
              {t("userId")}
            </label>
            <p className="text-gray-900 dark:text-white font-semibold">
              {session.userId}
            </p>
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
              {t("duration")}
            </label>
            <p className="text-gray-900 dark:text-white font-semibold">
              {session.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="sm:bg-white dark:sm:bg-[#0d2133] rounded-3xl sm:shadow-lg sm:border border-gray-100 dark:border-[#1e3a5f] overflow-hidden flex flex-col mb-10">
        <div className="px-1 sm:px-6 py-4 border-b border-transparent sm:border-gray-100 dark:sm:border-[#1e3a5f] bg-transparent sm:bg-gray-50/50 dark:sm:bg-[#0d1f2d] mb-4 sm:mb-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#0066cc] dark:bg-[#3b82f6] rounded-full"></div>
            {t("messageContent")}
          </h2>
        </div>

        <div className="p-0 sm:p-8 space-y-8 max-h-[700px] overflow-y-auto overflow-x-hidden scroll-smooth transition-all">
          {session.messages.map((message) => {
            const isUser = message.senderType === "user";
            const isAI = message.senderType === "ai";

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"} w-full animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[70%]`}
                >
                  <div
                    className={`px-5 py-3.5 rounded-2xl break-words relative transition-all ${
                      isUser
                        ? "bg-[#0066cc] dark:bg-[#3b82f6] text-white rounded-tr-none shadow-blue-500/10"
                        : isAI
                          ? "bg-gray-100 dark:bg-[#1a2f45] text-gray-900 dark:text-white border border-gray-200 dark:border-[#1e3a5f] rounded-tl-none"
                          : "bg-green-600 dark:bg-green-500/20 text-white dark:text-green-400 rounded-tl-none"
                    }`}
                  >
                    <div className="text-sm sm:text-base leading-relaxed font-medium">
                      {message.content}
                    </div>
                    {message.emotion && (
                      <div
                        className={`mt-2.5 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 text-[10px] font-bold ${
                          isUser
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 dark:bg-[#0d1f2d] text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        {t("detectedEmotion")}: {message.emotion}
                      </div>
                    )}
                  </div>
                  <div
                    className={`mt-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ${isUser ? "mr-1" : "ml-1"}`}
                  >
                    {t(message.senderType)} •{" "}
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unified Input Box */}
      {(session.status === "active" || session.status === "pending") && (
        <div className="bg-white dark:bg-[#0d1f2d] rounded-2xl shadow-lg border border-gray-100 dark:border-[#1e3a5f] p-4 sm:p-6 sticky bottom-4 sm:bottom-0">
          <div className="flex items-center gap-3 sm:gap-4 flex-nowrap">
            <input
              type="text"
              placeholder={t("messagePlaceholder")}
              className="flex-1 min-w-0 px-5 sm:px-6 py-3.5 sm:py-4 border border-gray-200 dark:border-[#1e3a5f] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc] dark:focus:ring-[#3b82f6] focus:border-transparent bg-white dark:bg-[#112336] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base transition-all"
            />
            <button
              onClick={handleSendMessage}
              className="p-3.5 sm:px-8 sm:py-4 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white rounded-2xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center min-w-[50px] sm:min-w-0"
            >
              <span className="hidden sm:inline">{t("sendMessage")}</span>
              <svg
                className="w-5 h-5 sm:ml-2 rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
