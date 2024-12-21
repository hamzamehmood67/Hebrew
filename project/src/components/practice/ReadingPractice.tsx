import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, BookOpen, Volume2, Star } from 'lucide-react';
import { practiceApi } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface ReadingPracticeProps {
  onBack: () => void;
}

interface Story {
  id: string;
  title: string;
  content: string;
  translation: string;
  level: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  vocabulary: {
    word: string;
    translation: string;
    transliteration: string;
  }[];
}

const levels = [
  { id: 'easy', name: 'Easy', description: 'Basic sentences and simple vocabulary' },
  { id: 'medium', name: 'Medium', description: 'Short paragraphs and everyday topics' },
  { id: 'hard', name: 'Hard', description: 'Complex stories and advanced vocabulary' }
];

export function ReadingPractice({ onBack }: ReadingPracticeProps) {
  const { width, height } = useWindowSize();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedLevel) {
      fetchStories(selectedLevel);
    }
  }, [selectedLevel]);

  useEffect(() => {
    // Start timer when component mounts
    setStartTime(Date.now());
  }, []);

  const fetchStories = async (selectedLevel: string) => {
    setLoading(true);
    try {
      console.log('Fetching stories for level:', selectedLevel);
      const response = await fetch(`http://localhost:3001/api/stories?level=${selectedLevel}`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      const data = await response.json();
      console.log('Received stories:', data);
      setStories(data);
      if (data.length > 0) {
        setCurrentStoryIndex(0);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Failed to load stories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const currentStory = stories.length > 0 ? stories[currentStoryIndex] : null;

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setShowTranslation(false);
    setShowTransliteration(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleSubmit = () => {
    if (!currentStory || !selectedAnswer) return;

    const isCorrect = selectedAnswer === currentStory.questions[0].correctAnswer;
    setShowResult(true);
    
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleComplete = async (score: number) => {
    if (!startTime) return;
    
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
      
      await practiceApi.submitResult({
        type: 'reading',
        score,
        timeSpent,
        mistakes: [], // Add empty array if there's no mistake tracking
        feedback: 'Completed reading practice'
      });

      toast({
        title: 'Practice Complete!',
        description: `You scored ${score} points! Keep up the good work!`,
      });

      setIsComplete(true);
    } catch (error) {
      console.error('Failed to submit practice result:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your progress. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <h2 className="text-2xl font-bold mb-4">Practice Complete!</h2>
        <Button onClick={onBack}>Return to Practice Menu</Button>
      </div>
    );
  }

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
            <Button variant="primary" onClick={onBack} className="mr-4">
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
                <div className="text-2xl" dir="rtl">{currentStory.content}</div>
                
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
                    {/* transliteration is not fetched from the database */}
                  </motion.div>
                )}

                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-600"
                  >
                    {currentStory.translation}
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Comprehension Check</h3>
                <p className="text-lg" dir="rtl">{currentStory.questions[0].question}</p>

                <div className="space-y-4">
                  {currentStory.questions[0].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(option)}
                      className={`w-full p-4 text-right rounded-lg border-2 transition-colors ${
                        selectedAnswer === option
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-gray-200 hover:border-brand-300'
                      }`}
                      dir="rtl"
                    >
                      <div>{option}</div>
                    </button>
                  ))}
                </div>

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      selectedAnswer === currentStory.questions[0].correctAnswer
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {selectedAnswer === currentStory.questions[0].correctAnswer
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
                  <Button 
                    className="mt-4"
                    onClick={() => handleComplete(85)} // Example score
                  >
                    Complete Practice
                  </Button>
                </div>
              </div>
            </div>
          ) : loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}