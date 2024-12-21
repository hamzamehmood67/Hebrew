import { motion } from 'framer-motion';
import { Target, Clock, Award } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useState, useEffect } from 'react';
import { WeeklyChallenge } from '@/types/leaderboard';
import { Button } from '../ui/button';

export function WeeklyChallenges() {
  const [challenges, setChallenges] = useState<WeeklyChallenge[]>([]);
  const getWeeklyChallenges = useGameStore(state => state.getWeeklyChallenges);

  useEffect(() => {
    const fetchChallenges = async () => {
      const data = await getWeeklyChallenges();
      setChallenges(data);
    };
    fetchChallenges();
  }, []);

  const getTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Weekly Challenges</h2>

      <div className="space-y-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl blur opacity-25" />
            <div className="relative bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-brand-600 mr-3" />
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {getTimeRemaining(challenge.endDate)}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{challenge.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-semibold text-brand-600">
                    {challenge.xpReward} XP
                  </span>
                </div>

                {challenge.progress !== undefined && (
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${(challenge.progress / challenge.requirement.count) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {challenge.progress}/{challenge.requirement.count}
                    </span>
                  </div>
                )}

                <Button
                  variant={challenge.completed ? 'outline' : 'default'}
                  disabled={challenge.completed}
                >
                  {challenge.completed ? 'Completed' : 'Start Challenge'}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}