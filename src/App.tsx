import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/DashboardLayout";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import EmployeesPage from "./pages/employees/EmployeesPage";
import { KnowledgeBasePage } from "./pages/knowledge-base/KnowledgeBasePage";
import { ChatHistoryPage } from "./pages/chat-history/ChatHistoryPage";
import { FeedbackPage } from "./pages/feedback/FeedbackPage";
import { AnalyticsPage } from "./pages/analytics/AnalyticsPage";
import { WidgetPage } from "./pages/widget/WidgetPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { ConfigurationPage } from "./pages/settings/ConfigurationPage";
import { ApiKeyPage } from "./pages/settings/ApiKeyPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="/chat-history" element={<ChatHistoryPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/widget" element={<WidgetPage />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
        <Route path="/api-key" element={<ApiKeyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
