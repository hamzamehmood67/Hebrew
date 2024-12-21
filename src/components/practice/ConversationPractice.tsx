import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Mic, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConversationPracticeProps {
  onBack?: () => void;
}

interface Dialogue {
  id: number;
  hebrew: string;
  english: string;
  audio?: string;
  speaker: 'user' | 'ai';
}

const sampleDialogues: Dialogue[] = [
  {
    id: 1,
    hebrew: 'שָׁלוֹם! מַה שְׁלוֹמְךָ?',
    english: 'Hello! How are you?',
    speaker: 'ai'
  },
  {
    id: 2,
    hebrew: 'שָׁלוֹם, אֲנִי בְּסֵדֶר, תּוֹדָה. וְאַתָּה?',
    english: 'Hello, I\'m fine, thanks. And you?',
    speaker: 'user'
  },
  {
    id: 3,
    hebrew: 'גַּם אֲנִי בְּסֵדֶר. מֵאֵיפֹה אַתָּה?',
    english: 'I\'m also fine. Where are you from?',
    speaker: 'ai'
  }
];

export const ConversationPractice: React.FC<ConversationPracticeProps> = ({ onBack }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleNext = () => {
    if (currentDialogueIndex < sampleDialogues.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
      setShowTranslation(false);
    }
  };

  const handlePrevious = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(prev => prev - 1);
      setShowTranslation(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual recording logic here
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(sampleDialogues[currentDialogueIndex].hebrew);
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Conversation Practice</h2>
          {onBack && (
            <Button variant="secondary" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col space-y-6">
            {sampleDialogues.map((dialogue, index) => (
              <motion.div
                key={dialogue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index <= currentDialogueIndex ? 1 : 0.3,
                  y: 0 
                }}
                className={`flex ${dialogue.speaker === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-4 rounded-lg ${
                    dialogue.speaker === 'ai' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-lg font-medium mb-2">{dialogue.hebrew}</p>
                  {(showTranslation || index < currentDialogueIndex) && (
                    <p className="text-sm opacity-80">{dialogue.english}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentDialogueIndex === 0}
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
            disabled={currentDialogueIndex === sampleDialogues.length - 1}
          >
            Next
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Dialogue {currentDialogueIndex + 1} of {sampleDialogues.length}
        </div>
      </div>
    </div>
  );
};