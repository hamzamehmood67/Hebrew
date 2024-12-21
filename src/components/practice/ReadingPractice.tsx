import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowLeft, Volume2, BookOpen, Star } from 'lucide-react';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface Props {
  onBack: () => void;
}

const levels = [
  { id: 'easy', name: 'Easy', description: 'Basic sentences and simple vocabulary' },
  { id: 'medium', name: 'Medium', description: 'Short paragraphs and everyday topics' },
  { id: 'hard', name: 'Hard', description: 'Complex stories and advanced vocabulary' }
];

const stories = {
  easy: [
    {
      hebrew: 'דני הוא ילד שמח.',
      transliteration: 'Dani hu yeled sameach.',
      english: 'Danny is a happy boy.',
      question: {
        hebrew: 'איך מרגיש דני?',
        transliteration: 'Eich margish Dani?',
        english: 'How does Danny feel?',
        correctAnswer: 'דני מרגיש שמח.',
        options: [
          {
            hebrew: 'דני מרגיש שמח.',
            transliteration: 'Dani margish sameach.',
            english: 'Danny feels happy.'
          },
          {
            hebrew: 'דני מרגיש עצוב.',
            transliteration: 'Dani margish atzuv.',
            english: 'Danny feels sad.'
          }
        ]
      }
    }
  ],
  medium: [
    {
      hebrew: 'דני אוהב לשחק עם הכלב שלו.',
      transliteration: 'Dani ohev lesachek im hakelev shelo.',
      english: 'Danny loves to play with his dog.',
      question: {
        hebrew: 'עם מי דני אוהב לשחק?',
        transliteration: 'Im mi Dani ohev lesachek?',
        english: 'With whom does Danny love to play?',
        correctAnswer: 'דני אוהב לשחק עם הכלב שלו.',
        options: [
          {
            hebrew: 'דני אוהב לשחק עם הכלב שלו.',
            transliteration: 'Dani ohev lesachek im hakelev shelo.',
            english: 'Danny loves to play with his dog.'
          },
          {
            hebrew: 'דני אוהב לשחק עם החתול שלו.',
            transliteration: 'Dani ohev lesachek im hachatul shelo.',
            english: 'Danny loves to play with his cat.'
          }
        ]
      }
    }
  ],
  hard: [
    {
      hebrew: 'יום אחד, דני והכלב שלו יצאו לטיול ביער.',
      transliteration: 'Yom echad, Dani ve\'hakelev shelo yatzu letiyul ba\'yaar.',
      english: 'One day, Danny and his dog went for a walk in the forest.',
      question: {
        hebrew: 'לאן הלכו דני והכלב שלו?',
        transliteration: 'Le\'an halchu Dani ve\'hakelev shelo?',
        english: 'Where did Danny and his dog go?',
        correctAnswer: 'הם יצאו לטיול ביער.',
        options: [
          {
            hebrew: 'הם יצאו לטיול ביער.',
            transliteration: 'Hem yatzu letiyul ba\'yaar.',
            english: 'They went for a walk in the forest.'
          },
          {
            hebrew: 'הם הלכו לקניות בשוק.',
            transliteration: 'Hem halchu likniyot ba\'shuk.',
            english: 'They went shopping at the market.'
          }
        ]
      }
    }
  ]
};

export function ReadingPractice({ onBack }: Props) {
  const { width, height } = useWindowSize();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStory = selectedLevel ? stories[selectedLevel as keyof typeof stories][0] : null;

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setShowTranslation(false);
    setShowTransliteration(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleSubmit = () => {
    if (!currentStory || !selectedAnswer) return;

    const isCorrect = selectedAnswer === currentStory.question.correctAnswer;
    setShowResult(true);
    
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center mb-8">
            <Button variant="outline" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold">Reading Practice</h2>
          </div>

          {!selectedLevel ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {levels.map((level) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                  <button
                    onClick={() => handleLevelSelect(level.id)}
                    className="relative w-full bg-white p-6 rounded-xl shadow-lg text-left"
                  >
                    <div className="flex items-center mb-4">
                      <Star className="h-6 w-6 text-brand-600 mr-2" />
                      <h3 className="text-lg font-semibold">{level.name}</h3>
                    </div>
                    <p className="text-gray-600">{level.description}</p>
                  </button>
                </motion.div>
              ))}
            </div>
          ) : currentStory ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-2xl" dir="rtl">{currentStory.hebrew}</div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowTransliteration(!showTransliteration)}
                    className="flex items-center"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    {showTransliteration ? 'Hide' : 'Show'} Transliteration
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="flex items-center"
                  >
                    <Volume2 className="h-5 w-5 mr-2" />
                    {showTranslation ? 'Hide' : 'Show'} Translation
                  </Button>
                </div>

                {showTransliteration && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-600 italic"
                  >
                    {currentStory.transliteration}
                  </motion.div>
                )}

                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-600"
                  >
                    {currentStory.english}
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Comprehension Check</h3>
                <p className="text-lg" dir="rtl">{currentStory.question.hebrew}</p>
                <p className="text-gray-600">{currentStory.question.english}</p>

                <div className="space-y-4">
                  {currentStory.question.options.map((option) => (
                    <button
                      key={option.hebrew}
                      onClick={() => setSelectedAnswer(option.hebrew)}
                      className={`w-full p-4 text-right rounded-lg border-2 transition-colors ${
                        selectedAnswer === option.hebrew
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-gray-200 hover:border-brand-300'
                      }`}
                      dir="rtl"
                    >
                      <div>{option.hebrew}</div>
                      <div className="text-sm text-gray-600 text-left">
                        {option.english}
                      </div>
                    </button>
                  ))}
                </div>

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      selectedAnswer === currentStory.question.correctAnswer
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {selectedAnswer === currentStory.question.correctAnswer
                      ? 'Correct! Well done!'
                      : 'Not quite right. Try again!'}
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedLevel(null)}>
                    Back to Levels
                  </Button>
                  <Button onClick={handleSubmit} disabled={!selectedAnswer}>
                    Check Answer
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}