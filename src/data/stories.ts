import type { Story } from '@/types/reading';

export const stories: Story[] = [
  {
    id: 'story-1',
    title: 'First Day in Israel',
    content: 'שלום! אני גר בישראל.\nאני לומד עברית כל יום.\nאני אוהב את השפה הזאת.',
    transliteration: 'Shalom! Ani gar be\'Israel.\nAni lomed ivrit kol yom.\nAni ohev et hasafa hazot.',
    translation: 'Hello! I live in Israel.\nI study Hebrew every day.\nI love this language.',
    difficulty: 'beginner',
    estimatedTime: 5,
    points: 100,
    vocabulary: [
      {
        word: 'שלום',
        translation: 'hello, peace',
        transliteration: 'shalom',
        partOfSpeech: 'noun'
      },
      {
        word: 'אני',
        translation: 'I',
        transliteration: 'ani',
        partOfSpeech: 'pronoun'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What does שלום mean?',
        correctAnswer: 'hello/peace',
        options: [
          { text: 'hello/peace', isCorrect: true },
          { text: 'goodbye', isCorrect: false },
          { text: 'thank you', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'story-2',
    title: 'At the Market',
    content: 'אני הולך לשוק.\nאני קונה פירות וירקות.\nהכל טרי וטעים.',
    transliteration: 'Ani holech lashuk.\nAni koneh peirot veyerakot.\nHakol tari veta\'im.',
    translation: 'I go to the market.\nI buy fruits and vegetables.\nEverything is fresh and tasty.',
    difficulty: 'beginner',
    estimatedTime: 5,
    points: 100,
    vocabulary: [
      {
        word: 'שוק',
        translation: 'market',
        transliteration: 'shuk',
        partOfSpeech: 'noun'
      },
      {
        word: 'פירות',
        translation: 'fruits',
        transliteration: 'peirot',
        partOfSpeech: 'noun'
      }
    ],
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Where does the person go?',
        correctAnswer: 'to the market',
        options: [
          { text: 'to the market', isCorrect: true },
          { text: 'to school', isCorrect: false },
          { text: 'to work', isCorrect: false }
        ]
      }
    ]
  }
];

export const readingLevels = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Start your Hebrew journey with simple texts and everyday vocabulary',
    stories: stories.filter(s => s.difficulty === 'beginner')
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Challenge yourself with longer texts and more complex grammar',
    stories: stories.filter(s => s.difficulty === 'intermediate')
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Master Hebrew with authentic texts and advanced vocabulary',
    stories: stories.filter(s => s.difficulty === 'advanced')
  }
];

export const readingAchievements = [
  {
    id: 'first_story',
    title: 'First Steps',
    description: 'Complete your first story',
    icon: 'trophy',
    xpReward: 100
  },
  {
    id: 'beginner_master',
    title: 'Beginner Master',
    description: 'Complete all beginner stories',
    icon: 'star',
    xpReward: 500
  },
  {
    id: 'speed_reader',
    title: 'Speed Reader',
    description: 'Complete a story in under 3 minutes',
    icon: 'clock',
    xpReward: 200
  }
];