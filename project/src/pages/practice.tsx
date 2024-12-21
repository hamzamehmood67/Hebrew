import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mic, PenTool, Book } from 'lucide-react';
import { useState } from 'react';
import { SpeakingPractice } from '@/components/practice/SpeakingPractice';
import { WritingPractice } from '@/components/practice/WritingPractice';
import { ReadingPractice } from '@/components/practice/ReadingPractice';
import { ConversationPractice } from '@/components/practice/ConversationPractice';

export default function PracticePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderPracticeSection = () => {
    switch (activeSection) {
      case 'speaking':
        return <SpeakingPractice onBack={() => setActiveSection(null)} />;
      case 'writing':
        return <WritingPractice onBack={() => setActiveSection(null)} />;
      case 'reading':
        return <ReadingPractice onBack={() => setActiveSection(null)} />;
      case 'conversation':
        return <ConversationPractice onBack={() => setActiveSection(null)} />;
      default:
        return null;
    }
  };

  if (activeSection) {
    return renderPracticeSection();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Practice Your Hebrew</h1>
          <p className="mt-4 text-xl text-gray-600">
            Try our interactive practice tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <Mic className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Speaking Practice</h3>
            </div>
            <p className="text-gray-600 mb-6">Practice pronunciation and conversation with AI feedback</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('speaking')}
            >
              Start Speaking
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <PenTool className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Writing Exercises</h3>
            </div>
            <p className="text-gray-600 mb-6">Improve your Hebrew writing skills with guided exercises</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('writing')}
            >
              Practice Writing
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <Book className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Reading Comprehension</h3>
            </div>
            <p className="text-gray-600 mb-6">Read and understand Hebrew texts at your level</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('reading')}
            >
              Start Reading
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Conversation Practice</h3>
            </div>
            <p className="text-gray-600 mb-6">Practice with native speakers or language partners</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('conversation')}
            >
              Find Partners
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}