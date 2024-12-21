import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { Button } from '../ui/button';
import { Story, Question } from '@/types/lesson';

interface StoryLessonProps {
  storyId: string;
}

export function StoryLesson({ storyId }: StoryLessonProps) {
  const { getStoryById, markStoryComplete } = useLessonStore();
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const story = getStoryById(storyId);
  if (!story) return null;

  const currentQuestion = story.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === story.questions.length - 1;

  const handleAnswerSubmit = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = ((score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)) / story.questions.length) * 100;
      markStoryComplete(storyId, finalScore);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{story.title}</h2>
        
        <div className="mb-8">
          <p className="text-xl mb-4 leading-relaxed">{story.content}</p>
          <Button
            variant="outline"
            onClick={() => setShowTranslation(!showTranslation)}
            className="mb-4"
          >
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>
          {showTranslation && (
            <p className="text-gray-600 italic">{story.translation}</p>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Vocabulary:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {story.vocabulary.map((word, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-lg font-bold">{word.word}</p>
                <p className="text-gray-600">{word.transliteration}</p>
                <p className="text-gray-500">{word.translation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Question {currentQuestionIndex + 1}:</h3>
          <p className="text-lg mb-4">{currentQuestion.question}</p>
          
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-4">
            {!showExplanation ? (
              <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {isLastQuestion ? 'Complete Story' : 'Next Question'}
              </Button>
            )}
          </div>

          {showExplanation && currentQuestion.explanation && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold">Explanation:</p>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}