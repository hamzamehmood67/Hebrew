import { User } from './auth';

export interface PracticeResult {
  type: string;
  score: number;
  mistakes: string[];
  timeSpent: number;
}

export interface WritingPrompt {
  id: string;
  prompt: string;
  difficulty: string;
  category: string;
}

export interface ReadingPrompt {
  id: string;
  text: string;
  translation: string;
  difficulty: string;
}

export interface ConversationMessage {
  id: string;
  content: string;
  translation?: string;
  timestamp: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  lastActivity: string;
  completedLessons: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
