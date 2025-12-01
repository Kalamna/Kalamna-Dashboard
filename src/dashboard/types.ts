// dashboard/types.ts

export type Language = 'en' | 'ar';

export type TabType = 
  | 'overview' 
  | 'employees' 
  | 'config' 
  | 'apikey' 
  | 'knowledge' 
  | 'chat' 
  | 'feedback' 
  | 'analytics' 
  | 'widget';

export interface UserData {
  name: string;
  email: string;
  organization: string;
  role: 'owner' | 'staff';
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: 'Owner' | 'Staff';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
}

export interface KnowledgeItem {
  id: number;
  title: string;
  type: 'text' | 'file';
  status: 'active' | 'inactive';
  lastUpdated: string;
  chunks: number;
}

export interface ChatSession {
  id: number;
  userId: string;
  startTime: string;
  duration: string;
  messages: number;
  status: 'active' | 'completed';
  satisfaction: 'positive' | 'negative' | null;
}

export interface Feedback {
  id: number;
  sessionId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DashboardStats {
  totalConversations: number;
  avgResponseTime: string;
  satisfactionRate: string;
  activeSessions: number;
}

export interface BotConfiguration {
  organizationName: string;
  industry: string;
  businessDescription: string;
  tone: 'formal' | 'friendly' | 'professional' | 'casual';
  responseStyle: 'concise' | 'detailed' | 'balanced';
  defaultLanguage: string;
  operatingHours: {
    enabled247: boolean;
    startTime: string;
    endTime: string;
  };
  advancedFeatures: {
    emotionDetection: boolean;
    voiceSupport: boolean;
    multiIntentHandling: boolean;
  };
}

export interface SectionProps {
  language: Language;
}

export interface DashboardProps {
  onLogout?: () => void;
  userData?: UserData;
  initialTab?: TabType;
}
