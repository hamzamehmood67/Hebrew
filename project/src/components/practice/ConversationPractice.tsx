import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface ConversationPracticeProps {
  onBack: () => void;
}

interface Message {
  role: 'system' | 'user';
  content: string;
  timestamp: Date;
}

export function ConversationPractice({ onBack }: ConversationPracticeProps) {
  const { width, height } = useWindowSize();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'system', 
      content: 'שָׁלוֹם! אֲנִי שָׂמֵחַ לְדַבֵּר אִתְּךָ. מַה שְׁלוֹמְךָ?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: input,
        timestamp: new Date()
      }]);
      setInput('');

      // Simulate API call for conversation response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'system',
          content: 'כֵּן, אֲנִי מֵבִין. תּוֹדָה עַל הַתְּשׁוּבָה!',
          timestamp: new Date()
        }]);
        setIsProcessing(false);
      }, 1000);

    } catch (error) {
      console.error('Failed to process message:', error);
      setNotification({
        type: 'error',
        message: 'Failed to process message. Please try again.'
      });
      setIsProcessing(false);
    }
  };

  const handleComplete = async () => {
    try {
      setIsComplete(true);
      setNotification({
        type: 'success',
        message: 'Great conversation practice! Keep it up!'
      });
    } catch (error) {
      console.error('Failed to complete practice:', error);
      setNotification({
        type: 'error',
        message: 'Failed to save your progress. Please try again.'
      });
      setIsComplete(false);
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
        <h2 className="text-2xl font-bold mb-4">Conversation Practice</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="font-hebrew">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 text-gray-600"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </motion.div>
            )}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response in Hebrew..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-hebrew"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={isProcessing}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            className="w-full"
            onClick={handleComplete}
            disabled={messages.length < 3}
          >
            Complete Practice
          </Button>
        </div>
      </div>
    </motion.div>
  );
}