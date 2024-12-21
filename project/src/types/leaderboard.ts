export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  streak: number;
  level: number;
  avatar?: string;
  rank?: number;
  weeklyXP: number;
  totalXP: number;
  achievements: string[];
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  endDate: Date;
  type: 'reading' | 'speaking' | 'writing' | 'conversation';
  requirement: {
    count: number;
    criteria: string;
  };
  progress?: number;
  completed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  xpReward: number;
}