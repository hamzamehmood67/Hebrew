import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HebrewLetter, Story as LessonStory } from '../types/lesson';
import type { Question } from '../types/reading';
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
  currentStory: LessonStory | null;
  currentQuestion: Question | null;
  userAnswers: Map<string, string>;
  score: number;
  isComplete: boolean;
  // Actions
  setCurrentLetter: (index: number) => void;
  markLetterComplete: (letter: string) => void;
  markStoryComplete: (storyId: string, score: number) => void;
  getCurrentLetter: () => HebrewLetter | null;
  getNextLetter: () => HebrewLetter | null;
  getStoryById: (id: string) => LessonStory | null;
  getAvailableStories: () => LessonStory[];
  setCurrentStory: (story: LessonStory | null) => void;
  setCurrentQuestion: (question: Question | null) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  completeLesson: () => void;
  resetLesson: () => void;
  getStories: () => LessonStory[];
}

const lessonStories: LessonStory[] = stories.map(story => ({
  ...story,
  vocabulary: story.vocabulary?.map(v => ({
    ...v,
    transliteration: v.transliteration || ''
  })) || []
}));

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      currentLetterIndex: 0,
      completedLetters: [],
      completedStories: [],
      userProgress: {},
      currentStory: null,
      currentQuestion: null,
      userAnswers: new Map(),
      score: 0,
      isComplete: false,

      setCurrentLetter: (index) => set({ currentLetterIndex: index }),

      markLetterComplete: (letter) =>
        set((state) => ({
          completedLetters: [...state.completedLetters, letter],
        })),

      markStoryComplete: (storyId, score) =>
        set((state) => ({
          completedStories: [...state.completedStories, storyId],
          userProgress: {
            ...state.userProgress,
            [storyId]: {
              completed: true,
              score,
              attempts: (state.userProgress[storyId]?.attempts || 0) + 1,
            },
          },
        })),

      getCurrentLetter: () => {
        const { currentLetterIndex } = get();
        return hebrewAlphabet[currentLetterIndex] || null;
      },

      getNextLetter: () => {
        const { currentLetterIndex } = get();
        return hebrewAlphabet[currentLetterIndex + 1] || null;
      },

      getStoryById: (id) => lessonStories.find((s) => s.id === id) || null,

      getAvailableStories: () => {
        const { completedStories } = get();
        return lessonStories.filter(
          (story) =>
            !completedStories.includes(story.id) &&
            story.difficulty === 'beginner'
        );
      },

      setCurrentStory: (story) => set({ currentStory: story }),

      setCurrentQuestion: (question) => set({ currentQuestion: question }),

      submitAnswer: (questionId, answer) =>
        set((state) => {
          const newAnswers = new Map(state.userAnswers);
          newAnswers.set(questionId, answer);

          const currentQuestion = state.currentQuestion;
          if (!currentQuestion) return state;

          const isCorrect = answer === currentQuestion.correctAnswer;
          const newScore = isCorrect ? state.score + 10 : state.score;

          return {
            userAnswers: newAnswers,
            score: newScore,
          };
        }),

      completeLesson: () => set({ isComplete: true }),

      resetLesson: () =>
        set({
          currentQuestion: null,
          userAnswers: new Map(),
          score: 0,
          isComplete: false,
        }),

      getStories: () => lessonStories,
    }),
    {
      name: 'hebrew-lessons',
      partialize: (state) => ({
        completedLetters: state.completedLetters,
        completedStories: state.completedStories,
        userProgress: state.userProgress,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
      }),
    }
  )
);