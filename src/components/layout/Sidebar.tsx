import {
  Menu,
  X,
  MessageSquare,
  Users,
  Settings,
  Key,
  Book,
  BarChart3,
  MessageCircle,
  LogOut,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import type { TabType } from "../../types/dashboard";
import logoDark from "../../assets/images/logo_dark.png";
import logoLight from "../../assets/images/logo_light.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (_value: boolean) => void;
  darkMode: boolean;
  onLogout: () => void;
}

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  onLogout,
}: SidebarProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const language = i18n.language;

  const menuItems = [
    {
      id: "overview" as TabType,
      icon: BarChart3,
      label: t("overview"),
      route: "/dashboard",
    },
    {
      id: "employees" as TabType,
      icon: Users,
      label: t("employees"),
      route: "/employees",
    },
    {
      id: "config" as TabType,
      icon: Settings,
      label: t("configuration"),
      route: "/configuration",
    },
    {
      id: "apikey" as TabType,
      icon: Key,
      label: t("apiKey"),
      route: "/api-key",
    },
    {
      id: "knowledge" as TabType,
      icon: Book,
      label: t("knowledgeBase"),
      route: "/knowledge-base",
    },
    {
      id: "chat" as TabType,
      icon: MessageSquare,
      label: t("chatHistory"),
      route: "/chat-history",
    },
    {
      id: "feedback" as TabType,
      icon: MessageCircle,
      label: t("feedback"),
      route: "/feedback",
    },
    {
      id: "analytics" as TabType,
      icon: Activity,
      label: t("analytics"),
      route: "/analytics",
    },
    {
      id: "widget" as TabType,
      icon: MessageCircle,
      label: t("widgetPreview"),
      route: "/widget",
    },
  ];

  const isRTL = language === "ar";

  return (
    <aside
      className={`fixed ${isRTL ? "right-0" : "left-0"} top-0 h-full bg-white dark:bg-[#0a1929] border-r border-gray-200 dark:border-gray-700 text-text-color-specific dark:text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20 -translate-x-full lg:translate-x-0"} ${isRTL && !sidebarOpen ? "translate-x-full lg:translate-x-0" : ""} z-50 shadow-lg`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div
            className={`flex items-center ${!sidebarOpen && "justify-center"}`}
          >
            <img
              src={darkMode ? logoDark : logoLight}
              alt="Kalamna Logo"
              className="w-10 h-10 object-contain transition-all"
            />
            {sidebarOpen && (
              <span className="mx-3 text-xl font-bold">Kalamna</span>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-text-color-specific dark:text-white hover:text-primary dark:hover:text-secondary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute top-4 right-2 text-text-color-specific dark:text-white hover:text-primary dark:hover:text-secondary transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center ${sidebarOpen ? (isRTL ? "pr-4" : "px-4") : "justify-center"} py-3 rounded-lg transition-all ${isActive ? "font-semibold shadow-[0_0_20px_5px_rgba(59,130,246,0.4)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                style={
                  isActive
                    ? {
                        backgroundColor: "#3b82f6",
                        color: "#ffffff",
                        opacity: 1,
                        visibility: "visible",
                      }
                    : undefined
                }
              >
                <Icon
                  className="w-5 h-5"
                  style={
                    isActive ? { opacity: 1, visibility: "visible" } : undefined
                  }
                />
                {sidebarOpen && (
                  <span
                    className={isRTL ? "mr-3" : "ml-3"}
                    style={
                      isActive
                        ? { opacity: 1, visibility: "visible" }
                        : undefined
                    }
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onLogout}
          className={`w-full flex items-center ${sidebarOpen ? (isRTL ? "pr-4" : "px-4") : "justify-center"} py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-error hover:bg-error/10`}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && (
            <span className={isRTL ? "mr-3" : "ml-3"}>{t("logout")}</span>
          )}
        </button>
      </div>
    </aside>
  );
}
