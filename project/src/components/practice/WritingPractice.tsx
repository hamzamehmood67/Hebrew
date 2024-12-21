import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface WritingPracticeProps {
  onBack: () => void;
}

interface WritingPrompt {
  id: string;
  hebrew: string;
  transliteration: string;
  english: string;
  type: 'sentence' | 'paragraph';
}

const writingPrompts: WritingPrompt[] = [
  {
    id: '1',
    hebrew: 'תאר את היום שלך',
    transliteration: 'Ta\'er et hayom shelcha',
    english: 'Describe your day',
    type: 'paragraph'
  },
  {
    id: '2',
    hebrew: 'מה אתה אוהב לעשות בזמנך הפנוי?',
    transliteration: 'Ma ata ohev la\'asot bizmancha hapanui?',
    english: 'What do you like to do in your free time?',
    type: 'paragraph'
  }
];

export function WritingPractice({ onBack }: WritingPracticeProps) {
  const { width, height } = useWindowSize();
  const [text, setText] = useState('');
  const [currentPrompt] = useState<WritingPrompt>(writingPrompts[0]);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleComplete = async () => {
    if (text.length < 10) {
      setNotification({
        type: 'error',
        message: 'Please write a longer response to complete the practice.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Here you would typically send the response to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setNotification({
        type: 'success',
        message: 'Great writing practice! Keep it up!'
      });
      setIsComplete(true);
    } catch (error) {
      console.error('Failed to submit writing practice:', error);
      setNotification({
        type: 'error',
        message: 'Failed to save your progress. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] p-8"
      >
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
        <h2 className="text-2xl font-bold mb-4">Practice Complete!</h2>
        <Button onClick={onBack}>Return to Practice Menu</Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </motion.div>
      )}

      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Practice
      </Button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Writing Practice</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-lg font-hebrew">{currentPrompt.hebrew}</p>
            <p className="text-sm text-gray-600">{currentPrompt.transliteration}</p>
            <p className="text-sm text-gray-600">{currentPrompt.english}</p>
          </div>
          
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your response in Hebrew..."
            className="min-h-[200px] font-hebrew"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {text.length} characters written
            </p>
            <Button 
              onClick={handleComplete}
              disabled={isSubmitting || text.length < 10}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Complete Practice'
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}