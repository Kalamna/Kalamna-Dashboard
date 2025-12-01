import type { SectionProps } from '../types';
import { translations } from '../translations';

export function AnalyticsSection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.analytics}</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-300">Analytics charts coming soon...</p>
      </div>
    </div>
  );
}
