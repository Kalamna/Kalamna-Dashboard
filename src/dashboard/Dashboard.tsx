import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { OverviewSection } from "./sections/OverviewSection";
import { EmployeesSection } from "./sections/EmployeesSection";
import { ConfigSection } from "./sections/ConfigSection";
import { ApiKeySection } from "./sections/ApiKeySection";
import { KnowledgeSection } from "./sections/KnowledgeSection";
import { ChatHistorySection } from "./sections/ChatHistorySection";
import { FeedbackSection } from "./sections/FeedbackSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { WidgetPreviewSection } from "./sections/WidgetPreviewSection";
import type { TabType, DashboardProps } from "./types";

export function KalamnaDashboard({ onLogout, userData }: DashboardProps) {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const language = i18n.language as "en" | "ar";
  const isRTL = language === "ar";

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // Apply RTL/LTR and language
  useEffect(() => {
    if (isRTL) {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    }
  }, [isRTL]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleLanguage = () => {
    const newLang = isRTL ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("current_user");
      window.location.href = "/login";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSection />;
      case "employees":
        return <EmployeesSection />;
      case "config":
        return <ConfigSection />;
      case "apikey":
        return <ApiKeySection />;
      case "knowledge":
        return <KnowledgeSection />;
      case "chat":
        return <ChatHistorySection />;
      case "feedback":
        return <FeedbackSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "widget":
        return <WidgetPreviewSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bg-dark transition-colors">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        onLogout={handleLogout}
      />

      <main
        className={`transition-all duration-300 ${
          isRTL
            ? sidebarOpen
              ? "lg:mr-64"
              : "lg:mr-20"
            : sidebarOpen
              ? "lg:ml-64"
              : "lg:ml-20"
        }`}
      >
        <Header
          darkMode={darkMode}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          setSidebarOpen={setSidebarOpen}
          userData={userData}
        />

        <div className="p-4 sm:p-6">{renderContent()}</div>
      </main>
    </div>
  );
}

export default KalamnaDashboard;
