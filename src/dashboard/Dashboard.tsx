import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Users, Settings, Key, Book, BarChart3, MessageCircle, LogOut, Bell, Search, Moon, Sun, Globe, Activity } from 'lucide-react';
import { translations } from './translations';
import { Sidebar } from "../dashboard/components/Sidebar";
import { Header } from '../dashboard/components/Header';
import { OverviewSection } from './sections/OverviewSection';
import { EmployeesSection } from './sections/EmployeesSection';
import { ConfigSection } from './sections/ConfigSection';
import { ApiKeySection } from './sections/ApiKeySection';
import { KnowledgeSection } from './sections/KnowledgeSection';
import { ChatHistorySection } from './sections/ChatHistorySection';
import { FeedbackSection } from './sections/FeedbackSection';
import { AnalyticsSection } from './sections/AnalyticsSection';
import { WidgetPreviewSection } from './sections/WidgetPreviewSection';
import type { Language, TabType, DashboardProps } from './types';

export function KalamnaDashboard({ onLogout, userData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference on initial load
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang as Language : 'en';
  });

  const t = translations[language];

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

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

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_user');
      window.location.href = '/login';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection language={language} />;
      case 'employees':
        return <EmployeesSection language={language} />;
      case 'config':
        return <ConfigSection language={language} />;
      case 'apikey':
        return <ApiKeySection language={language} />;
      case 'knowledge':
        return <KnowledgeSection language={language} />;
      case 'chat':
        return <ChatHistorySection language={language} />;
      case 'feedback':
        return <FeedbackSection language={language} />;
      case 'analytics':
        return <AnalyticsSection language={language} />;
      case 'widget':
        return <WidgetPreviewSection language={language} />;
      default:
        return <OverviewSection language={language} />;
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
        language={language}
        onLogout={handleLogout}
      />

      <main className={`transition-all duration-300 ${sidebarOpen ? (language === 'ar' ? 'lg:mr-64' : 'lg:ml-64') : (language === 'ar' ? 'lg:mr-20' : 'lg:ml-20')}`}>
        <Header
          language={language}
          darkMode={darkMode}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          setSidebarOpen={setSidebarOpen}
          userData={userData}
        />

        <div className="p-4 sm:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default KalamnaDashboard;