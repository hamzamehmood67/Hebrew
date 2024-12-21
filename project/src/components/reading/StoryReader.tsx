import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowLeft, Volume2, BookOpen, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface StoryReaderProps {
  story: {
    hebrew: string;
    transliteration: string;
    english: string;
    questions: Array<{
      id: string;
      hebrew: string;
      transliteration: string;
      english: string;
      options: Array<{
        hebrew: string;
        transliteration: string;
        english: string;
        isCorrect: boolean;
      }>;
    }>;
  };
  onBack: () => void;
  onComplete: (score: number) => void;
}

export function StoryReader({ story, onBack, onComplete }: StoryReaderProps) {
  const { width, height } = useWindowSize();
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || currentQuestionIndex === null) return;

    const isCorrect = story.questions[currentQuestionIndex].options[selectedAnswer].isCorrect;
    
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex === null) return;
    
    if (currentQuestionIndex < story.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Calculate final score
      const score = 100; // Implement actual score calculation
      onComplete(score);
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
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold">Reading Practice</h2>
          </div>

          {currentQuestionIndex === null ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-2xl" dir="rtl">{story.hebrew}</div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowTransliteration(!showTransliteration)}
                    className="flex items-center"
                  >
                    <HelpCircle className="h-5 w-5 mr-2" />
                    {showTransliteration ? 'Hide' : 'Show'} Transliteration
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="flex items-center"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    {showTranslation ? 'Hide' : 'Show'} Translation
                  </Button>
                </div>

                {showTransliteration && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-600 italic"
                  >
                    {story.transliteration}
                  </motion.div>
                )}

                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-600"
                  >
                    {story.english}
                  </motion.div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleStartQuiz}>Start Questions</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Question {currentQuestionIndex + 1} of {story.questions.length}
                </h3>
                
                <div className="text-lg" dir="rtl">
                  {story.questions[currentQuestionIndex].hebrew}
                </div>
                
                <div className="text-gray-600">
                  {story.questions[currentQuestionIndex].english}
                </div>

                <div className="space-y-4 mt-6">
                  {story.questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full p-4 text-right rounded-lg border-2 transition-colors ${
                        selectedAnswer === index
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
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    story.questions[currentQuestionIndex].options[selectedAnswer!].isCorrect
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {story.questions[currentQuestionIndex].options[selectedAnswer!].isCorrect
                    ? 'Correct! Well done!'
                    : 'Not quite right. Try again!'}
                </motion.div>
              )}

              <div className="flex justify-end">
                {!showResult ? (
                  <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {currentQuestionIndex < story.questions.length - 1 ? 'Next Question' : 'Complete'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}