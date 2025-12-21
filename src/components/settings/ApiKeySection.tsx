import { useTranslation } from "react-i18next";

export function ApiKeySection() {
  const { t } = useTranslation();

  return (
    <div className="max-w-full overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4">{t("apiKeyManagement")}</h2>
      {/* TODO: Add API Key content */}
    </div>
  );
}
