import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing stories
  await prisma.story.deleteMany();
  
  // Beginner Stories
  const beginnerStories = [
    {
      title: 'משפחה שלי',
      content: 'שלום! קוראים לי דוד. יש לי משפחה גדולה. יש לי אבא, אמא, אח ואחות. אני אוהב את המשפחה שלי.',
      translation: 'Hello! My name is David. I have a big family. I have a father, mother, brother, and sister. I love my family.',
      level: 'beginner',
      vocabulary: [
        { word: 'משפחה', translation: 'family', transliteration: 'mishpacha' },
        { word: 'שלום', translation: 'hello', transliteration: 'shalom' },
        { word: 'אבא', translation: 'father', transliteration: 'aba' },
        { word: 'אמא', translation: 'mother', transliteration: 'ima' },
        { word: 'אח', translation: 'brother', transliteration: 'ach' },
        { word: 'אחות', translation: 'sister', transliteration: 'achot' }
      ],
      questions: [
        {
          text: 'מי במשפחה של דוד?',
          translation: 'Who is in David\'s family?',
          options: [
            'אבא, אמא, ואח',
            'אבא, אמא, אח, ואחות',
            'אבא ואמא',
            'אח ואחות'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      title: 'בבית הקפה',
      content: 'אני יושב בבית קפה. אני שותה קפה חם ואוכל עוגה. בבית הקפה יש אנשים רבים. כולם שותים ומדברים.',
      translation: 'I am sitting in a cafe. I am drinking hot coffee and eating cake. There are many people in the cafe. Everyone is drinking and talking.',
      level: 'beginner',
      vocabulary: [
        { word: 'בית קפה', translation: 'cafe', transliteration: 'beit kafe' },
        { word: 'יושב', translation: 'sitting', transliteration: 'yoshev' },
        { word: 'שותה', translation: 'drinking', transliteration: 'shote' },
        { word: 'אוכל', translation: 'eating', transliteration: 'ochel' },
        { word: 'עוגה', translation: 'cake', transliteration: 'uga' }
      ],
      questions: [
        {
          text: 'מה אני עושה בבית הקפה?',
          translation: 'What am I doing in the cafe?',
          options: [
            'רק שותה קפה',
            'רק אוכל עוגה',
            'שותה קפה ואוכל עוגה',
            'מדבר עם אנשים'
          ],
          correctAnswer: 2
        }
      ]
    }
  ];

  // Intermediate Stories
  const intermediateStories = [
    {
      title: 'טיול בטבע',
      content: 'אתמול יצאתי לטיול בהרים. ראיתי נוף יפה מאוד: עצים ירוקים, פרחים צבעוניים, וציפורים. הלכתי במשך שעתיים והגעתי לפסגה. משם ראיתי את כל העיר.',
      translation: 'Yesterday I went on a hike in the mountains. I saw a very beautiful view: green trees, colorful flowers, and birds. I walked for two hours and reached the peak. From there I saw the entire city.',
      level: 'intermediate',
      vocabulary: [
        { word: 'טיול', translation: 'trip/hike', transliteration: 'tiyul' },
        { word: 'הרים', translation: 'mountains', transliteration: 'harim' },
        { word: 'נוף', translation: 'view/landscape', transliteration: 'nof' },
        { word: 'פסגה', translation: 'peak', transliteration: 'pisga' },
        { word: 'ציפורים', translation: 'birds', transliteration: 'tziporim' }
      ],
      questions: [
        {
          text: 'כמה זמן הלכתי עד שהגעתי לפסגה?',
          translation: 'How long did I walk until I reached the peak?',
          options: [
            'שעה אחת',
            'שעתיים',
            'שלוש שעות',
            'חצי שעה'
          ],
          correctAnswer: 1
        }
      ]
    }
  ];

  // Advanced Stories
  const advancedStories = [
    {
      title: 'החיים בעיר המודרנית',
      content: 'החיים בעיר המודרנית מורכבים ומעניינים. בכל יום אנחנו מתמודדים עם אתגרים חדשים: פקקי תנועה, זיהום אוויר, ועומס בתחבורה הציבורית. אבל יש גם יתרונות רבים: מסעדות מגוונות, מוזיאונים, תיאטראות, ואפשרויות תעסוקה רבות. השאלה היא: האם החיים בעיר שווים את המחיר?',
      translation: 'Life in the modern city is complex and interesting. Every day we face new challenges: traffic jams, air pollution, and overcrowded public transportation. But there are also many advantages: diverse restaurants, museums, theaters, and many employment opportunities. The question is: is city life worth the price?',
      level: 'advanced',
      vocabulary: [
        { word: 'מורכבים', translation: 'complex', transliteration: 'murkavim' },
        { word: 'אתגרים', translation: 'challenges', transliteration: 'etgarim' },
        { word: 'זיהום אוויר', translation: 'air pollution', transliteration: 'zihum avir' },
        { word: 'תחבורה ציבורית', translation: 'public transportation', transliteration: 'tachbura tziburit' },
        { word: 'יתרונות', translation: 'advantages', transliteration: 'yitronot' }
      ],
      questions: [
        {
          text: 'מהם האתגרים של החיים בעיר המודרנית?',
          translation: 'What are the challenges of life in the modern city?',
          options: [
            'רק פקקי תנועה',
            'רק זיהום אוויר',
            'פקקי תנועה, זיהום אוויר, ועומס בתחבורה הציבורית',
            'חוסר במסעדות ומוזיאונים'
          ],
          correctAnswer: 2
        }
      ]
    }
  ];

  // Create all stories with their vocabulary and questions
  for (const story of [...beginnerStories, ...intermediateStories, ...advancedStories]) {
    await prisma.story.create({
      data: {
        title: story.title,
        content: story.content,
        translation: story.translation,
        level: story.level,
        vocabulary: {
          create: story.vocabulary
        },
        questions: {
          create: story.questions
        }
      }
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
