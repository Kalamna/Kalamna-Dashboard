import { useTranslation } from "react-i18next";

export function AnalyticsSection() {
  const { t } = useTranslation();

  return (
    <div className="max-w-full overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4">{t("analytics")}</h2>
      {/* TODO: Add Analytics content */}
    </div>
  );
}
