import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export const MainLayout = () => {
  const { i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { changeLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const language = i18n.language as "en" | "ar";
  const isRTL = language === "ar";

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

  const toggleLanguage = () => {
    const newLang = isRTL ? "en" : "ar";
    changeLanguage(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Mobile Overlay - Removed as requested */}
      {/* {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )} */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        onLogout={handleLogout}
        userData={undefined}
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
          userData={undefined}
        />

        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
