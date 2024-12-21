const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const stories = [
  {
    title: 'Happy Danny',
    content: 'דני הוא ילד שמח.',
    translation: 'Danny is a happy boy.',
    level: 'easy',
    questions: [
      {
        question: 'איך מרגיש דני?',
        options: [
          'דני מרגיש שמח.',
          'דני מרגיש עצוב.'
        ],
        correctAnswer: 'דני מרגיש שמח.',
        explanation: 'The sentence tells us that Danny is happy (שמח)'
      }
    ],
    vocabulary: [
      {
        word: 'ילד',
        translation: 'boy',
        transliteration: 'yeled'
      },
      {
        word: 'שמח',
        translation: 'happy',
        transliteration: 'sameach'
      }
    ]
  },
  {
    title: 'Ruti Drawing',
    content: 'רותי אוהבת לצייר.',
    translation: 'Ruti loves to draw.',
    level: 'easy',
    questions: [
      {
        question: 'מה רותי אוהבת לעשות?',
        options: [
          'רותי אוהבת לצייר.',
          'רותי אוהבת לרקוד.'
        ],
        correctAnswer: 'רותי אוהבת לצייר.',
        explanation: 'The sentence states that Ruti loves to draw (לצייר)'
      }
    ],
    vocabulary: [
      {
        word: 'אוהבת',
        translation: 'loves (feminine)',
        transliteration: 'ohevet'
      },
      {
        word: 'לצייר',
        translation: 'to draw',
        transliteration: 'letzayer'
      }
    ]
  },
  {
    title: 'My Cat',
    content: 'יש לי חתול קטן.',
    translation: 'I have a small cat.',
    level: 'easy',
    questions: [
      {
        question: 'איזו חיה יש לי?',
        options: [
          'יש לך חתול.',
          'יש לך כלב.'
        ],
        correctAnswer: 'יש לך חתול.',
        explanation: ''
      }
    ],
    vocabulary: [
      {
        word: 'חתול',
        translation: 'cat',
        transliteration: 'chatul'
      },
      {
        word: 'קטן',
        translation: 'small',
        transliteration: 'katan'
      }
    ]
  }
];

async function main() {
  console.log('Start seeding...');
  
  for (const story of stories) {
    const result = await prisma.story.create({
      data: {
        title: story.title,
        content: story.content,
        translation: story.translation,
        level: story.level,
        questions: {
          create: story.questions.map(q => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
          }))
        },
        vocabulary: {
          create: story.vocabulary.map(v => ({
            word: v.word,
            translation: v.translation,
            transliteration: v.transliteration
          }))
        }
      }
    });
    console.log(`Created story with id: ${result.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
