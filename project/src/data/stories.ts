import { Story } from '@/types/reading';

export const stories: Story[] = [
  {
    id: 'beginner-1',
    title: 'First Day in Israel',
    level: 'Beginner',
    category: 'Daily Life',
    hebrew: 'שלום! קוראים לי דן. היום הגעתי לישראל. אני גר בתל אביב. העיר יפה מאוד.',
    translation: 'Hello! My name is Dan. Today I arrived in Israel. I live in Tel Aviv. The city is very beautiful.',
    audioUrl: '/audio/stories/first-day.mp3',
    estimatedTime: '5 mins',
    points: 100,
    xpReward: 50,
    vocabulary: [
      { word: 'שלום', translation: 'Hello', transliteration: 'Shalom' },
      { word: 'קוראים לי', translation: 'My name is', transliteration: 'Korim li' },
      { word: 'היום', translation: 'Today', transliteration: 'Hayom' },
      { word: 'הגעתי', translation: 'I arrived', transliteration: 'Higati' },
      { word: 'גר', translation: 'Live', transliteration: 'Gar' }
    ],
    questions: [
      {
        id: 'q1',
        questionType: 'multiple-choice',
        hebrew: 'איפה דן גר?',
        english: 'Where does Dan live?',
        transliteration: 'Eifo Dan gar?',
        options: [
          { hebrew: 'ירושלים', english: 'Jerusalem', transliteration: 'Yerushalayim', isCorrect: false },
          { hebrew: 'תל אביב', english: 'Tel Aviv', transliteration: 'Tel Aviv', isCorrect: true },
          { hebrew: 'חיפה', english: 'Haifa', transliteration: 'Haifa', isCorrect: false },
          { hebrew: 'אילת', english: 'Eilat', transliteration: 'Eilat', isCorrect: false }
        ]
      }
    ],
    bonusChallenge: {
      type: 'no-translation',
      description: 'Complete the reading and questions without using the translation',
      requirement: 'Score 100% without viewing translation',
      reward: 50
    }
  },
  {
    id: 'beginner-2',
    title: 'At the Coffee Shop',
    level: 'Beginner',
    category: 'Daily Life',
    hebrew: 'בוקר טוב! אני בבית קפה. אני רוצה קפה ועוגה. הקפה חם והעוגה טעימה מאוד.',
    translation: 'Good morning! I am at a coffee shop. I want coffee and cake. The coffee is hot and the cake is very tasty.',
    audioUrl: '/audio/stories/coffee-shop.mp3',
    estimatedTime: '5 mins',
    points: 100,
    xpReward: 50,
    vocabulary: [
      { word: 'בוקר טוב', translation: 'Good morning', transliteration: 'Boker tov' },
      { word: 'בית קפה', translation: 'Coffee shop', transliteration: 'Beit kafe' },
      { word: 'רוצה', translation: 'Want', transliteration: 'Rotze/Rotza' },
      { word: 'עוגה', translation: 'Cake', transliteration: 'Uga' },
      { word: 'חם', translation: 'Hot', transliteration: 'Cham' },
      { word: 'טעימה', translation: 'Tasty (feminine)', transliteration: 'Te\'ima' }
    ],
    questions: [
      {
        id: 'q1',
        questionType: 'multiple-choice',
        hebrew: 'מה הוא רוצה?',
        english: 'What does the person want?',
        transliteration: 'Ma hu rotze?',
        options: [
          { hebrew: 'רק קפה', english: 'Just coffee', transliteration: 'Rak kafe', isCorrect: false },
          { hebrew: 'קפה ועוגה', english: 'Coffee and cake', transliteration: 'Kafe ve\'uga', isCorrect: true },
          { hebrew: 'רק עוגה', english: 'Just cake', transliteration: 'Rak uga', isCorrect: false },
          { hebrew: 'תה ועוגה', english: 'Tea and cake', transliteration: 'Te ve\'uga', isCorrect: false }
        ]
      }
    ],
    bonusChallenge: {
      type: 'no-translation',
      description: 'Order in Hebrew at a real coffee shop',
      requirement: 'Use the learned phrases in a real situation',
      reward: 75
    }
  },
  {
    id: 'beginner-3',
    title: 'Meeting Friends',
    level: 'Beginner',
    category: 'Social',
    hebrew: 'היי! אלה החברים שלי, רון ומיכל. הם סטודנטים באוניברסיטה. אנחנו לומדים יחד בספרייה.',
    translation: 'Hi! These are my friends, Ron and Michal. They are students at the university. We study together in the library.',
    audioUrl: '/audio/stories/meeting-friends.mp3',
    estimatedTime: '7 mins',
    points: 120,
    xpReward: 60,
    vocabulary: [
      { word: 'חברים', translation: 'Friends', transliteration: 'Chaverim' },
      { word: 'סטודנטים', translation: 'Students', transliteration: 'Studentim' },
      { word: 'אוניברסיטה', translation: 'University', transliteration: 'Universita' },
      { word: 'לומדים', translation: 'Studying', transliteration: 'Lomdim' },
      { word: 'יחד', translation: 'Together', transliteration: 'Yachad' },
      { word: 'ספרייה', translation: 'Library', transliteration: 'Sifriya' }
    ],
    questions: [
      {
        id: 'q1',
        questionType: 'multiple-choice',
        hebrew: 'איפה הם לומדים?',
        english: 'Where do they study together?',
        transliteration: 'Eifo hem lomdim?',
        options: [
          { hebrew: 'בבית', english: 'At home', transliteration: 'Babait', isCorrect: false },
          { hebrew: 'בספרייה', english: 'In the library', transliteration: 'Basifriya', isCorrect: true },
          { hebrew: 'בבית קפה', english: 'At a café', transliteration: 'Bebeit kafe', isCorrect: false },
          { hebrew: 'בפארק', english: 'In the park', transliteration: 'Bapark', isCorrect: false }
        ]
      }
    ],
    bonusChallenge: {
      type: 'conversation',
      description: 'Have a basic conversation about studying with a friend in Hebrew',
      requirement: 'Use at least 5 vocabulary words from the story',
      reward: 80
    }
  },
  {
    id: 'beginner-4',
    title: 'Shopping at the Market',
    level: 'Beginner',
    category: 'Shopping',
    hebrew: 'אני בשוק. אני קונה פירות וירקות. יש כאן תפוחים, בננות, עגבניות ומלפפונים. הכל טרי וזול.',
    translation: 'I am at the market. I am buying fruits and vegetables. There are apples, bananas, tomatoes, and cucumbers here. Everything is fresh and cheap.',
    audioUrl: '/audio/stories/market.mp3',
    estimatedTime: '6 mins',
    points: 110,
    xpReward: 55,
    vocabulary: [
      { word: 'שוק', translation: 'Market', transliteration: 'Shuk' },
      { word: 'קונה', translation: 'Buying', transliteration: 'Kone/Kona' },
      { word: 'פירות', translation: 'Fruits', transliteration: 'Perot' },
      { word: 'ירקות', translation: 'Vegetables', transliteration: 'Yerakot' },
      { word: 'טרי', translation: 'Fresh', transliteration: 'Tari' },
      { word: 'זול', translation: 'Cheap', transliteration: 'Zol' }
    ],
    questions: [
      {
        id: 'q1',
        questionType: 'multiple-choice',
        hebrew: 'מה אני קונה?',
        english: 'What is the person buying?',
        transliteration: 'Ma ani kone?',
        options: [
          { hebrew: 'רק פירות', english: 'Only fruits', transliteration: 'Rak perot', isCorrect: false },
          { hebrew: 'רק ירקות', english: 'Only vegetables', transliteration: 'Rak yerakot', isCorrect: false },
          { hebrew: 'פירות וירקות', english: 'Fruits and vegetables', transliteration: 'Perot veyerakot', isCorrect: true },
          { hebrew: 'כלום', english: 'Nothing', transliteration: 'Klum', isCorrect: false }
        ]
      }
    ],
    bonusChallenge: {
      type: 'real-world',
      description: 'Visit a local market and identify items in Hebrew',
      requirement: 'Name at least 10 items in Hebrew',
      reward: 70
    }
  },
  {
    id: 'beginner-5',
    title: 'At the Restaurant',
    level: 'Beginner',
    category: 'Dining',
    hebrew: 'ערב טוב! אנחנו במסעדה. אני רעב מאוד. המלצר נתן לנו תפריט. אני רוצה מרק, סלט ופיצה.',
    translation: 'Good evening! We are at a restaurant. I am very hungry. The waiter gave us a menu. I want soup, salad and pizza.',
    audioUrl: '/audio/stories/restaurant.mp3',
    estimatedTime: '6 mins',
    points: 110,
    xpReward: 55,
    vocabulary: [
      { word: 'ערב טוב', translation: 'Good evening', transliteration: 'Erev tov' },
      { word: 'מסעדה', translation: 'Restaurant', transliteration: 'Mis\'ada' },
      { word: 'רעב', translation: 'Hungry', transliteration: 'Ra\'ev' },
      { word: 'מלצר', translation: 'Waiter', transliteration: 'Meltzar' },
      { word: 'תפריט', translation: 'Menu', transliteration: 'Tafrit' },
      { word: 'מרק', translation: 'Soup', transliteration: 'Marak' }
    ],
    questions: [
      {
        id: 'q1',
        questionType: 'multiple-choice',
        hebrew: 'מה אני רוצה לאכול?',
        english: 'What do I want to eat?',
        transliteration: 'Ma ani rotze le\'echol?',
        options: [
          { hebrew: 'רק מרק', english: 'Only soup', transliteration: 'Rak marak', isCorrect: false },
          { hebrew: 'מרק וסלט', english: 'Soup and salad', transliteration: 'Marak vesalat', isCorrect: false },
          { hebrew: 'מרק, סלט ופיצה', english: 'Soup, salad and pizza', transliteration: 'Marak, salat vepizza', isCorrect: true },
          { hebrew: 'רק פיצה', english: 'Only pizza', transliteration: 'Rak pizza', isCorrect: false }
        ]
      }
    ],
    bonusChallenge: {
      type: 'real-world',
      description: 'Order a meal in Hebrew at a restaurant',
      requirement: 'Use at least 5 vocabulary words from the story',
      reward: 70
    }
  },
  {
    id: 'beginner-6',
    title: 'On the Bus',
    level: 'Beginner',
    category: 'Transportation',
    hebrew: 'אני נוסע באוטובוס לעבודה. יש הרבה אנשים. אני יושב ליד החלון. הנסיעה לוקחת שלושים דקות.',
    translation: 'I am traveling by bus to work. There are many people. I am sitting by the window. The ride takes thirty minutes.',
    audioUrl: '/audio/stories/bus.mp3',
    estimatedTime: '6 mins',
    points: 110,
    xpReward: 55,
    vocabulary: [
      { word: 'נוסע', translation: 'Traveling', transliteration: 'Nose\'a' },
      { word: 'אוטובוס', translation: 'Bus', transliteration: 'Otobus' },
      { word: 'עבודה', translation: 'Work', transliteration: 'Avoda' },
      { word: 'אנשים', translation: 'People', transliteration: 'Anashim' },
      { word: 'יושב', translation: 'Sitting', transliteration: 'Yoshev' },
      { word: 'חלון', translation: 'Window', transliteration: 'Chalon' }
    ],
    questions: [
      {
        id: 'q1',
        questionType: 'multiple-choice',
        hebrew: 'כמה זמן לוקחת הנסיעה?',
        english: 'How long does the ride take?',
        transliteration: 'Kama zman lokachat hanesiah?',
        options: [
          { hebrew: 'עשר דקות', english: 'Ten minutes', transliteration: 'Eser dakot', isCorrect: false },
          { hebrew: 'עשרים דקות', english: 'Twenty minutes', transliteration: 'Esrim dakot', isCorrect: false },
          { hebrew: 'שלושים דקות', english: 'Thirty minutes', transliteration: 'Shloshim dakot', isCorrect: true },
          { hebrew: 'שעה', english: 'One hour', transliteration: 'Sha\'a', isCorrect: false }
        ]
      }
    ],
    bonusChallenge: {
      type: 'real-world',
      description: 'Take a bus ride and identify vocabulary items',
      requirement: 'Use public transportation and practice the vocabulary',
      reward: 65
    }
  },
  {
    id: 'beginner-7',
    title: 'At the Gym',
    level: 'Beginner',
    category: 'Health',
    hebrew: 'אני הולך לחדר כושר כל בוקר. אני אוהב לרוץ ולשחות. אחרי האימון אני שותה מים ואוכל פרי.',
    translation: 'I go to the gym every morning. I like to run and swim. After the workout, I drink water and eat fruit.',
    audioUrl: '/audio/stories/gym.mp3',
    estimatedTime: '6 mins',
    points: 110,
    xpReward: 55,
    vocabulary: [
      { word: 'חדר כושר', translation: 'Gym', transliteration: 'Chadar kosher' },
      { word: 'לרוץ', translation: 'To run', transliteration: 'Larutz' },
      { word: 'לשחות', translation: 'To swim', transliteration: 'Lischot' },
      { word: 'אימון', translation: 'Workout', transliteration: 'Imun' },
      { word: 'שותה', translation: 'Drinking', transliteration: 'Shote' },
      { word: 'פרי', translation: 'Fruit', transliteration: 'Pri' }
    ],
    questions: [
      {
        id: 'q1',
        questionType: 'multiple-choice',
        hebrew: 'מה אני עושה אחרי האימון?',
        english: 'What do I do after the workout?',
        transliteration: 'Ma ani ose acharei ha\'imun?',
        options: [
          { hebrew: 'רק שותה מים', english: 'Only drink water', transliteration: 'Rak shote mayim', isCorrect: false },
          { hebrew: 'שותה מים ואוכל פרי', english: 'Drink water and eat fruit', transliteration: 'Shote mayim ve\'ochel pri', isCorrect: true },
          { hebrew: 'הולך הביתה', english: 'Go home', transliteration: 'Holech habaita', isCorrect: false },
          { hebrew: 'ממשיך להתאמן', english: 'Continue exercising', transliteration: 'Mamshich lehitamen', isCorrect: false }
        ]
      }
    ],
    bonusChallenge: {
      type: 'real-world',
      description: 'Visit a gym and identify equipment names in Hebrew',
      requirement: 'Learn and use at least 8 gym-related words',
      reward: 75
    }
  }
];

export const readingLevels = [
  {
    level: 1,
    name: 'Beginner Reader',
    xpRequired: 0,
    benefits: ['Access to beginner stories', 'Basic vocabulary tools']
  },
  {
    level: 2,
    name: 'Developing Reader',
    xpRequired: 100,
    benefits: ['Access to longer stories', 'Audio playback']
  },
  {
    level: 3,
    name: 'Intermediate Reader',
    xpRequired: 300,
    benefits: ['Access to intermediate stories', 'Speed reading challenges']
  },
  {
    level: 4,
    name: 'Advanced Reader',
    xpRequired: 600,
    benefits: ['Access to advanced stories', 'Special achievements']
  },
  {
    level: 5,
    name: 'Expert Reader',
    xpRequired: 1000,
    benefits: ['Access to all content', 'Bonus challenges', 'Community recognition']
  }
];

export const readingAchievements = [
  {
    id: 'first-story',
    name: 'First Steps',
    description: 'Complete your first story',
    xpReward: 50,
    icon: 'award'
  },
  {
    id: 'perfect-score',
    name: 'Perfect Reader',
    description: 'Get 100% on any story',
    xpReward: 100,
    icon: 'star'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a story in under 3 minutes with at least 80% accuracy',
    xpReward: 150,
    icon: 'zap'
  },
  {
    id: 'no-translation',
    name: 'Hebrew Master',
    description: 'Complete a story without using translation',
    xpReward: 200,
    icon: 'award'
  },
  {
    id: 'streak-7',
    name: 'Weekly Warrior',
    description: 'Read stories for 7 days in a row',
    xpReward: 300,
    icon: 'flame'
  }
];

export const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export type DifficultyLevel = typeof difficultyLevels[number];