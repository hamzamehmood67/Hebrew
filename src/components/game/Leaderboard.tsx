import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import type { LeaderboardEntry } from '@/types/leaderboard';

export function Leaderboard() {
  const { leaderboard } = useGameStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
      <div className="space-y-4">
        {leaderboard.map((entry: LeaderboardEntry, index: number) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="font-bold text-lg text-gray-700">#{index + 1}</span>
              <div>
                <p className="font-medium">{entry.username}</p>
                <p className="text-sm text-gray-600">Level {entry.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-600">{entry.xp} XP</p>
              <p className="text-sm text-gray-600">{entry.streak} day streak</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}