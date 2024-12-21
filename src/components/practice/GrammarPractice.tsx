import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GrammarPracticeProps {
  onBack: () => void;
}

interface GrammarQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const grammarQuestions: GrammarQuestion[] = [
  {
    question: 'Which is the correct way to say "I want" in Hebrew?',
    options: [
      'אני רוצים',
      'אני רוצה',
      'אני רוצות',
      'רוצה אני'
    ],
    correctAnswer: 1,
    explanation: 'In Hebrew, "אני רוצה" (ani rotzeh/rotzah) is the correct form. The verb "רוצה" agrees with the singular form.',
    category: 'Verb Conjugation'
  },
  {
    question: 'Select the correct plural form of the word "ספר" (book):',
    options: [
      'ספרה',
      'ספרים',
      'ספרות',
      'ספר'
    ],
    correctAnswer: 1,
    explanation: 'The plural form of "ספר" (sefer) is "ספרים" (sfarim). This follows the regular masculine plural pattern in Hebrew.',
    category: 'Plural Forms'
  },
  // Add more questions here
];

export function GrammarPractice({ onBack }: GrammarPracticeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = grammarQuestions[currentQuestionIndex];
  const progress = (answeredQuestions.size / grammarQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => {
      const newSet = new Set(prev);
      newSet.add(currentQuestionIndex);
      return newSet;
    });
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestionIndex(prev => 
      prev === grammarQuestions.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-8"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Practice
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Grammar Practice</h1>
          <p className="mt-4 text-xl text-gray-600">
            Master Hebrew grammar through interactive exercises
          </p>
          <div className="mt-8 w-full">
            <Progress value={progress} className="w-full h-2" />
            <div className="mt-2 text-sm text-gray-600">
              Progress: {answeredQuestions.size} of {grammarQuestions.length} questions completed
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Correct Answers: {correctAnswers} ({Math.round((correctAnswers / Math.max(answeredQuestions.size, 1)) * 100)}%)
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-4 text-sm font-medium text-brand-600">
            {currentQuestion.category}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full p-4 text-right rounded-lg border-2 transition-colors
                  ${selectedAnswer === null 
                    ? 'hover:border-brand-500 border-gray-200' 
                    : index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                  }`}
                onClick={() => handleAnswerSelect(index)}
                whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg">{option}</span>
                  {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  )}
                  {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-50 rounded-lg"
            >
              <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex justify-end"
            >
              <Button onClick={handleNextQuestion}>
                Next Question
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
