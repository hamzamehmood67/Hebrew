import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Story } from '@/types/reading';
import { useGameStore } from '@/store/gameStore';

interface StoryLessonProps {
  story: Story;
  onComplete: () => void;
}

export function StoryLesson({ story, onComplete }: StoryLessonProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { addXP } = useGameStore();

  if (!story || !story.questions) {
    return null;
  }

  const currentQuestion = story.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = currentQuestion.options.find(
      (option) => option.text === answer
    )?.isCorrect;
    setIsCorrect(isAnswerCorrect || false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < story.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      onComplete();
      addXP(story.points);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.text}
              onClick={() => handleAnswerSelect(option.text)}
              className="w-full justify-start text-left"
              variant={
                selectedAnswer === option.text
                  ? isCorrect
                    ? "primary"
                    : "destructive"
                  : "outline"
              }
              disabled={selectedAnswer !== null}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
      {selectedAnswer && (
        <div className="flex justify-end">
          <Button onClick={handleNext} variant="primary">
            {currentQuestionIndex < story.questions.length - 1
              ? "Next Question"
              : "Complete Lesson"}
          </Button>
        </div>
      )}
      {selectedAnswer && (
        <div className="mt-4">
          {isCorrect ? (
            <p className="text-green-600 font-medium">Correct! Well done!</p>
          ) : (
            <p className="text-red-600 font-medium">
              Incorrect. The correct answer is: {currentQuestion.correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}