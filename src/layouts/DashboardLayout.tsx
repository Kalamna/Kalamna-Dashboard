import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";


export const MainLayout = () => {
  const { role, setRole } = useAuth();
  const { i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { changeLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

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

  const toggleRole = () => {
  setRole((prev) => (prev === "owner" ? "staff" : "owner"));
};


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors overflow-x-hidden">
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
        } overflow-x-hidden overflow-y-auto min-h-screen`}
      >

        <div className="flex justify-end px-4 pt-4">
  <button
    onClick={toggleRole}
    className="px-4 py-2 rounded-md text-sm font-medium
               bg-blue-600 text-white hover:bg-blue-700
               dark:bg-blue-500 dark:hover:bg-blue-600 transition"
  >
    {role === "owner" ? "Owner View" : "Staff View"}
  </button>
</div>


        <Header
          darkMode={darkMode}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          setSidebarOpen={setSidebarOpen}
          userData={undefined}
        />

        <div className="p-4 sm:p-6 max-w-full overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
