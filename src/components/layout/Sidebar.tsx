import React from "react";
import {
  Menu,
  X,
  MessageSquare,
  Users,
  Settings,
  Key,
  Book,
  BarChart3,
  ThumbsUp,
  AppWindow,
  LogOut,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import type { TabType, UserData } from "../../types/dashboard";
import logoDark from "../../assets/images/logo_dark.png";
import logoLight from "../../assets/images/logo_light.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (_value: boolean) => void;
  darkMode: boolean;
  onLogout: () => void;
  userData?: UserData;
}

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  onLogout,
  userData,
}: SidebarProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const language = i18n.language;

  const isRTL = language === "ar";

  // ==================================================
  // TEMP: View Mode (Owner / Staff)
  // later this should come from auth / backend
  // ==================================================
  const [viewMode, setViewMode] = React.useState<"owner" | "staff">("owner");

  // ==================================================
  // Sidebar Menu Items
  // API Key يظهر فقط في Owner View
  // ==================================================
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
      icon: ThumbsUp,
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
      icon: AppWindow,
      label: t("widgetPreview"),
      route: "/widget",
    },

    // API Key — Owner only
    ...(viewMode === "owner"
      ? [
          {
            id: "apikey" as TabType,
            icon: Key,
            label: t("apiKeyMenu"), // ✅ التعديل الوحيد هنا
            route: "/api-key",
          },
        ]
      : []),
  ];

  return (
    <aside
      className={`fixed ${isRTL ? "right-0" : "left-0"} top-0 h-full bg-white dark:bg-[#0a1929]
        border-r border-gray-200 dark:border-gray-700 transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-20 -translate-x-full lg:translate-x-0"}
        ${isRTL && !sidebarOpen ? "translate-x-full lg:translate-x-0" : ""}
        z-50 shadow-lg flex flex-col overflow-hidden`}
    >
      {/* ================= Sidebar Content ================= */}
      <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden">
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center ${!sidebarOpen && "justify-center"}`}>
            <img
              src={darkMode ? logoDark : logoLight}
              alt="Kalamna Logo"
              className="w-10 h-10 object-contain"
            />
            {sidebarOpen && (
              <span className="mx-3 text-xl font-bold">Kalamna</span>
            )}
          </div>

          {sidebarOpen ? (
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 right-2"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* ================= Navigation ================= */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center py-3 rounded-lg transition-all
                  ${sidebarOpen ? (isRTL ? "pr-4" : "px-4") : "justify-center"}
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && (
                  <span className={isRTL ? "mr-3" : "ml-3"}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ================= View Mode Switch ================= */}
      {sidebarOpen && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            View Mode
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("owner")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition
                ${
                  viewMode === "owner"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }
              `}
            >
              Owner
            </button>

            <button
              onClick={() => {
                setViewMode("staff");
                navigate("/dashboard");
              }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition
                ${
                  viewMode === "staff"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }
              `}
            >
              Staff
            </button>
          </div>
        </div>
      )}

      {/* ================= Logout ================= */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onLogout}
          className={`w-full flex items-center py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
            ${sidebarOpen ? (isRTL ? "pr-4" : "px-4") : "justify-center"}
          `}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && (
            <span className={isRTL ? "mr-3" : "ml-3"}>
              {t("logout")}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
