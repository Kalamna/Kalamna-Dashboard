export type Language = "en" | "ar";

export type TabType =
  | "overview"
  | "employees"
  | "config"
  | "apikey"
  | "knowledge"
  | "chat"
  | "feedback"
  | "analytics"
  | "widget";

export interface UserData {
  name?: string;
  email?: string;
  role?: string;
}

export interface DashboardProps {
  onLogout?: () => void;
  userData?: UserData;
}

// Remove SectionProps or make it empty since sections no longer need language prop
// export interface SectionProps {}  // Can be removed entirely
