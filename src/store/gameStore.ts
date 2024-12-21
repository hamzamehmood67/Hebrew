import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LeaderboardEntry, Achievement } from '@/types/leaderboard';
import { mockLeaderboard, mockAchievements } from '@/data/mockData';

// XP required for each level (1-based indexing)
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000];
const STREAK_BONUS_MULTIPLIER = 0.1; // 10% bonus per day of streak
const DAILY_GOAL_XP = 50;

interface GameState {
  weeklyXP: number;
  totalXP: number;
  level: number;
  streak: number;
  lastLoginDate: string | null;
  dailyXP: number;
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  updateLevel: () => void;
  checkDailyLogin: () => void;
  resetDailyXP: () => void;
  unlockAchievement: (achievementId: string) => void;
  checkAchievements: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      weeklyXP: 0,
      totalXP: 0,
      level: 1,
      streak: 0,
      lastLoginDate: null,
      dailyXP: 0,
      achievements: [],
      leaderboard: mockLeaderboard,

      addXP: (amount) => {
        const state = get();
        const streakBonus = Math.floor(amount * (state.streak * STREAK_BONUS_MULTIPLIER));
        const totalAmount = amount + streakBonus;

        set((state) => ({
          weeklyXP: state.weeklyXP + totalAmount,
          totalXP: state.totalXP + totalAmount,
          dailyXP: state.dailyXP + totalAmount,
        }));

        get().updateLevel();
        get().checkAchievements();
      },

      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
        })),

      resetStreak: () =>
        set(() => ({
          streak: 0,
        })),

      updateLevel: () => {
        const { totalXP } = get();
        let newLevel = 1;

        for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
          if (totalXP >= LEVEL_THRESHOLDS[i]) {
            newLevel = i;
            break;
          }
        }

        if (newLevel !== get().level) {
          set({ level: newLevel });
        }
      },

      checkDailyLogin: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastLoginDate } = get();

        if (lastLoginDate !== today) {
          if (lastLoginDate) {
            const lastLogin = new Date(lastLoginDate);
            const currentDate = new Date(today);
            const diffDays = Math.floor((currentDate.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
              get().incrementStreak();
            } else {
              get().resetStreak();
            }
          }

          set({
            lastLoginDate: today,
            dailyXP: 0,
          });
        }
      },

      resetDailyXP: () =>
        set(() => ({
          dailyXP: 0,
        })),

      unlockAchievement: (achievementId) =>
        set((state) => ({
          achievements: [...state.achievements, mockAchievements.find(a => a.id === achievementId)!],
        })),

      checkAchievements: () => {
        const state = get();
        const unlockedIds = new Set(state.achievements.map(a => a.id));

        // Check streak achievements
        if (state.streak >= 7 && !unlockedIds.has('week-streak')) {
          get().unlockAchievement('week-streak');
        }

        // Check level achievements
        if (state.level >= 5 && !unlockedIds.has('level-5')) {
          get().unlockAchievement('level-5');
        }

        // Check daily goal achievement
        if (state.dailyXP >= DAILY_GOAL_XP && !unlockedIds.has('daily-goal')) {
          get().unlockAchievement('daily-goal');
        }
      },
    }),
    {
      name: 'game-storage',
    }
  )
);