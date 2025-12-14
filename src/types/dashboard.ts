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

export type SessionStatus = "active" | "pending" | "completed";

export interface ChatSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: string;
  messagesCount: number;
  status: SessionStatus;
}

export type SenderType = "user" | "ai" | "staff";

export interface ChatMessage {
  id: string;
  senderType: SenderType;
  content: string;
  timestamp: string;
  emotion?: string;
}

export interface ChatSessionDetails extends ChatSession {
  messages: ChatMessage[];
}
