import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  onBack: () => void;
}

interface PracticeStats {
  section: string;
  completed: number;
  total: number;
  accuracy: number;
  lastPracticed: string;
}

// This would typically come from a backend API
const mockStats: PracticeStats[] = [
  {
    section: 'Vocabulary',
    completed: 45,
    total: 100,
    accuracy: 85,
    lastPracticed: '2024-01-20'
  },
  {
    section: 'Grammar',
    completed: 30,
    total: 75,
    accuracy: 78,
    lastPracticed: '2024-01-19'
  },
  {
    section: 'Listening',
    completed: 20,
    total: 50,
    accuracy: 90,
    lastPracticed: '2024-01-18'
  },
  {
    section: 'Speaking',
    completed: 15,
    total: 40,
    accuracy: 82,
    lastPracticed: '2024-01-17'
  },
  {
    section: 'Writing',
    completed: 25,
    total: 60,
    accuracy: 75,
    lastPracticed: '2024-01-16'
  }
];

export function ProgressTracker({ onBack }: ProgressTrackerProps) {
  const totalAccuracy = mockStats.reduce((acc, stat) => acc + stat.accuracy, 0) / mockStats.length;
  const totalProgress = mockStats.reduce((acc, stat) => acc + (stat.completed / stat.total), 0) / mockStats.length * 100;

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
          <h1 className="text-4xl font-bold text-gray-900">Your Progress</h1>
          <p className="mt-4 text-xl text-gray-600">
            Track your Hebrew learning journey
          </p>
        </div>

        <div className="grid gap-8">
          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Progress</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Progress</span>
                  <span className="text-sm font-medium text-gray-900">{Math.round(totalProgress)}%</span>
                </div>
                <Progress value={totalProgress} className="w-full h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Average Accuracy</span>
                  <span className="text-sm font-medium text-gray-900">{Math.round(totalAccuracy)}%</span>
                </div>
                <Progress value={totalAccuracy} className="w-full h-2" />
              </div>
            </div>
          </motion.div>

          {/* Individual Section Progress */}
          {mockStats.map((stat, index) => (
            <motion.div
              key={stat.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{stat.section}</h3>
                <span className="text-sm text-gray-500">
                  Last practiced: {new Date(stat.lastPracticed).toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Completion</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stat.completed} / {stat.total} ({Math.round((stat.completed / stat.total) * 100)}%)
                    </span>
                  </div>
                  <Progress value={(stat.completed / stat.total) * 100} className="w-full h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Accuracy</span>
                    <span className="text-sm font-medium text-gray-900">{stat.accuracy}%</span>
                  </div>
                  <Progress value={stat.accuracy} className="w-full h-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
