export interface ReadingLevel {
  id: string;
  title: string;
  description: string;
  stories: Story[];
}

export interface Story {
  id: string;
  title: string;
  level: string;
  category: string;
  hebrew: string;
  translation: string;
  audioUrl?: string;
  estimatedTime: string;
  points: number;
  xpReward: number;
  vocabulary: VocabularyItem[];
  questions: Question[];
  bonusChallenge?: BonusChallenge;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  transliteration: string;
}

export interface Question {
  id: string;
  questionType: 'multiple-choice' | 'fill-in' | 'matching';
  hebrew: string;
  transliteration: string;
  english: string;
  options: Answer[];
}

export interface Answer {
  hebrew: string;
  transliteration: string;
  english: string;
  isCorrect: boolean;
}

export interface BonusChallenge {
  type: string;
  description: string;
  requirement: string;
  reward: number;
}