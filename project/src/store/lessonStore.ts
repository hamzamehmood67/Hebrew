import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HebrewLetter, Story } from '../types/lesson';
import { hebrewAlphabet } from '../data/alphabet';
import { stories } from '../data/stories';

interface LessonState {
  currentLetterIndex: number;
  completedLetters: string[];
  completedStories: string[];
  userProgress: {
    [key: string]: {
      completed: boolean;
      score: number;
      attempts: number;
    };
  };
  // Actions
  setCurrentLetter: (index: number) => void;
  markLetterComplete: (letter: string) => void;
  markStoryComplete: (storyId: string, score: number) => void;
  getCurrentLetter: () => HebrewLetter | null;
  getNextLetter: () => HebrewLetter | null;
  getStoryById: (id: string) => Story | null;
  getAvailableStories: () => Story[];
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      currentLetterIndex: 0,
      completedLetters: [],
      completedStories: [],
      userProgress: {},

      setCurrentLetter: (index) => set({ currentLetterIndex: index }),
      
      markLetterComplete: (letter) => set((state) => ({
        completedLetters: [...state.completedLetters, letter]
      })),

      markStoryComplete: (storyId, score) => set((state) => ({
        completedStories: [...state.completedStories, storyId],
        userProgress: {
          ...state.userProgress,
          [storyId]: {
            completed: true,
            score,
            attempts: (state.userProgress[storyId]?.attempts || 0) + 1
          }
        }
      })),

      getCurrentLetter: () => {
        const { currentLetterIndex } = get();
        return hebrewAlphabet[currentLetterIndex] || null;
      },

      getNextLetter: () => {
        const { currentLetterIndex } = get();
        return hebrewAlphabet[currentLetterIndex + 1] || null;
      },

      getStoryById: (id) => stories.find(story => story.id === id) || null,

      getAvailableStories: () => {
        const { completedStories } = get();
        return stories.filter(story => 
          story.difficulty === 'beginner' || 
          completedStories.length >= 3
        );
      }
    }),
    {
      name: 'hebrew-lessons'
    }
  )
);