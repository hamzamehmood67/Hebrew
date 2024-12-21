import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { ReadingLevel } from '@/types/reading';
import { useGameStore } from '@/store/gameStore';

interface LevelProgressProps {
  level: ReadingLevel;
}

export function LevelProgress({ level }: LevelProgressProps) {
  const { weeklyXP } = useGameStore();
  const progress = Math.min((weeklyXP / level.xpRequired) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Star className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-xl font-bold">{level.title}</h3>
        </div>
        <span className="text-sm text-gray-600">
          {weeklyXP} / {level.xpRequired} XP
        </span>
      </div>

      <p className="text-gray-600 mb-4">{level.description}</p>

      <div className="relative h-2 bg-gray-200 rounded-full mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute h-full bg-brand-500 rounded-full"
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
