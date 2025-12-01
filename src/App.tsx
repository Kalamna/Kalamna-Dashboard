import { Routes, Route, Navigate } from "react-router-dom";

import { AuthLayout } from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/DashboardLayout";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { EmployeesPage } from "./pages/employees/EmployeesPage";
import { KnowledgeBasePage } from "./pages/knowledge-base/KnowledgeBasePage";
import { ChatHistoryPage } from "./pages/chat-history/ChatHistoryPage";
import { FeedbackPage } from "./pages/feedback/FeedbackPage";
import { AnalyticsPage } from "./pages/analytics/AnalyticsPage";
import { WidgetPage } from "./pages/widget/WidgetPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage onRegisterSuccess={() => {}} />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="chat-history" element={<ChatHistoryPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="widget" element={<WidgetPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
