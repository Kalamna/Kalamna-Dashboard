import { useTranslation } from "react-i18next";

export function EmployeesSection() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("employeeManagement")}</h2>
      {/* TODO: Add Employees content */}
    </div>
  );
}
