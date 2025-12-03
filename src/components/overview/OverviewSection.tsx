import { useTranslation } from "react-i18next";

export function OverviewSection() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-color-specific dark:text-white">
          {t("dashboardOverview")}
        </h1>
      </div>
    </div>
  );
}
