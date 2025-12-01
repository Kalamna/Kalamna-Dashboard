import type { SectionProps } from '../types';
import { translations } from '../translations';

export function KnowledgeSection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.knowledgeBase}</h2>
      {/* TODO: Add Knowledge Base content */}
    </div>
  );
}