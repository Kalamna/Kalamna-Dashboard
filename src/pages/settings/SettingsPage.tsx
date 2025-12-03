import { ConfigSection } from "../../components/settings/ConfigSection";
import { ApiKeySection } from "../../components/settings/ApiKeySection";

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <ConfigSection />
      <ApiKeySection />
    </div>
  );
};
