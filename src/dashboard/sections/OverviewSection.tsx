import type { SectionProps } from '../types';
import { translations } from '../translations';

export function OverviewSection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.dashboardOverview}</h2>
      {/* TODO: Add Overview content */}
    </div>
  );
}