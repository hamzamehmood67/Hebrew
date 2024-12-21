import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Volume2, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ListeningPracticeProps {
  onBack: () => void;
}

interface ListeningExercise {
  audioUrl: string;
  question: string;
  options: string[];
  correctAnswer: number;
  transcript: string;
}

const listeningExercises: ListeningExercise[] = [
  {
    audioUrl: '/audio/basic-greetings.mp3',
    question: 'What did the person say?',
    options: [
      'שלום, מה שלומך?',
      'להתראות',
      'תודה רבה',
      'בבקשה'
    ],
    correctAnswer: 0,
    transcript: 'שלום, מה שלומך?'
  },
  // Add more exercises here
];

export function ListeningPractice({ onBack }: ListeningPracticeProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredExercises, setAnsweredExercises] = useState<Set<number>>(new Set());

  const currentExercise = listeningExercises[currentExerciseIndex];
  const progress = (answeredExercises.size / listeningExercises.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === currentExercise.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setAnsweredExercises(prev => {
      const newSet = new Set(prev);
      newSet.add(currentExerciseIndex);
      return newSet;
    });
  };

  const handleNextExercise = () => {
    setSelectedAnswer(null);
    setShowTranscript(false);
    setCurrentExerciseIndex(prev => 
      prev === listeningExercises.length - 1 ? 0 : prev + 1
    );
  };

  const playAudio = () => {
    // In a real implementation, this would play the audio file
    // For now, we'll use text-to-speech as a placeholder
    const utterance = new SpeechSynthesisUtterance(currentExercise.transcript);
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
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
          <h1 className="text-4xl font-bold text-gray-900">Listening Practice</h1>
          <p className="mt-4 text-xl text-gray-600">
            Improve your Hebrew listening comprehension
          </p>
          <div className="mt-8 w-full">
            <Progress value={progress} className="w-full h-2" />
            <div className="mt-2 text-sm text-gray-600">
              Progress: {answeredExercises.size} of {listeningExercises.length} exercises completed
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Correct Answers: {correctAnswers} ({Math.round((correctAnswers / Math.max(answeredExercises.size, 1)) * 100)}%)
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-center mb-8">
            <Button
              size="lg"
              onClick={playAudio}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-6 w-6" />
              Play Audio
            </Button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {currentExercise.question}
          </h2>

          <div className="space-y-4">
            {currentExercise.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full p-4 text-right rounded-lg border-2 transition-colors
                  ${selectedAnswer === null 
                    ? 'hover:border-brand-500 border-gray-200' 
                    : index === currentExercise.correctAnswer
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
                  {selectedAnswer !== null && index === currentExercise.correctAnswer && (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  )}
                  {selectedAnswer === index && index !== currentExercise.correctAnswer && (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className="mt-6 flex flex-col gap-4">
              <Button
                variant="outline"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </Button>
              
              {showTranscript && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg text-gray-900 text-right">
                    {currentExercise.transcript}
                  </p>
                </div>
              )}

              <Button onClick={handleNextExercise}>
                Next Exercise
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
