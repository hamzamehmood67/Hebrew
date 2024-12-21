export interface ReadingLevel {
  id: string;
  title: string;
  description: string;
  stories: Story[];
  xpRequired: number;
  name: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  translation: string;
  transliteration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  points: number;
  questions: Question[];
  vocabulary?: {
    word: string;
    translation: string;
    transliteration?: string;
    partOfSpeech?: string;
  }[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'text-input';
  question: string;
  correctAnswer: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

export interface ReadingProgress {
  storyId: string;
  completedAt: string;
  score: number;
  timeSpent: number;
  withoutTranslation: boolean;
  mistakes: number;
}

export interface UserReadingStats {
  totalStoriesRead: number;
  totalReadingTime: number;
  averageAccuracy: number;
  currentStreak: number;
  lastReadDate: string;
  completedStories: string[];
  achievements: string[];
}