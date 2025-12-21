import { useTranslation } from "react-i18next";

export function WidgetPreviewSection() {
  const { t } = useTranslation();

  return (
    <div className="max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("widgetPreview")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("widgetSubtitle", {
              defaultValue: "Customize and preview how your AI assistant appears to your customers.",
            })}
          </p>
        </div>
      </div>
      {/* TODO: Add Widget Preview content */}
    </div>
  );
}
