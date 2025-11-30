import React from 'react';
import { Menu, X, MessageSquare, Users, Settings, Key, Book, BarChart3, MessageCircle, LogOut, Activity } from 'lucide-react';
import { translations } from '../translations';
import type { Language, TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  language: Language;
  onLogout: () => void;
}

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen, 
  darkMode, 
  language,
  onLogout 
}: SidebarProps) {
  const t = translations[language];

  const menuItems = [
    { id: 'overview' as TabType, icon: BarChart3, label: t.overview },
    { id: 'employees' as TabType, icon: Users, label: t.employees },
    { id: 'config' as TabType, icon: Settings, label: t.configuration },
    { id: 'apikey' as TabType, icon: Key, label: t.apiKey },
    { id: 'knowledge' as TabType, icon: Book, label: t.knowledgeBase },
    { id: 'chat' as TabType, icon: MessageSquare, label: t.chatHistory },
    { id: 'feedback' as TabType, icon: MessageCircle, label: t.feedback },
    { id: 'analytics' as TabType, icon: Activity, label: t.analytics },
    { id: 'widget' as TabType, icon: MessageCircle, label: t.widgetPreview },
  ];

  return (
    <aside className={`fixed ${language === 'ar' ? 'right-0' : 'left-0'} top-0 h-full bg-white dark:bg-[#0a1929] border-r border-gray-200 dark:border-gray-700 text-text-color-specific dark:text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20 -translate-x-full lg:translate-x-0'} ${language === 'ar' && !sidebarOpen ? 'translate-x-full lg:translate-x-0' : ''} z-50 shadow-lg`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <img 
              src={darkMode ? "/logo_dark.png" : "/logo_light.png"}
              alt="Kalamna Logo"
              className="w-10 h-10 object-contain transition-all"
            />
            {sidebarOpen && <span className="mx-3 text-xl font-bold">Kalamna</span>}
          </div>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-text-color-specific dark:text-white hover:text-primary dark:hover:text-secondary transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-4 right-2 text-text-color-specific dark:text-white hover:text-primary dark:hover:text-secondary transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`w-full flex items-center ${sidebarOpen ? (language === 'ar' ? 'pr-4' : 'px-4') : 'justify-center'} py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-primary text-white font-semibold shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span className={language === 'ar' ? 'mr-3' : 'ml-3'}>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={onLogout}
          className={`w-full flex items-center ${sidebarOpen ? (language === 'ar' ? 'pr-4' : 'px-4') : 'justify-center'} py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-error hover:bg-error/10`}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className={language === 'ar' ? 'mr-3' : 'ml-3'}>{t.logout}</span>}
        </button>
      </div>
    </aside>
  );
}