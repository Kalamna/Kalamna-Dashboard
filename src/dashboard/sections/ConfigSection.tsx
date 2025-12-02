import { useTranslation } from "react-i18next";

export function ConfigSection() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("configuration")}</h2>
      {/* TODO: Add Configuration content */}
    </div>
  );
}
