import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Mic, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpeakingPracticeProps {
  onBack?: () => void;
}

interface Phrase {
  id: number;
  hebrew: string;
  english: string;
  audio?: string;
}

const samplePhrases: Phrase[] = [
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

export const SpeakingPractice: React.FC<SpeakingPracticeProps> = ({ onBack }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleNext = () => {
    if (currentPhraseIndex < samplePhrases.length - 1) {
      setCurrentPhraseIndex(prev => prev + 1);
      setShowTranslation(false);
    }
  };

  const handlePrevious = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(prev => prev - 1);
      setShowTranslation(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual recording logic here
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(samplePhrases[currentPhraseIndex].hebrew);
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Speaking Practice</h2>
          {onBack && (
            <Button variant="secondary" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <motion.div
            key={currentPhraseIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="text-4xl font-bold mb-4 text-primary">
              {samplePhrases[currentPhraseIndex].hebrew}
            </h3>
            {showTranslation && (
              <p className="text-xl text-muted-foreground">
                {samplePhrases[currentPhraseIndex].english}
              </p>
            )}
          </motion.div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPhraseIndex === 0}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>

          <Button
            variant="primary"
            onClick={playAudio}
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Play Audio
          </Button>

          <Button
            variant={isRecording ? 'secondary' : 'primary'}
            onClick={toggleRecording}
          >
            <Mic className={`mr-2 h-4 w-4 ${isRecording ? 'text-red-500' : ''}`} />
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPhraseIndex === samplePhrases.length - 1}
          >
            Next
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Phrase {currentPhraseIndex + 1} of {samplePhrases.length}
        </div>
      </div>
    </div>
  );
};