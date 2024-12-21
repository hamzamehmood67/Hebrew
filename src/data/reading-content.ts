import type { ReadingLevel } from '@/types/reading';

export const readingLevels: ReadingLevel[] = [
  {
    id: 'beginner',
    title: 'Beginner Level',
    name: 'Beginner',
    description: 'Start your Hebrew journey with basic vocabulary and simple sentences.',
    xpRequired: 0,
    stories: [
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
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Level',
    name: 'Intermediate',
    description: 'Build your confidence with more complex sentences and conversations.',
    xpRequired: 1000,
    stories: [
      {
        id: 'story-2',
        title: 'At the Market',
        content: 'אני הולך לשוק.\nאני קונה פירות וירקות.\nהכל טרי וטעים.',
        transliteration: 'Ani holech lashuk.\nAni koneh peirot veyerakot.\nHakol tari veta\'im.',
        translation: 'I go to the market.\nI buy fruits and vegetables.\nEverything is fresh and tasty.',
        difficulty: 'intermediate',
        estimatedTime: 10,
        points: 200,
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
    ]
  }
];