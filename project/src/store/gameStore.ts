import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LeaderboardEntry, WeeklyChallenge, Achievement } from '@/types/leaderboard';

interface GameState {
  score: number;
  streak: number;
  weeklyXP: number;
  totalXP: number;
  achievements: Achievement[];
  currentChallenges: WeeklyChallenge[];
  // Actions
  addScore: (points: number) => void;
  updateStreak: () => void;
  breakStreak: () => void;
  completeChallenge: (challengeId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  getLeaderboard: () => Promise<LeaderboardEntry[]>;
  getWeeklyChallenges: () => Promise<WeeklyChallenge[]>;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      score: 0,
      streak: 0,
      weeklyXP: 0,
      totalXP: 0,
      achievements: [],
      currentChallenges: [],

      addScore: (points) => {
        set((state) => ({
          score: state.score + points,
          weeklyXP: state.weeklyXP + points,
          totalXP: state.totalXP + points
        }));
      },

      updateStreak: () => {
        set((state) => ({
          streak: state.streak + 1
        }));
      },

      breakStreak: () => {
        set({ streak: 0 });
      },

      completeChallenge: async (challengeId) => {
        const challenge = get().currentChallenges.find(c => c.id === challengeId);
        if (challenge && !challenge.completed) {
          set((state) => ({
            weeklyXP: state.weeklyXP + challenge.xpReward,
            totalXP: state.totalXP + challenge.xpReward,
            currentChallenges: state.currentChallenges.map(c =>
              c.id === challengeId ? { ...c, completed: true } : c
            )
          }));
        }
      },

      unlockAchievement: (achievementId) => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement && !get().achievements.find(a => a.id === achievementId)) {
          set((state) => ({
            achievements: [...state.achievements, { ...achievement, unlockedAt: new Date() }],
            totalXP: state.totalXP + achievement.xpReward
          }));
        }
      },

      getLeaderboard: async () => {
        // In a real app, this would fetch from an API
        return mockLeaderboard;
      },

      getWeeklyChallenges: async () => {
        // In a real app, this would fetch from an API
        return mockWeeklyChallenges;
      }
    }),
    {
      name: 'game-storage'
    }
  )
);