import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, RefreshCw, CheckCircle } from "lucide-react";

export function ApiKeySection() {
  const { t } = useTranslation();
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const apiKey = "kalamna_live_sk_xxxxxxxxxxxxxxxxx";

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "key") {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
      } else {
        setCopiedCode(type);
        setTimeout(() => setCopiedCode(null), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const codeBlocks = [
    {
      title: t("apiKey.webWidgetIntegration"),
      code: `<script src="https://cdn.kalamna.ai/widget.js"></script>
<script>
  KalamnaWidget.init({
    apiKey: "your_api_key_here",
    position: "bottom-right"
  });
</script>`,
      id: "widget",
    },
    {
      title: t("apiKey.apiEndpoint"),
      code: `POST https://api.kalamna.ai/v1/chat/sessions/`,
      id: "endpoint",
    },
    {
      title: t("apiKey.authHeader"),
      code: `X-API-Key: your_api_key_here`,
      id: "header",
    },
  ];

  const stats = [
    {
      title: t("apiKey.requestsToday"),
      value: "1,234",
    },
    {
      title: t("apiKey.requestsThisMonth"),
      value: "45,678",
    },
  ];

  return (
    <div className="max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("apiKey.title")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t("apiKey.subtitle")}
          </p>
        </div>
      </div>

      {/* API Key Section */}
      <div className="bg-white dark:bg-[#0a1929] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f] mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t("apiKey.apiKey")}
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={apiKey}
              readOnly
              className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-[#0d1f2d] border border-gray-300 dark:border-[#1e3a5f] rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => copyToClipboard(apiKey, "key")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title={t("apiKey.copyKey")}
            >
              {copiedKey ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>

          <button className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white px-4 py-3 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap">
            <RefreshCw className="w-4 h-4" />
            {t("apiKey.regenerate")}
          </button>
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="bg-white dark:bg-[#0a1929] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f] mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t("apiKey.integrationInstructions")}
        </h3>

        <div className="space-y-6">
          {codeBlocks.map((block) => (
            <div key={block.id}>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                {block.title}
              </h4>

              <div className="relative">
                <pre className="bg-gray-50 dark:bg-[#0d1f2d] border border-gray-300 dark:border-[#1e3a5f] rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-white">
                  {block.code}
                </pre>

                <button
                  onClick={() => copyToClipboard(block.code, block.id)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title={t("apiKey.copyCode")}
                >
                  {copiedCode === block.id ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Usage Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t("apiKey.usageStats")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0a1929] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f] overflow-hidden"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
