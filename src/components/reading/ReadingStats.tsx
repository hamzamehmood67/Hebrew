import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Target } from 'lucide-react';

interface ReadingStatsProps {
  storiesCompleted: number;
  totalReadingTime: number;
  averageAccuracy: number;
  currentStreak: number;
}

export function ReadingStats({
  storiesCompleted,
  totalReadingTime,
  averageAccuracy,
  currentStreak
}: ReadingStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-2xl font-bold">{storiesCompleted}</span>
        </div>
        <p className="text-gray-600">Stories Completed</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-6 h-6 text-blue-500" />
          <span className="text-2xl font-bold">{Math.round(totalReadingTime / 60)}</span>
        </div>
        <p className="text-gray-600">Hours Reading</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <Star className="w-6 h-6 text-purple-500" />
          <span className="text-2xl font-bold">{Math.round(averageAccuracy)}%</span>
        </div>
        <p className="text-gray-600">Average Accuracy</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <Target className="w-6 h-6 text-green-500" />
          <span className="text-2xl font-bold">{currentStreak}</span>
        </div>
        <p className="text-gray-600">Day Streak</p>
      </div>
    </motion.div>
  );
}