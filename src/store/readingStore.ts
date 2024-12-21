import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Story, ReadingLevel, ReadingProgress } from '@/types/reading';
import { readingLevels } from '@/data/reading-content';

interface ReadingState {
  currentLevel: number;
  currentStory: Story | null;
  progress: Map<string, ReadingProgress>;
  completedStories: string[];
  // Actions
  setCurrentLevel: (level: number) => void;
  setCurrentStory: (story: Story | null) => void;
  markStoryComplete: (storyId: string) => void;
  getProgress: (storyId: string) => ReadingProgress;
  getLevels: () => ReadingLevel[];
  getStoriesForLevel: (levelId: string) => Story[];
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      currentLevel: 0,
      currentStory: null,
      progress: new Map(),
      completedStories: [],

      setCurrentLevel: (level) => set({ currentLevel: level }),

      setCurrentStory: (story) => set({ currentStory: story }),

      markStoryComplete: (storyId) =>
        set((state) => {
          const newProgress = new Map(state.progress);
          newProgress.set(storyId, {
            storyId,
            completedAt: new Date().toISOString(),
            score: 100,
            timeSpent: 0,
            withoutTranslation: false,
            mistakes: 0
          });

          return {
            progress: newProgress,
            completedStories: [...state.completedStories, storyId]
          };
        }),

      getProgress: (storyId) => {
        const progress = get().progress.get(storyId);
        if (!progress) {
          return {
            storyId,
            completedAt: '',
            score: 0,
            timeSpent: 0,
            withoutTranslation: false,
            mistakes: 0
          };
        }
        return progress;
      },

      getLevels: () => readingLevels,

      getStoriesForLevel: (levelId) => {
        const level = readingLevels.find(l => l.id === levelId);
        return level ? level.stories : [];
      }
    }),
    {
      name: 'reading-storage',
      partialize: (state) => ({
        completedStories: state.completedStories,
        progress: Array.from(state.progress.entries())
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        completedStories: persistedState.completedStories || [],
        progress: new Map(persistedState.progress || [])
      })
    }
  )
);