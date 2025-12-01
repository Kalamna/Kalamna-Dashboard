import type { SectionProps } from '../types';
import { translations } from '../translations';

export function ConfigSection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.botConfiguration}</h2>
      {/* TODO: Add Configuration content */}
    </div>
  );
}