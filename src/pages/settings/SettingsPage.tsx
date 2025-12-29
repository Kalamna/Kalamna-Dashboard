import { ConfigSection } from "../../components/settings/ConfigSection";
import { ApiKeySection } from "../../components/settings/ApiKeySection";

import { useTranslation } from "react-i18next";

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("settings")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("settingsSubtitle")}
          </p>
        </div>
      </div>
      <ConfigSection />
      <ApiKeySection />
    </div>
  );
};
