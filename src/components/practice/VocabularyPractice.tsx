import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface VocabularyPracticeProps {
  onBack?: () => void;
}

interface Flashcard {
  hebrew: string;
  english: string;
  pronunciation: string;
  example: string;
}

const sampleFlashcards: Flashcard[] = [
  {
    hebrew: 'שָׁלוֹם',
    english: 'Hello / Peace',
    pronunciation: 'Shalom',
    example: 'שָׁלוֹם, מַה שְׁלוֹמְךָ? - Hello, how are you?'
  },
  {
    hebrew: 'תּוֹדָה',
    english: 'Thank you',
    pronunciation: 'Todah',
    example: 'תּוֹדָה רַבָּה - Thank you very much'
  },
  {
    hebrew: 'בְּבַקָּשָׁה',
    english: 'Please / You\'re welcome',
    pronunciation: 'Bevakasha',
    example: 'בְּבַקָּשָׁה, שֵׁב - Please, sit down'
  }
];

export const VocabularyPractice: React.FC<VocabularyPracticeProps> = ({ onBack }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<Set<number>>(new Set());

  const currentCard = sampleFlashcards[currentCardIndex];

  const handleNext = () => {
    if (currentCardIndex < sampleFlashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleKnown = () => {
    setKnownWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentCardIndex)) {
        newSet.delete(currentCardIndex);
      } else {
        newSet.add(currentCardIndex);
      }
      return newSet;
    });
  };

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(currentCard.pronunciation);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Vocabulary Practice</h2>
          <div className="flex gap-2">
            {onBack && (
              <Button variant="secondary" onClick={onBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setCurrentCardIndex(0)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <h3 className="text-4xl font-bold mb-2">
                  {isFlipped ? currentCard.english : currentCard.hebrew}
                </h3>
                <p className="text-xl text-muted-foreground">
                  {isFlipped ? currentCard.example : currentCard.pronunciation}
                </p>
              </motion.div>

              <Button 
                variant="outline" 
                size="sm" 
                className="mx-2"
                onClick={playPronunciation}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleNext}
              disabled={currentCardIndex === sampleFlashcards.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="primary"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Flip Card
          </Button>
          <Button
            variant="primary"
            onClick={handleKnown}
            className={knownWords.has(currentCardIndex) ? 'bg-green-600' : ''}
          >
            {knownWords.has(currentCardIndex) ? 'Marked as Known' : 'Mark as Known'}
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          {knownWords.size} of {sampleFlashcards.length} words mastered
        </div>
      </div>
    </div>
  );
};
