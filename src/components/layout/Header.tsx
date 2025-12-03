import { Menu, Bell, Search, Moon, Sun, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { UserData } from "../../types/dashboard";
import logoDark from "../../assets/images/logo_dark.png";
import logoLight from "../../assets/images/logo_light.png";

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
    <header className="app-header sticky top-0 z-40">
      <div
        className={`px-4 sm:px-6 py-4 flex items-center justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Left Side in LTR / Right Side in RTL */}
        {!isRTL ? (
          // LTR: Search on left
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3 lg:hidden">
              {darkMode ? (
                <img
                  src={logoDark}
                  alt="Kalamna"
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <img
                  src={logoLight}
                  alt="Kalamna"
                  className="h-8 w-auto object-contain"
                />
              )}
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="header-action transition-colors p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center flex-1 max-w-2xl">
              <input
                type="text"
                placeholder={t("search")}
                dir="ltr"
                className="app-header__search px-4 py-2 rounded-lg w-full focus:outline-none text-left"
              />
              <Search
                className="w-5 h-5 ml-3 hidden sm:block"
                style={{ color: "var(--header-icon)" }}
              />
            </div>
          </div>
        ) : (
          // RTL: Icons + User on left (reversed order)
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className="header-action flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 transition-colors"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                EN
              </span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="header-action p-2 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <button className="header-action relative p-2 transition-colors">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="header-badge absolute top-1 left-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-[var(--header-text)] whitespace-nowrap">
                  {userData?.name || "Admin User"}
                </p>
                <p className="text-xs text-[var(--header-muted-text)] whitespace-nowrap">
                  {userData?.email || "admin@kalamna.ai"}
                </p>
              </div>
              <div className="header-avatar w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold shadow-sm">
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
              className="header-action flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 transition-colors"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                عربي
              </span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="header-action p-2 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <button className="header-action relative p-2 transition-colors">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="header-badge absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <div className="header-avatar w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold shadow-sm">
                {userData?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[var(--header-text)] whitespace-nowrap">
                  {userData?.name || "Admin User"}
                </p>
                <p className="text-xs text-[var(--header-muted-text)] whitespace-nowrap">
                  {userData?.email || "admin@kalamna.ai"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // RTL: Search on right
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3 lg:hidden">
              {darkMode ? (
                <img
                  src={logoDark}
                  alt="Kalamna"
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <img
                  src={logoLight}
                  alt="Kalamna"
                  className="h-8 w-auto object-contain"
                />
              )}
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="header-action transition-colors p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center flex-1 max-w-2xl">
              <input
                type="text"
                placeholder={t("search")}
                dir="rtl"
                className="app-header__search px-4 py-2 rounded-lg w-full focus:outline-none text-right"
              />
              <Search
                className="w-5 h-5 mr-3 hidden sm:block"
                style={{ color: "var(--header-icon)" }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
