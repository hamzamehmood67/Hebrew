import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete all existing records
    await prisma.storyProgress.deleteMany();
    await prisma.question.deleteMany();
    await prisma.vocabulary.deleteMany();
    await prisma.story.deleteMany();

    // Beginner Stories
    const beginnerStory1 = await prisma.story.create({
      data: {
        title: "משפחה שלי",
        content: "שלום! קוראים לי דוד. יש לי משפחה גדולה. יש לי אבא, אמא, אח ואחות. אני אוהב את המשפחה שלי.",
        translation: "Hello! My name is David. I have a big family. I have a father, mother, brother, and sister. I love my family.",
        level: "beginner",
        points: 10,
        vocabulary: {
          create: [
            {
              word: "משפחה",
              translation: "family",
              transliteration: "mishpacha"
            },
            {
              word: "שלום",
              translation: "hello",
              transliteration: "shalom"
            },
            {
              word: "אבא",
              translation: "father",
              transliteration: "aba"
            },
            {
              word: "אמא",
              translation: "mother",
              transliteration: "ima"
            },
            {
              word: "אח",
              translation: "brother",
              transliteration: "ach"
            },
            {
              word: "אחות",
              translation: "sister",
              transliteration: "achot"
            }
          ]
        }
      }
    });

    await prisma.question.create({
      data: {
        text: "מי במשפחה של דוד?",
        translation: "Who is in David's family?",
        options: [
          "אבא, אמא, ואח",
          "אבא, אמא, אח, ואחות",
          "אבא ואמא",
          "אח ואחות"
        ],
        correctAnswer: 1,
        storyId: beginnerStory1.id
      }
    });

    const beginnerStory2 = await prisma.story.create({
      data: {
        title: "בבית הספר",
        content: "אני לומד בבית הספר. יש לי מורה טובה. אני אוהב ללמוד עברית ומתמטיקה.",
        translation: "I study at school. I have a good teacher. I love learning Hebrew and mathematics.",
        level: "beginner",
        points: 10,
        vocabulary: {
          create: [
            {
              word: "בית ספר",
              translation: "school",
              transliteration: "beit sefer"
            },
            {
              word: "מורה",
              translation: "teacher",
              transliteration: "mora"
            },
            {
              word: "לומד",
              translation: "study/learn",
              transliteration: "lomed"
            },
            {
              word: "עברית",
              translation: "Hebrew",
              transliteration: "ivrit"
            },
            {
              word: "מתמטיקה",
              translation: "mathematics",
              transliteration: "matematika"
            }
          ]
        }
      }
    });

    await prisma.question.create({
      data: {
        text: "מה דוד אוהב ללמוד?",
        translation: "What does David love to learn?",
        options: [
          "רק עברית",
          "רק מתמטיקה",
          "עברית ומתמטיקה",
          "אנגלית ומדעים"
        ],
        correctAnswer: 2,
        storyId: beginnerStory2.id
      }
    });

    const beginnerStory3 = await prisma.story.create({
      data: {
        title: "בסופרמרקט",
        content: "אני הולך לסופרמרקט. אני קונה לחם, חלב, ביצים, ופירות. אני אוהב לאכול אוכל בריא.",
        translation: "I go to the supermarket. I buy bread, milk, eggs, and fruits. I like to eat healthy food.",
        level: "beginner",
        points: 10,
        vocabulary: {
          create: [
            {
              word: "סופרמרקט",
              translation: "supermarket",
              transliteration: "supermarket"
            },
            {
              word: "לחם",
              translation: "bread",
              transliteration: "lechem"
            },
            {
              word: "חלב",
              translation: "milk",
              transliteration: "chalav"
            },
            {
              word: "ביצים",
              translation: "eggs",
              transliteration: "beitzim"
            },
            {
              word: "פירות",
              translation: "fruits",
              transliteration: "perot"
            },
            {
              word: "בריא",
              translation: "healthy",
              transliteration: "bari"
            }
          ]
        }
      }
    });

    await prisma.question.create({
      data: {
        text: "מה אני קונה בסופרמרקט?",
        translation: "What do I buy at the supermarket?",
        options: [
          "רק לחם וחלב",
          "לחם, חלב, ביצים, ופירות",
          "רק פירות",
          "בשר ודגים"
        ],
        correctAnswer: 1,
        storyId: beginnerStory3.id
      }
    });

    // Intermediate Stories
    const intermediateStory1 = await prisma.story.create({
      data: {
        title: "טיול בתל אביב",
        content: "אתמול טיילתי בתל אביב. ביקרתי בשוק הכרמל, הלכתי לחוף הים, ואכלתי פלאפל טעים. תל אביב היא עיר מיוחדת ומעניינת.",
        translation: "Yesterday I toured Tel Aviv. I visited the Carmel Market, went to the beach, and ate tasty falafel. Tel Aviv is a special and interesting city.",
        level: "intermediate",
        points: 15,
        vocabulary: {
          create: [
            {
              word: "טיול",
              translation: "trip/tour",
              transliteration: "tiyul"
            },
            {
              word: "שוק",
              translation: "market",
              transliteration: "shuk"
            },
            {
              word: "חוף",
              translation: "beach",
              transliteration: "hof"
            },
            {
              word: "פלאפל",
              translation: "falafel",
              transliteration: "falafel"
            },
            {
              word: "מיוחד",
              translation: "special",
              transliteration: "meyuhad"
            }
          ]
        }
      }
    });

    await prisma.question.create({
      data: {
        text: "איפה ביקר המספר?",
        translation: "Where did the narrator visit?",
        options: [
          "רק בשוק הכרמל",
          "רק בחוף הים",
          "בשוק הכרמל, בחוף הים, ואכל פלאפל",
          "במוזיאון תל אביב"
        ],
        correctAnswer: 2,
        storyId: intermediateStory1.id
      }
    });

    const intermediateStory2 = await prisma.story.create({
      data: {
        title: "תחביבים שלי",
        content: "בזמן הפנוי שלי, אני אוהב לעשות הרבה דברים. אני מנגן בגיטרה, מצייר, וקורא ספרים. בסופי שבוע, אני גם הולך לטייל בטבע עם חברים.",
        translation: "In my free time, I like to do many things. I play guitar, draw, and read books. On weekends, I also go hiking in nature with friends.",
        level: "intermediate",
        points: 15,
        vocabulary: {
          create: [
            {
              word: "זמן פנוי",
              translation: "free time",
              transliteration: "zman panui"
            },
            {
              word: "מנגן",
              translation: "play (music)",
              transliteration: "menagen"
            },
            {
              word: "גיטרה",
              translation: "guitar",
              transliteration: "gitara"
            },
            {
              word: "מצייר",
              translation: "draw",
              transliteration: "metzayer"
            },
            {
              word: "ספרים",
              translation: "books",
              transliteration: "sfarim"
            },
            {
              word: "סופי שבוע",
              translation: "weekends",
              transliteration: "sofei shavua"
            }
          ]
        }
      }
    });

    await prisma.question.create({
      data: {
        text: "מה המספר עושה בזמן הפנוי?",
        translation: "What does the narrator do in their free time?",
        options: [
          "רק מנגן בגיטרה",
          "מנגן בגיטרה ומצייר",
          "מנגן בגיטרה, מצייר, וקורא ספרים",
          "רק קורא ספרים"
        ],
        correctAnswer: 2,
        storyId: intermediateStory2.id
      }
    });

    // Advanced Stories
    const advancedStory1 = await prisma.story.create({
      data: {
        title: "השינויים האקלימיים בישראל",
        content: "בשנים האחרונות, ישראל מתמודדת עם אתגרים סביבתיים משמעותיים. שינויי האקלים משפיעים על החקלאות, משק המים, ואיכות החיים. מדענים ישראלים מפתחים פתרונות חדשניים להתמודדות עם המשבר.",
        translation: "In recent years, Israel has been dealing with significant environmental challenges. Climate changes affect agriculture, water management, and quality of life. Israeli scientists are developing innovative solutions to cope with the crisis.",
        level: "advanced",
        points: 20,
        vocabulary: {
          create: [
            {
              word: "שינויים אקלימיים",
              translation: "climate changes",
              transliteration: "shinuyim aklimiyim"
            },
            {
              word: "אתגרים",
              translation: "challenges",
              transliteration: "etgarim"
            },
            {
              word: "סביבתיים",
              translation: "environmental",
              transliteration: "svivati'im"
            },
            {
              word: "חקלאות",
              translation: "agriculture",
              transliteration: "hakla'ut"
            },
            {
              word: "פתרונות",
              translation: "solutions",
              transliteration: "pitronot"
            }
          ]
        }
      }
    });

    await prisma.question.create({
      data: {
        text: "מה המדענים הישראלים עושים?",
        translation: "What are Israeli scientists doing?",
        options: [
          "חוקרים את השינויים האקלימיים",
          "מפתחים פתרונות חדשניים",
          "כותבים מאמרים",
          "מלמדים באוניברסיטה"
        ],
        correctAnswer: 1,
        storyId: advancedStory1.id
      }
    });

    const advancedStory2 = await prisma.story.create({
      data: {
        title: "חדשנות וטכנולוגיה בישראל",
        content: "ישראל ידועה בעולם כמרכז חדשנות וטכנולוגיה. חברות סטארט-אפ רבות מפתחות כאן פתרונות בתחומי הבינה המלאכותית, הסייבר, והביוטכנולוגיה. המערכת האקדמית והתעשייה משתפות פעולה ליצירת חידושים פורצי דרך.",
        translation: "Israel is known worldwide as a center of innovation and technology. Many startup companies here develop solutions in artificial intelligence, cybersecurity, and biotechnology. The academic system and industry collaborate to create breakthrough innovations.",
        level: "advanced",
        points: 20,
        vocabulary: {
          create: [
            {
              word: "חדשנות",
              translation: "innovation",
              transliteration: "chadshaut"
            },
            {
              word: "סטארט-אפ",
              translation: "startup",
              transliteration: "start-up"
            },
            {
              word: "בינה מלאכותית",
              translation: "artificial intelligence",
              transliteration: "bina melachutit"
            },
            {
              word: "סייבר",
              translation: "cyber",
              transliteration: "cyber"
            },
            {
              word: "ביוטכנולוגיה",
              translation: "biotechnology",
              transliteration: "biotechnologia"
            },
            {
              word: "פורצי דרך",
              translation: "breakthrough",
              transliteration: "portzei derech"
            }
          ]
        }
      }
    });

    await prisma.question.create({
      data: {
        text: "באילו תחומים מפתחות חברות הסטארט-אפ פתרונות?",
        translation: "In which fields do startup companies develop solutions?",
        options: [
          "רק בתחום הסייבר",
          "בינה מלאכותית וסייבר",
          "בינה מלאכותית, סייבר, וביוטכנולוגיה",
          "רק בתחום הביוטכנולוגיה"
        ],
        correctAnswer: 2,
        storyId: advancedStory2.id
      }
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
