import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const tests = [
  {
    title: 'Beginner Hebrew Assessment',
    duration: '30 minutes',
    questions: 25,
    description: 'Test your knowledge of basic Hebrew vocabulary and grammar',
    topics: ['Alphabet', 'Basic Vocabulary', 'Simple Grammar']
  },
  {
    title: 'Intermediate Reading Test',
    duration: '45 minutes',
    questions: 30,
    description: 'Assess your Hebrew reading comprehension skills',
    topics: ['Reading Comprehension', 'Vocabulary', 'Grammar']
  },
  {
    title: 'Advanced Grammar Quiz',
    duration: '60 minutes',
    questions: 40,
    description: 'Challenge yourself with complex Hebrew grammar structures',
    topics: ['Advanced Grammar', 'Verb Forms', 'Sentence Structure']
  }
];

export default function PracticeTestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Practice Tests</h1>
          <p className="mt-4 text-xl text-gray-600">
            Assess your Hebrew language skills with our comprehensive tests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tests.map((test, index) => (
            <motion.div
              key={test.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{test.title}</h3>
              <p className="text-gray-600 mb-6">{test.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {test.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {test.questions} questions
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {test.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Save your progress
                </div>
                <Button>Start Test</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}