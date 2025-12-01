import type { SectionProps } from '../types';
import { translations } from '../translations';

export function ApiKeySection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.apiKeyManagement}</h2>
      {/* TODO: Add API Key content */}
    </div>
  );
}