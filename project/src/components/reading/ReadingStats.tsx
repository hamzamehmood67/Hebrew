import { motion } from 'framer-motion';
import { Trophy, Star, Book, Clock, Target, Award, TrendingUp } from 'lucide-react';
import { Progress } from '../ui/progress';

interface ReadingStatsProps {
  stats: {
    totalRead: number;
    correctAnswers: number;
    totalQuestions: number;
    averageTime: number;
    streak: number;
    level: number;
    xp: number;
    nextLevelXp: number;
    achievements: Array<{
      id: string;
      name: string;
      icon: string;
      unlockedAt: Date;
    }>;
    recentProgress: Array<{
      date: Date;
      score: number;
      timeSpent: number;
    }>;
  };
}

export function ReadingStats({ stats }: ReadingStatsProps) {
  const accuracyRate = Math.round((stats.correctAnswers / stats.totalQuestions) * 100) || 0;
  const levelProgress = (stats.xp / stats.nextLevelXp) * 100;

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-yellow-400 mr-2" />
            <h3 className="text-lg font-semibold">Level {stats.level}</h3>
          </div>
          <span className="text-sm text-gray-600">{stats.xp} / {stats.nextLevelXp} XP</span>
        </div>
        <Progress value={levelProgress} className="h-2" />
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <div className="flex items-center mb-2">
            <Book className="h-5 w-5 text-brand-600 mr-2" />
            <span className="text-sm text-gray-600">Stories Read</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalRead}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <div className="flex items-center mb-2">
            <Target className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm text-gray-600">Accuracy</span>
          </div>
          <p className="text-2xl font-bold">{accuracyRate}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm text-gray-600">Avg. Time</span>
          </div>
          <p className="text-2xl font-bold">{stats.averageTime}m</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <div className="flex items-center mb-2">
            <Star className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-sm text-gray-600">Streak</span>
          </div>
          <p className="text-2xl font-bold">{stats.streak} days</p>
        </motion.div>
      </div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Progress</h3>
        <div className="h-48">
          {/* Add a chart here showing recent scores and time spent */}
        </div>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.achievements.slice(0, 4).map((achievement) => (
            <div
              key={achievement.id}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
            >
              <Award className="h-8 w-8 text-yellow-400 mb-2" />
              <span className="text-sm font-medium text-center">{achievement.name}</span>
              <span className="text-xs text-gray-500">
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}