const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const stories = [
  {
    title: 'Happy Danny',
    content: 'דני הוא ילד שמח.',
    translation: 'Danny is a happy boy.',
    level: 'easy',
    question: {
      hebrew: 'איך מרגיש דני?',
      english: 'How does Danny feel?',
      correctAnswer: 'דני מרגיש שמח.',
      options: [
        { hebrew: 'דני מרגיש שמח.', english: 'Danny feels happy.' },
        { hebrew: 'דני מרגיש עצוב.', english: 'Danny feels sad.' }
      ]
    }
  },
  // Add all other stories here...
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
          create: {
            content: story.question.hebrew,
            translation: story.question.english,
            correctAnswer: story.question.correctAnswer,
            options: {
              create: story.question.options.map(option => ({
                content: option.hebrew,
                translation: option.english
              }))
            }
          }
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
