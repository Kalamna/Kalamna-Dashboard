import { Menu, Bell, Search, Moon, Sun, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { UserData } from "../../dashboard/types";

interface HeaderProps {
  darkMode: boolean;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  setSidebarOpen: (_open: boolean) => void;
  userData?: UserData;
}

export function Header({
  darkMode,
  toggleLanguage,
  toggleDarkMode,
  setSidebarOpen,
  userData,
}: HeaderProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const isRTL = language === "ar";

  return (
    <header className="bg-white dark:bg-[#0a1929] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div
        className={`px-4 sm:px-6 py-4 flex items-center justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Left Side in LTR / Right Side in RTL */}
        {!isRTL ? (
          // LTR: Search on left
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-text-color-specific dark:text-white hover:text-primary dark:hover:text-secondary transition-colors p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center flex-1 max-w-2xl">
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 hidden sm:block" />
              <input
                type="text"
                placeholder={t("search")}
                dir="ltr"
                className="bg-gray-50 dark:bg-bg-dark px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-600 text-left"
              />
            </div>
          </div>
        ) : (
          // RTL: Icons + User on left (reversed order)
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-secondary hover:text-primary dark:hover:text-secondary transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                EN
              </span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-secondary hover:text-primary dark:hover:text-secondary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <button className="relative text-gray-600 dark:text-secondary hover:text-primary dark:hover:text-secondary p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 left-1 w-4 h-4 bg-error rounded-full text-white text-xs flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-text-color-specific dark:text-white whitespace-nowrap">
                  {userData?.name || "Admin User"}
                </p>
                <p className="text-xs text-text-light dark:text-secondary whitespace-nowrap">
                  {userData?.email || "admin@kalamna.ai"}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-text-color-specific shadow-sm">
                {userData?.name?.[0]?.toUpperCase() || "A"}
              </div>
            </div>
          </div>
        )}

        {/* Right Side in LTR / Left Side in RTL */}
        {!isRTL ? (
          // LTR: Icons + User on right
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-secondary hover:text-primary dark:hover:text-secondary transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                عربي
              </span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-secondary hover:text-primary dark:hover:text-secondary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <button className="relative text-gray-600 dark:text-secondary hover:text-primary dark:hover:text-secondary p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-error rounded-full text-white text-xs flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-text-color-specific shadow-sm">
                {userData?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-text-color-specific dark:text-white whitespace-nowrap">
                  {userData?.name || "Admin User"}
                </p>
                <p className="text-xs text-text-light dark:text-secondary whitespace-nowrap">
                  {userData?.email || "admin@kalamna.ai"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // RTL: Search on right
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center flex-1 max-w-2xl">
              <input
                type="text"
                placeholder={t("search")}
                dir="rtl"
                className="bg-gray-50 dark:bg-bg-dark px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-600 text-right"
              />
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 hidden sm:block" />
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-text-color-specific dark:text-white hover:text-primary dark:hover:text-secondary transition-colors p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}