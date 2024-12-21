import { motion } from 'framer-motion';
import { Trophy, Award, Star, Crown } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeframe, setTimeframe] = useState<'weekly' | 'allTime'>('weekly');
  const getLeaderboard = useGameStore(state => state.getLeaderboard);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, [timeframe]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 rounded-lg ${
              timeframe === 'weekly'
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('allTime')}
            className={`px-4 py-2 rounded-lg ${
              timeframe === 'allTime'
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center justify-center w-8 h-8 mr-4">
              {index === 0 && <Crown className="w-6 h-6 text-yellow-400" />}
              {index === 1 && <Trophy className="w-6 h-6 text-gray-400" />}
              {index === 2 && <Award className="w-6 h-6 text-brand-400" />}
              {index > 2 && <span className="text-gray-600">{index + 1}</span>}
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <img
                  src={entry.avatar || 'default-avatar.png'}
                  alt={entry.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    Level {entry.level}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-brand-600">
                {timeframe === 'weekly' ? entry.weeklyXP : entry.totalXP} XP
              </p>
              <p className="text-sm text-gray-600">{entry.streak} day streak</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}