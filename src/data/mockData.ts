import type { LeaderboardEntry, WeeklyChallenge, Achievement } from '@/types/leaderboard';

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 'user-1',
    username: 'Sarah Cohen',
    xp: 2500,
    level: 5,
    streak: 15
  },
  {
    id: 'user-2',
    username: 'David Miller',
    xp: 2100,
    level: 4,
    streak: 8
  },
  {
    id: 'user-3',
    username: 'Rachel Green',
    xp: 1800,
    level: 3,
    streak: 12
  },
  {
    id: 'user-4',
    username: 'Michael Brown',
    xp: 1500,
    level: 3,
    streak: 5
  },
  {
    id: 'user-5',
    username: 'Emma Wilson',
    xp: 1200,
    level: 2,
    streak: 3
  }
];

export const mockChallenges: WeeklyChallenge[] = [
  {
    id: 'challenge-1',
    title: 'Reading Marathon',
    description: 'Complete 5 stories this week',
    xpReward: 500,
    completed: false,
    endDate: '2024-01-07'
  },
  {
    id: 'challenge-2',
    title: 'Perfect Score',
    description: 'Get 100% on 3 story quizzes',
    xpReward: 300,
    completed: false,
    endDate: '2024-01-07'
  },
  {
    id: 'challenge-3',
    title: 'Vocabulary Master',
    description: 'Learn 50 new words',
    xpReward: 400,
    completed: false,
    endDate: '2024-01-07'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'first-story',
    title: 'First Steps',
    description: 'Complete your first story',
    icon: '📚',
    unlockedAt: '2024-01-01'
  },
  {
    id: 'week-streak',
    title: 'Dedicated Learner',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    unlockedAt: '2024-01-01'
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Get 100% on a story quiz',
    icon: '⭐',
    unlockedAt: '2024-01-01'
  }
];
