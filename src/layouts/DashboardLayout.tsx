import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../dashboard/components/Sidebar";
import { Header } from "../dashboard/components/Header";
import type { Language, TabType } from "../dashboard/types";
import { useTheme } from "../context/ThemeContext";

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, toggleTheme } = useTheme();
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang as Language : 'en';
  });

  // Apply RTL/LTR and language
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
    // Save preference
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    window.location.href = '/auth/login';
  };

  return (
    <div key={darkMode ? 'dark' : 'light'} className="min-h-screen bg-gray-50 dark:bg-bg-dark transition-colors">{/* Mobile Overlay */}
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
        language={language}
        onLogout={handleLogout}
      />

      <main className={`transition-all duration-300 ${sidebarOpen ? (language === 'ar' ? 'lg:mr-64' : 'lg:ml-64') : (language === 'ar' ? 'lg:mr-20' : 'lg:ml-20')}`}>
        <Header
          language={language}
          darkMode={darkMode}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleTheme}
          setSidebarOpen={setSidebarOpen}
          userData={undefined}
        />

        <section className="p-4 sm:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;