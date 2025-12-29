import { useState } from "react";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ConfigurationPage = () => {
  const { t, i18n } = useTranslation();

  // Demo mode toggle - remove when integrating with real auth
  const [isOwner, setIsOwner] = useState(true);

  const isRTL = i18n.language === "ar";

  const [config, setConfig] = useState({
    organizationName: "",
    industry: "ecommerce",
    businessDescription: "",
    botName: "Cleo",
    tone: "formal",
    responseStyle: "concise",
    additionalNotes: "",
    language: "egyptian-arabic",
    is24_7: false,
    startTime: "",
    endTime: "",
    closedHoursResponse: "",
    emotionDetection: true,
    voiceSupport: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    if (isOwner) {
      setConfig((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    if (!isOwner) return;

    const newErrors: Record<string, string> = {};

    if (!config.organizationName.trim()) {
      newErrors.organizationName = t("organizationNameRequired");
    }

    if (!config.botName.trim()) {
      newErrors.botName = t("botNameRequired");
    }

    // Add more validation as needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Saving configuration:", config);
    alert(t("saveConfigurationSuccess"));
  };

  const industryOptions = [
    { value: "ecommerce", label: t("industryEcommerce") },
    { value: "healthcare", label: t("industryHealthcare") },
    { value: "education", label: t("industryEducation") },
    { value: "finance", label: t("industryFinance") },
    { value: "retail", label: t("industryRetail") },
    { value: "technology", label: t("industryTechnology") },
    { value: "other", label: t("industryOther") },
  ];

  const toneOptions = [
    { value: "formal", label: t("formal") },
    { value: "casual", label: t("casual") },
    { value: "friendly", label: t("friendly") },
  ];

  const responseStyleOptions = [
    { value: "concise", label: t("concise") },
    { value: "detailed", label: t("detailed") },
    { value: "balanced", label: t("balanced") },
  ];

  const languageOptions = [
    { value: "egyptian-arabic", label: t("egyptianArabic") },
    { value: "franco-egyptian", label: t("francoEgyptian") },
    { value: "english", label: t("english") },
  ];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="space-y-6 bg-white dark:bg-transparent max-w-full overflow-x-hidden"
    >
      {/* Header with Role Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("configuration")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("configurationSubtitle")}
          </p>
        </div>

        {/* Demo Role Switcher - Remove in production */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg border border-gray-300 dark:border-slate-600">
          <button
            onClick={() => setIsOwner(true)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
              isOwner
                ? "bg-[#0066cc] dark:bg-[#3b82f6] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1a2f45]"
            }`}
          >
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span>{t("ownerView")}</span>
          </button>
          <button
            onClick={() => setIsOwner(false)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
              !isOwner
                ? "bg-[#0066cc] dark:bg-[#3b82f6] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1a2f45]"
            }`}
          >
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span>{t("staffView")}</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings - Editable for Owner */}
        <div className="bg-white dark:bg-[#0f1f2e] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {t("generalSettings")}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("organizationName")}
              </label>
              <input
                type="text"
                value={config.organizationName}
                onChange={(e) => {
                  handleChange("organizationName", e.target.value);
                  if (errors.organizationName) {
                    const newErrors = { ...errors };
                    delete newErrors.organizationName;
                    setErrors(newErrors);
                  }
                }}
                disabled={!isOwner}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.organizationName
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] text-gray-900 dark:text-white"
                }`}
                placeholder={t("botNamePlaceholder")}
              />
              {errors.organizationName && (
                <p style={{ color: "#f83737ff" }} className="text-xs mt-1">
                  {errors.organizationName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("industry")}
              </label>
              <select
                value={config.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                disabled={!isOwner}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {industryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("businessDescription")}
              </label>
              <textarea
                value={config.businessDescription}
                onChange={(e) =>
                  handleChange("businessDescription", e.target.value)
                }
                disabled={!isOwner}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
                placeholder={t("businessDescriptionPlaceholder")}
              />
            </div>
          </div>
        </div>

        {/* Bot Personality - Editable for Owner */}
        <div className="bg-white dark:bg-[#0f1f2e] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {t("botPersonality")}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("botName")}
              </label>
              <input
                type="text"
                value={config.botName}
                onChange={(e) => {
                  handleChange("botName", e.target.value);
                  if (errors.botName) {
                    const newErrors = { ...errors };
                    delete newErrors.botName;
                    setErrors(newErrors);
                  }
                }}
                disabled={!isOwner}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.botName
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] text-gray-900 dark:text-white"
                }`}
                placeholder="Cleo"
              />
              {errors.botName && (
                <p style={{ color: "#f83737ff" }} className="text-xs mt-1">
                  {errors.botName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("tone")}
              </label>
              <select
                value={config.tone}
                onChange={(e) => handleChange("tone", e.target.value)}
                disabled={!isOwner}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {toneOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("responseStyle")}
              </label>
              <select
                value={config.responseStyle}
                onChange={(e) => handleChange("responseStyle", e.target.value)}
                disabled={!isOwner}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {responseStyleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("additionalNotes")}
              </label>
              <textarea
                value={config.additionalNotes}
                onChange={(e) =>
                  handleChange("additionalNotes", e.target.value)
                }
                disabled={!isOwner}
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
                placeholder={t("additionalNotesPlaceholder")}
              />
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                {t("additionalNotesHelper")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t("defaultLanguage")}
              </label>
              <select
                value={config.language}
                onChange={(e) => handleChange("language", e.target.value)}
                disabled={!isOwner}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  !isOwner
                    ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {languageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white dark:bg-[#0f1f2e] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {t("operatingHours")}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("support247")}
              </label>
              <button
                type="button"
                onClick={() =>
                  isOwner && handleChange("is24_7", !config.is24_7)
                }
                disabled={!isOwner}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  !isOwner ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                } ${config.is24_7 ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                style={{ direction: "ltr" }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.is24_7 ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {!config.is24_7 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    {t("startTime")}
                  </label>
                  <input
                    type="time"
                    value={config.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                    disabled={!isOwner}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                      !isOwner
                        ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    {t("endTime")}
                  </label>
                  <input
                    type="time"
                    value={config.endTime}
                    onChange={(e) => handleChange("endTime", e.target.value)}
                    disabled={!isOwner}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                      !isOwner
                        ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    {t("closedHoursResponse")}
                  </label>
                  <textarea
                    value={config.closedHoursResponse}
                    onChange={(e) =>
                      handleChange("closedHoursResponse", e.target.value)
                    }
                    disabled={!isOwner}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none ${
                      !isOwner
                        ? "bg-gray-100 dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-[#1a2332] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    }`}
                    placeholder={t("closedHoursResponsePlaceholder")}
                  />
                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    {t("closedHoursResponseHelper")}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-white dark:bg-[#0f1f2e] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {t("advancedFeatures")}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("emotionDetection")}
              </label>
              <button
                type="button"
                onClick={() =>
                  isOwner &&
                  handleChange("emotionDetection", !config.emotionDetection)
                }
                disabled={!isOwner}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  !isOwner ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                } ${config.emotionDetection ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                style={{ direction: "ltr" }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.emotionDetection ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("voiceSupport")}
              </label>
              <button
                type="button"
                onClick={() =>
                  isOwner && handleChange("voiceSupport", !config.voiceSupport)
                }
                disabled={!isOwner}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  !isOwner ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                } ${config.voiceSupport ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                style={{ direction: "ltr" }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.voiceSupport ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Owner Only */}
      {isOwner && (
        <div className={`mt-6 flex ${isRTL ? "justify-start" : "justify-end"}`}>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {t("saveConfiguration")}
          </button>
        </div>
      )}
    </div>
  );
};
