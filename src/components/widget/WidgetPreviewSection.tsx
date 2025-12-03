import { useTranslation } from "react-i18next";

export function WidgetPreviewSection() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("widgetPreview")}</h2>
      {/* TODO: Add Widget Preview content */}
    </div>
  );
}
