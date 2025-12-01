import type { SectionProps } from '../types';
import { translations } from '../translations';

export function ChatHistorySection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.chatHistory}</h2>
      {/* TODO: Add Chat History content */}
    </div>
  );
}