import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Volume2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface WritingPracticeProps {
  onBack?: () => void;
}

interface Exercise {
  id: number;
  hebrew: string;
  english: string;
  audio?: string;
}

const sampleExercises: Exercise[] = [
  {
    id: 1,
    hebrew: 'שָׁלוֹם',
    english: 'Hello',
  },
  {
    id: 2,
    hebrew: 'תּוֹדָה רַבָּה',
    english: 'Thank you very much',
  },
  {
    id: 3,
    hebrew: 'בְּבַקָּשָׁה',
    english: 'Please / You\'re welcome',
  }
];

export const WritingPractice: React.FC<WritingPracticeProps> = ({ onBack }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleNext = () => {
    if (currentExerciseIndex < sampleExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setUserInput('');
      setShowAnswer(false);
      setIsCorrect(null);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setUserInput('');
      setShowAnswer(false);
      setIsCorrect(null);
    }
  };

  const checkAnswer = () => {
    const correct = userInput.trim() === sampleExercises[currentExerciseIndex].hebrew;
    setIsCorrect(correct);
    if (!correct) {
      setShowAnswer(true);
    }
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(sampleExercises[currentExerciseIndex].hebrew);
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Writing Practice</h2>
          {onBack && (
            <Button variant="secondary" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <motion.div
            key={currentExerciseIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Write the Hebrew for:
            </h3>
            <p className="text-3xl text-primary mb-8">
              {sampleExercises[currentExerciseIndex].english}
            </p>
            
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-4 text-2xl text-right border rounded-lg focus:ring-2 focus:ring-primary"
                dir="rtl"
                placeholder="Type in Hebrew..."
              />

              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-4 text-xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                >
                  {isCorrect ? (
                    <span className="flex items-center justify-center">
                      <Check className="mr-2" /> Correct!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <X className="mr-2" /> Try again
                    </span>
                  )}
                </motion.div>
              )}

              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-xl text-muted-foreground"
                >
                  Correct answer: {sampleExercises[currentExerciseIndex].hebrew}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentExerciseIndex === 0}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            onClick={playAudio}
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Play Audio
          </Button>

          <Button
            variant="primary"
            onClick={checkAnswer}
            disabled={!userInput.trim()}
          >
            Check Answer
          </Button>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentExerciseIndex === sampleExercises.length - 1}
          >
            Next
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Exercise {currentExerciseIndex + 1} of {sampleExercises.length}
        </div>
      </div>
    </div>
  );
};