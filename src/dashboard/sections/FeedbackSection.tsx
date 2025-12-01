import type { SectionProps } from '../types';
import { translations } from '../translations';

export function FeedbackSection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.customerFeedback}</h2>
      {/* TODO: Add Feedback content */}
    </div>
  );
}