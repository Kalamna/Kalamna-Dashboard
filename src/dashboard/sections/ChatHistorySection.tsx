import { useTranslation } from "react-i18next";

export function ChatHistorySection() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("chatHistory")}</h2>
      {/* TODO: Add Chat History content */}
    </div>
  );
}
