```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story, ReadingProgress, UserReadingStats } from '@/types/reading';
import { stories, readingLevels, readingAchievements } from '@/data/stories';

interface ReadingState {
  progress: ReadingProgress[];
  stats: UserReadingStats;
  currentStory: Story | null;
  // Actions
  startStory: (storyId: string) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  completeStory: (storyId: string, data: {
    score: number;
    timeSpent: number;
    withoutTranslation: boolean;
    mistakes: string[]
  }) => void;
  checkAchievements: () => void;
  getUserLevel: () => number;
  getAvailableStories: () => Story[];
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      progress: [],
      stats: {
        totalStoriesRead: 0,
        averageScore: 0,
        totalXPEarned: 0,
        readingStreak: 0,
        lastReadDate: new Date(),
        favoriteCategories: [],
        achievements: [],
        level: 1,
        progress: {
          currentXP: 0,
          nextLevelXP: 100,
          percentage: 0
        }
      },
      currentStory: null,

      startStory: (storyId) => {
        const story = stories.find(s => s.id === storyId);
        if (story) {
          set({ currentStory: story });
        }
      },

      submitAnswer: (questionId, answer) => {
        const { currentStory } = get();
        if (!currentStory) return;

        const question = currentStory.questions.find(q => q.id === questionId);
        if (!question) return;

        const isCorrect = answer === question.correctAnswer;
        // Update progress and stats as needed
      },

      completeStory: (storyId, data) => {
        const { progress, stats } = get();
        const story = stories.find(s => s.id === storyId);
        if (!story) return;

        // Update progress
        const newProgress: ReadingProgress = {
          userId: 'current-user', // Replace with actual user ID
          storyId,
          completed: true,
          score: data.score,
          timeSpent: data.timeSpent,
          attemptsCount: 1,
          lastAttemptDate: new Date(),
          bonusCompleted: data.score === 100,
          mistakesMade: data.mistakes,
          readWithoutTranslation: data.withoutTranslation
        };

        // Calculate XP earned
        let xpEarned = story.xpReward;
        if (data.score === 100) xpEarned += 50;
        if (data.withoutTranslation) xpEarned += 100;

        // Update stats
        const newStats: UserReadingStats = {
          ...stats,
          totalStoriesRead: stats.totalStoriesRead + 1,
          totalXPEarned: stats.totalXPEarned + xpEarned,
          lastReadDate: new Date()
        };

        set({
          progress: [...progress, newProgress],
          stats: newStats
        });

        // Check for new achievements
        get().checkAchievements();
      },

      checkAchievements: () => {
        const { stats, progress } = get();
        const newAchievements = [];

        // Check each achievement condition
        if (progress.length === 1) {
          newAchievements.push(readingAchievements.find(a => a.id === 'first-story'));
        }

        if (progress.some(p => p.score === 100)) {
          newAchievements.push(readingAchievements.find(a => a.id === 'perfect-score'));
        }

        // Add new achievements and XP
        if (newAchievements.length > 0) {
          set({
            stats: {
              ...stats,
              achievements: [...stats.achievements, ...newAchievements.map(a => ({
                ...a!,
                dateEarned: new Date()
              }))],
              totalXPEarned: stats.totalXPEarned + newAchievements.reduce((sum, a) => sum + (a?.xpReward || 0), 0)
            }
          });
        }
      },

      getUserLevel: () => {
        const { stats } = get();
        return readingLevels.findIndex(level => 
          stats.totalXPEarned < level.xpRequired
        );
      },

      getAvailableStories: () => {
        const { progress, stats } = get();
        const userLevel = get().getUserLevel();

        return stories.filter(story => {
          // Check level requirements
          if (story.unlockRequirements?.level && userLevel < story.unlockRequirements.level) {
            return false;
          }

          // Check XP requirements
          if (story.unlockRequirements?.minXP && stats.totalXPEarned < story.unlockRequirements.minXP) {
            return false;
          }

          // Check previous stories requirement
          if (story.unlockRequirements?.previousStories) {
            const completedRequired = story.unlockRequirements.previousStories.every(
              reqStory => progress.some(p => p.storyId === reqStory && p.completed)
            );
            if (!completedRequired) return false;
          }

          return true;
        });
      }
    }),
    {
      name: 'reading-storage'
    }
  )
);
```