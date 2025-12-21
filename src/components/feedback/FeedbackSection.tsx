import { useTranslation } from "react-i18next";

export function FeedbackSection() {
  const { t } = useTranslation();

  return (
    <div className="max-w-full overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4">{t("customerFeedback")}</h2>
      {/* TODO: Add Feedback content */}
    </div>
  );
}
