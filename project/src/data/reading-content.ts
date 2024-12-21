import { ReadingLevel } from '@/types/reading';

export const readingLevels: ReadingLevel[] = [
  {
    id: 'level-1',
    title: 'Beginner - Basic Sentences',
    description: 'Simple sentences and basic vocabulary',
    stories: [
      {
        id: 'story-1-1',
        hebrew: 'דני הוא ילד שמח.',
        transliteration: 'Dani hu yeled sameach.',
        english: 'Danny is a happy boy.',
        questions: [
          {
            id: 'q1',
            hebrew: 'איך מרגיש דני?',
            transliteration: 'Eich margish Dani?',
            english: 'How does Danny feel?',
            options: [
              {
                hebrew: 'דני מרגיש שמח.',
                transliteration: 'Dani margish sameach.',
                english: 'Danny feels happy.',
                isCorrect: true
              },
              {
                hebrew: 'דני מרגיש עצוב.',
                transliteration: 'Dani margish atzuv.',
                english: 'Danny feels sad.',
                isCorrect: false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-2',
    title: 'Elementary - Simple Stories',
    description: 'Short stories with basic plot',
    stories: [
      {
        id: 'story-2-1',
        hebrew: 'דני אוהב לשחק עם הכלב שלו.',
        transliteration: 'Dani ohev lesachek im hakelev shelo.',
        english: 'Danny loves to play with his dog.',
        questions: [
          {
            id: 'q1',
            hebrew: 'עם מי דני אוהב לשחק?',
            transliteration: 'Im mi Dani ohev lesachek?',
            english: 'With whom does Danny love to play?',
            options: [
              {
                hebrew: 'דני אוהב לשחק עם הכלב שלו.',
                transliteration: 'Dani ohev lesachek im hakelev shelo.',
                english: 'Danny loves to play with his dog.',
                isCorrect: true
              },
              {
                hebrew: 'דני אוהב לשחק עם החתול שלו.',
                transliteration: 'Dani ohev lesachek im hachatul shelo.',
                english: 'Danny loves to play with his cat.',
                isCorrect: false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-3',
    title: 'Intermediate - Complex Stories',
    description: 'Longer stories with more complex vocabulary',
    stories: [
      {
        id: 'story-3-1',
        hebrew: 'יום אחד, דני והכלב שלו יצאו לטיול ביער.',
        transliteration: 'Yom echad, Dani ve\'hakelev shelo yatzu letiyul ba\'yaar.',
        english: 'One day, Danny and his dog went for a walk in the forest.',
        questions: [
          {
            id: 'q1',
            hebrew: 'לאן הלכו דני והכלב שלו?',
            transliteration: 'Le\'an halchu Dani ve\'hakelev shelo?',
            english: 'Where did Danny and his dog go?',
            options: [
              {
                hebrew: 'הם יצאו לטיול ביער.',
                transliteration: 'Hem yatzu letiyul ba\'yaar.',
                english: 'They went for a walk in the forest.',
                isCorrect: true
              },
              {
                hebrew: 'הם הלכו לקניות בשוק.',
                transliteration: 'Hem halchu likniyot ba\'shuk.',
                english: 'They went shopping at the market.',
                isCorrect: false
              }
            ]
          }
        ]
      }
    ]
  }
];