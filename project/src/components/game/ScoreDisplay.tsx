import { motion } from 'framer-motion';
import { Trophy, Star, Award, Flame } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export function ScoreDisplay() {
  const { score, streak, weeklyXP, totalXP } = useGameStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center mb-2">
          <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
          <h3 className="font-semibold text-gray-700">Current Score</h3>
        </div>
        <p className="text-3xl font-bold text-brand-600">{score}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center mb-2">
          <Flame className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className="font-semibold text-gray-700">Streak</h3>
        </div>
        <p className="text-3xl font-bold text-orange-500">{streak} days</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="font-semibold text-gray-700">Weekly XP</h3>
        </div>
        <p className="text-3xl font-bold text-purple-500">{weeklyXP}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center mb-2">
          <Award className="w-5 h-5 text-brand-600 mr-2" />
          <h3 className="font-semibold text-gray-700">Total XP</h3>
        </div>
        <p className="text-3xl font-bold text-brand-600">{totalXP}</p>
      </motion.div>
    </div>
  );
}