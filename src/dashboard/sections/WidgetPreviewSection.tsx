import type { SectionProps } from '../types';
import { translations } from '../translations';

export function WidgetPreviewSection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.widgetPreview}</h2>
      {/* TODO: Add Widget Preview content */}
    </div>
  );
}