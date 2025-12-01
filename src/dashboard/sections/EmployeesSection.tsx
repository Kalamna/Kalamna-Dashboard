import type { SectionProps } from '../types';
import { translations } from '../translations';

export function EmployeesSection({ language }: SectionProps) {
  const t = translations[language];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.employeeManagement}</h2>
      {/* TODO: Add Employees content */}
    </div>
  );
}