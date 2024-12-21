import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Mic, 
  PenTool, 
  Book, 
  PlaySquare, 
  GraduationCap, 
  Headphones, 
  GamepadIcon, 
  LineChart 
} from 'lucide-react';
import { useState } from 'react';
import { VocabularyPractice } from '@/components/practice/VocabularyPractice';
import { ReadingPractice } from '@/components/practice/ReadingPractice';
import { WritingPractice } from '@/components/practice/WritingPractice';
import { ListeningPractice } from '@/components/practice/ListeningPractice';
import { SpeakingPractice } from '@/components/practice/SpeakingPractice';
import { ConversationPractice } from '@/components/practice/ConversationPractice';
import { GrammarPractice } from '@/components/practice/GrammarPractice';
import { GameCenter } from '@/components/practice/GameCenter';
import { ProgressTracker } from '@/components/practice/ProgressTracker';

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
      case 'vocabulary':
        return <VocabularyPractice onBack={() => setActiveSection(null)} />;
      case 'grammar':
        return <GrammarPractice onBack={() => setActiveSection(null)} />;
      case 'listening':
        return <ListeningPractice onBack={() => setActiveSection(null)} />;
      case 'games':
        return <GameCenter onBack={() => setActiveSection(null)} />;
      case 'progress':
        return <ProgressTracker onBack={() => setActiveSection(null)} />;
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
            Choose from our comprehensive set of interactive practice tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Speaking Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
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

          {/* Writing Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
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

          {/* Reading Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
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

          {/* Vocabulary Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <PlaySquare className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Vocabulary Flashcards</h3>
            </div>
            <p className="text-gray-600 mb-6">Master Hebrew vocabulary with interactive flashcards</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('vocabulary')}
            >
              Study Vocabulary
            </Button>
          </motion.div>

          {/* Grammar Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Grammar Exercises</h3>
            </div>
            <p className="text-gray-600 mb-6">Perfect your Hebrew grammar with targeted exercises</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('grammar')}
            >
              Practice Grammar
            </Button>
          </motion.div>

          {/* Listening Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <Headphones className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Listening Practice</h3>
            </div>
            <p className="text-gray-600 mb-6">Improve your Hebrew listening comprehension</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('listening')}
            >
              Start Listening
            </Button>
          </motion.div>

          {/* Interactive Games */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <GamepadIcon className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Learning Games</h3>
            </div>
            <p className="text-gray-600 mb-6">Learn Hebrew through fun interactive games</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('games')}
            >
              Play Games
            </Button>
          </motion.div>

          {/* Conversation Practice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
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

          {/* Progress Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-brand-100 rounded-lg">
                <LineChart className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">Progress Tracker</h3>
            </div>
            <p className="text-gray-600 mb-6">Track your learning progress and achievements</p>
            <Button 
              className="w-full"
              onClick={() => setActiveSection('progress')}
            >
              View Progress
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}